import React from 'react';

const LiquidationPreferences = ({ liquidationOptions, formData, handleInputChange, errors, setErrors, instrumentType }) => {
    if (instrumentType !== "Preferred Equity") {
        return null;
    }

    return (
        <div className="mb-4">
            <label className="form-label fw-semibold">
                Liquidation Preference Details
            </label>
            <textarea
                placeholder="Describe the liquidation preference terms..."
                className="textarea_input"
                rows="4"
                value={formData.liquidationpreferences}
                onChange={(e) => handleInputChange("liquidationpreferences", e.target.value)}
            />

            <div className="row mt-3">
                {/* Multiple Preferences */}
                <div className="col-md-6">
                    <div className="liquidation-group mb-4">
                        <h6 className="fw-semibold mb-3 border-bottom pb-2">Preference Multiple</h6>
                        {liquidationOptions.multiplePreferences.map((opt) => (
                            <div key={opt.value} className="col-12 mb-3">
                                <div
                                    className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData?.liquidation?.includes(opt.value)
                                        ? "bg-light border-primary"
                                        : "border-gray-300"
                                        }`}
                                    onClick={() => {
                                        // Handle selection logic
                                    }}
                                >
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            name="multiplePreference"
                                            value={opt.value}
                                            checked={formData?.liquidation?.includes(opt.value) || false}
                                            onChange={() => { }}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label fw-medium">
                                            {opt.label}
                                        </label>
                                    </div>
                                    <p className="text-muted small mb-0 mt-2">
                                        {opt.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Participation Rights */}
                <div className="col-md-6">
                    <div className="liquidation-group mb-4">
                        <h6 className="fw-semibold mb-3 border-bottom pb-2">Participation Rights</h6>
                        {liquidationOptions.participationRights.map((opt) => (
                            <div key={opt.value} className="col-12 mb-3">
                                <div
                                    className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData?.liquidation?.includes(opt.value)
                                        ? "bg-light border-primary"
                                        : "border-gray-300"
                                        }`}
                                    onClick={() => {
                                        // Handle selection logic
                                    }}
                                >
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name="participationRights"
                                            value={opt.value}
                                            checked={formData?.liquidation?.includes(opt.value) || false}
                                            onChange={() => { }}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label fw-medium">
                                            {opt.label}
                                        </label>
                                    </div>
                                    <p className="text-muted small mb-0 mt-2">
                                        {opt.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiquidationPreferences;