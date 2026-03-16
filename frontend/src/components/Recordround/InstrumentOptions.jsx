import React from 'react';

const InstrumentOptions = ({ instrumentOptions, formData, handleInputChange, errors, setErrors }) => {
    return (
        <div className="mb-4">
            <label className="form-label fw-semibold">
                Select Investment Instrument Type <span className="text-danger fs-5">*</span>
            </label>
            <div className="row mt-3">
                {instrumentOptions.map((opt) => (
                    <div key={opt.value} className="col-md-6 mb-3">
                        <div
                            className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData.instrumentType === opt.value ? "bg-light" : "border-gray-300"
                                } ${errors.instrumentType ? "border-danger" : ""}`}
                            onClick={() => {
                                handleInputChange("instrumentType", opt.value);
                                if (opt.value !== "Preferred Equity") {
                                    handleInputChange("liquidation", []);
                                }
                                if (opt.value !== "OTHER") handleInputChange("customInstrument", "");
                                if (errors.instrumentType || errors.customInstrument) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        instrumentType: "",
                                        customInstrument: "",
                                    }));
                                }
                            }}
                        >
                            <div className="form-check">
                                <input
                                    type="radio"
                                    name="instrumentType"
                                    value={opt.value}
                                    checked={formData.instrumentType === opt.value}
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
    );
};

export default InstrumentOptions;