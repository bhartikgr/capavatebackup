import React, { useState } from 'react';

const StrategicIntentSection = () => {
    // State for all strategic intent fields
    const [strategicData, setStrategicData] = useState({
        // Section 1 - Strategic Priorities
        strategic_priorities: [],
        interested_in: [],
        seeking_partners: [],
        not_consider: [],

        // Section 2 - Competitors
        competitors: [
            { name: '', url: '', reason: '' },
            { name: '', url: '', reason: '' },
            { name: '', url: '', reason: '' }
        ],

        // Section 3 - Corporate Governance
        board_of_directors: '',
        ongoing_disputes: '',
        regulatory_compliance: '',
        legal_representation: '',
        law_firm_name: '',
        legal_referral: '',
        legal_compliance_review: '',
        accounting_firm: '',
        accounting_firm_name: '',
        accounting_referral: '',
        audited_financials: '',
        saas_model: '',
        holds_ip: '',

        // Section 4 - Market, Customers, Contracts
        operating_geographies: [],
        customer_segments: [],
        exclusivity_clauses: '',
        dependence_risk: '',
        long_term_contracts: '',

        // Section 5 - Readiness
        readiness_reason: '',
        value_proposition: '',
        live_summary: ''
    });

    // Handle checkbox array fields
    const handleCheckboxArray = (field, value, checked) => {
        setStrategicData(prev => ({
            ...prev,
            [field]: checked ? [...prev[field], value] : prev[field].filter(v => v !== value)
        }));
    };

    // Handle competitor changes
    const handleCompetitorChange = (index, field, value) => {
        const updatedCompetitors = [...strategicData.competitors];
        updatedCompetitors[index][field] = value;
        setStrategicData(prev => ({
            ...prev,
            competitors: updatedCompetitors
        }));
    };

    // Handle radio button changes
    const handleRadioChange = (field, value) => {
        setStrategicData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle text input changes
    const handleTextChange = (field, value) => {
        setStrategicData(prev => ({
            ...prev,
            [field]: value
        }));
    };
    return (
        <div className="col-12 mt-4">
            <div className="d-flex flex-column gap-4">
                {/* Introduction */}
                <div className="d-flex flex-column gap-2 stratetext">
                    <label htmlFor="">
                        <h4>
                            Strategic Intent for JV's and M&A
                        </h4>
                    </label>
                    <p>
                        Determining whether a company is truly "ready" for a joint venture or acquisition requires more than financial performance alone—it reflects strategic alignment, operational
                        maturity, and a clear value narrative. Readiness means the company has robust governance, transparent reporting, and a defined growth story that can withstand the scrutiny of
                        sophisticated partners or acquirers. Engaging an experienced advisory firm with a proven track record, a deep network of qualified buyers and sellers, and an unwavering
                        commitment to integrity is essential. The right advisor not only positions your company effectively but also guides you through complex negotiations with confidence and trust,
                        ensuring every step maximizes long-term value creation.
                    </p>
                    <p>
                        Please complete the following section transparently to help assess your company's readiness for a joint venture or acquisition, and be sure to update it as your business evolves and pivots over time.
                    </p>
                    <p>
                        <b><i>
                            NOTE: These are NOT easy questions and will help you better define your strategic direction as you build your company.
                        </i></b>
                    </p>
                </div>

                {/* Live Summary Textarea */}
                <textarea
                    className="form-control"
                    rows="5"
                    placeholder="We need a VERY well-designed section of the answers from the forms below. Updated live, as the company fills/adjusts the inputs."
                    value={strategicData.live_summary}
                    onChange={(e) => handleTextChange('live_summary', e.target.value)}
                />
            </div>

            {/* SECTION 1 */}
            <div className="d-flex flex-column gap-4 mt-4">
                <div className="d-flex flex-column gap-2 stratetext">
                    <h4 className="mb-2">
                        <b>Strategic Intent for JV's and M&A</b>
                    </h4>
                    <h6>
                        <b>SECTION 1</b>
                    </h6>
                    <h6>Strategic Intent for JV's and M&A</h6>
                    <label className="label_fontWeight">What are your top 3 strategic priorities for the next 24 months?</label>
                </div>

                {/* Strategic Priorities Checkboxes */}
                <div className="checklistgrid">
                    {[
                        { value: "Market expansion (geographic or segment growth)", label: "Market expansion (geographic or segment growth)" },
                        { value: "Technology acquisition/product capabilities", label: "Technology acquisition/product capabilities" },
                        { value: "Vertical integration (upstream or downstream)", label: "Vertical integration (upstream or downstream)" },
                        { value: "Cost efficiencies/scale synergies", label: "Cost efficiencies/scale synergies" },
                        { value: "R&D and innovation", label: "R&D and innovation (including new product lines)" },
                        { value: "Talent acquisition / acqui-hire", label: "Talent acquisition / acqui-hire and leadership depth" },
                        { value: "Portfolio diversification", label: "Portfolio diversification/new revenue streams" },
                        { value: "Customer access/distribution", label: "Customer access/distribution partnerships and channels" },
                        { value: "Brand strengthening", label: "Brand strengthening and competitive positioning" },
                        { value: "Risk mitigation", label: "Risk mitigation/supply-chain resilience/regulatory positioning" },
                        { value: "Capital access/partial exit", label: "Capital access/balance-sheet optimization or partial exit for founders" }
                    ].map((item, idx) => (
                        <div className="form-check" key={idx}>
                            <input
                                className="form-check-input intent-check"
                                type="checkbox"
                                value={item.value}
                                id={`check${idx + 1}`}
                                checked={strategicData.strategic_priorities.includes(item.value)}
                                onChange={(e) => handleCheckboxArray('strategic_priorities', e.target.value, e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor={`check${idx + 1}`}>{item.label}</label>
                        </div>
                    ))}
                </div>

                {/* Actively Interested In */}
                <div className="d-flex flex-column gap-3">
                    <label className="label_fontWeight">Are you actively interested in:</label>
                    <div className="checklistgrid">
                        {[
                            { value: "JV partnerships", label: "JV partnerships" },
                            { value: "Minority strategic investment", label: "Minority strategic investment" },
                            { value: "Majority sale", label: "Majority sale" },
                            { value: "Full exit", label: "Full exit" },
                            { value: "Strategic acquisitions", label: "Strategic acquisitions" }
                        ].map((item, idx) => (
                            <div className="form-check" key={idx}>
                                <input
                                    className="form-check-input intent-check"
                                    type="checkbox"
                                    value={item.value}
                                    id={`areopt${idx + 1}`}
                                    checked={strategicData.interested_in.includes(item.value)}
                                    onChange={(e) => handleCheckboxArray('interested_in', e.target.value, e.target.checked)}
                                />
                                <label className="form-check-label w-100" htmlFor={`areopt${idx + 1}`}>{item.label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Types of Partners Seeking */}
                <div className="d-flex flex-column gap-3">
                    <label className="label_fontWeight">What types of partners are you seeking?</label>
                    <div className="checklistgrid">
                        {[
                            { value: "Distribution", label: "Distribution" },
                            { value: "Technology", label: "Technology" },
                            { value: "Manufacturing", label: "Manufacturing" },
                            { value: "Co‑development", label: "Co‑development" },
                            { value: "Capital", label: "Capital" },
                            { value: "Data‑sharing", label: "Data‑sharing" },
                            { value: "IP‑licensing", label: "IP‑licensing" },
                            { value: "R&D", label: "R&D" },
                            { value: "Business development", label: "Business development" }
                        ].map((item, idx) => (
                            <div className="form-check" key={idx}>
                                <input
                                    className="form-check-input intent-check"
                                    type="checkbox"
                                    value={item.value}
                                    id={`opt${idx + 1}`}
                                    checked={strategicData.seeking_partners.includes(item.value)}
                                    onChange={(e) => handleCheckboxArray('seeking_partners', e.target.value, e.target.checked)}
                                />
                                <label className="form-check-label w-100" htmlFor={`opt${idx + 1}`}>{item.label}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Not Consider Under Any Circumstances */}
                <div className="d-flex flex-column gap-3">
                    <label className="label_fontWeight">What would you not consider under any circumstances?</label>
                    <div className="checklistgrid">
                        {[
                            { value: "Explore all options", label: "We will explore all options" },
                            { value: "Sale of control", label: "Sale of control" },
                            { value: "Exclusivity", label: "Exclusivity" },
                            { value: "Licensing core IP", label: "Licensing core IP" }
                        ].map((item, idx) => (
                            <div className="form-check" key={idx}>
                                <input
                                    className="form-check-input intent-check"
                                    type="checkbox"
                                    value={item.value}
                                    id={`optPath${idx + 1}`}
                                    checked={strategicData.not_consider.includes(item.value)}
                                    onChange={(e) => handleCheckboxArray('not_consider', e.target.value, e.target.checked)}
                                />
                                <label className="form-check-label w-100" htmlFor={`optPath${idx + 1}`}>{item.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 2 - COMPETITORS */}
            <div className="d-flex flex-column gap-4 mt-4">
                <div className="d-flex flex-column gap-2 stratetext">
                    <h6><b>SECTION 2</b></h6>
                    <label className="label_fontWeight">Competition. Provide information on your top three direct competitors.</label>
                </div>

                <div id="competitor-section" className="d-flex flex-column gap-3">
                    {[0, 1, 2].map((idx) => (
                        <div className="competitor-card d-flex flex-column flex-sm-row gap-4" key={idx}>
                            <div className="flex-shrink-0">
                                <h6 className="competitor-label">Competitor {idx + 1}:</h6>
                            </div>
                            <div className="d-flex flex-column gap-2 flex-grow-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name of the company"
                                    value={strategicData.competitors[idx].name}
                                    onChange={(e) => handleCompetitorChange(idx, 'name', e.target.value)}
                                />
                                <input
                                    type="url"
                                    className="form-control"
                                    placeholder="URL of the company"
                                    value={strategicData.competitors[idx].url}
                                    onChange={(e) => handleCompetitorChange(idx, 'url', e.target.value)}
                                />
                                <textarea
                                    className="form-control"
                                    maxLength="400"
                                    placeholder="Why do you believe this is a competitor?"
                                    rows="4"
                                    value={strategicData.competitors[idx].reason}
                                    onChange={(e) => handleCompetitorChange(idx, 'reason', e.target.value)}
                                />
                                <span className="char-limit fs-6 fst-italic text-end">max 400 characters</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 3 - CORPORATE GOVERNANCE */}
            <div className="d-flex flex-column gap-3 mt-4">
                <div className="d-flex flex-column gap-2">
                    <h4 className="mb-2">
                        <b>Strategic Intent for JV's and M&A</b>
                    </h4>
                    <h6><b>SECTION 3</b></h6>
                    <h6>Corporate governance:</h6>

                    <div className="d-flex flex-column gap-2">
                        {/* Board of Directors */}
                        <div className="question-block d-flex flex-column gap-2">
                            <label className="question-text label_fontWeight">Do you have a formal Board of Directors or Advisory Board?</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="board"
                                    id="boardYes"
                                    value="YES"
                                    checked={strategicData.board_of_directors === 'YES'}
                                    onChange={(e) => handleRadioChange('board_of_directors', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="boardYes">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="board"
                                    id="boardNo"
                                    value="NO"
                                    checked={strategicData.board_of_directors === 'NO'}
                                    onChange={(e) => handleRadioChange('board_of_directors', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="boardNo">NO</label>
                            </div>
                        </div>

                        {/* Disputes */}
                        <div className="question-block d-flex flex-column gap-2">
                            <label className="question-text label_fontWeight">Are there any ongoing or threatened disputes, litigation, or regulatory investigations?</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="disputes"
                                    id="disputeYes"
                                    value="YES"
                                    checked={strategicData.ongoing_disputes === 'YES'}
                                    onChange={(e) => handleRadioChange('ongoing_disputes', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="disputeYes">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="disputes"
                                    id="disputeNo"
                                    value="NO"
                                    checked={strategicData.ongoing_disputes === 'NO'}
                                    onChange={(e) => handleRadioChange('ongoing_disputes', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="disputeNo">NO</label>
                            </div>
                        </div>

                        {/* Regulatory Compliance */}
                        <div className="question-block d-flex flex-column gap-2">
                            <label className="question-text label_fontWeight">Are you compliant with key regulations in your sector?</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="compliance"
                                    id="complianceYes"
                                    value="YES"
                                    checked={strategicData.regulatory_compliance === 'YES'}
                                    onChange={(e) => handleRadioChange('regulatory_compliance', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="complianceYes">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="compliance"
                                    id="complianceNo"
                                    value="NO"
                                    checked={strategicData.regulatory_compliance === 'NO'}
                                    onChange={(e) => handleRadioChange('regulatory_compliance', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="complianceNo">NO</label>
                            </div>
                        </div>

                        {/* Legal Representation */}
                        <div className="question-block d-flex flex-column gap-2">
                            <label className="question-text label_fontWeight">Does your company have legal representation (do you work with a law firm)?</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="legal_rep"
                                    id="legalRepYes"
                                    value="YES"
                                    checked={strategicData.legal_representation === 'YES'}
                                    onChange={(e) => handleRadioChange('legal_representation', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="legalRepYes">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="legal_rep"
                                    id="legalRepNo"
                                    value="NO"
                                    checked={strategicData.legal_representation === 'NO'}
                                    onChange={(e) => handleRadioChange('legal_representation', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="legalRepNo">NO</label>
                            </div>
                        </div>

                        {/* Law Firm Name - Conditional */}
                        {strategicData.legal_representation === 'YES' && (
                            <div className="ms-5">
                                <label className="small fw-bold label_fontWeight">Please indicate the name of your law firm:</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Law Firm Name"
                                    value={strategicData.law_firm_name}
                                    onChange={(e) => handleTextChange('law_firm_name', e.target.value)}
                                />
                            </div>
                        )}

                        {/* Legal Referral - Conditional */}
                        {strategicData.legal_representation === 'NO' && (
                            <div className="ms-5">
                                <div className="question-block d-flex flex-column gap-2">
                                    <label className="question-text label_fontWeight">would you like us to refer one to you?</label>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="legal_referral"
                                            id="legalRefYes"
                                            value="YES"
                                            checked={strategicData.legal_referral === 'YES'}
                                            onChange={(e) => handleRadioChange('legal_referral', e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="legalRefYes">YES</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="legal_referral"
                                            id="legalRefNo"
                                            value="NO"
                                            checked={strategicData.legal_referral === 'NO'}
                                            onChange={(e) => handleRadioChange('legal_referral', e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="legalRefNo">NO</label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Legal Compliance Review */}
                        <div className="question-block d-flex flex-column gap-2">
                            <label className="question-text label_fontWeight">Have you completed a formal legal/compliance review in the last 24 months?</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="review"
                                    id="reviewYes"
                                    value="YES"
                                    checked={strategicData.legal_compliance_review === 'YES'}
                                    onChange={(e) => handleRadioChange('legal_compliance_review', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="reviewYes">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="review"
                                    id="reviewNo"
                                    value="NO"
                                    checked={strategicData.legal_compliance_review === 'NO'}
                                    onChange={(e) => handleRadioChange('legal_compliance_review', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="reviewNo">NO</label>
                            </div>
                        </div>

                        {/* Accounting Firm */}
                        <div className="question-block d-flex flex-column gap-2">
                            <label className="question-text label_fontWeight">Does your company work with an accounting firm?</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="accounting"
                                    id="accYes"
                                    value="YES"
                                    checked={strategicData.accounting_firm === 'YES'}
                                    onChange={(e) => handleRadioChange('accounting_firm', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="accYes">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="accounting"
                                    id="accNo"
                                    value="NO"
                                    checked={strategicData.accounting_firm === 'NO'}
                                    onChange={(e) => handleRadioChange('accounting_firm', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="accNo">NO</label>
                            </div>
                        </div>

                        {/* Accounting Firm Name - Conditional */}
                        {strategicData.accounting_firm === 'YES' && (
                            <div className="ms-5">
                                <label className="small fw-bold label_fontWeight">please indicate the name of your accounting firm:</label>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Accounting Firm Name"
                                    value={strategicData.accounting_firm_name}
                                    onChange={(e) => handleTextChange('accounting_firm_name', e.target.value)}
                                />
                            </div>
                        )}

                        {/* Accounting Referral - Conditional */}
                        {strategicData.accounting_firm === 'NO' && (
                            <div className="ms-5">
                                <div className="question-block d-flex flex-column gap-2">
                                    <label className="question-text label_fontWeight">would you like us to refer one to you?</label>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="acc_referral"
                                            id="accRefYes"
                                            value="YES"
                                            checked={strategicData.accounting_referral === 'YES'}
                                            onChange={(e) => handleRadioChange('accounting_referral', e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="accRefYes">YES</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="acc_referral"
                                            id="accRefNo"
                                            value="NO"
                                            checked={strategicData.accounting_referral === 'NO'}
                                            onChange={(e) => handleRadioChange('accounting_referral', e.target.value)}
                                        />
                                        <label className="form-check-label" htmlFor="accRefNo">NO</label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Audited Financials */}
                        <div className="question-block d-flex flex-column gap-2">
                            <label className="question-text label_fontWeight">Have your financials been audited by an independent party?</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="audit"
                                    id="auditYes"
                                    value="YES"
                                    checked={strategicData.audited_financials === 'YES'}
                                    onChange={(e) => handleRadioChange('audited_financials', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="auditYes">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="audit"
                                    id="auditNo"
                                    value="NO"
                                    checked={strategicData.audited_financials === 'NO'}
                                    onChange={(e) => handleRadioChange('audited_financials', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="auditNo">NO</label>
                            </div>
                        </div>

                        {/* SaaS Model */}
                        <div className="question-block d-flex flex-column gap-2">
                            <label className="question-text label_fontWeight">Do you consider your company to be a SaaS or recurring model business?</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="saas_model"
                                    id="saasYes"
                                    value="YES"
                                    checked={strategicData.saas_model === 'YES'}
                                    onChange={(e) => handleRadioChange('saas_model', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="saasYes">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="saas_model"
                                    id="saasNo"
                                    value="NO"
                                    checked={strategicData.saas_model === 'NO'}
                                    onChange={(e) => handleRadioChange('saas_model', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="saasNo">NO</label>
                            </div>
                        </div>

                        {/* Holds IP */}
                        <div className="question-block d-flex flex-column gap-2">
                            <label className="question-text label_fontWeight">Do you hold IP?</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="ip_hold"
                                    id="ipHoldYes"
                                    value="YES"
                                    checked={strategicData.holds_ip === 'YES'}
                                    onChange={(e) => handleRadioChange('holds_ip', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="ipHoldYes">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="ip_hold"
                                    id="ipHoldNo"
                                    value="NO"
                                    checked={strategicData.holds_ip === 'NO'}
                                    onChange={(e) => handleRadioChange('holds_ip', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="ipHoldNo">NO</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 4 - MARKET, CUSTOMERS, CONTRACTS */}
            <div className="d-flex flex-column gap-3 mt-4">
                <div className="d-flex flex-column gap-2">
                    <h4 className="mb-2">
                        <b>Strategic Intent for JV's and M&A</b>
                    </h4>
                    <h6><b>SECTION 4</b></h6>
                    <h6>Market, customers, and contracts</h6>
                </div>

                <div className="d-flex flex-column gap-4 checklistgrid">
                    {/* Operating Geographies */}
                    <div className="d-flex flex-column gap-2">
                        <label className="label_fontWeight">In which geographies do you currently operate?</label>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            {[
                                { id: "g1", label: "Local only (single city/metro area)" },
                                { id: "g2", label: "National only (within one country)" },
                                { id: "g3", label: "North America" },
                                { id: "g4", label: "Latin America" },
                                { id: "g5", label: "South America" },
                                { id: "g6", label: "Western Europe" },
                                { id: "g7", label: "Eastern Europe" },
                                { id: "g8", label: "Middle East" }
                            ].map((geo) => (
                                <div className="form-check" key={geo.id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={geo.id}
                                        value={geo.label}
                                        checked={strategicData.operating_geographies.includes(geo.label)}
                                        onChange={(e) => handleCheckboxArray('operating_geographies', e.target.value, e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor={geo.id}>{geo.label}</label>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-6">
                            {[
                                { id: "g9", label: "Africa" },
                                { id: "g10", label: "Central Asia" },
                                { id: "g11", label: "South Asia" },
                                { id: "g12", label: "Southeast Asia" },
                                { id: "g13", label: "East Asia (excluding China/Hong Kong)" },
                                { id: "g14", label: "China / Hong Kong" },
                                { id: "g15", label: "Oceania (Australia, NZ, Pacific Islands)" }
                            ].map((geo) => (
                                <div className="form-check" key={geo.id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={geo.id}
                                        value={geo.label}
                                        checked={strategicData.operating_geographies.includes(geo.label)}
                                        onChange={(e) => handleCheckboxArray('operating_geographies', e.target.value, e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor={geo.id}>{geo.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Segments */}
                    <div className="d-flex flex-column gap-2">
                        <label className="label_fontWeight">What are your primary customer segments?</label>
                        <div className="d-flex flex-wrap gap-3">
                            {[
                                { id: "c1", label: "Enterprise" },
                                { id: "c2", label: "SMB" },
                                { id: "c3", label: "Consumer" },
                                { id: "c4", label: "Government" },
                                { id: "c5", label: "Specific verticals" }
                            ].map((seg) => (
                                <div className="form-check" key={seg.id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={seg.id}
                                        value={seg.label}
                                        checked={strategicData.customer_segments.includes(seg.label)}
                                        onChange={(e) => handleCheckboxArray('customer_segments', e.target.value, e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor={seg.id}>{seg.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Exclusivity Clauses */}
                    <div className="d-block">
                        <label className="label_fontWeight">Do you have any exclusivity, non-compete, or most-favored-nation (MFN) clauses with key customers, suppliers, or channel partners that could restrict a JV/M&A?</label>
                        <div className="mt-2">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exclusivity"
                                    id="ex1"
                                    value="YES"
                                    checked={strategicData.exclusivity_clauses === 'YES'}
                                    onChange={(e) => handleRadioChange('exclusivity_clauses', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="ex1">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="exclusivity"
                                    id="ex2"
                                    value="NO"
                                    checked={strategicData.exclusivity_clauses === 'NO'}
                                    onChange={(e) => handleRadioChange('exclusivity_clauses', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="ex2">NO</label>
                            </div>
                        </div>
                    </div>

                    {/* Dependence Risk */}
                    <div className="d-block">
                        <label className="label_fontWeight">Are there significant dependence risks (e.g., more than 30% of revenue from a single customer or supplier)?</label>
                        <div className="mt-2">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="risk"
                                    id="rk1"
                                    value="YES"
                                    checked={strategicData.dependence_risk === 'YES'}
                                    onChange={(e) => handleRadioChange('dependence_risk', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="rk1">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="risk"
                                    id="rk2"
                                    value="NO"
                                    checked={strategicData.dependence_risk === 'NO'}
                                    onChange={(e) => handleRadioChange('dependence_risk', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="rk2">NO</label>
                            </div>
                        </div>
                    </div>

                    {/* Long Term Contracts */}
                    <div className="d-block">
                        <label className="label_fontWeight">Do you have long-term contracts that would require consent or change-of-control approvals in a transaction?</label>
                        <div className="mt-2">
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="contract"
                                    id="ct1"
                                    value="YES"
                                    checked={strategicData.long_term_contracts === 'YES'}
                                    onChange={(e) => handleRadioChange('long_term_contracts', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="ct1">YES</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="contract"
                                    id="ct2"
                                    value="NO"
                                    checked={strategicData.long_term_contracts === 'NO'}
                                    onChange={(e) => handleRadioChange('long_term_contracts', e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="ct2">NO</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 5 - READINESS */}
            <div className="d-flex flex-column gap-3 mt-4">
                <div className="d-flex flex-column gap-2">
                    <h6><b>SECTION 5</b></h6>
                </div>

                <div className="d-flex flex-column gap-4 checklistgrid">
                    {/* Readiness Reason */}
                    <div className="d-flex flex-column gap-2">
                        <label className="label_fontWeight">Why do you think your company is ready to engage in a JV or an M&A transaction?</label>
                        <textarea
                            className="form-control"
                            id="readiness"
                            rows="3"
                            placeholder="Enter your response here..."
                            value={strategicData.readiness_reason}
                            onChange={(e) => handleTextChange('readiness_reason', e.target.value)}
                        />
                    </div>

                    {/* Value Proposition */}
                    <div className="d-flex flex-column gap-2">
                        <label className="label_fontWeight">How clearly can you articulate your unique value proposition versus competitors in one or two sentences, and why would a buyer/partner choose you instead of building or buying elsewhere?</label>
                        <textarea
                            className="form-control"
                            id="value-prop"
                            rows="4"
                            maxLength="800"
                            placeholder="Enter your response (max 800 characters)..."
                            value={strategicData.value_proposition}
                            onChange={(e) => handleTextChange('value_proposition', e.target.value)}
                        />
                        <div className="form-text text-end fst-italic">max 800 characters</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrategicIntentSection;