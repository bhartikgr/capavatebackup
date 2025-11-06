import React, { useState, useEffect } from "react";
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
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function RecordRoundCaptable() {
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const userLogin = JSON.parse(storedUsername);
  const API_URL_CAPTABLE = API_BASE_URL + "api/user/capitalround/";
  document.title = "Round Cap Table";
  const { id } = useParams();

  const [capTableData, setCapTableData] = useState(null);
  const [roundData, setRoundData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    getCapTableData();
  }, [id]);

  const getCapTableData = async () => {
    setLoading(true);
    setError(null);

    let formData = {
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
      console.log(res.data.capTable)
      if (res.data.success) {
        setCapTableData(res.data.capTable);
        setRoundData(res.data.round);
      } else {
        setError(res.data.message || "Failed to load cap table");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error loading cap table data");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount, currency = "USD") => {
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
      }).format(amount || 0);
    } catch (error) {
      // Fallback if currency is still invalid
      return `${currencyCode} ${parseFloat(amount || 0).toFixed(2)}`;
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num || 0);
  };

  const formatPercentage = (percent) => {
    return `${(percent || 0).toFixed(2)}%`;
  };
  const RoundCapChart = ({ chartData }) => {
    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: { display: true, text: "Fully Diluted Ownership %" },
      },
      scales: {
        y: { beginAtZero: true, max: 100 },
      },
    };

    return (
      <div style={{ height: "300px" }}>
        <Bar data={chartData} options={options} />
      </div>
    );
  };
  const renderRoundZeroTable = () => {
    if (!capTableData) return null;

    // Check for error in Round 0 data
    if (capTableData.error) {
      return (
        <div className="alert alert-danger">
          <h5>Data Error</h5>
          <p>{capTableData.error}</p>
          <p className="mb-0">
            Please check Round 0 data structure. Founder allocation data is required.
          </p>
        </div>
      );
    }

    return (
      <div className="cap-table-section">
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">{capTableData.roundType}</h4>
            <small className="opacity-75">Company Incorporation - Founder Shares Allocation</small>
          </div>
          <div className="card-body">
            {/* Platform Inputs Summary */}
            <h5 className="mb-3">Platform Inputs</h5>
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Founder Share Allocation</small>
                  <h6>{capTableData.calculations.founderCount} Founders</h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Share Types</small>
                  <h6>Common Shares</h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Price Per Share</small>
                  <h6>{formatCurrency(capTableData.calculations.sharePrice, capTableData.currency)}</h6>
                </div>
              </div>
            </div>

            {/* Platform Outputs */}
            <h5 className="mb-3">Platform Outputs</h5>
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-success text-white">
                  <small>Total Shares Issued</small>
                  <h5>{formatNumber(capTableData.calculations.totalSharesIssued)}</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-info text-white">
                  <small>Total Company Value</small>
                  <h5>{formatCurrency(capTableData.calculations.totalValue, capTableData.currency)}</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-warning text-dark">
                  <small>Founder Count</small>
                  <h5>{capTableData.calculations.founderCount}</h5>
                </div>
              </div>
            </div>

            {/* Ownership Chart */}
            <div className="mb-4">
              <RoundCapChart chartData={capTableData.chartData} />
            </div>

            {/* Founder Share Allocation Table - CLIENT EXAMPLE के according */}
            <h5 className="mt-4 mb-3">Founder Share Allocation</h5>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Founder</th>
                    <th>Share Type</th>
                    <th>Voting Rights</th>
                    <th className="text-end">Shares</th>
                    <th className="text-end">Ownership %</th>
                    <th className="text-end">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {capTableData.shareholders.map((sh, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>F{idx + 1}</strong>
                      </td>
                      <td>
                        <span className="badge bg-secondary text-capitalize">
                          {sh.shareType || 'common'} shares
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${sh.votingRights === 'voting' ? 'bg-success' : 'bg-warning'}`}>
                          {sh.votingRights === 'voting' ? 'Voting' : 'Non-Voting'}
                        </span>
                      </td>
                      <td className="text-end">{formatNumber(sh.shares)}</td>
                      <td className="text-end">
                        <span className="badge bg-info">
                          {formatPercentage(sh.ownership)}
                        </span>
                      </td>
                      <td className="text-end">
                        {formatCurrency(sh.value, capTableData.currency)}
                      </td>
                    </tr>
                  ))}
                  <tr className="table-secondary fw-bold">
                    <td colSpan="3">TOTAL</td>
                    <td className="text-end">
                      {formatNumber(capTableData.calculations.totalSharesIssued)}
                    </td>
                    <td className="text-end">
                      {formatPercentage(100)}
                    </td>
                    <td className="text-end">
                      {formatCurrency(capTableData.calculations.totalValue, capTableData.currency)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Important Notes - CLIENT REQUIREMENTS के according */}
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="alert alert-info">
                  <h6 className="alert-heading">📊 Platform Inputs</h6>
                  <ul className="mb-0 small">
                    <li>Number of shares issued to each founder</li>
                    <li>Type of shares as per incorporation documents</li>
                    <li>Price per share as per incorporation</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="alert alert-success">
                  <h6 className="alert-heading">📈 Platform Outputs</h6>
                  <ul className="mb-0 small">
                    <li>Total number of shares issued</li>
                    <li>Ownership % based on shares issued</li>
                    <li>Total company value at incorporation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Carry Over Information - CLIENT REQUIREMENTS के according */}
            <div className="alert alert-warning mt-3">
              <h6 className="alert-heading">⚠️ Important Note</h6>
              <p className="mb-2 small">
                <strong>Total shares ({formatNumber(capTableData.calculations.totalSharesIssued)}) will carry forward to Round 1.</strong>
              </p>
              <p className="mb-0 small">
                <strong>Price per share ({formatCurrency(capTableData.calculations.sharePrice, capTableData.currency)}) and company valuation ({formatCurrency(capTableData.calculations.totalValue, capTableData.currency)}) will NOT carry over to investment rounds.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSeedRoundTable = () => {
    if (!capTableData || !capTableData.calculations) return null;

    const calc = capTableData.calculations;
    const currency = capTableData.currency || "USD";

    // Show error if missing required parameters
    if (capTableData.error) {
      return (
        <div className="alert alert-danger">
          <h5>Calculation Error</h5>
          <p>{capTableData.error}</p>
          <p className="mb-0">
            Please ensure the investment round has valid Investment Size and Pre-Money Valuation.
          </p>
        </div>
      );
    }

    return (
      <div className="cap-table-section">
        <div className="card mb-4">
          <div className="card-header bg-success text-white">
            <h4 className="mb-0">{capTableData.roundType}</h4>
            <small className="opacity-75">Investment Round - Cap Table Calculations</small>
          </div>
          <div className="card-body">
            {/* Platform Inputs */}
            <h5 className="mb-3">Platform Inputs</h5>
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Investment Size</small>
                  <h5>{formatCurrency(calc.investmentSize, currency)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Pre-Money Valuation</small>
                  <h5>{formatCurrency(calc.preMoneyValuation, currency)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Option Pool %</small>
                  <h5>{formatPercentage(calc.optionPoolPercent)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Liquidation Multiple</small>
                  <h5>{calc.liquidationMultiple}X</h5>
                </div>
              </div>
            </div>

            {/* Platform Outputs */}
            <h5 className="mb-3">Platform Outputs</h5>
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-primary text-white">
                  <small>Post-Money Valuation</small>
                  <h5>{formatCurrency(calc.postMoneyValuation, currency)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-info text-white">
                  <small>Investor Ownership %</small>
                  <h5>{formatPercentage(calc.investorOwnershipPercent)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-warning text-dark">
                  <small>Share Price</small>
                  <h5>{formatCurrency(calc.sharePrice, currency)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-success text-white">
                  <small>New Shares Issued</small>
                  <h5>{formatNumber(calc.newShares)}</h5>
                </div>
              </div>
            </div>

            {/* Share Breakdown */}
            <h5 className="mb-3">Share Breakdown</h5>
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="info-box p-3 border rounded">
                  <small className="text-muted">Round 0 Total Shares</small>
                  <h6>{formatNumber(calc.roundZeroTotalShares)}</h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-box p-3 border rounded">
                  <small className="text-muted">Option Pool Shares</small>
                  <h6>{formatNumber(calc.optionPoolShares)}</h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-box p-3 border rounded">
                  <small className="text-muted">Post-Investment Total</small>
                  <h6>{formatNumber(calc.postInvestmentTotalShares)}</h6>
                </div>
              </div>
            </div>

            {/* Ownership Chart */}
            <div className="mb-4">
              <RoundCapChart chartData={capTableData.chartData} />
            </div>

            {/* Capitalization Tables */}
            <div className="row">
              {/* Pre-Investment Cap Table */}
              <div className="col-md-6">
                <h5 className="mb-3">Pre-Investment Cap Table</h5>
                <div className="table-responsive">
                  <table className="table table-sm table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>Shareholder</th>
                        <th className="text-end">Shares</th>
                        <th className="text-end">Ownership %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {capTableData.shareholders
                        .filter(sh => sh.type !== "Investor")
                        .map((sh, idx) => (
                          <tr key={idx}>
                            <td>
                              <small>{sh.name}</small>
                            </td>
                            <td className="text-end">
                              <small>{formatNumber(sh.shares)}</small>
                            </td>
                            <td className="text-end">
                              <span className="badge bg-secondary">
                                {formatPercentage(sh.preInvestmentOwnership || sh.ownership)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      <tr className="table-secondary fw-bold">
                        <td>TOTAL</td>
                        <td className="text-end">{formatNumber(calc.preSeedTotalShares)}</td>
                        <td className="text-end">{formatPercentage(100)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="alert alert-info mt-2">
                  <small>
                    <strong>Pre-Money Valuation:</strong> {formatCurrency(calc.preMoneyValuation, currency)}
                  </small>
                </div>
              </div>

              {/* Post-Investment Cap Table */}
              <div className="col-md-6">
                <h5 className="mb-3">Post-Investment Cap Table</h5>
                <div className="table-responsive">
                  <table className="table table-sm table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>Shareholder</th>
                        <th className="text-end">Shares</th>
                        <th className="text-end">Ownership %</th>
                        <th className="text-end">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {capTableData.shareholders.map((sh, idx) => (
                        <tr key={idx}>
                          <td>
                            <small>
                              {sh.name}
                              {sh.type === "Investor" && (
                                <span className="badge bg-success ms-1">New</span>
                              )}
                            </small>
                          </td>
                          <td className="text-end">
                            <small>{formatNumber(sh.shares)}</small>
                          </td>
                          <td className="text-end">
                            <span className={`badge ${sh.type === "Founder" ? "bg-primary" :
                              sh.type === "Options Pool" ? "bg-warning" :
                                "bg-success"
                              }`}>
                              {formatPercentage(sh.ownership)}
                            </span>
                          </td>
                          <td className="text-end">
                            <small>{formatCurrency(sh.value, currency)}</small>
                          </td>
                        </tr>
                      ))}
                      <tr className="table-secondary fw-bold">
                        <td>TOTAL</td>
                        <td className="text-end">{formatNumber(calc.postInvestmentTotalShares)}</td>
                        <td className="text-end">{formatPercentage(100)}</td>
                        <td className="text-end">{formatCurrency(calc.postMoneyValuation, currency)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="alert alert-success mt-2">
                  <small>
                    <strong>Post-Money Valuation:</strong> {formatCurrency(calc.postMoneyValuation, currency)}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <div className="fullpage d-block">
        <div className="d-flex align-items-start gap-0">
          <ModuleSideNav
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          <div
            className={`global_view ${isCollapsed ? "global_view_col" : ""}`}
          >
            <TopBar />
            <SectionWrapper className="d-block p-md-4 p-3">
              <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>Capitalization Table</h2>
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Back to Rounds
                  </button>
                </div>

                {loading && (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading cap table data...</p>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger" role="alert">
                    <strong>Error:</strong> {error}
                  </div>
                )}

                {!loading && !error && capTableData && (
                  <>
                    {capTableData.round_type?.includes("Round 0") ||
                      capTableData.round_type?.includes("Incorporation")
                      ? renderRoundZeroTable()
                      : renderSeedRoundTable()}
                  </>
                )}

                {!loading && !error && !capTableData && (
                  <div className="alert alert-warning" role="alert">
                    No cap table data available for this round.
                  </div>
                )}
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
