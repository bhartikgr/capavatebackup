import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function TopBar() {
  const [showPopup, setShowPopup] = useState(false)
  const navigate = useNavigate();
  var apiURLAiFile = "https://capavate.com/api/user/aifile/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [ShowPopupRole, setShowPopupRole] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  useEffect(() => {
    const storedData = localStorage.getItem("InvestorData");
    if (!storedData) {
      navigate("/investor/login", { replace: true });
      return;
    }

    try {
      const userLogin = JSON.parse(storedData);

      if (!userLogin || typeof userLogin !== "object") {
        localStorage.removeItem("InvestorData");
        navigate("/investor/login", { replace: true });
        return;
      }

      const currentTime = new Date().getTime();
      if (!userLogin.expiry || currentTime > userLogin.expiry) {
        localStorage.removeItem("InvestorData");
        navigate("/investor/login", { replace: true });
        return;
      }


    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("InvestorData");
      navigate("/investor/login", { replace: true });
    }
  }, [navigate]);
  const dateformate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };
  const handleClosepayPopup = () => {
    setShowPopup(false);
    setShowPopupRole(false);
    setShowPopupRolePermission(false);
  };
  const [creditBalanceData, setcreditBalanceData] = useState("");
  const [CompanyRole, setCompanyRole] = useState(null);
  const [ShowPopupRolePermission, setShowPopupRolePermission] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("InvestorData");
    window.location.href = "/investor/login";
  };
  const handleClickRole = async () => {
    const storedUsername = localStorage.getItem("InvestorData");
    const userLogin = JSON.parse(storedUsername);
    let formData = {
      company_id: userLogin.companies[0].id,
      role_id: userLogin.id,
    };
    if (userLogin.role === "owner") {
      // setShowPopupRolePermission(true);
      //setCompanyRole("Company Owner");
    } else {
      try {
        const res = await axios.post(apiURLAiFile + "companyRole", formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        setShowPopupRolePermission(true);
        if (res.data.results.length > 0) {
          setCompanyRole(res.data.results[0].signature_role);
        }
      } catch (err) { }
    }
  };
  const handleClickYourRolePermission = () => {
    const storedUsername = localStorage.getItem("InvestorData");
    const userLogin = JSON.parse(storedUsername);
    setShowPopupRole(true);
    if (userLogin.role === "owner") {
      setCompanyRole("Company Owner");
    } else {
      setCompanyRole(
        userLogin.role.charAt(0).toUpperCase() + userLogin.role.slice(1)
      );
    }
  };
  return (
    <div className='top_bar px-md-3'>
      <div className='container-fluid'>
        <div className=' position-relative'>
          <div className='d-flex align-items-center justify-content-between gap-3 flex-wrap'>
            <div className='d-flex align-items-center gap-3'>
              <Link to='/investor/dashboard' className='py-2 su-creditb'>
                Dashboard HOME
              </Link>
            </div>
            <div className='d-flex align-items-center justify-content-md-end gap-3 flex-wrap'>


              <button
                type="button" onClick={handleLogout}
                title='Logout'
                className='logout_btn_global flex-shrink-0'
              >
                <LogOut size={20} strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && creditBalanceData && (
        <div className="main_popup-overlay">
          <div className="popup-container" style={{ maxWidth: "400px" }}>
            <div className="d-flex align-items-center gap-3 mb-3 justify-content-between">
              <h2 className="popup-title">Subscription Status</h2>
              <button
                type="button"
                className="close_btn_global"
                onClick={handleClosepayPopup}
                aria-label="Close"
              >
                <IoCloseCircleOutline size={24} />
              </button>
            </div>

            {/* ✅ Status Badge based on type */}
            {creditBalanceData.type === 2 ? (
              // ❌ No Subscription - RED
              <div
                onClick={() => navigate("/package-subscription")}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginBottom: "15px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(220, 53, 69, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#bd2130";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#dc3545";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div>Please Activate Account</div>
                <small
                  style={{
                    fontSize: "14px",
                    opacity: "0.9",
                    marginTop: "8px",
                    display: "block",
                  }}
                >
                  Click here to subscribe
                </small>
              </div>
            ) : (
              // ✅ Active Subscription - GREEN
              <>
                <div
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginBottom: "15px",
                  }}
                >
                  Active Subscription
                </div>

                {/* Subscription Details */}
                <ul className="popup-list">
                  <li>
                    Access to Dataroom + Investor reporting for 1 year (till{" "}
                    <strong>
                      {dateformate(creditBalanceData.valid_until)}
                    </strong>
                    )
                  </li>
                  <li>
                    Due diligence documents generated:{" "}
                    <strong>{creditBalanceData.total_generated}</strong> / 2
                    allowed
                  </li>
                  <li>
                    Credit Balance Left:{" "}
                    <strong>{creditBalanceData.credit_balance}</strong>
                  </li>
                  {creditBalanceData.extra_generations > 0 && (
                    <li className="warn">
                      <strong>
                        {creditBalanceData.extra_generations} additional
                        generation(s) will incur €100 each
                      </strong>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
      {ShowPopupRole && (
        <div className="main_popup-overlay">
          <div className="popup-container">
            <div className="d-flex align-items-center gap-3  justify-content-between">
              <h2 className="popup-title">Your Role/Permission</h2>
              <button
                type="button"
                className="close_btn_global"
                onClick={handleClosepayPopup}
                aria-label="Close"
              >
                <IoCloseCircleOutline size={24} />
              </button>
            </div>

            <ul className="popup-list">
              <li>
                <Link onClick={handleClickRole} to="javascript:void(0)">
                  {CompanyRole}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {ShowPopupRolePermission && (
        <div className="main_popup-overlay">
          <div className="popup-container">
            <div className="d-flex align-items-center gap-3 justify-content-between">
              <h2 className="popup-title">Your Role</h2>
              <button
                type="button"
                className="close_btn_global"
                onClick={handleClosepayPopup}
                aria-label="Close"
              >
                <IoCloseCircleOutline size={24} />
              </button>
            </div>

            <ul className="popup-list">
              <li onClick={handleClickRole}>{CompanyRole}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default TopBar
