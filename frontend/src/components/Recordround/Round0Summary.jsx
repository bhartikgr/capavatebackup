// components/Round0Summary.jsx
import React from 'react';

const Round0Summary = ({
    foundersData,
    formData,
    calculateTotalShares,
    calculateTotalValue,
    founderCount,
    calculateOwnershipPercentages
}) => {
    return (
        <div className="calculation-results p-3 bg-light rounded mb-4">
            <h6>Round 0 Calculations</h6>
            <div className="row">
                <div className="col-md-4">
                    <strong>Total Shares:</strong> {calculateTotalShares().toLocaleString()}
                </div>
                <div className="col-md-4">
                    <strong>Total Value:</strong> {formData.currency ? formData.currency.split(' ')[1] : '$'}{calculateTotalValue()}
                </div>
                <div className="col-md-4">
                    <strong>Founder Count:</strong> {founderCount}
                </div>
            </div>

            {calculateTotalShares() > 0 && (
                <div className="mt-3">
                    <strong>Ownership Breakdown:</strong>
                    <ul className="mb-0 mt-2">
                        {calculateOwnershipPercentages().map((item, index) => (
                            <li key={index}>
                                {item.founder}: {item.percentage}%
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Round0Summary;