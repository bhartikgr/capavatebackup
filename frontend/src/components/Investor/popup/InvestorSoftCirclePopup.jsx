// components/InvestorSoftCirclePopup.jsx
import React, { useState } from 'react';
import { CircleX, AlertCircle, CheckCircle, DollarSign, ShieldCheck } from 'lucide-react';

export default function InvestorSoftCirclePopup({
    show,
    onClose,
    onConfirm,
    companyName = "Your Company",
    amount = 0,
    currency = "USD",
    roundName = "",
    isSubmitting = false
}) {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');

    const handleConfirm = () => {
        if (!isChecked) {
            setError('Please confirm the acknowledgment to proceed');
            return;
        }
        setError('');
        onConfirm();
    };

    if (!show) return null;

    // Format amount
    const formattedAmount = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);

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
                                        <DollarSign size={28} color="#CC0000" />
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
                                            Investor Soft Circle
                                        </h4>
                                        <p style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            margin: '4px 0 0 0',
                                            fontSize: '0.85rem'
                                        }}>
                                            Stage A — Investor Submits Soft Circle
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
                                        Stage A — Investor Submits Soft Circle
                                        <span style={{
                                            marginLeft: '12px',
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            fontSize: '11px',
                                            fontWeight: '600',
                                            backgroundColor: '#1a2c3e',
                                            color: '#fff'
                                        }}>
                                            Investor
                                        </span>
                                    </h5>
                                </div>

                                <div style={{ padding: '24px' }}>
                                    {/* Investment Summary Card */}
                                    <div style={{
                                        background: '#f8f9fa',
                                        borderRadius: '12px',
                                        padding: '16px 20px',
                                        marginBottom: '24px',
                                        border: '1px solid #e9ecef'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                            <DollarSign size={20} color="#CC0000" />
                                            <strong style={{ fontSize: '1rem', color: '#212529' }}>Soft Circle Details</strong>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '8px' }}>
                                            <div>
                                                <div style={{ fontSize: '11px', color: '#6c757d' }}>Amount</div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#CC0000' }}>{currency} {formattedAmount}</div>
                                            </div>
                                            {roundName && (
                                                <div>
                                                    <div style={{ fontSize: '11px', color: '#6c757d' }}>Round</div>
                                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#212529' }}>{roundName}</div>
                                                </div>
                                            )}
                                            <div>
                                                <div style={{ fontSize: '11px', color: '#6c757d' }}>Company</div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#212529' }}>{companyName}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action description */}
                                    <div style={{
                                        fontSize: '1rem',
                                        color: '#212529',
                                        marginBottom: '20px',
                                        lineHeight: '1.6'
                                    }}>
                                        You are indicating an investment interest of <strong>{currency} {formattedAmount}</strong> in <strong>{companyName}</strong> (<strong>Soft Circle</strong>).
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
                                            This is a <strong>non-binding indication of interest only</strong>. It does not constitute a legally binding commitment to invest, an acceptance of any offer, or the execution of any investment agreement.
                                        </li>
                                        <li style={{
                                            marginBottom: '12px',
                                            color: '#495057',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem'
                                        }}>
                                            No funds are being transferred through the Capavate platform. All investment transactions are conducted directly between you and <strong>{companyName}</strong> through independent legal documentation and banking channels.
                                        </li>
                                        <li style={{
                                            marginBottom: '12px',
                                            color: '#495057',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem'
                                        }}>
                                            Your investment will not be reflected on the cap table until it is formally confirmed by a Signatory of <strong>{companyName}</strong> following verified receipt of funds.
                                        </li>
                                        <li style={{
                                            marginBottom: '12px',
                                            color: '#495057',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem'
                                        }}>
                                            You have independently verified your eligibility to make this investment under applicable laws and regulations in your jurisdiction, including accredited investor requirements where applicable.
                                        </li>
                                        <li style={{
                                            marginBottom: '12px',
                                            color: '#495057',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem'
                                        }}>
                                            Capavate and BluePrint Catalyst Limited do not verify, validate, or take any responsibility for this indication, the underlying investment, or any transaction between you and the company.
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
                                                id="softCircleConfirm"
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
                                                htmlFor="softCircleConfirm"
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    color: '#212529',
                                                    lineHeight: '1.5'
                                                }}
                                            >
                                                <strong>I understand this is a non-binding soft circle only. No funds are transferred through Capavate. I accept sole responsibility for my investment decision.</strong>
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
                                        background: isChecked && !isSubmitting ? 'linear-gradient(135deg, #1a2c3e 0%, #0f1a24 100%)' : '#ccc',
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
                                            <CheckCircle size={18} />
                                            Submit Interest
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