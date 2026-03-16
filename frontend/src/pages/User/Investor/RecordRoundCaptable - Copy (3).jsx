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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
);

export default function RecordRoundCaptable() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [summaryDetails, setSummaryDetails] = useState(null);

  // Chart states
  const [preMoneyChartData, setPreMoneyChartData] = useState(null);
  const [postMoneyChartData, setPostMoneyChartData] = useState(null);

  const [activeTab, setActiveTab] = useState("pre-money");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [conversionStatus, setConversionStatus] = useState(null);
  // Format currency function
  const formatCurrency = (amount, currency = 'USD') => {
    // Clean currency code - remove spaces and symbols
    const cleanCurrency = currency?.trim().split(" ")[0] || "USD";

    // Valid currency codes
    const validCurrencies = ["USD", "CAD", "EUR", "GBP", "INR", "AUD", "JPY"];
    const currencyCode = validCurrencies.includes(cleanCurrency.toUpperCase())
      ? cleanCurrency.toUpperCase()
      : "USD";

    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount || 0);
    } catch (error) {
      // Fallback if currency is still invalid
      return `${currencyCode} ${parseFloat(amount || 0).toFixed(2)}`;
    }
  };

  const formatCurrencyNotRound = (amount, currency = 'USD') => {
    // Clean currency code - remove spaces and symbols
    const cleanCurrency = currency?.trim().split(" ")[0] || "USD";

    // Valid currency codes
    const validCurrencies = ["USD", "CAD", "EUR", "GBP", "INR", "AUD", "JPY"];
    const currencyCode = validCurrencies.includes(cleanCurrency.toUpperCase())
      ? cleanCurrency.toUpperCase()
      : "USD";

    try {
      // Parse amount to ensure it's a number
      const numAmount = parseFloat(amount) || 0;

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 3, // Always show 3 decimal places
        maximumFractionDigits: 3, // Exactly 3 decimal places, not more
      }).format(numAmount);
    } catch (error) {
      // Fallback if currency is still invalid
      return `${currencyCode} ${(parseFloat(amount) || 0).toFixed(3)}`;
    }
  };

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
        console.log(res.data);
        setCapTableData(capTable);
        setConversionStatus(res.data.conversion_status);
        setRoundData(res.data.round || null);
        setPendingConversions(res.data.pending_conversions || []);
        setCalculations(res.data.calculations || {});
        console.log(res.data)
        // Calculate summary details based on CPAVATE formulas
        calculateSummaryDetails(res.data);

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
      } else {
        setError(res.data.message || "Failed to load cap table");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error loading cap table data");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  }, [id, userLogin, API_URL_CAPTABLE]);
  const isUnpricedRound = roundData?.instrument === 'Safe' || roundData?.instrument === 'Convertible Note';

  // ✅ CHECK KARO - CONVERT HUA HAI YA NHI
  const isConverted = conversionStatus?.is_converted === true;

  // ✅ DISPLAY VALUES
  let displaySharePrice = '';
  let displayIssuedShares = '';

  if (isUnpricedRound) {
    if (isConverted) {
      // ✅ CONVERTED HUA HAI - Conversion se values dikhao
      displaySharePrice = conversionStatus.conversion_price;
      displayIssuedShares = conversionStatus.converted_shares;
    } else {
      // ❌ CONVERT NAHI HUA - N/A dikhao
      displaySharePrice = 'N/A';
      displayIssuedShares = 'N/A';
    }
  } else {
    // ✅ PRICED ROUND (Common/Preferred) - Normal values
    displaySharePrice = roundData?.share_price;
    displayIssuedShares = roundData?.issued_shares;
  }
  // Calculate summary details based on CPAVATE formulas
  const calculateSummaryDetails = (data) => {
    if (!data.cap_table || !data.round) return;

    const preMoneyTable = data.cap_table.pre_money;
    const postMoneyTable = data.cap_table.post_money;
    const round = data.round;

    const preMoneyVal = parseFloat(round.pre_money) || 0;
    const investment = parseFloat(round.investment) || 0;
    const postMoneyVal = preMoneyVal + investment;

    const totalSharesPre = preMoneyTable.totals.total_shares || 0;
    const totalSharesPost = postMoneyTable.totals.total_shares || 0;

    const sharePricePre = totalSharesPre > 0 ? preMoneyVal / totalSharesPre : 0;
    const sharePricePost = totalSharesPost > 0 ? postMoneyVal / totalSharesPost : 0;

    // Calculate founder values (like $540,000)
    const founderShares = preMoneyTable.items.filter(item => item.type === 'founder').reduce((sum, item) => sum + item.shares, 0);
    const founderValuePre = founderShares * sharePricePre;
    const founderValuePost = founderShares * sharePricePost;

    // Calculate investor values
    const investorShares = postMoneyTable.items.filter(item => item.type === 'investor').reduce((sum, item) => sum + item.shares, 0);
    const investorValue = investorShares * sharePricePost;

    // Calculate option pool values
    const optionPoolShares = postMoneyTable.totals.total_option_pool || 0;
    const optionPoolValue = optionPoolShares * sharePricePost;

    setSummaryDetails({
      founderValuePre: founderValuePre,
      founderValuePost: founderValuePost,
      investorValue: investorValue,
      optionPoolValue: optionPoolValue,
      sharePricePre: sharePricePre,
      sharePricePost: sharePricePost,
      totalSharesPre: totalSharesPre,
      totalSharesPost: totalSharesPost,
    });
  };

  useEffect(() => {
    getCapTableData();
  }, []);
  function formatCurrentDate(input) {
    const date = new Date(input);

    if (isNaN(date)) return "";

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];


    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const getOrdinal = (n) => {
      if (n >= 11 && n <= 13) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12

    return `${month} ${day}${getOrdinal(
      day
    )}, ${year} ${hours}:${minutes} ${ampm}`;
  }
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
                        <p><strong>Date:</strong> {formatCurrentDate(roundData.date) || 'Not specified'}</p>
                      </div>
                      {roundData?.type !== 'Round 0' && (
                        <div className="col-md-4">
                          <p><strong>Pre-Money:</strong> {formatCurrency(roundData.pre_money, roundData.currency)}</p>
                          <p><strong>Investment:</strong> {formatCurrency(roundData.investment, roundData.currency)}</p>
                          <p><strong>Post-Money:</strong> {formatCurrency(roundData.post_money, roundData.currency)}</p>
                        </div>
                      )}
                      <div className="col-md-4">
                        <p><strong>Share Price:</strong> {
                          isUnpricedRound && !isConverted
                            ? 'N/A'
                            : formatCurrencyNotRound(displaySharePrice, roundData?.currency)
                        }</p>

                        <p><strong>Issued Shares:</strong> {
                          isUnpricedRound && !isConverted
                            ? 'N/A'
                            : formatNumber(displayIssuedShares)
                        }</p>

                        {/* ✅ CONVERSION STATUS MESSAGE */}
                        {isUnpricedRound && (
                          <p>
                            <strong>Status:</strong>{' '}
                            <span className={isConverted ? 'text-success' : 'text-warning'}>
                              {conversionStatus?.message || (isConverted ? '✅ Converted' : '⏳ Not Converted')}
                            </span>
                          </p>
                        )}

                        {/* ✅ IF CONVERTED - SHOW CONVERSION DETAILS */}
                        {isUnpricedRound && isConverted && (
                          <div className="mt-2 p-2 bg-light rounded">
                            <small>
                              <strong>Converted in:</strong> Round {conversionStatus.converted_in_round} ({conversionStatus.converted_round_name})<br />
                              <strong>Conversion Price:</strong> {formatCurrencyNotRound(conversionStatus.conversion_price, roundData?.currency)}<br />
                              <strong>Converted Shares:</strong> {formatNumber(conversionStatus.converted_shares)}
                            </small>
                          </div>
                        )}
                        {roundData?.type !== 'Round 0' && (
                          <p><strong>Option Pool:</strong> {formatPercentage(roundData.option_pool_percent || 0)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* ===== CONVERTIBLE INSTRUMENTS SECTION ===== */}

              {/* Tab Navigation */}
              <div className="mb-4">
                <ul className="nav nav-tabs gap-1">
                  {roundData?.type !== 'Round 0' && (
                    <li className="nav-item bg-primary">
                      <button
                        className={`nav-link text-white backcolor ${activeTab === 'pre-money' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pre-money')}
                      >
                        Pre-Money Cap Table
                      </button>
                    </li>
                  )}
                  {roundData?.type !== 'Round 0' && (
                    <li className="nav-item bg-primary">
                      <button
                        className={`nav-link text-white backcolor ${activeTab === 'post-money' ? 'active' : ''}`}
                        onClick={() => setActiveTab('post-money')}
                      >
                        Post-Money Cap Table
                      </button>
                    </li>
                  )}
                  {roundData?.type !== 'Round 0' && (
                    <li className="nav-item bg-primary">
                      <button
                        className={`nav-link text-white backcolor ${activeTab === 'summary' ? 'active' : ''}`}
                        onClick={() => setActiveTab('summary')}
                      >
                        Chat & Analysis
                      </button>
                    </li>
                  )}
                  {pendingConversions.length > 0 && (
                    <li className="nav-item bg-primary">
                      <button
                        className={`nav-link  text-white backcolor ${activeTab === 'pending' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pending')}
                      >
                        Pending Conversions
                      </button>
                    </li>
                  )}
                </ul>
              </div>

              {/* Pre-Money Cap Table */}
              {/* Pre-Money Cap Table - FIXED */}
              {activeTab === 'pre-money' && (
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Pre-Money Capitalization Table</h5>
                    <small className="text-muted">Share ownership before this round's investment</small>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive mt-4">
                      <table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Founder</th>
                            <th className="text-end">Shares</th>
                            <th className="text-end">Ownership %</th>
                            <th className="text-end">Currency Value</th>
                            {/* <th className="text-end">Share Price</th> */}
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* ✅ FOUNDERS - FIXED VALUE DISPLAY */}
                          {capTableData.pre_money.items
                            .filter(item => item.type === 'founder')
                            .map((item, index) => {
                              const isRound0 = roundData?.type === 'Round 0';
                              return (
                                <tr key={index}>
                                  <td>
                                    <span className="badge bg-info me-2">
                                      {item.founder_code || `F${index + 1}`}
                                    </span>
                                  </td>
                                  <td>
                                    <div>
                                      <strong>{item.name}</strong>
                                      {item.email && <div className="small text-muted">{item.email}</div>}
                                    </div>
                                  </td>
                                  <td className="text-end">{formatNumber(item.shares)}</td>
                                  <td className="text-end">{formatPercentage(item.percentage)}</td>

                                  {/* 🎯 CURRENCY VALUE - FIXED */}
                                  <td className="text-end">
                                    {isRound0 ? (
                                      <span>{formatCurrency(item.value, roundData?.currency)}</span>
                                    ) : (
                                      <span className="fw-bold text-primary">
                                        {formatCurrency(item.pre_money_display_value || item.value, roundData?.currency)}
                                      </span>
                                    )}
                                  </td>

                                  {/* <td className="text-end">
                                    {isRound0 ? (
                                      <span>{formatCurrencyNotRound(item.share_price, roundData?.currency)}</span>
                                    ) : (
                                      <span className="text-primary">
                                        {formatCurrencyNotRound(item.pre_money_display_share_price, roundData?.currency)}
                                      </span>
                                    )}
                                  </td> */}
                                  <td>
                                    <div className="small">
                                      <div>Type: {item.share_type || 'common'}</div>
                                      <div>Voting: {item.voting || 'voting'}</div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}

                          {/* ✅ OTHER TYPES (INVESTORS, OPTION POOL) */}
                          {roundData?.type !== 'Round 0' && capTableData.pre_money.items
                            .filter(item => item.type !== 'founder' && item.type !== 'pending')
                            .map((item, index) => (
                              <tr key={`other-${index}`}>
                                <td>
                                  <span className={`badge ${item.type === 'investor' ? 'bg-success' : 'bg-warning'} me-2`}>
                                    {item.type === 'investor' ? 'I' : 'O'}
                                  </span>
                                </td>
                                <td>{item.name}</td>
                                <td className="text-end">{formatNumber(item.shares)}</td>
                                <td className="text-end">{formatPercentage(item.percentage)}</td>
                                <td className="text-end fw-bold text-primary">
                                  {formatCurrency(item.pre_money_display_value || item.value, roundData?.currency)}
                                </td>
                                {/* <td className="text-end text-primary">
                                  {formatCurrencyNotRound(item.pre_money_display_share_price, roundData?.currency)}
                                </td> */}
                                <td>{item.round_name}</td>
                              </tr>
                            ))}
                        </tbody>

                        {/* ✅ FOOTER - FIXED TOTAL VALUE */}
                        <tfoot className="table-light">
                          <tr>
                            <th colSpan="2">TOTAL</th>
                            <th className="text-end">{formatNumber(capTableData.pre_money.totals.total_shares)}</th>
                            <th className="text-end">100%</th>
                            <th className="text-end">
                              {roundData?.type === 'Round 0'
                                ? formatCurrency(capTableData.pre_money.totals.total_value, roundData?.currency)
                                : formatCurrency(capTableData.pre_money.totals.pre_money_valuation, roundData?.currency)
                              }
                              {roundData?.type !== 'Round 0' && (
                                <div className="small text-muted">
                                  Original: {formatCurrency(capTableData.pre_money.totals.original_total_value, roundData?.currency)}
                                </div>
                              )}
                            </th>
                            <th></th>
                            <th></th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Post-Money Cap Table */}
              {/* Post-Money Cap Table - FIXED */}
              {activeTab === 'post-money' && (
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
                            <th className="text-end">New Shares</th>
                            <th className="text-end">Ownership %</th>
                            <th className="text-end">Currency Value</th>
                            {/* <th className="text-end">Share Price</th> */}
                            <th>Round</th>
                          </tr>
                        </thead>
                        <tbody>
                          {capTableData.post_money.items
                            .filter(item => item.type !== 'pending')
                            .map((item, index) => {
                              const isSeedRound = roundData?.instrument === 'Safe' && roundData?.issued_shares === 0;
                              const isSeriesA = roundData?.instrument === 'Preferred Equity';

                              return (
                                <tr key={index}>
                                  <td>
                                    <span className={`badge ${item.type === 'founder' ? 'bg-info' :
                                      item.type === 'investor' ? 'bg-success' :
                                        item.type === 'option_pool' ? 'bg-warning' : 'bg-secondary'
                                      } me-2`}>
                                      {item.type === 'founder' ? 'F' :
                                        item.type === 'investor' ? 'I' :
                                          item.type === 'option_pool' ? 'O' : 'P'}
                                    </span>
                                    {item.name}
                                    {item.is_converted && (
                                      <span className="badge bg-info ms-2">Converted</span>
                                    )}
                                    {item.is_new_investment && (
                                      <span className="badge bg-success ms-2">New</span>
                                    )}
                                  </td>
                                  <td className="text-end">{formatNumber(item.shares)}</td>
                                  <td className="text-end">
                                    {item.new_shares > 0 ? (
                                      <span className="badge bg-success">+{formatNumber(item.new_shares)}</span>
                                    ) : '—'}
                                  </td>
                                  <td className="text-end">{formatPercentage(item.percentage)}</td>

                                  {/* 🎯 CPAVATE VALUE - Percentage × Post-money Valuation */}
                                  <td className="text-end fw-bold">
                                    {formatCurrency(item.value, roundData?.currency)}
                                  </td>

                                  {/* <td className="text-end">
                                    {formatCurrencyNotRound(item.share_price, roundData?.currency)}
                                  </td> */}
                                  <td>
                                    {item.round_name}
                                    {item.is_converted && (
                                      <div className="small text-muted">
                                        Original: {formatCurrency(item.investment, roundData?.currency)}
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}

                          {/* ✅ PENDING ITEMS - N/A DISPLAY */}
                          {capTableData.post_money.items
                            .filter(item => item.type === 'pending')
                            .map((item, index) => (
                              <tr key={`pending-${index}`} className="table-warning">
                                <td>
                                  <span className="badge bg-warning me-2">⏳</span>
                                  {item.name}
                                </td>
                                <td className="text-end text-muted">N/A</td>
                                <td className="text-end text-muted">—</td>
                                <td className="text-end text-muted">0.00%</td>
                                <td className="text-end text-muted">N/A</td>

                                <td>
                                  <small>
                                    Investment: {formatCurrency(item.investment, roundData?.currency)}
                                    {item.discount_rate && <div>Discount: {item.discount_rate}%</div>}
                                    {item.valuation_cap > 0 && <div>Cap: {formatCurrency(item.valuation_cap, roundData?.currency)}</div>}
                                  </small>
                                </td>
                              </tr>
                            ))}
                        </tbody>

                        {/* ✅ FOOTER - FIXED TOTALS */}
                        <tfoot className="table-light">
                          <tr>
                            <th>TOTAL</th>
                            <th className="text-end">{formatNumber(capTableData.post_money.totals.total_shares)}</th>
                            <th className="text-end">
                              <span className="badge bg-success">
                                +{formatNumber(capTableData.post_money.totals.total_new_shares || 0)}
                              </span>
                            </th>
                            <th className="text-end">100%</th>
                            {/* <th className="text-end">
                              {formatCurrency(capTableData.post_money.totals.total_value, roundData?.currency)}
                            </th> */}
                            <th className="text-end">
                              {formatCurrencyNotRound(
                                capTableData.post_money.totals.total_value / capTableData.post_money.totals.total_shares,
                                roundData?.currency
                              )}
                            </th>
                            <th></th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* ✅ POST-MONEY SUMMARY CARDS - FIXED */}
                    <div className="row mt-4">
                      <div className="col-md-2">
                        <div className="card bg-primary text-white">
                          <div className="card-body text-center">
                            <h6 className="card-subtitle mb-2">Total Shares</h6>
                            <h4 className="card-title">{formatNumber(capTableData.post_money.totals.total_shares)}</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card bg-success text-white">
                          <div className="card-body text-center">
                            <h6 className="card-subtitle mb-2">New Shares</h6>
                            <h4 className="card-title">+{formatNumber(capTableData.post_money.totals.total_new_shares || 0)}</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card bg-info text-white">
                          <div className="card-body text-center">
                            <h6 className="card-subtitle mb-2">Founders</h6>
                            <h4 className="card-title">
                              {formatPercentage(
                                (capTableData.post_money.totals.total_founders / capTableData.post_money.totals.total_shares) * 100
                              )}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card bg-warning text-white">
                          <div className="card-body text-center">
                            <h6 className="card-subtitle mb-2">Investors</h6>
                            <h4 className="card-title">
                              {formatPercentage(
                                (capTableData.post_money.totals.total_investors / capTableData.post_money.totals.total_shares) * 100
                              )}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card bg-secondary text-white">
                          <div className="card-body text-center">
                            <h6 className="card-subtitle mb-2">Option Pool</h6>
                            <h4 className="card-title">
                              {formatPercentage(
                                (capTableData.post_money.totals.total_option_pool / capTableData.post_money.totals.total_shares) * 100
                              )}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="card bg-dark text-white">
                          <div className="card-body text-center">
                            <h6 className="card-subtitle mb-2">Total Value</h6>
                            <h4 className="card-title">{formatCurrency(capTableData.post_money.totals.total_value, roundData?.currency)}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Round 0 Pie Chart - FULLY FIXED */}
              {roundData?.type === 'Round 0' && (
                <div className="row mb-4">
                  <div className="col-md-12">
                    <div className="card border-0 shadow-sm">
                      <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                        <div>
                          <h5 className="mb-0 fw-bold text-dark">
                            <i className="bi bi-pie-chart-fill text-primary me-2"></i>
                            Founder Ownership Distribution - Round 0
                          </h5>
                          <p className="text-muted mb-0 small">Initial share allocation at incorporation</p>
                        </div>
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                          <i className="bi bi-shield me-1"></i>
                          {formatNumber(capTableData?.pre_money?.totals?.total_shares || 0)} Total Shares
                        </span>
                      </div>

                      <div className="card-body p-4">
                        <div className="row">
                          {/* Left Column - Pie Chart */}
                          <div className="col-md-7">
                            <div style={{ height: '400px', position: 'relative' }}>
                              <Pie
                                data={{
                                  labels: capTableData.pre_money.items
                                    .filter(item => item.type === 'founder')
                                    .map(item => {
                                      if (item.founder_code) {
                                        return `${item.founder_code} - ${item.name}`;
                                      }
                                      return item.name || `Founder ${capTableData.pre_money.items.indexOf(item) + 1}`;
                                    }),
                                  datasets: [
                                    {
                                      data: capTableData.pre_money.items
                                        .filter(item => item.type === 'founder')
                                        .map(item => item.shares),
                                      backgroundColor: [
                                        '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e',
                                        '#e74a3b', '#6f42c1', '#fd7e14', '#20c9a6',
                                        '#858796', '#5a5c69', '#2c9faf', '#b58df1'
                                      ],
                                      borderWidth: 2,
                                      borderColor: '#ffffff',
                                    }
                                  ]
                                }}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  cutout: '60%',
                                  plugins: {
                                    // ✅ PERCENTAGE LABELS ON CHART
                                    datalabels: {
                                      display: function (context) {
                                        const dataset = context.dataset;
                                        const total = dataset.data.reduce((a, b) => a + b, 0);
                                        const currentValue = dataset.data[context.dataIndex];
                                        const percentage = (currentValue / total) * 100;
                                        return percentage >= 5; // Only show for slices >= 5%
                                      },
                                      formatter: function (value, context) {
                                        const dataset = context.dataset;
                                        const total = dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        return `${percentage}%`;
                                      },
                                      color: '#ffffff',
                                      font: {
                                        weight: 'bold',
                                        size: 13
                                      },
                                      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                      padding: 8,
                                      backgroundColor: 'rgba(0,0,0,0.4)',
                                      borderRadius: 6,
                                    },

                                    // ✅ LEGEND SETTINGS
                                    legend: {
                                      position: 'bottom',
                                      labels: {
                                        padding: 20,
                                        usePointStyle: true,
                                        pointStyle: 'circle',
                                        font: {
                                          size: 12,
                                          weight: '500'
                                        },
                                        generateLabels: function (chart) {
                                          const data = chart.data;
                                          if (data.labels.length && data.datasets.length) {
                                            return data.labels.map((label, i) => {
                                              const value = data.datasets[0].data[i];
                                              const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                              const item = capTableData?.pre_money?.items?.[i];

                                              let displayLabel = label;
                                              let sharesInfo = '';

                                              if (item) {
                                                sharesInfo = ` (${formatNumber(item.shares)} shares)`;
                                              }

                                              return {
                                                text: `${displayLabel}${sharesInfo} - ${percentage}%`,
                                                fillStyle: data.datasets[0].backgroundColor[i],
                                                strokeStyle: data.datasets[0].backgroundColor[i],
                                                lineWidth: 1,
                                                hidden: chart.getDatasetMeta(0).data[i].hidden,
                                                index: i,
                                                fontColor: '#2c3e50'
                                              };
                                            });
                                          }
                                          return [];
                                        }
                                      }
                                    },

                                    // ✅ TOOLTIP SETTINGS
                                    tooltip: {
                                      backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                      titleColor: '#ffffff',
                                      bodyColor: '#ffffff',
                                      borderColor: 'rgba(255,255,255,0.2)',
                                      borderWidth: 1,
                                      cornerRadius: 8,
                                      padding: 12,
                                      displayColors: true,
                                      callbacks: {
                                        label: function (context) {
                                          const label = context.label || '';
                                          const value = context.parsed || 0;
                                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                          const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                                          const itemIndex = context.dataIndex;
                                          const item = capTableData?.pre_money?.items?.[itemIndex];

                                          return [
                                            `📊 ${label}`,
                                            `Shares: ${formatNumber(value)}`,
                                            `Ownership: ${percentage}%`,
                                            `Value: ${formatCurrency(item?.value || 0, roundData?.currency)}`,
                                            `Price/Share: ${formatCurrencyNotRound(item?.share_price || 0.01, roundData?.currency)}`
                                          ];
                                        },
                                        title: function (tooltipItems) {
                                          const index = tooltipItems[0].dataIndex;
                                          const item = capTableData?.pre_money?.items?.[index];
                                          if (item?.type === 'founder') {
                                            return `👤 Founder: ${item.founder_code || ''} ${item.name}`.trim();
                                          }
                                          return tooltipItems[0].label;
                                        }
                                      }
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>

                          {/* Right Column - Founder Details */}
                          <div className="col-md-5">
                            <div className="bg-light bg-opacity-50 rounded-3 p-4 h-100">
                              <h6 className="fw-bold mb-3 d-flex align-items-center">
                                <i className="bi bi-people-fill me-2 text-primary"></i>
                                Founder Details & Ownership
                              </h6>

                              {/* Founder List with Progress Bars */}
                              <div className="founder-list" style={{ maxHeight: '320px', overflowY: 'auto' }}>
                                {capTableData?.pre_money?.items
                                  ?.filter(item => item.type === 'founder')
                                  .map((item, index) => {
                                    const totalShares = capTableData.pre_money.totals.total_shares || 1;
                                    const percentage = ((item.shares || 0) / totalShares * 100).toFixed(1);
                                    const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'];
                                    const color = colors[index % colors.length];

                                    return (
                                      <div key={index} className="d-flex align-items-center mb-3 p-3 bg-white rounded-3 shadow-sm">
                                        {/* Founder Avatar/Initial */}
                                        <div
                                          className="me-3 flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle"
                                          style={{
                                            width: '48px',
                                            height: '48px',
                                            backgroundColor: `${color}20`,
                                            color: color,
                                            fontSize: '18px',
                                            fontWeight: 'bold'
                                          }}
                                        >
                                          {item.founder_code || `F${index + 1}`}
                                        </div>

                                        {/* Founder Info */}
                                        <div className="flex-grow-1">
                                          <div className="d-flex justify-content-between align-items-center mb-1">
                                            <span className="fw-semibold">{item.name}</span>
                                            <span className="badge" style={{ backgroundColor: color, color: 'white' }}>
                                              {percentage}%
                                            </span>
                                          </div>

                                          <div className="d-flex justify-content-between align-items-center small">
                                            <span className="text-muted">
                                              {formatNumber(item.shares || 0)} shares
                                            </span>
                                            {item.email && (
                                              <span className="text-muted text-truncate" style={{ maxWidth: '150px' }}>
                                                {item.email}
                                              </span>
                                            )}
                                          </div>

                                          {/* Progress Bar */}
                                          <div className="progress mt-2" style={{ height: '6px', backgroundColor: '#e9ecef' }}>
                                            <div
                                              className="progress-bar"
                                              role="progressbar"
                                              style={{
                                                width: `${percentage}%`,
                                                backgroundColor: color,
                                                transition: 'width 0.3s ease'
                                              }}
                                              aria-valuenow={percentage}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            />
                                          </div>

                                          {/* Additional Info */}
                                          <div className="d-flex mt-2 small text-muted">
                                            <span className="me-3">
                                              <i className="bi bi-tag me-1"></i>
                                              {item.share_type || 'common'}
                                            </span>
                                            <span>
                                              <i className="bi bi-check-circle me-1"></i>
                                              {item.voting || 'voting'}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>

                              {/* Total Summary Card */}
                              <div className="mt-3 pt-3 border-top">
                                <div className="bg-white rounded-3 p-3">
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="d-flex flex-column">
                                        <small className="text-muted">Total Founders</small>
                                        <span className="fw-bold h5 mb-0">
                                          {capTableData?.pre_money?.items?.filter(item => item.type === 'founder').length || 0}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="d-flex flex-column">
                                        <small className="text-muted">Total Shares</small>
                                        <span className="fw-bold h5 mb-0">
                                          {formatNumber(capTableData?.pre_money?.totals?.total_shares || 0)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-6 mt-2">
                                      <div className="d-flex flex-column">
                                        <small className="text-muted">Share Price</small>
                                        <span className="fw-bold text-primary">
                                          {formatCurrencyNotRound(roundData?.share_price || 0.01, roundData?.currency)}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-6 mt-2">
                                      <div className="d-flex flex-column">
                                        <small className="text-muted">Total Value</small>
                                        <span className="fw-bold text-success">
                                          {formatCurrency(capTableData?.pre_money?.totals?.total_value || 0, roundData?.currency)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* CPAVATE Summary Tab */}
              {activeTab === 'summary' && summaryDetails && (
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">CPAVATE Calculation Summary</h5>
                    <small className="text-muted">Detailed breakdown based on CPAVATE formulas</small>
                  </div>
                  <div className="card-body">
                    {/* Key Metrics */}
                    <div className="row mb-4">
                      <div className="col-md-4">
                        <div className="card bg-light">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Pre-Money Valuation</h6>
                            <h4 className="card-title text-primary">{formatCurrency(calculations.pre_money_valuation, roundData?.currency)}</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-light">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Investment</h6>
                            <h4 className="card-title text-success">{formatCurrency(roundData?.investment, roundData?.currency)}</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="card bg-light">
                          <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">Post-Money Valuation</h6>
                            <h4 className="card-title text-info">{formatCurrency(calculations.post_money_valuation, roundData?.currency)}</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Share Details */}
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-header">
                            <h6 className="mb-0">Share Price Calculation</h6>
                          </div>
                          <div className="card-body">
                            <div className="mb-3">
                              <p className="mb-1"><strong>Pre-Money Share Price:</strong></p>
                              <p className="mb-0">
                                {formatCurrency(calculations.pre_money_valuation, roundData?.currency)} ÷ {formatNumber(summaryDetails.totalSharesPre)} shares =
                                <strong className="ms-2">{formatCurrencyNotRound(summaryDetails.sharePricePre, roundData?.currency)}</strong>
                              </p>
                            </div>
                            <div className="mb-3">
                              <p className="mb-1"><strong>Post-Money Share Price:</strong></p>
                              <p className="mb-0">
                                {formatCurrency(calculations.post_money_valuation, roundData?.currency)} ÷ {formatNumber(summaryDetails.totalSharesPost)} shares =
                                <strong className="ms-2">{formatCurrencyNotRound(summaryDetails.sharePricePost, roundData?.currency)}</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-header">
                            <h6 className="mb-0">Shareholder Values</h6>
                          </div>
                          <div className="card-body">
                            <div className="mb-3">
                              <p className="mb-1"><strong>Founder Value (Pre-Money):</strong></p>
                              <p className="mb-0">
                                {formatNumber(capTableData.pre_money.totals.total_founders)} shares × {formatCurrencyNotRound(summaryDetails.sharePricePre, roundData?.currency)} =
                                <strong className="ms-2 text-primary">{formatCurrency(summaryDetails.founderValuePre, roundData?.currency)}</strong>
                              </p>
                            </div>
                            <div className="mb-3">
                              <p className="mb-1"><strong>Founder Value (Post-Money):</strong></p>
                              <p className="mb-0">
                                {formatNumber(capTableData.post_money.totals.total_founders)} shares × {formatCurrencyNotRound(summaryDetails.sharePricePost, roundData?.currency)} =
                                <strong className="ms-2 text-success">{formatCurrency(summaryDetails.founderValuePost, roundData?.currency)}</strong>
                              </p>
                            </div>
                            <div className="mb-3">
                              <p className="mb-1"><strong>Investor Value (Post-Money):</strong></p>
                              <p className="mb-0">
                                {formatNumber(capTableData.post_money.totals.total_investors)} shares × {formatCurrencyNotRound(summaryDetails.sharePricePost, roundData?.currency)} =
                                <strong className="ms-2 text-warning">{formatCurrency(summaryDetails.investorValue, roundData?.currency)}</strong>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="card mb-4">
                      <div className="card-header">
                        <h6 className="mb-0">Detailed Ownership Breakdown</h6>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th>Shareholder Type</th>
                                <th className="text-end">Shares</th>
                                <th className="text-end">% Ownership</th>
                                <th className="text-end">Value (Post-Money)</th>
                                <th className="text-end">Value per Share</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td><strong>Founders</strong></td>
                                <td className="text-end">{formatNumber(capTableData.post_money.totals.total_founders)}</td>
                                <td className="text-end">{formatPercentage(
                                  (capTableData.post_money.totals.total_founders / summaryDetails.totalSharesPost) * 100
                                )}</td>
                                <td className="text-end text-primary">{formatCurrency(summaryDetails.founderValuePost, roundData?.currency)}</td>
                                <td className="text-end">{formatCurrencyNotRound(summaryDetails.sharePricePost, roundData?.currency)}</td>
                              </tr>
                              <tr>
                                <td><strong>Investors</strong></td>
                                <td className="text-end">{formatNumber(capTableData.post_money.totals.total_investors)}</td>
                                <td className="text-end">{formatPercentage(
                                  (capTableData.post_money.totals.total_investors / summaryDetails.totalSharesPost) * 100
                                )}</td>
                                <td className="text-end text-success">{formatCurrency(summaryDetails.investorValue, roundData?.currency)}</td>
                                <td className="text-end">{formatCurrencyNotRound(summaryDetails.sharePricePost, roundData?.currency)}</td>
                              </tr>
                              <tr>
                                <td><strong>Option Pool</strong></td>
                                <td className="text-end">{formatNumber(capTableData.post_money.totals.total_option_pool)}</td>
                                <td className="text-end">{formatPercentage(
                                  (capTableData.post_money.totals.total_option_pool / summaryDetails.totalSharesPost) * 100
                                )}</td>
                                <td className="text-end text-warning">{formatCurrency(summaryDetails.optionPoolValue, roundData?.currency)}</td>
                                <td className="text-end">{formatCurrencyNotRound(summaryDetails.sharePricePost, roundData?.currency)}</td>
                              </tr>
                              <tr className="table-active">
                                <td><strong>TOTAL</strong></td>
                                <td className="text-end"><strong>{formatNumber(summaryDetails.totalSharesPost)}</strong></td>
                                <td className="text-end"><strong>100%</strong></td>
                                <td className="text-end"><strong>{formatCurrency(summaryDetails.totalSharesPost * summaryDetails.sharePricePost, roundData?.currency)}</strong></td>
                                <td className="text-end"><strong>{formatCurrencyNotRound(summaryDetails.sharePricePost, roundData?.currency)}</strong></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Charts */}
                    {(preMoneyChartData || postMoneyChartData) && (
                      <div className="row">
                        {/* Pre-Money Chart */}
                        {preMoneyChartData && (
                          <div className="col-md-6">
                            <div className="card">
                              <div className="card-header d-flex justify-content-between align-items-center">
                                <h6 className="mb-0">Pre-Money Distribution</h6>
                                <span className="badge bg-primary">
                                  Total: {formatNumber(capTableData?.pre_money?.totals?.total_shares || 0)} shares
                                </span>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  {/* Chart - Left Side */}
                                  <div className="col-md-12" style={{ height: '300px' }}>
                                    <Pie
                                      data={preMoneyChartData}
                                      options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        cutout: '50%',
                                        plugins: {
                                          datalabels: {
                                            display: function (context) {
                                              const dataset = context.dataset;
                                              const total = dataset.data.reduce((a, b) => a + b, 0);
                                              const currentValue = dataset.data[context.dataIndex];
                                              const percentage = (currentValue / total) * 100;
                                              return percentage >= 3; // Only show for slices >= 3%
                                            },
                                            formatter: function (value, context) {
                                              const dataset = context.dataset;
                                              const total = dataset.data.reduce((a, b) => a + b, 0);
                                              const percentage = ((value / total) * 100).toFixed(1);
                                              return percentage + '%';
                                            },
                                            color: '#fff',
                                            font: {
                                              weight: 'bold',
                                              size: 11
                                            },
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                            padding: 6
                                          },
                                          legend: {
                                            display: false
                                          },
                                          tooltip: {
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            titleColor: '#fff',
                                            bodyColor: '#fff',
                                            borderColor: '#333',
                                            borderWidth: 1,
                                            cornerRadius: 6,
                                            padding: 12,
                                            displayColors: true,
                                            callbacks: {
                                              label: function (context) {
                                                const label = context.label || '';
                                                const value = context.parsed || 0;
                                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;

                                                const sharePrice = roundData?.share_price || 0;
                                                const valueAmount = value * sharePrice;

                                                return [
                                                  `${label}`,
                                                  `Shares: ${formatNumber(value)}`,
                                                  `Ownership: ${percentage}%`,
                                                  `Value: ${formatCurrency(valueAmount, roundData?.currency)}`,
                                                  `Price/Share: ${formatCurrencyNotRound(sharePrice, roundData?.currency)}`
                                                ];
                                              },
                                              title: function (tooltipItems) {
                                                const index = tooltipItems[0].dataIndex;
                                                const item = capTableData?.pre_money?.items?.[index];
                                                if (item?.type === 'founder') {
                                                  return `👤 Founder: ${item.name}`;
                                                } else if (item?.type === 'investor') {
                                                  return `💰 Investor: ${item.name}`;
                                                } else if (item?.type === 'option_pool') {
                                                  return `📊 Option Pool: ${item.name}`;
                                                }
                                                return tooltipItems[0].label;
                                              }
                                            }
                                          }
                                        }
                                      }}
                                    />
                                  </div>

                                  {/* Custom Legend with Permanent Percentage - Right Side */}
                                  <div className="col-md-12">
                                    <div className="chart-legend-permanent h-100">
                                      <h6 className="mb-3 text-center fw-semibold">Ownership Distribution</h6>
                                      <div className="legend-list" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                                        {capTableData?.pre_money?.items?.map((item, index) => {
                                          const total = capTableData.pre_money.totals.total_shares || 1;
                                          const percentage = ((item.shares || 0) / total * 100).toFixed(1);
                                          const colors = [
                                            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                                            '#9966FF', '#FF9F40', '#8AC926', '#1982C4',
                                            '#6A0572', '#118AB2', '#06D6A0', '#FFD166'
                                          ];
                                          const color = colors[index % colors.length];

                                          // Get display name
                                          let displayName = item.name;
                                          if (item.type === 'founder' && item.founder_code) {
                                            displayName = `${item.founder_code} - ${item.name}`;
                                          } else if (item.type === 'investor') {
                                            displayName = `💰 ${item.name}`;
                                          } else if (item.type === 'option_pool') {
                                            displayName = `📊 ${item.name}`;
                                          }

                                          return (
                                            <div key={index} className="legend-item d-flex align-items-center mb-2 p-2 border rounded">
                                              <div
                                                className="legend-color me-2 flex-shrink-0"
                                                style={{
                                                  width: '14px',
                                                  height: '14px',
                                                  borderRadius: '50%',
                                                  backgroundColor: color,
                                                  border: '2px solid #fff',
                                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }}
                                              ></div>
                                              <div className="legend-text flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center">
                                                  <small className="fw-semibold text-truncate" style={{ maxWidth: '100px' }}>
                                                    {displayName}
                                                  </small>
                                                  <span className="badge bg-primary ms-2">
                                                    {percentage}%
                                                  </span>
                                                </div>
                                                <small className="text-muted d-block">
                                                  {formatNumber(item.shares || 0)} shares
                                                </small>
                                                {item.type === 'founder' && item.email && (
                                                  <small className="text-muted d-block">
                                                    {item.email}
                                                  </small>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>

                                      {/* Total Summary */}
                                      <div className="legend-total mt-3 pt-3 border-top">
                                        <div className="d-flex justify-content-between mb-1">
                                          <small className="text-muted">Total Shares:</small>
                                          <small className="fw-semibold">
                                            {formatNumber(capTableData?.pre_money?.totals?.total_shares || 0)}
                                          </small>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                          <small className="text-muted">Share Price:</small>
                                          <small className="fw-semibold">
                                            {formatCurrencyNotRound(roundData?.share_price || 0, roundData?.currency)}
                                          </small>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                          <small className="text-muted">Total Value:</small>
                                          <small className="fw-semibold">
                                            {formatCurrency(capTableData?.pre_money?.totals?.total_value || 0, roundData?.currency)}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Chart Statistics */}
                                <div className="mt-3">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="text-center">
                                        <p className="mb-1 text-muted"><small>Total Shares</small></p>
                                        <h6 className="mb-0">{formatNumber(capTableData?.pre_money?.totals?.total_shares || 0)}</h6>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="text-center">
                                        <p className="mb-1 text-muted"><small>Share Price</small></p>
                                        <h6 className="mb-0">{formatCurrencyNotRound(roundData?.share_price || 0, roundData?.currency)}</h6>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="text-center">
                                        <p className="mb-1 text-muted"><small>Total Value</small></p>
                                        <h6 className="mb-0">{formatCurrency(capTableData?.pre_money?.totals?.total_value || 0, roundData?.currency)}</h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Post-Money Chart */}
                        {postMoneyChartData && (
                          <div className="col-md-6">
                            <div className="card">
                              <div className="card-header d-flex justify-content-between align-items-center">
                                <h6 className="mb-0">Post-Money Distribution</h6>
                                <span className="badge bg-success">
                                  Total: {formatNumber(capTableData?.post_money?.totals?.total_shares || 0)} shares
                                </span>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  {/* Chart - Left Side */}
                                  <div className="col-md-12" style={{ height: '300px' }}>
                                    <Pie
                                      data={postMoneyChartData}
                                      options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        cutout: '50%',
                                        plugins: {
                                          datalabels: {
                                            display: function (context) {
                                              const dataset = context.dataset;
                                              const total = dataset.data.reduce((a, b) => a + b, 0);
                                              const currentValue = dataset.data[context.dataIndex];
                                              const percentage = (currentValue / total) * 100;
                                              return percentage >= 3; // Only show for slices >= 3%
                                            },
                                            formatter: function (value, context) {
                                              const dataset = context.dataset;
                                              const total = dataset.data.reduce((a, b) => a + b, 0);
                                              const percentage = ((value / total) * 100).toFixed(1);
                                              return percentage + '%';
                                            },
                                            color: '#fff',
                                            font: {
                                              weight: 'bold',
                                              size: 11
                                            },
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                            padding: 6
                                          },
                                          legend: {
                                            display: false
                                          },
                                          tooltip: {
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            titleColor: '#fff',
                                            bodyColor: '#fff',
                                            borderColor: '#333',
                                            borderWidth: 1,
                                            cornerRadius: 6,
                                            padding: 12,
                                            displayColors: true,
                                            callbacks: {
                                              label: function (context) {
                                                const label = context.label || '';
                                                const value = context.parsed || 0;
                                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;

                                                const sharePrice = roundData?.share_price || 0;
                                                const valueAmount = value * sharePrice;

                                                return [
                                                  `${label}`,
                                                  `Shares: ${formatNumber(value)}`,
                                                  `Ownership: ${percentage}%`,
                                                  `Value: ${formatCurrency(valueAmount, roundData?.currency)}`,
                                                  `Price/Share: ${formatCurrencyNotRound(sharePrice, roundData?.currency)}`
                                                ];
                                              },
                                              title: function (tooltipItems) {
                                                const index = tooltipItems[0].dataIndex;
                                                const item = capTableData?.post_money?.items?.[index];

                                                if (item) {
                                                  if (item.type === 'founder') {
                                                    return `👤 Founder: ${item.name}`;
                                                  } else if (item.type === 'investor') {
                                                    return `💰 Investor: ${item.name}`;
                                                  } else if (item.type === 'option_pool') {
                                                    return `📊 Option Pool: ${item.name}`;
                                                  }
                                                }
                                                return tooltipItems[0].label;
                                              }
                                            }
                                          }
                                        }
                                      }}
                                    />
                                  </div>

                                  {/* Custom Legend with Permanent Percentage - Right Side */}
                                  <div className="col-md-12">
                                    <div className="chart-legend-permanent h-100">
                                      <h6 className="mb-3 text-center fw-semibold">Ownership Distribution</h6>
                                      <div className="legend-list" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                                        {capTableData?.post_money?.items?.map((item, index) => {
                                          const total = capTableData.post_money.totals.total_shares || 1;
                                          const percentage = ((item.shares || 0) / total * 100).toFixed(1);
                                          const colors = [
                                            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
                                            '#9966FF', '#FF9F40', '#8AC926', '#1982C4',
                                            '#6A0572', '#118AB2', '#06D6A0', '#FFD166'
                                          ];
                                          const color = colors[index % colors.length];

                                          // Get display name with emojis
                                          let displayName = item.name;
                                          let emoji = '';
                                          if (item.type === 'founder') {
                                            emoji = '👤 ';
                                            if (item.founder_code) {
                                              displayName = `${item.founder_code} - ${item.name}`;
                                            }
                                          } else if (item.type === 'investor') {
                                            emoji = '💰 ';
                                            if (item.is_converted) {
                                              displayName = `🔄 ${item.name} (Converted)`;
                                            } else if (item.is_new_investment) {
                                              displayName = `🆕 ${item.name}`;
                                            }
                                          } else if (item.type === 'option_pool') {
                                            emoji = '📊 ';
                                          } else if (item.type === 'pending') {
                                            emoji = '⏳ ';
                                          }

                                          return (
                                            <div key={index} className="legend-item d-flex align-items-center mb-2 p-2 border rounded">
                                              <div
                                                className="legend-color me-2 flex-shrink-0"
                                                style={{
                                                  width: '14px',
                                                  height: '14px',
                                                  borderRadius: '50%',
                                                  backgroundColor: color,
                                                  border: '2px solid #fff',
                                                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }}
                                              ></div>
                                              <div className="legend-text flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center">
                                                  <small className="fw-semibold text-truncate" style={{ maxWidth: '100px' }}>
                                                    {emoji}{displayName}
                                                  </small>
                                                  <span className="badge bg-success ms-2">
                                                    {percentage}%
                                                  </span>
                                                </div>
                                                <small className="text-muted d-block">
                                                  {formatNumber(item.shares || 0)} shares
                                                  {item.new_shares > 0 && (
                                                    <span className="text-success ms-2">
                                                      (+{formatNumber(item.new_shares)})
                                                    </span>
                                                  )}
                                                </small>
                                                {item.round_name && item.round_name !== 'Founding Share Allocation' && (
                                                  <small className="text-muted d-block">
                                                    {item.round_name}
                                                  </small>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>

                                      {/* Total Summary */}
                                      <div className="legend-total mt-3 pt-3 border-top">
                                        <div className="d-flex justify-content-between mb-1">
                                          <small className="text-muted">Total Shares:</small>
                                          <small className="fw-semibold">
                                            {formatNumber(capTableData?.post_money?.totals?.total_shares || 0)}
                                          </small>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                          <small className="text-muted">New Shares:</small>
                                          <small className="fw-semibold text-success">
                                            +{formatNumber(capTableData?.post_money?.totals?.total_new_shares || 0)}
                                          </small>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                          <small className="text-muted">Share Price:</small>
                                          <small className="fw-semibold">
                                            {formatCurrencyNotRound(roundData?.share_price || 0, roundData?.currency)}
                                          </small>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                          <small className="text-muted">Total Value:</small>
                                          <small className="fw-semibold">
                                            {formatCurrency(capTableData?.post_money?.totals?.total_value || 0, roundData?.currency)}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Post-Money Statistics */}
                                <div className="mt-3">
                                  <div className="row">
                                    <div className="col-md-3">
                                      <div className="text-center">
                                        <p className="mb-1 text-muted"><small>Total Shares</small></p>
                                        <h6 className="mb-0">{formatNumber(capTableData?.post_money?.totals?.total_shares || 0)}</h6>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="text-center">
                                        <p className="mb-1 text-muted"><small>New Shares</small></p>
                                        <h6 className="mb-0 text-success">
                                          +{formatNumber(capTableData?.post_money?.totals?.total_new_shares || 0)}
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="text-center">
                                        <p className="mb-1 text-muted"><small>Share Price</small></p>
                                        <h6 className="mb-0">{formatCurrencyNotRound(roundData?.share_price || 0, roundData?.currency)}</h6>
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="text-center">
                                        <p className="mb-1 text-muted"><small>Total Value</small></p>
                                        <h6 className="mb-0">{formatCurrency(capTableData?.post_money?.totals?.total_value || 0, roundData?.currency)}</h6>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Ownership Breakdown */}
                                  <div className="row mt-3">
                                    <div className="col-md-4">
                                      <div className="text-center">
                                        <p className="mb-1 text-muted"><small>Founders</small></p>
                                        <div className="d-flex justify-content-center align-items-center">
                                          <div className="rounded-circle bg-info me-2" style={{ width: '10px', height: '10px' }}></div>
                                          <h6 className="mb-0">
                                            {formatPercentage(
                                              (capTableData?.post_money?.totals?.total_founders /
                                                capTableData?.post_money?.totals?.total_shares) * 100 || 0
                                            )}
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="text-center">
                                        <p className="mb-1 text-muted"><small>Investors</small></p>
                                        <div className="d-flex justify-content-center align-items-center">
                                          <div className="rounded-circle bg-success me-2" style={{ width: '10px', height: '10px' }}></div>
                                          <h6 className="mb-0">
                                            {formatPercentage(
                                              (capTableData?.post_money?.totals?.total_investors /
                                                capTableData?.post_money?.totals?.total_shares) * 100 || 0
                                            )}
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="text-center">
                                        <p className="mb-1 text-muted"><small>Option Pool</small></p>
                                        <div className="d-flex justify-content-center align-items-center">
                                          <div className="rounded-circle bg-warning me-2" style={{ width: '10px', height: '10px' }}></div>
                                          <h6 className="mb-0">
                                            {formatPercentage(
                                              (capTableData?.post_money?.totals?.total_option_pool /
                                                capTableData?.post_money?.totals?.total_shares) * 100 || 0
                                            )}
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="col-md-12">
                          <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                              <h6 className="mb-0">Ownership Percentage Comparison</h6>
                              <div>
                                <span className="badge bg-primary me-2">Pre-Money</span>
                                <span className="badge bg-danger">Post-Money</span>
                              </div>
                            </div>
                            <div className="card-body">
                              <div style={{ height: '400px' }}>
                                <Bar
                                  data={{
                                    labels: capTableData?.pre_money?.items?.map(item => {
                                      // Shorten long names
                                      const name = item.name || '';
                                      return name.length > 20 ? name.substring(0, 20) + '...' : name;
                                    }) || [],
                                    datasets: [
                                      {
                                        label: 'Pre-Money %',
                                        data: capTableData?.pre_money?.items?.map(item => {
                                          const total = capTableData.pre_money.totals.total_shares || 1;
                                          return parseFloat(((item.shares || 0) / total * 100).toFixed(1));
                                        }) || [],
                                        backgroundColor: '#4e73df',
                                        borderColor: '#4e73df',
                                        borderWidth: 2,
                                        borderRadius: 5,
                                        barPercentage: 0.4
                                      },
                                      {
                                        label: 'Post-Money %',
                                        data: capTableData?.post_money?.items?.map(item => {
                                          const total = capTableData.post_money.totals.total_shares || 1;
                                          return parseFloat(((item.shares || 0) / total * 100).toFixed(1));
                                        }) || [],
                                        backgroundColor: '#e74a3b',
                                        borderColor: '#e74a3b',
                                        borderWidth: 2,
                                        borderRadius: 5,
                                        barPercentage: 0.4
                                      }
                                    ]
                                  }}
                                  options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                      legend: {
                                        position: 'top',
                                        labels: {
                                          boxWidth: 12,
                                          padding: 15,
                                          font: {
                                            size: 12
                                          }
                                        }
                                      },
                                      tooltip: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        titleColor: '#fff',
                                        bodyColor: '#fff',
                                        borderColor: '#333',
                                        borderWidth: 1,
                                        cornerRadius: 6,
                                        padding: 12,
                                        displayColors: true,
                                        callbacks: {
                                          label: function (context) {
                                            const label = context.dataset.label || '';
                                            const value = context.parsed.y || 0;

                                            // Find the item
                                            const itemIndex = context.dataIndex;
                                            const preItem = capTableData?.pre_money?.items?.[itemIndex];
                                            const postItem = capTableData?.post_money?.items?.[itemIndex];

                                            let tooltipText = `${label}: ${value}%`;

                                            if (preItem && postItem) {
                                              const preShares = preItem.shares || 0;
                                              const postShares = postItem.shares || 0;
                                              const shareDiff = postShares - preShares;

                                              if (shareDiff !== 0) {
                                                tooltipText += `\nShares Change: ${shareDiff > 0 ? '+' : ''}${formatNumber(shareDiff)}`;
                                              }
                                            }

                                            return tooltipText;
                                          },
                                          afterLabel: function (context) {
                                            const itemIndex = context.dataIndex;
                                            const item = capTableData?.post_money?.items?.[itemIndex];

                                            if (item?.type) {
                                              return `Type: ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}`;
                                            }
                                            return '';
                                          }
                                        }
                                      },
                                      datalabels: {
                                        display: true,
                                        formatter: function (value) {
                                          return value + '%';
                                        },
                                        color: '#fff',
                                        font: {
                                          weight: 'bold',
                                          size: 10
                                        },
                                        anchor: 'center',
                                        align: 'center'
                                      }
                                    },
                                    scales: {
                                      x: {
                                        grid: {
                                          display: false
                                        },
                                        title: {
                                          display: true,
                                          text: 'Stakeholders',
                                          font: {
                                            size: 12,
                                            weight: 'bold'
                                          }
                                        }
                                      },
                                      y: {
                                        beginAtZero: true,
                                        max: 100,
                                        ticks: {
                                          callback: function (value) {
                                            return value + '%';
                                          },
                                          stepSize: 10
                                        },
                                        title: {
                                          display: true,
                                          text: 'Ownership Percentage',
                                          font: {
                                            size: 12,
                                            weight: 'bold'
                                          }
                                        },
                                        grid: {
                                          color: 'rgba(0, 0, 0, 0.05)'
                                        }
                                      }
                                    }
                                  }}
                                />
                              </div>

                              {/* Summary Statistics */}
                              <div className="row mt-4">
                                <div className="col-md-4">
                                  <div className="card bg-light">
                                    <div className="card-body text-center">
                                      <h6 className="text-muted mb-2">Total Stakeholders</h6>
                                      <h3 className="mb-0">
                                        {capTableData?.pre_money?.items?.length || 0}
                                      </h3>
                                      <small className="text-muted">Same in Pre & Post</small>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="card bg-light">
                                    <div className="card-body text-center">
                                      <h6 className="text-muted mb-2">Avg Dilution</h6>
                                      <h3 className="mb-0">
                                        {(() => {
                                          const preTotal = capTableData?.pre_money?.totals?.total_shares || 1;
                                          const postTotal = capTableData?.post_money?.totals?.total_shares || 1;
                                          const dilution = ((postTotal - preTotal) / postTotal * 100).toFixed(1);
                                          return `${dilution}%`;
                                        })()}
                                      </h3>
                                      <small className="text-muted">For existing shareholders</small>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <div className="card bg-light">
                                    <div className="card-body text-center">
                                      <h6 className="text-muted mb-2">Largest Change</h6>
                                      <h3 className="mb-0">
                                        {(() => {
                                          let maxChange = 0;
                                          if (capTableData?.pre_money?.items && capTableData?.post_money?.items) {
                                            capTableData.pre_money.items.forEach((preItem, index) => {
                                              const postItem = capTableData.post_money.items[index];
                                              if (preItem && postItem) {
                                                const preTotal = capTableData.pre_money.totals.total_shares || 1;
                                                const postTotal = capTableData.post_money.totals.total_shares || 1;
                                                const prePercent = (preItem.shares / preTotal * 100);
                                                const postPercent = (postItem.shares / postTotal * 100);
                                                const change = Math.abs(postPercent - prePercent);
                                                if (change > maxChange) maxChange = change;
                                              }
                                            });
                                          }
                                          return `${maxChange.toFixed(1)}%`;
                                        })()}
                                      </h3>
                                      <small className="text-muted">Maximum percentage change</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Calculations Summary */}
              {roundData?.type !== 'Round 0' && (
                <div className="card mt-4">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">Valuation Summary</h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <p className="mb-1"><strong>Pre-Money Valuation</strong></p>
                        <h4>{formatCurrency(calculations.pre_money_valuation, roundData?.currency)}</h4>
                      </div>
                      <div className="col-md-4">
                        <p className="mb-1"><strong>Investment</strong></p>
                        <h4 className="text-success">{formatCurrency(roundData?.investment, roundData?.currency)}</h4>
                      </div>
                      <div className="col-md-4">
                        <p className="mb-1"><strong>Post-Money Valuation</strong></p>
                        <h4 className="text-info">{formatCurrency(calculations.post_money_valuation, roundData?.currency)}</h4>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Total Shares Outstanding</strong></p>
                        <h5>{formatNumber(calculations.total_shares_outstanding)}</h5>
                      </div>

                      <div className="col-md-6">
                        <p className="mb-1"><strong>Share Price</strong></p>
                        <h5>{
                          isUnpricedRound && !isConverted
                            ? 'N/A'
                            : formatCurrencyNotRound(displaySharePrice, roundData?.currency)
                        }</h5>
                      </div>



                    </div>
                  </div>
                </div>
              )}

              {/* Back Button */}
              <div className="mt-4">
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Rounds List
                </button>
                <button className="btn btn-primary ms-2" onClick={getCapTableData}>
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