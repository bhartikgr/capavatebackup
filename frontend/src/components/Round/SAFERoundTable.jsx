import React from 'react';

const SAFERoundTable = ({ capTableData, formatCurrency, formatPercentage, formatNumber, RoundCapChart }) => {
    console.log("SAFE Round Data:", capTableData);
    if (!capTableData || !capTableData.calculations) {
        return (
            <div className="alert alert-warning">
                <strong>No SAFE round data available</strong>
            </div>
        );
    }

    const calc = capTableData.calculations;
    const currency = capTableData.currency || "USD";

    // Safe data access with fallbacks
    const safeType = calc.safeType || "PRE_MONEY";
    const valuationCap = calc.valuationCap || 0;
    const discountRate = calc.discountRate || 0;
    const totalSafeInvestment = calc.totalSafeInvestment || 0;
    const investorCount = calc.investorCount || 0;
    const optionPoolPercent = calc.optionPoolPercent || 0;
    const roundZeroTotalShares = calc.roundZeroTotalShares || 0;

    // Get all shareholders
    const founders = capTableData.shareholders?.filter(sh => sh.type === "Founder") || [];
    const optionPool = capTableData.shareholders?.filter(sh => sh.type === "Options Pool") || [];
    const safeInvestors = capTableData.shareholders?.filter(sh => sh.type === "SAFE Investor") || [];

    const allShareholders = [...founders, ...optionPool, ...safeInvestors];

    // Calculate potential conversion data
    // Calculate potential conversion data - CORRECTED VERSION
    const calculatePotentialConversion = () => {
        // Use investmentSize since totalSafeInvestment is 0
        const effectiveInvestment = calc.investmentSize || 0;

        console.log("Calculation inputs:", {
            effectiveInvestment,
            valuationCap,
            roundZeroTotalShares,
            capTableDataTotalShares: capTableData.totalShares,
            safeType,
            discountRate
        });

        if (valuationCap <= 0 || capTableData.totalShares <= 0 || effectiveInvestment <= 0) {
            return {
                atValuationCap: 0,
                atDiscount: 0,
                conversionPrice: 0,
                foundersOwnership: 100,
                postConversionOwnership: 0
            };
        }

        // POST-MONEY SAFE CALCULATION
        if (safeType === "POST_MONEY") {
            // Step 1: Calculate ownership percentage
            const ownershipPercentage = effectiveInvestment / valuationCap;

            // Step 2: Calculate total shares post-conversion
            const totalSharesPostConversion = Math.round(capTableData.totalShares / (1 - ownershipPercentage));
            const safeShares = totalSharesPostConversion - capTableData.totalShares;

            // Step 3: Calculate conversion prices
            const conversionPriceAtCap = valuationCap / totalSharesPostConversion;
            const sharesAtValuationCap = Math.round(effectiveInvestment / conversionPriceAtCap);

            // Step 4: Apply discount
            const conversionPriceWithDiscount = conversionPriceAtCap * (1 - discountRate / 100);
            const sharesWithDiscount = Math.round(effectiveInvestment / conversionPriceWithDiscount);

            // Final conversion (better for investor - more shares)
            const finalShares = Math.max(safeShares, sharesWithDiscount);
            const conversionPrice = discountRate > 0 ? conversionPriceWithDiscount : conversionPriceAtCap;

            // Post-conversion ownership
            const actualTotalSharesPostConversion = capTableData.totalShares + finalShares;
            const foundersOwnership = actualTotalSharesPostConversion > 0 ?
                (capTableData.totalShares / actualTotalSharesPostConversion) * 100 : 0;
            const postConversionOwnership = actualTotalSharesPostConversion > 0 ?
                (finalShares / actualTotalSharesPostConversion) * 100 : 0;

            console.log("POST-MONEY Calculation results:", {
                ownershipPercentage,
                totalSharesPostConversion,
                safeShares,
                sharesAtValuationCap,
                sharesWithDiscount,
                finalShares,
                foundersOwnership,
                postConversionOwnership
            });

            return {
                atValuationCap: sharesAtValuationCap,
                atDiscount: sharesWithDiscount,
                conversionPriceAtCap: conversionPriceAtCap,
                conversionPriceWithDiscount: conversionPriceWithDiscount,
                finalShares: finalShares,
                conversionPrice: conversionPrice,
                foundersOwnership: foundersOwnership,
                postConversionOwnership: postConversionOwnership,
                totalSharesPostConversion: actualTotalSharesPostConversion
            };
        }
        // PRE-MONEY SAFE CALCULATION
        else {
            const conversionPriceAtCap = valuationCap / capTableData.totalShares;
            const sharesAtValuationCap = Math.round(effectiveInvestment / conversionPriceAtCap);

            const conversionPriceWithDiscount = conversionPriceAtCap * (1 - discountRate / 100);
            const sharesWithDiscount = Math.round(effectiveInvestment / conversionPriceWithDiscount);

            const finalShares = Math.max(sharesAtValuationCap, sharesWithDiscount);
            const conversionPrice = discountRate > 0 ? conversionPriceWithDiscount : conversionPriceAtCap;

            const totalSharesPostConversion = capTableData.totalShares + finalShares;
            const foundersOwnership = totalSharesPostConversion > 0 ?
                (capTableData.totalShares / totalSharesPostConversion) * 100 : 0;
            const postConversionOwnership = totalSharesPostConversion > 0 ?
                (finalShares / totalSharesPostConversion) * 100 : 0;

            return {
                atValuationCap: sharesAtValuationCap,
                atDiscount: sharesWithDiscount,
                conversionPriceAtCap: conversionPriceAtCap,
                conversionPriceWithDiscount: conversionPriceWithDiscount,
                finalShares: finalShares,
                conversionPrice: conversionPrice,
                foundersOwnership: foundersOwnership,
                postConversionOwnership: postConversionOwnership,
                totalSharesPostConversion: totalSharesPostConversion
            };
        }
    };

    const potentialConversion = calculatePotentialConversion();

    // Calculate current values based on valuation cap
    const calculateCurrentValues = () => {
        const sharePrice = valuationCap > 0 ? valuationCap / capTableData.totalShares : 0;

        return allShareholders.map(sh => ({
            ...sh,
            currentValue: sh.shares * sharePrice
        }));
    };

    const shareholdersWithValues = calculateCurrentValues();

    return (
        <div className="cap-table-section">
            <div className="card mb-4">
                <div className="card-header bg-info text-white">
                    <h4 className="mb-0">{capTableData.roundType || "SAFE Round"}</h4>
                    <small className="opacity-75">
                        {safeType === "PRE_MONEY" ? "Pre-Money" : "Post-Money"} SAFE Round - Convertible Instrument
                    </small>
                </div>
                <div className="card-body">
                    {/* SAFE Terms */}
                    <h5 className="mb-3">SAFE Terms</h5>
                    <div className="row mb-4">
                        <div className="col-md-3">
                            <div className="info-box p-3 border rounded bg-light">
                                <small className="text-muted">Total SAFE Investment</small>
                                <h5>{formatCurrency(totalSafeInvestment, currency)}</h5>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="info-box p-3 border rounded bg-light">
                                <small className="text-muted">Valuation Cap</small>
                                <h5>{formatCurrency(valuationCap, currency)}</h5>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="info-box p-3 border rounded bg-light">
                                <small className="text-muted">Discount Rate</small>
                                <h5>{formatPercentage(discountRate)}</h5>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="info-box p-3 border rounded bg-light">
                                <small className="text-muted">SAFE Type</small>
                                <h5>
                                    {safeType === "PRE_MONEY" ? "Pre-Money" :
                                        safeType === "POST_MONEY" ? "Post-Money" : safeType}
                                </h5>
                            </div>
                        </div>
                    </div>

                    {/* Additional Terms */}
                    <div className="row mb-4">
                        <div className="col-md-4">
                            <div className="info-box p-3 border rounded bg-light">
                                <small className="text-muted">Option Pool</small>
                                <h5>{formatPercentage(optionPoolPercent)}</h5>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="info-box p-3 border rounded bg-light">
                                <small className="text-muted">Total Shares</small>
                                <h5>{formatNumber(capTableData.totalShares)}</h5>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="info-box p-3 border rounded bg-light">
                                <small className="text-muted">Current Share Price</small>
                                <h5>
                                    {valuationCap > 0 && capTableData.totalShares > 0
                                        ? formatCurrency(valuationCap / capTableData.totalShares, currency)
                                        : formatCurrency(0, currency)
                                    }
                                </h5>
                            </div>
                        </div>
                    </div>

                    {/* Current Ownership Chart */}
                    {capTableData.chartData && (
                        <div className="mb-4">
                            <RoundCapChart chartData={capTableData.chartData} />
                        </div>
                    )}

                    {/* Current Cap Table with VALUES */}
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">Current Cap Table (Pre-Conversion)</h5>
                                    <small>Based on {formatCurrency(valuationCap, currency)} {safeType.toLowerCase()} valuation cap</small>
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
                                                    <th className="text-center">Current Value</th>
                                                    <th className="text-center">Investment</th>
                                                    <th className="text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {shareholdersWithValues.length > 0 ? (
                                                    <>
                                                        {/* Founders Section */}
                                                        {shareholdersWithValues
                                                            .filter(sh => sh.type === "Founder")
                                                            .map((sh, idx) => (
                                                                <tr key={`founder-${idx}`}>
                                                                    <td>
                                                                        <div>
                                                                            <strong className="text-primary">{sh.name}</strong>
                                                                            {sh.fullName && sh.fullName !== sh.name && (
                                                                                <div className="small text-muted">{sh.fullName}</div>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="badge bg-success">Founder</span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <strong>{formatNumber(sh.shares)}</strong>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="badge bg-success">
                                                                            {formatPercentage(sh.ownership)}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <strong className="text-success">
                                                                            {formatCurrency(sh.currentValue, currency)}
                                                                        </strong>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="text-muted">-</span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="badge bg-success">Active</span>
                                                                    </td>
                                                                </tr>
                                                            ))}

                                                        {/* Option Pool Section */}
                                                        {shareholdersWithValues
                                                            .filter(sh => sh.type === "Options Pool")
                                                            .map((sh, idx) => (
                                                                <tr key={`option-${idx}`}>
                                                                    <td>
                                                                        <div>
                                                                            <strong className="text-warning">{sh.name}</strong>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="badge bg-warning text-dark">Option Pool</span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <strong>{formatNumber(sh.shares)}</strong>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="badge bg-warning text-dark">
                                                                            {formatPercentage(sh.ownership)}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <strong className="text-warning">
                                                                            {formatCurrency(sh.currentValue, currency)}
                                                                        </strong>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="text-muted">-</span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="badge bg-secondary">Reserved</span>
                                                                    </td>
                                                                </tr>
                                                            ))}

                                                        {/* SAFE Investors Section */}
                                                        {shareholdersWithValues
                                                            .filter(sh => sh.type === "SAFE Investor")
                                                            .map((sh, idx) => (
                                                                <tr key={`safe-${idx}`} className="bg-light">
                                                                    <td>
                                                                        <div>
                                                                            <strong className="text-info">{sh.name}</strong>
                                                                            {sh.fullName && sh.fullName !== sh.name && (
                                                                                <div className="small text-muted">{sh.fullName}</div>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="badge bg-info">SAFE Investor</span>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <strong className="text-muted">0</strong>
                                                                        <div className="small text-info">
                                                                            (Potential: {formatNumber(sh.safeDetails?.potentialShares || 0)})
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="badge bg-secondary">0%</span>
                                                                        <div className="small text-info">
                                                                            (Future: ~{formatPercentage(sh.safeDetails?.postConversionOwnership || 0)})
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <strong className="text-muted">-</strong>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <strong className="text-success">
                                                                            {formatCurrency(sh.investmentAmount, currency)}
                                                                        </strong>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <span className="badge bg-warning text-dark">Pending Conversion</span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                    </>
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7" className="text-center text-danger py-3">
                                                            <strong>⚠️ No shareholders data available</strong>
                                                        </td>
                                                    </tr>
                                                )}

                                                {/* TOTAL ROW */}
                                                <tr className="table-secondary fw-bold">
                                                    <td colSpan="2">TOTAL</td>
                                                    <td className="text-center">{formatNumber(capTableData.totalShares || 0)}</td>
                                                    <td className="text-center">{formatPercentage(100)}</td>
                                                    <td className="text-center">{formatCurrency(valuationCap, currency)}</td>
                                                    <td className="text-center">{formatCurrency(totalSafeInvestment, currency)}</td>
                                                    <td className="text-center">-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Summary Stats */}
                                    <div className="row mt-3">
                                        <div className="col-md-3">
                                            <div className="alert alert-success mb-0">
                                                <strong>Founders Ownership:</strong> {formatPercentage(
                                                    founders.reduce((sum, sh) => sum + (sh.ownership || 0), 0)
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="alert alert-warning mb-0">
                                                <strong>Option Pool:</strong> {formatPercentage(
                                                    optionPool.reduce((sum, sh) => sum + (sh.ownership || 0), 0)
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="alert alert-info mb-0">
                                                <strong>SAFE Investment:</strong> {formatCurrency(totalSafeInvestment, currency)}
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="alert alert-primary mb-0">
                                                <strong>Investors:</strong> {investorCount}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conversion Details */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header bg-warning text-dark">
                                    <h5 className="mb-0">SAFE Conversion & Dilution Analysis</h5>
                                </div>
                                <div className="card-body">
                                    <div className="alert alert-info">
                                        <h6>💡 How {safeType === "POST_MONEY" ? "POST-MONEY" : "PRE-MONEY"} SAFE Conversion Works</h6>
                                        <p className="mb-2">
                                            SAFE investors will convert to equity at the next priced round at the <strong>BETTER</strong> of:
                                        </p>
                                        <ul className="mb-0">
                                            <li><strong>Valuation Cap:</strong> {formatCurrency(valuationCap, currency)} {safeType.toLowerCase()} valuation</li>
                                            <li><strong>Discount Price:</strong> {discountRate > 0 ? `${discountRate}% discount` : 'No discount'} to next round price</li>
                                        </ul>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="card h-100">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">Conversion Scenarios</h6>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row text-center mb-3">
                                                        <div className="col-6">
                                                            <small className="text-muted">At Valuation Cap</small>
                                                            <h6 className="text-primary">{formatNumber(potentialConversion.atValuationCap)} shares</h6>
                                                            <small className="text-muted">
                                                                @ {formatCurrency(potentialConversion.conversionPriceAtCap, currency)}
                                                            </small>
                                                        </div>
                                                        <div className="col-6">
                                                            <small className="text-muted">With {discountRate}% Discount</small>
                                                            <h6 className="text-success">{formatNumber(potentialConversion.atDiscount)} shares</h6>
                                                            <small className="text-muted">
                                                                @ {formatCurrency(potentialConversion.conversionPriceWithDiscount, currency)}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="text-center border-top pt-3">
                                                        <small className="text-muted d-block">Expected Conversion (Better for Investor)</small>
                                                        <h4 className="text-warning mb-1">
                                                            {formatNumber(potentialConversion.finalShares)} shares
                                                        </h4>
                                                        <small className="text-muted">
                                                            @ {formatCurrency(potentialConversion.conversionPrice, currency)} per share
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card h-100">
                                                <div className="card-header bg-light">
                                                    <h6 className="mb-0">Dilution Impact</h6>
                                                </div>
                                                <div className="card-body">
                                                    <div className="row text-center mb-3">
                                                        <div className="col-6">
                                                            <small className="text-muted">Current Founders</small>
                                                            <h6 className="text-success">{formatPercentage(100)}</h6>
                                                            <small className="text-muted">
                                                                {formatNumber(capTableData.totalShares)} shares
                                                            </small>
                                                        </div>
                                                        <div className="col-6">
                                                            <small className="text-muted">After Conversion</small>
                                                            <h6 className="text-info">{formatPercentage(potentialConversion.foundersOwnership)}</h6>
                                                            <small className="text-muted">
                                                                {formatNumber(capTableData.totalShares)} shares
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="alert alert-warning mb-0">
                                                        <small>
                                                            <strong>Dilution:</strong> Founders will be diluted by {formatPercentage(100 - potentialConversion.foundersOwnership)}
                                                            {optionPoolPercent > 0 && ` (including ${formatPercentage(optionPoolPercent)} option pool)`}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional SAFE Information */}
                                    <div className="row mt-3">
                                        <div className="col-md-12">
                                            <div className="alert alert-secondary">
                                                <h6>📋 Investment Summary</h6>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <strong>Total Committed:</strong><br />
                                                        {formatCurrency(totalSafeInvestment, currency)}
                                                    </div>
                                                    <div className="col-md-3">
                                                        <strong>Number of Investors:</strong><br />
                                                        {investorCount}
                                                    </div>
                                                    <div className="col-md-3">
                                                        <strong>Potential Shares:</strong><br />
                                                        {formatNumber(potentialConversion.finalShares)}
                                                    </div>
                                                    <div className="col-md-3">
                                                        <strong>Future Ownership:</strong><br />
                                                        {formatPercentage(potentialConversion.postConversionOwnership)}
                                                    </div>
                                                </div>
                                                {calc.safeNote && (
                                                    <div className="mt-2">
                                                        <strong>Note:</strong> {calc.safeNote}
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
            </div>
        </div>
    );
};

export default SAFERoundTable;