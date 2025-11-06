import React, { useState, useEffect } from "react";
import TopBar from "../../../components/Users/TopBar";
import DataTable from "react-data-table-component";
import MainHeader from "../../../components/Users/MainHeader.js";
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import { DataRoomSection } from "../../../components/Styles/DataRoomStyle.js";
import { FaDownload } from "react-icons/fa"; // FontAwesome icons
import axios from "axios";
import InvestorShareReport from "../../../components/Users/popup/InvestorShareReport.jsx";
export default function InvestorDocsshareView() {
  const [stdata, setData] = useState([]);
  const storedUsername = localStorage.getItem("CompanyLoginData");
  const userLogin = JSON.parse(storedUsername);
  const [records, setrecords] = useState([]);
  const [recordsSecond, setrecordsSecond] = useState([]);
  const [IsModalOpenShareReport, setIsModalOpenShareReport] = useState(false);
  var apiURLINFile = "http://localhost:5000/api/user/investorreport/";
  const [checkval, setcheckval] = useState(false);
  const [checkvalSecond, setcheckvalSecond] = useState(false);
  const handleCheckboxChange = (id) => {
    const updatedData = records.map((row) => {
      if (row.investor_updates_id === id) {
        return { ...row, shared: !row.shared };
      }
      return row;
    });

    setrecords(updatedData);
    const anySelected = updatedData.some((row) => row.shared === true);
    setcheckval(anySelected);
  };
  useEffect(() => {
    getInvestorReport();
  }, []);
  const getInvestorReport = async () => {
    const formData = {
      user_id: userLogin.id,
    };
    try {
      const generateRes = await axios.post(
        apiURLINFile + "getInvestorReportViewed",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(generateRes.data.results);

      const filteredRecordsFirst = generateRes.data.results.filter(
        (item) => item.report_type === "Investor updates"
      );
      const filteredRecordsSecond = generateRes.data.results.filter(
        (item) => item.report_type === "Due Diligence Document"
      );

      setrecords(filteredRecordsFirst);
      setrecordsSecond(filteredRecordsSecond);
    } catch (err) {
      console.error("Error generating summary", err);
    }
    //  Optionally, call AI Summary API here
  };
  function formatCurrentDate(input) {
    const date = new Date(input); // ✅ Convert input to Date

    if (isNaN(date)) return ""; // ⛔ Invalid date check

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
  const columns = [
    {
      name: "Name of Report",
      selector: (row) => row.document_name,
      sortable: true,
    },
    {
      name: "Date of Report",
      selector: (row) => formatCurrentDate(row.date_report),
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
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Date Viewed",
      selector: (row) =>
        row.date_view !== null && row.date_view !== "null"
          ? formatCurrentDate(row.date_view)
          : "Not Viewed",
      sortable: true,
    },
    {
      name: "Ip Address",
      selector: (row) => row.investor_ip,
      sortable: true,
    },
    {
      name: "Export List",
      selector: (row) => (
        <input
          type="checkbox"
          checked={row.shared}
          onChange={() => handleCheckboxChange(row.investor_updates_id)}
        />
      ),
      sortable: false, // sorting typically doesn't work on custom render like checkbox
      ignoreRowClick: true, // important to prevent row selection on checkbox click
      allowOverflow: true,
      center: true,
    },
  ];
  const handleDownload = async () => {
    const payload = {
      user_id: userLogin.id,
      update_id: records.map((r) => r.investor_updates_id), // the investor_updates_id you want to export
    };
    const response = await axios.post(
      apiURLINFile + "exportInvestorExcel",
      payload,
      {
        responseType: "blob", // important for file download
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "investor_report.xlsx");
    document.body.appendChild(link);
    link.click();
  };
  const handleDownloadsecond = async () => {
    const payload = {
      user_id: userLogin.id,
      update_id: recordsSecond.map((r) => r.investor_updates_id), // the investor_updates_id you want to export
    };

    const response = await axios.post(
      apiURLINFile + "exportInvestorExcel",
      payload,
      {
        responseType: "blob", // important for file download
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "investor_report.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  const customStyles = {
    table: {
      style: {
        minWidth: "100%",
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        overflow: "hidden",
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
        overflow: "hidden",
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

  const [searchText, setSearchText] = useState("");

  // Filter data by nameofreport (case insensitive)
  const filteredData = records.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      (item.document_name || "").toLowerCase().includes(search) ||
      formatCurrentDate(item.created_at).toLowerCase().includes(search) ||
      (item.download || "").toLowerCase().includes(search)
    );
  });
  //handle Share Report

  const returnrefresh = () => {
    setIsModalOpenShareReport(false);
  };
  //handle Share Report

  //Second table
  const filteredDataSecond = recordsSecond.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      (item.document_name || "").toLowerCase().includes(search) ||
      formatCurrentDate(item.created_at).toLowerCase().includes(search) ||
      (item.download || "").toLowerCase().includes(search)
    );
  });
  const columnsSecond = [
    {
      name: "Name of Report",
      selector: (row) => row.document_name,
      sortable: true,
    },
    {
      name: "Date of Report",
      selector: (row) => formatCurrentDate(row.date_report),
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
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Date Viewed",
      selector: (row) =>
        row.date_view !== null && row.date_view !== "null"
          ? formatCurrentDate(row.date_view)
          : "Not Viewed",
      sortable: true,
    },
    {
      name: "Ip Address",
      selector: (row) => row.investor_ip,
      sortable: true,
    },
    {
      name: "Export List",
      selector: (row) => (
        <input
          type="checkbox"
          checked={row.shared}
          onChange={() => handleCheckboxChangeSecond(row.investor_updates_id)}
        />
      ),
      sortable: false, // sorting typically doesn't work on custom render like checkbox
      ignoreRowClick: true, // important to prevent row selection on checkbox click
      allowOverflow: true,
      center: true,
    },
  ];
  const handleCheckboxChangeSecond = (id) => {
    const updatedData = recordsSecond.map((row) => {
      if (row.investor_updates_id === id) {
        return { ...row, shared: !row.shared };
      }
      return row;
    });

    setrecordsSecond(updatedData);
    const anySelected = updatedData.some((row) => row.shared === true);
    setcheckvalSecond(anySelected);
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <Wrapper>
        <div className="fullpage d-block">
          <div className="d-flex align-items-start gap-0">
            <ModuleSideNav
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <div
              className={`global_view ${isCollapsed ? "global_view_col" : ""}`}
            >
              <TopBar />
              <SectionWrapper className="d-block p-md-4 p-3">
                <div className="container-fluid">
                  <DataRoomSection className="d-flex flex-column gap-4">
                    <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                      <h4 className="mainh1">Your Investor Report: VIEWS</h4>
                    </div>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center p-0">
                        <p>
                          Investor Update Report
                          {/* Investor Update Report: Name of Report, Date of Report */}
                        </p>
                        <button
                          disabled={!checkval}
                          type="button"
                          onClick={() => handleDownload()}
                          rel="noopener noreferrer"
                          className="icon_check"
                          title="Download"
                        >
                          <FaDownload />
                        </button>
                      </div>
                      <div className="d-flex flex-column justify-content-between align-items-start">
                        <DataTable
                          customStyles={customStyles}
                          className="scroll_bar"
                          columns={columns}
                          data={filteredData}
                          pagination
                          highlightOnHover
                          striped
                          responsive
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center p-0">
                        <p>
                          Due Diligence Document
                          {/* Investor Update Report: Name of Report, Date of Report */}
                        </p>
                        <button
                          disabled={!checkvalSecond}
                          type="button"
                          onClick={() => handleDownloadsecond()}
                          rel="noopener noreferrer"
                          className="icon_check"
                          title="Download"
                        >
                          <FaDownload />
                        </button>
                      </div>
                      <div className="d-flex flex-column justify-content-between align-items-start">
                        <DataTable
                          customStyles={customStyles}
                          columns={columnsSecond}
                          data={filteredDataSecond}
                          pagination
                          highlightOnHover
                          striped
                          responsive
                        />
                      </div>
                    </div>
                  </DataRoomSection>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </Wrapper>

      {IsModalOpenShareReport && (
        <InvestorShareReport
          onClose={() => setIsModalOpenShareReport(false)}
          records={records}
          returnrefresh={returnrefresh}
        />
      )}
    </>
  );
}
