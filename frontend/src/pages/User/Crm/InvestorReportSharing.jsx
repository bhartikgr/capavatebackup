import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import TopBar from "../../../components/Users/TopBar";
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import { IoCloseCircleOutline } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";

import { DataRoomSection } from "../../../components/Styles/DataRoomStyle.js";
import axios from "axios";
import { FaDownload, FaEye } from "react-icons/fa"; // FontAwesome icons
import AiInvestorReport from "../../../components/Users/popup/AiInvestorReport.jsx";

import { Button } from "../../../components/Styles/MainStyle.js";
import { useNavigate, Link } from "react-router-dom";
import InvestorShareReport from "../../../components/Users/popup/InvestorShareReport.jsx";
// import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight.js";
import { API_BASE_URL } from "../../../config/config.js";
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
  const [authorizedData, setAuthorizedData] = useState(null);
  var apiURLInvestor = API_BASE_URL + "api/user/investor/";
  const apiURLSignature = API_BASE_URL + "api/user/";
  document.title = "Investor Report Sharing";
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
    getreports();
  }, []);

  const getreports = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "getInvestorlistCrm",
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
  };
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        const isApproved =
          userLogin.role === "owner" || authorizedData?.approve === "Yes";

        return (
          <div className="d-flex gap-2">
            <Link
              to={
                isApproved
                  ? `/crm/investor-report-detail/${row.investor_id}`
                  : "#"
              }
              rel="noopener noreferrer"
              className={`btn btn-sm btn-outline-success fw-bold ${!isApproved ? "disabled" : ""
                }`}
              title={isApproved ? "View" : "Not Approved"}
              onClick={(e) => !isApproved && e.preventDefault()}
            >
              <FaEye /> View
            </Link>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

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
    const text = (searchText || "").toLowerCase();
    return (
      (item.first_name || "").toLowerCase().includes(text) ||
      (item.last_name || "").toLowerCase().includes(text) ||
      (item.phone || "").toLowerCase().includes(text) ||
      (item.email || "").toLowerCase().includes(text)
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

  //Share Report

  const returnrefresh = () => {
    getreports();
    setSelectedRows([]);
  };
  //Due diligence Record
  const [recordsdue, setrecordsdue] = useState([]);
  const [searchTextdue, setSearchTextdue] = useState("");
  useEffect(() => {
    getreportsDue();
  }, []);

  const getreportsDue = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "getInvestorlistCrmDuediligenceupdate",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setrecordsdue(generateRes.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
    //  Optionally, call AI Summary API here
    //generateExecutiveSummary(formData);
  };
  const columnsdue = [
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: "Mobile",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        const isApproved =
          userLogin.role === "Owner" || authorizedData?.approve === "Yes";

        return (
          <div className="d-flex gap-2">
            <Link
              to={
                isApproved
                  ? `/crm/investor-report-detail-due-diligence/${row.investor_id}`
                  : "#"
              }
              rel="noopener noreferrer"
              className={`btn btn-sm btn-outline-success fw-bold ${!isApproved ? "disabled" : ""
                }`}
              title={isApproved ? "View" : "Not Approved"}
              onClick={(e) => !isApproved && e.preventDefault()}
            >
              <FaEye /> View
            </Link>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const filteredDatadue = recordsdue.filter((item) => {
    const text = (searchTextdue || "").toLowerCase();
    return (
      (item.first_name || "").toLowerCase().includes(text) ||
      (item.last_name || "").toLowerCase().includes(text) ||
      (item.phone || "").toLowerCase().includes(text) ||
      (item.email || "").toLowerCase().includes(text)
    );
  });

  //Capital
  useEffect(() => {
    getreportsCapitalRound();
  }, []);
  const [searchTextcapital, setSearchTextcapital] = useState("");
  const [recordscapital, setrecordscapital] = useState([]);
  const getreportsCapitalRound = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "getreportsCapitalRound",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setrecordscapital(generateRes.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
    //  Optionally, call AI Summary API here
    //generateExecutiveSummary(formData);
  };

  const filteredDatacapital = recordscapital.filter((item) => {
    const text = (searchTextcapital || "").toLowerCase();
    return (
      (item.first_name || "").toLowerCase().includes(text) ||
      (item.last_name || "").toLowerCase().includes(text) ||
      (item.phone || "").toLowerCase().includes(text) ||
      (item.email || "").toLowerCase().includes(text)
    );
  });
  const columnscapital = [
    {
      name: "First Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.phone,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => {
        const isApproved =
          userLogin.role === "owner" || authorizedData?.approve === "Yes";

        return (
          <div className="d-flex gap-2">
            <Link
              to={
                isApproved
                  ? `/crm/investor-report-detail-record-round/${row.investor_id}`
                  : "#"
              }
              rel="noopener noreferrer"
              className={`btn btn-sm btn-outline-success fw-bold ${!isApproved ? "disabled" : ""
                }`}
              title={isApproved ? "View Rounds Details" : "Not Approved"}
              onClick={(e) => !isApproved && e.preventDefault()}
            >
              <FaEye /> View Rounds Details
            </Link>

            {/* Uncomment if needed */}
            {/* <Link
          to={
            isApproved
              ? `/crm/investor-record-round-reports-confirm/${row.investor_id}`
              : "#"
          }
          rel="noopener noreferrer"
          className={`btn btn-sm btn-outline-success fw-bold ${
            !isApproved ? "disabled" : ""
          }`}
          title={isApproved ? "Confirm Report" : "Not Approved"}
          onClick={(e) => !isApproved && e.preventDefault()}
        >
          Confirm Report
        </Link> */}
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "280px",
    },
  ];
  const [isCollapsed, setIsCollapsed] = useState(false);
  //Capital Round
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
                      {/* <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                       
                        <h4>Investor Report</h4>
                      </div> */}

                      <div className="d-flex justify-content-between my-2 p-0">
                        <div className="pb-3 bar_design">
                          <h4 className="h5 mb-0">Investor Report</h4>
                        </div>
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
                      <div className="d-flex  flex-column justify-content-between align-items-start tb-box">
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
                    <DataRoomSection className="d-flex flex-column gap-2">
                      {/* <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                       
                        <h4>Investor Report</h4>
                      </div> */}
                      <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3"></div>
                      <div className="d-flex justify-content-between my-2 p-0">
                        <div className="pb-3 bar_design">
                          <h4 className="h5 mb-0">
                            DataRoom Management Documents
                          </h4>
                        </div>
                        <input
                          type="search"
                          placeholder="Search Here..."
                          className="form-control"
                          value={searchTextdue}
                          onChange={(e) => setSearchTextdue(e.target.value)}
                          style={{
                            padding: "10px 15px",
                            width: "100%",
                            maxWidth: "300px",
                            fontSize: "14px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-between align-items-start tb-box">
                        <DataTable
                          customStyles={customStyles}
                          conditionalRowStyles={conditionalRowStyles}
                          columns={columnsdue}
                          className="datatb-report"
                          data={filteredDatadue}
                          pagination
                          highlightOnHover
                          striped
                          responsive
                        />
                      </div>
                    </DataRoomSection>
                    <DataRoomSection className="d-flex flex-column gap-2">
                      {/* <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                       
                        <h4>Investor Report</h4>
                      </div> */}
                      <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3"></div>
                      <div className="d-flex justify-content-between my-2 p-0">
                        <div className="pb-3 bar_design">
                          <h4 className="h5 mb-0">Capital Round Documents</h4>
                        </div>
                        <input
                          type="search"
                          placeholder="Search Here..."
                          className="form-control"
                          value={searchTextcapital}
                          onChange={(e) => setSearchTextcapital(e.target.value)}
                          style={{
                            padding: "10px 15px",
                            width: "100%",
                            maxWidth: "300px",
                            fontSize: "14px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-between align-items-start tb-box">
                        <DataTable
                          customStyles={customStyles}
                          conditionalRowStyles={conditionalRowStyles}
                          columns={columnscapital}
                          className="datatb-report"
                          data={filteredDatacapital}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
