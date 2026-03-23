import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import SideBar from '../../components/Investor/social/SideBar';
import TopBar from '../../components/Investor/social/TopBar';
import { API_BASE_URL } from '../../config/config';
import { Mails, User, Phone, Globe, Building2, Briefcase } from "lucide-react";
import {
  Stepblock,
  Iconblock,
  Sup,
} from "../../components/Styles/RegisterStyles";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Select from 'react-select';
import { Country, City } from 'country-state-city';
const STEPS = [
  { id: 0, label: "Contact Info", icon: "📋" },
  { id: 1, label: "Investor Profile", icon: "👤" },
  { id: 2, label: "Network Profile", icon: "🌐" },
];

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

const INIT = {
  first_name: "", last_name: "", phone: "", city: "", country: "", linkedIn_profile: "",
  type_of_investor: "", accredited_status: "", bio_short: "", mailing_address: "",
  country_tax: "", tax_id: "",
  screen_name: "", job_title: "", company_name: "", company_country: "",
  company_website: "", industry_expertise: "", geo_focus: "", network_bio: "", notes: "",
};

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

export default function Profile() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INIT);
  const [records, setRecords] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [errr, seterrr] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [selectedHandsOn, setSelectedHandsOn] = useState([]);
  const [selectedMAInterests, setSelectedMAInterests] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedCheques, setSelectedCheques] = useState([]);
  const [countrySymbolList, setCountrysymbollist] = useState([]);
  const [spinners, setspinners] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedCapavateInterests, setSelectedCapavateInterests] = useState([]);
  const [industryOptions, setIndustryOptions] = useState([]);
  const [phoneError, setPhoneError] = useState("");

  const apiURL = API_BASE_URL + "api/user/investor/";
  const apiUrlRound = API_BASE_URL + "api/user/capitalround/";
  const apiURLINFile = API_BASE_URL + "api/user/investorreport/";
  const apiURLIndustry = API_BASE_URL + "api/user/capitalround/";
  const userLogin = JSON.parse(localStorage.getItem("InvestorData") || "{}");
  const InvestorData = userLogin;
  const code = { code: userLogin.unique_code || '' };
  const [kycFiles, setKycFiles] = useState([]);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  document.title = "Investor Profile";

  useEffect(() => {
    setStep(0);
    fetchData();
    getallcountrySymbolList();
    getIndustryExpertise();
  }, []);
  const handleKycChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("KYC files selected:", files);
    setKycFiles(files);
  };
  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfilePictureFile(file);
    setProfilePicPreview(URL.createObjectURL(file));
  };

  // Handle profile picture selection (already have handlePicChange, update it)

  const fetchData = async () => {
    try {
      const res = await axios.post(apiURL + "getinvestorData", { id: userLogin.id });
      console.log(userLogin)
      if (res.data.results?.length > 0) {
        const d = res.data.results[0];

        setRecords(d);
        setForm({
          first_name: d.first_name || "",
          last_name: d.last_name || "",
          phone: d.phone || "",
          city: d.city || "",
          country: d.country || "",
          linkedIn_profile: d.linkedIn_profile || "",
          type_of_investor: d.type_of_investor || "",
          accredited_status: d.accredited_status || "",
          bio_short: d.bio_short || "",
          mailing_address: d.mailing_address || "",
          country_tax: d.country_tax || "",
          tax_id: d.tax_id || "",
          screen_name: d.screen_name || "",
          job_title: d.job_title || "",
          company_name: d.company_name || "",
          company_country: d.company_country || "",
          company_website: d.company_website || "",
          industry_expertise: d.industry_expertise || "",
          geo_focus: d.geo_focus || "",
          network_bio: d.network_bio || "",
          notes: d.notes || "",
          invest_through_company: d.invest_through_company || "",
          investing_company_name: d.investing_company_name || "",
          current_job_title: d.current_job_title || "",
          investor_company_country: d.investor_company_country || "",
          investor_company_website: d.investor_company_website || "",
        });
        setSelectedHandsOn(d.hands_on ? d.hands_on.split(",") : []);
        setSelectedMAInterests(d.ma_interests ? d.ma_interests.split(",") : []);
        setSelectedStages(d.preferred_stages ? d.preferred_stages.split(",") : []);
        setSelectedCheques(d.cheque_size ? d.cheque_size.split(",") : []);
        setSelectedCapavateInterests(d.capavate_interests ? d.capavate_interests.split(",") : []);

        if (d.industry_expertise) {
          const industries = d.industry_expertise.split(',').map(value => ({
            value: value,
            label: value
          }));
          setSelectedIndustries(industries);
        }
        if (d.profile_picture) {
          var path_img = "https://capavate.com/api/upload/investor/inv_" + d.id + "/" + d.profile_picture;
          console.log(path_img);
          setProfilePicPreview(path_img)
        };
      } else {
        setRecords({});
      }
    } catch (err) {
      console.error(err);
      setRecords({});
    }
  };

  const getallcountrySymbolList = async () => {
    try {
      const res = await axios.post(apiUrlRound + "getallcountrySymbolList", { id: "" });
      setCountrysymbollist(res.data.results || []);
    } catch (err) { console.error(err); }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = ${value}`);
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const showMsg = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 3000);
  };

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

      const options = res.data.results.map(industry => ({
        value: industry.value || industry.name,
        label: industry.name
      }));
      setIndustryOptions(options);
    } catch (err) { }
  };

  const stepRef = useRef(step);
  useEffect(() => { stepRef.current = step; }, [step]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (stepRef.current !== 2) return;

    console.log("KYC Files from state:", kycFiles);
    console.log("Profile Picture from state:", profilePictureFile);

    // Debug: Log files


    const digitsOnly = form.phone.replace(/\D/g, "");
    if (digitsOnly.length < 10) {
      setFormErrors((prev) => ({
        ...prev,
        phone: "Phone number must be at least 10 digits",
      }));
      return;
    }

    setspinners(true);

    let formdata = new FormData();

    // Contact Info
    formdata.append("id", records.id);
    formdata.append("first_name", form.first_name);
    formdata.append("last_name", form.last_name);
    formdata.append("email", userLogin.email);
    formdata.append("phone", form.phone);
    formdata.append("city", form.city);
    formdata.append("country", form.country);
    formdata.append("linkedIn_profile", form.linkedIn_profile);

    // Investor Profile
    formdata.append("type_of_investor", form.type_of_investor);
    formdata.append("accredited_status", form.accredited_status);
    formdata.append("bio_short", form.bio_short);
    formdata.append("mailing_address", form.mailing_address);
    formdata.append("country_tax", form.country_tax);
    formdata.append("tax_id", form.tax_id);

    // Network Profile
    formdata.append("screen_name", form.screen_name);
    formdata.append("job_title", form.job_title);
    formdata.append("company_name", form.company_name);
    formdata.append("company_country", form.company_country);
    formdata.append("company_website", form.company_website);
    formdata.append("geo_focus", form.geo_focus);
    formdata.append("network_bio", form.network_bio);
    formdata.append("notes", form.notes);
    formdata.append("invest_through_company", form.invest_through_company);
    formdata.append("investing_company_name", form.investing_company_name);
    formdata.append("current_job_title", form.current_job_title);
    formdata.append("investor_company_country", form.investor_company_country);
    formdata.append("investor_company_website", form.investor_company_website);

    // Multi-select fields
    formdata.append("hands_on", selectedHandsOn.join(","));
    formdata.append("ma_interests", selectedMAInterests.join(","));
    formdata.append("preferred_stages", selectedStages.join(","));
    formdata.append("cheque_size", selectedCheques.join(","));

    // Industry Expertise
    const industryValues = selectedIndustries.map(item => item.value).join(',');
    formdata.append("industry_expertise", industryValues || form.industry_expertise);

    // Original fields
    formdata.append("full_address", form.mailing_address);
    formdata.append("code", JSON.stringify(code));
    formdata.append("capavate_interests", selectedCapavateInterests.join(","));

    // KYC documents
    if (kycFiles && kycFiles.length > 0) {
      for (let i = 0; i < kycFiles.length; i++) {
        formdata.append("kyc_document[]", kycFiles[i]);

      }
    }

    // Profile picture
    if (profilePictureFile) {
      formdata.append("profile_picture", profilePictureFile);
    }

    try {
      const res = await axios.post(
        apiURLINFile + "investorprofile",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showMsg("Profile saved successfully ✓");
      setspinners(false);
      fetchData()
      setTimeout(() => {
        showMsg("");
      }, 8000);

    } catch (err) {
      console.error("Upload error:", err);
      setspinners(false);
      showMsg("Error saving profile", "error");
    }
  };

  const toggleMulti = useCallback((arr, setArr, val) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  }, []);



  const handleIndustryChange = (selectedOptions) => {
    setSelectedIndustries(selectedOptions);
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value });
    if (value && value.replace(/\D/g, "").length < 10) {
      setPhoneError("Phone number must be at least 10 digits");
    } else {
      setPhoneError("");
    }
  };
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    console.log(allCountries)
    setCountries(allCountries);
  }, []);
  // useEffect(() => {
  //   console.log("Country changed:", form.country);
  //   console.log("Countries available:", countries.length);

  //   if (form.country && countries.length > 0) {
  //     const selectedCountry = countries.find(
  //       country => country.name === form.country
  //     );

  //     console.log("Selected country object:", selectedCountry);

  //     if (selectedCountry) {
  //       const countryCities = City.getCitiesOfCountry(selectedCountry.isoCode);
  //       console.log("Cities found:", countryCities);
  //       console.log("Cities count:", countryCities?.length);

  //       // Make sure we're setting an array
  //       if (countryCities && Array.isArray(countryCities)) {
  //         setCities(countryCities);
  //       } else {
  //         setCities([]);
  //       }

  //       // Reset city when country changes
  //       //setForm(prev => ({ ...prev, city: "" }));
  //     } else {

  //       setCities([]);
  //     }
  //   } else {

  //     setCities([]);
  //   }
  // }, [form.country, countries]);
  const citiesRef = useRef([]);

  useEffect(() => {
    console.log("=== useEffect RUNNING ===");
    console.log("form.country:", form.country);
    console.log("countries.length:", countries.length);

    if (form.country && countries.length > 0) {
      const selectedCountry = countries.find(
        country => country.name === form.country
      );

      console.log("selectedCountry:", selectedCountry);

      if (selectedCountry && selectedCountry.isoCode) {
        console.log("ISO Code:", selectedCountry.isoCode);
        const countryCities = City.getCitiesOfCountry(selectedCountry.isoCode);

        console.log("Raw cities from API:", countryCities);
        console.log("Cities count:", countryCities?.length);

        if (countryCities && countryCities.length > 0) {
          citiesRef.current = countryCities;
          console.log("Setting cities with:", countryCities);
          setCities([...countryCities]);
        } else {
          console.log("No cities found for this country");
          citiesRef.current = [];
          setCities([]);
        }
      } else {
        console.log("Country not found or no ISO code");
        setCities([]);
      }
    } else {
      console.log("Condition not met - either no country or countries not loaded");
      setCities([]);
    }
  }, [form.country, countries]);
  const MultiChip = ({ label, options, selected, setSelected }) => (
    <div className="mb-3">
      <label className="form-label fw-semibold small text-uppercase"
        style={{ letterSpacing: '0.05em', color: '#4a5568' }}>{label}</label>
      <div className="d-flex flex-wrap gap-2">
        {options.map(option => {
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

  if (records === null) {
    return (
      <main>
        <div className="d-flex align-items-start gap-0">
          <SideBar />
          <div className="d-flex flex-grow-1 flex-column gap-0">
            <TopBar />
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 400 }}>
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const stepContent = [
    // STEP 0 — Contact Info
    <div key="s0">
      <div className="mb-4 pb-2 border-bottom">
        <h5 className="fw-bold mb-0" style={{ color: '#CC0000' }}>Your Current Role/Work</h5>
        <small className="text-muted">Used for cap table management</small>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Screen Name</label>
            <input
              type="text"
              name="screen_name"
              className="form-control form-control-sm"
              placeholder="@JohnSmith"
              value={form.screen_name || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
              autoComplete="off"
            />
            <small className="text-muted d-block mt-2"
              style={{ fontSize: '12px', color: '#6c757d' }}>
              NOTE: Your screen name will be visible to all shareholders on the same cap table and across all social media sections of Capavate.com. Your portfolio companies, where you are a shareholder, will have access to your real name.
            </small>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Current Job Title</label>
            <input
              type="text"
              name="job_title"
              className="form-control form-control-sm"
              placeholder="Managing Partner"
              value={form.job_title || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Current Company Name</label>
            <input
              type="text"
              name="company_name"
              className="form-control form-control-sm"
              placeholder="Acme Ventures"
              value={form.company_name || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Company Country</label>
            <select
              name="company_country"
              className="form-select form-select-sm"
              value={form.company_country || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}>
              <option value="">— Select Country —</option>
              {countrySymbolList.map(c => (
                <option key={c.id || c.name} value={c.name || c.country_name}>
                  {c.name || c.country_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Company Website</label>
            <input
              type="url"
              name="company_website"
              className="form-control form-control-sm"
              placeholder="https://acmeventures.com"
              value={form.company_website || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
              autoComplete="off"
            />
          </div>
        </div>




      </div>
      <div className="mb-4 pb-2 border-bottom">
        <h5 className="fw-bold mb-0" style={{ color: '#CC0000' }}>Contact Information</h5>
        <small className="text-muted">Used for cap table management</small>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
              First Name <span className="text-danger ms-1">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              className="form-control form-control-sm"
              placeholder="John"
              value={form.first_name || ""}
              onChange={handleChange}
              required
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
              Last Name <span className="text-danger ms-1">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              className="form-control form-control-sm"
              placeholder="Smith"
              value={form.last_name || ""}
              onChange={handleChange}
              required
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Contact (Email)</label>
            <input type="email" className="form-control form-control-sm"
              value={userLogin.email || ""} disabled readOnly
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
              Contact (Mobile) <span className="text-danger ms-1">*</span>
            </label>
            <PhoneInput
              required
              value={form.phone}
              name="phone"
              defaultCountry="CA"
              onChange={handlePhoneChange}
              className="phonregister form-control"
              placeholder="Enter phone number"
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px', width: '100%' }}
            />
            {phoneError && (
              <small style={{ color: "red" }}>
                {phoneError}
              </small>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
              Country
            </label>
            <select
              name="country"
              className="form-select form-select-sm"
              value={form.country}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}>
              <option value="">— Select Country —</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
              City
            </label>
            <select
              name="city"
              className="form-select form-select-sm"
              value={form.city}
              onChange={handleChange}
              disabled={!form.country}
              style={{
                borderRadius: 8,
                border: '1.5px solid #e2e8f0',
                padding: '10px 14px',
                backgroundColor: !form.country ? '#f8f9fa' : 'white'
              }}>
              <option value="">
                {!form.country ? "— Select Country First —" : "— Select City —"}
              </option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>




      </div>
    </div>,

    // STEP 1 — Investor Profile
    <div key="s1">
      <div className="mb-4 pb-2 border-bottom">
        <h5 className="fw-bold mb-0" style={{ color: '#CC0000' }}>Investor Profile</h5>
        <small className="text-muted">Used for cap table management</small>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Type of Investor</label>
            <select
              name="type_of_investor"
              className="form-select form-select-sm"
              value={form.type_of_investor || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}>
              <option value="">— Select —</option>
              {INVESTOR_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Accredited Status</label>
            <select
              name="accredited_status"
              className="form-select form-select-sm"
              value={form.accredited_status || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}>
              <option value="">— Select —</option>
              {ACCREDITED.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>One sentence that describes you (max 240 chars)</label>
            <textarea
              name="bio_short"
              className="form-control form-control-sm"
              rows={3}
              maxLength={240}
              placeholder="I'm an angel investor focused on..."
              value={form.bio_short || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
            />
            <small className="text-muted">Max 240 characters</small>
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>LinkedIn or Professional Profile</label>
            <input
              type="text"
              name="linkedIn_profile"
              className="form-control form-control-sm"
              placeholder="https://linkedin.com/in/..."
              value={form.linkedIn_profile || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
              autoComplete="off"
            />
          </div>
        </div>

        <div className="col-md-12">
          {/* Do you invest through a company? */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
              Do you invest through a company?
            </label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  type="radio"
                  name="invest_through_company"
                  id="investYes"
                  className="form-check-input"
                  value="yes"
                  checked={form.invest_through_company === "yes"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="investYes">Yes</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="invest_through_company"
                  id="investNo"
                  className="form-check-input"
                  value="no"
                  checked={form.invest_through_company === "no"}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="investNo">No</label>
              </div>
            </div>
          </div>

          {/* Conditional Fields - Show only if YES */}
          {form.invest_through_company === "yes" && (
            <>
              {/* Investing Company Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-uppercase"
                  style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
                  Investing Company Name
                </label>
                <input
                  type="text"
                  name="investing_company_name"
                  className="form-control form-control-sm"
                  placeholder="e.g., Acme Capital Partners"
                  value={form.investing_company_name || ""}
                  onChange={handleChange}
                  style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
                  autoComplete="off"
                />
              </div>

              {/* Current Job Title */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-uppercase"
                  style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
                  Current Job Title
                </label>
                <input
                  type="text"
                  name="current_job_title"
                  className="form-control form-control-sm"
                  placeholder="e.g., Managing Partner, CFO"
                  value={form.current_job_title || ""}
                  onChange={handleChange}
                  style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
                  autoComplete="off"
                />
              </div>

              {/* Company Country */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-uppercase"
                  style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
                  Company Country
                </label>

                <select
                  name="investor_company_country"
                  className="form-select form-select-sm"
                  value={form.investor_company_country}
                  onChange={handleChange}
                  style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}>
                  <option value="">— Select Country —</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>


              {/* Full Mailing Address */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-uppercase"
                  style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
                  Full Mailing Address
                </label>
                <input
                  type="text"
                  name="mailing_address"
                  className="form-control form-control-sm"
                  placeholder="123 Main St, Suite 400..."
                  value={form.mailing_address || ""}
                  onChange={handleChange}
                  style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
                  autoComplete="off"
                />
              </div>

              {/* Company Website */}
              <div className="mb-3">
                <label className="form-label fw-semibold small text-uppercase"
                  style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
                  Company Website
                </label>
                <input
                  type="url"
                  name="investor_company_website"
                  className="form-control form-control-sm"
                  placeholder="https://www.example.com"
                  value={form.investor_company_website || ""}
                  onChange={handleChange}
                  style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
                  autoComplete="off"
                />
              </div>
            </>
          )}
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Country of Tax Residency</label>
            <select
              name="country_tax"
              className="form-select form-select-sm"
              value={form.country_tax || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}>
              <option value="">— Select Country —</option>
              {countrySymbolList.map(c => (
                <option key={c.id || c.name} value={c.name || c.country_name}>
                  {c.name || c.country_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Tax ID or National ID</label>
            <input
              type="text"
              name="tax_id"
              className="form-control form-control-sm"
              placeholder="XXX-XXX-XXX"
              value={form.tax_id || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>KYC / AML Documentation</label>

            <input
              type="file"
              name="kyc_document"
              className="form-control form-control-sm mb-2" onChange={handleKycChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0' }}
              multiple
            />

            {records.kyc_document && (() => {
              try {
                const kycFiles = JSON.parse(records.kyc_document);
                if (kycFiles.length > 0) {
                  return (
                    <div className="mt-2">
                      <small className="text-success d-block mb-2">
                        ✓ {kycFiles.length} document(s) already uploaded
                      </small>
                      <div className="d-flex flex-wrap gap-2">
                        {kycFiles.map((file, index) => {
                          const fileUrl = "https://capavate.com/api/upload/investor/inv_" + records.id + "/" + file;
                          const fileExtension = file.split('.').pop().toLowerCase();
                          const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(fileExtension);

                          const getFileIcon = () => {
                            if (isImage) return '🖼️';
                            if (fileExtension === 'pdf') return '📄';
                            if (['doc', 'docx'].includes(fileExtension)) return '📝';
                            if (['xls', 'xlsx', 'csv'].includes(fileExtension)) return '📊';
                            if (['txt', 'rtf'].includes(fileExtension)) return '📃';
                            if (['zip', 'rar', '7z'].includes(fileExtension)) return '🗜️';
                            return '📁';
                          };

                          return (
                            <div key={index} className="card p-2" style={{ width: '160px' }}>
                              {isImage ? (
                                <img
                                  src={fileUrl}
                                  alt={`KYC ${index + 1}`}
                                  style={{
                                    width: '100%',
                                    height: '90px',
                                    objectFit: 'cover',
                                    borderRadius: '4px'
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `
                                      <div class="d-flex justify-content-center align-items-center" 
                                        style="height:90px; background:#f8f9fa; border-radius:4px">
                                        <span style="font-size: 32px;">${getFileIcon()}</span>
                                      </div>
                                    `;
                                  }}
                                />
                              ) : (
                                <div className="d-flex justify-content-center align-items-center"
                                  style={{
                                    height: '90px',
                                    background: '#f8f9fa',
                                    borderRadius: '4px'
                                  }}>
                                  <span style={{ fontSize: '32px' }}>{getFileIcon()}</span>
                                </div>
                              )}

                              <div className="mt-2">
                                <small className="d-block text-truncate" title={file}>
                                  {file}
                                </small>
                                <small className="text-muted d-block">
                                  {fileExtension ? fileExtension.toUpperCase() : 'FILE'}
                                </small>
                              </div>

                              <div className="d-flex justify-content-center gap-1 mt-2">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => window.open(fileUrl, '_blank')}
                                  style={{ fontSize: '11px', padding: '2px 8px' }}
                                  title="View in browser"
                                >
                                  View
                                </button>
                                <a
                                  href={fileUrl}
                                  download
                                  className="btn btn-sm btn-outline-success"
                                  style={{ fontSize: '11px', padding: '2px 8px' }}
                                  title="Download file"
                                >
                                  Download
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              } catch (e) {
                console.error("Error parsing KYC documents:", e);
                return (
                  <small className="text-warning d-block mt-1">
                    ⚠ Error loading documents
                  </small>
                );
              }
            })()}

            <small className="text-muted d-block mt-2">
              Upload passport, ID, address proof, or any relevant documentation (multiple files allowed)
            </small>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Profile Picture</label>
            <div className="d-flex align-items-center gap-3">
              {profilePicPreview
                ? <img src={profilePicPreview} alt="preview" className="rounded-circle"
                  style={{ width: 64, height: 64, objectFit: 'cover', border: '2px solid #CC0000' }} />
                : <div className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 64, height: 64, background: '#f1f5f9', fontSize: 28 }}>👤</div>
              }
              <input type="file" accept="image/*" name="profile_picture" onChange={handlePicChange}
                className="form-control form-control-sm w-auto"
                style={{ borderRadius: 8, border: '1.5px solid #e2e8f0' }} />
            </div>
          </div>
        </div>

      </div>
    </div>,

    // STEP 2 — Network Profile
    <div key="s2">
      <div className="mb-4 pb-2 border-bottom">
        <h5 className="fw-bold mb-0" style={{ color: '#CC0000' }}>Capavate Angel Investor Network Profile</h5>
        <small className="text-muted">Visible to founders on the platform</small>
      </div>
      <div className="row">





        {/* Industry Expertise - Multiple Select */}
        <div className="col-12">
          <div className="d-flex flex-column gap-2">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
              INDUSTRY EXPERTISE
              <span className="text-muted" style={{ fontSize: '12px', marginLeft: '5px' }}>
                (you can select multiple)
              </span>
            </label>
            <Iconblock>
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

        {/* Cheque Size */}
        <div className="col-md-12 mb-3">
          <label className="form-label fw-semibold small text-uppercase"
            style={{ letterSpacing: '0.05em', color: '#4a5568' }}>
            Typical Cheque Size
            <span className="ms-2 fw-normal text-muted" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 11 }}>— select multiple</span>
          </label>
          <div className="d-flex flex-wrap gap-2">
            {CHEQUE_SIZES.map(o => {
              const active = selectedCheques.includes(o);
              return (
                <span key={o}
                  onClick={() => setSelectedCheques(prev => prev.includes(o) ? prev.filter(v => v !== o) : [...prev, o])}
                  style={{
                    cursor: 'pointer', userSelect: 'none', padding: '6px 14px',
                    borderRadius: 20, fontSize: 12, fontWeight: 500,
                    backgroundColor: active ? '#CC0000' : '#f1f5f9',
                    color: active ? '#fff' : '#475569',
                    border: '1.5px solid ' + (active ? '#CC0000' : '#cbd5e1'),
                    transition: 'all 0.15s',
                  }}>
                  {active && '✓ '}{o}
                </span>
              );
            })}
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Geography Focus</label>
            <select
              name="geo_focus"
              className="form-select form-select-sm"
              value={form.geo_focus || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}>
              <option value="">— Select —</option>
              {GEO_FOCUS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="col-md-12">
          <MultiChip
            label="Preferred Stage"
            options={STAGES}
            selected={selectedStages}
            setSelected={setSelectedStages}
          />
        </div>

        <div className="col-md-12">
          <MultiChip
            label="Hands‑on vs Hands‑off"
            options={HANDS_ON}
            selected={selectedHandsOn}
            setSelected={setSelectedHandsOn}
          />
        </div>

        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Network Bio</label>
            <textarea
              name="network_bio"
              className="form-control form-control-sm"
              rows={3}
              maxLength={1000}
              placeholder="Tell founders about your background..."
              value={form.network_bio || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
            />
            <small className="text-muted">Max 1000 characters</small>
          </div>
        </div>

        <div className="col-md-12">
          <MultiChip
            label="M&A Interests"
            options={MA_INTERESTS}
            selected={selectedMAInterests}
            setSelected={setSelectedMAInterests}
          />
        </div>

        <div className="col-12 mt-4">
          <div className="mb-4 pb-2 border-bottom">
            <h5 className="fw-bold mb-0" style={{ color: '#CC0000' }}>
              <Briefcase size={18} className="me-2" />
              Capavate Angel Network Interests
            </h5>
            <small className="text-muted">
              I'm focused on the following M&A and investment topics:
            </small>
          </div>
          <div className="row">
            <div className="col-12">
              <MultiChip
                label="Investment Interests"
                options={CAPAVATE_INTERESTS}
                selected={selectedCapavateInterests}
                setSelected={setSelectedCapavateInterests}
              />
              {selectedCapavateInterests.length > 0 && (
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
              )}
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="mb-3">
            <label className="form-label fw-semibold small text-uppercase"
              style={{ letterSpacing: '0.05em', color: '#4a5568' }}>Notes</label>
            <textarea
              name="notes"
              className="form-control form-control-sm"
              rows={3}
              placeholder="Any additional notes..."
              value={form.notes || ""}
              onChange={handleChange}
              style={{ borderRadius: 8, border: '1.5px solid #e2e8f0', padding: '10px 14px' }}
            />
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <main>
      <div className="d-flex align-items-start gap-0">
        <SideBar />
        <div className="d-flex flex-grow-1 flex-column gap-0">
          <TopBar />
          <section className="px-md-3 py-4">
            <div className="container-fluid">
              <div className="mb-4">
                <h4 className="fw-bold mb-0">Investor Profile</h4>
                <small className="text-muted">Manage your contact info, investor details, and network presence</small>
              </div>

              {msg.text && (
                <div
                  className={`flex items-center justify-between gap-3 shadow-lg ${errr ? "error_pop" : "success_pop"}`}
                >
                  <div className="d-flex align-items-start gap-2">
                    <span className="d-block">{msg.text}</span>
                  </div>
                  <button
                    type="button"
                    className="close_btnCros"
                    onClick={() => setMsg("", "")}
                  >
                    ×
                  </button>
                </div>
              )}
              {formErrors.phone && (
                <div className="alert alert-danger py-2 px-3 mb-3" style={{ borderRadius: 10 }}>
                  {formErrors.phone}
                </div>
              )}

              <div className="d-flex align-items-center mb-4 gap-0"
                style={{ background: '#f8fafc', borderRadius: 14, padding: 6, border: '1.5px solid #e2e8f0' }}>
                {STEPS.map((s, i) => (
                  <React.Fragment key={s.id}>
                    <button type="button" onClick={() => setStep(s.id)}
                      className="btn d-flex align-items-center gap-2 flex-grow-1 justify-content-center"
                      style={{
                        borderRadius: 10, fontWeight: 600, fontSize: 14, padding: '10px 16px',
                        background: step === s.id ? '#CC0000' : 'transparent',
                        color: step === s.id ? '#fff' : '#64748b',
                        border: 'none', transition: 'all 0.2s',
                      }}>
                      <span style={{ fontSize: 18 }}>{s.icon}</span>
                      <span className="d-none d-md-inline">{s.label}</span>
                    </button>
                    {i < STEPS.length - 1 && (
                      <span style={{ color: '#cbd5e1', fontSize: 18, flexShrink: 0 }}>›</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="card border-0 shadow-sm" style={{ borderRadius: 16 }}>
                <div className="card-body p-4">
                  <form onSubmit={handleSave}>
                    <div style={{ minHeight: 400 }}>
                      {stepContent[step]}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm px-4"
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                        disabled={step === 0}
                        style={{ borderRadius: 8 }}
                      >
                        ← Previous
                      </button>

                      <span className="text-muted small">
                        Step {step + 1} of {STEPS.length}
                      </span>

                      {step === 2 ? (
                        <button
                          type="button"
                          className="btn btn-sm px-4 ee"
                          disabled={spinners}
                          onClick={handleSave}
                          style={{ borderRadius: 8, background: '#CC0000', color: '#fff', fontWeight: 600 }}
                        >
                          {spinners ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Saving...
                            </>
                          ) : (
                            'Save Changes ✓'
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm px-4"
                          onClick={() => setStep(s => s + 1)}
                          style={{ borderRadius: 8, background: '#CC0000', color: '#fff', fontWeight: 600 }}
                        >
                          Next →
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}