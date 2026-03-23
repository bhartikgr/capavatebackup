import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import {
  Tophead,
  Slan,
  Stepblock,
  Titletext,
  Iconblock,
  Sup,
  SectionWrapper,
  Wrapper,
} from "../../components/Styles/RegisterStyles";
import { Link } from "react-router-dom";

import { Globe, User, Lock } from "lucide-react";

export default function InvestorLogin() {
  const navigate = useNavigate();

  const [allcountry, setallcountry] = useState([]);
  const [errr, seterrr] = useState(false);
  const companyWebsiteRef = useRef(null);
  document.title = "Investor Login Page";
  const [dangerMessage, setdangerMessage] = useState("");
  const [userdataa, setuserdataa] = useState("");
  const [spinners, setspinners] = useState(false);
  var apiURL = "https://capavate.com/api/user/investorreport/";

  useEffect(() => {
    // Check if the username key exists in session storage
    const storedUsername = localStorage.getItem("InvestorData");
    const userLogin = JSON.parse(storedUsername);

    setuserdataa(userLogin);
    if (userLogin !== null) {
      window.location.href = "/investor/documentview";
    }
  }, [userdataa]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setspinners(true);
    let SaveFormData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const res = await axios.post(apiURL + "investorlogin", SaveFormData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const checkData = res.data;

      if (checkData.status === "2") {
        setspinners(false);
        setFormErrors((prev) => ({
          ...prev,
          emailMatch: checkData.message,
        }));
        seterrr(true);
        setdangerMessage(checkData.message);
        setTimeout(() => {
          setdangerMessage("");
          setFormErrors((prev) => ({
            ...prev,
            emailMatch: "",
          }));
        }, 2500);
      } else {
        setspinners(false);
        setFormErrors((prev) => ({
          ...prev,
          emailMatch: "",
        }));
        let userData = {
          id: checkData.id,
          email: checkData.email,
          first_name: checkData.first_name,
          last_name: checkData.last_name,
        };
        localStorage.setItem("InvestorData", JSON.stringify(userData));
        navigate("/investor/documentview");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
      } else {
      }
    }
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role: "",
    email: "",
    confirm_email: "",
    linked_in: "",
    maimai: "",
    wechat: "",
    boss_zhipin: "",
    phone: "",
    area: "",
  });
  useEffect(() => {
    getallcountry();
    getapidata();
  }, []);
  const getapidata = async () => {
    try {
      const res = await axios.post(apiURL + "getapidata", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (err) { }
  };
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
  const [formErrors, setFormErrors] = useState({
    emailMatch: "",
  });
  const [formData_Step2, setFormData_Step2] = useState({
    city_step2: "",
    country: "",
    company_name: "",
    year_registration: "",
    company_website: "",
    employee_number: "",
    company_linkedin: "",
    company_maimai: "",
    company_wechat: "",
    company_zhipin: "",
    company_mail_address: "",
    company_state: "",
    company_city: "",
    company_postal_code: "",
    company_country: "",
  });
  const [formData_Step3, setFormData_Step3] = useState({});
  const [formData_Step4, setFormData_Step4] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormData_Step2((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormData_Step3((prevData) => ({
      ...prevData,
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

  const countryOptionsFormatted = allcountry.map((country) => ({
    value: country.code,
    label: country.name,
  }));
  const [dangerMessageReset, setdangerMessageReset] = useState("");
  const [resetpassword, setresetpassword] = useState(false);
  const handlemodelresetpassword = () => {
    setresetpassword(true);
  };
  const handleClose = () => {
    setresetpassword(false);
  };
  const handleResetpassword = async (e) => {
    e.preventDefault();
    let formData = {
      email: e.target.email.value,
    };
    try {
      const res = await axios.post(apiURL + "resetPasswordinvestor", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const checkData = res.data;
      if (checkData.status === 1) {
        setdangerMessageReset(
          "Password reset successfully, Please check your email"
        );
      }
      if (checkData.status === 2) {
        seterrr(true);
        setdangerMessageReset("Email not found!");
      }
      setTimeout(() => {
        setdangerMessageReset("");
      }, 2500);
    } catch (err) { }
  };
  return (
    <>
      <Wrapper>
        <div className="fullpage d-block">
          <Tophead>
            <div className="container-fluid">
              <div className="d-flex justify-content-between">
                <a href="/" className="logo">
                  <img src="/logos/logo.png" alt="logo" />
                </a>
                <Slan>
                  {/* <Link to="/investor/register" className="logo text-white">
                    Register
                  </Link> */}
                </Slan>
              </div>
            </div>
          </Tophead>
          {dangerMessage && (
            <p className={errr ? " mt-3 error_pop" : "success_pop mt-3"}>
              {dangerMessage}
            </p>
          )}
          <SectionWrapper className="d-block py-5">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-10">
                  <form
                    action="javascript:void(0)"
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    <Stepblock id="step1">
                      <div className="d-flex flex-column gap-5">
                        <Titletext>Login</Titletext>
                        <div className="row gy-3">
                          <div className="col-md-12">
                            <div className="d-flex flex-column gap-2">
                              <label htmlFor="">
                                Email <Sup>*</Sup>
                              </label>
                              <Iconblock>
                                <User />
                                <input
                                  value={formData.email}
                                  onChange={handleChange}
                                  type="email"
                                  name="email"
                                  required
                                  placeholder=""
                                />
                              </Iconblock>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="d-flex flex-column gap-2">
                              <label htmlFor="">
                                Password <Sup>*</Sup>
                              </label>
                              <Iconblock>
                                <Lock />
                                <input
                                  className="passworduser"
                                  value={formData.password}
                                  onChange={handleChange}
                                  type="password"
                                  name="password"
                                  required
                                  placeholder=""
                                />
                              </Iconblock>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="d-flex justify-content-end mt-4">
                              <div className="flex-shrink-0 gap-4">
                                <button
                                  disabled={spinners}
                                  type="submit"
                                  className="sbtn nextbtn"
                                  data-step="1"
                                >
                                  Login
                                </button>
                                {spinners && (
                                  <div
                                    className="spinner-border text-white spinneronetimepay m-0"
                                    role="status"
                                  >
                                    <span className="visually-hidden"></span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="d-flex justify-content-end mt-4">
                              <div className="flex-shrink-0 gap-4">
                                <Link
                                  to="javascript:void(0)"
                                  onClick={handlemodelresetpassword}
                                >
                                  Forgot Password?
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Stepblock>
                  </form>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </Wrapper>
      {resetpassword && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="resetPasswordModalLabel"
          aria-hidden="false"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            style={{ maxWidth: "500px" }}
          >
            <div className="modal-content rounded-4 shadow-lg p-4 position-relative">
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-3"
                onClick={handleClose}
                aria-label="Close"
              ></button>

              <h5 className="modal-title mb-4" id="resetPasswordModalLabel">
                Reset Your Password
              </h5>

              {dangerMessageReset && (
                <p className={errr ? " mt-3 error_pop" : "success_pop mt-3"}>
                  {dangerMessageReset}
                </p>
              )}
              <form
                method="post"
                action="javascript:void(0)"
                onSubmit={handleResetpassword}
              >
                <div className="mb-3">
                  <label htmlFor="">
                    Email <Sup className="text-danger">*</Sup>
                  </label>
                  <Iconblock>
                    <User />
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      required
                      placeholder=""
                    />
                  </Iconblock>
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <div className="flex-shrink-0 gap-4">
                    <button
                      type="submit"
                      className="forgotpassbtn"
                      data-step="1"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
