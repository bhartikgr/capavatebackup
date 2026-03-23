import React, { useState, useEffect, useRef } from "react";
import TopBar from "../../../../components/Users/UserDashboard/TopBar.jsx";
import ModuleSideNav from "../../../../components/Users/UserDashboard/ModuleSideNav.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../../components/Styles/MainHeadStyles.js";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  RadioOption,
  RadioGroup,
} from "../../../../components/Styles/RegisterStyles";
import { State, City } from "country-state-city";
import "react-tooltip/dist/react-tooltip.css";
import { API_BASE_URL } from "../../../../config/config.js";
import { Tooltip } from 'react-tooltip';
import "react-tooltip/dist/react-tooltip.css";
import SignatoryAcknowledgementPopup from "../../../../components/Users/Acknowledgement/SignatoryAcknowledgementPopup.jsx";
import CompanyRegistrationPopup from "../../../../components/Users/Acknowledgement/CompanyRegistrationPopup.jsx";
import StrategicIntentSection from "../../../../components/Users/StrategicIntentSection.jsx";
export default function UserAddCompany() {
  const storedUsername = localStorage.getItem("OwnerLoginData");
  const userLogin = JSON.parse(storedUsername);
  const apiURL = API_BASE_URL + "api/user/";
  const apiUrlCompany = API_BASE_URL + "api/user/company/";
  var apiURLIndustry = API_BASE_URL + "api/user/capitalround/";
  document.title = "Add Company";
  const [errr, seterrr] = useState(false);
  const [dangerMessage, setdangerMessage] = useState("");
  const [companydata, setcompanydata] = useState("");
  const companyWebsiteRef = useRef(null);
  const [errorUrl, seterrorUrl] = useState(false);
  const [charCount_descriptionStep4, setcharCount_descriptionStep4] =
    useState(0);
  const [charCount_problemStep4, setcharCount_problemStep4] = useState(0);
  const [charCount_solutionStep4, setcharCount_solutionStep4] = useState(0);
  const [formStep1, setformStep1] = useState(true);
  const [formStep2, setformStep2] = useState(false);
  const [formStep3, setformStep3] = useState(false);
  const [companyAcknowlegment, setcompanyAcknowlegment] = useState('');
  const [showCompanyAgreement, setShowCompanyAgreement] = useState(false);
  const [pendingCompanyRegistration, setPendingCompanyRegistration] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    city_step2: "",
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
    company_email: "",
  });
  const [OwnerData, setOwnerData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [IndustryExpertise, setIndustryExpertise] = useState([]);
  useEffect(() => {
    getIndustryExpertise();
    getUserAcknowlegment();
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
  const getUserAcknowlegment = async () => {
    let formData = {
      user_id: userLogin.id,
    };
    try {
      const res = await axios.post(apiURL + "getUserAcknowlegment", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      if (res.data.results.length === 0) {
        setShowCompanyAgreement(true);
        setPendingCompanyRegistration(true);
      } else {

      }
      setcompanyAcknowlegment(res.data.results);
    } catch (err) { }
  };
  const handleAcceptCompanyAgreement = async () => {
    try {
      const formData = {
        user_id: userLogin.id,
        status: 'Yes'
      };

      const response = await axios.post(apiURL + "saveCompanyAcknowlegment", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data)
      if (response.data.status === "1" || response.data.success) {
        setcompanyAcknowlegment([{ acknowledged: true }]);
        setShowCompanyAgreement(false);
        setdangerMessage("Company registration agreement accepted successfully!");
        setTimeout(() => {
          if (pendingCompanyRegistration) {

            setPendingCompanyRegistration(false);
          }
          setdangerMessage(""); // Clear message after navigation
        }, 2500);

      }
    } catch (err) {
      console.error("Error saving acknowledgment:", err);
    }
  };

  const handleCloseCompanyAgreement = () => {
    setShowCompanyAgreement(false);
    setPendingCompanyRegistration(false);
  };
  useEffect(() => {
    getcompanydetail();
  }, []);
  useEffect(() => {
    getUserOwnerDetail();
  }, []);
  const getUserOwnerDetail = async () => {
    const formData = {
      user_id: userLogin.id,
    };
    try {
      const resp = await axios.post(
        apiUrlCompany + "getUserOwnerDetail",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data.results.length > 0) {
        setOwnerData(resp.data.results[0]);
      }
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  const getcompanydetail = async () => {
    let formdata = {
      user_id: userLogin.id,
    };
    try {
      const res = await axios.post(apiURL + "getcompanydetail", formdata, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setcompanydata(res.data.results[0]);
      //setFormData(res.data.results[0]);
    } catch (err) {
      console.error("Error fetching company details:", err);
    }
  };
  const [AcknowledgementPopup, setAcknowledgementPopup] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null); // Store form data while popup is shown
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.company_website !== "") {
      if (!isValidURL(formData.company_website)) {
        companyWebsiteRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        setformStep1(true);
        setformStep2(false);
        setformStep3(false);
        seterrorUrl(true);
        return;
      } else {
        seterrorUrl(false);
      }
    }
    let hasError = false;
    let firstErrorIndex = -1;

    // Validate email match and prepare error state
    const errorsCopy = signatoryErrors.map((error, idx) => {
      const email = signatories[idx].signatory_email.trim();
      const confirmEmail = signatories[idx].signatory_confirm_email.trim();

      let emailMatchError = "";

      if (email && confirmEmail && email !== confirmEmail) {
        emailMatchError = "Emails do not match!";
      }

      if (emailMatchError && firstErrorIndex === -1) {
        firstErrorIndex = idx;
        hasError = true;
      }

      return {
        ...error,
        emailMatch: emailMatchError,
      };
    });

    // Validate unique emails only if no match errors so far
    if (!hasError) {
      const emails = signatories
        .map((s) => s.signatory_email.trim())
        .filter(Boolean);

      const duplicateEmails = emails.filter(
        (email, index) => emails.indexOf(email) !== index
      );

      if (duplicateEmails.length > 0) {
        // Find index of the first duplicate email
        firstErrorIndex = signatories.findIndex(
          (s) =>
            s.signatory_email.trim() &&
            duplicateEmails.includes(s.signatory_email.trim())
        );
        hasError = true;
        setformStep1(false);
        setformStep2(true);
        setformStep3(false);
        // Mark all duplicates with error
        signatories.forEach((s, idx) => {
          const email = s.signatory_email.trim();
          if (email && duplicateEmails.includes(email)) {
            errorsCopy[idx] = {
              ...errorsCopy[idx],
              emailMatch: "Email must be unique!",
            };
          }
        });
      }
    }

    if (hasError) {
      setSignatoryErrors(errorsCopy);

      if (firstErrorIndex !== -1) {
        const fieldId = `signatory_email_${firstErrorIndex}`;
        const field = document.getElementById(fieldId);
        if (field) {
          field.scrollIntoView({ behavior: "smooth", block: "center" });
          field.focus();
        }
      }
      setformStep1(false);
      setformStep2(true);
      setformStep3(false);
      setIsLoading(false);
      return;
    }

    let formDataa = {
      company_name: formData.company_name,
      company_industory: formData.company_industory,
      phone: formData.phone,
      company_email: formData.company_email,
      company_website: formData.company_website,
      employee_number: formData.employee_number,
      year_registration: formData.year_registration,
      formally_legally: formallyLegally,
      company_street_address: formData.company_street_address,
      company_country: selectedCountryStep2,
      company_state: formData.company_state,
      country_code: step2Countrycode,
      city_code: "",
      state_code: state_codes,
      city_step2: formData.city_step2,
      company_postal_code: formData.company_postal_code,
      descriptionStep4: formData.descriptionStep4,
      problemStep4: formData.problemStep4,
      solutionStep4: formData.solutionStep4,
      signatories: signatories,
      user_id: userLogin.id,

      // ========== STRATEGIC INTENT FIELDS ==========
      // SECTION 1
      strategic_priorities: JSON.stringify(strategicData.strategic_priorities),
      interested_in: JSON.stringify(strategicData.interested_in),
      seeking_partners: JSON.stringify(strategicData.seeking_partners),
      not_consider: JSON.stringify(strategicData.not_consider),

      // SECTION 2 - Competitors
      competitor_1_name: strategicData.competitors[0]?.name || "",
      competitor_1_url: strategicData.competitors[0]?.url || "",
      competitor_1_reason: strategicData.competitors[0]?.reason || "",
      competitor_2_name: strategicData.competitors[1]?.name || "",
      competitor_2_url: strategicData.competitors[1]?.url || "",
      competitor_2_reason: strategicData.competitors[1]?.reason || "",
      competitor_3_name: strategicData.competitors[2]?.name || "",
      competitor_3_url: strategicData.competitors[2]?.url || "",
      competitor_3_reason: strategicData.competitors[2]?.reason || "",

      // SECTION 3 - Corporate Governance
      board_of_directors: strategicData.board_of_directors,
      ongoing_disputes: strategicData.ongoing_disputes,
      regulatory_compliance: strategicData.regulatory_compliance,
      legal_representation: strategicData.legal_representation,
      law_firm_name: strategicData.law_firm_name,
      legal_referral: strategicData.legal_referral,
      legal_compliance_review: strategicData.legal_compliance_review,
      accounting_firm: strategicData.accounting_firm,
      accounting_firm_name: strategicData.accounting_firm_name,
      accounting_referral: strategicData.accounting_referral,
      audited_financials: strategicData.audited_financials,
      saas_model: strategicData.saas_model,
      holds_ip: strategicData.holds_ip,

      // SECTION 4 - Market, Customers, Contracts
      operating_geographies: JSON.stringify(strategicData.operating_geographies),
      customer_segments: JSON.stringify(strategicData.customer_segments),
      exclusivity_clauses: strategicData.exclusivity_clauses,
      dependence_risk: strategicData.dependence_risk,
      long_term_contracts: strategicData.long_term_contracts,

      // SECTION 5 - Readiness
      readiness_reason: strategicData.readiness_reason,
      value_proposition: strategicData.value_proposition,
      live_summary: strategicData.live_summary
    };
    setPendingFormData(formDataa);
    setAcknowledgementPopup(true);
    setIsLoading(false);
    //return;
    //return;
    // try {
    //   const respo = await axios.post(
    //     `${apiURL}companyaddWithSignatory`,
    //     formDataa,
    //     {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   setdangerMessage(respo.data.message);
    //   if (respo.data.status === "2") {
    //     seterrr(true);
    //     setformStep1(true);
    //     setformStep2(false);

    //     setformStep3(false);
    //   } else {
    //     seterrr(false);
    //     getcompanydetail();
    //     setTimeout(() => {
    //       setdangerMessage("");
    //       navigate("/user/companylist");
    //     }, 3000);
    //   }
    // } catch (err) {
    //   setdangerMessage("Error updating profile. Please try again.");
    //   seterrr(true);
    //   setTimeout(() => {
    //     setdangerMessage("");
    //   }, 3000);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  const handleAcceptSignatory = async () => {
    setAcknowledgementPopup(false);
    setIsLoading(true);

    try {
      // Add signatory acknowledgment data to the form data
      const finalFormData = {
        ...pendingFormData,
        signatory_acknowledged: 'Yes',

      };

      const respo = await axios.post(
        `${apiURL}companyaddWithSignatory`,
        finalFormData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setdangerMessage(respo.data.message);

      if (respo.data.status === "2") {
        seterrr(true);
        setformStep1(true);
        setformStep2(false);
        setformStep3(false);
      } else {
        seterrr(false);
        getcompanydetail();
        setTimeout(() => {
          setdangerMessage("");
          // navigate("/user/companylist");
        }, 3000);
      }
    } catch (err) {
      setdangerMessage("Error updating profile. Please try again.");
      seterrr(true);
      setTimeout(() => {
        setdangerMessage("");
      }, 3000);
    } finally {
      setIsLoading(false);
      setPendingFormData(null);
    }
  };

  // Handle popup close/cancel
  const handleClosePopup = () => {
    setAcknowledgementPopup(false);
    setPendingFormData(null);
  };
  const isValidURL = (string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // optional http or https
      "((([a-zA-Z0-9\\-])+\\.)+[a-zA-Z]{2,})" + // domain
      "(\\:[0-9]{1,5})?" + // optional port
      "(\\/.*)?$", // optional path
      "i"
    );
    return !!pattern.test(string);
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

  //
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
  const [signatories, setSignatories] = useState([
    {
      first_name: "",
      last_name: "",
      email: "",
      confirm_email: "",
      linked_in: "",
      phone: "",
      signature_role: "",
      other_role: "",
    },
  ]);
  const addSignatory = () => {
    // Check if already added maximum signatories
    if (signatories.length >= 3) {
      seterrr(true);
      setdangerMessage("You can only add up to three signatories total.");
      setTimeout(() => {
        setdangerMessage("");
        seterrr(false);
      }, 3000);
      return;
    }

    // Validate existing emails are unique
    const emails = signatories.map((s) => s.signatory_email).filter(Boolean);
    const uniqueEmails = new Set(emails);

    if (emails.length !== uniqueEmails.size) {
      seterrr(true);
      setdangerMessage(
        "Please make sure all existing emails are unique before adding a new signatory."
      );
      setTimeout(() => {
        setdangerMessage("");
        seterrr(false);
      }, 3000);
      return;
    }

    // Add new signatory
    const newSignatory = {
      first_name: "",
      last_name: "",
      signatory_email: "",
      signatory_confirm_email: "",
      linked_in: "",
      phone: "",
      signature_role: "",
      other_role: "",
      isCurrentUser: false,
    };

    setSignatories([...signatories, newSignatory]);
    setSignatoryErrors([...signatoryErrors, { emailMatch: "" }]);
  };

  const handlePhoneChangeSignature = (index, value) => {
    const updatedSignatories = [...signatories];
    updatedSignatories[index].phone = value;
    setSignatories(updatedSignatories);

    // Validate phone number (minimum 10 digits)
    const updatedErrors = [...signatoryErrors];
    const digitCount = value ? value.replace(/\D/g, "").length : 0;

    if (digitCount < 10) {
      updatedErrors[index] = {
        ...updatedErrors[index],
        phone: "Phone number must be at least 10 digits",
      };
    } else {
      if (updatedErrors[index]) {
        delete updatedErrors[index].phone;
      }
    }

    setSignatoryErrors(updatedErrors);
  };

  // Remove a signatory
  const removeSignatory = (index) => {
    const newSignatories = signatories.filter((_, i) => i !== index);
    setSignatories(newSignatories);
  };
  const [signatoryErrors, setSignatoryErrors] = useState(
    signatories.map(() => ({ emailMatch: "" }))
  );
  const handleChangeSignature = (index, e) => {
    const { name, value } = e.target;
    const updatedSignatories = [...signatories];
    updatedSignatories[index][name] = value;

    const errorsCopy = [...signatoryErrors];

    // Initialize error object if undefined
    if (!errorsCopy[index]) {
      errorsCopy[index] = {};
    }

    // Validate email and confirm email match
    if (name === "signatory_email" || name === "signatory_confirm_email") {
      const email = updatedSignatories[index].signatory_email;
      const confirm = updatedSignatories[index].signatory_confirm_email;

      if (email && confirm && email !== confirm) {
        errorsCopy[index].emailMatch = "Emails do not match!";
      } else {
        errorsCopy[index].emailMatch = "";
      }
    }

    // Validate unique email across all signatories (only for non-current users)
    if (
      name === "signatory_email" &&
      !updatedSignatories[index].isCurrentUser
    ) {
      const allEmails = updatedSignatories.map((s, idx) => ({
        email: s.signatory_email,
        index: idx,
      }));

      const duplicates = allEmails.filter(
        (item, idx) =>
          item.email &&
          allEmails.findIndex((e) => e.email === item.email) !== idx
      );

      if (duplicates.length > 0) {
        errorsCopy[index].emailMatch = "Email must be unique!";
      } else if (
        updatedSignatories[index].signatory_email ===
        updatedSignatories[index].signatory_confirm_email
      ) {
        errorsCopy[index].emailMatch = "";
      }
    }

    // Clear other_role if signature_role is not "Other"
    if (name === "signature_role" && value !== "Other") {
      updatedSignatories[index].other_role = "";
    }

    setSignatories(updatedSignatories);
    setSignatoryErrors(errorsCopy);
  };
  const [formallyLegally, setFormallyLegally] = useState("");
  useEffect(() => {
    if (formallyLegally === "Yes") {
      // Only add if signatories array is empty or doesn't have current user
      const hasCurrentUser = signatories.some((s) => s.isCurrentUser);

      if (!hasCurrentUser) {
        const currentUserSignatory = {
          first_name: OwnerData.first_name || "",
          last_name: OwnerData.last_name || "",
          signatory_email: OwnerData.email || "",
          signatory_confirm_email: OwnerData.email || "",
          linked_in: "",
          phone: OwnerData.phone_number || "",
          signature_role:
            "Founder and Chief Executive Officer (CEO) – Visionary and strategic leader",
          other_role: "",
          isCurrentUser: true,
        };

        setSignatories([currentUserSignatory]);
        setSignatoryErrors([{ emailMatch: "" }]);
      }
    } else if (formallyLegally === "No") {
      // Reset to empty when "No" is selected
      setSignatories([
        {
          first_name: "",
          last_name: "",
          signatory_email: "",
          signatory_confirm_email: "",
          linked_in: "",
          phone: "",
          signature_role: "",
          other_role: "",
          isCurrentUser: false,
        },
      ]);
      setSignatoryErrors([{ emailMatch: "" }]);
    }
  }, [formallyLegally, OwnerData]);
  //

  const [formErrors, setFormErrors] = useState({
    emailMatch: "",
  });
  const [States, setStates] = useState([]);
  const [selectedCountryStep2, setselectedCountryStep2] = useState(null);
  const [step2Countrycode, setstep2Countrycode] = useState("");
  const [state_codes, setstate_codes] = useState("");
  const [step2required, setstep2required] = useState(true);
  const [allcountry, setallcountry] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [Cities, setCities] = useState([]);
  const countryOptionsFormatted = allcountry.map((country) => ({
    value: country.code,
    label: country.name,
  }));
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate email matching on the fly
    if (name === "email" || name === "confirm_email") {
      if (
        (name === "email" && value !== formData.confirm_email) ||
        (name === "confirm_email" && value !== formData.email)
      ) {
        setFormErrors((prev) => ({
          ...prev,
          emailMatch: "Emails do not match.",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, emailMatch: "" }));
      }
    }
  };
  const handleStep2getstate = (event) => {
    const countryCode = event.target.value; // Get the selected country code from the event
    setCities([]);
    const countryName = event.target.options[event.target.selectedIndex].text;

    if (countryName === "Aruba" || countryName === "American Samoa") {
      setstep2required(false);
    } else {
      setstep2required(true);
    }
    setstep2Countrycode(countryCode);
    setselectedCountryStep2(countryName);
    setFormData((prev) => ({
      ...prev,
      company_country: event.target.value, // Store the value (e.g., "US")
    }));
    // Assuming you have a method to fetch states based on country code
    const indiaStates = State.getStatesOfCountry(countryCode);
    setStates(indiaStates);
  };
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);

    const stateCode = e.target.value;

    // Get cities of that state
    const cities = City.getCitiesOfState(formData.company_country, stateCode);
    const selectedStateObj = States.find(
      (state) => state.isoCode === stateCode
    );
    setstate_codes(stateCode);
    // Get the state name if found
    const stateName = selectedStateObj ? selectedStateObj.name : "";
    setFormData((prev) => ({
      ...prev,

      company_state: stateName, // State name
    }));
    if (cities.length === 0) {
      setstep2required(false);
    } else {
      setstep2required(true);
    }
    setCities(cities);
  };
  const handleStep2getcity = async (event) => {
    const city = event.target.value;
    const state = formData.company_state; // from your state selection
    const country = formData.company_country; // from your country selection
    const countryCode = formData.company_country;

    const cityList = City.getCitiesOfState(countryCode, city);
    console.log(cityList);
    // Update form data with selected city
    setFormData((prev) => ({
      ...prev,
      city_step2: city,
    }));

    // Get postal code from Google API
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
  //Step button
  const handleNextbtn1 = () => {
    if (formData.company_website !== "") {
      if (!isValidURL(formData.company_website)) {
        companyWebsiteRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        seterrorUrl(true);
        return;
      } else {
        seterrorUrl(false);
      }
    }
    setformStep2(true);
    setformStep1(false);
  };
  const handleNextbtn2 = (e) => {
    e.preventDefault(); // prevent default form submission

    // Copy of the current errors array
    const errorsCopy = [...signatoryErrors];
    let hasErrors = false;

    signatories.forEach((sign, index) => {
      if (!errorsCopy[index]) errorsCopy[index] = {};

      const email = sign.signatory_email;
      const confirm = sign.signatory_confirm_email;

      // ✅ Email match validation
      if (email && confirm && email !== confirm) {
        errorsCopy[index].emailMatch = "Emails do not match!";
        hasErrors = true;
      } else {
        errorsCopy[index].emailMatch = "";
      }

      // ✅ Duplicate email check
      if (!sign.isCurrentUser) {
        const allEmails = signatories.map((s) => s.signatory_email);
        const duplicates = allEmails.filter((e) => e && e === email);
        if (duplicates.length > 1) {
          errorsCopy[index].emailMatch = "Email must be unique!";
          hasErrors = true;
        }
      }

      // ✅ Phone number validation (min 10 digits)
      const phone = sign.phone || "";
      const digitCount = phone.replace(/\D/g, "").length;

      if (digitCount < 10) {
        errorsCopy[index].phone = "Phone number must be at least 10 digits";
        hasErrors = true;
      } else {
        errorsCopy[index].phone = "";
      }
    });

    // Update the errors state so inline errors show
    setSignatoryErrors(errorsCopy);

    // Stop the step transition if there are any errors
    if (hasErrors) {
      return;
    }

    // Proceed to next step if no errors
    setformStep2(false);
    setformStep3(true);
  };

  const handlePreStep1 = () => {
    setformStep2(false);
    setformStep1(true);
  };
  const handlePreStep2 = () => {
    setformStep3(false);
    setformStep2(true);
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <Wrapper>
        <div className="fullpage d-block">
          <div className="d-flex align-items-start gap-0">
            <ModuleSideNav
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <div
              className={`global_view ${isCollapsed ? "global_view_col" : ""}`}
            >
              <TopBar />
              <SectionWrapper className="d-block p-md-4 p-3">
                <div className="container-fluid">
                  {dangerMessage && (
                    <div
                      className={`${errr ? " mt-3 error_pop" : "success_pop mt-3"
                        }`}
                    >
                      {dangerMessage}
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

                    <div className="profile-content">
                      <div className="row g-3">
                        {/* First Name */}
                        <div className="col-12 m-0 p-0">
                          {formStep1 && (
                            <form
                              onSubmit={handleNextbtn1}
                              method="post"
                              action="javascript:void(0)"
                            >
                              <div className="row g-3">
                                {/* Company Name */}
                                <div className="col-md-6">
                                  <label
                                    htmlFor="company_name"
                                    className="label_fontWeight"
                                  >
                                    Name of Company{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    value={formData.company_name}
                                    required
                                    type="text"
                                    name="company_name"
                                    id="company_name"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter company name"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label
                                    htmlFor="company_name"
                                    className="label_fontWeight"
                                  >
                                    Company Email{" "}
                                    <span className="required">*</span>
                                  </label>
                                  <input
                                    value={formData.company_email}
                                    required
                                    type="text"
                                    name="company_email"
                                    id="company_email"
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter company email"
                                  />
                                </div>

                                {/* Industry */}
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
                                    <option value="">Industry</option>
                                    {IndustryExpertise.map((industry, index) => (
                                      <option key={index} value={industry.value || industry.name}>
                                        {industry.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Phone */}
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

                                {/* Company Website */}
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

                                {/* Number of Employees */}
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
                                    defaultValue={formData.employee_number}
                                    name="employee_number"
                                    id="employee_number"
                                    className="form-select"
                                  >
                                    <option value="">
                                      Select employee count range
                                    </option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">
                                      11-50 employees
                                    </option>
                                    <option value="51-200">
                                      51-200 employees
                                    </option>
                                    <option value="201-500">
                                      201-500 employees
                                    </option>
                                    <option value="501-1000">
                                      501-1000 employees
                                    </option>
                                    <option value="1000+">
                                      1000+ employees
                                    </option>
                                  </select>
                                </div>

                                {/* Year of Registration */}

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

                                {/* Description */}
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

                                {/* Next Button */}
                              </div>

                              <div className="col-12">
                                <div className="d-flex justify-content-between mt-2">
                                  <div className="flex-shrink-0"></div>
                                  <div className="d-flex flex-row flex-shrink-0 gap-2">
                                    <button
                                      type="submit"
                                      className="global_btn px-4 py-2 fn_size_sm active d-flex align-items-center gap-2"
                                    >
                                      Next
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          )}
                        </div>
                        <div className="col-12 m-0 p-0">
                          {formStep2 && (
                            <>
                              <form
                                onSubmit={handleNextbtn2}
                                method="post"
                                action="javascript:void(0)"
                              >
                                <div className="row g-3">
                                  <div className="d-flex flex-column gap-3 my-4">
                                    <div className="d-flex justify-content-between gap-2 pt-3 align-items-start">
                                      <div className="flex-grow-1 d-flex flex-column gap-2">
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
                                        <h4>Signatories for the Company</h4>
                                        <p
                                          className="text-muted mb-0"
                                          style={{
                                            fontSize: "14px",
                                            lineHeight: "1.4",
                                          }}
                                        >
                                          Signatories are the only users on the
                                          platform with the legal authority to
                                          bind the company to contracts and
                                          agreements. They have exclusive access
                                          to create, edit, delete, and confirm
                                          capital raise rounds, maintaining full
                                          control over the company's fundraising
                                          activities. These permissions are not
                                          available to any other users.
                                        </p>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={addSignatory}
                                        className="global_btn w-fit"
                                        style={{ flexShrink: 0 }}
                                      >
                                        + Add A New Signatory
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6 mb-4 ">
                                  <label
                                    htmlFor="formally_legally"
                                    className="label_fontWeight pb-2"
                                  >
                                    Can you formally/legally initiate a new
                                    round of investment on behalf of this
                                    company? <span className="required">*</span>
                                  </label>
                                  <RadioGroup id="companyStage">
                                    <RadioOption>
                                      <input
                                        type="radio"
                                        name="formally_legally"
                                        required
                                        value="Yes"
                                        onChange={(e) =>
                                          setFormallyLegally(e.target.value)
                                        }
                                        id="concept"
                                        checked={formallyLegally === "Yes"}
                                      />
                                      <label htmlFor="concept">Yes</label>
                                    </RadioOption>
                                    <RadioOption>
                                      <input
                                        type="radio"
                                        name="formally_legally"
                                        value="No"
                                        onChange={(e) =>
                                          setFormallyLegally(e.target.value)
                                        }
                                        id="planning5"
                                        required
                                        checked={formallyLegally === "No"}
                                      />
                                      <label htmlFor="planning5">No</label>
                                    </RadioOption>
                                  </RadioGroup>

                                  {/* Show notification when "Yes" is selected */}
                                  {formallyLegally === "Yes" && (
                                    <div className="alert alert-info mt-2">
                                      <small>
                                        <strong>
                                          ✓ You have been automatically added as
                                          the primary signatory.
                                        </strong>
                                      </small>
                                    </div>
                                  )}
                                </div>

                                {signatories.map((signData, index) => (
                                  <div
                                    key={index}
                                    className="d-flex flex-column gap-4 mb-4"
                                  >
                                    {/* Show special header for current user */}
                                    {signData.isCurrentUser && (
                                      <div className="alert alert-success">
                                        <strong>Primary Signatory (You)</strong>{" "}
                                        - Auto-populated from your profile
                                      </div>
                                    )}

                                    <div
                                      className="row gy-3"
                                      style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                        padding: "20px",
                                        backgroundColor: signData.isCurrentUser
                                          ? "#f8f9fa"
                                          : "#fff",
                                      }}
                                    >
                                      {/* First Name */}
                                      <div className="col-md-6">
                                        <label className="label_fontWeight">
                                          First Name{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="first_name"
                                          value={signData.first_name}
                                          onChange={(e) =>
                                            handleChangeSignature(index, e)
                                          }
                                          placeholder="Enter first name"
                                          className="form-control"
                                          required
                                          disabled={signData.isCurrentUser}
                                        />
                                      </div>

                                      {/* Last Name */}
                                      <div className="col-md-6">
                                        <label className="label_fontWeight">
                                          Last Name{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          name="last_name"
                                          value={signData.last_name}
                                          onChange={(e) =>
                                            handleChangeSignature(index, e)
                                          }
                                          placeholder="Enter last name"
                                          className="form-control"
                                          required
                                          disabled={signData.isCurrentUser}
                                        />
                                      </div>

                                      {/* Email */}
                                      <div className="col-md-6">
                                        <label className="label_fontWeight">
                                          Email{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          type="email"
                                          name="signatory_email"
                                          value={signData.signatory_email}
                                          onChange={(e) =>
                                            handleChangeSignature(index, e)
                                          }
                                          placeholder="Enter email"
                                          className="form-control"
                                          required
                                          disabled={signData.isCurrentUser}
                                        />
                                      </div>

                                      {/* Confirm Email */}
                                      <div className="col-md-6">
                                        <label className="label_fontWeight">
                                          Confirm Email{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          type="email"
                                          name="signatory_confirm_email"
                                          value={
                                            signData.signatory_confirm_email
                                          }
                                          onChange={(e) =>
                                            handleChangeSignature(index, e)
                                          }
                                          placeholder="Confirm email"
                                          className="form-control"
                                          required
                                          disabled={signData.isCurrentUser}
                                        />
                                        {signatoryErrors[index]?.emailMatch && (
                                          <div
                                            className="text-danger text-start fw-semibold"
                                            style={{ fontSize: "13px" }}
                                          >
                                            {signatoryErrors[index].emailMatch}
                                          </div>
                                        )}
                                      </div>

                                      {/* LinkedIn */}
                                      <div className="col-md-6">
                                        <label className="label_fontWeight">
                                          LinkedIn Profile
                                        </label>
                                        <input
                                          type="text"
                                          name="linked_in"
                                          value={signData.linked_in}
                                          onChange={(e) =>
                                            handleChangeSignature(index, e)
                                          }
                                          placeholder="Enter LinkedIn profile URL"
                                          className="form-control"
                                        />
                                      </div>

                                      {/* Phone */}
                                      <div className="col-md-6">
                                        <label className="label_fontWeight">
                                          Phone Number{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <PhoneInput
                                          required
                                          name="signatory_phone"
                                          defaultCountry="CA"
                                          value={signData.phone}
                                          onChange={(value) =>
                                            handlePhoneChangeSignature(
                                              index,
                                              value
                                            )
                                          }
                                          className="phonregister form-control"
                                          placeholder="Enter phone number"
                                        />
                                        {signatoryErrors[index]?.phone && (
                                          <div
                                            className="text-danger text-start fw-semibold"
                                            style={{ fontSize: "13px" }}
                                          >
                                            {signatoryErrors[index].phone}
                                          </div>
                                        )}
                                      </div>

                                      {/* Role */}
                                      <div className="col-md-12">
                                        <label className="label_fontWeight">
                                          Role{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <select
                                          name="signature_role"
                                          value={signData.signature_role}
                                          onChange={(e) =>
                                            handleChangeSignature(index, e)
                                          }
                                          className="form-select"
                                          required
                                        >
                                          <option value="">Choose Role</option>
                                          <option value="Founder and Chief Executive Officer (CEO) – Visionary and strategic leader">
                                            Founder and Chief Executive Officer
                                            (CEO) – Visionary and strategic
                                            leader
                                          </option>
                                          <option value="Chief Operating Officer (COO) – Oversees daily operations">
                                            Chief Operating Officer (COO) –
                                            Oversees daily operations
                                          </option>
                                          <option value="Chief Financial Officer (CFO) – Manages finances and fundraising">
                                            Chief Financial Officer (CFO) –
                                            Manages finances and fundraising
                                          </option>
                                          <option value="Chief Investment Officer (CIO) – Manages engagements with investors and shareholders">
                                            Chief Investment Officer (CIO) –
                                            Manages engagements with investors
                                            and shareholders
                                          </option>
                                          <option value="Chief Technology Officer (CTO) – Leads product and tech development">
                                            Chief Technology Officer (CTO) –
                                            Leads product and tech development
                                          </option>
                                          <option value="Chief Marketing Officer (CMO) – Drives brand and customer acquisition">
                                            Chief Marketing Officer (CMO) –
                                            Drives brand and customer
                                            acquisition
                                          </option>
                                          <option value="Chief Product Officer (CPO) – Owns product strategy and roadmap">
                                            Chief Product Officer (CPO) – Owns
                                            product strategy and roadmap
                                          </option>
                                          <option value="Chief Revenue Officer (CRO) – Focuses on sales and revenue growth">
                                            Chief Revenue Officer (CRO) –
                                            Focuses on sales and revenue growth
                                          </option>
                                          <option value="Chief People Officer (CPO) – Builds company culture and HR strategy">
                                            Chief People Officer (CPO) – Builds
                                            company culture and HR strategy
                                          </option>
                                          <option value="Legal Counsel – Advises on contracts, IP, and compliance">
                                            Legal Counsel – Advises on
                                            contracts, IP, and compliance
                                          </option>
                                          <option value="Advisory Board Member – Expert advisor guiding strategy, growth, and investor relations">
                                            Advisory Board Member – Expert
                                            advisor guiding strategy, growth,
                                            and investor relations
                                          </option>
                                          <option value="Other">Other</option>
                                        </select>
                                      </div>

                                      {/* Other Role */}
                                      {signData.signature_role === "Other" && (
                                        <div className="col-md-12">
                                          <label className="label_fontWeight">
                                            Please specify role{" "}
                                            <span className="required">*</span>
                                          </label>
                                          <input
                                            type="text"
                                            name="other_role"
                                            value={signData.other_role}
                                            onChange={(e) =>
                                              handleChangeSignature(index, e)
                                            }
                                            placeholder="Enter specific role"
                                            className="form-control"
                                            required
                                          />
                                        </div>
                                      )}

                                      {/* Remove button - only show for additional signatories */}
                                      <div className="col-md-12 d-flex justify-content-end">
                                        {!signData.isCurrentUser &&
                                          signatories.length > 1 && (
                                            <button
                                              type="button"
                                              className="btn btn-danger"
                                              onClick={() =>
                                                removeSignatory(index)
                                              }
                                            >
                                              Remove Signatory
                                            </button>
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                <div className="col-12">
                                  <div className="d-flex justify-content-between mt-2">
                                    <div className="flex-shrink-0">
                                      <button
                                        type="button"
                                        className="global_btn_clear w-fit  px-4 py-2 fn_size_sm  active d-flex align-items-center gap-2"
                                        data-step="3"
                                        onClick={handlePreStep1}
                                      >
                                        Back
                                      </button>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <button
                                        type="submit"
                                        className="global_btn w-fit  px-4 py-2 fn_size_sm  active d-flex align-items-center gap-2"
                                        data-step="4"
                                      >
                                        Next
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </>
                          )}
                        </div>
                        <div className="col-12 m-0 p-0">
                          {formStep3 && (
                            <>
                              <form
                                onSubmit={handleSubmit}
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
                                        3/3
                                      </p>
                                      <label htmlFor="">
                                        <h4>Company Mailing Address</h4>
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="d-flex flex-column gap-2">
                                      <label
                                        htmlFor=""
                                        className="label_fontWeight"
                                      >
                                        Street{" "}
                                        <span className="required">*</span>
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
                                      <label
                                        htmlFor=""
                                        className="label_fontWeight"
                                      >
                                        Country{" "}
                                        <span className="required">*</span>
                                      </label>

                                      <select
                                        required
                                        value={formData.company_country}
                                        name="company_country"
                                        onChange={handleStep2getstate}
                                        placeholder="Select or type a country"
                                        className="form-select" // Add Bootstrap class or custom styling
                                      >
                                        <option value="">
                                          Select or type a country
                                        </option>
                                        {countryOptionsFormatted.map(
                                          (option) => (
                                            <option value={option.value}>
                                              {option.label}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-12">
                                    <div className="d-flex flex-column gap-2">
                                      <label
                                        htmlFor=""
                                        className="label_fontWeight"
                                      >
                                        State / Province / Territory / District{" "}
                                        {step2required && (
                                          <span className="required">*</span>
                                        )}
                                      </label>

                                      <select
                                        className="form-select"
                                        required={step2required ? true : false}
                                        name="company_state"
                                        value={selectedState}
                                        onChange={handleStateChange}
                                      >
                                        <option value="">
                                          -- Select State --
                                        </option>
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
                                      <label
                                        htmlFor=""
                                        className="label_fontWeight"
                                      >
                                        City{" "}
                                        {step2required && (
                                          <span className="required">*</span>
                                        )}
                                      </label>

                                      <select
                                        required={step2required ? true : false}
                                        name="city_step2"
                                        onChange={handleStep2getcity}
                                        placeholder="Select or type a city"
                                        className="form-select" // Add Bootstrap class or custom styling
                                      >
                                        <option value="">
                                          Select or type a city
                                        </option>

                                        {Cities.map((Citi) => (
                                          <option
                                            key={Citi.name}
                                            value={Citi.name}
                                          >
                                            {Citi.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="d-flex flex-column gap-2">
                                      <label
                                        htmlFor=""
                                        className="label_fontWeight"
                                      >
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
                                        className="global_btn_clear w-fit  px-4 py-2 fn_size_sm  active d-flex align-items-center gap-2"
                                        data-step="3"
                                        onClick={handlePreStep2}
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
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </Wrapper>
      {showCompanyAgreement && (
        <CompanyRegistrationPopup
          show={showCompanyAgreement}
          onClose={handleCloseCompanyAgreement}
          onAccept={handleAcceptCompanyAgreement}
          companyName=""
        />
      )}
      <SignatoryAcknowledgementPopup
        show={AcknowledgementPopup}
        onClose={handleClosePopup}
        onAccept={handleAcceptSignatory}
        companyName={formData.company_name}
      />
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
