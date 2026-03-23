import React, { useState, useEffect, useRef } from "react";
import ModuleSideNav from "../../components/Users/ModuleSideNav";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../components/Styles/MainHeadStyles.js";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { API_BASE_URL } from "../../config/config.js";
import { Tooltip } from 'react-tooltip';
import "react-tooltip/dist/react-tooltip.css";
import SideBar from "../../components/social/SideBar";
import TopBar from '../../components/social/TopBar';
export default function CompanyProfile() {
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const userLogin = JSON.parse(storedUsername);
  const apiURL = API_BASE_URL + "api/user/";
  var apiURLIndustry = API_BASE_URL + "api/user/capitalround/";
  document.title = "Company Profile";
  const [errr, seterrr] = useState(false);
  const [dangerMessage, setdangerMessage] = useState("");
  const [companydata, setcompanydata] = useState("");
  const [formStep1, setformStep1] = useState(true);
  const [formStep2, setformStep2] = useState(false);
  const [formStep3, setformStep3] = useState(false);
  const [state_codes, setstate_codes] = useState("");
  const [States, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [Cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Filenamearticle, setFilenamearticle] = useState("");
  const [step2Countrycode, setstep2Countrycode] = useState("");
  const [selectedCountryStep2, setselectedCountryStep2] = useState(null);
  const [step2required, setstep2required] = useState(true);
  const navigate = useNavigate();
  const [charCount_descriptionStep4, setcharCount_descriptionStep4] =
    useState(0);
  const [charCount_problemStep4, setcharCount_problemStep4] = useState(0);
  const [charCount_solutionStep4, setcharCount_solutionStep4] = useState(0);
  const [allcountry, setallcountry] = useState([]);
  const countryOptionsFormatted = allcountry.map((country) => ({
    value: country.name,
    label: country.name,
  }));
  const countryOptionsFormattedCode = allcountry.map((country) => ({
    value: country.code,
    label: country.name,
  }));
  const [ClientIP, setClientIP] = useState("");
  const [IndustryExpertise, setIndustryExpertise] = useState([]);
  const [strategicData, setStrategicData] = useState({
    // Section 1 - Strategic Priorities
    strategic_priorities: [],
    interested_in: [],
    seeking_partners: [],
    not_consider: [],

    // Section 2 - Competitors
    competitors: [
      { name: "", url: "", reason: "" },
      { name: "", url: "", reason: "" },
      { name: "", url: "", reason: "" }
    ],

    // Section 3 - Corporate Governance
    board_of_directors: "",
    ongoing_disputes: "",
    regulatory_compliance: "",
    legal_representation: "",
    law_firm_name: "",
    legal_referral: "",
    legal_compliance_review: "",
    accounting_firm: "",
    accounting_firm_name: "",
    accounting_referral: "",
    audited_financials: "",
    saas_model: "",
    holds_ip: "",

    // Section 4 - Market, Customers, Contracts
    operating_geographies: [],
    customer_segments: [],
    exclusivity_clauses: "",
    dependence_risk: "",
    long_term_contracts: "",

    // Section 5 - Readiness
    readiness_reason: "",
    value_proposition: "",
    live_summary: ""
  });
  // Add this function to handle updates from the child component
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
  useEffect(() => {
    getIndustryExpertise();
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
    } catch (err) { }
  };
  useEffect(() => {
    const getIP = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setClientIP(data.ip); // Save this to state
      } catch (error) {
        console.error("Failed to fetch IP", error);
      }
    };

    getIP();
  }, []);
  useEffect(() => {
    getcompanydetail();
  }, []);

  const getcompanydetail = async () => {
    let formdata = {
      company_id: userLogin.companies[0].id,
    };

    try {
      const res = await axios.post(apiURL + "getcompanydetail", formdata, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = res.data.results[0];
      console.log(data)
      // ✅ set the formData first
      setFormData(data);
      setselectedCountryStep2(data.company_country);
      setstep2Countrycode(data.company_country);
      setstate_codes(data.state_code);
      setFilenamearticle(data.articles);
      setJurisdiction(data.jurisdiction_country);
      setEntityType(data.entity_type);
      // ✅ populate States list
      if (data.company_country) {
        const states = State.getStatesOfCountry(data.country_code);
        setStates(states);

        // ✅ if company_state exists, populate Cities
        if (data.state_code) {
          const stateObj = states.find(
            (s) =>
              s.name === data.state_code || s.isoCode === data.state_code
          );

          if (stateObj) {
            const cities = City.getCitiesOfState(
              data.country_code,
              data.state_code
            );
            if (cities.length === 0) {
              setstep2required(false);
            } else {
              setstep2required(true);
            }
            setCities(cities);
            setSelectedState(stateObj.isoCode);
          }
        }
      }
      setStrategicData(prev => ({
        ...prev,
        strategic_priorities: data.strategic_priorities ? JSON.parse(data.strategic_priorities) : [],
        interested_in: data.interested_in ? JSON.parse(data.interested_in) : [],
        seeking_partners: data.seeking_partners ? JSON.parse(data.seeking_partners) : [],
        not_consider: data.not_consider ? JSON.parse(data.not_consider) : [],

        // Section 2 - Competitors
        competitors: [
          {
            name: data.competitor_1_name || '',
            url: data.competitor_1_url || '',
            reason: data.competitor_1_reason || ''
          },
          {
            name: data.competitor_2_name || '',
            url: data.competitor_2_url || '',
            reason: data.competitor_2_reason || ''
          },
          {
            name: data.competitor_3_name || '',
            url: data.competitor_3_url || '',
            reason: data.competitor_3_reason || ''
          }
        ],

        // Section 3 - Corporate Governance
        board_of_directors: data.board_of_directors || '',
        ongoing_disputes: data.ongoing_disputes || '',
        regulatory_compliance: data.regulatory_compliance || '',
        legal_representation: data.legal_representation || '',
        law_firm_name: data.law_firm_name || '',
        legal_referral: data.legal_referral || '',
        legal_compliance_review: data.legal_compliance_review || '',
        accounting_firm: data.accounting_firm || '',
        accounting_firm_name: data.accounting_firm_name || '',
        accounting_referral: data.accounting_referral || '',
        audited_financials: data.audited_financials || '',
        saas_model: data.saas_model || '',
        holds_ip: data.holds_ip || '',

        // Section 4 - Market, Customers, Contracts
        operating_geographies: data.operating_geographies ? JSON.parse(data.operating_geographies) : [],
        customer_segments: data.customer_segments ? JSON.parse(data.customer_segments) : [],
        exclusivity_clauses: data.exclusivity_clauses || '',
        dependence_risk: data.dependence_risk || '',
        long_term_contracts: data.long_term_contracts || '',

        // Section 5 - Readiness
        readiness_reason: data.readiness_reason || '',
        value_proposition: data.value_proposition || '',
        live_summary: data.live_summary || ''
      }));
    } catch (err) {
      console.error("Error fetching company details:", err);
    }
  };

  useEffect(() => {
    getallcountry();
  }, []);
  const getallcountry = async () => {
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

  const [formData, setFormData] = useState({
    company_email: "",
    phone: "",
    city_step2: "",
    company_city: "",
    company_street_address: "",
    company_industory: "",
    company_name: "",
    year_registration: "",
    company_website: "",
    employee_number: "",
    company_linkedin: "",
    descriptionStep4: "",
    problemStep4: "",
    solutionStep4: "",
    company_state: "",
    company_postal_code: "",
    company_country: "",
    articles_files: "",
    business_number: "",
    entity_name: "",
    jurisdiction: "",
    state_code: "",
    country_code: "",
    date_of_incorporation: "",
    entity_type: "",
    jurisdiction_country: "",
    entity_structure: "",
    mailing_address: "",
    office_address: "",
    articles: "",
  });
  const handleSubmit = async () => {
    // setIsLoading(true);
    const formDataToSend = new FormData();

    formDataToSend.append("company_id", userLogin.companies[0].id);
    formDataToSend.append("ip_address", ClientIP);

    const allFormData = {
      ...formData, // All basic form fields
      // Section 1 - Strategic Priorities
      strategic_priorities: strategicData.strategic_priorities && strategicData.strategic_priorities.length > 0
        ? JSON.stringify(strategicData.strategic_priorities) : "",
      interested_in: strategicData.interested_in && strategicData.interested_in.length > 0
        ? JSON.stringify(strategicData.interested_in) : "",
      seeking_partners: strategicData.seeking_partners && strategicData.seeking_partners.length > 0
        ? JSON.stringify(strategicData.seeking_partners) : "",
      not_consider: strategicData.not_consider && strategicData.not_consider.length > 0
        ? JSON.stringify(strategicData.not_consider) : "",
      // Section 2 - Competitors
      competitor_1_name: strategicData.competitors[0]?.name || "",
      competitor_1_url: strategicData.competitors[0]?.url || "",
      competitor_1_reason: strategicData.competitors[0]?.reason || "",
      competitor_2_name: strategicData.competitors[1]?.name || "",
      competitor_2_url: strategicData.competitors[1]?.url || "",
      competitor_2_reason: strategicData.competitors[1]?.reason || "",
      competitor_3_name: strategicData.competitors[2]?.name || "",
      competitor_3_url: strategicData.competitors[2]?.url || "",
      competitor_3_reason: strategicData.competitors[2]?.reason || "",
      // Section 3 - Corporate Governance
      board_of_directors: strategicData.board_of_directors || "",
      ongoing_disputes: strategicData.ongoing_disputes || "",
      regulatory_compliance: strategicData.regulatory_compliance || "",
      legal_representation: strategicData.legal_representation || "",
      law_firm_name: strategicData.law_firm_name || "",
      legal_referral: strategicData.legal_referral || "",
      legal_compliance_review: strategicData.legal_compliance_review || "",
      accounting_firm: strategicData.accounting_firm || "",
      accounting_firm_name: strategicData.accounting_firm_name || "",
      accounting_referral: strategicData.accounting_referral || "",
      audited_financials: strategicData.audited_financials || "",
      saas_model: strategicData.saas_model || "",
      holds_ip: strategicData.holds_ip || "",
      // Section 4 - Market, Customers, Contracts
      operating_geographies: strategicData.operating_geographies && strategicData.operating_geographies.length > 0
        ? JSON.stringify(strategicData.operating_geographies) : "",
      customer_segments: strategicData.customer_segments && strategicData.customer_segments.length > 0
        ? JSON.stringify(strategicData.customer_segments) : "",
      exclusivity_clauses: strategicData.exclusivity_clauses || "",
      dependence_risk: strategicData.dependence_risk || "",
      long_term_contracts: strategicData.long_term_contracts || "",
      // Section 5 - Readiness
      readiness_reason: strategicData.readiness_reason || "",
      value_proposition: strategicData.value_proposition || "",
      live_summary: strategicData.live_summary || "",
    };

    // Now loop through all fields
    Object.entries(allFormData).forEach(([key, value]) => {
      if (key === "articles") {
        if (value) {
          formDataToSend.append("articles", value);
        }
      } else {
        // Don't send empty arrays or objects
        if (value !== undefined && value !== null && value !== "") {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, "");
        }
      }
    });

    console.log("FormData being sent:");
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
    //return
    try {
      const respo = await axios.post(
        `${apiURL}companyProfileUpdate`,
        formDataToSend,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data", // ✅ force multipart
          },
        }
      );
      setdangerMessage("Profile updated successfully!");
      seterrr(false);
      getcompanydetail();
      setTimeout(() => {
        setdangerMessage("");
        window.location.reload();
      }, 3000);
    } catch (err) {
      setdangerMessage("Error updating profile. Please try again.");
      seterrr(true);
      setTimeout(() => {
        setdangerMessage("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  //
  const [formErrors, setFormErrors] = useState({
    emailMatch: "",
  });
  const companyWebsiteRef = useRef(null);
  const [errorUrl, seterrorUrl] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate email matching on the fly
    // if (name === "email" || name === "confirm_email") {
    //   if (
    //     (name === "email" && value !== formData.confirm_email) ||
    //     (name === "confirm_email" && value !== formData.email)
    //   ) {
    //     setFormErrors((prev) => ({
    //       ...prev,
    //       emailMatch: "Emails do not match.",
    //     }));
    //   } else {
    //     setFormErrors((prev) => ({ ...prev, emailMatch: "" }));
    //   }
    // }
  };
  const handleproblemStep4 = (e) => {
    const valuee = e.target.value;
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the value for 'headline'
    }));
    setcharCount_problemStep4(valuee.length);
  };
  const handlesolutionStep4 = (e) => {
    const valuee = e.target.value;
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the value for 'headline'
    }));
    setcharCount_solutionStep4(valuee.length);
  };
  const handledescriptionStep4 = (e) => {
    const valuee = e.target.value;
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the value for 'headline'
    }));
    setcharCount_descriptionStep4(valuee.length);
  };
  const [phoneError, setPhoneError] = useState("");
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });

    // ✅ Custom validation
    if (value && value.replace(/\D/g, "").length < 10) {
      setPhoneError("Phone number must be at least 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const handleStep2getstate = (event) => {
    const countryCode = event.target.value; // Get the selected country code from the event
    const countryName = event.target.options[event.target.selectedIndex].text;

    if (countryName === "Aruba" || countryName === "American Samoa") {
      setstep2required(false);
    } else {
      setstep2required(true);
    }
    console.log(countryCode);
    setselectedCountryStep2(countryName);
    setFormData((prev) => ({
      ...prev,
      company_country: countryName,
      country_code: countryCode, // State name
    }));
    // Assuming you have a method to fetch states based on country code
    const indiaStates = State.getStatesOfCountry(countryCode);

    setCities([]);
    setStates(indiaStates);
  };
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);

    const stateCode = e.target.value;
    console.log(stateCode, formData.country_code);
    // Get cities of that state
    const cities = City.getCitiesOfState(formData.country_code, stateCode);
    const selectedStateObj = States.find(
      (state) => state.isoCode === stateCode
    );
    setstate_codes(stateCode);
    // Get the state name if found
    const stateName = selectedStateObj ? selectedStateObj.name : "";

    setFormData((prev) => ({
      ...prev,
      state_code: stateCode,
      company_state: stateName, // State name
    }));
    if (cities.length === 0) {
      setstep2required(false);
    } else {
      setstep2required(true);
    }
    console.log(cities);
    setCities(cities);
  };
  const handleStep2getcity = async (event) => {
    const city = event.target.value;

    const countryCode = formData.company_country;

    const cityList = City.getCitiesOfState(countryCode, city);
    // Update form data with selected city
    setFormData((prev) => ({
      ...prev,
      city_step2: city,
      company_city: city,
    }));

    // Get postal code from Google API
  };
  const entityTypesByCountry = {
    Argentina: [
      "SA (Sociedad Anónima)",
      "SRL (Sociedad de Responsabilidad Limitada)",
      "SCS",
      "SCA",
      "Cooperative",
      "Sole Proprietorship",
    ],
    Australia: [
      "Pty Ltd",
      "Public Company",
      "Sole Trader",
      "Trust",
      "Incorporated Association",
      "Cooperative",
      "Indigenous Corporation",
    ],
    Austria: [
      "GmbH",
      "AG",
      "OG (General Partnership)",
      "KG (Limited Partnership)",
      "Verein (Association)",
      "Stiftung (Foundation)",
    ],
    Belgium: [
      "SA/NV",
      "SRL/BV",
      "Cooperative Society",
      "ASBL/VZW (Nonprofit)",
      "Partnership",
      "Sole Proprietorship",
    ],
    Brazil: [
      "LTDA",
      "SA (open/closed)",
      "MEI (Microentrepreneur)",
      "EIRELI",
      "S.A.S.",
      "Cooperative",
      "Sole Proprietorship",
    ],
    Canada: [
      "Corporation (Federal/Provincial)",
      "Sole Proprietorship",
      "Partnership",
      "Cooperative",
      "Not-for-Profit",
      "Trust",
      "ULC (Unlimited Liability)",
    ],
    Chile: [
      "SRL",
      "SA",
      "SpA (Simplified Joint Stock)",
      "EIRL (Individual Limited Liability)",
      "Cooperative",
    ],
    China: [
      "LLC",
      "Company Limited by Shares",
      "WFOE (Wholly Foreign-Owned Enterprise)",
      "JV",
      "Sole Proprietorship",
    ],
    Colombia: [
      "SA",
      "SAS",
      "SRL",
      "SCA",
      "SCS",
      "Cooperative",
      "Simplified Stock Company",
    ],
    "Czech Republic": [
      "s.r.o.",
      "a.s.",
      "v.o.s.",
      "k.s.",
      "Cooperative",
      "Foundation",
      "Sole Proprietorship",
    ],
    Denmark: ["ApS", "A/S", "I/S", "K/S", "Cooperative", "Foundation"],
    Egypt: [
      "Joint Stock Company",
      "LLC",
      "Partnership",
      "Sole Proprietorship",
      "Cooperative",
    ],
    Estonia: [
      "OÜ (Private Limited)",
      "AS (Public Limited)",
      "TÜ (General Partnership)",
      "UÜ (Limited Partnership)",
      "MTÜ (Nonprofit)",
    ],
    Finland: ["Oy", "Oyj", "Ay", "Ky", "Cooperative", "Foundation"],
    France: [
      "SARL",
      "SA",
      "SAS",
      "SNC",
      "SCS",
      "SCOP (Worker Co-op)",
      "Association",
      "Foundation",
    ],
    Germany: [
      "GmbH",
      "AG",
      "OHG",
      "KG",
      "e.V. (Nonprofit)",
      "Stiftung",
      "KGaA (Limited Partnership with Shares)",
    ],
    Greece: ["AE", "EPE", "OE", "EE", "Cooperative", "Nonprofit Association"],
    "Hong Kong": ["Ltd", "Sole Proprietorship", "Partnership", "NGO"],
    Hungary: ["Kft", "Rt", "Bt", "Kkt", "Cooperative", "Foundation"],
    India: [
      "Pvt Ltd",
      "Public Ltd",
      "LLP",
      "OPC (One Person Company)",
      "Section 8 Company (Nonprofit)",
      "Trust",
      "Society",
    ],
    Indonesia: ["PT", "CV", "Firm", "Cooperative", "Foundation"],
    Ireland: ["Ltd", "PLC", "DAC", "CLG", "ULC", "Sole Trader", "Partnership"],
    Israel: ["Ltd", "Partnership", "Cooperative Society", "Amutah (Nonprofit)"],
    Italy: [
      "S.p.A.",
      "S.r.l.",
      "S.a.s.",
      "S.n.c.",
      "Cooperative",
      "Foundation",
    ],
    Japan: [
      "KK (Kabushiki Kaisha)",
      "GK (Godo Kaisha)",
      "NPO",
      "Tokumei Kumiai (Silent Partnership)",
      "Foundation",
    ],
    Kenya: [
      "Ltd",
      "PLC",
      "Partnership",
      "Sole Proprietorship",
      "NGO",
      "Cooperative",
    ],
    Luxembourg: ["Sàrl", "SA", "SCA", "SCSp", "Cooperative", "Foundation"],
    Malaysia: [
      "Sdn Bhd",
      "Berhad",
      "LLP",
      "Sole Proprietorship",
      "Cooperative",
    ],
    Mexico: [
      "S.A. de C.V.",
      "S. de R.L. de C.V.",
      "S.C.",
      "A.C.",
      "Cooperative",
    ],
    Netherlands: [
      "BV",
      "NV",
      "VOF",
      "CV",
      "Stichting (Foundation)",
      "Cooperative",
    ],
    "New Zealand": ["Ltd", "Partnership", "Trust", "Incorporated Society"],
    Nigeria: [
      "Ltd",
      "PLC",
      "Business Name",
      "Incorporated Trustees",
      "Cooperative",
    ],
    Norway: ["AS", "ASA", "ANS", "DA", "Cooperative", "Foundation"],
    Pakistan: [
      "Pvt Ltd",
      "Public Ltd",
      "Partnership",
      "Sole Proprietorship",
      "NGO",
    ],
    Peru: ["SA", "SAC", "SRL", "Cooperative"],
    Philippines: [
      "Corporation",
      "Partnership",
      "Sole Proprietorship",
      "Cooperative",
    ],
    Poland: ["Sp. z o.o.", "S.A.", "S.C.", "S.J.", "Cooperative", "Foundation"],
    Portugal: ["Lda", "SA", "S.C.", "Cooperative", "Foundation"],
    Romania: ["SRL", "SA", "SNC", "SCS", "Cooperative", "Foundation"],
    Russia: ["OOO", "AO", "IP", "Non-commercial Organization", "Foundation"],
    "Saudi Arabia": [
      "LLC",
      "Joint Stock Company",
      "Sole Proprietorship",
      "Cooperative",
    ],
    Singapore: [
      "Pte Ltd",
      "Ltd",
      "LLP",
      "Sole Proprietorship",
      "VCC (Variable Capital Company -- Funds)",
      "Cooperative",
    ],
    "South Africa": [
      "Pty Ltd",
      "CC",
      "NPC (Nonprofit)",
      "Sole Proprietor",
      "Cooperative",
    ],
    "South Korea": [
      "Yuhan Hoesa (Ltd)",
      "Chusik Hoesa (Corp)",
      "Hapja Hoesa (LP)",
      "Cooperative",
    ],
    Spain: ["SA", "SL", "S.C.", "S.Coop", "Foundation", "Association"],
    Sweden: ["AB", "HB", "KB", "Enskild Firma", "Cooperative", "Foundation"],
    Switzerland: [
      "AG",
      "GmbH",
      "Kollektivgesellschaft",
      "Kommanditgesellschaft",
      "Stiftung",
      "Verein",
    ],
    Thailand: ["Ltd", "Partnership", "Sole Proprietorship", "Cooperative"],
    Turkey: [
      "A.Ş.",
      "Ltd. Şti.",
      "Kollektif Şirket",
      "Komandit Şirket",
      "Cooperative",
      "Foundation",
    ],
    Ukraine: ["TOV", "AT", "PP", "Cooperative", "Foundation"],
    "United Arab Emirates": [
      "LLC",
      "PJSC",
      "Sole Establishment",
      "Free Zone Company",
      "Offshore Company",
    ],
    "United Kingdom": [
      "Ltd",
      "PLC",
      "LLP",
      "Sole Trader",
      "CIC",
      "CIO",
      "Charitable Trust",
    ],
    "United States": [
      "LLC",
      "C Corp",
      "S Corp",
      "B Corp",
      "L3C",
      "Series LLC",
      "Sole Proprietorship",
      "Partnership",
      "501(c)(3)",
      "REIT",
      "PC (Professional Corp)",
    ],
  };

  const [jurisdiction, setJurisdiction] = useState(
    formData.jurisdiction_country || ""
  );
  const [entityType, setEntityType] = useState(formData.entity_type || "");

  const handleJurisdictionChange = (e) => {
    const selected = e.target.value;
    setJurisdiction(selected);
    setEntityType(""); // reset entity type when changing jurisdiction
    setFormData({
      ...formData,
      jurisdiction_country: selected,
      entity_type: "",
    });
  };

  const handleEntityTypeChange = (e) => {
    const selected = e.target.value;
    setEntityType(selected);
    setFormData({ ...formData, entity_type: selected });
  };
  const handleSubmitForm_One = () => {
    const phoneDigits = formData.phone ? formData.phone.replace(/\D/g, "") : "";

    // Validate phone number
    if (!formData.phone || phoneDigits.length < 10) {
      setPhoneError("Phone number must be at least 10 digits");
      return; // stop form submission
    }

    // Clear any previous error
    setPhoneError("");

    // Move to next step
    setformStep2(true);
    setformStep1(false);
  };

  const handleSubmitForm_Two = () => {
    setformStep2(false);
    setformStep3(true);
  };
  const handlebackSteps = (id) => {
    if (id === 1) {
      setformStep2(false);
      setformStep1(true);
    }
    if (id === 2) {
      setformStep2(true);
      setformStep3(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setFilenamearticle(file.name);
      setFormData((prev) => ({
        ...prev,
        articles: file, // keep File object for upload
      }));
    }
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>

      <main>
        <div className='d-flex align-items-start gap-0'>
          <SideBar />
          <div className='d-flex flex-grow-1 flex-column gap-0'>
            <TopBar />
            <section className='px-md-3 py-4'>
              <div className='container-fluid'>
                <div className='row gy-4'>
                  <div className='col-md-12 order-1 order-md-0'>
                    <SectionWrapper className="d-block p-md-4 p-3">
                      <div className="container-fluid">
                        {dangerMessage && (
                          <div
                            className={`flex items-center justify-between gap-3 shadow-lg ${errr ? "error_pop" : "success_pop"
                              }`}
                          >
                            <div className="d-flex align-items-center gap-2">
                              <span className="d-block">{dangerMessage}</span>
                            </div>

                            <button
                              type="button"
                              className="close_btnCros"
                              onClick={() => setdangerMessage("")}
                            >
                              ×
                            </button>
                          </div>
                        )}
                        <div className="profile-card">
                          {formStep1 && (
                            <div className="profile-header">
                              <div className="d-flex align-items-center justify-content-between gap-3 w-100">
                                <div className="d-flex align-items-center justify-content-start gap-2">
                                  <div className="profile-icon">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"></path>
                                      <path d="M12 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"></path>
                                    </svg>
                                  </div>
                                  <div className="profile-title">
                                    <h2>Company Contact Info</h2>
                                  </div>
                                </div>
                                <p
                                  style={{
                                    background: "#ff3d41",
                                    color: "#fff",
                                    fontSize: "0.9rem",
                                    borderRadius: "8px",
                                  }}
                                  className="rounded-xl px-3 py-1 w-fit"
                                >
                                  1/3
                                </p>
                              </div>
                            </div>
                          )}

                          {formStep1 && (
                            <div className="profile-content">
                              <form
                                onSubmit={handleSubmitForm_One}
                                method="post"
                                action="javascript:void(0)"
                              >
                                <div className="row g-3">
                                  {/* First Name */}
                                  <div className="col-6">
                                    <label
                                      htmlFor="company_name"
                                      className="label_fontWeight"
                                    >
                                      Name of Company{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required
                                      onChange={handleChange}
                                      value={formData.company_name}
                                      type="text"
                                      name="company_name"
                                      id="company_name"
                                      className="form-input"
                                      placeholder="Enter company name"
                                    />
                                  </div>
                                  <div className="col-6">
                                    <label
                                      htmlFor="company_name"
                                      className="label_fontWeight"
                                    >
                                      Company Email{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      required
                                      onChange={handleChange}
                                      value={formData.company_email}
                                      type="text"
                                      name="company_email"
                                      id="company_email"
                                      className="form-input"
                                      placeholder="Enter company email"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="Industry"
                                      className="label_fontWeight"
                                    >
                                      Industry <span className="required">*</span>
                                    </label>
                                    <select
                                      id="Industry"
                                      value={formData.company_industory}
                                      className="form-select"
                                      onChange={handleChange}
                                      name="company_industory"
                                      required
                                    >
                                      <option value="">--Select--</option>
                                      {IndustryExpertise.map((industry, index) => (
                                        <option key={index} value={industry.value || industry.name}>
                                          {industry.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="phone"
                                      className="label_fontWeight"
                                    >
                                      Phone <span className="required">*</span>
                                    </label>
                                    <PhoneInput
                                      required
                                      value={formData.phone}
                                      name="phone"
                                      defaultCountry="CA"
                                      onChange={handlePhoneChange}
                                      className="phonregister form-control"
                                      placeholder="Enter phone number"
                                    />
                                    {phoneError && (
                                      <small style={{ color: "red" }}>
                                        {phoneError}
                                      </small>
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="company_website"
                                      className="label_fontWeight"
                                    >
                                      Company Website / URL{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      ref={companyWebsiteRef}
                                      type="text"
                                      required
                                      value={formData.company_website}
                                      onChange={handleChange}
                                      name="company_website"
                                      id="company_website"
                                      className="form-control"
                                      placeholder="Enter your company url"
                                    />
                                    {errorUrl && (
                                      <div
                                        style={{ fontSize: "13px" }}
                                        className="text-danger fw-semibold"
                                      >
                                        Please enter valid website url
                                        (eg:www.domain.com)
                                      </div>
                                    )}
                                  </div>
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="employee_number"
                                      className="label_fontWeight"
                                    >
                                      Number of Employees{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <select
                                      required
                                      onChange={handleChange}
                                      value={formData.employee_number}
                                      name="employee_number"
                                      id="employee_number"
                                      className="form-select"
                                    >
                                      <option value="">
                                        Select employee count range
                                      </option>
                                      <option value="1-10">1-10 employees</option>
                                      <option value="11-50">11-50 employees</option>
                                      <option value="51-200">51-200 employees</option>
                                      <option value="201-500">
                                        201-500 employees
                                      </option>
                                      <option value="501-1000">
                                        501-1000 employees
                                      </option>
                                      <option value="1000+">1000+ employees</option>
                                    </select>
                                  </div>


                                  <div className="col-6">
                                    <label
                                      style={{
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      Date of Incorporation/Registration{" "}
                                      <span className="required">*</span>
                                      <span
                                        className="tooltip-icon"
                                        data-tooltip-id="tt-cat-1"
                                        data-tooltip-html={`
        <div class="d-flex flex-column gap-1 tip-content">
          <ul style="margin:0; padding-left:15px;">
            <li>Must match article of incorporation</li>
          </ul>
        </div>
      `}
                                      >
                                        <img
                                          className="blackdark"
                                          width="15"
                                          height="15"
                                          src="/assets/user/images/question.png"
                                          alt="Tip"
                                          style={{ cursor: 'pointer' }}
                                        />
                                      </span>
                                      <Tooltip
                                        id="tt-cat-1"
                                        place="top"
                                        // ❌ Remove float and positionStrategy
                                        // float={true}  // REMOVE THIS
                                        // positionStrategy="fixed" // REMOVE THIS
                                        effect="solid" // Add this for better performance
                                        clickable={true}
                                        delayShow={200} // Add small delay to prevent flicker
                                        delayHide={100}
                                        className="custom-tooltip"
                                      />
                                    </label>

                                    <input
                                      type="date"
                                      required
                                      value={formData.year_registration ? formData.year_registration.split('T')[0] : ''}
                                      name="year_registration"
                                      id="year_registration"
                                      className="form-control"
                                      placeholder="Enter here"
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        const isoDate = value ? new Date(value).toISOString() : '';
                                        setFormData((prev) => ({
                                          ...prev,
                                          year_registration: isoDate,
                                        }));
                                      }}
                                    />
                                  </div>
                                  <div className="col-6">
                                    <label className="label_fontWeight">
                                      One-sentence headliner about the company{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <textarea
                                      required
                                      id="description"
                                      name="descriptionStep4"
                                      className="form-control"
                                      maxLength="400"
                                      value={formData.descriptionStep4}
                                      onChange={handledescriptionStep4}
                                      placeholder="Max 400 characters..."
                                    />
                                    <div className="char-count">
                                      {charCount_descriptionStep4}/400
                                    </div>
                                  </div>

                                  {/* Problem */}
                                  <div className="col-6">
                                    <label className="label_fontWeight">
                                      What problem are you solving?{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <textarea
                                      required
                                      id="problem"
                                      name="problemStep4"
                                      className="form-control"
                                      maxLength="600"
                                      value={formData.problemStep4}
                                      onChange={handleproblemStep4}
                                      placeholder="Max 600 characters..."
                                    />
                                    <div className="char-count">
                                      {charCount_problemStep4}/600
                                    </div>
                                  </div>

                                  {/* Solution */}
                                  <div className="col-6">
                                    <label className="label_fontWeight">
                                      What is Your Solution to the Problem?{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <textarea
                                      required
                                      id="solution"
                                      name="solutionStep4"
                                      className="form-control"
                                      maxLength="600"
                                      value={formData.solutionStep4}
                                      onChange={handlesolutionStep4}
                                      placeholder="Max 600 characters..."
                                    />
                                    <div className="char-count">
                                      {charCount_solutionStep4}/600
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 mt-4">
                                  <div className="d-flex justify-content-between mt-2">
                                    <div className="flex-shrink-0"></div>
                                    <div className="flex-shrink-0">
                                      <button
                                        disabled={isLoading}
                                        style={{ opacity: isLoading ? 0.6 : 1 }}
                                        type="submit"
                                        className="global_btn w-fit  px-4 py-2 fn_size_sm  active d-flex align-items-center gap-2"
                                      >
                                        Next
                                        {isLoading && (
                                          <div
                                            className=" spinner-white spinner-border spinneronetimepay m-0"
                                            role="status"
                                          >
                                            <span className="visually-hidden"></span>
                                          </div>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          )}
                          {formStep2 && (
                            <>
                              <div className="profile-content">
                                <form
                                  onSubmit={handleSubmitForm_Two}
                                  method="post"
                                  action="javascript:void(0)"
                                >
                                  <div className="row g-3">
                                    <div className="col-md-12 mt-5">
                                      <div className="d-flex flex-column gap-2">
                                        <p
                                          style={{
                                            background: "#ff3d41",
                                            color: "#fff",
                                            fontSize: "0.9rem",
                                            borderRadius: "8px",
                                          }}
                                          className="rounded-xl px-3 py-1 w-fit"
                                        >
                                          2/3
                                        </p>
                                        <label htmlFor="">
                                          <h4>Company Mailing Address</h4>
                                        </label>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="d-flex flex-column gap-2">
                                        <label htmlFor="" className="label_fontWeight">
                                          Street <span className="required">*</span>
                                        </label>

                                        <input
                                          value={formData.company_street_address}
                                          onChange={handleChange}
                                          name="company_street_address"
                                          required
                                          id=""
                                          className="form-control"
                                          placeholder="Enter here"
                                          type="text"
                                        />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="d-flex flex-column gap-2">
                                        <label htmlFor="" className="label_fontWeight">
                                          Country <span className="required">*</span>
                                        </label>

                                        <select
                                          required
                                          defaultValue={formData.country_code}
                                          name="company_country"
                                          onChange={handleStep2getstate}
                                          placeholder="Select or type a country"
                                          className="form-select" // Add Bootstrap class or custom styling
                                        >
                                          <option value="">
                                            Select or type a country
                                          </option>
                                          {countryOptionsFormattedCode.map((option) => (
                                            <option value={option.value}>
                                              {option.label}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-12">
                                      <div className="d-flex flex-column gap-2">
                                        <label htmlFor="" className="label_fontWeight">
                                          State / Province / Territory / District{" "}
                                          {step2required && (
                                            <span className="required">*</span>
                                          )}
                                        </label>

                                        <select
                                          className="form-select"
                                          required={step2required ? true : false}
                                          name="company_state"
                                          defaultValue={selectedState}
                                          onChange={handleStateChange}
                                        >
                                          <option value="">-- Select State --</option>
                                          {States.map((state) => (
                                            <option
                                              key={state.isoCode}
                                              value={state.isoCode}
                                            >
                                              {state.name}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="d-flex flex-column gap-2">
                                        <label htmlFor="" className="label_fontWeight">
                                          City{" "}
                                          {step2required && (
                                            <span className="required">*</span>
                                          )}
                                        </label>

                                        <select
                                          defaultValue={formData.company_city}
                                          required={step2required ? true : false}
                                          name="company_country"
                                          onChange={handleStep2getcity}
                                          placeholder="Select or type a city"
                                          className="form-select" // Add Bootstrap class or custom styling
                                        >
                                          <option value="">
                                            Select or type a city
                                          </option>

                                          {Cities.map((Citi) => (
                                            <option key={Citi.name} value={Citi.name}>
                                              {Citi.name}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="d-flex flex-column gap-2">
                                        <label htmlFor="" className="label_fontWeight">
                                          Postal code/Zip{" "}
                                          {step2required && (
                                            <span className="required">*</span>
                                          )}
                                        </label>

                                        <input
                                          onChange={handleChange}
                                          type="text"
                                          value={formData.company_postal_code}
                                          className="form-control"
                                          required={step2required ? true : false}
                                          name="company_postal_code"
                                          placeholder="Enter postal code/zip"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 mt-4">
                                    <div className="d-flex justify-content-between mt-2">
                                      <div className="flex-shrink-0">
                                        <button
                                          type="button"
                                          className="global_btn_clear w-fit  px-4 py-2 fn_size_sm  active d-flex align-items-center gap-2"
                                          data-step="3"
                                          onClick={() => handlebackSteps(1)}
                                        >
                                          Back
                                        </button>
                                      </div>
                                      <div className="flex-shrink-0">
                                        <button
                                          disabled={isLoading}
                                          style={{ opacity: isLoading ? 0.6 : 1 }}
                                          type="submit"
                                          className="global_btn w-fit  px-4 py-2 fn_size_sm  active d-flex align-items-center gap-2"
                                        >
                                          Next
                                          {isLoading && (
                                            <div
                                              className=" spinner-white spinner-border spinneronetimepay m-0"
                                              role="status"
                                            >
                                              <span className="visually-hidden"></span>
                                            </div>
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </>
                          )}
                          {formStep3 && (
                            <div className="profile-content">
                              <form
                                onSubmit={handleSubmit}
                                action="javascript:void(0)"
                                method="post"
                              >
                                <div className="row g-3">
                                  <div className="col-md-12 mt-5">
                                    <div className="d-flex flex-column gap-2">
                                      <p
                                        style={{
                                          background: "#ff3d41",
                                          color: "#fff",
                                          fontSize: "0.9rem",
                                          borderRadius: "8px",
                                        }}
                                        className="rounded-xl px-3 py-1 w-fit"
                                      >
                                        3/3
                                      </p>
                                      <label htmlFor="">
                                        <h4>Legal Entity Information</h4>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="first_name"
                                      className="label_fontWeight"
                                    >
                                      Upload Articles of Incorporation{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      type="file"
                                      name="articles"
                                      id="articles"
                                      className="form-control"
                                      accept=".pdf,.doc,.docx,.jpg,.png" // restrict to supported types if needed
                                      onChange={handleFileChange}
                                      required={!Filenamearticle} // only required if no file exists
                                    />
                                    <span>{Filenamearticle}</span>
                                  </div>
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="entity_name"
                                      className="label_fontWeight"
                                    >
                                      Legal Entity Name{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      defaultValue={formData.entity_name}
                                      type="text"
                                      onChange={handleChange}
                                      name="entity_name"
                                      placeholder="Enter here"
                                      value={formData.entity_name}
                                      id="entity_name"
                                      className="form-control"
                                      required
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="entity_name"
                                      className="label_fontWeight"
                                    >
                                      Business Number{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <input
                                      onChange={handleChange}
                                      defaultValue={formData.business_number}
                                      type="text"
                                      name="business_number"
                                      value={formData.business_number}
                                      id="business_number"
                                      className="form-control"
                                      placeholder="Enter your business number"
                                      required
                                    />
                                  </div>

                                  <div className="col-md-6">
                                    <label
                                      htmlFor="jurisdiction"
                                      className="label_fontWeight"
                                    >
                                      Jurisdiction of Incorporation{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <select
                                      required
                                      value={formData.jurisdiction_country}
                                      name="jurisdiction_country"
                                      onChange={handleJurisdictionChange}
                                      placeholder="Select or type a country"
                                      className="form-select" // Add Bootstrap class or custom styling
                                    >
                                      <option value="">Select or type a country</option>
                                      {countryOptionsFormatted.map((option) => (
                                        <option value={option.value}>
                                          {option.label}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="col-md-6">
                                    <label
                                      htmlFor="entity_type"
                                      className="label_fontWeight"
                                    >
                                      Type of Entity{" "}
                                      {entityTypesByCountry[jurisdiction] && (
                                        <span className="required">*</span>
                                      )}
                                    </label>
                                    <select
                                      id="entity_type"
                                      name="entity_type"
                                      className="form-select"
                                      value={entityType}
                                      onChange={handleEntityTypeChange}
                                      disabled={!jurisdiction}
                                      required={!!entityTypesByCountry[jurisdiction]}
                                    >
                                      <option value="">Select entity type</option>
                                      {jurisdiction &&
                                        entityTypesByCountry[jurisdiction]?.map(
                                          (type) => (
                                            <option key={type} value={type}>
                                              {type}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>

                                  <div className="col-md-6">
                                    <label
                                      htmlFor="entity_structure"
                                      className="label_fontWeight"
                                    >
                                      Entity Structure{" "}
                                      <span className="required">*</span>
                                    </label>

                                    <select
                                      required
                                      onChange={handleChange}
                                      name="entity_structure"
                                      id="entity_structure"
                                      className="form-select"
                                      defaultValue={formData.entity_structure}
                                    >
                                      <option value="">Select</option>
                                      <option value="private">
                                        Private Corporation
                                      </option>
                                      <option value="public">Public Corporation</option>
                                    </select>
                                  </div>
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="office_address"
                                      className="label_fontWeight"
                                    >
                                      Registered Office Address{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <textarea
                                      onChange={handleChange}
                                      required
                                      defaultValue={formData.office_address}
                                      type="date"
                                      name="office_address"
                                      id="office_address"
                                      className="form-control"
                                      placeholder="Enter office address"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label
                                      htmlFor="mailing_address"
                                      className="label_fontWeight"
                                    >
                                      Mailing Address{" "}
                                      <span className="required">*</span>
                                    </label>
                                    <textarea
                                      required
                                      onChange={handleChange}
                                      value={formData.mailing_address}
                                      type="date"
                                      name="mailing_address"
                                      id="mailing_address"
                                      className="form-control"
                                      placeholder="Enter mailing address"
                                    />
                                  </div>
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
                                </div>
                                <div className="col-12 mt-4">
                                  <div className="d-flex justify-content-between mt-2">
                                    <div className="flex-shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => handlebackSteps(2)}
                                        className="global_btn_clear w-fit  px-4 py-2 fn_size_sm  active d-flex align-items-center gap-2"
                                        data-step="3"
                                      >
                                        Back
                                      </button>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <button
                                        disabled={isLoading}
                                        style={{ opacity: isLoading ? 0.6 : 1 }}
                                        type="submit"
                                        className="global_btn w-fit  px-4 py-2 fn_size_sm  active d-flex align-items-center gap-2"
                                      >
                                        Save
                                        {isLoading && (
                                          <div
                                            className=" spinner-white spinner-border spinneronetimepay m-0"
                                            role="status"
                                          >
                                            <span className="visually-hidden"></span>
                                          </div>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          )}
                          {/* Save Button */}
                        </div>
                      </div>
                    </SectionWrapper>
                  </div>

                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <style jsx>{`
        .profile-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .profile-header {
          display: flex;
          align-items: center;
          padding: 24px 32px;
          border-bottom: 1px solid #f1f3f4;
          background: #efefef;
        }

        .profile-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            var(--primary) 0%,
            var(--primary-icon) 100%
          );
          color: white;
          margin-right: 16px;
        }

        .profile-title h2 {
          font-size: 24px;
          font-weight: 600;
          color: #0a0a0a;
          margin: 0 0 4px 0;
        }

        .profile-title p {
          color: #6b7280;
          margin: 0;
          font-size: 14px;
        }

        .profile-content {
          padding: 32px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
          font-size: 14px;
        }

        .required {
          color: #f63b3b;
        }

        .form-input {
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.2s ease;
          background: #fff;
        }

        .form-input:focus {
          outline: none;
          border-color: #f63b3b;
          box-shadow: 0 0 0 3px rgba(246, 59, 59, 0.1);
        }

        .form-input:disabled {
          background-color: #f9fafb;
          color: #6b7280;
          cursor: not-allowed;
        }

        .input-note {
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        .phone-input {
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          width: 100%;
        }

        .phone-input:focus {
          outline: none;
          border-color: #f63b3b;
          box-shadow: 0 0 0 3px rgba(246, 59, 59, 0.1);
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #6b7280;
          z-index: 1;
        }

        .input-with-icon .form-input {
          padding-left: 40px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid #f1f3f4;
          padding-top: 24px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #f63b3b 0%, #e03535 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(246, 59, 59, 0.25);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .alert {
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          font-weight: 500;
        }

        .alert-success {
          background-color: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .alert-error {
          background-color: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        @media (max-width: 768px) {
          .profile-header {
            padding: 20px;
          }

          .profile-content {
            padding: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .form-actions {
            justify-content: center;
          }

          .btn-primary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
