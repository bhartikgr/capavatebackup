import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SideBar from '../../../components/social/SideBar'
import TopBar from '../../../components/social/TopBar'
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import {
  ModalContainer1,
  ModalTitle,
  DropArea,
  ModalBtn,
  ButtonGroup,
} from "../../../components/Styles/DataRoomStyle.js";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";
import { FaDownload, FaEye } from "react-icons/fa"; // FontAwesome icons
import ViewRecordRound from "../../../components/Users/popup/ViewRecordRound";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config.js";
export default function InvestorReportViewRecordRound() {
  const navigate = useNavigate();

  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const [ViewRecordRounds, setViewRecordRounds] = useState(false);
  const userLogin = JSON.parse(storedUsername);
  const [records, setrecords] = useState([]);
  const [errr, seterrr] = useState(false);
  const [recordViewData, setrecordViewData] = useState("");
  const [InvestorInfo, setInvestorInfo] = useState("");
  const [messagesuccessError, setmessagesuccessError] = useState("");
  // Add this with your other useState declarations
  const [activeTab, setActiveTab] = useState('overview');
  const [InvestorAllRoundRecordData, setInvestorAllRoundRecordData] =
    useState(null);
  const ACCREDITED = ["Yes – Accredited", "No – Non-Accredited", "Not Sure"];
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedHandsOn, setSelectedHandsOn] = useState([]);
  const [selectedMAInterests, setSelectedMAInterests] = useState([]);
  const [selectedCapavateInterests, setSelectedCapavateInterests] = useState([]);
  const [selectedCheques, setSelectedCheques] = useState([]);
  const CAPAVATE_INTERESTS = [
    { id: "full_sale_exits", label: "Full Sale Exits", description: "Interested in discussing full company sales and strategic exits." },
    { id: "recapitalizations", label: "Recapitalizations", description: "Curious about partial sales and majority recapitalizations." },
    { id: "ipos_listings", label: "IPOs/Listings", description: "Following conversations on IPOs and other public listing routes." },
    { id: "secondaries", label: "Secondaries", description: "Interested in private secondary transactions for startup equity." },
    { id: "structured_exits", label: "Structured Exits", description: "Exploring structured exit solutions (earn‑outs, vendor notes, rollover equity)." },
    { id: "buybacks_redemptions", label: "Buybacks/Redemptions", description: "Following best practices around company share buybacks and redemption programs." },
    { id: "mbos_sponsor", label: "MBOs/Sponsor Deals", description: "Interested in management buy‑outs/buy‑ins and sponsor‑led deals (PE/VC)." },
    { id: "partial_liquidity", label: "Partial Liquidity", description: "Focused on strategies for partial liquidity while preserving upside (secondaries, recaps, dividends)." },
    { id: "distress_assets", label: "Distress Assets", description: "Engaging with companies that are distressed." },
    { id: "cross_border_distribution", label: "Cross-border Distribution", description: "Product or service distribution channel development." },
    { id: "joint_ventures", label: "Joint Ventures / Strategic Partnerships", description: "Exploring partnerships for scale." }
  ];
  var apiURLInvestor = API_BASE_URL + "api/user/investor/";
  document.title = "Shared Investor Report";
  const { id } = useParams();
  useEffect(() => {
    checkInvestor();
    getInvestorReportCapitalRound();
  }, []);

  const checkInvestor = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
      id: id,
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "checkInvestorRecordround",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(generateRes.data.results)
      if (generateRes.data.results.length === 0) {
        navigate("/crm/investorreport");
      } else {
        var d = generateRes.data.results[0]
        setSelectedHandsOn(d.hands_on ? d.hands_on.split(",") : []);
        setSelectedMAInterests(d.ma_interests ? d.ma_interests.split(",") : []);
        setSelectedStages(d.preferred_stages ? d.preferred_stages.split(",") : []);
        setSelectedCheques(d.cheque_size ? d.cheque_size.split(",") : []);
        setSelectedCapavateInterests(d.capavate_interests ? d.capavate_interests.split(",") : []);
        setInvestorInfo(generateRes.data.results[0]);
      }
      // setrecords(generateRes.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };

  const getInvestorReportCapitalRound = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
      investor_id: id,
    };
    try {
      const resp = await axios.post(
        apiURLInvestor + "getInvestorReportCapitalRound",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(resp.data.results)
      setrecords(resp.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };


  const handleviewData = (dataa) => {
    console.log(dataa)
    setViewRecordRounds(true);
    setrecordViewData(dataa);
  };
  const customStyles = {
    table: {
      style: {
        border: "1px solid #dee2e6",
        borderRadius: "12px",
        overflow: "auto",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#efefef",
        fontWeight: "600",
        fontSize: "0.8rem",
        color: "#000",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      },
    },
    cells: {
      style: {
        whiteSpace: "nowrap",
        overflow: "auto",
        textOverflow: "ellipsis",
      },
    },
    rows: {
      style: {
        fontSize: "0.8rem",
        fontWeight: "500",
      },
      stripedStyle: {
        backgroundColor: "#fff",
      },
    },
    pagination: {
      style: {
        marginTop: "15px",
        backgroundColor: "#fafafa",
        padding: "12px 16px",
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => true, // apply to all rows
      style: {
        "&:hover": {
          backgroundColor: "var(--lightRed)", // apna hover color
        },
      },
    },
  ];

  const [searchText, setSearchText] = useState("");

  // Filter data by nameofreport (case insensitive)
  const filteredData = records.filter((item) => {
    const search = searchText.toLowerCase();

    // Combine all searchable fields into one string
    const combinedFields = `
    ${item.nameOfRound || ""}
    ${item.shareClassType || ""}
     ${item.roundsize || ""}
    ${item.issuedshares || ""}
    ${item.description || ""}
    ${item.instrumentType || ""}
    ${item.customInstrument || ""}
    ${item.roundsize || ""}
    ${item.issuedshares || ""}
    ${item.liquidationpreferences || ""}
  `.toLowerCase();

    return combinedFields.includes(search);
  });

  function formatCurrentDate(input) {
    const date = new Date(input);

    if (isNaN(date)) return "";
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const getOrdinal = (n) => {
      if (n >= 11 && n <= 13) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${month} ${day}${getOrdinal(day)}, ${year}`;
  }
  const handleDownload = async (url) => {
    window.open(url, "_blank");
  };

  //Share Report

  //Due diligence Record
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  let files = [];

  // Ensure we have an array
  if (InvestorInfo.kyc_document) {
    if (Array.isArray(InvestorInfo.kyc_document)) {
      try {
        // Try parsing first element if it looks like JSON
        files = JSON.parse(InvestorInfo.kyc_document[0]);
      } catch (e) {
        // fallback: it's already an array of strings
        files = InvestorInfo.kyc_document;
      }
    } else {
      // single string case
      try {
        files = JSON.parse(InvestorInfo.kyc_document);
      } catch (e) {
        files = [InvestorInfo.kyc_document];
      }
    }
  }

  const isImage = (file) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(file);
  };
  //Record get
  useEffect(() => {
    getInvestorAllRoundRecord();
  }, []);

  const getInvestorAllRoundRecord = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
      investor_id: id,
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "getInvestorAllRoundRecord",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(generateRes.data);
      setInvestorAllRoundRecordData(generateRes.data);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  //Record get
  const baseUrl =
    API_BASE_URL + "api/upload/investor/inv_" + InvestorInfo.investor_id;
  // ── Helpers (component ke bahar define karo) ──────────────────────────
  const InfoRow = ({ label, value, link }) => (
    <div className="d-flex align-items-start gap-2 py-2" style={{ borderBottom: '1px solid #f1f5f9' }}>
      <span style={{ minWidth: 145, fontSize: 12, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>
        {link && value
          ? <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: '#CC0000' }}>{value}</a>
          : (value || <span style={{ color: '#cbd5e1' }}>—</span>)
        }
      </span>
    </div>
  );

  const TagList = ({ items, color, bg, border }) => (
    <div className="d-flex flex-wrap gap-1 mt-1">
      {items.length > 0
        ? items.map((item, i) => (
          <span key={i} style={{
            background: bg, color, border: `1px solid ${border}`,
            borderRadius: 20, fontSize: 11, fontWeight: 500,
            padding: '3px 10px', display: 'inline-block'
          }}>{item.trim()}</span>
        ))
        : <span style={{ color: '#cbd5e1', fontSize: 12 }}>—</span>
      }
    </div>
  );

  const SectionCard = ({ icon, title, children }) => (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: 14 }}>
      <div className="card-body p-4">
        <h6 className="fw-bold mb-3 d-flex align-items-center gap-2 pb-2" style={{ borderBottom: '2px solid #fff0f0', color: '#CC0000' }}>
          <span style={{ background: '#fff0f0', borderRadius: 8, padding: '4px 8px', fontSize: 15 }}>{icon}</span>
          {title}
        </h6>
        {children}
      </div>
    </div>
  );
  return (
    <>
      <>

        {ViewRecordRounds && (
          <ViewRecordRound
            onClose={() => setViewRecordRounds(false)}
            recordViewData={recordViewData}
          />
        )}
        {isOpen && (
          <div className="main_popup-overlay">
            <ModalContainer1>
              <div className="d-flex align-items-center gap-3 mb-4 justify-content-between">
                <ModalTitle>View KYC/AML Documentation</ModalTitle>
                <button
                  type="button"
                  className="close_btn_global"
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                >
                  <IoCloseCircleOutline size={24} />
                </button>
              </div>

              {/* Images container */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  maxHeight: "60vh",
                  overflowY: "auto",
                }}
              >
                {files.map((file, index) => {
                  const fileUrl = `${baseUrl}/${file}`;
                  return isImage(file) ? (
                    <img
                      key={index}
                      src={fileUrl}
                      alt={`Document ${index + 1}`}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "contain",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "4px",
                        background: "#f9f9f9",
                      }}
                    />
                  ) : (
                    <a
                      key={index}
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ margin: "5px" }}
                    >
                      Open Document {index + 1}
                    </a>
                  );
                })}
              </div>

              <ButtonGroup>
                <ModalBtn
                  onClick={() => setIsOpen(false)}
                  className="close_btn w-fit"
                >
                  Close
                </ModalBtn>
              </ButtonGroup>
            </ModalContainer1>
          </div>
        )}
      </>
      <main>
        <div className='d-flex align-items-start gap-0'>
          <SideBar />
          <div className='d-flex flex-grow-1 flex-column gap-0'>
            <TopBar />
            <SectionWrapper className="d-block p-md-4 p-3">
              <div className="container-fluid">
                {messagesuccessError && (
                  <p
                    className={errr ? "mt-3 error_pop" : "success_pop mt-3"}
                  >
                    {messagesuccessError}
                  </p>
                )}

                {/* --- REPORT SUMMARY CARDS --- */}
                <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                  <h3 className="text-lg font-bold mb-2">
                    Investor Report (Capital Round Documents)
                  </h3>
                </div>
                {/* ══════════════════════════════════════════════
    MAIN MODAL UI
══════════════════════════════════════════════ */}
                <div className="container-fluid px-0">

                  {/* ── Hero Header ── */}
                  <div className="p-4 mb-4" style={{
                    background: 'linear-gradient(135deg, #CC0000 0%, #8b0000 100%)',
                    borderRadius: 16
                  }}>
                    <div className="d-flex align-items-center gap-4 flex-wrap">
                      {/* Avatar */}
                      <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white flex-shrink-0"
                        style={{ width: 72, height: 72, background: 'rgba(255,255,255,0.18)', fontSize: 26, border: '2px solid rgba(255,255,255,0.35)' }}>
                        {InvestorInfo?.first_name?.charAt(0)}{InvestorInfo?.last_name?.charAt(0)}
                      </div>

                      {/* Name + Badges */}
                      <div className="flex-grow-1">
                        <h4 className="fw-bold text-white mb-1">
                          {InvestorInfo?.first_name} {InvestorInfo?.last_name}
                        </h4>
                        <p className="mb-2 text-white" style={{ opacity: 0.75, fontSize: 13 }}>
                          {InvestorInfo?.type_of_investor || 'Investor'} {InvestorInfo?.company_name ? `· ${InvestorInfo.company_name}` : ''}
                        </p>
                        <div className="d-flex flex-wrap gap-2">
                          {InvestorInfo?.accredited_status && (
                            <span className="px-3 py-1 rounded-pill fw-semibold"
                              style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 11, border: '1px solid rgba(255,255,255,0.3)' }}>
                              ✓ {InvestorInfo.accredited_status}
                            </span>
                          )}
                          {InvestorInfo?.geo_focus && (
                            <span className="px-3 py-1 rounded-pill"
                              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, border: '1px solid rgba(255,255,255,0.25)' }}>
                              🌍 {InvestorInfo.geo_focus}
                            </span>
                          )}
                          {InvestorInfo?.city && (
                            <span className="px-3 py-1 rounded-pill"
                              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, border: '1px solid rgba(255,255,255,0.25)' }}>
                              📍 {InvestorInfo.city}, {InvestorInfo.country}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* KYC Button */}
                      {InvestorInfo?.kyc_document && (() => {
                        try {
                          const f = JSON.parse(InvestorInfo.kyc_document);
                          return f.length > 0 ? (
                            <button type="button" onClick={handleOpen}
                              className="btn btn-sm fw-semibold flex-shrink-0"
                              style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 10, fontSize: 12, padding: '8px 16px' }}>
                              <FaEye className="me-1" /> KYC Docs ({f.length})
                            </button>
                          ) : null;
                        } catch { return null; }
                      })()}
                    </div>
                  </div>

                  {/* ── Metric Cards ── */}
                  <div className="row g-2 mb-4">
                    {[

                      { label: 'Ownership of Company (fully diluted) %', value: `${0}%`, icon: '📊', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
                      { label: 'Investor Rank', value: `#${InvestorAllRoundRecordData?.rank || 'N/A'}`, icon: '🏆', color: '#CC0000', bg: '#fff5f5', border: '#fecaca' },
                      { label: 'Min Invest', value: `${InvestorAllRoundRecordData?.currency || '$'}${(InvestorAllRoundRecordData?.min_investment || 0).toLocaleString()}`, icon: '📉', color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' },
                      { label: 'Max Invest', value: `${InvestorAllRoundRecordData?.currency || '$'}${(InvestorAllRoundRecordData?.max_investment || 0).toLocaleString()}`, icon: '📈', color: '#64748b', bg: '#f8fafc', border: '#e2e8f0' },
                    ].map((m, i) => (
                      <div key={i} className="col">
                        <div className="p-3 rounded-3 text-center h-100"
                          style={{ background: m.bg, border: `1px solid ${m.border}` }}>
                          <div style={{ fontSize: 20 }}>{m.icon}</div>
                          <div className="fw-bold mt-1" style={{ color: m.color, fontSize: 15 }}>{m.value}</div>
                          <div style={{ fontSize: 11, color: '#94a3b8' }}>{m.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ── Tab Bar ── */}
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {[
                      { key: 'overview', label: '🏠 Overview' },
                      { key: 'contact', label: '📋 Contact' },
                      { key: 'investor', label: '👤 Investor' },
                      { key: 'network', label: '🌐 Network' },
                      { key: 'investments', label: '💼 Investments' },
                    ].map(t => (
                      <button key={t.key} type="button"
                        onClick={() => setActiveTab(t.key)}
                        style={{
                          padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                          background: activeTab === t.key ? '#CC0000' : '#f1f5f9',
                          color: activeTab === t.key ? '#fff' : '#64748b',
                          transition: 'all 0.2s'
                        }}>
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* ══ TAB CONTENTS ══ */}

                  {/* ── Overview ── */}
                  {activeTab === 'overview' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <SectionCard icon="👤" title="Quick Contact">
                          {[
                            { icon: '📧', label: 'Email', val: userLogin?.email || InvestorInfo?.email },
                            { icon: '📱', label: 'Phone', val: InvestorInfo?.phone },
                            { icon: '📍', label: 'Location', val: `${InvestorInfo?.city || ''}, ${InvestorInfo?.country || ''}`.replace(/^,\s*|,\s*$/g, '') || '—' },
                          ].map((r, i) => (
                            <div key={i} className="d-flex align-items-center gap-3 py-2" style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <span style={{ width: 32, height: 32, background: '#fff0f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{r.icon}</span>
                              <div>
                                <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>{r.label}</div>
                                <div style={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{r.val || '—'}</div>
                              </div>
                            </div>
                          ))}
                        </SectionCard>
                      </div>
                      <div className="col-md-6">
                        <SectionCard icon="📊" title="Investment Summary">
                          {[
                            { label: 'Geography Focus', val: InvestorInfo?.geo_focus },
                            { label: 'Min Investment', val: `${InvestorAllRoundRecordData?.currency || '$'}${(InvestorAllRoundRecordData?.min_investment || 0).toLocaleString()}` },
                            { label: 'Max Investment', val: `${InvestorAllRoundRecordData?.currency || '$'}${(InvestorAllRoundRecordData?.max_investment || 0).toLocaleString()}` },
                            { label: 'Accredited', val: InvestorInfo?.accredited_status },
                          ].map((r, i) => (
                            <div key={i} className="d-flex justify-content-between align-items-center py-2" style={{ borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                              <span style={{ color: '#64748b' }}>{r.label}</span>
                              <strong style={{ color: '#1e293b' }}>{r.val || '—'}</strong>
                            </div>
                          ))}
                        </SectionCard>
                      </div>
                      {InvestorInfo?.bio_short && (
                        <div className="col-12">
                          <div className="p-3 rounded-3" style={{ background: '#fff8f8', border: '1px solid #fecaca' }}>
                            <small className="fw-bold d-block mb-1" style={{ color: '#CC0000', fontSize: 11, textTransform: 'uppercase' }}>Bio</small>
                            <p className="mb-0" style={{ fontSize: 13, color: '#374151' }}>{InvestorInfo.bio_short}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Contact ── */}
                  {activeTab === 'contact' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <SectionCard icon="👤" title="Personal Information">
                          <InfoRow label="Investor Name" value={`${InvestorInfo?.first_name || ''} ${InvestorInfo?.last_name || ''}`} />
                          <InfoRow label="Company" value={InvestorInfo?.company_name} />
                          <InfoRow label="Email" value={userLogin?.email || InvestorInfo?.email} />
                          <InfoRow label="Phone" value={InvestorInfo?.phone} />
                          <InfoRow label="LinkedIn" value={InvestorInfo?.linkedIn_profile} link />
                          <InfoRow label="IP Address" value={InvestorInfo?.ip_address} />
                        </SectionCard>
                      </div>
                      <div className="col-md-6">
                        <SectionCard icon="📍" title="Address & Tax">
                          <InfoRow label="City" value={InvestorInfo?.city} />
                          <InfoRow label="Country" value={InvestorInfo?.country} />
                          <InfoRow label="Full Address" value={InvestorInfo?.mailing_address || InvestorInfo?.full_address} />
                          <InfoRow label="Tax Country" value={InvestorInfo?.country_tax} />
                          <InfoRow label="Tax ID" value={InvestorInfo?.tax_id} />
                          <div className="mt-3">
                            {InvestorInfo?.kyc_document && (() => {
                              try {
                                const f = JSON.parse(InvestorInfo.kyc_document);
                                return f.length > 0 ? (
                                  <button type="button" onClick={handleOpen}
                                    className="btn btn-sm fw-semibold"
                                    style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: 8 }}>
                                    <FaEye className="me-1" /> View KYC Documents ({f.length})
                                  </button>
                                ) : null;
                              } catch { return null; }
                            })()}
                          </div>
                        </SectionCard>
                      </div>
                    </div>
                  )}

                  {/* ── Investor Profile ── */}
                  {activeTab === 'investor' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <SectionCard icon="👤" title="Investor Details">
                          <InfoRow label="Type" value={InvestorInfo?.type_of_investor} />
                          <InfoRow label="Accredited" value={InvestorInfo?.accredited_status} />
                          <InfoRow label="Tax Country" value={InvestorInfo?.country_tax} />
                          <InfoRow label="Tax ID" value={InvestorInfo?.tax_id} />
                        </SectionCard>
                      </div>
                      <div className="col-md-6">
                        <SectionCard icon="🏭" title="Industry Expertise">
                          <TagList
                            items={InvestorInfo?.industry_expertise ? InvestorInfo.industry_expertise.split(',') : []}
                            color="#7c3aed" bg="#f5f3ff" border="#ddd6fe"
                          />
                        </SectionCard>
                      </div>
                      {InvestorInfo?.bio_short && (
                        <div className="col-12">
                          <SectionCard icon="📝" title="Bio">
                            <p className="mb-0" style={{ fontSize: 13, color: '#374151' }}>{InvestorInfo.bio_short}</p>
                          </SectionCard>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Network ── */}
                  {activeTab === 'network' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <SectionCard icon="🌐" title="Professional Details">
                          <InfoRow label="Screen Name" value={InvestorInfo?.screen_name} />
                          <InfoRow label="Job Title" value={InvestorInfo?.job_title} />
                          <InfoRow label="Company" value={InvestorInfo?.company_name} />
                          <InfoRow label="Company Country" value={InvestorInfo?.company_country} />
                          <InfoRow label="Website" value={InvestorInfo?.company_website} link />
                        </SectionCard>
                      </div>
                      <div className="col-md-6">
                        <SectionCard icon="🤝" title="Engagement Style">
                          <div className="mb-3">
                            <small className="fw-bold d-block mb-2" style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>Hands-on / Hands-off</small>
                            <TagList
                              items={InvestorInfo?.hands_on ? InvestorInfo.hands_on.split(',') : []}
                              color="#0891b2" bg="#ecfeff" border="#a5f3fc"
                            />
                          </div>
                          <div>
                            <small className="fw-bold d-block mb-2" style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>Preferred Stages</small>
                            <TagList
                              items={InvestorInfo?.preferred_stages ? InvestorInfo.preferred_stages.split(',') : []}
                              color="#2563eb" bg="#eff6ff" border="#bfdbfe"
                            />
                          </div>
                        </SectionCard>
                      </div>
                      {InvestorInfo?.network_bio && (
                        <div className="col-12">
                          <SectionCard icon="💬" title="Network Bio">
                            <p className="mb-0" style={{ fontSize: 13, color: '#374151', lineHeight: 1.7 }}>{InvestorInfo.network_bio}</p>
                          </SectionCard>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── Investments ── */}
                  {activeTab === 'investments' && (
                    <div className="row g-3">
                      <div className="col-md-6">
                        <SectionCard icon="💰" title="Investment Preferences">
                          <div className="mb-3">
                            <small className="fw-bold d-block mb-2" style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>Typical Cheque Size</small>
                            <TagList
                              items={InvestorInfo?.cheque_size ? InvestorInfo.cheque_size.split(',') : []}
                              color="#16a34a" bg="#f0fdf4" border="#bbf7d0"
                            />
                          </div>
                          <div className="mb-3">
                            <small className="fw-bold d-block mb-2" style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>Preferred Stages</small>
                            <TagList
                              items={InvestorInfo?.preferred_stages ? InvestorInfo.preferred_stages.split(',') : []}
                              color="#2563eb" bg="#eff6ff" border="#bfdbfe"
                            />
                          </div>
                          <div>
                            <small className="fw-bold d-block mb-2" style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>M&A Interests</small>
                            <TagList
                              items={InvestorInfo?.ma_interests ? InvestorInfo.ma_interests.split(',') : []}
                              color="#b45309" bg="#fffbeb" border="#fde68a"
                            />
                          </div>
                        </SectionCard>
                      </div>

                      <div className="col-md-6">
                        <SectionCard icon="🎯" title="Capavate Network Interests">
                          <div className="d-flex flex-wrap gap-1 mb-4">
                            {InvestorInfo?.capavate_interests
                              ? InvestorInfo.capavate_interests.split(',').map((id, i) => {
                                const interest = CAPAVATE_INTERESTS?.find(x => x.id === id.trim());
                                return interest ? (
                                  <span key={i} title={interest.description}
                                    style={{ background: '#fff0f0', color: '#CC0000', border: '1px solid #fecaca', borderRadius: 20, fontSize: 11, fontWeight: 500, padding: '3px 10px', cursor: 'help' }}>
                                    {interest.label}
                                  </span>
                                ) : null;
                              })
                              : <span style={{ color: '#cbd5e1', fontSize: 12 }}>—</span>
                            }
                          </div>

                          <div className="p-3 rounded-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                            <small className="fw-bold d-block mb-2" style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase' }}>Investment Range</small>
                            <div className="d-flex justify-content-between py-2" style={{ borderBottom: '1px solid #e2e8f0', fontSize: 13 }}>
                              <span style={{ color: '#64748b' }}>Minimum</span>
                              <strong style={{ color: '#16a34a' }}>{InvestorAllRoundRecordData?.currency || '$'}{(InvestorAllRoundRecordData?.min_investment || 0).toLocaleString()}</strong>
                            </div>
                            <div className="d-flex justify-content-between py-2" style={{ fontSize: 13 }}>
                              <span style={{ color: '#64748b' }}>Maximum</span>
                              <strong style={{ color: '#CC0000' }}>{InvestorAllRoundRecordData?.currency || '$'}{(InvestorAllRoundRecordData?.max_investment || 0).toLocaleString()}</strong>
                            </div>
                          </div>
                        </SectionCard>
                      </div>

                      {InvestorInfo?.notes && (
                        <div className="col-12">
                          <SectionCard icon="📝" title="Notes">
                            <p className="mb-0" style={{ fontSize: 13, color: '#374151', lineHeight: 1.7 }}>{InvestorInfo.notes}</p>
                          </SectionCard>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* --- SEARCH & DATA TABLE --- */}
                <div className="d-flex justify-content-between my-2 py-3">
                  <h4>Participating Investment Rounds</h4>
                </div>
                <div className="d-flex flex-column justify-content-between align-items-start tb-box">
                  <table className="innertable-design">
                    <thead>
                      <tr>
                        <th>Round Name</th>
                        <th>Funding Round</th>
                        <th>Instrument Type</th>
                        <th>Date of Report</th>
                        <th>Date Viewed</th>
                        <th>Status of Round</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.length > 0 ? (
                        records.map((record, index) => (
                          <React.Fragment key={index}>
                            {/* Main round row */}
                            <tr>
                              <td>

                                {record.nameOfRound}
                              </td>
                              <td>
                                {record.shareClassType}
                              </td>
                              <td>
                                {record.instrumentType}
                              </td>
                              <td>
                                {record.created_at
                                  ? formatCurrentDate(record.created_at)
                                  : "N/A"}
                              </td>

                              <td>
                                {record.date_view
                                  ? formatCurrentDate(record.date_view)
                                  : "N/A"}
                              </td>

                              <td>
                                {(() => {
                                  const isActive =
                                    record.roundStatus === "ACTIVE";
                                  const displayText = isActive
                                    ? "ACTIVE"
                                    : `CLOSED: ${formatCurrentDate(
                                      record.dateroundclosed
                                    )}`;
                                  return (
                                    <span
                                      style={{
                                        padding: "4px 12px",
                                        borderRadius: "12px",
                                        fontWeight: 600,
                                        color: isActive
                                          ? "#065f46"
                                          : "#b91c1c",
                                        backgroundColor: isActive
                                          ? "#d1fae5"
                                          : "#fee2e2",
                                        fontSize: "12px",
                                        display: "inline-block",
                                      }}
                                    >
                                      {displayText}
                                    </span>
                                  );
                                })()}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  onClick={() => handleviewData(record)}
                                  className="btn"
                                >
                                  👁 View
                                </button>
                              </td>
                            </tr>

                            {/* Detail row */}
                            <tr className="detail-row">
                              <td colSpan="7">
                                <div className="detail-content">
                                  <div className="detail-item">
                                    <strong>
                                      Amount invested in this round:
                                    </strong>{" "}
                                    {record.currency}
                                    {""}
                                    {Number(record.investor_investment).toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}

                                  </div>
                                  <div className="detail-item">
                                    <strong>Date Invested:</strong>{" "}
                                    {record.invested_date
                                      ? formatCurrentDate(
                                        record.invested_date
                                      )
                                      : "N/A"}
                                  </div>
                                  {/* <div className="detail-item">
                                    <strong>
                                      Fully Diluted Shares at the time of
                                      investment:
                                    </strong>{" "}
                                    {record.issuedshares
                                      ? Number(
                                        record.issuedshares
                                      ).toLocaleString("en-US")
                                      : "0"}
                                  </div> */}
                                </div>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </main>
    </>
  );
}
