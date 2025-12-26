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
export default function InvestorViewDetails() {
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
  document.title = "Investor Information";
  const { id } = useParams();
  useEffect(() => {
    checkInvestor();
  }, []);

  const checkInvestor = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
      id: id,
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "checkInvestorRecord",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (generateRes.data.results.length === 0) {
        navigate("/crm/investor-directory");
      } else {
        setInvestorInfo(generateRes.data.results[0]);
      }
      // setrecords(generateRes.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };

  const handleviewData = (dataa) => {
    setViewRecordRounds(true);
    setrecordViewData(dataa);
  };

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
                        Investor Information
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
                          </div>
                        </div>
                      </div>
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
