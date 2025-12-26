import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import TopBar from "../../../components/Users/TopBar";
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import {
  ModalContainer1,
  ModalTitle,
  DropArea,
  ModalBtn,
  ButtonGroup,
} from "../../../components/Styles/DataRoomStyle.js";
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from "axios";
import { FaDownload, FaEye } from "react-icons/fa"; // FontAwesome icons
import ViewInvestorEndRecordRound from "../../../components/Users/popup/ViewInvestorEndRecordRound";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config.js";
export default function InvestorReportViewRecordRound() {
  const navigate = useNavigate();

  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const [ViewRecordRounds, setViewRecordRounds] = useState(false);
  const userLogin = JSON.parse(storedUsername);
  const [records, setrecords] = useState([]);
  const [errr, seterrr] = useState(false);
  const [recordViewData, setrecordViewData] = useState("");
  const [InvestorInfo, setInvestorInfo] = useState("");
  const [messagesuccessError, setmessagesuccessError] = useState("");
  const [InvestorAllRoundRecordData, setInvestorAllRoundRecordData] =
    useState(null);
  var apiURLInvestor = API_BASE_URL + "api/user/investor/";
  document.title = "Shared Investor Report";
  const { id } = useParams();
  useEffect(() => {
    checkInvestor();
    getInvestorReportCapitalRound();
  }, []);

  const checkInvestor = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
      id: id,
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "checkInvestorRecordround",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (generateRes.data.results.length === 0) {
        navigate("/crm/investorreport");
      } else {
        setInvestorInfo(generateRes.data.results[0]);
      }
      // setrecords(generateRes.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };

  const getInvestorReportCapitalRound = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
      investor_id: id,
    };
    try {
      const resp = await axios.post(
        apiURLInvestor + "getInvestorReportCapitalRound",
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
  };

  const columns = [
    {
      name: "Share Class (Name of Round)",
      selector: (row) => row.shareClassType + " " + row.nameOfRound,
      sortable: true,
    },
    {
      name: "Target Rasie Amount",
      selector: (row) => Number(row.roundsize).toLocaleString("en-US"),
      sortable: true,
    },

    {
      name: "Numbers Of Shares",
      selector: (row) => Number(row.issuedshares).toLocaleString("en-US"),
      sortable: true,
    },
    {
      name: "Date of Report",
      selector: (row) => formatCurrentDate(row.created_at),
      sortable: true,
    },
    {
      name: "Date Viewed",
      selector: (row) =>
        row.date_view ? formatCurrentDate(row.date_view) : "N/A",
      sortable: true,
    },
    {
      name: "Status of Round",
      selector: (row) => row.dateroundclosed,
      sortable: true,
      cell: (row) => {
        const isActive = row.roundStatus === "ACTIVE";
        const displayText = isActive
          ? "ACTIVE"
          : `CLOSED: ${formatCurrentDate(row.dateroundclosed)}`;

        return (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "12px",
              fontWeight: "600",
              color: isActive ? "#065f46" : "#b91c1c", // green or red text
              backgroundColor: isActive ? "#d1fae5" : "#fee2e2", // green or red bg
              fontSize: "12px",
              display: "inline-block",
            }}
          >
            {displayText}
          </span>
        );
      },
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            type="button"
            onClick={() => handleviewData(row)}
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-success fw-bold"
            title="View Detail"
          >
            <FaEye /> view
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const handleviewData = (dataa) => {
    setViewRecordRounds(true);
    setrecordViewData(dataa);
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
        overflow: "auto",
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
    const search = searchText.toLowerCase();

    // Combine all searchable fields into one string
    const combinedFields = `
    ${item.nameOfRound || ""}
    ${item.shareClassType || ""}
     ${item.roundsize || ""}
    ${item.issuedshares || ""}
    ${item.description || ""}
    ${item.instrumentType || ""}
    ${item.customInstrument || ""}
    ${item.roundsize || ""}
    ${item.issuedshares || ""}
    ${item.liquidationpreferences || ""}
  `.toLowerCase();

    return combinedFields.includes(search);
  });

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
  const handleDownload = async (url) => {
    window.open(url, "_blank");
  };

  //Share Report

  //Due diligence Record
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  let files = [];

  // Ensure we have an array
  if (InvestorInfo.kyc_document) {
    if (Array.isArray(InvestorInfo.kyc_document)) {
      try {
        // Try parsing first element if it looks like JSON
        files = JSON.parse(InvestorInfo.kyc_document[0]);
      } catch (e) {
        // fallback: it's already an array of strings
        files = InvestorInfo.kyc_document;
      }
    } else {
      // single string case
      try {
        files = JSON.parse(InvestorInfo.kyc_document);
      } catch (e) {
        files = [InvestorInfo.kyc_document];
      }
    }
  }

  const isImage = (file) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(file);
  };
  //Record get
  useEffect(() => {
    getInvestorAllRoundRecord();
  }, []);

  const getInvestorAllRoundRecord = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
      investor_id: id,
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "getInvestorAllRoundRecord",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(generateRes.data);
      setInvestorAllRoundRecordData(generateRes.data);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  //Record get
  const baseUrl =
    API_BASE_URL + "api/upload/investor/inv_" + InvestorInfo.investor_id;
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
                        className={errr ? "mt-3 error_pop" : "success_pop mt-3"}
                      >
                        {messagesuccessError}
                      </p>
                    )}

                    {/* --- REPORT SUMMARY CARDS --- */}
                    <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                      <h3 className="text-lg font-bold mb-2">
                        Investor Report (Capital Round Documents)
                      </h3>
                    </div>
                    <div className="">
                      <div className="row g-3">
                        {/* Card 1 */}
                        <div className="col-md-12 col-sm-12">
                          <div
                            className="card shadow-sm border-0 py-4"
                            style={{ borderRadius: "10px" }}
                          >
                            <p className="mb-3">
                              <strong className="mainh2">
                                Investor Information :
                              </strong>{" "}
                              <span className="mainp" style={{ color: "red" }}>
                                {InvestorInfo.first_name}{" "}
                                {InvestorInfo.last_name}
                              </span>{" "}
                            </p>

                            <table className="global_table mb-0">
                              <tbody>
                                <tr>
                                  <td>
                                    <strong>Register Company Name : </strong>{" "}
                                    <span>{InvestorInfo.company_name}</span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>Type of Investor : </strong>{" "}
                                    <span>{InvestorInfo.type_of_investor}</span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>Contact (EMAIL) : </strong>{" "}
                                    <span>{InvestorInfo.email}</span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>Contact (MOBILE) : </strong>{" "}
                                    <span>{InvestorInfo.phone}</span>
                                  </td>
                                  <td></td>
                                </tr>

                                <tr>
                                  <td>
                                    <strong>City : </strong>
                                    <span>{InvestorInfo.city}</span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>Country : </strong>{" "}
                                    <span>{InvestorInfo.country}</span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>Ip Address : </strong>{" "}
                                    <span>{InvestorInfo.ip_address}</span>
                                  </td>
                                  <td></td>
                                </tr>

                                <tr>
                                  <td>
                                    <strong>
                                      LinkedIn or Professional Profile:
                                    </strong>{" "}
                                    <span>{InvestorInfo.linkedIn_profile}</span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>
                                      Contact (Full Mailing Address) :{" "}
                                    </strong>{" "}
                                    <span>{InvestorInfo.full_address}</span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>Country of Tax Residency : </strong>{" "}
                                    <span>{InvestorInfo.country_tax}</span>
                                  </td>
                                  <td></td>
                                </tr>

                                <tr>
                                  <td>
                                    <strong>Tax ID or National ID : </strong>{" "}
                                    <span>{InvestorInfo.tax_id}</span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td className="d-flex align-items-center gap-2 w-100">
                                    <strong>KYC/AML Documentation : </strong>{" "}
                                    <span>
                                      {InvestorInfo.kyc_document &&
                                        InvestorInfo.kyc_document.length >
                                        0 && (
                                          <div className="">
                                            <button
                                              type="button"
                                              className="btn btn-sm btn-outline-success fw-bold"
                                              onClick={handleOpen}
                                            >
                                              <FaEye></FaEye> View Document
                                            </button>
                                          </div>
                                        )}
                                    </span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>Accredited Status : </strong>{" "}
                                    <span>
                                      {InvestorInfo.accredited_status}
                                    </span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>
                                      LinkedIn or Professional Profile :{" "}
                                    </strong>{" "}
                                    <span>{InvestorInfo.linkedIn_profile}</span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>Industry Expertise : </strong>{" "}
                                    <span>
                                      {InvestorInfo.industry_expertise}
                                    </span>
                                  </td>
                                  <td></td>
                                </tr>

                                <tr>
                                  <td>
                                    <strong>Notes:</strong>
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                            <hr />
                            <table className="global_table mb-0">
                              <tbody>
                                <tr>
                                  <td>
                                    <strong>
                                      TOTAL capital invested in ALL rounds :{" "}
                                    </strong>{" "}
                                    <span>
                                      {InvestorAllRoundRecordData?.currency ||
                                        ""}
                                      {InvestorAllRoundRecordData?.total_invested ||
                                        0}
                                    </span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>
                                      % Ownership of Company (fully diluted) :
                                    </strong>{" "}
                                    <span>
                                      {
                                        InvestorAllRoundRecordData?.ownership_percent
                                      }
                                      %
                                    </span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>
                                      Rank in size of overall investment :{" "}
                                    </strong>{" "}
                                    <span>
                                      {InvestorAllRoundRecordData?.rank}
                                    </span>
                                  </td>
                                  <td></td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>
                                      Min / Max investment amounts :{" "}
                                    </strong>{" "}
                                    <span>
                                      {" "}
                                      {
                                        InvestorAllRoundRecordData?.min_investment
                                      }
                                      {"/"}{" "}
                                      {
                                        InvestorAllRoundRecordData?.max_investment
                                      }
                                    </span>
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --- SEARCH & DATA TABLE --- */}
                    <div className="d-flex justify-content-between my-2 py-3">
                      <h4>Participating Investment Rounds</h4>
                    </div>
                    <div className="d-flex flex-column justify-content-between align-items-start tb-box">
                      <table className="innertable-design">
                        <thead>
                          <tr>
                            <th>Share class (Name of Round)</th>
                            <th>Target Raise Amount</th>
                            <th>Numbers Of Shares</th>
                            <th>Date of Report</th>
                            <th>Date Viewed</th>
                            <th>Status of Round</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {records.length > 0 ? (
                            records.map((record, index) => (
                              <React.Fragment key={index}>
                                {/* Main round row */}
                                <tr>
                                  <td>
                                    {record.shareClassType || "Founder share"}{" "}
                                    {record.nameOfRound}
                                  </td>
                                  <td>
                                    {record.currency}
                                    {Number(record.roundsize).toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                  </td>
                                  <td>
                                    {Number(record.issuedshares).toLocaleString("en-US", {
                                      minimumFractionDigits: 3,
                                      maximumFractionDigits: 3
                                    })}
                                  </td>

                                  <td>
                                    {formatCurrentDate(record.created_at)}
                                  </td>
                                  <td>
                                    {record.date_view
                                      ? formatCurrentDate(record.date_view)
                                      : "N/A"}
                                  </td>
                                  <td>
                                    {(() => {
                                      const isActive =
                                        record.roundStatus === "ACTIVE";
                                      const displayText = isActive
                                        ? "ACTIVE"
                                        : `CLOSED: ${formatCurrentDate(
                                          record.dateroundclosed
                                        )}`;
                                      return (
                                        <span
                                          style={{
                                            padding: "4px 12px",
                                            borderRadius: "12px",
                                            fontWeight: 600,
                                            color: isActive
                                              ? "#065f46"
                                              : "#b91c1c",
                                            backgroundColor: isActive
                                              ? "#d1fae5"
                                              : "#fee2e2",
                                            fontSize: "12px",
                                            display: "inline-block",
                                          }}
                                        >
                                          {displayText}
                                        </span>
                                      );
                                    })()}
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      onClick={() => handleviewData(record)}
                                      className="btn"
                                    >
                                      👁 View
                                    </button>
                                  </td>
                                </tr>

                                {/* Detail row */}
                                <tr className="detail-row">
                                  <td colSpan="7">
                                    <div className="detail-content">
                                      <div className="detail-item">
                                        <strong>
                                          Amount invested in this round:
                                        </strong>{" "}
                                        {record.currency}
                                        {""}
                                        {Number(record.investor_investment).toLocaleString("en-US", {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        })}

                                      </div>
                                      <div className="detail-item">
                                        <strong>Date Invested:</strong>{" "}
                                        {record.invested_date
                                          ? formatCurrentDate(
                                            record.invested_date
                                          )
                                          : "N/A"}
                                      </div>
                                      <div className="detail-item">
                                        <strong>
                                          Fully Diluted Shares at the time of
                                          investment:
                                        </strong>{" "}
                                        {record.issuedshares
                                          ? Number(
                                            record.issuedshares
                                          ).toLocaleString("en-US")
                                          : "0"}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </React.Fragment>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="7" className="text-center">
                                No records found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </SectionWrapper>
              </div>
            </div>
          </div>
        </Wrapper>
        {ViewRecordRounds && (
          <ViewInvestorEndRecordRound
            onClose={() => setViewRecordRounds(false)}
            recordViewData={recordViewData}
          />
        )}
        {isOpen && (
          <div className="main_popup-overlay">
            <ModalContainer1>
              <div className="d-flex align-items-center gap-3 mb-4 justify-content-between">
                <ModalTitle>View KYC/AML Documentation</ModalTitle>
                <button
                  type="button"
                  className="close_btn_global"
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                >
                  <IoCloseCircleOutline size={24} />
                </button>
              </div>

              {/* Images container */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  maxHeight: "60vh",
                  overflowY: "auto",
                }}
              >
                {files.map((file, index) => {
                  const fileUrl = `${baseUrl}/${file}`;
                  return isImage(file) ? (
                    <img
                      key={index}
                      src={fileUrl}
                      alt={`Document ${index + 1}`}
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "contain",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "4px",
                        background: "#f9f9f9",
                      }}
                    />
                  ) : (
                    <a
                      key={index}
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ margin: "5px" }}
                    >
                      Open Document {index + 1}
                    </a>
                  );
                })}
              </div>

              <ButtonGroup>
                <ModalBtn
                  onClick={() => setIsOpen(false)}
                  className="close_btn w-fit"
                >
                  Close
                </ModalBtn>
              </ButtonGroup>
            </ModalContainer1>
          </div>
        )}
      </>
    </>
  );
}
