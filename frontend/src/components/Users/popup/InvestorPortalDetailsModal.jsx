// InvestorPortalDetailsModal.jsx - Fixed Version
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const InvestorPortalDetailsModal = ({
    show,
    onClose,
    roundData,
    investors,
    countrySymbolList,
    onUpdateStatus
}) => {
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

    // Format number with 3 decimal places
    const threeDigitPrice = (price) => {
        return price.toLocaleString(undefined, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3
        });
    };

    // Extract round data
    const roundName = roundData?.name || "Round";
    const roundSize = parseFloat(roundData?.roundSize || 0); // Target amount to raise
    const issuedShares = parseFloat(roundData?.issuedShares || 0); // Total shares issued in this round
    const currency = roundData?.currency || "USD";
    const pricePerShare = parseFloat(roundData?.pricePerShare || 0);

    // Calculate statistics from confirmed investors only
    const confirmedInvestors = investors?.filter(inv => inv.request_confirm === "Yes") || [];
    const pendingInvestors = investors?.filter(inv => inv.request_confirm === "No") || [];
    const rejectedInvestors = investors?.filter(inv => inv.request_confirm === "Rejected") || [];

    // Total investment from all investors (confirmed + pending)
    const totalInvestment = investors?.reduce((sum, inv) => {
        return sum + parseFloat(inv.investment_amount || 0);
    }, 0) || 0;

    // Confirmed investment only
    const confirmedInvestment = confirmedInvestors.reduce((sum, inv) => {
        return sum + parseFloat(inv.investment_amount || 0);
    }, 0);

    // Calculate total shares allocated to investors
    const totalSharesFromInvestors = investors?.reduce((sum, inv) => {
        const shares = parseFloat(inv.shares || 0);
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

    // Calculate ownership percentage based on total issued shares
    const calculateOwnership = (shares) => {
        if (!shares || !issuedShares || issuedShares === 0) return "0.00";
        return ((parseFloat(shares) / parseFloat(issuedShares)) * 100).toFixed(2);
    };

    // Calculate shares for investor based on their investment
    const calculateInvestorShares = (investmentAmount) => {
        if (!investmentAmount || !pricePerShare || pricePerShare === 0) return 0;
        return parseFloat(investmentAmount) / pricePerShare;
    };

    return (
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
            role="dialog"
        >
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">
                            <i className="fas fa-users me-2"></i>
                            {roundName} - Investors Details
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        {/* Round Summary Cards */}
                        <div className="row mb-4">
                            <div className="col-md-3 col-6 mb-3">
                                <div className="card border-0 bg-light h-100">
                                    <div className="card-body text-center">
                                        <h6 className="text-muted mb-2">Round Target</h6>
                                        <h4 className="text-primary mb-1">
                                            {formatCurrency(roundSize, currency)}
                                        </h4>
                                        <small className="text-muted">
                                            Total to raise
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 col-6 mb-3">
                                <div className="card border-0 bg-light h-100">
                                    <div className="card-body text-center">
                                        <h6 className="text-muted mb-2">Total Raised</h6>
                                        <h4 className="text-success mb-1">
                                            {formatCurrency(confirmedInvestment, currency)}
                                        </h4>
                                        <small className="text-muted">
                                            {roundSize > 0 ? Math.round((confirmedInvestment / roundSize) * 100) : 0}% of target
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 col-6 mb-3">
                                <div className="card border-0 bg-light h-100">
                                    <div className="card-body text-center">
                                        <h6 className="text-muted mb-2">Issued Shares</h6>
                                        <h4 className="text-info mb-1">
                                            {Math.round(issuedShares).toLocaleString()}
                                        </h4>
                                        <small className="text-muted">
                                            Total in round
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 col-6 mb-3">
                                <div className="card border-0 bg-light h-100">
                                    <div className="card-body text-center">
                                        <h6 className="text-muted mb-2">Price/Share</h6>
                                        <h4 className="text-warning mb-1">
                                            {formatCurrency(pricePerShare, currency)}
                                        </h4>
                                        <small className="text-muted">
                                            {threeDigitPrice(pricePerShare)}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Investor Statistics */}
                        <div className="alert alert-info mb-4">
                            <div className="row">
                                <div className="col-md-3">
                                    <strong>Total Investors:</strong> {investors?.length || 0}
                                </div>
                                <div className="col-md-3">
                                    <strong>Confirmed:</strong> {confirmedInvestors.length}
                                </div>
                                <div className="col-md-3">
                                    <strong>Pending:</strong> {pendingInvestors.length}
                                </div>
                                <div className="col-md-3">
                                    <strong>Rejected:</strong> {rejectedInvestors.length}
                                </div>
                            </div>
                        </div>

                        {/* Investors Table */}
                        <div className="table-responsive">
                            <table className="table table-hover table-sm">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Investor</th>
                                        <th className="text-end">Investment</th>
                                        <th className="text-end">Shares</th>
                                        <th className="text-end">Ownership %</th>
                                        <th className="text-center">Status</th>
                                        <th>Contact</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!investors || investors.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center py-5">
                                                <i className="fas fa-user-slash fa-3x text-muted mb-3"></i>
                                                <p className="text-muted mb-0">No investors found for this round</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        investors.map((investor) => {
                                            // Get investment amount
                                            const investmentAmount = parseFloat(investor.investment_amount || 0);

                                            // Get shares (from API or calculate)
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
                                                        <div className="text-muted small">
                                                            ID: {investor.investor_id}
                                                        </div>
                                                    </td>
                                                    <td className="text-end">
                                                        <div className="fw-semibold">
                                                            {formatCurrency(investmentAmount, investor.currency || currency)}
                                                        </div>
                                                    </td>
                                                    <td className="text-end">
                                                        <div className="fw-semibold">
                                                            {Math.round(shares).toLocaleString()}
                                                        </div>
                                                        <div className="text-muted small">
                                                            {threeDigitPrice(shares)} exact
                                                        </div>
                                                    </td>
                                                    <td className="text-end">
                                                        <div className="fw-semibold">
                                                            {ownershipPercentage}%
                                                        </div>
                                                        <div className="text-muted small">
                                                            of round
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        {getStatusBadge(investor.request_confirm)}
                                                    </td>
                                                    <td>
                                                        <div className="text-muted small">
                                                            <i className="fas fa-envelope me-1"></i>
                                                            {investor.email || investor.investor_email || 'N/A'}
                                                        </div>
                                                        <div className="text-muted small">
                                                            <i className="fas fa-phone me-1"></i>
                                                            {investor.phone || investor.investor_phone || 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        {investor.request_confirm === "No" && (
                                                            <div className="btn-group btn-group-sm" role="group">
                                                                <button
                                                                    className="btn btn-success"
                                                                    onClick={() => onUpdateStatus(investor.id, "Yes")}
                                                                    title="Approve Investment"
                                                                >
                                                                    <i className="fas fa-check"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => onUpdateStatus(investor.id, "Rejected")}
                                                                    title="Reject Investment"
                                                                >
                                                                    <i className="fas fa-times"></i>
                                                                </button>
                                                            </div>
                                                        )}
                                                        {investor.request_confirm === "Yes" && (
                                                            <span className="text-success">
                                                                <i className="fas fa-check-circle"></i> Approved
                                                            </span>
                                                        )}
                                                        {investor.request_confirm === "Rejected" && (
                                                            <span className="text-danger">
                                                                <i className="fas fa-ban"></i> Rejected
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                                {investors && investors.length > 0 && (
                                    <tfoot className="table-light">
                                        <tr>
                                            <td className="fw-bold">Total</td>
                                            <td className="text-end fw-bold">
                                                {formatCurrency(totalInvestment, currency)}
                                            </td>
                                            <td className="text-end fw-bold">
                                                {Math.round(totalSharesFromInvestors).toLocaleString()}
                                            </td>
                                            <td className="text-end fw-bold">
                                                {calculateOwnership(totalSharesFromInvestors)}%
                                            </td>
                                            <td colSpan="3"></td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold text-success">Confirmed Only</td>
                                            <td className="text-end fw-bold text-success">
                                                {formatCurrency(confirmedInvestment, currency)}
                                            </td>
                                            <td className="text-end fw-bold text-success">
                                                {Math.round(confirmedInvestors.reduce((sum, inv) => sum + parseFloat(inv.shares || 0), 0)).toLocaleString()}
                                            </td>
                                            <td className="text-end fw-bold text-success">
                                                {calculateOwnership(confirmedInvestors.reduce((sum, inv) => sum + parseFloat(inv.shares || 0), 0))}%
                                            </td>
                                            <td colSpan="3"></td>
                                        </tr>
                                    </tfoot>
                                )}
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
                                if (!investors || investors.length === 0) {
                                    alert('No data to export');
                                    return;
                                }

                                const csvRows = [];

                                // Headers
                                csvRows.push([
                                    'Round Name',
                                    'Investor ID',
                                    'Investor Name',
                                    'Email',
                                    'Phone',
                                    'Investment Amount',
                                    'Currency',
                                    'Shares',
                                    'Ownership %',
                                    'Status'
                                ]);

                                // Data rows
                                investors.forEach(investor => {
                                    const investmentAmount = parseFloat(investor.investment_amount || 0);
                                    let shares = parseFloat(investor.shares || 0);
                                    if (shares === 0 && pricePerShare > 0 && investmentAmount > 0) {
                                        shares = calculateInvestorShares(investmentAmount);
                                    }
                                    const ownershipPercentage = calculateOwnership(shares);

                                    const row = [
                                        roundName,
                                        investor.investor_id || '',
                                        investor.name || investor.investor_name || '',
                                        investor.email || investor.investor_email || '',
                                        investor.phone || investor.investor_phone || '',
                                        investmentAmount,
                                        investor.currency || currency,
                                        shares.toFixed(3),
                                        ownershipPercentage,
                                        investor.request_confirm || ''
                                    ];
                                    csvRows.push(row);
                                });

                                // Add summary rows
                                csvRows.push([]);
                                csvRows.push(['Summary']);
                                csvRows.push(['Round Target', roundSize]);
                                csvRows.push(['Total Raised', confirmedInvestment]);
                                csvRows.push(['Total Shares Issued', issuedShares]);
                                csvRows.push(['Price Per Share', pricePerShare]);
                                csvRows.push(['Total Investors', investors.length]);
                                csvRows.push(['Confirmed Investors', confirmedInvestors.length]);
                                csvRows.push(['Pending Investors', pendingInvestors.length]);

                                const csvContent = csvRows.map(row =>
                                    row.map(cell => `"${cell}"`).join(',')
                                ).join('\n');

                                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${roundName.replace(/\s+/g, '_')}_investors_${new Date().toISOString().split('T')[0]}.csv`;
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