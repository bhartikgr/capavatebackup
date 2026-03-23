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
import { FaEye } from "react-icons/fa"; // FontAwesome icons
import ViewSignature from "../../../components/Users/popup/ViewSignature.jsx";
import ReasonSignature from "../../../components/Users/popup/ReasonSignature.jsx";
import { useNavigate } from "react-router-dom";

export default function ApprovalSignature() {
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem("OwnerLoginData");
  const userLogin = JSON.parse(storedUsername);
  const [records, setrecords] = useState([]);
  const [ShowPopup, setShowPopup] = useState(false);
  const [messagesuccessError, setmessagesuccessError] = useState("");
  const [OpenPup, setOpenPup] = useState(false);
  const [OpenPupupReason, setOpenPupupReason] = useState(false);
  const [ViewData, setViewData] = useState([]);
  const [errr, seterrr] = useState(false);
  var apiURL = "https://capavate.com/api/user/";

  document.title = "All Signature List";

  useEffect(() => {
    getAllUserSignature();
  }, []);

  const getAllUserSignature = async () => {
    const formData = {
      user_id: userLogin.id,
    };
    try {
      const resp = await axios.post(apiURL + "getAllUserSignature", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setrecords(resp.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };

  const columns = [
    {
      name: "Signatory Name",
      selector: (row) => row.first_name + " " + row.last_name,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.company_name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.approve,
      sortable: true,
      cell: (row) => {
        const isApproved = row.approve === "Yes";

        return (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "12px",
              fontWeight: "600",
              color: isApproved ? "#065f46" : "#b91c1c", // ✅ green for Yes, red for No
              backgroundColor: isApproved ? "#d1fae5" : "#fee2e2", // ✅ light green or light red
              fontSize: "12px",
              display: "inline-block",
            }}
          >
            {isApproved ? "Approved" : "Not Approved"}
          </span>
        );
      },
    },

    {
      name: "Date",
      selector: (row) => formatCurrentDate(row.created_at),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => {
        const isApproved = row.approve === "Yes";

        return (
          <div className="d-flex gap-2">
            {/* 👁 Always show View */}
            <button
              type="button"
              onClick={() => handleViewSignature(row)}
              className="icon_edit icon_btn"
              title="View Signature"
            >
              <FaEye /> View
            </button>

            {/* ✅ Show Approve button if not approved */}
            {!isApproved && (
              <button
                onClick={() => handleApprove(row.id)}
                className="icon_btn green_clr"
                title="Approve Signature"
              >
                Approve
              </button>
            )}

            {/* ❌ Show Decline button if not approved */}
            {!isApproved && (
              <button
                onClick={() => handleDecline(row)}
                className="icon_btn red_clr"
                title="Decline Signature"
              >
                Decline
              </button>
            )}
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "320px",
    },
  ];
  const handleDecline = (data) => {
    setOpenPupupReason(true);
    setViewData(data);
  };
  const handleApprove = async (id) => {
    const formData = {
      id: id,
    };
    try {
      const resp = await axios.post(apiURL + "approveSignature", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setmessagesuccessError(resp.data.message);
      getAllUserSignature();
      setTimeout(() => {
        setmessagesuccessError("");
      }, 2500);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  const handleViewSignature = (data) => {
    setOpenPup(true);
    setViewData(data);
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

    // Combine text safely
    const combinedText = `${companyName} - ${addressOrWebsite}`.toLowerCase();

    const search = searchText.toLowerCase();

    // ✅ Only one check needed now
    return combinedText.includes(search);
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
  const refreshpage = () => {
    getAllUserSignature();
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
      {OpenPup && (
        <ViewSignature onClose={() => setOpenPup(false)} ViewData={ViewData} />
      )}
      {OpenPupupReason && (
        <ReasonSignature
          onClose={() => setOpenPupupReason(false)}
          ViewData={ViewData}
          refreshpage={refreshpage}
        />
      )}
    </>
  );
}
