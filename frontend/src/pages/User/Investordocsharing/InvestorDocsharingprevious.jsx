import React, { useState, useEffect } from "react";
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
export default function InvestorDocsharingprevious() {
  const storedUsername = localStorage.getItem("CompanyLoginData");
  const userLogin = JSON.parse(storedUsername);
  const [records, setrecords] = useState([]);
  const [IsModalOpenShareReport, setIsModalOpenShareReport] = useState(false);
  var apiURLINFile = "http://localhost:5000/api/user/investorreport/";
  document.title = "Previous Version";
  useEffect(() => {
    getInvestorReport();
  }, []);
  const getInvestorReport = async () => {
    const formData = {
      user_id: userLogin.id,
    };
    try {
      const generateRes = await axios.post(
        apiURLINFile + "getInvestorReportprevious",
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
      name: "Report",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Date of Report",
      selector: (row) => formatCurrentDate(row.created_at),
      sortable: true,
    },
    {
      name: "Name of report",
      selector: (row) => row.document_name,
      sortable: true,
    },
    {
      name: "Download",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            type="button"
            onClick={() => handleDownload(row.downloadUrl)}
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-success fw-bold"
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
  const handleDownload = async (url) => {
    window.open(url, "_blank");
  };
  const data = [
    {
      id: 1,
      report: "Investor Updates / Reporting",
      dateofreport: "12-12-2025",
      nameofreport: "Investor Update v2",
      download: "Download 1",
    },
    {
      id: 2,
      report: "Due Diligence Document",
      dateofreport: "",
      nameofreport: "",
      download: "",
    },
    {
      id: 3,
      report: "Term Sheet",
      dateofreport: "",
      nameofreport: "",
      download: "",
    },
    {
      id: 4,
      report: "Subscription Documents",
      dateofreport: "",
      nameofreport: "",
      download: "",
    },
    {
      id: 5,
      report: "Dataroom",
      dateofreport: "",
      nameofreport: "",
      download: "",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontSize: "14px",
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

  const handleShareReport = () => {
    const selectedReports = records.filter((row) => row.shared === true);
    setIsModalOpenShareReport(true);
  };
  const returnrefresh = () => {
    setIsModalOpenShareReport(false);
  };
  //handle Share Report
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <Wrapper>
        <div className="fullpage d-block">
          <MainHeader />
          <SectionWrapper className="d-block py-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <ModuleSideNav
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                  />
                </div>
                <div className="col-md-9">
                  <DataRoomSection className="d-flex flex-column gap-2">
                    <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                      <h4>Investor Documents</h4>
                      {/* <div className="titleroom d-flex justify-content-between align-items-center border-bottom gap-3">
                        <button
                          type="button"
                          disabled={!checkval}
                          onClick={handleShareReport}
                          className="btn btn-outline-dark active"
                        >
                          Share Report
                        </button>
                        <Link to="#" className="btn btn-outline-dark active">
                          Add New Report
                        </Link>
                      </div> */}
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-0">
                      <h5>Previous Versions</h5>
                      <input
                        type="search"
                        placeholder="Search Here..."
                        className="form-control"
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
                    <div className="d-flex flex-column justify-content-between align-items-start">
                      <DataTable
                        customStyles={customStyles}
                        columns={columns}
                        data={filteredData}
                        pagination
                        highlightOnHover
                        striped
                        responsive
                      />
                    </div>
                  </DataRoomSection>
                </div>
              </div>
            </div>
          </SectionWrapper>
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
