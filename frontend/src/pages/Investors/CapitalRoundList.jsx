import React, { useState, useEffect } from "react";
import {
  SectionWrapper,
  Wrapper,
} from "../../components/Styles/RegisterStyles";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import { FaEllipsisV, FaEye, FaHistory } from "react-icons/fa";
import SideBar from '../../components/Investor/social/SideBar';
import TopBar from '../../components/Investor/social/TopBar';
import { DataRoomSection } from "../../components/Styles/DataRoomStyle.js";
import { BackButton } from "../../components/Styles/GlobalStyles.js";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
function CapitalRoundList() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  document.title = "Company Capital Round List - Investor";
  const customStyles = {
    table: {
      style: {
        minWidth: "100%",
        boxShadow: "0px 3px 12px rgb(0 0 0 / 16%)",
        borderRadius: "12px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#efefef !important",
        fontWeight: "600",
        fontSize: "0.9rem",
        color: "#000 !important",
        whiteSpace: "nowrap",
      },
    },
    cells: {
      style: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        backgroundColor: "#fff !important",
      },
    },
    rows: {
      style: {
        fontSize: "0.8rem",
        fontWeight: "500",
        "&:hover": {
          backgroundColor: "#e8f0fe",
        },
      },
      stripedStyle: {
        backgroundColor: "#f4f6f8",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#fafafa",
        padding: "12px 16px",
      },
    },
  };
  var apiURL = "https://capavate.com/api/user/capitalround/";

  const storedUsername = localStorage.getItem("InvestorData");
  const userLogin = JSON.parse(storedUsername);
  const [searchText, setSearchText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    getInvestorCapitalMotionlist();
  }, []);
  const getInvestorCapitalMotionlist = async () => {
    let formData = {
      investor_id: userLogin.id,
      company_id: Number(id),
    };

    try {
      const res = await axios.post(
        apiURL + "getInvestorCapitalMotionlist",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data.results)

      setRecords(res.data.results);
    } catch (err) { }
  };
  const [records, setRecords] = useState([]);

  const filteredData = records.filter((item) => {
    const search = searchText.toLowerCase();

    // Combine all searchable fields into one string
    const combinedFields = `
    ${item.nameOfRound || ""}
    ${item.shareClassType || ""}
     ${item.roundsize || ""}
    ${item.issuedshares || ""}
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

  const handleBackClick = () => {
    navigate("/investor/company-list");
  };
  return (
    <main>
      <div className='d-flex align-items-start gap-0'>
        <SideBar />
        <div className='d-flex flex-grow-1 flex-column gap-0'>
          <TopBar />
          <SectionWrapper className="d-block p-md-4 p-3">
            <div className="container-fluid">
              <DataRoomSection className="d-flex flex-column gap-3">
                <div className="titleroom flex-wrap  gap-3 d-flex justify-content-between align-items-center border-bottom pb-3">
                  <BackButton
                    type="button"
                    className="backbtn"
                    onClick={handleBackClick}
                  >
                    <ArrowLeft size={16} className="me-1" /> back
                  </BackButton>
                  <h4 className="mainh1">Investor Round List</h4>
                </div>
                <div className="d-flex justify-content-end p-0">
                  <input
                    type="search"
                    placeholder="Search Here..."
                    className="textarea_input"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                      padding: "10px",
                      width: "100%",
                      maxWidth: "200px",
                      fontSize: "14px",
                    }}
                  />
                </div>
                <div className="d-flex overflow-auto flex-column justify-content-between align-items-start tb-box">
                  <DataTable
                    customStyles={customStyles}
                    columns={[
                      {
                        name: "Company Name",
                        selector: (row) =>
                          row.company_name, // Changed from row.email
                        sortable: true,
                        cell: (row) => (
                          <span>
                            {row.company_name}
                          </span>
                        ),
                      },
                      {
                        name: "Round Name",
                        selector: (row) =>
                          row.nameOfRound, // Changed from row.email
                        sortable: true,
                        cell: (row) => (
                          <span>
                            {row.nameOfRound}
                          </span>
                        ),
                      },
                      {
                        name: "Funding Round",
                        selector: (row) =>
                          row.shareClassType, // Changed from row.email
                        sortable: true,
                        cell: (row) => (
                          <span>
                            {row.shareClassType}
                          </span>
                        ),
                      },
                      {
                        name: "Instrument Type",
                        selector: (row) =>
                          row.instrumentType,

                        sortable: true,


                      },

                      {
                        name: "Target Raise Amount",
                        selector: (row) => {
                          const amount = row.roundsize ? Number(row.roundsize) : 0;
                          const currency = row.currency || ""; // e.g., ₹ or $
                          const formattedAmount = amount.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          });
                          return `${currency} ${formattedAmount}`;
                        },
                        sortable: true,

                      },
                      {
                        name: "Status of Round",
                        selector: (row) => row.dateroundclosed,
                        sortable: true,
                        cell: (row) => {
                          const isActive = row.roundStatus === "ACTIVE";
                          let displayText;

                          if (isActive) {
                            displayText = "ACTIVE";
                          } else if (!row.dateroundclosed) {
                            // Handle null, undefined, or empty date
                            displayText = "CLOSED: N/A";
                          } else {
                            displayText = `CLOSED: ${formatCurrentDate(row.dateroundclosed)}`;
                          }

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
                      }
                      ,

                      {
                        name: "Actions",
                        cell: (row) => (
                          <div className="position-relative">
                            <button
                              className="btn btn-light btn-sm"
                              onClick={() =>
                                setOpen(open === row.id ? null : row.id)
                              }
                              style={{
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                                padding: "4px 8px",
                              }}
                            >
                              <FaEllipsisV />
                            </button>

                            {open === row.id && (
                              <div
                                className="dropdown-menu show"
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  right: 0,
                                  minWidth: "220px",
                                  zIndex: 9999,
                                  borderRadius: "8px",
                                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                }}
                              >

                                <Link
                                  to={`/investor/company/capital-round-list/view/${row.company_id}/${row.id}`}
                                  className="dropdown-item"
                                >

                                  <FaEye /> View Round
                                </Link>
                                <Link
                                  to={`/investor/company/capital-round-list/history/${row.company_id}/${row.id}`}
                                  className="dropdown-item"
                                >

                                  <FaHistory /> Investment History
                                </Link>
                              </div>
                            )}
                          </div>
                        ),
                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                      },
                    ]}
                    className="datatb-report"
                    data={filteredData}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    paginationRowsPerPageOptions={[10, 25, 50, 100]}
                    paginationComponentOptions={{
                      rowsPerPageText: "Rows per page:",
                      rangeSeparatorText: "of",
                      noRowsPerPage: false,
                      selectAllRowsItem: false,
                    }}
                  />
                </div>
              </DataRoomSection>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </main>
  );
}

export default CapitalRoundList;
