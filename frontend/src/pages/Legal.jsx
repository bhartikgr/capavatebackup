import React, { useState, useEffect } from "react";
import "../newstyle.css";
import NewHeader from "../components/NewHeader";
import NewFooter from "../components/NewFooter";

export default function Legal() {
  const [activeSection, setActiveSection] = useState("privacy");

  // 2. Handle URL Hash on Load (Deep Linking)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const validSections = [
      "privacy",
      "terms",
      "cookies",
      "acceptable-use",
      "disclaimer",
    ];

    if (hash && validSections.includes(hash)) {
      setActiveSection(hash);
    }
  }, []);

  // 3. Navigation click handler
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setActiveSection(sectionId);

    // URL update karna bina refresh ke
    window.history.pushState(null, "", `#${sectionId}`);

    // Top par scroll karna
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>
        {`
         .legal-section ul, .legal-section ul li {
	list-style: disc;
}
        `}
      </style>
      <NewHeader />
      <main className="legal-page">
        <div className="legal-sidebar-layout">
          <aside className="legal-nav">
            <div className="legal-nav-title">Legal</div>
            <ul className="legal-nav-links">
              {[
                { id: "privacy", label: "Privacy Policy" },
                { id: "terms", label: "Terms of Service" },
                { id: "cookies", label: "Cookie Policy" },
                { id: "acceptable-use", label: "Acceptable Use" },
                { id: "disclaimer", label: "Disclaimer" },
              ].map((item) => (
                <li key={item.id}>
                  <a
                    className={`legal-nav-link ${activeSection === item.id ? "active" : ""}`}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <div className="legal-content">
            <a className="legal-back" href="/">
              <svg
                fill="none"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Capavate
            </a>
            {activeSection === "privacy" && (
              <section className="legal-section active" id="privacy">
                <div className="legal-section-header">
                  <div className="legal-label">Legal Document</div>
                  <h1 className="legal-title">Privacy Policy</h1>
                  <p className="legal-meta">
                    Last updated: 17 March 2026 · Blueprint Catalyst Limited ·
                    Incorporated in Hong Kong
                  </p>
                </div>
                <div className="legal-body">
                  <div class="legal-highlight">
                    <p>
                      This Privacy Policy is issued by Blueprint Catalyst
                      Limited ("Capavate", "we", "us", "our"), the data
                      controller for all personal data processed through the
                      Capavate platform and all associated services. It applies
                      globally to every category of user — including founders,
                      investors, industry partners, third-party affiliates, and
                      any other person or entity interacting with any Capavate
                      service. It has been drafted to comply with the Hong Kong
                      Personal Data (Privacy) Ordinance (Cap. 486) ("PDPO"), the
                      EU General Data Protection Regulation (Regulation (EU)
                      2016/679) ("EU GDPR"), the UK General Data Protection
                      Regulation ("UK GDPR"), and all other applicable data
                      protection and privacy legislation worldwide. Although
                      Capavate is incorporated in Hong Kong, we apply EU
                      GDPR-equivalent standards globally as the baseline minimum
                      for all users, irrespective of their location.
                    </p>
                  </div>

                  <div class="legal-highlight">
                    <p>
                      <strong>Global Disclaimer.</strong> The Capavate website
                      and all related content, tools, products, services, and
                      platforms (the "Capavate Platform") are provided for
                      general informational and educational purposes only and do
                      not constitute investment, securities, financial, legal,
                      tax, accounting, business, or other professional advice,
                      nor any offer, solicitation, recommendation, or
                      endorsement regarding any securities, financial
                      instruments, transactions, or entities in any
                      jurisdiction. Access to or use of the Capavate Platform
                      does not create any client, advisory, fiduciary, agency,
                      partnership, joint venture, or other professional
                      relationship with Capavate or its affiliates, and no
                      fiduciary or advisory duties are owed to any user or other
                      person; you are solely responsible for obtaining
                      independent professional advice before making any decision
                      or taking or refraining from any action based on
                      information from the Capavate Platform. Nothing on the
                      Capavate Platform is, or is intended to be, an offer to
                      sell, a solicitation of an offer to buy, or an invitation
                      to participate in any investment, fundraising, lending,
                      borrowing, or other capital markets or financial
                      transaction, nor any prospectus, offering document, or
                      marketing of a regulated product or service, and any
                      actual transaction, if undertaken, will be governed
                      exclusively by separate definitive written agreements that
                      supersede any information on the Capavate Platform. The
                      Capavate Platform is provided strictly on an "as is," "as
                      available," and "with all faults" basis, without any
                      warranties or guarantees of any kind (express, implied,
                      statutory, or otherwise), including regarding accuracy,
                      completeness, timeliness, reliability, merchantability,
                      fitness for a particular purpose, non-infringement,
                      uninterrupted or error-free operation, or any results or
                      outcomes; any reliance on the Capavate Platform is at your
                      sole risk. To the maximum extent permitted by applicable
                      law, Capavate and its affiliates, officers, directors,
                      employees, agents, licensors, and service providers shall
                      not be liable for any direct, indirect, incidental,
                      special, consequential, punitive, exemplary, or other
                      damages of any kind (including, without limitation, loss
                      of revenue, profits, data, business, goodwill, or
                      opportunity) arising out of or in any way connected with
                      access to or use of, or inability to access or use, the
                      Capavate Platform, whether based on warranty, contract,
                      tort (including negligence), strict liability, or any
                      other legal or equitable theory, even if advised of the
                      possibility of such damages. Certain jurisdictions do not
                      permit exclusion or limitation of liability for incidental
                      or consequential damages, so certain limitations above may
                      not apply to you, in which case Capavate's liability shall
                      be limited to the fullest extent permitted by applicable
                      law.
                    </p>
                  </div>

                  <h2>1. Who We Are and How to Contact Us</h2>
                  <p>
                    The data controller for all personal data collected and
                    processed through the Capavate platform and all associated
                    services is:
                  </p>
                  <p>
                    <strong>Blueprint Catalyst Limited</strong>
                    <br />
                    Incorporated in Hong Kong
                    <br />
                    Platform:{" "}
                    <a
                      href="https://capavate.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      capavate.com
                    </a>{" "}
                    and app.capavate.com
                  </p>
                  <p>
                    For all data protection matters, contact our Data Protection
                    function at{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    . For general legal enquiries, contact{" "}
                    <a href="mailto:legal@capavate.com">legal@capavate.com</a>.
                    We will respond to all substantive data protection enquiries
                    within 30 days of receipt.
                  </p>
                  <p>
                    Where Capavate processes personal data on behalf of
                    third-party controllers — for example, where a founder
                    shares cap table data with co-investors, or where an
                    industry partner or affiliate integrates with the Platform —
                    Capavate acts as a data processor in respect of that data
                    and processes it solely on the instructions of the relevant
                    controller, subject to a written data processing agreement.
                  </p>

                  <h2>2. Scope and Application</h2>
                  <p>
                    This Privacy Policy applies to all individuals and entities
                    whose personal data is processed by Capavate in connection
                    with any service we provide, including:
                  </p>
                  <ul>
                    <li>
                      <strong>Founders</strong> — individuals or entities who
                      register on the Platform to manage their cap table, run
                      fundraising rounds, share company updates, or access
                      M&amp;A and exit intelligence;
                    </li>
                    <li>
                      <strong>Investors</strong> — accredited investors, angel
                      investors, venture capital representatives, family
                      offices, and other investment professionals who access the
                      Platform to connect with founders, review deal flow, or
                      manage portfolio relationships;
                    </li>
                    <li>
                      <strong>Industry Partners</strong> — professional service
                      firms, advisers, accelerators, incubators, law firms,
                      accounting firms, or other organisations who engage with
                      Capavate through partnership or integration arrangements;
                    </li>
                    <li>
                      <strong>Third-Party Affiliates</strong> — entities who
                      interact with the Platform or receive referrals through
                      Capavate's affiliate or referral programmes;
                    </li>
                    <li>
                      <strong>Visitors</strong> — individuals who visit
                      capavate.com or associated web properties without
                      registering;
                    </li>
                    <li>
                      <strong>
                        Data Subjects Identified in Cap Table Data
                      </strong>{" "}
                      — shareholders, option holders, convertible note holders,
                      and other individuals whose personal data is submitted to
                      the Platform by registered users;
                    </li>
                    <li>
                      <strong>Applicants and Enquirers</strong> — individuals
                      who contact us or submit registration enquiries without
                      yet having an active account.
                    </li>
                  </ul>
                  <p>
                    This policy applies globally. Where local law imposes
                    additional data protection requirements that exceed the
                    protections set out in this policy, those additional
                    requirements apply to the extent they are mandatory in the
                    relevant jurisdiction. Nothing in this policy reduces any
                    rights you have under applicable local law.
                  </p>

                  <h2>3. The Services Covered</h2>
                  <p>
                    This Privacy Policy applies to all current and future
                    services provided by Capavate, including but not limited to:
                  </p>
                  <ul>
                    <li>
                      Cap table management and shareholder record-keeping tools;
                    </li>
                    <li>
                      The Capavate Equity Social Network — a closed, verified
                      private network connecting shareholders, founders, and
                      investors;
                    </li>
                    <li>
                      Angel syndicate access and co-investment facilitation
                      features;
                    </li>
                    <li>M&amp;A intelligence and exit preparation tools;</li>
                    <li>
                      Active round management and fundraising visibility
                      features;
                    </li>
                    <li>Investor CRM and relationship management tools;</li>
                    <li>
                      The Entrepreneur Academy — educational content and founder
                      training resources;
                    </li>
                    <li>
                      Industry Partner and affiliate integration services;
                    </li>
                    <li>Referral and partnership programmes;</li>
                    <li>
                      Any application programming interface (API) services
                      provided to partners or affiliates;
                    </li>
                    <li>
                      Any future services added to the Platform from time to
                      time, which will be governed by this policy unless a
                      separate privacy notice is issued.
                    </li>
                  </ul>

                  <h2>4. Personal Data We Collect</h2>

                  <h3>4.1 Identity and Account Data</h3>
                  <p>
                    For all user categories, we collect: full legal name; email
                    address; telephone number (where provided); country of
                    residence and domicile; professional title and company
                    affiliation; profile photograph or avatar (where uploaded);
                    and unique account identifiers. For Industry Partners and
                    Affiliates, we additionally collect: registered entity name
                    and jurisdiction of incorporation; contact person details;
                    and the nature of the proposed partnership or integration.
                  </p>

                  <h3>4.2 Identity and Eligibility Verification Data</h3>
                  <p>
                    To verify your identity and eligibility to access the
                    Platform, we collect professional credentials, company
                    affiliation, and evidence of investor status or eligibility
                    as you elect to provide. Capavate does not itself conduct
                    Know Your Customer (KYC) or Anti-Money Laundering (AML)
                    screening. Members are admitted based on their existing
                    participation in verified cap tables or investor networks;
                    the underlying companies and their advisers are responsible
                    for their own due diligence. Capavate relies on this
                    third-party diligence and accepts no responsibility or
                    liability for its adequacy, accuracy, or completeness. This
                    data is processed on the basis of legitimate interests and
                    performance of contract (Article 6(1)(b) and 6(1)(f) EU/UK
                    GDPR).
                  </p>

                  <h3>4.3 Cap Table and Corporate Data</h3>
                  <p>
                    Where you use cap table management features, we process:
                    names and contact details of shareholders (including
                    Founders, Investors, and any other identifiable individuals
                    listed on a cap table); equity instrument types, classes,
                    and quantities; share price, valuation, and round data;
                    convertible instruments, option schedules, and warrant
                    agreements; and corporate documents you upload (articles of
                    association, shareholder agreements, investment agreements,
                    and similar). This data may relate to identifiable
                    individuals and is personal data subject to this policy.
                    Where such data relates to individuals other than the
                    account holder, the account holder is responsible for
                    ensuring they have lawful authority to upload that data to
                    the Platform.
                  </p>

                  <h3>4.4 Network, Communications, and Deal Flow Data</h3>
                  <p>
                    We process content generated through your use of the
                    Platform's social and networking features, including:
                    messages sent between Members; posts, comments, and content
                    published in the community; deal flow information and
                    investment opportunity disclosures; connection requests and
                    accepted connections; and content shared within syndicates,
                    groups, or partner integrations.
                  </p>

                  <h3>4.5 Financial and Transaction Data</h3>
                  <p>
                    Where you subscribe to paid features, we collect billing
                    information, subscription tier, payment transaction records
                    (processed by third-party PCI DSS-compliant payment
                    processors), and invoice records. We do not store full
                    payment card numbers.
                  </p>

                  <h3>4.6 Partner and Affiliate Data</h3>
                  <p>
                    For Industry Partners and Third-Party Affiliates, we
                    additionally process: the terms and scope of your
                    partnership or affiliate arrangement; referral activity and
                    attribution data; API usage logs and integration records;
                    and any commercial correspondence relating to the
                    partnership.
                  </p>

                  <h3>4.7 Technical and Usage Data</h3>
                  <p>
                    We automatically collect: IP address; browser type and
                    version; operating system and device type; unique device
                    identifiers; pages visited and features used; session
                    duration and timestamps; referring URLs; and error logs, via
                    cookies and similar tracking technologies (see our Cookie
                    Policy).
                  </p>

                  <h3>4.8 Special Categories</h3>
                  <p>
                    We do not intentionally collect special categories of
                    personal data. You should not submit such data to the
                    Platform. If you believe such data has been processed in
                    error, contact{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>{" "}
                    immediately.
                  </p>

                  <h2>5. Lawful Bases for Processing</h2>

                  <h3>5.1 Performance of a Contract (Article 6(1)(b))</h3>
                  <p>
                    We process identity and account data, cap table data,
                    network and communications data, and partner/affiliate data
                    to perform our contractual obligations under our Terms of
                    Service, Partner Agreements, or Affiliate Agreements —
                    specifically, to provide, operate, and maintain all Capavate
                    services.
                  </p>

                  <h3>
                    5.2 Legitimate Interests and Third-Party Reliance (Article
                    6(1)(f))
                  </h3>
                  <p>
                    We process identity and eligibility data in reliance on our
                    legitimate interest in operating a secure, trusted, closed
                    network. Capavate does not act as a regulated financial
                    institution and does not conduct KYC or AML verification.
                    Members are admitted on the basis of their participation in
                    verified third-party cap tables or networks; those third
                    parties — not Capavate — bear primary responsibility for
                    AML, CTF, and financial crime compliance. Capavate expressly
                    disclaims any liability arising from the adequacy or
                    inadequacy of such third-party diligence. We also rely on
                    legitimate interests for Platform security, fraud
                    prevention, abuse detection, partner relationship
                    management, and product improvement, having assessed that
                    these interests are not overridden by your rights and
                    freedoms.
                  </p>

                  <h3>
                    5.3 Compliance with Legal Obligations (Article 6(1)(c))
                  </h3>
                  <p>
                    We process personal data where required to comply with
                    applicable law, including responses to valid court orders,
                    subpoenas, or compulsory legal process from competent
                    authorities.
                  </p>

                  <h3>5.4 Consent (Article 6(1)(a))</h3>
                  <p>
                    Where we send marketing communications beyond
                    service-related messages, we do so only on the basis of your
                    freely given, specific, informed, and unambiguous consent.
                    You may withdraw consent at any time without affecting the
                    lawfulness of prior processing, by clicking "unsubscribe" or
                    contacting{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    .
                  </p>

                  <h2>6. How We Use Your Personal Data</h2>
                  <p>
                    We use personal data for the following purposes, applicable
                    across all user categories:
                  </p>
                  <ul>
                    <li>
                      Registering and administering accounts for Founders,
                      Investors, Industry Partners, and Third-Party Affiliates;
                    </li>
                    <li>
                      Providing all Capavate services listed in Section 3,
                      including cap table management, social networking, angel
                      syndicate access, M&amp;A intelligence, fundraising tools,
                      and educational content;
                    </li>
                    <li>
                      Facilitating verified connections between Founders and
                      Investors within the closed network;
                    </li>
                    <li>
                      Verifying eligibility and professional credentials as
                      provided by users, in reliance on third-party diligence —
                      Capavate does not conduct KYC or AML screening and accepts
                      no liability in connection therewith;
                    </li>
                    <li>
                      Managing and administering Industry Partner and Affiliate
                      relationships, integrations, and referral programmes;
                    </li>
                    <li>
                      Sending service communications, platform notifications,
                      and (where consented) marketing communications;
                    </li>
                    <li>
                      Detecting, investigating, and preventing fraud, abuse,
                      security incidents, and Acceptable Use Policy violations
                      across all services;
                    </li>
                    <li>
                      Improving all Platform services through analytics, user
                      research, and product development;
                    </li>
                    <li>
                      Complying with legal obligations and exercising or
                      defending legal claims;
                    </li>
                    <li>
                      Billing, subscription management, and partner/affiliate
                      remuneration where applicable.
                    </li>
                  </ul>

                  <h2>7. Sharing and Disclosure of Personal Data</h2>
                  <p>
                    We do not sell, rent, or trade your personal data to any
                    third party. We may share personal data only in the
                    following circumstances:
                  </p>

                  <h3>7.1 Other Platform Members</h3>
                  <p>
                    Limited profile information (name, professional title,
                    company, investor type, and verified status) is visible to
                    other verified Members as an inherent feature of the
                    network. Cap table data is shared only with co-shareholders,
                    co-investors, or other parties to whom you explicitly grant
                    access. No personal data is shared with other Members beyond
                    what you elect to display or share.
                  </p>

                  <h3>7.2 Industry Partners and Affiliates</h3>
                  <p>
                    Where you engage with features powered by an Industry
                    Partner integration (for example, legal, accounting, or
                    advisory tools accessed through the Platform), limited
                    profile or interaction data may be shared with that partner
                    to the extent necessary to provide the feature, under
                    written data processing or data sharing agreements imposing
                    GDPR-equivalent obligations. You will be notified of any
                    material data sharing with partners at the point of
                    engagement. Third-Party Affiliates receive only the data
                    necessary to attribute referral activity; they do not
                    receive personal data beyond referral attribution
                    identifiers unless you have separately consented.
                  </p>

                  <h3>7.3 Service Providers and Sub-Processors</h3>
                  <p>
                    We engage third-party service providers who process personal
                    data on our behalf under written data processing agreements
                    imposing GDPR-equivalent obligations including security,
                    sub-processing restrictions, deletion, and audit rights.
                    Categories of processors include: cloud infrastructure and
                    hosting providers; identity verification service providers;
                    payment processors; analytics and monitoring services; email
                    and notification delivery services; and customer support
                    tooling. A current list of sub-processors is available on
                    request at{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    .
                  </p>

                  <h3>7.4 Regulatory and Law Enforcement Authorities</h3>
                  <p>
                    We will disclose personal data to regulators, law
                    enforcement agencies, courts, and government authorities
                    where required or permitted by applicable law, including in
                    response to court orders, subpoenas, or other compulsory
                    legal processes. Capavate does not conduct AML or CTF
                    reporting in its own right; such obligations rest with the
                    regulated entities through which Members' credentials are
                    established. Where legally permissible, we will notify you
                    of any disclosure requests directed at Capavate.
                  </p>

                  <h3>7.5 Professional Advisers</h3>
                  <p>
                    We may share personal data with legal advisers, auditors,
                    accountants, and insurers on a need-to-know basis, subject
                    to professional confidentiality obligations.
                  </p>

                  <h3>7.6 Business Transfers</h3>
                  <p>
                    In the event of a merger, acquisition, reorganisation, or
                    sale of all or part of Blueprint Catalyst Limited's business
                    or assets, personal data may be disclosed to the acquiring
                    entity and its advisers. We will notify affected data
                    subjects of any such transfer and any changes to the
                    applicable privacy policy prior to the transfer taking
                    effect.
                  </p>

                  <h2>
                    7A. Member Profiles — Visibility, Public Data, and Network
                    Sharing
                  </h2>
                  <p>
                    When a Member creates or updates a profile on the Platform,
                    certain profile data becomes visible to other verified
                    Members within the closed network as an inherent and
                    essential feature of the Platform's social and networking
                    functionality. Members are solely responsible for the
                    accuracy, completeness, and appropriateness of information
                    they include in their profiles. Capavate processes profile
                    data on the basis of performance of contract (Article
                    6(1)(b) EU/UK GDPR) for the purpose of enabling the core
                    networking functionality of the Platform, and on the basis
                    of legitimate interests (Article 6(1)(f)) for Platform
                    integrity and network quality assurance.
                  </p>
                  <p>
                    Profile data that may be visible to other verified Members
                    includes, subject to the visibility controls available to
                    each Member: full name; professional title and current role;
                    company name and sector; investor type and stage focus;
                    general geographic location; profile photograph; connection
                    count; and any information a Member voluntarily includes in
                    their public bio, skills, or interests fields. The following
                    categories of data are <strong>never</strong> made visible
                    to other Members without the Member's explicit consent:
                    email address; telephone number; specific shareholding
                    details; cap table position; financial terms of any
                    investment; or any special category personal data.
                  </p>
                  <p>
                    Members may adjust their profile visibility settings within
                    the options provided by the Platform. Capavate is not
                    responsible for and accepts no liability in connection with:
                    (a) information a Member voluntarily makes visible to the
                    network; (b) any use made by other Members of profile data
                    that is visible to them as part of the network's normal
                    functionality; or (c) any further disclosure by any Member
                    of profile data they have viewed through the Platform. Where
                    a Member discloses another Member's profile data beyond the
                    Platform, that Member is solely responsible for such
                    disclosure and any consequences arising from it.
                  </p>
                  <p>
                    <strong>Right to restrict profile visibility.</strong>{" "}
                    Members may request restriction of their profile's
                    visibility to other Members at any time by contacting{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    . Note that full erasure of profile data may not be possible
                    where continued visibility is required to satisfy our
                    obligations to other Members with whom you have an existing
                    connection, cap table relationship, or active transaction,
                    or where retention is required by applicable law.
                  </p>

                  <h2>
                    7B. Automated Processing, AI-Assisted Features, and
                    Profiling
                  </h2>
                  <p>
                    The Platform may use automated processing and algorithmic
                    analysis of personal data to provide certain features,
                    including: network connection recommendations; deal flow
                    matching between Founders and Investors; content relevance
                    ranking; risk and trust scoring for platform access
                    purposes; and usage analytics that personalise your
                    experience. Where any such processing constitutes
                    "profiling" within the meaning of Article 4(4) EU/UK GDPR
                    (i.e., automated processing used to evaluate personal
                    aspects relating to you), we disclose this as follows:
                  </p>
                  <h3>7B. 1 Connection and Match Recommendations</h3>
                  <p>
                    The Platform uses automated algorithms to suggest
                    connections, co-investors, or deal flow that may be relevant
                    to your profile and activity. This processing is carried out
                    on the basis of our legitimate interests (Article 6(1)(f))
                    in improving the utility and relevance of the network for
                    all Members. It does not produce legal or similarly
                    significant effects on any Member and does not constitute
                    solely automated decision-making within the meaning of
                    Article 22 EU/UK GDPR. You may opt out of connection
                    recommendations by adjusting your profile settings or
                    contacting{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    .
                  </p>
                  <h3>7B. 2 Platform Trust and Access Scoring</h3>
                  <p>
                    To maintain the integrity, security, and closed nature of
                    the Platform, we may apply automated scoring or risk
                    indicators to accounts based on usage patterns, registration
                    data, and network signals. Where such scoring leads to a
                    decision that materially affects your access to the Platform
                    — including suspension, restriction of access, or removal —
                    a human review will be available upon written request to{" "}
                    <a href="mailto:trust@capavate.com">trust@capavate.com</a>.
                    We do not make solely automated decisions that produce legal
                    effects without human oversight and a right of review.
                  </p>
                  <h3>7B. 3 AI-Assisted Features</h3>
                  <p>
                    The Platform may from time to time offer AI-assisted tools
                    to assist Members with tasks such as drafting,
                    summarisation, analysis, or cap table modelling. Where such
                    tools process your personal data, that processing is carried
                    out on the basis of contract performance or, where
                    applicable, your consent. AI-generated outputs are provided
                    for informational assistance only and do not constitute
                    advice of any kind. Capavate is not liable for the accuracy
                    of AI-generated outputs. Members must not submit special
                    categories of personal data, confidential third-party
                    information, or material non-public information to any
                    AI-assisted feature of the Platform.
                  </p>

                  <h2>8. International Transfers of Personal Data</h2>
                  <p>
                    Capavate is operated from Hong Kong Special Administrative
                    Region. We may transfer personal data to countries and
                    territories outside Hong Kong, the United Kingdom, and the
                    European Economic Area (EEA) where necessary to operate the
                    Platform, provide services to all user categories, and
                    engage our service providers. We ensure all such
                    cross-border transfers are protected by one or more of the
                    following safeguards:
                  </p>
                  <ul>
                    <li>
                      <strong>Adequacy decisions</strong>: transfers to
                      countries or territories recognised by the Privacy
                      Commissioner for Personal Data (PCPD), the UK ICO, or the
                      European Commission as providing an adequate level of data
                      protection;
                    </li>
                    <li>
                      <strong>EU Standard Contractual Clauses (SCCs)</strong>{" "}
                      and/or{" "}
                      <strong>
                        UK International Data Transfer Agreements (IDTAs)
                      </strong>
                      , together with any required transfer impact assessments,
                      as applicable depending on the origin of the data and the
                      receiving jurisdiction;
                    </li>
                    <li>
                      <strong>Binding Corporate Rules</strong> where applicable;
                    </li>
                    <li>
                      <strong>
                        Approved certifications or codes of conduct
                      </strong>{" "}
                      where available and appropriate.
                    </li>
                  </ul>
                  <p>
                    You may request a copy of the applicable transfer safeguard
                    by contacting{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    . We will not transfer personal data to jurisdictions that
                    do not meet these adequacy requirements without implementing
                    appropriate safeguards.
                  </p>

                  <h2>9. Data Retention</h2>
                  <p>
                    We retain personal data only for as long as necessary to
                    fulfil the purposes for which it was collected, comply with
                    legal obligations, resolve disputes, and enforce our
                    agreements. Our principal retention periods are:
                  </p>
                  <ul>
                    <li>
                      <strong>
                        Account and identity data (all user categories)
                      </strong>
                      : for the duration of the account and for six (6) years
                      thereafter, consistent with the Hong Kong Limitation
                      Ordinance (Cap. 347) and applicable tax record-keeping
                      requirements;
                    </li>
                    <li>
                      <strong>
                        Identity and eligibility verification data
                      </strong>
                      : for the duration of the account and six (6) years
                      thereafter. Capavate does not hold KYC/AML records as a
                      regulated entity; such records are the responsibility of
                      the companies and advisers whose diligence Capavate relies
                      upon;
                    </li>
                    <li>
                      <strong>Cap table and corporate data</strong>: for the
                      duration of the account and up to seven (7) years
                      following account closure, consistent with the Hong Kong
                      Companies Ordinance (Cap. 622);
                    </li>
                    <li>
                      <strong>Partner and Affiliate records</strong>: for the
                      duration of the partnership or affiliate arrangement and
                      six (6) years thereafter;
                    </li>
                    <li>
                      <strong>Technical and usage logs</strong>: up to
                      twenty-four (24) months, thereafter anonymised;
                    </li>
                    <li>
                      <strong>Marketing consent records</strong>: until consent
                      is withdrawn and for three (3) years thereafter.
                    </li>
                  </ul>
                  <p>
                    Upon expiry of the applicable retention period, personal
                    data is securely deleted or anonymised. Where immediate
                    deletion is not possible (e.g., secure backups), data is
                    isolated and protected from further active processing until
                    deletion is completed.
                  </p>

                  <h2>10. Your Rights as a Data Subject</h2>
                  <p>
                    Subject to applicable law, all data subjects — regardless of
                    category — have the following rights in relation to their
                    personal data:
                  </p>
                  <ul>
                    <li>
                      <strong>
                        Right of access (Article 15 EU/UK GDPR; PDPO Data Access
                        Request)
                      </strong>
                      : to obtain confirmation of whether we process your
                      personal data, and if so to receive a copy and
                      supplementary information;
                    </li>
                    <li>
                      <strong>Right to rectification (Article 16)</strong>: to
                      require correction of inaccurate personal data without
                      undue delay;
                    </li>
                    <li>
                      <strong>Right to erasure (Article 17)</strong>: to request
                      deletion of your personal data where it is no longer
                      necessary, where you have withdrawn consent (if
                      applicable), or where processing is unlawful, subject to
                      our legitimate interests in maintaining Platform security
                      and integrity;
                    </li>
                    <li>
                      <strong>Right to restriction (Article 18)</strong>: to
                      restrict processing in certain circumstances while we
                      verify a rectification request or pending an objection;
                    </li>
                    <li>
                      <strong>Right to data portability (Article 20)</strong>:
                      to receive personal data you have provided to us in a
                      structured, machine-readable format, where technically
                      feasible and where processing is based on contract or
                      consent;
                    </li>
                    <li>
                      <strong>Right to object (Article 21)</strong>: to object
                      to processing based on legitimate interests at any time;
                      we will cease unless we can demonstrate compelling
                      legitimate grounds or the processing is necessary for
                      legal claims;
                    </li>
                    <li>
                      <strong>
                        Rights against automated decision-making (Article 22)
                      </strong>
                      : not to be subject to solely automated decisions
                      producing legal or significant effects, except where you
                      have consented or it is necessary for a contract;
                    </li>
                    <li>
                      <strong>Right to withdraw consent</strong>: at any time
                      where processing is based on consent, without affecting
                      prior lawful processing.
                    </li>
                  </ul>
                  <p>
                    To exercise any right, submit a request to{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    . We will respond within one (1) calendar month, extendable
                    by two (2) further months for complex requests with notice
                    given. We may verify your identity before fulfilling a
                    request.
                  </p>
                  <p>
                    If dissatisfied with our response, you may lodge a complaint
                    with: the{" "}
                    <strong>
                      Privacy Commissioner for Personal Data (PCPD)
                    </strong>{" "}
                    at{" "}
                    <a
                      href="https://www.pcpd.org.hk"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      pcpd.org.hk
                    </a>{" "}
                    (Hong Kong); the{" "}
                    <strong>Information Commissioner's Office (ICO)</strong> at{" "}
                    <a
                      href="https://ico.org.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ico.org.uk
                    </a>{" "}
                    (United Kingdom); or the competent data protection
                    supervisory authority in your EU Member State of residence
                    or work.
                  </p>

                  <h2>
                    10 A. PDPO-Specific Obligations and Rights (Hong Kong Users)
                  </h2>
                  <p>
                    For users whose personal data is subject to the Hong Kong
                    Personal Data (Privacy) Ordinance (Cap. 486) ("PDPO"), the
                    following additional provisions apply:
                  </p>
                  <ul>
                    <li>
                      <strong>
                        Data Access Requests (DAR) under Section 18 PDPO.
                      </strong>{" "}
                      You have the right to request access to your personal data
                      held by Capavate. A Data Access Request must be submitted
                      in writing using a prescribed form (or equivalent written
                      request) to{" "}
                      <a href="mailto:privacy@capavate.com">
                        privacy@capavate.com
                      </a>
                      . We will respond within 40 days as required by the PDPO
                      and may charge a reasonable fee not exceeding the amount
                      permitted under the PDPO for providing copies.
                    </li>
                    <li>
                      <strong>
                        Data Correction Requests under Section 22 PDPO.
                      </strong>{" "}
                      You have the right to request correction of inaccurate
                      personal data. We will action all valid correction
                      requests within 40 days and notify any third parties to
                      whom we previously disclosed the inaccurate data where
                      practicable and required by the PDPO.
                    </li>
                    <li>
                      <strong>
                        Direct Marketing opt-out under Sections 35A–35C PDPO.
                      </strong>{" "}
                      We will not use your personal data for direct marketing
                      without your prior consent. Where we have obtained
                      consent, you may withdraw it at any time by contacting{" "}
                      <a href="mailto:privacy@capavate.com">
                        privacy@capavate.com
                      </a>
                      . We will stop all direct marketing within a reasonable
                      time following receipt of your opt-out.
                    </li>
                    <li>
                      <strong>Complaints to the PCPD.</strong> If you believe we
                      have breached the PDPO in connection with your personal
                      data, you may complain to the Privacy Commissioner for
                      Personal Data (PCPD) at{" "}
                      <a
                        href="https://www.pcpd.org.hk"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        pcpd.org.hk
                      </a>{" "}
                      or by calling the PCPD at +852 2827 2827. We recommend
                      contacting us first at{" "}
                      <a href="mailto:privacy@capavate.com">
                        privacy@capavate.com
                      </a>{" "}
                      to give us the opportunity to resolve any concern.
                    </li>
                    <li>
                      <strong>Data User obligations.</strong> As a data user
                      under the PDPO, Blueprint Catalyst Limited will only
                      collect personal data that is necessary for a lawful
                      purpose directly related to our functions and activities;
                      will use all practicable steps to ensure personal data is
                      accurate; will take all practicable steps to erase
                      personal data no longer required; will take all
                      practicable steps to ensure personal data is protected
                      against unauthorised or accidental access; will provide
                      notification of the purposes of collection at the time of
                      collection (or as soon as practicable thereafter); and
                      will not transfer personal data to a jurisdiction outside
                      Hong Kong without taking steps to ensure the receiving
                      party provides a standard of protection comparable to the
                      PDPO.
                    </li>
                  </ul>

                  <h2>10 B. Data Protection Officer and Accountability</h2>
                  <p>
                    Blueprint Catalyst Limited has designated a Data Protection
                    function responsible for overseeing compliance with this
                    Privacy Policy, the PDPO, the EU GDPR, the UK GDPR, and all
                    other applicable data protection legislation. All data
                    protection enquiries, subject access requests, and
                    complaints should be directed to:
                  </p>
                  <p>
                    <strong>Data Protection Function</strong>
                    <br />
                    Blueprint Catalyst Limited
                    <br />
                    Email:{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                  </p>
                  <p>
                    Under EU GDPR Article 37, the appointment of a Data
                    Protection Officer is mandatory for certain organisations.
                    Blueprint Catalyst Limited will appoint a formal DPO when
                    and to the extent required by applicable law. In the
                    meantime, our Data Protection function fulfils the
                    accountability and oversight functions described in this
                    policy. All Members and data subjects may contact our Data
                    Protection function at any time and can expect a substantive
                    response within 30 days.
                  </p>
                  <p>
                    <strong>Record of Processing Activities.</strong> We
                    maintain a written record of all categories of processing
                    activities carried out on behalf of Blueprint Catalyst
                    Limited as required by Article 30 EU/UK GDPR. This record is
                    available for inspection by the relevant supervisory
                    authority on request and includes the name and contact
                    details of the controller, the purposes of processing,
                    categories of data subjects and personal data, recipients of
                    personal data, details of cross-border transfers, and
                    retention schedules.
                  </p>
                  <p>
                    <strong>Data Protection Impact Assessments.</strong> We
                    carry out Data Protection Impact Assessments (DPIAs) in
                    accordance with Article 35 EU GDPR where processing is
                    likely to result in high risk to the rights and freedoms of
                    data subjects — including where we introduce new features
                    involving large-scale profiling, automated decision-making,
                    or processing of sensitive data categories. DPIAs are
                    reviewed prior to the launch of any material new processing
                    activity.
                  </p>

                  <h2>11. Security</h2>
                  <p>
                    We implement appropriate technical and organisational
                    measures to protect personal data against unauthorised
                    access, accidental loss, destruction, alteration, or misuse,
                    consistent with the requirements of the PDPO (Data
                    Protection Principle 4), EU GDPR (Article 32), and UK GDPR.
                    These measures include, without limitation: TLS 1.2 or
                    higher encryption in transit and AES-256 encryption at rest;
                    strict role-based access controls and multi-factor
                    authentication for administrative access; regular
                    independent security assessments, vulnerability scanning,
                    and penetration testing; pseudonymisation and minimisation
                    of personal data where technically practicable; contractual
                    security obligations imposed on all sub-processors under
                    Article 28 EU/UK GDPR; and mandatory staff training on data
                    protection and information security. Our security programme
                    is proportionate to the nature, scope, context, and purposes
                    of our processing and the risk to the rights and freedoms of
                    data subjects.
                  </p>
                  <p>
                    In the event of a personal data breach, we will: notify the
                    PCPD and, where required under Article 33 EU/UK GDPR or
                    equivalent applicable law, the competent supervisory
                    authority, within 72 hours of becoming aware of the breach;
                    notify affected data subjects without undue delay where the
                    breach is likely to result in high risk to their rights and
                    freedoms (Article 34 EU/UK GDPR); document all breaches in
                    an internal breach register; and take prompt remedial action
                    to contain, assess, and mitigate the breach. Our breach
                    notification will include the information required by
                    Article 33(3) EU/UK GDPR: the nature of the breach; the
                    categories and approximate number of data subjects and
                    records affected; the likely consequences; and the measures
                    taken or proposed to address the breach. Members who have
                    reason to believe that their account data has been
                    compromised should notify us immediately at{" "}
                    <a href="mailto:trust@capavate.com">trust@capavate.com</a>.
                  </p>

                  <h2>12. Children</h2>
                  <p>
                    The Platform is not directed at individuals under 18. If you
                    believe a person under 18 has provided personal data to us,
                    contact{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>{" "}
                    and we will delete that data.
                  </p>

                  <h2>13. Third-Party Links</h2>
                  <p>
                    The Platform may contain links to third-party websites and
                    services. We are not responsible for the privacy practices
                    of such third parties and encourage you to review their
                    privacy policies.
                  </p>

                  <h2>14. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy at any time. Where changes
                    are material, we will provide at least thirty (30) days'
                    advance notice via the Platform and by email to registered
                    users. Continued use of any Capavate service after the
                    effective date constitutes acknowledgement of the changes.
                  </p>

                  <h2>15. Contact</h2>
                  <p>
                    For data protection enquiries:{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    <br />
                    For general legal matters:{" "}
                    <a href="mailto:legal@capavate.com">legal@capavate.com</a>
                    <br />
                    Blueprint Catalyst Limited · Incorporated in Hong Kong
                  </p>
                </div>
              </section>
            )}
            {activeSection === "terms" && (
              <section className="legal-section active" id="terms">
                <div className="legal-section-header">
                  <div className="legal-label">Legal Document</div>
                  <h1 className="legal-title">Terms of Service</h1>
                  <p className="legal-meta">
                    Last updated: 17 March 2026 · Blueprint Catalyst Limited ·
                    Incorporated in Hong Kong
                  </p>
                </div>
                <div class="legal-body">
                  <div class="legal-highlight">
                    <p>
                      These Terms of Service ("Terms") constitute a binding
                      legal agreement between you and Blueprint Catalyst Limited
                      ("Capavate", "we", "us", "our"). They apply to every user
                      of every Capavate service — including founders, investors,
                      industry partners, third-party affiliates, and any other
                      person or entity accessing or interacting with the
                      Platform in any capacity. By accessing or using any
                      Capavate service in any way, you unconditionally accept
                      and agree to be bound by these Terms in their entirety. If
                      you do not agree, you must not use the Platform or any
                      Capavate service.
                    </p>
                  </div>

                  <h2>1. Definitions</h2>
                  <p>
                    In these Terms, the following words and expressions have the
                    meanings set out below:
                  </p>
                  <ul>
                    <li>
                      <strong>"Platform"</strong> means the Capavate website
                      (capavate.com), application (app.capavate.com), and all
                      associated services, tools, features, APIs, content, data,
                      and functionality provided by Blueprint Catalyst Limited,
                      including all services listed in Clause 5;
                    </li>
                    <li>
                      <strong>"Member"</strong> means any individual or entity
                      that has registered an account on the Platform and been
                      approved for access, including but not limited to
                      Founders, Investors, Industry Partners, and Third-Party
                      Affiliates;
                    </li>
                    <li>
                      <strong>"Founder"</strong> means a Member who accesses the
                      Platform primarily in the capacity of a company founder,
                      director, officer, or representative, for purposes
                      including cap table management, fundraising, community
                      engagement, and M&amp;A intelligence;
                    </li>
                    <li>
                      <strong>"Investor"</strong> means a Member who accesses
                      the Platform in the capacity of an accredited,
                      sophisticated, or professional investor (as applicable
                      under their jurisdiction), including angel investors,
                      venture capital fund representatives, family office
                      representatives, and co-investors;
                    </li>
                    <li>
                      <strong>"Industry Partner"</strong> means a professional
                      service firm, adviser, accelerator, incubator, law firm,
                      accounting firm, or other commercial entity that has
                      entered into a written partner agreement with Blueprint
                      Catalyst Limited to integrate with, refer users to, or
                      otherwise collaborate with the Capavate Platform;
                    </li>
                    <li>
                      <strong>"Third-Party Affiliate"</strong> means an
                      individual or entity who participates in any Capavate
                      referral programme, affiliate scheme, or similar
                      arrangement under which they receive remuneration or other
                      benefit in connection with the introduction of new
                      Members;
                    </li>
                    <li>
                      <strong>"Content"</strong> means all data, text,
                      information, materials, files, images, deal flow
                      information, cap table data, financial projections, and
                      other content uploaded, submitted, or transmitted by a
                      Member to or through the Platform;
                    </li>
                    <li>
                      <strong>"Intellectual Property Rights"</strong> means all
                      patents, copyrights, trade marks, service marks, trade
                      secrets, database rights, design rights, domain names, and
                      all other proprietary rights, whether registered or
                      unregistered, and all applications for such rights;
                    </li>
                    <li>
                      <strong>"Accredited Investor"</strong> means an individual
                      or entity meeting the applicable eligibility standard in
                      their jurisdiction, including: "Professional Investor"
                      under the Hong Kong Securities and Futures Ordinance (Cap.
                      571); "high net worth individual" or "sophisticated
                      investor" under the UK Financial Services and Markets Act
                      2000 and related Orders; "accredited investor" under US
                      Regulation D under the Securities Act of 1933; "wholesale
                      client" under the Australian Corporations Act 2001;
                      "professional client" under EU MiFID II (Directive
                      2014/65/EU); and equivalent definitions in other
                      jurisdictions;
                    </li>
                    <li>
                      <strong>"Partner Agreement"</strong> means any separate
                      written agreement entered into between Blueprint Catalyst
                      Limited and an Industry Partner governing the terms of
                      their integration, referral, or partnership arrangement;
                    </li>
                    <li>
                      <strong>"Affiliate Agreement"</strong> means any separate
                      written agreement entered into between Blueprint Catalyst
                      Limited and a Third-Party Affiliate governing the terms of
                      their participation in a referral or affiliate programme.
                    </li>
                  </ul>

                  <h2>2. Acceptance and Modification</h2>
                  <p>
                    These Terms apply from the date you first access or use any
                    Capavate service. Where a Member is an entity (such as a
                    company or fund), these Terms are accepted on behalf of that
                    entity by the individual who completes registration, who
                    represents and warrants they have authority to bind that
                    entity. We reserve the right to modify these Terms at any
                    time. Where changes are material, we will provide at least
                    thirty (30) days' advance notice via the Platform and by
                    email. Continued use of any Capavate service after the
                    effective date of any modification constitutes acceptance.
                    If you object to any modification, your sole remedy is to
                    cease using the Platform and close your account.
                  </p>

                  <h2>3. Relationship Specific Terms</h2>

                  <h3>3.1 Additional Terms for Founders</h3>
                  <p>
                    Founders acknowledge and agree that: (a) all cap table data
                    and corporate information uploaded to the Platform is
                    submitted by them as data controller in respect of
                    third-party personal data (including shareholder data) and
                    they are solely responsible for ensuring they have the
                    lawful authority to upload such data; (b) any fundraising
                    activity conducted through or facilitated by the Platform
                    must comply with all applicable securities laws and
                    financial promotion regulations in all relevant
                    jurisdictions, and Capavate bears no responsibility for such
                    compliance; (c) they will not misrepresent company
                    financials, traction, valuation, or any other material
                    information to Investors through the Platform; and (d) deal
                    room and data room features are provided as tools only —
                    Capavate does not verify, endorse, or take responsibility
                    for the accuracy of any information shared in a deal room.
                  </p>

                  <h3>3.2 Additional Terms for Investors</h3>
                  <p>
                    Investors acknowledge and agree that: (a) all investment
                    decisions are made solely at their own risk; (b) they are
                    solely responsible for conducting independent due diligence
                    on any opportunity identified through the Platform; (c)
                    Capavate does not verify the accuracy of information
                    provided by Founders, and no content on the Platform
                    constitutes investment advice or a recommendation to invest;
                    (d) they independently satisfy and will continue to satisfy
                    the Accredited Investor eligibility requirements applicable
                    in their jurisdiction, and will promptly notify Capavate if
                    they cease to do so; and (e) participation in any angel
                    syndicate or co-investment arrangement through the Platform
                    is subject to applicable securities laws in their
                    jurisdiction and is solely their own responsibility.
                  </p>

                  <h3>3.3 Additional Terms for Industry Partners</h3>
                  <p>
                    Industry Partners acknowledge and agree that: (a) access to
                    Platform data and Member information is strictly limited to
                    that required to deliver the agreed integration or service,
                    as set out in the applicable Partner Agreement; (b) they
                    will not use Member data obtained through the Platform for
                    any purpose other than delivering the agreed service; (c)
                    they are independently responsible for ensuring their own
                    services comply with applicable law, including financial
                    services regulation, data protection law, and professional
                    regulatory requirements; (d) Blueprint Catalyst Limited
                    makes no representation that any endorsement, referral, or
                    listing of an Industry Partner on the Platform constitutes a
                    legal or financial recommendation of that partner's
                    services; and (e) any fees, commissions, or commercial
                    arrangements between an Industry Partner and any Member are
                    the sole responsibility of those parties, and Capavate has
                    no liability in connection therewith.
                  </p>

                  <h3>3.4 Additional Terms for Third-Party Affiliates</h3>
                  <p>
                    Third-Party Affiliates acknowledge and agree that: (a) all
                    referral and affiliate activity must be conducted honestly,
                    lawfully, and in accordance with the applicable Affiliate
                    Agreement and these Terms; (b) they will not make false,
                    misleading, or exaggerated claims about the Platform or its
                    services in the course of referral activity; (c) they will
                    not engage in any referral or promotional activity that
                    constitutes a regulated financial promotion in any
                    jurisdiction without the requisite authorisation; (d) all
                    compensation arrangements are governed exclusively by the
                    applicable Affiliate Agreement, and Capavate's liability for
                    any compensation dispute is limited to the terms of that
                    agreement; and (e) Blueprint Catalyst Limited may terminate
                    an affiliate arrangement at any time upon written notice if
                    it reasonably determines that the affiliate's conduct
                    violates these Terms, the Affiliate Agreement, or applicable
                    law.
                  </p>

                  <h2>4. Eligibility</h2>
                  <p>To access and use any Capavate service, you must:</p>
                  <ul>
                    <li>
                      Be at least 18 years of age and have full legal capacity
                      to enter into a binding contract in your jurisdiction;
                    </li>
                    <li>
                      Meet the applicable eligibility requirements for your
                      Member category (Founder, Investor, Industry Partner, or
                      Third-Party Affiliate) as described in these Terms and any
                      applicable supplementary agreement;
                    </li>
                    <li>
                      Investors specifically must satisfy the Accredited
                      Investor definition applicable in their jurisdiction of
                      residence and must independently verify this;
                    </li>
                    <li>
                      Be a participant in a company cap table or verified
                      investor network whose underlying companies and advisers
                      have conducted their own appropriate due diligence —
                      Capavate relies on this third-party diligence, does not
                      conduct its own KYC or AML verification, and accepts no
                      liability in connection therewith;
                    </li>
                    <li>
                      Not be a person or entity subject to applicable sanctions,
                      export controls, or regulatory prohibitions — you
                      represent and warrant this solely on your own behalf, as
                      Capavate does not conduct sanctions screening and accepts
                      no liability in this regard;
                    </li>
                    <li>
                      Not be prohibited from accessing or using the Platform
                      under the laws of your jurisdiction.
                    </li>
                  </ul>
                  <p>
                    By accessing any Capavate service, you represent and warrant
                    that you meet all applicable eligibility criteria.
                    Misrepresentation of eligibility by any Member is a material
                    breach of these Terms and may result in immediate account
                    termination, reporting to relevant regulatory authorities,
                    and civil or criminal liability.
                  </p>

                  <h2>5. Services Provided</h2>
                  <p>
                    Capavate provides the following services, subject to these
                    Terms and, where applicable, additional service-specific
                    terms:
                  </p>
                  <ul>
                    <li>
                      <strong>Cap Table Management</strong> — tools for Founders
                      to manage shareholder records, equity instruments, option
                      pools, and corporate documents;
                    </li>
                    <li>
                      <strong>Equity Social Network</strong> — a closed,
                      verified private network facilitating professional
                      connections between Founders and Investors based on shared
                      cap table participation;
                    </li>
                    <li>
                      <strong>Angel Syndicate Access</strong> — tools enabling
                      Investors to participate in co-investment and angel
                      syndicate arrangements, subject to applicable securities
                      law;
                    </li>
                    <li>
                      <strong>M&amp;A Intelligence</strong> — market
                      intelligence tools and community data to assist Founders
                      and Investors in identifying potential M&amp;A, secondary
                      market, and exit opportunities;
                    </li>
                    <li>
                      <strong>Active Round Management</strong> — features
                      enabling Founders to manage live fundraising rounds and
                      present them to verified Investors in accordance with
                      applicable law;
                    </li>
                    <li>
                      <strong>Investor CRM</strong> — relationship management
                      tools for Founders to track and manage investor
                      relationships;
                    </li>
                    <li>
                      <strong>Entrepreneur Academy</strong> — educational
                      content, courses, and resources for Founders and
                      early-stage entrepreneurs;
                    </li>
                    <li>
                      <strong>Industry Partner Integrations</strong> —
                      third-party professional services accessible through or
                      alongside the Platform under separate terms with the
                      relevant Industry Partner;
                    </li>
                    <li>
                      <strong>API Services</strong> — programmatic access to
                      Platform data and functionality for authorised partners,
                      subject to a separate API access agreement;
                    </li>
                    <li>
                      <strong>Referral and Affiliate Programmes</strong> —
                      schemes through which Third-Party Affiliates may earn
                      compensation for referring new Members, subject to
                      applicable Affiliate Agreements.
                    </li>
                  </ul>
                  <p>
                    The availability of any service to a particular Member
                    depends on their membership tier, geographic location, and
                    applicable law. We reserve the right to change, add, or
                    remove services at any time with reasonable notice where
                    practicable.
                  </p>

                  <h2>6. Account Registration and Security</h2>
                  <p>
                    All Members agree to: provide accurate, current, and
                    complete information at registration and update it promptly;
                    maintain the confidentiality of account credentials; not
                    share account access with any third party; notify us
                    immediately at{" "}
                    <a href="mailto:trust@capavate.com">trust@capavate.com</a>{" "}
                    of any actual or suspected unauthorised access; and accept
                    responsibility for all activity under their account.
                    Entities registering as Members must designate a primary
                    contact person who accepts these Terms on the entity's
                    behalf. We reserve the right to require re-confirmation of
                    identity or eligibility at any time. Misrepresentation of
                    credentials is a material breach and Capavate accepts no
                    liability for any consequences arising from such
                    misrepresentation.
                  </p>

                  <h2>7. Licence Grant and Restrictions</h2>
                  <p>
                    Subject to these Terms, we grant you a limited,
                    non-exclusive, non-transferable, revocable licence to access
                    and use the Platform and its services solely for your own
                    lawful personal and professional purposes consistent with
                    your Member category. You may not: sub-licence, sell,
                    resell, transfer, or assign your access or use rights;
                    reproduce, duplicate, copy, or extract any part of the
                    Platform other than as expressly permitted;
                    reverse-engineer, decompile, or attempt to derive source
                    code from the Platform; use automated means (bots, scrapers,
                    spiders, extraction tools) to access, collect, or copy
                    Platform content or data without our express written
                    consent; frame or mirror the Platform on any other website;
                    or access the Platform to build a competing product or
                    service. Industry Partners and Affiliates receive only such
                    access rights as are set out in their applicable Partner
                    Agreement or Affiliate Agreement; no additional rights are
                    implied.
                  </p>

                  <h2>
                    8. Member Content, User-Generated Content, and Social
                    Feature Liability
                  </h2>

                  <h3>8.1 Ownership and Licence</h3>
                  <p>
                    Members retain ownership of all Intellectual Property Rights
                    in Content they submit to any Capavate service. By
                    submitting any Content to any part of the Platform —
                    including cap table data, company updates, deal room
                    materials, announcements, posts, messages, community
                    contributions, syndicate communications, educational
                    submissions, and all other material — you grant Blueprint
                    Catalyst Limited a worldwide, non-exclusive, royalty-free,
                    sub-licensable, perpetual, irrevocable licence to use, host,
                    store, reproduce, process, adapt, modify, translate,
                    distribute, publish, display, transmit, and create
                    derivative works of that Content solely to the extent
                    necessary to: provide, operate, maintain, and improve all
                    Capavate services; enable the features and functionality of
                    the Platform, including its social and networking features;
                    comply with legal obligations; exercise or defend legal
                    rights; and fulfil obligations under any Partner Agreement,
                    Affiliate Agreement, or applicable law. This licence
                    survives any termination or expiry of your account to the
                    extent Capavate is required to retain data under applicable
                    law or its own legitimate operational needs.
                  </p>

                  <h3>8.2 Member Representations and Warranties</h3>
                  <p>
                    By submitting or posting any Content to or through any
                    Capavate service, you unconditionally represent and warrant
                    that:
                  </p>
                  <ul>
                    <li>
                      you own, or have all necessary licences, rights, consents,
                      permissions, and releases from all relevant third parties
                      to submit the Content and to grant the licence in Clause
                      8.1;
                    </li>
                    <li>
                      the Content does not and will not infringe,
                      misappropriate, or violate any third-party rights,
                      including Intellectual Property Rights, privacy rights,
                      rights of publicity, moral rights, contractual rights, or
                      any other proprietary rights;
                    </li>
                    <li>
                      the Content is accurate, complete, and not misleading in
                      any material respect at the time of submission;
                    </li>
                    <li>
                      the Content complies with all applicable laws and
                      regulations in all jurisdictions to which it may be
                      disseminated, including securities law, financial
                      promotion regulations, AML legislation, data protection
                      law, defamation law, competition law, and consumer
                      protection law;
                    </li>
                    <li>
                      the Content does not contain false statements of fact,
                      malicious falsehoods, defamatory statements, or any
                      material that could give rise to civil or criminal
                      liability in any jurisdiction;
                    </li>
                    <li>
                      where the Content includes personal data of third parties
                      — including cap table data, shareholder records, investor
                      profiles, or any other identifiable information — you are
                      the lawful data controller or have obtained all necessary
                      consents and authorities to submit that data to the
                      Platform.
                    </li>
                  </ul>
                  <p>
                    These representations and warranties are deemed repeated
                    each time you submit or post Content to any part of the
                    Platform.
                  </p>

                  <h3>
                    8.3 Platform as Intermediary and Conduit — No Editorial
                    Control
                  </h3>
                  <p>
                    Capavate operates as a passive technical intermediary and
                    communications conduit in relation to Content submitted by
                    Members, Industry Partners, Third-Party Affiliates, and
                    other users through the Platform's social and networking
                    features. Capavate does not pre-screen, pre-moderate,
                    review, verify, approve, or endorse any user-generated
                    Content before it is published or made available to any
                    audience — whether that audience is a private group of cap
                    table shareholders, members of the Capavate Angel Network,
                    participants in the International Entrepreneur Academy, or
                    the wider global network of Capavate Members. Accordingly:
                  </p>
                  <ul>
                    <li>
                      Capavate does not assume any responsibility or liability
                      for the accuracy, completeness, legality, decency,
                      quality, or appropriateness of any Content submitted by
                      Members, Industry Partners, Third-Party Affiliates, or any
                      other user;
                    </li>
                    <li>
                      The views, opinions, statements, analyses,
                      recommendations, projections, and announcements expressed
                      in any user-generated Content are those of the individual
                      contributor alone and do not represent the views,
                      policies, positions, or endorsements of Capavate,
                      Blueprint Catalyst Limited, or any of their officers,
                      employees, agents, or affiliates;
                    </li>
                    <li>
                      Capavate expressly disclaims all liability for any
                      consequences arising from the publication, receipt,
                      reliance upon, or further dissemination of any
                      user-generated Content.
                    </li>
                  </ul>

                  <h3>8.4 Cap Table Shareholder Announcements and Posts</h3>
                  <p>
                    The Platform enables Founders and authorised representatives
                    to post announcements, updates, corporate communications,
                    and other Content to shareholders and other parties
                    represented on a company's cap table ("Cap Table
                    Announcements"). Similarly, shareholders and other cap table
                    participants may post or communicate through cap
                    table-accessible features of the Platform. Capavate accepts
                    no responsibility for and expressly disclaims all liability
                    in connection with:
                  </p>
                  <ul>
                    <li>
                      the accuracy, completeness, or adequacy of any Cap Table
                      Announcement or communication posted by a Founder,
                      director, officer, shareholder, or other authorised
                      person;
                    </li>
                    <li>
                      any failure by a Founder or company representative to
                      provide timely, accurate, or legally required disclosure
                      to shareholders through the Platform;
                    </li>
                    <li>
                      any Cap Table Announcement that constitutes a misleading
                      statement, material omission, or breach of duty to
                      shareholders — all such responsibility rests exclusively
                      with the posting party;
                    </li>
                    <li>
                      any investment decision made by a shareholder, investor,
                      or third party in reliance upon any Cap Table
                      Announcement;
                    </li>
                    <li>
                      any breach of securities law, directors' duties,
                      shareholder agreements, or fiduciary obligations arising
                      from the content of any Cap Table Announcement — Capavate
                      is not a party to any such obligations and has no
                      liability for their breach;
                    </li>
                    <li>
                      any confidential information included in a Cap Table
                      Announcement that is subsequently accessed, copied, or
                      further disseminated by a recipient — the poster is solely
                      responsible for controlling the sensitivity and
                      confidentiality of their submissions.
                    </li>
                  </ul>

                  <h3>
                    8.5 Capavate Angel Network — Posts, Announcements, and
                    Shared Content
                  </h3>
                  <p>
                    The Capavate Angel Network is a community feature of the
                    Platform through which Members may share investment
                    opportunities, deal flow, portfolio updates, market
                    commentary, and other Content visible to Network
                    participants ("Angel Network Content"). Capavate makes Angel
                    Network Content available as a neutral technical facilitator
                    and does not verify, investigate, endorse, approve, or take
                    any editorial position in respect of any Angel Network
                    Content. In particular and without limitation:
                  </p>
                  <ul>
                    <li>
                      Capavate has no liability for any Angel Network Content
                      that is false, misleading, inaccurate, defamatory,
                      unlawful, or that constitutes an unauthorised financial
                      promotion or solicitation;
                    </li>
                    <li>
                      each Member who posts Angel Network Content is solely and
                      exclusively responsible for ensuring that: (i) the Content
                      complies with all applicable securities laws and financial
                      promotion regulations in every jurisdiction in which it
                      may be received or read; (ii) the Content is not a
                      regulated communication requiring authorisation or
                      qualification by a competent financial regulator; (iii)
                      the Content does not disclose material non-public
                      information in contravention of applicable insider trading
                      or market abuse laws;
                    </li>
                    <li>
                      Capavate does not guarantee the exclusivity,
                      confidentiality, or restricted reach of Angel Network
                      Content — Members acknowledge that content shared within
                      the Angel Network may be accessed by, or further
                      disseminated to, a broader global audience of Platform
                      Members, and that Capavate has no control over, and no
                      liability for, any such further dissemination;
                    </li>
                    <li>
                      investment decisions made on the basis of Angel Network
                      Content are made entirely at the Member's own risk;
                      Capavate does not endorse any investment opportunity
                      shared through the Angel Network and makes no
                      representation as to its quality, legitimacy, or legality;
                    </li>
                    <li>
                      Capavate accepts no liability for any losses, damages,
                      regulatory sanctions, or other consequences arising from
                      any Member's reliance on, or participation in any
                      transaction arising from, Angel Network Content.
                    </li>
                  </ul>

                  <h3>
                    8.6 International Entrepreneur Academy — Content and
                    Contributions
                  </h3>
                  <p>
                    The International Entrepreneur Academy is an educational and
                    community feature of the Platform through which Members —
                    including Founders, industry speakers, mentors, advisers,
                    and other contributors — may publish, share, and engage with
                    educational content, course materials, commentary, advice,
                    and community discussion ("Academy Content"). Capavate
                    provides the technology infrastructure enabling the Academy
                    and does not author, endorse, verify, or take any
                    responsibility for Academy Content contributed by users.
                    Without limitation:
                  </p>
                  <ul>
                    <li>
                      Capavate has no liability for any Academy Content that is
                      inaccurate, incomplete, outdated, misleading, or
                      professionally incorrect — all such responsibility rests
                      with the contributing Member;
                    </li>
                    <li>
                      nothing in any Academy Content constitutes financial,
                      investment, legal, tax, regulatory, or other professional
                      advice, regardless of the credentials or professional
                      standing of the contributor — contributors are solely
                      responsible for ensuring their contributions are compliant
                      with applicable professional regulatory requirements in
                      their jurisdiction;
                    </li>
                    <li>
                      Capavate accepts no liability for any actions taken, or
                      not taken, by any user in reliance upon any Academy
                      Content;
                    </li>
                    <li>
                      Academy Content may be accessed by a global audience;
                      contributors are solely responsible for ensuring their
                      contributions comply with the laws of all jurisdictions to
                      which they may be addressed or received, including
                      restrictions on financial promotion, advice-giving, and
                      professional communications.
                    </li>
                  </ul>

                  <h3>8.7 All Socially Accessible Areas of the Platform</h3>
                  <p>
                    In addition to the specific features identified in Clauses
                    8.4 to 8.6, the Platform includes, and may in the future
                    include, other socially accessible areas through which
                    Members may post, share, broadcast, or communicate Content
                    to other Members or to a broader audience (collectively,
                    "Social Features"). These include, without limitation:
                    community forums, discussion boards, deal rooms, message
                    threads, group communications, public and semi-public
                    profile pages, broadcast announcements, shareholder
                    communications, syndicates, networking features, connection
                    messages, and any other feature through which Content can be
                    disseminated to one or more recipients. Capavate's position
                    in respect of all such Social Features is as follows:
                  </p>
                  <ul>
                    <li>
                      <strong>No pre-moderation.</strong> Capavate does not
                      pre-screen, pre-approve, or editorially review any Content
                      posted through any Social Feature of the Platform before
                      it is published or transmitted. The absence of moderation
                      of any particular piece of Content does not constitute
                      approval, endorsement, or validation of that Content by
                      Capavate.
                    </li>
                    <li>
                      <strong>No endorsement of Content.</strong> The presence
                      of any Content on the Platform does not imply any
                      endorsement, recommendation, verification, or approval by
                      Capavate. Any Content published by a Member remains the
                      sole responsibility and liability of the Member who posted
                      it.
                    </li>
                    <li>
                      <strong>No verification of contributors.</strong> Capavate
                      does not verify the accuracy of any credentials,
                      professional qualifications, experience, or claims made by
                      any Member in connection with Content they post. Users who
                      receive Content from other Members should conduct their
                      own independent verification and exercise their own
                      independent judgment.
                    </li>
                    <li>
                      <strong>
                        Global reach and cross-border dissemination.
                      </strong>{" "}
                      Content posted through any Social Feature of the Platform
                      may be accessible to a global audience of Members and may
                      be capable of being further shared, forwarded, or copied
                      beyond the Platform. Capavate accepts no liability for the
                      content, reach, or consequences of such dissemination,
                      which occurs without Capavate's participation or control.
                    </li>
                    <li>
                      <strong>Third-party harm.</strong> Capavate accepts no
                      liability for any claims brought by any person — whether
                      or not a Platform Member — who alleges harm arising from
                      user-generated Content posted through any Social Feature,
                      including claims of defamation, libel, slander, malicious
                      falsehood, negligent misstatement, invasion of privacy,
                      breach of confidence, copyright or trade mark
                      infringement, harassment, or any other tortious or
                      statutory cause of action. All such claims are the sole
                      responsibility of the Member who posted the Content in
                      question.
                    </li>
                    <li>
                      <strong>Investment-adjacent content risk.</strong> Content
                      posted through Social Features may include references to
                      investment opportunities, company valuations, financial
                      performance, deal terms, cap table changes, or other
                      investment-sensitive information. Capavate accepts no
                      liability for any financial loss, opportunity cost,
                      regulatory consequence, or other harm arising from any
                      investment decision made in reliance on such Content. All
                      such reliance is entirely at the recipient's own risk.
                    </li>
                  </ul>

                  <h3>8.8 Content Moderation Rights — Without Liability</h3>
                  <p>
                    Notwithstanding Capavate's status as a passive intermediary
                    and the absence of any obligation to pre-screen Content,
                    Capavate reserves the right — but does not assume any
                    obligation — to monitor, review, investigate, restrict
                    access to, remove, edit, redact, or refuse to publish any
                    Content at any time, at its sole discretion and without
                    prior notice, for any reason, including where Capavate
                    reasonably suspects a breach of these Terms, the Acceptable
                    Use Policy, or applicable law. Any exercise of, or failure
                    to exercise, this moderation right does not:
                  </p>
                  <ul>
                    <li>
                      create any obligation on Capavate to monitor Content going
                      forward or to exercise the right in relation to any other
                      Content;
                    </li>
                    <li>
                      impose any liability on Capavate to a Member whose Content
                      was removed or restricted;
                    </li>
                    <li>
                      impose any liability on Capavate to any third party who
                      alleges harm from Content that was not removed;
                    </li>
                    <li>
                      constitute an assumption of editorial responsibility for
                      any Content that was not removed.
                    </li>
                  </ul>
                  <p>
                    Capavate's content moderation activities, where undertaken,
                    are discretionary acts in its own interests and for the
                    protection of the Platform's integrity. They do not give
                    rise to any duty of care towards any Member, third party, or
                    class of persons, and shall not be construed as any form of
                    editorial oversight or professional review.
                  </p>

                  <h3>
                    8.9 Member Sole Responsibility and Indemnification for
                    Content
                  </h3>
                  <p>
                    Each Member who posts, publishes, shares, or otherwise
                    contributes any Content to any part of the Platform —
                    including Cap Table Announcements, Angel Network posts,
                    International Entrepreneur Academy contributions, and all
                    other Social Feature content — is solely, exclusively, and
                    personally responsible and liable for that Content and all
                    consequences arising from it, including without limitation:
                  </p>
                  <ul>
                    <li>
                      any civil claim, including claims for defamation, libel,
                      slander, malicious falsehood, negligent misstatement,
                      breach of confidence, invasion of privacy, copyright or
                      trade mark infringement, passing off, unlawful processing
                      of personal data, harassment, or inducement to breach
                      contract;
                    </li>
                    <li>
                      any regulatory proceeding or enforcement action, including
                      any action by a securities regulator, financial services
                      authority, data protection supervisory authority, consumer
                      protection authority, or other competent authority in any
                      jurisdiction;
                    </li>
                    <li>
                      any criminal proceeding arising from the Content,
                      including prosecutions for fraud, market manipulation,
                      insider dealing, market abuse, financial crime,
                      harassment, or publication of false or misleading
                      information;
                    </li>
                    <li>
                      any claim by any person who made or refrained from making
                      an investment decision in reliance on the Content;
                    </li>
                    <li>
                      any cross-border regulatory consequence arising from the
                      global distribution or receipt of the Content.
                    </li>
                  </ul>
                  <p>
                    Each such Member agrees to fully and promptly indemnify,
                    defend, and hold harmless Blueprint Catalyst Limited, its
                    affiliates, officers, directors, employees, agents, and
                    service providers from and against all claims, demands,
                    proceedings, losses, liabilities, damages, fines, penalties,
                    costs, and expenses (including legal fees on a full
                    indemnity basis) arising from or in connection with any
                    Content that Member has posted to any part of the Platform.
                  </p>

                  <h3>8.10 Personal Data in User-Generated Content</h3>
                  <p>
                    Where Content submitted by a Member includes, references, or
                    is derived from personal data of third parties — including
                    cap table data relating to identified or identifiable
                    shareholders, investors, directors, officers, advisers, or
                    other individuals — the Member who submits or posts that
                    Content is solely responsible as data controller for
                    ensuring that: (a) they have lawful authority, consent, or
                    other valid legal basis to include that personal data in
                    their Content; (b) the inclusion of that personal data in a
                    post, announcement, or communication accessible to other
                    Members complies with all applicable data protection law,
                    including the PDPO, EU GDPR, and UK GDPR; and (c) no special
                    categories of personal data, sensitive personal data, or
                    personal data of minors are included. Capavate accepts no
                    responsibility for the inclusion of personal data in
                    user-generated Content and expressly disclaims all liability
                    for any data protection or privacy breach arising from such
                    Content. Any such breach is the sole responsibility of the
                    Member who submitted or published the Content.
                  </p>

                  <h2>
                    9. User Profile Obligations, Accuracy, and Responsibility
                  </h2>

                  <h3>9.1 Accuracy and Currency of Profile Information</h3>
                  <p>
                    Each Member is solely responsible for ensuring that all
                    information contained in their Platform profile — including
                    name, professional title, company affiliation, investor
                    status, credentials, and any other self-described attributes
                    — is accurate, complete, and not misleading at all times.
                    Members must promptly update their profile information
                    whenever a material change occurs, including change of
                    employer, change of investor eligibility status, change of
                    regulatory authorisation, or any other change that would
                    materially affect how other Members might reasonably rely
                    upon or interact with that profile. Capavate does not
                    independently verify profile information and accepts no
                    liability for harm caused by any Member's reliance on
                    profile information provided by another Member. The Member
                    who submitted inaccurate, incomplete, or misleading profile
                    information is solely responsible for all consequences
                    arising from any reliance placed on it.
                  </p>

                  <h3>9.2 Profile Integrity and Prohibited Profile Conduct</h3>
                  <p>
                    The following profile-related conduct is expressly
                    prohibited and constitutes a material breach of these Terms:
                  </p>
                  <ul>
                    <li>
                      Creating a profile under a false name or that
                      misrepresents your identity, professional background,
                      company affiliation, investor status, or any other
                      material attribute;
                    </li>
                    <li>
                      Impersonating any other person, company, fund, investment
                      vehicle, regulatory body, or other entity in a profile or
                      any associated communications;
                    </li>
                    <li>
                      Claiming professional credentials, qualifications,
                      regulatory authorisations, or investment status that you
                      do not hold;
                    </li>
                    <li>
                      Representing yourself as an Accredited Investor,
                      Professional Investor, or equivalent category when you do
                      not meet the applicable eligibility standard in your
                      jurisdiction;
                    </li>
                    <li>
                      Creating multiple accounts, whether for yourself or on
                      behalf of others, without the prior written consent of
                      Capavate;
                    </li>
                    <li>
                      Using a profile to conduct activities outside the scope of
                      your stated Member category (e.g., operating as an
                      undisclosed Industry Partner while registered as an
                      Investor);
                    </li>
                    <li>
                      Falsely representing a commercial or financial interest in
                      any content, opportunity, or connection made through the
                      Platform without disclosing that interest.
                    </li>
                  </ul>
                  <p>
                    Capavate reserves the right to take immediate enforcement
                    action — including account suspension or termination —
                    against any Member found to be in breach of this Clause,
                    without prior notice and without liability. Blueprint
                    Catalyst Limited and its affiliates are fully indemnified by
                    the offending Member for all loss, cost, and expense arising
                    from any breach of this Clause.
                  </p>

                  <h3>9.3 Profile Data Submitted by Others</h3>
                  <p>
                    The Platform may display certain profile-like information
                    about individuals derived from cap table data, deal records,
                    or network connections submitted by other Members (such as a
                    shareholder listed on a Founder's cap table). Where personal
                    data about an individual appears on the Platform as a result
                    of submission by another Member, Capavate acts as data
                    processor in respect of that data. The Member who submitted
                    that data is the data controller and is solely responsible
                    for ensuring they had lawful authority to submit it.
                    Individuals whose data appears on the Platform by virtue of
                    another Member's submission may exercise their GDPR/PDPO
                    data subject rights by contacting{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    .
                  </p>

                  <h2>
                    9A. Platform Integrity, Prohibited Manipulation, and
                    Governance
                  </h2>

                  <h3>9A.1 Prohibition on Platform Manipulation</h3>
                  <p>
                    Members must not engage in any conduct designed to
                    manipulate, game, distort, or undermine the integrity of the
                    Platform, its ranking or recommendation systems, its trust
                    mechanisms, its eligibility verification processes, or its
                    closed-network character. Without limiting the generality of
                    the foregoing, the following conduct is expressly
                    prohibited:
                  </p>
                  <ul>
                    <li>
                      Artificially inflating profile engagement metrics,
                      connection counts, or activity indicators through
                      automated means, coordinated behaviour, or any other
                      inauthentic method;
                    </li>
                    <li>
                      Creating false impressions of investor demand,
                      co-investment interest, or deal legitimacy through
                      coordinated posting, fake endorsements, or staged
                      activity;
                    </li>
                    <li>
                      Attempting to circumvent the Platform's eligibility or
                      access control mechanisms through false representations,
                      document forgery, or exploitation of technical
                      vulnerabilities;
                    </li>
                    <li>
                      Using the Platform to test, probe, or map its security
                      architecture, access controls, or data structures without
                      prior written consent from Capavate;
                    </li>
                    <li>
                      Attempting to access, extract, or copy any database, data
                      set, or compiled information from the Platform through
                      automated or manual means not expressly authorised;
                    </li>
                    <li>
                      Engaging in activity designed to cause reputational harm
                      to the Platform, Blueprint Catalyst Limited, or any Member
                      by posting fabricated reviews, fake testimonials, or false
                      reports of misconduct.
                    </li>
                  </ul>

                  <h3>9A.2 Reporting Obligations</h3>
                  <p>
                    Members who become aware of any conduct that violates this
                    Clause, or any other provision of these Terms, the
                    Acceptable Use Policy, or applicable law, are encouraged to
                    report it promptly to{" "}
                    <a href="mailto:trust@capavate.com">trust@capavate.com</a>.
                    Reports made in good faith will be treated with appropriate
                    confidentiality. Capavate will investigate all reports and
                    take action it considers appropriate. No duty of action
                    arises from any report, and Capavate's response or inaction
                    does not create any liability.
                  </p>

                  <h3>9A.3 Cooperation with Investigations</h3>
                  <p>
                    Members agree to cooperate fully and promptly with any
                    investigation by Capavate into suspected breaches of these
                    Terms, the Acceptable Use Policy, or applicable law,
                    including by: providing accurate information on request;
                    preserving relevant communications or records; refraining
                    from any action that could prejudice an ongoing
                    investigation; and complying with any interim access
                    restrictions imposed during the investigation. Failure to
                    cooperate with a legitimate investigation is itself a breach
                    of these Terms and may result in immediate account
                    suspension.
                  </p>

                  <h2>10. No Financial, Investment, or Professional Advice</h2>
                  <p>
                    Nothing on the Platform or provided through any Capavate
                    service — including but not limited to deal flow data, cap
                    table information, M&amp;A intelligence, Entrepreneur
                    Academy content, community discussions, or content shared by
                    any Member, Industry Partner, or Affiliate — constitutes
                    financial, investment, securities, tax, accounting, legal,
                    or other professional advice. No content on the Platform
                    represents a recommendation, solicitation, or offer to buy
                    or sell any security, financial instrument, or asset. All
                    investment decisions are made solely at your own risk.
                    Capavate is not authorised or regulated by the Securities
                    and Futures Commission of Hong Kong ("SFC"), the UK
                    Financial Conduct Authority ("FCA"), the US Securities and
                    Exchange Commission ("SEC"), or any equivalent regulatory
                    authority in any jurisdiction, as a financial adviser,
                    investment manager, portfolio manager, or broker-dealer, and
                    does not provide any regulated financial service. This
                    exclusion of advice applies equally to all content provided
                    by Industry Partners through the Platform unless that
                    partner separately holds applicable regulatory authorisation
                    for such advice.
                  </p>

                  <h2>11. Intellectual Property Ownership</h2>
                  <p>
                    All Intellectual Property Rights in and to the Platform —
                    including its design, software, code, databases, trademarks,
                    service marks, trade names, logos, Entrepreneur Academy
                    content created by Capavate, and all content created or
                    provided by us — are the exclusive property of Blueprint
                    Catalyst Limited and/or its licensors. Nothing in these
                    Terms grants any Member, Industry Partner, or Third-Party
                    Affiliate any rights in Capavate's Intellectual Property
                    except the limited licence in Clause 7. The Capavate name
                    and logo are trade marks of Blueprint Catalyst Limited. You
                    may not use them without prior written consent.
                  </p>

                  <h2>12. Privacy and Data Protection</h2>
                  <p>
                    Our collection and use of personal data is governed by our
                    Privacy Policy, incorporated into these Terms by reference.
                    By accepting these Terms, all Members — including Industry
                    Partners and Third-Party Affiliates — acknowledge they have
                    read and understood our Privacy Policy. Industry Partners
                    and Affiliates who process Member personal data in
                    connection with their services are independently responsible
                    for their own compliance with applicable data protection law
                    and must enter into a written data processing agreement with
                    Blueprint Catalyst Limited before accessing Member data.
                  </p>

                  <h2>13. Confidentiality</h2>
                  <p>
                    Members acknowledge that they may receive access to
                    confidential information through the Platform, including
                    non-public company information, cap table data, deal terms,
                    and financial projections shared by other Members. Each
                    Member agrees to: keep all such information strictly
                    confidential; not disclose it to any third party without the
                    disclosing Member's prior written consent; and use it solely
                    for the purpose for which it was shared on the Platform.
                    This obligation survives termination of these Terms and any
                    account closure for a period of five (5) years, or
                    indefinitely in respect of information that constitutes
                    trade secrets. Capavate is not a party to any
                    confidentiality arrangement between Members and is not
                    responsible for enforcing or monitoring such arrangements.
                  </p>

                  <h2>14. Disclaimer of Warranties</h2>
                  <p>
                    To the maximum extent permitted by applicable law, the
                    Platform and all Capavate services are provided on an "as
                    is" and "as available" basis, without any warranties or
                    representations of any kind, whether express, implied,
                    statutory, or otherwise, including implied warranties of
                    merchantability, fitness for a particular purpose,
                    satisfactory quality, non-infringement, and accuracy. This
                    disclaimer applies equally to all services accessed through
                    the Platform by all Member categories, including Founders,
                    Investors, Industry Partners, and Third-Party Affiliates. We
                    do not warrant that any service will be uninterrupted,
                    error-free, secure, or free from viruses. We do not warrant
                    the accuracy, completeness, or reliability of any content on
                    the Platform, including content from Members, Industry
                    Partners, or Third-Party Affiliates.
                  </p>

                  <h2>15. Limitation of Liability</h2>
                  <p>To the maximum extent permitted by applicable law:</p>
                  <ul>
                    <li>
                      Blueprint Catalyst Limited, its affiliates, officers,
                      directors, employees, agents, licensors, Industry
                      Partners, and service providers shall not be liable to any
                      Member — regardless of their category — for any indirect,
                      incidental, special, consequential, punitive, or exemplary
                      damages, including loss of profits, revenue, data,
                      business, goodwill, or opportunity, whether arising in
                      contract, tort (including negligence), statute, or
                      otherwise, even if advised of the possibility of such
                      damages;
                    </li>
                    <li>
                      Our total aggregate liability to any Member for all claims
                      arising under or in connection with these Terms or any
                      Capavate service shall not exceed the greater of: (a) the
                      total fees paid by that Member to Capavate in the twelve
                      (12) months immediately preceding the event giving rise to
                      the claim; or (b) one hundred United States dollars (USD
                      $100) or the equivalent in the local currency of the
                      Member's jurisdiction;
                    </li>
                    <li>
                      Capavate has no liability for: investment losses or
                      decisions made by Investors in reliance on any information
                      found on the Platform; cap table inaccuracies resulting
                      from data submitted by Founders or other Members; the
                      conduct, advice, or services of any Industry Partner; the
                      referral activity of any Third-Party Affiliate; the
                      failure of any Member to comply with applicable
                      securities, tax, or financial regulation; any
                      user-generated content posted through any Social Feature
                      including cap table announcements, Angel Network posts,
                      Academy contributions, or any other community content; the
                      accuracy, completeness, or legality of any Member's
                      profile information; loss of data submitted to the
                      Platform by any Member; any failure or delay caused by
                      third-party services, infrastructure providers, or force
                      majeure events; any harm to a Member's reputation arising
                      from another Member's content; or any regulatory action
                      taken against any Member in connection with their use of
                      the Platform;
                    </li>
                    <li>
                      Capavate's aggregate liability for all claims arising out
                      of or in connection with user-generated content, Social
                      Features, Member profiles, or community features of the
                      Platform (collectively) shall not in any circumstances
                      exceed the liability cap set out above, regardless of the
                      number of claimants or claims;
                    </li>
                    <li>
                      Blueprint Catalyst Limited shall not be liable for any
                      loss or damage arising from the unauthorised access to, or
                      alteration, disclosure, or destruction of, any data or
                      content by a third party or by another Member, where such
                      access or action was not directly caused by our own
                      negligence;
                    </li>
                    <li>
                      Nothing in these Terms excludes or limits liability for
                      death or personal injury caused by negligence, fraud or
                      fraudulent misrepresentation, or any other liability that
                      cannot be excluded or limited under applicable law,
                      including under the Hong Kong Basic Law, the EU Consumer
                      Rights Directive, or equivalent mandatory consumer
                      protection legislation in any jurisdiction.
                    </li>
                  </ul>

                  <h2>16. Indemnification</h2>
                  <p>
                    Each Member — including Founders, Investors, Industry
                    Partners, and Third-Party Affiliates — agrees, severally and
                    not jointly, to indemnify, defend, and hold harmless
                    Blueprint Catalyst Limited, its affiliates, officers,
                    directors, employees, agents, licensors, and service
                    providers from and against any and all claims, demands,
                    actions, losses, liabilities, damages, costs, and expenses
                    (including reasonable legal fees and disbursements) arising
                    out of or in connection with:
                  </p>
                  <ul>
                    <li>
                      That Member's use of the Platform or any Capavate service;
                    </li>
                    <li>
                      Any Content submitted or posted by that Member, including
                      cap table data, cap table announcements, deal information,
                      promotional materials, Angel Network posts, International
                      Entrepreneur Academy contributions, or any other
                      user-generated content posted through any Social Feature
                      of the Platform;
                    </li>
                    <li>
                      That Member's breach of these Terms, any Acceptable Use
                      Policy, Partner Agreement, or Affiliate Agreement, or any
                      applicable law or regulation;
                    </li>
                    <li>
                      Any investment decision made by that Member or any third
                      party in reliance on information that Member provided
                      through the Platform;
                    </li>
                    <li>
                      Any misrepresentation made by that Member in connection
                      with their registration, eligibility, or use of the
                      Platform;
                    </li>
                    <li>
                      Any regulatory action, enforcement proceeding, or
                      third-party claim arising from that Member's conduct on or
                      through the Platform;
                    </li>
                    <li>
                      Any third-party personal data submitted by that Member to
                      the Platform without lawful authority;
                    </li>
                    <li>
                      In the case of Industry Partners and Affiliates: any claim
                      arising from their services, referral activity, or conduct
                      in connection with the Platform.
                    </li>
                  </ul>
                  <p>
                    We reserve the right, at a Member's expense, to assume the
                    exclusive defence and control of any matter subject to
                    indemnification by that Member, and they agree to cooperate
                    with our defence of such claims.
                  </p>

                  <h2>17. Suspension and Termination</h2>
                  <p>
                    We may, at our sole discretion and without liability,
                    suspend or permanently terminate any Member's access to the
                    Platform or any service at any time and without prior notice
                    if: they breach any provision of these Terms, an Acceptable
                    Use Policy, a Partner Agreement, or an Affiliate Agreement;
                    we are required to do so by applicable law, court order, or
                    regulatory directive; we reasonably suspect fraudulent,
                    abusive, or illegal activity; their continued use poses a
                    security or compliance risk; or the relevant service is
                    discontinued. Upon termination, all licences cease
                    immediately. Clauses 8 (including all sub-clauses 8.1
                    through 8.10), 9, 9A, 10, 11, 13, 14, 15, 16, 20, 21, and 22
                    survive termination. Any Member may terminate their account
                    by contacting{" "}
                    <a href="mailto:legal@capavate.com">legal@capavate.com</a>,
                    subject to the settlement of any outstanding obligations.
                  </p>

                  <h2>
                    18. Third-Party Services and Industry Partner Integrations
                  </h2>
                  <p>
                    The Platform may integrate with or provide access to
                    third-party services, including those provided by Industry
                    Partners. Capavate does not control and is not responsible
                    for the content, quality, accuracy, availability, or legal
                    compliance of any third-party or Industry Partner service.
                    Your use of any third-party or Industry Partner service
                    accessed through the Platform is governed by the terms and
                    policies of that service and any separate agreement you
                    enter into with that provider. Blueprint Catalyst Limited
                    does not endorse any third-party or Industry Partner
                    service, and makes no representation that any such service
                    meets any particular standard of quality, security, or
                    regulatory compliance.
                  </p>

                  <h2>19. Force Majeure</h2>
                  <p>
                    Blueprint Catalyst Limited shall not be liable for any
                    failure or delay in performance of obligations under these
                    Terms to the extent caused by events beyond its reasonable
                    control, including acts of God, natural disasters, epidemics
                    or pandemics, war, terrorism, civil unrest, government
                    action, regulatory changes, power failures, internet or
                    telecommunications outages, cyberattacks, or failures of
                    third-party service providers. If such an event continues
                    for more than ninety (90) days, either party may terminate
                    these Terms on written notice.
                  </p>

                  <h2>20. Severability</h2>
                  <p>
                    If any provision of these Terms is found to be invalid,
                    illegal, or unenforceable by a court of competent
                    jurisdiction, the remaining provisions continue in full
                    force. The invalid provision shall be modified to the
                    minimum extent necessary to make it valid, legal, and
                    enforceable, or severed if such modification is not
                    possible. Any severance of a provision applies only in the
                    jurisdiction in which it is found to be unenforceable; the
                    provision continues to apply in full in all other
                    jurisdictions.
                  </p>

                  <h2>
                    21. Governing Law, Jurisdiction, and Dispute Resolution
                  </h2>
                  <p>
                    These Terms and any dispute or claim arising out of or in
                    connection with them — including non-contractual disputes or
                    claims — shall be governed by and construed in accordance
                    with the laws of the Hong Kong Special Administrative Region
                    of the People's Republic of China ("Hong Kong"), without
                    regard to conflict of laws principles. The courts of the
                    Hong Kong Special Administrative Region shall have exclusive
                    jurisdiction to settle any such dispute or claim, subject to
                    any mandatory jurisdiction provisions applicable in a
                    Member's country of residence. Notwithstanding the
                    foregoing, Capavate reserves the right to seek injunctive or
                    other equitable relief in any court of competent
                    jurisdiction worldwide to prevent or restrain any breach or
                    threatened breach of these Terms, including any breach
                    relating to Intellectual Property Rights, confidentiality,
                    or Platform security.
                  </p>
                  <p>
                    Before initiating formal proceedings, the parties agree to
                    attempt in good faith to resolve any dispute by negotiation
                    for a period of thirty (30) days following written notice of
                    the dispute. If the dispute cannot be resolved by
                    negotiation, either party may submit the dispute to binding
                    arbitration administered by the Hong Kong International
                    Arbitration Centre (HKIAC) under its administered
                    arbitration rules in force at the time, with the arbitration
                    conducted in Hong Kong in the English language by a single
                    arbitrator. Nothing in this clause prevents Capavate from
                    seeking urgent injunctive relief as described above. If you
                    are a consumer resident in the European Union, you may also
                    benefit from any mandatory consumer protection provisions
                    applicable in your EU Member State of residence.
                  </p>

                  <h2>22. Entire Agreement, No Waiver, and Assignment</h2>
                  <p>
                    These Terms, together with our Privacy Policy, Cookie
                    Policy, Acceptable Use Policy, and (where applicable) any
                    Partner Agreement or Affiliate Agreement, constitute the
                    entire agreement between the parties in relation to the
                    subject matter hereof and supersede all prior
                    representations, agreements, or understandings. No waiver by
                    Capavate of any breach shall be a waiver of any subsequent
                    breach. No failure by Capavate to exercise or enforce any
                    right shall constitute a waiver. Capavate may assign or
                    transfer its rights and obligations under these Terms to any
                    successor entity in connection with a merger, acquisition,
                    or reorganisation, without consent. Members may not assign
                    or transfer their rights or obligations under these Terms
                    without Capavate's prior written consent.
                  </p>

                  <h2>23. Contact</h2>
                  <p>
                    For questions about these Terms:{" "}
                    <a href="mailto:legal@capavate.com">legal@capavate.com</a>
                    <br />
                    For trust and safety matters:{" "}
                    <a href="mailto:trust@capavate.com">trust@capavate.com</a>
                    <br />
                    Blueprint Catalyst Limited · Incorporated in Hong Kong
                  </p>
                </div>
              </section>
            )}
            {activeSection === "cookies" && (
              <section className="legal-section active" id="cookies">
                <div className="legal-section-header">
                  <div className="legal-label">Legal Document</div>
                  <h1 className="legal-title">Cookie Policy</h1>
                  <p className="legal-meta">
                    Last updated: 17 March 2026 · Blueprint Catalyst Limited ·
                    Incorporated in Hong Kong
                  </p>
                </div>
                <div class="legal-body">
                  <div class="legal-highlight">
                    <p>
                      This Cookie Policy explains how Blueprint Catalyst Limited
                      ("Capavate", "we", "us", "our") uses cookies and similar
                      tracking technologies across all Capavate web properties
                      (capavate.com and app.capavate.com), applying to all users
                      including founders, investors, industry partners, and
                      third-party affiliates. It should be read alongside our
                      Privacy Policy and has been drafted to comply with the
                      Hong Kong Personal Data (Privacy) Ordinance (Cap. 486)
                      ("PDPO"), the EU General Data Protection Regulation ("EU
                      GDPR"), the UK General Data Protection Regulation ("UK
                      GDPR"), the UK Privacy and Electronic Communications
                      Regulations 2003 (PECR), and all other applicable ePrivacy
                      legislation worldwide. Although Capavate is incorporated
                      in Hong Kong, we apply GDPR-equivalent standards as the
                      global baseline for all users.
                    </p>
                  </div>

                  <h2>1. What Are Cookies and Similar Technologies</h2>
                  <p>
                    Cookies are small text files placed on your device when you
                    visit a website or application. They allow the website to
                    recognise your device and remember information about your
                    visit. We may also use web beacons (pixel tags), local
                    storage objects (LSOs), session storage, and similar
                    technologies (collectively "cookies" in this policy).
                    Cookies may be set by us (first-party cookies) or by third
                    parties whose services we incorporate (third-party cookies).
                    This policy applies equally to all user categories.
                  </p>

                  <h2>2. Why We Use Cookies</h2>
                  <p>
                    We use cookies to: enable core functionality essential to
                    operating the Platform across all services; remember your
                    preferences and personalise your experience; understand how
                    all user types use our services and identify areas for
                    improvement; maintain Platform security and prevent fraud;
                    and measure the effectiveness of marketing campaigns (where
                    you have consented). Industry Partner and Affiliate
                    integrations may use additional cookies as described in
                    Section 4.
                  </p>

                  <h2>3. Categories of Cookies We Use</h2>

                  <h3>3.1 Strictly Necessary Cookies</h3>
                  <p>
                    Essential for the Platform to function across all services.
                    These include session authentication tokens, CSRF protection
                    tokens, load balancing cookies, and cookie consent
                    preference cookies. They do not require your consent and
                    cannot be disabled.
                  </p>

                  <h3>3.2 Functional Cookies</h3>
                  <p>
                    These allow us to remember choices you make and provide
                    enhanced, personalised features across all services,
                    including display preferences, language settings, and
                    notification preferences. If you disable these, some
                    features may not function correctly.
                  </p>

                  <h3>3.3 Analytics and Performance Cookies</h3>
                  <p>
                    These collect anonymised information about how all user
                    categories use the Platform — which features are most used,
                    session durations, and error rates — to improve all
                    services. These require your consent. Third-party analytics
                    providers we may use include Google Analytics (with IP
                    anonymisation enabled and advertising features disabled).
                  </p>

                  <h3>3.4 Marketing and Targeting Cookies</h3>
                  <p>
                    These may be set by our advertising partners to build a
                    profile of interests and display relevant advertising on
                    other websites. They are deployed only on the public
                    marketing website (capavate.com), not within the
                    authenticated application (app.capavate.com). They require
                    prior consent and may be withdrawn at any time.
                  </p>

                  <h3>3.5 Partner and Integration Cookies</h3>
                  <p>
                    Where you access services provided by Industry Partners
                    through the Platform, those partners may set their own
                    cookies to enable their integrated services. These are
                    third-party cookies subject to the privacy and cookie
                    policies of the respective Industry Partner. We require all
                    Industry Partners to disclose their cookie usage to us and
                    to comply with applicable cookie law. A list of active
                    partner cookie providers is available on request at{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    .
                  </p>

                  <h3>3.6 Security Cookies</h3>
                  <p>
                    Cookies that support Platform security across all services,
                    including fraud detection, bot traffic identification, and
                    security attack prevention. These are strictly necessary and
                    cannot be disabled.
                  </p>

                  <h2>4. Third-Party Cookies</h2>
                  <p>
                    Some third-party services integrated into the Platform —
                    including Industry Partner integrations, embedded content,
                    and analytics tools — may set their own cookies
                    independently. We do not control these cookies; they are
                    subject to the privacy and cookie policies of the respective
                    third parties. A list of material third-party cookie
                    providers is available on request at{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    .
                  </p>

                  <h2>5. Cookie Duration</h2>
                  <ul>
                    <li>
                      Session cookies: expire at the end of your browsing
                      session;
                    </li>
                    <li>
                      Functional preference cookies: typically persist for up to
                      12 months;
                    </li>
                    <li>
                      Analytics cookies: typically persist for 13 months or less
                      (in line with PCPD, CNIL, and ICO guidance);
                    </li>
                    <li>
                      Cookie consent preference cookies: persist for up to 12
                      months, after which your consent will be re-requested.
                    </li>
                  </ul>

                  <h2>6. Managing Your Cookie Preferences</h2>
                  <p>
                    When you first visit the Platform, you will be presented
                    with a cookie consent banner allowing you to accept or
                    reject non-essential cookies. You can update your
                    preferences at any time via the cookie settings link in the
                    website footer. You may also manage or delete cookies
                    through your browser settings. Disabling strictly necessary
                    cookies will impair Platform functionality. For opting out
                    of Google Analytics across all websites, use the{" "}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Analytics Opt-out Browser Add-on
                    </a>
                    .
                  </p>

                  <h2>7. Changes to This Policy</h2>
                  <p>
                    We may update this Cookie Policy at any time. Where changes
                    are material, we will notify you and, where required, seek
                    your renewed consent.
                  </p>

                  <h2>8. Contact</h2>
                  <p>
                    For questions about cookies:{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    <br />
                    Blueprint Catalyst Limited · Incorporated in Hong Kong
                  </p>
                </div>
              </section>
            )}
            {activeSection === "acceptable-use" && (
              <section className="legal-section active" id="acceptable-use">
                <div className="legal-section-header">
                  <div className="legal-label">Legal Document</div>
                  <h1 className="legal-title">Acceptable Use Policy</h1>
                  <p className="legal-meta">
                    Last updated: 17 March 2026 · Blueprint Catalyst Limited ·
                    Incorporated in Hong Kong
                  </p>
                </div>
                <div class="legal-body">
                  <div class="legal-highlight">
                    <p>
                      Capavate is a closed, verified, invitation-gated network.
                      The integrity, trust, and quality of this community depend
                      upon every user — including founders, investors, industry
                      partners, third-party affiliates, and any other
                      participant — conducting themselves with professionalism,
                      honesty, and strict respect for applicable law across all
                      services. This Acceptable Use Policy ("AUP") forms part of
                      and is incorporated into our Terms of Service. Breach of
                      this AUP constitutes a material breach of the Terms of
                      Service and may result in immediate account suspension or
                      termination, reporting to regulatory or law enforcement
                      authorities, civil proceedings, and criminal liability.
                    </p>
                  </div>

                  <h2>1. Purpose and Scope</h2>
                  <p>
                    This AUP applies to all use of all Capavate services by all
                    Member categories — including Founders, Investors, Industry
                    Partners, Third-Party Affiliates, and any other user of any
                    Capavate service, whether via the web platform, mobile
                    application, API, or any partner integration. It applies to
                    all content submitted, all communications made, all
                    connections formed, and all services accessed through or in
                    connection with the Platform. This list of prohibited
                    conduct is illustrative and not exhaustive. Capavate
                    reserves the right to enforce this AUP at its sole
                    discretion across all services and all user categories.
                  </p>

                  <h2>2. Permitted Use</h2>
                  <p>
                    All Capavate services are designed to facilitate legitimate,
                    lawful, and professional activity. Permitted uses include:
                  </p>
                  <ul>
                    <li>
                      <strong>Founders</strong>: managing cap table data;
                      running fundraising rounds; sharing verified company
                      updates and deal information with Investors; using M&amp;A
                      intelligence tools; accessing Entrepreneur Academy
                      content;
                    </li>
                    <li>
                      <strong>Investors</strong>: reviewing deal flow and
                      company information; connecting with verified co-investors
                      and Founders; participating in angel syndicate activity in
                      full compliance with applicable securities law; managing
                      portfolio relationships via the Investor CRM;
                    </li>
                    <li>
                      <strong>Industry Partners</strong>: delivering agreed
                      services to Members through authorised platform
                      integrations; sharing professional content in compliance
                      with applicable regulatory and professional standards;
                    </li>
                    <li>
                      <strong>Third-Party Affiliates</strong>: referring
                      potential Members to the Platform honestly and in
                      accordance with the applicable Affiliate Agreement;
                      promoting the Platform truthfully and without making
                      misleading claims.
                    </li>
                  </ul>

                  <h2>3. Prohibited Conduct</h2>
                  <p>
                    The following conduct is strictly prohibited across all
                    Capavate services and for all Member categories. This list
                    is illustrative and not exhaustive:
                  </p>

                  <h3>3.1 Misrepresentation and Fraud (all user categories)</h3>
                  <ul>
                    <li>
                      Publishing false, misleading, fabricated, or materially
                      inaccurate information of any kind, including false
                      financial metrics, exaggerated traction or revenue claims,
                      misleading company valuations, or false fund performance
                      data;
                    </li>
                    <li>
                      Impersonating another person, company, fund, or entity, or
                      falsely claiming credentials, qualifications, regulatory
                      authorisation, or investor status;
                    </li>
                    <li>
                      Submitting false or fraudulent identity or eligibility
                      documentation to Capavate or to the companies and advisers
                      whose diligence Capavate relies upon for Platform access;
                    </li>
                    <li>
                      Misrepresenting the nature, terms, structure, or status of
                      any investment transaction, deal, or corporate event;
                    </li>
                    <li>
                      Creating multiple accounts or registering under a false
                      identity;
                    </li>
                    <li>
                      <strong>
                        Industry Partners and Affiliates specifically
                      </strong>
                      : misrepresenting the nature of their services,
                      qualifications, or the terms of their arrangement with
                      Capavate to Members or prospective Members.
                    </li>
                  </ul>

                  <h3>3.2 Securities Law Violations (all user categories)</h3>
                  <ul>
                    <li>
                      Making public or general offers to sell, purchase, or
                      subscribe for securities, or soliciting investment, in any
                      manner that violates applicable securities law, including
                      the Hong Kong Securities and Futures Ordinance (Cap. 571)
                      ("SFO"), the UK Financial Services and Markets Act 2000
                      ("FSMA"), the US Securities Act of 1933, the US Securities
                      Exchange Act of 1934, and equivalent legislation in any
                      jurisdiction;
                    </li>
                    <li>
                      Facilitating or participating in an unregulated collective
                      investment scheme;
                    </li>
                    <li>
                      Providing investment advice, financial advice, or
                      portfolio management services without the requisite
                      regulatory authorisation in the relevant jurisdiction;
                    </li>
                    <li>
                      Engaging in insider trading, market manipulation, or any
                      other form of market abuse in relation to any security,
                      financial instrument, or asset;
                    </li>
                    <li>
                      Making representations constituting the promotion of
                      financial products in contravention of applicable
                      financial promotion rules, including restrictions under
                      the SFO (Hong Kong), Section 21 FSMA (United Kingdom), and
                      equivalent rules in all applicable jurisdictions;
                    </li>
                    <li>
                      <strong>Industry Partners specifically</strong>: providing
                      regulated financial services through the Platform without
                      the requisite authorisation from the SFC, FCA, SEC, or
                      applicable regulator in the relevant jurisdiction.
                    </li>
                  </ul>

                  <h3>3.3 Financial Crime (all user categories)</h3>
                  <ul>
                    <li>
                      Using the Platform or any Capavate service to facilitate,
                      promote, or engage in money laundering, terrorist
                      financing, tax evasion, bribery, corruption, fraud, or any
                      other financial crime;
                    </li>
                    <li>
                      Accepting or transferring funds from or to sanctioned
                      persons, entities, or jurisdictions;
                    </li>
                    <li>
                      Engaging in layering, structuring, or other financial
                      crime evasion techniques — compliance with AML and CTF
                      obligations is the sole responsibility of each Member and
                      the regulated entities through which they operate, not
                      Capavate.
                    </li>
                  </ul>

                  <h3>
                    3.4 Spam, Solicitation, and Data Misuse (all user
                    categories)
                  </h3>
                  <ul>
                    <li>
                      Sending unsolicited commercial messages, investment
                      pitches, or advertising to other Members ("cold
                      solicitation");
                    </li>
                    <li>
                      Mass messaging, bulk communications, or automated message
                      sending not authorised by Capavate;
                    </li>
                    <li>
                      Harvesting, collecting, or exporting Member contact
                      information or Platform data for use outside the Platform
                      or in breach of these Terms;
                    </li>
                    <li>
                      Using the Platform to drive traffic to external platforms
                      or services for commercial gain not expressly authorised
                      by Capavate;
                    </li>
                    <li>
                      <strong>Third-Party Affiliates specifically</strong>:
                      using Member data obtained through the Platform in the
                      course of referral activity for any purpose other than the
                      agreed referral, without explicit consent.
                    </li>
                  </ul>

                  <h3>
                    3.5 Harmful, Offensive, and Illegal Content (all user
                    categories)
                  </h3>
                  <ul>
                    <li>
                      Posting, sharing, or transmitting content that is
                      defamatory, libellous, obscene, threatening, abusive,
                      harassing, hateful, discriminatory, or that incites
                      violence or hatred against any person or group;
                    </li>
                    <li>
                      Posting content that infringes the Intellectual Property
                      Rights, privacy rights, or other rights of any third
                      party;
                    </li>
                    <li>
                      Posting content that violates any applicable law or
                      regulation, including content constituting a criminal
                      offence in any jurisdiction;
                    </li>
                    <li>
                      Distributing malware, viruses, ransomware, trojan horses,
                      spyware, or any other malicious code through any Capavate
                      service.
                    </li>
                  </ul>

                  <h3>
                    3.6 Profile Integrity and Identity Misrepresentation (all
                    user categories)
                  </h3>
                  <ul>
                    <li>
                      Creating, maintaining, or using a Member profile that
                      misrepresents your identity, professional credentials,
                      investment status, company affiliation, regulatory
                      authorisation, or any other material attribute;
                    </li>
                    <li>
                      Impersonating any other person, company, fund, regulatory
                      body, or other entity in a profile, message, or any other
                      communication on the Platform;
                    </li>
                    <li>
                      Representing yourself as an Accredited Investor,
                      Professional Investor, or equivalent category when you do
                      not independently meet the applicable eligibility standard
                      in your jurisdiction;
                    </li>
                    <li>
                      Using false or forged documentation to establish or
                      maintain a Member account or to satisfy any eligibility
                      requirement;
                    </li>
                    <li>
                      Creating or operating multiple accounts for the same
                      individual or entity without Capavate's prior written
                      consent;
                    </li>
                    <li>
                      Using another person's account, credentials, or identity
                      to access the Platform, whether with or without their
                      knowledge;
                    </li>
                    <li>
                      Failing to promptly update profile information following a
                      material change in your status, affiliation, regulatory
                      authorisation, or investor eligibility.
                    </li>
                  </ul>

                  <h3>
                    3.7 AI and Automated Tool Misuse (all user categories)
                  </h3>
                  <ul>
                    <li>
                      Using any AI-assisted tool or feature of the Platform to
                      generate, produce, or distribute false, misleading, or
                      synthetic content — including fabricated company data,
                      synthetic financial projections, AI-generated deal terms,
                      or machine-generated testimonials or endorsements — and
                      presenting such content as genuine;
                    </li>
                    <li>
                      Using AI-assisted features to process, summarise, or
                      extract information about third parties from the Platform
                      in a manner that violates the privacy rights of those
                      individuals, breaches confidentiality obligations, or
                      contravenes applicable data protection law;
                    </li>
                    <li>
                      Submitting special categories of personal data, material
                      non-public information, confidential cap table data, or
                      commercially sensitive third-party information to any AI
                      feature of the Platform or any third-party AI service
                      accessed through the Platform;
                    </li>
                    <li>
                      Using automated tools or AI agents to conduct mass
                      outreach, generate connection requests at scale, or
                      automate any activity on the Platform in a manner not
                      expressly authorised by Capavate;
                    </li>
                    <li>
                      Attempting to extract, reverse engineer, or replicate any
                      AI model, recommendation algorithm, or trust scoring
                      system used by the Platform through interaction patterns,
                      probe queries, or any other method.
                    </li>
                  </ul>

                  <h3>
                    3.8 Social Features, User-Generated Content, and Community
                    Standards (all user categories)
                  </h3>
                  <p>
                    The following conduct is strictly prohibited across all
                    Social Features of the Platform, including cap table
                    shareholder communications, the Capavate Angel Network, the
                    International Entrepreneur Academy, community forums, deal
                    rooms, profile pages, message features, syndicate
                    communications, and all other areas of the Platform through
                    which Content may be posted, shared, or disseminated to one
                    or more persons:
                  </p>
                  <ul>
                    <li>
                      <strong>Misleading or false content.</strong> Posting,
                      sharing, or otherwise contributing any content that is
                      knowingly false, materially misleading, deliberately
                      deceptive, fabricated, or that misrepresents any material
                      fact — including false financial metrics, exaggerated
                      company performance, fabricated investor interest,
                      misleading valuations, or unsubstantiated business claims;
                    </li>
                    <li>
                      <strong>Defamatory and harmful statements.</strong>{" "}
                      Posting content that is defamatory, libellous, or
                      constitutes a malicious falsehood in respect of any
                      individual, company, fund, or other entity — regardless of
                      whether that individual or entity is a Member of the
                      Platform or a third party;
                    </li>
                    <li>
                      <strong>Unauthorised financial promotion.</strong> Posting
                      content that constitutes an invitation, inducement, or
                      solicitation to engage in investment activity — including
                      deal invitations, co-investment solicitations, syndicate
                      promotions, or any other form of financial promotion — in
                      any jurisdiction in which you do not hold the requisite
                      regulatory authorisation or in breach of any applicable
                      financial promotion restriction;
                    </li>
                    <li>
                      <strong>
                        Insider information and market-sensitive disclosures.
                      </strong>{" "}
                      Posting, sharing, or causing to be shared any material
                      non-public information, price-sensitive information, or
                      inside information in contravention of applicable insider
                      dealing, tipping, or market abuse laws in any
                      jurisdiction;
                    </li>
                    <li>
                      <strong>Impersonation and false attribution.</strong>{" "}
                      Posting content under a false identity, impersonating
                      another Member or third party, falsely attributing
                      statements or positions to another person or entity, or
                      otherwise misrepresenting your identity or credentials in
                      connection with any content you post;
                    </li>
                    <li>
                      <strong>Unauthorised personal data.</strong> Posting
                      content that includes personal data or sensitive
                      information about identifiable individuals without their
                      consent and without a lawful basis for such disclosure,
                      including the disclosure of a person's financial position,
                      shareholding, investment history, contact details, or
                      other personal attributes;
                    </li>
                    <li>
                      <strong>Cap table misuse.</strong> Using cap table
                      announcement or shareholder communication features to
                      transmit content for any purpose other than legitimate
                      corporate communications with your company's shareholders
                      and authorised parties;
                    </li>
                    <li>
                      <strong>Angel Network conduct.</strong> Using the Capavate
                      Angel Network to post deal opportunities without lawful
                      authority to share them; to misrepresent deal terms,
                      valuations, or investor interest; or to solicit investment
                      in any jurisdiction where not appropriately authorised;
                    </li>
                    <li>
                      <strong>Academy content standards.</strong> Contributing
                      content to the International Entrepreneur Academy that
                      constitutes unregulated professional advice, is
                      intentionally misleading, plagiarises the work of others,
                      or is designed primarily for commercial promotion rather
                      than genuine educational value;
                    </li>
                    <li>
                      <strong>Harassment and targeting.</strong> Using any
                      Social Feature to repeatedly contact, target, intimidate,
                      threaten, or harass any individual Member or third party;
                    </li>
                    <li>
                      <strong>Coordinated inauthentic behaviour.</strong> Using
                      multiple accounts or coordinating with others to create
                      false impressions of community consensus, deal legitimacy,
                      or investor interest;
                    </li>
                    <li>
                      <strong>Cross-platform reposting without consent.</strong>{" "}
                      Copying, publishing, or causing to be published content
                      from closed or restricted areas of the Platform to any
                      external channel without the express consent of the
                      original contributor and Capavate.
                    </li>
                  </ul>
                  <p>
                    Each Member is solely responsible for ensuring that all
                    content they post through any Social Feature complies with
                    this Section, all applicable law, and all other provisions
                    of this AUP. Capavate reserves the right to take immediate
                    enforcement action, including content removal and account
                    suspension or termination, in response to any breach,
                    without prior notice.
                  </p>

                  <h3>3.9 Platform and API Abuse (all user categories)</h3>
                  <ul>
                    <li>
                      Attempting to gain unauthorised access to any account,
                      system, data, or network component belonging to Capavate
                      or any Member;
                    </li>
                    <li>
                      Conducting or facilitating denial-of-service attacks,
                      brute-force attacks, or any other form of security attack
                      against the Platform or its infrastructure;
                    </li>
                    <li>
                      Using automated tools, bots, scrapers, or crawlers to
                      access, extract, or copy Platform content or data without
                      express written consent;
                    </li>
                    <li>
                      Circumventing or attempting to circumvent any security,
                      access control, or authentication measure on any Capavate
                      service;
                    </li>
                    <li>
                      Interfering with or disrupting the integrity or
                      performance of the Platform, any API, or any partner
                      integration;
                    </li>
                    <li>
                      Reverse-engineering, decompiling, or attempting to extract
                      source code from any Platform software or API;
                    </li>
                    <li>
                      <strong>
                        Industry Partners and API users specifically
                      </strong>
                      : using API access for any purpose beyond that expressly
                      authorised in the applicable Partner or API access
                      agreement; sharing API credentials with unauthorised
                      parties; or using API access to build a competing product.
                    </li>
                  </ul>

                  <h3>
                    3.10 Conflicts of Interest and Undisclosed Commercial
                    Relationships
                  </h3>
                  <ul>
                    <li>
                      All Members — particularly Industry Partners and
                      Third-Party Affiliates — must not use the Platform to
                      promote products or services in which they have a material
                      commercial interest without clearly disclosing that
                      interest;
                    </li>
                    <li>
                      Industry Partners must not direct Members toward their own
                      services or products without disclosing their commercial
                      relationship with Capavate or the Member;
                    </li>
                    <li>
                      Third-Party Affiliates must not promote the Platform in a
                      manner that implies an endorsement, accreditation, or
                      qualification they do not hold.
                    </li>
                  </ul>

                  <h2>4. Reporting Violations</h2>
                  <p>
                    If you become aware of conduct by any Member — including an
                    Industry Partner or Third-Party Affiliate — that you believe
                    violates this AUP, report it promptly via in-platform
                    reporting tools or by emailing{" "}
                    <a href="mailto:trust@capavate.com">trust@capavate.com</a>.
                    Provide the nature of the violation, relevant content or
                    communication, and any supporting evidence. Reports made in
                    good faith will be treated confidentially to the extent
                    practicable. We will investigate all reports and take action
                    we consider appropriate.
                  </p>

                  <h2>5. Enforcement and Notice-and-Takedown</h2>

                  <h3>5.1 Enforcement Actions</h3>
                  <p>
                    Capavate reserves the right, in its sole discretion, to take
                    any one or more of the following actions in response to a
                    breach of this AUP by any user category:
                  </p>
                  <ul>
                    <li>
                      Issue a formal warning with a specified remedy period;
                    </li>
                    <li>
                      Remove, restrict, or edit Content that violates this AUP
                      without prior notice;
                    </li>
                    <li>
                      Geo-restrict access to the Platform or specific features
                      from certain jurisdictions;
                    </li>
                    <li>
                      Temporarily restrict access to any or all features or
                      services pending investigation;
                    </li>
                    <li>
                      Suspend the Member's account pending investigation, with
                      or without notice;
                    </li>
                    <li>
                      Permanently terminate the Member's account and any Partner
                      or Affiliate Agreement;
                    </li>
                    <li>
                      Withhold or claw back any referral or affiliate
                      compensation in the event of breach by a Third-Party
                      Affiliate;
                    </li>
                    <li>
                      Report the Member and relevant conduct to applicable law
                      enforcement authorities and regulatory bodies, including
                      the Hong Kong Police Force, the Securities and Futures
                      Commission (SFC), the UK Financial Conduct Authority
                      (FCA), the UK National Crime Agency (NCA), the US
                      Securities and Exchange Commission (SEC), the Monetary
                      Authority of Singapore (MAS), Europol, INTERPOL, and
                      equivalent authorities in other jurisdictions, where
                      Capavate is legally required or permitted to do so;
                    </li>
                    <li>
                      Pursue civil legal proceedings, including seeking urgent
                      ex parte injunctive relief, specific performance, account
                      of profits, aggravated or exemplary damages, and costs on
                      a full indemnity basis.
                    </li>
                  </ul>
                  <p>
                    We are not obligated to give advance notice before taking
                    enforcement action, particularly where the conduct poses an
                    immediate risk to the Platform, its Members, or third
                    parties. Enforcement actions are not subject to any
                    obligation of proportionality unless required by applicable
                    law. Capavate's enforcement decisions are final, subject
                    only to the appeals procedure in Section 6.
                  </p>

                  <h3>5.2 Notice-and-Takedown Procedure</h3>
                  <p>
                    Any person — whether or not a Member of the Platform — who
                    believes that content available on the Platform infringes
                    their legal rights (including Intellectual Property Rights,
                    privacy rights, defamation rights, or any other legal right)
                    may submit a formal notice-and-takedown request to{" "}
                    <a href="mailto:trust@capavate.com">trust@capavate.com</a>.
                    A valid takedown notice must include:
                  </p>
                  <ul>
                    <li>
                      The full name and contact details of the notifying party;
                    </li>
                    <li>
                      A precise description of the content that is alleged to be
                      infringing or unlawful, including its location on the
                      Platform to the extent known;
                    </li>
                    <li>
                      A clear statement of the legal rights alleged to be
                      infringed and the factual basis for the allegation;
                    </li>
                    <li>
                      A statement that the notifying party believes in good
                      faith that the use of the content is not authorised by the
                      rights holder, its agent, or applicable law;
                    </li>
                    <li>
                      A declaration that the information in the notice is
                      accurate and, where relevant, that the notifying party is
                      the rights holder or is authorised to act on behalf of the
                      rights holder;
                    </li>
                    <li>
                      Where an IP claim is made: the specific IP right(s)
                      alleged to be infringed and details of the relevant
                      registration (if applicable).
                    </li>
                  </ul>
                  <p>
                    Capavate will acknowledge receipt of a valid takedown notice
                    within five (5) business days and will conduct an expedited
                    review. Where the notice is well-founded, Capavate will take
                    reasonable steps to remove or restrict access to the
                    relevant content promptly. Capavate reserves the right to
                    notify the Member who posted the content of the notice and
                    the basis for any action taken. Takedown notices that are
                    knowingly false or materially misleading may expose the
                    notifying party to civil liability for any resulting harm,
                    including to the Member whose content was removed.
                  </p>

                  <h3>5.3 GDPR Data Subject Rights — Preservation of Rights</h3>
                  <p>
                    Nothing in this AUP limits, restricts, or waives any rights
                    a data subject holds under the EU GDPR, UK GDPR, PDPO, or
                    any other applicable data protection legislation, including
                    the right to access, rectification, erasure, restriction,
                    portability, and objection. Any enforcement action taken by
                    Capavate under this AUP that affects personal data will be
                    exercised in compliance with applicable data protection law.
                    Where enforcement requires processing personal data for
                    purposes of fraud prevention, safety, or security, that
                    processing is carried out on the basis of legitimate
                    interests (Article 6(1)(f) EU/UK GDPR). Data subjects
                    wishing to exercise data protection rights in connection
                    with enforcement matters should contact{" "}
                    <a href="mailto:privacy@capavate.com">
                      privacy@capavate.com
                    </a>
                    .
                  </p>

                  <h2>6. Appeals</h2>
                  <p>
                    Members who believe an enforcement action was taken against
                    their account in error may submit a written appeal to{" "}
                    <a href="mailto:trust@capavate.com">trust@capavate.com</a>{" "}
                    within fourteen (14) days of notification. Appeals must
                    include the Member's full name, account email, description
                    of the enforcement action, and reasons for the appeal. We
                    will respond within thirty (30) days. Our decision on appeal
                    is final. The right to appeal does not affect Capavate's
                    ability to take immediate action to protect the Platform or
                    its Members.
                  </p>

                  <h2>7. Member Indemnification</h2>
                  <p>
                    By accepting this AUP — which applies equally to Founders,
                    Investors, Industry Partners, and Third-Party Affiliates —
                    you agree to indemnify, defend, and hold harmless Blueprint
                    Catalyst Limited and its affiliates from any claims, losses,
                    liabilities, costs, and expenses (including reasonable legal
                    fees) arising from or relating to: any breach of this AUP;
                    any Content you submit to any Capavate service; any
                    violation of applicable law or third-party rights; any
                    misrepresentation in connection with your use of the
                    Platform; and, in the case of Industry Partners and
                    Affiliates, any claim arising from your services,
                    integrations, or promotional activity.
                  </p>

                  <h2>8. Updates</h2>
                  <p>
                    We may update this AUP at any time. Continued use of any
                    Capavate service following notice of an update constitutes
                    acceptance.
                  </p>

                  <h2>9. Contact</h2>
                  <p>
                    For AUP questions:{" "}
                    <a href="mailto:trust@capavate.com">trust@capavate.com</a>
                    <br />
                    Blueprint Catalyst Limited · Incorporated in Hong Kong
                  </p>
                </div>
              </section>
            )}
            {activeSection === "disclaimer" && (
              <section className="legal-section active" id="disclaimer">
                <div className="legal-section-header">
                  <div className="legal-label">Legal Document</div>
                  <h1 className="legal-title">Disclaimer</h1>
                  <p className="legal-meta">
                    Last updated: 17 March 2026 · Blueprint Catalyst Limited ·
                    Incorporated in Hong Kong
                  </p>
                </div>
                <div class="legal-body">
                  <div class="legal-highlight">
                    <p>
                      This Disclaimer applies to all users of the Capavate
                      platform and all associated services globally, regardless
                      of jurisdiction of residence, and regardless of user
                      category — including founders, investors, industry
                      partners, third-party affiliates, and any other person or
                      entity accessing or interacting with any Capavate service
                      in any capacity. It is designed to be read together with
                      our Terms of Service, Privacy Policy, Acceptable Use
                      Policy, and Cookie Policy. By accessing or using any
                      Capavate service in any way, you acknowledge that you have
                      read, understood, and agree to be bound by this Disclaimer
                      in full.
                    </p>
                  </div>

                  <h2>1. No Financial, Investment, or Professional Advice</h2>
                  <p>
                    The Capavate Platform and all associated services —
                    including all content, tools, data, features, API outputs,
                    partner integrations, educational content (including
                    Entrepreneur Academy), community discussions, deal flow
                    information, M&amp;A intelligence, cap table data, and
                    communications available on or through any Capavate service
                    — are provided for general informational and educational
                    purposes only. Nothing on the Platform or provided through
                    any Capavate service constitutes, or should be construed as
                    constituting, financial advice, investment advice,
                    securities advice, tax advice, accounting advice, legal
                    advice, or any other form of professional or regulated
                    advice, regardless of whether that content is provided by
                    Capavate, by a Member (including a Founder, Investor, or
                    Industry Partner), by a Third-Party Affiliate, or by any
                    automated or AI-assisted feature of the Platform. No content
                    on any Capavate service represents a recommendation,
                    endorsement, solicitation, or offer to buy or sell any
                    security, financial instrument, investment product, or other
                    asset of any kind. You acknowledge that Capavate is not
                    authorised or regulated by the Securities and Futures
                    Commission of Hong Kong ("SFC"), the UK Financial Conduct
                    Authority ("FCA"), the US Securities and Exchange Commission
                    ("SEC"), the Monetary Authority of Singapore ("MAS"), the
                    Australian Securities and Investments Commission ("ASIC"),
                    or any equivalent financial regulatory authority in any
                    jurisdiction, as a financial adviser, investment adviser,
                    portfolio manager, broker-dealer, or investment manager, and
                    that Capavate does not provide regulated investment advice,
                    discretionary portfolio management, or any other regulated
                    financial service.
                  </p>
                  <p>
                    Where an Industry Partner providing services through the
                    Platform holds applicable regulatory authorisation, any
                    advice or regulated service provided by that partner is
                    provided solely by that partner in its own capacity, and not
                    by Capavate. Capavate makes no representation as to the
                    quality, accuracy, or regulatory compliance of any advice or
                    service provided by an Industry Partner, and accepts no
                    liability in connection therewith.
                  </p>

                  <h2>2. Investment Risk Warning</h2>
                  <p>
                    Investing in early-stage, growth-stage, and private
                    companies carries a high degree of risk, including the risk
                    of total loss of the capital invested. Private company
                    investments are illiquid — there is no guarantee you will be
                    able to sell or transfer your investment or that any
                    financial return will be achieved. Past performance of
                    companies, investments, or funds discussed on or connected
                    to any Capavate service is not indicative of, and provides
                    no guarantee of, future results. Valuations of private
                    companies are inherently speculative and uncertain. Cap
                    table data and equity information presented on the Platform
                    reflects data submitted by Founders and other Members and
                    has not been independently verified by Capavate. You must
                    conduct independent due diligence on any investment
                    opportunity identified via any Capavate service and obtain
                    advice from a suitably qualified and authorised financial
                    adviser before committing any capital. This risk warning
                    applies equally to Investors, Industry Partners advising on
                    investments, and any other party making or facilitating
                    investment decisions through or in connection with the
                    Platform.
                  </p>

                  <h2>3. No Securities Offer or Solicitation</h2>
                  <p>
                    Nothing on the Capavate Platform or provided through any
                    Capavate service constitutes, or is intended to constitute,
                    a public offer of securities, a prospectus, an offering
                    circular, a private placement memorandum, an investment
                    advertisement, or any other document inviting participation
                    in or subscription to any investment, fund, or financial
                    instrument. Any actual investment transaction, if undertaken
                    between Members, will be: governed exclusively by separate
                    definitive legal agreements between the relevant parties;
                    the sole legal and financial responsibility of those
                    parties; and subject to all applicable securities laws, AML
                    requirements, and regulations in all relevant jurisdictions
                    — compliance with which is the sole responsibility of the
                    transacting parties, not Capavate. Capavate does not act as
                    an intermediary, agent, broker, placement agent, arranger,
                    custodian, facilitator, or AML-regulated entity in
                    connection with any investment transaction, and accepts no
                    liability for the AML, securities law, or regulatory
                    compliance of any Member or transaction.
                  </p>

                  <h2>
                    4. No Liability for Industry Partner or Affiliate Services
                  </h2>
                  <p>
                    Industry Partners who provide services through or alongside
                    the Platform do so independently of Capavate and on the
                    basis of their own separate terms of business. Capavate does
                    not verify, endorse, or guarantee the quality, accuracy,
                    legality, suitability, or regulatory compliance of any
                    Industry Partner's services, advice, content, or products.
                    Any engagement with an Industry Partner's services — whether
                    accessed through the Platform or otherwise — is entirely at
                    your own risk. Capavate accepts no liability for: any
                    advice, recommendation, or analysis provided by any Industry
                    Partner; any loss or damage arising from the use of any
                    Industry Partner's services; any failure of an Industry
                    Partner to hold the requisite regulatory authorisation; or
                    any contractual dispute between a Member and an Industry
                    Partner. Third-Party Affiliates act independently of
                    Capavate in their referral and promotional activities.
                    Capavate accepts no liability for any representations,
                    claims, or promises made by a Third-Party Affiliate in the
                    course of promoting the Platform, beyond the factual
                    information contained in Capavate's own materials.
                  </p>

                  <h2>5. Accredited and Sophisticated Investors</h2>
                  <p>
                    Certain features of the Capavate Platform are accessible
                    only to persons who qualify as Accredited Investors or
                    equivalent categorisations under applicable law. By
                    accessing those features, you represent, warrant, and
                    confirm that: (a) you meet the applicable eligibility
                    criteria in your jurisdiction; (b) you have independently
                    verified your eligibility; and (c) you will notify Capavate
                    immediately if you cease to meet the applicable criteria. It
                    is your sole responsibility to ensure that your use of the
                    Platform and any investment activity conducted through or as
                    a result of connections made on the Platform complies with
                    the laws and regulations of all jurisdictions applicable to
                    you. Applicable eligibility frameworks include
                    (illustratively, and not exhaustively):
                  </p>
                  <ul>
                    <li>
                      <strong>Hong Kong</strong>: "Professional Investor" as
                      defined under Schedule 1 to the Securities and Futures
                      Ordinance (Cap. 571) and SFC guidelines;
                    </li>
                    <li>
                      <strong>United Kingdom</strong>: "High Net Worth
                      Individual" or "Self-Certified Sophisticated Investor" as
                      defined under the Financial Services and Markets Act 2000
                      (Financial Promotion) Order 2005;
                    </li>
                    <li>
                      <strong>United States</strong>: "Accredited Investor" as
                      defined in Rule 501 of Regulation D under the Securities
                      Act of 1933;
                    </li>
                    <li>
                      <strong>European Union</strong>: "Professional Client" or
                      "Eligible Counterparty" as defined under MiFID II
                      (Directive 2014/65/EU) and national implementing
                      legislation;
                    </li>
                    <li>
                      <strong>Australia</strong>: "Wholesale Client" as defined
                      under the Corporations Act 2001;
                    </li>
                    <li>
                      <strong>Singapore</strong>: "Accredited Investor" as
                      defined under the Securities and Futures Act 2001;
                    </li>
                    <li>
                      <strong>Other jurisdictions</strong>: the equivalent
                      categorisation under applicable local securities or
                      financial services law.
                    </li>
                  </ul>
                  <p>
                    Capavate reserves the right to refuse or revoke access to
                    any person who does not, in its sole judgment, meet the
                    applicable eligibility requirements. Capavate makes no
                    representation that the Platform or any service is available
                    to or appropriate for use in any particular jurisdiction,
                    and accessing any Capavate service from jurisdictions where
                    such access is restricted or prohibited is entirely at your
                    own risk and responsibility.
                  </p>

                  <h2>
                    6. Accuracy, Completeness, and Currency of Information
                  </h2>
                  <p>
                    While Capavate takes reasonable steps to ensure accuracy of
                    its own content, we make no representations or warranties,
                    express or implied, as to the accuracy, completeness,
                    reliability, currency, suitability, or fitness for any
                    particular purpose of any content available on or through
                    any Capavate service. Content on the Platform — including
                    cap table data, company profiles, deal information,
                    valuations, M&amp;A intelligence, community discussions,
                    Industry Partner materials, and Affiliate promotional
                    content — is provided by Members, Industry Partners,
                    Third-Party Affiliates, and other third parties and has not
                    been independently verified by Capavate. Capavate expressly
                    disclaims all liability for errors, omissions, or
                    inaccuracies in any such content, and for any actions taken
                    or not taken in reliance upon it.
                  </p>

                  <h2>7. Platform and Service Availability</h2>
                  <p>
                    Capavate does not guarantee that the Platform or any service
                    will be available at all times, or that access will be
                    uninterrupted, timely, secure, or error-free. We may, at any
                    time and without prior notice, modify, update, suspend,
                    restrict, or permanently discontinue the Platform, any
                    service, any Industry Partner integration, or any API
                    feature. To the maximum extent permitted by applicable law,
                    we accept no liability for any loss or damage arising from
                    any interruption, suspension, or discontinuation of the
                    Platform or any of its services, including any impact on
                    Founders' cap table management, Investors' deal access, or
                    Industry Partners' integrations.
                  </p>

                  <h2>8. Third-Party Content and Links</h2>
                  <p>
                    The Platform may contain links to, or information derived
                    from, third-party websites, platforms, publications, data
                    providers, and services. Such links and references are
                    provided for convenience only and do not constitute an
                    endorsement by Capavate. Capavate has no control over and
                    accepts no responsibility for the content, privacy
                    practices, availability, or conduct of any third-party
                    website or service, including those of Industry Partners
                    accessed outside of the Platform. Your use of any
                    third-party service is at your own risk and governed
                    exclusively by the terms of that service.
                  </p>

                  <h2>
                    9. User-Generated Content, Social Features, and Platform
                    Liability
                  </h2>

                  <h3>
                    9.1 Nature of the Platform — Passive Intermediary and
                    Communications Conduit
                  </h3>
                  <p>
                    Capavate is a technology platform that enables its Members —
                    including Founders, Investors, Industry Partners, and
                    Third-Party Affiliates — to communicate, post, publish,
                    share, and distribute Content to one another and, in certain
                    features of the Platform, to wider audiences. In providing
                    these communications and publishing capabilities, Capavate
                    acts exclusively as a passive technical intermediary and a
                    neutral communications conduit. Capavate is not a publisher,
                    editor, author, or co-author of any user-generated Content.
                    Capavate does not originate, commission, direct, produce, or
                    exercise any editorial control or oversight over any
                    user-generated Content before it is published or
                    transmitted. This intermediary status applies to all Content
                    posted or shared through all Social Features of the
                    Platform, including without limitation: cap table
                    announcements; the Capavate Angel Network; the International
                    Entrepreneur Academy; community forums; deal rooms;
                    shareholder communications; message threads; group
                    discussions; profile pages; broadcast announcements;
                    syndicate communications; and any other current or future
                    feature through which Content is made accessible to one or
                    more persons (collectively, "Social Features" and their
                    associated content, "User-Generated Content" or "UGC").
                  </p>
                  <p>
                    The characterisation of Capavate as a passive intermediary
                    applies for all legal and regulatory purposes in all
                    jurisdictions in which the Platform is accessible, including
                    for the purposes of applicable safe harbour, hosting
                    immunity, and intermediary liability provisions under
                    applicable law, including (without limitation): Sections 230
                    and 512 of the US Communications Decency Act and Digital
                    Millennium Copyright Act; Article 14 of the EU Electronic
                    Commerce Directive (2000/31/EC) and its successors;
                    Regulation (EU) 2022/2065 (Digital Services Act); Section 5
                    of the UK Defamation Act 2013; the Electronic Transactions
                    Ordinance (Cap. 553) of Hong Kong; and equivalent
                    intermediary protection provisions in all other applicable
                    jurisdictions. Capavate does not waive, and nothing in these
                    materials should be construed as waiving, any immunity,
                    defence, or protection available to it as a passive
                    intermediary, hosting provider, or communications conduit
                    under applicable law.
                  </p>

                  <h3>
                    9.2 No Editorial Review, Verification, or Endorsement of UGC
                  </h3>
                  <p>
                    Capavate does not pre-screen, pre-moderate, review, verify,
                    investigate, fact-check, audit, validate, approve, or
                    endorse any UGC before it is posted, published, transmitted,
                    or otherwise made available through any Social Feature of
                    the Platform. This applies regardless of the nature of the
                    UGC, the prominence or reach of the Social Feature through
                    which it is shared, or the potential impact of the UGC on
                    recipients or third parties. In particular and without any
                    limitation:
                  </p>
                  <ul>
                    <li>
                      Capavate has no obligation to review, and does not review,
                      any post, announcement, update, comment, message, profile
                      statement, deal summary, educational contribution, or
                      other UGC before it appears on the Platform;
                    </li>
                    <li>
                      the absence of pre-moderation of any particular piece of
                      UGC does not constitute, and shall not be construed as
                      constituting, any approval, endorsement, validation,
                      verification, or recommendation by Capavate of that UGC or
                      the views expressed therein;
                    </li>
                    <li>
                      any UGC that remains visible on the Platform following any
                      period of time has not been approved, endorsed, or
                      verified by Capavate by virtue of its continued
                      availability alone;
                    </li>
                    <li>
                      Capavate makes no representation and gives no warranty
                      that any UGC is accurate, complete, current, reliable,
                      truthful, or legally compliant in any jurisdiction;
                    </li>
                    <li>
                      Capavate does not verify the credentials, qualifications,
                      professional standing, regulatory authorisation, identity,
                      or claims of any Member who posts UGC, and makes no
                      representation to recipients as to the identity or
                      credibility of any contributor.
                    </li>
                  </ul>

                  <h3>9.3 Cap Table Announcements — No Liability</h3>
                  <p>
                    The Platform enables Founders, company directors, authorised
                    company representatives, and in certain contexts
                    shareholders and other cap table participants, to publish
                    announcements, corporate updates, financial disclosures,
                    strategic communications, and other Content to shareholders
                    and other parties appearing on a company's cap table ("Cap
                    Table Announcements"). Cap Table Announcements may be
                    visible to all shareholders on that cap table, to
                    co-investors, or to other authorised parties. Capavate
                    expressly disclaims all responsibility and all liability of
                    any nature arising from or in connection with any Cap Table
                    Announcement, including without limitation:
                  </p>
                  <ul>
                    <li>
                      any Cap Table Announcement that is false, misleading,
                      incomplete, materially inaccurate, or that omits
                      information that a reasonable recipient might consider
                      material;
                    </li>
                    <li>
                      any Cap Table Announcement that constitutes a breach of
                      any director's duty, fiduciary obligation, shareholder
                      agreement, investment agreement, or other contractual
                      obligation of the posting party;
                    </li>
                    <li>
                      any Cap Table Announcement that constitutes, or is alleged
                      to constitute, a misleading financial disclosure, a false
                      market, or a breach of any securities law, market abuse
                      regulation, or financial promotion restriction in any
                      jurisdiction;
                    </li>
                    <li>
                      any investment, divestment, or other financial decision
                      made by any shareholder, investor, prospective investor,
                      or other person in reliance upon any Cap Table
                      Announcement;
                    </li>
                    <li>
                      any forward-looking statement, projection, financial
                      forecast, valuation assertion, or strategic prediction
                      included in any Cap Table Announcement, which may prove to
                      be materially inaccurate;
                    </li>
                    <li>
                      any confidential, proprietary, or price-sensitive
                      information included in any Cap Table Announcement that is
                      accessed, copied, retained, or further disclosed by any
                      recipient, whether authorised or otherwise;
                    </li>
                    <li>
                      any dispute between a Founder, a company, or its
                      representatives and any shareholder arising out of or in
                      connection with the content or timing of any Cap Table
                      Announcement.
                    </li>
                  </ul>
                  <p>
                    The sole legal and moral responsibility for the accuracy,
                    completeness, timeliness, and legal compliance of all Cap
                    Table Announcements rests with the individual or entity who
                    posts them. Capavate provides the technical infrastructure
                    and bears no editorial, advisory, fiduciary, or supervisory
                    role in connection with any Cap Table Announcement.
                  </p>

                  <h3>9.4 Capavate Angel Network — Content Liability</h3>
                  <p>
                    The Capavate Angel Network is a feature of the Platform
                    through which Members may share investment opportunities,
                    deal flow information, portfolio company updates,
                    co-investment proposals, market commentary, deal terms, exit
                    information, and other Content with Network participants
                    and, in some contexts, with the wider Member community
                    ("Angel Network Content"). The Capavate Angel Network is a
                    community facilitated by technology; it is not an investment
                    platform, a regulated marketplace, an authorised
                    crowdfunding platform, a placement agent, or a financial
                    services provider. Capavate's role in the Angel Network is
                    limited to providing the technical infrastructure enabling
                    Members to communicate and share information. Accordingly,
                    and without any limitation whatsoever:
                  </p>
                  <ul>
                    <li>
                      Capavate does not review, vet, endorse, recommend,
                      approve, or take any legal or editorial responsibility for
                      any Angel Network Content, regardless of the nature of
                      that Content or the seniority or credibility of the Member
                      posting it;
                    </li>
                    <li>
                      Angel Network Content does not constitute, and shall not
                      be construed as, financial advice, investment advice, a
                      financial promotion, a prospectus, an offering document, a
                      private placement memorandum, or any other regulated or
                      legally cognisable invitation to invest — unless
                      separately stated by a properly authorised party acting
                      independently of Capavate;
                    </li>
                    <li>
                      Capavate has no liability for any loss, damage, regulatory
                      consequence, reputational harm, or any other adverse
                      consequence suffered by any Member or third party arising
                      from: any Angel Network Content; any investment made or
                      not made in response to Angel Network Content; any
                      misrepresentation contained in Angel Network Content; any
                      breach of securities law arising from Angel Network
                      Content; or the global distribution and accessibility of
                      Angel Network Content;
                    </li>
                    <li>
                      Members acknowledge and accept that Angel Network Content
                      may be accessible to a global audience and may be capable
                      of further dissemination beyond the Platform; Capavate
                      exercises no control over the geographic reach of Angel
                      Network Content once posted, and accepts no liability for
                      any jurisdictional regulatory consequence arising from
                      such reach;
                    </li>
                    <li>
                      each Member who posts Angel Network Content is solely,
                      personally, and exclusively responsible for: ensuring the
                      Content does not constitute a regulated financial
                      promotion in any applicable jurisdiction without
                      appropriate regulatory authorisation; ensuring the Content
                      complies with all applicable securities laws, financial
                      services regulations, and market abuse provisions in every
                      jurisdiction in which it may be received; and ensuring the
                      Content does not constitute insider information, a
                      material non-public disclosure, or a breach of any market
                      abuse, insider dealing, or tipping prohibition under
                      applicable law.
                    </li>
                  </ul>

                  <h3>
                    9.5 International Entrepreneur Academy — Content Liability
                  </h3>
                  <p>
                    The International Entrepreneur Academy is an educational and
                    community feature of the Platform through which Founders,
                    mentors, advisers, speakers, coaches, industry
                    professionals, and other contributors may publish, upload,
                    deliver, and share educational materials, course content,
                    written guides, video content, podcasts, commentary,
                    discussion contributions, Q&amp;A responses, and other
                    Content ("Academy Content"). The International Entrepreneur
                    Academy is facilitated by Capavate as a technology platform;
                    Capavate is not the author, curator, validator, or editor of
                    Academy Content. Without any limitation whatsoever:
                  </p>
                  <ul>
                    <li>
                      Capavate accepts no liability for any Academy Content that
                      is factually inaccurate, professionally incorrect,
                      outdated, incomplete, misleading, or that in any way falls
                      short of any standard of professional, educational, or
                      advisory quality;
                    </li>
                    <li>
                      nothing in any Academy Content constitutes, or should be
                      construed as constituting, financial advice, investment
                      advice, tax advice, legal advice, accounting advice,
                      securities advice, regulatory advice, or any other
                      professional or regulated service, notwithstanding the
                      professional standing, credentials, or regulatory
                      authorisation of any individual contributor — each
                      contributor alone is responsible for ensuring their
                      contributions comply with applicable professional
                      regulatory requirements in every relevant jurisdiction;
                    </li>
                    <li>
                      Capavate accepts no liability for any action taken, or any
                      omission, by any person in reliance upon any Academy
                      Content, whether that person is a registered Platform
                      Member or any other individual who accesses Academy
                      Content through any means;
                    </li>
                    <li>
                      Academy Content may be accessible globally; contributors
                      are solely responsible for ensuring their contributions
                      comply with applicable law in every jurisdiction in which
                      they may be received, including restrictions on financial
                      promotion, unlicensed advice-giving, regulated educational
                      activities, and cross-border professional service
                      delivery;
                    </li>
                    <li>
                      Capavate accepts no liability for any claim of
                      intellectual property infringement, defamation, privacy
                      violation, misrepresentation, or other tortious harm
                      arising from any Academy Content posted by any Member or
                      contributor.
                    </li>
                  </ul>

                  <h3>
                    9.6 All Other Socially Accessible Areas — Comprehensive
                    No-Liability
                  </h3>
                  <p>
                    The Platform includes, and in the future may include, a
                    broad and evolving range of features, functions, and areas
                    through which Members and other users may post, publish,
                    share, broadcast, reply to, react to, or otherwise
                    contribute Content accessible to one or more other persons
                    (collectively, "Socially Accessible Areas"). These include,
                    without limitation: community forums and boards; discussion
                    threads; group channels; event pages; open shareholder
                    broadcasts; co-investor roundtables; deal sharing rooms;
                    referral communications; profile statements and biography
                    sections; media uploads; announcement boards; Q&amp;A
                    features; reaction and comment functionality; private
                    messages; group messages; mentor–mentee communications;
                    partner showcase areas; and any future social, networking,
                    community, or broadcast feature added to the Platform. In
                    respect of all Socially Accessible Areas, and all UGC posted
                    therein, Capavate makes the following comprehensive,
                    cumulative, and global disclaimers of liability:
                  </p>
                  <ul>
                    <li>
                      <strong>
                        No pre-publication moderation, review, or approval.
                      </strong>{" "}
                      Capavate does not pre-screen, pre-moderate, fact-check,
                      verify, legally review, or otherwise editorially review
                      any UGC in any Socially Accessible Area of the Platform
                      before it is published, transmitted, or made accessible.
                      The absence of pre-publication review in respect of any
                      UGC does not constitute its endorsement, validation, or
                      approval by Capavate in any form.
                    </li>
                    <li>
                      <strong>
                        No endorsement, verification, or assumption of
                        responsibility for UGC.
                      </strong>{" "}
                      The views, opinions, statements, analyses, assertions,
                      positions, projections, predictions, commentary, advice,
                      promotions, announcements, and all other expressions of
                      any kind contained in any UGC reflect solely the views and
                      opinions of the individual contributor and not the views,
                      positions, policies, or endorsements of Capavate,
                      Blueprint Catalyst Limited, or any of their officers,
                      directors, employees, agents, or affiliates. Capavate
                      neither adopts nor endorses any UGC by reason of hosting,
                      transmitting, or facilitating access to it.
                    </li>
                    <li>
                      <strong>
                        No verification of contributor identity, credentials, or
                        claims.
                      </strong>{" "}
                      Capavate does not independently verify the identity,
                      credentials, professional qualifications, track record,
                      regulatory status, or any claims made by any Member in
                      connection with any UGC. Recipients of UGC must
                      independently verify the accuracy and credentials of any
                      contributor and should not rely on any UGC without
                      conducting their own independent investigation and, where
                      appropriate, seeking independent professional advice.
                    </li>
                    <li>
                      <strong>
                        Global reach — no control over cross-border
                        dissemination.
                      </strong>{" "}
                      UGC posted in any Socially Accessible Area of the Platform
                      may be accessible to a global audience of Platform Members
                      and may be capable of being forwarded, copied, stored,
                      quoted, referenced, or otherwise disseminated beyond the
                      Platform and outside the control of Capavate or the
                      original contributor. Capavate exercises no control over
                      the geographic reach or cross-border dissemination of any
                      UGC once published, and accepts no liability whatsoever
                      for: (i) any regulatory consequence in any jurisdiction
                      arising from the cross-border dissemination of any UGC;
                      (ii) any harm caused by UGC that has been further
                      disseminated beyond the Platform; or (iii) any inability
                      of the contributor to retract or limit the reach of UGC
                      once posted.
                    </li>
                    <li>
                      <strong>
                        Defamation, libel, and malicious falsehood.
                      </strong>{" "}
                      Capavate accepts no liability for any UGC that is
                      defamatory, libellous, or constitutes a malicious
                      falsehood, whether under the laws of Hong Kong, the United
                      Kingdom, any jurisdiction of the European Union, the
                      United States, or any other jurisdiction worldwide. All
                      such liability rests exclusively with the Member who
                      published the UGC in question. Capavate reserves the right
                      — but is not under any obligation — to remove UGC that it
                      becomes aware is or may be defamatory, and any such
                      removal does not create any duty of care or any liability
                      for failure to remove other UGC.
                    </li>
                    <li>
                      <strong>Privacy violations by contributors.</strong>{" "}
                      Capavate accepts no liability for UGC that unlawfully
                      discloses, processes, or disseminates the personal data or
                      private information of any individual. The contributor who
                      includes personal data or private information in UGC is
                      solely liable for any consequent breach of the PDPO, EU
                      GDPR, UK GDPR, or any other applicable data protection or
                      privacy law. This includes, without limitation: the
                      unauthorised disclosure of the identity, financial
                      position, health status, or other sensitive attributes of
                      any individual; the inclusion of personal data without
                      lawful basis; and the cross-border transfer of personal
                      data in UGC to recipients in jurisdictions without
                      adequate data protection.
                    </li>
                    <li>
                      <strong>
                        Securities law and financial promotion compliance.
                      </strong>{" "}
                      Capavate accepts no liability for any UGC that constitutes
                      or contains: an unauthorised financial promotion; an
                      unregulated offer of securities; a prospectus or offering
                      document that does not meet applicable regulatory
                      requirements; market manipulation; insider information; a
                      material non-public disclosure; or any other communication
                      regulated under applicable securities laws in any
                      jurisdiction. Each contributor of UGC that touches on
                      investment, securities, financial instruments, company
                      valuations, deal terms, or capital markets matters is
                      solely responsible for ensuring compliance with all
                      applicable securities and financial services regulation in
                      every jurisdiction in which their UGC may be received.
                    </li>
                    <li>
                      <strong>
                        Intellectual property infringement by contributors.
                      </strong>{" "}
                      Capavate accepts no liability for any UGC that infringes
                      the copyright, trade mark, trade secret, patent, design
                      right, database right, or any other Intellectual Property
                      Rights of any third party. The Member who posts infringing
                      UGC is solely and exclusively liable for any such
                      infringement. Capavate reserves the right to remove
                      allegedly infringing content following a valid take-down
                      notice submitted to trust@capavate.com, and the exercise
                      of this right does not constitute any assumption of
                      liability for infringement that occurred.
                    </li>
                    <li>
                      <strong>
                        Investment decisions made in reliance on UGC.
                      </strong>{" "}
                      Capavate accepts no liability for any investment decision,
                      financial commitment, business decision, or any other
                      action taken or omitted by any person — whether a Platform
                      Member or any other individual — in reliance on any UGC
                      posted in any Socially Accessible Area of the Platform.
                      All reliance on UGC for any financial, investment,
                      business, or professional purpose is entirely at the risk
                      of the relying party. Capavate does not guarantee the
                      quality, accuracy, completeness, or investment merit of
                      any information shared through UGC and expressly disclaims
                      all liability for any financial or other loss arising from
                      such reliance.
                    </li>
                    <li>
                      <strong>
                        Harm to third parties not on the Platform.
                      </strong>{" "}
                      Capavate accepts no liability for any harm suffered by any
                      person who is not a Member of the Platform but who is
                      affected by UGC posted on the Platform — including
                      individuals whose reputations, businesses, or rights are
                      adversely affected by content posted about them, or
                      individuals who receive or encounter UGC through
                      dissemination beyond the Platform. All liability for such
                      harm rests with the Member who posted the UGC in question.
                    </li>
                    <li>
                      <strong>Persistence and archiving of UGC.</strong>{" "}
                      Capavate is not responsible for and accepts no liability
                      for UGC that persists, is archived, cached, indexed, or
                      remains accessible following the deletion of that UGC from
                      the Platform — whether as a result of third-party
                      archiving services, search engine caching, or any other
                      cause beyond Capavate's reasonable control.
                    </li>
                  </ul>

                  <h3>
                    9.7 Content Moderation — Discretionary Rights Without
                    Liability or Obligation
                  </h3>
                  <p>
                    Capavate reserves the right — but does not assume any
                    obligation — to monitor, review, investigate, remove,
                    restrict access to, edit, redact, refuse to publish, or take
                    any other action in respect of any UGC at any time and
                    without prior notice, at its sole discretion, for any reason
                    or for no stated reason. Capavate may exercise this right
                    where it reasonably suspects or becomes aware that UGC:
                    violates these terms; violates the Acceptable Use Policy;
                    infringes any third-party rights; constitutes an illegal
                    communication; poses a reputational, regulatory, or legal
                    risk to the Platform; or is otherwise objectionable. The
                    exercise of, or any failure or omission to exercise,
                    Capavate's moderation rights:
                  </p>
                  <ul>
                    <li>
                      does not create any continuing obligation to monitor UGC
                      on an ongoing basis or to take action in relation to any
                      other UGC;
                    </li>
                    <li>
                      does not impose any liability on Capavate to any Member
                      whose UGC was removed, restricted, or refused;
                    </li>
                    <li>
                      does not impose any liability on Capavate to any third
                      party who alleges they were harmed by UGC that was not
                      removed, edited, or restricted;
                    </li>
                    <li>
                      does not constitute any assumption of editorial
                      responsibility for UGC that is hosted, retained, or not
                      removed;
                    </li>
                    <li>
                      does not give rise to any duty of care, voluntary
                      assumption of responsibility, or tortious liability
                      towards any Member, third party, or class of person.
                    </li>
                  </ul>
                  <p>
                    Where Capavate removes or restricts UGC, it will not be
                    required to provide any reason, explanation, or notice
                    unless required to do so by applicable law. Any appeal of a
                    moderation decision must be submitted in writing to
                    trust@capavate.com within fourteen (14) days of the action,
                    and Capavate's response to any such appeal shall be final
                    and binding to the extent permitted by applicable law.
                  </p>

                  <h3>
                    9.8 Individual Contributor — Exclusive Liability and
                    Indemnification
                  </h3>
                  <p>
                    Each Member who posts, publishes, shares, broadcasts,
                    uploads, submits, transmits, or otherwise contributes any
                    UGC to any Socially Accessible Area of the Platform —
                    including Cap Table Announcements, Capavate Angel Network
                    posts, International Entrepreneur Academy content, community
                    forum posts, profile statements, deal room contributions,
                    and all other forms of UGC — is, to the maximum extent
                    permitted by applicable law, solely, exclusively, and
                    unconditionally responsible for that UGC and all
                    consequences arising from it, including any and all
                    liability of any nature in any jurisdiction arising from:
                  </p>
                  <ul>
                    <li>
                      any civil, tortious, or equitable claim brought by any
                      person, including claims for defamation, libel, slander,
                      malicious falsehood, negligent misstatement, fraudulent
                      misrepresentation, passing off, breach of confidence,
                      invasion of privacy, misuse of private information,
                      harassment, data protection breach, copyright or trade
                      mark infringement, or inducement to breach any contract;
                    </li>
                    <li>
                      any regulatory investigation, enforcement action, or
                      disciplinary proceeding brought by any governmental,
                      regulatory, or supervisory authority in any jurisdiction,
                      including a securities regulator, financial services
                      authority, data protection supervisory authority,
                      competition authority, consumer protection authority,
                      media regulator, or law enforcement agency;
                    </li>
                    <li>
                      any criminal prosecution arising from UGC, including
                      proceedings for fraud, market manipulation, insider
                      trading, insider dealing, market abuse, financial crime,
                      money laundering, harassment, publication of false or
                      misleading information, or any other criminal offence
                      under applicable law in any jurisdiction;
                    </li>
                    <li>
                      any claim by any person who made, or refrained from
                      making, any investment, financial, or business decision in
                      whole or in part in reliance upon the UGC;
                    </li>
                    <li>
                      any cross-border regulatory, civil, or criminal
                      consequence arising from the global distribution, receipt,
                      or further dissemination of the UGC;
                    </li>
                    <li>
                      any breach of any confidentiality, non-disclosure, or
                      trade secret obligation arising from the content of the
                      UGC;
                    </li>
                    <li>
                      any privacy, data protection, or personal data-related
                      claim arising from the inclusion of personal data or
                      sensitive personal information in the UGC;
                    </li>
                    <li>
                      any harm to the reputation, business, or financial
                      position of any person referenced, identified, or
                      identifiable in the UGC.
                    </li>
                  </ul>
                  <p>
                    Each Member who contributes UGC hereby unconditionally and
                    irrevocably agrees to indemnify, defend, and hold harmless
                    Blueprint Catalyst Limited, its affiliates, subsidiaries,
                    officers, directors, employees, agents, legal advisers, and
                    service providers from and against all claims, demands,
                    actions, investigations, proceedings, losses, liabilities,
                    damages, fines, regulatory penalties, costs, and expenses of
                    any nature (including legal fees and disbursements on a full
                    indemnity basis, and any costs incurred in connection with
                    regulatory investigations or enforcement proceedings)
                    arising from or in connection with any UGC that Member has
                    contributed to any part of the Platform. This indemnity
                    obligation survives termination of the Member's account for
                    any reason and applies without limit as to jurisdiction or
                    applicable law.
                  </p>

                  <h3>9.9 No Duty to Preserve UGC — Data Retention</h3>
                  <p>
                    Capavate does not guarantee the preservation of any UGC
                    following termination or suspension of a Member's account,
                    or following the passage of time. Capavate may, subject to
                    applicable data protection law and its own data retention
                    policies, delete, archive, or anonymise UGC at any time.
                    Members are solely responsible for maintaining their own
                    copies and archives of any UGC they post. Capavate accepts
                    no liability for the loss of any UGC, whether arising from
                    technical failure, account termination, service
                    discontinuation, or any other cause.
                  </p>

                  <h3>9.10 Reporting Harmful, Unlawful, or Infringing UGC</h3>
                  <p>
                    Any person who becomes aware of UGC on the Platform that
                    they believe is defamatory, illegal, infringes their rights,
                    violates applicable law, or otherwise constitutes harmful
                    content may report it to Capavate at{" "}
                    <a href="mailto:trust@capavate.com">trust@capavate.com</a>,
                    providing: a clear description of the UGC in question; the
                    location on the Platform where it appears; the nature of the
                    alleged harm or violation; and any supporting information or
                    evidence. Capavate will review all such reports and take
                    action it considers appropriate in its sole discretion.
                    Capavate is not obligated to remove UGC solely on the basis
                    of a complaint and will make its own independent assessment.
                    Reports made in bad faith, or containing false or misleading
                    information, may themselves constitute a violation of the
                    Acceptable Use Policy. The submission of a report does not
                    create any guarantee of action or any legal obligation on
                    Capavate, and Capavate's response to or inaction on any
                    report does not give rise to any liability.
                  </p>

                  <h2>
                    10. Regulatory Compliance and Jurisdictional Responsibility
                  </h2>
                  <p>
                    All Members — including Founders, Investors, Industry
                    Partners, and Third-Party Affiliates — are solely and
                    entirely responsible for ensuring that their access to and
                    use of any Capavate service, and any investment, business,
                    or promotional activity they conduct in connection with the
                    Platform, complies with all applicable laws and regulations
                    in every jurisdiction applicable to them, including without
                    limitation: securities law and financial promotion
                    restrictions; anti-money laundering and counter-terrorism
                    financing regulations (Capavate does not conduct KYC or AML
                    checks and bears no responsibility for any Member's
                    compliance with such regulations); tax reporting,
                    withholding, and self-assessment obligations; foreign
                    investment restrictions and exchange controls; professional
                    regulatory requirements applicable to Industry Partners
                    (including any financial services or legal professional
                    regulatory obligations); data protection and privacy laws;
                    consumer protection laws; and any other sector-specific
                    regulatory requirements. Capavate provides no assurance that
                    any Capavate service is lawful to access in any particular
                    jurisdiction, and expressly excludes all liability for any
                    consequences arising from access or use in jurisdictions
                    where such access or use is restricted or prohibited.
                  </p>

                  <h2>
                    10A. Tax, Cross-Border Regulatory, and Corporate Governance
                    Liability
                  </h2>

                  <h3>10A.1 Tax Responsibility</h3>
                  <p>
                    Capavate does not provide tax advice of any kind. All tax
                    obligations arising from or in connection with any
                    investment, divestment, equity transaction, cap table event,
                    or other activity conducted through or in connection with
                    the Platform — including income tax, capital gains tax,
                    withholding tax, stamp duty, transfer tax, VAT, GST, and any
                    other applicable tax or levy in any jurisdiction — are the
                    sole and exclusive responsibility of the relevant Member.
                    Capavate accepts no liability for any tax liability,
                    penalty, interest charge, or compliance obligation arising
                    from any transaction or activity facilitated by or conducted
                    in connection with the Platform. Members are strongly
                    advised to seek independent tax advice in all relevant
                    jurisdictions before undertaking any transaction.
                  </p>

                  <h3>
                    10A.2 Cross-Border Investment and Foreign Investment
                    Restrictions
                  </h3>
                  <p>
                    Members accessing the Platform from jurisdictions that
                    impose restrictions on foreign investment, inbound capital
                    flows, or participation in certain types of investment
                    activity are solely responsible for ensuring their use of
                    the Platform and any investment activity conducted in
                    connection with it complies with all applicable foreign
                    investment laws, exchange control regulations, national
                    security review requirements, and sectoral investment
                    restrictions in every relevant jurisdiction. Capavate makes
                    no representation that any investment opportunity visible on
                    the Platform is permissible for any particular investor in
                    any particular jurisdiction, and accepts no liability for
                    any regulatory consequence, tax treatment, or legal sanction
                    arising from cross-border investment activity conducted in
                    connection with the Platform.
                  </p>

                  <h3>10A.3 Corporate Events and Cap Table Transactions</h3>
                  <p>
                    The Platform may be used to facilitate or document corporate
                    events including funding rounds, share issuances, share
                    transfers, conversions, options exercises, secondary
                    transactions, M&amp;A transactions, and other equity-related
                    events ("Corporate Events"). Capavate does not act as a
                    transfer agent, registrar, escrow agent, trustee, custodian,
                    or legal adviser in connection with any Corporate Event.
                    Capavate accepts no liability for: the legal validity,
                    enforceability, or regulatory compliance of any Corporate
                    Event facilitated through or documented on the Platform; any
                    dispute between shareholders, investors, or company
                    directors arising from or in connection with any Corporate
                    Event; any failure of a Corporate Event to comply with
                    applicable corporate law, securities regulation, or
                    shareholder agreement requirements; the accuracy of any cap
                    table record following any Corporate Event; or any loss of
                    value, dilution, or adverse financial consequence arising
                    from any Corporate Event. All Corporate Events remain the
                    sole legal responsibility of the parties to those events.
                  </p>

                  <h3>10A.4 Profile Accuracy and Reliance by Other Members</h3>
                  <p>
                    Capavate does not verify the accuracy of any information in
                    any Member's profile. All decisions — including decisions to
                    connect, invest, co-invest, engage professionally, or enter
                    any transaction — made in reliance on another Member's
                    profile information are made entirely at the relying
                    Member's own risk. Capavate accepts no liability for any
                    harm, loss, or legal consequence arising from any Member's
                    reliance on profile information that proves to be
                    inaccurate, misleading, or out of date. The Member who
                    provided inaccurate profile information is solely and
                    personally responsible for all consequences arising from any
                    third party's reliance on it.
                  </p>

                  <h2>
                    10B. AI-Assisted Features and Automated Outputs — No
                    Liability
                  </h2>
                  <p>
                    The Platform may offer AI-assisted features and automated
                    tools to assist Members with tasks including content
                    drafting, cap table modelling, deal analysis, educational
                    content delivery, and network recommendations. All outputs
                    produced by any AI-assisted feature of the Platform are
                    provided on a strictly "as is" basis for informational
                    purposes only. Capavate expressly disclaims all liability
                    for:
                  </p>
                  <ul>
                    <li>
                      the accuracy, completeness, reliability, or fitness for
                      purpose of any AI-assisted output;
                    </li>
                    <li>
                      any decision, action, or omission by any Member or third
                      party made in reliance on any AI-assisted output;
                    </li>
                    <li>
                      any financial, investment, legal, tax, regulatory, or
                      professional consequence arising from the use of any
                      AI-assisted feature;
                    </li>
                    <li>
                      any hallucination, error, bias, or inaccuracy in any
                      AI-generated content, analysis, or recommendation;
                    </li>
                    <li>
                      any data protection breach arising from a Member inputting
                      third-party personal data, confidential information, or
                      material non-public information into any AI feature;
                    </li>
                    <li>
                      any intellectual property claim arising from AI-generated
                      outputs that may resemble or reproduce third-party
                      materials.
                    </li>
                  </ul>
                  <p>
                    Members use all AI-assisted features entirely at their own
                    risk. No AI-generated output on the Platform constitutes or
                    should be relied upon as financial advice, legal advice,
                    investment advice, or any other form of professional or
                    regulated service.
                  </p>

                  <h2>11. Global Exclusion and Limitation of Liability</h2>
                  <p>
                    To the fullest extent permitted by applicable law in every
                    jurisdiction, Blueprint Catalyst Limited and its affiliates,
                    officers, directors, employees, agents, licensors, Industry
                    Partners, and service providers accept no liability
                    whatsoever — to any person, including Founders, Investors,
                    Industry Partners, Third-Party Affiliates, or any other user
                    of any Capavate service — for any loss, damage, cost, or
                    expense of any nature (whether direct, indirect, incidental,
                    special, consequential, punitive, or otherwise) arising from
                    or in connection with:
                  </p>
                  <ul>
                    <li>
                      access to or use of, or inability to access or use, any
                      Capavate service for any reason;
                    </li>
                    <li>
                      reliance on any content or information available on or
                      through any Capavate service, regardless of the source of
                      that content — whether originating from Capavate, a
                      Member, an Industry Partner, a Third-Party Affiliate, or
                      an automated or AI-assisted feature;
                    </li>
                    <li>
                      any investment decision, financial commitment, or business
                      decision made in connection with or in reliance on any
                      Capavate service or content;
                    </li>
                    <li>
                      any inaccuracy, error, omission, or misleading information
                      in any Member's profile, cap table data, deal room
                      content, Angel Network post, Academy content, or other
                      user-generated content;
                    </li>
                    <li>
                      the services, advice, conduct, or omissions of any
                      Industry Partner, whether accessed through or
                      independently of the Platform;
                    </li>
                    <li>
                      the referral, promotional, or other activity of any
                      Third-Party Affiliate;
                    </li>
                    <li>
                      any failure, delay, interruption, error, suspension, or
                      permanent discontinuation of any Capavate service or any
                      part thereof;
                    </li>
                    <li>
                      any security breach, cyberattack, unauthorised access,
                      data theft, or loss of data affecting any account,
                      content, or personal data held by or through the Platform;
                    </li>
                    <li>
                      any Corporate Event, equity transaction, or cap table
                      change facilitated through or documented on the Platform;
                    </li>
                    <li>
                      any cross-border regulatory consequence, tax liability, or
                      legal sanction arising from any Member's use of the
                      Platform in any jurisdiction;
                    </li>
                    <li>
                      any AI-assisted feature output, automated recommendation,
                      or algorithmic decision made in connection with any
                      Capavate service;
                    </li>
                    <li>
                      any harm arising from the conduct of any Member —
                      including content posted through any Social Feature,
                      profile information, messages, deal room disclosures, or
                      any other user-to-user communication;
                    </li>
                    <li>
                      any other matter relating to any Capavate service or its
                      content, howsoever arising.
                    </li>
                  </ul>
                  <p>
                    Where applicable law does not permit the exclusion of
                    implied warranties or limitation of liability for certain
                    categories of damage — including under mandatory consumer
                    protection legislation in any jurisdiction — these
                    exclusions and limitations apply to the maximum extent
                    permitted by law in that jurisdiction. Nothing in this
                    Disclaimer excludes liability for death or personal injury
                    caused by our negligence or for fraud or fraudulent
                    misrepresentation.
                  </p>

                  <h2>12. Indemnity</h2>
                  <p>
                    By using any Capavate service — whether as a Founder,
                    Investor, Industry Partner, Third-Party Affiliate, or
                    otherwise — you agree to fully indemnify, defend, and hold
                    harmless Blueprint Catalyst Limited, its affiliates,
                    officers, directors, employees, agents, legal advisers, and
                    service providers from and against all claims, demands,
                    investigations, proceedings, losses, liabilities, damages,
                    regulatory fines, penalties, costs, and expenses (including
                    legal fees on a full indemnity basis) arising from or in
                    connection with:
                  </p>
                  <ul>
                    <li>your use of any Capavate service in any capacity;</li>
                    <li>
                      any breach of this Disclaimer, the Terms of Service, or
                      the Acceptable Use Policy;
                    </li>
                    <li>
                      any investment, financial, business, or professional
                      decision you make in connection with any Capavate service;
                    </li>
                    <li>
                      any regulatory investigation, enforcement action, or
                      sanction arising from your conduct on or through the
                      Platform;
                    </li>
                    <li>
                      any personal data of third parties you submitted to the
                      Platform without lawful authority or in breach of
                      applicable data protection law;
                    </li>
                    <li>
                      any user-generated content you posted through any Social
                      Feature of the Platform, including Cap Table
                      Announcements, Angel Network posts, Academy content, and
                      all other community content;
                    </li>
                    <li>
                      any inaccuracy or misrepresentation in your profile
                      information relied upon by any other Member or third
                      party;
                    </li>
                    <li>
                      in the case of Industry Partners: any claim arising from
                      your professional services, advice, integrations, or
                      conduct in connection with the Platform;
                    </li>
                    <li>
                      in the case of Third-Party Affiliates: any claim arising
                      from your referral, promotional, or marketing activity.
                    </li>
                  </ul>
                  <p>
                    This indemnity obligation applies globally, survives
                    termination of your account or any agreement with Capavate
                    for any reason, and is not subject to any cap or limitation.
                    Capavate reserves the right, at the indemnifying party's
                    expense, to assume the exclusive defence and control of any
                    matter subject to indemnification, and the indemnifying
                    party agrees to cooperate fully with any such defence.
                  </p>

                  <h2>13. Acknowledgement of Risk</h2>
                  <p>
                    By accessing or using any Capavate service, each user —
                    regardless of category — expressly and unconditionally
                    acknowledges and accepts that:
                  </p>
                  <ul>
                    <li>
                      (a) the Platform operates in a highly regulated global
                      environment across multiple jurisdictions and no assurance
                      can be given that any particular use of the Platform is
                      lawful in any particular jurisdiction; each user is solely
                      responsible for assessing the legality of their own access
                      and use;
                    </li>
                    <li>
                      (b) private market investment carries a high probability
                      of total and permanent capital loss and is suitable only
                      for those who can afford to lose their entire investment;
                    </li>
                    <li>
                      (c) cap table data, valuations, deal terms, and deal
                      information on the Platform are unverified by Capavate and
                      may be materially inaccurate, incomplete, outdated, or
                      fabricated;
                    </li>
                    <li>
                      (d) Industry Partners and Third-Party Affiliates act
                      independently of Capavate and their conduct, advice, and
                      services are not endorsed, supervised, or guaranteed by
                      Capavate;
                    </li>
                    <li>
                      (e) the Platform does not provide regulated financial,
                      investment, legal, tax, accounting, or professional
                      services of any kind;
                    </li>
                    <li>
                      (f) all user-generated content — including profile
                      information, Cap Table Announcements, Angel Network posts,
                      Academy contributions, and community forum posts — is
                      unverified by Capavate and may be inaccurate or
                      misleading;
                    </li>
                    <li>
                      (g) AI-assisted features and automated outputs on the
                      Platform may be inaccurate, incomplete, or biased and
                      should not be relied upon for any professional, financial,
                      legal, or investment purpose;
                    </li>
                    <li>
                      (h) all use of the Platform and all decisions made in
                      connection therewith — including any investment decision,
                      any decision to connect with or engage another Member, any
                      professional engagement with an Industry Partner, and any
                      participation in Academy content — are entirely at the
                      user's own risk.
                    </li>
                  </ul>

                  <h2>14. Changes</h2>
                  <p>
                    We reserve the right to update this Disclaimer at any time.
                    Continued use of any Capavate service after any update
                    constitutes acceptance of the revised Disclaimer.
                  </p>

                  <h2>15. Contact</h2>
                  <p>
                    For legal enquiries:{" "}
                    <a href="mailto:legal@capavate.com">legal@capavate.com</a>
                    <br />
                    Blueprint Catalyst Limited · Incorporated in Hong Kong
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <NewFooter />
    </>
  );
}
