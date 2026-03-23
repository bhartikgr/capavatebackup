// components/DataRoomLockPopupAkn.jsx
import React, { useState, useEffect } from 'react';
import { CircleX, AlertCircle, CheckCircle, Lock, Brain, ShieldCheck } from 'lucide-react';

export default function DataRoomLockPopupAkn({
    show,
    onClose,
    onConfirm,
    companyName = "Your Company",
    isSubmitting = false
}) {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');

    // Reset state when popup opens
    useEffect(() => {
        if (show) {
            setIsChecked(false);
            setError('');
        }
    }, [show]);

    const handleConfirm = () => {
        if (!isChecked) {
            setError('Please confirm the acknowledgment to proceed');
            return;
        }
        setError('');
        onConfirm();
    };

    if (!show) return null;

    return (
        <>
            <div className="modal fade show" style={{
                display: 'block',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 1050
            }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content" style={{
                        borderRadius: '20px',
                        border: 'none',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        overflow: 'hidden'
                    }}>
                        {/* Header */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgb(26, 28, 46) 0%, rgb(219 74, 67) 100%)',
                            padding: '24px 32px',
                            borderBottom: '1px solid rgb(26, 28, 46)'
                        }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'rgba(204, 0, 0, 0.15)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Lock size={28} color="#CC0000" />
                                    </div>
                                    <div>
                                        <div style={{
                                            fontSize: '11px',
                                            fontWeight: '700',
                                            letterSpacing: '0.1em',
                                            textTransform: 'uppercase',
                                            color: '#CC0000',
                                            marginBottom: '4px'
                                        }}>
                                            Acknowledgement
                                        </div>
                                        <h4 style={{
                                            margin: 0,
                                            fontSize: '1.5rem',
                                            fontWeight: '700',
                                            color: '#fff',
                                            letterSpacing: '-0.5px'
                                        }}>
                                            Data Room Lock & AI Executive Summary
                                        </h4>
                                        <p style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            margin: '4px 0 0 0',
                                            fontSize: '0.85rem'
                                        }}>
                                            Signatory Action
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s',
                                        opacity: isSubmitting ? 0.5 : 1
                                    }}
                                >
                                    <CircleX size={20} color="#fff" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: '32px' }}>
                            {/* Trigger info */}


                            {/* Main content */}
                            <div style={{
                                border: '1px solid #e9ecef',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                marginBottom: '24px'
                            }}>
                                <div style={{
                                    background: '#f8f9fa',
                                    padding: '16px 24px',
                                    borderBottom: '1px solid #e9ecef',
                                    borderLeft: '4px solid #CC0000'
                                }}>
                                    <h5 style={{
                                        margin: 0,
                                        fontWeight: '700',
                                        fontSize: '1rem',
                                        color: '#212529'
                                    }}>
                                        Copy
                                        <span style={{
                                            marginLeft: '12px',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            backgroundColor: '#CC0000',
                                            color: '#fff'
                                        }}>
                                            Signatory Action
                                        </span>
                                    </h5>
                                </div>

                                <div style={{ padding: '24px' }}>
                                    {/* Action description */}
                                    <div style={{
                                        fontSize: '1rem',
                                        color: '#212529',
                                        marginBottom: '20px',
                                        lineHeight: '1.6'
                                    }}>
                                        You are about to lock the data room for <strong>{companyName}</strong> and generate an AI-assisted executive summary from its contents.
                                    </div>

                                    <p style={{
                                        fontWeight: '600',
                                        marginBottom: '12px',
                                        color: '#212529',
                                        fontSize: '0.95rem'
                                    }}>
                                        By proceeding, you confirm that:
                                    </p>

                                    {/* Points list */}
                                    <ul style={{
                                        paddingLeft: '20px',
                                        marginBottom: '24px'
                                    }}>
                                        <li style={{
                                            marginBottom: '12px',
                                            color: '#495057',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem'
                                        }}>
                                            You are authorised to lock this data room and to grant the Capavate platform access to its contents for the purpose of generating the executive summary.
                                        </li>
                                        <li style={{
                                            marginBottom: '12px',
                                            color: '#495057',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem'
                                        }}>
                                            All documents and materials contained in the data room are owned by or lawfully licensed to <strong>{companyName}</strong>, and their use for AI processing does not violate any third-party rights, confidentiality obligations, or applicable law.
                                        </li>
                                        <li style={{
                                            marginBottom: '12px',
                                            color: '#495057',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem'
                                        }}>
                                            The AI-generated executive summary is produced automatically and may not be accurate, complete, or up to date. It does not constitute financial, legal, or investment advice. You remain solely responsible for reviewing, verifying, and approving the summary before it is shared with any investor.
                                        </li>
                                        <li style={{
                                            marginBottom: '12px',
                                            color: '#495057',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem'
                                        }}>
                                            Capavate and BluePrint Catalyst Limited bear no liability for the accuracy, completeness, or consequences of the AI-generated output, including any investor decisions made in reliance thereon.
                                        </li>
                                    </ul>

                                    {/* Checkbox section */}
                                    <div style={{
                                        background: '#f8f9fa',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        border: error ? '1px solid #CC0000' : '1px solid #e9ecef',
                                        boxShadow: error ? '0 0 0 3px rgba(204, 0, 0, 0.1)' : 'none'
                                    }}>
                                        <div className="form-check" style={{ paddingLeft: '32px' }}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="dataRoomLockConfirm"
                                                checked={isChecked}
                                                onChange={(e) => {
                                                    setIsChecked(e.target.checked);
                                                    if (e.target.checked) setError('');
                                                }}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    marginLeft: '-32px',
                                                    cursor: 'pointer',
                                                    accentColor: '#CC0000'
                                                }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="dataRoomLockConfirm"
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    color: '#212529',
                                                    lineHeight: '1.5'
                                                }}
                                            >
                                                <strong>I confirm I am authorised to lock this data room and understand the AI summary must be reviewed before distribution. I accept all responsibility for its contents.</strong>
                                            </label>
                                        </div>
                                        {error && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginTop: '12px',
                                                color: '#CC0000',
                                                fontSize: '0.85rem'
                                            }}>
                                                <AlertCircle size={14} />
                                                <span>{error}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Footer buttons */}
                            <div style={{
                                display: 'flex',
                                gap: '16px',
                                justifyContent: 'flex-end'
                            }}>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    style={{
                                        padding: '10px 24px',
                                        borderRadius: '8px',
                                        border: '1px solid #dee2e6',
                                        background: '#fff',
                                        color: '#495057',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        opacity: isSubmitting ? 0.5 : 1
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirm}
                                    disabled={!isChecked || isSubmitting}
                                    style={{
                                        padding: '10px 28px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: isChecked && !isSubmitting ? 'linear-gradient(135deg, #CC0000 0%, #A00000 100%)' : '#ccc',
                                        color: '#fff',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: isChecked && !isSubmitting ? 'pointer' : 'not-allowed',
                                        opacity: isChecked && !isSubmitting ? 1 : 0.6,
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    {isSubmitting ? (
                                        'Processing...'
                                    ) : (
                                        <>
                                            <Lock size={16} />
                                            <Brain size={16} />
                                            Lock Data Room & Generate AI Summary
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal-backdrop fade show"
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 1040
                }}
            />
        </>
    );
}