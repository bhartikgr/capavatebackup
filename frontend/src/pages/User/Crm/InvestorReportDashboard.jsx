import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TopBar from "../../../components/Users/TopBar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Stepblock,
  SectionWrapper,
  Titletext,
  Wrapper,
} from "../../../components/Styles/RegisterStyles";
import ModuleSideNav from "../../../components/Users/ModuleSideNav";
import { MdAutoGraph } from "react-icons/md";

import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function InvestorReportDashboard() {
  const [dashboardData] = useState({
    equity: {
      totalShares: "10,000,000",
      optionPool: "15%",
      investorStakes: "62%",
      valuation: "$25M",
    },

    shareholders: {
      labels: [
        "Founders",
        "Series A Investors",
        "Series B Investors",
        "Option Pool",
        "Employees",
      ],
      data: [35, 25, 20, 15, 5],
      colors: [
        "#081828",
        "#092f4e",
        "#10395c",
        "#1a588d",
        "#2577bd",
        "#2577bd",
      ],
    },

    openRound: {
      type: "Series B",
      target: "$8M",
      raised: "$5.2M",
      preMoney: "$22M",
      closeDate: "Dec 15, 2023",
    },

    investors: {
      total: 24,
      contacts: 42,
      messages: [
        {
          name: "John Smith",
          firm: "VC Partners",
          message: "When will the next report be available?",
          time: "2h ago",
        },
        {
          name: "Sarah Johnson",
          firm: "Capital Growth",
          message: "Request for additional metrics...",
          time: "1d ago",
        },
      ],
    },

    dataRoom: {
      completion: 78,
      recentUploads: [
        {
          name: "Financials Q3 2023",
          description: "Updated projections",
          time: "Today",
        },
        {
          name: "Cap Table",
          description: "Latest revision",
          time: "Yesterday",
        },
      ],
    },

    accessLogs: [
      {
        name: "David Wilson",
        action: "Viewed Financial Reports",
        time: "Today, 4:00 PM",
      },
      {
        name: "Emily Chen",
        action: "Downloaded Cap Table",
        time: "Today, 5:00 PM",
      },
      {
        name: "Michael Brown",
        action: "Viewed Pitch Deck",
        time: "Yesterday, 10:00 AM",
      },
    ],
  });

  // Dilution forecast data
  const dilutionData = {
    labels: ["Current", "After Series B", "After Series C"],
    datasets: [
      {
        label: "Founders",
        data: [35, 28, 22],
        backgroundColor: "#081828",
      },

      {
        label: "Series A",
        data: [25, 20, 16],
        backgroundColor: "#092f4e",
      },
      {
        label: "Series B",
        data: [0, 20, 16],
        backgroundColor: "#10395c",
      },
      {
        label: "Option Pool",
        data: [15, 15, 15],
        backgroundColor: "#1a588d",
      },
      {
        label: "Employees",
        data: [5, 5, 5],
        backgroundColor: "#2577bd",
      },
      {
        label: "Series C",
        data: [0, 0, 15],
        backgroundColor: "#2a85d3",
      },
    ],
  };

  const dilutionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ownership Distribution Forecast",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  const shareholderData = {
    labels: dashboardData.shareholders.labels,
    datasets: [
      {
        data: dashboardData.shareholders.data,
        backgroundColor: dashboardData.shareholders.colors,
        borderWidth: 0,
      },
    ],
  };

  const shareholderOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  useEffect(() => {
    document.title = "Dashboard Page";
  }, []);

  return (
    <>
      <Wrapper>
        <div className="fullpage d-block">
          <div className="d-flex align-items-start gap-0">
            <ModuleSideNav />
            <div className="global_view">
              <TopBar />
              <SectionWrapper className="d-block p-md-4 p-3">
                <div className="container-fluid">
                  <Stepblock id="step5">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="pb-3 bar_design">
                          <h4 className="h5 mb-0">Dashboard History</h4>
                        </div>

                        <div class="row gap-0 dashboard-top">
                          <div class="col-6 col-md-3 p-0 bor">
                            <div class="p-3">
                              <p class="small fw-medium mb-1">Total Shares</p>
                              <div className="d-flex align-items-center gap-3 justify-content-between">
                                <p class="h4 fw-semibold mb-0">
                                  {dashboardData.equity.totalShares}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div class="col-6 col-md-3 p-0 bor">
                            <div class="p-3">
                              <p class="small fw-medium mb-1">
                                Total Reports Shared
                              </p>
                              <div className="d-flex align-items-center gap-3 justify-content-between">
                                <p class="h4 fw-semibold mb-0">
                                  {dashboardData.equity.totalShares}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-6 col-md-3 p-0 bor">
                            <div class="p-3">
                              <p class="small fw-medium mb-1">
                                Total Document Shared
                              </p>
                              <div className="d-flex align-items-center gap-3 justify-content-between">
                                <p class="h4 fw-semibold mb-0">
                                  {dashboardData.equity.totalShares}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div class="col-6 col-md-3 p-0 bor">
                            <div class="p-3">
                              <p class="small fw-medium mb-1">
                                Investor Stakes
                              </p>
                              <p class="h4 fw-semibold mb-0">
                                {dashboardData.equity.investorStakes}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 my-4">
                        <div class="dashboard_card  modern-chart">
                          <div class="card-header">
                            <h3 class="card-title">Open Round Info</h3>
                          </div>

                          <div class="info-section">
                            <div class="info-item">
                              <div class="info-label">Round Type</div>

                              <div class="info-value">
                                {dashboardData.openRound.type}
                              </div>
                            </div>

                            <div class="info-item">
                              <div class="info-label">Target Raise</div>
                              <div class="info-value">
                                {dashboardData.openRound.target}
                              </div>
                            </div>

                            <div class="info-item">
                              <div class="info-label">Raised to Date</div>
                              <div class="info-value">
                                {" "}
                                {dashboardData.openRound.raised}
                              </div>
                            </div>

                            <div class="info-item">
                              <div class="info-label">Pre-money Valuation</div>
                              <div class="info-value">
                                {" "}
                                {dashboardData.openRound.preMoney}
                              </div>
                            </div>

                            <div class="info-item">
                              <div class="info-label">Expected Close</div>
                              <div class="info-value">
                                {" "}
                                {dashboardData.openRound.closeDate}
                              </div>
                            </div>
                          </div>

                          <div class="progress-container">
                            <div class="progress-info">
                              <div class="progress-label">
                                Fundraising Progress
                              </div>
                              <div class="progress-value">65%</div>
                            </div>
                            <div class="progress-bar">
                              <div
                                class="progress-fill"
                                style={{ width: "65%" }}
                              ></div>
                            </div>
                          </div>

                          <div class="access-logs">
                            <h4 class="section-title">Access Logs</h4>

                            <table class="log-table">
                              <thead>
                                <tr>
                                  <th>User</th>
                                  <th>Action</th>
                                  <th>Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {dashboardData.accessLogs.map((log, index) => (
                                  <tr key={index}>
                                    <td className="">
                                      <small className="">{log.name}</small>
                                    </td>
                                    <td className="">
                                      <small className="">{log.action}</small>
                                    </td>
                                    <td className="">
                                      <small>{log.time}</small>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="mb-5 bar_design">
                        <h4 className="h5 mb-3">Dilution Forecast</h4>

                        <div className="barchart modern-chart">
                          <Bar data={dilutionData} options={dilutionOptions} />
                        </div>
                      </div>

                      <div class="dashboard-grid">
                        <div class="dashboard_card modern-chart">
                          <div class="card-header">
                            <h3 class="card-title">Shareholder Breakdown</h3>
                          </div>
                          <div className="h-100 d-flex justify-content-center align-items-center">
                            <div class="chart-container  mb-4">
                              <Pie
                                data={shareholderData}
                                options={shareholderOptions}
                              />
                            </div>
                          </div>
                        </div>

                        <div class="dashboard_card  modern-chart">
                          <div class="card-header">
                            <h3 class="card-title">Investor Reporting</h3>
                          </div>

                          <div class="stats-grid">
                            <div class="stat-card">
                              <div class="stat-label">Total Investors</div>
                              <div class="stat-value">24</div>
                            </div>
                            <div class="stat-card">
                              <div class="stat-label">Investor Contacts</div>
                              <div class="stat-value">42</div>
                            </div>
                          </div>

                          <div class="messages-section">
                            <h4 class="section-title">
                              Messages From Investors
                            </h4>

                            <div class="message-item">
                              <div class="message-content">
                                <div class="message-header">
                                  <div class="message-sender">John Smith</div>
                                  <div class="message-time">2h ago</div>
                                </div>
                                <div class="message-firm">VC Partners</div>
                                <div class="message-text">
                                  When will the next report be available?
                                </div>
                              </div>
                            </div>

                            <div class="message-item">
                              <div class="message-content">
                                <div class="message-header">
                                  <div class="message-sender">
                                    Sarah Johnson
                                  </div>
                                  <div class="message-time">1d ago</div>
                                </div>
                                <div class="message-firm">Capital Growth</div>
                                <div class="message-text">
                                  Request for additional metrics...
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="access-logs">
                            <h4 class="section-title">Access Logs</h4>

                            <table class="log-table">
                              <thead>
                                <tr>
                                  <th>User</th>
                                  <th>Action</th>
                                  <th>Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {dashboardData.accessLogs.map((log, index) => (
                                  <tr key={index}>
                                    <td className="">
                                      <small className="">{log.name}</small>
                                    </td>
                                    <td className="">
                                      <small className="">{log.action}</small>
                                    </td>
                                    <td className="">
                                      <small>{log.time}</small>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 mt-4">
                        <div class="dashboard_card  modern-chart">
                          <div class="card-header mb-5">
                            <h3 class="card-title">Data Room Status</h3>
                          </div>

                          <div class="progress-container">
                            <div class="progress-info">
                              <div class="progress-label">
                                Completion Status
                              </div>
                              <div class="progress-value">
                                {dashboardData.dataRoom.completion}%
                              </div>
                            </div>
                            <div class="progress-bar">
                              <div
                                class="progress-fill"
                                style={{
                                  width: `${dashboardData.dataRoom.completion}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <div class="info-section">
                            <div class="info-item d-flex flex-column gap-2 w-100">
                              <h4 class="section-title w-100 text-start">
                                {" "}
                                Recent Uploadss
                              </h4>
                              <div class="info-value w-100">
                                <ul className="list-group list-group-flush">
                                  {dashboardData.dataRoom.recentUploads.map(
                                    (upload, index) => (
                                      <li
                                        key={index}
                                        className="list-group-item py-3"
                                      >
                                        <div className="d-flex flex-column">
                                          <div className="d-flex justify-content-between align-items-center mb-1">
                                            <h5 className="mb-0 small fw-medium">
                                              {upload.name}
                                            </h5>
                                            <small className="text-muted">
                                              {upload.time}
                                            </small>
                                          </div>
                                          <small className="text-muted">
                                            {upload.description}
                                          </small>
                                        </div>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div class="access-logs">
                            <h4 class="section-title">Access Logs</h4>

                            <table class="log-table">
                              <thead>
                                <tr>
                                  <th>User</th>
                                  <th>Action</th>
                                  <th>Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {dashboardData.accessLogs.map((log, index) => (
                                  <tr key={index}>
                                    <td className="">
                                      <small className="">{log.name}</small>
                                    </td>
                                    <td className="">
                                      <small className="">{log.action}</small>
                                    </td>
                                    <td className="">
                                      <small>{log.time}</small>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Stepblock>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
