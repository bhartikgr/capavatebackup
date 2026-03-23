import React, { useState, useEffect } from "react";
import { Mails, User, Phone, Globe, Building2, Briefcase } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/Styles/InvestorLogin.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../components/Styles/MainHeadStyles.js";
import {
  Stepblock,
  Iconblock,
  Sup,
} from "../../components/Styles/RegisterStyles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { State, City } from "country-state-city";
import { useParams } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from 'react-select'; // Import react-select
import InvestorRegistrationPopup from "../../components/Users/Acknowledgement/InvestorRegistrationPopup.jsx";
// Constants from Profile component
const CHEQUE_SIZES = ["Less than $25k", "$25k–$50k", "$50k–$100k", "$100k–$250k", "$250k–$500k", "$500k–$1M", "$1M–$5M", "$5M+"];
const INVESTOR_TYPES = [
  "Accelerator",
  "Advisor (consultant to companies)",
  "Angel investor (Individual)",
  "Angel network or angel club",
  "Bank / Financial institution",
  "Corporate venture capital / strategic corporate investor",
  "Crowdfunding platform/crowd investor vehicle",
  "Employee (via ESOP)",
  "Family office (direct investing)",
  "Fund‑of‑funds or investment company",
  "Government (grant) or quasi‑government fund",
  "Hedge fund",
  "Impact or ESG‑focused investment fund",
  "Incubator",
  "Micro VC / emerging fund manager (pre‑seed/seed specialist)",
  "Private equity/growth equity fund (late‑stage or special situations)",
  "Representative of an accredited individual (advisor, family office CIO, etc.)",
  "Syndicate lead or SPV manager (investing on behalf of a pooled vehicle)",
  "Venture capital fund (institutional VC)"
];
const ACCREDITED = ["Yes – Accredited", "No – Non-Accredited", "Not Sure"];
const GEO_FOCUS = ["Home Market Only", "Home Country", "Open to Global / Cross-Border"];
const STAGES = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Growth", "Late Stage"];
const HANDS_ON = ["Mentoring", "Board Roles", "Intros / Deal Flow", "Portfolio Support", "Passive"];
const MA_INTERESTS = ["M&A Advisory", "Buyouts", "Mergers", "Strategic Partnerships", "PE Roll-ups", "Distressed Assets", "Cross-border M&A"];
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
export default function Provideform() {
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem("InvestorData");
  const userLogin = JSON.parse(storedUsername);
  const [spinners, setspinners] = useState(false);
  var apiURLINFile = "http://localhost:5000/api/user/investorreport/";
  var apiURL = "http://localhost:5000/api/user/";
  var apiURLIndustry = "http://localhost:5000/api/user/capitalround/";
  document.title = "Investor Page";
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedCapavateInterests, setSelectedCapavateInterests] = useState([]);
  // Industry options ko react-select ke format mein convert karna
  const [industryOptions, setIndustryOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [successresponse, setsuccessresponse] = useState("");
  const [err, seterr] = useState(false);
  const [allcountry, setallcountry] = useState([]);
  const [InvestorData, setInvestorData] = useState("");
  const code = useParams();
  const [IndustryExpertise, setIndustryExpertise] = useState([]);

  // Multi-select states
  const [selectedHandsOn, setSelectedHandsOn] = useState([]);
  const [selectedMAInterests, setSelectedMAInterests] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedCheques, setSelectedCheques] = useState([]);

  const [step2required, setstep2required] = useState(true);
  const [selectedCountryStep2, setselectedCountryStep2] = useState(null);
  const [States, setStates] = useState([]);
  const [countrySymbolList, setCountrysymbollist] = useState([]);

  // Form data state with all fields from Profile component
  const [formData_Step2, setFormData_Step2] = useState({
    // Contact Info
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    linkedIn_profile: "",

    // Investor Profile
    type_of_investor: "",
    accredited_status: "",
    bio_short: "",
    mailing_address: "",
    country_tax: "",
    tax_id: "",

    // Network Profile
    screen_name: "",
    job_title: "",
    company_name: "",
    company_country: "",
    company_website: "",
    industry_expertise: "",
    geo_focus: "",
    network_bio: "",
    notes: "",

    // Additional fields from original
    comments: "",
    full_address: "",
  });

  useEffect(() => {
    getIndustryExpertise();
    getallcountry();
    getallcountrySymbolList();
    checkinvestorCode();
    getInvestorInfocheck();
  }, []);

  const getIndustryExpertise = async () => {
    let formData = {
      investor_id: '',
    };
    try {
      const res = await axios.post(apiURLIndustry + "getIndustryExpertise", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setIndustryExpertise(res.data.results);
      const options = res.data.results.map(industry => ({
        value: industry.value || industry.name,
        label: industry.name
      }));
      setIndustryOptions(options);
    } catch (err) { }
  };
  const handleIndustryChange = (selectedOptions) => {
    setSelectedIndustries(selectedOptions || []);
  };
  const getallcountry = async () => {
    let formData = {};
    try {
      const res = await axios.post(apiURL + "getallcountry", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setallcountry(res.data.results);
    } catch (err) { }
  };

  const getallcountrySymbolList = async () => {
    try {
      const res = await axios.post(apiURLIndustry + "getallcountrySymbolList", { id: "" });
      setCountrysymbollist(res.data.results || []);
    } catch (err) { console.error(err); }
  };

  const checkinvestorCode = async () => {
    let formData = {
      code: code,
    };

    try {
      const res = await axios.post(
        apiURLINFile + "checkinvestorCode",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.results.length === 0) {
        navigate("/investor/login");
      } else {
        if (res.data.results[0].is_register === "Yes") {
          navigate("/investor/login");
        } else {
          setInvestorData(res.data.results[0]);
          // Pre-fill email from InvestorData
          setFormData_Step2(prev => ({
            ...prev,
            email: res.data.results[0].email || ""
          }));
        }
      }
    } catch (err) { }
  };

  const getInvestorInfocheck = async () => {
    const formData = {
      code: code.code,
    };
    try {
      const res = await axios.post(
        apiURLINFile + "getInvestorInfocheck",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.results.length > 0) {
        navigate("/investor/login/");
      }
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };

  const countryOptionsFormatted = allcountry.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const handleStep2getstate = (event) => {
    const countryCode = event.target.value;
    const countryName = event.target.options[event.target.selectedIndex].text;
    if (countryName === "Aruba") {
      setstep2required(false);
    }
    setselectedCountryStep2(countryName);
    setFormData_Step2((prev) => ({
      ...prev,
      country: event.target.value,
    }));
    const indiaStates = State.getStatesOfCountry(countryCode);
    setStates(indiaStates);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData_Step2(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData_Step2((prev) => ({ ...prev, phone: value }));
  };

  const toggleMulti = (arr, setArr, val) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  // Provideform.jsx में handlesubmitinfo फंक्शन अपडेट करें
  const [showAgreementPopup, setShowAgreementPopup] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const handlesubmitinfo = async (e) => {
    e.preventDefault();

    let kycFiles = e.target.kyc_document ? e.target.kyc_document.files : null;
    let profilePictureFile = e.target.profile_picture ? e.target.profile_picture.files[0] : null; // सिंगल फाइल

    const digitsOnly = formData_Step2.phone.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      setFormErrors((prev) => ({
        ...prev,
        phone: "Phone number must be at least 10 digits",
      }));
      return;
    }

    setPendingFormData({
      kycFiles,
      profilePictureFile,
      formData: formData_Step2,
      selectedHandsOn,
      selectedMAInterests,
      selectedStages,
      selectedCheques,
      selectedCapavateInterests,
      selectedIndustries,
      InvestorData
    });

    setShowAgreementPopup(true);
  };
  const handleAcceptAgreement = async () => {
    setIsFormSubmitting(true);

    try {
      // Prepare FormData
      let formdata = new FormData();

      // Contact Info
      formdata.append("first_name", pendingFormData.formData.first_name);
      formdata.append("last_name", pendingFormData.formData.last_name);
      formdata.append("email", pendingFormData.formData.email);
      formdata.append("phone", pendingFormData.formData.phone);
      formdata.append("city", pendingFormData.formData.city);
      formdata.append("country", pendingFormData.formData.country);
      formdata.append("linkedIn_profile", pendingFormData.formData.linkedIn_profile);

      // Investor Profile
      formdata.append("type_of_investor", pendingFormData.formData.type_of_investor);
      formdata.append("accredited_status", pendingFormData.formData.accredited_status);
      formdata.append("bio_short", pendingFormData.formData.bio_short);
      formdata.append("mailing_address", pendingFormData.formData.mailing_address);
      formdata.append("country_tax", pendingFormData.formData.country_tax);
      formdata.append("tax_id", pendingFormData.formData.tax_id);

      // Network Profile
      formdata.append("screen_name", pendingFormData.formData.screen_name);
      formdata.append("job_title", pendingFormData.formData.job_title);
      formdata.append("company_name", pendingFormData.formData.company_name);
      formdata.append("company_country", pendingFormData.formData.company_country);
      formdata.append("company_website", pendingFormData.formData.company_website);
      formdata.append("geo_focus", pendingFormData.formData.geo_focus);
      formdata.append("network_bio", pendingFormData.formData.network_bio);
      formdata.append("notes", pendingFormData.formData.notes);

      // Multi-select fields
      formdata.append("hands_on", pendingFormData.selectedHandsOn.join(","));
      formdata.append("ma_interests", pendingFormData.selectedMAInterests.join(","));
      formdata.append("preferred_stages", pendingFormData.selectedStages.join(","));
      formdata.append("cheque_size", pendingFormData.selectedCheques.join(","));

      // Original fields
      formdata.append("capavate_interests", pendingFormData.selectedCapavateInterests.join(","));
      formdata.append("full_address", pendingFormData.formData.mailing_address);
      formdata.append("id", pendingFormData.InvestorData.id);
      formdata.append("code", JSON.stringify(code));

      const industryValues = pendingFormData.selectedIndustries.map(item => item.value).join(',');
      formdata.append("industry_expertise", industryValues);

      // Add agreement acknowledgment fields
      formdata.append("agreement_accepted", "Yes");
      formdata.append("eligibility_accepted", "Yes");
      formdata.append("risk_warning_accepted", "Yes");


      // KYC documents - multiple files
      if (pendingFormData.kycFiles && pendingFormData.kycFiles.length > 0) {
        for (let i = 0; i < pendingFormData.kycFiles.length; i++) {
          formdata.append("kyc_document[]", pendingFormData.kycFiles[i]);
        }
      }

      // Profile picture
      if (pendingFormData.profilePictureFile) {
        formdata.append("profile_picture", pendingFormData.profilePictureFile);
      }

      // Submit the form
      const res = await axios.post(
        apiURLINFile + "investorInformation",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setspinners(false);
      setsuccessresponse(res.data.message);

      if (res.data.status === "2") {
        seterr(true);
      } else {
        if (res.data.status === "1") {
          seterr(false);
          setShowAgreementPopup(false);
          setTimeout(() => {
            // navigate("/investor/login");
          }, 8000);
        }
      }

      setTimeout(() => {
        // setsuccessresponse("");
      }, 8000);

    } catch (err) {
      console.error("Upload error:", err);
      setspinners(false);
      seterr(true);
      setsuccessresponse("Error submitting form. Please try again.");
    } finally {
      setIsFormSubmitting(false);
      setPendingFormData(null);
    }
  };

  // Handle popup close
  const handleClosePopup = () => {
    setShowAgreementPopup(false);
    setPendingFormData(null);
  };
  const handleredirectLogin = () => {
    navigate("/investor/login");
  };
  const MultiChip = ({ label, options, selected, setSelected }) => (
    <div className="mb-3">
      <label className="form-label fw-semibold small text-uppercase"
        style={{ letterSpacing: '0.05em', color: '#4a5568' }}>{label}</label>
      <div className="d-flex flex-wrap gap-2">
        {options.map(option => {
          // Handle both string and object options
          const value = option.id || option;
          const label_text = option.label || option;

          return (
            <span
              key={value}
              onClick={() => toggleMulti(selected, setSelected, value)}
              className="badge rounded-pill px-3 py-2"
              style={{
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                backgroundColor: selected.includes(value) ? '#CC0000' : '#f1f5f9',
                color: selected.includes(value) ? '#fff' : '#475569',
                border: '1.5px solid ' + (selected.includes(value) ? '#CC0000' : '#cbd5e1'),
                transition: 'all 0.15s'
              }}
              title={option.description || ''}
            >
              {selected.includes(value) && '✓ '}{label_text}
            </span>
          );
        })}
      </div>
    </div>
  );
  return (
    <>
      <Wrapper className="investor-login-wrapper">
        <div className="fullpage d-block w-100">
          {successresponse && (
            <div style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 99999,
              minWidth: '400px',
              maxWidth: '600px',
              width: '90%',
              borderRadius: '16px',
              padding: '20px 28px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              background: err ? '#fff5f5' : '#f0fff4',
              border: `2px solid ${err ? '#CC0000' : '#38a169'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              animation: 'slideDown 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '32px' }}>
                  {err ? '❌' : '✅'}
                </span>
                <div>
                  <div style={{
                    fontWeight: 700,
                    fontSize: '16px',
                    color: err ? '#CC0000' : '#276749',
                    marginBottom: '4px'
                  }}>
                    {err ? 'Error' : 'Success'}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    color: err ? '#9b2c2c' : '#2f855a',
                    display: 'block'
                  }}>
                    {successresponse}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleredirectLogin("")}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '22px',
                  cursor: 'pointer',
                  color: err ? '#CC0000' : '#38a169',
                  fontWeight: 700,
                  lineHeight: 1,
                  padding: '4px 8px',
                  borderRadius: '8px',
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>
          )}

          <style>{`
  @keyframes slideDown {
    from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0);     }
  }
`}</style>
          <SectionWrapper className="d-block login-main-section py-5">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-10 col-md-12">
                  <div className="card login-card shadow-lg border-0 rounded-4">
                    <div className="card-body p-5">
                      <div className="text-start mb-4">
                        <img
                          src="/logos/capavate.png"
                          alt="Capavate Logo"
                          className="login-logo img-fluid mb-4"
                          style={{ maxHeight: "40px" }}
                        />
                        <h2 className="mainh1 mb-2">Complete Your Investor Profile</h2>
                        <p className="mainp">Please provide all the information below</p>
                      </div>

                      <form
                        action="javascript:void(0)"
                        method="post"
                        onSubmit={handlesubmitinfo}
                      >
                        <Stepblock id="step1">
                          <div className="d-flex flex-column gap-5">
                            <div className="row gy-3">

                              {/* Contact Information Section */}
                              <div className="col-12">
                                <h5 className="fw-bold mb-3" style={{ color: '#CC0000' }}>Contact Information</h5>
                                <small className="text-muted d-block mb-3">Used for cap table management</small>
                              </div>

                              {/* First Name */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">
                                    First Name <Sup className="labelsize">*</Sup>
                                  </label>
                                  <Iconblock>
                                    <User />
                                    <input
                                      type="text"
                                      name="first_name"
                                      value={formData_Step2.first_name}
                                      onChange={handleChange}
                                      required
                                      placeholder="John"
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Last Name */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">
                                    Last Name <Sup className="labelsize">*</Sup>
                                  </label>
                                  <Iconblock>
                                    <User />
                                    <input
                                      type="text"
                                      name="last_name"
                                      value={formData_Step2.last_name}
                                      onChange={handleChange}
                                      required
                                      placeholder="Smith"
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Email - Disabled from InvestorData */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">
                                    Email <Sup className="labelsize">*</Sup>
                                  </label>
                                  <Iconblock>
                                    <Mails />
                                    <input
                                      type="email"
                                      name="email"
                                      value={InvestorData.email || formData_Step2.email}
                                      disabled
                                      required
                                      placeholder="email@example.com"
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Phone */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">
                                    Phone Number <Sup className="labelsize">*</Sup>
                                  </label>
                                  <Iconblock>
                                    <Phone />
                                    <PhoneInput
                                      required
                                      name="phone"
                                      value={formData_Step2.phone}
                                      defaultCountry="CA"
                                      className="phonregister"
                                      onChange={handlePhoneChange}
                                      placeholder="Enter phone number"
                                    />
                                  </Iconblock>
                                  {formErrors.phone && (
                                    <div className="text-danger" style={{ fontSize: "13px" }}>
                                      {formErrors.phone}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* City */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">
                                    City <Sup className="labelsize">*</Sup>
                                  </label>
                                  <Iconblock>
                                    <Building2 />
                                    <input
                                      type="text"
                                      name="city"
                                      value={formData_Step2.city}
                                      onChange={handleChange}
                                      required
                                      placeholder="Toronto"
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Country */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">
                                    Country <Sup className="labelsize">*</Sup>
                                  </label>
                                  <Iconblock>
                                    <Globe />
                                    <select
                                      required
                                      name="country"
                                      value={formData_Step2.country}
                                      onChange={handleStep2getstate}
                                      className="form-select"
                                    >
                                      <option value="">Select or type a country</option>
                                      {countryOptionsFormatted.map((option) => (
                                        <option value={option.value} key={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                  </Iconblock>
                                </div>
                              </div>

                              {/* LinkedIn Profile */}
                              <div className="col-12">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">LinkedIn or Professional Profile</label>
                                  <Iconblock>
                                    <User />
                                    <input
                                      type="text"
                                      name="linkedIn_profile"
                                      value={formData_Step2.linkedIn_profile}
                                      onChange={handleChange}
                                      placeholder="https://linkedin.com/in/..."
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Investor Profile Section */}
                              <div className="col-12 mt-4">
                                <h5 className="fw-bold mb-3" style={{ color: '#CC0000' }}>Investor Profile</h5>
                                <small className="text-muted d-block mb-3">Additional information for investment purposes</small>
                              </div>

                              {/* Type of Investor */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Type of Investor</label>
                                  <Iconblock>
                                    <User />
                                    <select
                                      name="type_of_investor"
                                      value={formData_Step2.type_of_investor}
                                      onChange={handleChange}
                                      className="form-select"
                                    >
                                      <option value="">— Select —</option>
                                      {INVESTOR_TYPES.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                      ))}
                                    </select>
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Accredited Status */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Accredited Status</label>
                                  <Iconblock>
                                    <Building2 />
                                    <select
                                      name="accredited_status"
                                      value={formData_Step2.accredited_status}
                                      onChange={handleChange}
                                      className="form-select"
                                    >
                                      <option value="">— Select —</option>
                                      {ACCREDITED.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                      ))}
                                    </select>
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Bio Short */}
                              <div className="col-12">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">One sentence that describes you (max 240 chars)</label>
                                  <Iconblock>
                                    <textarea
                                      name="bio_short"
                                      value={formData_Step2.bio_short}
                                      onChange={handleChange}
                                      maxLength="240"
                                      rows="2"
                                      placeholder="I'm an angel investor focused on..."
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Full Mailing Address */}
                              <div className="col-12">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Full Mailing Address</label>
                                  <Iconblock>
                                    <Building2 />
                                    <input
                                      type="text"
                                      name="mailing_address"
                                      value={formData_Step2.mailing_address}
                                      onChange={handleChange}
                                      placeholder="123 Main St, Suite 400..."
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Country of Tax Residency */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Country of Tax Residency</label>
                                  <Iconblock>
                                    <Globe />
                                    <select
                                      name="country_tax"
                                      value={formData_Step2.country_tax}
                                      onChange={handleChange}
                                      className="form-select"
                                    >
                                      <option value="">— Select Country —</option>
                                      {countrySymbolList.map(c => (
                                        <option key={c.id || c.name} value={c.name || c.country_name}>
                                          {c.name || c.country_name}
                                        </option>
                                      ))}
                                    </select>
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Tax ID */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Tax ID or National ID</label>
                                  <Iconblock>
                                    <User />
                                    <input
                                      type="text"
                                      name="tax_id"
                                      value={formData_Step2.tax_id}
                                      onChange={handleChange}
                                      placeholder="XXX-XXX-XXX"
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Network Profile Section */}
                              <div className="col-12 mt-4">
                                <h5 className="fw-bold mb-3" style={{ color: '#CC0000' }}>Capavate Angel Investor Network Profile</h5>
                                <small className="text-muted d-block mb-3">Visible to founders on the platform</small>
                              </div>
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Profile Picture</label>
                                  <Iconblock>
                                    <input
                                      type="file"
                                      name="profile_picture"
                                      className="form-input"
                                      accept=".jpg,.jpeg,.png,.gif"

                                    />
                                  </Iconblock>

                                </div>
                              </div>
                              {/* Screen Name */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Screen Name</label>
                                  <Iconblock>
                                    <User />
                                    <input
                                      type="text"
                                      name="screen_name"
                                      value={formData_Step2.screen_name}
                                      onChange={handleChange}
                                      placeholder="@JohnSmith"
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Job Title */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Current Job Title</label>
                                  <Iconblock>
                                    <User />
                                    <input
                                      type="text"
                                      name="job_title"
                                      value={formData_Step2.job_title}
                                      onChange={handleChange}
                                      placeholder="Managing Partner"
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Company Name */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Current Company Name</label>
                                  <Iconblock>
                                    <Building2 />
                                    <input
                                      type="text"
                                      name="company_name"
                                      value={formData_Step2.company_name}
                                      onChange={handleChange}
                                      placeholder="Acme Ventures"
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Company Country */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Company Country</label>
                                  <Iconblock>
                                    <Globe />
                                    <select
                                      name="company_country"
                                      value={formData_Step2.company_country}
                                      onChange={handleChange}
                                      className="form-select"
                                    >
                                      <option value="">— Select Country —</option>
                                      {countrySymbolList.map(c => (
                                        <option key={c.id || c.name} value={c.name || c.country_name}>
                                          {c.name || c.country_name}
                                        </option>
                                      ))}
                                    </select>
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Company Website */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Company Website</label>
                                  <Iconblock>
                                    <Globe />

                                    <input
                                      type="url"
                                      name="company_website"
                                      value={formData_Step2.company_website}
                                      onChange={handleChange}
                                      placeholder="https://acmeventures.com"
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Industry Expertise */}
                              <div className="col-12">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">
                                    Industry Expertise
                                    <span className="text-muted" style={{ fontSize: '12px', marginLeft: '5px' }}>
                                      (you can select multiple)
                                    </span>
                                  </label>
                                  <Iconblock>
                                    <Building2 />
                                    <div style={{ width: '100%', position: 'relative' }}>
                                      <Select
                                        isMulti
                                        name="industry_expertise"
                                        options={industryOptions}
                                        value={selectedIndustries}
                                        onChange={handleIndustryChange}
                                        placeholder="Select industries..."
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        styles={{
                                          control: (base) => ({
                                            ...base,
                                            minHeight: '45px',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '8px',
                                            '&:hover': {
                                              borderColor: '#CC0000'
                                            }
                                          }),
                                          menu: (base) => ({
                                            ...base,
                                            zIndex: 9999
                                          }),
                                          multiValue: (base) => ({
                                            ...base,
                                            backgroundColor: '#CC0000',
                                            color: 'white'
                                          }),
                                          multiValueLabel: (base) => ({
                                            ...base,
                                            color: 'white'
                                          }),
                                          multiValueRemove: (base) => ({
                                            ...base,
                                            color: 'white',
                                            '&:hover': {
                                              backgroundColor: '#CC0000',
                                              color: 'white'
                                            }
                                          })
                                        }}
                                        theme={(theme) => ({
                                          ...theme,
                                          colors: {
                                            ...theme.colors,
                                            primary: '#CC0000',
                                            primary25: '#e6f7f5',
                                          }
                                        })}
                                      />
                                    </div>
                                  </Iconblock>
                                  {selectedIndustries.length > 0 && (
                                    <small className="text-muted">
                                      Selected: {selectedIndustries.length} industries
                                    </small>
                                  )}
                                </div>
                              </div>

                              {/* Cheque Size - Multi-select */}
                              <div className="col-12">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Typical Cheque Size <span className="text-muted" style={{ fontSize: '11px' }}>(select multiple)</span></label>
                                  <div className="d-flex flex-wrap gap-2 mt-2">
                                    {CHEQUE_SIZES.map(o => {
                                      const active = selectedCheques.includes(o);
                                      return (
                                        <span
                                          key={o}
                                          onClick={() => toggleMulti(selectedCheques, setSelectedCheques, o)}
                                          style={{
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            padding: '6px 14px',
                                            borderRadius: 20,
                                            fontSize: 12,
                                            fontWeight: 500,
                                            backgroundColor: active ? '#CC0000' : '#f1f5f9',
                                            color: active ? '#fff' : '#475569',
                                            border: '1.5px solid ' + (active ? '#CC0000' : '#cbd5e1'),
                                            transition: 'all 0.15s',
                                          }}
                                        >
                                          {active && '✓ '}{o}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              {/* Geography Focus */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Geography Focus</label>
                                  <Iconblock>
                                    <Globe />
                                    <select
                                      name="geo_focus"
                                      value={formData_Step2.geo_focus}
                                      onChange={handleChange}
                                      className="form-select"
                                    >
                                      <option value="">— Select —</option>
                                      {GEO_FOCUS.map(focus => (
                                        <option key={focus} value={focus}>{focus}</option>
                                      ))}
                                    </select>
                                  </Iconblock>
                                </div>
                              </div>

                              {/* Preferred Stages - Multi-select */}
                              <div className="col-12">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Preferred Stage <span className="text-muted" style={{ fontSize: '11px' }}>(select multiple)</span></label>
                                  <div className="d-flex flex-wrap gap-2 mt-2">
                                    {STAGES.map(o => {
                                      const active = selectedStages.includes(o);
                                      return (
                                        <span
                                          key={o}
                                          onClick={() => toggleMulti(selectedStages, setSelectedStages, o)}
                                          style={{
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            padding: '6px 14px',
                                            borderRadius: 20,
                                            fontSize: 12,
                                            fontWeight: 500,
                                            backgroundColor: active ? '#CC0000' : '#f1f5f9',
                                            color: active ? '#fff' : '#475569',
                                            border: '1.5px solid ' + (active ? '#CC0000' : '#cbd5e1'),
                                            transition: 'all 0.15s',
                                          }}
                                        >
                                          {active && '✓ '}{o}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              {/* Hands-on vs Hands-off - Multi-select */}
                              <div className="col-12">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Hands‑on vs Hands‑off <span className="text-muted" style={{ fontSize: '11px' }}>(select multiple)</span></label>
                                  <div className="d-flex flex-wrap gap-2 mt-2">
                                    {HANDS_ON.map(o => {
                                      const active = selectedHandsOn.includes(o);
                                      return (
                                        <span
                                          key={o}
                                          onClick={() => toggleMulti(selectedHandsOn, setSelectedHandsOn, o)}
                                          style={{
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            padding: '6px 14px',
                                            borderRadius: 20,
                                            fontSize: 12,
                                            fontWeight: 500,
                                            backgroundColor: active ? '#CC0000' : '#f1f5f9',
                                            color: active ? '#fff' : '#475569',
                                            border: '1.5px solid ' + (active ? '#CC0000' : '#cbd5e1'),
                                            transition: 'all 0.15s',
                                          }}
                                        >
                                          {active && '✓ '}{o}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              {/* Network Bio */}
                              <div className="col-12">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Capavate Angel Investor Network Bio</label>
                                  <Iconblock>
                                    <textarea
                                      name="network_bio"
                                      value={formData_Step2.network_bio}
                                      onChange={handleChange}
                                      maxLength="1000"
                                      rows="4"
                                      placeholder="Tell founders about your background..."
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* M&A Interests - Multi-select */}
                              <div className="col-12">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">M&A and Investment Interests <span className="text-muted" style={{ fontSize: '11px' }}>(select multiple)</span></label>
                                  <div className="d-flex flex-wrap gap-2 mt-2">
                                    {MA_INTERESTS.map(o => {
                                      const active = selectedMAInterests.includes(o);
                                      return (
                                        <span
                                          key={o}
                                          onClick={() => toggleMulti(selectedMAInterests, setSelectedMAInterests, o)}
                                          style={{
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            padding: '6px 14px',
                                            borderRadius: 20,
                                            fontSize: 12,
                                            fontWeight: 500,
                                            backgroundColor: active ? '#CC0000' : '#f1f5f9',
                                            color: active ? '#fff' : '#475569',
                                            border: '1.5px solid ' + (active ? '#CC0000' : '#cbd5e1'),
                                            transition: 'all 0.15s',
                                          }}
                                        >
                                          {active && '✓ '}{o}
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 mt-4">
                                <div className="mb-4 pb-2 border-bottom">
                                  <label htmlFor="">Capavate Angel Network Interests <span className="text-muted" style={{ fontSize: '11px' }}>(select multiple)</span></label>

                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <MultiChip
                                      label="Investment Interests"
                                      options={CAPAVATE_INTERESTS}
                                      selected={selectedCapavateInterests}
                                      setSelected={setSelectedCapavateInterests}
                                    />

                                    <div className="mt-3 p-3 bg-light rounded">
                                      <small className="text-muted fw-bold">Selected Interests:</small>
                                      <ul className="mt-2 mb-0">
                                        {selectedCapavateInterests.map(interestId => {
                                          const interest = CAPAVATE_INTERESTS.find(i => i.id === interestId);
                                          return interest ? (
                                            <li key={interestId} className="mb-1">
                                              <small>
                                                <span className="fw-bold">{interest.label}:</span> {interest.description}
                                              </small>
                                            </li>
                                          ) : null;
                                        })}
                                      </ul>
                                    </div>

                                  </div>
                                </div>
                              </div>
                              {/* Notes */}
                              <div className="col-12">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">Notes</label>
                                  <Iconblock>
                                    <textarea
                                      name="notes"
                                      value={formData_Step2.notes}
                                      onChange={handleChange}
                                      rows="3"
                                      placeholder="Any additional notes..."
                                    />
                                  </Iconblock>
                                </div>
                              </div>

                              {/* KYC/AML Documentation */}
                              <div className="col-12 mt-4">
                                <div className="d-flex flex-column gap-2">
                                  <label htmlFor="">KYC/AML Documentation</label>
                                  <Iconblock>
                                    <input
                                      type="file"
                                      name="kyc_document"
                                      className="form-input"
                                      multiple
                                    />
                                  </Iconblock>
                                  <small className="form-text text-muted">
                                    Upload ID proof, address proof, or institutional documents
                                  </small>
                                </div>
                              </div>

                              {/* Submit Button */}
                              <div className="col-12">
                                <div className="d-flex justify-content-end mt-4">
                                  <div className="flex-shrink-0">
                                    <button
                                      type="submit"
                                      className="sbtn nextbtn"
                                      data-step="1"
                                    >
                                      Submit
                                      {spinners && (
                                        <div
                                          className="white-spinner spinner-border spinneronetimepay m-0"
                                          role="status"
                                        >
                                          <span className="visually-hidden"></span>
                                        </div>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Stepblock>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </Wrapper>
      <InvestorRegistrationPopup
        show={showAgreementPopup}
        onClose={handleClosePopup}
        onAccept={handleAcceptAgreement}
        userName={formData_Step2.first_name}
      />
    </>
  );
}