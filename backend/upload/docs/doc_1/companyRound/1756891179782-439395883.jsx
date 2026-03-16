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
} from "../../components/Styles/MainHeadStyles";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { Globe, Menu } from "lucide-react";
import axios from "axios";
import { matchPath } from "react-router-dom";

// Import React Icons
import {
  RiDashboardLine,
  RiFolderChartLine,
  RiPieChartLine,
  RiMoneyDollarCircleLine,
  RiGraduationCapLine,
  RiUserSettingsLine,
  RiSettingsLine,
  RiUserAddLine,
  RiShareForwardLine,
  RiUserVoiceLine,
  RiBarChartBoxLine,
  RiUserLine,
  RiVipCrownLine,
  RiShareLine,
  RiVideoLine,
} from "react-icons/ri";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <RiDashboardLine size={18} />,
  },
  {
    label: "Dataroom Management & Diligence",
    href: "/dataroom-Duediligence",
    icon: <RiFolderChartLine size={18} />,
  },
  {
    label: "Investor Reporting",
    href: "/investorlist",
    matchPaths: ["/investorlist", "/add-new-investor"],
    icon: <RiPieChartLine size={18} />,
  },
  {
    label: "Round Management",
    icon: <RiMoneyDollarCircleLine size={18} />,
    dropdown: [
      {
        label: "Capital In Motion:Record a Round",
        href: "/createrecord",
        icon: <RiMoneyDollarCircleLine size={16} />,
      },
      {
        label: "Sharing with Investors",
        href: "/investordocs/view",
        icon: <RiShareForwardLine size={16} />,
      },
    ],
  },
  {
    label: "International Entrepreneur Academy Program",
    dynamicDropdownKey: "modules",
    icon: <RiGraduationCapLine size={18} />,
  },
  // ✅ New Investor CRM Section
  {
    label: "Investor Information CRM",
    icon: <RiUserSettingsLine size={18} />,
    dropdown: [
      {
        label: "Investor Entry / Directory",
        href: "/crm/investor-directory",
        icon: <RiUserAddLine size={16} />,
      },
      {
        label: "Report Sharing",
        href: "/crm/investorreport",
        icon: <RiShareForwardLine size={16} />,
      },
      {
        label: "Investor Portal Interaction",
        href: "/crm/reports",
        icon: <RiUserVoiceLine size={16} />,
      },
      {
        label: "Dashboard / Analytics",
        href: "/crm/engagement-tracking",
        icon: <RiBarChartBoxLine size={16} />,
      },
    ],
  },
  {
    label: "Settings",
    icon: <RiSettingsLine size={18} />,
    dropdown: [
      {
        label: "Profile Settings",
        href: "/settings/profile",
        icon: <RiUserLine size={16} />,
      },
      {
        label: "Subscriptions",
        href: "/subscription",
        icon: <RiVipCrownLine size={16} />,
      },
      {
        label: "Share Referral Code",
        href: "/share/referralcode",
        matchPaths: ["/share/referralcode", "/share/referralcodetracking/*"],
        icon: <RiShareLine size={16} />,
      },
    ],
  },
];

