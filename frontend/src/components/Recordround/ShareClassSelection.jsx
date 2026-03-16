import React from 'react';

const ShareClassSelection = ({ selected, setSelected, formData, handleInputChange, errors }) => {
    return (
        <div className="mb-4">
            <label className="form-label fw-semibold">
                Funding Rounds <span className="text-danger fs-5">*</span>
                {errors.shareClassType && (
                    <div className="text-danger small mt-1 is-invalid">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {errors.shareClassType}
                    </div>
                )}
            </label>

            <select
                className={`form-control ${errors.shareClassType ? "is-invalid" : ""}`}
                value={selected}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value && value !== "default") {
                        setSelected(value);
                        handleInputChange(
                            "shareClassType",
                            value === "OTHER" ? formData.shareclassother : value
                        );
                    }
                }}
            >
                <option value="default" disabled>-- Select Funding Round --</option>
                <optgroup label="Seed Rounds">
                    <option value="Pre-Seed">Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Post-Seed">Post-Seed</option>
                </optgroup>
                <optgroup label="Series Rounds">
                    <option value="Series A">Series A</option>
                    <option value="Series A Extension">Series A Extension</option>
                    <option value="Series B">Series B</option>
                    <option value="Series B Extension">Series B Extension</option>
                    <option value="Series C">Series C</option>
                    <option value="Series C Extension">Series C Extension</option>
                    <option value="Series D">Series D</option>
                    <option value="Series D Extension">Series D Extension</option>
                </optgroup>
                <optgroup label="Other Rounds">
                    <option value="Bridge Round">Bridge Round</option>
                    <option value="Advisor Shares">Advisor Shares</option>
                    <option value="OTHER">OTHER</option>
                </optgroup>
            </select>

            {selected === "OTHER" && (
                <div className="mt-3">
                    <label className="form-label fw-semibold">
                        Custom Share Class Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter custom share class name"
                        value={formData.shareclassother}
                        onChange={(e) => handleInputChange("shareclassother", e.target.value)}
                        className={`form-control ${errors.shareclassother ? "is-invalid" : ""}`}
                        maxLength={30}
                    />
                    <div className="form-text">
                        {formData.shareclassother.length}/30 characters
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShareClassSelection;