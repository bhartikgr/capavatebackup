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
import SAFERoundTable from "../../../components/Round/SAFERoundTable.jsx";
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
  //console.log(capTableData.calculations.sharePrice);
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
  const formatCurrencyPricePerShare = (amount = 0, currency = "USD") => {
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
  const formatPriceThreeDecimal = (amount = 0) => {
    try {
      // Parse amount to ensure it's a number
      const numAmount = parseFloat(amount) || 0;

      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 3, // Always show 3 decimal places
        maximumFractionDigits: 3, // Exactly 3 decimal places
      }).format(numAmount);
    } catch (error) {
      // Fallback
      return (parseFloat(amount) || 0).toFixed(3);
    }
  };




  const formatCurrencyAlready = (amount, currency = "USD") => {
    const cleanCurrency = currency?.trim().split(" ")[0] || "USD";
    const validCurrencies = ["USD", "CAD", "EUR", "GBP", "INR", "AUD", "JPY"];
    const currencyCode = validCurrencies.includes(cleanCurrency.toUpperCase())
      ? cleanCurrency.toUpperCase()
      : "USD";

    try {
      // Use minimumFractionDigits 3+ for very small values
      const decimals = amount < 0.01 ? 5 : 2;

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        maximumFractionDigits: 5,
      }).format(amount || 0);
    } catch (error) {
      return `${currencyCode} ${(amount || 0)}`;
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
                  <h6>{formatCurrencyPricePerShare(capTableData.calculations.sharePrice, capTableData.currency)}</h6>
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
                    <th>Founder Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Share Type</th>
                    <th>Share Class</th>
                    <th>Voting Rights</th>
                    <th className="text-end">Numbers of Shares</th>
                    <th className="text-end">Price Per Share</th>
                    <th className="text-end">Ownership %</th>
                    <th className="text-end">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {capTableData.shareholders.map((sh, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>
                          {sh.firstName && sh.lastName ?
                            `${sh.firstName} ${sh.lastName}` :
                            `Founder ${idx + 1}`
                          }
                        </strong>
                      </td>
                      <td>
                        {sh.email ? (
                          <a href={`mailto:${sh.email}`} className="text-decoration-none">
                            {sh.email}
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>
                        {sh.phone ? (
                          <a href={`tel:${sh.phone}`} className="text-decoration-none">
                            {sh.phone}
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td>
                        <span className="badge bg-secondary text-capitalize">
                          {sh.shareType === 'common' ? 'Common Shares' :
                            sh.shareType === 'preferred' ? 'Preferred Shares' :
                              sh.shareType === 'other' && sh.customShareType ? sh.customShareType :
                                'Common Shares'}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {sh.shareClass === 'other' && sh.customShareClass ?
                            sh.customShareClass :
                            sh.shareClass || 'Class A'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${sh.votingRights === 'voting' ? 'bg-success' : 'bg-warning'}`}>
                          {sh.votingRights === 'voting' ? 'Voting' : 'Non-Voting'}
                        </span>
                      </td>
                      <td className="text-end">{formatNumber(sh.shares)}</td>
                      <td className="text-end">
                        {formatCurrencyPricePerShare(capTableData.calculations.sharePrice, capTableData.currency)}
                      </td>
                      <td className="text-end">
                        <span className="badge bg-danger" style={{ fontSize: '16px' }}>
                          {formatPercentage(sh.ownership)}
                        </span>
                      </td>
                      <td className="text-end">
                        {formatCurrency(sh.value, capTableData.currency)}
                      </td>
                    </tr>
                  ))}

                  {/* Total Row */}
                  <tr className="table-secondary fw-bold">
                    <td colSpan="6">TOTAL</td>
                    <td className="text-end">
                      {formatNumber(capTableData.calculations.totalSharesIssued)}
                    </td>
                    <td className="text-end">
                      {formatCurrencyPricePerShare(capTableData.calculations.sharePrice, capTableData.currency)}
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

            {/* Additional Summary Information */}
            <div className="row mt-4">
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h6 className="card-title text-muted">Total Founders</h6>
                    <h4 className="text-primary">{capTableData.shareholders.length}</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h6 className="card-title text-muted">Total Shares</h6>
                    <h4 className="text-success">{formatNumber(capTableData.calculations.totalSharesIssued)}</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h6 className="card-title text-muted">Price Per Share</h6>
                    <h4 className="text-info">
                      {formatCurrencyPricePerShare(
                        capTableData.calculations.sharePrice,
                        capTableData.currency
                      )}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <h6 className="card-title text-muted">Total Value</h6>
                    <h4 className="text-warning">
                      {formatCurrency(capTableData.calculations.totalValue, capTableData.currency)}
                    </h4>
                  </div>
                </div>
              </div>
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
                <strong>Price per share ({formatCurrencyPricePerShare(capTableData.calculations.sharePrice, capTableData.currency)}) and company valuation ({formatCurrency(capTableData.calculations.totalValue, capTableData.currency)}) will NOT carry over to investment rounds.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ENHANCED Round 1 Frontend Component with Founder Names Display
  // Replace your existing renderSeedRoundTable function with this

  // CORRECT Round 1 Frontend - This will show ALL shareholders including founders
  const renderSeedRoundTable = () => {
    console.log(capTableData)
    if (!capTableData || !capTableData.calculations) return null;

    const calc = capTableData.calculations;
    const currency = capTableData.currency || "USD";

    if (capTableData.error) {
      return (
        <div className="alert alert-danger">
          <h5>Calculation Error</h5>
          <p>{capTableData.error}</p>
        </div>
      );
    }

    // Check if this is a Convertible Note round
    const isConvertibleNote = capTableData.isConvertibleNoteRound ||
      capTableData.instrumentType === "Convertible Note";


    return (
      <div className="cap-table-section">
        <div className="card mb-4">
          <div className="card-header bg-success text-white">
            <h4 className="mb-0">{capTableData.roundType}</h4>
            <small className="opacity-75">
              {isConvertibleNote ? "Convertible Note Round - Cap Table Calculations" : "Seed Round - Cap Table Calculations"}
            </small>
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
                  <small className="text-muted">Round Type</small>
                  <h5>{isConvertibleNote ? "Convertible Note" : "Equity Round"}</h5>
                </div>
              </div>
            </div>

            {/* Convertible Note Specific Inputs */}
            {isConvertibleNote && calc.valuationCap && (
              <div className="row mb-4">
                <div className="col-md-4">
                  <div className="info-box p-3 border rounded bg-info text-white">
                    <small className="text-white">Valuation Cap</small>
                    <h6>{formatCurrency(calc.valuationCap, currency)}</h6>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-box p-3 border rounded bg-warning text-dark">
                    <small>Discount Rate</small>
                    <h6>{formatPercentage(calc.discountRate)}</h6>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="info-box p-3 border rounded bg-secondary text-white">
                    <small>Interest Rate</small>
                    <h6>{formatPercentage(calc.interestRate)}</h6>
                  </div>
                </div>
                {/* <div className="col-md-3">
                  <div className="info-box p-3 border rounded bg-dark text-white">
                    <small>Conversion Trigger</small>
                    <h6>{calc.convertibleTrigger || "QUALIFIED_FINANCING"}</h6>
                  </div>
                </div> */}
              </div>
            )}

            {/* Platform Outputs */}
            <h5 className="mb-3">Platform Outputs</h5>
            <div className="row mb-4">
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-primary text-white">
                  <small>Post-Money Valuation</small>
                  <h6>{formatCurrency(calc.postMoneyValuation, currency)}</h6>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-info text-white">
                  <small>Post-Investment # Shares</small>
                  <h6>{formatNumber(calc.postInvestmentTotalShares)}</h6>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-warning text-dark">
                  <small>New Shares Issued</small>
                  <h6>{formatPriceThreeDecimal(calc.newShares)}</h6>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-success text-white">
                  <small>
                    {isConvertibleNote ? "Theoretical Share Price" : "Share Price"}
                  </small>
                  <h6>{formatCurrencyPricePerShare(calc.sharePrice, currency)}</h6>
                </div>
              </div>

              {/* Conditional Investor Ownership Display */}
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-secondary text-white">
                  <small>
                    {isConvertibleNote ? "Note Investment" : "Investor Ownership"}
                  </small>
                  <h6>
                    {isConvertibleNote
                      ? formatCurrency(calc.totalNoteInvestment || 0, currency)
                      : formatPercentage(calc.investorOwnershipPercent)
                    }
                  </h6>
                </div>
              </div>

              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-dark text-white">
                  <small>Option Pool</small>
                  <h6>{formatNumber(calc.optionPoolShares)} shares</h6>
                </div>
              </div>
            </div>

            {/* Available for Investment Display */}
            {isConvertibleNote && calc.availableForInvestment > 0 && (
              <div className="row mb-4">
                <div className="col-md-12">
                  <div className="alert alert-danger">
                    <h6 className="alert-heading">💰 Available for Investment</h6>
                    <p className="mb-0">
                      <strong>{formatCurrency(calc.availableForInvestment, currency)}</strong> remaining in this convertible note round.
                      {calc.totalNoteInvestment > 0 && (
                        <span> ({formatCurrency(calc.totalNoteInvestment, currency)} already committed)</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Ownership Chart */}
            <div className="mb-4">
              <RoundCapChart chartData={capTableData.chartData} />
            </div>

            {/* ========== PRE-SEED CAP TABLE ========== */}
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Pre-Seed Cap Table</h5>
                    <small>(# shares, Ownership %, Currency Value)</small>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Shareholder</th>
                            <th className="text-center">Contact Info</th>
                            <th className="text-center">Common Shares</th>
                            <th className="text-center">Fully Diluted Ownership %</th>
                            <th className="text-center">Currency Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {capTableData.preSeedShareholders && capTableData.preSeedShareholders.length > 0 ? (
                            capTableData.preSeedShareholders.map((sh, idx) => (
                              <tr key={idx}>
                                <td>
                                  <div>
                                    <strong className="text-danger">{sh.name}</strong>
                                    {sh.fullName && sh.fullName !== sh.name && (
                                      <div className="small fw-bold text-dark">{sh.fullName}</div>
                                    )}
                                    {sh.type === "Founder" && (
                                      <span className="badge bg-success mt-1">Founder</span>
                                    )}
                                    {sh.type === "Options Pool" && (
                                      <span className="badge bg-warning text-dark mt-1">Option Pool</span>
                                    )}
                                  </div>
                                </td>
                                <td className="text-center small">
                                  {sh.email && sh.email !== "-" && (
                                    <div className="text-muted mb-1">
                                      📧 {sh.email}
                                    </div>
                                  )}
                                  {sh.phone && sh.phone !== "-" && (
                                    <div className="text-muted">
                                      📱 {sh.phone}
                                    </div>
                                  )}
                                  {(!sh.email || sh.email === "-") && (!sh.phone || sh.phone === "-") && (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td className="text-center">
                                  <strong>{formatNumber(sh.shares)}</strong>
                                </td>
                                <td className="text-center">
                                  <span className={`fSize-16 badge ${sh.type === "Founder" ? "bg-danger" : "bg-warning text-white"}`}>
                                    {formatPercentage(sh.ownership)}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <strong>{formatCurrency(sh.value, currency)}</strong>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center text-danger">
                                <strong>⚠️ No shareholders data available</strong>
                              </td>
                            </tr>
                          )}

                          {/* TOTAL ROW */}
                          <tr className="table-secondary fw-bold">
                            <td colSpan="2">TOTAL</td>
                            <td className="text-center">{formatNumber(calc.preSeedTotalShares)}</td>
                            <td className="text-center">{formatPercentage(100)}</td>
                            <td className="text-center">{formatCurrency(calc.preMoneyValuation, currency)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Summary Cards */}
                    <div className="row mt-3">
                      <div className="col-md-4">
                        <div className="alert alert-info mb-0">
                          <strong>Total Founders Ownership:</strong> {formatPercentage(
                            (capTableData.preSeedShareholders || [])
                              .filter(sh => sh.type === "Founder")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="alert alert-warning mb-0">
                          <strong>Employee Ownership:</strong> {formatPercentage(
                            (capTableData.preSeedShareholders || [])
                              .filter(sh => sh.type === "Options Pool")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="alert alert-success mb-0">
                          <strong>Total Pre-Seed Value:</strong> {formatCurrency(calc.preMoneyValuation, currency)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== POST-SEED CAP TABLE ========== */}
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Post-Seed Cap Table</h5>
                    <small>(# shares, Ownership %, Currency Value)</small>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Shareholder</th>
                            <th className="text-center">Contact Info</th>
                            <th className="text-center">Common Shares</th>
                            <th className="text-center">New Shares</th>
                            <th className="text-center">Total Shares</th>
                            <th className="text-center">Fully Diluted Ownership %</th>
                            <th className="text-center">Currency Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {capTableData.shareholders && capTableData.shareholders.length > 0 ? (
                            capTableData.shareholders.map((sh, idx) => (
                              <tr key={idx}>
                                <td>
                                  <div>
                                    <strong className="text-danger">{sh.name}</strong>
                                    {sh.fullName && sh.fullName !== sh.name && (
                                      <div className="small fw-bold text-dark">{sh.fullName}</div>
                                    )}
                                    {/* Type badges for all shareholder types */}
                                    {sh.type === "Investor" && (
                                      <span className="badge bg-success mt-1">
                                        {sh.isGeneric ? "Generic Investor" : "Investor"}
                                        {sh.isConvertibleNote && " (Convertible Note)"}
                                      </span>
                                    )}
                                    {sh.type === "Founder" && (
                                      <span className="badge bg-primary mt-1">Founder</span>
                                    )}
                                    {sh.type === "Options Pool" && (
                                      <span className="badge bg-warning text-dark mt-1">Option Pool</span>
                                    )}
                                    {sh.type === "Available" && (
                                      <span className="badge bg-danger mt-1">Available for Investment</span>
                                    )}
                                  </div>
                                </td>
                                <td className="text-center small">
                                  {/* Hide contact info for Available for Investment */}
                                  {sh.type !== "Available" && sh.email && sh.email !== "-" && (
                                    <div className="text-muted mb-1">
                                      📧 {sh.email}
                                    </div>
                                  )}
                                  {sh.type !== "Available" && sh.phone && sh.phone !== "-" && (
                                    <div className="text-muted">
                                      📱 {sh.phone}
                                    </div>
                                  )}
                                  {(sh.type === "Available" || !sh.email || sh.email === "-") &&
                                    (!sh.phone || sh.phone === "-") && (
                                      <span className="text-muted">-</span>
                                    )}
                                </td>
                                <td className="text-center">
                                  {sh.type === "Founder" || sh.type === "Options Pool" ? (
                                    <strong>{formatNumber(sh.shares)}</strong>
                                  ) : (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td className="text-center">
                                  {sh.newShares > 0 ? (
                                    <span className="badge bg-warning text-dark">
                                      {formatNumber(sh.newShares)}
                                    </span>
                                  ) : (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td className="text-center">
                                  <strong>{formatNumber(sh.shares)}</strong>
                                </td>
                                <td className="text-center">
                                  <span className={`fSize-16 badge ${sh.type === "Founder" ? "bg-danger" :
                                    sh.type === "Options Pool" ? "bg-warning text-dark" :
                                      sh.type === "Available" ? "bg-danger" :
                                        "bg-success"
                                    }`}>
                                    {formatPercentage(sh.ownership)}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <strong>{formatCurrency(sh.value, currency)}</strong>

                                  {/* Investment amount for Available for Investment */}
                                  {sh.type === "Available" && sh.investmentAmount > 0 && (
                                    <div className="small text-success">
                                      Available: {formatCurrency(sh.investmentAmount, currency)}
                                    </div>
                                  )}

                                  {/* Investment amount for investors */}
                                  {sh.type === "Investor" && sh.investmentAmount && sh.investmentAmount > 0 && (
                                    <div className="small text-success">
                                      Invested: {formatCurrency(sh.investmentAmount, currency)}
                                    </div>
                                  )}

                                  {/* Note for convertible note investors */}
                                  {sh.type === "Investor" && sh.isConvertibleNote && (
                                    <div className="small text-muted">
                                      Convertible Note - 0 shares issued
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center text-danger">
                                <strong>⚠️ No shareholders data available</strong>
                              </td>
                            </tr>
                          )}

                          {/* TOTAL ROW */}
                          <tr className="table-secondary fw-bold">
                            <td colSpan="2">TOTAL</td>
                            <td className="text-center">{formatNumber(calc.preSeedTotalShares)}</td>
                            <td className="text-center">{formatNumber(calc.newShares)}</td>
                            <td className="text-center">{formatNumber(calc.postInvestmentTotalShares)}</td>
                            <td className="text-center">{formatPercentage(100)}</td>
                            <td className="text-center">{formatCurrency(calc.postMoneyValuation, currency)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Summary Cards */}
                    <div className="row mt-3">
                      <div className="col-md-3">
                        <div className="alert alert-primary mb-0">
                          <strong>Total Founders:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Founder")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="alert alert-warning mb-0">
                          <strong>Option Pool:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Options Pool")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className="alert alert-success mb-0">
                          <strong>Investors:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Investor")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      {/* Available for Investment Summary */}
                      <div className="col-md-2">
                        <div className="alert alert-danger mb-0">
                          <strong>Available:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Available")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="alert alert-info mb-0">
                          <strong>Post-Money Value:</strong> {formatCurrency(calc.postMoneyValuation, currency)}
                        </div>
                      </div>
                    </div>

                    {/* Formula Verification */}
                    <div className="alert alert-dark mt-3">
                      <h6 className="alert-heading">🔍 Formula Verification</h6>
                      <div className="row small">
                        <div className="col-md-4">
                          <strong>Post-Money Valuation:</strong><br />
                          {formatCurrency(calc.investmentSize, currency)} + {formatCurrency(calc.preMoneyValuation, currency)} = {formatCurrency(calc.postMoneyValuation, currency)}
                        </div>

                        {/* Conditional Formulas based on Round Type */}
                        {isConvertibleNote ? (
                          <>
                            <div className="col-md-4">
                              <strong>Convertible Note Investment:</strong><br />
                              Confirmed: {formatCurrency(calc.totalNoteInvestment || 0, currency)}<br />
                              Available: {formatCurrency(calc.availableForInvestment || 0, currency)}
                            </div>
                            <div className="col-md-4">
                              <strong>Theoretical Share Price:</strong><br />
                              {formatCurrencyPricePerShare(calc.preMoneyValuation, currency)} ÷ {formatNumber(calc.preSeedTotalShares)} = {formatCurrencyPricePerShare(calc.sharePrice, currency)}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="col-md-4">
                              <strong>Investor Ownership:</strong><br />
                              {formatCurrency(calc.investmentSize, currency)} ÷ {formatCurrency(calc.postMoneyValuation, currency)} = {formatPercentage(calc.investorOwnershipPercent)}
                            </div>
                            <div className="col-md-4">
                              <strong>Share Price:</strong><br />
                              {calc.newShares > 0 ? (
                                <>
                                  {formatCurrency(calc.investmentSize, currency)} ÷ {formatNumber(calc.newShares)} = {formatCurrencyPricePerShare(calc.sharePrice, currency)}
                                </>
                              ) : (
                                "No new shares issued"
                              )}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Convertible Note Specific Information */}
                      {isConvertibleNote && (
                        <div className="mt-2 p-2 bg-warning text-dark rounded">
                          <strong>💡 Convertible Note Round:</strong> No shares issued immediately.
                          {calc.discountRate > 0 && ` Conversion will happen at next qualified financing round with ${formatPercentage(calc.discountRate)} discount`}
                          {calc.valuationCap > 0 && ` and ${formatCurrency(calc.valuationCap, currency)} valuation cap.`}
                          {calc.interestRate > 0 && ` Interest rate: ${formatPercentage(calc.interestRate)}.`}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSAFERoundTable = () => {
    if (!capTableData || !capTableData.calculations) return null;
    console.log('ss')
    const calc = capTableData.calculations;
    const currency = capTableData.currency || "USD";

    // Check if this is a SAFE round with pre/post tables
    const hasPrePostTables = capTableData.hasPrePostTables ||
      (capTableData.preSAFECapTable && capTableData.postSAFECapTable);

    if (!hasPrePostTables) {
      return renderSeedRoundTable(); // Fallback to regular display
    }

    const preSAFECalc = {
      totalShares: capTableData.preSAFECapTable.totalShares,
      totalValue: capTableData.preSAFECapTable.totalValue,
      foundersOwnership: (capTableData.preSAFECapTable.shareholders || [])
        .filter(sh => sh.type === "Founder")
        .reduce((sum, sh) => sum + sh.ownership, 0),
      poolOwnership: (capTableData.preSAFECapTable.shareholders || [])
        .filter(sh => sh.type === "Options Pool")
        .reduce((sum, sh) => sum + sh.ownership, 0)
    };

    const postSAFECalc = {
      totalShares: capTableData.postSAFECapTable.totalShares,
      totalValue: capTableData.postSAFECapTable.totalValue,
      foundersOwnership: (capTableData.postSAFECapTable.shareholders || [])
        .filter(sh => sh.type === "Founder")
        .reduce((sum, sh) => sum + sh.ownership, 0),
      poolOwnership: (capTableData.postSAFECapTable.shareholders || [])
        .filter(sh => sh.type === "Options Pool")
        .reduce((sum, sh) => sum + sh.ownership, 0),
      investorOwnership: (capTableData.postSAFECapTable.shareholders || [])
        .filter(sh => sh.type === "Investor" || sh.type === "SAFE Investor")
        .reduce((sum, sh) => sum + sh.ownership, 0)
    };

    const conversionDetails = capTableData.conversionDetails || {};

    return (
      <div className="cap-table-section">
        <div className="card mb-4">
          <div className="card-header bg-warning text-dark">
            <h4 className="mb-0">{capTableData.roundType}</h4>
            <small className="opacity-75">SAFE Round - Pre & Post Conversion Cap Tables</small>
          </div>
          <div className="card-body">
            {/* Platform Inputs */}
            <h5 className="mb-3">Platform Inputs</h5>
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Total SAFE Investment</small>
                  <h5>{formatCurrency(calc.totalSafeInvestment, currency)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Valuation Cap</small>
                  <h5>{formatCurrency(calc.valuationCap, currency)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Discount Rate</small>
                  <h5>{formatPercentage(calc.discountRate)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">SAFE Type</small>
                  <h5>{calc.safeType || "PRE_MONEY"}</h5>
                </div>
              </div>
            </div>

            {/* Platform Outputs */}
            <h5 className="mb-3">Platform Outputs</h5>
            <div className="row mb-4">
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-primary text-white">
                  <small>Post-Money Valuation</small>
                  <h6>{formatCurrency(conversionDetails.postMoneyValuation, currency)}</h6>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-info text-white">
                  <small>Conversion Price</small>
                  <h6>{formatCurrencyPricePerShare(conversionDetails.conversionPrice, currency)}</h6>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-warning text-dark">
                  <small>Potential Shares</small>
                  <h6>{formatNumber(conversionDetails.potentialShares)}</h6>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-success text-white">
                  <small>Investor Post-Conversion</small>
                  <h6>{formatPercentage(conversionDetails.postConversionOwnership)}</h6>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-secondary text-white">
                  <small>Founders Post-Conversion</small>
                  <h6>{formatPercentage(conversionDetails.foundersPostConversionOwnership)}</h6>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-dark text-white">
                  <small>Pool Post-Conversion</small>
                  <h6>{formatPercentage(conversionDetails.poolPostConversionOwnership)}</h6>
                </div>
              </div>
            </div>

            {/* Conversion Details */}
            <div className="alert alert-info mb-4">
              <h6 className="alert-heading">🔗 SAFE Conversion Details</h6>
              <p className="mb-2">
                SAFE investors will convert at the next priced equity round.
                {conversionDetails.discountRate > 0 && ` Conversion includes a ${formatPercentage(conversionDetails.discountRate)} discount.`}
              </p>
              {conversionDetails.conversionPrice > 0 && (
                <p className="mb-0">
                  <strong>Expected conversion price:</strong> {formatCurrencyPricePerShare(conversionDetails.conversionPrice, currency)} per share
                </p>
              )}
            </div>

            {/* ========== PRE-SAFE CAP TABLE ========== */}
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Pre-SAFE Cap Table (Current)</h5>
                    <small>Before SAFE conversion - No shares issued to SAFE investors yet</small>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Shareholder</th>
                            <th className="text-center">Contact Info</th>
                            <th className="text-center">Common Shares</th>
                            <th className="text-center">Fully Diluted Ownership %</th>
                            <th className="text-center">Currency Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {capTableData.preSAFECapTable.shareholders && capTableData.preSAFECapTable.shareholders.length > 0 ? (
                            capTableData.preSAFECapTable.shareholders.map((sh, idx) => (
                              <tr key={idx}>
                                <td>
                                  <div>
                                    <strong className={sh.type === "Founder" ? "text-danger" :
                                      sh.type === "Options Pool" ? "text-warning" :
                                        "text-info"}>
                                      {sh.name}
                                    </strong>
                                    {sh.fullName && sh.fullName !== sh.name && (
                                      <div className="small fw-bold text-dark">{sh.fullName}</div>
                                    )}
                                    {sh.type === "Founder" && (
                                      <span className="badge bg-success mt-1">Founder</span>
                                    )}
                                    {sh.type === "Options Pool" && (
                                      <span className="badge bg-warning text-dark mt-1">Option Pool</span>
                                    )}
                                    {sh.type === "SAFE Investor" && (
                                      <span className="badge bg-info mt-1">SAFE Investor</span>
                                    )}
                                  </div>
                                </td>
                                <td className="text-center small">
                                  {sh.email && sh.email !== "-" && (
                                    <div className="text-muted mb-1">
                                      📧 {sh.email}
                                    </div>
                                  )}
                                  {sh.phone && sh.phone !== "-" && (
                                    <div className="text-muted">
                                      📱 {sh.phone}
                                    </div>
                                  )}
                                  {(!sh.email || sh.email === "-") && (!sh.phone || sh.phone === "-") && (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td className="text-center">
                                  <strong>{formatNumber(sh.shares)}</strong>
                                  {sh.type === "SAFE Investor" && sh.investmentAmount > 0 && (
                                    <div className="small text-success">
                                      Invested: {formatCurrency(sh.investmentAmount, currency)}
                                    </div>
                                  )}
                                </td>
                                <td className="text-center">
                                  <span className={`fSize-16 badge ${sh.type === "Founder" ? "bg-danger" :
                                    sh.type === "Options Pool" ? "bg-warning text-dark" :
                                      "bg-info"}`}>
                                    {formatPercentage(sh.ownership)}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <strong>{formatCurrency(sh.value, currency)}</strong>
                                  {sh.type === "SAFE Investor" && (
                                    <div className="small text-muted">
                                      SAFE Note - 0 shares issued
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="text-center text-danger">
                                <strong>⚠️ No shareholders data available</strong>
                              </td>
                            </tr>
                          )}

                          {/* TOTAL ROW */}
                          <tr className="table-secondary fw-bold">
                            <td colSpan="2">TOTAL</td>
                            <td className="text-center">{formatNumber(preSAFECalc.totalShares)}</td>
                            <td className="text-center">{formatPercentage(100)}</td>
                            <td className="text-center">{formatCurrency(preSAFECalc.totalValue, currency)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Summary Cards */}
                    <div className="row mt-3">
                      <div className="col-md-4">
                        <div className="alert alert-primary mb-0">
                          <strong>Total Founders:</strong> {formatPercentage(preSAFECalc.foundersOwnership)}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="alert alert-warning mb-0">
                          <strong>Option Pool:</strong> {formatPercentage(preSAFECalc.poolOwnership)}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="alert alert-info mb-0">
                          <strong>SAFE Investment:</strong> {formatCurrency(calc.totalSafeInvestment, currency)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== POST-SAFE CAP TABLE (Potential) ========== */}
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">Post-SAFE Cap Table (Potential)</h5>
                    <small>After SAFE conversion at next priced round</small>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Shareholder</th>
                            <th className="text-center">Contact Info</th>
                            <th className="text-center">Existing Shares</th>
                            <th className="text-center">New Shares</th>
                            <th className="text-center">Total Shares</th>
                            <th className="text-center">Fully Diluted Ownership %</th>
                            <th className="text-center">Currency Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {capTableData.postSAFECapTable.shareholders && capTableData.postSAFECapTable.shareholders.length > 0 ? (
                            capTableData.postSAFECapTable.shareholders.map((sh, idx) => (
                              <tr key={idx}>
                                <td>
                                  <div>
                                    <strong className={sh.type === "Founder" ? "text-danger" :
                                      sh.type === "Options Pool" ? "text-warning" :
                                        "text-success"}>
                                      {sh.name}
                                    </strong>
                                    {sh.fullName && sh.fullName !== sh.name && (
                                      <div className="small fw-bold text-dark">{sh.fullName}</div>
                                    )}
                                    {sh.type === "Founder" && (
                                      <span className="badge bg-primary mt-1">Founder</span>
                                    )}
                                    {sh.type === "Options Pool" && (
                                      <span className="badge bg-warning text-dark mt-1">Option Pool</span>
                                    )}
                                    {sh.type === "Investor" && (
                                      <span className="badge bg-success mt-1">Investor (SAFE Converted)</span>
                                    )}
                                  </div>
                                </td>
                                <td className="text-center small">
                                  {sh.email && sh.email !== "-" && (
                                    <div className="text-muted mb-1">
                                      📧 {sh.email}
                                    </div>
                                  )}
                                  {sh.phone && sh.phone !== "-" && (
                                    <div className="text-muted">
                                      📱 {sh.phone}
                                    </div>
                                  )}
                                  {(!sh.email || sh.email === "-") && (!sh.phone || sh.phone === "-") && (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td className="text-center">
                                  {sh.type === "Investor" ? (
                                    <span className="text-muted">-</span>
                                  ) : (
                                    <strong>{formatNumber(sh.shares - (sh.newShares || 0))}</strong>
                                  )}
                                </td>
                                <td className="text-center">
                                  {sh.newShares > 0 ? (
                                    <span className="badge bg-warning text-dark">
                                      {formatNumber(sh.newShares)}
                                    </span>
                                  ) : (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td className="text-center">
                                  <strong>{formatNumber(sh.shares)}</strong>
                                </td>
                                <td className="text-center">
                                  <span className={`fSize-16 badge ${sh.type === "Founder" ? "bg-danger" :
                                    sh.type === "Options Pool" ? "bg-warning text-dark" :
                                      "bg-success"}`}>
                                    {formatPercentage(sh.ownership)}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <strong>{formatCurrency(sh.value, currency)}</strong>
                                  {sh.type === "Investor" && sh.investmentAmount > 0 && (
                                    <div className="small text-success">
                                      SAFE converted: {formatCurrency(sh.investmentAmount, currency)}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center text-danger">
                                <strong>⚠️ No shareholders data available</strong>
                              </td>
                            </tr>
                          )}

                          {/* TOTAL ROW */}
                          <tr className="table-secondary fw-bold">
                            <td colSpan="2">TOTAL</td>
                            <td className="text-center">{formatNumber(preSAFECalc.totalShares)}</td>
                            <td className="text-center">{formatNumber(conversionDetails.potentialShares)}</td>
                            <td className="text-center">{formatNumber(postSAFECalc.totalShares)}</td>
                            <td className="text-center">{formatPercentage(100)}</td>
                            <td className="text-center">{formatCurrency(postSAFECalc.totalValue, currency)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Summary Cards */}
                    <div className="row mt-3">
                      <div className="col-md-3">
                        <div className="alert alert-primary mb-0">
                          <strong>Founders (Post):</strong> {formatPercentage(postSAFECalc.foundersOwnership)}
                          <div className="small">
                            Was: {formatPercentage(preSAFECalc.foundersOwnership)}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="alert alert-warning mb-0">
                          <strong>Option Pool (Post):</strong> {formatPercentage(postSAFECalc.poolOwnership)}
                          <div className="small">
                            Was: {formatPercentage(preSAFECalc.poolOwnership)}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="alert alert-success mb-0">
                          <strong>Investors (Post):</strong> {formatPercentage(postSAFECalc.investorOwnership)}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="alert alert-info mb-0">
                          <strong>Post-Conversion Value:</strong> {formatCurrency(postSAFECalc.totalValue, currency)}
                        </div>
                      </div>
                    </div>

                    {/* Formula Verification */}
                    <div className="alert alert-dark mt-3">
                      <h6 className="alert-heading">🔍 SAFE Conversion Formulas</h6>
                      <div className="row small">
                        <div className="col-md-4">
                          <strong>Conversion Price:</strong><br />
                          {calc.safeType === "POST_MONEY" ? (
                            <>
                              {formatCurrency(calc.valuationCap, currency)} ÷ {formatNumber(postSAFECalc.totalShares)} = {formatCurrencyPricePerShare(conversionDetails.conversionPrice, currency)}
                            </>
                          ) : (
                            <>
                              {formatCurrency(calc.valuationCap, currency)} ÷ {formatNumber(preSAFECalc.totalShares)} = {formatCurrencyPricePerShare(conversionDetails.conversionPrice, currency)}
                            </>
                          )}
                        </div>
                        <div className="col-md-4">
                          <strong>Investor Shares:</strong><br />
                          {formatCurrency(calc.totalSafeInvestment, currency)} ÷ {formatCurrencyPricePerShare(conversionDetails.conversionPrice, currency)} = {formatNumber(conversionDetails.potentialShares)}
                        </div>
                        <div className="col-md-4">
                          <strong>Total Post-Conversion:</strong><br />
                          {formatNumber(preSAFECalc.totalShares)} + {formatNumber(conversionDetails.potentialShares)} = {formatNumber(postSAFECalc.totalShares)}
                        </div>
                      </div>

                      {/* Discount Information */}
                      {calc.discountRate > 0 && (
                        <div className="mt-2 p-2 bg-warning text-dark rounded">
                          <strong>🎯 Discount Applied:</strong> SAFE investors receive {formatPercentage(calc.discountRate)} discount on conversion price.
                          <div className="small">
                            Effective price: {formatCurrencyPricePerShare(conversionDetails.conversionPrice, currency)} per share
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  // SAFE Round Frontend Renderer
  console.log(capTableData)
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
                    {capTableData.round_type?.toLowerCase().includes("round 0") ||
                      capTableData.round_type?.toLowerCase().includes("incorporation") ||
                      capTableData.isRoundZero ? (
                      renderRoundZeroTable()
                    ) : capTableData.instrumentType?.toLowerCase() === "safe" ||
                      capTableData.isSAFERound ? (
                      // SAFE Round ke liye
                      renderSAFERoundTable()
                    ) : (
                      // Normal Seed/Series Round ke liye
                      renderSeedRoundTable()
                    )}
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
