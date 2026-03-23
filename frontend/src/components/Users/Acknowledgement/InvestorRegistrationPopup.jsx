// components/InvestorRegistrationPopup.js
import React, { useState } from 'react';
import { CircleX, AlertCircle, CheckCircle, Shield } from 'lucide-react';

export default function InvestorRegistrationPopup({
    show,
    onClose,
    onAccept,
    userName = "Investor"
}) {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [messageAll, setmessageAll] = useState("");
    const [errr, seterrr] = useState(false);

    const handleAccept = async () => {
        if (!isChecked1 || !isChecked2 || !isChecked3) {
            setError('Please confirm all checkboxes to proceed');
            return;
        }
        setError('');
        setIsSubmitting(true);

        try {
            const response = await onAccept();

            if (response && response.status === "1") {
                seterrr(false);
                setmessageAll("Investor agreement accepted successfully!");
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

    const Section = ({ number, title, children }) => (
        <>
            <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#041e42', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '24px', marginBottom: '10px', paddingBottom: '5px', borderBottom: '1px solid rgba(4,30,66,0.08)' }}>
                {number}. {title}
            </h2>
            {children}
        </>
    );

    return (
        <>
            <div className="modal fade show" style={{
                display: 'block',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                zIndex: 1050
            }}>
                {messageAll && (
                    <div className={`shadow-lg ${errr ? "error_pop" : "success_pop"}`} style={{
                        position: 'fixed', top: '20px', right: '20px', zIndex: 9999,
                        padding: '15px 20px', borderRadius: '8px',
                        backgroundColor: errr ? '#f8d7da' : '#d4edda',
                        color: errr ? '#721c24' : '#155724',
                        border: `1px solid ${errr ? '#f5c6cb' : '#c3e6cb'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: '300px'
                    }}>
                        <span>{messageAll}</span>
                        <button onClick={() => setmessageAll("")} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
                    </div>
                )}
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content" style={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }}>
                        {/* Header */}
                        <div style={{ background: 'linear-gradient(135deg, rgb(26, 28, 46) 0%, rgb(219 74, 67) 100%)', padding: '24px 32px', borderBottom: '1px solid rgb(26, 28, 46)' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{ width: '48px', height: '48px', background: 'rgba(204, 0, 0, 0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Shield size={28} color="#CC0000" />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', color: '#fff' }}>Investor Access Agreement</h4>
                                        <p style={{ color: 'rgba(255,255,255,0.7)', margin: '4px 0 0 0', fontSize: '0.95rem' }}>Investor Registration</p>
                                    </div>
                                </div>
                                <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '10px' }}>
                                    <CircleX size={20} color="#fff" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: '32px', maxHeight: '70vh', overflowY: 'auto' }}>
                            {/* Last updated */}
                            <div style={{ marginBottom: '24px', padding: '12px 16px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                                <p style={{ margin: 0, fontSize: '13px', color: '#6c757d' }}>Last updated: 17 March 2026 · Blueprint Catalyst Limited · Incorporated in Hong Kong SAR</p>
                            </div>

                            {/* Intro card */}
                            <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', borderLeft: '4px solid #CC0000' }}>
                                <p style={{ margin: 0, color: '#495057', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    You have been invited to register on Capavate by a company through its Investor CRM. This Agreement governs your access as an Investor to company profiles, funding round information, cap table data, Deal Rooms, Social Features, Angel Network content, and all other Capavate services. You must accept before accessing any company information, investment materials, or any other Platform content.
                                </p>
                                <p style={{ margin: '12px 0 0 0', color: '#495057', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    By accepting, you enter into a legally binding agreement with <strong>Blueprint Catalyst Limited</strong> (trading as <strong>Capavate</strong>), incorporated in Hong Kong SAR. All Master Legal Documents at <a href="http://localhost:5000/privacy-policy" target="_blank" style={{ color: '#CC0000' }}>capavate.com/legal</a> are incorporated into this Agreement in their entirety.
                                </p>
                            </div>

                            <div style={{ border: '1px solid #e9ecef', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
                                <div style={{ background: '#f8f9fa', padding: '16px 24px', borderBottom: '1px solid #e9ecef', borderLeft: '4px solid #CC0000' }}>
                                    <h5 style={{ margin: 0, fontWeight: '700', fontSize: '1.1rem', color: '#212529' }}>Investor Access Agreement</h5>
                                </div>

                                <div style={{ padding: '24px' }}>
                                    {/* Section 1: Definitions */}
                                    <Section number="1" title="Definitions">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            <strong>"Capavate" / "we" / "us" / "our"</strong> means Blueprint Catalyst Limited, incorporated in Hong Kong SAR, and its officers, directors, employees, agents, licensors, successors, and assigns. <strong>"You" / "Investor"</strong> means the individual or entity accepting this Agreement. <strong>"Platform"</strong> means capavate.com, app.capavate.com, all APIs, and all associated services and functionality. <strong>"Master Legal Documents"</strong> means collectively the Privacy Policy, Terms of Service, Acceptable Use Policy, Cookie Policy, and Disclaimer at capavate.com/legal. <strong>"Company Content"</strong> means company profiles, cap table information, funding round details, Deal Room materials, pitch materials, shareholder announcements, financial projections, Social Feature posts, and all other information made available to you through the Platform by any company Member. <strong>"Social Features"</strong> means the Capavate Angel Network, Equity Social Network, Entrepreneur Academy, community forums, deal rooms, profile pages, message threads, group communications, syndicate communications, and all other areas through which Content may be posted or shared. <strong>"Industry Partners"</strong> means professional services firms, advisers, accelerators, and other entities who have entered into a Partner Agreement with Blueprint Catalyst Limited.
                                        </p>
                                    </Section>

                                    {/* Section 2: Binding Agreement */}
                                    <Section number="2" title="Binding Agreement and Entire Agreement">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            By accepting, you enter into a binding agreement with Blueprint Catalyst Limited governed by this Agreement and the Master Legal Documents. This Agreement, the Master Legal Documents, and any applicable supplementary terms constitute the entire agreement between you and Blueprint Catalyst Limited. In any conflict between this Agreement and the Master Legal Documents, the Master Legal Documents shall prevail. You confirm you have read and had a reasonable opportunity to review all Master Legal Documents.
                                        </p>
                                    </Section>

                                    {/* Section 3: Investor Eligibility */}
                                    <Section number="3" title="Investor Eligibility — Mandatory Self-Certification">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Access to Capavate is restricted to persons who qualify as Accredited Investors, Professional Investors, Sophisticated Investors, or equivalent under the laws of their jurisdiction of residence. By accepting, you represent, warrant, and confirm, on a continuing basis, that:
                                        </p>
                                        <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you meet the applicable investor eligibility standard in your jurisdiction, including (illustratively and not exhaustively): Hong Kong — "Professional Investor" under Schedule 1 to the Securities and Futures Ordinance (Cap. 571) and SFC guidelines; UK — "High Net Worth Individual" or "Self-Certified Sophisticated Investor" under the Financial Services and Markets Act 2000 (Financial Promotion) Order 2005; USA — "Accredited Investor" under Rule 501 of Regulation D, Securities Act 1933; EU — "Professional Client" or "Eligible Counterparty" under MiFID II (Directive 2014/65/EU) and national implementing legislation; Australia — "Wholesale Client" under the Corporations Act 2001; Singapore — "Accredited Investor" under the Securities and Futures Act 2001; and equivalent in all other jurisdictions;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you have independently verified your eligibility and will maintain compliance with the applicable eligibility standard throughout your use of the Platform;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will notify Capavate immediately at <a href="mailto:trust@capavate.com" style={{ color: '#CC0000' }}>trust@capavate.com</a> if you cease to meet the applicable standard at any time;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Capavate relies entirely on your self-certification — it does not conduct KYC, AML, or investor eligibility verification and accepts no liability whatsoever for any consequences arising from any misrepresentation of your eligibility status;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you have sufficient financial knowledge, experience, and sophistication to evaluate investment opportunities independently and to understand and bear the risks associated with private company investing;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>it is your sole responsibility to ensure that your use of the Platform and any investment activity arising from connections on the Platform comply with all applicable laws, regulations, and tax obligations in every jurisdiction applicable to you.</li>
                                        </ul>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Capavate reserves the right to refuse or revoke access to any person who does not, in its sole judgment, satisfy the applicable eligibility requirements. Misrepresentation of eligibility is a material breach and may result in immediate account termination, referral to regulatory authorities, and civil or criminal liability. Blueprint Catalyst Limited, Capavate, and all affiliates are fully indemnified by you for all losses arising from any misrepresentation of your eligibility.
                                        </p>
                                    </Section>

                                    {/* Section 4: No Investment Advice */}
                                    <Section number="4" title="No Investment Advice — Complete Disclaimer">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            The Capavate Platform is an information-sharing and networking technology. Nothing on the Platform — including Company Content, Deal Room materials, Angel Network posts, M&A intelligence data, Entrepreneur Academy content, Industry Partner content, AI-assisted features, community discussions, or any other communication — constitutes, or should be construed as:
                                        </p>
                                        <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>financial advice, investment advice, securities advice, tax advice, accounting advice, legal advice, or any other professional or regulated advice of any kind;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>a recommendation, endorsement, or solicitation to invest in or divest from any company, security, financial instrument, or asset;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>a prospectus, private placement memorandum, offering circular, or regulated investment communication;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>a guarantee, representation, or warranty as to the accuracy, completeness, or fitness for purpose of any Company Content.</li>
                                        </ul>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Capavate is not authorised or regulated by the Securities and Futures Commission of Hong Kong (SFC), the UK Financial Conduct Authority (FCA), the US Securities and Exchange Commission (SEC), the Monetary Authority of Singapore (MAS), the Australian Securities and Investments Commission (ASIC), or any equivalent regulatory authority in any jurisdiction, as a financial adviser, investment manager, portfolio manager, placement agent, or broker-dealer. Where an Industry Partner holds applicable regulatory authorisation, any advice provided by that partner is provided solely by that partner in its own capacity — not by Capavate.
                                        </p>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            All investment decisions are made solely at your own risk. You must conduct your own independent due diligence on any opportunity and, where appropriate, seek advice from a suitably qualified and authorised financial adviser before committing any capital.
                                        </p>
                                    </Section>

                                    {/* Section 5: Investment Risk Warning */}
                                    <Section number="5" title="Investment Risk Warning">
                                        <div style={{ background: '#fff5f5', borderRadius: '12px', padding: '16px', marginBottom: '10px', border: '1px solid #ffe0e0' }}>
                                            <p style={{ fontSize: '14px', color: '#CC0000', lineHeight: '1.85', marginBottom: '0' }}>
                                                <strong>Important Risk Warning — Please Read Carefully.</strong> Investing in early-stage, growth-stage, and private companies involves a <strong>high degree of risk, including the risk of total and permanent loss of all capital invested</strong>. Private company investments are illiquid and there is no secondary market — there is no guarantee you will be able to sell, transfer, or exit your investment or realise any financial return. Past performance of any company, fund, or investment discussed on or connected to the Platform provides no guarantee of future results. Valuations of private companies are inherently speculative, uncertain, and unverified by Capavate. Cap table data and financial projections on the Platform are submitted by Founders and have not been independently audited or verified. You should not invest any amount that you cannot afford to lose in its entirety. You must obtain your own independent professional advice before making any investment decision.
                                            </p>
                                        </div>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            By accepting this Agreement, you confirm that you have read, understood, and accept this risk warning in full, and that you have sufficient financial resources and sophistication to bear the financial consequences of any investment you make.
                                        </p>
                                    </Section>

                                    {/* Section 6: No Securities Offer */}
                                    <Section number="6" title="No Securities Offer, Solicitation, or Regulated Communication">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Nothing on the Platform constitutes a public offer of securities, an authorised financial promotion, a private placement memorandum, a prospectus, an offering document, or any other document or communication regulated under applicable securities or financial services law in any jurisdiction. Any investment transaction you enter into as a result of connections or information accessed through the Platform will be governed exclusively by separate definitive legal agreements between you and the relevant company. Capavate is not a party to any such transaction, does not act as intermediary, agent, broker, placement agent, arranger, custodian, or AML-regulated entity in connection with any investment transaction, and accepts no liability for the legal, regulatory, or tax compliance of any transaction.
                                        </p>
                                    </Section>

                                    {/* Section 7: Your Investor Profile */}
                                    <Section number="7" title="Your Investor Profile — Obligations, Accuracy, and Integrity">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Your investor profile is visible to other verified Capavate Members and forms the basis upon which Founders and other Members may choose to engage with you. You are solely responsible for all information in your profile and bear full legal responsibility for it. You agree that:
                                        </p>
                                        <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>all profile information — including your name, professional title, fund or firm affiliation, investment focus, investor status, credentials, and all other self-described attributes — is and will remain accurate, complete, and not misleading at all times;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will promptly update your profile following any material change, including change of firm, change of investor eligibility status, change of regulatory authorisation, or any other change that would materially affect how other Members might rely upon your profile;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not impersonate any other person, company, fund, investment vehicle, or regulatory body;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not claim professional credentials, qualifications, regulatory authorisations, or investor status that you do not hold;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not represent yourself as an Accredited Investor, Professional Investor, or equivalent when you do not meet the applicable standard in your jurisdiction;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not use your profile to conduct activities outside the scope of your investor status;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will disclose any material commercial interest in any company, deal, or opportunity in connection with which you post content or make connections through the Platform.</li>
                                        </ul>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Capavate does not independently verify profile information and accepts no liability for harm to any party arising from reliance on your profile information. You are solely and fully liable for all consequences arising from inaccurate, misleading, or false profile information. Blueprint Catalyst Limited, Capavate, and all affiliates are fully indemnified by you for all losses arising from any profile misrepresentation.
                                        </p>
                                    </Section>

                                    {/* Section 8: Account Security */}
                                    <Section number="8" title="Account Security and Responsibilities">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            You agree to: maintain the confidentiality of your login credentials and not share access with any other person; not create multiple accounts without prior written consent from Capavate; notify us immediately at <a href="mailto:trust@capavate.com" style={{ color: '#CC0000' }}>trust@capavate.com</a> of any actual or suspected unauthorised access; and accept full responsibility for all activity conducted under your account. Where you register on behalf of a fund, family office, or other entity, you represent that you have authority to bind that entity and that all such entity's activities through your account remain your personal responsibility.
                                        </p>
                                    </Section>

                                    {/* Section 9: Confidentiality */}
                                    <Section number="9" title="Confidentiality of Company Information">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Company Content made available to you through the Platform — including Deal Room materials, cap table information, financial data, projections, valuations, deal terms, and shareholder communications — is commercially sensitive and confidential. You agree that:
                                        </p>
                                        <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will treat all Company Content as strictly confidential and will not disclose, share, copy, distribute, or use it for any purpose other than evaluating the relevant investment opportunity or managing an existing investment relationship;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not disclose Company Content to any third party without the prior written consent of the relevant company;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not use Company Content to compete with, harm, or disadvantage any company or to benefit any third party at the expense of any company;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you will not use material non-public information accessed through the Platform to trade in any publicly listed securities, or to make any other market transaction that may constitute insider trading or market abuse under applicable law;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>these obligations apply for as long as the information remains non-public and survive termination of your account indefinitely in respect of trade secrets, and for five (5) years otherwise.</li>
                                        </ul>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Capavate is not a party to any confidentiality arrangement between you and any company and bears no responsibility for monitoring, enforcing, or being bound by any such arrangement.
                                        </p>
                                    </Section>

                                    {/* Section 10: Social Features */}
                                    <Section number="10" title="Social Features — Your Responsibilities and Capavate's Exclusions">
                                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>10.1 Capavate as Passive Intermediary</h3>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Capavate acts exclusively as a passive technical intermediary and neutral communications conduit in respect of all Content posted through Social Features. Capavate does not pre-screen, verify, endorse, or take editorial responsibility for any user-generated Content — including Content posted by Founders, other Investors, Industry Partners, or any other Member. The absence of moderation does not constitute approval. All Content posted by other Members is their sole responsibility — Capavate expressly disclaims all liability for it.
                                        </p>

                                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>10.2 Your Content Is Solely Your Responsibility</h3>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            All Content you post through any Social Feature of the Platform — including the Angel Network, Equity Social Network, community forums, profile updates, message threads, deal room contributions, and any other area — is your sole and exclusive legal responsibility. Every time you post Content, you represent and warrant that:
                                        </p>
                                        <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the Content is accurate and not misleading in any material respect;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the Content does not constitute an unauthorised financial promotion, investment solicitation, or securities offering in any jurisdiction;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the Content does not disclose material non-public or price-sensitive information in breach of applicable insider dealing, tipping, or market abuse law;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the Content does not infringe any third-party intellectual property, privacy, defamation, or other rights;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the Content does not include personal data of identifiable individuals without lawful basis and appropriate consent;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the Content complies with the Acceptable Use Policy and all applicable law in every jurisdiction in which it may be received.</li>
                                        </ul>

                                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>10.3 Angel Network Participation</h3>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            The Capavate Angel Network enables Investors to share deal flow, co-investment opportunities, portfolio updates, and market commentary. Your participation is entirely at your own risk. You are solely responsible for ensuring that all Angel Network Content you post: complies with all applicable securities laws and financial promotion regulations globally; does not constitute an unauthorised regulated communication; does not disclose any inside information or breach any market abuse prohibition; and is not defamatory or otherwise harmful to any person. Capavate accepts no liability for any Angel Network Content and makes no representation as to the quality, legality, or accuracy of any opportunity shared through the Angel Network. Co-investment or syndicate arrangements arising from Angel Network introductions are entirely between the participating parties — Capavate is not a party and bears no liability for any transaction, dispute, or regulatory consequence.
                                        </p>

                                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>10.4 Global Reach of Content</h3>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Content you post through any Social Feature may be accessible to a global audience and may be further disseminated beyond the Platform beyond your control. You are solely responsible for ensuring your Content is lawful in every jurisdiction in which it may be received. Capavate accepts no liability for any regulatory consequence arising from the cross-border reach of your Content.
                                        </p>

                                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#041e42', marginTop: '12px', marginBottom: '6px' }}>10.5 Content Indemnification</h3>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            You agree to fully and promptly indemnify, defend, and hold harmless Blueprint Catalyst Limited, its affiliates, officers, directors, employees, agents, Industry Partners, and service providers from and against all claims, demands, proceedings, losses, liabilities, damages, fines, penalties, costs, and expenses (including legal fees on a full indemnity basis) arising from or in connection with: any Content you post through any Social Feature; any misrepresentation in your profile; any breach of your confidentiality obligations; any regulatory action arising from your investment activities or communications on the Platform; any personal data you submitted without lawful authority; or any breach of this Agreement or the Master Legal Documents.
                                        </p>
                                    </Section>

                                    {/* Section 11: Company Content */}
                                    <Section number="11" title="Company Content — No Verification, No Liability">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Capavate does not verify, audit, endorse, or take any responsibility for the accuracy, completeness, or legal compliance of any Company Content. All Company Content is provided solely by the relevant Founder or company representative. In particular:
                                        </p>
                                        <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Capavate makes no representation that any financial projection, valuation, deal term, cap table data, or other Company Content is accurate, complete, or suitable as a basis for investment decisions;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Capavate is not responsible for any inaccuracy, omission, or misrepresentation in any Company Content — all such responsibility rests with the Founder or company representative who submitted it;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Capavate accepts no liability for any investment loss or financial damage arising from any decision made in reliance on Company Content;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Capavate accepts no liability for any Cap Table Announcement — including any announcement that is false, misleading, or in breach of any disclosure obligation — all liability rests with the company that posted it;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>the presence of any company or opportunity on the Platform does not constitute an endorsement, recommendation, or validation by Capavate of that company, opportunity, or the information associated with it.</li>
                                        </ul>
                                    </Section>

                                    {/* Section 12: AI-Assisted Features */}
                                    <Section number="12" title="AI-Assisted Features">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            The Platform may include AI-assisted features such as connection recommendations, trust scoring, and AI-assisted tools. You acknowledge that: AI-generated outputs, recommendations, and analyses are for informational purposes only and do not constitute investment advice or professional recommendations; AI outputs may contain errors, inaccuracies, or omissions; you should not rely on AI outputs as the sole or primary basis for any investment or business decision; and Capavate accepts no liability for the accuracy or consequences of any AI-generated output.
                                        </p>
                                    </Section>

                                    {/* Section 13: Industry Partners */}
                                    <Section number="13" title="Industry Partners — No Endorsement or Liability">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Industry Partners who provide services through or alongside the Platform do so independently and under their own terms. Capavate does not verify, endorse, or guarantee the quality, accuracy, legality, or regulatory compliance of any Industry Partner's services, advice, or content. Any engagement with an Industry Partner is entirely at your own risk. Capavate accepts no liability for any advice, service, or conduct of any Industry Partner.
                                        </p>
                                    </Section>

                                    {/* Section 14: Privacy */}
                                    <Section number="14" title="Privacy and Your Personal Data">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            By registering, you acknowledge and consent to the collection, processing, storage, and use of your personal data as described in the <a href="#" style={{ color: '#CC0000' }}>Privacy Policy</a>. Key acknowledgements:
                                        </p>
                                        <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>Your personal data is processed by Blueprint Catalyst Limited (Hong Kong) under the PDPO (Cap. 486), EU GDPR, and UK GDPR as a global baseline;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>your investor profile — including professional background, investment interests, and network connections — is visible to other verified Capavate Members as described in Privacy Policy Section 7A;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>your activity may be subject to automated processing and AI-assisted features including connection recommendations and trust scoring (Privacy Policy Section 7B); you have the right to object to certain automated processing;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>international transfers of your personal data are subject to appropriate safeguards (Privacy Policy Section 8);</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you have data subject rights including access, correction, erasure, restriction, portability, and objection — exercise these at <a href="mailto:privacy@capavate.com" style={{ color: '#CC0000' }}>privacy@capavate.com</a>;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>you have the right to lodge a complaint with your applicable data protection supervisory authority.</li>
                                        </ul>
                                    </Section>

                                    {/* Section 15: Acceptable Use */}
                                    <Section number="15" title="Acceptable Use">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            You agree to use the Platform at all times in strict compliance with the Acceptable Use Policy Prohibited conduct includes: misrepresentation and fraud; securities law violations; financial crime; spam and data misuse; harmful or offensive Content; profile integrity violations; AI and automated tool misuse; platform and API abuse; and conflicts of interest. Breach is a material breach of this Agreement. Capavate reserves the right to take immediate enforcement action — including account suspension, termination, content removal, and referral to regulatory and law enforcement authorities — without prior notice.
                                        </p>
                                    </Section>

                                    {/* Section 16: Platform Availability */}
                                    <Section number="16" title="Platform Availability and Changes">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            The Platform and all services are provided on an "as is" and "as available" basis without warranty of any kind. Capavate does not guarantee uninterrupted or error-free access. We reserve the right to modify, suspend, add, or remove any service, feature, or access right at any time with or without notice. We accept no liability for any interruption, suspension, or discontinuation of any service or feature.
                                        </p>
                                    </Section>

                                    {/* Section 17: Intellectual Property */}
                                    <Section number="17" title="Intellectual Property">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            All intellectual property rights in the Platform — including design, software, code, databases, trademarks, and logos — are the exclusive property of Blueprint Catalyst Limited. Nothing in this Agreement grants you any rights beyond the limited personal licence to access and use the Platform for your own lawful purposes as an Investor.
                                        </p>
                                    </Section>

                                    {/* Section 18: Disclaimer of Warranties */}
                                    <Section number="18" title="Disclaimer of Warranties">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            To the maximum extent permitted by applicable law, the Platform and all services are provided without warranties of any kind, whether express, implied, statutory, or otherwise. Capavate does not warrant the accuracy, completeness, reliability, or suitability of any content on the Platform, including Company Content, Angel Network content, AI outputs, or Industry Partner content.
                                        </p>
                                    </Section>

                                    {/* Section 19: Limitation of Liability */}
                                    <Section number="19" title="Limitation of Liability">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            To the maximum extent permitted by applicable law, Blueprint Catalyst Limited, its affiliates, officers, directors, employees, agents, Industry Partners, and licensors shall not be liable for:
                                        </p>
                                        <ul style={{ marginLeft: '20px', marginBottom: '10px' }}>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any investment loss or financial damage arising from any investment decision you make in reliance on any Platform content, Company Content, Angel Network content, AI output, or Industry Partner content;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any inaccuracy, omission, or misrepresentation in any Company Content — all such responsibility rests with the relevant Founder or company;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any breach of securities law, AML requirements, or other regulatory obligation arising from your investment activities;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any harm arising from another Member's content posted through any Social Feature;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any AI-generated output, recommendation, or analysis;</li>
                                            <li style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '5px' }}>any indirect, incidental, special, consequential, punitive, or exemplary damages of any kind.</li>
                                        </ul>
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Our total aggregate liability to you under or in connection with this Agreement shall not exceed the greater of: (a) the fees you have paid to Capavate in the twelve (12) months preceding the claim; or (b) USD $100 or local equivalent. Nothing limits liability for fraud, gross negligence, or any liability that cannot be excluded by applicable law.
                                        </p>
                                    </Section>

                                    {/* Section 20: Suspension and Termination */}
                                    <Section number="20" title="Suspension and Termination">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            We may suspend or terminate your account without prior notice if you breach this Agreement, the Master Legal Documents, or applicable law; if you cease to satisfy the eligibility criteria in Clause 3; if we are required to do so by law or regulatory directive; or if we reasonably suspect fraudulent, abusive, or illegal activity. Upon termination, all access ceases immediately. Clauses 9 (Confidentiality), 10.5 (Indemnification), 14 (Privacy), 19 (Liability), and 21 (Governing Law) survive termination. You may close your account by contacting <a href="mailto:trust@capavate.com" style={{ color: '#CC0000' }}>trust@capavate.com</a>.
                                        </p>
                                    </Section>

                                    {/* Section 21: Governing Law */}
                                    <Section number="21" title="Governing Law and Dispute Resolution">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            This Agreement is governed by the laws of the Hong Kong Special Administrative Region. The parties shall first attempt in good faith to resolve any dispute by negotiation for thirty (30) days. If unresolved, disputes shall be finally resolved by binding arbitration administered by the Hong Kong International Arbitration Centre (HKIAC) under its Administered Arbitration Rules, seated in Hong Kong, conducted in English, before a single arbitrator. Capavate reserves the right to seek urgent injunctive or other equitable relief in any court of competent jurisdiction worldwide. EU consumer residents may also benefit from mandatory consumer protection provisions in their Member State.
                                        </p>
                                    </Section>

                                    {/* Section 22: Severability */}
                                    <Section number="22" title="Severability, Waiver, and Assignment">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            If any provision of this Agreement is found invalid or unenforceable, the remaining provisions continue in full force. No failure by Capavate to enforce any right constitutes a waiver. Capavate may assign its rights and obligations without consent in connection with a merger, acquisition, or reorganisation. You may not assign your rights without prior written consent.
                                        </p>
                                    </Section>

                                    {/* Section 23: Modifications */}
                                    <Section number="23" title="Modifications">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            We may update this Agreement at any time. For material changes, we will provide at least 30 days' advance notice. Continued use after the effective date constitutes acceptance.
                                        </p>
                                    </Section>

                                    {/* Section 24: Contact */}
                                    <Section number="24" title="Contact">
                                        <p style={{ fontSize: '14px', color: 'rgba(4,30,66,0.75)', lineHeight: '1.85', marginBottom: '10px' }}>
                                            Legal: <a href="mailto:legal@capavate.com" style={{ color: '#CC0000' }}>legal@capavate.com</a> &nbsp;·&nbsp; Privacy: <a href="mailto:privacy@capavate.com" style={{ color: '#CC0000' }}>privacy@capavate.com</a> &nbsp;·&nbsp; Trust &amp; Safety: <a href="mailto:trust@capavate.com" style={{ color: '#CC0000' }}>trust@capavate.com</a>
                                        </p>
                                    </Section>

                                    {/* Final Confirmation Summary */}
                                    <div style={{ background: '#fff5f5', borderRadius: '12px', padding: '20px', marginTop: '24px', border: '1px solid #ffe0e0' }}>
                                        <p style={{ margin: 0, fontSize: '0.95rem', color: '#CC0000', lineHeight: '1.6' }}>
                                            <strong>By checking all boxes and clicking the button below, you confirm:</strong> (i) you have read and understood this Agreement and all Master Legal Documents; (ii) you satisfy the Accredited Investor or equivalent eligibility criteria in your jurisdiction and accept sole responsibility for this self-certification; (iii) you accept this Agreement, the Terms of Service, Privacy Policy, Acceptable Use Policy, Cookie Policy, and Disclaimer as a single set of binding obligations; (iv) you understand that the Platform does not provide investment advice, that all investment decisions are made solely at your own risk, and that private company investments involve a high risk of total loss of capital; and (v) where acting on behalf of a fund, family office, or other entity, you have authority to bind that entity and all its activities remain your personal responsibility.
                                        </p>
                                    </div>

                                    {/* Checkboxes */}
                                    <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '20px', marginTop: '24px', border: error && !isChecked1 ? '1px solid #CC0000' : '1px solid #e9ecef' }}>
                                        <input type="checkbox" id="investorAgreementConfirm" checked={isChecked1} onChange={(e) => { setIsChecked1(e.target.checked); if (e.target.checked) setError(''); }} style={{ marginRight: '12px' }} />
                                        <label htmlFor="investorAgreementConfirm" style={{ fontSize: '0.95rem' }}>
                                            <strong>I have read, understood, and agree to the Investor Access Agreement and all incorporated Master Legal Documents.</strong>
                                        </label>
                                    </div>

                                    <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '20px', marginTop: '16px', border: error && !isChecked2 ? '1px solid #CC0000' : '1px solid #e9ecef' }}>
                                        <input type="checkbox" id="investorEligibilityConfirm" checked={isChecked2} onChange={(e) => { setIsChecked2(e.target.checked); if (e.target.checked) setError(''); }} style={{ marginRight: '12px' }} />
                                        <label htmlFor="investorEligibilityConfirm" style={{ fontSize: '0.95rem' }}>
                                            <strong>I confirm that I qualify as an Accredited Investor, Professional Investor, or equivalent under the laws applicable in my jurisdiction, and I accept sole responsibility for this self-certification. I will notify Capavate immediately if I cease to qualify.</strong>
                                        </label>
                                    </div>

                                    <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '20px', marginTop: '16px', border: error && !isChecked3 ? '1px solid #CC0000' : '1px solid #e9ecef' }}>
                                        <input type="checkbox" id="investorRiskConfirm" checked={isChecked3} onChange={(e) => { setIsChecked3(e.target.checked); if (e.target.checked) setError(''); }} style={{ marginRight: '12px' }} />
                                        <label htmlFor="investorRiskConfirm" style={{ fontSize: '0.95rem' }}>
                                            <strong>I have read and fully understood the Investment Risk Warning in Clause 5. I acknowledge that investing in private companies involves a high risk of total and permanent loss of capital, that I have conducted or will conduct my own independent due diligence before committing any capital, and that Capavate provides no investment advice or verification of any Company Content.</strong>
                                        </label>
                                    </div>

                                    {error && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', color: '#CC0000' }}>
                                            <AlertCircle size={16} />
                                            <span>{error}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer buttons */}
                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '16px' }}>
                                <button onClick={onClose} style={{ padding: '12px 28px', borderRadius: '10px', border: '1px solid #dee2e6', background: '#fff' }}>Cancel</button>
                                <button onClick={handleAccept} disabled={!isChecked1 || !isChecked2 || !isChecked3 || isSubmitting} style={{ padding: '12px 32px', borderRadius: '10px', border: 'none', background: (isChecked1 && isChecked2 && isChecked3 && !isSubmitting) ? 'linear-gradient(135deg, #CC0000 0%, #A00000 100%)' : '#CC0000', color: '#fff', opacity: (isChecked1 && isChecked2 && isChecked3 && !isSubmitting) ? 1 : 0.5 }}>
                                    {isSubmitting ? "Submitting..." : <>I Agree — Activate My Investor Account</>}
                                </button>
                            </div>

                            {/* Footer copyright */}
                            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e9ecef', textAlign: 'center' }}>
                                <p style={{ fontSize: '11px', color: '#6c757d', margin: 0 }}>© {new Date().getFullYear()} Capavate &nbsp;·&nbsp; Blueprint Catalyst Limited. Incorporated in Hong Kong SAR. All rights reserved.</p>
                                <p style={{ fontSize: '11px', color: '#6c757d', margin: '8px 0 0 0' }}><a href="#" style={{ color: '#CC0000', textDecoration: 'none' }}>View full legal documents</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 1040 }} />
        </>
    );
}