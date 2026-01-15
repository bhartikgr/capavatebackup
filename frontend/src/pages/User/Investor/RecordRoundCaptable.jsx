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


import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Pie chart के लिए add करें
} from 'chart.js';

// ✅ Register all required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Pie chart के लिए
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

  const renderSeedRoundTable = () => {

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
                                        {sh.isGeneric ? "" : "Investor"}
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
                                  {/* {sh.type === "Investor" && sh.investmentAmount && sh.investmentAmount > 0 && (
                                    <div className="small text-success">
                                      Invested: {formatCurrency(sh.investmentAmount, currency)}
                                    </div>
                                  )} */}

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
                      <div className="col-md-6">
                        <div className="alert alert-primary mb-0">
                          <strong>Total Founders:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Founder")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="alert alert-warning mb-0">
                          <strong>Option Pool:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Options Pool")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>

                    </div>
                    <div className="row mt-3">

                      <div className="col-md-4">
                        <div className="alert alert-success mb-0">
                          <strong>Investors:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Investor")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      {/* Available for Investment Summary */}
                      <div className="col-md-4">
                        <div className="alert alert-danger mb-0">
                          <strong>Available:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Available")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="alert alert-info mb-0">
                          <strong>Post-Money Value:</strong> {formatCurrency(calc.postMoneyValuation, currency)}
                        </div>
                      </div>
                    </div>


                    {/* Formula Verification */}
                    <div className="alert alert-dark mt-3">
                      <h6 className="alert-heading">🔍 Formula</h6>
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

    const calc = capTableData.calculations;
    const currency = capTableData.currency || "USD";

    // ✅ FIX 1: Need BOTH Pre-Seed and Post-Seed tables
    const preSeedTable = capTableData.preSeedCapTable;
    const postSeedTable = capTableData.postSeedCapTable;
    var roundname = capTableData.instrumentType + ' ' + capTableData.shareClassType;
    return (
      <div className="cap-table-section">
        <div className="card mb-4">
          <div className="card-header bg-warning text-dark">
            <h4 className="mb-0">{capTableData.roundType}</h4>
            <small>{roundname} Investment with Option Pool</small>
          </div>
          <div className="card-body">

            {/* ===== PLATFORM INPUTS ===== */}
            <h5 className="mb-3">📊 Platform Inputs</h5>
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Investment Size</small>
                  <h5>{formatCurrency(calc.investmentSize, currency)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Company Value</small>
                  <h5>{formatCurrency(calc.companyValue, currency)}</h5>
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
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-info text-white">
                  <small>Pre-Seed Option Pool %</small>
                  <h5>{formatPercentage(calc.optionPoolPercent)}</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-success text-white">
                  <small>Round 0 Total Shares</small>
                  <h5>{formatNumber(calc.roundZeroTotalShares)}</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-warning text-dark">
                  <small>Employee Shares Created</small>
                  <h5>{formatNumber(calc.employeeShares)}</h5>
                </div>
              </div>
            </div>

            {/* ===== CALCULATION FORMULA BOX ===== */}
            <div className="alert alert-info mb-4">
              <h6 className="alert-heading">📐 Employee Pool Calculation</h6>
              <p className="mb-1">
                <strong>Formula:</strong> Employee Shares = Total Founder Shares ÷ (1 - Pool %) × Pool %
              </p>
              <p className="mb-0">
                <strong>Calculation:</strong> {formatNumber(calc.roundZeroTotalShares)} ÷ (1 - {formatPercentage(calc.optionPoolPercent)}) × {formatPercentage(calc.optionPoolPercent)}
                = <span className="badge bg-warning text-dark">{formatNumber(calc.employeeShares)} shares</span>
              </p>
            </div>

            {/* ⚠️ IMPORTANT: SAFE Notes Explanation */}
            <div className="alert alert-warning mb-4">
              <h6 className="alert-heading">⚠️ SAFE Notes - NO SHARES ISSUED YET</h6>
              <p className="mb-2">
                <strong>Important:</strong> SAFE (Simple Agreement for Future Equity) notes are <u>NOT converted into shares</u> during this round.
              </p>
              <ul className="mb-2">
                <li>SAFE investors have invested <strong>{formatCurrency(calc.investmentSize, currency)}</strong></li>
                <li>They will receive <strong>0 shares</strong> in this round</li>
                <li>Conversion happens at the <strong>next priced equity round</strong> (Series A)</li>
              </ul>
              <p className="mb-0">
                <strong>Conversion Price (at Series A):</strong> LOWER of:
                <br />• Series A price × (1 - {formatPercentage(calc.discountRate)})
                <br />• Valuation Cap ÷ Total Shares
              </p>
            </div>

            {/* ===== PRE-SEED CAP TABLE ===== */}
            {preSeedTable && (
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">📋 Common Shares at Pre-Seed Round 1</h5>
                      <small>{preSeedTable.message}</small>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          <thead className="table-dark">
                            <tr>
                              <th>Management</th>
                              <th className="text-center">Contact Info</th>
                              <th className="text-center">Common Shares</th>
                              <th className="text-center">New Shares</th>
                              <th className="text-center">Fully Diluted Ownership %</th>
                              <th className="text-center">Value ($)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {preSeedTable.shareholders.map((sh, idx) => (
                              <tr key={idx} className={sh.type === "Options Pool" ? "table-warning" : ""}>
                                <td>
                                  <div>
                                    <strong className={
                                      sh.type === "Founder" ? "text-primary" :
                                        sh.type === "Options Pool" ? "text-warning" : "text-info"
                                    }>
                                      {sh.name}
                                    </strong>
                                    {sh.fullName && sh.fullName !== sh.name && (
                                      <div className="small text-muted">{sh.fullName}</div>
                                    )}
                                    <span className={`badge mt-1 ${sh.type === "Founder" ? "bg-primary" :
                                      sh.type === "Options Pool" ? "bg-warning text-dark" : "bg-info"
                                      }`}>
                                      {sh.type}
                                    </span>
                                  </div>
                                </td>
                                <td className="text-center small">
                                  {sh.email && sh.email !== "-" ? (
                                    <div className="text-muted">📧 {sh.email}</div>
                                  ) : <span className="text-muted">-</span>}
                                </td>
                                <td className="text-center">
                                  <strong className="text-dark">{formatNumber(sh.shares)}</strong>
                                </td>
                                <td className="text-center">
                                  <span className={`badge ${sh.newShares > 0 ? "bg-success" : "bg-secondary"}`}>
                                    {formatNumber(sh.newShares)}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <span className={`fSize-16 badge ${sh.type === "Founder" ? "bg-primary" :
                                    sh.type === "Options Pool" ? "bg-warning text-dark" : "bg-secondary"
                                    }`}>
                                    {formatPercentage(sh.ownership)}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <strong>{formatCurrency(sh.value, currency)}</strong>
                                </td>
                              </tr>
                            ))}

                            {/* TOTAL ROW */}
                            <tr className="table-secondary fw-bold">
                              <td colSpan="2">TOTAL</td>
                              <td className="text-center">{formatNumber(preSeedTable.totalShares)}</td>
                              <td className="text-center">
                                {formatNumber(preSeedTable.shareholders.reduce((sum, sh) => sum + sh.newShares, 0))}
                              </td>
                              <td className="text-center">{formatPercentage(100)}</td>
                              <td className="text-center">{formatCurrency(preSeedTable.totalValue, currency)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Ownership Breakdown */}
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <div className="alert alert-primary mb-0">
                            <strong>Total Founders Ownership:</strong> {formatPercentage(
                              preSeedTable.shareholders
                                .filter(sh => sh.type === "Founder")
                                .reduce((sum, sh) => sum + sh.ownership, 0)
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="alert alert-warning mb-0">
                            <strong>Employee Pool Ownership:</strong> {formatPercentage(
                              preSeedTable.shareholders
                                .filter(sh => sh.type === "Options Pool")
                                .reduce((sum, sh) => sum + sh.ownership, 0)
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== POST-SEED CAP TABLE ===== */}
            {postSeedTable && (
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className="card border-success">
                    <div className="card-header bg-success text-white">
                      <h5 className="mb-0">📋 Common Shares at Post-Seed Round 1</h5>
                      <small>{postSeedTable.message}</small>
                    </div>
                    <div className="card-body">

                      {/* Highlight Box */}
                      <div className="alert alert-info mb-3">
                        <strong>📌 Key Point:</strong> Since SAFE notes do NOT convert to shares in this round,
                        the total number of shares remains <strong>{formatNumber(postSeedTable.totalShares)}</strong>
                        (same as Pre-Seed). SAFE investors are listed with 0 shares.
                      </div>

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
                              <th className="text-center">Value ($)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {postSeedTable.shareholders.map((sh, idx) => (
                              <tr key={idx} className={
                                sh.type === "Options Pool" ? "table-warning" :
                                  sh.type === "SAFE Investor" ? "table-info" : ""
                              }>
                                <td>
                                  <div>
                                    <strong className={
                                      sh.type === "Founder" ? "text-primary" :
                                        sh.type === "Options Pool" ? "text-warning" :
                                          sh.type === "SAFE Investor" ? "text-info" : "text-dark"
                                    }>
                                      {sh.name}
                                    </strong>
                                    {sh.fullName && sh.fullName !== sh.name && (
                                      <div className="small text-muted">{sh.fullName}</div>
                                    )}
                                    <span className={`badge mt-1 ${sh.type === "Founder" ? "bg-primary" :
                                      sh.type === "Options Pool" ? "bg-warning text-dark" :
                                        sh.type === "SAFE Investor" ? "bg-info" : "bg-secondary"
                                      }`}>
                                      {sh.type}
                                    </span>
                                  </div>
                                </td>
                                <td className="text-center small">
                                  {sh.email && sh.email !== "-" ? (
                                    <div className="text-muted">📧 {sh.email}</div>
                                  ) : <span className="text-muted">-</span>}
                                </td>
                                <td className="text-center">
                                  <strong className="text-dark">{formatNumber(sh.shares)}</strong>
                                  {sh.type === "SAFE Investor" && (
                                    <div className="small text-danger fw-bold mt-1">
                                      ⚠️ Not converted
                                    </div>
                                  )}
                                </td>
                                <td className="text-center">
                                  <span className={`badge ${sh.newShares > 0 ? "bg-success" : "bg-secondary"}`}>
                                    {formatNumber(sh.newShares)}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <strong className="text-primary">{formatNumber(sh.shares + sh.newShares)}</strong>
                                </td>
                                <td className="text-center">
                                  <span className={`fSize-16 badge ${sh.type === "Founder" ? "bg-primary" :
                                    sh.type === "Options Pool" ? "bg-warning text-dark" :
                                      sh.type === "SAFE Investor" ? "bg-info" : "bg-secondary"
                                    }`}>
                                    {formatPercentage(sh.ownership)}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <strong>{formatCurrency(sh.value, currency)}</strong>
                                  {sh.investmentAmount > 0 && (
                                    <div className="small text-success mt-1">
                                      💰 SAFE: {formatCurrency(sh.investmentAmount, currency)}
                                    </div>
                                  )}
                                  {sh.note && (
                                    <div className="small text-muted mt-1">{sh.note}</div>
                                  )}
                                </td>
                              </tr>
                            ))}

                            {/* TOTAL ROW */}
                            <tr className="table-success fw-bold">
                              <td colSpan="2">TOTAL</td>
                              <td className="text-center">{formatNumber(postSeedTable.totalShares)}</td>
                              <td className="text-center">
                                {formatNumber(postSeedTable.shareholders.reduce((sum, sh) => sum + sh.newShares, 0))}
                              </td>
                              <td className="text-center">{formatNumber(postSeedTable.totalShares)}</td>
                              <td className="text-center">{formatPercentage(100)}</td>
                              <td className="text-center">{formatCurrency(postSeedTable.totalValue, currency)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Ownership Summary */}
                      <div className="row mt-4">
                        <div className="col-md-4">
                          <div className="alert alert-primary mb-0">
                            <small>Total Founders Ownership</small>
                            <h5 className="mb-0">{formatPercentage(
                              postSeedTable.shareholders
                                .filter(sh => sh.type === "Founder")
                                .reduce((sum, sh) => sum + sh.ownership, 0)
                            )}</h5>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="alert alert-warning mb-0">
                            <small>Employee Pool</small>
                            <h5 className="mb-0">{formatPercentage(
                              postSeedTable.shareholders
                                .filter(sh => sh.type === "Options Pool")
                                .reduce((sum, sh) => sum + sh.ownership, 0)
                            )}</h5>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="alert alert-info mb-0">
                            <small>SAFE Investment (Not Converted)</small>
                            <h5 className="mb-0">{formatCurrency(postSeedTable.safeInvestment || 0, currency)}</h5>
                            <small className="text-muted">{postSeedTable.safeInvestorCount || 0} investors</small>
                          </div>
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== PLATFORM OUTPUTS SUMMARY ===== */}
            <div className="card bg-light">
              <div className="card-header">
                <h5 className="mb-0">📊 Platform Outputs Summary</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-primary">Pre-Seed Round 1</h6>
                    <ul className="list-unstyled">
                      <li>✅ Total Shares: <strong>{formatNumber(calc.totalSharesPreSeed)}</strong></li>
                      <li>✅ Founder Shares: <strong>{formatNumber(calc.roundZeroTotalShares)}</strong></li>
                      <li>✅ Employee Shares: <strong>{formatNumber(calc.employeeShares)}</strong></li>
                      <li>✅ Total Value: <strong>{formatCurrency(calc.companyValue, currency)}</strong></li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-success">Post-Seed Round 1</h6>
                    <ul className="list-unstyled">
                      <li>✅ Total Shares: <strong>{formatNumber(calc.totalSharesPostSeed)}</strong> (Same as Pre-Seed)</li>
                      <li>✅ SAFE Investment: <strong>{formatCurrency(calc.investmentSize, currency)}</strong></li>
                      <li>⚠️ SAFE Shares: <strong className="text-danger">0</strong> (Not converted)</li>
                      <li>✅ Total Value: <strong>{formatCurrency(calc.companyValue, currency)}</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion Info */}
            {capTableData.conversionInfo && (
              <div className="alert alert-secondary mt-4">
                <h6 className="alert-heading">📋 {capTableData.conversionInfo.note}</h6>
                <div className="row">
                  <div className="col-md-4">
                    <small className="text-muted">Conversion Trigger</small>
                    <div><strong>{capTableData.conversionInfo.conversionTrigger}</strong></div>
                  </div>
                  <div className="col-md-4">
                    <small className="text-muted">Valuation Cap</small>
                    <div><strong>{formatCurrency(capTableData.conversionInfo.valuationCap, currency)}</strong></div>
                  </div>
                  <div className="col-md-4">
                    <small className="text-muted">Discount Rate</small>
                    <div><strong>{formatPercentage(capTableData.conversionInfo.discountRate)}</strong></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  const renderSAFESeriesRoundTable = () => {
    if (!capTableData || !capTableData.calculations) return null;

    console.log("Cap Table Data:", capTableData);
    const calc = capTableData.calculations;

    // ✅ Get data from backend response structure
    const preTable = capTableData.preSeedCapTable;
    const postTable = capTableData.postSeedCapTable;
    const inputs = capTableData.inputs || {};

    // ✅ Determine round type from backend data
    const isSeriesA = capTableData.isSeriesA ||
      (capTableData.shareClassType || "").toLowerCase().includes("series");

    const hasSAFEConversion = capTableData.hasSAFEConversion ||
      (calc.seedConversionShares > 0);

    // Helper functions
    const formatCurrency = (amount) => {
      const currency = capTableData.currency || "USD";
      const currencyCode = currency.split(' ')[0] || 'USD';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount || 0);
    };

    const formatNumber = (num) => {
      return new Intl.NumberFormat('en-US').format(Math.round(num || 0));
    };

    const formatPercentage = (percent) => {
      const numValue = typeof percent === 'string' ? parseFloat(percent) : (percent || 0);
      return `${numValue.toFixed(1)}%`;
    };

    // ✅ Calculate ownership percentages
    const getOwnershipSummary = (shareholders, totalShares) => {
      if (!shareholders || !totalShares) return {
        founders: 0,
        employees: 0,
        seedInvestors: 0,
        seriesAInvestors: 0
      };

      let founders = 0;
      let employees = 0;
      let seedInvestors = 0;
      let seriesAInvestors = 0;

      shareholders.forEach(sh => {
        const ownership = (sh.shares / totalShares) * 100;
        if (sh.type === "Founder") founders += ownership;
        else if (sh.type === "Options Pool" || sh.type.includes("Employee")) employees += ownership;
        else if (sh.type === "SAFE Investor" || sh.type.includes("Seed")) seedInvestors += ownership;
        else if (sh.type === "Series A Investor") seriesAInvestors += ownership;
      });

      return {
        founders: founders.toFixed(1),
        employees: employees.toFixed(1),
        seedInvestors: seedInvestors.toFixed(1),
        seriesAInvestors: seriesAInvestors.toFixed(1)
      };
    };

    // ✅ Get ownership data
    const preOwnership = getOwnershipSummary(preTable?.shareholders, preTable?.totalShares);
    const postOwnership = getOwnershipSummary(postTable?.shareholders, postTable?.totalShares);

    // ✅ Debug information
    console.log("Calculations:", {
      seedInvestment: calc.seedInvestment,
      valuationCap: calc.valuationCap,
      discountRate: calc.discountRate,
      sharePrice: calc.sharePrice,
      seedOptimalPrice: calc.seedOptimalPrice,
      seedConversionShares: calc.seedConversionShares,
      seriesAShares: calc.seriesAShares,
      totalPostShares: calc.totalSharesPostSeed
    });

    var roundname = capTableData.instrumentType + ' ' + capTableData.shareClassType;
    const formatCurrencyTwoDecimals = (value) => {
      const currency = capTableData.currency || "USD";
      const currencyCode = currency.split(' ')[0] || 'USD';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value || 0);
    }
    return (
      <div className="cap-table-section">
        <div className="card mb-4">
          <div className={`card-header ${isSeriesA ? 'bg-primary' : 'bg-success'} text-white`}>
            <h4 className="mb-0">{capTableData.roundType || "Series A Round"}</h4>
            <small>
              {isSeriesA ? roundname : "Investment Round"}
              {hasSAFEConversion && " with SAFE Conversion"}
            </small>
          </div>
          <div className="card-body">

            {/* ===== INPUT PARAMETERS SECTION ===== */}
            <h5 className="mb-3">📊 {capTableData.roundType}</h5>
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Pre-Money Valuation</small>
                  <h5>{formatCurrency(inputs.preMoneyValuation || calc.preMoneyValuation)}</h5>
                </div>
              </div>

              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">{capTableData.shareClassType} Investment</small>
                  <h5>{formatCurrency(inputs.seriesAInvestment || calc.seriesAInvestment)}</h5>
                </div>
              </div>

              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Founder Shares (Round 0)</small>
                  <h5>{formatNumber(inputs.roundZeroShares || calc.roundZeroTotalShares)}</h5>
                  <small>{inputs.founderCount || preTable?.shareholders?.filter(sh => sh.type === "Founder").length || 0} founder(s)</small>
                </div>
              </div>


            </div>

            {/* SAFE CONVERSION SECTION (Only if has SAFE conversion) */}
            {hasSAFEConversion && calc.seedInvestment > 0 && (
              <>
                <div className="row mb-4">
                  <div className="col-md-4">
                    <div className="info-box p-3 border rounded bg-info text-white">
                      <small>Seed SAFE Investment</small>
                      <h5>{formatCurrency(calc.seedInvestment)}</h5>
                      <small>From previous SAFE round</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-box p-3 border rounded bg-warning text-dark">
                      <small>Valuation Cap</small>
                      <h5>{formatCurrency(calc.valuationCap)}</h5>
                      <small>From SAFE terms</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info-box p-3 border rounded bg-success text-white">
                      <small>Discount Rate</small>
                      <h5>{calc.discountRate}%</h5>
                      <small>From SAFE terms</small>
                    </div>
                  </div>
                </div>

                {/* SAFE CONVERSION CALCULATIONS */}
                {calc.seedOptimalPrice > 0 && (
                  <div className="alert alert-success mb-4">
                    <h6 className="alert-heading">🔄 SAFE Conversion Calculations</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <p><strong>1. {capTableData.shareClassType} Share Price:</strong></p>
                        <p className="small">
                          {formatCurrency(inputs.preMoneyValuation || calc.preMoneyValuation)} ÷ {formatNumber(inputs.roundZeroShares || calc.roundZeroTotalShares + calc.employeeSharesSeedRound)} =
                          <span className="fw-bold ms-2">{formatCurrency(calc.sharePrice)}</span>
                        </p>

                        <p><strong>2. Seed Discount Price:</strong></p>
                        <p className="small">
                          {formatCurrency(calc.sharePrice)} × (1 - {calc.discountRate / 100}) =
                          <span className="fw-bold ms-2">{formatCurrency(calc.seedDiscountPrice)}</span>
                        </p>

                        <p><strong>3. Seed Cap Price:</strong></p>
                        <p className="small">
                          {formatCurrency(calc.valuationCap)} ÷ {formatNumber(calc.totalSharesPreSeed)} =
                          <span className="fw-bold ms-2">{formatCurrencyTwoDecimals(calc.valuationCap / calc.totalSharesPreSeed)}</span>
                        </p>
                      </div>

                      <div className="col-md-6">
                        <p><strong>4. Optimal Price (Lower of the two):</strong></p>
                        <p className="small">
                          MIN({formatCurrency(calc.seedDiscountPrice)}) =
                          <span className="fw-bold ms-2 text-success">{formatCurrency(calc.seedOptimalPrice)}</span>
                        </p>

                        <p><strong>5. Seed Conversion Shares:</strong></p>
                        <p className="small">
                          {formatCurrency(calc.seedInvestment)} ÷ {formatCurrency(calc.seedOptimalPrice)} =
                          <span className="fw-bold ms-2">{formatNumber(calc.seedConversionShares)} shares</span>
                        </p>

                        <p><strong>6. Seed Conversion Value:</strong></p>
                        <p className="small">
                          {formatNumber(calc.seedConversionShares)} × {formatCurrency(calc.sharePrice)} =
                          <span className="fw-bold ms-2">{formatCurrency(calc.seedConversionValue)}</span>
                        </p>
                      </div>
                    </div>

                    {/* MOIC Information */}
                    <div className="mt-3 p-2 bg-white rounded border">
                      <p className="mb-1"><strong>MOIC (Multiple on Invested Capital):</strong></p>
                      <p className="mb-0 small">
                        Seed Investors: <strong>{calc.seedMOIC}</strong> ({formatCurrency(calc.seedConversionValue)} value / {formatCurrency(calc.seedInvestment)} investment)
                        {calc.seriesAMOIC && calc.seriesAMOIC !== "0X" && (
                          <> | {capTableData.shareClassType} Investors: <strong>{calc.seriesAMOIC}</strong></>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* OPTION POOL SECTION */}
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Existing Option Pool</small>
                  <h5>{formatPercentage(calc.existingOptionPoolPercent)}</h5>
                  <small>{formatNumber(calc.employeeSharesSeedRound)} shares</small>
                </div>
              </div>

              {/* <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-primary text-white">
                  <small className="text-white">Target Option Pool</small>
                  <h5>{formatPercentage(calc.targetOptionPoolPercent)}</h5>
                  <small>Post-investment target</small>
                </div>
              </div>

              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-success text-white">
                  <small>New Option Shares</small>
                  <h5>{formatNumber(calc.newOptionShares)}</h5>
                  <small>Top-up required</small>
                </div>
              </div> */}
            </div>

            {/* OPTION POOL CALCULATION EXPLANATION */}
            {calc.newOptionShares > 0 && (
              <div className="alert alert-info mb-4">
                <h6 className="alert-heading">📐 Option Pool</h6>
                <p className="mb-2 small">
                  <strong>Formula:</strong> Total Post Shares = (Founders + Seed Investors + {capTableData.shareClassType} Investors) ÷ (1 - Target Option Pool %)
                </p>
                <p className="mb-2 small">
                  <strong>Calculation:</strong>
                  ({formatNumber(inputs.roundZeroShares || calc.roundZeroTotalShares)} + {formatNumber(calc.seedConversionShares)} + {formatNumber(calc.seriesAShares)}) ÷ (1 - {calc.targetOptionPoolPercent / 100})
                </p>
                <p className="mb-0 small">
                  <strong>Result:</strong> Need to add {formatNumber(calc.newOptionShares)} new option shares to reach {formatPercentage(calc.targetOptionPoolPercent)} target pool
                </p>
              </div>
            )}

            {/* ===== PRE-INVESTMENT CAP TABLE ===== */}
            {/* ===== PRE-INVESTMENT CAP TABLE ===== */}
            {preTable && preTable.shareholders && preTable.shareholders.length > 0 && (
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header bg-secondary text-white">
                      <h5 className="mb-0">📋 Common Shares at Pre-{capTableData.shareClassType} Round</h5>
                      <small>{preTable.message}</small>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          <thead className="table-dark">
                            <tr>
                              <th>Shareholder</th>
                              <th className="text-center">Type</th>
                              <th className="text-center">Existing Shares</th>
                              <th className="text-center">New Shares</th>
                              <th className="text-center">Total Shares</th>
                              <th className="text-center">Ownership %</th>
                              <th className="text-center">Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            {preTable.shareholders.map((sh, idx) => {
                              const hasNewShares = sh.newShares > 0;
                              const totalShares = sh.shares;
                              const existingShares = totalShares - (sh.newShares || 0);

                              return (
                                <tr key={idx} className={
                                  sh.type === "Options Pool" || sh.type.includes("Employee") ? "table-warning" :
                                    sh.type === "Founder" ? "" : "table-light"
                                }>
                                  <td>
                                    <div>
                                      <strong>{sh.name || sh.fullName}</strong>
                                      {sh.note && <div className="small text-muted">{sh.note}</div>}
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <span className={`badge ${sh.type === "Founder" ? "bg-primary" :
                                      sh.type === "Options Pool" || sh.type.includes("Employee") ? "bg-warning text-dark" : "bg-info"
                                      }`}>
                                      {sh.type}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <strong>{formatNumber(existingShares)}</strong>
                                  </td>
                                  <td className="text-center">
                                    {hasNewShares ? (
                                      <>
                                        <strong className="text-success">+{formatNumber(sh.newShares)}</strong>

                                      </>
                                    ) : (
                                      <span className="text-muted">—</span>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <strong>{formatNumber(totalShares)}</strong>
                                    {hasNewShares && (
                                      <div className="small text-success">
                                        {/* ↑ from {formatNumber(existingShares)} */}
                                      </div>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <span className="badge bg-dark">
                                      {formatPercentage(sh.ownership || ((totalShares / preTable.totalShares) * 100))}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <strong>{formatCurrency(sh.value)}</strong>
                                  </td>
                                </tr>
                              );
                            })}

                            {/* TOTAL ROW */}
                            <tr className="table-secondary fw-bold">
                              <td colSpan="2">TOTAL</td>
                              <td className="text-center">
                                {formatNumber(
                                  preTable.shareholders.reduce((sum, sh) => sum + (sh.shares - (sh.newShares || 0)), 0)
                                )}
                              </td>
                              <td className="text-center">
                                {formatNumber(
                                  preTable.shareholders.reduce((sum, sh) => sum + (sh.newShares || 0), 0)
                                )}
                              </td>
                              <td className="text-center">{formatNumber(preTable.totalShares)}</td>
                              <td className="text-center">100%</td>
                              <td className="text-center">{formatCurrency(preTable.totalValue)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== POST-INVESTMENT CAP TABLE ===== */}
            {postTable && postTable.shareholders && postTable.shareholders.length > 0 && (
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className={`card border-primary`}>
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">📋 Common Shares at Post-{capTableData.shareClassType} Round</h5>
                      <small>{postTable.message}</small>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          <thead className="table-dark">
                            <tr>
                              <th>Shareholder</th>
                              <th className="text-center">Type</th>
                              <th className="text-center">Common Shares</th>
                              <th className="text-center">New Shares</th>
                              <th className="text-center">Total Shares</th>
                              <th className="text-center">Ownership %</th>
                              <th className="text-center">Value</th>
                              {hasSAFEConversion && <th className="text-center">Investment / Conversion Price</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {postTable.shareholders.map((sh, idx) => (
                              sh.isTotal ? (
                                // TOTAL ROW - Show at the end
                                <tr key={idx} className="table-primary fw-bold">
                                  <td colSpan="2"><strong>TOTAL</strong></td>
                                  <td className="text-center"><strong>{formatNumber(sh.commonShares)}</strong></td>
                                  <td className="text-center"><strong>{formatNumber(sh.newShares)}</strong></td>
                                  <td className="text-center"><strong>{formatNumber(sh.totalShares)}</strong></td>
                                  <td className="text-center"><strong>100%</strong></td>
                                  <td className="text-center"><strong>{formatCurrency(sh.value)}</strong></td>
                                  {hasSAFEConversion && (
                                    <td className="text-center">
                                      <strong>{formatCurrency(postTable.safeInvestment || calc.seedInvestment + calc.seriesAInvestment)}</strong>
                                    </td>
                                  )}
                                </tr>
                              ) : (
                                // REGULAR ROWS
                                <tr key={idx} className={
                                  sh.type === "Options Pool" || sh.type.includes("Employee") ? "table-warning" :
                                    sh.type === "SAFE Investor" || sh.type.includes("Seed") ? "table-info" :
                                      sh.type === "Series A Investor" ? "table-primary" : ""
                                }>
                                  <td>
                                    <strong>{sh.name || sh.fullName}</strong>
                                    {sh.note && <div className="small text-muted">{sh.note}</div>}
                                  </td>
                                  <td className="text-center">
                                    <span className={`badge ${sh.type === "Founder" ? "bg-primary" :
                                      sh.type === "Options Pool" || sh.type.includes("Employee") ? "bg-warning text-dark" :
                                        sh.type === "SAFE Investor" || sh.type.includes("Seed") ? "bg-info" :
                                          sh.type === "Series A Investor" ? "bg-success" : "bg-secondary"
                                      }`}>
                                      {sh.type}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    {sh.commonShares > 0 ? (
                                      <strong>{formatNumber(sh.commonShares)}</strong>
                                    ) : (
                                      <span className="text-muted">-</span>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    {sh.newShares > 0 ? (
                                      <div>
                                        <strong className="text-success">{formatNumber(sh.newShares)}</strong>
                                        {sh.displayText && (
                                          <div className="small text-success">{sh.displayText}</div>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="text-muted">-</span>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <strong>{formatNumber(sh.totalShares || sh.shares)}</strong>
                                    {/* Show breakdown for Option Pool if available */}
                                    {sh.breakdown && (
                                      <div className="small text-muted">
                                        {sh.breakdown.existingShares > 0 && (
                                          <div>{formatNumber(sh.breakdown.existingShares)} existing</div>
                                        )}
                                        {sh.breakdown.newShares > 0 && (
                                          <div>+{formatNumber(sh.breakdown.newShares)} new</div>
                                        )}
                                      </div>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <span className={`badge ${sh.type === "Founder" ? "bg-dark" :
                                      sh.type === "Options Pool" || sh.type.includes("Employee") ? "bg-warning text-dark" :
                                        sh.type === "SAFE Investor" || sh.type.includes("Seed") ? "bg-info" :
                                          sh.type === "Series A Investor" ? "bg-success" : "bg-secondary"
                                      }`}>
                                      {formatPercentage(sh.ownership || ((sh.totalShares || sh.shares) / postTable.totalShares) * 100)}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <strong>{formatCurrency(sh.value)}</strong>
                                  </td>
                                  {hasSAFEConversion && (
                                    <td className="text-center">
                                      {sh.investmentAmount ? (
                                        <div>
                                          <div className="fw-bold">{formatCurrency(sh.investmentAmount)}</div>
                                          {sh.conversionPrice && (
                                            <div className="small">
                                              @ {formatCurrency(sh.conversionPrice)}/share
                                            </div>
                                          )}
                                          {sh.moic && sh.moic !== "0X" && (
                                            <div className="small text-success">
                                              MOIC: {sh.moic}
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <span className="text-muted">-</span>
                                      )}
                                    </td>
                                  )}
                                </tr>
                              )
                            ))}

                            {/* OLD TOTAL ROW - Remove if using isTotal flag in data */}
                            {/* <tr className="table-primary fw-bold">
      <td colSpan="2">TOTAL</td>
      <td className="text-center">{formatNumber(postTable.totalShares)}</td>
      <td className="text-center">100%</td>
      <td className="text-center">{formatCurrency(postTable.totalValue)}</td>
      {hasSAFEConversion && <td className="text-center">
        {formatCurrency(postTable.safeInvestment || calc.seedInvestment + calc.seriesAInvestment)}
      </td>}
    </tr> */}
                          </tbody>
                        </table>
                      </div>

                      {/* Final Summary */}
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="alert alert-success">
                            <h6 className="mb-2">Final Ownership Distribution</h6>
                            <div className="row small">
                              <div className="col-6">Founders:</div>
                              <div className="col-6 text-end">{formatPercentage(postOwnership.founders)}</div>
                              <div className="col-6">Employees:</div>
                              <div className="col-6 text-end">{formatPercentage(postOwnership.employees)}</div>
                              {hasSAFEConversion && (
                                <>
                                  <div className="col-6">Seed Investors:</div>
                                  <div className="col-6 text-end">{formatPercentage(postOwnership.seedInvestors)}</div>
                                  <div className="col-6">Series A Investors:</div>
                                  <div className="col-6 text-end">{formatPercentage(postOwnership.seriesAInvestors)}</div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* <div className="col-md-6">
                          <div className="alert alert-primary">
                            <h6 className="mb-2">Financial Summary</h6>
                            <div className="row small">
                              <div className="col-6">Post-Money Valuation:</div>
                              <div className="col-6 text-end">{formatCurrency(calc.finalPostMoneyValuation || postTable.totalValue)}</div>
                              <div className="col-6">Total Investment:</div>
                              <div className="col-6 text-end">{formatCurrency(calc.seedInvestment + calc.seriesAInvestment)}</div>
                              <div className="col-6">Total Shares:</div>
                              <div className="col-6 text-end">{formatNumber(postTable.totalShares)}</div>
                              <div className="col-6">Share Price:</div>
                              <div className="col-6 text-end">{formatCurrency(calc.sharePrice)}</div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== SUMMARY ===== */}
            <div className="card bg-light">
              <div className="card-header">
                <h5 className="mb-0">📊 Round Summary</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Key Outcomes:</h6>
                    <ul className="mb-0">
                      <li>✅ Total capital raised: <strong>{formatCurrency(calc.seedInvestment + calc.seriesAInvestment)}</strong></li>
                      <li>✅ Post-money valuation: <strong>{formatCurrency(calc.finalPostMoneyValuation)}</strong></li>
                      <li>✅ Total shares outstanding: <strong>{formatNumber(calc.totalSharesPostSeed)}</strong></li>
                      <li>✅ Share price: <strong>{formatCurrency(calc.sharePrice)}</strong></li>
                      {hasSAFEConversion && calc.seedConversionShares > 0 && (
                        <li>✅ SAFE conversion completed: <strong>{formatNumber(calc.seedConversionShares)} shares @ {formatCurrency(calc.seedOptimalPrice)} each</strong></li>
                      )}
                      {calc.newOptionShares > 0 && (
                        <li>✅ Option pool: <strong>{formatNumber(calc.newOptionShares)} new shares added</strong></li>
                      )}
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <h6>Next Steps:</h6>
                    <ul className="mb-0">
                      <li>✅ SAFE notes converted to shares</li>
                      <li>✅ New Series A investors onboarded</li>
                      <li>🔜 Update cap table with new shareholders</li>
                      <li>🔜 Issue share certificates</li>
                      <li>🔜 Prepare for Series B round</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSeriesATable = () => {
    if (!capTableData || !capTableData.calculations) return null;

    const calc = capTableData.calculations;
    const currency = capTableData.currency || "USD";

    if (capTableData.error) {
      return (
        <div className="alert alert-danger">
          <h5>Calculation Error</h5>
          <p>{capTableData.error}</p>
          {capTableData.details && (
            <pre className="small">{JSON.stringify(capTableData.details, null, 2)}</pre>
          )}
        </div>
      );
    }

    const isPostMoneyOptionPool = capTableData.isPostMoneyOptionPool || calc.needsExpansion;

    // ✅ FIX: Calculate foundersSeedShares if not provided
    const foundersSeedShares = calc.foundersSeedShares ||
      (calc.preInvestmentTotalShares - calc.existingOptionPoolShares);
    var roundname = capTableData.instrumentType + ' ' + capTableData.shareClassType;
    return (
      <div className="cap-table-section">
        <div className="card mb-4">
          <div className="card-header bg-warning text-dark">
            <h4 className="mb-0">{capTableData.roundType || "Series A Round"}</h4>
            <small className="opacity-75">
              {isPostMoneyOptionPool ? "Post-Money Option Pool Calculation" : "Standard Calculation"}
            </small>
          </div>

          <div className="card-body">
            {/* SERIES A INPUTS */}
            <h5 className="mb-3">{roundname} Inputs</h5>
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
                  <small className="text-muted">Existing Option Pool %</small>
                  <h5>{formatPercentage(calc.existingOptionPoolPercent)}</h5>
                  <small className="text-muted">(Before Series A)</small>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Target Option Pool %</small>
                  <h5 className="text-success">{formatPercentage(calc.optionPoolPercentPost)}</h5>
                  <small className="text-success">(Post-Money Target)</small>
                </div>
              </div>
            </div>

            {/* SERIES A OUTPUTS */}
            <h5 className="mb-3">Calculated Outputs</h5>
            <div className="row mb-4">
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-primary text-white">
                  <small>Post-Money Valuation</small>
                  <h6>{formatCurrency(calc.postMoneyValuation, currency)}</h6>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-success text-white">
                  <small>Share Price</small>
                  <h6>{formatCurrencyPricePerShare(calc.sharePrice, currency)}</h6>
                  <small className="opacity-75">per share</small>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-info text-white">
                  <small>Pre-Investment Shares</small>
                  <h6>{formatNumber(calc.preInvestmentTotalShares)}</h6>
                  <small className="opacity-75">Before Series A</small>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-warning text-dark">
                  <small>New Shares Issued</small>
                  <h6>{formatNumber(calc.totalNewShares)}</h6>
                  <small className="opacity-75">Total new shares</small>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-dark text-white">
                  <small>Post-Investment Shares</small>
                  <h6>{formatNumber(calc.postInvestmentTotalShares)}</h6>
                  <small className="opacity-75">After Series A</small>
                </div>
              </div>
              <div className="col-md-2">
                <div className="info-box p-3 border rounded bg-secondary text-white">
                  <small>Investor Ownership</small>
                  <h6>{formatPercentage(calc.investorOwnershipPercent)}</h6>
                  <small className="opacity-75">Series A %</small>
                </div>
              </div>
            </div>

            {/* NEW SHARES BREAKDOWN */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="alert alert-warning">
                  <h6 className="alert-heading">📊 New Shares Breakdown</h6>
                  <div className="row">
                    <div className="col-6">
                      <strong>Series A Investors:</strong>
                      <div className="h5 mb-0">{formatNumber(calc.seriesAInvestorShares)}</div>
                    </div>
                    <div className="col-6">
                      <strong>Option Pool Expansion:</strong>
                      <div className="h5 mb-0">{formatNumber(calc.additionalOptionPoolShares)}</div>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total New Shares:</strong>
                    <strong>{formatNumber(calc.totalNewShares)}</strong>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="alert alert-info">
                  <h6 className="alert-heading">🎯 Option Pool Status</h6>
                  <div className="mb-2">
                    <strong>Existing Pool:</strong> {formatNumber(calc.existingOptionPoolShares)} shares
                    ({formatPercentage(calc.existingOptionPoolPercent)})
                  </div>
                  <div className="mb-2">
                    <strong>Additional:</strong> {formatNumber(calc.additionalOptionPoolShares)} shares
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total Pool (Post):</strong>
                    <strong>{formatNumber(calc.totalOptionPoolShares)}
                      ({formatPercentage(calc.optionPoolPercentPost)})</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* OWNERSHIP CHART */}
            <div className="mb-4">
              <RoundCapChart chartData={capTableData.chartData} />
            </div>

            {/* ========== PRE-SERIES A CAP TABLE ========== */}
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">📋 Pre-Series A Cap Table</h5>
                    <small>Before Series A Investment | Pre-Money Valuation: {formatCurrency(calc.preMoneyValuation, currency)}</small>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Shareholder</th>
                            <th className="text-center">Type</th>
                            <th className="text-center">Common Shares</th>
                            <th className="text-center">Fully Diluted Ownership %</th>
                            <th className="text-center">Value ({currency})</th>
                          </tr>
                        </thead>
                        <tbody>
                          {capTableData.preSeriesAShareholders && capTableData.preSeriesAShareholders.length > 0 ? (
                            capTableData.preSeriesAShareholders.map((sh, idx) => (
                              <tr key={idx}>
                                <td>
                                  <strong>{sh.name}</strong>
                                  {sh.source && (
                                    <div className="small text-muted">Source: {sh.source}</div>
                                  )}
                                </td>
                                <td className="text-center">
                                  {sh.type === "Founder" && (
                                    <span className="badge bg-primary">Founder</span>
                                  )}
                                  {sh.type === "Options Pool" && (
                                    <span className="badge bg-warning text-dark">Option Pool</span>
                                  )}
                                  {sh.type === "Investor" && (
                                    <span className="badge bg-success">
                                      {sh.originalType === "Seed Investor" ? "Seed Investor" : "Investor"}
                                    </span>
                                  )}
                                </td>
                                <td className="text-center">
                                  <strong>{formatNumber(sh.shares)}</strong>
                                </td>
                                <td className="text-center">
                                  <span className={`badge ${sh.type === "Founder" ? "bg-primary" :
                                    sh.type === "Options Pool" ? "bg-warning text-dark" :
                                      "bg-success"
                                    }`}>
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
                                <strong>⚠️ No pre-Series A shareholders data available</strong>
                              </td>
                            </tr>
                          )}

                          {/* TOTAL ROW */}
                          <tr className="table-secondary fw-bold">
                            <td colSpan="2">TOTAL</td>
                            <td className="text-center">{formatNumber(calc.preInvestmentTotalShares)}</td>
                            <td className="text-center">
                              <span className="badge bg-dark">{formatPercentage(100)}</span>
                            </td>
                            <td className="text-center">{formatCurrency(calc.preMoneyValuation, currency)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Pre-Series A Summary */}
                    <div className="row mt-3">
                      <div className="col-md-4">
                        <div className="alert alert-primary mb-0">
                          <strong>Founders:</strong> {formatPercentage(
                            (capTableData.preSeriesAShareholders || [])
                              .filter(sh => sh.type === "Founder")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="alert alert-warning mb-0">
                          <strong>Employee Option Pool:</strong> {formatPercentage(
                            (capTableData.preSeriesAShareholders || [])
                              .filter(sh => sh.type === "Options Pool")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="alert alert-success mb-0">
                          <strong>Seed Investors:</strong> {formatPercentage(
                            (capTableData.preSeriesAShareholders || [])
                              .filter(sh => sh.type === "Investor")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========== POST-SERIES A CAP TABLE ========== */}
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header bg-success text-white">
                    <h5 className="mb-0">📊 Post-Series A Cap Table</h5>
                    <small>After Series A Investment | Post-Money Valuation: {formatCurrency(calc.postMoneyValuation, currency)}</small>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Shareholder</th>
                            <th className="text-center">Type</th>
                            <th className="text-center">Common Shares</th>
                            <th className="text-center">New Shares</th>
                            <th className="text-center">Total Shares</th>
                            <th className="text-center">Fully Diluted Ownership %</th>
                            <th className="text-center">Value ({currency})</th>
                          </tr>
                        </thead>
                        <tbody>
                          {capTableData.shareholders && capTableData.shareholders.length > 0 ? (
                            capTableData.shareholders.map((sh, idx) => {
                              const existingShares = sh.preSeriesAShares || 0;
                              const newShares = sh.newShares || 0;

                              return (
                                <tr key={idx}>
                                  <td>
                                    <strong>{sh.name}</strong>
                                    {sh.source && (
                                      <div className="small text-muted">Source: {sh.source}</div>
                                    )}
                                    {sh.email && (
                                      <div className="small text-muted">📧 {sh.email}</div>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    {sh.type === "Founder" && (
                                      <span className="badge bg-primary">Founder</span>
                                    )}
                                    {sh.type === "Options Pool" && (
                                      <span className="badge bg-warning text-dark">
                                        {newShares > 0 ? "Option Pool (Expanded)" : "Option Pool"}
                                      </span>
                                    )}
                                    {sh.type === "Investor" && (
                                      <span className={`badge ${sh.originalType === "Seed Investor" ? "bg-info" : "bg-danger"
                                        }`}>
                                        {sh.originalType === "Seed Investor" ? "Seed Investor" : "Series A Investor"}
                                      </span>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    {existingShares > 0 ? (
                                      <strong>{formatNumber(existingShares)}</strong>
                                    ) : (
                                      <span className="text-muted">—</span>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    {newShares > 0 ? (
                                      <span className="badge bg-warning text-dark">
                                        +{formatNumber(newShares)}
                                      </span>
                                    ) : (
                                      <span className="text-muted">—</span>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <strong>{formatNumber(sh.shares)}</strong>
                                  </td>
                                  <td className="text-center">
                                    <span className={`badge ${sh.type === "Founder" ? "bg-primary" :
                                      sh.type === "Options Pool" ? "bg-warning text-dark" :
                                        sh.originalType === "Seed Investor" ? "bg-info" :
                                          "bg-danger"
                                      }`}>
                                      {formatPercentage(sh.ownership)}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <strong>{formatCurrency(sh.value, currency)}</strong>
                                    {sh.investmentAmount && sh.investmentAmount > 0 && (
                                      <div className="small text-success">
                                        💰 Invested: {formatCurrency(sh.investmentAmount, currency)}
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center text-danger">
                                <strong>⚠️ No post-Series A shareholders data available</strong>
                              </td>
                            </tr>
                          )}

                          {/* TOTAL ROW */}
                          <tr className="table-secondary fw-bold">
                            <td colSpan="2">TOTAL</td>
                            <td className="text-center">{formatNumber(calc.preInvestmentTotalShares)}</td>
                            <td className="text-center">
                              <span className="badge bg-warning text-dark">
                                +{formatNumber(calc.totalNewShares)}
                              </span>
                            </td>
                            <td className="text-center">{formatNumber(calc.postInvestmentTotalShares)}</td>
                            <td className="text-center">
                              <span className="badge bg-dark">{formatPercentage(100)}</span>
                            </td>
                            <td className="text-center">{formatCurrency(calc.postMoneyValuation, currency)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Post-Series A Summary */}
                    <div className="row mt-3">
                      <div className="col-md-3">
                        <div className="alert alert-primary mb-0">
                          <strong>Founders:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Founder")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="alert alert-warning mb-0">
                          <strong>Option Pool:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Options Pool")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="alert alert-info mb-0">
                          <strong>Seed Investors:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Investor" && sh.originalType === "Seed Investor")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="alert alert-danger mb-0">
                          <strong>Series A Investors:</strong> {formatPercentage(
                            (capTableData.shareholders || [])
                              .filter(sh => sh.type === "Investor" && sh.originalType === "Series A Investor")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ✅ CORRECTED CALCULATION FORMULAS */}
                    <div className="alert alert-dark mt-4">
                      <h6 className="alert-heading">📐 Series A Calculation Formulas</h6>

                      <div className="mb-3">
                        <strong className="badge bg-warning text-dark fSize-14">Post-Money Option Pool Method</strong>
                        {/* <div className="small text-muted">
                          When target option pool (20%) {'>'} existing pool (8%), additional shares are created
                        </div> */}
                      </div>

                      <div className="row small mb-3">
                        <div className="col-md-6">
                          <strong>1. Post-Money Valuation:</strong><br />
                          <code className="bg-light p-1 rounded">
                            Investment + Pre-Money = Post-Money<br />
                            {formatCurrency(calc.investmentSize, currency)} + {formatCurrency(calc.preMoneyValuation, currency)}
                            = {formatCurrency(calc.postMoneyValuation, currency)}
                          </code>
                        </div>
                        <div className="col-md-6">
                          <strong>2. Investor Ownership %:</strong><br />
                          <code className="bg-light p-1 rounded">
                            Investment ÷ Post-Money<br />
                            {formatCurrency(calc.investmentSize, currency)} ÷ {formatCurrency(calc.postMoneyValuation, currency)}
                            = {formatPercentage(calc.investorOwnershipPercent)}
                          </code>
                        </div>
                      </div>

                      <div className="row small mb-3">
                        <div className="col-md-6">
                          <strong>3. Founders + Seed Ownership %:</strong><br />
                          <code className="bg-light p-1 rounded">
                            100% - Investor% - Target Pool%<br />
                            100% - {formatPercentage(calc.investorOwnershipPercent)} - {formatPercentage(calc.optionPoolPercentPost)}
                            = {formatPercentage(calc.existingShareholdersPercent)}
                          </code>
                        </div>
                        <div className="col-md-6">
                          <strong>4. Post-Investment Total Shares:</strong><br />
                          <code className="bg-light p-1 rounded">
                            {/* ✅ CORRECTED FORMULA */}
                            Founders+Seed Shares ÷ Founders+Seed %<br />
                            {formatNumber(foundersSeedShares)} ÷ {formatPercentage(calc.existingShareholdersPercent)}
                            = {formatNumber(calc.postInvestmentTotalShares)}
                          </code>
                        </div>
                      </div>

                      <div className="row small mb-3">
                        <div className="col-md-6">
                          <strong>5. Total New Shares Needed:</strong><br />
                          <code className="bg-light p-1 rounded">
                            Post-Investment Total - Existing Total<br />
                            {formatNumber(calc.postInvestmentTotalShares)} - {formatNumber(calc.preInvestmentTotalShares)}
                            = {formatNumber(calc.totalNewShares)}
                          </code>
                        </div>
                        <div className="col-md-6">
                          <strong>6. Additional Option Pool Shares:</strong><br />
                          <code className="bg-light p-1 rounded">
                            (Target% × Post Total) - Existing Pool<br />
                            ({formatPercentage(calc.optionPoolPercentPost)} × {formatNumber(calc.postInvestmentTotalShares)})
                            - {formatNumber(calc.existingOptionPoolShares)} = {formatNumber(calc.additionalOptionPoolShares)}
                          </code>
                        </div>
                      </div>

                      <div className="row small">
                        <div className="col-md-6">
                          <strong>7. Series A Investor Shares:</strong><br />
                          <code className="bg-light p-1 rounded">
                            Total New Shares - Additional Option Shares<br />
                            {formatNumber(calc.totalNewShares)} - {formatNumber(calc.additionalOptionPoolShares)}
                            = {formatNumber(calc.seriesAInvestorShares)}
                          </code>
                        </div>
                        <div className="col-md-6">
                          <strong>8. Share Price:</strong><br />
                          <code className="bg-light p-1 rounded">
                            Pre-Money ÷ (Existing + New Option Shares)<br />
                            {formatCurrency(calc.preMoneyValuation, currency)} ÷
                            ({formatNumber(calc.preInvestmentTotalShares)} + {formatNumber(calc.additionalOptionPoolShares)})
                            = {formatCurrencyPricePerShare(calc.sharePrice, currency)}
                          </code>
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
    );
  };
  const PreferredEquityCapTable = ({ capTableData }) => {
    if (!capTableData || !capTableData.calculations) {
      return (
        <div className="alert alert-warning">
          <h5>⚠️ No Data Available</h5>
          <p>Cap table data is not available for this round.</p>
        </div>
      );
    }

    const calc = capTableData.calculations;
    const currency = capTableData.currency || "USD";

    if (capTableData.error) {
      return (
        <div className="alert alert-danger">
          <h5>❌ Calculation Error</h5>
          <p>{capTableData.error}</p>
          {capTableData.details && (
            <pre className="small">{JSON.stringify(capTableData.details, null, 2)}</pre>
          )}
        </div>
      );
    }

    // Get data from backend response structure
    const preCapTable = capTableData.preSeriesACapTable || {};
    const postCapTable = capTableData.postSeriesACapTable || {};

    const preSeriesAShareholders = preCapTable.shareholders || [];
    const postSeriesAShareholders = postCapTable.shareholders || [];

    const totalPreShares = preCapTable.totalShares || 0;
    const totalPostSharesBeforeWarrants = postCapTable.totalSharesBeforeWarrants || 0;
    const totalPostSharesAfterWarrants = postCapTable.totalSharesAfterWarrants || 0;

    // Group shareholders by type
    const founders = postSeriesAShareholders.filter(sh => sh.type === "Founder") || [];
    const optionPool = postSeriesAShareholders.filter(sh => sh.type === "Options Pool") || [];
    const seedInvestors = postSeriesAShareholders.filter(sh => sh.originalType === "Seed Investor") || [];
    const seriesAInvestors = postSeriesAShareholders.filter(sh => sh.originalType === "Series A Investor") || [];
    const warrantHolders = postSeriesAShareholders.filter(sh => sh.type === "Warrant") || [];
    var roundname = capTableData.instrumentType + ' ' + capTableData.shareClassType;
    return (
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa' }}>
        {/* Header */}
        <div className="card mb-4 shadow">
          <div className="card-header text-white" style={{ backgroundColor: '#6f42c1' }}>
            <h3 className="mb-0">💎 {capTableData.roundType || "Preferred Equity Round"}</h3>
            <small className="opacity-75">
              {capTableData.hasConversions && roundname}
              {capTableData.hasWarrants && " | Includes Warrants"}
            </small>
          </div>

          <div className="card-body">
            {/* Investment Overview */}
            <h5 className="mb-3 text-primary">📊 Investment Overview</h5>
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="p-3 border rounded" style={{ backgroundColor: '#e3f2fd' }}>
                  <small className="text-muted d-block">Investment Amount</small>
                  <h5 className="mb-0">{formatCurrency(calc.investmentSize, currency)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 border rounded" style={{ backgroundColor: '#f3e5f5' }}>
                  <small className="text-muted d-block">Pre-Money Valuation</small>
                  <h5 className="mb-0">{formatCurrency(calc.preMoneyValuation, currency)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 border rounded" style={{ backgroundColor: '#e8f5e9' }}>
                  <small className="text-muted d-block">Post-Money Valuation</small>
                  <h5 className="mb-0">{formatCurrency(calc.postMoneyValuation, currency)}</h5>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 border rounded" style={{ backgroundColor: '#fff3e0' }}>
                  <small className="text-muted d-block">Share Price</small>
                  <h5 className="mb-0">{formatCurrencyPricePerShare(calc.sharePrice, currency)}</h5>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="p-3 border rounded bg-white">
                  <small className="text-muted d-block">Series A Shares</small>
                  <h6 className="mb-0">{formatNumber(calc.seriesAShares)}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 border rounded bg-white">
                  <small className="text-muted d-block">Converted Shares (Seed)</small>
                  <h6 className="mb-0">{formatNumber(calc.convertibleNoteShares)}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 border rounded bg-white">
                  <small className="text-muted d-block">New Option Shares</small>
                  <h6 className="mb-0">{formatNumber(calc.newOptionShares)}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 border rounded bg-white">
                  <small className="text-muted d-block">Total Post Shares</small>
                  <h6 className="mb-0">{formatNumber(totalPostSharesAfterWarrants)}</h6>
                </div>
              </div>
            </div>

            {/* Warrants Alert */}
            {capTableData.hasWarrants && capTableData.warrants?.length > 0 && (
              <div className="alert alert-info mb-4">
                <h6 className="alert-heading">📜 Warrants Exercised</h6>
                {capTableData.warrants.map((warrant, idx) => (
                  <div key={idx}>
                    <strong>Warrant #{warrant.id}:</strong> {warrant.coverage}% coverage |
                    Exercise Price: {formatCurrencyPricePerShare(warrant.exercisePrice, currency)} |
                    Shares: {formatNumber(warrant.shares)} |
                    Status: {warrant.status}
                  </div>
                ))}
                <div className="mt-2 small text-muted">
                  Total Warrant Value: {formatCurrency(calc.warrantValue, currency)}
                </div>
              </div>
            )}

            {/* Convertible Note Conversion Details */}
            {calc.convertibleNoteShares > 0 && (
              <div className="alert alert-success mb-4">
                <h6 className="alert-heading">💰 Convertible Note Conversion</h6>
                <div className="row">
                  <div className="col-md-3">
                    <strong>Original Investment:</strong><br />
                    {formatCurrency(calc.convertibleNotePrincipal, currency)}
                  </div>
                  <div className="col-md-3">
                    <strong>Principal + Interest:</strong><br />
                    {formatCurrency(calc.convertibleNotePrincipalPlusInterest, currency)}
                  </div>
                  <div className="col-md-3">
                    <strong>Converted Shares:</strong><br />
                    {formatNumber(calc.convertibleNoteShares)}
                  </div>
                  <div className="col-md-3">
                    <strong>Current Value:</strong><br />
                    {formatCurrency(calc.convertibleNoteValue, currency)}
                  </div>
                </div>
              </div>
            )}

            {/* PRE-INVESTMENT CAP TABLE */}
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">📋 Pre-{capTableData.roundType} Cap Table</h5>
                <small>Before Investment | Pre-Money: {formatCurrency(calc.preMoneyValuation, currency)}</small>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead style={{ backgroundColor: '#343a40', color: 'white' }}>
                      <tr>
                        <th>Shareholder</th>
                        <th className="text-center">Type</th>
                        <th className="text-center">Shares</th>
                        <th className="text-center">Ownership %</th>
                        <th className="text-center">Value ({currency})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preSeriesAShareholders.length > 0 ? (
                        preSeriesAShareholders.map((sh, idx) => (
                          <tr key={idx}>
                            <td>
                              <strong>{sh.name}</strong>
                              {sh.note && <div className="small text-muted">{sh.note}</div>}
                            </td>
                            <td className="text-center">
                              <span className={`badge ${sh.type === "Founder" ? "bg-primary" :
                                sh.type === "Options Pool" ? "bg-warning text-dark" :
                                  "bg-success"
                                }`}>
                                {sh.type}
                              </span>
                            </td>
                            <td className="text-center"><strong>{formatNumber(sh.shares)}</strong></td>
                            <td className="text-center">
                              <span className="badge bg-secondary">{formatPercentage(sh.ownership)}</span>
                            </td>
                            <td className="text-center"><strong>{formatCurrency(sh.value, currency)}</strong></td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-muted">No pre-investment data available</td>
                        </tr>
                      )}

                      {/* TOTAL ROW */}
                      {totalPreShares > 0 && (
                        <tr style={{ backgroundColor: '#e9ecef', fontWeight: 'bold' }}>
                          <td colSpan="2">TOTAL</td>
                          <td className="text-center">{formatNumber(totalPreShares)}</td>
                          <td className="text-center">
                            <span className="badge bg-dark">{formatPercentage(100)}</span>
                          </td>
                          <td className="text-center">{formatCurrency(calc.preMoneyValuation, currency)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pre-Investment Summary */}
                {preSeriesAShareholders.length > 0 && (
                  <div className="row mt-3">
                    <div className="col-md-4">
                      <div className="alert alert-primary mb-0">
                        <strong>Founders:</strong> {formatPercentage(
                          preSeriesAShareholders
                            .filter(sh => sh.type === "Founder")
                            .reduce((sum, sh) => sum + sh.ownership, 0)
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="alert alert-warning mb-0">
                        <strong>Employee:</strong> {formatPercentage(
                          preSeriesAShareholders
                            .filter(sh => sh.type === "Options Pool")
                            .reduce((sum, sh) => sum + sh.ownership, 0)
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="alert alert-success mb-0">
                        <strong>Seed Investors:</strong> {formatPercentage(
                          preSeriesAShareholders
                            .filter(sh => sh.type === "Investor")
                            .reduce((sum, sh) => sum + sh.ownership, 0)
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* POST-INVESTMENT CAP TABLE */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-success text-white">
                <h5 className="mb-0">📊 Post-{capTableData.roundType} Cap Table</h5>
                <small>After Investment | Post-Money: {formatCurrency(calc.postMoneyValuation, currency)}</small>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead style={{ backgroundColor: '#343a40', color: 'white' }}>
                      <tr>
                        <th>Shareholder</th>
                        <th className="text-center">Type</th>
                        <th className="text-center">Existing Shares</th>
                        <th className="text-center">New Shares</th>
                        <th className="text-center">Total Shares</th>
                        <th className="text-center">Ownership %</th>
                        <th className="text-center">Value ({currency})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {postSeriesAShareholders.length > 0 ? (
                        postSeriesAShareholders.map((sh, idx) => (
                          <tr key={idx}>
                            <td>
                              <strong>{sh.name}</strong>
                              {sh.email && sh.email !== "-" && (
                                <div className="small text-muted">📧 {sh.email}</div>
                              )}
                              {sh.moic && (
                                <div className="small text-success">
                                  MOIC: {sh.moic}x
                                </div>
                              )}
                              {sh.note && (
                                <div className="small text-info">{sh.note}</div>
                              )}
                            </td>
                            <td className="text-center">
                              <span className={`badge ${sh.type === "Founder" ? "bg-primary" :
                                sh.type === "Options Pool" ? "bg-warning text-dark" :
                                  sh.type === "Warrant" ? "bg-secondary" :
                                    sh.originalType === "Seed Investor" ? "bg-info" :
                                      "bg-danger"
                                }`}>
                                {sh.originalType || sh.type}
                              </span>
                            </td>
                            <td className="text-center">
                              {sh.existingShares > 0 ? formatNumber(sh.existingShares) : "—"}
                            </td>
                            <td className="text-center">
                              {sh.newShares > 0 ? (
                                <span className="badge bg-warning text-dark">+{formatNumber(sh.newShares)}</span>
                              ) : "—"}
                            </td>
                            <td className="text-center"><strong>{formatNumber(sh.shares)}</strong></td>
                            <td className="text-center">
                              <span className={`badge ${sh.type === "Founder" ? "bg-primary" :
                                sh.type === "Options Pool" ? "bg-warning text-dark" :
                                  sh.type === "Warrant" ? "bg-secondary" :
                                    sh.originalType === "Seed Investor" ? "bg-info" :
                                      "bg-danger"
                                }`}>
                                {formatPercentage(sh.ownership)}
                              </span>
                            </td>
                            <td className="text-center">
                              <strong>{formatCurrency(sh.value, currency)}</strong>
                              {sh.investmentAmount && sh.investmentAmount > 0 && (
                                <div className="small text-success">
                                  💰 Invested: {formatCurrency(sh.investmentAmount, currency)}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center text-muted">No post-investment data available</td>
                        </tr>
                      )}

                      {/* TOTAL ROW */}
                      {totalPostSharesAfterWarrants > 0 && (
                        <tr style={{ backgroundColor: '#e9ecef', fontWeight: 'bold' }}>
                          <td colSpan="2">TOTAL</td>
                          <td className="text-center">{formatNumber(totalPreShares)}</td>
                          <td className="text-center">
                            <span className="badge bg-warning text-dark">
                              +{formatNumber(totalPostSharesAfterWarrants - totalPreShares)}
                            </span>
                          </td>
                          <td className="text-center">{formatNumber(totalPostSharesAfterWarrants)}</td>
                          <td className="text-center">
                            <span className="badge bg-dark">{formatPercentage(100)}</span>
                          </td>
                          <td className="text-center">{formatCurrency(calc.postMoneyValuation, currency)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Post-Investment Summary */}
                {postSeriesAShareholders.length > 0 && (
                  <div className="row mt-3">
                    <div className="col-md-3">
                      <div className="alert alert-primary mb-0">
                        <strong>Founders:</strong> {formatPercentage(calc.foundersOwnership)}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="alert alert-warning mb-0">
                        <strong>Employee:</strong> {formatPercentage(calc.poolOwnership)}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="alert alert-info mb-0">
                        <strong>Seed Investors:</strong> {formatPercentage(calc.seedInvestorsOwnership)}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="alert alert-danger mb-0">
                        <strong>Series A Investors:</strong> {formatPercentage(calc.seriesAInvestorsOwnership)}
                      </div>
                    </div>
                    {calc.warrantHoldersOwnership > 0 && (
                      <div className="col-md-3 mt-2">
                        <div className="alert alert-secondary mb-0">
                          <strong>Warrant Holders:</strong> {formatPercentage(calc.warrantHoldersOwnership)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CALCULATION FORMULAS */}
            <div className="alert alert-dark">
              <h6 className="alert-heading">📐 Calculation Formulas</h6>

              <div className="row small mb-3">
                <div className="col-md-6">
                  <strong>1. Share Price:</strong><br />
                  <code style={{ backgroundColor: '#f8f9fa', padding: '4px 8px', borderRadius: '4px', display: 'block' }}>
                    Pre-Money ÷ Total Shares from Seed Round<br />
                    {formatCurrency(calc.preMoneyValuation, currency)} ÷ {formatNumber(totalPreShares)}
                    = {formatCurrencyPricePerShare(calc.sharePrice, currency)}
                  </code>
                </div>
                <div className="col-md-6">
                  <strong>2. Series A Shares:</strong><br />
                  <code style={{ backgroundColor: '#f8f9fa', padding: '4px 8px', borderRadius: '4px', display: 'block' }}>
                    Investment ÷ Share Price<br />
                    {formatCurrency(calc.investmentSize, currency)} ÷ {formatCurrencyPricePerShare(calc.sharePrice, currency)}
                    = {formatNumber(calc.seriesAShares)}
                  </code>
                </div>
              </div>

              <div className="row small">
                <div className="col-md-6">
                  <strong>3. Post-Money Valuation:</strong><br />
                  <code style={{ backgroundColor: '#f8f9fa', padding: '4px 8px', borderRadius: '4px', display: 'block' }}>
                    Total Shares × Share Price<br />
                    {formatNumber(totalPostSharesBeforeWarrants)} × {formatCurrencyPricePerShare(calc.sharePrice, currency)}
                    = {formatCurrency(calc.postMoneyValuation, currency)}
                  </code>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderConvertibleNoteRoundTable = () => {
    if (!capTableData || !capTableData.calculations) return null;

    console.log("Convertible Note Data:", capTableData);
    const calc = capTableData.calculations;
    const preTable = capTableData.preSeedCapTable;
    const postTable = capTableData.postSeedCapTable;

    // Helper functions
    const formatCurrency = (amount) => {
      const currency = capTableData.currency || "USD";
      const currencyCode = currency.split(' ')[0] || 'USD';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount || 0);
    };

    const formatNumber = (num) => {
      return new Intl.NumberFormat('en-US').format(Math.round(num || 0));
    };

    const formatPercentage = (percent) => {
      const numValue = typeof percent === 'string' ? parseFloat(percent) : (percent || 0);
      return `${numValue.toFixed(1)}%`;
    };
    var roundname = capTableData.instrumentType + ' ' + capTableData.shareClassType;
    return (
      <div className="cap-table-section">
        <div className="card mb-4">
          <div className="card-header bg-warning text-dark">
            <h4 className="mb-0">{capTableData.roundType || "Convertible Note Round"}</h4>
            <small>{roundname} - Convertible Notes (NO SHARES ISSUED)</small>
          </div>
          <div className="card-body">

            {/* ===== INPUT PARAMETERS SECTION ===== */}
            <h5 className="mb-3">📊 Platform Inputs</h5>
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Company Value (Input #1)</small>
                  <h5>{formatCurrency(calc.companyValue)}</h5>
                </div>
              </div>

              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Investment Size (Input #2 & #4)</small>
                  <h5>{formatCurrency(calc.investmentSize)}</h5>
                </div>
              </div>

              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Conversion Discount (Input #3)</small>
                  <h5>{calc.discountRate}%</h5>
                </div>
              </div>

              <div className="col-md-3">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Valuation Cap</small>
                  <h5>{formatCurrency(calc.valuationCap)}</h5>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-info text-white">
                  <small>Pre-Seed Option Pool % (Input #5)</small>
                  <h5>{calc.optionPoolPercent}%</h5>
                  <small>{formatNumber(calc.employeeShares)} employee shares created</small>
                </div>
              </div>

              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small>Interest Rate</small>
                  <h5>{calc.interestRate}%</h5>
                  <small>Annual interest on convertible notes</small>
                </div>
              </div>

              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small>Round 0 Founder Shares</small>
                  <h5>{formatNumber(calc.roundZeroTotalShares)}</h5>
                  <small>Total shares from incorporation</small>
                </div>
              </div>
            </div>

            {/* ===== CALCULATION DETAILS ===== */}
            <div className="alert alert-info mb-4">
              <h6 className="alert-heading">📐 Employee Pool Calculation</h6>
              <p className="mb-2 small">
                <strong>Formula:</strong> Employee Shares = Total Founder Shares ÷ (1 - Pool %) × Pool %
              </p>
              <p className="mb-2 small">
                <strong>Calculation:</strong> {formatNumber(calc.roundZeroTotalShares)} ÷ (1 - {calc.optionPoolPercent / 100}) × {calc.optionPoolPercent / 100} = {formatNumber(calc.employeeShares)} shares
              </p>
              <p className="mb-0 small">
                <strong>Total Shares:</strong> {formatNumber(calc.roundZeroTotalShares)} (founders) + {formatNumber(calc.employeeShares)} (employees) = {formatNumber(calc.totalSharesPreSeed)} shares
              </p>
            </div>

            {/* ⚠️ IMPORTANT NOTE - NO SHARES ISSUED */}
            <div className="alert alert-warning mb-4">
              <h6 className="alert-heading">⚠️ CONVERTIBLE NOTES - NO SHARES ISSUED YET</h6>
              <p className="mb-0">
                <strong>Important:</strong> Convertible notes are <strong>NOT converted into shares</strong> during this round.
                <br />
                Convertible note investors have invested {formatCurrency(calc.totalConfirmedInvestment || calc.investmentSize)} but receive <strong>0 shares</strong> in this round.
                <br />
                Conversion happens at the next priced equity round (Series A).
              </p>
            </div>

            {/* ===== PRE-SEED CAP TABLE ===== */}
            {preTable && preTable.shareholders && preTable.shareholders.length > 0 && (
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header bg-secondary text-white">
                      <h5 className="mb-0">📋 Common Shares at Pre-Seed Round 1 (Output #3)</h5>
                      <small>Before Convertible Note investment (with {calc.optionPoolPercent}% option pool)</small>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          <thead className="table-dark">
                            <tr>
                              <th>Management</th>
                              <th>Contact Info</th>
                              <th>Common Shares</th>
                              <th>New Shares</th>
                              <th>Fully Diluted Ownership %</th>
                              <th>Value ($)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {preTable.shareholders.map((sh, idx) => (
                              <tr key={idx} className={
                                sh.type === "Options Pool" ? "table-warning" :
                                  sh.type === "Founder" ? "" : "table-light"
                              }>
                                <td>
                                  <div>
                                    <strong>{sh.name || sh.fullName}</strong>
                                    <div className="small">{sh.note || sh.type}</div>
                                  </div>
                                </td>
                                <td>
                                  {sh.email && sh.email !== "-" && (
                                    <div className="small">
                                      📧 {sh.email}
                                    </div>
                                  )}
                                  {sh.voting && (
                                    <div className="small">
                                      {sh.voting === "voting" ? "✅ Voting" : "❌ Non-voting"}
                                    </div>
                                  )}
                                </td>
                                <td className="text-center">
                                  <strong>{formatNumber(sh.shares)}</strong>
                                </td>
                                <td className="text-center">

                                  <span className="text-muted">0</span>

                                </td>
                                <td className="text-center">
                                  <span className="badge bg-dark">
                                    {formatPercentage(sh.ownership)}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <strong>{formatCurrency(sh.value)}</strong>
                                </td>
                              </tr>
                            ))}

                            {/* TOTAL ROW */}
                            <tr className="table-secondary fw-bold">
                              <td colSpan="2">TOTAL</td>
                              <td className="text-center">{formatNumber(preTable.totalShares)}</td>
                              <td className="text-center">{formatNumber(0)}</td>
                              <td className="text-center">100%</td>
                              <td className="text-center">{formatCurrency(preTable.totalValue)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Ownership Summary */}
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <div className="alert alert-info mb-0">
                            <h6 className="mb-2">Ownership Summary (Pre-Investment)</h6>
                            <div className="row small">
                              <div className="col-6">Founders:</div>
                              <div className="col-6 text-end">{formatPercentage(calc.totalFoundersOwnership)}</div>
                              <div className="col-6">Employees:</div>
                              <div className="col-6 text-end">{formatPercentage(calc.totalEmployeeOwnership)}</div>
                              <div className="col-6">Convertible Note Investors:</div>
                              <div className="col-6 text-end">0%</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="alert alert-light mb-0">
                            <h6 className="mb-2">Financial Summary</h6>
                            <div className="row small">
                              <div className="col-6">Company Value:</div>
                              <div className="col-6 text-end">{formatCurrency(calc.companyValue)}</div>
                              <div className="col-6">Share Price:</div>
                              <div className="col-6 text-end">{formatCurrency(calc.sharePrice)}</div>
                              <div className="col-6">Total Shares:</div>
                              <div className="col-6 text-end">{formatNumber(calc.totalSharesPreSeed)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== POST-SEED CAP TABLE ===== */}
            {postTable && postTable.shareholders && postTable.shareholders.length > 0 && (
              <div className="row mb-5">
                <div className="col-md-12">
                  <div className="card border-warning">
                    <div className="card-header bg-warning text-dark">
                      <h5 className="mb-0">📋 Common Shares at Post-Seed Round 1 (Output #4)</h5>
                      <small>After Convertible Note investment - Notes have NOT converted yet</small>
                    </div>
                    <div className="card-body">
                      <p className="text-center mb-4">
                        <strong>📌 Key Point:</strong> Since Convertible notes do NOT convert to shares in this round,
                        the total number of shares remains {formatNumber(postTable.totalShares)} (same as Pre-Seed).
                        Convertible note investors are listed with 0 shares.
                      </p>

                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                          <thead className="table-dark">
                            <tr>
                              <th>Shareholder</th>
                              <th>Contact Info</th>
                              <th>Common Shares</th>
                              <th>New Shares</th>
                              <th>Total Shares</th>
                              <th>Fully Diluted Ownership %</th>
                              <th>Value ($)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {postTable.shareholders.map((sh, idx) => (
                              <tr key={idx} className={
                                sh.type === "Options Pool" ? "table-warning" :
                                  sh.type === "Convertible Note Investor" ? "table-info" :
                                    sh.type === "Available Investment" ? "table-danger" :
                                      sh.type === "Founder" ? "" : "table-light"
                              }>
                                <td>
                                  <strong>{sh.name || sh.fullName}</strong>
                                  {sh.note && <div className="small text-muted">{sh.note}</div>}
                                  {sh.isConvertibleNote && (
                                    <div className="small text-info">
                                      ⚡ Convertible Note Investor
                                    </div>
                                  )}
                                  {sh.isAvailable && (
                                    <div className="small text-danger">
                                      🔥 Available for investment
                                    </div>
                                  )}
                                </td>
                                <td>
                                  {sh.email && sh.email !== "-" && (
                                    <div className="small">📧 {sh.email}</div>
                                  )}
                                  {sh.voting && (
                                    <div className="small">
                                      {sh.voting === "voting" ? "✅ Voting" : "❌ Non-voting"}
                                    </div>
                                  )}
                                  {sh.investmentAmount > 0 && (
                                    <div className="small fw-bold">
                                      💰 {formatCurrency(sh.investmentAmount)}
                                    </div>
                                  )}
                                </td>
                                <td className="text-center">
                                  <strong>{formatNumber(sh.shares)}</strong>
                                </td>
                                <td className="text-center">

                                  <span className="text-muted">0</span>

                                </td>
                                <td className="text-center">
                                  <strong>{formatNumber(sh.shares)}</strong>
                                </td>
                                <td className="text-center">
                                  <span className={`badge ${sh.shares === 0 ? "bg-secondary" : "bg-dark"
                                    }`}>
                                    {formatPercentage(sh.ownership)}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <strong>{formatCurrency(sh.value)}</strong>
                                </td>
                              </tr>
                            ))}

                            {/* TOTAL ROW */}
                            <tr className="table-warning fw-bold">
                              <td colSpan="2">TOTAL</td>
                              <td className="text-center">{formatNumber(postTable.totalShares)}</td>
                              <td className="text-center">0</td>
                              <td className="text-center">{formatNumber(postTable.totalShares)}</td>
                              <td className="text-center">100%</td>
                              <td className="text-center">{formatCurrency(postTable.totalValue)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Investment Summary */}
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="alert alert-warning">
                            <h6 className="mb-2">Investment Summary</h6>
                            <div className="row small">
                              <div className="col-6">Total Convertible Note Investment:</div>
                              <div className="col-6 text-end">{formatCurrency(calc.totalConfirmedInvestment)}</div>
                              <div className="col-6">Available for Investment:</div>
                              <div className="col-6 text-end">{formatCurrency(calc.availableForInvestment)}</div>
                              <div className="col-6">Number of Investors:</div>
                              <div className="col-6 text-end">{calc.investorCount}</div>
                              <div className="col-6">Shares Issued to Investors:</div>
                              <div className="col-6 text-end">0</div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="alert alert-primary">
                            <h6 className="mb-2">Platform Outputs Summary</h6>
                            <div className="row small">
                              <div className="col-6">Post-Money Valuation (Output #1):</div>
                              <div className="col-6 text-end">{formatCurrency(calc.postMoneyValuation)}</div>
                              <div className="col-6">Post-Investment Shares (Output #2):</div>
                              <div className="col-6 text-end">{formatNumber(calc.postInvestmentShares)}</div>
                              <div className="col-6">Total Shares (No Change):</div>
                              <div className="col-6 text-end">{formatNumber(postTable.totalShares)}</div>
                              <div className="col-6">Total Value:</div>
                              <div className="col-6 text-end">{formatCurrency(postTable.totalValue)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== CONVERSION DETAILS ===== */}
            <div className="card bg-light">
              <div className="card-header">
                <h5 className="mb-0">📋 ⚠️ Convertible Notes will convert at next priced equity round</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Conversion Terms:</h6>
                    <ul className="mb-0">
                      <li><strong>Conversion Trigger:</strong> Next priced equity financing (Series A)</li>
                      <li><strong>Valuation Cap:</strong> {formatCurrency(calc.valuationCap)}</li>
                      <li><strong>Discount Rate:</strong> {calc.discountRate}%</li>
                      <li><strong>Interest Rate:</strong> {calc.interestRate}% per annum</li>
                      <li><strong>Conversion Price:</strong> Lower of (Series A price × discount) OR (Cap ÷ Total Shares)</li>
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <h6>Next Steps:</h6>
                    <ul className="mb-0">
                      <li>✅ Convertible notes issued (0 shares)</li>
                      <li>✅ Investment received: {formatCurrency(calc.totalConfirmedInvestment)}</li>
                      <li>🔜 Prepare for Series A priced round</li>
                      <li>🔜 Convertible notes will automatically convert</li>
                      <li>🔜 Update cap table after conversion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };
  const renderConvertibleNoteSeriesRoundTable = () => {
    console.log("Render Convertible Note Series Round Table Called");

    if (!capTableData) {
      return <div className="alert alert-warning">No data available</div>;
    }

    // ✅ Extract data
    const calc = capTableData.calculations || {};
    const preTable = capTableData.preSeedCapTable || {};
    const postTable = capTableData.postSeedCapTable || {};

    console.log("Post Table Shareholders:", postTable.shareholders);

    // ✅ Helper functions
    const formatCurrency = (amount) => {
      const currency = capTableData.currency || "CAD";
      const currencyCode = currency.split(' ')[0] || 'CAD';
      return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount || 0);
    };

    const formatNumber = (num) => {
      return new Intl.NumberFormat('en-CA').format(Math.round(num || 0));
    };

    const formatPercentage = (percent) => {
      const numValue = typeof percent === 'string' ? parseFloat(percent) : (percent || 0);
      return `${numValue.toFixed(1)}%`;
    };

    // ✅ Prepare chart data
    const prepareChartData = () => {
      if (!postTable.shareholders || postTable.shareholders.length === 0) {
        return null;
      }

      const labels = postTable.shareholders.map(sh => sh.name || "Shareholder");
      const data = postTable.shareholders.map(sh => parseFloat(sh.ownership) || 0);
      const backgroundColors = postTable.shareholders.map(sh => {
        if (sh.type?.includes("Founder")) return '#4e73df';
        if (sh.type?.includes("Option")) return '#f6c23e';
        if (sh.type?.includes("Convertible") || sh.type?.includes("Seed")) return '#1cc88a';
        if (sh.type?.includes("Series")) return '#36b9cc';
        return '#858796';
      });

      return {
        labels,
        datasets: [{
          data,
          backgroundColor: backgroundColors,
          borderColor: '#fff',
          borderWidth: 1
        }]
      };
    };

    const chartData = prepareChartData();

    // ✅ Chart options
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            padding: 20,
            usePointStyle: true,
          }
        },
        title: {
          display: true,
          text: 'Post-Series A Ownership Distribution',
          font: {
            size: 16
          }
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              return `${label}: ${value.toFixed(1)}%`;
            }
          }
        }
      }
    };
    var roundname = capTableData.instrumentType + ' ' + capTableData.shareClassType;
    return (
      <div className="cap-table-section">
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">📊 {roundname} with Convertible Note Conversion</h4>
            <small>{capTableData.message || "Convertible Note conversion completed"}</small>
          </div>

          <div className="card-body">
            {/* ✅ CHART SECTION */}
            {chartData ? (
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Ownership Distribution (Pie Chart)</h6>
                    </div>
                    <div className="card-body">
                      <div style={{ height: '300px' }}>
                        {/* Pie Chart के लिए Bar की जगह Pie use करें */}
                        {(() => {
                          // Temporary - अगर Pie chart नहीं है तो Bar chart show करें
                          try {

                            return <Pie data={chartData} options={chartOptions} />;
                          } catch (e) {
                            return <Bar data={chartData} options={chartOptions} />;
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">Ownership Breakdown</h6>
                    </div>
                    <div className="card-body">
                      <ul className="list-group">
                        {postTable.shareholders.map((sh, idx) => (
                          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                              <strong>{sh.name}</strong>
                              <small className="text-muted ms-2">{sh.type}</small>
                            </span>
                            <span className="badge bg-primary rounded-pill">
                              {formatPercentage(sh.ownership)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-warning mb-4">
                No shareholder data available for chart
              </div>
            )}

            {/* ✅ CONVERTIBLE NOTE CONVERSION DETAILS */}
            <div className="alert alert-success mb-4">
              <h6 className="mb-2">🔄 Convertible Note Conversion</h6>
              <div className="row">
                <div className="col-md-4">
                  <p><strong>Original Investment:</strong> {formatCurrency(calc.seedInvestment || 0)}</p>
                  <p><strong>Interest Rate:</strong> {calc.interestRate || '0'}%</p>
                  <p><strong>Discount Rate:</strong> {calc.discountRate || '0'}%</p>
                </div>
                <div className="col-md-4">
                  <p><strong>Valuation Cap:</strong> {formatCurrency(calc.valuationCap || 0)}</p>
                  <p><strong>Years Between Rounds:</strong> {calc.yearsBetweenRounds || 2}</p>
                  <p><strong>Principal + Interest:</strong> {formatCurrency(calc.principalPlusInterest || 0)}</p>
                </div>
                <div className="col-md-4">
                  <p><strong>Shares Converted:</strong> {formatNumber(calc.seedConversionShares || 0)}</p>
                  <p><strong>Conversion Value:</strong> {formatCurrency(calc.seedConversionValue || 0)}</p>
                  <p><strong>MOIC:</strong> <strong className="text-success">{calc.seedMOIC || "0X"}</strong></p>
                </div>
              </div>
            </div>

            {/* ✅ SERIES A INVESTMENT DETAILS */}
            <div className="alert alert-primary mb-4">
              <h6 className="mb-2">💰 Series A Investment</h6>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Investment Amount:</strong> {formatCurrency(calc.seriesAInvestment || 0)}</p>
                  <p><strong>Shares Purchased:</strong> {formatNumber(calc.seriesAShares || 0)}</p>
                  <p><strong>Share Price:</strong> {formatCurrency(calc.sharePrice || 0)}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Investment Value:</strong> {formatCurrency(calc.seriesAValue || 0)}</p>
                  <p><strong>MOIC:</strong> <strong>{calc.seriesAMOIC || "0X"}</strong></p>
                  <p><strong>Pre-Money Valuation:</strong> {formatCurrency(calc.preMoneyValuation || 0)}</p>
                </div>
              </div>
            </div>

            {/* ✅ PRE-SERIES A CAP TABLE */}
            {preTable.shareholders && preTable.shareholders.length > 0 && (
              <div className="card mb-4">
                <div className="card-header bg-secondary text-white">
                  <h5 className="mb-0">📋 Pre-Series A Cap Table</h5>
                  <small>Total Shares: {formatNumber(preTable.totalShares || 0)} | Total Value: {formatCurrency(preTable.totalValue || 0)}</small>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>Shareholder</th>
                          <th className="text-center">Type</th>
                          <th className="text-center">Shares</th>
                          <th className="text-center">Ownership %</th>
                          <th className="text-center">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {preTable.shareholders.map((sh, idx) => (
                          <tr key={idx}>
                            <td>
                              <strong>{sh.name || `Shareholder ${idx + 1}`}</strong>
                              {sh.note && <div className="small text-muted">{sh.note}</div>}
                            </td>
                            <td className="text-center">
                              <span className={`badge ${sh.type?.includes("Founder") ? "bg-primary" :
                                sh.type?.includes("Option") ? "bg-warning text-dark" :
                                  "bg-info"
                                }`}>
                                {sh.type || "Shareholder"}
                              </span>
                            </td>
                            <td className="text-center">
                              <strong>{formatNumber(sh.shares || 0)}</strong>
                            </td>
                            <td className="text-center">
                              <span className="badge bg-dark">
                                {formatPercentage(sh.ownership || 0)}
                              </span>
                            </td>
                            <td className="text-center">
                              <strong>{formatCurrency(sh.value || 0)}</strong>
                            </td>
                          </tr>
                        ))}
                        <tr className="table-secondary fw-bold">
                          <td colSpan="2">TOTAL</td>
                          <td className="text-center">{formatNumber(preTable.totalShares || 0)}</td>
                          <td className="text-center">100%</td>
                          <td className="text-center">{formatCurrency(preTable.totalValue || 0)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ POST-SERIES A CAP TABLE */}
            {postTable.shareholders && postTable.shareholders.length > 0 && (
              <div className="card mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">📋 Post-Series A Cap Table</h5>
                  <small>Total Shares: {formatNumber(postTable.totalShares || 0)} | Total Value: {formatCurrency(postTable.totalValue || 0)}</small>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th>Shareholder</th>
                          <th className="text-center">Type</th>
                          <th className="text-center">Shares</th>
                          <th className="text-center">Ownership %</th>
                          <th className="text-center">Value</th>
                          <th className="text-center">Investment Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {postTable.shareholders.map((sh, idx) => (
                          <tr key={idx}>
                            <td>
                              <strong>{sh.name || `Shareholder ${idx + 1}`}</strong>
                              {sh.note && <div className="small text-muted">{sh.note}</div>}
                            </td>
                            <td className="text-center">
                              <span className={`badge ${sh.type?.includes("Founder") ? "bg-primary" :
                                sh.type?.includes("Option") ? "bg-warning text-dark" :
                                  sh.type?.includes("Convertible") || sh.type?.includes("Seed") ? "bg-info" :
                                    sh.type?.includes("Series") ? "bg-success" :
                                      "bg-secondary"
                                }`}>
                                {sh.type || "Shareholder"}
                              </span>
                            </td>
                            <td className="text-center">
                              <strong>{formatNumber(sh.shares || sh.totalShares || 0)}</strong>
                              {sh.newShares > 0 && (
                                <div className="small text-success">+{formatNumber(sh.newShares)} new</div>
                              )}
                            </td>
                            <td className="text-center">
                              <span className="badge bg-dark">
                                {formatPercentage(sh.ownership || 0)}
                              </span>
                            </td>
                            <td className="text-center">
                              <strong>{formatCurrency(sh.value || 0)}</strong>
                            </td>
                            <td className="text-center">
                              {sh.conversionPrice ? (
                                <div className="small">
                                  @ {formatCurrency(sh.conversionPrice)}/share
                                  {sh.moic && <div className="text-success">MOIC: {sh.moic}</div>}
                                </div>
                              ) : sh.investment ? (
                                <div className="small">
                                  Invested: {formatCurrency(sh.investment)}
                                  {sh.moic && <div className="text-success">MOIC: {sh.moic}</div>}
                                </div>
                              ) : sh.originalInvestment ? (
                                <div className="small">
                                  Original: {formatCurrency(sh.originalInvestment)}
                                  {sh.moic && <div className="text-success">MOIC: {sh.moic}</div>}
                                </div>
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr className="table-primary fw-bold">
                          <td colSpan="2">TOTAL</td>
                          <td className="text-center">{formatNumber(postTable.totalShares || 0)}</td>
                          <td className="text-center">100%</td>
                          <td className="text-center">{formatCurrency(postTable.totalValue || 0)}</td>
                          <td className="text-center">
                            {formatCurrency((calc.seedInvestment || 0) + (calc.seriesAInvestment || 0))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ FINAL SUMMARY */}
            <div className="alert alert-info">
              <h6>📊 Final Summary</h6>
              <div className="row">
                <div className="col-md-4">
                  <p><strong>Pre-Money Valuation:</strong> {formatCurrency(calc.preMoneyValuation || 0)}</p>
                  <p><strong>Post-Money Valuation:</strong> {formatCurrency(calc.postMoneyValuation || 0)}</p>
                  <p><strong>Valuation Increase:</strong> {
                    (((calc.postMoneyValuation || 0) - (calc.preMoneyValuation || 0)) /
                      (calc.preMoneyValuation || 1) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="col-md-4">
                  <p><strong>Total Capital Raised:</strong> {
                    formatCurrency((calc.seedInvestment || 0) + (calc.seriesAInvestment || 0))
                  }</p>
                  <p><strong>Share Price:</strong> {formatCurrency(calc.sharePrice || 0)}</p>
                  <p><strong>Total Shares Outstanding:</strong> {formatNumber(postTable.totalShares || 0)}</p>
                </div>
                <div className="col-md-4">
                  <p><strong>New Shares Issued:</strong> {formatNumber(calc.newSharesIssued || 0)}</p>
                  <p><strong>Option Pool Created:</strong> {formatNumber(calc.newOptionShares || 0)} shares</p>
                  <p><strong>Existing Option Pool:</strong> {formatNumber(calc.existingEmployeeShares || 0)} shares</p>
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
                {!loading && !error && capTableData && (() => {

                  // Normalize data for consistent checking
                  const roundType = (capTableData.round_type).toLowerCase();
                  const shareClassType = (capTableData.shareClassType).toLowerCase();
                  const instrumentType = (capTableData.instrumentType || '').toLowerCase();

                  // CONDITION 1: Round 0 / Incorporation (highest priority)
                  if (roundType.includes("round 0") ||
                    roundType.includes("incorporation") ||
                    capTableData.isRoundZero) {
                    return renderRoundZeroTable();
                  }

                  // CONDITION 2: Preferred Equity (check before Series/Seed)
                  if (instrumentType === "preferred equity" ||
                    instrumentType.includes("preferred")) {
                    return <PreferredEquityCapTable capTableData={capTableData} />;
                  }

                  // CONDITION 3: Series A + SAFE
                  if (
                    shareClassType.includes("series") &&
                    instrumentType === "safe") {

                    return renderSAFESeriesRoundTable();
                  }

                  // CONDITION 4: Series A (without SAFE)
                  if (instrumentType === 'common stock' &&
                    shareClassType.includes("series")) {
                    return renderSeriesATable();
                  }

                  // CONDITION 5: Seed + SAFE
                  if ((shareClassType === 'seed' || shareClassType === 'pre-seed' || shareClassType === 'post-seed') &&
                    instrumentType === "safe") {
                    return renderSAFERoundTable();
                  }
                  if ((shareClassType === 'seed' || shareClassType === 'pre-seed' || shareClassType === 'post-seed') &&
                    instrumentType === "convertible note") {
                    return renderConvertibleNoteRoundTable();
                  }
                  if (shareClassType.includes("series") &&
                    instrumentType === "convertible note") {
                    return renderConvertibleNoteSeriesRoundTable();
                  } else {
                    return renderSeedRoundTable();
                  }
                  // CONDITION 6: Default - Seed Round (any remaining seed or fallback)

                })()}

                {!loading && !error && !capTableData && (
                  <div className="alert alert-warning" role="alert">
                    No cap table data available for this roundsss.
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
