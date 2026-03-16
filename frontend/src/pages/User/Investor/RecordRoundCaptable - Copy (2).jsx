import React, { useState, useEffect, useCallback } from "react";
import TopBar from "../../../components/Users/TopBar";
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config.js";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// ✅ Register all required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function RecordRoundCaptable() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Move API URL outside to prevent recreation on every render
  const API_URL_CAPTABLE = `${API_BASE_URL}api/user/capitalround/`;

  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const userLogin = storedUsername ? JSON.parse(storedUsername) : null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [capTableData, setCapTableData] = useState({
    pre_money: { items: [], totals: {} },
    post_money: { items: [], totals: {} }
  });
  const [roundData, setRoundData] = useState(null);
  const [pendingConversions, setPendingConversions] = useState([]);
  const [calculations, setCalculations] = useState({});

  // Chart states
  const [preMoneyChartData, setPreMoneyChartData] = useState(null);
  const [postMoneyChartData, setPostMoneyChartData] = useState(null);
  const [ownershipChartData, setOwnershipChartData] = useState(null);

  const [activeTab, setActiveTab] = useState("pre-money");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Simple formatCurrency function (no useCallback needed as it doesn't cause re-renders)
  const formatCurrency = (amount, currency = 'USD') => {
    if (!amount && amount !== 0) return '$0.00';

    try {
      // Clean up the currency code
      let cleanCurrency = 'USD';
      if (currency) {
        // Extract just the currency code (first 3 letters)
        const match = currency.toString().match(/[A-Z]{3}/);
        cleanCurrency = match ? match[0] : 'USD';
      }

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: cleanCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(parseFloat(amount));
    } catch (error) {
      // Fallback formatting
      const cleanCurrency = currency ? currency.toString().replace(/[^A-Z]/gi, '').substring(0, 3) : 'USD';
      return `${cleanCurrency} ${parseFloat(amount || 0).toFixed(2)}`;
    }
  };
  const formatCurrencyNotRound = (amount, currency = 'USD') => {
    if (amount === null || amount === undefined) return '$0.00';

    try {
      // Clean up the currency code
      let cleanCurrency = 'USD';
      if (currency) {
        const match = currency.toString().match(/[A-Z]{3}/);
        cleanCurrency = match ? match[0] : 'USD';
      }

      // Determine number of decimal places dynamically
      const decimals = Math.max(
        2,
        (amount.toString().split('.')[1] || '').length
      );

      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: cleanCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: decimals > 6 ? 6 : decimals // limit max to 6 for sanity
      }).format(parseFloat(amount));
    } catch (error) {
      const cleanCurrency = currency
        ? currency.toString().replace(/[^A-Z]/gi, '').substring(0, 3)
        : 'USD';
      return `${cleanCurrency} ${parseFloat(amount || 0).toFixed(6)}`;
    }
  };


  // Simple format functions
  const formatPercentage = (value) => {
    if (!value && value !== 0) return '0.00%';
    return `${parseFloat(value).toFixed(2)}%`;
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Data fetching function
  const getCapTableData = useCallback(async () => {
    if (!id || !userLogin) {
      setError("Missing required parameters");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const formData = {
      company_id: userLogin.companies[0].id,
      round_id: id,
    };

    try {
      const res = await axios.post(
        API_URL_CAPTABLE + "getRoundCapTableSingleRecord",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        const capTable = res.data.cap_table || {
          pre_money: { items: [], totals: {} },
          post_money: { items: [], totals: {} }
        };
        console.log(capTable)
        setCapTableData(capTable);
        setRoundData(res.data.round || null);
        setPendingConversions(res.data.pending_conversions || []);
        setCalculations(res.data.calculations || {});

        // Prepare chart data
        if (capTable?.pre_money?.items?.length > 0) {
          const preMoneyData = {
            labels: capTable.pre_money.items.map(item => item.name),
            datasets: [
              {
                label: 'Shares',
                data: capTable.pre_money.items.map(item => item.shares),
                backgroundColor: [
                  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                  '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
                ],
                borderWidth: 1
              }
            ]
          };
          setPreMoneyChartData(preMoneyData);
        }

        if (capTable?.post_money?.items?.length > 0) {
          const postMoneyData = {
            labels: capTable.post_money.items.map(item => item.name),
            datasets: [
              {
                label: 'Shares',
                data: capTable.post_money.items.map(item => item.shares),
                backgroundColor: [
                  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                  '#9966FF', '#FF9F40', '#8AC926', '#1982C4'
                ],
                borderWidth: 1
              }
            ]
          };
          setPostMoneyChartData(postMoneyData);
        }

        if (capTable?.pre_money && capTable?.post_money) {
          const allHolders = [...new Set([
            ...(capTable.pre_money.items || []).map(item => item.name),
            ...(capTable.post_money.items || []).map(item => item.name)
          ])];

          const ownershipData = {
            labels: allHolders,
            datasets: [
              {
                label: 'Pre-Money Ownership %',
                data: allHolders.map(holder => {
                  const item = (capTable.pre_money.items || []).find(i => i.name === holder);
                  return item ? parseFloat(item.percentage) : 0;
                }),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              },
              {
                label: 'Post-Money Ownership %',
                data: allHolders.map(holder => {
                  const item = (capTable.post_money.items || []).find(i => i.name === holder);
                  return item ? parseFloat(item.percentage) : 0;
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
              }
            ]
          };
          setOwnershipChartData(ownershipData);
        }
      } else {
        setError(res.data.message || "Failed to load cap table");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error loading cap table data");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  }, [id, userLogin, API_URL_CAPTABLE]); // Fixed dependencies

  useEffect(() => {

    getCapTableData();

  }, []);

  // Render loading state
  if (loading) {
    return (
      <Wrapper>
        <div className="fullpage d-block">
          <div className="d-flex align-items-start gap-0">
            <ModuleSideNav
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <div className={`global_view ${isCollapsed ? "global_view_col" : ""}`}>
              <TopBar />
              <SectionWrapper className="d-block p-md-4 p-3">
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading Cap Table Data...</p>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // Render error state
  if (error && !roundData) {
    return (
      <Wrapper>
        <div className="fullpage d-block">
          <div className="d-flex align-items-start gap-0">
            <ModuleSideNav
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <div className={`global_view ${isCollapsed ? "global_view_col" : ""}`}>
              <TopBar />
              <SectionWrapper className="d-block p-md-4 p-3">
                <div className="alert alert-danger">
                  <h5>Error Loading Cap Table</h5>
                  <p>{error}</p>
                  <button className="btn btn-primary" onClick={() => navigate(-1)}>
                    Go Back
                  </button>
                  <button className="btn btn-secondary ms-2" onClick={getCapTableData}>
                    Try Again
                  </button>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="fullpage d-block">
        <div className="d-flex align-items-start gap-0">
          <ModuleSideNav
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          <div className={`global_view ${isCollapsed ? "global_view_col" : ""}`}>
            <TopBar />
            <SectionWrapper className="d-block p-md-4 p-3">

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger mb-4">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              {/* Round Header */}
              {roundData && (
                <div className="card mb-4">
                  <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Round: {roundData.name}</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <p><strong>Type:</strong> {roundData.instrument}</p>
                        <p><strong>Status:</strong>
                          <span className={`badge ${roundData.status === 'CLOSED' ? 'bg-success' : 'bg-warning'} ms-2`}>
                            {roundData.status || 'ACTIVE'}
                          </span>
                        </p>
                        <p><strong>Date:</strong> {roundData.date || 'Not specified'}</p>
                      </div>
                      <div className="col-md-4">
                        <p><strong>Pre-Money:</strong> {formatCurrency(roundData.pre_money, roundData.currency)}</p>
                        <p><strong>Investment:</strong> {formatCurrency(roundData.investment, roundData.currency)}</p>
                        <p><strong>Post-Money:</strong> {formatCurrency(roundData.post_money, roundData.currency)}</p>
                      </div>
                      <div className="col-md-4">
                        <p><strong>Share Price:</strong> {formatCurrencyNotRound(roundData.share_price, roundData.currency)}</p>
                        <p><strong>Issued Shares:</strong> {formatNumber(roundData.issued_shares)}</p>
                        <p><strong>Option Pool: </strong>{(() => {
                          // Calculate actual option pool percentage from cap table
                          const actualOptionPoolPercent = capTableData.post_money.totals.total_option_pool > 0
                            ? ((capTableData.post_money.totals.total_option_pool / capTableData.post_money.totals.total_shares) * 100)
                            : 0;

                          // Display based on instrument type
                          if (roundData?.instrument === 'Preferred Equity') {
                            // For Preferred/Common: Show POST-MONEY option pool target
                            const targetPercent = parseFloat(roundData.optionPoolPercent_post) || 0;
                            return formatPercentage(targetPercent > 0 ? targetPercent : actualOptionPoolPercent);
                          } else {
                            // For SAFE/Convertible Note/Round 0: Show PRE-MONEY option pool
                            const targetPercent = parseFloat(roundData.option_pool_percent) || 0;
                            return formatPercentage(targetPercent);
                          }
                        })()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="mb-4">
                <ul className="nav nav-tabs gap-1">
                  <li className="nav-item bg-primary">
                    <button
                      className={`nav-link text-white backcolor ${activeTab === 'pre-money' ? 'active' : ''}`}
                      onClick={() => setActiveTab('pre-money')}
                    >
                      Pre-Money Cap Table
                    </button>
                  </li>
                  {capTableData.post_money && (
                    <li className="nav-item bg-primary">
                      <button
                        className={`nav-link text-white backcolor ${activeTab === 'post-money' ? 'active' : ''}`}
                        onClick={() => setActiveTab('post-money')}
                      >
                        Post-Money Cap Table
                      </button>
                    </li>
                  )}
                  <li className="nav-item bg-primary">
                    <button
                      className={`nav-link text-white backcolor ${activeTab === 'charts' ? 'active' : ''}`}
                      onClick={() => setActiveTab('charts')}
                    >
                      Charts & Analysis
                    </button>
                  </li>
                  {pendingConversions.length > 0 && (
                    <li className="nav-item bg-primary ">
                      <button
                        className={`nav-link text-white backcolor ${activeTab === 'pending' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pending')}
                      >
                        Pending Conversions
                      </button>
                    </li>
                  )}
                </ul>
              </div>

              {/* Pre-Money Cap Table */}
              {activeTab === 'pre-money' && (
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Pre-Money Capitalization Table</h5>
                    <small className="text-muted">Share ownership before this round's investment</small>
                  </div>
                  <div className="card-body">
                    {capTableData.pre_money.items.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-muted">No pre-money cap table data available</p>
                      </div>
                    ) : (
                      <>
                        <div className="table-responsive">
                          <table className="table table-striped table-hover">
                            <thead>
                              <tr>
                                <th>Shareholder</th>
                                <th className="text-end">Shares</th>
                                <th className="text-end">Ownership %</th>
                                <th className="text-end">Investment</th>
                                <th className="text-end">Share Price</th>
                                <th>Round</th>
                              </tr>
                            </thead>
                            <tbody>
                              {capTableData.pre_money.items.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    <span className={`badge ${item.type === 'founder' ? 'bg-info' :
                                      item.type === 'investor' ? 'bg-success' :
                                        'bg-warning'
                                      } me-2`}>
                                      {item.type === 'founder' ? 'F' :
                                        item.type === 'investor' ? 'I' : 'O'}
                                    </span>
                                    {item.name}
                                  </td>
                                  <td className="text-end">{formatNumber(item.shares)}</td>
                                  <td className="text-end">{formatPercentage(item.percentage)}</td>
                                  <td className="text-end">{formatCurrency(item.investment, roundData?.currency)}</td>
                                  <td className="text-end">{formatCurrency(item.share_price, roundData?.currency)}</td>
                                  <td>{item.round_name}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot className="table-light">
                              <tr>
                                <th>TOTAL</th>
                                <th className="text-end">{formatNumber(capTableData.pre_money.totals.total_shares)}</th>
                                <th className="text-end">100%</th>
                                <th className="text-end">
                                  {formatCurrency(
                                    capTableData.pre_money.items.reduce((sum, item) => sum + (item.investment || 0), 0),
                                    roundData?.currency
                                  )}
                                </th>
                                <th></th>
                                <th></th>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                        {/* Pre-Money Summary */}
                        <div className="row mt-4">
                          <div className="col-md-4">
                            <div className="card bg-light">
                              <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">Founders</h6>
                                <h4 className="card-title">{formatNumber(capTableData.pre_money.totals.total_founders)}</h4>
                                <p className="card-text">
                                  {formatPercentage(
                                    (capTableData.pre_money.totals.total_founders /
                                      capTableData.pre_money.totals.total_shares) * 100
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="card bg-light">
                              <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">Investors</h6>
                                <h4 className="card-title">{formatNumber(capTableData.pre_money.totals.total_investors)}</h4>
                                <p className="card-text">
                                  {formatPercentage(
                                    (capTableData.pre_money.totals.total_investors /
                                      capTableData.pre_money.totals.total_shares) * 100
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="card bg-light">
                              <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">Option Pool</h6>
                                <h4 className="card-title">{formatNumber(capTableData.pre_money.totals.total_option_pool)}</h4>
                                <p className="card-text">
                                  {formatPercentage(
                                    (capTableData.pre_money.totals.total_option_pool /
                                      capTableData.pre_money.totals.total_shares) * 100
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Post-Money Cap Table */}
              {activeTab === 'post-money' && capTableData.post_money && (
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Post-Money Capitalization Table</h5>
                    <small className="text-muted">Share ownership after this round's investment</small>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th>Shareholder</th>
                            <th className="text-end">Shares</th>
                            <th className="text-end">New Shares</th> {/* New column added */}
                            <th className="text-end">Ownership %</th>
                            <th className="text-end">Investment</th>
                            <th className="text-end">Share Price</th>
                            <th>Round</th>
                          </tr>
                        </thead>
                        <tbody>
                          {capTableData.post_money.items.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <span className={`badge ${item.type === 'founder' ? 'bg-info' :
                                  item.type === 'investor' ? 'bg-success' :
                                    'bg-warning'
                                  } me-2`}>
                                  {item.type === 'founder' ? 'F' :
                                    item.type === 'investor' ? 'I' : 'O'}
                                </span>
                                {item.name}
                              </td>
                              <td className="text-end">{formatNumber(item.shares)}</td>
                              <td className="text-end">
                                {/* Display new shares, highlight if > 0 */}
                                {item.new_shares > 0 ? (
                                  <span className="badge bg-success">
                                    +{formatNumber(item.new_shares)}
                                  </span>
                                ) : (
                                  <span className="text-muted">{formatNumber(item.new_shares || 0)}</span>
                                )}
                              </td>
                              <td className="text-end">{formatPercentage(item.percentage)}</td>
                              <td className="text-end">{formatCurrency(item.investment, roundData?.currency)}</td>
                              <td className="text-end">{formatCurrencyNotRound(item.share_price, roundData?.currency)}</td>
                              <td>{item.round_name}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="table-light">
                          <tr>
                            <th>TOTAL</th>
                            <th className="text-end">{formatNumber(capTableData.post_money.totals.total_shares)}</th>
                            <th className="text-end">
                              {/* Display total new shares */}
                              <span className="badge bg-success">
                                +{formatNumber(capTableData.post_money.totals.total_new_shares || 0)}
                              </span>
                            </th>
                            <th className="text-end">100%</th>
                            <th className="text-end">
                              {formatCurrency(
                                capTableData.post_money.items.reduce((sum, item) => sum + (item.investment || 0), 0),
                                roundData?.currency
                              )}
                            </th>
                            <th></th>
                            <th></th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* Post-Money Summary - Updated to include New Shares */}
                    <div className="row mt-4">
                      <div className="col-md-3">
                        <div className="card bg-success text-white">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2">Total Shares</h6>
                            <h4 className="card-title">{formatNumber(capTableData.post_money.totals.total_shares)}</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="card bg-primary text-white">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2">New Shares</h6>
                            <h4 className="card-title">
                              +{formatNumber(capTableData.post_money.totals.total_new_shares || 0)}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card bg-info text-white">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2">Founders</h6>
                            <h4 className="card-title">
                              {formatPercentage(
                                (capTableData.post_money.totals.total_founders /
                                  capTableData.post_money.totals.total_shares) * 100
                              )}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card bg-warning text-white">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2">Investors</h6>
                            <h4 className="card-title">
                              {formatPercentage(
                                (capTableData.post_money.totals.total_investors /
                                  capTableData.post_money.totals.total_shares) * 100
                              )}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card bg-secondary text-white">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2">Option Pool</h6>
                            <h4 className="card-title">
                              {formatPercentage(
                                (capTableData.post_money.totals.total_option_pool /
                                  capTableData.post_money.totals.total_shares) * 100
                              )}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Charts Tab */}
              {activeTab === 'charts' && (
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Charts & Analysis</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Pre-Money Pie Chart */}
                      {preMoneyChartData && (
                        <div className="col-md-6 mb-4">
                          <div className="card">
                            <div className="card-header">
                              <h6 className="mb-0">Pre-Money Ownership Distribution</h6>
                            </div>
                            <div className="card-body">
                              <Pie data={preMoneyChartData} options={{
                                responsive: true,
                                plugins: {
                                  legend: {
                                    position: 'bottom'
                                  }
                                }
                              }} />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Post-Money Pie Chart */}
                      {postMoneyChartData && (
                        <div className="col-md-6 mb-4">
                          <div className="card">
                            <div className="card-header">
                              <h6 className="mb-0">Post-Money Ownership Distribution</h6>
                            </div>
                            <div className="card-body">
                              <Pie data={postMoneyChartData} options={{
                                responsive: true,
                                plugins: {
                                  legend: {
                                    position: 'bottom'
                                  }
                                }
                              }} />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Ownership Comparison Chart */}
                      {ownershipChartData && (
                        <div className="col-md-12">
                          <div className="card">
                            <div className="card-header">
                              <h6 className="mb-0">Ownership Comparison (Pre vs Post)</h6>
                            </div>
                            <div className="card-body">
                              <Bar data={ownershipChartData} options={{
                                responsive: true,
                                plugins: {
                                  legend: {
                                    position: 'top'
                                  }
                                },
                                scales: {
                                  y: {
                                    beginAtZero: true,
                                    ticks: {
                                      callback: function (value) {
                                        return value + '%';
                                      }
                                    }
                                  }
                                }
                              }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Pending Conversions Tab */}
              {activeTab === 'pending' && pendingConversions.length > 0 && (
                <div className="card">
                  <div className="card-header bg-warning">
                    <h5 className="mb-0">Pending Conversions</h5>
                    <small className="text-white">SAFE/Convertible Notes waiting to convert</small>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Instrument</th>
                            <th>Round</th>
                            <th className="text-end">Investment</th>
                            <th className="text-end">Conversion Price</th>
                            <th className="text-end">Potential Shares</th>
                            <th>Discount</th>
                            <th>Valuation Cap</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingConversions.map((conv, index) => {
                            // Map backend data to frontend expected structure
                            const mappedConv = {
                              instrument: conv.instrument_type || conv.instrument,
                              round_name: conv.round_name,
                              investment: conv.investment_amount || conv.investment,
                              conversion_price: conv.share_price || conv.conversion_price,
                              potential_shares: conv.estimated_shares || conv.potential_shares,
                              discount_rate: conv.instrument_data?.discountRate_note || conv.discount_rate,
                              valuation_cap: conv.instrument_data?.valuationCap_note || conv.valuation_cap
                            };

                            return (
                              <tr key={index}>
                                <td>
                                  <span className={`badge ${mappedConv.instrument === 'Safe' ? 'bg-primary' : 'bg-info'}`}>
                                    {mappedConv.instrument}
                                  </span>
                                </td>
                                <td>{mappedConv.round_name}</td>
                                <td className="text-end">{formatCurrency(mappedConv.investment, roundData?.currency)}</td>
                                <td className="text-end">{formatCurrency(mappedConv.conversion_price, roundData?.currency)}</td>
                                <td className="text-end">{formatNumber(mappedConv.potential_shares)}</td>
                                <td>{mappedConv.discount_rate}%</td>
                                <td>{formatCurrency(mappedConv.valuation_cap, roundData?.currency)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot className="table-light">
                          <tr>
                            <th colSpan="3">TOTAL POTENTIAL SHARES</th>
                            <th></th>
                            <th className="text-end">
                              {formatNumber(pendingConversions.reduce((sum, conv) =>
                                sum + ((conv.estimated_shares || conv.potential_shares) || 0), 0))}
                            </th>
                            <th></th>
                            <th></th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    {/* ... same footer ... */}
                  </div>
                </div>
              )}

              {/* Calculations Summary */}
              {/* Round Header - ADD INSTRUMENT DETAILS */}
              {roundData && (
                <div className="card mb-4">
                  <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Round: {roundData.name}</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <p><strong>Type:</strong> {roundData.instrument}</p>
                        <p><strong>Status:</strong>
                          <span className={`badge ${roundData.status === 'CLOSED' ? 'bg-success' : 'bg-warning'} ms-2`}>
                            {roundData.status || 'ACTIVE'}
                          </span>
                        </p>
                        <p><strong>Date:</strong> {roundData.date || 'Not specified'}</p>
                      </div>
                      <div className="col-md-4">
                        <p><strong>Pre-Money:</strong> {formatCurrency(roundData.pre_money, roundData.currency)}</p>
                        <p><strong>Investment:</strong> {formatCurrency(roundData.investment, roundData.currency)}</p>
                        <p><strong>Post-Money:</strong> {formatCurrency(roundData.post_money, roundData.currency)}</p>
                      </div>
                      <div className="col-md-4">
                        <p><strong>Share Price:</strong> {formatCurrencyNotRound(roundData.share_price, roundData.currency)}</p>
                        <p><strong>Issued Shares:</strong> {formatNumber(roundData.issued_shares)}</p>
                        <p><strong>Option Pool: </strong>{(() => {
                          // Calculate actual option pool percentage from cap table
                          const actualOptionPoolPercent = capTableData.post_money.totals.total_option_pool > 0
                            ? ((capTableData.post_money.totals.total_option_pool / capTableData.post_money.totals.total_shares) * 100)
                            : 0;

                          // Display based on instrument type
                          if (roundData?.instrument === 'Preferred Equity') {
                            // For Preferred/Common: Show POST-MONEY option pool target
                            const targetPercent = parseFloat(roundData.optionPoolPercent_post) || 0;
                            return formatPercentage(targetPercent > 0 ? targetPercent : actualOptionPoolPercent);
                          } else {
                            // For SAFE/Convertible Note/Round 0: Show PRE-MONEY option pool
                            const targetPercent = parseFloat(roundData.option_pool_percent) || 0;
                            return formatPercentage(targetPercent);
                          }
                        })()}</p>
                      </div>
                    </div>

                    {/* ✅ NEW: Instrument-Specific Details */}
                    {roundData.instrument_details && (
                      <div className="mt-4">
                        <h6 className="border-bottom pb-2">Instrument Details</h6>
                        <div className="row mt-3">

                          {/* Preferred Equity Details */}
                          {roundData.instrument === 'Preferred Equity' && (
                            <>
                              <div className="col-md-3">
                                <p className="mb-1 text-muted"><small>Liquidation Preference</small></p>
                                <p className="mb-0"><strong>{roundData.instrument_details.liquidation_preference_multiple}</strong></p>
                              </div>
                              <div className="col-md-3">
                                <p className="mb-1 text-muted"><small>Participation</small></p>
                                <p className="mb-0"><strong>{roundData.instrument_details.participation}</strong></p>
                              </div>
                              <div className="col-md-3">
                                <p className="mb-1 text-muted"><small>Anti-Dilution</small></p>
                                <p className="mb-0"><strong>{roundData.instrument_details.anti_dilution}</strong></p>
                              </div>
                              <div className="col-md-3">
                                <p className="mb-1 text-muted"><small>Dividend Rate</small></p>
                                <p className="mb-0"><strong>{roundData.instrument_details.dividend_rate}%</strong></p>
                              </div>
                            </>
                          )}


                          {/* SAFE Details */}
                          {roundData.instrument === 'Safe' && (
                            <>
                              <div className="col-md-4">
                                <p className="mb-1 text-muted"><small>Valuation Cap</small></p>
                                <p className="mb-0"><strong>{formatCurrency(roundData.instrument_details.valuation_cap, roundData.currency)}</strong></p>
                              </div>
                              <div className="col-md-4">
                                <p className="mb-1 text-muted"><small>Discount Rate</small></p>
                                <p className="mb-0"><strong>{roundData.instrument_details.discount_rate}%</strong></p>
                              </div>
                              <div className="col-md-4">
                                <p className="mb-1 text-muted"><small>Pro-Rata Rights</small></p>
                                <p className="mb-0"><strong>{roundData.instrument_details.pro_rata_rights ? 'Yes' : 'No'}</strong></p>
                              </div>
                            </>
                          )}

                          {/* Convertible Note Details */}
                          {roundData.instrument === 'Convertible Note' && (
                            <>
                              <div className="col-md-3">
                                <p className="mb-1 text-muted"><small>Principal</small></p>
                                <p className="mb-0"><strong>{formatCurrency(roundData.instrument_details.principal, roundData.currency)}</strong></p>
                              </div>
                              <div className="col-md-3">
                                <p className="mb-1 text-muted"><small>Interest Rate</small></p>
                                <p className="mb-0"><strong>{roundData.instrument_details.interest_rate}% / year</strong></p>
                              </div>
                              <div className="col-md-3">
                                <p className="mb-1 text-muted"><small>Accrued Interest</small></p>
                                <p className="mb-0"><strong>{formatCurrency(roundData.instrument_details.accrued_interest, roundData.currency)}</strong></p>
                              </div>
                              <div className="col-md-3">
                                <p className="mb-1 text-muted"><small>Total with Interest</small></p>
                                <p className="mb-0"><strong>{formatCurrency(roundData.instrument_details.total_with_interest, roundData.currency)}</strong></p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ✅ UPDATED: Calculations Summary */}
              {/* Calculations Summary - ALWAYS SHOW */}
              {/* Calculations Summary */}
              <div className="card mt-4">
                <div className="card-header bg-light">
                  <h6 className="mb-0">Valuation Summary</h6>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <p className="mb-1"><strong>Pre-Money Valuation</strong></p>
                      <h4>{formatCurrency(calculations.pre_money_valuation, roundData?.currency)}</h4>
                    </div>
                    {roundData?.instrument !== 'Safe' && roundData?.instrument !== 'Convertible Note' && (
                      <>
                        <div className="col-md-3">
                          <p className="mb-1"><strong>Post-Money Valuation</strong></p>
                          <h4 className="text-success">{formatCurrency(calculations.post_money_valuation, roundData?.currency)}</h4>
                        </div>
                        <div className="col-md-3">
                          <p className="mb-1"><strong>Total Shares Outstanding</strong></p>
                          <h4>{formatNumber(calculations.total_shares_outstanding)}</h4>
                        </div>
                        {/* <div className="col-md-3">
                          <p className="mb-1"><strong>Fully Diluted Shares</strong></p>
                          <h4>{formatNumber(calculations.fully_diluted_shares)}</h4>
                        </div> */}
                      </>
                    )}
                    {(roundData?.instrument === 'Safe' || roundData?.instrument === 'Convertible Note') && (
                      <div className="col-md-3">
                        <p className="mb-1"><strong>Investment Amount</strong></p>
                        <h4 className="text-primary">{formatCurrency(roundData.investment, roundData?.currency)}</h4>
                      </div>
                    )}
                  </div>

                  {roundData?.instrument !== 'Safe' && roundData?.instrument !== 'Convertible Note' && (
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Price per Share</strong></p>
                        <h5>{formatCurrencyNotRound(calculations.share_price, roundData?.currency)}</h5>
                      </div>
                      {/* <div className="col-md-6">
                        <p className="mb-1"><strong>Price per Share (Fully Diluted)</strong></p>
                        <h5>{formatCurrencyNotRound(calculations.price_per_share_fully_diluted, roundData?.currency)}</h5>
                      </div> */}
                    </div>
                  )}

                  {/* ✅ PREFERRED EQUITY - ONLY SHOW FOR PREFERRED ROUNDS */}
                  {roundData?.instrument === 'Preferred Equity' && roundData?.instrument_details && (
                    <>
                      <hr className="my-4" />
                      <h6 className="mb-3">
                        <i className="bi bi-star-fill text-primary me-2"></i>
                        Preferred Equity Terms
                      </h6>
                      <div className="row">
                        <div className="col-md-3">
                          <p className="mb-1 text-muted"><small>Liquidation Preference</small></p>
                          <h5 className="mb-0">
                            <span className="badge bg-primary">
                              {roundData.instrument_details.liquidation_preference}x
                            </span>
                          </h5>
                        </div>
                        <div className="col-md-3">
                          <p className="mb-1 text-muted"><small>Participation</small></p>
                          <h6 className="mb-0">{roundData.instrument_details.participation || 'Non-Participating'}</h6>
                        </div>
                        <div className="col-md-3">
                          <p className="mb-1 text-muted"><small>Anti-Dilution Protection</small></p>
                          <h6 className="mb-0">{roundData.instrument_details.anti_dilution || 'None'}</h6>
                        </div>
                        <div className="col-md-3">
                          <p className="mb-1 text-muted"><small>Dividend Rate</small></p>
                          <h6 className="mb-0">{roundData.instrument_details.dividend_rate || 0}% per year</h6>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <p className="mb-1 text-muted"><small>Voting Rights</small></p>
                          <h6 className="mb-0">{roundData.instrument_details.voting_rights || 'Standard'}</h6>
                        </div>
                        <div className="col-md-4">
                          <p className="mb-1 text-muted"><small>Conversion Ratio</small></p>
                          <h6 className="mb-0">{roundData.instrument_details.conversion_ratio || 1}:1</h6>
                        </div>
                        <div className="col-md-4">
                          <p className="mb-1 text-muted"><small>Redemption Rights</small></p>
                          <h6 className="mb-0">{roundData.instrument_details.redemption_rights || 'None'}</h6>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ✅ COMMON STOCK - ONLY SHOW FOR COMMON STOCK */}


                  {/* ✅ SAFE - ONLY SHOW FOR SAFE */}
                  {roundData?.instrument === 'Safe' && roundData?.instrument_details && (
                    <>
                      <hr className="my-4" />
                      <h6 className="mb-3">
                        <i className="bi bi-shield-check text-info me-2"></i>
                        SAFE Terms
                      </h6>
                      <div className="row">
                        <div className="col-md-4">
                          <p className="mb-1 text-muted"><small>Valuation Cap</small></p>
                          <h5 className="mb-0">
                            {formatCurrency(roundData.instrument_details.valuation_cap, roundData.currency)}
                          </h5>
                        </div>
                        <div className="col-md-4">
                          <p className="mb-1 text-muted"><small>Discount Rate</small></p>
                          <h5 className="mb-0">
                            <span className="badge bg-success">
                              {roundData.instrument_details.discount_rate}%
                            </span>
                          </h5>
                        </div>
                        <div className="col-md-4">
                          <p className="mb-1 text-muted"><small>Pro-Rata Rights</small></p>
                          <h6 className="mb-0">
                            {roundData.instrument_details.pro_rata_rights ? (
                              <span className="badge bg-success">Yes</span>
                            ) : (
                              <span className="badge bg-secondary">No</span>
                            )}
                          </h6>
                        </div>
                      </div>
                      {roundData.instrument_details.mfn && (
                        <div className="row mt-3">
                          <div className="col-md-12">
                            <div className="alert alert-success mb-0">
                              <i className="bi bi-check-circle me-2"></i>
                              <strong>Most Favored Nation (MFN):</strong> Enabled
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <div className="alert alert-info mb-0">
                            <i className="bi bi-info-circle me-2"></i>
                            <strong>Note:</strong> This SAFE will convert to equity in the next priced round based on the lower of the valuation cap or discounted price.
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ✅ CONVERTIBLE NOTE - ONLY SHOW FOR CONVERTIBLE NOTE */}
                  {roundData?.instrument === 'Convertible Note' && roundData?.instrument_details && (
                    <>
                      <hr className="my-4" />
                      <h6 className="mb-3">
                        <i className="bi bi-file-earmark-text text-warning me-2"></i>
                        Convertible Note Terms
                      </h6>
                      <div className="row">
                        <div className="col-md-3">
                          <p className="mb-1 text-muted"><small>Principal Amount</small></p>
                          <h5 className="mb-0">
                            {formatCurrency(roundData.instrument_details.principal, roundData.currency)}
                          </h5>
                        </div>
                        <div className="col-md-3">
                          <p className="mb-1 text-muted"><small>Interest Rate</small></p>
                          <h5 className="mb-0">
                            <span className="badge bg-warning text-dark">
                              {roundData.instrument_details.interest_rate}% / year
                            </span>
                          </h5>
                        </div>
                        <div className="col-md-3">
                          <p className="mb-1 text-muted"><small>Accrued Interest</small></p>
                          <h5 className="mb-0 text-success">
                            +{formatCurrency(roundData.instrument_details.accrued_interest, roundData.currency)}
                          </h5>
                        </div>
                        <div className="col-md-3">
                          <p className="mb-1 text-muted"><small>Total with Interest</small></p>
                          <h5 className="mb-0">
                            {formatCurrency(roundData.instrument_details.total_with_interest, roundData.currency)}
                          </h5>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <p className="mb-1 text-muted"><small>Valuation Cap</small></p>
                          <h6 className="mb-0">
                            {roundData.instrument_details.valuation_cap > 0
                              ? formatCurrency(roundData.instrument_details.valuation_cap, roundData.currency)
                              : <span className="badge bg-secondary">No Cap</span>}
                          </h6>
                        </div>
                        <div className="col-md-4">
                          <p className="mb-1 text-muted"><small>Discount Rate</small></p>
                          <h6 className="mb-0">
                            <span className="badge bg-info">
                              {roundData.instrument_details.discount_rate}%
                            </span>
                          </h6>
                        </div>
                        <div className="col-md-4">
                          <p className="mb-1 text-muted"><small>Maturity</small></p>
                          <h6 className="mb-0">
                            {roundData.instrument_details.years_to_maturity} years
                            {/* {roundData.instrument_details.maturity_date && (
                              <small className="text-muted d-block">
                                ({new Date(roundData.instrument_details.maturity_date).toLocaleDateString()})
                              </small>
                            )} */}
                          </h6>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <div className="alert alert-warning mb-0">
                            <i className="bi bi-clock me-2"></i>
                            <strong>Conversion Trigger:</strong> {roundData.instrument_details.conversion_trigger || 'Qualified Financing'}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Rounds List
                </button>

                <button
                  className="btn btn-primary ms-2"
                  onClick={getCapTableData}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Refresh Data
                </button>
              </div>

            </SectionWrapper>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}