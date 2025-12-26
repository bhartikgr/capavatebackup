// InvestorReportPortal.jsx
import React, { useState, useEffect } from "react";
import TopBar from "../../../components/Users/TopBar";
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import InvestorPortalDetailsModal from "../../../components/Users/popup/InvestorPortalDetailsModal.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config.js";
export default function InvestorReportPortal() {
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const userLogin = JSON.parse(storedUsername);

  document.title = "Investor Portal";
  const [countrySymbolList, setCountrysymbollist] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
  const [groupedRounds, setGroupedRounds] = useState({});
  const [showInvestorModal, setShowInvestorModal] = useState(false);
  const [selectedRound, setSelectedRound] = useState(null);
  const [selectedRoundInvestors, setSelectedRoundInvestors] = useState([]);

  const apiURLInvestor = API_BASE_URL + "api/user/investor/";
  const apiUrlRound = API_BASE_URL + "api/user/capitalround/";

  useEffect(() => {
    getallcountrySymbolList();
  }, []);

  useEffect(() => {
    fetchInvestorData();
  }, []);

  const getallcountrySymbolList = async () => {
    let formData = { id: "" };
    try {
      const res = await axios.post(
        apiUrlRound + "getallcountrySymbolList",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setCountrysymbollist(res.data.results || []);
    } catch (err) {
      console.error("Error fetching currency list:", err);
    }
  };

  const groupInvestmentsByRound = (investments) => {
    const grouped = {};

    investments.forEach((investment) => {
      const roundKey = investment.roundrecord_id || investment.nameOfRound;
      const roundName = investment.nameOfRound || "Unnamed Round";

      if (!grouped[roundKey]) {
        // Get round data
        const roundSize = parseFloat(investment.roundsize || 0);
        const issuedShares = parseFloat(investment.issuedshares || 0);

        // Calculate price per share: roundSize / issuedShares (from doc 1 formula)
        let pricePerShare = 0;
        if (roundSize > 0 && issuedShares > 0) {
          pricePerShare = roundSize / issuedShares;
        }

        grouped[roundKey] = {
          id: roundKey,
          name: roundName,
          company_name: investment.company_name,
          shareClassType: investment.shareClassType,
          instrumentType: investment.instrumentType,
          currency: investment.currency || "USD",
          roundSize: roundSize, // Target amount
          issuedShares: issuedShares, // Total shares issued in this round
          pricePerShare: pricePerShare,
          investors: [],
          totalInvestment: 0, // Actual raised from confirmed investors
          confirmedInvestment: 0,
          totalInvestors: 0,
          confirmedInvestors: 0,
          pendingInvestors: 0,
          totalSharesFromInvestors: 0, // Sum of shares owned by investors in this round
        };
      }

      // Get shares from investment data
      let shares = parseFloat(investment.shares || 0);
      const investmentAmount = parseFloat(investment.investment_amount || 0);

      // If shares are 0 but we have investment amount and price per share, calculate
      if (shares === 0 && investmentAmount > 0 && grouped[roundKey].pricePerShare > 0) {
        shares = investmentAmount / grouped[roundKey].pricePerShare;
      }

      // Add investor to this round
      const investor = {
        id: investment.id,
        investor_id: investment.investor_id,
        name: investment.investor_name,
        email: investment.investor_email,
        phone: investment.investor_phone,
        investment_amount: investmentAmount,
        shares: shares,
        request_confirm: investment.request_confirm,
        instrumentType: investment.instrumentType,
        currency: investment.currency || "USD"
      };

      grouped[roundKey].investors.push(investor);

      // Update round statistics
      grouped[roundKey].totalInvestment += investmentAmount;
      grouped[roundKey].totalInvestors++;
      grouped[roundKey].totalSharesFromInvestors += shares;

      if (investor.request_confirm === "Yes") {
        grouped[roundKey].confirmedInvestment += investmentAmount;
        grouped[roundKey].confirmedInvestors++;
      } else if (investor.request_confirm === "No") {
        grouped[roundKey].pendingInvestors++;
      }
    });

    return grouped;
  };

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
        const grouped = groupInvestmentsByRound(generateRes.data.results);
        setGroupedRounds(grouped);

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
        setGroupedRounds({});
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
      setGroupedRounds({});
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
        // Also refresh the modal if it's open
        if (selectedRound) {
          const roundKey = Object.keys(groupedRounds).find(key =>
            groupedRounds[key].investors.some(inv => inv.id === requestId)
          );
          if (roundKey && showInvestorModal) {
            handleViewRoundDetails(roundKey);
          }
        }
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

  // In your main component's handleViewRoundDetails function:
  const handleViewRoundDetails = (roundKey) => {
    const round = groupedRounds[roundKey];
    console.log("Round data for modal:", round);
    console.log("Issued shares:", round?.issuedShares);
    console.log("Investors:", round?.investors);

    if (round) {
      setSelectedRound({
        id: round.id,
        name: round.name,
        company_name: round.company_name,
        shareClassType: round.shareClassType,
        instrumentType: round.instrumentType,
        currency: round.currency,
        roundSize: round.roundSize,
        pricePerShare: round.pricePerShare,
        issuedShares: round.issuedShares || round.totalShares, // Use issuedShares if available, otherwise totalShares
        totalInvestment: round.totalInvestment
      });
      setSelectedRoundInvestors(round.investors);
      setShowInvestorModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowInvestorModal(false);
    setSelectedRound(null);
    setSelectedRoundInvestors([]);
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
    let cleanCurrency = currency;
    if (currency) {
      cleanCurrency = currency
        .replace(/[\$\€\£\¥\₹\₽]/g, "")
        .replace(/\s+/g, "")
        .trim()
        .toUpperCase();
    }

    const currencyInfo = countrySymbolList.find(
      (country) =>
        country.currency_code === cleanCurrency ||
        country.currency_code === currency ||
        country.currency_symbol === currency
    );

    if (currencyInfo) {
      try {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currencyInfo.currency_code,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(numAmount);
      } catch (error) {
        return `${currencyInfo.currency_symbol}${numAmount.toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )}`;
      }
    }

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

    return `$${numAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const renderRoundsTable = () => {
    const rounds = Object.values(groupedRounds);

    if (rounds.length === 0) {
      return (
        <div className="text-center py-5">
          <i className="fas fa-chart-pie fa-3x text-muted mb-3"></i>
          <h6>No Investment Rounds Found</h6>
          <p className="text-muted">
            There are no investment rounds for this company yet.
          </p>
        </div>
      );
    }
    const threeDigitPrice = (price) => {
      return price.toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
      });
    };

    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>Round Details</th>
              <th>Investment Summary</th>
              <th>Investors</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rounds.map((round, index) => {
              const roundKey = Object.keys(groupedRounds)[index];

              // Calculate completion percentages
              const investorCompletionRate = round.totalInvestors > 0
                ? Math.round((round.confirmedInvestors / round.totalInvestors) * 100)
                : 0;

              // Calculate funding completion: how much of target is raised
              const fundingCompletionRate = round.roundSize > 0
                ? Math.round((round.totalInvestment / round.roundSize) * 100)
                : 0;

              return (
                <tr key={roundKey}>
                  <td>
                    <div>
                      <div className="fw-semibold">
                        {round.name}
                      </div>
                      <div className="text-muted small">
                        {round.company_name}
                      </div>
                      <div className="text-muted small">
                        {round.shareClassType} • {round.instrumentType}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      {/* Target राउंड size */}
                      <div className="fw-semibold text-primary">
                        Target: {round.currency}{" "}{round.roundSize.toFixed(2)}
                      </div>

                      {/* Raised amount */}
                      <div className="text-muted">
                        Raised: {round.currency}{" "}{round.totalInvestment.toFixed(2)}
                        {round.roundSize > 0 && (
                          <span className="ms-2">
                            ({fundingCompletionRate}% of target)
                          </span>
                        )}
                      </div>

                      {/* Confirmed investments */}
                      <div className="text-muted small">
                        Confirmed: {round.currency}{" "}{round.confirmedInvestment.toFixed(2)}
                      </div>

                      {/* Shares information */}
                      <div className="text-muted small">
                        {Math.round(round.issuedShares).toLocaleString()} shares issued
                      </div>

                      {/* Price per share */}
                      {round.pricePerShare > 0 && (
                        <div className="text-muted small">
                          Price/share: {round.currency}{" "}{round.pricePerShare.toLocaleString(undefined, {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3
                          })}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="fw-semibold">
                        {round.totalInvestors} investor{round.totalInvestors !== 1 ? 's' : ''}
                      </div>
                      <div className="text-muted small">
                        {round.confirmedInvestors} confirmed • {round.pendingInvestors} pending
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      {/* Show both investor completion and funding completion */}
                      <div className="mb-1">
                        {investorCompletionRate === 100 ? (
                          <span className="badge bg-success">
                            <i className="fas fa-check-circle me-1"></i> Investors Complete ({investorCompletionRate}%)
                          </span>
                        ) : investorCompletionRate > 0 ? (
                          <span className="badge bg-warning text-dark">
                            <i className="fas fa-clock me-1"></i> Investors in Progress ({investorCompletionRate}%)
                          </span>
                        ) : (
                          <span className="badge bg-secondary">
                            <i className="fas fa-hourglass-start me-1"></i> No Investors
                          </span>
                        )}
                      </div>

                      {/* Funding status */}
                      <div>
                        {fundingCompletionRate === 100 ? (
                          <span className="badge bg-success">
                            <i className="fas fa-trophy me-1"></i> Fully Funded
                          </span>
                        ) : fundingCompletionRate > 0 ? (
                          <span className="badge bg-info text-white">
                            <i className="fas fa-chart-line me-1"></i> {fundingCompletionRate}% Funded
                          </span>
                        ) : (
                          <span className="badge bg-light text-dark">
                            <i className="fas fa-chart-line me-1"></i> Not Funded
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleViewRoundDetails(roundKey)}
                        title="View Investors"
                      >
                        <i className="fas fa-eye me-1"></i> View Investors
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  console.log(investorData)
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
                    <small className="text-muted">Total Rounds</small>
                    <h4 className="text-success mb-0">
                      {Object.keys(groupedRounds).length}
                    </h4>
                  </div>
                </div>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                            <i className="fas fa-bullseye text-primary"></i>
                          </div>
                          <div>
                            <h6 className="card-subtitle mb-1 text-muted">
                              Total Target
                            </h6>
                            <h4 className="card-title mb-0">
                              {investorData.investments?.length > 0 ? (
                                formatCurrency(
                                  investorData.investments.reduce((sum, inv) =>
                                    sum + parseFloat(inv.roundsize || 0), 0
                                  )
                                )
                              ) : (
                                formatCurrency(0)
                              )}
                            </h4>
                            <small className="text-muted">
                              Total amount to raise across all rounds
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                            <i className="fas fa-chart-line text-success"></i>
                          </div>
                          <div>
                            <h6 className="card-subtitle mb-1 text-muted">
                              Completion Rate
                            </h6>
                            <h4 className="card-title mb-0">
                              {investorData.investments?.length > 0 ? (
                                (() => {
                                  const totalTarget = investorData.investments.reduce((sum, inv) =>
                                    sum + parseFloat(inv.roundsize || 0), 0
                                  );
                                  const totalRaised = investorData.stats.totalInvestment;
                                  return totalTarget > 0 ?
                                    `${((totalRaised / totalTarget) * 100).toFixed(1)}%` :
                                    "0%";
                                })()
                              ) : (
                                "0%"
                              )}
                            </h4>
                            <small className="text-muted">
                              {investorData.investments?.length > 0 && (
                                <>
                                  {formatCurrency(investorData.stats.totalInvestment)} raised of {
                                    formatCurrency(
                                      investorData.investments.reduce((sum, inv) =>
                                        sum + parseFloat(inv.roundsize || 0), 0
                                      )
                                    )
                                  } target
                                </>
                              )}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Stats Cards */}
                <div className="row g-3 mb-4">
                  <div className="col-md-3 col-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                            <i className="fas fa-layer-group text-primary"></i>
                          </div>
                          <div>
                            <h6 className="card-subtitle mb-1 text-muted">
                              Total Rounds
                            </h6>
                            <h4 className="card-title mb-0">
                              {Object.keys(groupedRounds).length}
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
                              Total Raised
                            </h6>
                            <h4 className="card-title mb-0">
                              {formatCurrency(investorData.stats.totalInvestment)}
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
                            <i className="fas fa-users text-info"></i>
                          </div>
                          <div>
                            <h6 className="card-subtitle mb-1 text-muted">
                              Total Investors
                            </h6>
                            <h4 className="card-title mb-0">
                              {investorData.stats.confirmedInvestments + investorData.stats.pendingRequests}
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
                              Pending Requests
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
                      <i className="fas fa-chart-pie me-2"></i>Investment Rounds
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
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading investment data...</p>
                      </div>
                    ) : error ? (
                      <div className="alert alert-warning text-center">
                        <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
                        <h6>Error Loading Data</h6>
                        <p>{error}</p>
                        <button className="btn btn-sm btn-primary" onClick={fetchInvestorData}>
                          Try Again
                        </button>
                      </div>
                    ) : (
                      renderRoundsTable()
                    )}
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>

      {/* Investor Details Modal */}
      <InvestorPortalDetailsModal
        show={showInvestorModal}
        onClose={handleCloseModal}
        roundData={selectedRound}
        investors={selectedRoundInvestors}
        onUpdateStatus={updateInvestmentStatus}
      />
    </Wrapper>
  );
}