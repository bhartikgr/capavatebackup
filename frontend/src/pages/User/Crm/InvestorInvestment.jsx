import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import SideBar from '../../../components/social/SideBar'
import TopBar from '../../../components/social/TopBar'
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import { DataRoomSection } from "../../../components/Styles/DataRoomStyle.js";
import axios from "axios";
import { FaEdit, FaDownload, FaLock, FaCheck, FaTrash } from "react-icons/fa"; // FontAwesome icons
import DangerAlertPopup from "../../../components/Admin/DangerAlertPopup";
import CurrencyFormatter from "../../../components/CurrencyFormatter.jsx";
import { Link, useNavigate } from "react-router-dom";
// import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight.js";
import VeryfyInvestment from "../../../components/Investor/popup/VeryfyInvestment.jsx";
import { API_BASE_URL } from "../../../config/config.js";
export default function InvestorInvestoment() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const userLogin = JSON.parse(storedUsername);
  const [records, setrecords] = useState([]);
  const [Deleteid, setDeleteid] = useState("");
  const [messagesuccessError, setmessagesuccessError] = useState("");
  const [dangerMessagealertDoc, setdangerMessagealertDoc] = useState("");
  const [errr, seterrr] = useState(false);
  var apiURL = API_BASE_URL + "api/user/investor/";
  document.title = "Investor Investment";
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
  useEffect(() => {
    getInvestmentList();
  }, []);
  const getInvestmentList = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
    };
    try {
      const generateRes = await axios.post(
        apiURL + "getInvestmentList",
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
  };
  const handleDelete = (id) => {
    setDeleteid(id);
    setdangerMessagealertDoc(
      "Are you sure you want to delete this investor? All shared reports will also be deleted"
    );
  };
  const columns = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
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
      name: "Name of Round",
      selector: (row) => row.shareClassType + " " + row.nameOfRound,
      sortable: true,
    },

    {
      name: "Target Raise Amount",
      selector: (row) => {
        return <CurrencyFormatter
          amount={row.roundsize}
          currency={row.currency}
        />;
      },
      sortable: true,
    },
    {
      name: "Investment Amount",
      selector: (row) => <CurrencyFormatter
        amount={row.investment_amount}
        currency={row.currency}
      />,
      sortable: true,
    },
    {
      name: "Verify",
      selector: (row) => row.request_confirm,
      sortable: true,
      cell: (row) => {
        const isConfirmed = row.request_confirm === "Yes";
        return (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "12px",
              fontWeight: 600,
              color: isConfirmed ? "#065f46" : "#b91c1c",
              backgroundColor: isConfirmed ? "#d1fae5" : "#fee2e2",
              fontSize: "12px",
              display: "inline-block",
            }}
          >
            {row.request_confirm || "N/A"}
          </span>
        );
      },
    },
    {
      name: "Contact to Investor",
      selector: (row) => row.request_confirm,
      sortable: false,
      cell: (row) => {
        const isConfirmed = row.request_confirm === "Yes";
        return (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "12px",
              fontWeight: 600,
              color: isConfirmed ? "#065f46" : "#1e40af",
              backgroundColor: isConfirmed ? "#d1fae5" : "#dbeafe",
              fontSize: "12px",
              display: "inline-block",
            }}
          >
            {isConfirmed ? "Contacted" : "Contact to Investor"}
          </span>
        );
      },
    },

    {
      name: "Action",
      cell: (row) => {
        const isConfirmed = row.request_confirm === "Yes";
        return (
          <div className="d-flex gap-2">
            <button
              type="button"
              onClick={() => handleVerify(row.id, row)}
              className={`${isConfirmed ? "icon_btn green_clr" : "icon_btn red_clr"
                }`}
              disabled={isConfirmed} // disable if already confirmed
              title={isConfirmed ? "Verified" : "Verify"}
            >
              {isConfirmed ? "Verified" : "Verify"}
            </button>
          </div>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "200px",
    },
  ];
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [pendingVerifyId, setPendingVerifyId] = useState(null);
  const [verifyInvestorData, setVerifyInvestorData] = useState(null);
  const [isPopupSubmitting, setIsPopupSubmitting] = useState(false);
  const handleVerify = async (idd, rowdata) => {

    setPendingVerifyId(idd);
    setVerifyInvestorData(rowdata);
    setShowConfirmPopup(true);
  };
  const filteredData = records.filter((item) => {
    const search = searchText.toLowerCase();

    // Create a string of all searchable fields (match what you're showing in columns)
    const combined = [
      item.email,
      item.first_name,
      item.last_name,
      `${item.shareClassType || ""} ${item.nameOfRound || ""}`,
      item.roundsize,
      item.issuedshares,
      item.investment_amount,
      item.currency,
      item.request_confirm,
      item.update_date,
      item.download,
      item.investorType,
      item.investmentPreference,
      item.version,
    ]
      .join(" ")
      .toLowerCase();

    return combined.includes(search);
  });

  const handleConfirm = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
      id: Deleteid,
    };

    try {
      const generateRes = await axios.post(
        apiURL + "deleteinvestor",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setdangerMessagealertDoc("");
      setmessagesuccessError("Deleted succcessfully");

      setTimeout(() => {
        setmessagesuccessError("");
      }, 2500);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };

  const handleInvestmentConfirm = async (investment) => {
    setIsPopupSubmitting(true);

    try {
      const formData = {
        company_id: userLogin.companies[0].id,
        verify_id: pendingVerifyId,
        confirm_investment_acknowlegment: "Yes", // Add acknowledgment status
        acknowledged_by: userLogin.id
      };

      const generateRes = await axios.post(
        apiURL + "verifyInvestment",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      getInvestmentList();
      setdangerMessagealertDoc("");
      setmessagesuccessError("Verified successfully");

      // Close popup
      setShowConfirmPopup(false);

      setTimeout(() => {
        setmessagesuccessError("");
      }, 2500);

    } catch (err) {
      console.error("Error generating summary", err);
      setmessagesuccessError("Error verifying investment");
      setTimeout(() => {
        setmessagesuccessError("");
      }, 2500);
    } finally {
      setIsPopupSubmitting(false);
      setPendingVerifyId(null);
      setVerifyInvestorData(null);
    }
  };
  const handlePopupClose = () => {
    setShowConfirmPopup(false);
    setPendingVerifyId(null);
    setVerifyInvestorData(null);
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>

      <main>
        <div className=' fullpage d-flex align-items-start gap-0'>
          <SideBar />
          <div className='d-flex flex-grow-1 flex-column gap-0'>
            <TopBar />
            <SectionWrapper className="d-block p-md-4 p-3">
              <div className="container-fluid">
                {dangerMessagealertDoc && (
                  <DangerAlertPopup
                    message={dangerMessagealertDoc}
                    onConfirm={handleConfirm}
                    onCancel={() => {
                      setdangerMessagealertDoc("");
                    }}
                  />
                )}
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
                  <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                    <div className="pb-3 bar_design">
                      <h4 className="h5 mb-0">Investment Confirmation</h4>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end my-2 p-0">
                    <input
                      type="search"
                      placeholder="Search Here..."
                      className="form-control"
                      value={searchText} // link input to state
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
                </DataRoomSection>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </main>
      <VeryfyInvestment
        show={showConfirmPopup}
        onClose={() => setShowConfirmPopup(false)}
        onConfirm={handleInvestmentConfirm}
        isSubmitting=''
        records={verifyInvestorData}
      />
    </>
  );
}
