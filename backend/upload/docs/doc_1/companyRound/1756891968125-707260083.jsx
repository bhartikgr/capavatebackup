import React, { useState, useEffect } from "react";

import MainHeaderInvestorRegister from "../../components/Investor/MainHeaderInvestorRegister.js";
import { Mails, User, Phone, Globe, Building2 } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/Styles/InvestorLogin.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../components/Styles/MainHeadStyles.js";
import {
  Stepblock,
  Titletext,
  Iconblock,
  Sup,
} from "../../components/Styles/RegisterStyles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

export default function Provideform() {
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem("InvestorData");
  const userLogin = JSON.parse(storedUsername);
  var apiURLINFile = "https://capavate.com/api/user/investorreport/";
  var apiURL = "https://capavate.com/api/user/";
  document.title = "Investor Page";
  const [successresponse, setsuccessresponse] = useState("");
  const [err, seterr] = useState(false);
  const [allcountry, setallcountry] = useState([]);
  const [InvestorData, setInvestorData] = useState("");
  const code = useParams();
  useEffect(() => {
    checkinvestorCode();

    getallcountry();
  }, []);
  const getallcountry = async () => {
    let formData = {};
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
  const checkinvestorCode = async () => {
    let formData = {
      code: code,
    };
    console.log(formData);
    try {
      const res = await axios.post(
        apiURLINFile + "checkinvestorCode",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res.data.results.length === 0) {
        navigate("/investor/login");
      } else {
        setInvestorData(res.data.results[0]);
      }
    } catch (err) { }
  };
  useEffect(() => {
    getInvestorInfocheck();
  }, []);
  const getInvestorInfocheck = async () => {
    const formData = {
      code: code.code,
    };
    try {
      const res = await axios.post(
        apiURLINFile + "getInvestorInfocheck",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.results.length > 0) {
        navigate("/investor/documentview/");
      }
    } catch (err) {
      console.error("Error generating summary", err);
    }
    //  Optionally, call AI Summary API here
  };
  const countryOptionsFormatted = allcountry.map((country) => ({
    value: country.code,
    label: country.name,
  }));
  const [step2required, setstep2required] = useState(true);
  const [selectedCountryStep2, setselectedCountryStep2] = useState(null);
  const [formData_Step2, setFormData_Step2] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    ciyt: "",
    country: "",
    comments: "",
  });
  const handleStep2getstate = (event) => {
    const countryCode = event.target.value; // Get the selected country code from the event
    const countryName = event.target.options[event.target.selectedIndex].text;
    if (countryName === "Aruba") {
      setstep2required(false);
    }
    setselectedCountryStep2(countryName);
    setFormData_Step2((prev) => ({
      ...prev,
      company_country: event.target.value, // Store the value (e.g., "US")
    }));
  };
  const handlesubmitinfo = async (e) => {
    e.preventDefault();
    let formdata = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      country: e.target.country.value,
      city: e.target.city.value,
      comments: e.target.comments.value,
      code: code,
    };
    try {
      const res = await axios.post(
        apiURLINFile + "investorInformation",
        formdata,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setsuccessresponse(res.data.message);

      if (res.data.status === "2") {
        seterr(true);
      } else {
        if (res.data.status === "1") {
          seterr(false);
          let InvestorData = {
            code: code.code,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            country: e.target.country.value,
            city: e.target.city.value,
            comments: e.target.comments.value,
          };
          localStorage.setItem("InvestorData", JSON.stringify(InvestorData));
        } else {
        }
        setTimeout(() => {
          navigate("/investor/documentview");
        }, 2000);
      }
      setTimeout(() => {
        setsuccessresponse("");
      }, 2000);
    } catch (err) { }
  };

  return (
    <>
      <>
        <Wrapper className="investor-login-wrapper">
          <div className="fullpage d-block w-100">
            {/* {dangerMessage && (
              <div
                className={`alert ${
                  errr ? "alert-danger" : "alert-success"
                } alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3 z-3`}
                role="alert"
              >
                {dangerMessage}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setdangerMessage("")}
                  aria-label="Close"
                ></button>
              </div>
            )} */}

            <SectionWrapper className="d-block login-main-section py-5">
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col-xl-5 col-lg-6 col-md-8">
                    <div className="card login-card shadow-lg border-0 rounded-4">
                      <div className="card-body p-5">
                        <div className="text-start mb-4">
                          <img
                            src="/logos/capavate.png"
                            alt="Capavate Logo"
                            className="login-logo img-fluid mb-4"
                            style={{ maxHeight: "40px" }}
                          />

                          <h2 className="mainh1 mb-2">Provide Information</h2>
                          <p className="mainp">
                            Access your investor dashboard
                          </p>
                        </div>

                        <form
                          action="javascript:void(0)"
                          method="post"
                          onSubmit={handlesubmitinfo}
                        >
                          <Stepblock id="step1">
                            <div className="d-flex flex-column gap-5">
                              <div className="row gy-3">
                                <div className="col-md-6">
                                  <div className="d-flex flex-column gap-2">
                                    <label htmlFor="">
                                      First Name{" "}
                                      <Sup className="labelsize">*</Sup>
                                    </label>
                                    <Iconblock>
                                      <User />
                                      <input
                                        type="text"
                                        name="first_name"
                                        required
                                        placeholder=""
                                      />
                                    </Iconblock>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="d-flex flex-column gap-2">
                                    <label htmlFor="">
                                      City <Sup className="labelsize">*</Sup>
                                    </label>
                                    <Iconblock>
                                      <input
                                        type="text"
                                        name="city"
                                        required
                                        placeholder=""
                                      />
                                    </Iconblock>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="d-flex flex-column gap-2">
                                    <label htmlFor="">
                                      Comments{" "}
                                      <Sup className="labelsize">*</Sup>
                                    </label>
                                    <Iconblock>
                                      <textarea
                                        type="text"
                                        name="comments"
                                        required
                                        placeholder=""
                                      />
                                    </Iconblock>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="d-flex flex-column gap-2">
                                    <label htmlFor="">
                                      Last Name{" "}
                                      <Sup className="labelsize">*</Sup>
                                    </label>
                                    <Iconblock>
                                      <User />
                                      <input
                                        type="text"
                                        name="last_name"
                                        required
                                        placeholder=""
                                      />
                                    </Iconblock>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="d-flex flex-column gap-2">
                                    <label htmlFor="">
                                      Email <Sup className="labelsize">*</Sup>
                                    </label>
                                    <Iconblock>
                                      <Mails />
                                      <input
                                        type="text"
                                        name="email"
                                        required
                                        placeholder=""
                                      />
                                    </Iconblock>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="d-flex flex-column gap-2">
                                    <label htmlFor="">
                                      Phone Number{" "}
                                      <Sup className="labelsize">*</Sup>
                                    </label>
                                    <Iconblock>
                                      <Phone />
                                      <input
                                        type="text"
                                        name="phone"
                                        required
                                        placeholder=""
                                      />
                                    </Iconblock>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="d-flex flex-column gap-2">
                                    <label htmlFor="">
                                      Country <Sup className="labelsize">*</Sup>
                                    </label>
                                    <Iconblock>
                                      <Globe />
                                      <select
                                        required
                                        name="country"
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
                                    </Iconblock>
                                  </div>
                                </div>

                                <div className="col-12">
                                  <div className="d-flex flex-column gap-2">
                                    <label htmlFor="">
                                      City <Sup className="labelsize">*</Sup>
                                    </label>
                                    <Iconblock>
                                      <Building2 />
                                      <input
                                        type="text"
                                        name="city"
                                        required
                                        placeholder=""
                                      />
                                    </Iconblock>
                                  </div>
                                </div>

                                <div className="col-12">
                                  <div className="d-flex justify-content-end mt-4">
                                    <div className="flex-shrink-0">
                                      <button
                                        type="submit"
                                        className="sbtn nextbtn"
                                        data-step="1"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </Wrapper>
      </>
    </>
  );
}
