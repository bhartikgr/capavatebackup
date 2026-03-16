import React from 'react';

const CalculationDisplay = ({ calculatedValues, formData, seriesASafeData, seriesConvertibleData, selected }) => {
    const isSeriesSafe = selected?.includes("Series") && formData.instrumentType === "Safe";
    const isSeriesConvertible = selected?.includes("Series") && formData.instrumentType === "Convertible Note";

    if (isSeriesSafe) {
        return (
            <div className="calculation-display p-3 border rounded bg-light mb-4">
                <h6>Series A + SAFE Calculation Results:</h6>
                <div className="row">
                    <div className="col-md-4">
                        <strong>Share Price:</strong> ${seriesASafeData.seriesASharePrice || '0.0000'}
                    </div>
                    <div className="col-md-4">
                        <strong>Total New Shares:</strong> {seriesASafeData.totalNewShares?.toLocaleString() || '0'}
                    </div>
                    <div className="col-md-4">
                        <strong>Post-Money Valuation:</strong> ${seriesASafeData.postMoneyValuationEquity?.toLocaleString() || '0'}
                    </div>
                </div>
            </div>
        );
    }

    if (isSeriesConvertible) {
        return (
            <div className="calculation-display p-3 border rounded bg-light mb-4">
                <h6>Series A + Convertible Note Calculation Results:</h6>
                <div className="row">
                    <div className="col-md-4">
                        <strong>Share Price:</strong> ${seriesConvertibleData.seriesASharePrice || '0.0000'}
                    </div>
                    <div className="col-md-4">
                        <strong>Total New Shares:</strong> {seriesConvertibleData.totalNewSharesBeforeOptions?.toLocaleString() || '0'}
                    </div>
                    <div className="col-md-4">
                        <strong>Post-Money Valuation:</strong> ${seriesConvertibleData.postMoneyValuationEquity?.toLocaleString() || '0'}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="calculation-display p-3 border rounded bg-light mb-4">
            <h6>Calculation Results:</h6>
            <div className="row">
                <div className="col-md-3">
                    <strong>Share Price:</strong> ${calculatedValues.sharePrice || '0.0000'}
                </div>
                <div className="col-md-3">
                    <strong>New Shares:</strong> {calculatedValues.newSharesIssued?.toLocaleString() || '0'}
                </div>
                <div className="col-md-3">
                    <strong>Investor Ownership:</strong> {calculatedValues.investorOwnershipPercent || '0'}%
                </div>
                <div className="col-md-3">
                    <strong>Post-Money Valuation:</strong> ${calculatedValues.postMoneyValuation?.toLocaleString() || '0'}
                </div>
            </div>
        </div>
    );
};

export default CalculationDisplay;