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
import { FaDownload, FaEye, FaShareAlt } from "react-icons/fa"; // FontAwesome icons
import AiInvestorReport from "../../../components/Users/popup/AiInvestorReport.jsx";

import { Button } from "../../../components/Styles/MainStyle.js";

import { useNavigate } from "react-router-dom";
import InvestorShareReport from "../../../components/Users/popup/InvestorShareReport.jsx";
import InvestorShareReportRecordRound from "../../../components/Users/popup/InvestorShareReportRecordRound.jsx";
import ViewRecordRound from "../../../components/Users/popup/ViewRecordRound";
export default function ShareReport() {
  const navigate = useNavigate();
  const [IsModalOpenShareReport, setIsModalOpenShareReport] = useState(false);
  const [getDataroompay, setgetDataroompay] = useState("");
  const storedUsername = localStorage.getItem("SignatoryLoginData");
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
  const apiUrlModule = "http://localhost:5000/api/admin/module/";
  var apiURLInvestor = "http://localhost:5000/api/user/investor/";
  var apiURLRound = "http://localhost:5000/api/user/capitalround/";
  const apiURLSignature = "http://localhost:5000/api/user/";
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
      const registeredInvestors = generateRes.data.results.filter(
        (investor) => investor.is_register?.toLowerCase() === "yes"
      );

      setallinvestor(registeredInvestors);
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
        apiURLInvestor + "getinvestorReportsLock",
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
  const handleSelectRow = (row) => {
    setSelectedRows((prev) => {
      // Check if row is already selected
      const exists = prev.find((r) => r.id === row.id);
      if (exists) {
        // Remove it
        return prev.filter((r) => r.id !== row.id);
      } else {
        // Add it
        return [
          ...prev,
          { id: row.id, document_name: row.document_name, type: row.type },
        ];
      }
    });
  };

  // Select/Deselect all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(
        records.map((row) => ({
          id: row.id,
          document_name: row.document_name,
          type: row.type,
        }))
      );
    } else {
      setSelectedRows([]);
    }
  };

  const columns = [
    {
      name: (
        <input
          type="checkbox"
          onChange={handleSelectAll} // function to select/deselect all
          checked={
            records.length > 0 &&
            records.every((row) => selectedRows.some((r) => r.id === row.id))
          }
          // Disable header checkbox if no rows are selectable
          disabled={records.every((row) => row.is_locked !== 1)}
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedRows.some((r) => r.id === row.id)}
          onChange={() => handleSelectRow(row)}
          disabled={row.is_locked !== 1} // Enable only if row.is_locked === 1
        />
      ),
      width: "60px",
    },
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
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            type="button"
            title="Download Report"
            onClick={() =>
              handleDownload(row.user_id, row.document_name, row.downloadUrl)
            }
            className="icon_btn green_clr"
          >
            <FaDownload /> Download
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "200px",
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
        overflow: "auto",
        textOverflow: "ellipsis",
        width: "100px",
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
    const search = (searchText || "").toLowerCase();

    const name = `${item.type || ""} - ${item.update_date || ""} - ${item.document_name || ""
      }`.toLowerCase();

    const updateDate = String(item.update_date || "").toLowerCase();
    const download = String(item.download || "").toLowerCase();

    return (
      name.includes(search) ||
      updateDate.includes(search) ||
      download.includes(search)
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
    if (!authorizedData) {
      seterrr(true);
      setmessagesuccessError("No authorized signature found.");
      return;
    }

    if (authorizedData.approve !== "Yes") {
      seterrr(true);
      setmessagesuccessError("Authorized Signature is not approved yet.");
      return;
    }

    if (selectedRows.length > 0) {
      setIsModalOpenShareReport(true);
    }
  };
  const returnrefresh = () => {
    getreports();
    setSelectedRows([]);

    setSelectedRowsDataroom([]);
    getDuediligenceDataroom();

    setSelectedRowsRecordRound([]);
    getCapitalRecordRound();
  };

  //Due diligence
  const [ViewRecordRounds, setViewRecordRounds] = useState(false);
  const [recordsDataroom, setrecordsDataroom] = useState([]);
  const [searchTextDataroom, setSearchTextDataroom] = useState("");
  const [IsModalOpenShareReportDataroom, setIsModalOpenShareReportDataroom] =
    useState(false);
  const filteredDataDataroom = recordsDataroom.filter((item) => {
    const search = (searchTextDataroom || "").toLowerCase();

    const name = `${item.type || ""} - ${item.update_date || ""} - ${item.document_name || ""
      }`.toLowerCase();

    const updateDate = String(item.update_date || "").toLowerCase();
    const download = String(item.download || "").toLowerCase();

    return (
      name.includes(search) ||
      updateDate.includes(search) ||
      download.includes(search)
    );
  });

  useEffect(() => {
    getDuediligenceDataroom();
  }, []);

  const getDuediligenceDataroom = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
    };
    try {
      const generateRes = await axios.post(
        apiURLInvestor + "getDuediligenceDataroomLock",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setrecordsDataroom(generateRes.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  const [selectedRowsDataroom, setSelectedRowsDataroom] = useState([]);

  // Toggle a row
  const handleSelectRowDataroom = (row) => {
    setSelectedRowsDataroom((prev) => {
      // Check if row is already selected
      const exists = prev.find((r) => r.id === row.id);
      if (exists) {
        // Remove it
        return prev.filter((r) => r.id !== row.id);
      } else {
        // Add it
        return [
          ...prev,
          { id: row.id, document_name: row.document_name, type: row.type },
        ];
      }
    });
  };
  const handleSelectAllDataroom = (e) => {
    if (e.target.checked) {
      setSelectedRowsDataroom(
        recordsDataroom.map((row) => ({
          id: row.id,
          document_name: row.document_name,
          type: row.type,
        }))
      );
    } else {
      setSelectedRowsDataroom([]);
    }
  };
  const columnsDataroom = [
    {
      name: (
        <input
          type="checkbox"
          onChange={handleSelectAllDataroom} // function to select/deselect all
          checked={
            recordsDataroom.length > 0 &&
            recordsDataroom.every((row) =>
              selectedRowsDataroom.some((r) => r.id === row.id)
            )
          }
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedRowsDataroom.some((r) => r.id === row.id)}
          onChange={() => handleSelectRowDataroom(row)}
        />
      ),
      width: "60px",
    },
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
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            type="button"
            title="Download Document"
            onClick={() =>
              handleDownload(row.user_id, row.document_name, row.downloadUrl)
            }
            className="icon_btn green_clr"
          >
            <FaDownload /> Download
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "200px",
    },
  ];
  const handleshareReportDataroom = () => {
    if (!authorizedData) {
      seterrr(true);
      setmessagesuccessError("No authorized signature found.");
      return;
    }

    if (authorizedData.approve !== "Yes") {
      seterrr(true);
      setmessagesuccessError("Authorized Signature is not approved yet.");
      return;
    }
    if (selectedRowsDataroom.length > 0) {
      setIsModalOpenShareReportDataroom(true);
    }
  };

  //Capital Round
  const [recordsRecordRound, setrecordsRecordRound] = useState([]);
  useEffect(() => {
    getCapitalRecordRound();
  }, []);

  const getCapitalRecordRound = async () => {
    const formData = {
      company_id: userLogin.companies[0].id,
    };
    try {
      const generateRes = await axios.post(
        apiURLRound + "getCapitalRecordRound",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setrecordsRecordRound(generateRes.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  const [selectedRowsRecordRound, setSelectedRowsRecordRound] = useState([]);
  const [searchTextRecordRound, setSearchTextRecordRound] = useState("");
  const handleSelectAllRecordRound = (e) => {
    if (e.target.checked) {
      // Only select rows that meet the selectable criteria
      const selectableRows = recordsRecordRound.filter((row) => {
        const isClosed = row.roundStatus === "CLOSED";
        const isActive = row.roundStatus === "ACTIVE";

        // If ACTIVE, it's selectable
        if (isActive) return true;

        // If CLOSED, check if date hasn't expired
        if (isClosed) {
          const closedDate = new Date(row.dateroundclosed);
          const today = new Date();

          // Reset time to midnight
          closedDate.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);

          // Selectable if date is in the future
          return today < closedDate;
        }

        // Other statuses are not selectable
        return false;
      });

      setSelectedRowsRecordRound(
        selectableRows.map((row) => ({
          id: row.id,
          name: row.nameOfRound,
          issuedshares: row.issuedshares,
          roundsize: row.roundsize,
          currency: row.currency,
        }))
      );
    } else {
      setSelectedRowsRecordRound([]);
    }
  };
  const handleSelectRowRecordRound = (row) => {
    setSelectedRowsRecordRound((prev) => {
      // Check if row is already selected
      const exists = prev.find((r) => r.id === row.id);
      if (exists) {
        // Remove it
        return prev.filter((r) => r.id !== row.id);
      } else {
        // Add it
        return [
          ...prev,
          {
            id: row.id,
            name: row.nameOfRound,
            issuedshares: row.issuedshares,
            roundsize: row.roundsize,
            currency: row.currency,
          },
        ];
      }
    });
  };
  const [IsModalOpenShareRecordRound, setIsModalOpenShareRecordRound] =
    useState(false);
  const [recordViewData, setrecordViewData] = useState("");
  const handleViewsection = (id, rowdata) => {
    setrecordViewData(rowdata);
    setViewRecordRounds(true);
  };
  const columnsRecordRound = [
    {
      name: (
        <input
          type="checkbox"
          onChange={handleSelectAllRecordRound}
          checked={
            recordsRecordRound.length > 0 &&
            recordsRecordRound.every((row) =>
              selectedRowsRecordRound.some((r) => r.id === row.id)
            )
          }
        />
      ),
      cell: (row) => {
        const isClosed = row.roundStatus === "CLOSED";
        const isActive = row.roundStatus === "ACTIVE";

        // If ACTIVE, enable checkbox
        if (isActive) {
          return (
            <input
              type="checkbox"
              checked={selectedRowsRecordRound.some((r) => r.id === row.id)}
              onChange={() => handleSelectRowRecordRound(row)}
              disabled={false}
            />
          );
        }

        // If CLOSED, check the date
        if (isClosed) {
          // Parse the closed date (MM/DD/YYYY format)
          const closedDate = new Date(row.dateroundclosed);
          const today = new Date();

          // Reset time to midnight for accurate date comparison
          closedDate.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);

          // Disable if closed date has passed or is today
          const isExpired = today >= closedDate;

          return (
            <input
              type="checkbox"
              checked={selectedRowsRecordRound.some((r) => r.id === row.id)}
              onChange={() => handleSelectRowRecordRound(row)}
              disabled={isExpired}
            />
          );
        }

        // For any other status, disable checkbox
        return (
          <input
            type="checkbox"
            checked={selectedRowsRecordRound.some((r) => r.id === row.id)}
            onChange={() => handleSelectRowRecordRound(row)}
            disabled={true}
          />
        );
      },
      width: "60px",
    },
    {
      name: "Share Class (Name of Round)",
      selector: (row) => row.shareClassType + " " + row.nameOfRound,
      sortable: true,
    },
    {
      name: "Target Raise Amount",
      selector: (row) => {
        const formattedAmount = Number(row.roundsize).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return `${row.currency} ${formattedAmount}`;
      },
      sortable: true,
    },
    {
      name: "Number of Shares",
      selector: (row) => {
        const formattedAmount = Number(row.issuedshares).toLocaleString(
          "en-IN",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        );
        return `${formattedAmount}`;
      },
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
              color: isActive ? "#065f46" : "#b91c1c",
              backgroundColor: isActive ? "#d1fae5" : "#fee2e2",
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
            title="View Record Round"
            onClick={() => {
              if (
                userLogin.role !== "owner" &&
                (!authorizedData?.approve || authorizedData.approve !== "Yes")
              ) {
                seterrr(true);
                setmessagesuccessError(
                  "Signature authorized is not approved yet."
                );
                return;
              }
              handleViewsection(row.user_id, row);
            }}
            className="btn btn-sm btn-outline-success fw-bold"
          >
            <FaEye /> View
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "200px",
    },
  ];
  // Filter data by nameofreport (case insensitive)
  const filteredDataRecordRound = recordsRecordRound.filter((item) => {
    const search = (searchTextRecordRound || "").toLowerCase();

    const name = `${item.nameOfRound || ""} - ${item.currency || ""} - ${item.issuedshares || ""
      }`.toLowerCase();

    // Format created_at as string for search
    const createdAtStr = item.created_at
      ? new Date(item.created_at).toLocaleDateString("en-IN") // or use formatCurrentDate(item.created_at)
      : "";

    const download = String(item.download || "").toLowerCase();

    return (
      name.includes(search) ||
      createdAtStr.toLowerCase().includes(search) ||
      download.includes(search)
    );
  });

  const handleshareReportRecordRound = () => {
    if (!authorizedData) {
      seterrr(true);
      setmessagesuccessError("No authorized signature found.");
      return;
    }

    if (authorizedData.approve !== "Yes") {
      seterrr(true);
      setmessagesuccessError("Authorized Signature is not approved yet.");
      return;
    }
    if (selectedRowsRecordRound.length > 0) {
      setIsModalOpenShareRecordRound(true);
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
                className={`global_view ${isCollapsed ? "global_view_col" : ""
                  }`}
              >
                <TopBar />
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
                      <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                        {/* Heading on the left */}
                        <div className="pb-3 bar_design">
                          <h4 className="h5 mb-0">Investor Reports</h4>
                        </div>
                        {/* Buttons on the right */}
                        <div className="d-flex gap-2">
                          <Button
                            onClick={handleshareReport}
                            type="button"
                            className="btn bg-dark text-white py-2 hoverbge creditb d-flex align-items-center  active gap-2"
                            style={{
                              opacity: selectedRows.length === 0 ? 0.5 : 1,
                              pointerEvents:
                                selectedRows.length === 0 ? "none" : "auto",
                            }}
                          >
                            <FaShareAlt style={{ fontSize: "14px" }} />
                            Share Report
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
                    <DataRoomSection className="d-flex flex-column gap-2">
                      <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                        {/* Heading on the left */}
                        <div className="pb-3 bar_design">
                          <h4 className="h5 mb-0">
                            DataRoom Management Documents
                          </h4>
                        </div>
                        {/* Buttons on the right */}
                        <div className="d-flex gap-2">
                          <Button
                            onClick={handleshareReportDataroom}
                            type="button"
                            className="btn bg-dark text-white py-2 hoverbge creditb d-flex align-items-center  active gap-2"
                            style={{
                              opacity:
                                selectedRowsDataroom.length === 0 ? 0.5 : 1,
                              pointerEvents:
                                selectedRowsDataroom.length === 0
                                  ? "none"
                                  : "auto",
                            }}
                          >
                            <FaShareAlt style={{ fontSize: "14px" }} />
                            Share Report
                          </Button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end my-2 p-0">
                        <input
                          type="search"
                          placeholder="Search Here..."
                          className="form-control"
                          value={searchTextDataroom}
                          onChange={(e) =>
                            setSearchTextDataroom(e.target.value)
                          }
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
                          columns={columnsDataroom}
                          className="datatb-report"
                          data={filteredDataDataroom}
                          pagination
                          highlightOnHover
                          striped
                          responsive
                        />
                      </div>
                    </DataRoomSection>

                    <DataRoomSection className="d-flex flex-column gap-2 mt-4">
                      <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                        {/* Heading on the left */}
                        <div className="pb-3 bar_design">
                          <h4 className="h5 mb-0">
                            Capital In Motion: Record a Round
                          </h4>
                        </div>
                        {/* Buttons on the right */}
                        <div className="d-flex gap-2">
                          <Button
                            onClick={handleshareReportRecordRound}
                            type="button"
                            className="btn bg-dark text-white py-2 hoverbge creditb d-flex align-items-center  active gap-2"
                            style={{
                              opacity:
                                selectedRowsRecordRound.length === 0 ? 0.5 : 1,
                              pointerEvents:
                                selectedRowsRecordRound.length === 0
                                  ? "none"
                                  : "auto",
                            }}
                          >
                            <FaShareAlt style={{ fontSize: "14px" }} />
                            Share Report
                          </Button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end my-2 p-0">
                        <input
                          type="search"
                          placeholder="Search Here..."
                          className="form-control"
                          value={searchTextRecordRound}
                          onChange={(e) =>
                            setSearchTextRecordRound(e.target.value)
                          }
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
                          columns={columnsRecordRound}
                          className="datatb-report"
                          data={filteredDataRecordRound}
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
          records={selectedRows}
          allinvestor={allinvestor}
          returnrefresh={returnrefresh}
        />
      )}
      {/*Dataroom*/}
      {IsModalOpenShareReportDataroom && (
        <InvestorShareReport
          onClose={() => setIsModalOpenShareReportDataroom(false)}
          records={selectedRowsDataroom}
          allinvestor={allinvestor}
          returnrefresh={returnrefresh}
        />
      )}
      {IsModalOpenShareRecordRound && (
        <InvestorShareReportRecordRound
          onClose={() => setIsModalOpenShareRecordRound(false)}
          records={selectedRowsRecordRound}
          allinvestor={allinvestor}
          returnrefresh={returnrefresh}
        />
      )}

      {ViewRecordRounds && (
        <ViewRecordRound
          onClose={() => setViewRecordRounds(false)}
          recordViewData={recordViewData}
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
