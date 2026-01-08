import { FaEye } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ModalContainer } from "../../Styles/DataRoomStyle.js";
import React, { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config.js";

const InvestNowPopup = ({ onClose, records, nextround, nextRoundData }) => {
  const storedUsername = localStorage.getItem("InvestorData");
  const userLogin = JSON.parse(storedUsername);
  const [investment, setInvestment] = useState("");
  const [shares, setShares] = useState(0);
  const [Ownership, setOwnership] = useState(0);
  const [submitted, setSubmitted] = useState(null);
  const [totalAllocatedShares, settotalAllocatedShares] = useState("0");
  const [successmessage, setSuccessmessage] = useState("");
  const [warrantShares, setWarrantShares] = useState(0);
  const [conversionDetails, setConversionDetails] = useState(null);
  const [errr, seterrr] = useState(false);

  // NEW WARRANT STATES
  const [warrantCoverageAmount, setWarrantCoverageAmount] = useState(0);
  const [warrantExercisePrice, setWarrantExercisePrice] = useState(0);
  const [warrantDetails, setWarrantDetails] = useState("");
  const [warrantStatus, setWarrantStatus] = useState("pending");

  // NEW STATES FOR AVAILABLE SHARES
  const [availableShares, setAvailableShares] = useState(0);
  const [totalRoundShares, setTotalRoundShares] = useState(0);
  const [allocatedShares, setAllocatedShares] = useState(0);
  const [maxInvestment, setMaxInvestment] = useState(0);
  const [pricePerShare, setPricePerShare] = useState(0);
  const [validationError, setValidationError] = useState("");

  var apiURL = API_BASE_URL + "api/user/investor/";
  const [formData, setFormData] = useState({});
  const [interestRate, setInterestRate] = useState(0);
  const [maturityMonths, setMaturityMonths] = useState(0);
  const [liquidationPreference, setLiquidationPreference] = useState([]);
  const [existingSharess, setExistingShares] = useState(0);

  useEffect(() => {
    getexistingShare();
    getcheckInvestorStatus();
    calculateAvailableShares();
  }, [records]);

  // NEW FUNCTION: Calculate available shares
  const calculateAvailableShares = async () => {
    if (!records || !records.id) return;

    try {
      // Get round details
      const totalSharesInRound = parseFloat(records.issuedshares || 0);
      const roundSize = parseFloat(records.roundsize || 0);

      setTotalRoundShares(totalSharesInRound);

      // Calculate price per share
      const calculatedPrice = totalSharesInRound > 0 ? roundSize / totalSharesInRound : 0;
      setPricePerShare(calculatedPrice);

      // Get allocated investment amount from database
      const formData = {
        roundrecord_id: records.id,
        company_id: records.company_id
      };

      const res = await axios.post(
        apiURL + "getAllocatedShares",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", res.data);

      let allocatedShares = 0;
      let allocatedInvestment = 0;

      if (res.data.success) {
        allocatedShares = parseFloat(res.data.allocated_shares || 0);
        allocatedInvestment = parseFloat(res.data.total_investment || 0);

        console.log("Allocated Shares from API:", allocatedShares);
        console.log("Allocated Investment from API:", allocatedInvestment);

        // Calculate shares from investment if API returned 0 shares
        if (allocatedShares === 0 && calculatedPrice > 0 && allocatedInvestment > 0) {
          allocatedShares = allocatedInvestment / calculatedPrice;
          console.log("Calculated allocated shares from investment:", allocatedShares);
        }
      }

      setAllocatedShares(allocatedShares);

      // Calculate available shares - FIX: Ensure it's not negative
      const available = Math.max(0, totalSharesInRound - allocatedShares);
      setAvailableShares(available);

      // Calculate maximum investment - FIX: Use available shares
      const maxInv = calculatedPrice * available;
      setMaxInvestment(maxInv);

      console.log("Final Calculation:");
      console.log("Total Shares:", totalSharesInRound);
      console.log("Allocated Shares:", allocatedShares);
      console.log("Available Shares:", available);
      console.log("Price per Share:", calculatedPrice);
      console.log("Max Investment:", maxInv);

    } catch (err) {
      console.error("Error calculating available shares:", err);

      // Fallback calculation
      const totalSharesInRound = parseFloat(records.issuedshares || 0);
      const roundSize = parseFloat(records.roundsize || 0);
      const calculatedPrice = totalSharesInRound > 0 ? roundSize / totalSharesInRound : 0;

      setTotalRoundShares(totalSharesInRound);
      setPricePerShare(calculatedPrice);

      // Set default values
      setAvailableShares(totalSharesInRound);
      setAllocatedShares(0);
      setMaxInvestment(calculatedPrice * totalSharesInRound);
    }
  };

  const getexistingShare = async () => {
    let formData = {
      investor_id: userLogin.id,
      company_id: records.company_id,
      roundrecord_id: records.id,
    };
    try {
      const res = await axios.post(
        apiURL + "getexistingShare",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        setExistingShares(res.data.existingShares);
      } else {
        console.error("❌ Error:", res.data.message);
      }

    } catch (err) {
      console.error("Error fetching capital round data:", err);
    }
  };

  const getcheckInvestorStatus = async () => {
    let formData = {
      investor_id: userLogin.id,
      company_id: records.company_id,
      roundrecord_id: records.id,
    };
    try {
      const res = await axios.post(
        apiURL + "getcheckInvestorStatus",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.result.length > 0) {
        var checkCode = res.data.result;
        seterrr(true);
        setSubmitted(String(checkCode[0].request_confirm));
      } else {
        setSubmitted(null);
        seterrr(false);
      }
    } catch (err) {
      console.error("Error fetching capital round data:", err);
      setSubmitted(null);
    }
  };

  // 🔴 NEW FUNCTION: CALCULATE WARRANTS (Client Requirements)
  const calculateWarrantsForPreferredEquity = (investmentAmount, instrumentData) => {
    // Reset warrant values
    setWarrantShares(0);
    setWarrantCoverageAmount(0);
    setWarrantExercisePrice(0);
    setWarrantDetails("");
    setWarrantStatus("pending");

    // Check if warrants are enabled (NEW FORMAT)
    const hasWarrants = instrumentData?.hasWarrants_preferred || instrumentData?.hasWarrants;
    if (!hasWarrants) return;

    // Get coverage percentage (NEW: warrant_coverage_percentage, OLD: warrantRatio)
    let coveragePercentage = 0;
    if (instrumentData.warrant_coverage_percentage) {
      coveragePercentage = parseFloat(instrumentData.warrant_coverage_percentage);
    } else if (instrumentData.warrantRatio) {
      // Convert old ratio (1:3) to percentage (33.33%)
      const ratioParts = instrumentData.warrantRatio.split(':');
      if (ratioParts.length === 2) {
        const numerator = parseFloat(ratioParts[0]);
        const denominator = parseFloat(ratioParts[1]);
        if (denominator > 0) {
          coveragePercentage = (numerator / denominator) * 100;
        }
      }
    }

    if (coveragePercentage <= 0) return;

    // 1. Calculate warrant coverage amount
    const coverageAmount = investmentAmount * (coveragePercentage / 100);
    setWarrantCoverageAmount(coverageAmount);

    // 2. Calculate exercise price
    let exercisePrice = 0;
    let detailsText = "";

    // Check exercise price type
    const exerciseType = instrumentData.warrant_exercise_type || "fixed";

    if (exerciseType === "next_round_adjusted" && nextRoundData) {
      // NEW: Next Round Price ± Adjustment %
      const nextRoundShares = parseFloat(nextRoundData.issuedshares || 0);
      const nextRoundSize = parseFloat(nextRoundData.roundsize || 0);

      if (nextRoundShares > 0 && nextRoundSize > 0) {
        const nextRoundPrice = nextRoundSize / nextRoundShares;
        const adjustmentPercent = parseFloat(instrumentData.warrant_adjustment_percent || 0);
        const adjustmentType = instrumentData.warrant_adjustment_direction || "decrease";

        // Calculate exercise price: Next round price ± adjustment%
        if (adjustmentType === "decrease") {
          exercisePrice = nextRoundPrice * (1 - (adjustmentPercent / 100));
        } else {
          exercisePrice = nextRoundPrice * (1 + (adjustmentPercent / 100));
        }

        setWarrantExercisePrice(exercisePrice);
        setWarrantStatus("will_exercise");

        detailsText = `Exercise price: ${records.currency}${exercisePrice.toFixed(2)} (Next round: ${records.currency}${nextRoundPrice.toFixed(2)} ${adjustmentType === "decrease" ? "-" : "+"} ${adjustmentPercent}%)`;
      }
    } else if (exerciseType === "next_round" && nextRoundData) {
      // Next round price without adjustment
      const nextRoundShares = parseFloat(nextRoundData.issuedshares || 0);
      const nextRoundSize = parseFloat(nextRoundData.roundsize || 0);

      if (nextRoundShares > 0 && nextRoundSize > 0) {
        exercisePrice = nextRoundSize / nextRoundShares;
        setWarrantExercisePrice(exercisePrice);
        setWarrantStatus("will_exercise");
        detailsText = `Exercise price: ${records.currency}${exercisePrice.toFixed(2)} (Next round price)`;
      }
    } else if (instrumentData.exercisePrice || instrumentData.exercisePrice_preferred) {
      // Fixed exercise price (old format)
      exercisePrice = parseFloat(instrumentData.exercisePrice || instrumentData.exercisePrice_preferred || 0);
      setWarrantExercisePrice(exercisePrice);
      setWarrantStatus("fixed_price");
      detailsText = `Exercise price: ${records.currency}${exercisePrice.toFixed(2)} (Fixed price)`;
    }

    // 3. Calculate warrant shares
    if (exercisePrice > 0) {
      const calculatedWarrantShares = coverageAmount / exercisePrice;
      setWarrantShares(Math.floor(calculatedWarrantShares * 100) / 100);
    } else {
      // No exercise price determined yet
      detailsText = "Warrant exercise price will be determined when next priced round occurs";
      setWarrantStatus("pending");
    }

    setWarrantDetails(detailsText);
  };

  // UPDATED: Handle investment change with validation
  const handleInvestmentChange = (e) => {
    setValidationError(""); // Clear previous errors

    let amount = parseFloat(e.target.value.replace(/,/g, "")) || 0;

    // Check if investment exceeds maximum allowed
    if (maxInvestment > 0 && amount > maxInvestment) {
      setValidationError(`Maximum investment allowed: ${records.currency}${maxInvestment.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} (Based on available shares)`);

      // Auto-correct to maximum
      amount = maxInvestment;
    }

    // Check minimum investment (price for 1 share)

    const minInvestment = pricePerShare;
    if (amount > 0 && amount < minInvestment) {
      setValidationError(`Minimum investment: ${records.currency}${minInvestment.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} (Price for 1 share)`);
    }

    setInvestment(
      amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );

    // Reset values
    setShares(0);
    setOwnership(0);
    setWarrantShares(0);
    setConversionDetails(null);
    setWarrantCoverageAmount(0);
    setWarrantExercisePrice(0);
    setWarrantDetails("");

    if (amount === 0) return;

    const existingShares = parseFloat(existingSharess || 0);
    const roundSize = parseFloat(records.roundsize || 0);
    console.log(existingShares, roundSize)
    // 🟩 COMMON STOCK
    if (records.instrumentType === "Common Stock" || records.instrumentType === "") {
      if (existingShares > 0 && roundSize > 0) {
        // ✅ SIMPLE CALCULATION WITHOUT SHARE LIMIT CHECK
        const pricePerShareCalc = roundSize / existingShares;
        const calculatedShares = amount / pricePerShareCalc;

        // ✅ NO SHARE LIMIT CHECK - Investor can enter any amount
        // System will handle limits at submission time
        setShares(Math.floor(calculatedShares * 100) / 100);

        // Ownership calculation
        const postMoneyShares = existingShares + calculatedShares;
        const ownership = (calculatedShares / postMoneyShares) * 100;
        setOwnership(Number(ownership.toFixed(4)));
      }
    }

    // 🟩 PREFERRED EQUITY
    else if (records.instrumentType === "Preferred Equity") {
      if (existingShares > 0 && roundSize > 0) {
        // Simple calculation without limit check
        const pricePerShareCalc = roundSize / existingShares;
        const calculatedShares = amount / pricePerShareCalc;

        // ✅ NO SHARE LIMIT CHECK HERE
        setShares(Math.floor(calculatedShares * 100) / 100);

        // Ownership calculation
        const postMoneyShares = existingShares + calculatedShares;
        const ownership = (calculatedShares / postMoneyShares) * 100;
        setOwnership(Number(ownership.toFixed(4)));

        // Warrant calculation
        const instrumentData = getInstrumentData();
        if (records.instrumentType === "Preferred Equity") {
          calculateWarrantsForPreferredEquity(amount, instrumentData);
        }
      }
    }

    // 🟨 SAFE CONVERSION
    else if (records.instrumentType === "Safe") {
      let safeData = getInstrumentData();
      if (!safeData) return;

      const valuationCap = parseFloat(safeData.valuationCap || safeData.valuationCap_note || 0);
      const discountRate = parseFloat(safeData.discountRate || safeData.discountRate_note || 0);
      const safeType = safeData.safeType || "POST_MONEY";

      if (valuationCap === 0 || existingShares === 0) return;

      let conversionPrice = 0;

      if (nextround && nextRoundData) {
        const nextRoundShares = parseFloat(nextRoundData.issuedshares || 0);
        const nextRoundSize = parseFloat(nextRoundData.roundsize || 0);

        if (nextRoundShares > 0 && nextRoundSize > 0) {
          const nextRoundPrice = nextRoundSize / nextRoundShares;
          const capPrice = valuationCap / existingShares;
          const discountPrice = nextRoundPrice * (1 - discountRate / 100);
          conversionPrice = Math.min(capPrice, discountPrice);
        }
      } else {
        conversionPrice = valuationCap / existingShares;
      }

      if (conversionPrice > 0) {
        const calculatedShares = amount / conversionPrice;

        // ✅ NO SHARE LIMIT CHECK
        if (safeType === "POST_MONEY") {
          const ownershipPercent = (amount / valuationCap) * 100;
          setShares(Math.round(calculatedShares));
          setOwnership(Number(ownershipPercent.toFixed(2)));
        } else {
          const postMoneyValuation = valuationCap + amount;
          const ownershipPercent = (amount / postMoneyValuation) * 100;
          setShares(Math.round(calculatedShares));
          setOwnership(Number(ownershipPercent.toFixed(2)));
        }
      }
    }

    // 🟧 CONVERTIBLE NOTE
    else if (records.instrumentType === "Convertible Note") {
      let noteData = getInstrumentData();
      if (!noteData) return;

      const valuationCap = parseFloat(noteData.valuationCap_note || 0);
      const discountRate = parseFloat(noteData.discountRate_note || 0);
      const interestRate = parseFloat(noteData.interestRate_note || 0) / 100;
      const principal = amount;

      const interest = principal * interestRate * 1;
      const maturityAmount = principal + interest;

      if (nextround && nextRoundData) {
        const nextRoundShares = parseFloat(nextRoundData.issuedshares || 0);
        const nextRoundSize = parseFloat(nextRoundData.roundsize || 0);

        if (nextRoundShares > 0 && nextRoundSize > 0) {
          const nextRoundPrice = nextRoundSize / nextRoundShares;
          const capPrice = valuationCap > 0 && existingShares > 0 ? valuationCap / existingShares : Infinity;
          const discountPrice = discountRate > 0 ? nextRoundPrice * (1 - discountRate / 100) : Infinity;
          const conversionPrice = Math.min(capPrice, discountPrice);
          const calculatedShares = maturityAmount / conversionPrice;

          // ✅ NO SHARE LIMIT CHECK
          const postMoneyShares = existingShares + calculatedShares;
          const ownershipPercent = (calculatedShares / postMoneyShares) * 100;

          setShares(Number(calculatedShares.toFixed(2)));
          setOwnership(Number(ownershipPercent.toFixed(4)));
        }
      } else if (valuationCap > 0 && existingShares > 0) {
        const conversionPrice = valuationCap / existingShares;
        const calculatedShares = maturityAmount / conversionPrice;

        // ✅ NO SHARE LIMIT CHECK
        const postMoneyShares = existingShares + calculatedShares;
        const ownershipPercent = (calculatedShares / postMoneyShares) * 100;

        setShares(Number(calculatedShares.toFixed(2)));
        setOwnership(Number(ownershipPercent.toFixed(4)));
      }
    }

    // 🟥 VENTURE/BANK DEBT
    else if (records.instrumentType === "Venture/Bank DEBT") {
      setShares(0);
      setOwnership(0);

      const instrumentData = getInstrumentData();
      if (instrumentData?.hasWarrants_Bank) {
        const exercisePrice = parseFloat(instrumentData.exercisePrice_bank || 0);
        const warrantRatio = parseFloat(instrumentData.warrantRatio_bank || 1);

        if (exercisePrice > 0) {
          const warrantSharesCalc = (amount / exercisePrice) * warrantRatio;
          // ✅ NO SHARE LIMIT CHECK
          setWarrantShares(Math.floor(warrantSharesCalc * 100) / 100);
        }
      }
    }
  };

  // UPDATED: Handle submit with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // NEW: Validate investment amount
    const investmentAmount = parseFloat(String(investment).toString().replace(/,/g, "")) || 0;

    if (investmentAmount <= 0) {
      setValidationError("Please enter a valid investment amount");
      return;
    }

    if (maxInvestment > 0 && investmentAmount > maxInvestment) {
      setValidationError(`Investment exceeds maximum allowed amount of ${records.currency}${maxInvestment.toLocaleString()}`);
      return;
    }

    // Calculate shares based on investment
    const calculatedShares = shares;
    console.log(calculatedShares, availableShares)
    // if (calculatedShares > availableShares) {
    //   setValidationError(`Requested ${calculatedShares.toLocaleString()} shares but only ${availableShares.toLocaleString()} available`);
    //   return;
    // }

    let formDataa = {
      investor_id: userLogin.id,
      company_id: records.company_id,
      shares: parseFloat((Math.floor(shares * 100) / 100).toFixed(2)) || 0,
      created_by_id: records.created_by_id,
      roundrecord_id: records.id,
      next_round_id: nextRoundData?.id,
      investment_amount: investmentAmount,
      // Include warrant data
      warrant_coverage_amount: warrantCoverageAmount,
      warrant_exercise_price: warrantExercisePrice,
      warrant_shares: warrantShares,
      warrant_status: warrantStatus
    };

    try {
      const res = await axios.post(
        apiURL + "InvestorrequestToCompany",
        formDataa,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setSubmitted("No");
      setSuccessmessage("Investment request submitted successfully!");
      setValidationError(""); // Clear errors on success

      // Refresh available shares after successful investment
      setTimeout(() => {
        calculateAvailableShares();
        setSubmitted("No");
      }, 4500);
    } catch (err) {
      console.error("Error submitting investment:", err);
      setSubmitted(null);
      setValidationError("Error submitting investment. Please try again.");
    }
  };

  const getInstrumentData = () => {
    try {
      const data = records?.instrument_type_data;
      if (!data) return null;

      let parsedData = data;
      if (typeof parsedData === "string") {
        parsedData = JSON.parse(parsedData);
      }
      if (typeof parsedData === "string") {
        parsedData = JSON.parse(parsedData);
      }

      return parsedData;
    } catch (error) {
      console.error("Error parsing instrument data:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!records) return;

    let instrumentData = getInstrumentData();
    if (typeof instrumentData === "string") {
      instrumentData = JSON.parse(instrumentData);
    }

    // Liquidation Preference Parsing
    if (records.liquidation) {
      try {
        let liquidationData = records.liquidation;

        if (
          typeof liquidationData === "string" &&
          liquidationData.startsWith("[")
        ) {
          liquidationData = JSON.parse(liquidationData);
        }
        else if (typeof liquidationData === "string") {
          liquidationData = liquidationData
            .split(",")
            .map((item) => item.trim())
            .filter((i) => i.length > 0);
        }

        setLiquidationPreference(
          Array.isArray(liquidationData) ? liquidationData : [liquidationData]
        );
      } catch (e) {
        console.error("Error parsing liquidation data:", e);
        setLiquidationPreference([]);
      }
    }

    switch (records.instrumentType) {
      case "Common Stock":
      case "Preferred Equity":
        const existingShares = parseFloat(records.issuedshares || 0);
        const roundSize = parseFloat(records.roundsize || 0);
        if (existingShares > 0 && roundSize > 0) {
          setPricePerShare(roundSize / existingShares);
        }
        setFormData({
          ...instrumentData,
          hasWarrants: instrumentData?.hasWarrants || false,
          hasWarrants_preferred: instrumentData?.hasWarrants_preferred || false,
        });
        break;

      case "Safe":
      case "Convertible Note":
        setFormData({ ...instrumentData });
        break;

      case "Venture/Bank DEBT":
        setInterestRate(parseFloat(instrumentData?.interestRate) || 0);
        setMaturityMonths(parseInt(instrumentData?.repaymentSchedule) || 12);
        setFormData({
          ...instrumentData,
          hasWarrants_Bank: instrumentData?.hasWarrants_Bank || false,
        });
        break;

      default:
        break;
    }
  }, [records]);

  const colors = {
    primary: "#F63C3F",
    primaryHover: "#D42C2F",
    primaryLight: "#FEEBEB",
    success: "#10B981",
    successLight: "#ECFDF5",
    info: "#3B82F6",
    infoLight: "#EFF6FF",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    danger: "#EF4444",
    dangerLight: "#FEE2E2",
    textDark: "#1F2937",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    background: "#F9FAFB",
  };

  if (!records) return null;

  return (
    <div
      className="main_popup-overlay"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <ModalContainer
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "850px",
          width: "90%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="previous-section-summary mb-4 p-4 bg-white border rounded-3 shadow-sm">
          <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
            <div className="d-flex align-items-center justify-content-between gap-3 w-100">
              <h3
                className="mb-0 fw-semibold"
                style={{ color: colors.textDark }}
              >
                Invest Now - {records.nameOfRound || records.shareClassType}
              </h3>
              <button
                type="button"
                className="bg-transparent p-1 border-0"
                onClick={onClose}
                style={{ color: colors.textSecondary }}
              >
                <IoCloseCircleOutline size={24} />
              </button>
            </div>
          </div>

          {/* Available Shares Information Section */}
          <div className="available-shares-section mb-4 p-3 rounded-3"
            style={{
              backgroundColor: colors.infoLight,
              border: `1px solid ${colors.info}`
            }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold" style={{ color: colors.info }}>
                Round Availability
              </span>
              <span className="badge" style={{
                backgroundColor: colors.info,
                color: 'white'
              }}>
                {totalRoundShares > 0 ?
                  `${((allocatedShares / totalRoundShares) * 100).toFixed(1)}% Filled` :
                  'New Round'}
              </span>
            </div>

            <div className="progress mb-2" style={{ height: '10px', borderRadius: '5px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${totalRoundShares > 0 ? (allocatedShares / totalRoundShares) * 100 : 0}%`,
                  backgroundColor: colors.info,
                  borderRadius: '5px'
                }}
              ></div>
            </div>

            <div className="row text-center">
              <div className="col-4">
                <div className="text-muted small">Total Shares</div>
                <div className="fw-bold">{totalRoundShares.toLocaleString()}</div>
              </div>
              <div className="col-4">
                <div className="text-muted small">Allocated</div>
                <div className="fw-bold">{allocatedShares.toLocaleString()}</div>
              </div>
              <div className="col-4">
                <div className="text-muted small">Available</div>
                <div className="fw-bold" style={{ color: colors.success }}>
                  {availableShares.toLocaleString()}
                </div>
              </div>
            </div>

            {maxInvestment > 0 && (
              <div className="mt-3 pt-2 border-top">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted small">Maximum Investment:</span>
                  <span className="fw-bold" style={{ color: colors.primary }}>
                    {records.currency}{" "}{maxInvestment.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-1">
                  <span className="text-muted small">Price per Share:</span>
                  <span className="fw-bold">
                    {records.currency}{" "}{pricePerShare.toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="row g-3">
            <div className="col-md-12">
              <div
                className="p-4 rounded-3 h-100"
                style={{
                  backgroundColor: colors.primaryLight,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <span
                  className="small fw-semibold text-uppercase"
                  style={{ color: colors.textSecondary }}
                >
                  Investment Details
                </span>

                {/* Display Liquidation Preference Information */}
                {liquidationPreference.length > 0 &&
                  !liquidationPreference.includes("N/A") &&
                  (records.instrumentType === "Preferred Equity" ||
                    records.instrumentType === "Common Stock" ||
                    records.instrumentType === "Venture/Bank DEBT") && (
                    <div
                      className="alert mt-3"
                      style={{
                        backgroundColor: colors.warningLight,
                        border: `1px solid ${colors.warning}`,
                        borderRadius: "8px",
                        padding: "12px",
                      }}
                    >
                      <div className="d-flex align-items-start">
                        <div className="flex-shrink-0 me-2">
                          <svg
                            width="20"
                            height="20"
                            fill={colors.warning}
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="flex-grow-1">
                          <strong style={{ color: "#92400E" }}>
                            Liquidation Preference:
                          </strong>
                          <div className="mt-1" style={{ color: "#78350F" }}>
                            {liquidationPreference.map((pref, index) => (
                              <div key={index} className="mb-1">
                                • {pref}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Validation Error Message */}
                {validationError && (
                  <div
                    className="alert mt-3"
                    style={{
                      backgroundColor: colors.dangerLight,
                      border: `1px solid ${colors.danger}`,
                      color: colors.danger,
                      borderRadius: "8px",
                      padding: "16px",
                    }}
                  >
                    <strong>Error:</strong> {validationError}
                  </div>
                )}

                {submitted === "No" && (
                  <div
                    className="alert mt-3"
                    style={{
                      backgroundColor: colors.successLight,
                      border: `1px solid ${colors.success}`,
                      color: colors.success,
                      borderRadius: "8px",
                      padding: "16px",
                    }}
                  >
                    <strong>Investment Submitted Successfully!</strong>
                  </div>
                )}

                {submitted === "Yes" && (
                  <div
                    className="alert mt-3"
                    style={{
                      backgroundColor: colors.infoLight,
                      border: `1px solid ${colors.info}`,
                      color: colors.info,
                      borderRadius: "8px",
                      padding: "16px",
                    }}
                  >
                    <strong>Your Request Has Been Confirmed!</strong>
                  </div>
                )}

                {submitted === null && (
                  <form onSubmit={handleSubmit} className="mt-3">
                    <div className="form-group mb-4">
                      <label
                        className="form-label fw-semibold mb-2 d-flex justify-content-between"
                        style={{ color: colors.textDark }}
                      >
                        <span>Enter Investment Amount ({records.currency})</span>
                        {maxInvestment > 0 && (
                          <span className="small text-muted">
                            Max: {records.currency}{" "}{maxInvestment.toLocaleString()}
                          </span>
                        )}
                      </label>
                      <NumericFormat
                        thousandSeparator
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder={`Enter amount (Max: ${records.currency}${maxInvestment.toLocaleString()})`}
                        value={investment}
                        className="form-control"
                        onChange={handleInvestmentChange}
                        style={{
                          borderColor: validationError ? colors.danger : colors.border
                        }}
                      />
                      {availableShares > 0 && pricePerShare > 0 && (
                        <div className="form-text mt-1">
                          Available: {availableShares.toLocaleString()} shares × {records.currency}{pricePerShare.toFixed(3)} = {records.currency}{maxInvestment.toLocaleString()}
                        </div>
                      )}
                    </div>

                    {/* Common Stock / Preferred Equity */}

                    {(records.instrumentType === "Preferred Equity") && (
                      <>
                        <div className="form-group mb-4">
                          <label className="form-label fw-semibold mb-2">
                            Price Per Share
                          </label>
                          <div
                            className="form-control-plaintext fw-bold"
                            style={{ color: colors.primary, fontSize: "18px" }}
                          >
                            {records.currency}{pricePerShare.toFixed(2)}
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          <label className="form-label fw-semibold mb-2">
                            Shares You Will Receive
                          </label>
                          <div
                            className="form-control-plaintext fw-bold"
                            style={{
                              color: colors.primary,
                              fontSize: "18px",
                              backgroundColor: "white",
                              padding: "12px",
                              borderRadius: "8px",
                              border: `1px solid ${colors.border}`,
                            }}
                          >
                            {shares > 0 ? shares.toLocaleString() : '0'} shares
                            {availableShares > 0 && (
                              <div className="small text-muted mt-1">
                                {shares > 0 ? (
                                  <>Uses {((shares / availableShares) * 100).toFixed(1)}% of available shares</>
                                ) : (
                                  <>Enter investment amount to see shares</>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          <label className="form-label fw-semibold mb-2">
                            Ownership Percentage
                          </label>
                          <div
                            className="form-control-plaintext fw-bold"
                            style={{
                              color: colors.info,
                              fontSize: "18px",
                              backgroundColor: "white",
                              padding: "12px",
                              borderRadius: "8px",
                              border: `1px solid ${colors.border}`,
                            }}
                          >
                            {Ownership > 0 ? `${Ownership.toFixed(4)}%` : '0%'}
                          </div>
                        </div>

                        {/* 🔴 NEW WARRANT DISPLAY (Preferred Equity) */}
                        {records.instrumentType === "Preferred Equity" &&
                          (formData.hasWarrants_preferred || formData.hasWarrants) &&
                          investment && parseFloat(investment.replace(/,/g, "")) > 0 && (
                            <div className="form-group mb-4">
                              <label className="form-label fw-semibold mb-2">
                                Warrant Information
                              </label>
                              <div className="border rounded p-3 bg-white">
                                {/* Warrant Coverage */}
                                <div className="mb-2">
                                  <strong>Warrant Coverage:</strong>
                                  {formData.warrant_coverage_percentage ?
                                    ` ${formData.warrant_coverage_percentage}%` :
                                    formData.warrantRatio ? ` ${formData.warrantRatio} ratio` : ' Not specified'}
                                  <div className="small text-muted">
                                    ({records.currency}{warrantCoverageAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} of {investment})
                                  </div>
                                </div>

                                {/* Warrant Details */}
                                {warrantDetails && (
                                  <div className="mb-2">
                                    <strong>Exercise Terms:</strong>
                                    <div className="small text-success">{warrantDetails}</div>
                                  </div>
                                )}

                                {/* Warrant Shares */}
                                {warrantShares > 0 && (
                                  <div className="mb-2">
                                    <strong>Potential Warrant Shares:</strong>
                                    <div className="fw-bold" style={{ color: colors.success }}>
                                      {warrantShares.toLocaleString()} shares
                                    </div>
                                  </div>
                                )}

                                {/* Warrant Status */}
                                <div className="mt-2">
                                  <span className={`badge ${warrantStatus === 'will_exercise' ? 'bg-success' :
                                    warrantStatus === 'fixed_price' ? 'bg-info' : 'bg-warning'}`}>
                                    {warrantStatus === 'will_exercise' ? 'Will Exercise in Next Round' :
                                      warrantStatus === 'fixed_price' ? 'Fixed Price Warrants' : 'Pending Next Round'}
                                  </span>
                                  <div className="small text-muted mt-1">
                                    <i className="bi bi-info-circle me-1"></i>
                                    Warrants will automatically exercise according to the terms.
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                        {/* Legacy warrant display for Common Stock */}
                        {/* {records.instrumentType === "Common Stock" && formData.hasWarrants && warrantShares > 0 && (
                            <div className="form-group mb-4">
                              <label className="form-label fw-semibold mb-2">
                                Potential Warrant Shares
                              </label>
                              <div className="form-control-plaintext fw-bold">
                                {warrantShares.toLocaleString()} shares
                              </div>
                            </div>
                          )} */}
                      </>
                    )}

                    {/* Venture/Bank Debt */}
                    {records.instrumentType === "Venture/Bank DEBT" && (
                      <>
                        <div className="form-group mb-4">
                          <label className="form-label fw-semibold mb-2">
                            Interest Rate
                          </label>
                          <div className="form-control-plaintext fw-bold">
                            {interestRate}% per year
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          <label className="form-label fw-semibold mb-2">
                            Repayment Schedule
                          </label>
                          <div className="form-control-plaintext fw-bold">
                            {maturityMonths} months
                          </div>
                        </div>

                        {formData.hasWarrants_Bank && warrantShares > 0 && (
                          <div className="form-group mb-4">
                            <label className="form-label fw-semibold mb-2">
                              Potential Warrant Shares
                            </label>
                            <div
                              className="form-control-plaintext fw-bold"
                              style={{
                                color: colors.info,
                                fontSize: "18px",
                                backgroundColor: "white",
                                padding: "12px",
                                borderRadius: "8px",
                                border: `1px solid ${colors.border}`,
                              }}
                            >
                              {warrantShares.toLocaleString()} shares
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* SAFE */}
                    {records.instrumentType === "Safe" && (
                      <>
                        <div className="form-group mb-3">
                          <label className="form-label fw-semibold">
                            SAFE Type
                          </label>
                          <div className="form-control-plaintext">
                            {formData.safeType === "POST_MONEY"
                              ? "Post-Money SAFE"
                              : "Pre-Money SAFE"}
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label fw-semibold">
                            Estimated Shares at Conversion
                          </label>
                          <div
                            className="form-control-plaintext fw-bold"
                            style={{
                              color: colors.primary,
                              fontSize: "18px",
                              backgroundColor: "white",
                              padding: "12px",
                              borderRadius: "8px",
                              border: `1px solid ${colors.border}`,
                            }}
                          >
                            {shares > 0 ? shares.toLocaleString() : '0'} shares
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label fw-semibold">
                            Estimated Ownership
                          </label>
                          <div
                            className="form-control-plaintext fw-bold"
                            style={{
                              color: colors.info,
                              fontSize: "18px",
                              backgroundColor: "white",
                              padding: "12px",
                              borderRadius: "8px",
                              border: `1px solid ${colors.border}`,
                            }}
                          >
                            {Ownership > 0 ? `${Ownership}%` : '0%'}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Convertible Note */}
                    {records.instrumentType === "Convertible Note" && (
                      <>
                        <div className="form-group mb-3">
                          <label className="form-label fw-semibold">
                            Principal Amount
                          </label>
                          <div className="form-control-plaintext fw-bold">
                            {records.currency}
                            {parseFloat(
                              investment.replace(/,/g, "") || 0
                            ).toLocaleString()}
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label fw-semibold">
                            Estimated Shares at Conversion
                          </label>
                          <div
                            className="form-control-plaintext fw-bold"
                            style={{
                              color: colors.primary,
                              fontSize: "18px",
                              backgroundColor: "white",
                              padding: "12px",
                              borderRadius: "8px",
                              border: `1px solid ${colors.border}`,
                            }}
                          >
                            {shares > 0 ? shares.toLocaleString() : '0'} shares
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <label className="form-label fw-semibold">
                            Estimated Ownership
                          </label>
                          <div
                            className="form-control-plaintext fw-bold"
                            style={{
                              color: colors.info,
                              fontSize: "18px",
                              backgroundColor: "white",
                              padding: "12px",
                              borderRadius: "8px",
                              border: `1px solid ${colors.border}`,
                            }}
                          >
                            {Ownership > 0 ? `${Ownership}%` : '0%'}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn w-100 mt-4 fw-semibold"
                      style={{
                        backgroundColor: colors.primary,
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "8px",
                        fontSize: "16px",
                      }}
                      disabled={validationError || !investment || parseFloat(investment.replace(/,/g, "")) === 0}
                    >
                      {validationError ? "Fix Errors to Invest" : "Confirm Investment"}
                    </button>

                    {/* Available Shares Warning */}
                    {availableShares === 0 && (
                      <div className="alert alert-warning mt-3">
                        <strong>Round Full!</strong> No shares available in this round.
                      </div>
                    )}

                    {/* {availableShares > 0 && investment && parseFloat(investment.replace(/,/g, "")) > 0 && (
                      <div className="alert alert-info mt-3 small">

                        {shares > availableShares && (
                          <span className="text-danger"> <strong>Warning:</strong> Exceeds available shares!</span>
                        )}
                      </div>
                    )} */}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default InvestNowPopup;