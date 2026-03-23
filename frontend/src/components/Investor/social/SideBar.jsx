import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../assets/style/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  ChevronLeft,
  Users,
  Briefcase,
  MapPin,
  DollarSign,
  Award,
  Heart,
  UserPlus,
  Eye,
  EyeOff,
  Globe,
  TrendingUp,
  Shield,
  Zap,
  Building2,
  ArrowRight,
} from "lucide-react";
import AngelNetworkJoinWaitlist from "./AngelNetworkJoinWaitlist.jsx";
import { RiBuildingLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { API_BASE_URL } from "../../../config/config.js";
import axios from "axios";

const menuItems = [
  {
    label: "Edit Profile",
    href: "/investor/profile",
    icon: <RiBuildingLine size={18} />,
  },
  {
    label: 'Company List',
    href: '/investor/company-list',
    icon: <Building2 size={18} />
  },
  {
    label: "Cap Table Rules",
    icon: <Shield size={18} />,
    modal: "capTableRules",
  },
];

export default function ModuleSideNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAngelProfile, setShowAngelProfile] = useState(false);
  const location = useLocation();
  const storedUsername = localStorage.getItem("InvestorData");
  const userLogin = JSON.parse(storedUsername);
  const apiURL = API_BASE_URL + "api/user/";
  const apiURL_Investor = API_BASE_URL + "api/user/investor/";
  const [records, setRecords] = useState(null);
  const [showCapTableRules, setShowCapTableRules] = useState(false);
  const [CompanyList, setCompanyList] = useState([]);
  useEffect(() => {
    const checkScreen = () => {
      setIsCollapsed(window.innerWidth < 786);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    fetchData();
    getcompanyList();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.post(apiURL_Investor + "getinvestorData", {
        id: userLogin.id,
      });
      if (res.data.results?.length > 0) {
        const d = res.data.results[0];
        console.log(d.capavate_interests);
        setRecords(d);
      } else {
        setRecords({});
      }
    } catch (err) {
      console.error(err);
      setRecords({});
    }
  };
  const getcompanyList = async () => {
    try {
      const res = await axios.post(apiURL_Investor + "getcompanyList", {
        investor_id: userLogin.id,
      });

      setCompanyList(res.data.results)
    } catch (err) {

    }
  };

  const toggleDropdown = (index) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const toggleAngelProfile = () => {
    setShowAngelProfile(!showAngelProfile);
  };

  const relatedRoutes = {
    "/record-round-list": ["/createrecord", "/record-round-cap-table"],
  };

  const isActive = (path) => {
    if (!path || path === "#") return false;
    const currentPath = location.pathname;
    if (currentPath === path) return true;
    if (currentPath.startsWith(path + "/")) return true;
    if (
      relatedRoutes[path]?.some(
        (route) => currentPath === route || currentPath.startsWith(route + "/"),
      )
    ) {
      return true;
    }
    return false;
  };

  const renderBadge = (item) => {
    if (item.status) {
      return (
        <span
          className={`menu_value ${item.status === "confirmed"
            ? "bg-success"
            : item.status === "pending"
              ? "bg-danger"
              : "bg-secondary"
            }`}
        >
          {item.status}
        </span>
      );
    }
    if (item.value) {
      return <span className="menu_value bg-success">{item.value}</span>;
    }
    return null;
  };

  const isParentActive = (dropdown) => {
    return dropdown?.some((sub) =>
      sub.subItems
        ? sub.subItems.some((item) => {
          const current = location.pathname;
          if (current.startsWith(item.href)) return true;
          if (
            relatedRoutes[item.href]?.some(
              (route) => current === route || current.startsWith(route + "/"),
            )
          ) {
            return true;
          }
          return false;
        })
        : location.pathname.startsWith(sub.href),
    );
  };

  // Investor profile data
  const investorProfile = {
    firstName: "John",
    lastName: "Doe",
    investorType: "Angel Investor",
    location: "San Francisco, CA",
    followers: 1250,
    following: 342,
    portfolioCompanies: ["TechStart Inc.", "GrowthLabs", "FutureFund"],
    interests: records?.capavate_interests
      ? records?.capavate_interests.split(",").map((s) => s.trim())
      : [],
    industryExpertise: ["Technology", "Healthcare", "Education"],
    typicalChequeSize: records?.cheque_size
      ? records?.cheque_size.split(",").map((s) => s.trim())
      : [],
    geographyFocus: records?.geo_focus,
    preferredStage: ["Seed", "Series A"],
    handsOn: "Hands-on (Monthly advisory calls)",
  };

  // Cap Table Rules State
  const [capTableRules, setCapTableRules] = useState({
    // Investor Rules
    investor: {
      contact_listed: "No",
      portfolio_company: "No",
      contact_from: "No",
      capavate_member: "No",
      everyone: "No",
    },
    // Company Rules
    company: {
      contact_listed: "No",
      portfolio_company: "No",
      contact_from: "No",
      capavate_member: "No",
      everyone: "No",
    },
  });

  const [rulesSaving, setRulesSaving] = useState(false);
  const [rulesSaved, setRulesSaved] = useState(false);
  const [saveType, setSaveType] = useState(null);

  // Fetch existing rules
  useEffect(() => {
    if (showCapTableRules) fetchCapTableRules();
  }, [showCapTableRules]);

  const fetchCapTableRules = async () => {
    if (!userLogin?.id) return;

    try {
      // Investor Rules fetch
      const investorRes = await axios.post(
        apiURL_Investor + "getCapTableRules",
        {
          investor_id: userLogin.id,
          type: "Investor",
        },
      );

      // Company Rules fetch
      const companyRes = await axios.post(
        apiURL_Investor + "getCapTableRules",
        {
          investor_id: userLogin.id,
          type: "Company",
        },
      );

      setCapTableRules({
        investor: investorRes.data.results?.[0] || {
          contact_listed: "No",
          portfolio_company: "No",
          contact_from: "No",
          capavate_member: "No",
          everyone: "No",
        },
        company: companyRes.data.results?.[0] || {
          contact_listed: "No",
          portfolio_company: "No",
          contact_from: "No",
          capavate_member: "No",
          everyone: "No",
        },
      });
    } catch (err) {
      console.error("Error fetching rules:", err);
    }
  };

  const saveCapTableRules = async (type) => {
    setRulesSaving(true);
    setSaveType(type);

    try {
      const rules =
        type === "Investor" ? capTableRules.investor : capTableRules.company;

      const payload = {
        investor_id: userLogin.id,
        type: type,
        contact_listed: rules.contact_listed,
        portfolio_company: rules.portfolio_company || "No",
        contact_from: rules.contact_from || "No",
        capavate_member: rules.capavate_member,
        everyone: rules.everyone,
      };

      await axios.post(apiURL_Investor + "saveCapTableRules", payload);

      setRulesSaved(true);
      setTimeout(() => setRulesSaved(false), 3000);
    } catch (error) {
      console.error("Error saving rules:", error);
    } finally {
      setRulesSaving(false);
      setSaveType(null);
    }
  };

  const toggleRule = (type, key) => {
    setCapTableRules((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: prev[type][key] === "Yes" ? "No" : "Yes",
      },
    }));
  };
  return (
    <>
      <div
        className={`main_sidenav_social scroll_nonw d-flex flex-column gap-4 p-3 justify-content-start align-items-md-start align-items-center ${isCollapsed ? "collapsed p-md-3" : "p-md-4"
          }`}
      >
        <div className="d-flex justify-content-between align-items-center w-100">
          {!isCollapsed && (
            <Link to="/investor/dashboard" className="com_logo">
              <img
                src="../../../assets/images/capavate.png"
                className="img-fluid rounded"
                style={{ maxHeight: "50px" }}
                alt="profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = require("../../../assets/images/capavate.png");
                }}
              />
            </Link>
          )}
          <button
            className="menu_btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <Menu size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>


        {!isCollapsed && (
          <div className="warr-box">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex gap-3">
                <div className="flex-shrink-0">
                  <div className="userimg-box rel">
                    {records?.profile_picture ? (
                      <img
                        src={
                          API_BASE_URL +
                          "api/upload/investor/inv_" +
                          records?.id +
                          "/" +
                          records?.profile_picture
                        }

                        alt="profile"
                      />
                    ) : (
                      <span className="fw-bold">
                        <img
                          src={
                            API_BASE_URL +
                            "api/upload/investor/inv_" +
                            records?.id +
                            "/" +
                            records?.profile_picture
                          }

                          alt="profile"
                        />
                      </span>
                    )}
                    <span>Pro</span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h4> {records?.screen_name
                    ? records.screen_name
                    : `${records?.first_name || ""} ${records?.last_name || ""}`.trim()}</h4>
                  <h5>Accredited Investor</h5>
                </div>
              </div>
              <div className="d-flex gap-2 align-items-center loca-warr">
                <div className="d-flex gap-2 align-items-center">
                  <MapPin />
                  <h6>{records?.company_country}</h6>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <Briefcase />
                  <h6>{records?.type_of_investor}</h6>
                </div>
              </div>
            </div>
          </div>
        )}

        <ul className="nav flex-column gap-1 w-100">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.dropdown ? (
                <>
                  <div
                    className={`sidebar_item d-flex justify-content-between align-items-center ${isParentActive(item.dropdown) ? "active" : ""}`}
                    onClick={() => toggleDropdown(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex gap-2 align-items-center">
                      {item.icon}
                      {!isCollapsed && item.label}
                    </div>
                    {!isCollapsed && <IoIosArrowDown />}
                  </div>

                  {(openDropdown === index || isParentActive(item.dropdown)) &&
                    !isCollapsed && (
                      <ul className="submenu">
                        {item.dropdown.map((sub, i) => (
                          <li key={i}>
                            {sub.subItems ? (
                              <>
                                <div className="sidebar_item d-flex gap-2 align-items-center fw-medium">
                                  {sub.icon}
                                  <span>{sub.label}</span>
                                </div>
                                <ul className="ps-4 mt-1 mb-2">
                                  {sub?.subItems && sub.subItems.length > 0
                                    ? sub.subItems.map((subItem, j) => (
                                      <li key={j}>
                                        {subItem.modal ? (
                                          <span
                                            className="sidebar_item small cursor-pointer"
                                            onClick={() => setShowModal(true)}
                                          >
                                            {subItem.label}
                                          </span>
                                        ) : subItem.href &&
                                          subItem.href !== "#" ? (
                                          <Link
                                            to={subItem.href}
                                            className={`sidebar_item small ${isActive(subItem.href) ? "active" : ""}`}
                                          >
                                            <div className="d-flex justify-content-between w-100">
                                              <span>{subItem.label}</span>
                                              {renderBadge(subItem)}
                                            </div>
                                          </Link>
                                        ) : (
                                          <span className="sidebar_item small">
                                            {subItem.label}
                                          </span>
                                        )}
                                      </li>
                                    ))
                                    : null}
                                </ul>
                              </>
                            ) : sub.href && sub.href !== "#" ? (
                              <Link
                                to={sub.href}
                                className={`sidebar_item ${isActive(sub.href) ? "active" : ""}`}
                              >
                                <div className="d-flex justify-content-between w-100">
                                  <div className="d-flex gap-2 align-items-center">
                                    {sub.icon}
                                    <span>{sub.label}</span>
                                  </div>
                                  {renderBadge(sub)}
                                </div>
                              </Link>
                            ) : (
                              <span className="sidebar_item">{sub.label}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                </>
              ) : item.modal ? (
                <span
                  className={`sidebar_item d-flex gap-2 align-items-center`}
                  onClick={() => {
                    if (item.modal === "capTableRules") {
                      setShowCapTableRules(true);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {item.icon}
                  {!isCollapsed && item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className={`sidebar_item d-flex gap-2 align-items-center ${isActive(item.href) ? "active" : ""}`}
                >
                  {item.icon}
                  {!isCollapsed && item.label}
                </Link>
              )}
            </li>
          ))}

          {/* Angel Investor Profile Section */}
          <li className="mt-3 px-2">
            <div
              className="d-flex justify-content-between align-items-center cursor-pointer mb-2"
              onClick={toggleAngelProfile}
              style={{ cursor: "pointer" }}
            >
              <span className="fw-bold text-primary">👼 Angel Profile</span>
              {showAngelProfile ? <EyeOff size={16} /> : <Eye size={16} />}
            </div>

            {showAngelProfile && (
              <div className="small text-muted angel-profile-section">
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="stat-card p-2 bg-light rounded">
                      <Users size={14} className="me-1" />
                      <span className="fw-bold">
                        {investorProfile.followers}
                      </span>
                      <small> followers</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="stat-card p-2 bg-light rounded">
                      <UserPlus size={14} className="me-1" />
                      <span className="fw-bold">
                        {investorProfile.following}
                      </span>
                      <small> following</small>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex align-items-center gap-1 mb-2">
                    <Briefcase size={14} />
                    <strong>Portfolio Companies:</strong>
                  </div>
                  <ul className="ps-3 mb-0">
                    {CompanyList.length > 0 ? (
                      CompanyList.map((company, idx) => (
                        <li key={idx} className="mb-1">
                          {typeof company === 'string' ? company : company.company_name || company.name || 'Company Name'}
                        </li>
                      ))
                    ) : (
                      <li className="text-muted">No portfolio companies listed</li>
                    )}
                  </ul>
                </div>

                <div className="mb-3">
                  <button
                    className="btn btn-danger w-100 fw-bold py-2 joincapa"
                    onClick={() => setShowModal(true)}
                    style={{
                      background:
                        "linear-gradient(135deg, #dc3545 0%, #bb2d3b 100%)",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  >
                    Join Capavate Angel Network <ArrowRight />
                  </button>
                </div>

                <div className="profile-details profile-inte">
                  <p className="mb-2 fw-bold">Profile</p>

                  <div className="mb-2">
                    <div className="d-flex align-items-center gap-1">
                      {/* <Heart size={14} className="text-danger" /> */}
                      <span className="ptitle">INTERESTS</span>
                    </div>
                    <div className="">
                      {investorProfile?.interests &&
                        investorProfile.interests.length > 0 ? (
                        investorProfile.interests.map((interest, idx) => (
                          <span
                            key={idx}
                            className="badge bg-light text-dark me-1 mb-1 p-2"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted">
                          No interests added yet
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="d-flex align-items-center gap-1">
                      {/* <Award size={14} className="text-warning" /> */}
                      <span className="ptitle">INDUSTRY EXPERTISE</span>
                    </div>
                    <div className="">
                      {investorProfile?.industryExpertise &&
                        investorProfile.industryExpertise.length > 0 ? (
                        investorProfile.industryExpertise.map(
                          (expertise, idx) => (
                            <span
                              key={idx}
                              className="badge bg-light text-dark me-1 mb-1 p-2"
                            >
                              {expertise}
                            </span>
                          ),
                        )
                      ) : (
                        <span className="text-muted">
                          No industry expertise added yet
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="d-flex align-items-center gap-1">
                      {/* <Award size={14} className="text-warning" /> */}
                      <span className="ptitle">INVESTMENT CRITERIA</span>
                    </div>
                    <div className="cheqbox d-flex flex-column">
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Cheque Size</h5>
                        <h6>{Array.isArray(investorProfile.typicalChequeSize)
                          ? investorProfile.typicalChequeSize.join(", ")
                          : investorProfile.typicalChequeSize}</h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Geography</h5>
                        <h6>{investorProfile.geographyFocus}</h6>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Stage</h5>
                        <div className="d-flex gap-1 align-items-center">
                          {investorProfile?.preferredStage &&
                            investorProfile.preferredStage.length > 0 ? (
                            investorProfile.preferredStage.map((stage, idx) => (
                              <span
                                key={idx}
                                className="seedtext"
                              >
                                {stage}
                              </span>
                            ))
                          ) : (
                            <span className="seedtext">
                              No preferred stages selected
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Hands-on (Monthly calls)</h5>
                        <h6>{investorProfile.handsOn}</h6>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Cap Table Rules Modal */}
      {showCapTableRules && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setShowCapTableRules(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              padding: "32px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0" style={{ color: "#CC0000" }}>
                📋 Cap Table Visibility & Rules
              </h5>
              <button
                onClick={() => setShowCapTableRules(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                ×
              </button>
            </div>

            <div className="row g-4">
              {/* INVESTOR VIEW */}
              <div className="col-md-6">
                <div
                  style={{
                    border: "2px solid #CC0000",
                    borderRadius: "12px",
                    padding: "20px",
                    height: "100%",
                  }}
                >
                  <h6
                    className="fw-bold mb-3 pb-2 border-bottom"
                    style={{ color: "#CC0000", textDecoration: "underline" }}
                  >
                    Cap Table INVESTOR view the below:
                  </h6>

                  <p className="fw-semibold mb-2 small">
                    Who can see this post:
                  </p>
                  <div className="small mb-3">
                    {/* Contacts listed */}
                    <div className="d-flex align-items-start gap-2 mb-1">
                      <input
                        type="checkbox"
                        className="mt-1 flex-shrink-0"
                        checked={
                          capTableRules.investor.contact_listed === "Yes"
                        }
                        onChange={() =>
                          toggleRule("investor", "contact_listed")
                        }
                        style={{ cursor: "pointer" }}
                      />
                      <div>
                        Contacts listed on my cap table
                        <div className="ms-3 mt-1">
                          {/* Portfolio company dropdown option */}
                          <div className="d-flex align-items-start gap-2 mb-1">
                            <input
                              type="checkbox"
                              className="mt-1 flex-shrink-0"
                              checked={
                                capTableRules.investor.portfolio_company ===
                                "Yes"
                              }
                              onChange={() =>
                                toggleRule("investor", "portfolio_company")
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <span
                              style={{ color: "#CC0000", fontStyle: "italic" }}
                            >
                              ONLY contacts from{" "}
                              <strong>
                                [SELECT PORTFOLIO COMPANY FROM DROPDOWN]
                              </strong>{" "}
                              portfolio company
                            </span>
                          </div>

                          {/* All portfolio contacts */}
                          <div className="d-flex align-items-start gap-2">
                            <input
                              type="checkbox"
                              className="mt-1 flex-shrink-0"
                              checked={
                                capTableRules.investor.contact_from === "Yes"
                              }
                              onChange={() =>
                                toggleRule("investor", "contact_from")
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <span>
                              Contacts from all of my portfolio company cap
                              tables
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Angel Network members */}
                    <div className="d-flex align-items-start gap-2 mb-1">
                      <input
                        type="checkbox"
                        className="mt-1 flex-shrink-0"
                        checked={
                          capTableRules.investor.capavate_member === "Yes"
                        }
                        onChange={() =>
                          toggleRule("investor", "capavate_member")
                        }
                        style={{ cursor: "pointer" }}
                      />
                      <span>
                        Only Capavate Angel Network members (if you are an
                        active member)
                      </span>
                    </div>

                    {/* Everyone */}
                    <div className="d-flex align-items-start gap-2">
                      <input
                        type="checkbox"
                        className="mt-1 flex-shrink-0"
                        checked={capTableRules.investor.everyone === "Yes"}
                        onChange={() => toggleRule("investor", "everyone")}
                        style={{ cursor: "pointer" }}
                      />
                      <span>Everyone</span>
                    </div>
                  </div>

                  <p className="fw-bold mb-2 small">
                    RULES OF ENGAGEMENT ON POSTS:
                  </p>
                  {[
                    "No solicitation: no sales pitches, no fundraising asks, no capital calls.",
                    "Focus on business-related content.",
                    "Do not offer, advertise, or sell securities to the general public through Capavate.",
                    'No cold "DM me for a deal" or lead-gen style posts; keep deal discussion in appropriate, permitted channels.',
                    "Be professional, courteous, and constructive in all posts and comments.",
                    "Challenge ideas, not people; no personal attacks, insults, or harassment.",
                    "No hate speech, discrimination, or threats of any kind.",
                    "Keep language clear, concise, and suitable for a professional investor audience.",
                    "Do not share private disputes or grievances; resolve those offline.",
                    "No spam: no mass tagging, repetitive posts, or irrelevant links.",
                  ].map((rule, i) => (
                    <div key={i} className="d-flex gap-2 mb-1 small">
                      <span
                        className="fw-bold flex-shrink-0"
                        style={{ color: "#CC0000" }}
                      >
                        {i + 1}.
                      </span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COMPANY VIEW */}
              <div className="col-md-6">
                <div
                  style={{
                    border: "2px solid #1e40af",
                    borderRadius: "12px",
                    padding: "20px",
                    height: "100%",
                  }}
                >
                  <h6
                    className="fw-bold mb-3 pb-2 border-bottom"
                    style={{ color: "#1e40af", textDecoration: "underline" }}
                  >
                    Cap Table COMPANY view the below:
                  </h6>

                  <p className="fw-semibold mb-2 small">
                    Who can see this post:
                  </p>
                  <div className="small mb-3">
                    <div className="d-flex align-items-start gap-2 mb-1">
                      <input
                        type="checkbox"
                        className="mt-1 flex-shrink-0"
                        checked={capTableRules.company.contact_listed === "Yes"}
                        onChange={() => toggleRule("company", "contact_listed")}
                        style={{ cursor: "pointer" }}
                      />
                      <span>
                        Only contacts on{" "}
                        <span style={{ color: "#CC0000", fontStyle: "italic" }}>
                          <strong>[COMPANY NAME]</strong>
                        </span>{" "}
                        cap table
                      </span>
                    </div>
                    <div className="d-flex align-items-start gap-2 mb-1">
                      <input
                        type="checkbox"
                        className="mt-1 flex-shrink-0"
                        checked={
                          capTableRules.company.capavate_member === "Yes"
                        }
                        onChange={() =>
                          toggleRule("company", "capavate_member")
                        }
                        style={{ cursor: "pointer" }}
                      />
                      <span>
                        Only Capavate Angel Network members (if you are an
                        active member or have previously presented to the
                        network)
                      </span>
                    </div>
                    <div className="d-flex align-items-start gap-2">
                      <input
                        type="checkbox"
                        className="mt-1 flex-shrink-0"
                        checked={capTableRules.company.everyone === "Yes"}
                        onChange={() => toggleRule("company", "everyone")}
                        style={{ cursor: "pointer" }}
                      />
                      <span>Everyone</span>
                    </div>
                  </div>

                  <p className="fw-bold mb-2 small">
                    RULES OF ENGAGEMENT ON POSTS:
                  </p>
                  {[
                    "No solicitation: no sales pitches, no fundraising asks, no capital calls.",
                    "Focus on business-related content.",
                    "Do not offer, advertise, or sell securities to the general public through Capavate.",
                    'No cold "DM me for a deal" or lead-gen style posts; keep deal discussion in appropriate, permitted channels.',
                    "Be professional, courteous, and constructive in all posts and comments.",
                    "Challenge ideas, not people; no personal attacks, insults, or harassment.",
                    "No hate speech, discrimination, or threats of any kind.",
                    "Keep language clear, concise, and suitable for a professional investor audience.",
                    "Do not share private disputes or grievances; resolve those offline.",
                    "No spam: no mass tagging, repetitive posts, or irrelevant links.",
                  ].map((rule, i) => (
                    <div key={i} className="d-flex gap-2 mb-1 small">
                      <span
                        className="fw-bold flex-shrink-0"
                        style={{ color: "#1e40af" }}
                      >
                        {i + 1}.
                      </span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
              {rulesSaved && (
                <span className="text-success me-3 align-self-center small fw-bold">
                  ✓ Saved successfully
                </span>
              )}

              {/* Investor Save Button */}
              <button
                onClick={() => saveCapTableRules("Investor")}
                disabled={rulesSaving}
                style={{
                  background: "#CC0000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  opacity: rulesSaving ? 0.6 : 1,
                }}
              >
                {rulesSaving && saveType === "Investor" ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Saving...
                  </>
                ) : (
                  "Save Investor Rules"
                )}
              </button>

              {/* Company Save Button */}
              <button
                onClick={() => saveCapTableRules("Company")}
                disabled={rulesSaving}
                style={{
                  background: "#1e40af",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  opacity: rulesSaving ? 0.6 : 1,
                }}
              >
                {rulesSaving && saveType === "Company" ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Saving...
                  </>
                ) : (
                  "Save Company Rules"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && <AngelNetworkJoinWaitlist setShowModal={setShowModal} />}
    </>
  );
}
