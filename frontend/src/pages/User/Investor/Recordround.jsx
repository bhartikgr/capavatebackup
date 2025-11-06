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

export default function Recordround() {
  const apiUrlRound = "http://localhost:5000/api/user/capitalround/";
  var apiURLInvestor = "http://localhost:5000/api/user/investor/";

  const [countrySymbolList, setCountrysymbollist] = useState([]);
  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [activeSection, setActiveSection] = useState("shareclass");
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const [messageAll, setmessageAll] = useState("");
  const [errr, seterrr] = useState(false);
  const userLogin = JSON.parse(storedUsername);
  const { id } = useParams();
  const [ClientIP, setClientIP] = useState("");
  const [records, setrecords] = useState([]);
  // Add this to your component state
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    convertibleTrigger: "",
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
    safeType: "",
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
    nameOfRound: "Founding Share Allocation",
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

    common_stock_valuation: "",
    hasWarrants: "",
    exercisePrice: "",
    expirationDate: "",
    warrantRatio: "",
    warrantType: "",
    preferred_valuation: "",
    hasWarrants_preferred: "",
    exercisePrice_preferred: "",
    expirationDate_preferred: "",
    warrantRatio_preferred: "",
    warrantType_preferred: "",
    valuationCap: "",
    discountRate: "",
    safeType: "",
    interestRate: "",
    repaymentSchedule: "",
    hasWarrants_Bank: "",
    exercisePrice_bank: "",
    exercisedate_bank: "",
    warrantRatio_bank: "",
    warrantType_bank: "",
    valuationCap_note: "",
    discountRate_note: "",
    maturityDate: "",
    interestRate_note: "",
    convertibleTrigger: "",
    customInstrument: "",
    roundStatus: "",

    pricePerShare: "",
  });

  const [isFirstRound, setIsFirstRound] = useState(false);
  const [founderCount, setFounderCount] = useState(1);
  const [foundersData, setFoundersData] = useState([{
    shares: '',
    shareType: 'common',
    voting: 'voting'
  }]);
  //Check Authorized Signature
  const apiURLSignature = "http://localhost:5000/api/user/";
  var apiURLAiFile = "http://localhost:5000/api/user/aifile/";

  useEffect(() => {
    getAuthorizedSignature();
    handleCheckPayemt();
  }, []);

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
        navigate("/record-round-list"); // Subscription expired
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

        if (getData.round_type === 'Round 0') {
          setIsFirstRound(true);


          // Auto-set Round 0 values if first round

          handleInputChange("nameOfRound", "Founding Share Allocation");
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

            console.log("Parsed founder data:", parsedFounderData);
            console.log("Founders array:", foundersDataFromDB);
            console.log("Price per share:", pricePerShareFromDB);

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

        console.log("Final formData:", updatedFormData);
        setFormData(updatedFormData);

        // ✅ SET FOUNDERS DATA FOR ROUND 0
        console.log(foundersDataFromDB);
        if (getData.round_type === 'Round 0' && foundersDataFromDB.length > 0) {
          setFoundersData(foundersDataFromDB);
          setFounderCount(foundersDataFromDB.length);
          console.log("Setting founders data:", foundersDataFromDB);
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
  useEffect(() => {
    console.log("FormData updated:", formData);
  }, [formData]);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [selected, setSelected] = useState("");
  const [otherText, setOtherText] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

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
  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("created_by_id", userLogin.id);
    formDataToSend.append("id", id || ""); // Fix: Handle empty id for new records
    formDataToSend.append("company_id", userLogin.companies[0].id);
    formDataToSend.append("created_by_role", userLogin.role);

    // Round 0 vs Round 1+ logic
    if (isFirstRound) {
      // ROUND 0 SPECIFIC DATA
      formDataToSend.append("round_type", "Round 0");
      formDataToSend.append("shareClassType", "Common Shares");
      formDataToSend.append("nameOfRound", "Founding Share Allocation");
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
      formDataToSend.append("shareClassType", selected || "");
      formDataToSend.append("nameOfRound", formData.nameOfRound || "");
      formDataToSend.append("issuedshares", formData.issuedshares || "");
      formDataToSend.append("roundStatus", formData.roundStatus || "");
      formDataToSend.append("instrumentType", formData.instrumentType || "");
      formDataToSend.append("roundsize", formData.roundsize || "");
      formDataToSend.append("currency", formData.currency || "");
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
          instrumentData = {
            common_stock_valuation: formData.common_stock_valuation || "",
            hasWarrants: formData.hasWarrants || false,
            ...(formData.hasWarrants && {
              exercisePrice: formData.exercisePrice || "",
              expirationDate: formData.expirationDate || "",
              warrantRatio: formData.warrantRatio || "",
              warrantType: formData.warrantType || "CALL",
            }),
          };
          break;

        case "Preferred Equity":
          instrumentData = {
            preferred_valuation: formData.preferred_valuation || "",
            hasWarrants_preferred: formData.hasWarrants_preferred || false,
            ...(formData.hasWarrants_preferred && {
              exercisePrice_preferred: formData.exercisePrice_preferred || "",
              expirationDate_preferred: formData.expirationDate_preferred || "",
              warrantRatio_preferred: formData.warrantRatio_preferred || "",
              warrantType_preferred: formData.warrantType_preferred || "CALL",
            }),
          };
          break;

        case "Safe":
          instrumentData = {
            valuationCap: formData.valuationCap || "",
            discountRate: formData.discountRate || "",
            safeType: formData.safeType || "PRE_MONEY",
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
            convertibleTrigger: formData.convertibleTrigger || "",
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
      seterrr(false);
      setmessageAll(res.data.message);
      setTimeout(() => {
        setmessageAll("");
        navigate("/record-round-list");
      }, 3500);
    } catch (err) {
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
        handleInputChange("nameOfRound", "Founding Share Allocation");
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
    "Founder Shares (Family and Friends)",
    "Employee Options Pool", // mandatory first selection
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


  const getSections = () => {
    if (isFirstRound) {
      // ROUND 0 SECTIONS
      return [
        { id: "shareclass", title: "Founder Share Allocation" },
        { id: "description", title: "Description" },
        { id: "issuedshares", title: "Round 0 Summary" },
        { id: "rights", title: "Rights & Preferences" },
        { id: "voting", title: "Voting Rights" },
        { id: "notes", title: "Notes" },
      ];
    } else {
      // OTHER ROUNDS SECTIONS
      return [
        { id: "shareclass", title: "Share Class" },
        { id: "description", title: "Description" },
        { id: "instrument", title: "Investment Instrument" },
        { id: "roundsize", title: "Round Size" },
        { id: "issuedshares", title: "# Issued Shares" },
        { id: "rights", title: "Rights & Preferences" },
        { id: "liquidation", title: "Liquidation Preference" },
        { id: "convertible", title: "Convertible?" },
        { id: "voting", title: "Voting Rights" },
        { id: "termsheet", title: "Term Sheet" },
        { id: "subscription", title: "Subscription Document" },
        { id: "notes", title: "Notes" },
      ];
    }
  };

  const sections = getSections();
  //Progress bar
  // Progress bar calculation
  const totalSections = sections.length;
  const activeIndex = sections.findIndex((section) => section.id === activeSection);
  const progressWidth = totalSections > 1 ? Math.round((activeIndex / (totalSections - 1)) * 100) : 0;

  //Progress bar
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

  const liquidationOptions = [
    {
      value: "1x Investor Multiple Preference",
      label: "1x Investor Multiple Preference",
      description:
        "Multiple of the original investment returned before common shares participate.",
    },
    {
      value: "2x Investor Multiple Preference",
      label: "2x Investor Multiple Preference",
      description:
        "Multiple of the original investment returned before common shares participate.",
    },
    {
      value: "3x Investor Multiple Preference",
      label: "3x Investor Multiple Preference",
      description:
        "Multiple of the original investment returned before common shares participate.",
    },
    {
      value: "Non-Participating",
      label: "Non-Participating",
      description:
        "Investor chooses either the liquidation preference or the stock value.",
    },
    {
      value: "Participating",
      label: "Participating",
      description:
        "Received liquidation preference and then participated pro-rata with common shareholders.",
    },
    {
      value: "Capped Participating",
      label: "Capped Participating",
      description:
        "Participation capped at a defined multiple (e.g. total return capped at 3x).",
    },
    {
      value: "Participating with Catch-up",
      label: "Participating with Catch-up",
      description:
        "Common gets paid first to a threshold, then preferred ‘catches up’ before full pro-rata sharing.",
    },
    {
      value: "Senior Debt",
      label: "Senior Debt",
      description:
        "A loan or obligation that takes repayment priority over other debts in the event of bankruptcy.",
    },
    {
      value: "Common Debt",
      label: "Common Debt",
      description:
        "A loan or obligation that takes secondary repayment priority over other senior debts in the event of bankruptcy.",
    },
    {
      value: "N/A",
      label: "N/A",
      description: "Does not apply to this round.",
    },
    {
      value: "OTHER",
      label: "Other",
      description: "Custom response entered by the company.",
    },
  ];

  //getallcountrySymbolList
  useEffect(() => {
    getallcountrySymbolList();
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
  const handleReviewpage = () => {
    setsuccessMsg(
      "Please review all the information carefully before submitting. Once submitted, it can be officially recorded."
    );
    setIsReviewing(true); // show confirm button
  };

  const handleConfirm = async () => {
    setsuccessMsg(""); // clear review message
    setIsReviewing(false); // hide confirm button
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
      console.log(hasExistingRounds)
      setIsFirstRound(!hasExistingRounds);

      // Auto-set Round 0 values if first round
      if (!hasExistingRounds) {
        handleInputChange("nameOfRound", "Founding Share Allocation");
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
    return (totalShares * pricePerShare).toFixed(2);
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
                  {messageAll && (
                    <div
                      className={`flex items-center justify-between gap-3 shadow-lg ${errr ? "error_pop" : "success_pop"
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
                      {sections.map((section) => (
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
                              placeholder="Enter round name (e.g., Series A, Seed Round)"
                              value={formData.nameOfRound}
                              onChange={(e) => handleInputChange("nameOfRound", e.target.value)}
                              className={`form-control ${errors.nameOfRound ? "is-invalid" : ""}`}
                              maxLength={30}
                              disabled={!firstStepCompleted}
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
                                      <div className="col-md-4 mb-3">
                                        <label className="form-label">
                                          Shares Allocated <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="number"
                                          className={`form-control ${errors[`founder_${index}_shares`] ? 'is-invalid' : ''
                                            }`}
                                          placeholder="e.g., 500"
                                          value={founder.shares}
                                          onChange={(e) => {
                                            updateFounderData(index, 'shares', e.target.value);
                                            // Clear error when user starts typing
                                            if (errors[`founder_${index}_shares`]) {
                                              setErrors(prev => ({
                                                ...prev,
                                                [`founder_${index}_shares`]: ""
                                              }));
                                            }
                                          }}
                                        />
                                        {errors[`founder_${index}_shares`] && (
                                          <div className="text-danger small mt-1">
                                            <i className="bi bi-exclamation-circle me-1"></i>
                                            {errors[`founder_${index}_shares`]}
                                          </div>
                                        )}
                                      </div>

                                      <div className="col-md-4 mb-3">
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

                                      <div className="col-md-4 mb-3">
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

                              {/* Price Per Share at Incorporation */}
                              <div className="mb-4">
                                <label className="form-label fw-semibold">
                                  Price Per Share at Incorporation ($) <span className="text-danger fs-5">*</span>
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
                                  placeholder="e.g., 0.01"
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

                              {/* Round 0 Calculations Display */}
                              <div className="calculation-results p-3 bg-light rounded mb-4">
                                <h6>Round 0 Calculations</h6>
                                <div className="row">
                                  <div className="col-md-4">
                                    <strong>Total Shares:</strong> {calculateTotalShares().toLocaleString()}
                                  </div>
                                  <div className="col-md-4">
                                    <strong>Total Value:</strong> ${calculateTotalValue()}
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
                            </div>
                          )}

                          {/* Share Class Options for Round 1+ */}
                          {!isFirstRound && (
                            <div className="mb-4">
                              <label className="form-label fw-semibold">
                                Select Share Class Type <span className="text-danger fs-5">*</span>
                                {errors.shareClassType && (
                                  <div className="text-danger small mt-1 is-invalid">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors.shareClassType}
                                  </div>
                                )}
                              </label>
                              <div className="row mt-3">
                                {options.map((opt) => {
                                  const disabled = !firstStepCompleted && opt !== "Founder Shares (Family and Friends)" && !id;
                                  return (
                                    <div key={opt} className="col-md-6 mb-3">
                                      <div
                                        className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${selected === opt ? "bg-light" : "border-gray-300"
                                          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                                        onClick={() => handleOptionClick(opt, disabled)}
                                      >
                                        <div className="form-check">
                                          <input
                                            type="radio"
                                            name="shareClassType"
                                            value={opt}
                                            checked={selected === opt}
                                            onChange={() => handleOptionClick(opt, disabled)}
                                            className="form-check-input"
                                            disabled={disabled}
                                          />
                                          <label className="form-check-label fw-medium">
                                            {opt}
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Conditional Field for OTHER option (only for Round 1+) */}
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

                                  // Validate founder allocations
                                  let hasFounderShares = false;
                                  let totalShares = 0;
                                  let hasValidShares = false;

                                  foundersData.forEach((founder, index) => {
                                    const shares = parseInt(founder.shares) || 0;

                                    // Check if shares field is empty or invalid
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
                                  if (!selected) {
                                    newErrors.shareClassType = "Please select a share class type";
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

                                  setActiveSection("description");
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
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
                            visibleFields={["shareclass"]}
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
                                  <strong>What it is:</strong> A strategic
                                  summary that links the equity class to its
                                  purpose, issuance context, and recipient
                                  group.
                                  <br />
                                  <strong>Why it matters:</strong> Investors use
                                  this to understand the logic behind each
                                  class, e.g. who holds it, under what
                                  conditions it was granted.
                                  <br />
                                  <strong>How to fill it:</strong> Detail the
                                  rationale and stakeholders behind issuance.
                                  Think of this as the “why” behind the class.
                                  For example:
                                  <br />– Reserved for key hires under Employee
                                  Stock Option Pool
                                  <br />– Issued to seed investors during SAFE
                                  conversion in 2022
                                  <br />– Created for strategic Gulf partner
                                  with board observer rights
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
                              onClick={() => setActiveSection("shareclass")}
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
                                  setActiveSection("instrument"); // next section
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
                                  onClick={() => setActiveSection("description")}
                                >
                                  <i className="bi bi-arrow-left me-2"></i>Back
                                </button>
                                <button
                                  className="global_btn w-fit"
                                  onClick={() => setActiveSection("roundsize")}
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
                                      Common classes include "Common Stock" for founders/employees
                                      and "Preferred" shares for investors.
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

                                <div className="row mt-3">
                                  {instrumentOptions.map((opt) => (
                                    <div key={opt.value} className="col-md-6 mb-3">
                                      <div
                                        className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData.instrumentType === opt.value ? "bg-light" : "border-gray-300"
                                          } ${errors.instrumentType ? "border-danger" : ""}`}
                                        onClick={() => {
                                          handleInputChange("instrumentType", opt.value);
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
                              {formData.instrumentType === "Common Stock" && (
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
                              )}

                              {formData.instrumentType === "Preferred Equity" && (
                                <div className="mt-3 p-3 border rounded bg-light">
                                  <h5>Preferred Equity Details</h5>
                                  <label className="form-label">
                                    Company Valuation <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control mb-3 ${errors.preferred_valuation ? "is-invalid" : ""}`}
                                    value={formData.preferred_valuation || ""}
                                    onChange={(e) => handleInputChange("preferred_valuation", e.target.value)}
                                    placeholder="Enter company valuation"
                                  />
                                  {errors.preferred_valuation && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.preferred_valuation}
                                    </div>
                                  )}

                                  <div className="form-check mb-3">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="hasWarrants_preferred"
                                      checked={formData.hasWarrants_preferred || false}
                                      onChange={(e) => handleInputChange("hasWarrants_preferred", e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="hasWarrants_preferred">
                                      Add Warrants (optional)
                                    </label>
                                  </div>

                                  {formData.hasWarrants_preferred && (
                                    <>
                                      <label className="form-label">Exercise Price (Strike Price)</label>
                                      <input
                                        type="number"
                                        className="form-control mb-3"
                                        value={formData.exercisePrice_preferred || ""}
                                        onChange={(e) => handleInputChange("exercisePrice_preferred", e.target.value)}
                                        placeholder="Enter exercise price"
                                      />

                                      <label className="form-label">Expiration Date</label>
                                      <input
                                        type="date"
                                        className="form-control mb-3"
                                        value={formData.expirationDate_preferred || ""}
                                        onChange={(e) => handleInputChange("expirationDate_preferred", e.target.value)}
                                      />

                                      <label className="form-label">Warrant Ratio</label>
                                      <input
                                        type="text"
                                        className="form-control mb-3"
                                        value={formData.warrantRatio_preferred || ""}
                                        onChange={(e) => handleInputChange("warrantRatio_preferred", e.target.value)}
                                        placeholder="1:1 or custom ratio"
                                      />

                                      <label className="form-label">Type of Warrant</label>
                                      <select
                                        className="form-control mb-3"
                                        value={formData.warrantType_preferred || "CALL"}
                                        onChange={(e) => handleInputChange("warrantType_preferred", e.target.value)}
                                      >
                                        <option value="CALL">Call Warrant (buy shares)</option>
                                        <option value="PUT">Put Warrant (sell shares)</option>
                                      </select>
                                    </>
                                  )}
                                </div>
                              )}

                              {formData.instrumentType === "Safe" && (
                                <div className="mt-3 p-3 border rounded bg-light">
                                  <h5>SAFE Details</h5>
                                  <label className="form-label">
                                    Valuation Cap <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control mb-3 ${errors.valuationCap ? "is-invalid" : ""}`}
                                    value={formData.valuationCap || ""}
                                    onChange={(e) => handleInputChange("valuationCap", e.target.value)}
                                    placeholder="Enter valuation cap"
                                  />
                                  {errors.valuationCap && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.valuationCap}
                                    </div>
                                  )}

                                  <label className="form-label">
                                    Discount Rate (%) <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control mb-3 ${errors.discountRate ? "is-invalid" : ""}`}
                                    value={formData.discountRate || ""}
                                    onChange={(e) => handleInputChange("discountRate", e.target.value)}
                                    placeholder="Enter discount rate (10-25%)"
                                  />
                                  {errors.discountRate && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.discountRate}
                                    </div>
                                  )}

                                  <label className="form-label">
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
                                  </div>
                                  {errors.safeType && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.safeType}
                                    </div>
                                  )}
                                </div>
                              )}

                              {formData.instrumentType === "Convertible Note" && (
                                <div className="mt-3 p-3 border rounded bg-light">
                                  <h5>Convertible Note Details</h5>
                                  <label className="form-label">
                                    Valuation Cap <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control mb-3 ${errors.valuationCap_note ? "is-invalid" : ""}`}
                                    value={formData.valuationCap_note || ""}
                                    onChange={(e) => handleInputChange("valuationCap_note", e.target.value)}
                                    placeholder="Enter valuation cap"
                                  />
                                  {errors.valuationCap_note && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.valuationCap_note}
                                    </div>
                                  )}

                                  <label className="form-label">
                                    Discount Rate (%) <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className={`form-control mb-3 ${errors.discountRate_note ? "is-invalid" : ""}`}
                                    value={formData.discountRate_note || ""}
                                    onChange={(e) => handleInputChange("discountRate_note", e.target.value)}
                                    placeholder="Enter discount rate (10–30%)"
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
                                  <input
                                    type="number"
                                    className={`form-control mb-3 ${errors.interestRate_note ? "is-invalid" : ""}`}
                                    value={formData.interestRate_note || ""}
                                    onChange={(e) => handleInputChange("interestRate_note", e.target.value)}
                                    placeholder="Enter annual interest rate"
                                  />
                                  {errors.interestRate_note && (
                                    <div className="text-danger small">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.interestRate_note}
                                    </div>
                                  )}

                                  <label className="form-label">
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
                                  )}
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
                                  onClick={() => setActiveSection("description")}
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
                                      case "Common Stock":
                                        if (!formData.common_stock_valuation || Number(formData.common_stock_valuation) <= 0) {
                                          newErrors.common_stock_valuation = "Company valuation is required and must be greater than 0";
                                        }
                                        break;
                                      case "Preferred Equity":
                                        if (!formData.preferred_valuation || Number(formData.preferred_valuation) <= 0) {
                                          newErrors.preferred_valuation = "Company Valuation is required and must be greater than 0";
                                        }
                                        break;
                                      case "Safe":
                                        if (!formData.valuationCap) newErrors.valuationCap = "This field is required";
                                        if (!formData.discountRate) newErrors.discountRate = "This field is required";
                                        if (!formData.safeType) newErrors.safeType = "This field is required";
                                        break;
                                      case "Convertible Note":
                                        if (!formData.valuationCap_note) newErrors.valuationCap_note = "This field is required";
                                        if (!formData.discountRate_note) newErrors.discountRate_note = "This field is required";
                                        if (!formData.maturityDate) newErrors.maturityDate = "This field is required";
                                        if (!formData.interestRate_note) newErrors.interestRate_note = "This field is required";
                                        if (!formData.convertibleTrigger) newErrors.convertibleTrigger = "This field is required";
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
                                      setActiveSection("roundsize");
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
                                <div className="col-md-6 mb-4">
                                  <label className="form-label fw-semibold">
                                    Amount{" "}
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
                                        Round size is the total capital an early-stage company seeks to raise in a financing round,
                                        typically through equity, SAFEs, or convertible notes, and plays a critical role in determining
                                        ownership dilution, investor rights, and cap table structure. It's the headline number often
                                        seen in investor decks ("We're raising $2 million in our Seed round"), but beneath that number
                                        sits a complex mix of legal, strategic, and operational considerations. Getting it right is
                                        essential: raising too little risks running out of funds before hitting key milestones, while
                                        raising too much can distort valuations and lead to down rounds. Smart planning ensures funds
                                        last to the next inflection point, supports momentum, and protects founder control.
                                      </div>
                                    </span>
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
                                <div className="col-md-6 mb-4">
                                  <label className="form-label fw-semibold">
                                    Currency
                                    <span className="text-danger fs-5 ms-1">*</span>
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
                              </div>

                              {/* Investment Round Information */}
                              <div className="alert alert-info mt-3">
                                <strong>Investment Round:</strong> This amount represents the total capital you are raising from investors in this round.
                              </div>
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => setActiveSection("instrument")}
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
                                  setActiveSection("issuedshares");
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
                            {isFirstRound ? "Round 0 - Share Allocation Summary" : "Specify the total number of shares being issued in this round only"}
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
                                      <strong>Price Per Share:</strong> ${formData.pricePerShare || '0.00'}
                                    </div>
                                    <div className="mb-3">
                                      <strong>Total Company Value:</strong> ${calculateTotalValue()}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <strong>Number of Founders:</strong> {founderCount}
                                    </div>
                                    {/* <div className="mb-3">
                                      <strong>Round Status:</strong> <span className="text-success">COMPLETED</span>
                                    </div> */}
                                    <div className="mb-3">
                                      <strong>Round Date:</strong> Company Incorporation Date
                                    </div>
                                  </div>
                                </div>

                                {/* Founder Ownership Breakdown */}
                                {calculateTotalShares() > 0 && (
                                  <div className="mt-4">
                                    <h6>Founder Ownership Breakdown:</h6>
                                    <div className="table-responsive">
                                      <table className="table table-sm table-bordered">
                                        <thead>
                                          <tr>
                                            <th>Founder</th>
                                            <th>Shares</th>
                                            <th>Ownership %</th>
                                            <th>Share Type</th>
                                            <th>Voting Rights</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {foundersData.map((founder, index) => {
                                            const shares = parseInt(founder.shares) || 0;
                                            const percentage = calculateTotalShares() > 0
                                              ? ((shares / calculateTotalShares()) * 100).toFixed(1)
                                              : '0.0';
                                            return (
                                              <tr key={index}>
                                                <td>Founder {index + 1}</td>
                                                <td>{shares.toLocaleString()}</td>
                                                <td>{percentage}%</td>
                                                <td>{founder.shareType === 'common' ? 'Common Shares' : 'Preferred Shares'}</td>
                                                <td>{founder.voting === 'voting' ? 'Voting' : 'Non-Voting'}</td>
                                              </tr>
                                            );
                                          })}
                                        </tbody>
                                      </table>
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
                                </ul>
                              </div>
                            </div>
                          ) : (
                            /* REGULAR INVESTMENT ROUND - Show original fields */
                            <div className="row">
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
                              <div className="col-md-6 mb-4">
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
                              onClick={() => setActiveSection("roundsize")}
                            >
                              Back
                            </button>
                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                // For Round 0, no validation needed for these fields
                                if (isFirstRound) {
                                  setActiveSection("rights");
                                  return;
                                }

                                // Original validation for investment rounds
                                const newErrors = {};

                                // 2️⃣ Validate round status selection
                                if (!formData.roundStatus) {
                                  newErrors.roundStatus = "Please select CLOSED or ACTIVE";
                                }

                                // 3️⃣ Validate dateroundclosed only if CLOSED
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
                                  setActiveSection("rights");
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
                                      <br />– Full voting rights on major company decisions
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
                                      <strong>What it is:</strong> Specifies the negotiated powers and entitlements that
                                      holders of this class enjoy — it's the fine print investors care about.
                                      <br />
                                      <strong>Why it matters:</strong> This defines control dynamics, dividend rights, conversion
                                      triggers, redemption clauses, anti-dilution, etc. It's the architecture of deal terms.
                                      <br />
                                      <strong>How to fill it:</strong> Reference exact clauses from investor agreements (term
                                      sheets or subscription documents) and simplify into readable but accurate summaries.
                                      <br />– Non-cumulative dividends at 6% annually
                                      <br />– Automatic conversion on qualified financing &gt;$5M
                                      <br />– Protective provisions for mergers, board expansion, and budget approvals
                                      <br />– Anti-dilution protection (full-ratchet or weighted-average)
                                      <br />– Redemption rights after 5 years
                                      <br />– Pre-emptive rights for future rounds
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
                              <div className="common-rights-info p-3 bg-light rounded mb-4">
                                <h6>Common Investor Rights in Investment Rounds:</h6>
                                <ul className="mb-0 small">
                                  <li><strong>Dividend Preferences:</strong> Cumulative/non-cumulative, participation rights</li>
                                  <li><strong>Conversion Rights:</strong> Automatic or voluntary conversion triggers</li>
                                  <li><strong>Protective Provisions:</strong> Veto rights on major decisions</li>
                                  <li><strong>Anti-dilution:</strong> Full-ratchet or weighted-average protection</li>
                                  <li><strong>Liquidation Preference:</strong> Multiple and participation rights</li>
                                  <li><strong>Redemption Rights:</strong> Option to sell back shares after certain period</li>
                                </ul>
                              </div>
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => setActiveSection("issuedshares")}
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
                                    setActiveSection("voting"); // Skip liquidation for Round 0
                                  } else {
                                    setActiveSection("liquidation");
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
                                  onClick={() => setActiveSection("convertible")}
                                >
                                  Continue to Next Section
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* OTHER ROUNDS - Show liquidation preference fields */
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
                                      <strong>What it is:</strong> Establishes the order and magnitude of payouts
                                      if the company is sold or dissolved. Determines who gets paid first and how much.
                                      <br />
                                      <strong>Why it matters:</strong> Investors look here to understand downside protection
                                      and exit expectations — it's one of the most scrutinized clauses during fundraising.
                                      <br />
                                      <strong>How to fill it:</strong> Clearly outline whether it's non-participating
                                      (just the preference) or participating (preference + pro-rata share), and how it
                                      stacks with other rounds.
                                      <br />
                                      <strong>Key Terms:</strong>
                                      <br />– <strong>1x Preference:</strong> Investor gets 1x investment back first
                                      <br />– <strong>Participating:</strong> Get preference + share in remaining proceeds
                                      <br />– <strong>Non-Participating:</strong> Choose between preference or conversion to common
                                      <br />– <strong>Stacking:</strong> How different rounds interact (pari passu or senior)
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
                                </div>
                              </div>

                              <div className="row mt-3">
                                <label className="form-label fw-semibold">
                                  Liquidation Preference Type{" "}
                                  <span style={{ color: "var(--primary)" }}>*</span>
                                  {errors.liquidation && (
                                    <span className="text-danger small ms-2">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.liquidation}
                                    </span>
                                  )}
                                </label>

                                {liquidationOptions.map((opt) => (
                                  <div key={opt.value} className="col-md-6 mb-3">
                                    <div
                                      className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData?.liquidation?.includes(opt.value)
                                        ? "bg-light"
                                        : "border-gray-300"
                                        } ${errors.liquidation ? "is-invalid" : ""}`}
                                      onClick={() => {
                                        let updatedSelection = [...(formData?.liquidation || [])];

                                        if (opt.value === "N/A") {
                                          updatedSelection = ["N/A"];
                                        } else if (opt.value === "OTHER") {
                                          updatedSelection = updatedSelection.filter((v) => v !== "N/A");
                                          if (!updatedSelection.includes("OTHER")) {
                                            updatedSelection.push("OTHER");
                                          } else {
                                            updatedSelection = updatedSelection.filter((v) => v !== "OTHER");
                                          }
                                        } else {
                                          updatedSelection = updatedSelection.filter((v) => v !== "N/A");
                                          if (updatedSelection.includes(opt.value)) {
                                            updatedSelection = updatedSelection.filter((v) => v !== opt.value);
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
                                          name="liquidation"
                                          value={opt.value}
                                          checked={
                                            formData?.liquidation?.includes(opt.value) || false
                                          }
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

                                {formData?.liquidation?.includes("OTHER") && (
                                  <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                      Custom Liquidation Preference:
                                      <span className="text-danger fs-5 ms-1">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Enter custom liquidation preference"
                                      value={formData.liquidationOther || ""}
                                      onChange={(e) => {
                                        handleInputChange("liquidationOther", e.target.value);
                                        if (errors.liquidationOther) {
                                          setErrors((prev) => ({
                                            ...prev,
                                            liquidationOther: "",
                                          }));
                                        }
                                      }}
                                      className={`form-control ${errors.liquidationOther ? "is-invalid" : ""}`}
                                    />
                                    {errors.liquidationOther && (
                                      <div className="text-danger small">
                                        <i className="bi bi-exclamation-circle me-1"></i>
                                        {errors.liquidationOther}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Liquidation Preference Information */}
                              <div className="alert alert-info mt-4">
                                <strong>Understanding Liquidation Preferences:</strong>
                                <ul className="mb-0 mt-2 small">
                                  <li><strong>1x Preference:</strong> Basic protection - get investment back first</li>
                                  <li><strong>Multiple Preference:</strong> Get 2x, 3x, etc. of investment back first</li>
                                  <li><strong>Participating:</strong> Get preference amount AND share remaining proceeds</li>
                                  <li><strong>Non-Participating:</strong> Choose between preference OR converting to common shares</li>
                                  <li><strong>Capped Participating:</strong> Participation stops at a certain multiple</li>
                                </ul>
                              </div>
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => setActiveSection("rights")}
                            >
                              Back
                            </button>

                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                // For Round 0, skip validation and navigate directly
                                if (isFirstRound) {
                                  setActiveSection("convertible");
                                  return;
                                }

                                // Validate before proceeding for other rounds
                                const newErrors = {};

                                // Check if at least one liquidation option is selected
                                if (formData.liquidation.length === 0) {
                                  newErrors.liquidation = "Please select a liquidation preference type";
                                }

                                // Check if OTHER is selected but the text input is empty
                                if (formData.liquidation.includes("OTHER")) {
                                  if (!formData.liquidationOther || !formData.liquidationOther.trim()) {
                                    newErrors.liquidationOther = "This field is required";
                                  }
                                }

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
                                  setActiveSection("convertible");
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}

                      {activeSection === "convertible" && (
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
                            ]}
                            isFirstRound={isFirstRound}
                            foundersData={foundersData}
                            calculateTotalShares={calculateTotalShares}
                            calculateTotalValue={calculateTotalValue}
                            founderCount={founderCount}
                          />

                          <h3 className="h5 mb-4 text-gray-800">
                            {isFirstRound ? "Round 0 - Share Convertibility" : "Convertible Features"}
                          </h3>

                          {/* ROUND 0 - Founder Share Convertibility */}
                          {isFirstRound ? (
                            <div className="round-zero-content">
                              <div className="alert alert-info mb-4">
                                <strong>Round 0 Information:</strong> Founder shares are typically common shares
                                and may have specific conversion terms in your incorporation documents.
                              </div>

                              <div className="mb-4">
                                <label className="form-label fw-semibold">
                                  Are Founder Shares Convertible?{" "}
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
                                      <strong>For Round 0 (Founder Shares):</strong> Indicate if founder shares
                                      can be converted to other share classes, typically to preferred shares
                                      during future investment rounds.
                                      <br />
                                      <strong>Common Scenarios:</strong>
                                      <br />– <strong>No:</strong> Founder shares remain as common shares
                                      <br />– <strong>Yes:</strong> Founder shares can convert to preferred shares
                                      under specific conditions (rare)
                                      <br />
                                      <strong>Note:</strong> Most founder shares are common shares and do not convert.
                                      Conversion typically applies to investor instruments like convertible notes or SAFEs.
                                    </div>
                                  </span>
                                </label>
                                <div className="d-flex gap-3">
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      name="convertible"
                                      value="Yes"
                                      checked={formData.convertible === "Yes"}
                                      onChange={() => {
                                        handleInputChange("convertible", "Yes");
                                        if (errors.convertible) {
                                          setErrors((prev) => ({
                                            ...prev,
                                            convertible: "",
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
                                      name="convertible"
                                      value="No"
                                      checked={formData.convertible === "No" || formData.convertible === ""}
                                      onChange={() => {
                                        handleInputChange("convertible", "No");
                                        if (errors.convertible) {
                                          setErrors((prev) => ({
                                            ...prev,
                                            convertible: "",
                                          }));
                                        }
                                      }}
                                      className="form-check-input"
                                    />
                                    <label className="form-check-label">No</label>
                                  </div>
                                </div>
                                <div className="form-text">
                                  Most founder shares are common shares and are not convertible. Select "No" unless your incorporation documents specify otherwise.
                                </div>
                              </div>

                              {/* Show conversion details only if Yes for Round 0 */}
                              {formData.convertible === "Yes" && (
                                <div className="mb-4 p-3 border rounded bg-light">
                                  <h6>Founder Share Conversion Details</h6>
                                  <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                      Conversion Conditions
                                    </label>
                                    <textarea
                                      placeholder="Describe the conditions under which founder shares can convert (e.g., automatic conversion upon qualified financing, voluntary conversion option)"
                                      className="textarea_input"
                                      rows="3"
                                      value={formData.convertibleType || ""}
                                      onChange={(e) => handleInputChange("convertibleType", e.target.value)}
                                    />
                                    <div className="form-text">
                                      Example: "Founder common shares automatically convert to Series A preferred shares upon closing of a $1M+ financing round."
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Round 0 Convertibility Information */}
                              <div className="alert alert-warning mt-3">
                                <strong>Note about Founder Share Convertibility:</strong>
                                <ul className="mb-0 mt-2 small">
                                  <li>Founder shares are typically common shares and remain as common shares</li>
                                  <li>Conversion features are more common for investor instruments (SAFEs, convertible notes)</li>
                                  <li>If your incorporation documents don't mention conversion, select "No"</li>
                                  <li>Consult your legal advisor if unsure about conversion terms</li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            /* OTHER ROUNDS - Investor Convertible Features */
                            <div className="investment-round-content">
                              <div className="mb-4">
                                <label className="form-label fw-semibold">
                                  Shares are convertible{" "}
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
                                      <strong>What it is:</strong> Indicate the conditions under which the security,
                                      typically a convertible note or SAFE, automatically or optionally converts into
                                      another class of shares, most commonly Common Stock.
                                      <br />
                                      <strong>Why it matters:</strong> Impacts equity dilution, IPO readiness, and
                                      governance transitions. This is key in modelling cap table evolution.
                                      <br />
                                      <strong>How to fill it:</strong> Yes/No + trigger mechanisms (voluntary, automatic, conditional)
                                      <br />
                                      <strong>Common Convertible Instruments:</strong>
                                      <br />– <strong>Convertible Notes:</strong> Debt that converts to equity
                                      <br />– <strong>SAFEs:</strong> Simple Agreement for Future Equity
                                      <br />– <strong>Preferred Stock:</strong> May convert to common upon IPO
                                    </div>
                                  </span>{" "}
                                  <span style={{ color: "var(--primary)" }}>*</span>
                                </label>
                                <div className="d-flex gap-3">
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      name="convertible"
                                      value="Yes"
                                      checked={formData.convertible === "Yes"}
                                      onChange={() => {
                                        handleInputChange("convertible", "Yes");
                                        if (errors.convertible) {
                                          setErrors((prev) => ({
                                            ...prev,
                                            convertible: "",
                                          }));
                                        }
                                      }}
                                      className={`form-check-input ${errors.convertible ? "is-invalid" : ""}`}
                                    />
                                    <label className="form-check-label">Yes</label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      type="radio"
                                      name="convertible"
                                      value="No"
                                      checked={formData.convertible === "No"}
                                      onChange={() => {
                                        handleInputChange("convertible", "No");
                                        if (errors.convertible) {
                                          setErrors((prev) => ({
                                            ...prev,
                                            convertible: "",
                                          }));
                                        }
                                      }}
                                      className={`form-check-input ${errors.convertible ? "is-invalid" : ""}`}
                                    />
                                    <label className="form-check-label">No</label>
                                  </div>
                                </div>

                                {errors.convertible && (
                                  <div className="text-danger small mt-1">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors.convertible}
                                  </div>
                                )}
                              </div>

                              {/* Show only if YES for investment rounds */}
                              {formData.convertible === "Yes" && (
                                <div className="mb-4">
                                  <label className="form-label fw-semibold">
                                    Convertible Type{" "}
                                    <span style={{ color: "var(--primary)" }}>*</span>
                                  </label>
                                  <div className="row mt-2">
                                    {["Voluntary", "Automatic", "Conditional"].map((opt) => (
                                      <div key={opt} className="col-md-4 mb-3">
                                        <div
                                          className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData.convertibleType === opt
                                            ? "bg-light"
                                            : errors.convertibleType
                                              ? "border-danger"
                                              : "border-gray-300"
                                            }`}
                                          onClick={() => {
                                            handleInputChange("convertibleType", opt);
                                            if (errors.convertibleType) {
                                              setErrors((prev) => ({
                                                ...prev,
                                                convertibleType: "",
                                              }));
                                            }
                                          }}
                                        >
                                          <div className="form-check">
                                            <input
                                              type="radio"
                                              name="convertibleType"
                                              value={opt}
                                              checked={formData.convertibleType === opt}
                                              onChange={() => {
                                                handleInputChange("convertibleType", opt);
                                                if (errors.convertibleType) {
                                                  setErrors((prev) => ({
                                                    ...prev,
                                                    convertibleType: "",
                                                  }));
                                                }
                                              }}
                                              className="form-check-input"
                                            />
                                            <label className="form-check-label fw-medium">
                                              {opt}
                                            </label>
                                          </div>
                                          <p className="text-muted small mb-0 mt-2">
                                            {opt === "Voluntary" && "Investor chooses when to convert"}
                                            {opt === "Automatic" && "Automatic conversion upon specific triggers"}
                                            {opt === "Conditional" && "Conversion based on meeting certain conditions"}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  {errors.convertibleType && (
                                    <div className="text-danger small mt-1">
                                      <i className="bi bi-exclamation-circle me-1"></i>
                                      {errors.convertibleType}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => setActiveSection(isFirstRound ? "rights" : "liquidation")}
                            >
                              Back
                            </button>

                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                const newErrors = {};

                                if (isFirstRound) {
                                  // ROUND 0 VALIDATION - Convertible is optional for founder shares
                                  // No validation needed, can be empty or "No"
                                  if (formData.convertible === "Yes" && !formData.convertibleType) {
                                    newErrors.convertibleType = "Please describe the conversion conditions";
                                  }
                                } else {
                                  // OTHER ROUNDS VALIDATION - Convertible is important for investors
                                  if (!formData.convertible) {
                                    newErrors.convertible = "Please select Yes or No";
                                  }
                                  if (formData.convertible === "Yes" && !formData.convertibleType) {
                                    newErrors.convertibleType = "Please select Voluntary, Automatic or Conditional";
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
                                  setActiveSection("voting");
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}
                      {activeSection === "voting" && (
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
                                      <ul className="mb-0 mt-2">
                                        <li>Election of board directors</li>
                                        <li>Approval of major corporate transactions</li>
                                        <li>Changes to company charter or bylaws</li>
                                        <li>Issuance of new equity securities</li>
                                        <li>Approval of annual budgets</li>
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Investor Voting Information */}
                              <div className="alert alert-info mt-3">
                                <strong>Note about Investor Voting Rights:</strong>
                                <ul className="mb-0 mt-2 small">
                                  <li>Preferred shareholders typically have voting rights on as-converted basis</li>
                                  <li>Some voting matters may require separate class votes</li>
                                  <li>Protective provisions often give veto rights on key decisions</li>
                                  <li>Voting agreements may pool votes for board representation</li>
                                </ul>
                              </div>
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => setActiveSection("convertible")}
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
                                    setActiveSection("notes"); // Skip term sheet and subscription for Round 0
                                  } else {
                                    setActiveSection("termsheet");
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
                                  onClick={() => setActiveSection("notes")}
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
                                      <br />
                                      <strong>Key Elements in Term Sheets:</strong>
                                      <br />– Valuation (pre-money and post-money)
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
                              <div className="alert alert-info mt-3">
                                <strong>About Term Sheets:</strong>
                                <ul className="mb-0 mt-2 small">
                                  <li>Term sheets are non-binding but set the framework for the deal</li>
                                  <li>They outline key economic and control terms</li>
                                  <li>Typically negotiated between company and lead investor</li>
                                  <li>Forms the basis for legal documentation</li>
                                  <li>Exclusivity periods are common in term sheets</li>
                                </ul>
                              </div>
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => setActiveSection("voting")}
                            >
                              Back
                            </button>

                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                // For Round 0, skip validation and navigate directly to notes
                                if (isFirstRound) {
                                  setActiveSection("notes");
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
                                  setActiveSection("subscription");
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
                                  onClick={() => setActiveSection("notes")}
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
                                      Subscription documents are the formal, legally binding agreements that an investor
                                      signs to purchase equity in a company after a term sheet has been agreed upon.
                                      These include the Subscription Agreement, which outlines how many shares the
                                      investor is buying, at what price, and under what terms.
                                      <br />
                                      <br />
                                      <strong>Common Subscription Documents:</strong>
                                      <br />– <strong>Subscription Agreement:</strong> Primary investment contract
                                      <br />– <strong>Shareholders' Agreement:</strong> Governance and rights
                                      <br />– <strong>Investor Rights Agreement:</strong> Information and registration rights
                                      <br />– <strong>Board Consent:</strong> Formal board approval of the round
                                      <br />– <strong>Side Letters:</strong> Special terms for specific investors
                                      <br />
                                      <br />
                                      These documents legally commit the investor to the deal and obligate the company
                                      to issue shares in exchange for capital.
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
                              <div className="alert alert-info mt-3">
                                <strong>About Subscription Documents:</strong>
                                <ul className="mb-0 mt-2 small">
                                  <li>These are legally binding contracts that finalize the investment</li>
                                  <li>Typically include representations, warranties, and covenants</li>
                                  <li>Must be signed by both company and investors</li>
                                  <li>Funds are transferred upon execution of these documents</li>
                                  <li>Shares are issued after documents are fully executed</li>
                                </ul>
                              </div>
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => setActiveSection("termsheet")}
                            >
                              Back
                            </button>

                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                // For Round 0, skip validation and navigate directly to notes
                                if (isFirstRound) {
                                  setActiveSection("notes");
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
                                  setActiveSection("notes");
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
                                      <br />
                                      <strong>What to include:</strong>
                                      <br />– Special founder arrangements or vesting schedules
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
                                      <br />
                                      <strong>What to include:</strong>
                                      <br />– Background on investor negotiations
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
                              <div className="alert alert-info mt-3">
                                <strong>About Investment Round Notes:</strong>
                                <ul className="mb-0 mt-2 small">
                                  <li>Notes are searchable and can be referenced in future rounds</li>
                                  <li>Include any verbal agreements or understandings not in documents</li>
                                  <li>Document the rationale behind key deal terms</li>
                                  <li>Note any investor relationships or strategic considerations</li>
                                  <li>Record any conditions or milestones tied to the investment</li>
                                </ul>
                              </div>
                            </div>
                          )}

                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => setActiveSection(
                                isFirstRound ? "voting" : "subscription"
                              )}
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
        </div>
      </div>
    </Wrapper>
  );
}
