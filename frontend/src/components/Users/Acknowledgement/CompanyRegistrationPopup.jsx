// components/CompanyRegistrationPopup.js
import React, { useState } from 'react';
import { CircleX, AlertCircle, CheckCircle, FileText } from 'lucide-react';

export default function CompanyRegistrationPopup({
    show,
    onClose,
    onAccept,
    companyName = "Your Company"
}) {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');
    const [messageAll, setmessageAll] = useState("");
    const [errr, seterrr] = useState(false);

    const handleAccept = () => {
        if (!isChecked) {
            setError('Please confirm that you have read and agree to the Founder Company Registration Agreement');
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
                                        <FileText size={28} color="#CC0000" />
                                    </div>
                                    <div>
                                        <h4 style={{
                                            margin: 0,
                                            fontSize: '1.75rem',
                                            fontWeight: '700',
                                            color: '#fff',
                                            letterSpacing: '-0.5px'
                                        }}>
                                            Founder Company Registration Agreement
                                        </h4>
                                        <p style={{
                                            color: 'rgba(255,255,255,0.7)',
                                            margin: '4px 0 0 0',
                                            fontSize: '0.95rem'
                                        }}>
                                            Stage 2 of 2 — Company Registration
                                        </p>
                                    </div>
                                </div>

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

                            {/* Stage 2 info card */}
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
                                        <strong>Stage 2 of 2 — Company Access.</strong> This Agreement is required each time you register a company on Capavate.
                                        It governs your use of all company-specific services for that company — including cap table management, fundraising tools,
                                        Active Round Management, the Equity Social Network, Investor CRM, M&amp;A intelligence, Angel Network access, all Social Features,
                                        and all associated Capavate social media and announcement services.
                                    </p>
                                    <p style={{
                                        margin: '12px 0 0 0',
                                        color: '#495057',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.6'
                                    }}>
                                        This Agreement supplements and operates concurrently with your Stage 1 Platform Registration Agreement.
                                        Both incorporate the Master Legal Documents at <a href="#" style={{ color: '#CC0000' }}>capavate.com/legal</a>.
                                        A separate acceptance is required for <strong>each</strong> company you register.
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
                                        All terms defined in the Stage 1 Platform Registration Agreement and the Master Legal Documents have the same meaning here. In addition: <strong>"Company"</strong> means the legal entity you are registering on the Platform. <strong>"Company Dashboard"</strong> means the company-specific management interface and all associated services, tools, and Social Features activated upon acceptance of this Agreement for that Company. <strong>"Cap Table Data"</strong> means all shareholder records, equity instruments, option pools, convertible instruments, corporate documents, and associated personal and corporate data uploaded in connection with the Company. <strong>"Cap Table Announcements"</strong> means announcements, updates, corporate communications, and other Content posted to shareholders and cap table participants through the Platform. <strong>"Deal Room"</strong> means any confidential virtual data room, pitch materials repository, or investor-facing information space created through the Platform for the Company.
                                    </p>

                                    {/* Section 2: Scope and Relationship to Stage 1 */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>2. Scope and Relationship to Stage 1</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        This Agreement applies specifically to the Company and your use of all Capavate company-specific services in connection with that Company. It does not replace your Stage 1 Platform Registration Agreement — both apply concurrently and together with the Master Legal Documents. You must accept a separate Company Registration Agreement for each company you register. Each Company account is treated independently.
                                    </p>

                                    {/* Section 3: Authority to Register the Company */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>3. Authority to Register the Company</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        By registering the Company and accepting this Agreement, you represent and warrant, on a continuing basis, that:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you are a duly authorised director, officer, or representative of the Company with full legal authority to: (a) bind the Company to this Agreement and the Master Legal Documents; (b) submit the Company's corporate information, Cap Table Data, and all other Company Content to the Platform; and (c) accept these terms on the Company's behalf;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>all information submitted about the Company — including its legal name, incorporation jurisdiction, cap table structure, equity instruments, shareholder data, financial information, and corporate status — is accurate, complete, and current;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the Company is duly incorporated and in good standing in its jurisdiction of incorporation;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you have all necessary authority, corporate approvals, and consents to register the Company on the Platform and to upload the Cap Table Data;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you have all necessary consents, authorisations, or other valid legal bases under applicable data protection law to upload any third-party personal data (including shareholder, director, and investor data) to the Platform.</li>
                                    </ul>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Misrepresentation of authority or Company information is a material breach. Blueprint Catalyst Limited, Capavate, and all affiliates are fully indemnified by you personally and by the Company for all losses arising from any such misrepresentation.
                                    </p>

                                    {/* Section 4: Cap Table Data */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>4. Cap Table Data — Your Role as Data Controller</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        By uploading Cap Table Data and other corporate information to the Platform, you and the Company acknowledge and agree that:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you and the Company act as the <strong>data controller</strong> in respect of all third-party personal data submitted to the Platform, including shareholder names, contact details, equity holdings, directorship information, and all other identifiable information;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you are solely responsible for ensuring a valid lawful basis exists under applicable data protection law — including the PDPO (Cap. 486), EU GDPR, and UK GDPR — to upload and process each data subject's personal data through the Platform;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will comply with all applicable data protection law in respect of Cap Table Data, including providing required privacy notices to all data subjects whose data you upload;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not upload special categories of personal data (as defined under EU GDPR Article 9) without explicit consent and a compelling legitimate purpose;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Capavate acts as a <strong>data processor</strong> in respect of third-party personal data you submit, processing it solely on your instructions and in accordance with the Privacy Policy and any applicable data processing agreement;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will promptly notify <a href="mailto:privacy@capavate.com" style={{ color: '#CC0000' }}>privacy@capavate.com</a> if you become aware that any data subject whose data you have uploaded exercises or attempts to exercise data subject rights in connection with that data.</li>
                                    </ul>

                                    {/* Section 5: Fundraising, Active Rounds, and Securities Compliance */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>5. Fundraising, Active Rounds, and Securities Compliance</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        The Active Round Management and fundraising features enable you to manage live fundraising rounds and present opportunities to verified Investors. By using these features, you acknowledge and agree that:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>all fundraising activity — including investor presentations, pitch materials, deal terms, data room content, financial projections, and all related communications — must comply with all applicable securities laws, financial promotion regulations, AML requirements, and KYC obligations in every jurisdiction in which it is conducted, originated, or received;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Capavate is not a regulated financial services provider, placement agent, investment adviser, broker-dealer, or AML-regulated entity — compliance with all applicable securities, financial services, and AML/KYC law is solely and exclusively your responsibility and the Company's responsibility;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not use any Capavate feature to make any unauthorised financial promotion, misleading offer of securities, or regulated investment solicitation without the requisite regulatory authorisation in every relevant jurisdiction;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>all information provided to Investors through the Platform — including financial data, projections, valuations, pipeline data, and deal terms — must be accurate, complete, and not misleading, and must comply with all applicable disclosure obligations and directors' duties;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not present forward-looking statements, projections, or valuations without clearly labelling them as estimates and without including appropriate risk warnings;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not misrepresent investor interest, deal status, funding progress, or any other material fact to any current or prospective investor through the Platform;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Capavate relies on the diligence of third parties who have approved your access and does not conduct its own KYC or AML verification — it accepts no liability for any securities law, AML, or financial promotion compliance failure arising from your fundraising activities.</li>
                                    </ul>

                                    {/* Section 6: Cap Table Announcements and Shareholder Communications */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>6. Cap Table Announcements and Shareholder Communications</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        The Platform enables you and authorised representatives to post Cap Table Announcements to shareholders and other cap table participants. You are solely and exclusively responsible for all Cap Table Announcements and acknowledge that:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>all Cap Table Announcements must be accurate, complete, timely, and legally compliant in every jurisdiction in which they may be received;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you bear sole responsibility for ensuring Cap Table Announcements satisfy all applicable directors' duties, fiduciary obligations, shareholder agreement requirements, and securities disclosure obligations;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Capavate does not review, verify, endorse, or take any responsibility for the content or timing of any Cap Table Announcement — Capavate acts exclusively as a passive technical intermediary in this respect;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any Cap Table Announcement that is false, misleading, incomplete, or in breach of any legal obligation is solely your responsibility and that of the Company;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you must control the sensitivity and confidentiality of information included in Cap Table Announcements, as Capavate has no control over and no liability for any further dissemination by recipients;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any investment or corporate decision made by any shareholder or other party in reliance on a Cap Table Announcement is made entirely at their own risk — Capavate has no liability therefor.</li>
                                    </ul>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Blueprint Catalyst Limited, Capavate, and all affiliates are fully indemnified by you and the Company for all losses arising from any Cap Table Announcement, including any regulatory action, shareholder dispute, or third-party claim.
                                    </p>

                                    {/* Section 7: Equity Social Network, Angel Network, and All Social Features */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>7. Equity Social Network, Angel Network, and All Social Features</h2>
                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>7.1 Capavate as Passive Intermediary</h3>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Capavate acts exclusively as a passive technical intermediary and neutral communications conduit in respect of all Content posted through Social Features — including the Equity Social Network, Capavate Angel Network, International Entrepreneur Academy, deal rooms, community forums, profile pages, message threads, group communications, syndicate communications, and all other socially accessible areas of the Platform. Capavate does not pre-screen, verify, endorse, or take editorial responsibility for any Content you or your authorised representatives post. All Content published by you through Social Features remains your sole and exclusive legal responsibility.
                                    </p>

                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>7.2 Angel Network Content</h3>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You and your authorised representatives are solely and exclusively responsible for ensuring that all Content posted to the Capavate Angel Network: (a) complies with all applicable securities laws, financial promotion regulations, and market abuse laws in every jurisdiction in which it may be received or read; (b) does not constitute an unauthorised financial promotion or unregulated investment solicitation; (c) does not disclose material non-public or price-sensitive information in breach of applicable insider dealing or market abuse law; and (d) does not misrepresent deal terms, valuations, or investor interest. Capavate accepts no liability whatsoever for Angel Network Content or any consequences arising from it, including any investment decision made in reliance on it.
                                    </p>

                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>7.3 Equity Social Network and All Other Social Features</h3>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Content you or your authorised representatives post through the Equity Social Network, community forums, profile pages, message threads, deal rooms, or any other Social Feature must at all times: (a) be accurate and not misleading; (b) comply with all applicable law in every jurisdiction of receipt; (c) not constitute an unauthorised financial promotion; (d) not infringe any third-party rights; and (e) comply with the Acceptable Use Policy. Capavate accepts no liability for any Content posted through Social Features and expressly disclaims all responsibility for: defamatory or harmful content posted by you or your representatives; privacy violations arising from your content; investment decisions made in reliance on your content; regulatory consequences arising from your content's global reach; and any harm to third parties arising from your content.
                                    </p>

                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>7.4 Global Reach and Cross-Border Dissemination</h3>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You acknowledge and accept that Content posted through any Social Feature may be accessible to a global audience of Platform Members and may be further disseminated beyond the Platform. Capavate exercises no control over the geographic reach of your Content once posted and accepts no liability for any regulatory consequence arising from such reach in any jurisdiction. You are solely responsible for ensuring all Content is lawful in every jurisdiction in which it may be received.
                                    </p>

                                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>7.5 Content Indemnification — Social Features</h3>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You and the Company jointly and severally agree to fully and promptly indemnify, defend, and hold harmless Blueprint Catalyst Limited, its affiliates, officers, directors, employees, agents, Industry Partners, and service providers from and against all claims, demands, proceedings, losses, liabilities, damages, fines, penalties, costs, and expenses (including legal fees on a full indemnity basis) arising from or in connection with: any Content posted by you or your authorised representatives through any Social Feature; any Cap Table Announcement; any Deal Room content; any misrepresentation to Investors; any regulatory action arising from your fundraising activities; or any breach of this Agreement or the Master Legal Documents.
                                    </p>

                                    {/* Section 8: Investor CRM, Deal Rooms, and Investor Invitations */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>8. Investor CRM, Deal Rooms, and Investor Invitations</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You agree that:
                                    </p>
                                    <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will only invite individuals to register as Investors or access your Deal Room who you have reasonable grounds to believe satisfy the applicable Accredited Investor, Professional Investor, or equivalent standard in their jurisdiction;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you are solely responsible for the accuracy, completeness, and legal compliance of all materials in your Deal Room, including financial projections, valuations, and deal terms;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Capavate does not verify investor eligibility and it is your sole responsibility to satisfy yourself that invited investors are appropriately qualified;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>all confidentiality obligations and non-disclosure arrangements in respect of Deal Room materials are between you, the Company, and the relevant investors — Capavate is not a party to any such arrangement and has no liability for any breach;</li>
                                        <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not use the Investor CRM or Deal Room features for any purpose that constitutes a regulated financial promotion or securities offering without appropriate regulatory authorisation.</li>
                                    </ul>

                                    {/* Section 9: M&A Intelligence Features */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>9. M&amp;A Intelligence Features</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        M&amp;A intelligence tools and community data are provided for general informational purposes only. Nothing in any M&amp;A intelligence feature constitutes financial advice, a solicitation, or a recommendation to undertake any transaction. All M&amp;A decisions are made solely at your risk. Capavate does not guarantee the accuracy, completeness, or currency of any M&amp;A intelligence data and accepts no liability for any decision made in reliance on it.
                                    </p>

                                    {/* Section 10: Entrepreneur Academy Access and Contributions */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>10. Entrepreneur Academy Access and Contributions</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        If you access or contribute to the Entrepreneur Academy as a Founder or representative, all Academy Content you contribute is your sole responsibility. You warrant that Academy Content: (a) is accurate and not misleading; (b) does not constitute unregulated professional advice; (c) does not infringe third-party intellectual property rights; and (d) complies with all applicable law. Capavate accepts no liability for any Academy Content contributed by Members, or for any actions taken in reliance on it.
                                    </p>

                                    {/* Section 11: Industry Partner Integrations */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>11. Industry Partner Integrations</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Industry Partner services accessible through or alongside the Platform are provided independently by those partners under their own terms. Capavate does not verify, endorse, or take responsibility for the quality, accuracy, legality, or regulatory compliance of any Industry Partner's services, advice, or content. Any engagement with an Industry Partner is entirely at your own risk. Capavate accepts no liability for any loss arising from any Industry Partner's services, advice, or conduct.
                                    </p>

                                    {/* Section 12: Platform Integrity — Prohibited Manipulation */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>12. Platform Integrity — Prohibited Manipulation</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You must not engage in any conduct designed to manipulate, game, or undermine the integrity of the Platform, including: artificially inflating profile engagement metrics or activity indicators; creating false impressions of investor demand or deal legitimacy; circumventing eligibility or access control mechanisms; probing or mapping the Platform's security architecture; or engaging in activity designed to cause reputational harm to the Platform, Blueprint Catalyst Limited, or any Member.
                                    </p>

                                    {/* Section 13: Personal Data in Company Content */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>13. Personal Data in Company Content</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Where Content submitted in connection with the Company includes personal data of third parties — including cap table data, shareholder records, investor data, director information, or any other identifiable information — you and the Company are solely responsible as data controllers for ensuring: (a) you have a lawful basis for submitting that data; (b) all applicable data protection law is complied with, including the PDPO, EU GDPR, and UK GDPR; (c) no special categories of personal data are included without explicit consent; and (d) data subjects have been provided with appropriate privacy notices. Capavate accepts no liability for any data protection breach arising from Company Content and is fully indemnified by you and the Company in this respect.
                                    </p>

                                    {/* Section 14: Accuracy and Currency of Company Information */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>14. Accuracy and Currency of Company Information</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You agree to maintain the accuracy and currency of all Company information on the Platform and to update it promptly following any material change — including changes to the cap table, directors, officers, fundraising status, regulatory authorisation, corporate structure, or any other information that could be material to investors or shareholders. Failure to maintain accurate Company records may result in suspension of the Company account without notice.
                                    </p>

                                    {/* Section 15: Multiple Companies */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>15. Multiple Companies</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        If you are a director or representative of more than one company, you must accept a separate Company Registration Agreement for each. Each agreement and each company's data are treated independently. Approval to register one Company does not guarantee approval to register any other.
                                    </p>

                                    {/* Section 16: Fees, Subscription, and Payment */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>16. Fees, Subscription, and Payment</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Access to company-specific services is subject to the applicable subscription tier. All subscription fees are non-refundable except as required by applicable law. You are responsible for ensuring subscription payments are maintained. Lapse of subscription may result in suspension of the Company account and restricted access to Company data.
                                    </p>

                                    {/* Section 17: No Financial, Professional, or Investment Advice */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>17. No Financial, Professional, or Investment Advice</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Nothing on the Platform or provided through any company-specific service constitutes financial advice, investment advice, securities advice, tax advice, legal advice, or any other professional or regulated advice. Capavate is not authorised or regulated as a financial adviser, investment manager, placement agent, or broker-dealer by any regulatory authority in any jurisdiction.
                                    </p>

                                    {/* Section 18: Disclaimer of Warranties */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>18. Disclaimer of Warranties</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        To the maximum extent permitted by applicable law, the Platform and all company-specific services are provided on an "as is" and "as available" basis without warranties of any kind. Capavate does not warrant the accuracy, completeness, security, or uninterrupted availability of any service, any cap table data, any investor-facing feature, or any Social Feature.
                                    </p>

                                    {/* Section 19: Limitation of Liability */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>19. Limitation of Liability</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        To the maximum extent permitted by applicable law, Blueprint Catalyst Limited, its affiliates, officers, directors, employees, agents, Industry Partners, and licensors shall not be liable for: any indirect, incidental, special, consequential, punitive, or exemplary damages; any investment loss, business loss, or financial damage arising from any feature or content; any action taken by any investor, shareholder, or other person in reliance on Company Content; any breach of securities law, data protection law, or other regulation arising from your use of any feature; any interruption or failure of any service; or any loss of Company data. Our total aggregate liability in connection with any Company account shall not exceed the fees paid by you to Capavate in the twelve (12) months preceding the claim, or USD $100, whichever is greater. Nothing limits liability for fraud, gross negligence, or any liability that cannot be excluded by applicable law.
                                    </p>

                                    {/* Section 20: Indemnification */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>20. Indemnification</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        You personally and the Company jointly and severally agree to fully indemnify, defend, and hold harmless Blueprint Catalyst Limited, its affiliates, officers, directors, employees, agents, Industry Partners, and service providers from and against all claims, losses, liabilities, damages, fines, penalties, costs, and expenses (including legal fees on a full indemnity basis) arising from or in connection with: your or the Company's use of any Platform feature; any Content, Cap Table Announcement, Deal Room content, or Social Feature post; any misrepresentation to any investor or shareholder; any regulatory action arising from your fundraising activities; any data protection breach arising from Company Content; any breach of this Agreement or the Master Legal Documents; or any third-party claim relating to personal data submitted without lawful authority.
                                    </p>

                                    {/* Section 21: Suspension and Termination */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>21. Suspension and Termination</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        We may suspend or terminate a Company's access at any time without prior notice if we reasonably believe the Company account has been used in breach of this Agreement, the Master Legal Documents, or applicable law; if the applicable subscription is not maintained; or if we are required to do so by law or regulatory directive. You may deactivate a Company account by contacting <a href="mailto:trust@capavate.com" style={{ color: '#CC0000' }}>trust@capavate.com</a>. Termination of a Company account does not terminate your personal Founder account (Stage 1). Clauses 7.5, 13, 19, 20, and 22 survive termination.
                                    </p>

                                    {/* Section 22: Governing Law and Dispute Resolution */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>22. Governing Law and Dispute Resolution</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        This Agreement is governed by the laws of the Hong Kong Special Administrative Region. Disputes shall first be subject to a 30-day good-faith negotiation period. If unresolved, disputes shall be finally resolved by binding arbitration administered by the Hong Kong International Arbitration Centre (HKIAC), seated in Hong Kong, conducted in English, before a single arbitrator under the HKIAC Administered Arbitration Rules. Capavate reserves the right to seek urgent injunctive or other equitable relief in any court of competent jurisdiction worldwide.
                                    </p>

                                    {/* Section 23: Contact */}
                                    <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>23. Contact</h2>
                                    <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                        Legal: <a href="mailto:legal@capavate.com" style={{ color: '#CC0000' }}>legal@capavate.com</a> · Privacy: <a href="mailto:privacy@capavate.com" style={{ color: '#CC0000' }}>privacy@capavate.com</a> · Trust &amp; Safety: <a href="mailto:trust@capavate.com" style={{ color: '#CC0000' }}>trust@capavate.com</a>
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
                                            <strong>By checking the box and clicking the button below, you confirm:</strong> (i) you have authority to bind the Company to this Agreement and the Master Legal Documents; (ii) all Company information submitted is accurate and complete; (iii) you accept this Agreement concurrently with your Stage 1 Platform Registration Agreement and all Master Legal Documents as a single binding set of obligations; (iv) you understand that Capavate is a technology platform — not a regulated financial adviser, placement agent, or AML-regulated entity — and that compliance with securities, AML, and financial promotion law is solely your and the Company's responsibility; and (v) Blueprint Catalyst Limited, Capavate, and all affiliates are fully indemnified by you and the Company as described in Clause 20.
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
                                                id="companyAgreementConfirm"
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
                                                htmlFor="companyAgreementConfirm"
                                                style={{
                                                    cursor: 'pointer',
                                                    fontSize: '0.95rem',
                                                    color: '#212529',
                                                    lineHeight: '1.5'
                                                }}
                                            >
                                                <strong>I have read, understood, and agree to the Founder Company Registration Agreement and all incorporated Master Legal Documents, and I confirm I am authorised to register this Company on the Platform.</strong>
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
                                    onClick={handleAccept}
                                    style={{
                                        padding: '12px 32px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: isChecked ? 'linear-gradient(135deg, #CC0000 0%, #A00000 100%)' : '#CC0000',
                                        color: '#fff',
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        cursor: isChecked ? 'pointer' : 'not-allowed',
                                        opacity: isChecked ? 1 : 0.5,
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        boxShadow: isChecked ? '0 4px 12px rgba(204, 0, 0, 0.3)' : 'none'
                                    }}
                                    disabled={!isChecked}
                                    onMouseEnter={(e) => {
                                        if (isChecked) {
                                            e.target.style.background = 'linear-gradient(135deg, #A00000 0%, #8B0000 100%)';
                                            e.target.style.transform = 'translateY(-1px)';
                                            e.target.style.boxShadow = '0 6px 16px rgba(204, 0, 0, 0.4)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (isChecked) {
                                            e.target.style.background = 'linear-gradient(135deg, #CC0000 0%, #A00000 100%)';
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = '0 4px 12px rgba(204, 0, 0, 0.3)';
                                        }
                                    }}
                                >
                                    <CheckCircle size={18} />
                                    I Agree — Register This Company
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