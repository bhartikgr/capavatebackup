import React, { useState, useEffect } from "react";
import TopBar from "../../../components/Users/TopBar";
import ModuleSideNav from "../../../components/Users/ModuleSideNav";
import Alertpopup from "../../../components/Alertpopup";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/RegisterStyles";
import PreviousSection from "../../../components/Users/PreviousSection";

import { NumericFormat } from "react-number-format";
import axios from "axios";
import DangerAlertPopup from "../../../components/Admin/DangerAlertPopup";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config";
export default function Recordround() {
  const apiUrlRound = API_BASE_URL + "api/user/capitalround/";
  var apiURLInvestor = API_BASE_URL + "api/user/investor/";

  const [countrySymbolList, setCountrysymbollist] = useState([]);
  const [CurrencySymbol, setCurrencySymbol] = useState('');
  const [CurrDisplay, setCurrDisplay] = useState("CAD $");
  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [activeSection, setActiveSection] = useState("shareclass");
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const [messageAll, setmessageAll] = useState("");
  const [errr, seterrr] = useState(false);
  const userLogin = JSON.parse(storedUsername);
  const { id } = useParams();
  const [ClientIP, setClientIP] = useState("");
  const [CountryName, setCountryName] = useState("");
  const [records, setrecords] = useState([]);
  // Add this to your component state
  const navigate = useNavigate();
  const [errorMessageCenter, seterrorMessageCenter] = useState('')
  const [errors, setErrors] = useState({
    // convertibleTrigger: "",
    liquidationOther: "",
    nameOfRound: "",
    shareClassType: "",
    shareclassother: "",
    instrumentType: "",
    customInstrument: "",
    issuedshares: "",
    dateroundclosed: "",
    liquidation: [],
    convertible: "",
    convertibleType: "",
    voting: "",
    termsheetFile: "",
    subscriptiondocument: "",

    common_stock_valuation: "",
    preferred_valuation: "",
    valuationCap: "",
    discountRate: "",
    //safeType: "",
    interestRate: "",
    repaymentSchedule: "",
    hasWarrants_Bank: "",
    valuationCap_note: "",
    discountRate_note: "",
    maturityDate: "",
    interestRate_note: "",
    exercisedate_bank: "",

    pricePerShare: "",
    founders: "",
  });
  const [formData, setFormData] = useState({
    liquidationOther: "",
    liquidationpreferences: "",
    nameOfRound: "",
    shareClassType: "Common Shares",
    shareclassother: "",
    description: "",
    instrumentType: "",
    customInstrument: "",
    roundsize: "",
    currency: "CAD $",
    issuedshares: "",
    dateroundclosed: "",
    rights: "",
    liquidation: [],
    convertible: "",
    convertibleType: "",
    voting: "",
    termsheetFile: null,
    subscriptiondocument: null,
    generalnotes: "",

    // ❌ WRONG: Empty string evaluates to FALSE
    // hasWarrants_preferred: "",

    // ✅ CORRECT: Use boolean false
    hasWarrants_preferred: false,

    // ✅ Warrant fields with proper defaults
    warrant_coverage_percentage: "",
    warrant_exercise_type: "next_round_adjusted", // Default value
    warrant_adjustment_percent: "",
    warrant_adjustment_direction: "decrease", // Default value
    expirationDate_preferred: "",
    warrant_notes: "",

    // Other fields...
    preferred_valuation: "",
    valuationCap: "",
    discountRate: "",
    interestRate: "",
    repaymentSchedule: "",
    hasWarrants_Bank: false, // ✅ Boolean, not empty string
    valuationCap_note: "",
    discountRate_note: "",
    maturityDate: "",
    interestRate_note: "",
    customInstrument: "",
    roundStatus: "",
    pricePerShare: "",
    pre_money: "",
    post_money: "",
    optionPoolPercent: "",
    optionPoolPercent_post: "",
    existingShares: "",
    isPostEntered: false,
    investorPostMoney: "",
    isCalculationSource: false,
    lastUpdatedField: null,
  });


  const [isFirstRound, setIsFirstRound] = useState(false);
  const [founderCount, setFounderCount] = useState(1);
  const [foundersData, setFoundersData] = useState([{
    shares: '',
    shareType: 'common',
    voting: 'voting'
  }]);
  //Check Authorized Signature
  const apiURLSignature = API_BASE_URL + "api/user/";
  var apiURLAiFile = API_BASE_URL + "api/user/aifile/";
  const [existingSharesUse, setexistingSharesUse] = useState('0');
  useEffect(() => {
    // getAuthorizedSignature();
    getPreviousFundingRound();
    handleCheckPayemt();
    getexistingShares();

  }, []);
  const getexistingShares = async () => {
    try {
      const res = await axios.post(
        apiURLAiFile + "getexistingShares",
        { company_id: userLogin.companies[0].id },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const checkData = res.data.results;
      let pricePerShareFromDB = "0.01";
      let parsedFounderData = {};
      let foundersDataFromDB = [];
      let totalShares = 0;

      if (checkData.length > 0) {
        let rawFounderData = checkData[0].founder_data;

        // ✅ Handle both object & JSON string formats
        if (typeof rawFounderData === "object" && rawFounderData !== null) {
          parsedFounderData = rawFounderData;
        } else if (typeof rawFounderData === "string") {
          try {
            // Clean and safely parse the string
            if (rawFounderData.startsWith('"') && rawFounderData.endsWith('"')) {
              rawFounderData = rawFounderData.slice(1, -1);
              rawFounderData = rawFounderData.replace(/\\"/g, '"');
            }
            parsedFounderData = JSON.parse(rawFounderData);
          } catch (err) {
            console.error("❌ Error parsing founder_data JSON:", err);
          }
        }

        // ✅ Extract fields safely
        if (parsedFounderData.founders && Array.isArray(parsedFounderData.founders)) {
          foundersDataFromDB = parsedFounderData.founders;
        }

        if (parsedFounderData.pricePerShare) {
          pricePerShareFromDB = parsedFounderData.pricePerShare;
        }

        // ✅ Get total shares safely (supports both totalShares / totalshares)
        totalShares =
          parseFloat(parsedFounderData.totalShares) ||
          parseFloat(parsedFounderData.totalshares) ||
          0;

        setexistingSharesUse(totalShares);

        // ✅ Update formData state
        setFormData((prev) => ({
          ...prev,
          existingShares: totalShares,

        }));
      } else {
        console.warn("⚠️ No existing shares found for this company.");
      }
    } catch (err) {
      console.error("❌ Error fetching existing shares:", err);
    }
  };

  const [allowedRounds, setAllowedRounds] = useState(null); // null for loading state
  const [previousRounds, setPreviousRounds] = useState([]);

  const getPreviousFundingRound = async () => {
    try {
      console.log("🔄 Fetching allowed rounds...");

      const res = await axios.post(
        `${apiUrlRound}getPreviousFundingRound`,
        {
          company_id: userLogin.companies[0].id,
        }
      );



      if (res.data.success) {
        setPreviousRounds(res.data.results);
        setAllowedRounds(res.data.allowedRounds || []); // Ensure array

        console.log("✅ Allowed Rounds from API:", res.data.allowedRounds);
        console.log("📊 Allowed Count:", res.data.allowedRounds?.length || 0);

        // Show what's blocked
        if (res.data.allowedRounds) {
          const blockedRounds = [
            "Pre-Seed", "Seed", "Post-Seed",
            "Series A", "Series A Extension",
            "Series B", "Series B Extension",
            "Series C", "Series C Extension",
            "Series D", "Series D Extension"
          ].filter(round => !res.data.allowedRounds.includes(round));

          console.log("🚫 Blocked Rounds:", blockedRounds);
        }

        // Reset if current selection not allowed
        if (selected !== "default" && res.data.allowedRounds && !res.data.allowedRounds.includes(selected)) {
          console.log(`⚠️ Resetting selection: ${selected} is not allowed`);
          setSelected("default");
          handleInputChange("shareClassType", "");
        }
      } else {
        console.error("❌ API Error:", res.data.message);
        // Fallback to all rounds
        setAllowedRounds([
          "Pre-Seed", "Seed", "Post-Seed",
          "Series A", "Series A Extension",
          "Series B", "Series B Extension",
          "Series C", "Series C Extension",
          "Series D", "Series D Extension",
          "Bridge Round", "Advisor Shares", "OTHER"
        ]);
      }
    } catch (err) {
      console.error("❌ Network Error:", err);
      // Fallback to all rounds
      setAllowedRounds([
        "Pre-Seed", "Seed", "Post-Seed",
        "Series A", "Series A Extension",
        "Series B", "Series B Extension",
        "Series C", "Series C Extension",
        "Series D", "Series D Extension",
        "Bridge Round", "Advisor Shares", "OTHER"
      ]);
    }
  };

  // Helper function for frontend



  const getAuthorizedSignature = async () => {
    // Skip check for Owner
    if (userLogin.role === "owner") return;

    let formData = {
      company_id: userLogin.companies[0].id,
      user_id: userLogin.id,
    };

    try {
      const res = await axios.post(
        apiURLSignature + "getAuthorizedSignature",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const checkData = res.data.results;

      if (checkData.length > 0) {
        const checkSignature = checkData[0];
        if (checkSignature.approve === "No") {
          navigate("/record-round-list");
        }
      } else {
        navigate("/record-round-list");
      }
    } catch (err) {
      console.error("Error fetching authorized signature:", err);
    }
  };

  //Checkpayment
  const handleCheckPayemt = async () => {
    let formData = {
      company_id: userLogin.companies[0].id,
    };

    try {
      const res = await axios.post(
        apiURLAiFile + "checkSubscriptionInvestorReport",
        {
          company_id: userLogin.companies[0].id,
        }
      );

      const { subscriptionActive, updateAlreadySubmitted, lastUpdateDate } =
        res.data;

      if (!subscriptionActive) {
        // navigate("/record-round-list"); // Subscription expired
      } else if (updateAlreadySubmitted) {
      } else {
      }
    } catch (err) {
      console.error(err);
      seterrr(true);
    }
  };

  //Check Authorized Signature
  useEffect(() => {
    getrecords();
  }, []);

  const getrecords = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "getrecordRoundList",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setrecords(generateRes.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
    //  Optionally, call AI Summary API here
    //generateExecutiveSummary(formData);
  };
  useEffect(() => {
    document.title = id ? "Edit Record Round Page" : "Create Record Round Page";
  }, [id]);

  useEffect(() => {
    if (id) {
      getEditrecordlist();
    }
  }, []);
  const [Editrecords, setEditrecords] = useState("");
  const [RoundData, setRoundData] = useState('')
  const getEditrecordlist = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
      id: id,
    };
    try {
      const generateRes = await axios.post(
        apiUrlRound + "getEditrecordlist",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (generateRes.data.results.length > 0) {
        var getData = generateRes.data.results[0];
        setRoundData(getData);
        console.log(getData)
        if (getData.round_type === 'Round 0') {
          setIsFirstRound(true);


          // Auto-set Round 0 values if first round

          handleInputChange("nameOfRound", "");
          setSelected("Founder Shares (Family and Friends)");
          setFirstStepCompleted(true);

        } else {
          setIsFirstRound(false);
        }

        // Parse instrument_type_data JSON
        let instrumentData = {};
        if (getData.instrument_type_data && getData.instrument_type_data !== '') {
          try {
            let rawData = getData.instrument_type_data;
            if (typeof rawData === 'object' && rawData !== null) {
              instrumentData = rawData;
            } else if (typeof rawData === "string") {
              if (rawData.startsWith('"') && rawData.endsWith('"')) {
                rawData = rawData.slice(1, -1);
                rawData = rawData.replace(/\\"/g, '"');
              }
              instrumentData = JSON.parse(rawData);
            }
          } catch (err) {
            console.error("Error parsing instrument_type_data", err);
          }
        }

        // ✅ NEW: Parse founder_data for Round 0
        let parsedFounderData = {};
        let foundersDataFromDB = [];
        let pricePerShareFromDB = "0.01";

        if (getData.round_type === 'Round 0' && getData.founder_data) {
          try {
            let rawFounderData = getData.founder_data;

            // Handle different formats of founder_data
            if (typeof rawFounderData === 'object' && rawFounderData !== null) {
              parsedFounderData = rawFounderData;
            } else if (typeof rawFounderData === "string") {
              // Clean the string
              if (rawFounderData.startsWith('"') && rawFounderData.endsWith('"')) {
                rawFounderData = rawFounderData.slice(1, -1);
                rawFounderData = rawFounderData.replace(/\\"/g, '"');
              }
              parsedFounderData = JSON.parse(rawFounderData);
            }

            // Extract founders data for form fields
            if (parsedFounderData.founders && Array.isArray(parsedFounderData.founders)) {
              foundersDataFromDB = parsedFounderData.founders;
            }

            if (parsedFounderData.pricePerShare) {
              pricePerShareFromDB = parsedFounderData.pricePerShare;
            }



          } catch (err) {
            console.error("Error parsing founder_data", err);
            console.error("Raw founder_data:", getData.founder_data);
          }
        }

        const updatedFormData = {
          ...getData, // existing fields
          ...instrumentData, // merge parsed JSON

          // ✅ Set Round 0 specific fields
          ...(getData.round_type === 'Round 0' && {
            pricePerShare: pricePerShareFromDB,
            // Add other Round 0 specific fields if needed
          }),

          termsheetFile: Array.isArray(getData.termsheetFile)
            ? getData.termsheetFile.map((file) =>
              typeof file === "string" ? { name: file } : file
            )
            : getData.termsheetFile
              ? (() => {
                try {
                  const parsed = JSON.parse(getData.termsheetFile);
                  return (Array.isArray(parsed) ? parsed : [parsed]).map(
                    (file) => (typeof file === "string" ? { name: file } : file)
                  );
                } catch {
                  return [{ name: getData.termsheetFile }];
                }
              })()
              : [],

          subscriptiondocument: Array.isArray(getData.subscriptiondocument)
            ? getData.subscriptiondocument.map((file) =>
              typeof file === "string" ? { name: file } : file
            )
            : getData.subscriptiondocument
              ? (() => {
                try {
                  const parsed = JSON.parse(getData.subscriptiondocument);
                  return (Array.isArray(parsed) ? parsed : [parsed]).map(
                    (file) => (typeof file === "string" ? { name: file } : file)
                  );
                } catch {
                  return [{ name: getData.subscriptiondocument }];
                }
              })()
              : [],

          liquidation: (() => {
            if (!getData.liquidation) return [];
            if (Array.isArray(getData.liquidation)) {
              return getData.liquidation;
            } else if (typeof getData.liquidation === 'string') {
              return getData.liquidation.split(",").map((v) => v.trim()).filter(v => v !== '');
            } else {
              console.warn("Unexpected liquidation data type:", typeof getData.liquidation, getData.liquidation);
              return [];
            }
          })(),
        };


        setFormData(updatedFormData);

        // ✅ SET FOUNDERS DATA FOR ROUND 0

        if (getData.round_type === 'Round 0' && foundersDataFromDB.length > 0) {
          setFoundersData(foundersDataFromDB);
          setFounderCount(foundersDataFromDB.length);

        }

        setEditrecords(generateRes.data.results[0]);
        setSelected(getData.shareClassType);
      } else {
        navigate("/record-round-list");
      }
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'currency') {
      setCurrDisplay(value);
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const calculateFounderValue = (shares) => {
    const pricePerShare = parseFloat(formData.pricePerShare) || 0;
    return (shares * pricePerShare).toFixed(2);
  };
  const [selected, setSelected] = useState("default");
  const [otherText, setOtherText] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    const getIP = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        console.log(data)
        setClientIP(data.ip); // Save this to state
        setCountryName(data.country_name);
      } catch (error) {
        console.error("Failed to fetch IP", error);
      }
    };

    getIP();
  }, []);
  const handleSubmit = async () => {

    const formDataToSend = new FormData();
    formDataToSend.append("created_by_id", userLogin.id);
    formDataToSend.append("id", id || ""); // Fix: Handle empty id for new records
    formDataToSend.append("company_id", userLogin.companies[0].id);
    formDataToSend.append("created_by_role", userLogin.role);
    formDataToSend.append("country_name", CountryName);

    // Round 0 vs Round 1+ logic
    if (isFirstRound) {
      // ROUND 0 SPECIFIC DATA
      formDataToSend.append("round_type", "Round 0");
      formDataToSend.append("shareClassType", "Common Shares");
      formDataToSend.append("nameOfRound", formData.nameOfRound);
      formDataToSend.append("issuedshares", calculateTotalShares().toString());
      formDataToSend.append("roundStatus", "");
      formDataToSend.append("instrumentType", "");
      formDataToSend.append("roundsize", "");
      formDataToSend.append("currency", "CAD $");
      formDataToSend.append("dateroundclosed", formData.dateroundclosed); // Add current date for Round 0

      // Founder data for Round 0 - FIXED: Convert to proper JSON string
      const founderData = {
        founders: foundersData,
        totalShares: calculateTotalShares(),
        totalValue: calculateTotalValue(),
        pricePerShare: formData.pricePerShare || "0.01",
        ownershipBreakdown: calculateOwnershipPercentages()
      };
      formDataToSend.append("founder_data", JSON.stringify(founderData));
      formDataToSend.append("total_founder_shares", calculateTotalShares().toString());
      formDataToSend.append("founder_count", founderCount.toString());

    } else {
      // ROUND 1+ DATA
      formDataToSend.append("round_type", "Investment");
      if ((formData.instrumentType === 'Convertible Note' && (formData.shareClassType === "Pre-Seed" || formData.shareClassType === "Post-Seed")) || (formData.instrumentType === 'Safe' && (formData.shareClassType === 'Seed' || formData.shareClassType === "Pre-Seed" || formData.shareClassType === "Post-Seed"))) {
        formDataToSend.append("investorPostMoney", "");
      } else {
        formDataToSend.append("investorPostMoney", formData.investorPostMoney || "");
      }

      formDataToSend.append("shareClassType", selected || "");
      formDataToSend.append("nameOfRound", formData.nameOfRound || "");
      if (formData.instrumentType === 'Convertible Note' || formData.instrumentType === 'Safe') {
        formDataToSend.append("issuedshares", "");
        //formDataToSend.append("optionPoolPercent_post", formData.optionPoolPercent);
      } else {
        //formDataToSend.append("issuedshares", formData.issuedshares || "");
        formDataToSend.append("issuedshares", "");
      }

      if (formData.instrumentType === 'Safe') {
        formDataToSend.append("post_money", "");

      } else {
        formDataToSend.append("post_money", formData.post_money || "");

      }

      formDataToSend.append("roundStatus", formData.roundStatus || "");
      formDataToSend.append("instrumentType", formData.instrumentType || "");
      formDataToSend.append("roundsize", formData.roundsize || "");
      formDataToSend.append("currency", formData.currency || "");
      formDataToSend.append("pre_money", formData.pre_money || "");

      let optionPoolPostValue = "";

      if (formData.instrumentType === "Convertible Note" || formData.instrumentType === "Safe") {
        optionPoolPostValue = formData.optionPoolPercent || "";
      } else if (formData.instrumentType === "Preferred Equity") {
        optionPoolPostValue = formData.optionPoolPercent_post || "";
      } else {
        optionPoolPostValue = formData.optionPoolPercent_post || "";
      }

      formDataToSend.append("optionPoolPercent_post", optionPoolPostValue);
      formDataToSend.append("optionPoolPercent", formData.optionPoolPercent || "");

    }

    // COMMON FIELDS FOR BOTH ROUNDS - FIXED: Handle null/undefined values
    formDataToSend.append("description", formData.description || "");
    formDataToSend.append("liquidationOther", formData.liquidationOther || "");
    formDataToSend.append("liquidationpreferences", formData.liquidationpreferences || "");
    formDataToSend.append("shareclassother", formData.shareclassother || "");
    formDataToSend.append("customInstrument", formData.customInstrument || "");
    formDataToSend.append("rights", formData.rights || "");

    // FIXED: Convert array to string for liquidation field
    formDataToSend.append("liquidation", Array.isArray(formData.liquidation) ? formData.liquidation.join(",") : "");

    formDataToSend.append("convertible", formData.convertible || "");
    formDataToSend.append("convertibleType", formData.convertibleType || "");
    formDataToSend.append("voting", formData.voting || "");
    formDataToSend.append("dateroundclosed", formData.dateroundclosed || "");
    formDataToSend.append("generalnotes", formData.generalnotes || "");
    formDataToSend.append("ip_address", ClientIP || "");
    formDataToSend.append("ClientIP", ClientIP || ""); // Add both for compatibility

    // File uploads - FIXED: Handle empty arrays
    if (formData.termsheetFile && formData.termsheetFile.length > 0) {
      formData.termsheetFile.forEach((file) => {
        formDataToSend.append("termsheetFile", file);
      });
    } else {
      formDataToSend.append("termsheetFile", ""); // Send empty string if no files
    }

    if (formData.subscriptiondocument && formData.subscriptiondocument.length > 0) {
      formData.subscriptiondocument.forEach((file) => {
        formDataToSend.append("subscriptiondocument", file);
      });
    } else {
      formDataToSend.append("subscriptiondocument", ""); // Send empty string if no files
    }

    // Instrument data (mostly for Round 1+)
    let instrumentData = {};
    if (!isFirstRound && formData.instrumentType) {
      switch (formData.instrumentType) {
        case "Common Stock":
          // instrumentData = {
          //   common_stock_valuation: formData.common_stock_valuation || "",
          //   hasWarrants: formData.hasWarrants || false,
          //   ...(formData.hasWarrants && {
          //     exercisePrice: formData.exercisePrice || "",
          //     expirationDate: formData.expirationDate || "",
          //     warrantRatio: formData.warrantRatio || "",
          //     warrantType: formData.warrantType || "CALL",
          //   }),
          // };
          instrumentData = {};
          break;

        case "Preferred Equity":
          instrumentData = {
            preferred_valuation: formData.preferred_valuation || "",

            // ✅ WARRANT DATA (will be saved separately)
            hasWarrants_preferred: formData.hasWarrants_preferred || false,
            ...(formData.hasWarrants_preferred && {
              warrant_coverage_percentage: formData.warrant_coverage_percentage || "",
              warrant_exercise_type: formData.warrant_exercise_type || "next_round_adjusted",
              warrant_adjustment_direction: formData.warrant_adjustment_direction || "decrease",
              warrant_adjustment_percent: formData.warrant_adjustment_percent || "",
              expirationDate_preferred: formData.expirationDate_preferred || "",
              warrant_notes: formData.warrant_notes || "",
              warrant_status: 'pending' || ""
            })
          };
          break;

        case "Safe":
          instrumentData = {
            valuationCap: formData.valuationCap || "",
            discountRate: formData.discountRate || "",
            // safeType: formData.safeType || "PRE_MONEY",
          };
          break;

        case "Venture/Bank DEBT":
          instrumentData = {
            interestRate: formData.interestRate || "",
            repaymentSchedule: formData.repaymentSchedule || "",
            hasWarrants_Bank: formData.hasWarrants_Bank || false,
            ...(formData.hasWarrants_Bank && {
              exercisePrice_bank: formData.exercisePrice_bank || "",
              exercisedate_bank: formData.exercisedate_bank || "",
              warrantRatio_bank: formData.warrantRatio_bank || "",
              warrantType_bank: formData.warrantType_bank || "CALL",
            }),
          };
          break;

        case "Convertible Note":
          instrumentData = {
            valuationCap_note: formData.valuationCap_note || "",
            discountRate_note: formData.discountRate_note || "",
            maturityDate: formData.maturityDate || "",
            interestRate_note: formData.interestRate_note || "",
            //  convertibleTrigger: formData.convertibleTrigger || "",
          };
          break;

        default:
          instrumentData = {};
      }
    }

    // FIXED: Always send instrument_type_data, even if empty
    formDataToSend.append("instrument_type_data", JSON.stringify(instrumentData));

    try {
      const res = await axios.post(
        apiUrlRound + "CreateOrUpdateCapitalRound",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const createdRoundId = res.data.id;
      if (!isFirstRound &&
        formData.instrumentType === "Preferred Equity" &&
        formData.hasWarrants_preferred &&
        createdRoundId) {

        const warrantData = {
          roundrecord_id: createdRoundId,
          company_id: userLogin.companies[0].id,
          investor_id: 0, // Will be updated when investor confirms
          warrant_coverage_percentage: parseFloat(formData.warrant_coverage_percentage) || 0,
          warrant_exercise_type: formData.warrant_exercise_type || "next_round_adjusted",
          warrant_adjustment_percent: parseFloat(formData.warrant_adjustment_percent) || 0,
          warrant_adjustment_direction: formData.warrant_adjustment_direction || "decrease",
          calculated_exercise_price: null, // Calculated when exercised
          calculated_warrant_shares: null, // Calculated when exercised
          warrant_coverage_amount: null, // Calculated when exercised
          warrant_status: "pending",
          issued_date: formData.dateroundclosed || new Date().toISOString().split('T')[0],
          expiration_date: formData.expirationDate_preferred || null,
          notes: formData.warrant_notes || null
        };

        // Save warrant to warrants table
        if (!id) {


          await axios.post(
            apiUrlRound + "createWarrant",
            warrantData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          const warrantDataUpdate = {
            roundrecord_id: id,
            company_id: userLogin.companies[0].id,
            investor_id: 0, // Will be updated when investor confirms
            warrant_coverage_percentage: parseFloat(formData.warrant_coverage_percentage) || 0,
            warrant_exercise_type: formData.warrant_exercise_type || "next_round_adjusted",
            warrant_adjustment_percent: parseFloat(formData.warrant_adjustment_percent) || 0,
            warrant_adjustment_direction: formData.warrant_adjustment_direction || "decrease",
            calculated_exercise_price: null, // Calculated when exercised
            calculated_warrant_shares: null, // Calculated when exercised
            warrant_coverage_amount: null, // Calculated when exercised
            warrant_status: "pending",
            issued_date: formData.dateroundclosed || new Date().toISOString().split('T')[0],
            expiration_date: formData.expirationDate_preferred || null,
            notes: formData.warrant_notes || null
          };

          await axios.post(
            apiUrlRound + "warrantDataUpdate",
            warrantDataUpdate,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      }
      setIsLoading(false);
      seterrr(false);
      setmessageAll(res.data.message);
      setTimeout(() => {
        setmessageAll("");
        navigate("/record-round-list");
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      seterrr(true);
      setmessageAll(err.response?.data?.message || "Error creating round");
      setTimeout(() => {
        setmessageAll("");
      }, 5000);
      console.error("Error creating round:", err);
    }
  };

  // Share class options

  const [firstStepCompleted, setFirstStepCompleted] = useState(false);
  const handleOptionClick = (opt) => {
    // If editing (id exists), allow all options
    if (!id) {
      // First step: only Founder Shares selectable
      if (
        !firstStepCompleted &&
        opt !== "Founder Shares (Family and Friends)"
      ) {
        return;
      }

      // After first step is done
      if (
        !firstStepCompleted &&
        opt === "Founder Shares (Family and Friends)"
      ) {
        setFirstStepCompleted(true);
        handleInputChange("nameOfRound", "");
      }
    }

    // Set selection and update form data
    setSelected(opt);
    handleInputChange(
      "shareClassType",
      opt === "OTHER" ? formData.shareclassother : opt
    );
    if (opt !== "OTHER") handleInputChange("shareclassother", "");
  };

  const options = [
    //"Founder Shares (Family and Friends)",
    //"Employee Options Pool", // mandatory first selection
    "Advisor Shares",
    "Pre-Seed",
    "Seed",
    "Seed Extension / Seed+",
    "Series A",
    "Series A Extension",
    "Series B",
    "Series B Extension",
    "Series C",
    "Series C Extension",
    "Series D",
    "Bridge Round",
    "OTHER",
  ];

  // Form sections

  // Fixed navigation function
  const navigateToSection = (direction) => {
    const currentIndex = sections.findIndex((section) => section.id === activeSection);

    if (direction === 'next' && currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const getSections = (selectedOption, instrumentType) => {
    if (isFirstRound) {
      // ROUND 0 SECTIONS
      return [
        { id: "shareclass", title: "Founder Share Allocation" },
        { id: "description", title: "Description" },
        { id: "issuedshares", title: "Round 0 Summary" },
        { id: "rights", title: "Rights & Preferences" },
        { id: "notes", title: "Notes" },
      ];
    } else {
      // OTHER ROUNDS SECTIONS
      let sections = [
        { id: "shareclass", title: "Share Class" },
        { id: "instrument", title: "Investment Instrument" },
        { id: "roundsize", title: "Round Size" },
        { id: "issuedshares", title: "Round Active/Closed" },
        { id: "description", title: "Description" },
        { id: "rights", title: "Rights & Preferences" },
        // { id: "liquidation", title: "Liquidation Preference" }, // Isko conditionally add karenge
        // { id: "convertible", title: "Convertible?" },
        // { id: "voting", title: "Voting Rights" },
        { id: "termsheet", title: "Term Sheet" },
        { id: "subscription", title: "Subscription Document" },
        { id: "notes", title: "Notes" },
      ];

      // ✅ Sirf tabhi Liquidation Preference section add karein jab instrumentType "Preferred Equity" ho
      if (instrumentType === "Preferred Equity") {
        sections.splice(6, 0, { id: "liquidation", title: "Liquidation Preference" });
      }

      // Hide "Investment Instrument" if user selected "Seed"
      // if (selectedOption === "Seed") {
      //   sections = sections.filter((s) => s.id !== "instrument");
      // }

      return sections;
    }
  };


  const sections = getSections(formData.shareClassType, formData.instrumentType);

  // Fixed Progress bar calculation
  const totalSections = sections.length;
  const activeIndex = sections.findIndex((section) => section.id === activeSection);
  const progressWidth = totalSections > 0 ? Math.round(((activeIndex + 1) / totalSections) * 100) : 0;

  //Instrument
  const instrumentOptions = [
    {
      value: "Common Stock",
      label: "Common Stock",
      description:
        "Direct sale of common shares, often to founders or early employees.",
    },
    {
      value: "Preferred Equity",
      label: "Preferred Equity",
      description:
        "Equity with liquidity preference, often used in priced rounds with early-stage investors.",
    },
    {
      value: "Convertible Note",
      label: "Convertible Note",
      description:
        "Short-term debt that converts into equity at a future financing round.",
    },
    {
      value: "Safe",
      label: "Safe",
      description:
        "Simple Agreement for Future Equity - converts at the time of a priced round.",
    },
    {
      value: "Venture/Bank DEBT",
      label: "Venture/Bank DEBT",
      description:
        "Non-convertible financing structured as loans, typically repaid with interest.",
    },
    {
      value: "OTHER",
      label: "Other",
      description: "Custom investment instrument not listed above.",
    },
  ];

  const liquidationOptions = {
    multiplePreferences: [
      {
        value: "1",
        label: "1x Investor Multiple Preference",
        description: "1x multiple of the original investment returned before common shares participate.",
        group: "multiple"
      },
      {
        value: "2",
        label: "2x Investor Multiple Preference",
        description: "2x multiple of the original investment returned before common shares participate.",
        group: "multiple"
      },
      {
        value: "3",
        label: "3x Investor Multiple Preference",
        description: "3x multiple of the original investment returned before common shares participate.",
        group: "multiple"
      }
    ],
    participationRights: [
      {
        value: "Non-Participating",
        label: "Non-Participating",
        description: "Investor chooses either the liquidation preference or the stock value.",
        group: "participation"
      },
      {
        value: "Participating",
        label: "Participating",
        description: "Received liquidation preference and then participated pro-rata with common shareholders.",
        group: "participation"
      },
      {
        value: "Capped Participating",
        label: "Capped Participating",
        description: "Participation capped at a defined multiple (e.g. total return capped at 3x).",
        group: "participation"
      },
      {
        value: "Participating with Catch-up",
        label: "Participating with Catch-up",
        description: "Common gets paid first to a threshold, then preferred 'catches up' before full pro-rata sharing.",
        group: "participation"
      },
      {
        value: "Senior Debt",
        label: "Senior Debt",
        description: "A loan or obligation that takes repayment priority over other debts in the event of bankruptcy.",
        group: "participation"
      },
      {
        value: "Common Debt",
        label: "Common Debt",
        description: "A loan or obligation that takes secondary repayment priority over other senior debts in the event of bankruptcy.",
        group: "participation"
      }
    ],
    otherOptions: [
      {
        value: "N/A",
        label: "N/A",
        description: "Does not apply to this round.",
        group: "other"
      },
      {
        value: "OTHER",
        label: "Other",
        description: "Custom response entered by the company.",
        group: "other"
      }
    ]
  };

  //getallcountrySymbolList
  const [localeFormat, setLocaleFormat] = useState('en-US'); // Add this
  useEffect(() => {
    getallcountrySymbolList();
    getcountrySymbolLocal();
  }, []);
  const getallcountrySymbolList = async () => {
    let formData = {
      id: "",
    };
    try {
      const res = await axios.post(
        apiUrlRound + "getallcountrySymbolList",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
        }
      );

      var respo = res.data.results;

      setCountrysymbollist(respo);
    } catch (err) {
      // Enhanced error handling
    }
  };
  const [countryCode, setCountryCode] = useState('US'); // Add this state

  const getcountrySymbolLocal = async () => {
    try {
      const res = await axios.post(
        apiURLSignature + "getcountrySymbolLocal",
        { company_id: userLogin.companies[0].id },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const checkData = res.data.results;
      if (checkData.length > 0) {
        const code = checkData[0].country_code; // "IN"
        setCountryCode(code);

        // Find country data from dynamic list
        const countryData = countrySymbolList.find(
          country => country.code === code
        );


        if (countryData) {
          setCurrencySymbol(countryData.currency_symbol); // ₹ for India

          // Set locale dynamically based on country code
          const locale = getLocaleFromCountryCode(code);
          setLocaleFormat(locale);
        }
      }
    } catch (err) {
      console.error("❌ Error fetching existing shares:", err);
    }
  };
  const getLocaleFromCountryCode = (code) => {
    const localeMap = {
      'IN': 'en-IN',    // India - 10,00,000
      'US': 'en-US',    // USA - 1,000,000
      'GB': 'en-GB',    // UK - 1,000,000
      'CA': 'en-CA',    // Canada - 1,000,000
      'AU': 'en-AU',    // Australia - 1,000,000
      'DE': 'de-DE',    // Germany - 1.000.000
      'FR': 'fr-FR',    // France - 1 000 000
      'IT': 'it-IT',    // Italy - 1.000.000
      'ES': 'es-ES',    // Spain - 1.000.000
      'NL': 'nl-NL',    // Netherlands - 1.000.000
      'CN': 'zh-CN',    // China - 1,000,000
      'JP': 'ja-JP',    // Japan - 1,000,000
      'KR': 'ko-KR',    // Korea - 1,000,000
      'BR': 'pt-BR',    // Brazil - 1.000.000
      'MX': 'es-MX',    // Mexico - 1,000,000
      'AE': 'ar-AE',    // UAE - 1,000,000
      'SA': 'ar-SA',    // Saudi Arabia - 1,000,000
      'SG': 'en-SG',    // Singapore - 1,000,000
      'MY': 'ms-MY',    // Malaysia - 1,000,000
      'TH': 'th-TH',    // Thailand - 1,000,000
      'PH': 'en-PH',    // Philippines - 1,000,000
      'ID': 'id-ID',    // Indonesia - 1.000.000
      'VN': 'vi-VN',    // Vietnam - 1.000.000
      'PK': 'ur-PK',    // Pakistan - 1,000,000
      'BD': 'bn-BD',    // Bangladesh - 10,00,000
      'LK': 'si-LK',    // Sri Lanka - 1,000,000
      'NP': 'ne-NP',    // Nepal - 10,00,000
    };

    return localeMap[code] || 'en-US'; // Default
  };
  const [isLoading, setIsLoading] = useState(false);


  const handleReviewpage = () => {
    // Check if this is an edit operation
    const isEditOperation = id ? true : false; // If roundId exists, it's edit

    if (isEditOperation) {
      setsuccessMsg(
        "⚠️ WARNING: Editing this round will affect ALL subsequent rounds. " +
        "All following investment rounds will be recalculated based on new values. " +
        "Please review all information carefully before submitting."
      );
    } else {
      setsuccessMsg(
        "Please review all the information carefully before submitting. " +
        "Once submitted, it can be officially recorded."
      );
    }

    setIsReviewing(true); // show confirm button
  };

  const handleConfirm = async () => {
    setsuccessMsg("");
    setIsReviewing(false);
    setIsLoading(true);
    await handleSubmit(); // submit form once
  };
  // Utility function
  const shouldShowAlert = (dateStr) => {
    if (!dateStr || dateStr.trim() === "") return true; // empty → show

    const [monthStr, dayStr, yearStr] = dateStr.split("/");
    const month = parseInt(monthStr, 10) - 1; // JS months 0-11
    const day = parseInt(dayStr, 10);
    const year = parseInt(yearStr, 10);

    if (isNaN(month) || isNaN(day) || isNaN(year)) return true; // invalid → show

    const roundDate = new Date(year, month, day);
    const today = new Date();

    // Show if roundDate is in the future
    return roundDate > today;
  };

  //Check Round 0
  // Recordround.jsx - Add these states after existing states


  // Check if this is company's first round
  useEffect(() => {
    if (!id) {
      checkIfFirstRound();
    }
  }, []);

  const checkIfFirstRound = async () => {
    try {
      const formData = {
        company_id: userLogin.companies[0].id,
        id: id
      };

      const res = await axios.post(
        apiUrlRound + "checkExistingRounds",
        formData
      );

      const hasExistingRounds = res.data.roundCount;

      setIsFirstRound(!hasExistingRounds);

      // Auto-set Round 0 values if first round
      if (!hasExistingRounds) {
        handleInputChange("nameOfRound", "");
        setSelected("Founder Shares (Family and Friends)");
        setFirstStepCompleted(true);
      }

    } catch (err) {
      console.error("Error checking rounds:", err);
    }
  };
  // Add these functions after handleInputChange
  const updateFounderData = (index, field, value) => {
    setFoundersData(prev => {
      const updated = [...prev];
      if (!updated[index]) updated[index] = {};
      updated[index][field] = value;
      return updated;
    });
  };

  const addFounder = () => {
    setFoundersData(prev => [...prev, { shares: '', shareType: 'common', voting: 'voting' }]);
    setFounderCount(prev => prev + 1);
  };

  const removeFounder = (index) => {
    if (founderCount > 1) {
      setFoundersData(prev => prev.filter((_, i) => i !== index));
      setFounderCount(prev => prev - 1);
    }
  };

  // Calculation functions for Round 0
  const calculateTotalShares = () => {
    return foundersData.reduce((total, founder) => {
      return total + (parseInt(founder.shares) || 0);
    }, 0);
  };

  const calculateTotalValue = () => {
    const totalShares = calculateTotalShares();
    const pricePerShare = parseFloat(formData.pricePerShare) || 0;

    return (totalShares * pricePerShare).toLocaleString("en-US", {

      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };


  const calculateOwnershipPercentages = () => {
    const totalShares = calculateTotalShares();
    if (totalShares === 0) return [];

    return foundersData.map((founder, index) => {
      const shares = parseInt(founder.shares) || 0;
      const percentage = totalShares > 0 ? (shares / totalShares) * 100 : 0;
      return {
        founder: `Founder ${index + 1}`,
        percentage: percentage.toFixed(1)
      };
    });
  };



  //Round 1
  // ✅ CORRECTED SERIES A CALCULATION
  const [previousRoundOptionPool, setPreviousRoundOptionPool] = useState(0);

  const [calculatedValues, setCalculatedValues] = useState({
    sharePrice: '0.0000',
    newSharesIssued: 0,
    totalPostShares: 0,
    employeeOptionShares: 0,
    newOptionShares: 0,
    existingOptionPoolPercent: 0,
    postMoneyValuation: '0.00',
    investorOwnershipPercent: '0.00',
    doc4Action: 'NO_ACTION'
  });
  //Series A Safe Round
  const [seriesASafeData, setSeriesASafeData] = useState({
    // Previous round data (from API)
    previousTotalShares: 0.00,
    previousFounderShares: 0.00,
    previousEmployeeShares: 0.00,
    previousSeedInvestment: 0.00,
    previousValuationCap: 0.00,
    previousDiscountRate: 0.00,

    // Calculation results
    seriesASharePrice: 0,
    seedOptimalPrice: 0,
    seedConversionShares: 0,
    seedConversionValue: 0,
    seedMOIC: 0,
    seriesANewShares: 0,
    seriesANewValue: 0,
    seriesAMOIC: 0,
    totalNewShares: 0,
    totalExcludingOptions: 0,
    totalSharesAfterPool: 0,
    newOptionShares: 0,
    postMoneyValuationEquity: 0,

    // Ownership %
    foundersPostOwnership: 0,
    employeesPostOwnership: 0,
    seedInvestorsPostOwnership: 0,
    seriesAInvestorsPostOwnership: 0,
    previousIntrumentType: '',
    hasCalculated: true,
  });
  const calculateSeriesASafe = () => {
    if (seriesASafeData.isCalculating) return;
    const preMoney = parseFloat(formData.pre_money || 0);
    const investmentSize = parseFloat(formData.roundsize || 0);
    const optionPoolPost = parseFloat(formData.optionPoolPercent_post || 0); // Can be 0 to 100

    // Previous round data
    const previousTotalShares = seriesASafeData.previousTotalShares;
    const previousFounderShares = seriesASafeData.previousFounderShares;
    const previousEmployeeShares = seriesASafeData.previousEmployeeShares;
    const previousSeedInvestment = seriesASafeData.previousSeedInvestment;
    const previousValuationCap = seriesASafeData.previousValuationCap;
    const previousDiscountRate = seriesASafeData.previousDiscountRate;



    if (preMoney <= 0 || investmentSize <= 0 || previousTotalShares <= 0) {

      return;
    }

    // ✅ STEP 1: Series A share price
    const seriesASharePrice = preMoney / previousTotalShares;


    // ✅ STEP 2: Seed conversion prices
    const seedDiscountPrice = seriesASharePrice * (1 - (previousDiscountRate / 100));
    const seedCapPrice = previousValuationCap / previousTotalShares;


    // ✅ STEP 3: Optimal purchase price
    const seedOptimalPrice = Math.min(seedDiscountPrice, seedCapPrice);


    // ✅ STEP 4: SAFE Notes Conversion
    const seedConversionShares = previousSeedInvestment / seedOptimalPrice;
    const seedConversionValue = seedConversionShares * seriesASharePrice;
    const seedMOIC = seedConversionValue / previousSeedInvestment;


    // ✅ STEP 5: Series A Purchase
    const seriesANewShares = investmentSize / seriesASharePrice;
    const seriesANewValue = seriesANewShares * seriesASharePrice;


    // ✅ STEP 6: Total new shares from this round
    const totalNewShares = seedConversionShares + seriesANewShares;


    // ✅ STEP 7: Total shares EXCLUDING NEW option pool
    const totalExcludingOptions = previousFounderShares + totalNewShares;


    // ✅ STEP 8: **CRITICAL - Handle Option Pool logic**
    let totalSharesAfterPool;
    let newOptionShares;
    let employeesPostOwnership;

    if (optionPoolPost === 0) {
      // Case 1: No new option pool
      totalSharesAfterPool = totalExcludingOptions; // No dilution
      newOptionShares = 0;
      employeesPostOwnership = (previousEmployeeShares / totalSharesAfterPool) * 100;

    } else {
      // Case 2: With option pool
      // First calculate what the employee ownership % would be WITHOUT new options
      const employeesExistingPercent = (previousEmployeeShares / totalExcludingOptions) * 100;

      if (employeesExistingPercent >= optionPoolPost) {
        // Case 2a: Existing employee pool is already >= target, no new options needed
        totalSharesAfterPool = totalExcludingOptions;
        newOptionShares = 0;
        employeesPostOwnership = employeesExistingPercent;

      } else {
        // Case 2b: Need to create new options to reach target %
        totalSharesAfterPool = totalExcludingOptions / (1 - (optionPoolPost / 100));
        newOptionShares = totalSharesAfterPool - totalExcludingOptions - previousEmployeeShares;
        employeesPostOwnership = optionPoolPost;

      }
    }



    // ✅ STEP 9: Post-Money Valuation
    const postMoneyValuationEquity = totalSharesAfterPool * seriesASharePrice;


    // ✅ STEP 10: Ownership percentages
    const foundersPostOwnership = (previousFounderShares / totalSharesAfterPool) * 100;
    const seedInvestorsPostOwnership = (seedConversionShares / totalSharesAfterPool) * 100;
    const seriesAInvestorsPostOwnership = (seriesANewShares / totalSharesAfterPool) * 100;

    // For 0% case, employeesPostOwnership is already calculated above
    if (optionPoolPost > 0) {
      employeesPostOwnership = ((previousEmployeeShares + newOptionShares) / totalSharesAfterPool) * 100;
    }



    // ✅ STEP 11: Total shares issued in THIS round
    const totalSharesIssuedThisRound = seedConversionShares + seriesANewShares + newOptionShares;


    // ✅ STEP 12: Update state
    setSeriesASafeData({
      ...seriesASafeData,
      seriesASharePrice: seriesASharePrice.toFixed(4),
      seedOptimalPrice: seedOptimalPrice.toFixed(4),
      seedConversionShares: Math.round(seedConversionShares),
      seedConversionValue: Math.round(seedConversionValue),
      seedMOIC: seedMOIC.toFixed(2),
      seriesANewShares: Math.round(seriesANewShares),
      seriesANewValue: Math.round(seriesANewValue),
      seriesAMOIC: (seriesANewValue / investmentSize).toFixed(2),
      totalNewShares: Math.round(totalNewShares),
      totalExcludingOptions: Math.round(totalExcludingOptions),
      totalSharesAfterPool: Math.round(totalSharesAfterPool),
      newOptionShares: Math.round(newOptionShares),
      postMoneyValuationEquity: Math.round(postMoneyValuationEquity),
      foundersPostOwnership: foundersPostOwnership.toFixed(1),
      employeesPostOwnership: employeesPostOwnership.toFixed(1),
      seedInvestorsPostOwnership: seedInvestorsPostOwnership.toFixed(1),
      seriesAInvestorsPostOwnership: seriesAInvestorsPostOwnership.toFixed(1),
      hasCalculated: true,
    });

    // ✅ STEP 13: Update formData
    setFormData(prev => ({
      ...prev,
      issuedshares: Math.round(totalSharesIssuedThisRound).toString(),
      post_money: (preMoney + investmentSize).toFixed(2),
      investorPostMoney: seriesAInvestorsPostOwnership.toFixed(2)
    }));
    setTimeout(() => {
      setFormData(prev => ({ ...prev, isCalculationSource: false }));
    }, 100);
  };
  const [seriesConvertibleData, setSeriesConvertibleData] = useState({
    // Previous round data (from API)
    previousTotalShares: 0,
    previousFounderShares: 0,
    previousEmployeeShares: 0,
    previousRoundSize: 0,
    previousInterestRate: 0,
    previousValuationCap: 0,
    previousDiscountRate: 0,
    previousInstrumentType: "",
    previousemployeeSharesFromSeed: 0,
    // Calculated values
    principalPlusInterest: '0.00',
    seriesASharePrice: '0.0000',
    noteOptimalPrice: '0.0000',
    noteConversionShares: 0,
    noteConversionValue: 0,
    noteMOIC: '0.00',
    seriesANewShares: 0,
    seriesANewValue: 0,
    seriesAMOIC: '0.00',
    totalNewSharesBeforeOptions: 0,
    totalExcludingOptions: 0,
    totalSharesAfterPool: 0,
    newOptionShares: 0,
    postMoneyValuationEquity: 0,
    simplePostMoney: 0, // Add this
    foundersPostOwnership: '0.0',
    employeesPostOwnership: '0.0',
    noteInvestorsPostOwnership: '0.0',
    seriesAInvestorsPostOwnership: '0.0',


  });
  const calculateSeriesConvertible = () => {
    // ✅ Get input values from form
    console.log(seriesConvertibleData)
    const preMoney = parseFloat(formData.pre_money || 0); // $1,200,000
    const seriesAInvestment = parseFloat(formData.roundsize || 0); // $400,000
    const optionPoolPost = parseFloat(formData.optionPoolPercent_post || 0); // 20%

    // ✅ Use dynamic data
    const previousRoundSize = seriesConvertibleData.previousRoundSize || 0; // $120,000
    const previousValuationCap = seriesConvertibleData.previousValuationCap || 0; // $1,000,000
    const previousDiscountRate = seriesConvertibleData.previousDiscountRate || 0; // 20%
    const previousInterestRate = seriesConvertibleData.previousInterestRate || 0; // 10% (MISSING!)

    const previousTotalShares = seriesConvertibleData.previousTotalShares || 0; // 111,111
    const previousFounderShares = seriesConvertibleData.previousFounderShares || 0; // 100,000
    const previousEmployeeShares = seriesConvertibleData.previousEmployeeShares || 0; // 11,111 (BUT IT'S 0!)

    // FIX: Get employeeSharesFromSeed from API response
    const employeeSharesFromSeed = seriesConvertibleData.previousemployeeSharesFromSeed || 0; // From API response

    // Validation
    if (preMoney <= 0 || seriesAInvestment <= 0 || previousTotalShares <= 0) {
      return;
    }

    // ✅ STEP 1: Series A share price
    const seriesASharePrice = preMoney / previousTotalShares; // $10.80

    // ✅ STEP 2: Convertible Note conversion prices
    const noteDiscountPrice = seriesASharePrice * (1 - (previousDiscountRate / 100)); // $8.64
    const noteCapPrice = previousValuationCap / previousTotalShares; // $9.00
    const noteOptimalPrice = Math.min(noteDiscountPrice, noteCapPrice); // $8.64

    // ✅ STEP 3: Convertible Note Conversion (WITH INTEREST!)
    const years = 2; // From API
    const principalPlusInterest = previousRoundSize * Math.pow(1 + (previousInterestRate / 100), years); // $145,200
    const noteConversionShares = principalPlusInterest / noteOptimalPrice; // 16,806 shares

    // ✅ STEP 4: Note Conversion Value
    const noteConversionValue = noteConversionShares * seriesASharePrice; // $181,500

    // ✅ STEP 5: Note MOIC
    const noteMOIC = (noteConversionValue / previousRoundSize).toFixed(2); // 1.51X

    // ✅ STEP 6: Series A New Shares
    const seriesANewShares = seriesAInvestment / seriesASharePrice; // 37,037 shares
    const seriesANewValue = seriesANewShares * seriesASharePrice; // $400,000
    const seriesAMOIC = (seriesANewValue / seriesAInvestment).toFixed(2); // 1.00X

    // ✅ STEP 7: Total shares from conversions
    const totalConversionShares = noteConversionShares + seriesANewShares; // 53,843

    // ✅ STEP 8: Total excluding option shares (FOUNDERS + CONVERSIONS)
    const totalExcludingOptions = previousFounderShares + totalConversionShares; // 153,843

    // ✅ STEP 9: Calculate total shares after 20% option pool
    let totalSharesAfterPool;
    let newOptionShares = 0;

    if (optionPoolPost > 0) {
      // Formula: Total shares after pool = Total excluding options ÷ (1 - pool%)
      totalSharesAfterPool = totalExcludingOptions / (1 - (optionPoolPost / 100)); // 192,303

      // FIXED: Use employeeSharesFromSeed (11,111) not previousEmployeeShares (0)
      newOptionShares = totalSharesAfterPool - totalExcludingOptions - employeeSharesFromSeed; // 27,349
      newOptionShares = Math.max(0, newOptionShares);
    } else {
      totalSharesAfterPool = previousTotalShares + totalConversionShares;
    }

    // ✅ STEP 10: Total shares issued in THIS round
    const totalSharesIssuedThisRound = noteConversionShares + seriesANewShares + newOptionShares; // 81,192

    // ✅ STEP 11: Post-Money Valuation (Equity Value)
    const postMoneyValuationEquity = totalSharesAfterPool * seriesASharePrice; // $2,076,875

    // ✅ STEP 12: Simple Post-Money (without notes)
    const simplePostMoney = preMoney + seriesAInvestment; // $1,600,000

    // ✅ STEP 13: Ownership percentages
    const foundersPostOwnership = (previousFounderShares / totalSharesAfterPool) * 100; // 52.0%
    const noteInvestorsPostOwnership = (noteConversionShares / totalSharesAfterPool) * 100; // 8.7%
    const seriesAInvestorsPostOwnership = (seriesANewShares / totalSharesAfterPool) * 100; // 19.3%
    const employeesPostOwnership = ((employeeSharesFromSeed + newOptionShares) / totalSharesAfterPool) * 100; // 20.0%

    // ✅ STEP 14: Update state
    setSeriesConvertibleData(prev => ({
      ...prev,
      principalPlusInterest: principalPlusInterest.toFixed(2),
      seriesASharePrice: seriesASharePrice.toFixed(4),
      noteOptimalPrice: noteOptimalPrice.toFixed(4),
      noteConversionShares: Math.round(noteConversionShares),
      noteConversionValue: Math.round(noteConversionValue),
      noteMOIC: noteMOIC + "X",
      seriesANewShares: Math.round(seriesANewShares),
      seriesANewValue: Math.round(seriesANewValue),
      seriesAMOIC: seriesAMOIC + "X",
      totalNewSharesBeforeOptions: Math.round(totalConversionShares),
      totalExcludingOptions: Math.round(totalExcludingOptions),
      totalSharesAfterPool: Math.round(totalSharesAfterPool),
      newOptionShares: Math.round(newOptionShares),
      postMoneyValuationEquity: Math.round(postMoneyValuationEquity),
      simplePostMoney: Math.round(simplePostMoney),
      foundersPostOwnership: foundersPostOwnership.toFixed(1),
      employeesPostOwnership: employeesPostOwnership.toFixed(1),
      noteInvestorsPostOwnership: noteInvestorsPostOwnership.toFixed(1),
      seriesAInvestorsPostOwnership: seriesAInvestorsPostOwnership.toFixed(1)
    }));
    console.log(totalSharesIssuedThisRound);
    // ✅ STEP 15: Update formData
    setFormData(prev => ({
      ...prev,
      issuedshares: Math.round(totalSharesIssuedThisRound).toString(), // 81,192
      post_money: simplePostMoney.toFixed(2),
      sharePrice: seriesASharePrice.toFixed(4)
    }));
  };
  const calculationPreferredEquity = async () => {
    try {
      console.log("🔵 ==== PREFERRED EQUITY CALCULATION START =====");

      // ✅ STEP 1: Get form inputs
      const preMoney = parseFloat(formData.pre_money || 0); // $3,000,000
      const investment = parseFloat(formData.roundsize || 0); // $1,000,000
      const postMoneyPool = parseFloat(formData.optionPoolPercent_post || 0); // 20%

      // ✅ STEP 2: Get previous round data dynamically
      let previousRoundData = {
        totalShares: 0,
        founderShares: 0,
        employeeShares: 0,
        seedInvestment: 0,
        valuationCap: 0,
        discountRate: 0,
        interestRate: 0, // Default 10%
        instrumentType: ""
      };

      // Try to get from seriesASafeData first (for SAFE rounds)
      if (seriesASafeData.previousTotalShares > 0) {
        previousRoundData.totalShares = seriesASafeData.previousTotalShares;
        previousRoundData.founderShares = seriesASafeData.previousFounderShares;
        previousRoundData.employeeShares = seriesASafeData.previousEmployeeShares;
        previousRoundData.seedInvestment = seriesASafeData.previousSeedInvestment;
        previousRoundData.valuationCap = seriesASafeData.previousValuationCap;
        previousRoundData.discountRate = seriesASafeData.previousDiscountRate;
      }
      // Try to get from seriesConvertibleData (for Convertible Note rounds)
      else if (seriesConvertibleData.previousTotalShares > 0) {
        previousRoundData.totalShares = seriesConvertibleData.previousTotalShares;
        previousRoundData.founderShares = seriesConvertibleData.previousFounderShares;
        previousRoundData.employeeShares = seriesConvertibleData.previousEmployeeShares;
        previousRoundData.seedInvestment = seriesConvertibleData.previousRoundSize;
        previousRoundData.valuationCap = seriesConvertibleData.previousValuationCap;
        previousRoundData.discountRate = seriesConvertibleData.previousDiscountRate;
      }
      // Fallback: Fetch fresh data from API
      else {
        console.log("📡 Fetching fresh previous round data...");
        await fetchPreviousRoundData();

        // Use data from fetchPreviousRoundData result
        previousRoundData.totalShares = seriesASafeData.previousTotalShares || 0;
        previousRoundData.founderShares = seriesASafeData.previousFounderShares || 0;
        previousRoundData.employeeShares = seriesASafeData.previousEmployeeShares || 0;
        previousRoundData.seedInvestment = seriesASafeData.previousSeedInvestment || 0;
        previousRoundData.valuationCap = seriesASafeData.previousValuationCap || 0;
        previousRoundData.discountRate = seriesASafeData.previousDiscountRate || 0;
      }

      // ✅ STEP 3: VALIDATION
      if (preMoney <= 0 || investment <= 0 || previousRoundData.totalShares <= 0) {
        console.error("❌ Invalid input values for Preferred Equity calculation");
        console.log("Pre-Money:", preMoney);
        console.log("Investment:", investment);
        console.log("Previous Total Shares:", previousRoundData.totalShares);

        // Try one more time to fetch data
        try {
          const res = await axios.post(
            apiUrlRound + "getPreviousRoundForConvertible",
            {
              company_id: userLogin.companies[0].id,
              current_round_id: id || 0
            }
          );

          if (res.data.success && res.data.previousRoundData) {
            const data = res.data.previousRoundData;
            previousRoundData.totalShares = data.totalShares || 0;
            previousRoundData.founderShares = data.founderShares || 0;
            previousRoundData.employeeShares = data.employeeShares || 0;
            previousRoundData.seedInvestment = data.seedInvestment || 0;
            previousRoundData.valuationCap = data.valuationCap || 0;
            previousRoundData.discountRate = data.discountRate || 0;
          }
        } catch (fetchErr) {
          console.error("❌ Error fetching fresh data:", fetchErr);
        }

        // Final check
        if (previousRoundData.totalShares <= 0) {
          console.error("❌ Still no previous round data found");
          return;
        }
      }

      console.log(`📊 Previous Round Data:`);
      console.log(`   - Total Shares: ${previousRoundData.totalShares.toLocaleString()}`);
      console.log(`   - Founders: ${previousRoundData.founderShares.toLocaleString()}`);
      console.log(`   - Employee Pool: ${previousRoundData.employeeShares.toLocaleString()}`);
      console.log(`   - Previous Investment: $${previousRoundData.seedInvestment.toLocaleString()}`);

      // ✅ STEP 4: Calculate Share Price (CPAVATE Formula)
      const sharePrice = preMoney / previousRoundData.totalShares;
      console.log(`💰 Share Price: $${sharePrice.toFixed(4)} = $${preMoney} ÷ ${previousRoundData.totalShares}`);

      // ✅ STEP 5: Process Convertible Note Conversions (if applicable)
      let totalConvertedShares = 0;
      let totalConvertedValue = 0;

      // Check if there are convertible notes to convert (with valuation cap > 0)
      if (previousRoundData.seedInvestment > 0 && previousRoundData.valuationCap > 0) {
        console.log(`🔄 Processing convertible note conversion...`);

        const noteAmount = previousRoundData.seedInvestment;
        const interestRate = (previousRoundData.interestRate || 0) / 100;
        const discountRate = (previousRoundData.discountRate || 0) / 100;
        const valuationCap = previousRoundData.valuationCap;
        const years = 2; // Default as per CPAVATE

        // Calculate Principal + Interest
        const principalPlusInterest = noteAmount * Math.pow(1 + interestRate, years);

        // Calculate Conversion Price
        const discountPrice = sharePrice * (1 - discountRate);
        const capPrice = valuationCap > 0 ? valuationCap / previousRoundData.totalShares : Infinity;
        const conversionPrice = Math.min(discountPrice, capPrice);

        // Calculate Shares
        const convertedShares = conversionPrice > 0 ? Math.round(principalPlusInterest / conversionPrice) : 0;
        const convertedValue = convertedShares * sharePrice;

        console.log(`   Convertible Note Details:`);
        console.log(`      - Amount: $${noteAmount.toLocaleString()}`);
        console.log(`      - Principal+Interest: $${principalPlusInterest.toLocaleString()}`);
        console.log(`      - Conversion Price: $${conversionPrice.toFixed(4)}`);
        console.log(`      - Shares: ${convertedShares.toLocaleString()}`);

        totalConvertedShares = convertedShares;
        totalConvertedValue = convertedValue;
      }

      // ✅ STEP 6: Series A (Preferred Equity) Shares
      const seriesAShares = Math.round(investment / sharePrice);
      const seriesAValue = seriesAShares * sharePrice;

      console.log(`💰 Series A Shares: ${seriesAShares.toLocaleString()}`);
      console.log(`💰 Series A Value: $${Math.round(seriesAValue).toLocaleString()}`);

      // ✅ STEP 7: Total Shares before Option Pool Expansion
      const totalSharesBeforePool = previousRoundData.founderShares + totalConvertedShares + seriesAShares;
      console.log(`📊 Total Shares before pool: ${totalSharesBeforePool.toLocaleString()}`);

      // ✅ STEP 8: Option Pool Expansion
      let totalSharesAfterPool = totalSharesBeforePool;
      let newOptionShares = 0;

      if (postMoneyPool > 0) {
        // CPAVATE Formula
        totalSharesAfterPool = Math.round(totalSharesBeforePool / (1 - (postMoneyPool / 100)));

        // New option shares = Total after pool - Total before pool - Existing option shares
        newOptionShares = totalSharesAfterPool - totalSharesBeforePool - previousRoundData.employeeShares;

        if (newOptionShares < 0) newOptionShares = 0;

        console.log(`🎯 Option Pool Calculation:`);
        console.log(`   - Target: ${postMoneyPool}%`);
        console.log(`   - Existing: ${previousRoundData.employeeShares.toLocaleString()}`);
        console.log(`   - New: ${newOptionShares.toLocaleString()}`);
        console.log(`   - Total after pool: ${totalSharesAfterPool.toLocaleString()}`);
      }

      // ✅ STEP 9: Warrant Calculation (if applicable)
      let warrantShares = 0;
      let warrantExercisePrice = sharePrice;
      let warrantValue = 0;

      const warrantCoverage = parseFloat(formData.warrant_coverage_percentage || 0);
      const warrantAdjustment = parseFloat(formData.warrant_adjustment_percent || 0);
      const warrantDirection = formData.warrant_adjustment_direction || "decrease";

      if (warrantCoverage > 0) {
        // Calculate exercise price
        if (warrantDirection === "decrease") {
          warrantExercisePrice = sharePrice * (1 - (warrantAdjustment / 100));
        } else if (warrantDirection === "increase") {
          warrantExercisePrice = sharePrice * (1 + (warrantAdjustment / 100));
        }

        // Warrant shares = Series A new shares × Warrant Coverage %
        warrantShares = Math.round(seriesAShares * (warrantCoverage / 100));
        warrantValue = warrantShares * sharePrice;

        console.log(`📜 Warrant Calculation:`);
        console.log(`   - Coverage: ${warrantCoverage}%`);
        console.log(`   - Exercise Price: $${warrantExercisePrice.toFixed(4)}`);
        console.log(`   - Shares: ${warrantShares.toLocaleString()}`);
        console.log(`   - Value: $${Math.round(warrantValue).toLocaleString()}`);
      }

      // ✅ STEP 10: Final Total Shares
      const finalTotalShares = totalSharesAfterPool + warrantShares;
      const postMoneyValuation = finalTotalShares * sharePrice;

      console.log(`📊 Final Total Shares: ${finalTotalShares.toLocaleString()}`);
      console.log(`💰 Post-Money Valuation: $${Math.round(postMoneyValuation).toLocaleString()}`);

      // ✅ STEP 11: Ownership Calculations
      const foundersOwnership = (previousRoundData.founderShares / finalTotalShares) * 100;
      const optionPoolOwnership = ((previousRoundData.employeeShares + newOptionShares) / finalTotalShares) * 100;
      const convertedInvestorsOwnership = (totalConvertedShares / finalTotalShares) * 100;
      const seriesAInvestorsOwnership = (seriesAShares / finalTotalShares) * 100;
      const warrantOwnership = (warrantShares / finalTotalShares) * 100;

      // ✅ STEP 12: Total Shares Issued in THIS round
      const totalSharesIssuedThisRound = seriesAShares + newOptionShares + warrantShares;

      console.log(`📈 Total Shares Issued This Round: ${totalSharesIssuedThisRound.toLocaleString()}`);
      const simplePostMoney = preMoney + investment;
      // ✅ STEP 13: Update formData
      setFormData(prev => ({
        ...prev,
        issuedshares: Math.round(totalSharesIssuedThisRound).toString(),
        post_money: simplePostMoney.toFixed(2),
        investorPostMoney: seriesAInvestorsOwnership.toFixed(2),
        isCalculationSource: true
      }));

      // ✅ STEP 14: Set calculated values for display
      setCalculatedValues({
        sharePrice: sharePrice.toFixed(4),
        newSharesIssued: Math.round(seriesAShares),
        totalPostShares: Math.round(finalTotalShares),
        newOptionShares: Math.round(newOptionShares),
        existingOptionPoolPercent: previousRoundOptionPool,
        postMoneyValuation: postMoneyValuation.toFixed(2),
        investorOwnershipPercent: seriesAInvestorsOwnership.toFixed(2),
        doc4Action: newOptionShares > 0 ? 'TOP_UP' : 'NO_ACTION',

        // Convertible Note data (if any)
        convertedShares: Math.round(totalConvertedShares),
        convertedValue: Math.round(totalConvertedValue),

        // Warrant data (if any)
        warrantShares: Math.round(warrantShares),
        warrantExercisePrice: warrantExercisePrice.toFixed(4),
        warrantValue: Math.round(warrantValue),
        warrantCoverage: warrantCoverage,

        // Ownership breakdown
        foundersOwnership: foundersOwnership.toFixed(2),
        optionPoolOwnership: optionPoolOwnership.toFixed(2),
        convertedInvestorsOwnership: convertedInvestorsOwnership.toFixed(2),
        seriesAInvestorsOwnership: seriesAInvestorsOwnership.toFixed(2),
        warrantOwnership: warrantOwnership.toFixed(2),

        // Previous round info
        previousTotalShares: previousRoundData.totalShares,
        previousSharePrice: sharePrice.toFixed(4)
      });

      // Reset calculation source flag
      setTimeout(() => {
        setFormData(prev => ({ ...prev, isCalculationSource: false }));
      }, 100);

      console.log("✅ ==== PREFERRED EQUITY CALCULATION COMPLETE =====");

    } catch (error) {
      console.error("❌ Preferred Equity calculation error:", error);
    }
  };
  //Automatic Fill

  // Component ke shuru mein yeh useEffect add karein
  useEffect(() => {

    const isSeriesCommonStock =
      formData.instrumentType === "Common Stock" || formData.instrumentType === "Preferred Equity";

    if (!selected || isFirstRound) return;

    if (isSeriesCommonStock) {

      // ✅ Only here auto-fill should run
      autoFillFromPreviousRound();
    } else {
      // ❌ Not Series + Common Stock → reset option pool
      // setFormData(prev => ({
      //   ...prev,
      //   optionPoolPercent: "0.00"
      // }));

      // setPreviousRoundOptionPool(0);

      // setCalculatedValues(prev => ({
      //   ...prev,
      //   existingOptionPoolPercent: 0
      // }));
      setFormData(prev => ({
        ...prev,
        optionPoolPercent: "0.00"
      }));

      setPreviousRoundOptionPool(0);

      setCalculatedValues(prev => ({
        ...prev,
        existingOptionPoolPercent: 0
      }));


    }
  }, [selected, formData.instrumentType]);
  // Frontend: Recordround.jsx mein yeh function add karein
  // ============================================
  // autoFillFromPreviousRound - FULLY CORRECTED
  // ============================================

  const autoFillFromPreviousRound = async () => {
    if (isFirstRound || !selected || selected === "Advisor Shares") {
      return;
    }

    try {
      const res = await axios.post(
        apiUrlRound + "getPreviousRoundForAutoFill",
        {
          company_id: userLogin.companies[0].id,
          current_round_id: id || 0,
          current_instrument_type: formData.instrumentType,
        }
      );

      if (res.data.success && res.data.data) {
        const data = res.data.data;

        // ✅ EXISTING SHARES - हमेशा set करो
        if (data.existingShares > 0) {
          setexistingSharesUse(data.existingShares.toString());
          setFormData(prev => ({
            ...prev,
            existingShares: data.existingShares.toString()
          }));
        }

        // ✅ CRITICAL: FRONTEND में DECIDE करो AUTOFILL करना है या नहीं
        const isPricedRound =
          formData.instrumentType === "Common Stock" ||
          formData.instrumentType === "Preferred Equity";

        const shouldAutofill = isPricedRound && data.can_autofill && data.existingOptionPoolPercent > 0;

        if (shouldAutofill) {
          // ✅ PRICED ROUND - AUTOFILL
          const preMoneyPool = parseFloat(data.existingOptionPoolPercent) || 0;

          console.log(`✅ AUTOFILL: Pre-money pool = ${preMoneyPool}%`);
          console.log(`📊 Previous post-money pool = ${data.previousPostMoneyPool}%`);
          console.log(`📊 Employee ownership = ${data.employee_ownership_percent}%`);

          setFormData(prev => ({
            ...prev,
            optionPoolPercent: preMoneyPool.toFixed(2)
          }));

          setPreviousRoundOptionPool(preMoneyPool);

          setCalculatedValues(prev => ({
            ...prev,
            existingOptionPoolPercent: preMoneyPool
          }));

        } else {
          // 🚫 UNPRICED ROUND OR NO PREVIOUS POOL - NO AUTOFILL
          console.log(`🚫 NO AUTOFILL: ${formData.instrumentType || 'Unknown'} round`);
          console.log(`📊 Previous round had ${data.previousPostMoneyPool}% post-money pool`);
          console.log(`📊 Employee ownership: ${data.employee_ownership_percent}%`);

          setFormData(prev => ({
            ...prev,
            optionPoolPercent: "0.00"
          }));

          setPreviousRoundOptionPool(0);

          setCalculatedValues(prev => ({
            ...prev,
            existingOptionPoolPercent: 0
          }));
        }
      }

    } catch (err) {
      console.error("❌ Auto-fill error:", err);
    }
  };
  useEffect(() => {
    // Jab important inputs change ho, toh calculation reset karo
    const shouldResetCalculation =
      formData.pre_money > 0 ||
      formData.roundsize > 0 ||
      formData.optionPoolPercent_post !== seriesASafeData.lastOptionPoolPost;

    if (shouldResetCalculation && seriesASafeData.hasCalculated) {
      console.log("Resetting calculation flag due to input change");
      setSeriesASafeData(prev => ({
        ...prev,
        hasCalculated: false,
        lastOptionPoolPost: formData.optionPoolPercent_post
      }));
    }
  }, [formData.pre_money, formData.roundsize, formData.optionPoolPercent_post]);

  useEffect(() => {
    // Only calculate if we have all required data AND haven't calculated yet

    if (seriesASafeData.previousInstrumentType === 'Safe') {
      const shouldCalculate =
        seriesASafeData.previousInstrumentType &&
        formData.pre_money > 0 &&
        formData.roundsize > 0 &&
        !seriesASafeData.hasCalculated;

      console.log("useEffect - shouldCalculate:", shouldCalculate, seriesASafeData);

      if (!shouldCalculate) return;

      console.log("Calculating for:", seriesASafeData.previousInstrumentType);

      if (seriesASafeData.previousInstrumentType === 'Safe') {
        calculateSeriesASafe();
      }
    }
    if (seriesASafeData.previousInstrumentType === 'Convertible Note') {
      calculateSeriesConvertible();
    }
  }, [
    formData.pre_money,
    formData.roundsize,
    formData.optionPoolPercent_post,
    seriesASafeData.previousInstrumentType,
    seriesASafeData.hasCalculated
  ]);

  // ✅ Function 1: Common Stock with Target Pool Top-up (Series/ANY round)
  const calculateCommonStockWithTopUp = (preMoney, investment, priorTotalShares, existingPoolShares, targetPoolPercent) => {
    console.log(preMoney, investment, priorTotalShares, existingPoolShares, targetPoolPercent)
    // Step 1: Shares excluding current pool
    const sharesExcludingPool = priorTotalShares - existingPoolShares;

    // Step 2: Total shares needed for target pool %
    const totalSharesForTargetPool = sharesExcludingPool / (1 - targetPoolPercent / 100);

    // Step 3: New pool shares required
    const newPoolShares = totalSharesForTargetPool - priorTotalShares + existingPoolShares;

    // Step 4: Share price AFTER pool adjustment
    const sharePrice = preMoney / totalSharesForTargetPool;

    // Step 5: New investor common shares
    const newInvestorShares = investment / sharePrice;

    // Step 6: Total issued this round
    const totalSharesIssued = newPoolShares + newInvestorShares;

    return {
      sharePrice: parseFloat(sharePrice.toFixed(4)),
      newPoolShares: Math.round(newPoolShares),
      newInvestorShares: Math.round(newInvestorShares),
      totalSharesIssued: Math.round(totalSharesIssued),
      totalPostShares: Math.round(totalSharesForTargetPool + newInvestorShares),
      postMoneyValuation: (preMoney + investment).toFixed(2)
    };
  };

  // ✅ Function 2: Common Stock WITHOUT Top-up (existing pool >= target)
  const calculateCommonStockNoTopUp = (preMoney, investment, priorTotalShares) => {
    const sharePrice = preMoney / priorTotalShares;
    const newInvestorShares = investment / sharePrice;

    return {
      sharePrice: parseFloat(sharePrice.toFixed(4)),
      newPoolShares: 0,
      newInvestorShares: Math.round(newInvestorShares),
      totalSharesIssued: Math.round(newInvestorShares),
      totalPostShares: priorTotalShares + newInvestorShares,
      postMoneyValuation: (preMoney + investment).toFixed(2)
    };
  };

  // ✅ MAIN useEffect Logic (Clean & Simple)
  useEffect(() => {
    if (formData.isCalculationSource || !formData.instrumentType) {
      return;
    }
    console.log(formData)
    const roundSize = parseFloat(formData.roundsize || 0);
    const preMoney = parseFloat(formData.pre_money || 0);
    const investment = parseFloat(formData.roundsize || 0);
    const targetPoolPercent = parseFloat(formData.optionPoolPercent_post || 0);
    const priorTotalShares = parseFloat(existingSharesUse || 0);
    const existingPoolPercent = parseFloat(formData.optionPoolPercent || 0);
    console.log(existingPoolPercent, priorTotalShares)
    if (preMoney <= 0 || investment <= 0 || priorTotalShares <= 0) {
      return;
    }
    const isCommonStock = formData.instrumentType === "Common Stock";
    const needsTopUp = targetPoolPercent > 0 && targetPoolPercent > existingPoolPercent;

    let calculationResult = {};

    if (isCommonStock) {
      const existingPoolShares = Math.round(priorTotalShares * (existingPoolPercent / 100));

      if (needsTopUp) {
        // ✅ Use Top-up function (30% target)
        calculationResult = calculateCommonStockWithTopUp(
          preMoney,
          investment,
          priorTotalShares,
          existingPoolShares,
          targetPoolPercent
        );
      } else {
        // ✅ No top-up needed
        calculationResult = calculateCommonStockNoTopUp(preMoney, investment, priorTotalShares);
      }
    }
    console.log('ll')
    const postMoney = preMoney + roundSize;

    // Set calculated values
    setCalculatedValues({
      sharePrice: calculationResult.sharePrice,
      newSharesIssued: calculationResult.totalSharesIssued,
      totalPostShares: calculationResult.totalPostShares,
      newOptionShares: calculationResult.newPoolShares,
      existingOptionPoolPercent: existingPoolPercent,
      postMoneyValuation: postMoney,
      investorOwnershipPercent: ((investment / parseFloat(postMoney)) * 100).toFixed(2),
      doc4Action: needsTopUp ? 'TOP_UP' : 'NO_ACTION'
    });

    // Update form
    setFormData(prev => ({
      ...prev,
      post_money: postMoney,
      investorPostMoney: ((investment / parseFloat(postMoney)) * 100).toFixed(2),
      issuedshares: String(calculatedValues.totalSharesIssued),
      sharePrice: String(calculationResult.sharePrice),
      isCalculationSource: true,
    }));

    setTimeout(() => {
      setFormData(prev => ({ ...prev, isCalculationSource: false }));
    }, 10);

  }, [formData.pre_money, formData.instrumentType, formData.optionPoolPercent, formData.roundsize, formData.optionPoolPercent_post, existingSharesUse, previousRoundOptionPool]);




  useEffect(() => {
    if (formData.instrumentType === "Preferred Equity") {
      fetchPreviousRoundData();
    }
  }, [selected, formData.instrumentType]);
  const fetchPreviousRoundData = async () => {
    try {
      const res = await axios.post(
        apiUrlRound + "getPreviousRoundOptionPool",
        { company_id: userLogin.companies[0].id }
      );

      if (res.data.success) {
        const { previousRoundData } = res.data;
        const isSeriesRound = selected?.includes("Series");
        const isSeedRound = selected === "Seed";
        console.log(previousRoundData)
        if (isSeriesRound) {
          // Auto-fill Pre-Money pool
          setFormData(prev => ({
            ...prev,
            // optionPoolPercent: res.data.existingOptionPoolPercent.toFixed(2)
          }));

          setPreviousRoundOptionPool(res.data.existingOptionPoolPercent);

          // ✅ Set previous round data WITHOUT calculating
          if (previousRoundData.instrumentType === 'Safe') {
            setSeriesASafeData(prev => ({
              ...prev,
              previousTotalShares: previousRoundData.totalShares || 0,
              previousFounderShares: previousRoundData.founderShares || 0,
              previousEmployeeShares: previousRoundData.employeeShares || 0,
              previousSeedInvestorShares: 0,
              previousSeedInvestment: previousRoundData.seedInvestment || 0,
              previousValuationCap: previousRoundData.valuationCap || 0,
              previousDiscountRate: previousRoundData.discountRate || 0,
              previousInstrumentType: previousRoundData.instrumentType || '',
              hasCalculated: false // ✅ Reset calculation flag
            }));
          }

          // ❌ REMOVE THIS LINE: calculateSeriesASafe();

        } else if (isSeedRound) {
          setFormData(prev => ({
            ...prev,
            optionPoolPercent: "0.00"
          }));

        }

        if (previousRoundData.totalShares > 0) {
          setexistingSharesUse(previousRoundData.totalShares.toString());
        }
      }
    } catch (err) {
      console.error("❌ Error fetching previous round data:", err);
    }
  };

  //Series A Convertible
  useEffect(() => {
    if (formData.instrumentType === "Preferred Equity") {
      fetchPreviousRoundForConvertible();
    }
  }, [selected, formData.instrumentType]);
  const fetchPreviousRoundForConvertible = async () => {
    try {

      const res = await axios.post(
        apiUrlRound + "getPreviousRoundForConvertible", // Changed API endpoint
        {
          company_id: userLogin.companies[0].id,
          current_round_id: id || 0,
        }
      );

      if (res.data.success && res.data.previousRoundData) {
        const previousData = res.data.previousRoundData;
        console.log(previousData)
        if (previousData.instrumentType !== '') {
          setSeriesConvertibleData(prev => ({
            ...prev,
            previousTotalShares: previousData.totalShares || 0, // Should be 111,111
            previousFounderShares: previousData.founderShares || 0, // Should be 100,000
            previousEmployeeShares: previousData.employeeShares || 0, // Should be 11,111
            previousRoundSize: previousData.seedInvestment || 0, // Should be 120,000
            previousValuationCap: previousData.valuationCap || 0, // Should be 1,000,000
            previousDiscountRate: previousData.discountRate || 0, // Should be 20
            previousInterestRate: previousData.interestRate, // SAFE has no interest rate
            previousInstrumentType: previousData.instrumentType || "", // Should be 20
            previousemployeeSharesFromSeed: previousData.employeeSharesFromSeed || "", // Should be 20
          }));
          setSeriesASafeData(prev => ({
            ...prev,

            previousInstrumentType: previousData.instrumentType || '',

          }));
        }



      }
    } catch (err) {
      console.error("❌ Error fetching previous SAFE round data:", err);
    }
  };
  //Series A Convertible

  // Har round change par call karein


  // Call this function when needed

  // getexistingShares function ke baad yeh function add karein (around line 150)

  // useEffect(() => {
  //   const isSeriesRound = selected?.includes("Series");
  //   const CommonStock = formData.instrumentType;
  //   const isSeriesCommonStock = isSeriesRound && CommonStock === 'Common Stock';

  //   if (!isFirstRound && isSeriesCommonStock) {
  //     // Reset states first
  //     setPreviousRoundOptionPool(0);

  //     // Then autofill
  //     autoFillFromPreviousRound();
  //   }
  // }, [selected, isFirstRound]);

  // Sync states if formData.optionPoolPercent changes manually
  useEffect(() => {
    if (selected?.includes("Series") && formData.optionPoolPercent) {
      const poolValue = parseFloat(formData.optionPoolPercent);

      if (!isNaN(poolValue) && poolValue > 0 && poolValue !== previousRoundOptionPool) {

        setPreviousRoundOptionPool(poolValue);
      }
    }
  }, [formData.optionPoolPercent]);
  // Doc 4 Rule
  //Round 1
  function formatCurrentDate(input) {
    const date = new Date(input);

    if (isNaN(date)) return "";

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12

    return `${month} ${day}${getOrdinal(
      day
    )}, ${year} ${hours}:${minutes} ${ampm}`;
  }
  const formatIncorporationDate = (value) => {
    if (!value) return "Not provided";

    // Only year
    if (/^\d{4}$/.test(value)) {
      return value;
    }

    // Full date
    return formatCurrentDate(value);
  };

  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
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
                <div className="d-flex flex-column gap-4">
                  {errorMsg && (
                    <Alertpopup
                      message={errorMsg}
                      onClose={() => seterrorMsg("")}
                    />
                  )}
                  {errorMessageCenter && (
                    <div className="center_error_pop flex items-center justify-between gap-3 shadow-lg">
                      <div className="d-flex align-items-center gap-2">
                        <span className="d-block">{errorMessageCenter}</span>
                      </div>
                      <button onClick={() => seterrorMessageCenter("")}
                        type="button"
                        className="close_btnCros"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  {messageAll && (
                    <div
                      className={`shadow-lg ${errr ? "error_pop" : "success_pop"
                        }`}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <span className="d-block">{messageAll}</span>
                      </div>

                      <button
                        type="button"
                        className="close_btnCros"
                        onClick={() => setmessageAll("")}
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {successMsg && (
                    // <Alertpopupsuccess
                    //   message={successMsg}
                    //   onClose={() => setsuccessMsg("")}
                    // />
                    <DangerAlertPopup
                      message={successMsg}
                      onConfirm={handleConfirm}
                      onCancel={() => {
                        setsuccessMsg("");
                      }}
                    />
                  )}
                  {isLoading && (
                    <div
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        zIndex: 9999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          minHeight: '100vh'
                        }}
                      >
                        <div
                          class="spinner-border spinner-border_loader text-success"
                          style={{ width: '3rem', height: '3rem' }}
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="pb-3 bar_design">
                      <h4 className="h5 mb-0">
                        {id ? "Edit Record Round" : "Create New Record Round"}
                      </h4>
                    </div>
                    {/* <div className="d-flex gap-2">
                      <button className="close_btn w-fit">Save Draft</button>
                      <button
                        className="global_btn w-fit"
                        onClick={handleSubmit}
                      >
                        Create Round
                      </button>
                    </div> */}
                  </div>

                  <div className="mb-4 dashboard_card">
                    <div class="progress-container pt-3">
                      <div class="progress-info">
                        <div class="progress-label">Progress</div>
                        <div class="progress-value">
                          {progressWidth}% Complete
                        </div>
                      </div>
                      <div class="progress-bar">
                        <div
                          class="progress-fill"
                          style={{ width: `${progressWidth}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Section Navigation */}
                  <div className="mb-4 ">
                    <div className="d-flex flex-wrap gap-2">
                      {sections.map((section, index) => (
                        <button
                          key={section.id}
                          className={`btn ${activeSection === section.id
                            ? "select_btn_active"
                            : "select_btn"
                            } rounded-pill`}

                        >
                          {section.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Sections */}
                  <form method="post" action="javascript:void(0)">
                    <div className="from_quation">
                      {/* Share Class Section */}
                      {activeSection === "shareclass" && (
                        <div className="section-content p-4 border rounded-3 shadow-sm bg-white">
                          <h3 className="h5 mb-4 text-gray-800">{isFirstRound ? "Round 0 - Company Incorporation" : "Share Class"}</h3>
                          {formData.dateroundclosed && shouldShowAlert(formData.dateroundclosed) && (
                            <div className="alert-message text-danger p-3 mb-4 border rounded bg-white">
                              <strong>Note:</strong> Start by entering your company's original ownership (who owned which shares at registration). Then add future investment rounds. This keeps your cap table accurate and makes future funding easier.
                            </div>
                          )}
                          {isFirstRound && (
                            <div className="alert alert-info mb-4">
                              <strong>Welcome!</strong> Let's start with your company's incorporation details. This will be your Round 0 - the foundation of your cap table.
                            </div>
                          )}

                          <div className="mb-4">
                            <label className="form-label fw-semibold">
                              Name of Round <span className="text-danger fs-5">*</span>
                              {errors.nameOfRound && (
                                <div className="text-danger small mt-1 is-invalid">
                                  <i className="bi bi-exclamation-circle me-1"></i>
                                  {errors.nameOfRound}
                                </div>
                              )}
                            </label>
                            <input
                              type="text"
                              placeholder="Founding Share Allocation"
                              value={formData.nameOfRound}
                              onChange={(e) => handleInputChange("nameOfRound", e.target.value)}
                              className={`form-control ${errors.nameOfRound ? "is-invalid" : ""}`}
                              maxLength={30}

                            />
                            <div className="form-text">
                              {formData.nameOfRound.length}/30 characters
                            </div>
                          </div>

                          {isFirstRound && (
                            <div className="round-zero-fields">
                              {/* Founder Allocation Section */}
                              <div className="mb-4">
                                <label className="form-label fw-semibold">
                                  Founder Share Allocation <span className="text-danger fs-5">*</span>
                                  {errors.founders && (
                                    <div className="text-danger small mt-1">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.founders}
                                    </div>
                                  )}
                                </label>

                                {foundersData.map((founder, index) => (
                                  <div key={index} className="founder-allocation mb-4 p-3 border rounded">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                      <h6 className="mb-0">Founder {index + 1}</h6>
                                      {founderCount > 1 && (
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-outline-danger"
                                          onClick={() => removeFounder(index)}
                                        >
                                          Remove
                                        </button>
                                      )}
                                    </div>

                                    <div className="row">
                                      <div className="col-md-3 mb-3">
                                        <label className="form-label">
                                          First Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          className={`form-control ${errors[`founder_${index}_firstName`] ? 'is-invalid' : ''}`}
                                          placeholder="First Name"
                                          value={founder.firstName}
                                          onChange={(e) => {
                                            updateFounderData(index, 'firstName', e.target.value);
                                            // Clear error when user starts typing
                                            if (errors[`founder_${index}_firstName`]) {
                                              setErrors(prev => ({
                                                ...prev,
                                                [`founder_${index}_firstName`]: ""
                                              }));
                                            }
                                          }}
                                        />
                                        {errors[`founder_${index}_firstName`] && (
                                          <div className="text-danger small mt-1">
                                            <i className="bi bi-exclamation-circle me-1"></i>
                                            {errors[`founder_${index}_firstName`]}
                                          </div>
                                        )}
                                      </div>

                                      <div className="col-md-3 mb-3">
                                        <label className="form-label">
                                          Last Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          className={`form-control ${errors[`founder_${index}_lastName`] ? 'is-invalid' : ''}`}
                                          placeholder="Last Name"
                                          value={founder.lastName}
                                          onChange={(e) => {
                                            updateFounderData(index, 'lastName', e.target.value);
                                            // Clear error when user starts typing
                                            if (errors[`founder_${index}_lastName`]) {
                                              setErrors(prev => ({
                                                ...prev,
                                                [`founder_${index}_lastName`]: ""
                                              }));
                                            }
                                          }}
                                        />
                                        {errors[`founder_${index}_lastName`] && (
                                          <div className="text-danger small mt-1">
                                            <i className="bi bi-exclamation-circle me-1"></i>
                                            {errors[`founder_${index}_lastName`]}
                                          </div>
                                        )}
                                      </div>

                                      <div className="col-md-3 mb-3">
                                        <label className="form-label">
                                          Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="email"
                                          className={`form-control ${errors[`founder_${index}_email`] ? 'is-invalid' : ''}`}
                                          placeholder="Email"
                                          value={founder.email}
                                          onChange={(e) => {
                                            updateFounderData(index, 'email', e.target.value);
                                            // Clear error when user starts typing
                                            if (errors[`founder_${index}_email`]) {
                                              setErrors(prev => ({
                                                ...prev,
                                                [`founder_${index}_email`]: ""
                                              }));
                                            }
                                          }}
                                        />
                                        {errors[`founder_${index}_email`] && (
                                          <div className="text-danger small mt-1">
                                            <i className="bi bi-exclamation-circle me-1"></i>
                                            {errors[`founder_${index}_email`]}
                                          </div>
                                        )}
                                      </div>

                                      <div className="col-md-3 mb-3">
                                        <label className="form-label">
                                          Phone
                                        </label>
                                        <input
                                          type="tel"
                                          className="form-control"
                                          placeholder="Phone"
                                          value={founder.phone}
                                          onChange={(e) => updateFounderData(index, 'phone', e.target.value)}
                                        />
                                      </div>

                                      <div className="col-md-3 mb-3">
                                        <label className="form-label">
                                          Shares Allocated <span className="text-danger">*</span>
                                        </label>
                                        <NumericFormat
                                          className={`form-control ${errors[`founder_${index}_shares`] ? 'is-invalid' : ''}`}
                                          placeholder="e.g., 500"
                                          value={founder.shares || ''}
                                          onValueChange={(values) => {
                                            updateFounderData(index, 'shares', values.value);
                                            if (errors[`founder_${index}_shares`]) {
                                              setErrors(prev => ({
                                                ...prev,
                                                [`founder_${index}_shares`]: ""
                                              }));
                                            }
                                          }}
                                          thousandSeparator={true}

                                          allowNegative={false}
                                          decimalScale={2}
                                          fixedDecimalScale={true}
                                        />
                                        {errors[`founder_${index}_shares`] && (
                                          <div className="text-danger small mt-1">
                                            <i className="bi bi-exclamation-circle me-1"></i>
                                            {errors[`founder_${index}_shares`]}
                                          </div>
                                        )}
                                      </div>

                                      <div className="col-md-3 mb-3">
                                        <label className="form-label">Share Type</label>
                                        <select
                                          className="form-control"
                                          value={founder.shareType}
                                          onChange={(e) => updateFounderData(index, 'shareType', e.target.value)}
                                        >
                                          <option value="common">Common Shares</option>
                                          <option value="preferred">Preferred Shares</option>
                                          <option value="other">Other</option>
                                        </select>
                                      </div>

                                      {/* Custom Share Type Input - NEW */}
                                      {founder.shareType === 'other' && (
                                        <div className="col-md-6 mb-3">
                                          <label className="form-label">Specify Share Type</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter custom share type"
                                            value={founder.customShareType || ''}
                                            onChange={(e) => updateFounderData(index, 'customShareType', e.target.value)}
                                          />
                                        </div>
                                      )}

                                      <div className="col-md-3 mb-3">
                                        <label className="form-label">Share Class</label>
                                        <select
                                          className="form-control"
                                          value={founder.shareClass}
                                          onChange={(e) => updateFounderData(index, 'shareClass', e.target.value)}
                                        >
                                          <option value="Class A">Class A</option>
                                          <option value="Class B">Class B</option>
                                          <option value="Class C">Class C</option>

                                        </select>
                                      </div>

                                      {/* Custom Share Class Input */}
                                      {founder.shareClass === 'other' && (
                                        <div className="col-md-3 mb-3">
                                          <label className="form-label">Specify Share Class</label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter custom share class"
                                            value={founder.customShareClass || ''}
                                            onChange={(e) => updateFounderData(index, 'customShareClass', e.target.value)}
                                          />
                                        </div>
                                      )}

                                      <div className="col-md-3 mb-3">
                                        <label className="form-label">Voting Rights</label>
                                        <select
                                          className="form-control"
                                          value={founder.voting}
                                          onChange={(e) => updateFounderData(index, 'voting', e.target.value)}
                                        >
                                          <option value="voting">Voting</option>
                                          <option value="non-voting">Non-Voting</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                <button
                                  type="button"
                                  className="btn btn-outline-primary btn-sm"
                                  onClick={addFounder}
                                >
                                  + Add Another Founder
                                </button>
                              </div>

                              {/* Currency and Price Per Share */}
                              <div className="row">
                                <div className="col-md-6 mb-4">
                                  <label className="form-label fw-semibold">
                                    Currency <span className="text-danger fs-5">*</span>
                                    {errors.currency && (
                                      <div className="text-danger small mt-1">
                                        <i className="bi bi-exclamation-circle me-1"></i>
                                        {errors.currency}
                                      </div>
                                    )}
                                  </label>
                                  <select
                                    className={`form-control ${errors.currency ? 'is-invalid' : ''}`}
                                    value={formData.currency}
                                    onChange={(e) => {
                                      handleInputChange("currency", e.target.value);
                                      if (errors.currency) {
                                        setErrors(prev => ({ ...prev, currency: "" }));
                                      }
                                    }}
                                  >
                                    <option value="">-- Select Currency --</option>
                                    {countrySymbolList.map((item) => (
                                      <option
                                        key={item.id}
                                        value={`${item.currency_code} ${item.currency_symbol}`}
                                      >
                                        {item.currency_code} {item.currency_symbol}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="col-md-6 mb-4">
                                  <label className="form-label fw-semibold">
                                    Price Per Share at Incorporation
                                    {formData.currency && ` (${formData.currency.split(' ')[1]})`}
                                    <span className="text-danger fs-5">*</span>
                                    {errors.pricePerShare && (
                                      <div className="text-danger small mt-1">
                                        <i className="bi bi-exclamation-circle me-1"></i>
                                        {errors.pricePerShare}
                                      </div>
                                    )}
                                  </label>
                                  <input
                                    type="number"
                                    step="0.001"
                                    className={`form-control ${errors.pricePerShare ? 'is-invalid' : ''}`}
                                    placeholder={`e.g., 0.001 ${formData.currency ? formData.currency.split(' ')[1] : ''}`}
                                    value={formData.pricePerShare || ''}
                                    onChange={(e) => {
                                      handleInputChange("pricePerShare", e.target.value);
                                      if (errors.pricePerShare) {
                                        setErrors(prev => ({ ...prev, pricePerShare: "" }));
                                      }
                                    }}
                                  />
                                  <div className="form-text">
                                    This is the par value from your incorporation documents
                                  </div>
                                </div>
                              </div>

                              {/* Round 0 Calculations Display */}
                              <div className="calculation-results p-3 bg-light rounded mb-4">
                                <h6>Round 0 Calculations</h6>
                                <div className="row">
                                  <div className="col-md-4">
                                    <strong>Total Shares:</strong> {calculateTotalShares().toLocaleString()}
                                  </div>
                                  <div className="col-md-4">
                                    <strong>Total Value:</strong> {formData.currency ? formData.currency.split(' ')[1] : '$'}{calculateTotalValue()}
                                  </div>
                                  <div className="col-md-4">
                                    <strong>Founder Count:</strong> {founderCount}
                                  </div>
                                </div>

                                {/* Ownership Breakdown */}
                                {calculateTotalShares() > 0 && (
                                  <div className="mt-3">
                                    <strong>Ownership Breakdown:</strong>
                                    <ul className="mb-0 mt-2">
                                      {calculateOwnershipPercentages().map((item, index) => (
                                        <li key={index}>
                                          {item.founder}: {item.percentage}%
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>

                              {/* Founder Details Table */}
                              {calculateTotalShares() > 0 && (
                                <div className="mt-3">
                                  <strong>Founder Details:</strong>
                                  <div className="table-responsive mt-2">
                                    <table className="table table-sm table-bordered">
                                      <thead>
                                        <tr>
                                          <th>Founder</th>
                                          <th>Number of Shares</th>
                                          <th>Price Per Share</th>
                                          <th>Ownership %</th>
                                          <th>Share Type</th>
                                          <th>Share Class</th>
                                          <th>Voting Rights</th>
                                          <th>Value</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {foundersData.map((founder, index) => {
                                          const shares = parseInt(founder.shares) || 0;
                                          const percentage = calculateTotalShares() > 0
                                            ? ((shares / calculateTotalShares()) * 100).toFixed(1)
                                            : '0.0';

                                          // Display share type - show custom if available
                                          const displayShareType = founder.shareType === 'other' && founder.customShareType
                                            ? founder.customShareType
                                            : (founder.shareType === 'common' ? 'Common' : 'Preferred');

                                          // Display share class - show custom if available
                                          const displayShareClass = founder.customShareClass
                                            ? founder.customShareClass
                                            : (founder.shareClass || 'Class A');

                                          return (
                                            <tr key={index}>
                                              <td>{founder.firstName} {founder.lastName}</td>
                                              <td>{shares.toLocaleString()}</td>
                                              <td>
                                                {formData.currency ? formData.currency.split(' ')[1] : '$'}
                                                {formData.pricePerShare || '0.00'}
                                              </td>
                                              <td>{percentage}%</td>
                                              <td>{displayShareType}</td>
                                              <td>{displayShareClass}</td>
                                              <td>{founder.voting === 'voting' ? 'Voting' : 'Non-Voting'}</td>
                                              <td>{formData.currency ? formData.currency.split(' ')[1] : '$'}{calculateFounderValue(shares)}</td>
                                            </tr>
                                          );
                                        })}
                                        {/* Total Row */}
                                        <tr className="table-secondary fw-bold">
                                          <td colSpan="2">Total</td>
                                          <td>{formData.currency ? formData.currency.split(' ')[1] : '$'}{formData.pricePerShare || '0.00'}</td>
                                          <td>100%</td>
                                          <td colSpan="3"></td>
                                          <td>{formData.currency ? formData.currency.split(' ')[1] : '$'}{calculateTotalValue()}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Share Class Options for Round 1+ */}
                          {/* Share Class Options for Round 1+ */}
                          {!isFirstRound && (
                            <div className="mb-4">
                              <label className="form-label fw-semibold">
                                Funding Rounds <span className="text-danger fs-5">*</span>
                                {errors.shareClassType && (
                                  <div className="text-danger small mt-1 is-invalid">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors.shareClassType}
                                  </div>
                                )}
                              </label>

                              <select
                                className={`form-control ${errors.shareClassType ? "is-invalid" : ""}`}
                                value={selected}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value && value !== "default") {
                                    console.log(allowedRounds.includes(value))
                                    // Validation check
                                    if (allowedRounds && !allowedRounds.includes(value)) {
                                      seterrorMessageCenter(`❌ ${value} is not available!\n\nAvailable rounds: ${allowedRounds.join(", ")}`);
                                      setTimeout(() => {

                                        seterrorMessageCenter("");

                                      }, 3500);
                                      return;
                                    } else {
                                      seterrorMessageCenter("");
                                    }

                                    setSelected(value);
                                    handleInputChange(
                                      "shareClassType",
                                      value === "OTHER" ? formData.shareclassother : value
                                    );
                                  } else {
                                    seterrorMessageCenter("");
                                  }
                                }}
                                disabled={!allowedRounds} // Disable while loading
                              >
                                {/* Loading State */}
                                {!allowedRounds && (
                                  <option value="default" disabled>Loading rounds...</option>
                                )}

                                {/* Loaded State */}
                                {allowedRounds && (
                                  <>
                                    <option value="default" disabled>
                                      {allowedRounds.length === 0
                                        ? "No rounds available"
                                        : "-- Select Funding Round --"}
                                    </option>

                                    {/* Always show all options, backend will validate */}
                                    <optgroup label="Seed Rounds">
                                      <option value="Pre-Seed">Pre-Seed</option>
                                      <option value="Seed">Seed</option>
                                      <option value="Post-Seed">Post-Seed</option>
                                    </optgroup>

                                    <optgroup label="Series Rounds">
                                      <option value="Series A">Series A</option>
                                      <option value="Series A Extension">Series A Extension</option>
                                      <option value="Series B">Series B</option>
                                      <option value="Series B Extension">Series B Extension</option>
                                      <option value="Series C">Series C</option>
                                      <option value="Series C Extension">Series C Extension</option>
                                      <option value="Series D">Series D</option>
                                      <option value="Series D Extension">Series D Extension</option>
                                    </optgroup>

                                    <optgroup label="Other Rounds">
                                      <option value="Bridge Round">Bridge Round</option>
                                      <option value="Advisor Shares">Advisor Shares</option>
                                      <option value="OTHER">OTHER</option>
                                    </optgroup>
                                  </>
                                )}
                              </select>
                              {errors.shareClassType && (
                                <div className="text-danger small mt-1">
                                  <i className="bi bi-exclamation-circle me-1"></i>
                                  {errors.shareClassType}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Conditional Field for OTHER option */}
                          {!isFirstRound && selected === "OTHER" && (
                            <div className="mb-4">
                              <label className="form-label fw-semibold">
                                Custom Share Class Name
                              </label>
                              <input
                                type="text"
                                placeholder="Enter custom share class name"
                                value={formData.shareclassother}
                                onChange={(e) => handleInputChange("shareclassother", e.target.value)}
                                className={`form-control ${errors.shareclassother ? "is-invalid" : ""}`}
                                maxLength={30}
                              />
                              <div className="form-text">
                                {formData.shareclassother.length}/30 characters
                              </div>
                              {errors.shareclassother && (
                                <div className="text-danger small">
                                  <i className="bi bi-exclamation-circle me-1"></i>
                                  {errors.shareclassother}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Conditional Field for OTHER option (only for Round 1+) */}


                          {/* Next Button with Validation */}
                          <div className="d-flex justify-content-end">

                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                const newErrors = {};

                                // Common validation for both rounds
                                if (!formData.nameOfRound.trim()) {
                                  newErrors.nameOfRound = "This field is required";
                                }

                                if (isFirstRound) {
                                  // ROUND 0 VALIDATION

                                  // Validate price per share
                                  if (!formData.pricePerShare || parseFloat(formData.pricePerShare) <= 0) {
                                    newErrors.pricePerShare = "Valid price per share is required";
                                  }

                                  // Validate currency
                                  if (!formData.currency || formData.currency.trim() === "") {
                                    newErrors.currency = "Currency selection is required";
                                  }

                                  // Validate founder allocations
                                  let hasFounderShares = false;
                                  let totalShares = 0;
                                  let hasValidShares = false;

                                  foundersData.forEach((founder, index) => {
                                    const shares = parseInt(founder.shares) || 0;

                                    // Validate first name
                                    if (!founder.firstName || founder.firstName.trim() === "") {
                                      newErrors[`founder_${index}_firstName`] = "First name is required";
                                    }

                                    // Validate last name
                                    if (!founder.lastName || founder.lastName.trim() === "") {
                                      newErrors[`founder_${index}_lastName`] = "Last name is required";
                                    }

                                    // Validate email
                                    if (!founder.email || founder.email.trim() === "") {
                                      newErrors[`founder_${index}_email`] = "Email is required";
                                    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(founder.email)) {
                                      newErrors[`founder_${index}_email`] = "Please enter a valid email address";
                                    }

                                    // Validate shares
                                    if (!founder.shares || founder.shares.trim() === "") {
                                      newErrors[`founder_${index}_shares`] = "Shares allocated is required";
                                    } else if (shares <= 0) {
                                      newErrors[`founder_${index}_shares`] = "Shares must be greater than 0";
                                    } else if (isNaN(shares)) {
                                      newErrors[`founder_${index}_shares`] = "Please enter a valid number";
                                    } else {
                                      hasFounderShares = true;
                                      totalShares += shares;
                                      hasValidShares = true;
                                    }

                                    // Validate custom share type if "other" is selected
                                    if (founder.shareType === 'other' && (!founder.customShareType || founder.customShareType.trim() === "")) {
                                      newErrors[`founder_${index}_customShareType`] = "Please specify the share type";
                                    }

                                    // Validate custom share class if "other" is selected
                                    if (founder.shareClass === 'other' && (!founder.customShareClass || founder.customShareClass.trim() === "")) {
                                      newErrors[`founder_${index}_customShareClass`] = "Please specify the share class";
                                    }
                                  });

                                  // Check if at least one founder has shares
                                  if (!hasFounderShares) {
                                    newErrors.founders = "At least one founder must have shares allocated";
                                  }

                                  // Check if total shares is zero
                                  if (totalShares === 0 && hasValidShares) {
                                    newErrors.founders = "Total shares must be greater than 0";
                                  }

                                  // Check if all founders have valid share allocations
                                  const allFoundersHaveShares = foundersData.every(founder => {
                                    const shares = parseInt(founder.shares) || 0;
                                    return shares > 0;
                                  });

                                  if (!allFoundersHaveShares && hasFounderShares) {
                                    newErrors.founders = "All founders must have shares allocated";
                                  }

                                } else {
                                  // ROUND 1+ VALIDATION
                                  if (selected === "default") {
                                    newErrors.shareClassType = "Please select a funding round";
                                  }

                                  if (selected === "OTHER" && !formData.shareclassother.trim()) {
                                    newErrors.shareclassother = "This field is required";
                                  }
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement = document.querySelector(".is-invalid");
                                    if (firstErrorElement) {
                                      firstErrorElement.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center"
                                      });
                                    }
                                  }, 100);
                                } else {
                                  setErrors({});

                                  // For Round 0, auto-set some values
                                  if (isFirstRound) {
                                    handleInputChange("issuedshares", calculateTotalShares().toString());
                                    handleInputChange("roundStatus", "CLOSED");
                                    handleInputChange("shareClassType", "Common Shares");
                                    setSelected("Founder Shares (Family and Friends)");
                                  }

                                  navigateToSection('next');
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}
                      {/* Investment Instrument Section */}
                      {activeSection === "instrument" && (
                        <div className="section-content p-4 border rounded-3 shadow-sm bg-white">
                          <PreviousSection
                            formData={formData}
                            otherText={otherText}
                            selected={selected}
                            visibleFields={["shareclass", "description"]}
                            isFirstRound={isFirstRound}
                            foundersData={foundersData}
                            calculateTotalShares={calculateTotalShares}
                            calculateTotalValue={calculateTotalValue}
                            founderCount={founderCount}
                          />

                          {/* ROUND 0 - Skip this section entirely */}
                          {isFirstRound ? (
                            <div className="text-center py-5">
                              <div className="alert alert-info">
                                <strong>Round 0 - No Investment Instrument</strong>
                                <p className="mb-0 mt-2">
                                  This is the incorporation round with founder shares only.
                                  No external investment instruments are involved.
                                </p>
                              </div>
                              <div className="d-flex justify-content-between pt-3 border-top gap-2">
                                <button
                                  className="close_btn w-fit"
                                  onClick={() => navigateToSection('prev')}
                                >
                                  <i className="bi bi-arrow-left me-2"></i>Back
                                </button>
                                <button
                                  className="global_btn w-fit"
                                  onClick={() => navigateToSection('next')}
                                >
                                  Continue to Next Section
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* OTHER ROUNDS - Show instrument selection */
                            <>
                              <h3 className="h5 mb-4 text-gray-800">Investment Instrument</h3>

                              <div className="mb-4">
                                <label className="form-label fw-semibold d-flex align-items-center">
                                  Select Investment Instrument Type
                                  <span className="tooltip-icon ms-2" tabIndex={0}>
                                    <img
                                      className="blackdark"
                                      width="15"
                                      height="15"
                                      src="/assets/user/images/question.png"
                                      alt="Tip"
                                    />
                                    <div className="tooltip-text tool-test-white text-white" role="tooltip">
                                      <strong>Description:</strong> The type of equity issued.
                                      Common classes include Common Stock for founders/employees
                                      and Preferred shares for investors.
                                    </div>
                                  </span>
                                  <span className="text-danger fs-5 ms-1">*</span>
                                  {errors.instrumentType && (
                                    <span className="text-danger small ms-2">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.instrumentType}
                                    </span>
                                  )}
                                </label>

                                {/* Instrument Selection */}
                                <div className="row mt-3">
                                  {instrumentOptions.map((opt) => (
                                    <div key={opt.value} className="col-md-6 mb-3">
                                      <div
                                        className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData.instrumentType === opt.value ? "bg-light" : "border-gray-300"
                                          } ${errors.instrumentType ? "border-danger" : ""}`}
                                        onClick={() => {
                                          handleInputChange("instrumentType", opt.value);

                                          // ✅ NEW: Agar Preferred Equity nahi hai, toh liquidation preferences clear karo
                                          if (opt.value !== "Preferred Equity") {
                                            handleInputChange("liquidation", []);
                                            handleInputChange("liquidationpreferences", "");
                                            handleInputChange("liquidationOther", "");
                                          }

                                          if (opt.value !== "OTHER") handleInputChange("customInstrument", "");
                                          if (errors.instrumentType || errors.customInstrument) {
                                            setErrors((prev) => ({
                                              ...prev,
                                              instrumentType: "",
                                              customInstrument: "",
                                            }));
                                          }
                                        }}
                                      >
                                        <div className="form-check">
                                          <input
                                            type="radio"
                                            name="instrumentType"
                                            value={opt.value}
                                            checked={formData.instrumentType === opt.value}
                                            onChange={() => {
                                              handleInputChange("instrumentType", opt.value);

                                              // ✅ NEW: Agar Preferred Equity nahi hai, toh liquidation preferences clear karo
                                              if (opt.value !== "Preferred Equity") {
                                                handleInputChange("liquidation", []);
                                                handleInputChange("liquidationpreferences", "");
                                                handleInputChange("liquidationOther", "");
                                              }

                                              if (opt.value !== "OTHER") handleInputChange("customInstrument", "");
                                              if (errors.instrumentType || errors.customInstrument) {
                                                setErrors((prev) => ({
                                                  ...prev,
                                                  instrumentType: "",
                                                  customInstrument: "",
                                                }));
                                              }
                                            }}
                                            className="form-check-input"
                                          />
                                          <label className="form-check-label fw-medium">
                                            {opt.label}
                                          </label>
                                        </div>
                                        <p className="text-muted small mb-0 mt-2">
                                          {opt.description}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Instrument Specific Details */}
                              {/* {formData.instrumentType === "Common Stock" && (
                                <div className="mt-3 p-3 border rounded bg-light">
                                  <h5>Common Stock Details</h5>
                                  <label className="form-label">
                                    Company Valuation <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control mb-3 ${errors.common_stock_valuation ? "is-invalid" : ""}`}
                                    value={formData.common_stock_valuation || ""}
                                    onChange={(e) => handleInputChange("common_stock_valuation", e.target.value)}
                                    placeholder="Enter company valuation"
                                  />
                                  {errors.common_stock_valuation && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.common_stock_valuation}
                                    </div>
                                  )}

                                  <div className="form-check mb-3">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="hasWarrants"
                                      checked={formData.hasWarrants || false}
                                      onChange={(e) => handleInputChange("hasWarrants", e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="hasWarrants">
                                      Add Warrants (optional)
                                    </label>
                                  </div>

                                  {formData.hasWarrants && (
                                    <>
                                      <label className="form-label">Exercise Price (Strike Price)</label>
                                      <input
                                        type="number"
                                        className="form-control mb-3"
                                        value={formData.exercisePrice || ""}
                                        onChange={(e) => handleInputChange("exercisePrice", e.target.value)}
                                        placeholder="Enter exercise price"
                                      />

                                      <label className="form-label">Expiration Date</label>
                                      <input
                                        type="date"
                                        className="form-control mb-3"
                                        value={formData.expirationDate || ""}
                                        onChange={(e) => handleInputChange("expirationDate", e.target.value)}
                                      />

                                      <label className="form-label">Warrant Ratio</label>
                                      <input
                                        type="text"
                                        className="form-control mb-3"
                                        value={formData.warrantRatio || ""}
                                        onChange={(e) => handleInputChange("warrantRatio", e.target.value)}
                                        placeholder="e.g., 1:1"
                                      />

                                      <label className="form-label">Type of Warrant</label>
                                      <select
                                        className="form-control mb-3"
                                        value={formData.warrantType || "CALL"}
                                        onChange={(e) => handleInputChange("warrantType", e.target.value)}
                                      >
                                        <option value="CALL">Call Warrant (buy shares)</option>
                                        <option value="PUT">Put Warrant (sell shares)</option>
                                      </select>
                                    </>
                                  )}
                                </div>
                              )} */}

                              {formData.instrumentType === "test" && (
                                <div className="mt-3 p-3 border rounded bg-light">
                                  <h5>Preferred Equity Details</h5>

                                  {/* ========== WARRANT SECTION ========== */}
                                  <div className="border-top pt-3 mt-3">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                      <h6 className="mb-0">Warrant Details (Optional)</h6>
                                      <div className="form-check form-switch">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="hasWarrants_preferred"
                                          checked={formData.hasWarrants_preferred || false}
                                          onChange={(e) => {
                                            const checked = e.target.checked;
                                            handleInputChange("hasWarrants_preferred", checked);

                                            // Reset warrant fields if unchecked
                                            if (!checked) {
                                              handleInputChange("warrant_coverage_percentage", "");
                                              handleInputChange("warrant_exercise_type", "next_round_adjusted");
                                              handleInputChange("warrant_adjustment_percent", "");
                                              handleInputChange("warrant_adjustment_direction", "decrease");
                                              handleInputChange("expirationDate_preferred", "");
                                              handleInputChange("warrant_notes", "");
                                            }
                                          }}
                                        />
                                        <label className="form-check-label" htmlFor="hasWarrants_preferred">
                                          Include Warrants with this investment
                                        </label>
                                      </div>
                                    </div>

                                    {formData.hasWarrants_preferred && (
                                      <>
                                        {/* Alert - Important Info */}
                                        <div className="alert alert-info mb-4">
                                          <i className="bi bi-info-circle me-2"></i>
                                          <strong>About Warrants:</strong> Warrants will be exercised in the next priced equity round.
                                          Exercise price and shares will be calculated automatically at that time.
                                        </div>

                                        {/* 🔹 WARRANT COVERAGE PERCENTAGE */}
                                        <div className="row mb-4">
                                          <div className="col-md-6">
                                            <label className="form-label">
                                              Warrant Coverage Percentage (%)
                                              <span className="text-danger ms-1">*</span>
                                              <span className="tooltip-icon ms-2" tabIndex={0}>
                                                <img
                                                  className="blackdark"
                                                  width="15"
                                                  height="15"
                                                  src="/assets/user/images/question.png"
                                                  alt="Tip"
                                                />
                                                <div className="tooltip-text tool-test-white text-white" role="tooltip">
                                                  <strong>What it is:</strong> Percentage of new shares issued in the NEXT priced round that will be allocated as warrant shares.
                                                  <br /><br />
                                                  <strong>Example:</strong> If Series B issues 50,000 new shares and warrant coverage is 20%, then 10,000 warrant shares will be created.
                                                </div>
                                              </span>
                                            </label>
                                            <div className="input-group">
                                              <input
                                                type="number"
                                                className={`form-control ${errors.warrant_coverage_percentage ? "is-invalid" : ""}`}
                                                value={formData.warrant_coverage_percentage || ""}
                                                onChange={(e) => {
                                                  handleInputChange("warrant_coverage_percentage", e.target.value);
                                                  if (errors.warrant_coverage_percentage) {
                                                    setErrors(prev => ({ ...prev, warrant_coverage_percentage: "" }));
                                                  }
                                                }}
                                                placeholder="e.g., 20"
                                                min="0"
                                                max="100"
                                                step="0.1"
                                              />
                                              <span className="input-group-text">%</span>
                                            </div>
                                            {errors.warrant_coverage_percentage && (
                                              <div className="text-danger small mt-1">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {errors.warrant_coverage_percentage}
                                              </div>
                                            )}
                                            <small className="text-muted d-block mt-1">
                                              Percentage of next round's new shares that become warrant shares
                                            </small>
                                          </div>
                                        </div>

                                        {/* 🔹 WARRANT EXERCISE TYPE */}
                                        <div className="row mb-4">
                                          <div className="col-md-12">
                                            <label className="form-label">
                                              Warrant Exercise Price Method
                                              <span className="text-danger ms-1">*</span>
                                            </label>
                                            <div className="border rounded p-3 bg-white">
                                              {/* Option 1: Fixed Price (Disabled as per client requirements) */}
                                              <div className="form-check mb-3 opacity-50">
                                                <input
                                                  className="form-check-input"
                                                  type="radio"
                                                  name="warrant_exercise_type"
                                                  id="exerciseTypeFixed"
                                                  value="fixed"
                                                  disabled
                                                  checked={formData.warrant_exercise_type === "fixed"}
                                                />
                                                <label className="form-check-label" htmlFor="exerciseTypeFixed">
                                                  <strong>Fixed Price</strong> (Not available)
                                                  <div className="small text-muted">
                                                    Exercise at a predetermined fixed price - Not supported per client requirements
                                                  </div>
                                                </label>
                                              </div>

                                              {/* Option 2: Next Round Price (No Adjustment) */}
                                              <div className="form-check mb-3">
                                                <input
                                                  className="form-check-input"
                                                  type="radio"
                                                  name="warrant_exercise_type"
                                                  id="exerciseTypeNextRound"
                                                  value="next_round"
                                                  checked={formData.warrant_exercise_type === "next_round"}
                                                  onChange={(e) => {
                                                    handleInputChange("warrant_exercise_type", e.target.value);
                                                    // Clear adjustment fields
                                                    handleInputChange("warrant_adjustment_percent", "");
                                                    if (errors.warrant_exercise_type) {
                                                      setErrors(prev => ({ ...prev, warrant_exercise_type: "" }));
                                                    }
                                                  }}
                                                />
                                                <label className="form-check-label" htmlFor="exerciseTypeNextRound">
                                                  <strong>Next Priced Round Price</strong> (No Adjustment)
                                                  <div className="small text-muted">
                                                    Exercise at the exact share price of the next priced equity round
                                                  </div>
                                                </label>
                                              </div>

                                              {/* Option 3: Next Round Price with Adjustment (DEFAULT) */}
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input"
                                                  type="radio"
                                                  name="warrant_exercise_type"
                                                  id="exerciseTypeAdjusted"
                                                  value="next_round_adjusted"
                                                  checked={formData.warrant_exercise_type === "next_round_adjusted" || !formData.warrant_exercise_type}
                                                  onChange={(e) => {
                                                    handleInputChange("warrant_exercise_type", e.target.value);
                                                    if (errors.warrant_exercise_type) {
                                                      setErrors(prev => ({ ...prev, warrant_exercise_type: "" }));
                                                    }
                                                  }}
                                                />
                                                <label className="form-check-label" htmlFor="exerciseTypeAdjusted">
                                                  <strong>Next Priced Round Price ± Adjustment</strong> (Recommended)
                                                  <div className="small text-muted">
                                                    Exercise at next round price, adjusted by a percentage increase or decrease
                                                  </div>
                                                </label>
                                              </div>
                                            </div>

                                            {errors.warrant_exercise_type && (
                                              <div className="text-danger small mt-1">
                                                <i className="bi bi-exclamation-circle me-1"></i>
                                                {errors.warrant_exercise_type}
                                              </div>
                                            )}
                                          </div>
                                        </div>

                                        {/* 🔹 ADJUSTMENT PERCENTAGE (Only if adjusted type selected) */}
                                        {formData.warrant_exercise_type === "next_round_adjusted" && (
                                          <div className="row mb-4">
                                            <div className="col-md-6">
                                              <label className="form-label">
                                                Adjustment Direction & Percentage
                                                <span className="text-danger ms-1">*</span>
                                              </label>
                                              <div className="input-group">
                                                <select
                                                  className={`form-select ${errors.warrant_adjustment_direction ? "is-invalid" : ""}`}
                                                  style={{ maxWidth: "140px" }}
                                                  value={formData.warrant_adjustment_direction || "decrease"}
                                                  onChange={(e) => {
                                                    handleInputChange("warrant_adjustment_direction", e.target.value);
                                                    if (errors.warrant_adjustment_direction) {
                                                      setErrors(prev => ({ ...prev, warrant_adjustment_direction: "" }));
                                                    }
                                                  }}
                                                >
                                                  <option value="decrease">Decrease by</option>
                                                  <option value="increase">Increase by</option>
                                                </select>
                                                <input
                                                  type="number"
                                                  className={`form-control ${errors.warrant_adjustment_percent ? "is-invalid" : ""}`}
                                                  value={formData.warrant_adjustment_percent || ""}
                                                  onChange={(e) => {
                                                    handleInputChange("warrant_adjustment_percent", e.target.value);
                                                    if (errors.warrant_adjustment_percent) {
                                                      setErrors(prev => ({ ...prev, warrant_adjustment_percent: "" }));
                                                    }
                                                  }}
                                                  placeholder="e.g., 20"
                                                  min="0"
                                                  max="100"
                                                  step="0.1"
                                                />
                                                <span className="input-group-text">%</span>
                                              </div>
                                              {(errors.warrant_adjustment_direction || errors.warrant_adjustment_percent) && (
                                                <div className="text-danger small mt-1">
                                                  <i className="bi bi-exclamation-circle me-1"></i>
                                                  {errors.warrant_adjustment_direction || errors.warrant_adjustment_percent}
                                                </div>
                                              )}
                                              <small className="text-muted d-block mt-1">
                                                Adjust the next round's share price by this percentage
                                              </small>
                                            </div>

                                            {/* Example Calculation */}
                                            <div className="col-md-6">
                                              <label className="form-label">Example Calculation</label>
                                              <div className="form-control bg-light">
                                                {formData.warrant_adjustment_percent ? (
                                                  <small>
                                                    If next round price = <strong>$10.00</strong><br />
                                                    Adjustment = <strong>{formData.warrant_adjustment_percent}%</strong> {formData.warrant_adjustment_direction}
                                                    <br />
                                                    <strong>→ Exercise price = ${
                                                      formData.warrant_adjustment_direction === "decrease"
                                                        ? (10 * (1 - formData.warrant_adjustment_percent / 100)).toFixed(2)
                                                        : (10 * (1 + formData.warrant_adjustment_percent / 100)).toFixed(2)
                                                    }</strong>
                                                  </small>
                                                ) : (
                                                  <small className="text-muted">Enter adjustment % to see example</small>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {/* 🔹 EXPIRATION DATE */}
                                        <div className="row mb-4">
                                          <div className="col-md-6">
                                            <label className="form-label">
                                              Warrant Expiration Date (Optional)
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              value={formData.expirationDate_preferred || ""}
                                              onChange={(e) => handleInputChange("expirationDate_preferred", e.target.value)}
                                            />
                                            <small className="text-muted d-block mt-1">
                                              If not specified, warrants will expire in 10 years from issuance
                                            </small>
                                          </div>
                                        </div>

                                        {/* 🔹 WARRANT NOTES */}
                                        <div className="row mb-4">
                                          <div className="col-md-12">
                                            <label className="form-label">Additional Warrant Terms (Optional)</label>
                                            <textarea
                                              className="form-control"
                                              rows="3"
                                              value={formData.warrant_notes || ""}
                                              onChange={(e) => handleInputChange("warrant_notes", e.target.value)}
                                              placeholder="Enter any additional terms or conditions for these warrants..."
                                            />
                                            <small className="text-muted d-block mt-1">
                                              Any special conditions, vesting schedules, or restrictions
                                            </small>
                                          </div>
                                        </div>

                                        {/* 🔹 WARRANT SUMMARY */}
                                        <div className="alert alert-success">
                                          <h6 className="fw-bold mb-2">
                                            <i className="bi bi-check-circle me-2"></i>
                                            Warrant Terms Summary
                                          </h6>
                                          <ul className="mb-0 small">
                                            <li>
                                              <strong>Coverage:</strong> {formData.warrant_coverage_percentage || "___"}% of next round's new shares
                                            </li>
                                            <li>
                                              <strong>Exercise Method:</strong>{" "}
                                              {formData.warrant_exercise_type === "next_round"
                                                ? "At next priced round price (no adjustment)"
                                                : formData.warrant_exercise_type === "next_round_adjusted"
                                                  ? `At next priced round price ${formData.warrant_adjustment_direction === "decrease" ? "minus" : "plus"} ${formData.warrant_adjustment_percent || "___"}%`
                                                  : "Not selected"}
                                            </li>
                                            <li>
                                              <strong>Exercise Timing:</strong> Warrants will be exercised automatically in the next priced equity round
                                            </li>
                                            <li>
                                              <strong>Share Calculation:</strong> Number of warrant shares will be calculated when next round closes
                                            </li>
                                            <li>
                                              <strong>Dilution Effect:</strong> Warrant exercise will dilute all existing shareholders proportionally
                                            </li>
                                          </ul>
                                        </div>

                                        {/* Important Note */}
                                        <div className="alert alert-warning">
                                          <strong>⚠️ Important:</strong> The exact number of warrant shares and exercise price will be calculated automatically when the next priced equity round is created. This ensures accurate pricing based on the actual next round terms.
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}

                              {formData.instrumentType === "Safe" && (
                                <div className="mt-3 p-3 border rounded bg-light">
                                  <h5>SAFE Details</h5>
                                  <label className="form-label">
                                    Valuation Cap <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <NumericFormat
                                    className={`form-control mb-3 ${errors.valuationCap ? "is-invalid" : ""}`}
                                    placeholder="Enter valuation cap"
                                    value={formData.valuationCap || ""}
                                    thousandSeparator={true}
                                    allowNegative={false}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    onValueChange={(values) => {
                                      handleInputChange("valuationCap", values.value);

                                      if (errors.valuationCap) {
                                        setErrors(prev => ({
                                          ...prev,
                                          valuationCap: ""
                                        }));
                                      }
                                    }}
                                  />

                                  {errors.valuationCap && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.valuationCap}
                                    </div>
                                  )}

                                  <label className="form-label">
                                    Conversion Discount: (%) <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <NumericFormat
                                    decimalScale={2}        // 2 decimal places
                                    fixedDecimalScale       // hamesha .00 show kare
                                    allowNegative={false}   // negative values allow nahi
                                    placeholder="Enter Conversion Discount: (10-25%)"
                                    value={formData.discountRate || ""}
                                    onValueChange={(values) => {
                                      handleInputChange("discountRate", values.value);

                                      if (errors.discountRate) {
                                        setErrors((prev) => ({
                                          ...prev,
                                          discountRate: "",
                                        }));
                                      }
                                    }}
                                    className={`form-control mb-3 ${errors.discountRate ? "is-invalid" : ""}`}
                                  />

                                  {errors.discountRate && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.discountRate}
                                    </div>
                                  )}

                                  {/* <label className="form-label">
                                    SAFE Type <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <div className="form-check mb-2">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      id="preMoney"
                                      name="safeType"
                                      value="PRE_MONEY"
                                      checked={formData.safeType === "PRE_MONEY"}
                                      onChange={(e) => handleInputChange("safeType", e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="preMoney">
                                      Pre-Money SAFE
                                    </label>
                                  </div>
                                  <div className="form-check mb-3">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      id="postMoney"
                                      name="safeType"
                                      value="POST_MONEY"
                                      checked={formData.safeType === "POST_MONEY"}
                                      onChange={(e) => handleInputChange("safeType", e.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="postMoney">
                                      Post-Money SAFE
                                    </label>
                                  </div> */}
                                  {/* {errors.safeType && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.safeType}
                                    </div>
                                  )} */}
                                </div>
                              )}

                              {formData.instrumentType === "Convertible Note" && (
                                <div className="mt-3 p-3 border rounded bg-light">
                                  <h5>Convertible Note Details</h5>
                                  <label className="form-label">
                                    Valuation Cap <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <NumericFormat
                                    thousandSeparator
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    placeholder="Enter valuation cap"
                                    value={formData.valuationCap_note || ""}
                                    onValueChange={(values) => {
                                      handleInputChange("valuationCap_note", values.value);

                                      if (errors.valuationCap_note) {
                                        setErrors((prev) => ({
                                          ...prev,
                                          valuationCap_note: "",
                                        }));
                                      }
                                    }}
                                    className={`form-control mb-3 ${errors.valuationCap_note ? "is-invalid" : ""}`}
                                  />


                                  {errors.valuationCap_note && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.valuationCap_note}
                                    </div>
                                  )}

                                  <label className="form-label">
                                    Conversion Discount  (%) <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <NumericFormat
                                    decimalScale={2}        // 2 decimal places
                                    fixedDecimalScale       // hamesha .00 show kare
                                    allowNegative={false}   // negative values block
                                    placeholder="Enter Conversion Discount (10–30%)"
                                    value={formData.discountRate_note || ""}
                                    onValueChange={(values) => {
                                      handleInputChange("discountRate_note", values.value);

                                      if (errors.discountRate_note) {
                                        setErrors((prev) => ({
                                          ...prev,
                                          discountRate_note: "",
                                        }));
                                      }
                                    }}
                                    className={`form-control mb-3 ${errors.discountRate_note ? "is-invalid" : ""}`}
                                  />

                                  {errors.discountRate_note && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.discountRate_note}
                                    </div>
                                  )}

                                  <label className="form-label">Maturity Date</label>
                                  <input
                                    type="date"
                                    className={`form-control mb-3 ${errors.maturityDate ? "is-invalid" : ""}`}
                                    value={formData.maturityDate || ""}
                                    onChange={(e) => handleInputChange("maturityDate", e.target.value)}
                                  />
                                  {errors.maturityDate && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.maturityDate}
                                    </div>
                                  )}

                                  <label className="form-label">Interest Rate (%)</label>
                                  <NumericFormat
                                    thousandSeparator
                                    decimalScale={2}      // 2 decimal places
                                    fixedDecimalScale     // hamesha 2 decimal dikhaye
                                    allowNegative={false} // negative values allow nahi
                                    placeholder="Enter annual interest rate"
                                    value={formData.interestRate_note || ""}
                                    onValueChange={(values) => {
                                      handleInputChange("interestRate_note", values.value);

                                      if (errors.interestRate_note) {
                                        setErrors((prev) => ({
                                          ...prev,
                                          interestRate_note: "",
                                        }));
                                      }
                                    }}
                                    className={`form-control mb-3 ${errors.interestRate_note ? "is-invalid" : ""}`}
                                  />

                                  {errors.interestRate_note && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.interestRate_note}
                                    </div>
                                  )}

                                  {/* <label className="form-label">
                                    Convertible Trigger <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <select
                                    className={`form-control mb-3 ${errors.convertibleTrigger ? "is-invalid" : ""}`}
                                    value={formData.convertibleTrigger || ""}
                                    onChange={(e) => handleInputChange("convertibleTrigger", e.target.value)}
                                  >
                                    <option value="">Select trigger event</option>
                                    <option value="QUALIFIED_FINANCING">Qualified Equity Financing</option>
                                    <option value="ACQUISITION_IPO">Acquisition or IPO</option>
                                    <option value="MATURITY_DATE">Reaching Maturity Date</option>
                                  </select>
                                  {errors.convertibleTrigger && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.convertibleTrigger}
                                    </div>
                                  )} */}
                                </div>
                              )}

                              {formData.instrumentType === "Venture/Bank DEBT" && (
                                <div className="mt-3 p-3 border rounded bg-light">
                                  <h5>Venture/Bank Debt Details</h5>
                                  <label className="form-label">
                                    Interest Rate (%) <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control mb-3 ${errors.interestRate ? "is-invalid" : ""}`}
                                    value={formData.interestRate || ""}
                                    onChange={(e) => handleInputChange("interestRate", e.target.value)}
                                    placeholder="Enter interest rate"
                                  />
                                  {errors.interestRate && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.interestRate}
                                    </div>
                                  )}

                                  <label className="form-label">
                                    Repayment Schedule (months) <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control mb-3 ${errors.repaymentSchedule ? "is-invalid" : ""}`}
                                    value={formData.repaymentSchedule || ""}
                                    onChange={(e) => handleInputChange("repaymentSchedule", e.target.value)}
                                    placeholder="Enter repayment schedule in months"
                                  />
                                  {errors.repaymentSchedule && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.repaymentSchedule}
                                    </div>
                                  )}

                                  <div className="form-check mb-3">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="hasWarrants_Bank"
                                      checked={formData.hasWarrants_Bank || false}
                                      onChange={(e) => handleInputChange("hasWarrants_Bank", e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="hasWarrants_Bank">
                                      Add Warrants (optional)
                                    </label>
                                  </div>

                                  {formData.hasWarrants_Bank && (
                                    <>
                                      <label className="form-label">Exercise Price (Strike Price)</label>
                                      <input
                                        type="number"
                                        className="form-control mb-3"
                                        value={formData.exercisePrice_bank || ""}
                                        onChange={(e) => handleInputChange("exercisePrice_bank", e.target.value)}
                                        placeholder="Enter exercise price"
                                      />

                                      <label className="form-label">Expiration Date</label>
                                      <input
                                        type="date"
                                        className="form-control mb-3"
                                        value={formData.exercisedate_bank || ""}
                                        onChange={(e) => handleInputChange("exercisedate_bank", e.target.value)}
                                      />

                                      <label className="form-label">Warrant Ratio</label>
                                      <input
                                        type="text"
                                        className="form-control mb-3"
                                        value={formData.warrantRatio_bank || ""}
                                        onChange={(e) => handleInputChange("warrantRatio_bank", e.target.value)}
                                        placeholder="e.g., 1:1"
                                      />

                                      <label className="form-label">Type of Warrant</label>
                                      <select
                                        className="form-control mb-3"
                                        value={formData.warrantType_bank || "CALL"}
                                        onChange={(e) => handleInputChange("warrantType_bank", e.target.value)}
                                      >
                                        <option value="CALL">Call Warrant (buy shares)</option>
                                        <option value="PUT">Put Warrant (sell shares)</option>
                                      </select>
                                    </>
                                  )}
                                </div>
                              )}

                              {/* Conditional OTHER input */}
                              {formData.instrumentType === "OTHER" && (
                                <div className="mb-4">
                                  <label className="form-label fw-semibold">
                                    Custom Investment Instrument Name
                                    <span className="text-danger fs-5 ms-1">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Enter custom investment instrument name"
                                    value={formData.customInstrument || ""}
                                    onChange={(e) => handleInputChange("customInstrument", e.target.value)}
                                    className={`form-control ${errors.customInstrument ? "is-invalid" : ""}`}
                                    maxLength={30}
                                  />
                                  <div className="form-text">
                                    {formData.customInstrument ? formData.customInstrument.length : 0}/30 characters
                                  </div>
                                  {errors.customInstrument && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.customInstrument}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Navigation buttons */}
                              <div className="d-flex justify-content-between pt-3 border-top gap-2">
                                <button
                                  className="close_btn w-fit"
                                  onClick={() => navigateToSection('prev')}
                                >
                                  <i className="bi bi-arrow-left me-2"></i>Back
                                </button>
                                <button
                                  className="global_btn w-fit"
                                  onClick={() => {
                                    const newErrors = {};

                                    // Validate instrument type
                                    if (!formData.instrumentType) {
                                      newErrors.instrumentType = "Please select an investment instrument type";
                                    }

                                    if (formData.instrumentType === "OTHER") {
                                      if (!formData.customInstrument) {
                                        newErrors.customInstrument = "This field is required";
                                      }
                                    }

                                    // Conditional validations per instrument
                                    switch (formData.instrumentType) {
                                      case "Preferred Equity":
                                        // ✅ WARRANT VALIDATION (only if warrants are enabled)
                                        // if (formData.hasWarrants_preferred) {

                                        //   if (!formData.warrant_coverage_percentage || formData.warrant_coverage_percentage <= 0) {
                                        //     newErrors.warrant_coverage_percentage = "Warrant coverage percentage is required and must be greater than 0";
                                        //   } else if (formData.warrant_coverage_percentage > 100) {
                                        //     newErrors.warrant_coverage_percentage = "Warrant coverage cannot exceed 100%";
                                        //   }


                                        //   if (!formData.warrant_exercise_type) {
                                        //     newErrors.warrant_exercise_type = "Please select a warrant exercise method";
                                        //   }


                                        //   if (formData.warrant_exercise_type === "next_round_adjusted") {
                                        //     if (!formData.warrant_adjustment_percent || formData.warrant_adjustment_percent <= 0) {
                                        //       newErrors.warrant_adjustment_percent = "Adjustment percentage is required when using adjusted exercise price";
                                        //     } else if (formData.warrant_adjustment_percent > 100) {
                                        //       newErrors.warrant_adjustment_percent = "Adjustment percentage cannot exceed 100%";
                                        //     }

                                        //     if (!formData.warrant_adjustment_direction) {
                                        //       newErrors.warrant_adjustment_direction = "Please select increase or decrease";
                                        //     }
                                        //   }
                                        // }
                                        break;

                                      case "Safe":
                                        if (formData.instrumentType === "Safe") {
                                          if (!formData.valuationCap) newErrors.valuationCap = "This field is required";
                                          if (!formData.discountRate) newErrors.discountRate = "This field is required";
                                        }
                                        break;

                                      case "Convertible Note":
                                        if (formData.instrumentType === "Convertible Note") {
                                          if (!formData.valuationCap_note) newErrors.valuationCap_note = "This field is required";
                                          if (!formData.discountRate_note) newErrors.discountRate_note = "This field is required";
                                          if (!formData.maturityDate) newErrors.maturityDate = "This field is required";
                                          if (!formData.interestRate_note) newErrors.interestRate_note = "This field is required";
                                        }
                                        break;

                                      case "Venture/Bank DEBT":
                                        if (!formData.repaymentSchedule) newErrors.repaymentSchedule = "This field is required";
                                        if (!formData.interestRate) newErrors.interestRate = "This field is required";
                                        break;

                                      default:
                                        break;
                                    }

                                    if (Object.keys(newErrors).length === 0) {
                                      setErrors({});
                                      navigateToSection('next');
                                    } else {
                                      setErrors(newErrors);
                                      setTimeout(() => {
                                        const firstErrorElement = document.querySelector(".is-invalid");
                                        if (firstErrorElement) {
                                          firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
                                        }
                                      }, 100);
                                    }
                                  }}
                                >
                                  Save and Continue
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      {/* Description Section */}
                      {activeSection === "description" && (
                        <div className="section-content p-4 border rounded-3 shadow-sm bg-white">
                          {/* Show previous section data */}
                          <PreviousSection
                            formData={formData}
                            otherText={otherText}
                            selected={selected}
                            visibleFields={["shareclass",
                              "description",
                              "instrument",
                              "roundsize",
                              "issuedshares",]}
                            isFirstRound={isFirstRound}
                            foundersData={foundersData}
                            calculateTotalShares={calculateTotalShares}
                            calculateTotalValue={calculateTotalValue}
                            founderCount={founderCount}
                          />

                          <div className="mb-4">
                            <label className="form-label fw-semibold">
                              Description{" "}
                              <span className="tooltip-icon ms-2" tabIndex={0}>
                                <img
                                  className="blackdark"
                                  width="15"
                                  height="15"
                                  src="/assets/user/images/question.png"
                                  alt="Tip"
                                />
                                <div
                                  className="tooltip-text tool-test-white text-white"
                                  role="tooltip"
                                >
                                  <div className="d-flex flex-column gap-2">
                                    <p> <strong>What it is:</strong> A strategic
                                      summary that links the equity class to its
                                      purpose, issuance context, and recipient
                                      group.</p>
                                    <p><strong>Why it matters:</strong> Investors use
                                      this to understand the logic behind each
                                      class, e.g. who holds it, under what
                                      conditions it was granted.</p>
                                    <div className="d-flex flex-column gap-1">
                                      <p> <strong>How to fill it:</strong> Detail the
                                        rationale and stakeholders behind issuance.
                                        Think of this as the why behind the class.
                                        For example:</p>
                                      <ul>
                                        <li>
                                          <p>– Reserved for key hires under Employee
                                            Stock Option Pool</p>
                                        </li>
                                        <li>
                                          <p>– Issued to seed investors during SAFE
                                            conversion in 2022</p>
                                        </li>
                                        <li>
                                          <p>– Created for strategic Gulf partner
                                            with board observer rights</p>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>

                                </div>
                              </span>
                              <span style={{ color: "var(--primary)" }}>*</span>
                            </label>
                            <textarea
                              placeholder="Enter the strategic description of your round..."
                              className={`textarea_input ${errors.description ? "is-invalid" : ""
                                }`}
                              rows="6"
                              value={formData.description}
                              onChange={(e) => {
                                handleInputChange(
                                  "description",
                                  e.target.value
                                );
                                if (errors.description)
                                  setErrors((prev) => ({
                                    ...prev,
                                    description: "",
                                  }));
                              }}
                            />
                            {errors.description && (
                              <div className="text-danger small mt-1">
                                <i className="bi bi-exclamation-circle me-1"></i>
                                {errors.description}
                              </div>
                            )}
                          </div>

                          <div className="d-flex justify-content-between pt-3 w-100 border-top gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => navigateToSection('prev')}
                            >
                              <i className="bi bi-arrow-left me-2"></i>Back
                            </button>
                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                if (!formData.description) {
                                  setErrors({
                                    ...errors,
                                    description: "This field is required",
                                  });
                                } else {
                                  setErrors({ ...errors, description: "" });
                                  navigateToSection('next');
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}



                      {/* Round Size Section */}
                      {activeSection === "roundsize" && (
                        <div className="section-content p-4 border rounded-3 shadow-sm bg-white">
                          <PreviousSection
                            formData={formData}
                            otherText={otherText}
                            selected={selected}
                            visibleFields={[
                              "shareclass",
                              "description",
                              "instrument",
                              "roundsize",
                              "issuedshares",
                            ]}
                            isFirstRound={isFirstRound}
                            foundersData={foundersData}
                            calculateTotalShares={calculateTotalShares}
                            calculateTotalValue={calculateTotalValue}
                            founderCount={founderCount}
                          />

                          <h3 className="h5 mb-4 text-gray-800">
                            {isFirstRound ? "Round 0 - Company Valuation" : "Round Size"}
                          </h3>

                          {/* ROUND 0 - Show different content */}
                          {isFirstRound ? (
                            <div className="round-zero-content">
                              <div className="alert alert-info mb-4">
                                <strong>Round 0 Information:</strong> This is your company's incorporation round.
                                The valuation is based on the share allocation and price per share from your incorporation documents.
                              </div>

                              {/* Round 0 Valuation Display */}
                              <div className="calculation-results p-4 border rounded bg-light mb-4">
                                <h5>Round 0 - Incorporation Valuation</h5>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <strong>Total Shares Issued:</strong> {calculateTotalShares().toLocaleString()}
                                    </div>
                                    <div className="mb-3">
                                      <strong>Price Per Share:</strong> ${formData.pricePerShare || '0.00'}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <strong>Total Company Value:</strong> ${calculateTotalValue()}
                                    </div>
                                    <div className="mb-3">
                                      <strong>Number of Founders:</strong> {founderCount}
                                    </div>
                                  </div>
                                </div>

                                {/* Note about Round 0 valuation */}
                                <div className="alert alert-warning mt-3 mb-0">
                                  <small>
                                    <strong>Note:</strong> This valuation is for incorporation purposes only and will not carry over to future investment rounds.
                                    Each subsequent round will calculate its own price per share based on investment size and pre-money valuation.
                                  </small>
                                </div>
                              </div>

                              {/* Round 0 specific information */}
                              <div className="mt-4 p-3 bg-light rounded">
                                <h6>About Round 0 Valuation:</h6>
                                <ul className="mb-0">
                                  <li>Based on incorporation documents and initial share allocation</li>
                                  <li>Price per share is the par value from your incorporation</li>
                                  <li>This valuation represents the initial capital contribution by founders</li>
                                  <li>Future rounds will calculate price per share based on investment and valuation inputs</li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            /* OTHER ROUNDS - Show original round size fields */
                            <div className="investment-round-content">
                              <div className="row align-items-start">
                                {/* Investment Amount */}
                                <div className="col-md-5 mb-4">
                                  <label className="form-label fw-semibold">
                                    Investment Amount{" "}({CurrDisplay})
                                    <span className="text-danger fs-5 ms-1">*</span>
                                  </label>
                                  <NumericFormat
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    allowNegative={false}
                                    placeholder="Enter amount"
                                    value={formData.roundsize}
                                    onValueChange={(values) => {
                                      handleInputChange("roundsize", values.value);
                                      if (errors.roundsize) {
                                        setErrors((prev) => ({
                                          ...prev,
                                          roundsize: "",
                                        }));
                                      }
                                    }}
                                    className={`textarea_input ${errors.roundsize ? "is-invalid" : ""}`}
                                  />
                                  {errors.roundsize && (
                                    <div className="text-danger small mt-1">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.roundsize}
                                    </div>
                                  )}
                                </div>

                                {/* Currency */}
                                <div className="col-md-2 mb-4">
                                  <label className="form-label fw-semibold">
                                    Currency <span className="text-danger fs-5 ms-1">*</span>
                                  </label>
                                  <select
                                    className={`textarea_input ${errors.currency ? "is-invalid" : ""}`}
                                    value={formData.currency}
                                    onChange={(e) => {
                                      handleInputChange("currency", e.target.value);
                                      if (errors.currency) {
                                        setErrors((prev) => ({
                                          ...prev,
                                          currency: "",
                                        }));
                                      }
                                    }}
                                  >
                                    <option value="">-- Select Currency --</option>
                                    {countrySymbolList.map((item) => (
                                      <option
                                        key={item.id}
                                        value={`${item.currency_code} ${item.currency_symbol}`}
                                      >
                                        {item.currency_code} {item.currency_symbol}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.currency && (
                                    <div className="text-danger small mt-1">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.currency}
                                    </div>
                                  )}
                                </div>
                                {/* ✅ Correct Condition */}
                                {/* {
                                  !selected?.includes("Series") &&
                                  formData.instrumentType !== 'Safe' &&
                                  formData.instrumentType !== 'Convertible Note' && formData.instrumentType !== 'Preferred Equity' && (
                                    <div className="col-md-5 mb-4">
                                      <label className="form-label fw-semibold">
                                        Investor Post-Money Ownership(%)
                                      </label>
                                      <NumericFormat
                                        thousandSeparator={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        disabled
                                        allowNegative={false}
                                        placeholder="Enter investor post-money ownership"
                                        value={formData.investorPostMoney || ""}
                                        onValueChange={(values) => {
                                          handleInputChange("investorPostMoney", values.value);
                                          if (errors.investorPostMoney) {
                                            setErrors((prev) => ({
                                              ...prev,
                                              investorPostMoney: "",
                                            }));
                                          }
                                        }}
                                        className={`form-control ${errors.investorPostMoney ? "is-invalid" : ""}`}
                                      />
                                      {errors.investorPostMoney && (
                                        <div className="text-danger small mt-1">
                                          <i className="bi bi-exclamation-circle me-1"></i>
                                          {errors.investorPostMoney}
                                        </div>
                                      )}
                                    </div>
                                  )
                                } */}



                                <div className="col-md-6 mb-4">
                                  <label className="form-label fw-semibold"> {(formData.instrumentType === "Safe" || formData.instrumentType === "Convertible Note") ? "Company Valuation" : "Pre-Money Valuation"} {" "} ({CurrDisplay})</label>
                                  <NumericFormat
                                    thousandSeparator
                                    decimalScale={2}
                                    fixedDecimalScale
                                    allowNegative={false}
                                    placeholder="Enter pre-money valuation"
                                    value={formData.pre_money}
                                    onValueChange={(values) => {
                                      handleInputChange("pre_money", values.value);
                                      setFormData((prev) => ({
                                        ...prev,
                                        isPostEntered: false,
                                      }));
                                    }}
                                    className="textarea_input"
                                  />
                                </div>



                                {(

                                  // Case 2: instrumentType 'Convertible Note' AND shareClassType is Seed/Pre-Seed/Post-Seed
                                  (formData.instrumentType !== 'Safe' || formData.instrumentType !== 'Convertible Note') &&

                                  // Case 3: instrumentType 'Convertible Note' AND selected includes "Series"
                                  ((formData.instrumentType === "OTHER") || (formData.instrumentType === "Common Stock") || (formData.instrumentType === "Preferred Equity"))
                                ) && (
                                    <div className="col-md-6 mb-4">
                                      <label className="form-label fw-semibold">Post-Money Valuation{" "}({CurrDisplay})</label>
                                      <NumericFormat
                                        thousandSeparator
                                        decimalScale={2}
                                        disabled
                                        fixedDecimalScale
                                        allowNegative={false}
                                        placeholder="Enter post-money valuation"
                                        value={formData.post_money}
                                        onValueChange={(values) => {
                                          handleInputChange("post_money", values.value);
                                          setFormData((prev) => ({
                                            ...prev,
                                            isPostEntered: true,
                                          }));
                                        }}
                                        className="textarea_input"
                                      />
                                    </div>
                                  )}

                                {/* Option Pool Percentage */}
                                <div className="row">
                                  {(
                                    (
                                      formData.instrumentType === "Common Stock") || (
                                      formData.instrumentType === "Preferred Equity") ||
                                    (
                                      formData.instrumentType === "Safe") || (formData.instrumentType === "OTHER") || (
                                      formData.instrumentType === "Convertible Note")
                                  ) && (

                                      <div className="col-md-6 mb-4">
                                        <label className="form-label fw-semibold">
                                          Pre-Money Option Pool (%)

                                          <i
                                            className="bi bi-info-circle text-muted ms-1"
                                            title={
                                              formData.instrumentType === 'Common Stock' || formData.instrumentType === 'Preferred Equity'
                                                ? "Carried over from previous round - This is the existing option pool percentage before Series A investment"
                                                : "Percentage of equity reserved for employees before this round"
                                            }
                                          ></i>
                                        </label>

                                        {formData.instrumentType === 'Common Stock' || formData.instrumentType === "Preferred Equity" ? (

                                          <>
                                            <NumericFormat
                                              thousandSeparator={true}
                                              decimalScale={2}
                                              fixedDecimalScale={true}
                                              allowNegative={false}
                                              placeholder="Enter option pool % (e.g. 10)"
                                              value={formData.optionPoolPercent}

                                              onValueChange={(values) => {
                                                handleInputChange("optionPoolPercent", values.floatValue);
                                              }}
                                              className="textarea_input"
                                            />
                                          </>
                                        ) : (
                                          // EDITABLE for Seed rounds
                                          <>
                                            <NumericFormat
                                              thousandSeparator={true}
                                              decimalScale={2}
                                              fixedDecimalScale={true}
                                              allowNegative={false}
                                              placeholder="Enter option pool % (e.g. 10)"
                                              value={formData.optionPoolPercent}
                                              onValueChange={(values) => {
                                                handleInputChange("optionPoolPercent", values.floatValue);
                                              }}
                                              className="textarea_input"
                                            />
                                            {/* <small className="text-muted d-block mt-1">
                                              Option pool percentage before investment (Pre-Money)
                                            </small> */}
                                          </>
                                        )}
                                      </div>





                                    )}
                                  {(
                                    (formData.instrumentType !== 'Safe' && formData.instrumentType !== "Convertible Note") || (formData.instrumentType === "Common Stock") ||
                                    ((formData.instrumentType === "Preferred Equity"))
                                  ) && (
                                      <div className="col-md-6 mb-4">
                                        <label className="form-label fw-semibold">
                                          {
                                            formData.instrumentType === "Preferred Equity"
                                              ? "Option Pool"
                                              : ["Common Stock"].includes(formData.instrumentType)
                                                ? "Post-Money Option Pool Target"
                                                : "Option Pool"
                                          } (%)


                                          <span className="text-danger ms-1">*</span>
                                          <i
                                            className="bi bi-info-circle text-muted ms-1"
                                            title="Target percentage of equity reserved for employees after this investment round. If higher than existing pool, additional shares will be created."
                                          ></i>
                                        </label>

                                        <NumericFormat
                                          suffix="%"
                                          decimalScale={2}
                                          fixedDecimalScale
                                          allowNegative={false}
                                          placeholder="Enter target pool % (e.g. 20)"
                                          value={formData.optionPoolPercent_post}
                                          onValueChange={(values) => {
                                            handleInputChange("optionPoolPercent_post", values.value);
                                          }}
                                          className="textarea_input"
                                        />
                                        {errors.optionPoolPercent_post && (
                                          <div className="text-danger small mt-1">
                                            <i className="bi bi-exclamation-circle me-1"></i>
                                            {errors.optionPoolPercent_post}
                                          </div>
                                        )}
                                        {formData.instrumentType !== 'Safe' && formData.instrumentType !== 'Convertible Note' && formData.instrumentType !== "Preferred Equity" && (
                                          <small className="text-muted d-block mt-1">
                                            Target option pool percentage after investment (Post-Money)
                                          </small>
                                        )}

                                        {formData.optionPoolPercent && formData.optionPoolPercent_post && (
                                          <>
                                            {(formData.instrumentType !== 'Safe' && formData.instrumentType !== 'Convertible Note' && formData.instrumentType !== "Preferred Equity") && (
                                              <div className="mt-2">
                                                {parseFloat(formData.optionPoolPercent_post) > parseFloat(formData.optionPoolPercent) ? (
                                                  <div className="alert alert-warning py-2 mb-0" style={{ fontSize: '0.85em' }}>
                                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                                    <strong>Top-up needed:</strong> Expanding pool from {formData.optionPoolPercent}% to {formData.optionPoolPercent_post}%
                                                    <br />
                                                    {/* <small className="text-muted">
                                                      Additional option shares will be created
                                                      {calculatedValues?.newOptionShares > 0 && (
                                                        <> (+{calculatedValues.newOptionShares.toLocaleString()} shares)</>
                                                      )}
                                                    </small> */}
                                                  </div>
                                                ) : parseFloat(formData.optionPoolPercent_post) === parseFloat(formData.optionPoolPercent) ? (
                                                  <div className="alert alert-info py-2 mb-0" style={{ fontSize: '0.85em' }}>
                                                    <i className="bi bi-info-circle-fill me-2"></i>
                                                    <strong>No change:</strong> Maintaining {formData.optionPoolPercent}% pool
                                                  </div>
                                                ) : (
                                                  <div className="alert alert-success py-2 mb-0" style={{ fontSize: '0.85em' }}>
                                                    <i className="bi bi-check-circle-fill me-2"></i>
                                                    <strong>No top-up needed:</strong> Existing {formData.optionPoolPercent}% pool is sufficient
                                                    <br />
                                                    <small className="text-muted">
                                                      No additional option shares will be created
                                                    </small>
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    )}
                                  {/* {formData.shareClassType === "Post-Seed" || formData.shareClassType === "Pre-Seed" || (formData.shareClassType === "Seed" && formData.instrumentType === 'Common Stock') && (
                                    <div className="col-md-6 mb-4">
                                      <label className="form-label fw-semibold">
                                        Post-Money Option Pool Targets (%)
                                        <span className="text-danger ms-1">*</span>
                                        <i
                                          className="bi bi-info-circle text-muted ms-1"
                                          title="Target percentage of equity reserved for employees after this investment round. If higher than existing pool, additional shares will be created."
                                        ></i>
                                      </label>

                                      <NumericFormat
                                        suffix="%"
                                        decimalScale={2}
                                        fixedDecimalScale
                                        allowNegative={false}
                                        placeholder="Enter target pool % (e.g. 20)"
                                        value={formData.optionPoolPercent_post}
                                        onValueChange={(values) => {
                                          handleInputChange("optionPoolPercent_post", values.value);
                                        }}
                                        className="textarea_input"
                                      />

                                      <small className="text-muted d-block mt-1">
                                        Target option pool percentage after investment (Post-Money)
                                      </small>
                                      {errors.optionPoolPercent_post && (
                                        <div className="text-danger small mt-1">
                                          <i className="bi bi-exclamation-circle me-1"></i>
                                          {errors.optionPoolPercent_post}
                                        </div>
                                      )}
                                      {formData.optionPoolPercent && formData.optionPoolPercent_post && (
                                        <div className="mt-2">
                                          {parseFloat(formData.optionPoolPercent_post) > parseFloat(formData.optionPoolPercent) ? (
                                            <div className="alert alert-warning py-2 mb-0" style={{ fontSize: '0.85em' }}>
                                              <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                              <strong>Top-up needed:</strong> Expanding pool from {formData.optionPoolPercent}% to {formData.optionPoolPercent_post}%
                                              <br />
                                              <small className="text-muted">
                                                Additional option shares will be created
                                                {calculatedValues?.newOptionShares > 0 && (
                                                  <> (+{calculatedValues.newOptionShares.toLocaleString()} shares)</>
                                                )}
                                              </small>
                                            </div>
                                          ) : parseFloat(formData.optionPoolPercent_post) === parseFloat(formData.optionPoolPercent) ? (
                                            <div className="alert alert-info py-2 mb-0" style={{ fontSize: '0.85em' }}>
                                              <i className="bi bi-info-circle-fill me-2"></i>
                                              <strong>No change:</strong> Maintaining {formData.optionPoolPercent}% pool
                                            </div>
                                          ) : (
                                            <div className="alert alert-success py-2 mb-0" style={{ fontSize: '0.85em' }}>
                                              <i className="bi bi-check-circle-fill me-2"></i>
                                              <strong>No top-up needed:</strong> Existing {formData.optionPoolPercent}% pool is sufficient
                                              <br />
                                              <small className="text-muted">
                                                No additional option shares will be created
                                              </small>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )} */}
                                </div>


                                {(() => {
                                  const isSafe = formData.instrumentType === 'Safe';
                                  const isCommon = formData.instrumentType === 'Common Stock';
                                  const isConvertibleNote = formData.instrumentType === 'Convertible Note';
                                  const isSeedType = ["Seed", "Pre-Seed", "Post-Seed"].includes(formData.shareClassType);
                                  const isSeriesType = selected?.includes("Series");

                                  // Hide if any of these conditions are true
                                  const shouldHide =
                                    (isCommon) ||
                                    (isSafe && isSeedType) ||     // Safe + Series types
                                    (isSafe && isSeriesType) ||
                                    (isConvertibleNote && isSeriesType) ||
                                    (isConvertibleNote && isSeedType) || (formData.instrumentType === 'Preferred Equity'); // Convertible Note + Series types

                                  return !shouldHide && (
                                    <div className="col-md-6 mb-4">
                                      <label className="form-label fw-semibold">
                                        Total Shares Issued in this Round{" "}
                                        <span className="tooltip-icon ms-2" tabIndex={0}>
                                          <img
                                            className="blackdark"
                                            width="15"
                                            height="15"
                                            src="/assets/user/images/question.png"
                                            alt="Tip"
                                          />
                                          <div className="tooltip-text tool-test-white text-white" role="tooltip">
                                            The number of shares in an early-stage company represents the total units of
                                            ownership authorized, issued, or outstanding across the cap table...
                                          </div>
                                        </span>
                                      </label>
                                      <NumericFormat
                                        thousandSeparator={true}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        allowNegative={false}
                                        placeholder="Enter # of shares"
                                        value={formData.issuedshares}
                                        onValueChange={(values) => {
                                          handleInputChange("issuedshares", values.value);
                                          if (errors.issuedshares) {
                                            setErrors((prev) => ({ ...prev, issuedshares: "" }));
                                          }
                                        }}
                                        className="textarea_input"
                                      />
                                    </div>
                                  );
                                })()}




                              </div>



                            </div>

                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => navigateToSection('prev')}
                            >
                              Back
                            </button>

                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                // Validate before proceeding
                                const newErrors = {};

                                if (isFirstRound) {
                                  // ROUND 0 VALIDATION - No validation needed for round size in Round 0
                                  // Round 0 doesn't have traditional round size, it's calculated from share allocation
                                } else {
                                  // OTHER ROUNDS VALIDATION
                                  if (!formData.roundsize || formData.roundsize.trim() === "") {
                                    newErrors.roundsize = "Round amount is required";
                                  } else if (parseFloat(formData.roundsize) <= 0) {
                                    newErrors.roundsize = "Round amount must be greater than 0";
                                  }

                                  if (!formData.currency || formData.currency.trim() === "") {
                                    newErrors.currency = "Currency selection is required";
                                  }

                                  // ✅ CONDITIONAL VALIDATION FOR POST-MONEY OPTION POOL
                                  const isSeriesSafe = selected?.includes("Series") && (formData.instrumentType === 'Safe');
                                  const isSeriesConvertible = selected?.includes("Series") && formData.instrumentType === 'Convertible Note';
                                  const isSeedCommonStock = formData.instrumentType === 'Preferred Equity' || formData.instrumentType === 'Common Stock';

                                  // Only require Post-Money Option Pool for these two conditions
                                  if ((isSeedCommonStock) &&
                                    (!formData.optionPoolPercent_post || formData.optionPoolPercent_post.trim() === "")) {
                                    newErrors.optionPoolPercent_post = "Post-Money Option Pool Target is required";
                                  }

                                  // Also validate it's a valid percentage if provided
                                  if (formData.optionPoolPercent_post && formData.optionPoolPercent_post.trim() !== "") {
                                    const poolPercent = parseFloat(formData.optionPoolPercent_post);
                                    if (isNaN(poolPercent) || poolPercent < 0 || poolPercent > 100) {
                                      newErrors.optionPoolPercent_post = "Please enter a valid percentage between 0 and 100";
                                    }
                                  }
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement = document.querySelector(".is-invalid");
                                    if (firstErrorElement) {
                                      firstErrorElement.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                      });
                                    }
                                  }, 100);
                                } else {
                                  setErrors({});
                                  navigateToSection('next');
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Additional sections would follow the same pattern */}
                      {/* Issued Shares Section */}
                      {activeSection === "issuedshares" && (
                        <div className="section-content p-4 border rounded-3 shadow-sm bg-white">
                          <PreviousSection
                            formData={formData}
                            otherText={otherText}
                            selected={selected}
                            visibleFields={[
                              "shareclass",
                              "description",
                              "instrument",
                              "roundsize",
                            ]}
                            isFirstRound={isFirstRound}
                            foundersData={foundersData}
                            calculateTotalShares={calculateTotalShares}
                            calculateTotalValue={calculateTotalValue}
                            founderCount={founderCount}
                          />

                          <h3 className="h5 mb-4 text-gray-800">
                            {isFirstRound ? "Round 0 - Share Allocation Summary" : ""}
                          </h3>

                          {/* ROUND 0 - Show different content */}
                          {isFirstRound ? (
                            <div className="round-zero-summary">
                              <div className="alert alert-info mb-4">
                                <strong>Round 0 Summary</strong> - This is your company's incorporation round.
                                The shares have already been allocated to founders in the previous section.
                              </div>

                              {/* Display Round 0 Calculations */}
                              <div className="calculation-results p-4 border rounded bg-light">
                                <h5>Round 0 - Incorporation Summary</h5>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <strong>Total Shares Issued:</strong> {calculateTotalShares().toLocaleString()}
                                    </div>
                                    <div className="mb-3">
                                      <strong>Price Per Share:</strong> {formData.currency ? formData.currency.split(' ')[1] : '$'}{formData.pricePerShare || '0.00'}
                                    </div>
                                    <div className="mb-3">
                                      <strong>Total Company Value:</strong> {formData.currency ? formData.currency.split(' ')[1] : '$'}{calculateTotalValue()}
                                    </div>
                                    <div className="mb-3">
                                      <strong>Currency:</strong> {formData.currency || 'CAD $'}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <strong>Number of Founders:</strong> {founderCount}
                                    </div>
                                    <div className="mb-3">
                                      <strong>Round Status:</strong> <span className="text-success">COMPLETED</span>
                                    </div>
                                    <div className="mb-3">
                                      <strong>Round Type:</strong> Incorporation Round
                                    </div>
                                    <div className="mb-3">
                                      <strong>Round Date:</strong> {formatCurrentDate(RoundData.created_at)}
                                    </div>
                                    <div className="mb-3">
                                      <strong>Date of Incorporation:</strong> {formatIncorporationDate(RoundData.year_registration)}
                                    </div>
                                  </div>
                                </div>

                                {/* Founder Ownership Breakdown */}


                                {/* Additional Statistics */}
                                {calculateTotalShares() > 0 && (
                                  <div className="mt-4 p-3 bg-white rounded border">

                                    <div className="row text-center">

                                      <div className="col-md-4">
                                        <small className="text-muted">Largest Ownership</small>
                                        <div className="fw-bold">
                                          {Math.max(...foundersData.map(f => {
                                            const shares = parseInt(f.shares) || 0;
                                            return calculateTotalShares() > 0 ? (shares / calculateTotalShares()) * 100 : 0;
                                          })).toFixed(1)}%
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <small className="text-muted">Smallest Ownership</small>
                                        <div className="fw-bold">
                                          {Math.min(...foundersData.map(f => {
                                            const shares = parseInt(f.shares) || 0;
                                            return calculateTotalShares() > 0 ? (shares / calculateTotalShares()) * 100 : 0;
                                          })).toFixed(1)}%
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <small className="text-muted">Founders</small>
                                        <div className="fw-bold">
                                          {foundersData.filter(f => f.voting === 'voting').length} / {founderCount}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Round 0 specific information */}
                              <div className="mt-4 p-3 bg-light rounded">
                                <h6>About Round 0 (Incorporation Round):</h6>
                                <ul className="mb-0">
                                  <li>This round represents the initial share allocation at company incorporation</li>
                                  <li>Shares are allocated to founders based on the incorporation documents</li>
                                  <li>Round 0 is automatically considered "COMPLETED" as it happens at company formation</li>
                                  <li>This forms the foundation of your cap table for future investment rounds</li>
                                  <li>The valuation shown is for incorporation purposes only and will not carry over to future rounds</li>
                                  <li>Each subsequent investment round will calculate its own price per share</li>
                                </ul>
                              </div>

                              {/* Important Notes */}
                              <div className="alert alert-warning mt-3">
                                <strong>Important:</strong> This Round 0 data will serve as the foundation for your cap table.
                                Make sure all information is accurate before proceeding.
                              </div>
                            </div>
                          ) : (
                            /* REGULAR INVESTMENT ROUND - Show original fields */
                            <div className="row">

                              <div className="col-md-12 mb-4">
                                <label className="form-label fw-semibold">
                                  Is this round closed or active?{" "}
                                  <span style={{ color: "var(--primary)" }}>*</span>
                                </label>

                                {/* Radio buttons */}
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="roundStatus"
                                    id="roundClosed"
                                    value="CLOSED"
                                    checked={formData.roundStatus === "CLOSED"}
                                    onChange={(e) => handleInputChange("roundStatus", e.target.value)}
                                  />
                                  <label className="form-check-label" htmlFor="roundClosed">
                                    CLOSED
                                  </label>
                                </div>
                                <div className="form-check mb-3">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="roundStatus"
                                    id="roundActive"
                                    value="ACTIVE"
                                    checked={formData.roundStatus === "ACTIVE"}
                                    onChange={(e) => handleInputChange("roundStatus", e.target.value)}
                                  />
                                  <label className="form-check-label" htmlFor="roundActive">
                                    ACTIVE
                                  </label>
                                </div>

                                {errors.roundStatus && (
                                  <div className="text-danger small">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors.roundStatus}
                                  </div>
                                )}

                                {/* Conditional rendering if CLOSED */}
                                {formData.roundStatus === "CLOSED" && (
                                  <>
                                    <label className="form-label fw-semibold">
                                      Date Round Closed{" "}
                                      <span style={{ color: "var(--primary)" }}>*</span>
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="MM/DD/YYYY"
                                      value={formData.dateroundclosed || ""}
                                      onChange={(e) => {
                                        handleInputChange("dateroundclosed", e.target.value);
                                        if (errors.dateroundclosed) {
                                          setErrors((prev) => ({ ...prev, dateroundclosed: "" }));
                                        }
                                      }}
                                      className={`form-control ${errors.dateroundclosed ? "is-invalid" : ""}`}
                                    />
                                    {errors.dateroundclosed && (
                                      <div className="text-danger small mt-1">
                                        <i className="bi bi-exclamation-circle me-1"></i>
                                        {errors.dateroundclosed}
                                      </div>
                                    )}
                                    <div className="form-text mb-3">Calendar: MM / DD / YYYY</div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => navigateToSection('prev')}
                            >
                              Back
                            </button>
                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                // For Round 0, no validation needed for these fields
                                if (isFirstRound) {
                                  navigateToSection('next');
                                  return;
                                }

                                // Original validation for investment rounds
                                const newErrors = {};

                                // Validate round status selection
                                if (!formData.roundStatus) {
                                  newErrors.roundStatus = "Please select CLOSED or ACTIVE";
                                }

                                // Validate dateroundclosed only if CLOSED
                                if (formData.roundStatus === "CLOSED") {
                                  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/; // MM/DD/YYYY
                                  const inputValue = formData.dateroundclosed;

                                  if (!inputValue) {
                                    newErrors.dateroundclosed = "This field is required";
                                  } else if (!dateRegex.test(inputValue)) {
                                    newErrors.dateroundclosed = "Enter a valid date (MM/DD/YYYY)";
                                  } else {
                                    const [month, day, year] = inputValue.split("/").map(Number);
                                    const inputDate = new Date(year, month - 1, day);
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);

                                    if (inputDate < today) {
                                      newErrors.dateroundclosed = "Date cannot be in the past";
                                    }
                                  }
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);
                                  setTimeout(() => {
                                    const firstErrorElement = document.querySelector(".is-invalid, .border-danger");
                                    if (firstErrorElement) {
                                      firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
                                    }
                                  }, 100);
                                } else {
                                  setErrors({});
                                  navigateToSection('next');
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Placeholder for remaining sections - would implement similarly */}
                      {activeSection === "rights" && (
                        <div className="section-content p-4 border rounded-3 shadow-sm bg-white">
                          <PreviousSection
                            formData={formData}
                            otherText={otherText}
                            selected={selected}
                            visibleFields={[
                              "shareclass",
                              "description",
                              "instrument",
                              "roundsize",
                              "issuedshares",
                            ]}
                            isFirstRound={isFirstRound}
                            foundersData={foundersData}
                            calculateTotalShares={calculateTotalShares}
                            calculateTotalValue={calculateTotalValue}
                            founderCount={founderCount}
                          />

                          <h3 className="h5 mb-4 text-gray-800">
                            {isFirstRound ? "Round 0 - Founder Rights & Preferences" : "Rights Associated with this Share Class"}
                          </h3>

                          {/* ROUND 0 - Founder Rights */}
                          {isFirstRound ? (
                            <div className="round-zero-content">
                              <div className="alert alert-info mb-4">
                                <strong>Round 0 Information:</strong> These are the rights and preferences for founder shares as per your incorporation documents.
                              </div>

                              <div className="mb-4">
                                <label className="form-label fw-semibold">
                                  Founder Share Rights & Preferences{" "}
                                  <span className="tooltip-icon ms-2" tabIndex={0}>
                                    <img
                                      className="blackdark"
                                      width="15"
                                      height="15"
                                      src="/assets/user/images/question.png"
                                      alt="Tip"
                                    />
                                    <div
                                      className="tooltip-text tool-test-white text-white"
                                      role="tooltip"
                                    >
                                      <strong>For Round 0 (Founder Shares):</strong> Describe the rights and preferences
                                      for founder shares as outlined in your incorporation documents. This typically includes
                                      voting rights, dividend preferences, transfer restrictions, and any special founder protections.
                                      <br />
                                      <strong>Common Founder Rights:</strong>
                                      – Full voting rights on major company decisions
                                      <br />– Right to receive dividends if declared
                                      <br />– Pre-emptive rights to maintain ownership percentage
                                      <br />– Founder vesting schedules (if applicable)
                                      <br />– Transfer restrictions and right of first refusal
                                    </div>
                                  </span>
                                </label>
                                <textarea
                                  placeholder="Describe the rights and preferences for founder shares as per incorporation documents (e.g., voting rights, dividend preferences, transfer restrictions)"
                                  className="textarea_input"
                                  rows="4"
                                  value={formData.rights}
                                  onChange={(e) => handleInputChange("rights", e.target.value)}
                                />
                                <div className="form-text">
                                  Example: "Founders hold common shares with full voting rights, pre-emptive rights to maintain ownership percentage, and standard transfer restrictions as per the shareholders agreement."
                                </div>
                              </div>

                              {/* Common Founder Rights Information */}
                              <div className="common-rights-info p-3 bg-light rounded mb-4">
                                <h6>Common Founder Rights in Round 0:</h6>
                                <ul className="mb-0 small">
                                  <li><strong>Voting Rights:</strong> Typically full voting rights on major decisions</li>
                                  <li><strong>Dividend Rights:</strong> Right to receive dividends if company declares them</li>
                                  <li><strong>Pre-emptive Rights:</strong> Right to participate in future rounds to maintain ownership</li>
                                  <li><strong>Transfer Restrictions:</strong> Limitations on selling shares without board approval</li>
                                  <li><strong>Founder Vesting:</strong> Shares may be subject to vesting schedule</li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            /* OTHER ROUNDS - Investor Rights */
                            <div className="investment-round-content">
                              <div className="mb-4">
                                <label className="form-label fw-semibold">
                                  Rights Associated with this Share Class{" "}
                                  <span className="tooltip-icon ms-2" tabIndex={0}>
                                    <img
                                      className="blackdark"
                                      width="15"
                                      height="15"
                                      src="/assets/user/images/question.png"
                                      alt="Tip"
                                    />
                                    <div
                                      className="tooltip-text tool-test-white text-white"
                                      role="tooltip"
                                    >
                                      <div className="d-flex flex-column gap-3">
                                        <p><strong>What it is:</strong> Specifies the negotiated powers and entitlements that
                                          holders of this class enjoy — it's the fine print investors care about.</p>
                                        <p> <strong>Why it matters:</strong> This defines control dynamics, dividend rights, conversion
                                          triggers, redemption clauses, anti-dilution, etc. It's the architecture of deal terms.</p>
                                        <div className="d-flex flex-column gap-2">
                                          <p><strong>How to fill it:</strong> Reference exact clauses from investor agreements (term
                                            sheets or subscription documents) and simplify into readable but accurate summaries.</p>
                                          <ul>
                                            <li>
                                              <p>
                                                – Non-cumulative dividends at 6% annually
                                              </p>
                                            </li>
                                            <li>
                                              <p>
                                                – Non-cumulative dividends at 6% annually
                                              </p>
                                            </li>
                                            <li>
                                              <p>
                                                – Automatic conversion on qualified financing &gt;$5M
                                              </p>
                                            </li>
                                            <li>
                                              <p>
                                                – Protective provisions for mergers, board expansion, and budget approvals
                                              </p>
                                            </li>
                                            <li>
                                              <p>
                                                – Anti-dilution protection (full-ratchet or weighted-average)
                                              </p>
                                            </li>
                                            <li>
                                              <p>
                                                – Redemption rights after 5 years
                                              </p>
                                            </li>
                                            <li>
                                              <p>
                                                – Pre-emptive rights for future rounds
                                              </p>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>


                                    </div>
                                  </span>
                                  <span className="text-danger fs-5 ms-1">*</span>
                                </label>
                                <textarea
                                  placeholder="Describe the rights and preferences for this share class (e.g., dividend rights, conversion triggers, protective provisions)"
                                  className={`textarea_input ${errors.rights ? "is-invalid" : ""}`}
                                  rows="4"
                                  value={formData.rights}
                                  onChange={(e) => {
                                    handleInputChange("rights", e.target.value);
                                    if (errors.rights) {
                                      setErrors((prev) => ({
                                        ...prev,
                                        rights: "",
                                      }));
                                    }
                                  }}
                                />
                                {errors.rights && (
                                  <div className="text-danger small mt-1">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors.rights}
                                  </div>
                                )}
                                <div className="form-text">
                                  Be specific about dividend preferences, conversion rights, protective provisions, and any special rights.
                                </div>
                              </div>

                              {/* Common Investor Rights Information */}
                              {/* <div className="common-rights-info p-3 bg-light rounded mb-4">
                                <h6>Common Investor Rights in Investment Rounds:</h6>
                                <ul className="mb-0 small">
                                  <li><strong>Dividend Preferences:</strong> Cumulative/non-cumulative, participation rights</li>
                                  <li><strong>Conversion Rights:</strong> Automatic or voluntary conversion triggers</li>
                                  <li><strong>Protective Provisions:</strong> Veto rights on major decisions</li>
                                  <li><strong>Anti-dilution:</strong> Full-ratchet or weighted-average protection</li>
                                  <li><strong>Liquidation Preference:</strong> Multiple and participation rights</li>
                                  <li><strong>Redemption Rights:</strong> Option to sell back shares after certain period</li>
                                </ul>
                              </div> */}
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => navigateToSection('prev')}
                            >
                              Back
                            </button>

                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                // Validate before proceeding
                                const newErrors = {};

                                if (isFirstRound) {
                                  // ROUND 0 VALIDATION - Rights are optional for founder shares
                                  // No validation needed, can be empty
                                } else {
                                  // OTHER ROUNDS VALIDATION - Rights are important for investors
                                  if (!formData.rights || formData.rights.trim() === "") {
                                    newErrors.rights = "Please describe the rights associated with this share class";
                                  } else if (formData.rights.trim().length < 10) {
                                    newErrors.rights = "Please provide more detailed description of rights";
                                  }
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement = document.querySelector(".is-invalid");
                                    if (firstErrorElement) {
                                      firstErrorElement.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                      });
                                    }
                                  }, 100);
                                } else {
                                  setErrors({});

                                  // Navigate to appropriate next section
                                  if (isFirstRound) {
                                    navigateToSection('next'); // Skip liquidation for Round 0
                                  } else {
                                    navigateToSection('next');
                                  }
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}

                      {activeSection === "liquidation" && !isFirstRound && (
                        <div className="section-content p-4 border rounded-3 shadow-sm bg-white">
                          <PreviousSection
                            formData={formData}
                            otherText={otherText}
                            selected={selected}
                            visibleFields={[
                              "shareclass",
                              "description",
                              "instrument",
                              "roundsize",
                              "issuedshares",
                              "rights",
                            ]}
                            isFirstRound={isFirstRound}
                            foundersData={foundersData}
                            calculateTotalShares={calculateTotalShares}
                            calculateTotalValue={calculateTotalValue}
                            founderCount={founderCount}
                          />

                          <h3 className="h5 mb-4 text-gray-800">Liquidation Preference</h3>

                          {/* ROUND 0 - Skip this section entirely */}
                          {isFirstRound ? (
                            <div className="text-center py-5">
                              <div className="alert alert-info">
                                <strong>Round 0 - No Liquidation Preference</strong>
                                <p className="mb-0 mt-2">
                                  This is the incorporation round with founder shares only.
                                  Liquidation preferences typically apply to investor rounds only.
                                </p>
                              </div>
                              <div className="mt-4">
                                <button
                                  className="global_btn"
                                  onClick={() => navigateToSection('next')}
                                >
                                  Continue to Next Section
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* OTHER ROUNDS - Show liquidation preference fields */
                            <>
                              {/* Liquidation Preferences Section - Only for Preferred Equity */}
                              {formData.instrumentType === "Preferred Equity" && (
                                <div className="investment-round-content">
                                  <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                      Liquidation Preference Details{" "}
                                      <span className="tooltip-icon ms-2" tabIndex={0}>
                                        <img
                                          className="blackdark"
                                          width="15"
                                          height="15"
                                          src="/assets/user/images/question.png"
                                          alt="Tip"
                                        />
                                        <div
                                          className="tooltip-text tool-test-white text-white"
                                          role="tooltip"
                                        >
                                          <strong>Note from Meeting:</strong> Liquidation preferences only apply to Preferred Stock in priced rounds.
                                          <br />
                                          <strong>For SAFEs/Convertible Notes:</strong> They get liquidation preferences ONLY when they convert to Preferred Stock.
                                          <br />
                                          <strong>For Common Stock/Venture Debt:</strong> No liquidation preferences apply.
                                        </div>
                                      </span>
                                    </label>
                                    <textarea
                                      placeholder="Describe the liquidation preference terms (e.g., 1x non-participating preference, senior to common shares)"
                                      className="textarea_input"
                                      rows="4"
                                      value={formData.liquidationpreferences}
                                      onChange={(e) =>
                                        handleInputChange("liquidationpreferences", e.target.value)
                                      }
                                    />
                                    <div className="form-text">
                                      Example: "Investors receive 1x liquidation preference, non-participating, pari passu with other preferred shares."
                                      <br />
                                      <small className="text-muted">
                                        <i>Note: This section only appears for Preferred Equity rounds as per meeting guidelines.</i>
                                      </small>
                                    </div>
                                  </div>

                                  {/* Rest of your liquidation preferences UI remains same */}
                                  <div className="row mt-3">
                                    <div className="col-md-6">
                                      {/* Multiple Preferences Component */}
                                      <div className="liquidation-group mb-4">
                                        <h6 className="fw-semibold mb-3 border-bottom pb-2">Preference Multiple</h6>
                                        <div className="row">
                                          {liquidationOptions.multiplePreferences.map((opt) => (
                                            <div key={opt.value} className="col-12 mb-3">
                                              <div
                                                className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData?.liquidation?.includes(opt.value)
                                                  ? "bg-light border-primary"
                                                  : "border-gray-300"
                                                  } ${errors.liquidation ? "is-invalid" : ""}`}
                                                onClick={() => {
                                                  let updatedSelection = [...(formData?.liquidation || [])];

                                                  // Remove ALL participation rights when selecting a multiple preference
                                                  const allParticipationRights = liquidationOptions.participationRights
                                                    .map(o => o.value);

                                                  // Remove all participation rights
                                                  updatedSelection = updatedSelection.filter(v => !allParticipationRights.includes(v));

                                                  // Remove other multiple preferences when one is selected
                                                  const otherMultiples = liquidationOptions.multiplePreferences
                                                    .map(o => o.value)
                                                    .filter(v => v !== opt.value);

                                                  updatedSelection = updatedSelection.filter(v => !otherMultiples.includes(v));

                                                  // Remove N/A and OTHER if selecting a preference
                                                  updatedSelection = updatedSelection.filter(v => v !== "N/A" && v !== "OTHER");

                                                  if (updatedSelection.includes(opt.value)) {
                                                    updatedSelection = updatedSelection.filter(v => v !== opt.value);
                                                  } else {
                                                    updatedSelection.push(opt.value);
                                                  }

                                                  handleInputChange("liquidation", updatedSelection);

                                                  if (errors.liquidation) {
                                                    setErrors((prev) => ({
                                                      ...prev,
                                                      liquidation: "",
                                                    }));
                                                  }
                                                }}
                                              >
                                                <div className="form-check">
                                                  <input
                                                    type="radio"
                                                    name="multiplePreference"
                                                    value={opt.value}
                                                    checked={formData?.liquidation?.includes(opt.value) || false}
                                                    onChange={() => { }}
                                                    className="form-check-input"
                                                  />
                                                  <label className="form-check-label fw-medium">
                                                    {opt.label}
                                                  </label>
                                                </div>
                                                <p className="text-muted small mb-0 mt-2">
                                                  {opt.description}
                                                </p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      {/* Participation Rights Component */}
                                      <div className="liquidation-group mb-4">
                                        <h6 className="fw-semibold mb-3 border-bottom pb-2">Participation Rights</h6>
                                        <div className="row">
                                          {liquidationOptions.participationRights.map((opt) => (
                                            <div key={opt.value} className="col-12 mb-3">
                                              <div
                                                className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData?.liquidation?.includes(opt.value)
                                                  ? "bg-light border-primary"
                                                  : "border-gray-300"
                                                  } ${errors.liquidation ? "is-invalid" : ""}`}
                                                onClick={() => {
                                                  let updatedSelection = [...(formData?.liquidation || [])];

                                                  if (opt.value === "N/A") {
                                                    updatedSelection = ["N/A"];
                                                  } else {
                                                    // Remove ALL multiple preferences when selecting a participation right
                                                    const allMultiples = liquidationOptions.multiplePreferences
                                                      .map(o => o.value);

                                                    // Remove all multiple preferences
                                                    updatedSelection = updatedSelection.filter(v => !allMultiples.includes(v));

                                                    // Remove N/A and OTHER if selecting participation right
                                                    updatedSelection = updatedSelection.filter(v => v !== "N/A" && v !== "OTHER");

                                                    // For participation rights, allow multiple selection except for N/A
                                                    if (updatedSelection.includes(opt.value)) {
                                                      updatedSelection = updatedSelection.filter(v => v !== opt.value);
                                                    } else {
                                                      updatedSelection.push(opt.value);
                                                    }
                                                  }

                                                  handleInputChange("liquidation", updatedSelection);

                                                  if (errors.liquidation) {
                                                    setErrors((prev) => ({
                                                      ...prev,
                                                      liquidation: "",
                                                    }));
                                                  }
                                                }}
                                              >
                                                <div className="form-check">
                                                  <input
                                                    type="checkbox"
                                                    name="participationRights"
                                                    value={opt.value}
                                                    checked={formData?.liquidation?.includes(opt.value) || false}
                                                    onChange={() => { }}
                                                    className="form-check-input"
                                                  />
                                                  <label className="form-check-label fw-medium">
                                                    {opt.label}
                                                  </label>
                                                </div>
                                                <p className="text-muted small mb-0 mt-2">
                                                  {opt.description}
                                                </p>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Rest of the code remains same... */}
                                  </div>

                                  {/* Liquidation Preference Information */}
                                  <div className="alert alert-info mt-4">
                                    <strong>Understanding Liquidation Preferences (For Preferred Equity Only):</strong>
                                    <ul className="mb-0 mt-2 small">
                                      <li><strong>Applies to:</strong> Preferred Stock only (not Common Stock, SAFEs, or Venture Debt)</li>
                                      <li><strong>SAFE/Convertible Notes:</strong> Get preferences only when they convert to Preferred Stock</li>
                                      <li><strong>1x Preference:</strong> Basic protection - get investment back first</li>
                                      <li><strong>Multiple Preference:</strong> Get 2x, 3x, etc. of investment back first</li>
                                      <li><strong>Participating:</strong> Get preference amount AND share remaining proceeds</li>
                                      <li><strong>Non-Participating:</strong> Choose between preference OR converting to common shares</li>
                                      <li><strong>Capped Participating:</strong> Participation stops at a certain multiple</li>
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => navigateToSection('prev')}
                            >
                              Back
                            </button>

                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                // For Round 0, skip validation and navigate directly
                                if (isFirstRound) {
                                  navigateToSection('next');
                                  return;
                                }

                                // Validate before proceeding for other rounds
                                const newErrors = {};

                                // Check if at least one liquidation option is selected
                                // if (formData.liquidation.length === 0) {
                                //   newErrors.liquidation = "Please select a liquidation preference type";
                                // }

                                // // Check if OTHER is selected but the text input is empty
                                // if (formData.liquidation.includes("OTHER")) {
                                //   if (!formData.liquidationOther || !formData.liquidationOther.trim()) {
                                //     newErrors.liquidationOther = "This field is required";
                                //   }
                                // }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to the first error
                                  setTimeout(() => {
                                    const firstErrorElement = document.querySelector(".is-invalid, .border-danger");
                                    if (firstErrorElement) {
                                      firstErrorElement.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                      });
                                    }
                                  }, 100);
                                } else {
                                  // Clear errors if validation passes
                                  setErrors({});
                                  navigateToSection('next');
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}


                      {activeSection === "voting" && !isFirstRound && (
                        <div className="section-content p-4 border rounded-3 shadow-sm bg-white">
                          <PreviousSection
                            formData={formData}
                            otherText={otherText}
                            selected={selected}
                            visibleFields={[
                              "shareclass",
                              "description",
                              "instrument",
                              "roundsize",
                              "issuedshares",
                              "rights",
                              "liquidation",
                              "convertible",
                            ]}
                            isFirstRound={isFirstRound}
                            foundersData={foundersData}
                            calculateTotalShares={calculateTotalShares}
                            calculateTotalValue={calculateTotalValue}
                            founderCount={founderCount}
                          />


                          <h3 className="h5 mb-4 text-gray-800">
                            {isFirstRound ? "Round 0 - Founder Voting Rights" : "Shareholders Voting Rights"}
                          </h3>

                          {/* ROUND 0 - Founder Voting Rights */}
                          {isFirstRound ? (
                            <div className="round-zero-content">
                              <div className="alert alert-info mb-4">
                                <strong>Round 0 Information:</strong> Founder shares typically have voting rights as per your incorporation documents.
                              </div>

                              <div className="mb-4">
                                <label className="form-label fw-semibold">
                                  Do Founder Shares Have Voting Rights?{" "}
                                  <span className="tooltip-icon ms-2" tabIndex={0}>
                                    <img
                                      className="blackdark"
                                      width="15"
                                      height="15"
                                      src="/assets/user/images/question.png"
                                      alt="Tip"
                                    />
                                    <div
                                      className="tooltip-text tool-test-white text-white"
                                      role="tooltip"
                                    >
                                      <strong>For Round 0 (Founder Shares):</strong> Indicate whether founder shares
                                      carry voting rights for company decisions, board appointments, and major corporate actions.
                                      <br />
                                      <strong>Common Founder Voting Rights:</strong>
                                      <br />– <strong>Yes:</strong> Founders can vote on major company decisions
                                      <br />– <strong>No:</strong> Founders have non-voting shares (rare for founders)
                                      <br />
                                      <strong>Typical Scenario:</strong> Most founder shares have full voting rights
                                      allowing participation in key decisions like:
                                      <br />• Board of directors elections
                                      <br />• Major corporate transactions
                                      <br />• Approval of future funding rounds
                                      <br />• Changes to company bylaws
                                    </div>
                                  </span>
                                </label>
                                <div className="d-flex gap-3">
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      name="voting"
                                      value="Yes"
                                      checked={formData.voting === "Yes"}
                                      onChange={() => {
                                        handleInputChange("voting", "Yes");
                                        if (errors.voting) {
                                          setErrors((prev) => ({
                                            ...prev,
                                            voting: "",
                                          }));
                                        }
                                      }}
                                      className="form-check-input"
                                    />
                                    <label className="form-check-label">Yes</label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      name="voting"
                                      value="No"
                                      checked={formData.voting === "No"}
                                      onChange={() => {
                                        handleInputChange("voting", "No");
                                        if (errors.voting) {
                                          setErrors((prev) => ({
                                            ...prev,
                                            voting: "",
                                          }));
                                        }
                                      }}
                                      className="form-check-input"
                                    />
                                    <label className="form-check-label">No</label>
                                  </div>
                                </div>
                                <div className="form-text">
                                  Most founder shares have voting rights. Select "Yes" unless your incorporation documents specify non-voting shares.
                                </div>
                              </div>

                              {/* Founder Voting Details */}
                              {formData.voting === "Yes" && (
                                <div className="mb-4 p-3 border rounded bg-light">
                                  <h6>Founder Voting Rights Details</h6>
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Voting Power Distribution
                                    </label>
                                    <div className="table-responsive">
                                      <table className="table table-sm table-bordered">
                                        <thead>
                                          <tr>
                                            <th>Founder</th>
                                            <th>Shares</th>
                                            <th>Voting Power</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {foundersData.map((founder, index) => {
                                            const shares = parseInt(founder.shares) || 0;
                                            const totalShares = calculateTotalShares();
                                            const votingPercentage = totalShares > 0 ? ((shares / totalShares) * 100).toFixed(1) : '0.0';
                                            return (
                                              <tr key={index}>
                                                <td>Founder {index + 1}</td>
                                                <td>{shares.toLocaleString()}</td>
                                                <td>{votingPercentage}%</td>
                                              </tr>
                                            );
                                          })}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Round 0 Voting Information */}
                              <div className="alert alert-warning mt-3">
                                <strong>About Founder Voting Rights:</strong>
                                <ul className="mb-0 mt-2 small">
                                  <li>Founder voting rights are typically proportional to share ownership</li>
                                  <li>Each share usually equals one vote (one-share-one-vote principle)</li>
                                  <li>Voting rights allow participation in major corporate decisions</li>
                                  <li>Some decisions may require supermajority votes for extra protection</li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            /* OTHER ROUNDS - Investor Voting Rights */
                            <div className="investment-round-content">
                              <div className="mb-4">
                                <label className="form-label fw-semibold">
                                  Shareholders Voting Rights{" "}
                                  <span className="tooltip-icon ms-2" tabIndex={0}>
                                    <img
                                      className="blackdark"
                                      width="15"
                                      height="15"
                                      src="/assets/user/images/question.png"
                                      alt="Tip"
                                    />
                                    <div
                                      className="tooltip-text tool-test-white text-white"
                                      role="tooltip"
                                    >
                                      <strong>What it is:</strong> Determines how much influence equity holders
                                      wield in company decisions, including board appointments, strategic pivots,
                                      and future fundraising.
                                      <br />
                                      <strong>Why it matters:</strong> Control rights shape governance — founders
                                      often trade economic upside for retaining voting control. Investors may
                                      require protective provisions and veto rights.
                                      <br />
                                      <strong>Investor Voting Scenarios:</strong>
                                      <br />– <strong>Yes:</strong> Investors have voting rights (common for preferred shares)
                                      <br />– <strong>No:</strong> Investors have non-voting shares (rare for equity investors)
                                      <br />– <strong>Protective Provisions:</strong> Veto rights on specific major decisions
                                      <br />– <strong>Board Seats:</strong> Right to appoint board directors
                                    </div>
                                  </span>{" "}
                                  <span style={{ color: "var(--primary)" }}>*</span>
                                </label>
                                <div className="d-flex gap-3">
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      name="voting"
                                      value="Yes"
                                      checked={formData.voting === "Yes"}
                                      onChange={() => {
                                        handleInputChange("voting", "Yes");
                                        if (errors.voting) {
                                          setErrors((prev) => ({
                                            ...prev,
                                            voting: "",
                                          }));
                                        }
                                      }}
                                      className={`form-check-input ${errors.voting ? "is-invalid" : ""}`}
                                    />
                                    <label className="form-check-label">Yes</label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      name="voting"
                                      value="No"
                                      checked={formData.voting === "No"}
                                      onChange={() => {
                                        handleInputChange("voting", "No");
                                        if (errors.voting) {
                                          setErrors((prev) => ({
                                            ...prev,
                                            voting: "",
                                          }));
                                        }
                                      }}
                                      className={`form-check-input ${errors.voting ? "is-invalid" : ""}`}
                                    />
                                    <label className="form-check-label">No</label>
                                  </div>
                                </div>

                                {errors.voting && (
                                  <div className="text-danger small mt-1">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors.voting}
                                  </div>
                                )}

                                {/* Additional voting details for investment rounds */}
                                {formData.voting === "Yes" && (
                                  <div className="mt-3 p-3 bg-light rounded">
                                    <h6>Investor Voting Rights Details</h6>
                                    <div className="form-text">
                                      <strong>Common Investor Voting Rights Include:</strong>
                                      <br />
                                      <div className="alert alert-warning p-2 mt-2 mb-2">
                                        <strong className="d-block text-center">
                                          <i className="bi bi-exclamation-triangle me-2"></i>
                                          Please connect with your Legal Council and make sure that all your voting rights of this round are included in term sheet as subscription document
                                        </strong>
                                      </div>
                                      <ul className="mb-0 mt-2">
                                        <li>May included Election of board directors</li>
                                        <li>May included Approval of major corporate transactions</li>
                                        <li>May included Changes to company charter or bylaws</li>
                                        <li>May included Issuance of new equity securities</li>
                                        <li>May included Approval of annual budgets</li>
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Investor Voting Information */}
                              {/* <div className="alert alert-info mt-3">
                                <strong>Note about Investor Voting Rights:</strong>
                                <ul className="mb-0 mt-2 small">
                                  <li>Preferred shareholders typically have voting rights on as-converted basis</li>
                                  <li>Some voting matters may require separate class votes</li>
                                  <li>Protective provisions often give veto rights on key decisions</li>
                                  <li>Voting agreements may pool votes for board representation</li>
                                </ul>
                              </div> */}
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => navigateToSection('prev')}
                            >
                              Back
                            </button>

                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                const newErrors = {};

                                if (isFirstRound) {
                                  // ROUND 0 VALIDATION - Voting rights are important but default to "Yes"
                                  // No strict validation needed as most founder shares have voting rights
                                  if (!formData.voting) {
                                    // Auto-set to "Yes" if not selected (most common case)
                                    handleInputChange("voting", "Yes");
                                  }
                                } else {
                                  // OTHER ROUNDS VALIDATION - Voting rights are required for investor shares
                                  if (!formData.voting) {
                                    newErrors.voting = "Please select Yes or No";
                                  }
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement = document.querySelector(".is-invalid, .border-danger");
                                    if (firstErrorElement) {
                                      firstErrorElement.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                      });
                                    }
                                  }, 100);
                                } else {
                                  setErrors({});

                                  // Navigate to appropriate next section
                                  if (isFirstRound) {
                                    navigateToSection('next'); // Skip term sheet and subscription for Round 0
                                  } else {
                                    navigateToSection('next');
                                  }
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}
                      {activeSection === "termsheet" && !isFirstRound && (
                        <div className="section-content p-4 border rounded-3 shadow-sm bg-white">
                          <PreviousSection
                            formData={formData}
                            otherText={otherText}
                            selected={selected}
                            visibleFields={[
                              "shareclass",
                              "description",
                              "instrument",
                              "roundsize",
                              "issuedshares",
                              "rights",
                              "liquidation",
                              "convertible",
                              "voting",
                            ]}
                            isFirstRound={isFirstRound}
                            foundersData={foundersData}
                            calculateTotalShares={calculateTotalShares}
                            calculateTotalValue={calculateTotalValue}
                            founderCount={founderCount}
                          />

                          <h3 className="h5 mb-4 text-gray-800">Investment Documents - Term Sheet</h3>

                          {/* ROUND 0 - Skip this section entirely */}
                          {isFirstRound ? (
                            <div className="text-center py-5">
                              <div className="alert alert-info">
                                <strong>Round 0 - No Term Sheet Required</strong>
                                <p className="mb-0 mt-2">
                                  This is the incorporation round with founder shares only.
                                  Term sheets are typically used for investor funding rounds.
                                </p>
                              </div>
                              <div className="mt-4">
                                <button
                                  className="global_btn"
                                  onClick={() => navigateToSection('next')}
                                >
                                  Continue to Notes Section
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* OTHER ROUNDS - Show term sheet upload */
                            <div className="investment-round-content">
                              <div className="mb-4">
                                <label className="form-label fw-semibold d-flex align-items-center">
                                  Upload Your Term Sheet(s){" "}
                                  <span className="tooltip-icon ms-2" tabIndex={0}>
                                    <img
                                      className="blackdark"
                                      width="15"
                                      height="15"
                                      src="/assets/user/images/question.png"
                                      alt="Tip"
                                    />
                                    <div
                                      className="tooltip-text tool-test-white text-white"
                                      role="tooltip"
                                    >
                                      A term sheet is a non-binding document that sets the stage for an investment
                                      by outlining the essential terms of the deal: valuation, share type, governance
                                      rights, investor protections, and expected post-money ownership. It is the
                                      'strategic handshake' between founders and investors before drafting legal documents.
                                      <br />
                                      <strong>Key Elements in Term Sheets:</strong>
                                      – Valuation (pre-money and post-money)
                                      <br />– Investment amount and share price
                                      <br />– Liquidation preferences
                                      <br />– Voting rights and protective provisions
                                      <br />– Board composition
                                      <br />– Anti-dilution provisions
                                      <br />– Dividend preferences
                                    </div>
                                  </span>
                                  <span style={{ color: "var(--primary)" }}>*</span>
                                </label>

                                <input
                                  type="file"
                                  multiple
                                  accept=".pdf,.doc,.docx,.txt"
                                  onChange={(e) => {
                                    handleInputChange(
                                      "termsheetFile",
                                      Array.from(e.target.files)
                                    );
                                    if (errors.termsheetFile) {
                                      setErrors((prev) => ({
                                        ...prev,
                                        termsheetFile: "",
                                      }));
                                    }
                                  }}
                                  className={`textarea_input ${errors.termsheetFile ? "is-invalid" : ""}`}
                                />

                                {/* Show selected file names */}
                                {formData.termsheetFile && formData.termsheetFile.length > 0 && (
                                  <div className="mt-2">
                                    <strong>Selected Files:</strong>
                                    <ul className="small text-muted mt-1 mb-0">
                                      {formData.termsheetFile.map((file, index) => (
                                        <li key={index}>
                                          <strong>{file.name}</strong>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {errors.termsheetFile && (
                                  <div className="text-danger small mt-1">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors.termsheetFile}
                                  </div>
                                )}

                                <div className="form-text">
                                  Supported formats: PDF, DOC, DOCX, TXT. Maximum file size: 10MB per file.
                                </div>
                              </div>

                              {/* Term Sheet Information */}
                              {/* <div className="alert alert-info mt-3">
                                <strong>About Term Sheets:</strong>
                                <ul className="mb-0 mt-2 small">
                                  <li>Term sheets are non-binding but set the framework for the deal</li>
                                  <li>They outline key economic and control terms</li>
                                  <li>Typically negotiated between company and lead investor</li>
                                  <li>Forms the basis for legal documentation</li>
                                  <li>Exclusivity periods are common in term sheets</li>
                                </ul>
                              </div> */}
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => navigateToSection('prev')}
                            >
                              Back
                            </button>

                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                // For Round 0, skip validation and navigate directly to notes
                                if (isFirstRound) {
                                  navigateToSection('next');
                                  return;
                                }

                                // Validate before proceeding for other rounds
                                const newErrors = {};

                                if (!formData.termsheetFile || formData.termsheetFile.length === 0) {
                                  newErrors.termsheetFile = "Please upload at least one term sheet file";
                                } else {
                                  // Validate file types and sizes
                                  const validExtensions = ["pdf", "doc", "docx", "txt"];
                                  const maxSize = 10 * 1024 * 1024; // 10MB

                                  for (const file of formData.termsheetFile) {
                                    const fileExtension = file.name.split(".").pop().toLowerCase();

                                    // ✅ Validate extension
                                    if (!validExtensions.includes(fileExtension)) {
                                      newErrors.termsheetFile =
                                        "Invalid file type. Please upload PDF, DOC, DOCX, or TXT files only";
                                      break;
                                    }

                                    // ✅ Validate file size
                                    if (file.size > maxSize) {
                                      newErrors.termsheetFile = `File ${file.name} exceeds 10MB size limit`;
                                      break;
                                    }
                                  }
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement = document.querySelector(
                                      ".is-invalid, .border-danger"
                                    );
                                    if (firstErrorElement) {
                                      firstErrorElement.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                      });
                                    }
                                  }, 100);
                                } else {
                                  setErrors({});
                                  navigateToSection('next');
                                }
                              }}
                            >
                              Save and Continue
                            </button>

                          </div>
                        </div>
                      )}

                      {activeSection === "subscription" && !isFirstRound && (
                        <div className="section-content p-4 border rounded-3 shadow-sm bg-white">
                          <PreviousSection
                            formData={formData}
                            otherText={otherText}
                            selected={selected}
                            visibleFields={[
                              "shareclass",
                              "description",
                              "instrument",
                              "roundsize",
                              "issuedshares",
                              "rights",
                              "liquidation",
                              "convertible",
                              "voting",
                              "termsheet",
                            ]}
                            isFirstRound={isFirstRound}
                            foundersData={foundersData}
                            calculateTotalShares={calculateTotalShares}
                            calculateTotalValue={calculateTotalValue}
                            founderCount={founderCount}
                          />

                          <h3 className="h5 mb-4 text-gray-800">Investment Documents - Subscription</h3>

                          {/* ROUND 0 - Skip this section entirely */}
                          {isFirstRound ? (
                            <div className="text-center py-5">
                              <div className="alert alert-info">
                                <strong>Round 0 - No Subscription Documents Required</strong>
                                <p className="mb-0 mt-2">
                                  This is the incorporation round with founder shares only.
                                  Subscription documents are used for investor funding rounds.
                                </p>
                              </div>
                              <div className="mt-4">
                                <button
                                  className="global_btn"
                                  onClick={() => navigateToSection('next')}
                                >
                                  Continue to Notes Section
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* OTHER ROUNDS - Show subscription document upload */
                            <div className="investment-round-content">
                              <div className="mb-4">
                                <label className="form-label fw-semibold d-flex align-items-center">
                                  Upload Your Subscription Documents
                                  <span className="tooltip-icon ms-2" tabIndex={0}>
                                    <img
                                      className="blackdark"
                                      width="15"
                                      height="15"
                                      src="/assets/user/images/question.png"
                                      alt="Tip"
                                    />
                                    <div
                                      className="tooltip-text tool-test-white text-white"
                                      role="tooltip"
                                    >
                                      <div className="d-flex flex-column gap-2">
                                        <p>
                                          Subscription documents are the formal, legally binding agreements that an investor
                                          signs to purchase equity in a company after a term sheet has been agreed upon.
                                          These include the Subscription Agreement, which outlines how many shares the
                                          investor is buying, at what price, and under what terms.
                                        </p>
                                        <p><strong>Common Subscription Documents:</strong></p>
                                        <p><b>Subscription Agreement:</b> Primary investment contract</p>
                                        <p><b>Shareholders' Agreement:</b> Governance and rights</p>
                                        <p><b>Investor Rights Agreement:</b> Information and registration rights</p>
                                        <p><b>Board Consent:</b> Formal board approval of the round</p>
                                        <p><b>Side Letters:</b> Special terms for specific investors</p>
                                        <p> These documents legally commit the investor to the deal and obligate the company
                                          to issue shares in exchange for capital.</p>
                                      </div>


                                    </div>
                                  </span>
                                  <span style={{ color: "var(--primary)" }}>*</span>
                                </label>

                                <input
                                  type="file"
                                  multiple
                                  accept=".pdf,.doc,.docx,.txt"
                                  onChange={(e) => {
                                    handleInputChange(
                                      "subscriptiondocument",
                                      Array.from(e.target.files)
                                    );
                                    if (errors.subscriptiondocument) {
                                      setErrors((prev) => ({
                                        ...prev,
                                        subscriptiondocument: "",
                                      }));
                                    }
                                  }}
                                  className={`textarea_input ${errors.subscriptiondocument ? "is-invalid" : ""}`}
                                />

                                {/* Show selected file names */}
                                {formData.subscriptiondocument && formData.subscriptiondocument.length > 0 && (
                                  <div className="mt-2">
                                    <strong>Selected Files:</strong>
                                    <ul className="small text-muted mt-1 mb-0">
                                      {formData.subscriptiondocument.map((file, index) => (
                                        <li key={index}>
                                          <strong>{file.name}</strong>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {errors.subscriptiondocument && (
                                  <div className="text-danger small mt-1">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors.subscriptiondocument}
                                  </div>
                                )}

                                <div className="form-text">
                                  Upload all relevant subscription documents. Supported formats: PDF, DOC, DOCX, TXT. Maximum file size: 10MB per file.
                                </div>
                              </div>

                              {/* Subscription Documents Information */}
                              {/* <div className="alert alert-info mt-3">
                                <strong>About Subscription Documents:</strong>
                                <ul className="mb-0 mt-2 small">
                                  <li>These are legally binding contracts that finalize the investment</li>
                                  <li>Typically include representations, warranties, and covenants</li>
                                  <li>Must be signed by both company and investors</li>
                                  <li>Funds are transferred upon execution of these documents</li>
                                  <li>Shares are issued after documents are fully executed</li>
                                </ul>
                              </div> */}
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => navigateToSection('prev')}
                            >
                              Back
                            </button>

                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                // For Round 0, skip validation and navigate directly to notes
                                if (isFirstRound) {
                                  navigateToSection('next');
                                  return;
                                }

                                // Validate before proceeding for other rounds
                                const newErrors = {};

                                if (
                                  !formData.subscriptiondocument ||
                                  formData.subscriptiondocument.length === 0
                                ) {
                                  newErrors.subscriptiondocument =
                                    "Please upload at least one subscription document";
                                } else {
                                  // Validate file extensions and sizes safely
                                  const validExtensions = ["pdf", "doc", "docx", "txt"];
                                  const maxSize = 10 * 1024 * 1024; // 10MB

                                  for (const file of formData.subscriptiondocument) {
                                    const fileName = file?.name || "";
                                    const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

                                    // ✅ Validate extension instead of MIME type
                                    if (!validExtensions.includes(fileExtension)) {
                                      newErrors.subscriptiondocument =
                                        "Invalid file type. Please upload PDF, DOC, DOCX, or TXT files only";
                                      break;
                                    }

                                    // ✅ Validate file size
                                    if (file.size > maxSize) {
                                      newErrors.subscriptiondocument = `File ${file.name} exceeds 10MB size limit`;
                                      break;
                                    }
                                  }
                                }

                                // ✅ Handle validation result
                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement = document.querySelector(
                                      ".is-invalid, .border-danger"
                                    );
                                    if (firstErrorElement) {
                                      firstErrorElement.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                      });
                                    }
                                  }, 100);
                                } else {
                                  setErrors({});
                                  navigateToSection('next');
                                }
                              }}
                            >
                              Save and Continue
                            </button>

                          </div>
                        </div>
                      )}
                      {activeSection === "notes" && (
                        <div className="section-content p-4 border rounded-3 shadow-sm bg-white">
                          <PreviousSection
                            formData={formData}
                            otherText={otherText}
                            selected={selected}
                            visibleFields={[
                              "shareclass",
                              "description",
                              "instrument",
                              "roundsize",
                              "issuedshares",
                              "rights",
                              "liquidation",
                              "convertible",
                              "voting",
                              "termsheet",
                              "subscription",
                            ]}
                            isFirstRound={isFirstRound}
                            foundersData={foundersData}
                            calculateTotalShares={calculateTotalShares}
                            calculateTotalValue={calculateTotalValue}
                            founderCount={founderCount}
                          />

                          <h3 className="h5 mb-4 text-gray-800">
                            {isFirstRound ? "Round 0 - Additional Notes" : "General Notes About the Round"}
                          </h3>

                          {/* ROUND 0 - Founder Round Notes */}
                          {isFirstRound ? (
                            <div className="round-zero-content">
                              <div className="alert alert-info mb-4">
                                <strong>Round 0 Information:</strong> Add any additional notes about your company's incorporation and founder share allocation.
                              </div>

                              <div className="mb-4">
                                <label className="form-label fw-semibold d-flex align-items-center">
                                  Incorporation & Founder Notes
                                  <span className="tooltip-icon ms-2" tabIndex={0}>
                                    <img
                                      className="blackdark"
                                      width="15"
                                      height="15"
                                      src="/assets/user/images/question.png"
                                      alt="Tip"
                                    />
                                    <div
                                      className="tooltip-text tool-test-white text-white"
                                      role="tooltip"
                                    >
                                      <strong>For Round 0 (Founder Shares):</strong> Add any additional information
                                      about your company's incorporation that wasn't captured in previous sections.
                                      <br />
                                      <strong>What to include:</strong>
                                      – Special founder arrangements or vesting schedules
                                      <br />– Notes about the incorporation process or timeline
                                      <br />– Any unique terms from your incorporation documents
                                      <br />– Future plans for the company
                                      <br />– Additional context about founder relationships
                                      <br />– Any restrictions or special conditions on founder shares
                                    </div>
                                  </span>
                                </label>

                                <textarea
                                  placeholder="Enter any additional notes about company incorporation, founder arrangements, or special terms from your incorporation documents..."
                                  className="textarea_input"
                                  rows="6"
                                  value={formData.generalnotes}
                                  onChange={(e) =>
                                    handleInputChange("generalnotes", e.target.value)
                                  }
                                />
                                <div className="form-text">
                                  This information helps provide context for your company's founding and initial share structure.
                                </div>
                              </div>

                              {/* Round 0 Summary Display */}
                              <div className="calculation-results p-4 border rounded bg-light mb-4">
                                <h5>Round 0 - Incorporation Summary</h5>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="mb-2">
                                      <strong>Total Shares:</strong> {calculateTotalShares().toLocaleString()}
                                    </div>
                                    <div className="mb-2">
                                      <strong>Price Per Share:</strong> ${formData.pricePerShare || '0.00'}
                                    </div>
                                    <div className="mb-2">
                                      <strong>Total Value:</strong> ${calculateTotalValue()}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="mb-2">
                                      <strong>Founders:</strong> {founderCount}
                                    </div>
                                    <div className="mb-2">
                                      <strong>Share Type:</strong> Common Shares
                                    </div>
                                    <div className="mb-2">
                                      <strong>Voting Rights:</strong> {formData.voting === "Yes" ? "Yes" : "No"}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Round 0 Completion Information */}
                              <div className="alert alert-success mt-3">
                                <strong>Ready to Complete Round 0</strong>
                                <p className="mb-0 mt-2">
                                  You've successfully entered all the information for your company's incorporation round.
                                  This will serve as the foundation for your cap table and future investment rounds.
                                </p>
                              </div>
                            </div>
                          ) : (
                            /* OTHER ROUNDS - Investment Round Notes */
                            <div className="investment-round-content">
                              <div className="mb-4">
                                <label className="form-label fw-semibold d-flex align-items-center">
                                  General Notes About the Round
                                  <span className="tooltip-icon ms-2" tabIndex={0}>
                                    <img
                                      className="blackdark"
                                      width="15"
                                      height="15"
                                      src="/assets/user/images/question.png"
                                      alt="Tip"
                                    />
                                    <div
                                      className="tooltip-text tool-test-white text-white"
                                      role="tooltip"
                                    >
                                      <strong>For Investment Rounds:</strong> Add any additional information,
                                      context, or special considerations about this funding round that weren't
                                      captured in previous sections.
                                      <br />
                                      <strong>What to include:</strong>
                                      – Background on investor negotiations
                                      <br />– Special terms or side agreements
                                      <br />– Timeline and process notes
                                      <br />– Key people involved in the round
                                      <br />– Future plans tied to this funding
                                      <br />– Any unusual or noteworthy aspects of the deal
                                      <br />– Conditions precedent or subsequent
                                    </div>
                                  </span>
                                </label>

                                <textarea
                                  placeholder="Enter any additional notes about the investment round, investor relationships, special terms, or context that would be helpful for future reference..."
                                  className="textarea_input"
                                  rows="6"
                                  value={formData.generalnotes}
                                  onChange={(e) =>
                                    handleInputChange("generalnotes", e.target.value)
                                  }
                                />
                                <div className="form-text">
                                  These notes will be stored with your round information for future reference and reporting.
                                </div>
                              </div>

                              {/* Investment Round Summary Information */}
                              {/* <div className="alert alert-info mt-3">
                                <strong>About Investment Round Notes:</strong>
                                <ul className="mb-0 mt-2 small">
                                  <li>Notes are searchable and can be referenced in future rounds</li>
                                  <li>Include any verbal agreements or understandings not in documents</li>
                                  <li>Document the rationale behind key deal terms</li>
                                  <li>Note any investor relationships or strategic considerations</li>
                                  <li>Record any conditions or milestones tied to the investment</li>
                                </ul>
                              </div> */}
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => navigateToSection('prev')}
                            >
                              Back
                            </button>

                            <button
                              className="global_btn w-fit"
                              type="button"
                              onClick={() => {
                                // For both Round 0 and other rounds, proceed to review
                                // Notes are optional, so no validation needed
                                handleReviewpage();
                              }}
                            >
                              {isFirstRound ? "Complete Round 0" : "Save and Review"}
                            </button>
                          </div>

                          {/* Progress indicator for Round 0 */}
                          {isFirstRound && (
                            <div className="mt-4 pt-3 border-top">
                              <div className="progress" style={{ height: "8px" }}>
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  style={{ width: "100%" }}
                                  aria-valuenow={100}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                >
                                </div>
                              </div>
                              <div className="d-flex justify-content-between mt-2 small text-muted">
                                <span>Round 0 Setup</span>
                                <span>100% Complete</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Add similar sections for the remaining form fields */}
                    </div>
                  </form>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div >
      </div >
    </Wrapper >
  );
}