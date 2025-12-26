import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import TopBar from "../../../components/Users/TopBar";
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import { DataRoomSection } from "../../../components/Styles/DataRoomStyle.js";
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
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config.js";
export default function InvestorReportView() {
  const navigate = useNavigate();

  const storedUsername = localStorage.getItem("SignatoryLoginData");

  const userLogin = JSON.parse(storedUsername);
  const [records, setrecords] = useState([]);
  const [errr, seterrr] = useState(false);
  const [InvestorInfo, setInvestorInfo] = useState("");
  const [messagesuccessError, setmessagesuccessError] = useState("");
  var apiURLInvestor = API_BASE_URL + "api/user/investor/";
  document.title = "Shared Investor Report";
  const { id } = useParams();
  useEffect(() => {
    checkInvestor();
    getInvestorReportUpdate();
  }, []);

  const checkInvestor = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
      id: id,
      type: "Investor updates",
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "checkInvestor",
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
    //  Optionally, call AI Summary API here
    //generateExecutiveSummary(formData);
  };

  const getInvestorReportUpdate = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
      id: id,
    };
    try {
      const resp = await axios.post(
        apiURLInvestor + "getInvestorReportUpdate",
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
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      name: "Name of Report",
      selector: (row) => row.document_name,
      sortable: true,
    },
    {
      name: "Date of Report",
      selector: (row) => formatCurrentDate(row.datereport),
      sortable: true,
    },

    {
      name: "Date Viewed",
      selector: (row) =>
        row.date_view ? formatCurrentDate(row.date_view) : "Not Viewed",
      sortable: true,
    },
    {
      name: "Access Level",
      selector: (row) => row.access_status,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            type="button"
            onClick={() => handleDownload(row.downloadUrl)}
            rel="noopener noreferrer"
            className="icon_download"
            title="Download"
          >
            <FaDownload />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

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
    const name = `${item.document_name || ""} - ${item.datereport || ""} - ${item.version || ""
      }`;
    return (
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.datereport || "")
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      (item.download || "").toLowerCase().includes(searchText.toLowerCase())
    );
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  //Due diligence Record
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
                        Investor Report Update
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
                                    <span>{InvestorInfo.investorType}</span>
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
                                  <td>
                                    <strong>KYC/AML Documentation : </strong>{" "}
                                    <span>
                                      {InvestorInfo.kyc_document &&
                                        InvestorInfo.kyc_document.length >
                                        0 && (
                                          <div className="mt-2">
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
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --- SEARCH & DATA TABLE --- */}
                    <div className="d-flex flex-wrap gap-3 justify-content-between my-2 p-0">
                      <h4>Shared Investor Report</h4>
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
                    <div className="d-flex flex-column justify-content-between align-items-start tb-box">
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
                  </div>
                </SectionWrapper>
              </div>
            </div>
          </div>
        </Wrapper>
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
