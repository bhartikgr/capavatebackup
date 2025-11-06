// Updated React Component
import React, { useState, useEffect } from "react";
import TopBar from "../../../components/Users/TopBar";
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InvestorReportPortal() {
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const userLogin = JSON.parse(storedUsername);

  document.title = "Investor Portal";
  const [countrySymbolList, setCountrysymbollist] = useState([]);
  // State management
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [investorData, setInvestorData] = useState({
    investments: [],
    stats: {
      totalInvestment: 0,
      activeInvestments: 0,
      totalShares: 0,
      pendingRequests: 0,
      confirmedInvestments: 0,
      rejectedInvestments: 0,
    },
  });

  // API URL - adjust according to your setup

  const apiURLInvestor = "http://localhost:5000/api/user/investor/";
  const apiUrlRound = "http://localhost:5000/api/user/capitalround/";
  useEffect(() => {
    getallcountrySymbolList();
  }, []);
  const getallcountrySymbolList = async () => {
    let formData = {
      id: "",
    };
    try {
      const res = await axios.post(
        apiUrlRound + "getallcountrySymbolList",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
        }
      );

      var respo = res.data.results;

      setCountrysymbollist(respo);
    } catch (err) {
      // Enhanced error handling
    }
  };
  useEffect(() => {
    fetchInvestorData();
  }, []);

  const fetchInvestorData = async () => {
    setLoading(true);
    setError(null);

    const formData = {
      company_id: userLogin.companies[0].id,
    };

    try {
      const generateRes = await axios.post(
        apiURLInvestor + "fetchInvestorData",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (generateRes.data && generateRes.data.results) {
        console.log(generateRes.data);
        setInvestorData({
          investments: generateRes.data.results,
          stats: generateRes.data.stats || {
            totalInvestment: 0,
            activeInvestments: 0,
            totalShares: 0,
            pendingRequests: 0,
            confirmedInvestments: 0,
            rejectedInvestments: 0,
          },
        });
      } else {
        setError("No investment data found");
        setInvestorData({
          investments: [],
          stats: {
            totalInvestment: 0,
            activeInvestments: 0,
            totalShares: 0,
            pendingRequests: 0,
            confirmedInvestments: 0,
            rejectedInvestments: 0,
          },
        });
      }
    } catch (err) {
      console.error("Error fetching investor data:", err);
      setError("Failed to fetch investor data");
      setInvestorData({
        investments: [],
        stats: {
          totalInvestment: 0,
          activeInvestments: 0,
          totalShares: 0,
          pendingRequests: 0,
          confirmedInvestments: 0,
          rejectedInvestments: 0,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const updateInvestmentStatus = async (requestId, status) => {
    try {
      const response = await axios.post(
        apiURLInvestor + "updateInvestmentStatus",
        {
          request_id: requestId,
          status: status,
          updated_by_id: userLogin.id,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        // Refresh data after status update
        fetchInvestorData();
        alert(
          `Investment ${status === "Yes"
            ? "approved"
            : status === "Rejected"
              ? "rejected"
              : "marked as pending"
          } successfully`
        );
      }
    } catch (error) {
      console.error("Error updating investment status:", error);
      alert("Failed to update investment status");
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Yes: { class: "badge bg-success", text: "Confirmed", icon: "✓" },
      No: { class: "badge bg-warning text-dark", text: "Pending", icon: "⏳" },
      Rejected: { class: "badge bg-danger", text: "Rejected", icon: "✗" },
    };

    const config = statusConfig[status] || statusConfig["No"];

    return (
      <span className={config.class}>
        {config.icon} {config.text}
      </span>
    );
  };

  const calculateOwnership = (shares, totalShares) => {
    if (!shares || !totalShares) return "0";
    return ((parseFloat(shares) / parseFloat(totalShares)) * 100).toFixed(2);
  };

  const formatCurrency = (amount, currency = "USD") => {
    if (!amount || isNaN(parseFloat(amount))) return "$0.00";

    const numAmount = parseFloat(amount);

    // Clean the currency input - remove extra symbols and spaces
    let cleanCurrency = currency;
    if (currency) {
      cleanCurrency = currency
        .replace(/[\$\€\£\¥\₹\₽]/g, "") // Remove common currency symbols
        .replace(/\s+/g, "") // Remove spaces
        .trim()
        .toUpperCase();
    }

    // Find currency info from your dynamic country list
    const currencyInfo = countrySymbolList.find(
      (country) =>
        country.currency_code === cleanCurrency ||
        country.currency_code === currency ||
        country.currency_symbol === currency
    );

    if (currencyInfo) {
      // Use the currency info from your database
      try {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currencyInfo.currency_code,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(numAmount);
      } catch (error) {
        // Fallback to manual formatting with your currency symbol
        return `${currencyInfo.currency_symbol}${numAmount.toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}`;
      }
    }

    // Fallback: try with cleaned currency code
    if (/^[A-Z]{3}$/.test(cleanCurrency)) {
      try {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: cleanCurrency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(numAmount);
      } catch (error) {
        console.warn(`Currency formatting error for ${currency}:`, error);
      }
    }

    // Final fallback - default USD formatting
    return `$${numAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const confirmedInvestments = investorData.investments.filter(
    (inv) => inv.request_confirm === "Yes"
  );

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
                {/* Header */}
                <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">Investor Portal</h3>
                    <p className="text-muted mb-0">
                      Company:{" "}
                      {userLogin.companies && userLogin.companies[0]
                        ? userLogin.companies[0].name
                        : "N/A"}
                    </p>
                  </div>
                  <div className="text-end">
                    <small className="text-muted">Total Investments</small>
                    <h4 className="text-success mb-0">
                      {formatCurrency(investorData.stats.totalInvestment)}
                    </h4>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="row g-3 mb-4">
                  <div className="col-md-3 col-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                            <i className="fas fa-chart-line text-primary"></i>
                          </div>
                          <div>
                            <h6 className="card-subtitle mb-1 text-muted">
                              Confirmed
                            </h6>
                            <h4 className="card-title mb-0">
                              {investorData.stats.confirmedInvestments}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                            <i className="fas fa-dollar-sign text-success"></i>
                          </div>
                          <div>
                            <h6 className="card-subtitle mb-1 text-muted">
                              Total Amount
                            </h6>
                            <h4 className="card-title mb-0">
                              {formatCurrency(
                                investorData.stats.totalInvestment
                              )}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                            <i className="fas fa-share-alt text-info"></i>
                          </div>
                          <div>
                            <h6 className="card-subtitle mb-1 text-muted">
                              Total Issue Shares
                            </h6>
                            <h4 className="card-title mb-0">
                              {investorData.stats.totalShares.toLocaleString()}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                            <i className="fas fa-clock text-warning"></i>
                          </div>
                          <div>
                            <h6 className="card-subtitle mb-1 text-muted">
                              Pending
                            </h6>
                            <h4 className="card-title mb-0">
                              {investorData.stats.pendingRequests}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="card shadow-sm">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      <i className="fas fa-users me-2"></i>Investment Requests
                    </h5>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={fetchInvestorData}
                      disabled={loading}
                    >
                      <i className="fas fa-sync-alt me-1"></i>
                      {loading ? "Loading..." : "Refresh"}
                    </button>
                  </div>

                  <div className="card-body">
                    {loading ? (
                      <div className="text-center py-5">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">
                          Loading investment data...
                        </p>
                      </div>
                    ) : error ? (
                      <div className="alert alert-warning text-center">
                        <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
                        <h6>Error Loading Data</h6>
                        <p>{error}</p>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={fetchInvestorData}
                        >
                          Try Again
                        </button>
                      </div>
                    ) : investorData.investments.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                        <h6>No Investment Requests Found</h6>
                        <p className="text-muted">
                          There are no investment requests for this company yet.
                        </p>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>Investor Details</th>
                              <th>Round/Company</th>
                              <th>Investment</th>
                              <th>Ownership</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {investorData.investments.map((investment) => (
                              <tr key={investment.id}>
                                <td>
                                  <div>
                                    <div className="fw-semibold">
                                      {investment.investor_name}
                                    </div>
                                    <div className="text-muted small">
                                      {investment.investor_email}
                                    </div>
                                    <div className="text-muted small">
                                      {investment.investor_phone}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <div className="fw-semibold">
                                      {investment.nameOfRound}
                                    </div>
                                    <div className="text-muted small">
                                      {investment.company_name}
                                    </div>
                                    <div className="text-muted small">
                                      {investment.shareClassType}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <div className="fw-semibold">
                                      {formatCurrency(
                                        investment.investment_amount,
                                        investment.currency
                                      )}
                                    </div>
                                    <div className="text-muted small">
                                      {parseFloat(
                                        investment.shares
                                      ).toLocaleString()}{" "}
                                      shares
                                    </div>
                                    <div className="text-muted small">
                                      {investment.instrumentType}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <div className="fw-semibold">
                                      {calculateOwnership(
                                        investment.shares,
                                        investment.issuedshares
                                      )}
                                      %
                                    </div>
                                    <div className="text-muted small">
                                      of{" "}
                                      {parseFloat(
                                        investment.issuedshares
                                      ).toLocaleString()}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  {getStatusBadge(investment.request_confirm)}
                                </td>
                                <td>
                                  <div className="btn-group" role="group">
                                    {investment.request_confirm === "No" && (
                                      <>
                                        <button
                                          className="btn btn-sm btn-success"
                                          onClick={() =>
                                            updateInvestmentStatus(
                                              investment.id,
                                              "Yes"
                                            )
                                          }
                                          title="Approve"
                                        >
                                          <i className="fas fa-check"></i>
                                        </button>
                                        <button
                                          className="btn btn-sm btn-danger"
                                          onClick={() =>
                                            updateInvestmentStatus(
                                              investment.id,
                                              "Rejected"
                                            )
                                          }
                                          title="Reject"
                                        >
                                          <i className="fas fa-times"></i>
                                        </button>
                                      </>
                                    )}
                                    <button
                                      className="btn btn-sm btn-outline-info"
                                      onClick={() => {
                                        /* View details logic */
                                      }}
                                      title="View Details"
                                    >
                                      <i className="fas fa-eye"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
