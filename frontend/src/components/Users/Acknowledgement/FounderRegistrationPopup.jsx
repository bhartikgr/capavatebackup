// components/FounderRegistrationPopup.js
import React, { useState } from 'react';
import { CircleX, AlertCircle, CheckCircle, FileText, User } from 'lucide-react';

export default function FounderRegistrationPopup({
    show,
    onClose,
    onAccept,
    userName = "User"
}) {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messageAll, setmessageAll] = useState("");
    const [errr, seterrr] = useState(false);

    const handleAccept = async () => {
        if (!isChecked) {
            setError('Please confirm that you have read and agree to the Founder Platform Registration Agreement');
            return;
        }
        setError('');
        setIsSubmitting(true);

        try {
            const response = await onAccept();

            if (response && response.status === "1") {
                seterrr(false);
                setmessageAll("Founder agreement accepted successfully!");
                setTimeout(() => {
                    setmessageAll("");
                    onClose();
                }, 2000);
            } else {
                seterrr(true);
                setmessageAll(response?.message || "Error accepting agreement");
                setTimeout(() => {
                    setmessageAll("");
                }, 3000);
            }
        } catch (error) {
            seterrr(true);
            setmessageAll("Failed to accept agreement. Please try again.");
            setTimeout(() => {
                setmessageAll("");
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
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
                {messageAll && (
                    <div
                        className={`shadow-lg ${errr ? "error_pop" : "success_pop"}`}
                        style={{
                            position: 'fixed',
                            top: '20px',
                            right: '20px',
                            zIndex: 9999,
                            padding: '15px 20px',
                            borderRadius: '8px',
                            backgroundColor: errr ? '#f8d7da' : '#d4edda',
                            color: errr ? '#721c24' : '#155724',
                            border: `1px solid ${errr ? '#f5c6cb' : '#c3e6cb'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            minWidth: '300px'
                        }}
                    >
                        <div className="d-flex align-items-center gap-2">
                            <span className="d-block">{messageAll}</span>
                        </div>
                        <button
                            type="button"
                            className="close_btnCros"
                            onClick={() => setmessageAll("")}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '20px',
                                cursor: 'pointer',
                                marginLeft: '10px'
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content" style={{
                        borderRadius: '20px',
                        border: 'none',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        overflow: 'hidden'
                    }}>
                        {/* Header */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgb(26, 28, 46) 0%, rgb(219 74 67) 100%)',
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
                                        <User size={28} color="#CC0000" />
                                    </div>
                                    <div>
                                        <h4 style={{
                                            margin: 0,
                                            fontSize: '1.75rem',
                                            fontWeight: '700',
                                            color: '#fff',
                                            letterSpacing: '-0.5px'
                                        }}>
                                            Founder Platform Registration Agreement
                                        </h4>
                                        <p style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            margin: '4px 0 0 0',
                                            fontSize: '0.95rem'
                                        }}>
                                            Stage 1 of 2 — Platform Registration
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
                                    onMouseEnter={(e) => {
                                        if (!isSubmitting) e.target.style.background = 'rgba(255,255,255,0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isSubmitting) e.target.style.background = 'rgba(255,255,255,0.1)';
                                    }}
                                >
                                    <CircleX size={20} color="#fff" />
                                </button>
                            </div>
                        </div>

                        {/* Body with scroll */}
                        <div style={{ padding: '32px', maxHeight: '70vh', overflowY: 'auto' }}>
                            {/* Last updated info */}
                            <div style={{
                                marginBottom: '24px',
                                padding: '12px 16px',
                                background: '#f8f9fa',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <p style={{
                                    margin: 0,
                                    fontSize: '13px',
                                    color: '#6c757d'
                                }}>
                                    Last updated: 17 March 2026 · Blueprint Catalyst Limited · Incorporated in Hong Kong SAR
                                </p>
                            </div>

                            {/* Stage 1 info card */}
                            <div style={{
                                background: '#f8f9fa',
                                borderRadius: '12px',
                                padding: '16px 20px',
                                marginBottom: '24px',
                                border: '1px solid #e9ecef',
                                borderLeft: '4px solid #CC0000',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px'
                            }}>
                                <AlertCircle size={20} color="#CC0000" style={{ flexShrink: 0, marginTop: '2px' }} />
                                <div>
                                    <p style={{
                                        margin: 0,
                                        color: '#495057',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.6'
                                    }}>
                                        <strong>Stage 1 of 2 — Platform Access.</strong> This Agreement governs your personal Capavate account as a founder, director, officer, or company representative. You must accept before accessing the main platform dashboard. A separate Company Registration Agreement (Stage 2) is required each time you register a company to access its dashboard and full Capavate services.
                                    </p>
                                    <p style={{
                                        margin: '12px 0 0 0',
                                        color: '#495057',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.6'
                                    }}>
                                        By accepting, you enter into a legally binding agreement with <strong>Blueprint Catalyst Limited</strong> (trading as <strong>Capavate</strong>), incorporated in Hong Kong SAR. All Master Legal Documents at <a href="https://capavate.com/privacy-policy" target='_blank' style={{ color: '#CC0000' }}>capavate.com/legal</a> are incorporated into this Agreement in their entirety.
                                    </p>
                                </div>
                            </div>

                            {/* Main content with all sections */}
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
                                        fontSize: '1.1rem',
                                        color: '#212529'
                                    }}>
                                        Founder Registration Agreement
                                    </h5>
                                </div>

                                <div style={{ padding: '24px' }}>
                                    {/* Section 1: Definitions */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>1. Definitions</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        <strong>"Capavate" / "we" / "us" / "our"</strong> means Blueprint Catalyst Limited, incorporated in Hong Kong SAR, and its officers, directors, employees, agents, licensors, successors, and assigns. <strong>"You" / "Founder"</strong> means the individual accepting this Agreement. <strong>"Platform"</strong> means capavate.com, app.capavate.com, all APIs, mobile applications, and all associated services and functionality. <strong>"Master Legal Documents"</strong> means collectively the Privacy Policy, Terms of Service, Acceptable Use Policy, Cookie Policy, and Disclaimer at <a href="https://capavate.com/privacy-policy" target='_blank' style={{ color: '#CC0000' }}>capavate.com/legal</a>. <strong>"Content"</strong> means all data, text, materials, images, and information you submit to or through the Platform in any capacity. <strong>"Social Features"</strong> means cap table announcements, Angel Network, Equity Social Network, Entrepreneur Academy, community forums, deal rooms, profile pages, message threads, group communications, syndicate communications, and all other areas through which Content may be posted or shared. <strong>"Industry Partners"</strong> means professional services firms, advisers, accelerators, incubators, and other entities who have entered into a Partner Agreement with Blueprint Catalyst Limited.
                                    </p>

                                    {/* Section 2: Binding Agreement and Entire Agreement */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>2. Binding Agreement and Entire Agreement</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        By accepting, you enter into a binding agreement with Blueprint Catalyst Limited governed by this Agreement and the Master Legal Documents. This Agreement, the Master Legal Documents, and (where applicable) any Partner Agreement or Affiliate Agreement constitute the entire agreement between you and Blueprint Catalyst Limited. All prior representations, discussions, and understandings are superseded. In any conflict between this Agreement and the Master Legal Documents, the Master Legal Documents shall prevail. You confirm you have read and had a reasonable opportunity to review all Master Legal Documents before accepting.
                                    </p>

                                    {/* Section 3: Eligibility and Representations */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>3. Eligibility and Representations</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        By accepting this Agreement, you represent and warrant, on a continuing basis, that:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you are at least 18 years of age with full legal capacity to enter a binding contract in your jurisdiction;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you are a founder, director, officer, shareholder, or authorised representative of at least one company, or are in the process of establishing one;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>all information provided at registration and throughout your use of the Platform is and will remain accurate, current, and complete;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you are not subject to any legal, regulatory, or contractual prohibition that prevents you from accessing or using the Platform;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you are not a person or entity subject to applicable sanctions, export controls, or regulatory prohibitions — you represent this solely on your own behalf, as Capavate does not conduct sanctions screening and accepts no liability in this regard;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will access and use the Platform solely for lawful professional purposes consistent with your Founder status;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>where you act on behalf of a company or other entity, you have full authority to bind that entity to this Agreement and the Master Legal Documents.</li>
                                    </ul>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Misrepresentation of any of the above is a material breach and may result in immediate account termination, referral to applicable regulatory authorities, and civil or criminal liability. Blueprint Catalyst Limited, Capavate, and all affiliates are fully indemnified by you for all losses arising from any such misrepresentation.
                                    </p>

                                    {/* Section 4: Your Personal Account */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>4. Your Personal Account — Access and Responsibilities</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Your personal Capavate account is individual and non-transferable. It grants access to the main platform dashboard and general features only. All company-specific services — including cap table management, fundraising tools, the Equity Social Network, Angel Network, Investor CRM, M&amp;A intelligence, and all associated Social Features — require a separate Company Registration Agreement (Stage 2) for each company registered.
                                    </p>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You agree to:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>provide and maintain accurate, current, and complete registration information and promptly update it on any material change, including changes to your professional status, company affiliations, and regulatory status;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>maintain the confidentiality of your login credentials and not share or transfer access to any other person under any circumstances;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>not create multiple accounts for the same individual without prior written consent from Capavate;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>notify us immediately at <a href="mailto:trust@capavate.com" style={{ color: '#CC0000' }}>trust@capavate.com</a> of any actual or suspected unauthorised access to your account;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>accept full responsibility for all activity conducted under your account, whether authorised by you or not, except to the extent directly caused by our own gross negligence or wilful misconduct.</li>
                                    </ul>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Capavate reserves the right to require re-confirmation of your identity or eligibility at any time and to suspend or terminate accounts where re-confirmation cannot be provided.
                                    </p>

                                    {/* Section 5: Profile Obligations */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>5. Profile Obligations, Accuracy, and Integrity</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Your Founder profile is visible to other verified Capavate Members and forms the basis upon which other Members may choose to engage with you. You are solely responsible for all information in your profile and bear full legal responsibility for it. You agree that:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>all profile information — including your name, professional title, company affiliation, credentials, and all other self-described attributes — is and will remain accurate, complete, and not misleading at all times;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will promptly update your profile following any material change, including change of employer, change of company status, or any other change that would materially affect how other Members might rely upon your profile;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not impersonate any other person, company, fund, regulatory body, or other entity in your profile or associated communications;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not claim professional credentials, qualifications, or regulatory authorisations that you do not hold;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not use your profile to conduct activities outside the scope of your stated Member category;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not falsely represent any commercial or financial interest in connection with your profile without full disclosure of that interest.</li>
                                    </ul>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Capavate does not independently verify profile information and accepts no liability for harm caused by any Member's reliance on profile information provided by you. You are solely responsible and fully liable for all consequences arising from inaccurate, misleading, or false profile information. Blueprint Catalyst Limited, Capavate, and all affiliates are fully indemnified by you for all losses arising from any profile misrepresentation.
                                    </p>

                                    {/* Section 6: Licence Grant and Restrictions */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>6. Licence Grant and Restrictions</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        We grant you a limited, non-exclusive, non-transferable, revocable personal licence to access and use the Platform and services solely for lawful purposes consistent with this Agreement and the Master Legal Documents. You may not:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>sub-licence, sell, resell, transfer, or assign your access rights to any third party;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>reproduce, copy, extract, or distribute any part of the Platform other than as expressly permitted;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>reverse-engineer, decompile, or attempt to derive source code from any Platform software or API;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>use automated tools, bots, scrapers, or crawlers to access, collect, or copy Platform content or data without prior written consent;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>frame or mirror the Platform on any other website or application;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>use the Platform to build, develop, or assist in developing any competing product or service;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>access or attempt to access any account, data, or system component you are not authorised to access.</li>
                                    </ul>

                                    {/* Section 7: Member Content, Social Features, and Your Liability */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>7. Member Content, Social Features, and Your Liability</h2>

                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>7.1 Ownership and Licence to Capavate</h3>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You retain ownership of all intellectual property rights in Content you submit. By submitting any Content to any part of the Platform — including profile information, messages, community posts, and any other material — you grant Blueprint Catalyst Limited a worldwide, non-exclusive, royalty-free, sub-licensable, perpetual, irrevocable licence to use, host, store, reproduce, process, adapt, publish, transmit, and distribute that Content solely to the extent necessary to provide, operate, maintain, and improve all Capavate services, comply with legal obligations, and exercise or defend legal rights. This licence survives account closure.
                                    </p>

                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>7.2 Your Representations and Warranties for All Content</h3>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Every time you submit Content to any part of the Platform, you unconditionally represent and warrant that:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you own or have all necessary licences, rights, consents, and permissions to submit it and to grant the licence above;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the Content is accurate, complete, and not misleading in any material respect;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the Content does not infringe any third-party intellectual property, privacy, or other rights;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the Content complies with all applicable laws in all jurisdictions to which it may be disseminated, including securities law, financial promotion rules, data protection law, defamation law, and AML legislation;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the Content does not contain defamatory statements, malicious falsehoods, or any material that could give rise to civil or criminal liability in any jurisdiction;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>where the Content includes personal data of third parties, you are the lawful data controller and have all necessary authority to submit it.</li>
                                    </ul>

                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>7.3 Social Features — Capavate as Passive Intermediary</h3>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Capavate operates as a passive technical intermediary and communications conduit in respect of all Content posted through Social Features. Capavate does not pre-screen, verify, endorse, or take editorial responsibility for any user-generated Content. The absence of moderation does not constitute approval. Capavate expressly disclaims all liability for any Content you or any other Member posts through any Social Feature. The sole legal responsibility for all Content you post rests exclusively with you.
                                    </p>

                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>7.4 Prohibited Content and Conduct on Social Features</h3>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You must not, through any Social Feature of the Platform:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>post knowingly false, fabricated, or materially misleading Content, including false financial metrics, exaggerated company performance, fabricated investor interest, or unsubstantiated business claims;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>post defamatory, libellous, or harassing Content about any person or entity;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>post Content constituting an unauthorised financial promotion, unregulated offer of securities, or investment solicitation in any jurisdiction;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>disclose material non-public or price-sensitive information in breach of applicable insider dealing or market abuse laws;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>include personal data of identifiable individuals without lawful basis and their consent;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>use cap table announcement features for any purpose other than legitimate corporate communications;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>engage in impersonation, coordinated inauthentic behaviour, or cross-platform reposting of closed-area content without consent;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>use AI-assisted tools to generate or distribute synthetic or misleading Content presented as genuine;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>post Content infringing any third party's intellectual property rights.</li>
                                    </ul>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You are solely and exclusively responsible and legally liable for all Content you post and all consequences arising from it globally.
                                    </p>

                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>7.5 Indemnification for Content</h3>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You agree to fully and promptly indemnify, defend, and hold harmless Blueprint Catalyst Limited, its affiliates, officers, directors, employees, agents, and service providers from and against all claims, demands, proceedings, losses, liabilities, damages, fines, penalties, costs, and expenses (including legal fees on a full indemnity basis) arising from or in connection with any Content you post, any misrepresentation in your profile, any breach of this Agreement or the Master Legal Documents, any regulatory action arising from your use of the Platform, or any third-party claim relating to personal data you submitted without lawful authority.
                                    </p>

                                    {/* Section 8: Privacy and Your Personal Data */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>8. Privacy and Your Personal Data</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        By registering, you acknowledge and consent to the collection, processing, storage, and use of your personal data as described in the <a href="https://capavate.com/privacy-policy" target='_blank' style={{ color: '#CC0000' }}>Privacy Policy</a>. Key acknowledgements:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Your personal data is processed by Blueprint Catalyst Limited (Hong Kong) under the Personal Data (Privacy) Ordinance (Cap. 486), EU GDPR, and UK GDPR as a global baseline;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>your profile information is visible to other verified Capavate Members as described in Privacy Policy Section 7A;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>your activity may be subject to automated processing and AI-assisted features including connection recommendations and trust scoring (Privacy Policy Section 7B); you have the right to object to certain automated processing;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>international transfers of your personal data are subject to appropriate safeguards as described in Privacy Policy Section 8;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you have data subject rights including access, correction, erasure, restriction, portability, and objection — exercise these by contacting <a href="mailto:privacy@capavate.com" style={{ color: '#CC0000' }}>privacy@capavate.com</a>;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you may contact our Data Protection Officer at <a href="mailto:privacy@capavate.com" style={{ color: '#CC0000' }}>privacy@capavate.com</a> and have the right to lodge a complaint with your applicable data protection supervisory authority.</li>
                                    </ul>

                                    {/* Section 9: Acceptable Use */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>9. Acceptable Use</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You agree to use the Platform at all times in strict compliance with the Acceptable Use Policy. Prohibited conduct includes, without limitation: misrepresentation and fraud; securities law violations; financial crime; spam and data misuse; harmful or offensive Content; profile integrity violations; AI and automated tool misuse; platform and API abuse; and conflicts of interest. Breach of the Acceptable Use Policy is a material breach of this Agreement. Capavate reserves the right to take immediate enforcement action — including account suspension, termination, content removal, and referral to regulatory and law enforcement authorities — without prior notice.
                                    </p>

                                    {/* Section 10: No Financial, Professional, or Investment Advice */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>10. No Financial, Professional, or Investment Advice</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Nothing on the Platform or available through any Capavate service constitutes financial advice, investment advice, securities advice, tax advice, legal advice, or any other professional or regulated advice. No Platform content represents a recommendation or solicitation to buy or sell any security or financial instrument. Capavate is not authorised or regulated by the SFC, FCA, SEC, MAS, ASIC, or any equivalent regulatory authority as a financial adviser, investment manager, or broker-dealer. This exclusion applies to all content, including Industry Partner content, unless that partner separately holds applicable authorisation.
                                    </p>

                                    {/* Section 11: Platform Availability */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>11. Platform Availability, Services, and Changes</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        The Platform and all services are provided on an "as is" and "as available" basis without warranty of any kind. Capavate does not guarantee uninterrupted, error-free, or secure access. We reserve the right to modify, suspend, add, or remove any service, feature, or access right at any time with or without notice. Availability of any service depends on membership tier, geographic location, and applicable law. We accept no liability for any interruption, suspension, or discontinuation of any service.
                                    </p>

                                    {/* Section 12: Intellectual Property */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>12. Intellectual Property</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        All intellectual property rights in the Platform — including design, software, code, databases, trademarks, logos, and all Capavate-originated content — are the exclusive property of Blueprint Catalyst Limited and/or its licensors. Nothing in this Agreement grants you any rights in Capavate's intellectual property beyond the limited licence in Clause 6. The Capavate name and logo are trademarks of Blueprint Catalyst Limited. You may not use them without prior written consent.
                                    </p>

                                    {/* Section 13: Confidentiality */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>13. Confidentiality</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You may receive access to confidential information through the Platform, including non-public company information, cap table data, deal terms, and financial projections shared by other Members. You agree to: keep all such information strictly confidential; not disclose it to any third party without the disclosing party's prior written consent; and use it solely for the purpose for which it was shared. This obligation survives termination for five (5) years, or indefinitely for trade secrets. Capavate is not a party to any confidentiality arrangement between Members and bears no responsibility for monitoring or enforcing such arrangements.
                                    </p>

                                    {/* Section 14: Disclaimer of Warranties */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>14. Disclaimer of Warranties</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        To the maximum extent permitted by applicable law, the Platform and all Capavate services are provided on an "as is" and "as available" basis without warranties of any kind, whether express, implied, statutory, or otherwise, including implied warranties of merchantability, fitness for a particular purpose, satisfactory quality, non-infringement, and accuracy. Capavate does not warrant the accuracy, completeness, or reliability of any content on the Platform, including content from Members, Industry Partners, or third parties.
                                    </p>

                                    {/* Section 15: Limitation of Liability */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>15. Limitation of Liability</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        To the maximum extent permitted by applicable law, Blueprint Catalyst Limited, its affiliates, officers, directors, employees, agents, and licensors shall not be liable for:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any indirect, incidental, special, consequential, punitive, or exemplary damages, including loss of profits, revenue, data, business, goodwill, or opportunity, whether arising in contract, tort, statute, or otherwise;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any investment loss, business loss, or financial damage arising from your use of or reliance on any Platform feature or content;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any loss or damage arising from any third-party content, Industry Partner services, or affiliate activities;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any interruption, suspension, or discontinuation of the Platform or any service;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any data loss or security breach not directly caused by our own gross negligence.</li>
                                    </ul>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Our total aggregate liability to you under or in connection with this Agreement shall not exceed the greater of: (a) the total fees paid by you to Capavate in the twelve (12) months preceding the event; or (b) USD $100 or local equivalent. Nothing in this Agreement limits liability for fraud, gross negligence, or any liability that cannot be excluded by applicable law.
                                    </p>

                                    {/* Section 16: Industry Partners */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>16. Industry Partners — No Endorsement or Liability</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Industry Partners who provide services through or alongside the Platform do so independently and under their own terms. Capavate does not verify, endorse, or guarantee the quality, accuracy, legality, or regulatory compliance of any Industry Partner's services, advice, or content. Any engagement with an Industry Partner is entirely at your own risk. Capavate accepts no liability for any advice, recommendation, or service provided by any Industry Partner, or any loss arising from their services.
                                    </p>

                                    {/* Section 17: Third-Party Services */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>17. Third-Party Services and Links</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        The Platform may contain links to or integrations with third-party services. Capavate has no control over and accepts no responsibility for the content, availability, or conduct of any third-party service. Your use of any third-party service is at your own risk and governed by that service's own terms.
                                    </p>

                                    {/* Section 18: Force Majeure */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>18. Force Majeure</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Capavate shall not be liable for any failure or delay in performance caused by events beyond its reasonable control, including acts of God, natural disasters, pandemics, war, terrorism, government action, regulatory changes, cyberattacks, internet outages, or failures of third-party providers. If such an event continues for more than ninety (90) days, either party may terminate this Agreement on written notice.
                                    </p>

                                    {/* Section 19: Suspension and Termination */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>19. Suspension and Termination</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        We may suspend or permanently terminate your account at any time without prior notice if you breach this Agreement, the Master Legal Documents, or applicable law; if we are required to do so by law or regulatory directive; if we reasonably suspect fraudulent, abusive, or illegal activity; or if your continued use poses a security or compliance risk. Upon termination, all licences cease immediately. Clauses 7.5 (Indemnification), 8 (Privacy), 12 (IP), 13 (Confidentiality), 15 (Liability), 20 (Governing Law), and all survival provisions of the Master Legal Documents survive termination. You may close your account by contacting <a href="mailto:trust@capavate.com" style={{ color: '#CC0000' }}>trust@capavate.com</a>.
                                    </p>

                                    {/* Section 20: Governing Law */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>20. Governing Law and Dispute Resolution</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        This Agreement is governed by the laws of the Hong Kong Special Administrative Region. The parties shall first attempt in good faith to resolve any dispute by negotiation for thirty (30) days following written notice. If unresolved, the dispute shall be finally resolved by binding arbitration administered by the Hong Kong International Arbitration Centre (HKIAC) under its Administered Arbitration Rules, seated in Hong Kong, conducted in English, before a single arbitrator. Capavate reserves the right to seek urgent injunctive or other equitable relief in any court of competent jurisdiction worldwide. EU consumer residents may also benefit from mandatory consumer protection provisions applicable in their Member State.
                                    </p>

                                    {/* Section 21: Severability */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>21. Severability, Waiver, and Assignment</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        If any provision of this Agreement is found invalid or unenforceable, the remaining provisions continue in full force. No failure by Capavate to enforce any right constitutes a waiver. Capavate may assign its rights and obligations without consent in connection with a merger, acquisition, or reorganisation. You may not assign your rights or obligations without prior written consent from Capavate.
                                    </p>

                                    {/* Section 22: Modifications */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>22. Modifications</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        We may update this Agreement at any time. For material changes, we will provide at least 30 days' advance notice via the Platform and email. Continued use after the effective date constitutes acceptance. If you object, your sole remedy is to close your account before the effective date.
                                    </p>

                                    {/* Section 23: Contact */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>23. Contact</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Legal: <a href="mailto:legal@capavate.com" style={{ color: '#CC0000' }}>legal@capavate.com</a> &nbsp;·&nbsp; Privacy: <a href="mailto:privacy@capavate.com" style={{ color: '#CC0000' }}>privacy@capavate.com</a> &nbsp;·&nbsp; Trust &amp; Safety: <a href="mailto:trust@capavate.com" style={{ color: '#CC0000' }}>trust@capavate.com</a>
                                    </p>

                                    {/* Final Confirmation Summary */}
                                    <div style={{
                                        background: '#fff5f5',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        marginTop: '24px',
                                        border: '1px solid #ffe0e0'
                                    }}>
                                        <p style={{
                                            margin: 0,
                                            fontSize: '0.95rem',
                                            color: '#CC0000',
                                            lineHeight: '1.6'
                                        }}>
                                            <strong>By checking the box and clicking the button below, you confirm:</strong> (i) you have read and understood this Agreement and all Master Legal Documents at <a href="https://capavate.com/privacy-policy" target='_blank' style={{ color: '#CC0000' }}>capavate.com/legal</a>; (ii) you meet all eligibility criteria; (iii) you agree to be legally bound by this Agreement, the <a href="#" style={{ color: '#CC0000' }}>Terms of Service</a>, <a href="#" style={{ color: '#CC0000' }}>Privacy Policy</a>, <a href="#" style={{ color: '#CC0000' }}>Acceptable Use Policy</a>, <a href="#" style={{ color: '#CC0000' }}>Cookie Policy</a>, and <a href="#" style={{ color: '#CC0000' }}>Disclaimer</a>; (iv) where acting on behalf of a company or entity, you have authority to bind that entity; and (v) you understand that Blueprint Catalyst Limited, Capavate, and its affiliates are not regulated financial advisers and that the Platform does not provide financial, investment, legal, or professional advice of any kind.
                                        </p>
                                    </div>

                                    {/* Checkbox section */}
                                    <div style={{
                                        background: '#f8f9fa',
                                        borderRadius: '12px',
                                        padding: '20px',
                                        marginTop: '24px',
                                        border: error ? '1px solid #CC0000' : '1px solid #e9ecef',
                                        boxShadow: error ? '0 0 0 3px rgba(204, 0, 0, 0.1)' : 'none'
                                    }}>
                                        <div className="form-check" style={{ paddingLeft: '32px' }}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="founderAgreementConfirm"
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
                                                htmlFor="founderAgreementConfirm"
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: '0.95rem',
                                                    color: '#212529',
                                                    lineHeight: '1.5'
                                                }}
                                            >
                                                <strong>I have read, understood, and agree to the Founder Platform Registration Agreement and all incorporated Master Legal Documents.</strong>
                                            </label>
                                        </div>
                                        {error && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginTop: '12px',
                                                color: '#CC0000',
                                                fontSize: '0.9rem'
                                            }}>
                                                <AlertCircle size={16} />
                                                <span>{error}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div style={{
                                display: 'flex',
                                gap: '16px',
                                justifyContent: 'flex-end',
                                marginTop: '16px'
                            }}>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    style={{
                                        padding: '12px 28px',
                                        borderRadius: '10px',
                                        border: '1px solid #dee2e6',
                                        background: '#fff',
                                        color: '#495057',
                                        fontSize: '0.95rem',
                                        fontWeight: '500',
                                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s',
                                        opacity: isSubmitting ? 0.5 : 1
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAccept}
                                    disabled={!isChecked || isSubmitting}
                                    style={{
                                        padding: '12px 32px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: isChecked && !isSubmitting ? 'linear-gradient(135deg, #CC0000 0%, #A00000 100%)' : '#CC0000',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        cursor: isChecked && !isSubmitting ? 'pointer' : 'not-allowed',
                                        opacity: isChecked && !isSubmitting ? 1 : 0.5,
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        boxShadow: isChecked && !isSubmitting ? '0 4px 12px rgba(204, 0, 0, 0.3)' : 'none'
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>Submitting...</>
                                    ) : (
                                        <>
                                            <CheckCircle size={18} />
                                            I Agree — Create My Account
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Footer copyright */}
                            <div style={{
                                marginTop: '24px',
                                paddingTop: '16px',
                                borderTop: '1px solid #e9ecef',
                                textAlign: 'center'
                            }}>
                                <p style={{
                                    fontSize: '11px',
                                    color: '#6c757d',
                                    margin: 0
                                }}>
                                    © {new Date().getFullYear()} Capavate &nbsp;·&nbsp; Blueprint Catalyst Limited. Incorporated in Hong Kong SAR. All rights reserved.
                                </p>
                                <p style={{
                                    fontSize: '11px',
                                    color: '#6c757d',
                                    margin: '8px 0 0 0'
                                }}>
                                    <a href="#" style={{ color: '#CC0000', textDecoration: 'none' }}>View full legal documents</a>
                                </p>
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