import React from 'react';

const FileUploader = ({ label, fieldName, formData, handleInputChange, errors, setErrors, accept, multiple }) => {
    return (
        <div className="mb-4">
            <label className="form-label fw-semibold d-flex align-items-center">
                {label} <span style={{ color: "var(--primary)" }}>*</span>
            </label>

            <input
                type="file"
                multiple={multiple}
                accept={accept}
                onChange={(e) => {
                    handleInputChange(fieldName, Array.from(e.target.files));
                    if (errors[fieldName]) {
                        setErrors(prev => ({ ...prev, [fieldName]: "" }));
                    }
                }}
                className={`textarea_input ${errors[fieldName] ? "is-invalid" : ""}`}
            />

            {/* Show selected file names */}
            {formData[fieldName] && formData[fieldName].length > 0 && (
                <div className="mt-2">
                    <strong>Selected Files:</strong>
                    <ul className="small text-muted mt-1 mb-0">
                        {formData[fieldName].map((file, index) => (
                            <li key={index}>
                                <strong>{file.name}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {errors[fieldName] && (
                <div className="text-danger small mt-1">
                    <i className="bi bi-exclamation-circle me-1"></i>
                    {errors[fieldName]}
                </div>
            )}

            <div className="form-text">
                Supported formats: PDF, DOC, DOCX, TXT. Maximum file size: 10MB per file.
            </div>
        </div>
    );
};

export default FileUploader;