export default function ModuleSideNav({
  isCollapsed: propIsCollapsed,
  setIsCollapsed: propSetIsCollapsed,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userdataa, setuserdataa] = useState("");
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [getdatamodule, setgetdatamodule] = useState([]);

  // Use internal state if no props are provided
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 786) {
        setInternalIsCollapsed(true); // ✅ collapse by default
        setIsCollapsed && setIsCollapsed(true); // agar parent se state aa rhi ho
      } else {
        setInternalIsCollapsed(false);
        setIsCollapsed && setIsCollapsed(false);
      }
    };

    checkScreen(); // mount pe run
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, [internalIsCollapsed]);

  const [isHovered, setIsHovered] = useState(false);
  const apiURL = "http://localhost:5000/api/user/";

  // Determine which state to use (props or internal)
  const isCollapsed =
    propIsCollapsed !== undefined ? propIsCollapsed : internalIsCollapsed;
  const setIsCollapsed = propSetIsCollapsed || setInternalIsCollapsed;

  useEffect(() => {
    // Check if the username key exists in session storage
    const storedUsername = localStorage.getItem("CompanyLoginData");
    const userLogin = JSON.parse(storedUsername);
    setuserdataa(userLogin);

    if (userLogin === null) {
      localStorage.removeItem("CompanyLoginData");
      navigate("/user/login");
    }
  }, []);

  useEffect(() => {
    getModules();
    // Check if there's a previously selected dropdown in storage
    const selectedDropdown = localStorage.getItem("selectedDropdown");
    if (selectedDropdown) {
      setOpenDropdown(Number(selectedDropdown));
    }

    // Check if sidebar state is saved in localStorage
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

  const shouldBeActive = location.pathname === "/advicevideos";

  // Determine if sidebar should appear expanded (either not collapsed or hovered while collapsed)
  const isSidebarExpanded = !isCollapsed || isHovered;

  return (
    <>
      <div
        className={`main_sidenav scroll_nonw d-flex flex-column gap-5  ${isCollapsed ? "collapsed p-3" : "p-4"
          }`}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      >
        <div
          className={`d-flex align-items-center  gap-3 ${isCollapsed ? "justify-content-center" : "justify-content-between"
            }`}
        >
          {!isCollapsed && (
            <a href="/" className="logo">
              <img
                className="w-100 h-100 object-fit-contain"
                src="/logos/capavate.png"
                alt="logo"
              />
            </a>
          )}

          <MenuButtonWrapper className="d-flex justify-content-end">
            <button type="button" onClick={toggleSidebar}>
              <Menu strokeWidth={2} />
            </button>
          </MenuButtonWrapper>
        </div>
        <NavContainer isOpen={isSidebarExpanded}>
          <NavList>
            {menuItems.map((item, index) => {
              const isActive =
                item.matchPaths?.some((path) =>
                  matchPath({ path, end: false }, location.pathname)
                ) || location.pathname === item.href;
              return (
                <NavItem key={index}>
                  {item.dropdown || item.dynamicDropdownKey ? (
                    <>
                      <DropdownToggle
                        onClick={() => toggleDropdown(index)}
                        className={
                          isCollapsed && !isHovered
                            ? "justify-content-center px-0"
                            : ""
                        }
                      >
                        <div
                          className={`d-flex gap-2 align-items-center w-100 ${isCollapsed
                            ? "justify-content-center"
                            : "justify-content-between"
                            }`}
                        >
                          <div
                            className={`d-flex gap-2 align-items-start ${isCollapsed && !isHovered
                              ? "justify-content-center"
                              : ""
                              }`}
                          >
                            {item.icon}
                            {isSidebarExpanded && item.label}
                          </div>
                          {isSidebarExpanded && (
                            <Arrow isOpen={openDropdown === index}>
                              <IoIosArrowDown />
                            </Arrow>
                          )}
                        </div>
                      </DropdownToggle>

                      {openDropdown === index && isSidebarExpanded && (
                        <DropdownMenu>
                          {/* Static dropdown items */}
                          <hr className="my-2" />
                          {item.dropdown &&
                            item.dropdown.map((sub, subIndex) => {
                              const isSubActive =
                                location.pathname === sub.href;
                              return (
                                <li className="list-none" key={subIndex}>
                                  <Link
                                    to={sub.href}
                                    className={`sidebar d-flex align-items-start gap-2 ${isSubActive ? "active" : ""
                                      }`}
                                  >
                                    {sub.icon}
                                    {isSidebarExpanded && sub.label}
                                  </Link>
                                </li>
                              );
                            })}

                          {/* Dynamic dropdown items */}
                          {item.dynamicDropdownKey === "modules" && (
                            <>
                              {getdatamodule.map((modItem, modIndex) => {
                                const isDataRoom =
                                  modItem.name === "DATAROOM AND DUE DILIGENCE";
                                const path = isDataRoom
                                  ? "/dataroom-Duediligence"
                                  : `/moduleone/${modItem.id}`;

                                const isModActive = location.pathname === path;

                                return (
                                  <li className="list-none" key={modIndex}>
                                    <Link
                                      to={path}
                                      className={`sidebar d-flex align-items-start gap-2 ${isModActive ? "active" : ""
                                        }`}
                                    >
                                      <RiFolderChartLine size={16} />
                                      {isSidebarExpanded && modItem.name}
                                    </Link>
                                  </li>
                                );
                              })}

                              {/* This will render only once after all module items */}
                              <li className="list-none">
                                <Link
                                  to="/advicevideos"
                                  className={`sidebar d-flex align-items-start gap-2 ${location.pathname === "/advicevideos"
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <RiVideoLine size={16} />
                                  VIDEO CONTENT: Investor Presentation Structure
                                  - Expert Advice Video hello
                                </Link>
                              </li>
                            </>
                          )}
                        </DropdownMenu>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`sidebar d-flex align-items-start gap-2 ${isActive ? "active" : ""
                        } ${isCollapsed && !isHovered
                          ? "justify-content-center"
                          : ""
                        }`}
                    >
                      {item.icon}
                      {isSidebarExpanded && item.label}
                    </Link>
                  )}
                </NavItem>
              );
            })}
          </NavList>
        </NavContainer>
      </div>

      <style jsx>{`
        .main_sidenav {
          transition: width 0.3s ease;
        }

        .main_sidenav.collapsed {
          width: 80px;
        }

        .main_sidenav.collapsed .logo {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
