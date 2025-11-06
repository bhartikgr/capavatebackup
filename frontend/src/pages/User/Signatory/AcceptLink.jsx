import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import { Eye, EyeOff } from "lucide-react";
import "react-phone-number-input/style.css";
import { useLocation } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import {
  Stepblock,
  Titletext1,
  Iconblock,
  Sup,
  SectionWrapper,
} from "../../../components/Styles/RegisterStyles";

import { Lock, Mail, Building } from "lucide-react";

export default function AcceptLink() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errr, seterrr] = useState(false);
  const [dangerMessage, setdangerMessage] = useState("");
  const [SignatoryData, setSignatoryData] = useState("");
  const location = useLocation();
  const [SignatoryDataActiveOrNOt, setSignatoryDataActiveOrNOt] = useState("");
  const { code } = useParams();
  document.title = "Accept Invition Link";
  var apiURL = "http://localhost:5000/api/user/signatory/";
  localStorage.removeItem("SignatoryLoginData");

  useEffect(() => {
    if (code) {
      SignatoryinvitationLink();
    }
  }, []);
  const SignatoryinvitationLink = async () => {
    try {
      let payload = {
        code: code,
      };

      const res = await axios.post(
        apiURL + "signatoryinvitationLink",
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const respData = res.data;
      console.log(respData);
      if (respData.results.length === 0) {
        navigate("/signatory/login");
      } else {
        setSignatoryData(respData.results);
        setSignatoryDataActiveOrNOt(respData.status);
      }
    } catch (err) { }
  };
  useEffect(() => {
    const savedColor = localStorage.getItem("primaryColor");
    if (savedColor) {
      document.documentElement.style.setProperty("--primary", savedColor);
      document.documentElement.style.setProperty(
        "--primary-icon",
        `${savedColor}90`
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var password = e.target.password.value;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordRegex.test(password)) {
      setFormErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      }));
      return;
    } else {
      setFormErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
    try {
      let payload = {
        code: code,
        password: password,
      };
      const res = await axios.post(
        apiURL + "acceptInvitationSignatory",
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.status === "2") {
        seterrr(true);
      } else {
        seterrr(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_email: "",
          phone: "",
        });

        setTimeout(() => {
          navigate("/signatory/login");
        }, 3500);
      }

      setdangerMessage(res.data.message);
      setTimeout(() => {
        seterrr(false);
        setdangerMessage("");
      }, 5500);
    } catch (err) { }
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_email: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailMatch: "",
    password: "",
  });

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
  const handleCompanyClick = async () => {
    let formData = {
      code: code,
      company_name: SignatoryData.company_name,
    };
    try {
      const res = await axios.post(apiURL + "joinedCompany", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const respData = res.data;
      setdangerMessage("Signatory account activated successfully");
      setTimeout(() => {
        navigate("/signatory/login");
      }, 2500);
    } catch (err) { }
  };
  //Step 2

  //Step 3

  // Remove a signatory

  return (
    <>
      <div className="login_main_gradient">
        <div className="row h-100">
          <div className="col-md-7 mx-auto h-100 ">
            <div className="container-fluid h-100">
              <div className="d-flex flex-column gap-5 p-md-5 px-3 py-5 h-100">
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex flex-column  align-items-center gap-4 justify-content-center">
                    <Link to="/" className="logo">
                      <img
                        className="w-100 h-100 object-fit-contain"
                        src="/logos/capavate.png"
                        alt="logo"
                      />
                    </Link>
                    <p className="mainp">
                      Already have an account?
                      <Link
                        style={{ color: "var(--primary)" }}
                        to="/signatory/login"
                      >
                        {" "}
                        Sign In
                      </Link>
                    </p>
                  </div>
                  {dangerMessage && (
                    <div
                      className={`flex items-center justify-between gap-3 shadow-lg ${errr ? "error_pop" : "success_pop"
                        }`}
                    >
                      <div className="d-flex align-items-center gap-2">
                        {errr ? (
                          <FaTimesCircle className="text-white text-xl" />
                        ) : (
                          <FaCheckCircle className="text-white text-xl" />
                        )}
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
                </div>
                <SectionWrapper className="d-flex m-auto  scroll_nonw overflow-auto ">
                  <div className="container-fluid">
                    <div className="row justify-content-center">
                      <div className="col-12 m-0 p-0">
                        {SignatoryDataActiveOrNOt !== "already_active" ? (
                          <form
                            action="javascript:void(0)"
                            method="post"
                            onSubmit={handleSubmit}
                          >
                            <Stepblock id="step2">
                              <div className="d-flex flex-column gap-4">
                                <div className="d-flex flex-column gap-1 justify-content-start align-items-start">
                                  <Titletext1>Sign Up</Titletext1>
                                  <p>
                                    Company Name{" "}
                                    <strong>
                                      ({SignatoryData.company_name})
                                    </strong>
                                  </p>
                                </div>
                                <div className="row gy-3">
                                  <div className="col-md-12">
                                    <div className="d-flex flex-column gap-2">
                                      <label htmlFor="">
                                        Name <Sup className="labelsize">*</Sup>
                                      </label>
                                      <Iconblock>
                                        <Building />
                                        <input
                                          disabled
                                          value={
                                            SignatoryData.first_name +
                                            " " +
                                            SignatoryData.last_name
                                          }
                                          onChange={handleChange}
                                          type="text"
                                          placeholder=""
                                          name="name"
                                          required
                                        />
                                      </Iconblock>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="d-flex flex-column gap-2">
                                      <label className="mainp" htmlFor="">
                                        Email <Sup className="labelsize">*</Sup>
                                      </label>
                                      <Iconblock>
                                        <Mail />
                                        <input
                                          disabled
                                          value={SignatoryData.signatory_email}
                                          onChange={handleChange}
                                          type="email"
                                          required
                                          name="email"
                                          placeholder=""
                                        />
                                      </Iconblock>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="d-flex flex-column gap-2">
                                      <label className="mainp" htmlFor="">
                                        Password{" "}
                                        <Sup className="labelsize">*</Sup>
                                      </label>
                                      <div className="iconblock position-relative">
                                        <Iconblock>
                                          <Lock />
                                          <input
                                            value={formData.password}
                                            onChange={handleChange}
                                            type={
                                              showPassword ? "text" : "password"
                                            }
                                            required
                                            name="password"
                                            placeholder=""
                                          />
                                        </Iconblock>
                                        <span
                                          className="eye_icon_btn"
                                          onClick={() =>
                                            setShowPassword(!showPassword)
                                          }
                                        >
                                          {showPassword ? (
                                            <EyeOff size={20} />
                                          ) : (
                                            <Eye size={20} />
                                          )}
                                        </span>
                                      </div>
                                      {formErrors.password && (
                                        <div
                                          style={{ fontSize: "13px" }}
                                          className="text-danger text-start fw-semibold"
                                        >
                                          {formErrors.password}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="col-12">
                                    <div className="d-flex justify-content-between mt-2">
                                      <div className="flex-shrink-0"></div>
                                      <div className="d-flex flex-row flex-shrink-0 gap-2">
                                        <button
                                          type="submit"
                                          className="global_btn w-fit"
                                          data-step="2"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Stepblock>
                          </form>
                        ) : (
                          <div className="joined-companies">
                            {SignatoryData.access_status === "pending" ? (
                              <button
                                type="button"
                                className="global_btn w-fit"
                                onClick={handleCompanyClick}
                              >
                                Join the Company{" "}
                                <b>{SignatoryData.company_name}</b>
                              </button>
                            ) : (
                              <p className="text-danger">
                                You have already joined{" "}
                                {SignatoryData.company_name}.
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SectionWrapper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
