// components/WarrantDetails.jsx
import React from 'react';

const WarrantDetails = ({
    formData,
    handleInputChange,
    errors,
    setErrors
}) => {
    return (
        <div className="border-top pt-3 mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Warrant Details (Optional)</h6>
                <div className="form-check form-switch">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="hasWarrants_preferred"
                        checked={formData.hasWarrants_preferred || false}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            handleInputChange("hasWarrants_preferred", checked);
                            if (!checked) {
                                handleInputChange("warrant_coverage_percentage", "");
                                handleInputChange("warrant_exercise_type", "next_round_adjusted");
                                handleInputChange("warrant_adjustment_percent", "");
                                handleInputChange("warrant_adjustment_direction", "decrease");
                                handleInputChange("expirationDate_preferred", "");
                                handleInputChange("warrant_notes", "");
                            }
                        }}
                    />
                    <label className="form-check-label" htmlFor="hasWarrants_preferred">
                        Include Warrants with this investment
                    </label>
                </div>
            </div>

            {formData.hasWarrants_preferred && (
                <>
                    <div className="alert alert-info mb-4">
                        <i className="bi bi-info-circle me-2"></i>
                        <strong>About Warrants:</strong> Warrants will be exercised in the next priced equity round.
                        Exercise price and shares will be calculated automatically at that time.
                    </div>

                    {/* Warrant coverage percentage */}
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <label className="form-label">
                                Warrant Coverage Percentage (%)
                                <span className="text-danger ms-1">*</span>
                            </label>
                            <div className="input-group">
                                <input
                                    type="number"
                                    className={`form-control ${errors.warrant_coverage_percentage ? "is-invalid" : ""}`}
                                    value={formData.warrant_coverage_percentage || ""}
                                    onChange={(e) => {
                                        handleInputChange("warrant_coverage_percentage", e.target.value);
                                        if (errors.warrant_coverage_percentage) {
                                            setErrors(prev => ({ ...prev, warrant_coverage_percentage: "" }));
                                        }
                                    }}
                                    placeholder="e.g., 20"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                />
                                <span className="input-group-text">%</span>
                            </div>
                            {errors.warrant_coverage_percentage && (
                                <div className="text-danger small mt-1">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors.warrant_coverage_percentage}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Exercise type selection */}
                    <div className="row mb-4">
                        <div className="col-md-12">
                            <label className="form-label">
                                Warrant Exercise Price Method
                                <span className="text-danger ms-1">*</span>
                            </label>
                            <div className="border rounded p-3 bg-white">
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="warrant_exercise_type"
                                        id="exerciseTypeNextRound"
                                        value="next_round"
                                        checked={formData.warrant_exercise_type === "next_round"}
                                        onChange={(e) => {
                                            handleInputChange("warrant_exercise_type", e.target.value);
                                            handleInputChange("warrant_adjustment_percent", "");
                                            if (errors.warrant_exercise_type) {
                                                setErrors(prev => ({ ...prev, warrant_exercise_type: "" }));
                                            }
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="exerciseTypeNextRound">
                                        <strong>Next Priced Round Price</strong> (No Adjustment)
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="warrant_exercise_type"
                                        id="exerciseTypeAdjusted"
                                        value="next_round_adjusted"
                                        checked={formData.warrant_exercise_type === "next_round_adjusted" || !formData.warrant_exercise_type}
                                        onChange={(e) => {
                                            handleInputChange("warrant_exercise_type", e.target.value);
                                            if (errors.warrant_exercise_type) {
                                                setErrors(prev => ({ ...prev, warrant_exercise_type: "" }));
                                            }
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="exerciseTypeAdjusted">
                                        <strong>Next Priced Round Price ± Adjustment</strong> (Recommended)
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rest of warrant details... */}
                    {/* You can further break this down into more components if needed */}
                </>
            )}
        </div>
    );
};

export default WarrantDetails;