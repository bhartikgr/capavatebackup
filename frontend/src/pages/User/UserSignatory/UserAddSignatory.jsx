import React, { useState, useEffect, useRef } from "react";
import TopBar from "../../../components/Users/UserDashboard/TopBar.jsx";
import ModuleSideNav from "../../../components/Users/UserDashboard/ModuleSideNav.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "react-tooltip/dist/react-tooltip.css";
export default function UserAddCompany() {
  const storedUsername = localStorage.getItem("OwnerLoginData");
  const userLogin = JSON.parse(storedUsername);
  const apiUrlCompany = "https://capavate.com/api/user/company/";
  document.title = "Add New Signatory";
  const [errr, seterrr] = useState(false);
  const [dangerMessage, setdangerMessage] = useState("");
  const [companydata, setcompanydata] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getcompanyAlldetail();
  }, []);

  const getcompanyAlldetail = async () => {
    let formdata = {
      user_id: userLogin.id,
    };
    try {
      const res = await axios.post(
        apiUrlCompany + "getcompanyAlldetail",
        formdata,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setcompanydata(res.data.results);
    } catch (err) {
      console.error("Error fetching company details:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Reset errors
    setSignatoryErrors({ emailMatch: "" });

    // Trim emails
    const email = signatory.signatory_email.trim();
    const confirmEmail = signatory.signatory_confirm_email.trim();

    // Validate email match
    if (email && confirmEmail && email !== confirmEmail) {
      setSignatoryErrors({ emailMatch: "Emails do not match!" });

      const field = document.getElementById("email");
      if (field) {
        field.scrollIntoView({ behavior: "smooth", block: "center" });
        field.focus();
      }

      setIsLoading(false);
      return;
    }

    // Prepare form data
    const formData = {
      first_name: signatory.first_name,
      last_name: signatory.last_name,
      email: signatory.signatory_email,
      linked_in: signatory.linked_in,
      phone: signatory.phone,
      signature_role: signatory.signature_role,
      other_role: signatory.other_role,
      company_id: e.target.company_id.value,
      user_id: userLogin.id,
    };

    try {
      const respo = await axios.post(`${apiUrlCompany}addSignatory`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      setdangerMessage(respo.data.message);
      if (respo.data.status === "2") {
        seterrr(true);
      } else {
        seterrr(false);
        setTimeout(() => {
          setdangerMessage("");
          navigate("/user/signatorylist");
        }, 3000);
      }
    } catch (err) {
      setdangerMessage("Error updating profile. Please try again.");
      seterrr(true);
      setTimeout(() => setdangerMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const [signatory, setSignatory] = useState({
    first_name: "",
    last_name: "",
    signatory_email: "",
    confirm_email: "",
    linked_in: "",
    phone: "",
    signature_role: "",
    other_role: "",
  });

  const [errors, setErrors] = useState({ emailMatch: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedSignatory = { ...signatory, [name]: value };

    // Clear other_role if role is not "Other"
    if (name === "signature_role" && value !== "Other") {
      updatedSignatory.other_role = "";
    }

    // Validate email match
    if (name === "signatory_email" || name === "signatory_confirm_email") {
      if (
        updatedSignatory.signatory_email &&
        updatedSignatory.signatory_confirm_email &&
        updatedSignatory.signatory_email !==
        updatedSignatory.signatory_confirm_email
      ) {
        setErrors({ emailMatch: "Emails do not match!" });
      } else {
        setErrors({ emailMatch: "" });
      }
    }

    setSignatory(updatedSignatory);
  };

  // Remove a signatory

  const [signatoryErrors, setSignatoryErrors] = useState({ emailMatch: "" });

  //

  const handlePhoneChange = (value) => {
    setSignatory({ ...signatory, phone: value });
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
                    <div className="profile-header">
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
                        <h2>Signatory Contact Info</h2>
                      </div>
                    </div>

                    <div className="profile-content">
                      <form onSubmit={handleSubmit} method="post">
                        <div className="row g-3">
                          <div className="d-flex flex-column gap-4">
                            <div className="d-flex flex-column gap-1 justify-content-start align-items-start"></div>
                            <div className="row gy-3">
                              {/* First Name */}
                              <div className="col-md-12">
                                <div className="d-flex flex-column gap-2">
                                  <label
                                    className="label_fontWeight"
                                    htmlFor="company"
                                  >
                                    Company <span className="required">*</span>
                                  </label>

                                  <div className="d-flex justify-content-between align-items-center">
                                    <select
                                      id="company"
                                      onChange={handleChange}
                                      className="form-select me-3" // add margin-end for spacing
                                      name="company_id"
                                      required
                                    >
                                      <option value="">Select Company</option>
                                      {companydata &&
                                        companydata.length > 0 &&
                                        companydata.map((company, index) => (
                                          <option
                                            key={index}
                                            value={company.id}
                                          >
                                            {company.company_name}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label
                                    className="label_fontWeight"
                                    htmlFor="first_name"
                                  >
                                    First Name{" "}
                                    <span className="required">*</span>
                                  </label>

                                  <input
                                    onChange={handleChange}
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    className="form-control"
                                    placeholder="Enter first name"
                                    required
                                  />
                                </div>
                              </div>

                              {/* Last Name */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label
                                    className="label_fontWeight"
                                    htmlFor="last_name"
                                  >
                                    Last Name{" "}
                                    <span className="required">*</span>
                                  </label>

                                  <input
                                    id="last_name"
                                    onChange={handleChange}
                                    type="text"
                                    name="last_name"
                                    placeholder="Enter last name"
                                    className="form-control"
                                    required
                                  />
                                </div>
                              </div>

                              {/* Email */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label
                                    className="label_fontWeight"
                                    htmlFor="signatory_email"
                                  >
                                    Email <span className="required">*</span>
                                  </label>

                                  <input
                                    id={`signatory_email`}
                                    onChange={handleChange}
                                    type="email"
                                    name="signatory_email"
                                    placeholder="Enter email"
                                    className="form-control"
                                    required
                                  />
                                </div>
                              </div>

                              {/* Confirm Email */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label
                                    className="label_fontWeight"
                                    htmlFor="signatory_confirm_email"
                                  >
                                    Confirm Email{" "}
                                    <span className="required">*</span>
                                  </label>

                                  <input
                                    onChange={handleChange}
                                    type="email"
                                    id="signatory_confirm_email"
                                    name="signatory_confirm_email"
                                    placeholder="Enter confirm name"
                                    className="form-control"
                                    required
                                  />
                                  {errors?.emailMatch && (
                                    <div
                                      style={{ fontSize: "13px" }}
                                      className="text-danger text-start fw-semibold"
                                    >
                                      {errors.emailMatch}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* LinkedIn */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label
                                    className="label_fontWeight"
                                    htmlFor="linked_in"
                                  >
                                    LinkedIn Profile
                                  </label>

                                  <input
                                    id="linked_in"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Enter linkedIn profile"
                                    name="linked_in"
                                    className="form-control"
                                  />
                                </div>
                              </div>

                              {/* Phone */}
                              <div className="col-md-6">
                                <div className="d-flex flex-column gap-2">
                                  <label
                                    className="label_fontWeight"
                                    htmlFor="signatory_phone"
                                  >
                                    Phone Number{" "}
                                    <span className="required">*</span>
                                  </label>

                                  <PhoneInput
                                    required
                                    name="signatory_phone"
                                    defaultCountry="CA"
                                    className="phonregister form-control"
                                    value={signatory.phone}
                                    onChange={handlePhoneChange}
                                    placeholder="Enter phone number"
                                  />
                                </div>
                              </div>

                              {/* Role */}
                              <div className="col-md-12">
                                <div className="d-flex flex-column gap-2">
                                  <label
                                    className="label_fontWeight"
                                    htmlFor="signatory_role"
                                  >
                                    Role <span className="required">*</span>
                                  </label>

                                  <select
                                    id="signatory_role"
                                    onChange={handleChange}
                                    className="form-select"
                                    name="signature_role"
                                    required
                                  >
                                    <option value="">Choose Role</option>
                                    <option value="Founder and Chief Executive Officer (CEO) – Visionary and strategic leader">
                                      Founder and Chief Executive Officer (CEO)
                                      – Visionary and strategic leader
                                    </option>
                                    <option value="Chief Operating Officer (COO) – Oversees daily operations">
                                      Chief Operating Officer (COO) – Oversees
                                      daily operations
                                    </option>
                                    <option value="Chief Financial Officer (CFO) – Manages finances and fundraising">
                                      Chief Financial Officer (CFO) – Manages
                                      finances and fundraising
                                    </option>
                                    <option value="Chief Investment Officer (CIO) – Manages engagements with investors and shareholders">
                                      Chief Investment Officer (CIO) – Manages
                                      engagements with investors and
                                      shareholders
                                    </option>
                                    <option value="Chief Technology Officer (CTO) – Leads product and tech development">
                                      Chief Technology Officer (CTO) – Leads
                                      product and tech development
                                    </option>
                                    <option value="Chief Marketing Officer (CMO) – Drives brand and customer acquisition">
                                      Chief Marketing Officer (CMO) – Drives
                                      brand and customer acquisition
                                    </option>
                                    <option value="Chief Product Officer (CPO) – Owns product strategy and roadmap">
                                      Chief Product Officer (CPO) – Owns product
                                      strategy and roadmap
                                    </option>
                                    <option value="Chief Revenue Officer (CRO) – Focuses on sales and revenue growth">
                                      Chief Revenue Officer (CRO) – Focuses on
                                      sales and revenue growth
                                    </option>
                                    <option value="Chief People Officer (CPO) – Builds company culture and HR strategy">
                                      Chief People Officer (CPO) – Builds
                                      company culture and HR strategy
                                    </option>
                                    <option value="Legal Counsel – Advises on contracts, IP, and compliance">
                                      Legal Counsel – Advises on contracts, IP,
                                      and compliance
                                    </option>
                                    <option value="Advisory Board Member – Expert advisor guiding strategy, growth, and investor relations">
                                      Advisory Board Member – Expert advisor
                                      guiding strategy, growth, and investor
                                      relations
                                    </option>
                                    <option value="Other">Other</option>
                                  </select>
                                </div>
                              </div>
                              {signatory.signature_role === "Other" && (
                                <div className="col-md-12">
                                  <div className="d-flex flex-column gap-2 mt-2">
                                    <label className="label_fontWeight">
                                      Please specify role{" "}
                                      <span className="required">*</span>
                                    </label>

                                    <input
                                      type="text"
                                      name="other_role"
                                      className="form-control"
                                      onChange={handleChange}
                                      required
                                      placeholder="Enter role"
                                    />
                                  </div>
                                </div>
                              )}
                              {/* Remove button */}
                            </div>
                          </div>
                        </div>

                        {/* Save Button */}
                        <div className="form-actions">
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
                      </form>
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </Wrapper>

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
