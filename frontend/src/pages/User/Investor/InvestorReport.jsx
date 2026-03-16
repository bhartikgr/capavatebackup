import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import TopBar from '../../../components/social/TopBar';
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import { IoCloseCircleOutline } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import { DataRoomSection } from "../../../components/Styles/DataRoomStyle.js";
import axios from "axios";
import {
  FaEdit,
  FaDownload,
  FaLock,
  FaCheck,
  FaUnlock,
  FaShareAlt,
} from "react-icons/fa"; // FontAwesome icons
import AiInvestorReport from "../../../components/Users/popup/AiInvestorReport.jsx";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "../../../components/Styles/MainStyle.js";
import { useNavigate } from "react-router-dom";
import InvestorShareReport from "../../../components/Users/popup/InvestorShareReport.jsx";
import AirwallexPaymentPopupOneTimeDataroom from "../../../components/Users/AirwallexPaymentPopupOneTimeDataroom.jsx";
import { API_BASE_URL } from "../../../config/config.js";
import SideBar from '../../../components/social/SideBar';
export default function InvestorReport() {
  const navigate = useNavigate();
  const [IsModalOpenShareReport, setIsModalOpenShareReport] = useState(false);
  const [getDataroompay, setgetDataroompay] = useState("");
  const storedUsername = localStorage.getItem("SignatoryLoginData");
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
  var apiURLAiFile = API_BASE_URL + "api/user/aifile/";
  const apiUrlModule = API_BASE_URL + "api/admin/module/";
  var apiURLInvestor = API_BASE_URL + "api/user/investor/";
  const apiURLSignature = API_BASE_URL + "api/user/";
  const [authorizedData, setAuthorizedData] = useState(null);
  document.title = "Investor Report List";
  useEffect(() => {
    getAuthorizedSignature();
  }, []);
  const getAuthorizedSignature = async () => {
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
        setAuthorizedData(checkData[0]);
      }
    } catch (err) { }
  };
  useEffect(() => {
    getDataroompayment();
  }, []);
  useEffect(() => {
    getCompanyInvestor();
  }, []);
  const getCompanyInvestor = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "getInvestorlist",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setallinvestor(generateRes.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
    //  Optionally, call AI Summary API here
  };
  const getDataroompayment = async () => {
    let formData = {
      user_id: "",
    };
    try {
      const res = await axios.post(
        apiUrlModule + "getDataroompayment",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
        }
      );
      var respo = res.data.row;
      if (respo.length > 0) {
        setgetDataroompay(respo[0]);
        //setmainamount(respo[0].onetime_Fee);
      }
    } catch (err) {
      // Enhanced error handling
      if (err.response) {
      } else if (err.request) {
        console.error("Request data:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
    }
  };
  useEffect(() => {
    getreports();
  }, []);

  const getreports = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
    };
    try {
      const generateRes = await axios.post(
        apiURLAiFile + "getinvestorReports",
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
  const [selectedRows, setSelectedRows] = useState([]);

  // Toggle a row

  // Select/Deselect all

  const columns = [
    {
      name: "Report",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Date of Report",
      selector: (row) => formatCurrentDate(row.update_date),
      sortable: true,
    },
    {
      name: "Name of report",
      selector: (row) => row.document_name,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        const isApproved =
          userLogin.role === "owner" || authorizedData?.approve === "Yes";

        const handleRedirect = () => {
          if (!authorizedData && userLogin.role !== "owner") {
            navigate("/authorized-signature"); // No signature → redirect only if not owner
          }
        };

        return (
          <div className="d-flex gap-2">
            {!authorizedData && userLogin.role !== "owner" ? (
              <button
                className="icon_btn red_clr"
                onClick={handleRedirect}
                title="You must submit a signature first"
              >
                Submit Signature
              </button>
            ) : !isApproved ? (
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontWeight: "600",
                  color: "#b91c1c",
                  backgroundColor: "#fee2e2",
                  fontSize: "12px",
                  display: "inline-block",
                }}
              >
                Pending Approval
              </span>
            ) : row.is_shared === "Yes" ? (
              <button
                className="icon_btn red_clr"
                type="button"
                disabled
                title="Locked"
              >
                <FaLock /> Locked
              </button>
            ) : row.is_locked === 1 && row.is_shared === "No" ? (
              <>
                {/* <button
                  className="icon_btn red_clr"
                  type="button"
                  onClick={() => handleLockUnlock(row.id)}
                  title="Unlock"
                >
                  <FaUnlock /> Unlock
                </button> */}
                <button
                  onClick={() => handleEdit(row.id)}
                  className="icon_edit icon_btn"
                  title="Edit AI Summary"
                >
                  <FaEdit /> Edit
                </button>
              </>
            ) : (
              <>
                {row.type === "Investor updates" && (
                  <button
                    onClick={() => handleEdit(row.id)}
                    className="icon_edit icon_btn"
                    title="Edit AI Summary"
                  >
                    <FaEdit /> Edit
                  </button>
                )}
              </>
            )}

            {/* Download button visible if approved OR owner */}
            {isApproved && (
              <button
                type="button"
                onClick={() =>
                  handleDownload(
                    row.user_id,
                    row.document_name,
                    row.downloadUrl
                  )
                }
                className="icon_btn green_clr"
              >
                <FaDownload /> Download
              </button>
            )}
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "300px",
    },
  ];

  const handleLockUnlock = async (id) => {
    const formData = {
      company_id: userLogin.companies[0].id,
      id: id,
    };
    try {
      const generateRes = await axios.post(
        apiURLAiFile + "filelockunlock",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const resp = generateRes.data.message;
      getreports();
      setmessagesuccessError(resp);
      setTimeout(() => {
        setmessagesuccessError("");
      }, 2000);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  const handleEdit = async (id) => {
    const formData = {
      company_id: userLogin.companies[0].id,
      id: id,
    };
    try {
      const generateRes = await axios.post(
        apiURLAiFile + "getinvestorReportsSingle",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (generateRes.data.results.length > 0) {
        setIsModalOpenAiResponseSummary(true);
        setAISummary(generateRes.data.results[0].executive_summary);
        setAiUpdatesummaryID(id);
      }
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  const refreshpageAi = () => {
    setIsModalOpenAiResponseSummary(false);
    getreports();
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
    const name = `${item.company_name || ""} - ${item.update_date || ""} - ${item.version || ""
      }`;
    return (
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.update_date || "")
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      (item.download || "").toLowerCase().includes(searchText.toLowerCase())
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
    const [ClientIP, setClientIP] = useState("");
    const storedUsername = localStorage.getItem("SignatoryLoginData");

    const userLogin = JSON.parse(storedUsername);
    setTimeout(() => {
      setMessage("");
    }, 5000);
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
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setMessage("Payment form is not ready. Please reload the page.");
        seterr(true);
        return;
      }
      // 🔹 Validate Card Element fields
      const { error: cardError } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (cardError) {
        setMessage(cardError.message || "Invalid card details.");
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

        // Handle free subscription
        if (!data.clientSecret) {
          setMessage(
            data.message || "Free subscription applied, no payment required"
          );
          seterr(false);
          setspinners(false);

          const formdata = {
            code: referalCode,
            company_id: userLogin.companies[0].id,
            created_by_id: userLogin.id,
            amount: mainamount,
            clientSecret: null,
            PayidOnetime: PayidOnetime,
            payment_status: "free",
            discount: data.percentage,
            ip_address: ClientIP,
          };

          await paymentsuccess(formdata);
          return; // skip Stripe call
        }

        // Paid subscription flow
        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

        console.log(result);

        if (result.error) {
          setMessage(result.error.message);
          seterr(true);
          setspinners(false);
        } else if (result.paymentIntent.status === "succeeded") {
          const formdata = {
            code: referalCode,
            company_id: userLogin.companies[0].id,
            created_by_id: userLogin.id,
            amount: mainamount,
            clientSecret: data.clientSecret,
            PayidOnetime: PayidOnetime,
            payment_status: result.paymentIntent.status,
            discount: data.percentage,
            ip_address: ClientIP,
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
    const handleRefferalCode = async (e) => {
      const upperValue = e.target.value.toUpperCase();

      setreferalCode(upperValue);
    };
    const handleapplycode = async () => {
      if (referalCode === "") {
        setbuttonPay("Enter the code");
      } else {
        let refercode = {
          code: referalCode,
          type: "Dataroom_Plus_Investor_Report",
          company_id: userLogin.companies[0].id,
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
    const paymentsuccess = async (formdata) => {
      try {
        await axios.post(
          `${apiURLAiFile}CreateuserSubscriptionDataRoom`,
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
              placeholder="Apply Coupon Code"
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
          <div
            className={`flex items-center justify-between gap-3 shadow-lg ${err ? "error_pop" : "success_pop"
              }`}
          >
            <div className="d-flex align-items-start gap-2">
              <span className="d-block">{message}</span>
            </div>

            <button
              type="button"
              className="close_btnCros"
              onClick={() => setMessage("")}
            >
              ×
            </button>
          </div>
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
          company_id: userLogin.companies[0].id,
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
    getreports();
    setSelectedRows([]);
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <>
        <main>
          <div className='d-flex align-items-start gap-0'>
            <SideBar />
            <div className='d-flex flex-grow-1 flex-column gap-0'>
              <TopBar />
              <section className='px-md-3 py-4'>
                <div className='container-fluid'>
                  <div className='row gy-4'>
                    <div className='col-md-12 order-1 order-md-0'>
                      <SectionWrapper className="d-block p-md-4 p-3">
                        <div className="container-fluid">
                          {messagesuccessError && (
                            <div
                              className={`flex items-center justify-between gap-3 shadow-lg ${errr ? "error_pop" : "success_pop"
                                }`}
                            >
                              <div className="d-flex align-items-start gap-2">
                                <span className="d-block">{messagesuccessError}</span>
                              </div>

                              <button
                                type="button"
                                className="close_btnCros"
                                onClick={() => setmessagesuccessError("")}
                              >
                                ×
                              </button>
                            </div>
                          )}
                          <DataRoomSection className="d-flex flex-column gap-2">
                            <div className="titleroom flex-wrap gap-3 d-flex justify-content-between align-items-center border-bottom pb-3">
                              {/* Heading on the left */}
                              <div className="pb-3 bar_design">
                                <h4 className="h5 mb-0">Investor Update Reports</h4>
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

                                <Button
                                  type="button"
                                  onClick={handleredirecturl}
                                  className="generatebutton px-4 py-2 fn_size_sm btn btn-outline-dark active d-flex align-items-center gap-2"
                                  disabled={
                                    userLogin.role !== "owner" &&
                                    authorizedData?.approve !== "Yes"
                                  } // ✅ Owner bypasses disabled condition
                                  style={{
                                    cursor:
                                      userLogin.role === "owner" ||
                                        authorizedData?.approve === "Yes"
                                        ? "pointer"
                                        : "not-allowed",
                                    opacity:
                                      userLogin.role === "owner" ||
                                        authorizedData?.approve === "Yes"
                                        ? 1
                                        : 0.6,
                                  }}
                                >
                                  Add New Report
                                </Button>
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
              </section>
            </div>
          </div>
        </main>
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
        <AirwallexPaymentPopupOneTimeDataroom
          show={showPopup}
          onClose={() => setShowPopup(false)}
          payment={getDataroompay.onetime_Fee}
          referstatus={true}
        />
      )}
      {/* {showPopup && (
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
                      <strong>Dataroom Management:</strong> Centralize key
                      investor documents and streamline your due diligence prep.
                      Receive one free executive summary to share with
                      investors; additional copies cost €
                      {getDataroompay.perInstance_Fee} each.
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
                      <strong>Cap Table Management:</strong> Know who owns what
                      in your company.
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
                      <strong>Investor Reporting:</strong> Ensure that you
                      connect with your investors with updates. No more “out of
                      sight, out of mind!”
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
      )} */}
    </>
  );
}
