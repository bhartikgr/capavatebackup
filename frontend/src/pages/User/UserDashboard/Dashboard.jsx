import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TopBar from "../../../components/Users/UserDashboard/TopBar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Stepblock,
  SectionWrapper,
  Titletext,
  Wrapper,
} from "../../../components/Styles/RegisterStyles";
import ModuleSideNav from "../../../components/Users/UserDashboard/ModuleSideNav";
import { Eye, EyeOff, Lock, User } from "lucide-react";
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
import axios from "axios";
import { Modal, Button, Input, Form, Spin } from "antd";
import { useNavigate } from "react-router-dom";
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

export default function Dashboard() {
  const navigate = useNavigate();
  const apiUrlCompany = "https://capavate.com/api/user/company/";
  const apiUrlDashbaord = "https://capavate.com/api/user/dashboard/";
  const storedUsername = localStorage.getItem("OwnerLoginData");
  const userLogin = JSON.parse(storedUsername);
  const [companyData, setCompanyData] = useState([]);
  const [lastestactivitySignatory, setlastestactivitySignatory] = useState([]);
  const [lastestactivityInvestor, setlastestactivityInvestor] = useState([]);
  const [companyId, setcompanyId] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [OwnerData, setOwnerData] = useState("");
  const [spinners, setSpinners] = useState({});
  const [errr, seterrr] = useState(false);
  const [dangerMessage, setdangerMessage] = useState("");
  useEffect(() => {
    document.title = "Dashboard Page";
  }, []);
  useEffect(() => {
    getUserCompany();
  }, []);
  useEffect(() => {
    getUserOwnerDetail();
  }, []);
  const getUserOwnerDetail = async () => {
    const formData = {
      user_id: userLogin.id,
    };
    try {
      const resp = await axios.post(
        apiUrlCompany + "getUserOwnerDetail",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.data.results.length > 0) {
        setOwnerData(resp.data.results[0]);
      }
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  const getUserCompany = async () => {
    const formData = {
      user_id: userLogin.id,
    };
    try {
      const resp = await axios.post(
        apiUrlCompany + "getUserCompany",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(resp.data.results);
      if (resp.data.results.length > 0) {
        setcompanyId(resp.data.results[0].id);
        setCompanyName(resp.data.results[0].company_name);
      }
      setCompanyData(resp.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  const apiURL_Access = "https://capavate.com/api/user/accesslogs/";
  useEffect(() => {
    if (companyId) {
      getSignatoryActivity();
    }
  }, [companyId]);
  const getSignatoryActivity = async () => {
    const formData = {
      company_id: companyId,
    };
    try {
      const generateRes = await axios.post(
        apiURL_Access + "getCompanyLogs",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setlastestactivitySignatory(generateRes.data.results);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  const handlegetCompanyRecord = async (corpId, comp_name) => {
    setCompanyName(comp_name);
    setcompanyId(corpId);
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

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12

    return `${month} ${day}${getOrdinal(
      day
    )}, ${year} ${hours}:${minutes} ${ampm}`;
  }
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [company_Id, setCompany_Id] = useState(null);
  const [company_Name, setCompany_Name] = useState("");
  const handleSubmit = async () => {
    const payload = { ...formData, company_id: company_Id };
    try {
      const generateRes = await axios.post(
        apiUrlDashbaord + "getCompanyAccess",
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const dataresp = generateRes.data;
      setdangerMessage(dataresp.message);

      if (dataresp.status === "1") {
        // 🔹 Remove any old login data
        localStorage.removeItem("SignatoryLoginData");

        // 🔹 Prepare new user data with expiry & token
        const userData = {
          ...dataresp.user,
          access_token: dataresp.token,
          expiry: new Date().getTime() + 60 * 60 * 1000, // 1 hour expiry
        };
        // 🔹 Store to localStorage
        localStorage.setItem("SignatoryLoginData", JSON.stringify(userData));

        // 🔹 Redirect after short delay
        setTimeout(() => {
          window.open("/dashboard", "_blank");
          setShowModal(false);
        }, 1500);
      } else {
        seterrr(true);
      }

      // 🔹 Reset error message after delay
      setTimeout(() => {
        seterrr(false);
        setdangerMessage("");
      }, 3500);

      console.log("Response Data:", dataresp);
    } catch (err) {
      console.error("Login Error:", err);
      setdangerMessage("Something went wrong. Please try again.");
      seterrr(true);
      setTimeout(() => {
        seterrr(false);
        setdangerMessage("");
      }, 3500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAccessCompanyLogin = async (id, companyname) => {
    const formData = {
      company_id: id,
      user_id: userLogin.id, // example user id
    };
    try {
      const generateRes = await axios.post(
        apiUrlDashbaord + "getCompanyAccess",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const dataresp = generateRes.data;
      setdangerMessage(dataresp.message);

      if (dataresp.status === "1") {
        // 🔹 Remove any old login data
        localStorage.removeItem("SignatoryLoginData");

        // 🔹 Prepare new user data with expiry & token
        const userData = {
          ...dataresp.user,
          access_token: dataresp.token,
          expiry: new Date().getTime() + 60 * 60 * 1000, // 1 hour expiry
        };
        // 🔹 Store to localStorage
        localStorage.setItem("SignatoryLoginData", JSON.stringify(userData));

        // 🔹 Redirect after short delay
        setTimeout(() => {
          // Create anchor element
          const link = document.createElement('a');
          link.href = '/dashboard';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';

          // Append to body, click, and remove
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setShowModal(false);
        }, 1500);
      } else {
        seterrr(true);
      }

      // 🔹 Reset error message after delay
      setTimeout(() => {
        seterrr(false);
        setdangerMessage("");
      }, 3500);

      console.log("Response Data:", dataresp);
    } catch (err) {
      console.error("Login Error:", err);
      setdangerMessage("Something went wrong. Please try again.");
      seterrr(true);
      setTimeout(() => {
        seterrr(false);
        setdangerMessage("");
      }, 3500);
    }
  };
  const handleAccessCompany = async (id) => {
    const formData = {
      company_id: id,
      user_id: userLogin.id,
    };

    setSpinners((prev) => ({ ...prev, [id]: true })); // set spinner for this company

    setTimeout(async () => {
      try {
        const generateRes = await axios.post(
          apiUrlDashbaord + "getCompanyAccess",
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        var dataresp = generateRes.data;

        setSpinners((prev) => ({ ...prev, [id]: false })); // stop spinner for this company

        setdangerMessage(dataresp.message);
        if (dataresp.status === "1") {
          localStorage.removeItem("SignatoryLoginData");

          setTimeout(() => {
            var userData = dataresp.user;
            localStorage.setItem(
              "SignatoryLoginData",
              JSON.stringify(userData)
            );
            window.open("/dashboard", "_blank");
          }, 1500);
        } else {
          seterrr(true);
        }
        setTimeout(() => {
          seterrr(false);
          setdangerMessage("");
        }, 3500);

        console.log(generateRes.data);
      } catch (err) {
        console.error("Error generating summary", err);
        setSpinners((prev) => ({ ...prev, [id]: false })); // make sure spinner stops on error
      }
    }, 1000);
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
              {dangerMessage && (
                <div
                  className={`flex items-center justify-between gap-3 shadow-lg ${errr ? "error_pop" : "success_pop"
                    }`}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span className="d-block">{dangerMessage}</span>
                  </div>

                  <button
                    type="button"
                    className="close_btnCros"
                    onClick={() => setdangerMessage("")}
                  >
                    ×
                  </button>
                </div>
              )}
              <SectionWrapper className="d-block p-md-4 p-3">
                <div className="container-fluid">
                  <Stepblock id="step5">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="pb-3 bar_design">
                          <h4 className="h5 mb-0">
                            Welcome,{" "}
                            {OwnerData.first_name || OwnerData.last_name ? (
                              <>
                                {OwnerData.first_name} {OwnerData.last_name}
                              </>
                            ) : (
                              <span className="text-muted">
                                Name not available
                              </span>
                            )}
                          </h4>
                        </div>

                        <div class="row gap-0 dashboard-top p-0 border-0 bg-transparent">
                          <div className="row gy-3 ">
                            {companyData?.map((company, index) => (
                              <button
                                key={index}
                                type="button"
                                className="col-md-4 border-0 bg-transparent"
                              >
                                <div
                                  className="card_deisgn_register"
                                  style={{
                                    borderColor:
                                      company.company_color_code || "#ccc",
                                    backgroundColor:
                                      `${company.company_color_code}50` ||
                                      "#ffffff80",
                                  }}
                                >
                                  <h5
                                    className="text-center d-flex align-items-center gap-2"
                                    style={{
                                      backgroundColor:
                                        company.company_color_code || "#000",
                                      color: "#fff",
                                      padding: "10px 20px",
                                      borderRadius: "8px",
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    <input
                                      className="checkbox_global"
                                      name="company"
                                      checked={company.id === companyId}
                                      onChange={() =>
                                        handlegetCompanyRecord(
                                          company.id,
                                          company.company_name
                                        )
                                      }
                                      type="radio"
                                    />
                                    <span className="d-block text-start">
                                      {company.company_name}
                                    </span>
                                  </h5>
                                  <p
                                    onClick={() =>
                                      handleAccessCompanyLogin(
                                        company.id,
                                        company.company_name
                                      )
                                    }
                                    className="py-3 text-center mb-0"
                                    style={{
                                      fontSize: "0.9rem",
                                      fontWeight: "600",
                                      position: "relative", // make parent relative
                                      cursor: "pointer",
                                    }}
                                  >
                                    Access this account.
                                    {spinners[company.id] && (
                                      <div
                                        className="spinner-border spinneronetimepay"
                                        role="status"
                                        style={{
                                          position: "absolute",
                                          top: "60%",
                                          left: "42%",
                                          width: "1rem",
                                          height: "1rem",
                                        }}
                                      >
                                        <span className="visually-hidden"></span>
                                      </div>
                                    )}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 my-4">
                        <div class="dashboard_card  modern-chart">
                          <div class="card-header">
                            <h3 class="card-title">
                              Recent Activity Investor (Round)
                            </h3>
                          </div>

                          <div class="access-logs">
                            <h4 class="section-title">
                              Company ({CompanyName})
                            </h4>
                            <table class="log-table">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Action</th>
                                  <th>Status</th>
                                  <th>Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {companyData.length > 0 &&
                                  lastestactivityInvestor.length > 0 ? (
                                  lastestactivityInvestor.map(
                                    (activity, index) =>
                                      activity.access_status === "active" && (
                                        <tr>
                                          <td>
                                            <small>Test investor</small>
                                          </td>
                                          <td>
                                            <small> Seed A</small>
                                          </td>
                                          <td>
                                            <small> Download</small>
                                          </td>
                                          <td>
                                            <small>September 11th, 2025</small>
                                          </td>
                                        </tr>
                                      )
                                  )
                                ) : (
                                  <tr>
                                    <td
                                      colSpan="3"
                                      style={{ textAlign: "center" }}
                                    >
                                      No result found
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 my-4">
                        <div class="dashboard_card  modern-chart">
                          <div class="card-header">
                            <h3 class="card-title">
                              Recent Activity Signatory
                            </h3>
                          </div>

                          <div class="access-logs">
                            <h4 class="section-title">
                              Company ({CompanyName})
                            </h4>
                            <table className="log-table">
                              <thead>
                                <tr>
                                  <th>Signatory Name</th>
                                  <th>Module</th>
                                  <th>Action</th>
                                  <th>Entity Name / Details</th>
                                  <th>IP Address</th>
                                  <th>Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {lastestactivitySignatory.length > 0 ? (
                                  lastestactivitySignatory.map(
                                    (activity, index) => {
                                      // Safely parse details
                                      let details = activity.details;
                                      if (typeof details === "string") {
                                        try {
                                          details = JSON.parse(details);
                                        } catch (e) {
                                          details = {};
                                        }
                                      }

                                      return (
                                        <tr key={index}>
                                          <td>
                                            <small>
                                              {activity.signatory_first_name}{" "}
                                              {activity.signatory_last_name}
                                            </small>
                                          </td>
                                          <td>
                                            <small>{activity.module}</small>
                                          </td>
                                          <td>
                                            <small>{activity.action}</small>
                                          </td>
                                          <td>
                                            <small>
                                              {activity.entity_type}
                                            </small>
                                          </td>
                                          <td>
                                            <small>{activity.ip_address}</small>
                                          </td>
                                          <td>
                                            <small>
                                              {formatCurrentDate(
                                                activity.created_at
                                              )}
                                            </small>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )
                                ) : (
                                  <tr>
                                    <td
                                      colSpan="5"
                                      style={{ textAlign: "center" }}
                                    >
                                      No result found
                                    </td>
                                  </tr>
                                )}
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
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        centered
        width={400}
      >
        <h2 className="text-xl font-semibold mb-1">
          Welcome {company_Name ? `to ${company_Name}` : ""}
        </h2>
        <p className="text-gray-500 mb-4">Please enter your login details</p>

        {/* Form */}
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          action="javascript:void(0)"
          method="post"
        >
          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              prefix={<User size={16} style={{ marginRight: 4 }} />}
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input
              prefix={<Lock size={16} style={{ marginRight: 4 }} />}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              suffix={
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", color: "#555" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </span>
              }
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="global_btn px-4 py-2 fn_size_sm active d-flex align-items-center gap-2"
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
