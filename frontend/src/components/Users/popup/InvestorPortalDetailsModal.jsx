// InvestorPortalDetailsModal.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InvestorPortalDetailsModal = ({ show, onClose, roundData, investors, countrySymbolList, onUpdateStatus }) => {
    if (!show) return null;

    // Format currency function
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

        const currencyInfo = countrySymbolList?.find(
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

    // Extract round data

    const roundName = roundData?.name || "Round";
    const roundSize = parseFloat(roundData?.roundSize || 0); // Target amount
    const issuedShares = parseFloat(roundData?.issuedShares || 0); // Total shares issued in this round
    const currency = roundData?.currency || "USD";

    // Calculate price per share based on round data (not from investors)
    const pricePerShare = roundSize > 0 && issuedShares > 0 ? roundSize / issuedShares : 0;

    // Calculate statistics from investors
    const totalInvestment = investors?.reduce((sum, inv) => {
        return sum + parseFloat(inv.investment_amount || 0);
    }, 0) || 0;

    const totalSharesFromInvestors = investors?.reduce((sum, inv) => {
        // If shares field is empty, calculate it
        let shares = parseFloat(inv.shares || 0);
        if (shares === 0 && pricePerShare > 0) {
            const investmentAmount = parseFloat(inv.investment_amount || 0);
            if (investmentAmount > 0) {
                shares = investmentAmount / pricePerShare;
            }
        }
        return sum + shares;
    }, 0) || 0;

    // Get status badge
    const getStatusBadge = (status) => {
        const statusConfig = {
            Yes: { class: "badge bg-success", text: "Confirmed" },
            No: { class: "badge bg-warning text-dark", text: "Pending" },
            Rejected: { class: "badge bg-danger", text: "Rejected" },
        };
        const config = statusConfig[status] || statusConfig["No"];
        return <span className={config.class}>{config.text}</span>;
    };

    // Calculate ownership percentage based on issued shares (not total investor shares)
    const calculateOwnership = (shares) => {
        if (!shares || !issuedShares || issuedShares === 0) return "0.00";
        return ((parseFloat(shares) / parseFloat(issuedShares)) * 100).toFixed(2);
    };

    // Calculate shares for each investor
    const calculateInvestorShares = (investmentAmount) => {
        if (!investmentAmount || !pricePerShare || pricePerShare === 0) return 0;
        return investmentAmount / pricePerShare;
    };
    const threeDigitPrice = (price) => {
        return price.toLocaleString(undefined, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        });
    };
    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">
                            <i className="fas fa-users me-2"></i>
                            {roundName} - Investors
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        {/* Round Summary */}
                        <div className="row mb-4">
                            <div className="col-md-3">
                                <div className="card border-0 bg-light">
                                    <div className="card-body text-center">
                                        <h6 className="text-muted">Total Raised</h6>
                                        <h4 className="text-primary">
                                            {currency}{" "}{totalInvestment.toFixed(2)}
                                        </h4>
                                        <small className="text-muted">
                                            {roundSize > 0 ? Math.round((totalInvestment / roundSize) * 100) : 0}% of target
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card border-0 bg-light">
                                    <div className="card-body text-center">
                                        <h6 className="text-muted">Total Shares</h6>
                                        <h4 className="text-success">
                                            {Math.round(issuedShares).toLocaleString()}
                                        </h4>
                                        <small className="text-muted">
                                            issued in this round
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card border-0 bg-light">
                                    <div className="card-body text-center">
                                        <h6 className="text-muted">Price per Share</h6>
                                        <h4 className="text-info">
                                            {currency}{" "}{threeDigitPrice(pricePerShare)}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card border-0 bg-light">
                                    <div className="card-body text-center">
                                        <h6 className="text-muted">Total Investors</h6>
                                        <h4 className="text-warning">{investors?.length || 0}</h4>
                                        <small className="text-muted">
                                            {investors?.filter(inv => inv.request_confirm === "Yes").length || 0} confirmed
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Round Information */}
                        <div className="alert alert-info mb-4">
                            <div className="row">
                                <div className="col-md-4">
                                    <strong>Round Target:</strong> {currency}{" "}{roundSize.toFixed(2)}
                                </div>
                                <div className="col-md-4">
                                    <strong>Issued Shares:</strong> {Math.round(issuedShares).toLocaleString()}
                                </div>
                                <div className="col-md-4">
                                    <strong>Completion:</strong> {roundSize > 0 ? Math.round((totalInvestment / roundSize) * 100) : 0}%
                                </div>
                            </div>
                        </div>

                        {/* Investors Table */}
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Investor Name</th>
                                        <th>Investment Amount</th>
                                        <th>Shares</th>
                                        <th>Ownership %</th>
                                        <th>Status</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!investors || investors.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="text-center py-4">
                                                <i className="fas fa-user-slash fa-2x text-muted mb-2"></i>
                                                <p className="text-muted">No investors found for this round</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        investors.map((investor) => {
                                            // Get investment amount
                                            const investmentAmount = parseFloat(investor.investment_amount || 0);

                                            // Calculate shares based on price per share
                                            let shares = parseFloat(investor.shares || 0);
                                            if (shares === 0 && pricePerShare > 0 && investmentAmount > 0) {
                                                shares = calculateInvestorShares(investmentAmount);
                                            }

                                            // Calculate ownership percentage
                                            const ownershipPercentage = calculateOwnership(shares);

                                            return (
                                                <tr key={investor.id || investor.investor_id}>
                                                    <td>
                                                        <div className="fw-semibold">
                                                            {investor.name || investor.investor_name || "Unnamed Investor"}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="fw-semibold">
                                                            {investor.currency || currency}{" "}{
                                                                investmentAmount.toFixed(2)
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="fw-semibold">
                                                            {shares.toFixed(3)}
                                                        </div>
                                                        <div className="text-muted small">
                                                            {shares.toFixed(3)} exact
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="fw-semibold">
                                                            {ownershipPercentage}%
                                                        </div>
                                                        <div className="text-muted small">
                                                            of {Math.round(issuedShares).toLocaleString()} total issued shares
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {getStatusBadge(investor.request_confirm)}
                                                    </td>
                                                    <td>
                                                        <div className="text-muted small">
                                                            {investor.email || investor.investor_email || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="text-muted small">
                                                            {investor.phone || investor.investor_phone || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="btn-group" role="group">
                                                            {investor.request_confirm === "No" && (
                                                                <>
                                                                    <button
                                                                        className="btn btn-sm btn-success"
                                                                        onClick={() => onUpdateStatus(investor.id, "Yes")}
                                                                        title="Approve"
                                                                    >
                                                                        <i className="fas fa-check"></i>
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-sm btn-danger"
                                                                        onClick={() => onUpdateStatus(investor.id, "Rejected")}
                                                                        title="Reject"
                                                                    >
                                                                        <i className="fas fa-times"></i>
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            <i className="fas fa-times me-1"></i> Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                // Export to CSV functionality
                                if (!investors || investors.length === 0) {
                                    alert('No data to export');
                                    return;
                                }

                                const csvRows = [];

                                // Headers
                                csvRows.push(['Investor Name', 'Email', 'Phone', 'Investment Amount', 'Shares', 'Ownership %', 'Status']);

                                // Data rows
                                investors.forEach(investor => {
                                    const investmentAmount = parseFloat(investor.investment_amount || 0);
                                    let shares = parseFloat(investor.shares || 0);
                                    if (shares === 0 && pricePerShare > 0 && investmentAmount > 0) {
                                        shares = calculateInvestorShares(investmentAmount);
                                    }
                                    const ownershipPercentage = calculateOwnership(shares);

                                    const row = [
                                        investor.name || investor.investor_name || '',
                                        investor.email || investor.investor_email || '',
                                        investor.phone || investor.investor_phone || '',
                                        investmentAmount,
                                        shares.toFixed(3),
                                        ownershipPercentage,
                                        investor.request_confirm || ''
                                    ];
                                    csvRows.push(row);
                                });

                                const csvContent = csvRows.map(row =>
                                    row.map(cell => `"${cell}"`).join(',')
                                ).join('\n');

                                const blob = new Blob([csvContent], { type: 'text/csv' });
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${roundName.replace(/\s+/g, '_')}_investors.csv`;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                window.URL.revokeObjectURL(url);
                            }}
                        >
                            <i className="fas fa-download me-1"></i> Export to CSV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorPortalDetailsModal;