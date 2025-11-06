import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import TopBar from "../../../components/Users/UserDashboard/TopBar.jsx";
import ModuleSideNav from "../../../components/Users/UserDashboard/ModuleSideNav.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import { DataRoomSection } from "../../../components/Styles/DataRoomStyle.js";
import axios from "axios";
import { FaEye, FaTrash, FaBuilding } from "react-icons/fa"; // FontAwesome icons
import { Link, useNavigate } from "react-router-dom";
import DangerAlertPopup from "../../../components/Admin/DangerAlertPopup";
import { API_BASE_URL } from "../../../config/config";

export default function UserSignatoryList() {
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem("OwnerLoginData");
  const userLogin = JSON.parse(storedUsername);
  const [records, setrecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("Admin"); // Example role
  const [showPopup, setShowPopup] = useState(false);
  const [messagesuccessError, setmessagesuccessError] = useState("");
  const [errr, seterrr] = useState(false);
  const [DeleteId, setDeleteId] = useState("");
  const [DeleteEmail, setDeleteEmail] = useState("");
  const [dangerMessage, setdangerMessage] = useState("");
  const apiUrlCompany = API_BASE_URL + "api/user/company/";
  const apiUrlDashboard = API_BASE_URL + "api/user/signatorydashboard/";
  document.title = "All Signatories";

  useEffect(() => {
    getUserSignatory();
  }, []);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const getUserSignatory = async () => {
    const formData = {
      user_id: userLogin.id,
    };
    try {
      const resp = await axios.post(
        apiUrlCompany + "getUserSignatory",
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

  const getCompanyList = async (signatory_email) => {
    // This should fetch or filter companies based on signatory
    // For now, returning sample data
    const formData = {
      user_id: userLogin.id,
      signatory_email: signatory_email,
    };
    try {
      const resp = await axios.post(
        apiUrlDashboard + "getSignatoryCompanyList",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return resp.data.companies;
      //setrecords(resp.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  const handleShowCompanies = async (row) => {
    const companies = await getCompanyList(row.signatory_email);
    setSelectedCompanies(companies);
    setShowCompanyModal(true);
  };
  const columns = [
    {
      name: "Signatory Email",
      selector: (row) => row.signatory_email,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="icon_btn blue_clr"
            type="button"
            onClick={() => handleShowCompanies(row)}
            title="Company Details"
          >
            <FaBuilding /> Companies
          </button>

          {/* <Link
            onClick={() => handleViewrole(row.signature_role)}
            className="icon_btn green_clr"
            type="button"
            title="Signatory Activity"
          >
            <FaEye /> View Role
          </Link> */}

          <button
            className="icon_btn red_clr"
            type="button"
            onClick={() => handleDelete(row.signatory_email)}
            title="Delete"
          >
            <FaTrash /> Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "420px",
    },
  ];

  const handleDelete = (email) => {
    setDeleteEmail(email);
    setdangerMessage(
      "Are you sure you want to delete this record? This action cannot be undone"
    );
  };
  const handleConfirm = async () => {
    setdangerMessage("");
    const formData = {
      user_id: userLogin.id,
      email: DeleteEmail,
    };
    try {
      const resp = await axios.post(
        apiUrlCompany + "userDeleteSignatory",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setmessagesuccessError("Signatory deleted successfully");
      getUserSignatory();
    } catch (err) {
      console.error("Error generating summary", err);
    }
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
    const fullName = `${item.first_name || ""} ${
      item.last_name || ""
    }`.toLowerCase();
    const companyName = (item.company_name || "").toLowerCase();
    const email = (item.signatory_email || "").toLowerCase();
    const role = (item.signature_role || "").toLowerCase();
    const access_status = (item.access_status || "").toLowerCase();

    const search = searchText.toLowerCase();

    return (
      fullName.includes(search) ||
      companyName.includes(search) ||
      email.includes(search) ||
      role.includes(search) ||
      access_status.includes(search)
    );
  });

  //Share Report
  const [sendingMail, setSendingMail] = useState(null); // stores company_id being processed

  const handleSendMail = async (corp) => {
    const formData = {
      user_id: userLogin.id,
      corp: corp,
    };

    setSendingMail(corp.company_id); // Start spinner for this company

    try {
      const resp = await axios.post(
        apiUrlCompany + "SendMailToSignatory",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Show success message
      seterrr(false);
      setmessagesuccessError("Invitation email sent successfully!");
      // or use your preferred notification method
    } catch (err) {
      console.error("Error sending email", err);
      // Show error message
      seterrr(true);
      setmessagesuccessError(
        "Failed to send invitation email. Please try again."
      );
      // or use your preferred notification method
    } finally {
      setSendingMail(null); // Stop spinner
    }
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
                className={`global_view ${
                  isCollapsed ? "global_view_col" : ""
                }`}
              >
                <TopBar />
                <SectionWrapper className="d-block p-md-4 p-3">
                  <div className="container-fluid">
                    {messagesuccessError && (
                      <div
                        className={`flex items-center justify-between gap-3 shadow-lg ${
                          errr ? "error_pop" : "success_pop"
                        }`}
                      >
                        <div className="d-flex align-items-center gap-2">
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
                    {dangerMessage && (
                      <DangerAlertPopup
                        message={dangerMessage}
                        onConfirm={handleConfirm}
                        onCancel={() => {
                          setdangerMessage("");
                        }}
                      />
                    )}
                    <DataRoomSection className="d-flex flex-column gap-2">
                      <div className="titleroom flex-wrap gap-3 d-flex justify-content-between align-items-center border-bottom pb-3">
                        {/* Heading on the left */}
                        <div className="pb-3 bar_design">
                          <h4 className="h5 mb-0">All Signatories</h4>
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
                            to="/user/add-new-signatory"
                            className="btn btn-outline-dark active"
                          >
                            Add New Signatory
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
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                width: "90%",
                maxWidth: "400px",
                textAlign: "left",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                wordWrap: "break-word",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Role</h3>
              <p style={{ fontSize: "14px", color: "#333" }}>{userRole}</p>
              <div style={{ textAlign: "right" }}>
                <button
                  style={{
                    padding: "10px 20px",
                    marginTop: "15px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#212529",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Company Details Modal */}
        {showCompanyModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setShowCompanyModal(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Company Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCompanyModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <ul className="list-group">
                    {selectedCompanies && selectedCompanies.length > 0 ? (
                      selectedCompanies.map((company) => (
                        <li
                          key={company.company_id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <Link
                            to={`/user/signatory/activity/${company.company_id}/${company.signatory_id}`}
                            className="icon_btn green_clr"
                            type="button"
                            title="Signatory Activity"
                          >
                            {company.company_name}
                            <span
                              className={`badge ${
                                company.access_status === "active"
                                  ? "bg-success"
                                  : company.access_status === "pending"
                                  ? "bg-warning"
                                  : "bg-secondary"
                              }`}
                            >
                              {company.access_status}
                            </span>
                          </Link>

                          {company.access_status === "pending" && (
                            <button
                              className="generatebutton px-4 gap-2 fn_size_sm btn btn-outline-dark active d-flex align-items-center"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSendMail(company);
                              }}
                              title="Send mail to add signatory"
                              disabled={sendingMail === company.company_id}
                            >
                              {sendingMail === company.company_id ? (
                                <>
                                  <div
                                    className="spinner-color spinner-border spinneronetimepay m-0"
                                    role="status"
                                  >
                                    <span className="visually-hidden"></span>
                                  </div>
                                  Sending...
                                </>
                              ) : (
                                <>
                                  <i className="fa fa-envelope me-1"></i>
                                  Send Mail
                                </>
                              )}
                            </button>
                          )}
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item text-center text-muted">
                        No companies found
                      </li>
                    )}
                  </ul>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCompanyModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}
