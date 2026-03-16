import React, { useState, useEffect } from "react";
import {
  Stepblock,
  SectionWrapper,
  Wrapper,
} from "../../components/Styles/RegisterStyles";
import axios from "axios";




import SideBar from '../../components/Investor/social/SideBar';
import TopBar from '../../components/Investor/social/TopBar';
import MessagesShareholders from '../../components/Investor/social/MessagesShareholders';
import EquitySnapshot from '../../components/Investor/social/EquitySnapshot';
import PostSearch from '../../components/Investor/social/PostSearch';
import SocialPosts from '../../components/Investor/social/SocialPosts';
import InvestorReports from '../../components/Investor/social/InvestorReports';
import TBDSuggestions from '../../components/Investor/social/TBDSuggestions.jsx';
import RoundStatistics from '../../components/Investor/social/RoundStatistics';
function Dashboard() {
  const [totalCompany, setTotalCompany] = useState(0); // initial value
  const [totalCompanyshares, settotalCompanyshares] = useState(0); // initial value
  const [totalissuedshares, settotalissuedshares] = useState(0);
  const [totalround, settotalround] = useState(0);
  const [latestinvestorReport, setlatestinvestorReport] = useState([]);
  const [latestinvestorReportDataroom, setlatestinvestorReportDataroom] =
    useState([]);
  const [roundRecordlatest, setroundRecordlatest] = useState([]);
  const [TotalInvestorReport, setTotalInvestorReport] = useState("");
  const [TotalDataroomReport, setTotalDataroomReport] = useState("");
  const storedUsername = localStorage.getItem("InvestorData");
  const userLogin = JSON.parse(storedUsername);
  var apiURL = "http://localhost:5000/api/user/capitalround/";
  document.title = "Investor Dashboard Page";
  useEffect(() => {
    getTotalcompany();
    getTotalCompanyIssuedShared();
    getlatestinvestorreport();
    getlatestinvestorDataroom();
    getTotalInvestorReport();
    getTotalDataroomsReport();
  }, []);
  const getTotalcompany = async () => {
    let formData = {
      investor_id: userLogin.id,
    };
    try {
      const res = await axios.post(apiURL + "getTotalcompany", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setTotalCompany(res.data.results.length);

      if (res.data.results.length > 0) {
        var companies = res.data.results;
        // Calculate total shares
        const totalShares = companies.reduce((sum, company) => {
          // Make sure it's a number
          const shares = Number(0);
          return sum + shares;
        }, 0);

        //settotalCompanyshares(totalShares); // Store in state
      }
    } catch (err) { }
  };
  const getTotalInvestorReport = async () => {
    let formData = {
      investor_id: userLogin.id,
      type: "Investor updates",
    };
    try {
      const res = await axios.post(
        apiURL + "getTotalInvestorReport",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setTotalInvestorReport(res.data.results.totalCount);
    } catch (err) { }
  };
  const getTotalDataroomsReport = async () => {
    let formData = {
      investor_id: userLogin.id,
      type: "Due Diligence Document",
    };
    try {
      const res = await axios.post(
        apiURL + "getTotalInvestorReport",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setTotalDataroomReport(res.data.results.length);
    } catch (err) { }
  };
  const getTotalCompanyIssuedShared = async () => {
    let formData = {
      investor_id: userLogin.id,
    };
    try {
      const res = await axios.post(
        apiURL + "getTotalCompanyIssuedShared",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      var data = res.data.results;
      settotalCompanyshares(data.totalRoundSize);
      settotalissuedshares(data.totalIssuedShares);
      settotalround(data.totalRounds);
    } catch (err) { }
  };
  const getlatestinvestorreport = async () => {
    let formData = {
      investor_id: userLogin.id,
      type: "Investor updates",
    };
    try {
      const res = await axios.post(
        apiURL + "getlatestinvestorreport",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      var data = res.data.results;

      setlatestinvestorReport(data);
    } catch (err) { }
  };
  const getlatestinvestorDataroom = async () => {
    let formData = {
      investor_id: userLogin.id,
      type: "Due Diligence Document",
    };
    try {
      const res = await axios.post(
        apiURL + "getlatestinvestorDataroom",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      var data = res.data.results;

      setlatestinvestorReportDataroom(data);
    } catch (err) { }
  };
  useEffect(() => {
    getInvestorCapitalMotionlistLatest();
  }, []);
  const getInvestorCapitalMotionlistLatest = async () => {
    let formData = {
      investor_id: userLogin.id,
    };
    try {
      const res = await axios.post(
        apiURL + "getInvestorCapitalMotionlistLatest",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setroundRecordlatest(res.data.results);
    } catch (err) { }
  };
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

  const [isCollapsed, setIsCollapsed] = useState(false);
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
  return (
    <main>
      <div className='d-flex align-items-start gap-0'>
        <SideBar />
        <div className='d-flex flex-grow-1 flex-column gap-0'>
          <TopBar />
          <section className='px-md-3 py-4'>
            <div className='container-fluid'>
              <div className='row gy-4'>
                <div className='col-md-8 order-1 order-md-0'>
                  <div className='row'>
                    <div class='col-md-12'>
                      <div className='d-flex flex-column gap-5 social_h'>
                        {/* <EquitySnapshot /> */}

                        <MessagesShareholders />
                        <div className='d-flex flex-column gap-4'>
                          <PostSearch />
                          <SocialPosts />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-4 order-0 order-md-1'>
                  <div className='d-flex flex-column gap-4 social-right scroll_nonw '>
                    <InvestorReports />
                    {/* <RoundStatistics /> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
