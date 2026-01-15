import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import TopBar from "../../../../components/Users/UserDashboard/TopBar.jsx";
import ModuleSideNav from "../../../../components/Users/UserDashboard/ModuleSideNav.jsx";
import { IoCloseCircleOutline } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../../components/Styles/MainHeadStyles.js";
import { DataRoomSection } from "../../../../components/Styles/DataRoomStyle.js";
import axios from "axios";
import { FaEdit, FaLock, FaTrash, FaEye, FaPenAlt } from "react-icons/fa"; // FontAwesome icons
import AiInvestorReport from "../../../../components/Users/popup/AiInvestorReport.jsx";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "../../../../components/Styles/MainStyle.js";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useNavigate } from "react-router-dom";
import InvestorShareReport from "../../../../components/Users/popup/InvestorShareReport.jsx";
import { FaPencil } from "react-icons/fa6";
import EditCompanyEmail from "../../../../components/Superadmin/EditCompanyEmail.jsx";
// import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight.js";
import stripePromise from "../../../../config/stripe";
export default function UserCompanyList() {
  const navigate = useNavigate();
  const [IsModalOpenShareReport, setIsModalOpenShareReport] = useState(false);
  const [getDataroompay, setgetDataroompay] = useState("");
  const storedUsername = localStorage.getItem("OwnerLoginData");
  const [PayidOnetime, setPayidOnetime] = useState("");
  const userLogin = JSON.parse(storedUsername);
  const [records, setrecords] = useState([]);
  const [IsModalOpenAiResponseSummary, setIsModalOpenAiResponseSummary] =
    useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [payinfo, setpayinfo] = useState(true);
  const [AiUpdatesummaryID, setAiUpdatesummaryID] = useState("");
  const [AISummary, setAISummary] = useState("");
  const [messagesuccessError, setmessagesuccessError] = useState("");
  const [errr, seterrr] = useState(false);
  const [allinvestor, setallinvestor] = useState([]);
  var apiURLAiFile = "http://localhost:5000/api/user/aifile/";
  const apiUrlDashbaord = "http://localhost:5000/api/user/dashboard/";
  const apiUrlCompany = "http://localhost:5000/api/user/company/";
  const [dangerMessage, setdangerMessage] = useState("");
  const [EditEmailPopup, setEditEmailPopup] = useState(false);
  document.title = "All Company List";

  useEffect(() => {
    getUserCompany();
  }, []);

  const getUserCompany = async () => {
    const formData = {
      user_id: userLogin.id,
    };
    try {
      const resp = await axios.post(
        apiUrlCompany + "getUserCompany",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setrecords(resp.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
    //  Optionally, call AI Summary API here
    //generateExecutiveSummary(formData);
  };
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      name: "Company Name",
      selector: (row) => row.company_name,
      sortable: true,
    },
    {
      name: "Total Signatory",
      selector: (row) => row.total_signatories,
      sortable: true,
    },
    {
      name: "Active Rounds",
      selector: (row) => row.total_active_rounds,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <Link
            to="javascript:void(0)"
            onClick={() => handleAccessCompanyLogin(row.id, row.company_name)}
            className="icon_edit icon_btn"
            title="Locked"
          >
            <FaEye /> Access this account
          </Link>
          <Link
            to="javascript:void(0)"
            onClick={() => handleEditEmail(row.id, row.company_email)}
            className="icon_edit icon_btn"
            title="Locked"
          >
            <FaPencil /> Edit Email
          </Link>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "320px",
    },
  ];
  //Access Company Account
  const handleAccessCompanyLogin = async (id, companyname) => {
    const formData = {
      company_id: id,
      user_id: userLogin.id, // example user id
    };
    try {
      const generateRes = await axios.post(
        apiUrlDashbaord + "getCompanyAccess",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const dataresp = generateRes.data;
      setdangerMessage(dataresp.message);

      if (dataresp.status === "1") {
        // 🔹 Remove any old login data
        localStorage.removeItem("SignatoryLoginData");

        // 🔹 Prepare new user data with expiry & token
        const userData = {
          ...dataresp.user,
          access_token: dataresp.token,
          expiry: new Date().getTime() + 60 * 60 * 1000, // 1 hour expiry
        };
        // 🔹 Store to localStorage
        localStorage.setItem("SignatoryLoginData", JSON.stringify(userData));

        // 🔹 Redirect after short delay
        setTimeout(() => {
          window.open("/dashboard", "_blank");
        }, 1500);
      } else {
        seterrr(true);
      }

      // 🔹 Reset error message after delay
      setTimeout(() => {
        seterrr(false);
        setdangerMessage("");
      }, 3500);

      console.log("Response Data:", dataresp);
    } catch (err) {
      console.error("Login Error:", err);
      setdangerMessage("Something went wrong. Please try again.");
      seterrr(true);
      setTimeout(() => {
        seterrr(false);
        setdangerMessage("");
      }, 3500);
    }
  };
  //Access Company Account

  //Edit Email
  const [selectedEmail, setSelectedEmail] = useState("");
  const [CompanyId, setCompanyId] = useState("");
  const handleEditEmail = (id, corp_email) => {
    setCompanyId(id);
    setEditEmailPopup(true);
    setSelectedEmail(corp_email);
  };

  const refreshpageAi = () => {
    setIsModalOpenAiResponseSummary(false);
    getUserCompany();
  };

  const customStyles = {
    table: {
      style: {
        border: "1px solid #dee2e6",
        borderRadius: "12px",
        overflow: "auto",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#efefef",
        fontWeight: "600",
        fontSize: "0.8rem",
        color: "#000",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      },
    },
    cells: {
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    rows: {
      style: {
        fontSize: "0.8rem",
        fontWeight: "500",
      },
      stripedStyle: {
        backgroundColor: "#fff",
      },
    },
    pagination: {
      style: {
        marginTop: "15px",
        backgroundColor: "#fafafa",
        padding: "12px 16px",
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => true, // apply to all rows
      style: {
        "&:hover": {
          backgroundColor: "var(--lightRed)", // apna hover color
        },
      },
    },
  ];

  const [searchText, setSearchText] = useState("");

  // Filter data by nameofreport (case insensitive)
  const filteredData = records.filter((item) => {
    const companyName = item.company_name || "";
    const addressOrWebsite =
      item.company_street_address || item.company_website || "";

    const combinedText = `${companyName} - ${addressOrWebsite}`;
    const search = searchText.toLowerCase();

    return (
      combinedText.includes(search) ||
      addressOrWebsite.toLowerCase().includes(search)
    );
  });

  const handleClosepayPopup = () => {
    setShowPopup(false);
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
  const handleDownload = async (id, filename, url) => {
    window.open(url, "_blank");
  };

  //Payment
  const CheckoutForm = ({ payment }) => {
    const [discount, setdiscount] = useState("");
    const [buttonPay, setbuttonPay] = useState("");
    const [referalCode, setreferalCode] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const [mainamount, setmainamount] = useState(payment);
    const [spinners, setspinners] = useState(false);
    const [message, setMessage] = useState("");
    const [err, seterr] = useState(false);

    setTimeout(() => {
      setMessage("");
    }, 5000);

    const handleRefferalCode = async (e) => {
      const upperValue = e.target.value.toUpperCase();
      if (upperValue.length >= 6) {
        console.log(upperValue);
        setreferalCode(upperValue);
      }
    };

    const handleapplycode = async () => {
      if (referalCode === "") {
        setbuttonPay("Enter the code");
      } else {
        let refercode = {
          code: referalCode,
          type: "Dataroom_Plus_Investor_Report",
          email: userLogin.email,
        };
        try {
          const resp = await axios.post(
            `${apiURLAiFile}checkreferCode`,
            refercode,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          if (resp.data.results.length > 0) {
            var data = resp.data.results[0];
            if (data.usage_limit > data.used_count) {
              setdiscount(data.percentage);
              const discountValue =
                (getDataroompay.onetime_Fee * data.percentage) / 100;
              const final = getDataroompay.onetime_Fee - discountValue;
              //console.log(final, getDataroompay.onetime_Fee);
              setmainamount(final);
              setbuttonPay("");
            } else {
              setdiscount("");
              setmainamount(getDataroompay.onetime_Fee);
              setbuttonPay("This code already used");
            }
          } else {
            setdiscount("");
            setmainamount(getDataroompay.onetime_Fee);
            setbuttonPay("Invalid code!");
          }
        } catch (err) {
        } finally {
        }
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setMessage("Payment form is not ready. Please reload the page.");
        seterr(true);
        return;
      }

      setspinners(true);

      try {
        // Get clientSecret from backend
        const { data } = await axios.post(
          `${apiURLAiFile}CreateuserSubscriptionDataRoomCheck`,
          {
            user_id: userLogin.id,
            amount: getDataroompay.onetime_Fee, // in EUR
          }
        );

        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        if (result.error) {
          setMessage(result.error.message);
          seterr(true);
          setspinners(false);
        } else if (result.paymentIntent.status === "succeeded") {
          const formdata = {
            code: e.target.refferal_code.value,
            user_id: userLogin.id,
            amount: mainamount,
            clientSecret: data.clientSecret,
            PayidOnetime: PayidOnetime,
            discount: discount,
          };
          await paymentsuccess(formdata);
        } else {
          setMessage("Payment failed. Try again.");
          seterr(true);
          setspinners(false);
        }
      } catch (error) {
        setMessage("Unexpected error occurred.");
        seterr(true);
        setspinners(false);
      }
    };

    const paymentsuccess = async (formdata) => {
      try {
        await axios.post(
          `${apiURLAiFile}CreateuserSubscriptionInvestorReporting`,
          formdata,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        setMessage("Payment successful! 🎉");
        seterr(false);
        setTimeout(() => {
          navigate("/add-new-investor");
        }, 2000);
      } catch (err) {
        console.error("Success handler error:", err);
        setMessage("Payment was captured, but post-process failed.");
        seterr(true);
      } finally {
        setspinners(false);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div
          className="form-control rounded-3"
          style={{
            padding: "0.75rem",
            border: "1px solid #000",
            borderColor: "#ced4da",
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  fontFamily:
                    '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  "::placeholder": { color: "#a0aec0" },
                  padding: "0.75rem",
                },
                invalid: {
                  color: "#e5424d",
                },
              },
              classes: {
                base: "stripe-card-element",
                focus: "border-primary",
                invalid: "border-danger",
              },
            }}
          />
        </div>

        <div className="d-flex gap-2 d-md-flex justify-content-md-end mt-4">
          <div className="d-flex flex-column">
            <input
              type="text"
              name="refferal_code"
              onChange={handleRefferalCode}
              autoComplete="off"
              className="form-control w-auto"
              placeholder="Apply Referral Code"
              style={{ textTransform: "uppercase" }}
            />
            {buttonPay && (
              <span
                className="text-danger mt-1"
                style={{ fontSize: "0.875rem" }}
              >
                {buttonPay}
              </span>
            )}
          </div>

          <Button
            type="button"
            onClick={handleapplycode}
            className="submit d-flex align-items-center gap-2"
            style={{ background: "#5C636B", height: "fit-content" }}
          >
            Apply Code
          </Button>
        </div>
        {discount && (
          <div className="d-flex gap-2 d-md-flex justify-content-md-end mt-4">
            <b>Discount:</b> {discount}%
          </div>
        )}

        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <Button
            disabled={!stripe || spinners}
            type="submit"
            className="submit d-flex align-items-center gap-2"
            style={{ background: "#003b21" }}
          >
            {!spinners && <span>Pay €{mainamount}</span>}
            {spinners && (
              <div
                className="spinner-border text-white spinneronetimepay m-0"
                role="status"
              >
                <span className="visually-hidden"></span>
              </div>
            )}
          </Button>
        </div>

        {message && (
          <p className={err ? " mt-3 error_pop" : "success_pop mt-3"}>
            {message}
          </p>
        )}
      </form>
    );
  };
  //Payment

  const handleredirecturl = async () => {
    try {
      const res = await axios.post(
        apiURLAiFile + "checkSubscriptionInvestorReport",
        {
          user_id: userLogin.id,
        }
      );

      const { subscriptionActive, updateAlreadySubmitted, lastUpdateDate } =
        res.data;

      if (!subscriptionActive) {
        setShowPopup(true); // Subscription expired
      } else if (updateAlreadySubmitted) {
        const nextAllowedDate = getNextQuarterDate(new Date(lastUpdateDate));
        const formattedNextDate = formatCurrentDate(
          nextAllowedDate,
          "MMMM do, yyyy"
        ); // e.g., October 1st, 2025

        // setmessagesuccessError(
        //   `Investor update already submitted this quarter. You can upload next update on ${formattedNextDate}.`
        // );
        // seterrr(true);
        // setTimeout(() => {
        //   setmessagesuccessError("");
        //   seterrr(false);
        // }, 3000);
        navigate("/add-new-investor");
      } else {
        navigate("/add-new-investor");
      }
    } catch (err) {
      console.error(err);
      seterrr(true);
      setmessagesuccessError("Something went wrong.");
    }
  };
  function getNextQuarterDate(date) {
    const month = date.getMonth(); // 0-indexed (0 = Jan)
    const year = date.getFullYear();

    let nextQuarterMonth;
    let nextQuarterYear = year;

    if (month < 3) {
      nextQuarterMonth = 3; // April
    } else if (month < 6) {
      nextQuarterMonth = 6; // July
    } else if (month < 9) {
      nextQuarterMonth = 9; // October
    } else {
      nextQuarterMonth = 0; // January next year
      nextQuarterYear += 1;
    }

    return new Date(nextQuarterYear, nextQuarterMonth, 1); // 1st of next quarter
  }
  //Share Report
  const handleshareReport = () => {
    if (selectedRows.length > 0) {
      setIsModalOpenShareReport(true);
    }
  };
  const returnrefresh = () => {
    getUserCompany();
    setSelectedRows([]);
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <>
        <Wrapper>
          <div className="fullpage d-block">
            <div className="d-flex align-items-start gap-0">
              <ModuleSideNav
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
              <div
                className={`global_view ${isCollapsed ? "global_view_col" : ""
                  }`}
              >
                <TopBar />
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
                <SectionWrapper className="d-block p-md-4 p-3">
                  <div className="container-fluid">
                    {messagesuccessError && (
                      <p
                        className={
                          errr ? " mt-3 error_pop" : "success_pop mt-3"
                        }
                      >
                        {messagesuccessError}
                      </p>
                    )}
                    <DataRoomSection className="d-flex flex-column gap-2">
                      <div className="titleroom flex-wrap gap-3 d-flex justify-content-between align-items-center border-bottom pb-3">
                        {/* Heading on the left */}
                        <div className="pb-3 bar_design">
                          <h4 className="h5 mb-0">All Company</h4>
                        </div>
                        {/* Buttons on the right */}
                        <div className="d-flex gap-2">
                          {/* <Button
                            onClick={handleshareReport}
                            type="button"
                            className="btn btn-outline-dark d-flex align-items-center active gap-2"
                            style={{
                              opacity: selectedRows.length === 0 ? 0.5 : 1,
                              pointerEvents:
                                selectedRows.length === 0 ? "none" : "auto",
                            }}
                          >
                            <FaShareAlt style={{ fontSize: "14px" }} />
                            Share Report
                          </Button> */}

                          <Link
                            to="/user/addcompany"
                            className="btn btn-outline-dark active"
                          >
                            Add New Company
                          </Link>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end my-2 p-0">
                        <input
                          type="search"
                          placeholder="Search Here..."
                          className="form-control"
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                          style={{
                            padding: "10px 15px",
                            width: "100%",
                            maxWidth: "300px",
                            fontSize: "14px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="d-flex flex-column overflow-auto justify-content-between align-items-start tb-box">
                        <DataTable
                          customStyles={customStyles}
                          conditionalRowStyles={conditionalRowStyles}
                          columns={columns}
                          className="datatb-report"
                          data={filteredData}
                          pagination
                          highlightOnHover
                          striped
                          responsive
                        />
                      </div>
                    </DataRoomSection>
                  </div>
                </SectionWrapper>
              </div>
            </div>
          </div>
        </Wrapper>
      </>

      {IsModalOpenAiResponseSummary && (
        <AiInvestorReport
          onClose={() => setIsModalOpenAiResponseSummary(false)}
          AiUpdatesummaryID={AiUpdatesummaryID}
          refreshpageAi={refreshpageAi}
          AISummary={AISummary}
        />
      )}
      {IsModalOpenShareReport && (
        <InvestorShareReport
          onClose={() => setIsModalOpenShareReport(false)}
          records={records}
          allinvestor={allinvestor}
          returnrefresh={returnrefresh}
        />
      )}

      {showPopup && (
        <div className="payment_modal-overlay" onClick={handleClosepayPopup}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <h5 className="modal-title">Payment</h5>

                {payinfo && (
                  <div className="price-tag">
                    €{getDataroompay.onetime_Fee}
                    <span className="billing-cycle">/year</span>
                  </div>
                )}
                <p>
                  {" "}
                  <strong>
                    {" "}
                    Investor Reporting + Dataroom Management & Diligence
                  </strong>
                </p>
              </div>
              <button
                type="button"
                className="close_btn_global"
                onClick={handleClosepayPopup}
                aria-label="Close"
              >
                <IoCloseCircleOutline size={24} />
              </button>
            </div>

            {payinfo && (
              <div className="payment-info">
                <div className="benefits-list">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85782 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 4L12 14.01L9 11.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="benefit-text">
                      <strong>Investor Reporting:</strong> Keep investors
                      updated regularly; no more “out of sight, out of mind.”
                      Track engagement and share key documents efficiently.
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85782 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 4L12 14.01L9 11.01"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="benefit-text">
                      <strong>Dataroom Management:</strong> Centralize investor
                      documents, streamline due diligence prep, and receive one
                      free executive summary; additional copies €100 each.
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="payment-methods">
              <div className="accepted-cards">
                <span className="accepted-text">We accept:</span>
                <div className="card-icons">
                  <div className="text-center mb-4">
                    <img
                      src="/assets/user/images/cardimage.jpg"
                      alt="cards"
                      className="img-fluid rounded"
                      style={{ maxWidth: "200px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="stripe-form-container">
                <Elements stripe={stripePromise}>
                  <CheckoutForm payment={getDataroompay.onetime_Fee} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      )}
      {EditEmailPopup && (
        <EditCompanyEmail
          CompanyId={CompanyId}
          currentEmail={selectedEmail}
          onClose={() => setEditEmailPopup(false)}
        />
      )}
    </>
  );
}
