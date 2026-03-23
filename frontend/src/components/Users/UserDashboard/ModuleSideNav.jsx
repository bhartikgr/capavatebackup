import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
  Tophead,
  Slan,
  CenterNav,
  MenuButtonWrapper,
  NavItem,
  NavList,
  NavContainer,
  DropdownToggle,
  DropdownMenu,
  Arrow,
} from "../../../components/Styles/MainHeadStyles";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { Globe, Menu } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { matchPath } from "react-router-dom";
import IPAddress from "../../IPAddress";
// Import React Icons
import {
  RiDashboardLine,
  RiFolderChartLine,
  RiSettingsLine,
  RiUserLine,
  RiBuilding2Line,
  RiVipCrownLine,
  RiVideoLine,
} from "react-icons/ri";
import { API_BASE_URL } from "../../../config/config";
import CompanyRegistrationPopup from "../Acknowledgement/CompanyRegistrationPopup";

const customActiveMap = [
  { path: "/crm/addnew-investor", menuHref: "/crm/investor-directory" },
  { path: "/crm/edit-investor/:id", menuHref: "/crm/investor-directory" },
  {
    path: "/crm/investor-report-detail-record-round/:id",
    menuHref: "/crm/investorreport",
  },
  {
    path: "/user/signatory/activity/:id/:signatory_id",
    menuHref: "/user/signatorylist",
  },
  {
    path: "/crm/investor-report-detail/:id",

    menuHref: "/crm/investorreport",
  },
  {
    path: "/crm/investor-report-detail-due-diligence/:id",

    menuHref: "/crm/investorreport",
  },
  {
    path: "/crm/investor-record-round-reports-confirm/:id",

    menuHref: "/crm/investorreport",
  },
  {
    path: "/edit-record-round/:id",

    menuHref: "/record-round-list",
  },
  {
    path: "/createrecord",

    menuHref: "/record-round-list",
  },
  // add more custom routes here
];

const getMappedMenuHref = (pathname) => {
  const matched = customActiveMap.find((route) =>
    matchPath({ path: route.path, end: true }, pathname)
  );
  return matched ? matched.menuHref : pathname;
};

