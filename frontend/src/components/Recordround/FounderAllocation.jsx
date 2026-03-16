// components/FounderAllocation.jsx
import React from 'react';
import { NumericFormat } from 'react-number-format';

const FounderAllocation = ({
    foundersData,
    founderCount,
    updateFounderData,
    removeFounder,
    addFounder,
    errors
}) => {
    return (
        <div className="mb-4">
            <label className="form-label fw-semibold">
                Founder Share Allocation <span className="text-danger fs-5">*</span>
                {errors.founders && (
                    <div className="text-danger small mt-1">
                        <i className="bi bi-exclamation-circle me-1"></i>
                        {errors.founders}
                    </div>
                )}
            </label>

            {foundersData.map((founder, index) => (
                <div key={index} className="founder-allocation mb-4 p-3 border rounded">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Founder {index + 1}</h6>
                        {founderCount > 1 && (
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => removeFounder(index)}
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label className="form-label">First Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className={`form-control ${errors[`founder_${index}_firstName`] ? 'is-invalid' : ''}`}
                                placeholder="First Name"
                                value={founder.firstName}
                                onChange={(e) => updateFounderData(index, 'firstName', e.target.value)}
                            />
                            {errors[`founder_${index}_firstName`] && (
                                <div className="text-danger small mt-1">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors[`founder_${index}_firstName`]}
                                </div>
                            )}
                        </div>

                        <div className="col-md-3 mb-3">
                            <label className="form-label">Last Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className={`form-control ${errors[`founder_${index}_lastName`] ? 'is-invalid' : ''}`}
                                placeholder="Last Name"
                                value={founder.lastName}
                                onChange={(e) => updateFounderData(index, 'lastName', e.target.value)}
                            />
                            {errors[`founder_${index}_lastName`] && (
                                <div className="text-danger small mt-1">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors[`founder_${index}_lastName`]}
                                </div>
                            )}
                        </div>

                        <div className="col-md-3 mb-3">
                            <label className="form-label">Email <span className="text-danger">*</span></label>
                            <input
                                type="email"
                                className={`form-control ${errors[`founder_${index}_email`] ? 'is-invalid' : ''}`}
                                placeholder="Email"
                                value={founder.email}
                                onChange={(e) => updateFounderData(index, 'email', e.target.value)}
                            />
                            {errors[`founder_${index}_email`] && (
                                <div className="text-danger small mt-1">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors[`founder_${index}_email`]}
                                </div>
                            )}
                        </div>

                        <div className="col-md-3 mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Phone"
                                value={founder.phone}
                                onChange={(e) => updateFounderData(index, 'phone', e.target.value)}
                            />
                        </div>

                        <div className="col-md-3 mb-3">
                            <label className="form-label">Shares Allocated <span className="text-danger">*</span></label>
                            <NumericFormat
                                className={`form-control ${errors[`founder_${index}_shares`] ? 'is-invalid' : ''}`}
                                placeholder="e.g., 500"
                                value={founder.shares || ''}
                                onValueChange={(values) => updateFounderData(index, 'shares', values.value)}
                                thousandSeparator={true}
                                allowNegative={false}
                                decimalScale={2}
                                fixedDecimalScale={true}
                            />
                            {errors[`founder_${index}_shares`] && (
                                <div className="text-danger small mt-1">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors[`founder_${index}_shares`]}
                                </div>
                            )}
                        </div>

                        <div className="col-md-3 mb-3">
                            <label className="form-label">Share Type</label>
                            <select
                                className="form-control"
                                value={founder.shareType}
                                onChange={(e) => updateFounderData(index, 'shareType', e.target.value)}
                            >
                                <option value="common">Common Shares</option>
                                <option value="preferred">Preferred Shares</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {founder.shareType === 'other' && (
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Specify Share Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter custom share type"
                                    value={founder.customShareType || ''}
                                    onChange={(e) => updateFounderData(index, 'customShareType', e.target.value)}
                                />
                            </div>
                        )}

                        <div className="col-md-3 mb-3">
                            <label className="form-label">Share Class</label>
                            <select
                                className="form-control"
                                value={founder.shareClass}
                                onChange={(e) => updateFounderData(index, 'shareClass', e.target.value)}
                            >
                                <option value="Class A">Class A</option>
                                <option value="Class B">Class B</option>
                                <option value="Class C">Class C</option>
                            </select>
                        </div>

                        {founder.shareClass === 'other' && (
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Specify Share Class</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter custom share class"
                                    value={founder.customShareClass || ''}
                                    onChange={(e) => updateFounderData(index, 'customShareClass', e.target.value)}
                                />
                            </div>
                        )}

                        <div className="col-md-3 mb-3">
                            <label className="form-label">Voting Rights</label>
                            <select
                                className="form-control"
                                value={founder.voting}
                                onChange={(e) => updateFounderData(index, 'voting', e.target.value)}
                            >
                                <option value="voting">Voting</option>
                                <option value="non-voting">Non-Voting</option>
                            </select>
                        </div>
                    </div>
                </div>
            ))}

            <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={addFounder}
            >
                + Add Another Founder
            </button>
        </div>
    );
};

export default FounderAllocation;