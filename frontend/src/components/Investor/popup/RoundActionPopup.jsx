// components/RoundActionPopup.js
import React, { useState, useEffect } from 'react';
import { CircleX, AlertCircle, CheckCircle, FileText, TrendingUp, Settings, XCircle } from 'lucide-react';
import { API_BASE_URL } from '../../../config/config';
import axios from "axios";
export default function RoundActionPopup({
    show,
    onClose,
    onConfirm,
    companyName = "Your Company",
    roundDetails = {},
    isSubmitting = false,
    idRound,
    showCreateSection = true,  // Show create section
    showEditSection = true,     // Show edit section
    showCloseSection = true,    // Show close section
}) {
    const [isCheckedCreate, setIsCheckedCreate] = useState(false);
    const [isCheckedEdit, setIsCheckedEdit] = useState(false);
    const [isCheckedClose, setIsCheckedClose] = useState(false);
    const [error, setError] = useState('');
    const storedUsername = localStorage.getItem("SignatoryLoginData");
    const userLogin = JSON.parse(storedUsername);
    const apiUrlRound = API_BASE_URL + "api/user/capitalround/";
    // Reset checkboxes when popup opens
    useEffect(() => {
        if (show) {
            setIsCheckedCreate(false);
            setIsCheckedEdit(false);
            setIsCheckedClose(false);
            setError('');
        }
    }, [show]);

    const handleConfirm = async () => {
        let formData = {
            company_id: userLogin.companies[0].id,

        };
        try {
            const res = await axios.post(
                apiUrlRound + "roundManagementAcklnowlegment",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            const checkData = res.data.results;
            // Check which sections are shown and validate accordingly
            if (showCreateSection && !isCheckedCreate) {
                setError('Please confirm the create acknowledgment to proceed');
                return;
            }
            if (showEditSection && !isCheckedEdit) {
                setError('Please confirm the edit acknowledgment to proceed');
                return;
            }
            if (showCloseSection && !isCheckedClose) {
                setError('Please confirm the close acknowledgment to proceed');
                return;
            }
            setError('');
            onConfirm();
        } catch (err) { }

    };

    if (!show) return null;

    // Get section configurations
    const createConfig = {
        title: 'Create Fundraising Round',
        color: '#CC0000',
        buttonColor: '#CC0000',
        icon: <TrendingUp size={28} color="#CC0000" />,
        confirmText: 'I confirm the round details are accurate and I am authorised to open this round.',
        points: [
            'The round details you have entered are accurate, complete, and not misleading.',
            `You have the legal authority to open this round on behalf of <strong>${companyName}</strong>.`,
            'You understand that any securities-related activities conducted through this round are subject to applicable laws and regulations in your jurisdiction, and that Capavate does not provide legal, financial, or regulatory advice.',
            'Capavate and BluePrint Catalyst Limited bear no liability for the accuracy of round information or the outcome of any fundraise.'
        ],
        variant: 'A',
        variantLabel: 'Create Round'
    };

    const editConfig = {
        title: 'Modify Active Round',
        color: '#1a2c3e',
        buttonColor: '#1a2c3e',
        icon: <Settings size={28} color="#1a2c3e" />,
        confirmText: 'I confirm these amendments are accurate and I accept responsibility for communicating any material changes to investors.',
        points: [
            `The amendments you are making are accurate and authorised by <strong>${companyName}</strong>.`,
            'You understand that changes to an active round may affect existing investor communications and soft-circle indications, and it is your responsibility to notify affected parties accordingly.',
            'Capavate bears no liability for any consequences arising from modifications to a live round, including investor disputes.'
        ],
        variant: 'B',
        variantLabel: 'Adjust / Edit Round'
    };

    const closeConfig = {
        title: 'Close Fundraising Round',
        color: '#6c757d',
        buttonColor: '#6c757d',
        icon: <XCircle size={28} color="#6c757d" />,
        confirmText: 'I understand this action is irreversible and confirm I am authorised to close this round.',
        points: [
            `You are authorised by <strong>${companyName}</strong> to close this round.`,
            'All outstanding soft circles and pending investor confirmations will be marked as closed.',
            'The cap table will be updated to reflect only those investments confirmed by a Signatory prior to closure.',
            'Capavate and BluePrint Catalyst Limited bear no liability for any unconfirmed investments or disputes arising from the closure of this round.'
        ],
        variant: 'C',
        variantLabel: 'Close Round'
    };

    // Get action description text based on which sections are shown
    const getActionDescription = () => {
        const actions = [];
        if (showCreateSection) actions.push('create a new fundraising round');
        if (showEditSection) actions.push('modify an active fundraising round');
        if (showCloseSection) actions.push('close the fundraising round');

        if (actions.length === 0) return '';
        if (actions.length === 1) {
            return `You are about to ${actions[0]} for <strong>${companyName}</strong>.`;
        }
        if (actions.length === 2) {
            return `You are about to ${actions[0]} and ${actions[1]} for <strong>${companyName}</strong>.`;
        }
        return `You are about to ${actions[0]}, ${actions[1]}, and ${actions[2]} for <strong>${companyName}</strong>.`;
    };

    // Determine header title
    const getHeaderTitle = () => {
        const titles = [];
        if (showCreateSection) titles.push('Create');
        if (showEditSection) titles.push('Edit');
        if (showCloseSection) titles.push('Close');

        if (titles.length === 0) return 'Round Action';
        if (titles.length === 1) return `${titles[0]} Fundraising Round`;
        if (titles.length === 2) return `${titles[0]} & ${titles[1]} Fundraising Round`;
        return `${titles[0]}, ${titles[1]} & ${titles[2]} Fundraising Round`;
    };

    // Get trigger description
    const getTriggerDescription = () => {
        const actions = [];
        if (showCreateSection) actions.push('Creating a new round');
        if (showEditSection) actions.push('Adjusting/editing an active round');
        if (showCloseSection) actions.push('Closing a round');

        if (actions.length === 1) return actions[0];
        if (actions.length === 2) return `${actions[0]} and ${actions[1]}`;
        return `${actions[0]}, ${actions[1]}, and ${actions[2]}`;
    };

    return (
        <>
            <div className="modal fade show" style={{
                display: 'block',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 1050
            }}>
                <div className="modal-dialog modal-dialog-centered modal-xl">
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
                                        <FileText size={28} color="#CC0000" />
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
                                            Acknowledgement 2
                                        </div>
                                        <h4 style={{
                                            margin: 0,
                                            fontSize: '1.5rem',
                                            fontWeight: '700',
                                            color: '#fff',
                                            letterSpacing: '-0.5px'
                                        }}>
                                            {getHeaderTitle()}
                                        </h4>
                                        <p style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            margin: '4px 0 0 0',
                                            fontSize: '0.85rem'
                                        }}>
                                            Round Management Actions
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
                        <div style={{ padding: '32px', maxHeight: '70vh', overflowY: 'auto' }}>
                            {/* Trigger info */}


                            {/* Action description */}
                            <div style={{
                                background: '#f8f9fa',
                                borderRadius: '12px',
                                padding: '16px 20px',
                                marginBottom: '24px',
                                border: '1px solid #e9ecef'
                            }}>
                                <div dangerouslySetInnerHTML={{ __html: getActionDescription() }} style={{
                                    fontSize: '1rem',
                                    color: '#212529',
                                    lineHeight: '1.6'
                                }} />
                            </div>

                            {/* Create Section */}
                            {showCreateSection && (
                                <div style={{
                                    border: `1px solid ${createConfig.color}`,
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    marginBottom: '24px'
                                }}>
                                    <div style={{
                                        background: `${createConfig.color}10`,
                                        padding: '16px 24px',
                                        borderBottom: `1px solid ${createConfig.color}20`,
                                        borderLeft: `4px solid ${createConfig.color}`
                                    }}>
                                        <h5 style={{
                                            margin: 0,
                                            fontWeight: '700',
                                            fontSize: '1rem',
                                            color: '#212529'
                                        }}>
                                            Variant {createConfig.variant}
                                            <span style={{
                                                marginLeft: '12px',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                backgroundColor: createConfig.color,
                                                color: '#fff'
                                            }}>
                                                {createConfig.variantLabel}
                                            </span>
                                        </h5>
                                    </div>
                                    <div style={{ padding: '24px' }}>
                                        <div dangerouslySetInnerHTML={{ __html: `You are about to create a new <strong>fundraising round</strong> for <strong>${companyName}</strong>.` }} style={{
                                            fontSize: '1rem',
                                            color: '#212529',
                                            marginBottom: '20px',
                                            lineHeight: '1.6'
                                        }} />
                                        <p style={{ fontWeight: '600', marginBottom: '12px', color: '#212529', fontSize: '0.95rem' }}>By proceeding, you confirm that:</p>
                                        <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
                                            {createConfig.points.map((point, index) => (
                                                <li key={index} style={{ marginBottom: '12px', color: '#495057', lineHeight: '1.6', fontSize: '0.9rem' }}>
                                                    <span dangerouslySetInnerHTML={{ __html: point }} />
                                                </li>
                                            ))}
                                        </ul>
                                        <div style={{
                                            background: '#f8f9fa',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            border: error && !isCheckedCreate && showCreateSection ? `1px solid ${createConfig.color}` : '1px solid #e9ecef'
                                        }}>
                                            <div className="form-check" style={{ paddingLeft: '32px' }}>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="createConfirm"
                                                    checked={isCheckedCreate}
                                                    onChange={(e) => {
                                                        setIsCheckedCreate(e.target.checked);
                                                        if (e.target.checked && error) setError('');
                                                    }}
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        marginLeft: '-32px',
                                                        cursor: 'pointer',
                                                        accentColor: createConfig.color
                                                    }}
                                                />
                                                <label className="form-check-label" htmlFor="createConfirm" style={{ cursor: 'pointer', fontSize: '0.9rem', color: '#212529', lineHeight: '1.5' }}>
                                                    <strong>{createConfig.confirmText}</strong>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Edit Section */}
                            {showEditSection && (
                                <div style={{
                                    border: `1px solid ${editConfig.color}`,
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    marginBottom: '24px'
                                }}>
                                    <div style={{
                                        background: `${editConfig.color}10`,
                                        padding: '16px 24px',
                                        borderBottom: `1px solid ${editConfig.color}20`,
                                        borderLeft: `4px solid ${editConfig.color}`
                                    }}>
                                        <h5 style={{
                                            margin: 0,
                                            fontWeight: '700',
                                            fontSize: '1rem',
                                            color: '#212529'
                                        }}>
                                            Variant {editConfig.variant}
                                            <span style={{
                                                marginLeft: '12px',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                backgroundColor: editConfig.color,
                                                color: '#fff'
                                            }}>
                                                {editConfig.variantLabel}
                                            </span>
                                        </h5>
                                    </div>
                                    <div style={{ padding: '24px' }}>
                                        <div dangerouslySetInnerHTML={{ __html: `You are about to <strong>modify an active fundraising round</strong> for <strong>${companyName}</strong>.` }} style={{
                                            fontSize: '1rem',
                                            color: '#212529',
                                            marginBottom: '20px',
                                            lineHeight: '1.6'
                                        }} />
                                        <p style={{ fontWeight: '600', marginBottom: '12px', color: '#212529', fontSize: '0.95rem' }}>By proceeding, you confirm that:</p>
                                        <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
                                            {editConfig.points.map((point, index) => (
                                                <li key={index} style={{ marginBottom: '12px', color: '#495057', lineHeight: '1.6', fontSize: '0.9rem' }}>
                                                    <span dangerouslySetInnerHTML={{ __html: point }} />
                                                </li>
                                            ))}
                                        </ul>
                                        <div style={{
                                            background: '#f8f9fa',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            border: error && !isCheckedEdit && showEditSection ? `1px solid ${editConfig.color}` : '1px solid #e9ecef'
                                        }}>
                                            <div className="form-check" style={{ paddingLeft: '32px' }}>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="editConfirm"
                                                    checked={isCheckedEdit}
                                                    onChange={(e) => {
                                                        setIsCheckedEdit(e.target.checked);
                                                        if (e.target.checked && error) setError('');
                                                    }}
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        marginLeft: '-32px',
                                                        cursor: 'pointer',
                                                        accentColor: editConfig.color
                                                    }}
                                                />
                                                <label className="form-check-label" htmlFor="editConfirm" style={{ cursor: 'pointer', fontSize: '0.9rem', color: '#212529', lineHeight: '1.5' }}>
                                                    <strong>{editConfig.confirmText}</strong>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Close Section */}
                            {showCloseSection && (
                                <div style={{
                                    border: `1px solid ${closeConfig.color}`,
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    marginBottom: '24px'
                                }}>
                                    <div style={{
                                        background: `${closeConfig.color}10`,
                                        padding: '16px 24px',
                                        borderBottom: `1px solid ${closeConfig.color}20`,
                                        borderLeft: `4px solid ${closeConfig.color}`
                                    }}>
                                        <h5 style={{
                                            margin: 0,
                                            fontWeight: '700',
                                            fontSize: '1rem',
                                            color: '#212529'
                                        }}>
                                            Variant {closeConfig.variant}
                                            <span style={{
                                                marginLeft: '12px',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                backgroundColor: closeConfig.color,
                                                color: '#fff'
                                            }}>
                                                {closeConfig.variantLabel}
                                            </span>
                                        </h5>
                                    </div>
                                    <div style={{ padding: '24px' }}>
                                        <div dangerouslySetInnerHTML={{ __html: `You are about to <strong>close the fundraising round</strong> for <strong>${companyName}</strong>. This action is <strong style="color: #CC0000;">irreversible</strong> on the platform.` }} style={{
                                            fontSize: '1rem',
                                            color: '#212529',
                                            marginBottom: '20px',
                                            lineHeight: '1.6'
                                        }} />
                                        <p style={{ fontWeight: '600', marginBottom: '12px', color: '#212529', fontSize: '0.95rem' }}>By proceeding, you confirm that:</p>
                                        <ul style={{ paddingLeft: '20px', marginBottom: '24px' }}>
                                            {closeConfig.points.map((point, index) => (
                                                <li key={index} style={{ marginBottom: '12px', color: '#495057', lineHeight: '1.6', fontSize: '0.9rem' }}>
                                                    <span dangerouslySetInnerHTML={{ __html: point }} />
                                                </li>
                                            ))}
                                        </ul>
                                        <div style={{
                                            background: '#f8f9fa',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            border: error && !isCheckedClose && showCloseSection ? `1px solid ${closeConfig.color}` : '1px solid #e9ecef'
                                        }}>
                                            <div className="form-check" style={{ paddingLeft: '32px' }}>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="closeConfirm"
                                                    checked={isCheckedClose}
                                                    onChange={(e) => {
                                                        setIsCheckedClose(e.target.checked);
                                                        if (e.target.checked && error) setError('');
                                                    }}
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        marginLeft: '-32px',
                                                        cursor: 'pointer',
                                                        accentColor: closeConfig.color
                                                    }}
                                                />
                                                <label className="form-check-label" htmlFor="closeConfirm" style={{ cursor: 'pointer', fontSize: '0.9rem', color: '#212529', lineHeight: '1.5' }}>
                                                    <strong>{closeConfig.confirmText}</strong>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginTop: '16px',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff5f5',
                                    border: '1px solid #ffe0e0',
                                    color: '#CC0000',
                                    fontSize: '0.85rem'
                                }}>
                                    <AlertCircle size={14} />
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>

                        {/* Footer buttons */}
                        <div style={{
                            padding: '24px 32px',
                            borderTop: '1px solid #e9ecef',
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
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => { e.target.style.background = '#f8f9fa'; }}
                                onMouseLeave={(e) => { e.target.style.background = '#fff'; }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirm}
                                disabled={(showCreateSection && !isCheckedCreate) || (showEditSection && !isCheckedEdit) || (showCloseSection && !isCheckedClose) || isSubmitting}
                                style={{
                                    padding: '10px 28px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: ((!showCreateSection || isCheckedCreate) && (!showEditSection || isCheckedEdit) && (!showCloseSection || isCheckedClose)) && !isSubmitting ? '#CC0000' : '#ccc',
                                    color: '#fff',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: ((!showCreateSection || isCheckedCreate) && (!showEditSection || isCheckedEdit) && (!showCloseSection || isCheckedClose)) && !isSubmitting ? 'pointer' : 'not-allowed',
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
                                        <CheckCircle size={16} />
                                        Confirm Actions
                                    </>
                                )}
                            </button>
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