export default function ModuleSideNav({
  isCollapsed: propIsCollapsed,
  setIsCollapsed: propSetIsCollapsed,
}) {
  const [userdataa, setuserdataa] = useState("");
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [getdatamodule, setgetdatamodule] = useState([]);
  const [showCompanyAgreement, setShowCompanyAgreement] = useState(false);
  const [pendingCompanyRegistration, setPendingCompanyRegistration] = useState(false);
  const [messageAll, setmessageAll] = useState("");
  const [errr, seterrr] = useState(false);
  // Use internal state if no props are provided
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const apiUrlCompany = API_BASE_URL + "api/user/company/";

  const [isHovered, setIsHovered] = useState(false);
  const apiURL = "http://localhost:5000/api/user/";

  // Determine which state to use (props or internal)
  const isCollapsed =
    propIsCollapsed !== undefined ? propIsCollapsed : internalIsCollapsed;
  const setIsCollapsed = propSetIsCollapsed || setInternalIsCollapsed;
  const storedUsername = localStorage.getItem("OwnerLoginData");
  const userLogin = JSON.parse(storedUsername);
  const [companyAcknowlegment, setcompanyAcknowlegment] = useState('');

  // Define handleAddNewCompany BEFORE using it in menuItems
  const handleAddNewCompany = (e) => {
    e.preventDefault();

    // Check if company acknowledgment is needed
    if (companyAcknowlegment.length === 0) {
      setShowCompanyAgreement(true);
      setPendingCompanyRegistration(true);
    } else {
      // If already acknowledged, navigate directly
      navigate("/user/addcompany");
    }
  };

  // Define menuItems AFTER handleAddNewCompany is defined
  const menuItems = [
    {
      label: "Dashboard",
      href: "/user/dashboard",
      icon: <RiDashboardLine size={18} />,
    },
    {
      label: "Add New Company",
      href: "/user/addcompany",
      icon: <RiBuilding2Line size={18} />,
      onClick: handleAddNewCompany,
    },
    {
      label: "My Companies",
      href: "/user/companylist",
      icon: <RiBuilding2Line size={18} />,
    },
    {
      label: "Manage Signatory",
      icon: <RiUserLine size={18} />,
      dropdown: [
        {
          label: "Add New Signatory",
          href: "/user/add-new-signatory",
          icon: <RiUserLine size={16} />,
        },
        {
          label: "Signatory List",
          href: "/user/signatorylist",
          icon: <RiVipCrownLine size={16} />,
        },
        {
          label: "Approve Signatories",
          href: "/user/approval/signature",
          icon: <RiUserLine size={16} />,
        },
      ],
    },
    {
      label: "Settings",
      icon: <RiSettingsLine size={18} />,
      dropdown: [
        {
          label: "Profile Settings",
          href: "/user/settings/profile",
          icon: <RiUserLine size={16} />,
        },
      ],
    },
  ];

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 786) {
        setInternalIsCollapsed(true);
        setIsCollapsed && setIsCollapsed(true);
      } else {
        setInternalIsCollapsed(false);
        setIsCollapsed && setIsCollapsed(false);
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, [internalIsCollapsed]);

  useEffect(() => {
    const storedData = localStorage.getItem("OwnerLoginData");

    if (storedData) {
      const userLogin = JSON.parse(storedData);
      setuserdataa(userLogin);

      const currentTime = new Date().getTime();

      if (userLogin.expiry && currentTime > userLogin.expiry) {
        localStorage.removeItem("OwnerLoginData");
        navigate("/user/login");
      } else {
        const timeLeft = userLogin.expiry - currentTime;

        const logoutTimer = setTimeout(() => {
          localStorage.removeItem("OwnerLoginData");
          navigate("/user/login");
        }, timeLeft);

        return () => clearTimeout(logoutTimer);
      }
    } else {
      navigate("/user/login");
    }
  }, [navigate]);

  useEffect(() => {
    checkUserLogin();
    getUserAcknowlegment();
  }, []);

  const checkUserLogin = async () => {
    let formData = {
      user_id: userLogin.id,
    };
    try {
      const res = await axios.post(apiURL + "checkUserLogin", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.data.results.length === 0) {
        localStorage.removeItem("OwnerLoginData");
        navigate("/user/login");
      }
    } catch (err) {
      console.error("Error fetching modules:", err);
    }
  };

  const getUserAcknowlegment = async () => {
    let formData = {
      user_id: userLogin.id,
    };
    try {
      const res = await axios.post(apiURL + "getUserAcknowlegment", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      setcompanyAcknowlegment(res.data.results);
    } catch (err) { }
  };

  const handleAcceptCompanyAgreement = async () => {
    try {
      const formData = {
        user_id: userLogin.id,
        status: 'Yes'
      };

      const response = await axios.post(apiURL + "saveCompanyAcknowlegment", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data)
      if (response.data.status === "1" || response.data.success) {
        setcompanyAcknowlegment([{ acknowledged: true }]);
        setShowCompanyAgreement(false);
        setmessageAll("Company registration agreement accepted successfully!");
        setTimeout(() => {
          if (pendingCompanyRegistration) {
            navigate("/user/addcompany");
            setPendingCompanyRegistration(false);
          }
          setmessageAll(""); // Clear message after navigation
        }, 2500);

      }
    } catch (err) {
      console.error("Error saving acknowledgment:", err);
    }
  };

  const handleCloseCompanyAgreement = () => {
    setShowCompanyAgreement(false);
    setPendingCompanyRegistration(false);
  };

  useEffect(() => {
    getModules();
    const selectedDropdown = localStorage.getItem("selectedDropdown");
    if (selectedDropdown) {
      setOpenDropdown(Number(selectedDropdown));
    }

    const savedSidebarState = localStorage.getItem("sidebarCollapsed");
    if (savedSidebarState !== null) {
      const savedState = JSON.parse(savedSidebarState);
      if (propSetIsCollapsed) {
        propSetIsCollapsed(savedState);
      } else {
        setInternalIsCollapsed(savedState);
      }
    }
  }, []);

  const getModules = async () => {
    let formData = {
      id: "",
    };
    try {
      const res = await axios.post(apiURL + "getModules", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setgetdatamodule(res.data.results);
    } catch (err) {
      console.error("Error fetching modules:", err);
    }
  };

  const toggleDropdown = (index) => {
    const newIndex = openDropdown === index ? null : index;
    if (isCollapsed) {
      const newState = !isCollapsed;
      setIsCollapsed(newState);
    }
    setOpenDropdown(newIndex);
    localStorage.setItem("selectedDropdown", newIndex !== null ? newIndex : "");
  };

  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  const location = useLocation();
  const isSidebarExpanded = !isCollapsed || isHovered;
  const activePathNew = getMappedMenuHref(location.pathname);

  return (
    <>
      {messageAll && (
        <div
          className={`shadow-lg ${errr ? "error_pop" : "success_pop"}`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            padding: '15px 20px',
            borderRadius: '8px',
            backgroundColor: errr ? '#f8d7da' : '#d4edda',
            color: errr ? '#721c24' : '#155724',
            border: `1px solid ${errr ? '#f5c6cb' : '#c3e6cb'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: '300px'
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <span className="d-block">{messageAll}</span>
          </div>

          <button
            type="button"
            className="close_btnCros"
            onClick={() => setmessageAll("")}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >
            ×
          </button>
        </div>
      )}
      <div
        className={`main_sidenav scroll_nonw d-flex flex-column gap-5  ${isCollapsed ? "collapsed p-3" : "p-4"
          }`}
      >
        <div
          className={`d-flex align-items-center  gap-3 ${isCollapsed ? "justify-content-center" : "justify-content-between"
            }`}
        >
          {!isCollapsed && (
            <Link to="/user/dashboard" className="logo">
              <img
                className="w-100 h-100 object-fit-contain"
                src="/logos/capavate.png"
                alt="logo"
              />
            </Link>
          )}

          <MenuButtonWrapper className="d-flex justify-content-end">
            <button type="button" onClick={toggleSidebar}>
              {isCollapsed && <Menu strokeWidth={2} />}
              {!isCollapsed && <ChevronLeft strokeWidth={2} />}
            </button>
          </MenuButtonWrapper>
        </div>

        <NavContainer isOpen={isSidebarExpanded}>
          <NavList>
            {menuItems.map((item, index) => {
              const isDropdownOpen =
                openDropdown === index ||
                (item.dropdown &&
                  item.dropdown.some((sub) => {
                    const mappedPath = getMappedMenuHref(location.pathname);
                    return (
                      mappedPath === sub.href || mappedPath.startsWith(sub.href)
                    );
                  })) ||
                (item.dynamicDropdownKey === "modules" &&
                  getdatamodule.some((modItem) => {
                    const path =
                      modItem.name === "DATAROOM AND DUE DILIGENCE"
                        ? "/dataroom-Duediligence"
                        : `/moduleone/${modItem.id}`;
                    return location.pathname === path;
                  }));

              const isActive =
                item.matchPaths?.some((path) =>
                  matchPath({ path, end: false }, location.pathname)
                ) ||
                location.pathname === item.href ||
                (item.dropdown &&
                  item.dropdown.some(
                    (sub) =>
                      (customActiveMap[location.pathname] ||
                        location.pathname) === sub.href ||
                      (
                        customActiveMap[location.pathname] || location.pathname
                      ).startsWith(sub.href)
                  )) ||
                (item.dynamicDropdownKey === "modules" &&
                  getdatamodule.some((modItem) => {
                    const path =
                      modItem.name === "DATAROOM AND DUE DILIGENCE"
                        ? "/dataroom-Duediligence"
                        : `/moduleone/${modItem.id}`;
                    return location.pathname === path;
                  }));

              return (
                <NavItem key={index}>
                  {item.dropdown || item.dynamicDropdownKey ? (
                    <>
                      <DropdownToggle
                        title={item.label}
                        onClick={() => toggleDropdown(index)}
                      >
                        <div className="d-flex gap-2 align-items-center justify-content-between w-100">
                          <div className="d-flex gap-2 align-items-start">
                            {item.icon}
                            {isSidebarExpanded && item.label}
                          </div>
                          {isSidebarExpanded && (
                            <Arrow isOpen={isDropdownOpen}>
                              <IoIosArrowDown />
                            </Arrow>
                          )}
                        </div>
                      </DropdownToggle>

                      {isDropdownOpen && (
                        <DropdownMenu
                          title={item.label}
                          className={`${isSidebarExpanded ? "" : "p-0"}`}
                        >
                          <hr className="my-2" />
                          {item.dropdown &&
                            item.dropdown.map((sub, subIndex) => {
                              const isSubActive =
                                activePathNew === sub.href ||
                                activePathNew.startsWith(sub.href);

                              return (
                                <li className="list-none" key={subIndex}>
                                  <Link
                                    to={sub.href}
                                    className={`sidebar d-flex align-items-start gap-2 ${isSidebarExpanded ? "" : "w-fit"
                                      } ${isSubActive ? "active" : ""}`}
                                  >
                                    {sub.icon}
                                    {isSidebarExpanded && sub.label}
                                  </Link>
                                </li>
                              );
                            })}

                          {item.dynamicDropdownKey === "modules" && (
                            <>
                              {getdatamodule.map((modItem, modIndex) => {
                                const path =
                                  modItem.name === "DATAROOM AND DUE DILIGENCE"
                                    ? "/dataroom-Duediligence"
                                    : `/moduleone/${modItem.id}`;

                                const isModActive = location.pathname === path;

                                return (
                                  <li className="list-none" key={modIndex}>
                                    <Link
                                      to={path}
                                      title={modItem.name}
                                      className={`sidebar d-flex align-items-start gap-2 ${isSidebarExpanded ? "" : "w-fit"
                                        } ${isModActive ? "active" : ""}`}
                                    >
                                      <RiFolderChartLine size={16} />
                                      {isSidebarExpanded && modItem.name}
                                    </Link>
                                  </li>
                                );
                              })}

                              <li className="list-none">
                                <Link
                                  title="VIDEO CONTENT: Investor Presentation Structure - Expert Advice Video"
                                  to="/advicevideos"
                                  className={`sidebar d-flex align-items-start gap-2 ${isSidebarExpanded ? "" : "w-fit"
                                    } ${location.pathname === "/advicevideos"
                                      ? "active"
                                      : ""
                                    }`}
                                >
                                  <RiVideoLine size={16} />
                                  {isSidebarExpanded &&
                                    "VIDEO CONTENT: Investor Presentation Structure - Expert Advice Video"}
                                </Link>
                              </li>
                            </>
                          )}
                        </DropdownMenu>
                      )}
                    </>
                  ) : (
                    item.onClick ? (
                      <div
                        onClick={item.onClick}
                        title={item.label}
                        className={`sidebar d-flex align-items-start gap-2 ${isSidebarExpanded ? "" : "w-fit"
                          } ${isActive ? "active" : ""}`}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.icon}
                        {isSidebarExpanded && item.label}
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        title={item.label}
                        className={`sidebar d-flex align-items-start gap-2 ${isSidebarExpanded ? "" : "w-fit"
                          } ${isActive ? "active" : ""}`}
                      >
                        {item.icon}
                        {isSidebarExpanded && item.label}
                      </Link>
                    )
                  )}
                </NavItem>
              );
            })}
          </NavList>
        </NavContainer>
        <IPAddress />
      </div>

      {showCompanyAgreement && (
        <CompanyRegistrationPopup
          show={showCompanyAgreement}
          onClose={handleCloseCompanyAgreement}
          onAccept={handleAcceptCompanyAgreement}
          companyName=""
        />
      )}

      <style jsx>{`
        .main_sidenav {
          transition: width 0.3s ease;
        }

        .main_sidenav.collapsed {
          width: 71px;
        }

        .main_sidenav.collapsed .logo {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
}