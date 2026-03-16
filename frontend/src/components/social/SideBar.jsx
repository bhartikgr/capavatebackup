import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../assets/style/sidebar.css'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ChevronLeft } from 'lucide-react'
import JoinWaitlist from './JoinWaitlist'
import WaitListPopup from './WaitListPopup'
import {
  RiBuildingLine, RiFolderChartLine, RiPieChartLine,
  RiMoneyDollarCircleLine, RiUserSettingsLine, RiSettingsLine,
  RiShareForwardLine, RiUserVoiceLine, RiBarChartBoxLine,
  RiUserLine, RiVipCrownLine, RiShareLine
} from 'react-icons/ri'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { API_BASE_URL } from '../../config/config.js'
import axios from 'axios'
import CurrencyFormatter from "../../components/CurrencyFormatter.jsx";

export default function ModuleSideNav() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [manuallyClosed, setManuallyClosed] = useState(new Set())
  const [showModal, setShowModal] = useState(false)
  const [companyProfile, setCompanyProfile] = useState('')
  const location = useLocation()
  const userLogin = JSON.parse(localStorage.getItem('SignatoryLoginData'))
  const apiURL = API_BASE_URL + 'api/user/';
  const apiUrlRound = API_BASE_URL + "api/user/companydashboard/";
  const [showWaitListPopup, setShowWaitListPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [SeriesName, setSeriesName] = useState('');
  const [seriesInvestment, setSeriesInvestment] = useState('');
  const [roundData, setroundData] = useState('');

  // ✅ Metrics state
  const [metrics, setMetrics] = useState({
    totalFounders: 0,
    totalFoundersShares: 0,
    totalFoundersPercentage: 0,
    totalInvestors: 0,
    totalInvestorsShares: 0,
    totalInvestorsPercentage: 0,
    totalOptionPoolShares: 0,
    totalOptionPoolPercentage: 0,
    totalShares: 0,
    totalSharesFormatted: '0',
    totalValuation: 0,
    totalValuationFormatted: '0',
    currency: ''
  });

  useEffect(() => {
    const checkScreen = () => setIsCollapsed(window.innerWidth < 786)
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    fetchEquityMetrics();
  }, []);

  useEffect(() => {
    getcompanydetail()
  }, [])

  // Add this useEffect to handle opening dropdowns based on current route
  useEffect(() => {
    // Check which main menu should be open based on current route
    const currentPath = location.pathname;

    if (currentPath.includes('/createrecord') ||
      currentPath.includes('/record-round-cap-table') ||
      currentPath.includes('/edit-record-round') ||
      currentPath.includes('/dataroom-Duediligence') ||
      currentPath.includes('/investorlist') ||
      currentPath.includes('/crm/')) {
      setOpenDropdown('network');
    } else if (currentPath.includes('/equity/')) {
      setOpenDropdown('equity');
    } else if (currentPath.includes('/funding/')) {
      setOpenDropdown('funding');
    } else if (currentPath.includes('/activity-logs') ||
      currentPath.includes('/subscription')) {
      setOpenDropdown('settings');
    }
  }, [location.pathname]);

  const fetchEquityMetrics = async () => {
    setLoading(true);
    try {
      const formData = {
        company_id: userLogin?.companies[0]?.id,
      };

      const res = await axios.post(
        apiUrlRound + "getroundChart",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );


      const capTable = res.data.cap_table || {
        pre_money: { items: [], totals: {} },
        post_money: { items: [], totals: {} }
      };

      setroundData(res.data.round);

      const postMoney = capTable.post_money || {};
      const items = postMoney.items || [];

      console.log("Post Money Items:", items);

      // ✅ Get round series and investment
      let roundSeries = '';
      let roundInvestment = 0;
      let roundCurrency = 'GBP £';

      if (res.data.round) {
        if (res.data.round.type === 'Round 0') {
          roundSeries = 'Round 0';
        } else {
          roundSeries = res.data.round.share_class_type || 'Series A';
        }

        roundInvestment = parseFloat(res.data.round.investment) ||
          parseFloat(res.data.round.roundsize) ||
          parseFloat(postMoney.post_money_valuation) ||
          0;
        roundCurrency = postMoney.currency || res.data.round.currency || 'GBP £';
      }

      setSeriesName(roundSeries);

      // ✅ Format investment
      const formattedInvestment = formatInvestment(roundInvestment, roundCurrency);
      setSeriesInvestment(formattedInvestment);

      // ✅ Calculate from items array - NOT from totals
      let totalFounders = 0;
      let totalFoundersShares = 0;
      let totalInvestors = 0;
      let totalInvestorsShares = 0;
      let totalOptionPoolShares = 0;
      let totalShares = 0;

      // Process each item
      items.forEach((item) => {
        const shares = item.shares || 0;
        totalShares += shares;

        // Founders
        if (item.type === 'founder') {
          totalFounders++;
          totalFoundersShares += shares;
        }
        // Option Pool
        else if (item.type === 'option_pool') {
          totalOptionPoolShares += shares;
        }
        // Investors
        else if (item.type === 'investor') {
          // Check if it has multiple investors in investor_details
          if (Array.isArray(item.investor_details) && item.investor_details.length > 0) {
            // Multiple investors in one group
            item.investor_details.forEach(inv => {
              totalInvestors++;
              const invShares = inv.shares || 0;
              totalInvestorsShares += invShares;
            });
          } else {
            // Single investor
            totalInvestors++;
            totalInvestorsShares += shares;
          }
        }
      });
      // Calculate percentages
      const founderPercentage = totalShares > 0
        ? ((totalFoundersShares / totalShares) * 100).toFixed(1)
        : 0;

      const investorPercentage = totalShares > 0
        ? ((totalInvestorsShares / totalShares) * 100).toFixed(1)
        : 0;

      const optionPoolPercentage = totalShares > 0
        ? ((totalOptionPoolShares / totalShares) * 100).toFixed(1)
        : 0;

      // ✅ Set metrics from calculated values
      setMetrics({
        // Founders
        totalFounders: totalFounders,
        totalFoundersShares: totalFoundersShares,
        totalFoundersPercentage: founderPercentage,

        // Investors
        totalInvestors: totalInvestors,
        totalInvestorsShares: totalInvestorsShares,
        totalInvestorsPercentage: investorPercentage,

        // Option Pool
        totalOptionPoolShares: totalOptionPoolShares,
        totalOptionPoolPercentage: optionPoolPercentage,

        // Total Shares
        totalShares: totalShares,
        totalSharesFormatted: totalShares.toLocaleString(),

        // Valuation
        totalValuation: postMoney.post_money_valuation || 0,
        totalValuationFormatted: postMoney.post_money_valuation
          ? `${roundCurrency} ${postMoney.post_money_valuation.toLocaleString()}`
          : '0',
        currency: roundCurrency
      });

      console.log("Updated Metrics:", {
        totalFounders,
        totalFoundersPercentage: founderPercentage,
        totalInvestors,
        totalInvestorsPercentage: investorPercentage,
        totalOptionPoolPercentage: optionPoolPercentage,
        totalShares: totalShares.toLocaleString()
      });

    } catch (err) {
      console.error("Error fetching equity metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Investment formatter function
  const formatInvestment = (amount, currency = 'GBP £') => {
    console.log(amount)
    if (!amount || amount === 0) {
      return `${currency}0`;
    }

    if (amount >= 1000000) {
      return ` ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return ` ${(amount / 1000).toFixed(1)}K`;
    } else {
      return ` ${amount}`;
    }
  };

  const getcompanydetail = async () => {
    try {
      const res = await axios.post(apiURL + 'getcompanydetail',
        { company_id: userLogin.companies[0].id },
        { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } }
      )
      setCompanyProfile(res.data.results[0])
    } catch (err) {
      console.error('Error fetching company details:', err)
    }
  }

  const handleModalOpen = (modalType) => {
    if (modalType === 'joinWaitlist') {
      setShowModal(true)
    } else if (modalType === 'waitListPopup') {
      setShowWaitListPopup(true)
    }
  }
  // Add this useEffect to handle opening dropdowns based on current route
  useEffect(() => {
    // Check which main menu should be open based on current route
    const currentPath = location.pathname;

    if (currentPath.includes('/createrecord') ||
      currentPath.includes('/record-round-cap-table') ||
      currentPath.includes('/edit-record-round') ||
      currentPath.includes('/dataroom-Duediligence') ||
      currentPath.includes('/investorlist') ||
      currentPath.includes('/crm/')) {
      setOpenDropdown('network');
    } else if (currentPath.includes('/equity/') ||
      currentPath.includes('/captable-view')) {  // Add this line
      setOpenDropdown('equity');
    } else if (currentPath.includes('/funding/')) {
      setOpenDropdown('funding');
    } else if (currentPath.includes('/activity-logs') ||
      currentPath.includes('/subscription')) {
      setOpenDropdown('settings');
    }
  }, [location.pathname]);
  // ✅ COMPLETELY STATIC MENU ITEMS - No loops, no dropdownItems array
  const renderMenuItems = () => {
    return (
      <>
        {/* 1. Edit Company Information - STATIC */}
        <li>
          <Link to="/company-profile" className={`sidebar_item d-flex gap-2 align-items-center ${isActive('/company-profile') ? 'active' : ''}`}>
            <RiBuildingLine size={18} />
            {!isCollapsed && "Edit Company Information"}
          </Link>
        </li>

        {/* 2. Equity Stakeholders - STATIC with manual values */}
        {/* 2. Equity Stakeholders - STATIC with manual values */}
        <li className={isParentActive('equity') ? 'submenu-active' : ''}>
          <div
            className={`sidebar_item d-flex justify-content-between align-items-center ${isParentActive('equity') ? 'active' : ''}`}
            onClick={() => toggleDropdown('equity')}
            style={{ cursor: 'pointer' }}
          >
            <div className='d-flex gap-2 align-items-center'>
              <RiPieChartLine size={18} />
              {!isCollapsed && "Equity Stakeholders"}
            </div>
            {!isCollapsed && (shouldShowDropdown('equity') ? <IoIosArrowUp /> : <IoIosArrowDown />)}
          </div>

          {shouldShowDropdown('equity') && (
            <ul className='submenu'>
              {/* Founders - ADD BACK THE PROPER ROUTE */}
              <li>
                <Link to="/equity/founders" className={`sidebar_item ${isActive('/equity/founders') ? 'active' : ''}`}>
                  <div className='d-flex justify-content-between w-100 align-items-center'>
                    <div className='d-flex gap-2 align-items-center'>
                      <RiUserLine size={16} />
                      <span>Founders</span>
                    </div>
                    <span className='menu_value bg-success'>{metrics.totalFounders || '0'}</span>
                  </div>
                </Link>
              </li>

              {/* ESOP - ADD BACK THE PROPER ROUTE */}
              <li>
                <Link to="/equity/esop" className={`sidebar_item ${isActive('/equity/esop') ? 'active' : ''}`}>
                  <div className='d-flex justify-content-between w-100 align-items-center'>
                    <div className='d-flex gap-2 align-items-center'>
                      <RiUserLine size={16} />
                      <span>ESOP</span>
                    </div>
                    <span className='menu_value bg-success'>{metrics.totalOptionPoolPercentage || '0'}%</span>
                  </div>
                </Link>
              </li>

              {/* Total Investors - ADD BACK THE PROPER ROUTE */}
              <li>
                <Link to="/equity/investors" className={`sidebar_item ${isActive('/equity/investors') ? 'active' : ''}`}>
                  <div className='d-flex justify-content-between w-100 align-items-center'>
                    <div className='d-flex gap-2 align-items-center'>
                      <RiUserLine size={16} />
                      <span>Total Investors</span>
                    </div>
                    <span className='menu_value bg-success'>{metrics.totalInvestors || '0'}</span>
                  </div>
                </Link>
              </li>

              {/* Series/Round Name - ADD BACK THE PROPER ROUTE */}
              <li>
                <Link to="/equity/series-a" className={`sidebar_item ${isActive('/equity/series-a') ? 'active' : ''}`}>
                  <div className='d-flex justify-content-between w-100 align-items-center'>
                    <div className='d-flex gap-2 align-items-center'>
                      <RiMoneyDollarCircleLine size={16} />
                      <span>{SeriesName || 'Series A'}</span>
                    </div>
                    <span className='menu_value bg-success'>{seriesInvestment}</span>
                  </div>
                </Link>
              </li>

              {/* Cap Table - KEEP AS IS SINCE IT HAS A VALID ROUTE */}
              <li>
                <Link to={`/captable-view/${roundData?.id || ''}`} className={`sidebar_item ${isActive('/captable-view') ? 'active' : ''}`} target="_blank">
                  <div className='d-flex justify-content-between w-100 align-items-center'>
                    <div className='d-flex gap-2 align-items-center'>
                      <RiBarChartBoxLine size={16} />
                      <span>Cap Table</span>
                    </div>
                    <span className='menu_value bg-success'>View</span>
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* 3. Funding Rounds - COMPLETELY STATIC */}
        <li className={isParentActive('funding') ? 'submenu-active' : ''}>
          <div
            className={`sidebar_item d-flex justify-content-between align-items-center ${isParentActive('funding') ? 'active' : ''}`}
            onClick={() => toggleDropdown('funding')}
            style={{ cursor: 'pointer' }}
          >
            <div className='d-flex gap-2 align-items-center'>
              <RiMoneyDollarCircleLine size={18} />
              {!isCollapsed && "Funding Rounds"}
            </div>
            {!isCollapsed && (shouldShowDropdown('funding') ? <IoIosArrowUp /> : <IoIosArrowDown />)}
          </div>

          {shouldShowDropdown('funding') && (
            <ul className='submenu'>
              {/* Round A - STATIC */}
              <li>
                <div className='sidebar_item d-flex gap-2 align-items-center fw-medium'>
                  <RiMoneyDollarCircleLine size={16} />
                  <span>Round A</span>
                </div>
                <ul className='ps-4 mt-1 mb-2'>
                  <li>
                    <span className='sidebar_item small d-flex justify-content-between'>
                      <span>45/120</span>
                      <span className='menu_value bg-success'>confirmed</span>
                    </span>
                  </li>
                  <li>
                    <span className='sidebar_item small d-flex justify-content-between'>
                      <span>30</span>
                      <span className='menu_value bg-danger'>pending</span>
                    </span>
                  </li>
                </ul>
              </li>

              {/* Round Investors - STATIC */}
              <li>
                <div className='sidebar_item d-flex gap-2 align-items-center fw-medium'>
                  <RiUserVoiceLine size={16} />
                  <span>Round Investors</span>
                </div>
                <ul className='ps-4 mt-1 mb-2'>
                  <li>
                    <span className='sidebar_item small d-flex justify-content-between'>
                      <span>Present at CapavateAngel</span>
                      <span className='menu_value bg-success'>75</span>
                    </span>
                  </li>
                  <li>
                    <span className='sidebar_item small d-flex justify-content-between'>
                      <span>Invited</span>
                      <span className='menu_value bg-success'>50</span>
                    </span>
                  </li>
                  <li>
                    <span
                      className='sidebar_item small d-flex justify-content-between cursor-pointer'
                      onClick={() => handleModalOpen('waitListPopup')}
                    >
                      <span>Waitlisted</span>
                      <span className='menu_value bg-success'>20</span>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </li>

        {/* 4. Network & Contacts - COMPLETELY STATIC */}
        <li className={isParentActive('network') ? 'submenu-active' : ''}>
          <div
            className={`sidebar_item d-flex justify-content-between align-items-center ${isParentActive('network') ? 'active' : ''}`}
            onClick={() => toggleDropdown('network')}
            style={{ cursor: 'pointer' }}
          >
            <div className='d-flex gap-2 align-items-center'>
              <RiShareLine size={18} />
              {!isCollapsed && "Network & Contacts"}
            </div>
            {!isCollapsed && (shouldShowDropdown('network') ? <IoIosArrowUp /> : <IoIosArrowDown />)}
          </div>

          {shouldShowDropdown('network') && (
            <ul className='submenu'>
              {/* Round Management - STATIC */}
              <li>
                <div className='sidebar_item d-flex gap-2 align-items-center fw-medium'>
                  <RiFolderChartLine size={16} />
                  <span>Round Management</span>
                </div>
                <ul className='ps-4 mt-1 mb-2'>
                  <li>
                    <Link to="/record-round-list" className={`sidebar_item small ${isActive('/record-round-list') ? 'active' : ''}`}>
                      Start/Record/Edit a round
                    </Link>
                  </li>



                  <li>
                    <span
                      className='sidebar_item small cursor-pointer'
                      onClick={() => handleModalOpen('joinWaitlist')}
                    >
                      Invite Investors to your round
                    </span>
                  </li>
                  <li>
                    <span
                      className='sidebar_item small cursor-pointer'
                      onClick={() => handleModalOpen('waitListPopup')}
                    >
                      Investors Wait-List
                    </span>
                  </li>
                </ul>
              </li>

              {/* Networks at CapavateAngel - STATIC */}
              <li>
                <div className='sidebar_item d-flex gap-2 align-items-center fw-medium'>
                  <RiFolderChartLine size={16} />
                  <span>Networks at CapavateAngel</span>
                </div>
                <ul className='ps-4 mt-1 mb-2'>
                  <li>
                    <Link to="/dataroom-Duediligence" className={`sidebar_item small ${isActive('/dataroom-Duediligence') ? 'active' : ''}`}>
                      Dataroom Management & Executive Summary
                    </Link>
                  </li>
                  <li>
                    <Link to="/investorlist" className={`sidebar_item small ${isActive('/investorlist') ? 'active' : ''}`}>
                      Investor Reporting
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Contact (CRM contacts) - STATIC */}
              <li>
                <div className='sidebar_item d-flex gap-2 align-items-center fw-medium'>
                  <RiUserSettingsLine size={16} />
                  <span>Contact (CRM contacts)</span>
                </div>
                <ul className='ps-4 mt-1 mb-2'>
                  <li>
                    <span className='sidebar_item small d-flex justify-content-between'>
                      <span>Total Investor Contacts</span>
                      <span className='menu_value bg-success'>150</span>
                    </span>
                  </li>
                  <li>
                    <span className='sidebar_item small'>Ratio Investors</span>
                  </li>
                  <li>
                    <Link to="/crm/investor-directory" className={`sidebar_item small ${isActive('/crm/investor-directory') ? 'active' : ''}`}>
                      Investor Directory
                    </Link>
                  </li>
                  <li>
                    <Link to="/crm/addnew-investor" className={`sidebar_item small ${isActive('/crm/addnew-investor') ? 'active' : ''}`}>
                      Add+ New Investor Contact
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Social Media - STATIC */}
              <li>
                <div className='sidebar_item d-flex gap-2 align-items-center fw-medium'>
                  <RiShareForwardLine size={16} />
                  <span>Social Media</span>
                </div>
                <ul className='ps-4 mt-1 mb-2'>
                  <li>
                    <span className='sidebar_item small d-flex justify-content-between'>
                      <span>Followers</span>
                      <span className='menu_value bg-success'>5000</span>
                    </span>
                  </li>
                  <li>
                    <span className='sidebar_item small d-flex justify-content-between'>
                      <span>Following</span>
                      <span className='menu_value bg-success'>1200</span>
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </li>

        {/* 5. Settings - COMPLETELY STATIC */}
        <li className={isParentActive('settings') ? 'submenu-active' : ''}>
          <div
            className={`sidebar_item d-flex justify-content-between align-items-center ${isParentActive('settings') ? 'active' : ''}`}
            onClick={() => toggleDropdown('settings')}
            style={{ cursor: 'pointer' }}
          >
            <div className='d-flex gap-2 align-items-center'>
              <RiSettingsLine size={18} />
              {!isCollapsed && "Settings"}
            </div>
            {!isCollapsed && (shouldShowDropdown('settings') ? <IoIosArrowUp /> : <IoIosArrowDown />)}
          </div>

          {shouldShowDropdown('settings') && (
            <ul className='submenu'>
              <li>
                <Link to="/activity-logs" className={`sidebar_item ${isActive('/activity-logs') ? 'active' : ''}`}>
                  <div className='d-flex gap-2 align-items-center'>
                    <RiUserLine size={16} />
                    <span>Activity Logs</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/subscription" className={`sidebar_item ${isActive('/subscription') ? 'active' : ''}`}>
                  <div className='d-flex gap-2 align-items-center'>
                    <RiVipCrownLine size={16} />
                    <span>Subscriptions</span>
                  </div>
                </Link>
              </li>
            </ul>
          )}
        </li>
      </>
    );
  };

  // Helper arrays for dropdown items (completely static, just for reference)
  const equityItems = [{}, {}, {}, {}, {}];
  const fundingItems = [{}, {}];
  const networkItems = [{}, {}, {}, {}];
  const settingsItems = [{}, {}];

  // Helper functions
  const toggleDropdown = (key) => {
    if (isCollapsed) {
      setIsCollapsed(false)
      setOpenDropdown(key)
      setManuallyClosed(prev => { const n = new Set(prev); n.delete(key); return n })
    } else if (openDropdown === key) {
      setOpenDropdown(null)
      setManuallyClosed(prev => new Set(prev).add(key))
    } else {
      setOpenDropdown(key)
      setManuallyClosed(prev => { const n = new Set(prev); n.delete(key); return n })
    }
  }

  const shouldShowDropdown = (key) => {
    if (isCollapsed) return false
    if (manuallyClosed.has(key)) return false
    if (openDropdown === key) return true
    if (isParentActive(key)) return true
    return false
  }

  const relatedRoutes = {
    '/record-round-list': ['/createrecord', '/record-round-cap-table', '/edit-record-round'],
    '/record-round-cap-table/:id': ['/record-round-cap-table'],
    '/edit-record-round/:id': ['/edit-record-round']
  };

  const isActive = (path) => {
    if (!path || path === '#') return false
    const cur = location.pathname

    // Handle dynamic routes with IDs
    if (path.includes(':id')) {
      const basePath = path.split('/:id')[0];
      if (cur.startsWith(basePath + '/')) return true;
    }

    if (cur === path) return true
    if (cur.startsWith(path + '/')) return true
    if (relatedRoutes[path]?.some(r => cur === r || cur.startsWith(r + '/'))) return true
    return false
  }

  // Fixed isParentActive function - now properly checks if current route belongs to a parent menu
  // Fixed isParentActive function - now properly checks if current route belongs to a parent menu
  // Fixed isParentActive function - now properly checks if current route belongs to a parent menu
  const isParentActive = (parentMenu) => {
    const currentPath = location.pathname;

    switch (parentMenu) {
      case 'equity':
        return currentPath.includes('/equity/') ||
          currentPath.includes('/captable-view');  // Only equity and captable-view should activate equity menu

      case 'funding':
        return currentPath.includes('/funding/');

      case 'network':
        return currentPath.includes('/record-round-list') ||
          currentPath.includes('/createrecord') ||
          currentPath.includes('/record-round-cap-table') ||  // This stays only in network
          currentPath.includes('/edit-record-round') ||
          currentPath.includes('/dataroom-Duediligence') ||
          currentPath.includes('/investorlist') ||
          currentPath.includes('/crm/');

      case 'settings':
        return currentPath.includes('/activity-logs') ||
          currentPath.includes('/subscription');

      default:
        return false;
    }
  }

  return (
    <>
      <div className={`main_sidenav_social scroll_nonw d-flex flex-column gap-4 p-3 justify-content-start align-items-md-start align-items-center ${isCollapsed ? 'collapsed p-md-3' : 'p-md-4'}`}>
        {/* Logo + toggle */}
        <div className='d-flex justify-content-between align-items-center w-100'>
          {!isCollapsed && (
            <Link to='/dashboard' className='com_logo'>
              <img src={require('../../assets/images/capavate.png')} className='img-fluid rounded' style={{ maxHeight: '50px' }} alt='logo' />
            </Link>
          )}
          <button className='menu_btn' onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <Menu size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>

        {/* Company box */}
        {!isCollapsed && (
          <div className='company_box border rounded-3 shadow-sm p-3 w-100'>
            <h6 className='text-start mb-2'>Company Name : {companyProfile?.company_name || ''}</h6>
            <div className='details small text-muted d-flex flex-column gap-1'>
              <p><strong>Sector :</strong> Technology</p>
              <p>
                <strong>Location :</strong>{' '}
                {[companyProfile?.company_street_address, companyProfile?.company_city, companyProfile?.company_state].filter(Boolean).join(', ')}
                {companyProfile?.company_postal_code && ` - ${companyProfile.company_postal_code}`}
                {companyProfile?.company_country && `, ${companyProfile.company_country}`}
              </p>
              <p><strong>Screen name :</strong> CapavateAngel</p>
            </div>
          </div>
        )}

        {/* Completely Static Menu Items - No Loops */}
        <ul className='nav flex-column gap-1 w-100 snavbar'>
          {renderMenuItems()}
        </ul>
      </div>

      {showModal && <JoinWaitlist setShowModal={setShowModal} />}
      {showWaitListPopup && <WaitListPopup setShowModal={setShowWaitListPopup} />}
    </>
  )
}