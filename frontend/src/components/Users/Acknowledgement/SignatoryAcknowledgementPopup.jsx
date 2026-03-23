// components/SignatoryAcknowledgementPopup.js
import React, { useState } from 'react';
import { CircleX, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';

export default function SignatoryAcknowledgementPopup({
    show,
    onClose,
    onAccept,
    companyName = "Your Company"
}) {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');

    const handleAccept = () => {
        if (!isChecked) {
            setError('Please confirm that you are authorised to act as Signatory');
            return;
        }
        setError('');
        onAccept();
    };

    if (!show) return null;

    return (
        <>
            <div className="modal fade show" style={{
                display: 'block',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)'
            }}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content" style={{
                        borderRadius: '20px',
                        border: 'none',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        overflow: 'hidden'
                    }}>
                        {/* Header with gradient background using #FF3E41 */}
                        <div style={{
                            background: 'linear-gradient(135deg, #FF3E41 0%, #FF3E41 100%)',
                            padding: '24px 32px',
                            borderBottom: '1px solid rgba(255, 62, 65, 0.25)'
                        }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'rgba(255, 62, 65, 0.25)', // 25% opacity
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <ShieldCheck size={28} color="#FF3E41" />
                                    </div>
                                    <div>
                                        <h4 style={{
                                            margin: 0,
                                            fontSize: '1.75rem',
                                            fontWeight: '700',
                                            color: '#fff',
                                            letterSpacing: '-0.5px'
                                        }}>
                                            ACKNOWLEDGEMENT
                                        </h4>
                                        <p style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            margin: '4px 0 0 0',
                                            fontSize: '0.95rem'
                                        }}>
                                            Signatory Designation
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                                    onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                                >
                                    <CircleX size={20} color="#fff" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: '32px' }}>
                            {/* Trigger info card with #FF3E41 accent */}
                            <div style={{
                                background: '#f8f9fa',
                                borderRadius: '12px',
                                padding: '16px 20px',
                                marginBottom: '24px',
                                border: '1px solid #e9ecef',
                                borderLeft: '4px solid #FF3E41',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px'
                            }}>
                                <AlertCircle size={20} color="#FF3E41" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <p style={{
                                    margin: 0,
                                    color: '#495057',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6'
                                }}>
                                    <strong>Trigger:</strong> During company setup when the Account Administrator assigns a user the Signatory role.
                                    Presented once per Signatory designated. Must be completed by the user being assigned the role before it takes effect.
                                </p>
                            </div>

                            {/* Main content card */}
                            <div style={{
                                border: '1px solid #e9ecef',
                                borderRadius: '16px',
                                overflow: 'hidden'
                            }}>
                                {/* Copy Signatory header with #FF3E41 accent */}
                                <div style={{
                                    background: '#f8f9fa',
                                    padding: '16px 24px',
                                    borderBottom: '1px solid #e9ecef',
                                    borderLeft: '4px solid #FF3E41'
                                }}>
                                    <h5 style={{
                                        margin: 0,
                                        fontWeight: '700',
                                        fontSize: '1.1rem',
                                        color: '#212529',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        COPY SIGNATORY
                                    </h5>
                                </div>

                                {/* Agreement content */}
                                <div style={{ padding: '24px' }}>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#212529',
                                        marginBottom: '20px',
                                        lineHeight: '1.6'
                                    }}>
                                        You are being designated as a <strong>Signatory for <span style={{ color: '#FF3E41' }}>{companyName}</span></strong> on the
                                        Capavate platform, operated by BluePrint Catalyst Limited.
                                    </p>

                                    <p style={{
                                        fontWeight: '600',
                                        marginBottom: '16px',
                                        color: '#212529'
                                    }}>
                                        As a Signatory, you acknowledge and agree that:
                                    </p>

                                    <ul style={{
                                        paddingLeft: '20px',
                                        marginBottom: '24px'
                                    }}>
                                        {[
                                            `You are authorised by <strong>${companyName}</strong> to act in this capacity, including managing fundraising rounds, inviting investors via the CRM, confirming investments, and updating the cap table.`,
                                            `All actions you take as a Signatory are legally binding on <strong>${companyName}</strong> and are your sole responsibility.`,
                                            "You will not use this role to transmit information that is false, misleading, defamatory, or in violation of applicable securities law.",
                                            "Capavate and BluePrint Catalyst Limited act solely as a technology platform and bear no liability whatsoever for your actions or decisions as Signatory, including any errors, omissions, or disputes arising therefrom.",
                                            "This designation is governed by the <strong>Capavate Platform Terms</strong> and the laws of Hong Kong SAR."
                                        ].map((text, index) => (
                                            <li key={index} style={{
                                                marginBottom: '12px',
                                                color: '#495057',
                                                lineHeight: '1.6',
                                                fontSize: '0.95rem',
                                                position: 'relative',
                                                paddingLeft: '8px'
                                            }}>
                                                <span style={{
                                                    color: '#FF3E41',
                                                    fontWeight: 'bold',
                                                    marginRight: '8px'
                                                }}>•</span>
                                                <span dangerouslySetInnerHTML={{ __html: text }} />
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Checkbox section with #FF3E41 */}
                                    <div style={{
                                        background: '#f8f9fa',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        border: error ? '1px solid #FF3E41' : '1px solid #e9ecef',
                                        boxShadow: error ? '0 0 0 3px rgba(255, 62, 65, 0.1)' : 'none'
                                    }}>
                                        <div className="form-check" style={{ paddingLeft: '32px' }}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="signatoryConfirm"
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
                                                    accentColor: '#FF3E41'
                                                }}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="signatoryConfirm"
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: '0.95rem',
                                                    color: '#212529',
                                                    lineHeight: '1.5'
                                                }}
                                            >
                                                <strong>I confirm I am authorised to act as Signatory for <span style={{ color: '#FF3E41' }}>{companyName}</span> and accept full responsibility for all actions taken under this role.</strong>
                                            </label>
                                        </div>
                                        {error && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginTop: '12px',
                                                color: '#FF3E41',
                                                fontSize: '0.9rem'
                                            }}>
                                                <AlertCircle size={16} />
                                                <span>{error}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Footer with #FF3E41 button */}
                            <div style={{
                                display: 'flex',
                                gap: '16px',
                                justifyContent: 'flex-end',
                                marginTop: '32px'
                            }}>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    style={{
                                        padding: '12px 28px',
                                        borderRadius: '10px',
                                        border: '1px solid #dee2e6',
                                        background: '#fff',
                                        color: '#495057',
                                        fontSize: '0.95rem',
                                        fontWeight: '500',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#f8f9fa';
                                        e.target.style.borderColor = '#ced4da';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = '#fff';
                                        e.target.style.borderColor = '#dee2e6';
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAccept}
                                    style={{
                                        padding: '12px 32px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: isChecked ? 'linear-gradient(135deg, #FF3E41 0%, #E03537 100%)' : '#FF3E41',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        cursor: isChecked ? 'pointer' : 'not-allowed',
                                        opacity: isChecked ? 1 : 0.5,
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        boxShadow: isChecked ? '0 4px 12px rgba(255, 62, 65, 0.3)' : 'none'
                                    }}
                                    disabled={!isChecked}
                                    onMouseEnter={(e) => {
                                        if (isChecked) {
                                            e.target.style.background = 'linear-gradient(135deg, #E03537 0%, #C03032 100%)';
                                            e.target.style.transform = 'translateY(-1px)';
                                            e.target.style.boxShadow = '0 6px 16px rgba(255, 62, 65, 0.4)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (isChecked) {
                                            e.target.style.background = 'linear-gradient(135deg, #FF3E41 0%, #E03537 100%)';
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = '0 4px 12px rgba(255, 62, 65, 0.3)';
                                        }
                                    }}
                                >
                                    <CheckCircle size={18} />
                                    Accept & Activate Signatory Role
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
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