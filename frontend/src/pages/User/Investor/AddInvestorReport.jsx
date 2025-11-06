import React, { useState, useEffect } from "react";

import MainHeader from "../../../components/Users/MainHeader.js";
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import { SiFuturelearn } from "react-icons/si";
import { SiGooglemarketingplatform } from "react-icons/si";
import { RiCustomerService2Line } from "react-icons/ri";
import { RiRefund2Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";
import TopBar from "../../../components/Users/TopBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { CgPerformance } from "react-icons/cg";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import { DataRoomSection } from "../../../components/Styles/DataRoomStyle.js";
import { BackButton } from "../../../components/Styles/GlobalStyles.js";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddInvestorReport() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const userLogin = JSON.parse(storedUsername);
  const [spinners, setspinnsers] = useState(false);
  const [message, setmessage] = useState("");
  const [ClientIP, setClientIP] = useState("");
  const [err, seterr] = useState(false);
  var apiURLAiFile = "http://localhost:5000/api/user/aifile/";
  document.title = "Investor Report Form";
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const apiURLSignature = "http://localhost:5000/api/user/";
  useEffect(() => {
    getAuthorizedSignature();
  }, []);

  const getAuthorizedSignature = async () => {
    // Skip check entirely for Owners
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
          navigate("/investorlist");
        }
      } else {
        navigate("/investorlist");
      }
    } catch (err) {
      console.error("Error fetching authorized signature:", err);
    }
  };

  useEffect(() => {
    handleredirecturl();
  }, []);
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
  const handleredirecturl = async () => {
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
        navigate("/investorlist");
      } else if (updateAlreadySubmitted) {
        //navigate("/investorlist");
      } else {
      }
    } catch (err) { }
  };

  const handleSubmit = async (e) => {
    handleredirecturl();
    e.preventDefault();
    setspinnsers(true);
    const formData = {
      financialPerformance: e.target["financial-performance"].value,
      operationalUpdates: e.target["operational-updates"].value,
      marketCompetitive: e.target["market-competitive"].value,
      customerProduct: e.target["customer-product"].value,
      fundraisingFinancial: e.target["fundraising-financial"].value,
      futureOutlook: e.target["future-outlook"].value,
      company_id: userLogin.companies[0].id,
      user_id: userLogin.id,
      created_by_id: userLogin.id,
      created_by_role: userLogin.role,
      ip_address: ClientIP,
    };
    try {
      const generateRes = await axios.post(
        apiURLAiFile + "Addinvenstorreport",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setspinnsers(false);
      seterr(false);
      var dataa = generateRes.data;
      setmessage("Investor report submitted successfully");
      setTimeout(() => {
        navigate("/investorlist");
      }, 1500);
    } catch (err) {
      console.error("Error generating summary", err);
    }
    //  Optionally, call AI Summary API here
    //generateExecutiveSummary(formData);
  };
  const handleBackClick = () => {
    navigate("/investorlist");
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
                  <DataRoomSection className="d-flex flex-column gap-2">
                    <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                      <BackButton
                        type="button"
                        className="backbtn"
                        onClick={handleBackClick}
                      >
                        <ArrowLeft size={16} className="me-1" /> back
                      </BackButton>
                      <h4>Add Investor</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="d-flex flex-column gap-3 formlist">
                        <label className="d-block mt-3">
                          <div className="d-flex align-items-center gap-2">
                            <CgPerformance
                              color="red"
                              style={{ fontSize: "25px" }}
                            />{" "}
                            <h5>
                              Financial Performance{" "}
                              <span style={{ color: "var(--primary)" }}>*</span>
                            </h5>
                          </div>

                          <ul className="d-flex flex-column gap-2 mt-2">
                            <li>
                              What were the company’s revenues, expenses, and
                              profits this quarter?{" "}
                            </li>
                            <li>
                              How does this compare to previous quarters and
                              projections?
                            </li>
                            <li>
                              What are the key financial trends or concerns?{" "}
                            </li>
                          </ul>
                          <textarea
                            rows={3}
                            className="form-control"
                            onChange={handleChange}
                            type="text"
                            name="financial-performance"
                            placeholder="Add Here..."
                            id="financial-performance"
                            required
                          />
                        </label>

                        <label className="d-block">
                          <div className="d-flex align-items-center gap-2">
                            <GrUpdate
                              color="red"
                              style={{ fontSize: "25px", width: "20px" }}
                            />{" "}
                            <h5>
                              Operational Updates
                              <span style={{ color: "var(--primary)" }}>*</span>
                            </h5>
                          </div>
                          <ul className="d-flex flex-column gap-2 mt-2">
                            <li>
                              What milestones or achievements were reached?
                            </li>
                            <li>
                              Were there any major challenges or setbacks?
                            </li>
                            <li>How has the team grown or changed? </li>
                          </ul>
                          <textarea
                            rows={3}
                            className="form-control"
                            type="text"
                            onChange={handleChange}
                            name="operational-updates"
                            placeholder="Add Here..."
                            id="operational-updates"
                            required
                          />
                        </label>

                        <label className="d-block">
                          <div className="d-flex align-items-center gap-2">
                            <SiGooglemarketingplatform
                              color="red"
                              style={{ fontSize: "25px", width: "20px" }}
                            />{" "}
                            <h5>
                              Market & Competitive Landscape
                              <span style={{ color: "var(--primary)" }}>*</span>
                            </h5>
                          </div>

                          <ul className="d-flex flex-column gap-2 mt-2">
                            <li>
                              How has the market evolved, and what trends are
                              emerging?
                            </li>
                            <li>
                              What competitive advantages or risks have
                              surfaced?
                            </li>
                            <li>
                              How is the company positioning itself for future
                              success?
                            </li>
                          </ul>
                          <textarea
                            rows={3}
                            className="form-control"
                            onChange={handleChange}
                            type="text"
                            name="market-competitive"
                            placeholder="Add Here..."
                            id="market-competitive"
                            required
                          />
                        </label>

                        <label className="d-block">
                          <div className="d-flex align-items-center gap-2">
                            <RiCustomerService2Line
                              color="red"
                              style={{ fontSize: "25px", width: "20px" }}
                            />{" "}
                            <h5>
                              Customer & Product Insights
                              <span style={{ color: "var(--primary)" }}>*</span>
                            </h5>
                          </div>
                          <ul className="d-flex flex-column gap-2 mt-2">
                            <li>What feedback have customers provided?</li>
                            <li>How has the product or service improved?</li>
                            <li>
                              What new developments or launches are planned?{" "}
                            </li>
                          </ul>
                          <textarea
                            rows={3}
                            className="form-control"
                            onChange={handleChange}
                            type="text"
                            name="customer-product"
                            placeholder="Add Here..."
                            id="customer-product"
                            required
                          />
                        </label>

                        <label className="d-block">
                          <div className="d-flex align-items-center gap-2">
                            <RiRefund2Fill
                              color="red"
                              style={{ fontSize: "25px", width: "20px" }}
                            />{" "}
                            <h5>
                              Fundraising & Financial Strategy
                              <span style={{ color: "var(--primary)" }}>*</span>
                            </h5>
                          </div>

                          <ul className="d-flex flex-column gap-2 mt-2 p-0">
                            <li>
                              What is the current cash runway and burn rate?
                            </li>
                            <li>
                              Are there upcoming funding needs or investment
                              opportunities?{" "}
                            </li>
                            <li>
                              How are financial resources being allocated for
                              growth?
                            </li>
                          </ul>
                          <textarea
                            rows={3}
                            className="form-control"
                            onChange={handleChange}
                            type="text"
                            name="fundraising-financial"
                            placeholder="Add Here..."
                            id="fundraising-financial"
                            required
                          />
                        </label>

                        <label className="d-block">
                          <div className="d-flex align-items-center gap-2">
                            <SiFuturelearn
                              color="red"
                              style={{ fontSize: "25px", width: "20px" }}
                            />{" "}
                            <h5>
                              Future Outlook & Strategy
                              <span style={{ color: "var(--primary)" }}>*</span>
                            </h5>
                          </div>

                          <ul className="d-flex flex-column gap-2 mt-2">
                            <li>
                              What are the company’s goals for the next quarter?
                            </li>
                            <li>
                              What strategic shifts or pivots are being
                              considered?{" "}
                            </li>
                            <li>
                              How can investors support the company’s success?
                            </li>
                          </ul>
                          <textarea
                            rows={3}
                            className="form-control"
                            onChange={handleChange}
                            type="text"
                            name="future-outlook"
                            placeholder="Add Here..."
                            id="future-outlook"
                            required
                          />
                        </label>

                        <div className="d-flex justify-content-start align-items-center">
                          <button
                            type="submit"
                            disabled={spinners}
                            className="global_btn mt-3 d-flex align-items-center gap-2 ms-auto w-fit"
                            style={{ opacity: spinners ? 0.6 : 1 }}
                          >
                            <span>Submit</span>
                            {spinners && (
                              <div
                                className="spinner-border text-light ms-1"
                                role="status"
                                style={{ width: "1rem", height: "1rem" }} // Optional: resize spinner
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            )}
                          </button>

                          {message && (
                            <p
                              className={
                                err ? " mt-3 error_pop" : "success_pop mt-3"
                              }
                            >
                              {message}
                            </p>
                          )}
                        </div>
                      </div>
                    </form>
                  </DataRoomSection>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
