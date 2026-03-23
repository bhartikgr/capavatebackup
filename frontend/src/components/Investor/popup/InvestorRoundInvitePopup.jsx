// components/InvestorRoundInvitePopup.jsx
import React, { useState, useEffect } from 'react';
import { CircleX, AlertCircle, CheckCircle, Mail, Users, ShieldCheck } from 'lucide-react';

export default function InvestorRoundInvitePopup({
    show,
    onClose,
    onConfirm,
    companyName = "Your Company",
    recipientCount = 0,
    isSubmitting = false
}) {
    const roundName = "";
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        if (show) {
            setIsChecked(false);
            setError('');
        }
    }, [show]);
    const handleConfirm = () => {
        // if (!isChecked) {
        //     setError('Please confirm the acknowledgment to proceed');
        //     return;
        // }
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
                                        <Mail size={28} color="#CC0000" />
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
                                            Acknowledgement 3
                                        </div>
                                        <h4 style={{
                                            margin: 0,
                                            fontSize: '1.5rem',
                                            fontWeight: '700',
                                            color: '#fff',
                                            letterSpacing: '-0.5px'
                                        }}>
                                            Investor CRM Invitation
                                        </h4>
                                        <p style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            margin: '4px 0 0 0',
                                            fontSize: '0.85rem'
                                        }}>
                                            Send Round Invitation
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
                                    {/* Invitation Summary Card */}
                                    <div style={{
                                        background: '#f8f9fa',
                                        borderRadius: '12px',
                                        padding: '16px 20px',
                                        marginBottom: '24px',
                                        border: '1px solid #e9ecef'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                            <Users size={20} color="#CC0000" />
                                            <strong style={{ fontSize: '1rem', color: '#212529' }}>Invitation Details</strong>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '8px' }}>
                                            <div>
                                                <div style={{ fontSize: '11px', color: '#6c757d' }}>Recipients</div>
                                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#212529' }}>
                                                    {recipientCount} {recipientCount === 1 ? 'Investor' : 'Investors'}
                                                </div>
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
                                        You are about to send a <strong>round invitation</strong> to <strong>{recipientCount} investor{recipientCount !== 1 ? 's' : ''}</strong> via the Capavate CRM on behalf of <strong>{companyName}</strong>.
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
                                            You have a pre-existing relationship with, or a lawful basis for contacting, each recipient under applicable law.
                                        </li>
                                        <li style={{
                                            marginBottom: '12px',
                                            color: '#495057',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem'
                                        }}>
                                            The invitation does not constitute a public solicitation or general advertisement of securities in any jurisdiction.
                                        </li>
                                        <li style={{
                                            marginBottom: '12px',
                                            color: '#495057',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem'
                                        }}>
                                            You accept full responsibility for the content of this invitation and its compliance with applicable securities, anti-spam, and data protection laws in the recipient's jurisdiction.
                                        </li>
                                        <li style={{
                                            marginBottom: '12px',
                                            color: '#495057',
                                            lineHeight: '1.6',
                                            fontSize: '0.9rem'
                                        }}>
                                            Capavate is acting solely as a communication channel and bears no liability whatsoever for the content of this invitation, the suitability of any recipient, or any regulatory consequences arising from this outreach.
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
                                                id="crmInviteConfirm"
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
                                                htmlFor="crmInviteConfirm"
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    color: '#212529',
                                                    lineHeight: '1.5'
                                                }}
                                            >
                                                <strong>I confirm I have a lawful basis to contact each recipient and accept full responsibility for this invitation.</strong>
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
                                            <CheckCircle size={18} />
                                            Send Invitation{recipientCount !== 1 ? 's' : ''}
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