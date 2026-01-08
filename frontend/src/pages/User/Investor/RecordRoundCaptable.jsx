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

    const calc = capTableData.calculations;
    const currency = capTableData.currency || "USD";
    const currentTable = capTableData.currentCapTable;

    return (
      <div className="cap-table-section">
        <div className="card mb-4">
          <div className="card-header bg-warning text-dark">
            <h4 className="mb-0">{capTableData.roundType}</h4>
            <small>SAFE Round - Conversion Pending</small>
          </div>
          <div className="card-body">
            {/* Platform Inputs */}
            <h5 className="mb-3">SAFE Investment Details</h5>
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Total SAFE Investment</small>
                  <h5>{formatCurrency(calc.totalSafeInvestment, currency)}</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Valuation Cap</small>
                  <h5>{formatCurrency(calc.valuationCap, currency)}</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="info-box p-3 border rounded bg-light">
                  <small className="text-muted">Discount Rate</small>
                  <h5>{formatPercentage(calc.discountRate)}</h5>
                </div>
              </div>
            </div>

            {/* ⚠️ IMPORTANT NOTICE */}
            <div className="alert alert-warning mb-4">
              <h6 className="alert-heading">⚠️ SAFE Notes Have NOT Converted Yet</h6>
              <p className="mb-2">
                SAFE notes will convert into equity shares at the <strong>next priced equity round</strong> (typically Series A).
              </p>
              <p className="mb-0">
                <strong>Conversion Price:</strong> Will be calculated as the LOWER of:
                <ul className="mb-0 mt-2">
                  <li>Next round price × (1 - {formatPercentage(calc.discountRate)})</li>
                  <li>Valuation Cap ÷ Total Shares = {formatCurrency(calc.valuationCap / calc.totalSharesIncludingPool, currency)}</li>
                </ul>
              </p>
            </div>

            {/* CURRENT CAP TABLE */}
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Current Cap Table (Pre-Conversion)</h5>
                    <small>✅ SAFE investors have 0 shares until next priced round</small>
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
                            <th className="text-center">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentTable.shareholders.map((sh, idx) => (
                            <tr key={idx}>
                              <td>
                                <div>
                                  <strong className={
                                    sh.type === "Founder" ? "text-danger" :
                                      sh.type === "Options Pool" ? "text-warning" :
                                        "text-info"
                                  }>
                                    {sh.name}
                                  </strong>
                                  {sh.fullName && sh.fullName !== sh.name && (
                                    <div className="small fw-bold text-dark">{sh.fullName}</div>
                                  )}
                                  <span className={`badge mt-1 ${sh.type === "Founder" ? "bg-success" :
                                    sh.type === "Options Pool" ? "bg-warning text-dark" :
                                      "bg-info"
                                    }`}>
                                    {sh.type}
                                  </span>
                                </div>
                              </td>
                              <td className="text-center small">
                                {sh.email && sh.email !== "-" && (
                                  <div className="text-muted mb-1">📧 {sh.email}</div>
                                )}
                                {sh.phone && sh.phone !== "-" && (
                                  <div className="text-muted">📱 {sh.phone}</div>
                                )}
                                {(!sh.email || sh.email === "-") && (!sh.phone || sh.phone === "-") && (
                                  <span className="text-muted">-</span>
                                )}
                              </td>
                              <td className="text-center">
                                <strong>{formatNumber(sh.shares)}</strong>
                                {sh.type === "SAFE Investor" && (
                                  <div className="small text-danger">
                                    ⚠️ 0 shares - Not converted yet
                                  </div>
                                )}
                                {sh.investmentAmount > 0 && (
                                  <div className="small text-success">
                                    SAFE: {formatCurrency(sh.investmentAmount, currency)}
                                  </div>
                                )}
                              </td>
                              <td className="text-center">
                                <span className={`fSize-16 badge ${sh.type === "Founder" ? "bg-danger" :
                                  sh.type === "Options Pool" ? "bg-warning text-dark" :
                                    "bg-secondary"
                                  }`}>
                                  {formatPercentage(sh.ownership)}
                                </span>
                              </td>
                              <td className="text-center">
                                <strong>{formatCurrency(sh.value, currency)}</strong>
                                {sh.note && (
                                  <div className="small text-muted">{sh.note}</div>
                                )}
                              </td>
                            </tr>
                          ))}

                          {/* TOTAL ROW */}
                          <tr className="table-secondary fw-bold">
                            <td colSpan="2">TOTAL</td>
                            <td className="text-center">{formatNumber(currentTable.totalShares)}</td>
                            <td className="text-center">{formatPercentage(100)}</td>
                            <td className="text-center">{formatCurrency(currentTable.totalValue, currency)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Summary */}
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div className="alert alert-primary mb-0">
                          <strong>Total Founders:</strong> {formatPercentage(
                            currentTable.shareholders
                              .filter(sh => sh.type === "Founder")
                              .reduce((sum, sh) => sum + sh.ownership, 0)
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="alert alert-warning mb-0">
                          <strong>Total SAFE Investment:</strong> {formatCurrency(calc.totalSafeInvestment, currency)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECTION (Optional - for illustration only) */}
            {capTableData.projectedConversion && (
              <div className="alert alert-secondary">
                <h6 className="alert-heading">📊 Estimated Conversion (Projection Only)</h6>
                <p className="mb-2">
                  {capTableData.projectedConversion.note}
                </p>
                <div className="row small">
                  <div className="col-md-4">
                    <strong>Estimated Shares:</strong><br />
                    ~{formatNumber(capTableData.projectedConversion.estimatedShares)}
                  </div>
                  <div className="col-md-4">
                    <strong>Estimated Ownership:</strong><br />
                    ~{formatPercentage(capTableData.projectedConversion.estimatedOwnership)}
                  </div>
                  <div className="col-md-4">
                    <strong>Note:</strong><br />
                    Actual values determined at Series A
                  </div>
                </div>
              </div>
            )}
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
    console.log(capTableData);
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
            <h5 className="mb-3">Series A Inputs</h5>
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

    return (
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa' }}>
        {/* Header */}
        <div className="card mb-4 shadow">
          <div className="card-header text-white" style={{ backgroundColor: '#6f42c1' }}>
            <h3 className="mb-0">💎 {capTableData.roundType || "Preferred Equity Round"}</h3>
            <small className="opacity-75">
              {capTableData.hasConversions && "With Convertible Note Conversions"}
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
                      renderSAFERoundTable()
                    ) : capTableData.instrumentType?.toLowerCase() === "preferred equity" ||
                      capTableData.instrumentType?.toLowerCase().includes("preferred") ? (
                      <PreferredEquityCapTable capTableData={capTableData} />
                    ) : capTableData.isSeriesA ||
                      capTableData.roundType?.toLowerCase().includes("series a") ||
                      (capTableData.calculations?.optionPoolPercentPost &&
                        capTableData.calculations.optionPoolPercentPost > 0) ? (
                      renderSeriesATable()
                    ) : (
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
