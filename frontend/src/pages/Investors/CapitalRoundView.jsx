import React, { useState, useEffect, useRef } from "react";
import {
  SectionWrapper,
  Wrapper,
} from "../../components/Styles/RegisterStyles";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaDownload,
  FaMoneyBillWave,
  FaPercentage,
  FaUsers,
  FaFileContract,
  FaSignature,
  FaEye,
  FaLock,
} from "react-icons/fa";
import {
  IoShareSocial,
  IoDocumentText,
  IoBusiness,
  IoStatsChart,
  IoAnalytics,
  IoFileTray
} from "react-icons/io5";
import SideBar from "../../components/Investor/Sidebar.jsx";
import { BackButton } from "../../components/Styles/GlobalStyles.js";
import {
  ArrowLeft,
  TrendingUp,
  Users,
  FileText,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Settings,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SignaturePad from "react-signature-canvas";
import InvestNowPopup from "../../components/Investor/popup/InvestNowPopup.jsx";
import InstrumentDataDisplay from "../../components/Investor/InstrumentDataDisplay.jsx";
import { API_BASE_URL } from "../../config/config.js";
function CapitalRoundView() {
  const { id, company_id } = useParams();
  const [successmessage, setSuccessmessage] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [ShowPopupInvest, setShowPopupInvest] = useState(false);
  const sigPadRef = useRef(null);
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const navigate = useNavigate();
  document.title = "Company Capital Round List - Investor";
  const [errr, seterrr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  var apiURL = API_BASE_URL + "api/user/capitalround/";

  const storedUsername = localStorage.getItem("InvestorData");
  const userLogin = JSON.parse(storedUsername);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [records, setRecords] = useState("");

  // Investment data with proper calculation
  const [investmentData, setInvestmentData] = useState({
    totalRaised: 0,
    investorInvestment: 0,
    remainingAmount: 0,
    progress: 0,
    investorsCount: 0,
    daysLeft: 0,
  });

  useEffect(() => {
    if (records) {
      const roundSize = parseFloat(records.roundsize || 0);

      // Calculate actual total raised from all investment requests
      let actualTotalRaised = 0;
      if (
        records.all_investment_requests &&
        records.all_investment_requests.length > 0
      ) {
        actualTotalRaised = records.all_investment_requests.reduce(
          (total, request) => {
            // Only count confirmed investments (request_confirm === "Yes")
            if (request.request_confirm === "Yes") {
              return total + parseFloat(request.investment_amount || 0);
            }
            return total;
          },
          0
        );
      }

      const remainingAmount = Math.max(0, roundSize - actualTotalRaised);

      // Progress calculation (as percentage) - corrected
      const progress =
        roundSize > 0 ? (actualTotalRaised / roundSize) * 100 : 0;

      // Calculate days left (if `dateroundclosed` exists)
      let daysLeft = 0;
      if (records.dateroundclosed) {
        const today = new Date();
        const closingDate = new Date(records.dateroundclosed);
        const diffTime = closingDate - today;
        daysLeft =
          diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
      }

      // Find current investor's investment amount
      let currentInvestorAmount = 0;
      if (
        records.all_investment_requests &&
        records.all_investment_requests.length > 0
      ) {
        const currentInvestorRequest = records.all_investment_requests.find(
          (request) => request.investor_id === userLogin.id
        );
        if (currentInvestorRequest) {
          currentInvestorAmount = parseFloat(
            currentInvestorRequest.investment_amount || 0
          );
        }
      }

      setInvestmentData({
        totalRaised: actualTotalRaised,
        investorInvestment: currentInvestorAmount,
        remainingAmount,
        progress,
        investorsCount: records.all_investment_requests
          ? records.all_investment_requests.length
          : 0,
        daysLeft,
      });
    }
  }, [records, userLogin.id]);

  const handleInvestNow = () => {
    setShowPopupInvest(true);
  };

  const handleClosePopup = () => {
    setShowPopupInvest(false);
  };

  // Add these states at the top
  const [signatureText, setSignatureText] = useState("");
  const [signatureFontStyle, setSignatureFontStyle] = useState("normal");
  const [useTextSignature, setUseTextSignature] = useState(false);

  // Function to get font style
  const getSignatureTextStyle = () => {
    const baseStyle = {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#000',
      minHeight: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    switch (signatureFontStyle) {
      case 'italic':
        return { ...baseStyle, fontStyle: 'italic', fontFamily: 'Georgia, serif' };
      case 'cursive':
        return { ...baseStyle, fontFamily: 'Brush Script MT, cursive', fontSize: '28px' };
      case 'bold':
        return { ...baseStyle, fontWeight: 'bold' };
      default:
        return baseStyle;
    }
  };

  // Toggle font style function
  const toggleSignatureStyle = () => {
    const styles = ['normal', 'italic', 'cursive', 'bold'];
    const currentIndex = styles.indexOf(signatureFontStyle);
    const nextIndex = (currentIndex + 1) % styles.length;
    setSignatureFontStyle(styles[nextIndex]);
  };

  // Add to your states
  const [signatureType, setSignatureType] = useState('draw'); // 'draw' or 'text'


  // Update saveSignature function
  console.log(records)
  const saveSignature = async () => {

    if (!isAllTermsAccepted()) {
      seterrr(true);
      setSuccessmessage("Please accept all terms and conditions before signing!");
      setTimeout(() => {
        seterrr(false);
        setSuccessmessage("");
      }, 3500);
      return;
    }
    console.log('klkl', signatureType)
    // Validate based on selected type
    if (signatureType === 'draw') {
      if (!sigPadRef.current || sigPadRef.current.isEmpty()) {
        seterrr(true);
        setSuccessmessage("Please draw your signature first!");
        setTimeout(() => {
          seterrr(false);
          setSuccessmessage("");
        }, 3500);
        return;
      }
    } else if (signatureType === 'text') {
      if (!signatureText.trim()) {
        seterrr(true);
        setSuccessmessage("Please type your signature first!");
        setTimeout(() => {
          seterrr(false);
          setSuccessmessage("");
        }, 3500);
        return;
      }
    }

    // Create signature data based on type
    let signatureData;
    if (signatureType === 'draw') {
      signatureData = sigPadRef.current.toDataURL("image/png");
    } else {
      signatureData = await createTextSignatureImage();
    }

    let formData = {
      user_id: userLogin.id,
      id: records.sharerecordround_id,
      signature_authorize: signatureData,
      signature_type: signatureType,
      signature_text: signatureType === 'text' ? signatureText : null,
      company_id: records.user_id,
      reports: records,
      company_id: records.company_id,
      termsChecked: termsChecked.acceptAll
    };
    try {
      const res = await axios.post(
        apiURL + "investorrecordAuthorize",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      getcheckCapitalMotionlist();
      seterrr(false);
      setSuccessmessage(
        "Your subscription has been signed successfully. Please proceed with the fund transfer. Shares will be formally allocated to you once the company confirms the receipt of funds"
      );
      setTimeout(() => {
        setSuccessmessage("");
      }, 10000);
    } catch (err) { }

    // ... rest of the code
  };

  // Update clearSignature function
  const clearSignature = () => {
    if (signatureType === 'draw' && sigPadRef.current) {
      sigPadRef.current.clear();
    } else if (signatureType === 'text') {
      setSignatureText("");
    }
    setTrimmedDataURL(null);
  };

  // Function to create text signature as image
  const createTextSignatureImage = () => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 150;
      const ctx = canvas.getContext('2d');

      // Set background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font style
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Apply font style
      let fontSize = 40;
      let fontFamily = 'Arial';
      let fontStyle = 'normal';

      switch (signatureFontStyle) {
        case 'italic':
          fontFamily = 'Georgia';
          fontStyle = 'italic';
          break;
        case 'cursive':
          fontFamily = 'Brush Script MT';
          fontSize = 48;
          break;
        case 'bold':
          fontStyle = 'bold';
          break;
      }

      ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
      ctx.fillText(signatureText, canvas.width / 2, canvas.height / 2);

      // Convert to data URL
      const dataUrl = canvas.toDataURL("image/png");
      resolve(dataUrl);
    });
  };

  useEffect(() => {
    getcheckCapitalMotionlist();
    getcheckNextRound();
  }, []);

  const getcheckCapitalMotionlist = async () => {
    setIsLoading(true);
    let formData = {
      investor_id: userLogin.id,
      capital_round_id: id,
    };
    try {
      const res = await axios.post(
        apiURL + "getcheckCapitalMotionlist",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data.results[0]);
      if (res.data.results.length === 0) {
        navigate("/investor/company/capital-round-list/" + company_id);
      } else {
        const recordData = res.data.results[0];
        setRecords(recordData);
        Capitalmotionviewed(recordData);
      }
    } catch (err) {
      console.error("Error fetching capital round data:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const [nextround, setnextround] = useState(false);
  const [nextRoundData, setnextRoundData] = useState("");
  const getcheckNextRound = async () => {
    setIsLoading(true);
    let formData = {
      investor_id: userLogin.id,
      capital_round_id: id,
      company_id,
      company_id,
    };
    try {
      const res = await axios.post(
        apiURL + "getcheckNextRoundForInvestor",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      setnextround(res.data.nextRoundExists);
      setnextRoundData(res.data.nextRoundData);
    } catch (err) {
      console.error("Error fetching capital round data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const Capitalmotionviewed = async (recordData) => {
    let formData = {
      user_id: userLogin.id,
      id: recordData.sharerecordround_id,
    };
    try {
      const res = await axios.post(apiURL + "Capitalmotionviewed", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Error updating viewed status:", err);
    }
  };

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

  const handleBackClick = () => {
    navigate("/investor/company/capital-round-list/" + company_id);
  };

  const handletermsheet = async (url, idd, sharerecordround_id) => {
    let formData = {
      user_id: userLogin.id,
      capital_round_id: id,
      id: sharerecordround_id,
    };

    try {
      const res = await axios.post(
        apiURL + "tersheetdownloadInvestor",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading term sheet:", err);
    }
  };

  const handlesubscriptionDocument = async (url, idd, sharerecordround_id) => {
    let formData = {
      user_id: userLogin.id,
      capital_round_id: id,
      id: sharerecordround_id,
    };

    try {
      const res = await axios.post(
        apiURL + "subscriptiondownloadInvestor",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading subscription document:", err);
    }
  };

  // Calculate financial metrics - Fixed calculations
  // Calculate price per share for this round
  const pricePerShare =
    records.roundsize && records.issuedshares
      ? records.roundsize / records.issuedshares
      : 0;

  // Calculate investor shares for this round
  const investorAmount =
    parseFloat(String(investmentData.investorInvestment).replace(/,/g, "")) ||
    0;
  const investorShares = pricePerShare > 0 ? investorAmount / pricePerShare : 0;

  // Calculate total shares in the company
  // Include: founders' shares + all investors shares in this round
  const founderShares =
    parseFloat(String(records.founderShares || 0).replace(/,/g, "")) || 0;
  const totalShares =
    founderShares +
    parseFloat(String(records.issuedshares).replace(/,/g, "")) || 0;

  // Ownership % = investor shares / total company shares
  const ownership =
    totalShares > 0
      ? ((investorShares / totalShares) * 100).toFixed(2)
      : "0.00";

  // Remaining calculations (optional)
  const totalRaised = investmentData.totalRaised || 0;
  const remainingAmount = Math.max(0, records.roundsize - totalRaised);
  const remainingShares = Math.max(
    0,
    records.issuedshares - totalRaised / pricePerShare
  );

  // Progress percentage
  const progressPercentage = Math.min(
    100,
    (totalRaised / records.roundsize) * 100
  );

  // Parse instrument data
  const parseInstrumentData = (dataString) => {
    if (!dataString) return {};
    try {
      let parsedData = dataString;
      if (typeof parsedData === "string") {
        parsedData = JSON.parse(parsedData);
      }
      if (typeof parsedData === "string") {
        parsedData = JSON.parse(parsedData);
      }
      return parsedData;
    } catch (error) {
      console.error("Error parsing instrument data:", error);
      return {};
    }
  };

  //Terms condition checked
  // Add these states at the top of your component
  const [termsChecked, setTermsChecked] = useState({
    termSheet: false,
    subscription: false,
    acceptAll: false
  });

  const [showTermSheetPreview, setShowTermSheetPreview] = useState(false);
  const [showSubscriptionPreview, setShowSubscriptionPreview] = useState(false);

  // Add these functions
  const handleTermsCheck = (type, checked) => {
    if (type === 'acceptAll') {
      setTermsChecked({
        // termSheet: checked,
        // subscription: checked,
        acceptAll: checked
      });
    } else {
      setTermsChecked(prev => ({
        ...prev,
        [type]: checked
      }));
    }
  };

  const isAllTermsAccepted = () => {
    // Either local state OR database value should be true
    return termsChecked.acceptAll || records.termsChecked === 'true';
  };

  const handleProceedToSignature = () => {
    if (isAllTermsAccepted()) {
      setActiveTab("signature");

      // Optional: Save to backend
      saveTermsAcceptance();
    }
  };

  const saveTermsAcceptance = async () => {
    // try {
    //   const formData = {
    //     investor_id: userLogin.id,
    //     roundrecord_id: records.id,
    //     terms_accepted: true,
    //     accepted_at: new Date().toISOString()
    //   };

    //   await axios.post(apiURL + "saveTermsAcceptance", formData);
    // } catch (error) {
    //   console.error("Error saving terms acceptance:", error);
    // }
  };
  if (isLoading) {
    return (
      <Wrapper className="investor-login-wrapper">
        <div className="fullpage d-block">
          <div className="d-flex align-items-start gap-0">
            <SideBar
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <div
              className={`global_view ${isCollapsed ? "global_view_col" : ""}`}
            >
              <SectionWrapper
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "400px" }}
              >
                <div className="loading-spinner">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  const instrumentData = parseInstrumentData(records.instrument_type_data);
  const downloadAllFiles = async (filesArray, baseUrl, type = "termsheet") => {
    if (!filesArray || filesArray.length === 0) {
      alert("No files available for download");
      return;
    }

    try {
      const files = JSON.parse(filesArray);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const downloadUrl = `${baseUrl}/${file}`;

        // Create download for each file
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = file;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Small delay between downloads to avoid browser blocking
        if (i < files.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
    } catch (error) {
      console.error("Error downloading files:", error);
      alert("Error downloading files");
    }
  };
  const renderFileList = (filesJson, baseUrl, type) => {
    if (!filesJson) return null;

    try {
      const files = JSON.parse(filesJson);

      return (
        <div className="file-list">
          {files.map((file, index) => (
            <div
              key={index}
              className="file-item d-flex justify-content-between align-items-center p-2 border rounded mb-2"
            >
              <div className="d-flex align-items-center">
                <FileText size={14} className="me-2" />
                <span className="file-name">{file}</span>
              </div>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => downloadSingleFile(file, baseUrl)}
                title="Download this file"
              >
                <FaDownload size={12} />
              </button>
            </div>
          ))}
        </div>
      );
    } catch (error) {
      console.error("Error parsing files JSON:", error);
      return <p className="text-danger">Error loading files</p>;
    }
  };
  // Download single file
  const downloadSingleFile = (file, baseUrl) => {
    const downloadUrl = `${baseUrl}/${file}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  console.log(records);
  return (
    <Wrapper className="investor-login-wrapper">
      <div className="fullpage d-block">
        <div className="d-flex align-items-start gap-0">
          <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

          <div
            className={`global_view ${isCollapsed ? "global_view_col" : ""}`}
          >
            <SectionWrapper className="d-block p-md-4 p-3">
              {/* Header Section */}
              <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <BackButton
                    type="button"
                    className="backbtn"
                    onClick={handleBackClick}
                  >
                    <ArrowLeft size={16} className="me-1" /> Back to Rounds
                  </BackButton>
                  <div className="d-flex gap-2">
                    <div className="round-status-badge">
                      <span className="status-active">Active Round</span>
                    </div>
                    <BackButton
                      type="button"
                      disabled={!isAllTermsAccepted() || records.signature_status !== "Yes"}
                      className="global_btn w-fit"
                      onClick={handleInvestNow}
                      style={{
                        opacity: (!isAllTermsAccepted() || records.signature_status !== "Yes") ? 0.4 : 1,
                        cursor: (!isAllTermsAccepted() || records.signature_status !== "Yes") ? 'not-allowed' : 'pointer'
                      }}
                      title={
                        !isAllTermsAccepted() ? "Accept all terms first" :
                          records.signature_status !== "Yes" ? "Complete digital signature first" :
                            "Click to invest"
                      }
                    >
                      {(!isAllTermsAccepted() || records.signature_status !== "Yes") ? (
                        <>
                          <FaLock size={14} className="me-1" />
                          Invest Now (Requirements Pending)
                        </>
                      ) : (
                        <>
                          <FaMoneyBillWave size={14} className="me-1" />
                          Invest Now
                        </>
                      )}
                    </BackButton>
                  </div>
                </div>

                {/* Main Card */}
                <div className="capital-round-card">
                  {/* Header */}
                  <div className="round-header">
                    <div className="header-content">
                      <div className="company-icon">
                        <div className="icon-wrapper">
                          <IoBusiness size={24} />
                        </div>
                      </div>
                      <div className="header-text">
                        <h1 className="round-title">
                          {records.company_name} -{" "}
                          {records.nameOfRound || "Capital Round"}
                        </h1>
                        <p className="round-subtitle">
                          {records.description ||
                            "Investment opportunity details and documentation"}
                        </p>
                        <div className="round-meta">
                          <span className="meta-item">
                            <Clock size={14} className="me-1" />
                            Created: {formatCurrentDate(records.created_at)}
                          </span>
                          <span className="meta-item">
                            <Users size={14} className="me-1" />
                            {investmentData.investorsCount} investors
                            participating
                          </span>
                          <span className="meta-item">
                            <Zap size={14} className="me-1" />
                            {records.shareClassType} Shares
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="funding-progress">
                      <div className="progress-stats">
                        <span>
                          Raised: {records.currency}{" "}
                          {Number(totalRaised).toLocaleString()}
                        </span>
                        <span>
                          Target: {records.currency}{" "}
                          {Number(records.roundsize).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Tabs */}
                  {/* Success Message */}
                  {successmessage && (
                    <div
                      className={`alert-message ${errr ? "error" : "success"}`}
                    >
                      <div className="alert-content">
                        {errr ? (
                          <AlertCircle size={18} />
                        ) : (
                          <CheckCircle size={18} />
                        )}
                        <span>{successmessage}</span>
                      </div>
                      <button
                        className="alert-close"
                        onClick={() => setSuccessmessage("")}
                      >
                        ×
                      </button>
                    </div>
                  )}
                  <div className="round-tabs">
                    <button
                      className={`tab-button ${activeTab === "overview" ? "active" : ""
                        }`}
                      onClick={() => setActiveTab("overview")}
                    >
                      <BarChart3 size={16} className="me-2" />
                      Overview
                    </button>
                    <button
                      className={`tab-button ${activeTab === "terms" ? "active" : ""
                        }`}
                      onClick={() => setActiveTab("terms")}
                    >
                      <Settings size={16} className="me-2" />
                      Rights
                    </button>
                    <button
                      className={`tab-button ${activeTab === "excutivesummary" ? "active" : ""
                        }`}
                      onClick={() => setActiveTab("excutivesummary")}
                    >
                      <IoAnalytics size={16} className="me-2" />
                      Excutive Summary
                    </button>
                    <button
                      className={`tab-button ${activeTab === "documents" ? "active" : ""
                        }`}
                      onClick={() => setActiveTab("documents")}
                    >
                      <IoDocumentText size={16} className="me-2" />
                      Terms & Subscription Documents
                    </button>

                    {/* <button
                      className={`tab-button ${activeTab === "signature" ? "active" : ""
                        }`}
                      onClick={() => setActiveTab("signature")}
                    >
                      <IoAnalytics size={16} className="me-2" />
                      Digital Signature
                    </button> */}
                  </div>



                  {/* Tab Content */}
                  <div className="tab-content">
                    {activeTab === "overview" && (
                      <div className="overview-content">
                        <div className="section-title">
                          <h4>Round Details</h4>
                          <p>Basic information about this investment round</p>
                        </div>

                        <div className="details-grid">
                          <div className="detail-card">
                            <div className="detail-icon">
                              <Target size={20} />
                            </div>
                            <div className="detail-content">
                              <label>Round Name:</label>{" "}
                              <span>
                                <b>{records.nameOfRound || "N/A"}</b>
                              </span>
                            </div>
                          </div>

                          <div className="detail-card">
                            <div className="detail-icon">
                              <IoShareSocial size={20} />
                            </div>
                            <div className="detail-content g-2">
                              <label>Share Class Type:</label>{" "}
                              <span>
                                <b>{records.shareClassType || "N/A"}</b>
                              </span>
                            </div>
                          </div>

                          {records.shareClassType === "OTHER" && (
                            <div className="detail-card">
                              <div className="detail-icon">
                                <Settings size={20} />
                              </div>
                              <div className="detail-content">
                                <label>Custom Share Class:</label>{" "}
                                <span>
                                  <b>{records.shareclassother || "N/A"}</b>
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="detail-card">
                            <div className="detail-icon">
                              <FaMoneyBillWave size={20} />
                            </div>
                            <div className="detail-content">
                              <label>Investment Instrument:</label>{" "}
                              <span>
                                <b>{records.instrumentType || "N/A"}</b>
                              </span>
                            </div>
                          </div>

                          {records.instrumentType === "OTHER" && (
                            <div className="detail-card">
                              <div className="detail-icon">
                                <Settings size={20} />
                              </div>
                              <div className="detail-content">
                                <label>Custom Instrument</label>
                                <span>{records.customInstrument || "N/A"}</span>
                              </div>
                            </div>
                          )}
                          <InstrumentDataDisplay records={records} />
                        </div>

                        {/* Financial Metrics */}
                        <div className="section-title mt-5">
                          <h4>Financial Metrics</h4>
                          <p>Key financial information for this round</p>
                        </div>

                        <div className="metrics-grid">
                          <div className="metric-card primary">
                            <div className="metric-icon">
                              <FaMoneyBillWave size={24} />
                            </div>
                            <div className="metric-content">
                              <label>Target Raise Amount</label>
                              <h3>
                                {records.currency}{" "}
                                {Number(records.roundsize).toLocaleString()}
                              </h3>
                            </div>
                          </div>

                          <div className="metric-card success">
                            <div className="metric-icon">
                              <IoStatsChart size={24} />
                            </div>
                            <div className="metric-content">
                              <label>Price per Share</label>
                              <h3>
                                {records.currency}{" "}
                                {pricePerShare.toLocaleString(undefined, {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3
                                })}

                              </h3>
                            </div>
                          </div>

                          <div className="metric-card warning">
                            <div className="metric-icon">
                              <FaUsers size={24} />
                            </div>
                            <div className="metric-content">
                              <label>Total Shares</label>
                              <h3>
                                {Number(records.issuedshares).toLocaleString("en-US", {
                                  minimumFractionDigits: 3,
                                  maximumFractionDigits: 3,
                                })}

                              </h3>
                            </div>
                          </div>

                          <div className="metric-card info">
                            <div className="metric-icon">
                              <FaPercentage size={24} />
                            </div>
                            <div className="metric-content">
                              <label>Your Ownership</label>
                              <h3>{ownership}%</h3>
                            </div>
                          </div>
                        </div>

                        {/* Instrument Specific Details */}
                        {records.instrumentType && (
                          <div className="detail-section">
                            <h4>Investment Summary</h4>
                            <div className="detail-list">
                              <div className="detail-item">
                                <label>Your Investment</label>
                                <span>
                                  {records.currency}{" "}
                                  {investmentData.investorInvestment.toLocaleString()}
                                </span>
                              </div>
                              <div className="detail-item">
                                <label>Shares Allocated</label>
                                <span>
                                  {Math.floor(
                                    (parseFloat(
                                      String(
                                        investmentData.investorInvestment
                                      ).replace(/,/g, "")
                                    ) || 0) / pricePerShare
                                  ).toLocaleString()}
                                </span>
                              </div>
                              <div className="detail-item">
                                <label>Remaining Amount</label>
                                <span>
                                  {records.currency}{" "}
                                  {remainingAmount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "terms" && (
                      <div className="terms-content">
                        <div className="section-title mb-4">
                          <h4>Terms & Shareholder Rights</h4>
                          <p>
                            Detailed terms and conditions for this investment
                            round
                          </p>
                        </div>

                        <div className="terms-grid">
                          <div className="terms-section mb-4">
                            <h5>Liquidation Preferences</h5>
                            <div className="terms-list">
                              <div className="term-item">
                                <label>Liquidation Preference: </label>{" "}
                                <strong>
                                  {records.liquidationpreferences || "Standard"}
                                </strong>
                              </div>
                              <div className="term-item">
                                <label>Participation: </label>{" "}
                                <strong>
                                  {records.liquidation || "Non-participating"}
                                </strong>
                              </div>
                              {records.liquidation === "OTHER" && (
                                <div className="term-item">
                                  <label>Custom Terms:</label>{" "}
                                  <strong>
                                    {records.liquidationother || "N/A"}
                                  </strong>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="terms-section mb-4">
                            <h5>Voting & Conversion Rights</h5>
                            <div className="terms-list">
                              <div className="term-item">
                                <label>Voting Rights:</label>{" "}
                                <strong>{records.voting || "Standard"}</strong>
                              </div>
                              <div className="term-item">
                                <label>Shares Convertible:</label>{" "}
                                <strong>{records.convertible || "No"}</strong>
                              </div>
                              {records.convertible === "Yes" && (
                                <div className="term-item">
                                  <label>Conversion Type:</label>{" "}
                                  <strong>
                                    {records.convertibleType || "Automatic"}
                                  </strong>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="terms-section mb-4">
                            <h5>Additional Rights & Preferences</h5>
                            <div className="terms-list">
                              <div className="term-item">
                                <label>Rights & Preferences:</label>{" "}
                                <strong>
                                  {records.rights || "Standard rights apply"}
                                </strong>
                              </div>
                            </div>
                          </div>

                          <div className="terms-section">
                            <h5>Investment Status</h5>
                            <div className="terms-list">
                              <div className="term-item">
                                <label>Remaining Amount: </label>{" "}
                                <strong>
                                  {records.currency}{" "}
                                  {remainingAmount.toLocaleString()}
                                </strong>
                              </div>
                              <div className="term-item">
                                <label>Remaining Shares:</label>{" "}
                                <strong>
                                  {Math.max(
                                    0,
                                    remainingShares.toFixed(0)
                                  ).toLocaleString()}
                                </strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "documents" && (
                      <div className="documents-content">
                        <div className="section-title mb-4">
                          <h4>Investment Documents</h4>
                          <p>
                            Legal documents and agreements for this investment round
                          </p>
                        </div>

                        {/* Terms Acceptance Box - ADDED NEW */}
                        <div className="terms-acceptance-box mb-4">
                          <div className="card border-primary">
                            <div className="card-body">
                              <h5 className="card-title text-primary">
                                <i className="bi bi-file-check me-2"></i>
                                Terms Acceptance Required
                              </h5>
                              <p className="card-text">
                                Before proceeding to investment, you must:
                              </p>
                              <div className="terms-checklist">
                                {/* <div className="form-check mb-2">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="termsCheck1"
                                    checked={termsChecked.termSheet}
                                    onChange={(e) => handleTermsCheck('termSheet', e.target.checked)}
                                  />
                                  <label className="form-check-label" htmlFor="termsCheck1">
                                    I have read and understood the <strong>Term Sheet</strong>
                                  </label>
                                </div>

                                <div className="form-check mb-2">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="termsCheck2"
                                    checked={termsChecked.subscription}
                                    onChange={(e) => handleTermsCheck('subscription', e.target.checked)}
                                  />
                                  <label className="form-check-label" htmlFor="termsCheck2">
                                    I have read and understood the <strong>Subscription Agreement</strong>
                                  </label>
                                </div> */}

                                <div className="form-check mb-3">
                                  <input
                                    className="form-check-input inv-checkbox"
                                    type="checkbox"
                                    id="termsCheck3"
                                    checked={termsChecked.acceptAll || records.termsChecked} style={{
                                      cursor: termsChecked.acceptAll ? 'not-allowed' : 'pointer'
                                    }}
                                    onChange={(e) => handleTermsCheck('acceptAll', e.target.checked)}
                                  />
                                  <label className="form-check-label" htmlFor="termsCheck3">
                                    <strong>I accept all terms and conditions</strong> outlined in both documents
                                  </label>
                                </div>
                              </div>

                              {/* Status Indicator */}
                              <div className="terms-status mt-3">
                                {isAllTermsAccepted() ? (
                                  <div className="alert alert-success py-2 mb-0">
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    All terms accepted. You can now proceed to investment.
                                  </div>
                                ) : (
                                  <div className="alert alert-warning py-2 mb-0">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    Please read and accept all terms before investing.
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="documents-grid row">
                          {/* Term Sheet Card - UPDATED WITH CHECKBOX */}
                          <div className="col-lg-6 mb-4">
                            <div className="document-card card h-100">
                              <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                  <div className="document-icon primary me-3">
                                    <FileText size={24} />
                                  </div>
                                  <div className="document-info flex-grow-1">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <div>
                                        <h5 className="card-title">Term Sheet</h5>
                                        <p className="card-text text-muted">
                                          Investment terms and conditions document
                                        </p>
                                      </div>

                                    </div>
                                  </div>
                                </div>

                                {records.termsheetFile &&
                                  JSON.parse(records.termsheetFile).length > 0 ? (
                                  <>
                                    <div className="mb-3">
                                      <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="badge bg-primary">
                                          {
                                            JSON.parse(records.termsheetFile)
                                              .length
                                          }{" "}
                                          file(s)
                                        </span>
                                        <div>
                                          <button
                                            className="btn btn-sm btn-outline-primary me-2"
                                            onClick={() =>
                                              downloadAllFiles(
                                                records.termsheetFile,
                                                `${API_BASE_URL}api/upload/docs/doc_${records.company_id}/companyRound`,
                                                "termsheet"
                                              )
                                            }
                                          >
                                            <FaDownload size={12} className="me-1" />
                                            Download All
                                          </button>

                                        </div>
                                      </div>

                                      {renderFileList(
                                        records.termsheetFile,
                                        `${API_BASE_URL}api/upload/docs/doc_${records.company_id}/companyRound`,
                                        "termsheet"
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <div className="alert alert-info">
                                    <small>No term sheet files available</small>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Subscription Agreement Card - UPDATED WITH CHECKBOX */}
                          <div className="col-lg-6 mb-4">
                            <div className="document-card card h-100">
                              <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                  <div className="document-icon success me-3">
                                    <FaFileContract size={24} />
                                  </div>
                                  <div className="document-info flex-grow-1">
                                    <div className="d-flex align-items-center justify-content-between">
                                      <div>
                                        <h5 className="card-title">
                                          Subscription Agreement
                                        </h5>
                                        <p className="card-text text-muted">
                                          Legal subscription document and agreement
                                        </p>
                                      </div>

                                    </div>
                                  </div>
                                </div>

                                {records.subscriptiondocument &&
                                  JSON.parse(records.subscriptiondocument)
                                    .length > 0 ? (
                                  <>
                                    <div className="mb-3">
                                      <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="badge bg-success">
                                          {
                                            JSON.parse(
                                              records.subscriptiondocument
                                            ).length
                                          }{" "}
                                          file(s)
                                        </span>
                                        <div>
                                          <button
                                            className="btn btn-sm btn-outline-success me-2"
                                            onClick={() =>
                                              downloadAllFiles(
                                                records.subscriptiondocument,
                                                `${API_BASE_URL}api/upload/docs/doc_${records.company_id}/companyRound`,
                                                "subscription"
                                              )
                                            }
                                          >
                                            <FaDownload size={12} className="me-1" />
                                            Download All
                                          </button>

                                        </div>
                                      </div>

                                      {renderFileList(
                                        records.subscriptiondocument,
                                        `${API_BASE_URL}api/upload/docs/doc_${records.company_id}/companyRound`,
                                        "subscription"
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <div className="alert alert-info">
                                    <small>
                                      No subscription agreement files available
                                    </small>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Proceed Button - ADDED NEW */}

                        {isAllTermsAccepted() && records.signature_status === "No" && (
                          <div className="signature-content">
                            <div className="section-title">
                              <h4>Electronic Signature</h4>
                              <p>
                                Provide your signature to authorize this investment
                              </p>

                              {/* Terms Acceptance Status - ADDED */}
                              {!isAllTermsAccepted() && (
                                <div className="alert alert-warning mt-3">
                                  <div className="d-flex align-items-center">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    <div>
                                      <strong>Terms Not Accepted:</strong> Please accept all terms before signing.
                                      <div className="small mt-1">
                                        <a
                                          href="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setActiveTab("documents");
                                          }}
                                          className="alert-link"
                                        >
                                          Go back to Documents tab to accept terms
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="signature-container">
                              <div className="signature-instructions">
                                <div className="instruction-item">
                                  <CheckCircle size={16} />
                                  <span>
                                    By signing below, you confirm your subscription to this investment round
                                  </span>
                                </div>
                                <div className="instruction-item">
                                  <CheckCircle size={16} />
                                  <span>
                                    You agree to the terms outlined in the Subscription Document
                                  </span>
                                </div>
                                <div className="instruction-item">
                                  <CheckCircle size={16} />
                                  <span>
                                    Your signature will be legally binding
                                  </span>
                                </div>

                                {/* Terms Acceptance Confirmation - ADDED */}
                                {isAllTermsAccepted() && (
                                  <div className="instruction-item success">
                                    <CheckCircle size={16} className="text-success" />
                                    <span className="text-success">
                                      <strong>✓ All terms and conditions accepted</strong>
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Signature Pad with Disabled State */}
                              <div className="signature-pad-wrapper">
                                <div className={`signature-pad-container ${!isAllTermsAccepted() ? 'disabled' : ''}`}>

                                  {/* Tab Selection - ADDED */}
                                  <div className="signature-tabs mb-4">
                                    <ul className="nav nav-tabs">
                                      <li className="nav-item">
                                        <button
                                          className={`nav-link ${signatureType === 'draw' ? 'active' : ''}`}
                                          onClick={() => setSignatureType('draw')}
                                          disabled={!isAllTermsAccepted()}
                                        >
                                          <i className="bi bi-pen me-1"></i>
                                          Draw Signature
                                        </button>
                                      </li>
                                      <li className="nav-item">
                                        <button
                                          className={`nav-link ${signatureType === 'text' ? 'active' : ''}`}
                                          onClick={() => setSignatureType('text')}
                                          disabled={!isAllTermsAccepted()}
                                        >
                                          <i className="bi bi-fonts me-1"></i>
                                          Type Signature
                                        </button>
                                      </li>
                                    </ul>
                                  </div>

                                  {/* Tab Content */}
                                  <div className="tab-content">
                                    {/* Draw Tab */}
                                    {signatureType === 'draw' && (
                                      <div className="tab-pane fade show active">
                                        <div className="draw-signature-section">
                                          <SignaturePad
                                            ref={sigPadRef}
                                            penColor="black"
                                            canvasProps={{
                                              className: "signature-canvas",
                                              width: 600,
                                              height: 200,
                                              style: {
                                                cursor: isAllTermsAccepted() ? 'crosshair' : 'not-allowed',
                                                opacity: isAllTermsAccepted() ? 1 : 0.5
                                              }
                                            }}
                                            disabled={!isAllTermsAccepted()}
                                          />
                                        </div>
                                      </div>
                                    )}

                                    {/* Type Tab */}
                                    {signatureType === 'text' && (
                                      <div className="tab-pane fade show active">
                                        <div className="type-signature-section">
                                          <div className="input-group mb-3">
                                            <input
                                              type="text"
                                              className="form-control signature-text-input"
                                              placeholder="Type your full name"
                                              value={signatureText}
                                              onChange={(e) => setSignatureText(e.target.value)}
                                              disabled={!isAllTermsAccepted()}
                                            />
                                            <button
                                              className="btn btn-outline-secondary"
                                              type="button"
                                              onClick={toggleSignatureStyle}
                                              disabled={!isAllTermsAccepted() || !signatureText}
                                              title="Toggle font style"
                                            >
                                              <i className="bi bi-fonts"></i>
                                            </button>
                                          </div>

                                          {/* Font Style Options */}
                                          <div className="font-style-options mt-2 mb-3">
                                            <div className="btn-group btn-group-sm" role="group">
                                              <button
                                                type="button"
                                                className={`btn ${signatureFontStyle === 'normal' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => setSignatureFontStyle('normal')}
                                                disabled={!isAllTermsAccepted()}
                                              >
                                                Normal
                                              </button>
                                              <button
                                                type="button"
                                                className={`btn ${signatureFontStyle === 'italic' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => setSignatureFontStyle('italic')}
                                                disabled={!isAllTermsAccepted()}
                                              >
                                                Italic
                                              </button>
                                              <button
                                                type="button"
                                                className={`btn ${signatureFontStyle === 'cursive' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => setSignatureFontStyle('cursive')}
                                                disabled={!isAllTermsAccepted()}
                                              >
                                                Cursive
                                              </button>
                                              <button
                                                type="button"
                                                className={`btn ${signatureFontStyle === 'bold' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={() => setSignatureFontStyle('bold')}
                                                disabled={!isAllTermsAccepted()}
                                              >
                                                Bold
                                              </button>
                                            </div>
                                          </div>

                                          {/* Signature Preview */}
                                          {signatureText && (
                                            <div className="signature-text-preview mt-3 p-3 border rounded bg-light">
                                              <h6 className="mb-2">Preview:</h6>
                                              <div
                                                className="signature-display"
                                                style={getSignatureTextStyle()}
                                              >
                                                {signatureText}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* Overlay when terms not accepted */}
                                  {!isAllTermsAccepted() && (
                                    <div className="signature-disabled-overlay">
                                      <div className="overlay-content">
                                        <i className="bi bi-lock-fill"></i>
                                        <p>Accept terms to enable signature</p>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {!isAllTermsAccepted() && (
                                  <p className="text-muted small mt-2 text-center">
                                    <i className="bi bi-info-circle me-1"></i>
                                    Signature disabled until all terms are accepted
                                  </p>
                                )}
                              </div>

                              <div className="signature-actions">
                                <button
                                  className="btn-secondary"
                                  onClick={clearSignature}
                                  disabled={!isAllTermsAccepted()}
                                >
                                  Clear Signature
                                </button>
                                <button
                                  className="btn-primary"
                                  onClick={saveSignature}
                                  disabled={!isAllTermsAccepted()}
                                >
                                  <FaSignature size={16} className="me-2" />
                                  Authorize Investmenttt
                                  {!isAllTermsAccepted() && " (Terms Required)"}
                                </button>
                              </div>

                              {/* Terms Not Accepted Message - ADDED */}
                              {!isAllTermsAccepted() && (
                                <div className="alert alert-info mt-4">
                                  <div className="d-flex align-items-center">
                                    <i className="bi bi-file-text me-2"></i>
                                    <div>
                                      <strong>Step Required:</strong>
                                      <div>
                                        Please go back to the <strong>Documents</strong> tab and:
                                        <ol className="mb-0 mt-1">
                                          <li>Read both Term Sheet and Subscription Agreement</li>
                                          <li>Check "I have read" boxes for both documents</li>
                                          <li>Check "I accept all terms and conditions"</li>
                                        </ol>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {trimmedDataURL && (
                                <div className="signature-preview mt-4">
                                  <h6>Signature Preview:</h6>
                                  <img
                                    src={trimmedDataURL}
                                    alt="Signature Preview"
                                    className="preview-image"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {/* Signature Display Section */}
                        {records.signature_status === "Yes" && (
                          <div className="signature-complete-section">
                            <div className="section-title">
                              <h4>Electronic Signature - Complete</h4>
                              <p>
                                Your investment has been successfully authorized and signed
                              </p>
                            </div>

                            <div className="signature-container">
                              <div className="signature-status-card success">
                                <div className="status-header">
                                  <div className="status-icon">
                                    <CheckCircle size={24} />
                                  </div>
                                  <div className="status-text">
                                    <h5>Signature Complete</h5>
                                    <p className="text-muted">
                                      Signed on: {formatCurrentDate(records.signature_date)}
                                    </p>
                                  </div>
                                </div>

                                {/* Terms Acceptance Status */}
                                <div className="terms-acceptance-status mb-4">
                                  <div className="d-flex align-items-center mb-2">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    <span><strong>Terms & Conditions Accepted</strong></span>
                                  </div>
                                  <div className="text-muted small">
                                    Accepted on: {formatCurrentDate(records.terms_accepted_at)}
                                  </div>
                                </div>

                                {/* Display Signature */}
                                <div className="signature-display-card">
                                  <h6>Your Digital Signature:</h6>
                                  <div className="signature-image-container">
                                    <img
                                      src={records.signature}
                                      alt="Your Digital Signature"
                                      className="signature-img"
                                    />
                                  </div>
                                  <div className="signature-details mt-3">
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div className="detail-item">
                                          <span className="label">Signature Type:</span>
                                          <span className="value">
                                            {records.signature_type === 'text' ? 'Typed Signature' : 'Drawn Signature'}
                                          </span>
                                        </div>
                                        {records.signature_text && (
                                          <div className="detail-item">
                                            <span className="label">Signature Text:</span>
                                            <span className="value">{records.signature_text}</span>
                                          </div>
                                        )}
                                      </div>
                                      <div className="col-md-6">
                                        <div className="detail-item">
                                          <span className="label">Status:</span>
                                          <span className="badge bg-success">Authorized</span>
                                        </div>
                                        <div className="detail-item">
                                          <span className="label">Investment Ready:</span>
                                          <span className="badge bg-primary">Yes</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Next Steps */}
                                <div className="next-steps mt-4">
                                  <h6>Next Steps:</h6>
                                  <div className="steps-list">
                                    <div className="step-item completed">
                                      <div className="step-number">1</div>
                                      <div className="step-content">
                                        <strong>Documents Reviewed</strong>
                                        <p className="mb-0">Term Sheet & Subscription Agreement</p>
                                      </div>
                                    </div>
                                    <div className="step-item completed">
                                      <div className="step-number">2</div>
                                      <div className="step-content">
                                        <strong>Terms Accepted</strong>
                                        <p className="mb-0">All terms and conditions accepted</p>
                                      </div>
                                    </div>
                                    <div className="step-item completed">
                                      <div className="step-number">3</div>
                                      <div className="step-content">
                                        <strong>Digital Signature</strong>
                                        <p className="mb-0">Signature provided and authorized</p>
                                      </div>
                                    </div>
                                    <div className="step-item current">
                                      <div className="step-number">4</div>
                                      <div className="step-content">
                                        <strong>Proceed to Investment</strong>
                                        <p className="mb-0">
                                          <button
                                            className="btn btn-success btn-sm"
                                            onClick={handleInvestNow}
                                          >
                                            <FaMoneyBillWave size={14} className="me-1" />
                                            Invest Now
                                          </button>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}



                      </div>
                    )}


                    {activeTab === "excutivesummary" && (
                      <div className="executive-summary-container mt-4">
                        <div className="summary-header d-flex align-items-center p-3 bg-primary text-white rounded-top">
                          <IoAnalytics size={20} className="me-2" />
                          <h5 className="mb-0">Executive Summary</h5>
                        </div>
                        <div className="summary-body p-4 bg-white rounded-bottom border border-top-0">
                          {records.executive_summary ? (
                            <div className="summary-content">
                              <div className="d-flex align-items-start">
                                <div className="flex-grow-1">
                                  <p style={{
                                    whiteSpace: 'pre-line',
                                    lineHeight: '1.8',
                                    fontSize: '0.95rem'
                                  }}>
                                    {records.executive_summary}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="empty-state text-center py-5">
                              <IoFileTray size={48} className="text-muted mb-3" />
                              <h6 className="text-muted">No summary generated yet</h6>
                              <p className="text-muted small mb-0">
                                AI-generated executive summary will appear here
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </div>

      {ShowPopupInvest && (
        <InvestNowPopup
          onClose={handleClosePopup}
          records={records}
          nextround={nextround}
          nextRoundData={nextRoundData}

        />
      )}

      <style jsx>{`
        .capital-round-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 25px #d4d4d4ff;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .round-header {
          padding: 2rem;
          background: linear-gradient(135deg, #ff3d41 0%, #ff777a 100%);

          color: white;
        }

        .header-content {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .header-text {
          flex: 1;
        }

        .round-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: white;
        }

        .round-subtitle {
          opacity: 0.9;
          margin: 0 0 1rem 0;
          font-size: 1rem;
        }

        .round-meta {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .funding-progress {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.25rem;
          backdrop-filter: blur(10px);
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .progress-label {
          font-weight: 600;
        }

        .progress-percentage {
          font-weight: 700;
          font-size: 1.125rem;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4ade80, #22c55e);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .progress-stats {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          opacity: 0.9;
        }

        .round-tabs {
          display: flex;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .tab-button {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          color: #64748b;
          font-weight: 500;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .tab-button:hover {
          color: #334155;
          background: #f1f5f9;
        }

        .tab-button.active {
          color: #f75f62;
          border-bottom-color: #f75f62;
          background: white;
        }

        .tab-content {
          padding: 2rem;
        }

        .alert-message {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .alert-message.success {
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .alert-message.error {
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        .alert-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .alert-close {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          opacity: 0.7;
        }

        .alert-close:hover {
          opacity: 1;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .metric-card {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid #e2e8f0;
          transition: transform 0.2s ease;
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .metric-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          background: linear-gradient(135deg, #ff3d41 0%, #ff777a 100%);

          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .metric-content label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
          display: block;
          margin-bottom: 0.25rem;
        }

        .metric-content h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .detail-section {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.5rem;
        }

        .detail-section h4 {
          margin: 0 0 1rem 0;
          color: #1e293b;
          font-weight: 600;
          font-size: 1.125rem;
        }

        .detail-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .detail-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .detail-item label {
          font-weight: 500;
          color: #475569;
        }

        .detail-item span {
          font-weight: 600;
          color: #1e293b;
        }

        .documents-grid {
          display: grid;
          gap: 1rem;
        }

        .document-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .document-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          background: #e0f2fe;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0369a1;
        }

        .document-info {
          flex: 1;
        }

        .document-info h5 {
          margin: 0 0 0.25rem 0;
          color: #1e293b;
        }

        .document-info p {
          margin: 0;
          color: #64748b;
          font-size: 0.875rem;
        }

        .download-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: #f75f62;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .download-btn:hover {
          background: #2563eb;
        }

        .signature-content h4 {
          margin: 0 0 0.5rem 0;
          color: #1e293b;
        }

        .signature-description {
          color: #64748b;
          margin-bottom: 1.5rem;
        }

        .signature-container {
          max-width: 600px;
        }

        .signature-pad-wrapper {
          border: 2px dashed #cbd5e1;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          background: #fafafa;
        }

        .signature-canvas {
          border-radius: 6px;
          cursor: crosshair;
        }

        .signature-actions {
          display: flex;
          gap: 1rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #f75f62, #1d4ed8);
          color: white;
          border: none;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px #f63c3f;
        }

        .btn-secondary {
          background: #f1f5f9;
          color: #f63c3f;
          border: 1px solid #cbd5e1;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background: #e2e8f0;
        }

        .round-status-badge .status-active {
          background: #dcfce7;
          color: #166534;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }

        @media (max-width: 768px) {
          .round-header {
            padding: 1.5rem;
          }

          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .round-tabs {
            flex-direction: column;
          }

          .tab-button {
            justify-content: center;
          }

          .tab-content {
            padding: 1.5rem;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .document-card {
            flex-direction: column;
            text-align: center;
          }

          .signature-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </Wrapper>
  );
}

export default CapitalRoundView;
