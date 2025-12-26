import React, { useState, useEffect } from "react";
import TopBar from "../../../components/Users/TopBar";
import ModuleSideNav from "../../../components/Users/ModuleSideNav";
import Alertpopup from "../../../components/Alertpopup";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/RegisterStyles";
import PreviousSection from "../../../components/Users/PreviousSection";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import axios from "axios";
import DangerAlertPopup from "../../../components/Admin/DangerAlertPopup";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config";
export default function EditRecordround() {
  const navigate = useNavigate();
  const apiUrlRound = API_BASE_URL + "api/user/capitalround/";
  const [progresswidth, setprogresswidth] = useState("0");
  const [countrySymbolList, setCountrysymbollist] = useState([]);
  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [activeSection, setActiveSection] = useState("shareclass");
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const [messageAll, setmessageAll] = useState("");
  const [errr, seterrr] = useState(false);
  const userLogin = JSON.parse(storedUsername);
  const { id } = useParams();
  // Add this to your component state
  const [errors, setErrors] = useState({
    liquidationOther: "",
    nameOfRound: "",
    shareClassType: "",
    shareclassother: "",
    instrumentType: "",
    customInstrument: "",
    issuedshares: "",
    dateroundclosed: "",
    liquidation: "",
    convertible: "",
    convertibleType: "",
    voting: "",
    termsheetFile: "",
    subscriptiondocument: "",
  });
  const [formData, setFormData] = useState({
    liquidationOther: "",
    liquidationpreferences: "",
    shareClassType: "",
    nameOfRound: "",
    shareclassother: "",
    description: "",
    instrumentType: "",
    customInstrument: "",
    roundsize: "",
    currency: "CAD $",
    issuedshares: "",
    dateroundclosed: "",
    rights: "",
    liquidation: "",
    convertible: "",
    convertibleType: "",
    voting: "",
    termsheetFile: null,
    subscriptiondocument: null,
    generalnotes: "",
  });

  useEffect(() => {
    document.title = "Edit Record Page";
  }, []);
  useEffect(() => {
    getEditrecordlist();
  }, []);
  const [Editrecords, setEditrecords] = useState("");
  const getEditrecordlist = async () => {
    const formData = {
      user_id: userLogin.id,
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
        setFormData({
          ...getData,
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

          liquidation: getData.liquidation
            ? getData.liquidation.split(",").map((v) => v.trim())
            : [],
        });

        setEditrecords(generateRes.data.results[0]);
        setSelected(getData.shareClassType);
      } else {
        navigate("/record-round-list");
      }
    } catch (err) {
      console.error("Error generating summary", err);
    }
    //  Optionally, call AI Summary API here
    //generateExecutiveSummary(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [selected, setSelected] = useState("");
  const [otherText, setOtherText] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("user_id", userLogin.id);
    formDataToSend.append("shareClassType", selected);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("liquidationOther", formData.liquidationOther);
    formDataToSend.append(
      "liquidationpreferences",
      formData.liquidationpreferences
    );
    formDataToSend.append("nameOfRound", formData.nameOfRound);
    formDataToSend.append("shareclassother", formData.shareclassother);
    formDataToSend.append("instrumentType", formData.instrumentType);
    formDataToSend.append("customInstrument", formData.customInstrument);
    formDataToSend.append("roundsize", formData.roundsize);
    formDataToSend.append("currency", formData.currency);
    formDataToSend.append("issuedshares", formData.issuedshares);
    formDataToSend.append("rights", formData.rights);
    formDataToSend.append("liquidation", formData.liquidation);
    formDataToSend.append("convertible", formData.convertible);
    formDataToSend.append("convertibleType", formData.convertibleType);
    formDataToSend.append("voting", formData.voting);
    formDataToSend.append("dateroundclosed", formData.dateroundclosed);
    formDataToSend.append("generalnotes", formData.generalnotes);
    formDataToSend.append("id", id);
    if (formData.termsheetFile && formData.termsheetFile.length > 0) {
      formData.termsheetFile.forEach((file) => {
        formDataToSend.append("termsheetFile", file);
      });
    }
    if (
      formData.subscriptiondocument &&
      formData.subscriptiondocument.length > 0
    ) {
      formData.subscriptiondocument.forEach((file) => {
        formDataToSend.append("subscriptiondocument", file);
      });
    }

    try {
      const res = await axios.post(
        apiUrlRound + "EditcapitalRound",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      seterrr(false);
      setmessageAll("Record updated successfully");
      setTimeout(() => {
        setmessageAll("");
        navigate("/record-round-list");
      }, 3500);
    } catch (err) {
      seterrr(true);
      setmessageAll(err);
      setTimeout(() => {
        setmessageAll("");
      }, 5000);
      console.error("Error fetching company details:", err);
    }
    //setsuccessMsg("Record round created successfully!");
  };

  // Share class options

  const options = [
    "Founder Shares (Family and Friends)",
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
  const sections = [
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
  //Progress bar
  const totalSections = sections.length;

  // Find the index of the active section
  const activeIndex = sections.findIndex(
    (section) => section.id === activeSection
  );

  // Compute progress percentage
  // - If only 1 section => 0%
  // - Otherwise, calculate relative progress from 0% to 100%
  const progressWidth =
    totalSections > 1
      ? Math.round((activeIndex / (totalSections - 1)) * 100)
      : 0;

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
    //setsuccessMsg(""); // clear review message
    //setIsReviewing(false); // hide confirm button
    await handleSubmit(); // submit form once
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
                    <p
                      className={errr ? " mt-3 error_pop" : "success_pop mt-3"}
                    >
                      {messageAll}
                    </p>
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
                      <h4 className="h5 mb-0">Edit Record Round</h4>
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
                          <h3 className="h5 mb-4 text-gray-800">Share Class</h3>

                          {/* Name of Round Field */}
                          <div className="mb-4">
                            <label className="form-label fw-semibold">
                              Name of Round{" "}
                              <span className="text-danger fs-5">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Enter round name (e.g., Series A, Seed Round)"
                              value={formData.nameOfRound}
                              onChange={(e) => {
                                handleInputChange(
                                  "nameOfRound",
                                  e.target.value
                                );
                                // Clear error when user starts typing
                                if (errors.nameOfRound) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    nameOfRound: "",
                                  }));
                                }
                              }}
                              className={`textarea_input ${errors.nameOfRound ? "is-invalid" : ""
                                }`}
                              maxLength={30}
                            />
                            <div className="d-flex justify-content-between align-items-center mt-1">
                              <div className="form-text">
                                {formData.nameOfRound.length}/30 characters
                              </div>
                              {errors.nameOfRound && (
                                <div className="text-danger small">
                                  <i className="bi bi-exclamation-circle me-1"></i>
                                  {errors.nameOfRound}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Share Class Type Field */}
                          <div className="mb-4">
                            <label className="form-label fw-semibold d-flex align-items-center">
                              Select Share Class Type
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
                                  Share class refers to different types of
                                  ownership in a startup, each tailored to the
                                  people investing or contributing at various
                                  stages. It helps define who gets what—how much
                                  ownership, what voting power, and what
                                  priority in payouts.
                                  <br />
                                  For example, Founder Shares typically reward
                                  early involvement and risk, often extended to
                                  family and friends. Advisor Shares compensate
                                  strategic contributors without full-time
                                  roles. Pre-Seed to Seed Extension rounds
                                  involve early investors betting on potential,
                                  often with convertible securities.
                                  <br />
                                  Series A to Series D, including their
                                  Extensions, mark institutional growth phases
                                  with increasing valuation, governance
                                  oversight, and negotiation power.
                                  <br />
                                  A Bridge Round is interim financing,
                                  maintaining momentum between significant
                                  raises or hitting milestones before the next
                                  round.
                                  <br />
                                  Selecting the right share class aligns equity
                                  distribution with strategic intent, investor
                                  expectations, and long-term capitalization
                                  planning.
                                </div>
                              </span>
                              <span className="text-danger fs-5 ms-1">*</span>
                              {errors.shareClassType && (
                                <span className="text-danger small ms-2">
                                  <i className="bi bi-exclamation-circle me-1"></i>
                                  {errors.shareClassType}
                                </span>
                              )}
                            </label>

                            <div className="row mt-3">
                              {options.map((opt) => (
                                <div key={opt} className="col-md-6 mb-3">
                                  <div
                                    className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${selected === opt
                                      ? " bg-light"
                                      : "border-gray-300"
                                      } ${errors.shareClassType
                                        ? "border-danger"
                                        : ""
                                      }`}
                                    onClick={() => {
                                      setSelected(opt);

                                      // Update shareClassType
                                      handleInputChange(
                                        "shareClassType",
                                        opt === "OTHER"
                                          ? formData.shareclassother
                                          : opt
                                      );

                                      // Reset custom input if not OTHER
                                      if (opt !== "OTHER") {
                                        handleInputChange(
                                          "shareclassother",
                                          ""
                                        );
                                      }

                                      // Clear errors
                                      if (
                                        errors.shareClassType ||
                                        errors.shareclassother
                                      ) {
                                        setErrors((prev) => ({
                                          ...prev,
                                          shareClassType: "",
                                          shareclassother: "",
                                        }));
                                      }
                                    }}
                                  >
                                    <div className="form-check">
                                      <input
                                        type="radio"
                                        name="shareClassType"
                                        value={opt}
                                        checked={selected === opt}
                                        onChange={() => {
                                          setSelected(opt);

                                          handleInputChange(
                                            "shareClassType",
                                            opt === "OTHER"
                                              ? formData.shareclassother
                                              : opt
                                          );

                                          if (opt !== "OTHER")
                                            handleInputChange(
                                              "shareclassother",
                                              ""
                                            );

                                          if (
                                            errors.shareClassType ||
                                            errors.shareclassother
                                          ) {
                                            setErrors((prev) => ({
                                              ...prev,
                                              shareClassType: "",
                                              shareclassother: "",
                                            }));
                                          }
                                        }}
                                        className="form-check-input"
                                      />
                                      <label className="form-check-label fw-medium">
                                        {opt}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Conditional Field for OTHER option */}
                          {selected === "OTHER" && (
                            <div className="mb-4">
                              <label className="form-label fw-semibold">
                                Custom Share Class Name
                              </label>
                              <input
                                type="text"
                                placeholder="Enter custom share class name"
                                value={formData.shareclassother}
                                onChange={(e) =>
                                  handleInputChange(
                                    "shareclassother",
                                    e.target.value
                                  )
                                }
                                className={`form-control ${errors.shareclassother ? "is-invalid" : ""
                                  }`}
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
                          <div className="d-flex justify-content-end ">
                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                // Validate before proceeding
                                const newErrors = {};

                                if (!formData.nameOfRound.trim()) {
                                  newErrors.nameOfRound =
                                    "This field is required";
                                }

                                if (!selected) {
                                  newErrors.shareClassType =
                                    "Please select a share class type";
                                }
                                if (selected === "OTHER") {
                                  if (!formData.shareclassother.trim()) {
                                    newErrors.shareclassother =
                                      "This field is required";
                                  }
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement =
                                      document.querySelector(
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
                                if (!formData.description.trim()) {
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
                          />

                          {/* Instruction text */}

                          {/* Instrument selection */}
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
                                <div
                                  className="tooltip-text tool-test-white text-white"
                                  role="tooltip"
                                >
                                  <strong>Description:</strong> The type of
                                  equity issued. Common classes include "Common
                                  Stock" for founders/employees and "Preferred"
                                  shares for investors. Each class has unique
                                  legal treatment.
                                  <br />
                                  <br />
                                  <strong>Why It’s Important:</strong> Signals
                                  investor seniority and expected rights.
                                  <br />
                                  <br /> Helps cap table readers quickly
                                  understand who holds what.
                                  <br />
                                  <br /> Prevents confusion when new rounds
                                  introduce more classes (e.g. Series A, B).
                                  <br />
                                  <br /> Used in legal docs, audits, and future
                                  diligence — consistency matters.
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
                                    className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData.instrumentType === opt.value
                                      ? " bg-light"
                                      : "border-gray-300"
                                      } ${errors.instrumentType
                                        ? "border-danger"
                                        : ""
                                      }`}
                                    onClick={() => {
                                      handleInputChange(
                                        "instrumentType",
                                        opt.value
                                      );

                                      // Reset customInstrument if not OTHER
                                      if (opt.value !== "OTHER")
                                        handleInputChange(
                                          "customInstrument",
                                          ""
                                        );

                                      // Clear errors
                                      if (
                                        errors.instrumentType ||
                                        errors.customInstrument
                                      ) {
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
                                        checked={
                                          formData.instrumentType === opt.value
                                        }
                                        onChange={() => {
                                          handleInputChange(
                                            "instrumentType",
                                            opt.value
                                          );

                                          if (opt.value !== "OTHER")
                                            handleInputChange(
                                              "customInstrument",
                                              ""
                                            );

                                          if (
                                            errors.instrumentType ||
                                            errors.customInstrument
                                          ) {
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

                          {/* Conditional OTHER input */}
                          {formData.instrumentType === "OTHER" && (
                            <div className="mb-4">
                              <label className="form-label fw-semibold">
                                Custom Investment Instrument Name
                              </label>
                              <input
                                type="text"
                                placeholder="Enter custom investment instrument name"
                                value={formData.customInstrument || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    "customInstrument",
                                    e.target.value
                                  )
                                }
                                className={`form-control ${errors.customInstrument &&
                                  !formData.customInstrument
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                maxLength={30}
                              />
                              <div className="form-text">
                                {formData.customInstrument
                                  ? formData.customInstrument.length
                                  : 0}
                                /30 characters
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

                                if (!formData.instrumentType) {
                                  newErrors.instrumentType =
                                    "Please select an investment instrument type";
                                }
                                if (formData.instrumentType === "OTHER") {
                                  if (!formData.customInstrument.trim()) {
                                    newErrors.customInstrument =
                                      "This field is required";
                                  }
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  setTimeout(() => {
                                    const firstErrorElement =
                                      document.querySelector(
                                        ".border-danger, .is-invalid"
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
                                  setActiveSection("roundsize");
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
                            ]}
                          />
                          <h3 className="h5 mb-4 text-gray-800">Round Size</h3>
                          <div className="row align-items-start">
                            <div className="col-md-6 mb-4">
                              <label className="form-label fw-semibold">
                                Amount{" "}
                                <span
                                  className="tooltip-icon ms-2"
                                  tabIndex={0}
                                >
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
                                    Round size is the total capital an
                                    early-stage company seeks to raise in a
                                    financing round, typically through equity,
                                    SAFEs, or convertible notes, and plays a
                                    critical role in determining ownership
                                    dilution, investor rights, and cap table
                                    structure. It’s the headline number often
                                    seen in investor decks (“We’re raising $2
                                    million in our Seed round”), but beneath
                                    that number sits a complex mix of legal,
                                    strategic, and operational considerations.
                                    Getting it right is essential: raising too
                                    little risks running out of funds before
                                    hitting key milestones, while raising too
                                    much can distort valuations and lead to down
                                    rounds. Smart planning ensures funds last to
                                    the next inflection point, supports
                                    momentum, and protects founder control.
                                  </div>
                                </span>
                                <span className="text-danger fs-5">*</span>
                              </label>
                              <NumericFormat
                                thousandSeparator={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                allowNegative={false}
                                placeholder="Enter amount"
                                value={formData.roundsize}
                                onValueChange={(values) => {
                                  handleInputChange("roundsize", values.value); // raw numeric value (without commas)
                                  if (errors.roundsize) {
                                    setErrors((prev) => ({
                                      ...prev,
                                      roundsize: "",
                                    }));
                                  }
                                }}
                                className={`textarea_input ${errors.roundsize ? "is-invalid" : ""
                                  }`}
                              />

                              <div className="d-flex justify-content-between align-items-center mt-1">
                                {errors.roundsize && (
                                  <div className="text-danger small">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors.roundsize}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <label className="form-label fw-semibold">
                                Currency
                              </label>
                              <select
                                className="textarea_input"
                                value={formData.currency}
                                onChange={(e) =>
                                  handleInputChange("currency", e.target.value)
                                }
                              >
                                <option value="">-- Select Currency --</option>
                                {countrySymbolList.map((item) => (
                                  <option
                                    key={item.id}
                                    value={`${item.currency_code} ${item.currency_symbol}`} // 👈 code + symbol
                                  >
                                    {item.currency_code} {item.currency_symbol}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between  gap-2">
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

                                if (!formData.roundsize.trim()) {
                                  newErrors.roundsize =
                                    "This field is required";
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement =
                                      document.querySelector(
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
                          />
                          <h3 className="h5 mb-4 text-gray-800">
                            Specify the total number of shares being issued in
                            this round only
                          </h3>
                          <div className="row">
                            <div className="col-md-6  mb-4">
                              <label className="form-label fw-semibold">
                                Total Shares Issued in this Round{" "}
                                <span
                                  className="tooltip-icon ms-2"
                                  tabIndex={0}
                                >
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
                                    The number of shares in an early-stage
                                    company represents the total units of
                                    ownership authorized, issued, or outstanding
                                    across the cap table, and serves as the
                                    fundamental denominator for equity
                                    allocation, valuation modeling, and investor
                                    negotiations. At its core, share count
                                    affects percentage ownership, dilution
                                    outcomes, and legal entitlements such as
                                    voting power and liquidation preferences.
                                    Startups typically begin with a set number
                                    of authorized shares (e.g. 10 million) —
                                    often arbitrary but chosen to facilitate
                                    clean math and flexibility for future
                                    allocations like option pools or new rounds.
                                  </div>
                                </span>
                                <span style={{ color: "var(--primary)" }}>
                                  *
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
                                  handleInputChange(
                                    "issuedshares",
                                    values.value
                                  ); // raw numeric value (without commas)
                                  if (errors.issuedshares) {
                                    setErrors((prev) => ({
                                      ...prev,
                                      issuedshares: "",
                                    }));
                                  }
                                }}
                                className={`textarea_input ${errors.issuedshares ? "is-invalid" : ""
                                  }`}
                              />
                              <div className="d-flex justify-content-between align-items-center mt-1">
                                {errors.issuedshares && (
                                  <div className="text-danger small">
                                    <i className="bi bi-exclamation-circle me-1"></i>
                                    {errors.issuedshares}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6 mb-4">
                              <label className="form-label fw-semibold">
                                Date Round Closed{" "}
                                <span style={{ color: "var(--primary)" }}>
                                  *
                                </span>
                              </label>
                              <input
                                type="text"
                                placeholder="MM/DD/YYYY or ROUND OPEN"
                                value={formData.dateroundclosed}
                                onChange={(e) => {
                                  handleInputChange(
                                    "dateroundclosed",
                                    e.target.value
                                  );

                                  if (errors.dateroundclosed) {
                                    setErrors((prev) => ({
                                      ...prev,
                                      dateroundclosed: "",
                                    }));
                                  }
                                }}
                                className={`textarea_input ${errors.dateroundclosed ? "is-invalid" : ""
                                  }`}
                              />
                              {errors.dateroundclosed && (
                                <div className="text-danger small mt-1">
                                  <i className="bi bi-exclamation-circle me-1"></i>
                                  {errors.dateroundclosed}
                                </div>
                              )}
                              <div className="form-text">
                                Calendar: MM / DD / YYYY. If round not closed,
                                type "ROUND OPEN".
                              </div>
                            </div>
                          </div>

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
                                const newErrors = {};

                                // Validate issuedshares
                                if (!(formData.issuedshares ?? "").trim()) {
                                  newErrors.issuedshares =
                                    "This field is required";
                                }

                                // Validate dateroundclosed
                                const dateRegex =
                                  /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/; // MM/DD/YYYY
                                const inputValue = (
                                  formData.dateroundclosed ?? ""
                                ).trim();

                                if (!inputValue) {
                                  newErrors.dateroundclosed =
                                    "This field is required";
                                } else if (
                                  inputValue.toUpperCase() !== "ROUND OPEN"
                                ) {
                                  if (!dateRegex.test(inputValue)) {
                                    newErrors.dateroundclosed =
                                      'Enter a valid date (MM/DD/YYYY) or type "ROUND OPEN"';
                                  } else {
                                    // Check if date is today or in the future
                                    const [month, day, year] = inputValue
                                      .split("/")
                                      .map(Number);
                                    const inputDate = new Date(
                                      year,
                                      month - 1,
                                      day
                                    );
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0); // ignore time

                                    if (inputDate < today) {
                                      newErrors.dateroundclosed =
                                        "Date cannot be in the past";
                                    }
                                  }
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement =
                                      document.querySelector(
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
                          />

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
                                  <strong>What it is:</strong> Specifies the
                                  negotiated powers and entitlements that
                                  holders of this class enjoy — it’s the fine
                                  print investors care about.
                                  <br />
                                  <strong>Why it matters:</strong> This defines
                                  control dynamics, dividend rights, conversion
                                  triggers, redemption clauses, anti-dilution,
                                  etc. It’s the architecture of deal terms.
                                  <br />
                                  <strong>How to fill it:</strong> Reference
                                  exact clauses from investor agreements (term
                                  sheets or subscription documents) and simplify
                                  into readable but accurate summaries.
                                  <br />– Non-cumulative dividends at 6%
                                  annually
                                  <br />– Automatic conversion on qualified
                                  financing &gt;$5M
                                  <br />– Protective provisions for mergers,
                                  board expansion, and budget approvals
                                </div>
                              </span>
                            </label>
                            <textarea
                              placeholder="Describe the rights and preferences for this share class"
                              className="textarea_input"
                              rows="4"
                              value={formData.rights}
                              onChange={(e) =>
                                handleInputChange("rights", e.target.value)
                              }
                            />
                          </div>
                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => setActiveSection("issuedshares")}
                            >
                              Back
                            </button>
                            <button
                              className="global_btn w-fit"
                              onClick={() => setActiveSection("liquidation")}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}

                      {activeSection === "liquidation" && (
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
                          />

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
                                  <strong>What it is:</strong> Establishes the
                                  order and magnitude of payouts if the company
                                  is sold or dissolved.
                                  <br />
                                  <strong>Why it matters:</strong> Investors
                                  look here to understand downside protection
                                  and exit expectations — it’s one of the most
                                  scrutinized clauses during fundraising.
                                  <br />
                                  <strong>How to fill it:</strong> Clearly
                                  outline whether it’s non-participating (just
                                  the preference) or participating (preference +
                                  pro-rata share), and how it stacks with other
                                  rounds.
                                </div>
                              </span>
                            </label>
                            <textarea
                              placeholder="Describe the liquidation preference"
                              className="textarea_input"
                              rows="4"
                              value={formData.liquidationpreferences}
                              onChange={(e) =>
                                handleInputChange(
                                  "liquidationpreferences",
                                  e.target.value
                                )
                              }
                            />
                            <div className="row mt-3">
                              <label className="form-label fw-semibold">
                                Liquidation Participating{" "}
                                <span style={{ color: "var(--primary)" }}>
                                  *
                                </span>
                              </label>
                              {liquidationOptions.map((opt) => (
                                <div key={opt.value} className="col-md-6 mb-3">
                                  <div
                                    className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData.liquidation.includes(opt.value)
                                      ? " bg-light"
                                      : "border-gray-300"
                                      } ${errors.liquidation ? "border-danger" : ""
                                      }`}
                                    // When selecting/deselecting liquidation options
                                    onClick={() => {
                                      let updatedSelection = [
                                        ...formData.liquidation,
                                      ];

                                      if (opt.value === "N/A") {
                                        // N/A clears everything including OTHER
                                        updatedSelection = ["N/A"];
                                        handleInputChange(
                                          "liquidationOther",
                                          ""
                                        ); // Clear input
                                      } else if (opt.value === "OTHER") {
                                        // Toggle OTHER
                                        if (
                                          !updatedSelection.includes("OTHER")
                                        ) {
                                          updatedSelection.push("OTHER");
                                          updatedSelection =
                                            updatedSelection.filter(
                                              (v) => v !== "N/A"
                                            );
                                        } else {
                                          updatedSelection =
                                            updatedSelection.filter(
                                              (v) => v !== "OTHER"
                                            );
                                          handleInputChange(
                                            "liquidationOther",
                                            ""
                                          ); // Clear input when OTHER deselected
                                        }
                                      } else {
                                        // Normal options
                                        updatedSelection =
                                          updatedSelection.filter(
                                            (v) => v !== "N/A"
                                          );
                                        updatedSelection =
                                          updatedSelection.filter(
                                            (v) => v !== "OTHER"
                                          ); // Remove OTHER if any normal option is selected
                                        handleInputChange(
                                          "liquidationOther",
                                          ""
                                        ); // Clear input automatically

                                        if (
                                          !updatedSelection.includes(opt.value)
                                        ) {
                                          updatedSelection.push(opt.value);
                                        } else {
                                          updatedSelection =
                                            updatedSelection.filter(
                                              (v) => v !== opt.value
                                            );
                                        }
                                      }

                                      handleInputChange(
                                        "liquidation",
                                        updatedSelection
                                      );

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
                                        checked={formData.liquidation.includes(
                                          opt.value
                                        )}
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

                              {formData.liquidation.includes("OTHER") && (
                                <div className="mb-4">
                                  <label className="form-label fw-semibold">
                                    Custom Liquidation Participating:
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Enter custom response"
                                    value={formData.liquidationOther || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "liquidationOther",
                                        e.target.value
                                      )
                                    }
                                    className={`form-control ${errors.liquidationOther
                                      ? "is-invalid"
                                      : ""
                                      }`}
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
                          </div>
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
                                // Validate before proceeding
                                const newErrors = {};

                                if (!formData.liquidation) {
                                  newErrors.liquidation =
                                    "Please select a liquidation participating type";
                                }

                                if (formData.liquidation.includes("OTHER")) {
                                  if (!formData.liquidationOther.trim()) {
                                    newErrors.liquidationOther =
                                      "This field is required";
                                  }
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement =
                                      document.querySelector(
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
                          />

                          {/* YES / NO - Shares Convertible */}
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
                                  <strong>What it is:</strong> Indicate the
                                  conditions under which the security, typically
                                  a convertible note or SAFE, automatically or
                                  optionally converts into another class of
                                  shares, most commonly Common Stock.
                                  <br />
                                  <strong>Why it matters:</strong> Impacts
                                  equity dilution, IPO readiness, and governance
                                  transitions. This is key in modelling cap
                                  table evolution.
                                  <br />
                                  <strong>How to fill it:</strong> Yes/No +
                                  trigger mechanisms (voluntary, automatic,
                                  conditional)
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
                                  className={`form-check-input ${errors.convertible ? "is-invalid" : ""
                                    }`}
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
                                  className={`form-check-input ${errors.convertible ? "is-invalid" : ""
                                    }`}
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

                          {/* Show only if YES */}
                          {formData.convertible === "Yes" && (
                            <div className="mb-4">
                              <label className="form-label fw-semibold">
                                Convertible Type{" "}
                                <span style={{ color: "var(--primary)" }}>
                                  *
                                </span>
                              </label>
                              <div className="row mt-2">
                                {["Voluntary", "Automatic", "Conditional"].map(
                                  (opt) => (
                                    <div key={opt} className="col-md-4 mb-3">
                                      <div
                                        className={`form-check-card p-3 border rounded-3 cursor-pointer h-100 ${formData.convertibleType === opt
                                          ? " bg-light"
                                          : errors.convertibleType
                                            ? "border-danger"
                                            : "border-gray-300"
                                          }`}
                                        onClick={() => {
                                          handleInputChange(
                                            "convertibleType",
                                            opt
                                          );
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
                                            checked={
                                              formData.convertibleType === opt
                                            }
                                            onChange={() => {
                                              handleInputChange(
                                                "convertibleType",
                                                opt
                                              );
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
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>

                              {errors.convertibleType && (
                                <div className="text-danger small mt-1">
                                  <i className="bi bi-exclamation-circle me-1"></i>
                                  {errors.convertibleType}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Footer Buttons */}
                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => setActiveSection("liquidation")}
                            >
                              Back
                            </button>
                            <button
                              className="global_btn w-fit"
                              onClick={() => {
                                const newErrors = {};

                                // validation
                                if (!formData.convertible) {
                                  newErrors.convertible =
                                    "Please select Yes or No";
                                }
                                if (
                                  formData.convertible === "Yes" &&
                                  !formData.convertibleType
                                ) {
                                  newErrors.convertibleType =
                                    "Please select Voluntary, Automatic or Conditional";
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement =
                                      document.querySelector(
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
                                  setActiveSection("voting"); // move ahead
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
                          />

                          {/* YES / NO - Shares Convertible */}
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
                                  <strong>What it is:</strong> Determines how
                                  much influence equity holders wield in company
                                  decisions, including board appointments,
                                  strategic pivots, and future fundraising.
                                  <br />
                                  <strong>Why it matters:</strong> Control
                                  rights shape governance — founders often trade
                                  economic upside for retaining voting control.
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
                                  className={`form-check-input ${errors.voting ? "is-invalid" : ""
                                    }`}
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
                                  className={`form-check-input ${errors.voting ? "is-invalid" : ""
                                    }`}
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
                          </div>

                          {/* Footer Buttons */}
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

                                // validation
                                if (!formData.voting) {
                                  newErrors.voting = "Please select Yes or No";
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement =
                                      document.querySelector(
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
                                  setActiveSection("termsheet"); // move ahead
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}
                      {activeSection === "termsheet" && (
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
                          />

                          {/* Upload Term Sheet */}
                          {/* Upload Term Sheet */}
                          <div className="mb-4">
                            <label className="form-label fw-semibold d-flex align-items-center">
                              Upload Your Term Sheet(s)
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
                                  A term sheet is a non-binding document that
                                  sets the stage for an investment by outlining
                                  the essential terms of the deal: valuation,
                                  share type, governance rights, investor
                                  protections, and expected post-money
                                  ownership. It is the ‘strategic handshake’
                                  between founders and investors before drafting
                                  legal documents.
                                  <br />
                                  <br />
                                  Investors review it to understand precisely
                                  what they get in return for their capital,
                                  avoiding surprises like excessive dilution or
                                  missing voting rights.
                                  <br />
                                  <br />
                                  Once interest is confirmed, often through
                                  soft-circling, where investors signal informal
                                  commitments based on these outlined terms, the
                                  term sheet forms the backbone for the formal,
                                  binding subscription documents.
                                  <br />
                                  <br />
                                  Formal commitment only happens when investors
                                  sign the Term Sheet and the Subscription
                                  documents and transfer funds, officially
                                  becoming shareholders.
                                </div>
                              </span>
                            </label>

                            <input
                              type="file"
                              multiple
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
                              className={`textarea_input ${errors.termsheetFile ? "is-invalid" : ""
                                }`}
                            />

                            {/* Show selected file names */}
                            {formData.termsheetFile &&
                              formData.termsheetFile.length > 0 && (
                                <ul className="mt-2 small text-muted">
                                  {formData.termsheetFile.map((file, index) => (
                                    <li
                                      key={index}
                                      className="d-flex align-items-center justify-content-between"
                                    >
                                      <strong>{file?.name || file}</strong>
                                    </li>
                                  ))}
                                </ul>
                              )}

                            {errors.termsheetFile && (
                              <div className="text-danger small mt-1">
                                <i className="bi bi-exclamation-circle me-1"></i>
                                {errors.termsheetFile}
                              </div>
                            )}
                          </div>

                          {/* Footer Buttons */}
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
                                const newErrors = {};

                                if (
                                  !formData.termsheetFile ||
                                  formData.termsheetFile.length === 0
                                ) {
                                  newErrors.termsheetFile =
                                    "Please upload your file";
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement =
                                      document.querySelector(
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
                                  setActiveSection("subscription"); // move ahead
                                }
                              }}
                            >
                              Save and Continue
                            </button>
                          </div>
                        </div>
                      )}
                      {activeSection === "subscription" && (
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
                          />

                          {/* Upload Term Sheet */}
                          {/* Upload Term Sheet */}
                          <div className="mb-4">
                            <label className="form-label fw-semibold d-flex align-items-center">
                              Upload Your Subscription Document
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
                                  Subscription documents are the formal, legally
                                  binding agreements that an investor signs to
                                  purchase equity in a company after a term
                                  sheet has been agreed upon. These include the
                                  Subscription Agreement, which outlines how
                                  many shares the investor is buying, at what
                                  price, and under what terms; and are often
                                  accompanied by ancillary documents such as a
                                  Shareholders’ Agreement (covering governance,
                                  exit terms, voting rights), and occasionally
                                  Investor Rights Agreements or Side Letters.
                                  <br />
                                  <br />
                                  Subscription documents legally commit the
                                  investor to the deal and obligate the company
                                  to issue shares in exchange for capital. They
                                  are drafted using the economic and legal terms
                                  defined in the term sheet, meaning they
                                  enforce the handshake that began at the
                                  negotiation stage.
                                  <br />
                                  <br />
                                  Investors must carefully review subscription
                                  documents before signing, as they mark the
                                  transition from informal interest to formal
                                  shareholder status, binding them to the
                                  obligations, rights, and risks of the
                                  investment.
                                </div>
                              </span>
                            </label>

                            <input
                              type="file"
                              multiple
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
                              className={`textarea_input ${errors.subscriptiondocument ? "is-invalid" : ""
                                }`}
                            />

                            {/* Show selected file names */}
                            {formData.subscriptiondocument &&
                              formData.subscriptiondocument.length > 0 && (
                                <ul className="mt-2 small text-muted">
                                  {formData.subscriptiondocument.map(
                                    (file, index) => (
                                      <li
                                        key={index}
                                        className="d-flex align-items-center justify-content-between"
                                      >
                                        <strong>{file?.name || file}</strong>
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}

                            {errors.subscriptiondocument && (
                              <div className="text-danger small mt-1">
                                <i className="bi bi-exclamation-circle me-1"></i>
                                {errors.subscriptiondocument}
                              </div>
                            )}
                          </div>

                          {/* Footer Buttons */}
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
                                const newErrors = {};

                                if (
                                  !formData.subscriptiondocument ||
                                  formData.subscriptiondocument.length === 0
                                ) {
                                  newErrors.subscriptiondocument =
                                    "Please upload your file";
                                }

                                if (Object.keys(newErrors).length > 0) {
                                  setErrors(newErrors);

                                  // Scroll to first error
                                  setTimeout(() => {
                                    const firstErrorElement =
                                      document.querySelector(
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
                                  setActiveSection("notes"); // move ahead
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
                          />

                          <div className="mb-4">
                            <label className="form-label fw-semibold d-flex align-items-center">
                              General Notes About the Round
                            </label>

                            <textarea
                              placeholder="Enter here..."
                              className="textarea_input"
                              rows="4"
                              value={formData.generalnotes}
                              onChange={(e) =>
                                handleInputChange(
                                  "generalnotes",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* Footer Buttons */}
                          <div className="d-flex justify-content-between gap-2">
                            <button
                              className="close_btn w-fit"
                              onClick={() => setActiveSection("subscription")}
                            >
                              Back
                            </button>
                            <button
                              className="global_btn w-fit"
                              type="button"
                              onClick={handleConfirm}
                            >
                              Save
                            </button>
                          </div>
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
