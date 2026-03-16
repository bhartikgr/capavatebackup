import React, { useState, useEffect, useCallback } from "react";
import SideBar from '../../../components/social/SideBar'
import TopBar from '../../../components/social/TopBar'
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../config/config.js";
import { Pie, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import CurrencyFormatter from "../../../components/CurrencyFormatter.jsx";
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
);

export default function RecordRoundCaptable() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL_CAPTABLE = `${API_BASE_URL}api/user/capitalround/`;
  const apiUrlRound = API_BASE_URL + "api/user/capitalround/";
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const userLogin = storedUsername ? JSON.parse(storedUsername) : null;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [capTableData, setCapTableData] = useState({
    pre_money: { items: [], totals: {} },
    post_money: { items: [], totals: {} }
  });
  const [roundData, setRoundData] = useState(null);
  const [pendingConversions, setPendingConversions] = useState([]);
  const [calculations, setCalculations] = useState({});
  const [summaryDetails, setSummaryDetails] = useState(null);

  // Chart states
  const [preMoneyChartData, setPreMoneyChartData] = useState(null);
  const [postMoneyChartData, setPostMoneyChartData] = useState(null);

  const [activeTab, setActiveTab] = useState("pre-money");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [conversionStatus, setConversionStatus] = useState(null);
  const [conversionData, setConversionData] = useState([]); // ✅ ADD THIS LINE
  // Format currency function

  const [currencyMap, setCurrencyMap] = useState({});


  // Fetch currency symbols from API
  useEffect(() => {
    const getCountrySymbolList = async () => {
      let formData = { id: "" };
      try {
        const res = await axios.post(
          apiUrlRound + "getallcountrySymbolList",
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const respo = res.data.results;

        // Create a map of currency_code -> currency_symbol for quick lookup
        const currencySymbolMap = {};
        respo.forEach(country => {
          if (country.currency_code && !currencySymbolMap[country.currency_code]) {
            currencySymbolMap[country.currency_code] = {
              symbol: country.currency_symbol,
              name: country.currency_name
            };
          }
        });

        setCurrencyMap(currencySymbolMap);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching currency symbols:', err);
        setLoading(false);
      }
    };

    getCountrySymbolList();
  }, [apiUrlRound]);
  const formatCurrency = (amount, currency = 'USD') => {
    const numAmount = parseFloat(amount) || 0;
    const cleanCurrency = currency?.trim() || ' ';

    // Get symbol from map or fallback
    const currencyInfo = currencyMap[cleanCurrency.toUpperCase()];
    const symbol = currencyInfo?.symbol || '';

    try {
      // Use Intl.NumberFormat if currency is valid
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: cleanCurrency.toUpperCase(),
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numAmount);
    } catch (error) {
      // Fallback: Use symbol from database with commas
      const formattedNumber = numAmount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      if (symbol) {
        return `${symbol} ${formattedNumber}`;
      }
      return `${cleanCurrency} ${formattedNumber}`;
    }
  };
  const formatCurrencyNotRound = (amount, currency = 'USD') => {
    const numAmount = parseFloat(amount) || 0;
    const cleanCurrency = currency?.trim() || ' ';

    // Get symbol from map or fallback
    const currencyInfo = currencyMap[cleanCurrency.toUpperCase()];
    const symbol = currencyInfo?.symbol || '';

    try {
      // Use Intl.NumberFormat if currency is valid
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: cleanCurrency.toUpperCase(),
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(numAmount);
    } catch (error) {
      // Fallback: Use symbol from database with commas
      const formattedNumber = numAmount.toLocaleString("en-US", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      });
      if (symbol) {
        return `${symbol} ${formattedNumber}`;
      }
      return `${cleanCurrency} ${formattedNumber}`;
    }
  };

  const formatPercentage = (value) => {
    if (!value && value !== 0) return '0.00%';
    return `${parseFloat(value).toFixed(2)}%`;
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return '0';
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Data fetching function
  const getCapTableData = useCallback(async () => {
    if (!id || !userLogin) {
      setError("Missing required parameters");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const formData = {
      company_id: userLogin.companies[0].id,
      round_id: id,
    };

    try {
      const res = await axios.post(
        API_URL_CAPTABLE + "getRoundCapTableSingleRecord",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        const capTable = res.data.cap_table || {
          pre_money: { items: [], totals: {} },
          post_money: { items: [], totals: {} }
        };
        console.log(res.data)
        setCapTableData(capTable);
        setConversionStatus(res.data.conversion_status);
        setRoundData(res.data.round || null);
        setPendingConversions(res.data.pending_conversions || []);
        setCalculations(res.data.calculations || {});
        setConversionData(res.data.conversions || []);
        // Calculate summary details based on CPAVATE formulas
        calculateSummaryDetails(res.data);

        // Prepare chart data
        if (capTable?.pre_money?.items?.length > 0) {

          // ✅ STEP 1: Items ko expand karo (grouped investors → individual)
          const expandedItems = [];

          capTable.pre_money.items.forEach((item, originalIndex) => {

            if (item.type === 'investor') {
              const detailsArr = Array.isArray(item.investor_details) ? item.investor_details : [];

              if (detailsArr.length <= 1) {
                // Single investor 0 directly add
                const inv = detailsArr[0] || {};
                const name = `${inv.firstName || ''} ${inv.lastName || ''}`.trim() || item.name || 'Investor';
                expandedItems.push({
                  ...item,
                  _displayName: `👤 ${name}`,
                  _shares: item.shares || 0,
                  _email: inv.email || '',
                  _phone: inv.phone || '',
                  _originalIndex: originalIndex,
                  _isExpanded: false,
                });
              } else {
                // Multiple investors 0 each investor alag row
                // Group shares equally split (ya per-investor shares agar available ho)
                const perInvShares = Math.round((item.shares || 0) / detailsArr.length);

                detailsArr.forEach((inv, invIdx) => {
                  const name = `${inv.firstName || ''} ${inv.lastName || ''}`.trim() || `Investor ${invIdx + 1}`;
                  expandedItems.push({
                    ...item,
                    _displayName: `👤 ${name}`,
                    _shares: inv.shares || perInvShares,  // use individual shares if available
                    _email: inv.email || '',
                    _phone: inv.phone || '',
                    _originalIndex: originalIndex,
                    _isExpanded: true,
                    _invIdx: invIdx,
                    _groupName: item.name,
                    _inv: inv,
                  });
                });
              }
            }

            else if (item.type === 'founder') {
              expandedItems.push({
                ...item,
                _displayName: `${item.founder_code || 'F'} - ${item.name}`,
                _shares: item.shares || 0,
                _email: item.email || '',
                _phone: item.phone || '',
                _originalIndex: originalIndex,
                _isExpanded: false,
              });
            }

            else if (item.type === 'option_pool') {
              expandedItems.push({
                ...item,
                _displayName: 'Employee Option Pool',
                _shares: item.shares || 0,
                _email: '',
                _phone: '',
                _originalIndex: originalIndex,
                _isExpanded: false,
              });
            }

            // ✅ FIXED: pending_group ke har investor ke liye alag entry
            else if (item.type === 'pending_group') {
              const pendingInvestors = item.items || [];

              if (pendingInvestors.length > 0) {
                pendingInvestors.forEach(inv => {
                  const invDetails = inv.investor_details || {};
                  const name = inv.name ||
                    `${invDetails.firstName || ''} ${invDetails.lastName || ''}`.trim() ||
                    'Pending Investor';

                  expandedItems.push({
                    ...inv,
                    // Group info bhi rakho reference ke liye
                    _groupRoundName: item.round_name,
                    _groupInstrumentType: item.instrument_type,
                    _displayName: `👤 ${name}`,
                    _shares: 0,  // pending = 0 in chart
                    _email: invDetails.email || inv.email || '',
                    _phone: invDetails.phone || inv.phone || '',
                    _originalIndex: originalIndex,
                    _isExpanded: false,
                    _isPending: true,
                  });
                });
              } else {
                // Fallback — group level entry
                expandedItems.push({
                  ...item,
                  _displayName: `👤 ${item.round_name || 'Pending Investor'}`,
                  _shares: 0,
                  _email: '',
                  _phone: '',
                  _originalIndex: originalIndex,
                  _isExpanded: false,
                  _isPending: true,
                });
              }
            }
          });

          // ✅ STEP 2: Colors array (enough for expanded items)
          const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
            '#8AC926', '#1982C4', '#6A0572', '#118AB2', '#06D6A0', '#FFD166',
            '#E5989B', '#B5838D', '#6D6875', '#FFB4A2', '#C9CBFF', '#FDFFB6',
          ];

          const preMoneyData = {
            labels: expandedItems.map(item => item._displayName),
            datasets: [{
              label: 'Shares',
              data: expandedItems.map(item => item._shares),
              backgroundColor: expandedItems.map((item, i) =>
                item.type === 'pending' ? '#FFC107' : colors[i % colors.length]
              ),
              borderWidth: 1,
            }],
            // ✅ Store expanded items for tooltip/legend access
            _expandedItems: expandedItems,
          };

          setPreMoneyChartData(preMoneyData);
        }

        // Prepare Post-Money Chart Data
        // Prepare Post-Money Chart Data - UPDATED with proper labels
        if (capTable?.post_money?.items?.length > 0) {
          // ✅ STEP 1: Items ko expand karo - HAR INVESTOR ALAG ROW
          const expandedItems = [];

          capTable.post_money.items.forEach((item, originalIndex) => {
            // INVESTOR TYPE - with array of investors
            if (item.type === 'investor' && Array.isArray(item.investor_details) && item.investor_details.length > 0) {
              // Multiple investors in array - create separate entry for EACH
              item.investor_details.forEach((inv, invIdx) => {
                const shareType = item.share_class_type || '';
                const investorName = `${inv.firstName || ''} ${inv.lastName || ''}`.trim() || inv.name || `Investor ${invIdx + 1}`;

                // Calculate per-investor shares (split equally if not available individually)
                const perInvShares = item.shares ? Math.round(item.shares / item.investor_details.length) : 0;

                expandedItems.push({
                  ...item,
                  _displayName: `👤 ${investorName}${shareType ? ` (${shareType})` : ''}`,
                  _shares: inv.shares || perInvShares,
                  _email: inv.email || '',
                  _phone: inv.phone || '',
                  _originalIndex: originalIndex,
                  _type: 'investor',
                  _isPrevious: true,
                  _roundName: item.round_name,
                  _investmentAmount: inv.investment_amount || item.investment_amount,
                  _groupId: item.name, // Store group name for reference
                });
              });
            }
            // INVESTOR TYPE - single investor (no array)
            else if (item.type === 'investor') {
              const inv = item.investor_details || {};
              const shareType = item.share_class_type || '';
              const investorName = `${inv.firstName || ''} ${inv.lastName || ''}`.trim() || item.name || 'Investor';

              let icon = '👤';
              if (item.is_new_investment) icon = '🆕';
              if (item.is_converted) icon = '🔄';

              expandedItems.push({
                ...item,
                _displayName: `${icon} ${investorName}${shareType ? ` (${shareType})` : ''}`,
                _shares: item.shares || 0,
                _email: inv.email || item.email || '',
                _phone: inv.phone || item.phone || '',
                _originalIndex: originalIndex,
                _type: 'investor',
                _isNew: item.is_new_investment,
                _isPrevious: item.is_previous,
                _roundName: item.round_name,
                _investmentAmount: item.investment_amount,
              });
            }
            // FOUNDER TYPE
            else if (item.type === 'founder') {
              expandedItems.push({
                ...item,
                _displayName: `${item.founder_code || 'F'} - ${item.name}`,
                _shares: item.shares || 0,
                _email: item.email || '',
                _phone: item.phone || '',
                _originalIndex: originalIndex,
                _type: 'founder',
              });
            }
            // OPTION POOL
            else if (item.type === 'option_pool') {
              expandedItems.push({
                ...item,
                _displayName: 'Employee Option Pool',
                _shares: item.shares || 0,
                _existing_shares: item.existing_shares,
                _new_shares: item.new_shares,
                _originalIndex: originalIndex,
                _type: 'option_pool',
              });
            }
            // PENDING (SAFE)
            // ✅ Legacy flat 'pending' items ke liye fallback (Safe etc.)
            else if (item.type === 'pending_group') {
              const investors = item.items || [];

              if (investors.length > 0) {
                investors.forEach(inv => {
                  const invDetails = inv.investor_details || {};
                  const name = inv.name ||
                    `${invDetails.firstName || ''} ${invDetails.lastName || ''}`.trim() ||
                    'Pending Investor';

                  expandedItems.push({
                    ...inv,
                    _displayName: `👤 ${name} (${item.round_name})`,
                    _shares: 0,
                    _email: invDetails.email || inv.email || '',
                    _phone: invDetails.phone || inv.phone || '',
                    _originalIndex: originalIndex,
                    _type: 'pending',
                    _isPending: true,
                    _groupRoundName: item.round_name,
                    _groupInstrumentType: item.instrument_type,
                    // ✅ investor level se fields lo — group level se nahi
                    investment: parseFloat(inv.investment) || 0,
                    potential_shares: inv.potential_shares || 0,
                    discount_rate: inv.discount_rate || 0,
                    valuation_cap: inv.valuation_cap || 0,
                    conversion_price: inv.conversion_price || 0,
                    interest_rate: inv.interest_rate || 0,
                    years: inv.years || 0,
                    interest_accrued: inv.interest_accrued || 0,
                    total_conversion_amount: inv.total_conversion_amount || parseFloat(inv.investment) || 0,
                    maturity_date: inv.maturity_date || null,
                  });
                });
              } else {
                // Fallback — group level
                expandedItems.push({
                  ...item,
                  _displayName: `👤 ${item.round_name || 'Pending Investor'}`,
                  _shares: 0,
                  _email: '',
                  _phone: '',
                  _originalIndex: originalIndex,
                  _type: 'pending',
                  _isPending: true,
                });
              }
            }
          });

          // ✅ STEP 2: Colors array
          const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
            '#8AC926', '#1982C4', '#6A0572', '#118AB2', '#06D6A0', '#FFD166',
            '#E5989B', '#B5838D', '#6D6875', '#FFB4A2', '#C9CBFF', '#FDFFB6',
          ];

          const postMoneyData = {
            labels: expandedItems.map(item => item._displayName),
            datasets: [{
              label: 'Shares',
              data: expandedItems.map(item => item._shares),
              backgroundColor: expandedItems.map((item, i) =>
                item.type === 'pending' ? '#FFC107' : colors[i % colors.length]
              ),
              borderWidth: 1,
            }],
            // ✅ Store expanded items for legend
            _expandedItems: expandedItems,
          };

          setPostMoneyChartData(postMoneyData);
        }
      } else {
        setError(res.data.message || "Failed to load cap table");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error loading cap table data");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  }, [id, userLogin, API_URL_CAPTABLE]);

  const isUnpricedRound = roundData?.instrument === 'Safe' || roundData?.instrument === 'Convertible Note';
  const isConverted = conversionStatus?.is_converted === true;
  const isSeedRound = roundData?.instrument === 'Safe' && roundData?.issued_shares === 0 && roundData?.type !== 'Round 0';
  const isSeriesA = roundData?.instrument === 'Preferred Equity';
  const isRound0 = roundData?.type === 'Round 0';

  // ✅ DISPLAY VALUES
  let displaySharePrice = '';
  let displayIssuedShares = '';

  if (isUnpricedRound) {
    if (isConverted) {
      displaySharePrice = roundData?.share_price;
      displayIssuedShares = conversionStatus.converted_shares;
    } else {
      displaySharePrice = 'N/A';
      displayIssuedShares = 'N/A';
    }
  } else {
    displaySharePrice = roundData?.share_price;
    displayIssuedShares = capTableData?.post_money?.totals?.total_new_shares;
  }

  // Calculate summary details based on CPAVATE formulas
  const calculateSummaryDetails = (data) => {
    if (!data.cap_table || !data.round) return;

    const preMoneyTable = data.cap_table.pre_money;
    const postMoneyTable = data.cap_table.post_money;
    const round = data.round;

    const preMoneyVal = parseFloat(round.pre_money) || 0;
    const investment = parseFloat(round.investment) || 0;
    const postMoneyVal = preMoneyVal + investment;

    const totalSharesPre = preMoneyTable.totals.total_shares || 0;
    const totalSharesPost = postMoneyTable.totals.total_shares || 0;

    const sharePricePre = totalSharesPre > 0 ? preMoneyVal / totalSharesPre : 0;
    const sharePricePost = totalSharesPost > 0 ? postMoneyVal / totalSharesPost : 0;

    const founderShares = preMoneyTable.items.filter(item => item.type === 'founder').reduce((sum, item) => sum + item.shares, 0);
    const founderValuePre = founderShares * sharePricePre;
    const founderValuePost = founderShares * sharePricePost;

    const investorShares = postMoneyTable.items.filter(item => item.type === 'investor').reduce((sum, item) => sum + item.shares, 0);
    const investorValue = investorShares * sharePricePost;

    const optionPoolShares = postMoneyTable.totals.total_option_pool || 0;
    const optionPoolValue = optionPoolShares * sharePricePost;

    setSummaryDetails({
      founderValuePre: founderValuePre,
      founderValuePost: founderValuePost,
      investorValue: investorValue,
      optionPoolValue: optionPoolValue,
      sharePricePre: sharePricePre,
      sharePricePost: sharePricePost,
      totalSharesPre: totalSharesPre,
      totalSharesPost: totalSharesPost,
    });
  };

  useEffect(() => {
    getCapTableData();
  }, []);

  function formatCurrentDate(input) {
    const date = new Date(input);
    if (isNaN(date)) return "";

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const getOrdinal = (n) => {
      if (n >= 11 && n <= 13) return "th";
      switch (n % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${month} ${day}${getOrdinal(day)}, ${year}`;
  }
  const formatIncorporationDate = (value) => {
    if (!value) return "Not provided";

    // Only year
    if (/^\d{4}$/.test(value)) {
      return value;
    }

    // Full date
    return formatCurrentDate(value);
  };

  // ============================================
  // Add this function in your component before return
  // ============================================

  const getOwnershipStats = (items) => {
    const founders = items.filter(item => item.type === 'founder');

    if (founders.length === 0) {
      return { largest: 0, smallest: 0, votingCount: 0, totalFounders: 0 };
    }

    const percentages = founders.map(f => parseFloat(f.percentage || 0));
    const largest = Math.max(...percentages);
    const smallest = Math.min(...percentages);

    const votingCount = founders.filter(f =>
      f.voting === 'voting' || f.voting === true || f.voting === 'yes'
    ).length;

    return {
      largest: largest.toFixed(1),
      smallest: smallest.toFixed(1),
      votingCount: founders.length,
      totalFounders: founders.length
    };
  };

  // Use it
  const stats = getOwnershipStats(capTableData?.pre_money?.items || []);


  const getPostMoneyOwnershipStats = (items = []) => {
    if (!items.length) {
      return { largest: '0.00', smallest: '0.00', totalCount: 0 };
    }

    const percentages = [];
    let totalIndividualCount = 0;

    items.forEach(item => {
      // ✅ INVESTOR TYPE - with investor_details array
      if (item.type === 'investor' && Array.isArray(item.investor_details) && item.investor_details.length > 0) {
        // Group with multiple investors - count each investor individually
        item.investor_details.forEach(inv => {
          const invPct = parseFloat(inv.percentage) || 0;
          if (invPct > 0) percentages.push(invPct);
          totalIndividualCount++;

        });
      }
      // ✅ INVESTOR TYPE - single investor (no array)
      else if (item.type === 'investor') {
        const pct = parseFloat(item.percentage) || 0;
        if (pct > 0) percentages.push(pct);
        totalIndividualCount++;

      }
      // ✅ FOUNDER TYPE
      else if (item.type === 'founder') {
        const pct = parseFloat(item.percentage) || 0;
        if (pct > 0) percentages.push(pct);
        totalIndividualCount++;

      }
      // ✅ OPTION POOL TYPE
      else if (item.type === 'option_pool') {
        const pct = parseFloat(item.percentage) || 0;
        if (pct > 0) percentages.push(pct);
        totalIndividualCount++;
      }
      // ✅ PENDING TYPE (SAFE investors)
      else if (item.type === 'pending_group') {
        if (Array.isArray(item.items) && item.items.length > 0) {
          totalIndividualCount += item.items.length;
        } else {
          totalIndividualCount++;
        }
      }
    });

    const largest = percentages.length > 0 ? Math.max(...percentages) : 0;
    const smallest = percentages.length > 0 ? Math.min(...percentages) : 0;

    return {
      largest: largest.toFixed(2),
      smallest: smallest.toFixed(2),
      totalCount: totalIndividualCount,
      debug: {
        percentagesFound: percentages.length,
        itemsProcessed: items.length,
        largestValue: largest,
        smallestValue: smallest
      }
    };
  };


  // Helper function to get voting count
  const getVotingCount = (items) => {
    return items.filter(item =>
      item.voting === 'voting' ||
      item.voting === 'non-voting' ||
      item.voting === true ||
      item.voting === 'yes' ||
      item.voting === 'voting_rights'
    ).length;
  };

  // Use it in your component

  // Use it in your component
  const postStats = getPostMoneyOwnershipStats(capTableData?.post_money?.items || []);

  const postMoneyItems = capTableData?.post_money?.items || [];

  const totalCommonShares = postMoneyItems.reduce((sum, item) => {
    // founders + previous investors + option existing shares
    if (item.type === 'founder') return sum + Number(item.shares || 0);
    if (item.type === 'investor' && item.is_previous) return sum + Number(item.shares || 0);
    if (item.type === 'option_pool') return sum + Number(item.existing_shares || item.shares || 0);
    return sum;
  }, 0);

  const totalNewShares = postMoneyItems.reduce((sum, item) => {
    // new investors + option pool new shares
    if (item.type === 'investor' && item.is_new_investment) return sum + Number(item.shares || 0);
    if (item.type === 'option_pool') return sum + Number(item.new_shares || 0);
    return sum;
  }, 0);
  const [expandedRows, setExpandedRows] = useState({});
  const toggleRow = (rowKey) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowKey]: !prev[rowKey]
    }));
  };

  // Render loading state
  if (loading) {
    return (
      <Wrapper>
        <div className="fullpage d-block">
          <div className="d-flex align-items-start gap-0">
            <ModuleSideNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div className={`global_view ${isCollapsed ? "global_view_col" : ""}`}>
              <TopBar />
              <SectionWrapper className="d-block p-md-4 p-3">
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading Cap Table Data...</p>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // Render error state
  if (error && !roundData) {
    return (

      <main>
        <div className='d-flex align-items-start gap-0'>
          <SideBar />
          <div className='d-flex flex-grow-1 flex-column gap-0'>
            <TopBar />
            <section className='px-md-3 py-4'>
              <div className='container-fluid'>
                <div className='row gy-4'>
                  <div className='col-md-12 order-1 order-md-0'>
                    <SectionWrapper className="d-block p-md-4 p-3">
                      <div className="alert alert-danger">
                        <h5>Error Loading Cap Table</h5>
                        <p>{error}</p>
                        <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
                        <button className="btn btn-secondary ms-2" onClick={getCapTableData}>Try Again</button>
                      </div>
                    </SectionWrapper>
                  </div>

                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
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
                <div className='col-md-12 order-1 order-md-0'>
                  <SectionWrapper className="d-block p-md-4 p-3">

                    {error && (
                      <div className="alert alert-danger mb-4">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                      </div>
                    )}

                    {/* Round Header */}
                    {roundData && (
                      <div className="card mb-4">
                        <div className="card-header bg-primary text-white">
                          <h4 className="mb-0">Round: {roundData.name}</h4>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-4">
                              <p>
                                <strong>Type:</strong>{' '}
                                {roundData?.type === 'Round 0' ? (
                                  <span>Incorporation Round 0</span>
                                ) : (
                                  <span>{roundData?.instrument}</span>
                                )}
                              </p>
                              <p><strong>Status:</strong>
                                <span className={`badge ${roundData.status === 'CLOSED' ? 'bg-success' : 'bg-warning'} ms-2`}>
                                  {roundData.status || 'ACTIVE'}
                                </span>
                              </p>
                              <p><strong>Date of Incorporation:</strong> {formatIncorporationDate(roundData.incorporation_date) || 'Not specified'}</p>
                            </div>
                            {roundData?.type !== 'Round 0' && (
                              <div className="col-md-4">
                                <p><strong>
                                  {roundData?.instrument === "Safe" || roundData?.instrument === "Convertible Note"
                                    ? "Company Valuation"
                                    : "Pre-Money"}
                                  :
                                </strong> {<CurrencyFormatter
                                  amount={roundData.pre_money}
                                  currency={roundData.currency}
                                />} </p>
                                <p><strong>Investment:</strong> {<CurrencyFormatter
                                  amount={roundData.investment}
                                  currency={roundData.currency}
                                />} </p>
                                {roundData?.instrument !== "Safe" && roundData?.instrument !== "Convertible Note" && (
                                  <p>
                                    <strong>Post-Money:</strong>{" "}
                                    <CurrencyFormatter
                                      amount={capTableData?.post_money?.totals?.total_value}
                                      currency={roundData.currency}
                                    />
                                  </p>
                                )}
                              </div>
                            )}
                            <div className="col-md-4">
                              <p><strong>Share Price:</strong> {
                                isUnpricedRound && !isConverted
                                  ? 'N/A'
                                  : <CurrencyFormatter
                                    amount={displaySharePrice}
                                    currency={roundData?.currency}
                                    digit={3}
                                  />

                              }</p>
                              <p><strong>Issued Shares:</strong> {
                                isUnpricedRound && !isConverted
                                  ? 'N/A'
                                  : formatNumber(displayIssuedShares)
                              }</p>
                              {isUnpricedRound && (
                                <p>
                                  <strong>Status:</strong>{' '}
                                  <span className={isConverted ? 'text-success' : 'text-warning'}>
                                    {conversionStatus?.message || (isConverted ? '✅ Converted' : '👤 Not Converted')}
                                  </span>
                                </p>
                              )}
                              {isUnpricedRound && isConverted && (
                                <div className="mt-2 p-2 bg-light rounded">
                                  <small>
                                    <strong>Converted in:</strong> Round {conversionStatus.converted_in_round} ({conversionStatus.converted_round_name})<br />
                                    <strong>Conversion Price:</strong> <CurrencyFormatter
                                      amount={conversionStatus.conversion_price}
                                      currency={roundData?.currency}
                                      digit={3}
                                    />
                                    <br />
                                    <strong>Converted Shares:</strong> {formatNumber(conversionStatus.converted_shares)}
                                  </small>
                                </div>
                              )}
                              {/* ✅ OPTION POOL HEADING - DYNAMIC BASED ON ROUND TYPE */}
                              {roundData?.type !== 'Round 0' && (
                                <p>
                                  {(() => {
                                    const isPricedRound =
                                      roundData?.instrument === 'Common Stock' ||
                                      roundData?.instrument === 'Preferred Equity' || roundData?.instrument === 'Safe' || roundData?.instrument === 'Convertible Note';

                                    const existingPool = parseFloat(roundData?.option_pool_percent || 0);
                                    const targetPool = parseFloat(roundData?.option_pool_percent_post || 0);

                                    // 🚫 UNPRICED ROUND
                                    if (!isPricedRound) {
                                      return (
                                        <>
                                          <strong>Pre Option Pool:</strong>{' '}
                                          <span className="fw-bold text-success">
                                            {formatPercentage(targetPool)}
                                          </span>
                                        </>
                                      );
                                    }

                                    // 🎯 PRICED ROUND
                                    return (
                                      <>
                                        {targetPool > 0 ? (
                                          <>
                                            <strong>Post Option Pool:</strong>{' '}
                                            <span className="fw-bold text-primary">
                                              {formatPercentage(targetPool)}
                                            </span>
                                          </>
                                        ) : existingPool > 0 ? (
                                          <>
                                            <strong>Pre Option Pool:</strong>{' '}
                                            <span className="fw-bold text-success">
                                              {formatPercentage(existingPool)}
                                            </span>
                                          </>
                                        ) : null}
                                      </>
                                    );
                                  })()}
                                </p>
                              )}

                            </div>
                          </div>
                          {roundData?.type !== 'Round 0' && (
                            <div className="row">
                              {roundData?.round_target_money > 0 && (
                                <div className="col-12 mt-2">
                                  <div className="custome_card">
                                    <div className="custome_card_body py-3">
                                      <div className="row">
                                        <div className="col-md-3">
                                          <div className="d-flex custome_card_box flex-column gap-3">
                                            <p className="mb-0 bg-success custome_cardp">
                                              <i className="bi bi-bullseye me-1"></i>
                                              Target Investment
                                            </p>
                                            <h5 className="mb-0 text-success">
                                              <CurrencyFormatter
                                                amount={roundData.round_target_money}
                                                currency={roundData?.currency}
                                              />
                                            </h5>
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="d-flex custome_card_box flex-column gap-3">
                                            <p className="mb-0 bg-primary  custome_cardp">Current Investment</p>
                                            <h5 className="mb-0 text-primary ">
                                              <CurrencyFormatter
                                                amount={roundData?.investment}
                                                currency={roundData?.currency}
                                              />
                                            </h5>
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="d-flex custome_card_box flex-column gap-3">
                                            <p className="mb-0 bg-danger custome_cardp">Remaining to Target</p>
                                            <h5 className="mb-0" style={{
                                              color: (roundData.round_target_money - parseFloat(roundData.investment)) > 0
                                                ? '#CC0000'
                                                : '#28a745'
                                            }}>
                                              <CurrencyFormatter
                                                amount={Math.max(0, roundData.round_target_money - parseFloat(roundData.investment))}
                                                currency={roundData?.currency}
                                              />
                                            </h5>
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="d-flex custome_card_box flex-column gap-3 h-100">
                                            <div className="d-flex align-items-center justify-content-between">
                                              <p className="mb-0 custome_cardp bg-info">Achieved</p>
                                              <h5 className="mb-0">
                                                {((parseFloat(roundData.investment) / roundData.round_target_money) * 100).toFixed(2)}%
                                              </h5>
                                            </div>
                                            <div className="progress mt-1" style={{ height: '6px' }}>
                                              <div
                                                className="progress-bar bg-warning"
                                                style={{
                                                  width: `${(parseFloat(roundData.investment) / roundData.round_target_money) * 100}%`
                                                }}
                                              ></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="mb-4">
                      <ul className="nav nav-tabs gap-1">
                        {roundData?.type !== 'Round 0' && (
                          <li className="nav-item bg-primary">
                            <button
                              className={`nav-link text-white backcolor ${activeTab === 'pre-money' ? 'active' : ''}`}
                              onClick={() => setActiveTab('pre-money')}
                            >
                              Pre-Money Cap Table
                            </button>
                          </li>
                        )}
                        {roundData?.type !== 'Round 0' && (
                          <li className="nav-item bg-primary">
                            <button
                              className={`nav-link text-white backcolor ${activeTab === 'post-money' ? 'active' : ''}`}
                              onClick={() => setActiveTab('post-money')}
                            >
                              Post-Money Cap Table
                            </button>
                          </li>
                        )}
                        {roundData?.type !== 'Round 0' && (
                          <li className="nav-item bg-primary">
                            <button
                              className={`nav-link text-white backcolor ${activeTab === 'summary' ? 'active' : ''}`}
                              onClick={() => setActiveTab('summary')}
                            >
                              Chat & Analysis
                            </button>
                          </li>
                        )}
                        {pendingConversions.length > 0 && (
                          <li className="nav-item bg-primary">
                            <button
                              className={`nav-link text-white backcolor ${activeTab === 'pending' ? 'active' : ''}`}
                              onClick={() => setActiveTab('pending')}
                            >
                              Pending Conversions
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                    {/* ========== PRE-MONEY CAP TABLE - FIXED ========== */}
                    {activeTab === 'pre-money' && roundData?.type === 'Round 0' && (
                      <div className="card">
                        <div className="card-header bg-light">
                          {roundData?.type === 'Round 0' ? (
                            <h5 className="mb-0">Incorporation Capitalization Table</h5>
                          ) : (
                            <h5 className="mb-0">Pre-Money Capitalization Table</h5>
                          )}

                        </div>
                        <div className="card-body">
                          <div className="table-responsive mt-4">
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Shareholder</th>
                                  <th className="text-end">Shares</th>
                                  <th className="text-end">Ownership %</th>
                                  <th className="text-end">Currency Value</th>
                                  {/*<th>Details</th>*/}
                                </tr>
                              </thead>
                              <tbody>
                                {/* Founders - PRE-MONEY DISPLAY VALUE use karo */}
                                {capTableData?.pre_money?.items
                                  ?.filter(item => item.type === 'founder')
                                  .map((item, index) => (
                                    <tr key={`founder-${index}`}>
                                      <td><span className="badge bg-info me-2">{item.founder_code || `F${index + 1}`}</span></td>
                                      <td>
                                        <strong>{item.name}</strong>
                                        {item.email && <div className="small text-muted">{item.email}</div>}
                                      </td>
                                      <td className="text-end">
                                        {Number(item.shares) > 0
                                          ? Number(item.shares).toLocaleString()
                                          : item.shares}
                                      </td>

                                      <td className="text-end fw-bold text-primary">{item.percentage}%</td>
                                      <td className="text-end fw-bold text-primary">
                                        {/* ✅ FIX: Use pre_money_display_value instead of value */}
                                        {<CurrencyFormatter
                                          amount={item.pre_money_display_value || item.value}
                                          currency={roundData.currency}
                                        />}
                                      </td>
                                      {/* <td>
                                  <small>Type: {item.share_type || 'common'}<br />Voting: {item.voting || 'voting'}</small>
                                </td> */}
                                    </tr>
                                  ))}

                                {/* Option Pool - PRE-MONEY DISPLAY VALUE use karo */}
                                {/* Option Pool - SINGLE ENTRY (all option pools combined) */}
                                {(() => {
                                  // Get all option pool items
                                  const optionItems = capTableData?.pre_money?.items
                                    ?.filter(item => item.type === 'option_pool') || [];

                                  if (optionItems.length === 0) return null;

                                  // Calculate total option shares
                                  const totalOptionShares = optionItems.reduce((sum, item) => sum + (item.shares || 0), 0);

                                  // Calculate weighted average percentage
                                  const totalShares = capTableData?.pre_money?.totals?.total_shares || 0;
                                  const optionPercentage = totalShares > 0
                                    ? ((totalOptionShares / totalShares) * 100).toFixed(2)
                                    : '0.00';

                                  // Calculate total value
                                  const preMoneyVal = parseFloat(roundData?.pre_money) || 0;
                                  const optionValue = totalShares > 0
                                    ? (totalOptionShares / totalShares) * preMoneyVal
                                    : 0;

                                  // Get creation details
                                  const createdInRounds = optionItems
                                    .map(item => item.round_name || `Round ${item.round_id}`)
                                    .join(', ');

                                  return (
                                    <tr key="option-pool-combined" className="table-info">
                                      <td><span className="badge bg-warning me-2">O</span></td>
                                      <td>
                                        <strong>Employee Option Pool</strong>
                                        {optionItems.length > 1 && (
                                          <div className="small text-muted">
                                            Combined from: {createdInRounds}
                                          </div>
                                        )}
                                      </td>
                                      <td className="text-end">{Number(totalOptionShares).toLocaleString()}</td>
                                      <td className="text-end fw-bold text-warning">{optionPercentage}%</td>
                                      <td className="text-end fw-bold text-warning">
                                        {<CurrencyFormatter
                                          amount={optionValue}
                                          currency={roundData.currency}
                                        />}
                                      </td>
                                      {/* <td>
                                  <small>
                                    {optionItems.length === 1 ? (
                                      <>From {optionItems[0].round_name || `Round ${optionItems[0].round_id}`}</>
                                    ) : (
                                      <>
                                        <div>Total pools: {optionItems.length}</div>
                                        <div className="text-muted">
                                          {optionItems.map((item, i) => (
                                            <span key={i}>
                                              {i > 0 && ' + '}
                                              {item.shares?.toLocaleString()} shares
                                            </span>
                                          ))}
                                        </div>
                                      </>
                                    )}
                                  </small>
                                </td> */}
                                    </tr>
                                  );
                                })()}

                                {/* Investors in Pre-Money (if any) */}
                                {capTableData?.pre_money?.items
                                  ?.filter(item => item.type === 'investor')
                                  .map((item, index) => (
                                    <tr key={`investor-${index}`} className="table-success">
                                      <td><span className="badge bg-success me-2">I</span></td>
                                      <td><strong>{item.name}</strong></td>
                                      <td className="text-end">{Number(item.shares).toLocaleString()}</td>
                                      <td className="text-end">{item.percentage}%</td>
                                      <td className="text-end fw-bold text-success">
                                        {<CurrencyFormatter
                                          amount={item.pre_money_display_value || item.value}
                                          currency={roundData.currency}
                                        />}
                                      </td>
                                      {/* <td><small>{item.round_name}</small></td> */}
                                    </tr>
                                  ))}

                                {/* Pending Instruments */}
                                {capTableData?.pre_money?.items
                                  ?.filter(item => item.type === 'pending')
                                  .map((item, index) => (
                                    <tr key={`pending-${index}`} className="table-warning">
                                      <td><span className="badge bg-warning me-2">👤</span></td>
                                      <td><strong>{item.name}</strong></td>
                                      <td className="text-end text-muted">0</td>
                                      <td className="text-end text-muted">0.00%</td>
                                      <td className="text-end text-muted">0</td>
                                      {/* <td>
                                  <small>
                                    Investment: <CurrencyFormatter
                                      amount={item.investment}
                                      currency={roundData?.currency}
                                    />

                                    {item.discount_rate > 0 && <div>Discount: {item.discount_rate}%</div>}
                                    {item.valuation_cap > 0 && <div>Cap: <CurrencyFormatter
                                      amount={item.valuation_cap}
                                      currency={roundData?.currency}
                                    />
                                    </div>}
                                    {item.interest_rate > 0 && <div>Interest: {item.interest_rate}%</div>}
                                  </small>
                                </td> */}
                                    </tr>
                                  ))}
                              </tbody>
                              <tfoot className="table-light">
                                <tr>
                                  <th colSpan="2">TOTAL</th>
                                  <th className="text-end"><CurrencyFormatter
                                    amount={capTableData?.pre_money?.totals?.total_shares}
                                    currency={" "}
                                    digit={0}
                                  /></th>
                                  <th className="text-end">100%</th>
                                  <th className="text-end fw-bold text-primary">
                                    <CurrencyFormatter
                                      amount={capTableData?.pre_money?.totals?.total_value}
                                      currency={roundData?.currency}
                                    />

                                  </th>
                                  {/* <th></th> */}
                                </tr>
                                {/* Optional: Show original Round 0 value for reference */}

                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'pre-money' && roundData?.type !== 'Round 0' && (
                      <div className="card">
                        <div className="card-header bg-light">
                          <h5 className="mb-0">Pre-Money Capitalization Table</h5>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive mt-4">
                            <table className="table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th style={{ width: '40px' }}></th>
                                  <th>Shareholder</th>
                                  <th className="text-end">Shares</th>
                                  <th className="text-end">Ownership %</th>
                                  <th className="text-end">Currency Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(() => {
                                  const preMoneyData = capTableData?.pre_money;
                                  const allItems = preMoneyData?.items || [];

                                  const founders = allItems.filter(item => item.type === 'founder');
                                  const optionPools = allItems.filter(item => item.type === 'option_pool');
                                  // ✅ Both 'investor' and 'investor_group' types handle karo
                                  const investorItems = allItems.filter(item =>
                                    item.type === 'investor' || item.type === 'investor_group'
                                  );
                                  const pendingItems = allItems.filter(item => item.type === 'pending');

                                  return (
                                    <>
                                      {/* 1. Founders */}
                                      {founders.map((item, index) => (
                                        <tr key={`founder-${index}`}>
                                          <td><span className="badge bg-info me-2">{item.founder_code || `F${index + 1}`}</span></td>
                                          <td>
                                            <strong>{item.name}</strong>
                                            {item.email && <div className="small text-muted">{item.email}</div>}
                                          </td>
                                          <td className="text-end">{Number(item.shares).toLocaleString()}</td>
                                          <td className="text-end fw-bold text-primary">{item.percentage_formatted}</td>
                                          <td className="text-end fw-bold text-primary">
                                            <CurrencyFormatter amount={item.value} currency={roundData?.currency} />
                                          </td>
                                        </tr>
                                      ))}

                                      {/* 2. Option Pool */}
                                      {optionPools.map((item, index) => (
                                        <tr key={`option-${index}`} className="table-info">
                                          <td><span className="badge bg-warning me-2">O</span></td>
                                          <td><strong>Employee Option Pool</strong></td>
                                          <td className="text-end">{Number(item.shares).toLocaleString()}</td>
                                          <td className="text-end fw-bold text-warning">{item.percentage_formatted}</td>
                                          <td className="text-end fw-bold text-warning">
                                            <CurrencyFormatter amount={item.value} currency={roundData?.currency} />
                                          </td>
                                        </tr>
                                      ))}

                                      {/* 3. Investor Groups - expandable */}
                                      {investorItems.map((group, groupIndex) => {
                                        const rowKey = `pre-group-${groupIndex}-${group.name}`;
                                        const isExpanded = !!expandedRows[rowKey];

                                        // ✅ investor_details array hai
                                        const detailsArr = Array.isArray(group.investor_details)
                                          ? group.investor_details
                                          : (group.investor_details ? [group.investor_details] : []);

                                        const groupLabel = group.label || `${detailsArr.length} investor${detailsArr.length !== 1 ? 's' : ''}`;

                                        return (
                                          <React.Fragment key={rowKey}>
                                            {/* Group Header Row */}
                                            <tr
                                              className="table-secondary"
                                              onClick={() => toggleRow(rowKey)}
                                              style={{ cursor: 'pointer' }}
                                            >
                                              <td className="text-center">
                                                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                                              </td>
                                              <td>
                                                <strong>{group.name}</strong>
                                                <small className="text-muted d-block">{groupLabel}</small>
                                              </td>
                                              <td className="text-end">{Number(group.shares || 0).toLocaleString()}</td>
                                              <td className="text-end fw-bold text-primary">{group.percentage_formatted}</td>
                                              <td className="text-end fw-bold text-primary">
                                                <CurrencyFormatter amount={group.value} currency={roundData?.currency} />
                                              </td>
                                            </tr>

                                            {/* Expanded: Individual Investors - Directly API se values */}
                                            {isExpanded && detailsArr.map((investor, idx) => {
                                              return (
                                                <tr key={`${rowKey}-inv-${idx}`} className="table-light">
                                                  <td></td>
                                                  <td className="ps-5">
                                                    <strong>{investor.name}</strong>
                                                    {investor.email && (
                                                      <div className="small text-muted">
                                                        <i className="bi bi-envelope me-1"></i>
                                                        {investor.email}
                                                      </div>
                                                    )}
                                                    {investor.phone && (
                                                      <div className="small text-muted">
                                                        <i className="bi bi-telephone me-1"></i>
                                                        {investor.phone}
                                                      </div>
                                                    )}
                                                    {investor.round_name && (
                                                      <div className="small text-muted">
                                                        <i className="bi bi-hash me-1"></i>
                                                        {investor.round_name}
                                                      </div>
                                                    )}
                                                  </td>
                                                  {/* ✅ Investor shares - directly from API */}
                                                  <td className="text-end">
                                                    {Number(investor.shares || 0).toLocaleString()}
                                                  </td>
                                                  {/* ✅ Investor percentage - directly from API */}
                                                  <td className="text-end">
                                                    {investor.percentage_formatted}
                                                  </td>
                                                  {/* ✅ Investor value - directly from API */}
                                                  <td className="text-end">
                                                    <CurrencyFormatter amount={investor.value} currency={roundData?.currency} />
                                                  </td>
                                                </tr>
                                              );
                                            })}
                                          </React.Fragment>
                                        );
                                      })}

                                      {/* 4. Pending SAFE/Convertible */}
                                      {/* 4. Pending SAFE/Convertible 0 pending_group type handle karo */}
                                      {(() => {
                                        const pendingGroups = allItems.filter(item => item.type === 'pending_group');

                                        return pendingGroups.map((group, groupIndex) => {
                                          const rowKey = `pre-pending-group-${groupIndex}-${group.round_id}`;
                                          const isExpanded = !!expandedRows[rowKey];
                                          const isConvertibleNote = group.instrument_type === 'Convertible Note';

                                          return (
                                            <React.Fragment key={rowKey}>
                                              {/* Group Header Row */}
                                              <tr
                                                className="table-warning"
                                                onClick={() => toggleRow(rowKey)}
                                                style={{ cursor: 'pointer' }}
                                              >
                                                <td className="text-center">
                                                  {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                                                </td>
                                                <td>
                                                  <strong>{group.instrument_type}</strong>
                                                  <span className="badge bg-warning text-dark ms-2">Pending</span>
                                                  <small className="text-muted d-block">{group.label}</small>
                                                  <div className="small text-muted mt-1">
                                                    <span className="badge bg-light text-dark border">{group.instrument_type}</span>
                                                    {group.total_investment > 0 && (
                                                      <span className="ms-2">
                                                        Total Investment: <CurrencyFormatter amount={group.total_investment} currency={roundData?.currency} />
                                                      </span>
                                                    )}

                                                  </div>
                                                </td>
                                                <td className="text-end text-muted">0</td>
                                                <td className="text-end text-warning fw-bold">0</td>
                                                <td className="text-end text-muted">0</td>
                                              </tr>

                                              {/* Expanded: Individual Investors */}
                                              {isExpanded && (group.items || []).map((inv, idx) => (
                                                <tr key={`${rowKey}-inv-${idx}`} className="table-light">
                                                  <td></td>
                                                  <td className="ps-5">
                                                    <strong>{inv.name || 'Investor'}</strong>
                                                    {inv.email && (
                                                      <div className="small text-muted">
                                                        <i className="bi bi-envelope me-1"></i>{inv.email}
                                                      </div>
                                                    )}
                                                    {inv.phone && (
                                                      <div className="small text-muted">
                                                        <i className="bi bi-telephone me-1"></i>{inv.phone}
                                                      </div>
                                                    )}

                                                    {/* Common fields */}
                                                    <div className="small text-muted mt-1">
                                                      {inv.discount_rate > 0 && <span>{inv.discount_rate}% discount • </span>}
                                                      {inv.valuation_cap > 0 && (
                                                        <span>
                                                          Cap: <CurrencyFormatter amount={inv.valuation_cap} currency={roundData?.currency} /> •{' '}
                                                        </span>
                                                      )}

                                                    </div>

                                                    {inv.investment > 0 && (
                                                      <div className="small text-muted">
                                                        Investment: <CurrencyFormatter amount={inv.investment} currency={roundData?.currency} />
                                                      </div>
                                                    )}

                                                    {/* ✅ Convertible Note 0 5 extra fields */}
                                                    {isConvertibleNote && (
                                                      <>
                                                        {inv.interest_rate > 0 && (
                                                          <div className="small text-muted">
                                                            Interest Rate: {inv.interest_rate}% × {parseFloat(inv.years || 0).toFixed(2)} yrs
                                                            {inv.interest_accrued > 0 && (
                                                              <span>
                                                                {' '}
                                                              </span>
                                                            )}
                                                          </div>
                                                        )}

                                                        {inv.maturity_date && (
                                                          <div className="small text-muted">
                                                            Maturity: {formatIncorporationDate(inv.maturity_date)}
                                                          </div>
                                                        )}
                                                      </>
                                                    )}


                                                  </td>
                                                  <td className="text-end text-muted">0</td>
                                                  <td className="text-end text-warning fw-bold">Pending</td>
                                                  <td className="text-end text-muted">0</td>
                                                </tr>
                                              ))}
                                            </React.Fragment>
                                          );
                                        });
                                      })()}
                                    </>
                                  );
                                })()}
                              </tbody>

                              <tfoot className="table-light fw-bold">
                                {(() => {
                                  const preMoneyData = capTableData?.pre_money;
                                  const allItems = preMoneyData?.items || [];
                                  const totalShares = preMoneyData?.total_shares
                                    || preMoneyData?.totals?.total_shares
                                    || allItems
                                      .filter(i => i.type !== 'pending')
                                      .reduce((sum, item) => sum + (item.shares || 0), 0);
                                  const preMoneyValuation = preMoneyData?.pre_money_valuation
                                    || parseFloat(roundData?.pre_money)
                                    || 0;
                                  return (
                                    <tr>
                                      <td colSpan="2" className="fw-bold">TOTAL</td>
                                      <td className="text-end fs-5">{Number(totalShares).toLocaleString()}</td>
                                      <td className="text-end fs-5">100%</td>
                                      <td className="text-end fs-5 text-primary">
                                        <CurrencyFormatter amount={preMoneyValuation} currency={roundData?.currency} />
                                      </td>
                                    </tr>
                                  );
                                })()}
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ========== POST-MONEY CAP TABLE ========== */}
                    {activeTab === 'post-money' && (
                      <div className="card">
                        <div className="card-header bg-light">
                          <h5 className="mb-0">
                            {roundData?.instrument || 'Common Stock'} at Post-{roundData?.shareClassType || 'Investment'} Investor
                          </h5>
                          <small className="text-muted">
                            After <CurrencyFormatter amount={roundData?.investment} currency={roundData?.currency} /> investment
                            {conversionData?.length > 0 ? ` with ${conversionData.length} convertible instruments conversion` : ''}
                          </small>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-striped table-hover">
                              <thead className="table-light">
                                <tr>
                                  <th>Shareholder</th>
                                  <th>Type</th>
                                  <th className="text-end">Existing Shares</th>
                                  <th className="text-end">New Shares</th>
                                  <th className="text-end">Total Shares</th>
                                  <th className="text-end">Ownership %</th>
                                  <th className="text-end">Currency Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(() => {
                                  const isSAFERound = capTableData?.post_money?.totals?.instrumentType === 'Safe';
                                  const allItems = capTableData?.post_money?.items || [];

                                  // ✅ FIXED: pending_group bhi exclude karo total shares se
                                  const baseTotalShares = capTableData?.post_money?.totals?.total_shares
                                    || allItems
                                      .filter(i => i.type !== 'pending' && i.type !== 'pending_group')
                                      .reduce((s, i) => s + (i.shares || 0), 0);

                                  const valueValuation = isSAFERound
                                    ? (parseFloat(capTableData?.post_money?.totals?.total_value)
                                      || parseFloat(roundData?.pre_money) || 0)
                                    : (parseFloat(capTableData?.post_money?.post_money_valuation)
                                      || parseFloat(roundData?.post_money) || 0);

                                  const founders = allItems.filter(i => i.type === 'founder');
                                  const optionPool = allItems.find(i => i.type === 'option_pool');
                                  const previousGroups = allItems.filter(i => i.type === 'investor' && i.is_previous === true);
                                  const convertedGroups = allItems.filter(i => i.type === 'investor' && i.is_converted === true);
                                  const newGroups = allItems.filter(i => i.type === 'investor' && i.is_new_investment === true);

                                  // ✅ FIXED: frontend grouping hatao 0 backend se pending_group aa raha hai
                                  const pendingGroups = allItems.filter(i => i.type === 'pending_group');

                                  const renderInvestorGroup = (group, groupIndex, colorClass, typeLabel) => {
                                    const rowKey = `post-inv-group-${group.round_id_ref || groupIndex}-${group.name}`;
                                    const isExpanded = !!expandedRows[rowKey];
                                    const detailsArr = Array.isArray(group.investor_details)
                                      ? group.investor_details
                                      : (group.investor_details ? [group.investor_details] : []);

                                    return (
                                      <React.Fragment key={rowKey}>
                                        <tr
                                          className={colorClass}
                                          onClick={() => toggleRow(rowKey)}
                                          style={{ cursor: detailsArr.length > 0 ? 'pointer' : 'default' }}
                                        >
                                          <td>
                                            <strong>
                                              {group.name}
                                              {detailsArr.length > 0 && (
                                                isExpanded ? <FaChevronDown className="ms-1" /> : <FaChevronRight className="ms-1" />
                                              )}
                                            </strong>
                                            <small className="text-muted d-block">
                                              {group.label || `${detailsArr.length} investor${detailsArr.length !== 1 ? 's' : ''}`}
                                            </small>
                                          </td>
                                          <td>{typeLabel}</td>
                                          <td className="text-end">{Number(group.existing_shares || (group.is_previous ? group.shares : 0) || 0).toLocaleString()}</td>
                                          <td className="text-end text-success fw-bold">{Number(group.new_shares || 0).toLocaleString()}</td>
                                          <td className="text-end fw-bold">{Number(group.shares || 0).toLocaleString()}</td>
                                          <td className="text-end fw-bold text-primary">{group.percentage_formatted}</td>
                                          <td className="text-end">
                                            <CurrencyFormatter amount={group.value} currency={roundData?.currency} />
                                          </td>
                                        </tr>

                                        {isExpanded && detailsArr.map((inv, idx) => (
                                          <tr key={`${rowKey}-inv-${idx}`} className="table-light">
                                            <td className="ps-5">
                                              <strong>{inv.name || `${inv.firstName || ''} ${inv.lastName || ''}`.trim()}</strong>
                                              {inv.email && (
                                                <div className="small text-muted">
                                                  <i className="bi bi-envelope me-1"></i>{inv.email}
                                                </div>
                                              )}
                                              {inv.phone && (
                                                <div className="small text-muted">
                                                  <i className="bi bi-telephone me-1"></i>{inv.phone}
                                                </div>
                                              )}
                                              {inv.investment_amount > 0 && (
                                                <div className="small text-muted">
                                                  Investment: <CurrencyFormatter amount={inv.investment_amount} currency={roundData?.currency} />
                                                </div>
                                              )}
                                            </td>
                                            <td>{inv.share_class_type || typeLabel}</td>
                                            <td className="text-end">{Number(inv.existing_shares || (inv.is_previous ? inv.shares : 0) || 0).toLocaleString()}</td>
                                            <td className="text-end text-success">{Number(inv.new_shares || 0).toLocaleString()}</td>
                                            <td className="text-end">{Number(inv.shares || 0).toLocaleString()}</td>
                                            <td className="text-end">{inv.percentage_formatted}</td>
                                            <td className="text-end">
                                              <CurrencyFormatter amount={inv.value} currency={roundData?.currency} />
                                            </td>
                                          </tr>
                                        ))}
                                      </React.Fragment>
                                    );
                                  };

                                  return (
                                    <>
                                      {/* 1. Founders */}
                                      {founders.map((item, index) => (
                                        <tr key={`founder-${index}`}>
                                          <td>
                                            <strong>{item.name}</strong>
                                            {item.email && <div className="small text-muted">{item.email}</div>}
                                          </td>
                                          <td>Founder</td>
                                          <td className="text-end">{Number(item.existing_shares || item.shares || 0).toLocaleString()}</td>
                                          <td className="text-end text-muted">0</td>
                                          <td className="text-end fw-bold">{Number(item.shares || 0).toLocaleString()}</td>
                                          <td className="text-end fw-bold text-primary">{item.percentage_formatted}</td>
                                          <td className="text-end">
                                            <CurrencyFormatter amount={item.value} currency={roundData?.currency} />
                                          </td>
                                        </tr>
                                      ))}

                                      {/* 2. Option Pool */}
                                      {optionPool && (
                                        <tr className="table-info">
                                          <td><strong>Employee Option Pool</strong></td>
                                          <td>{optionPool.label || 'Options Pool'}</td>
                                          <td className="text-end">{Number(optionPool.existing_shares || 0).toLocaleString()}</td>
                                          <td className="text-end text-success fw-bold">{Number(optionPool.new_shares || 0).toLocaleString()}</td>
                                          <td className="text-end fw-bold">{Number(optionPool.shares || 0).toLocaleString()}</td>
                                          <td className="text-end fw-bold text-warning">{optionPool.percentage_formatted}</td>
                                          <td className="text-end">
                                            <CurrencyFormatter amount={optionPool.value} currency={roundData?.currency} />
                                          </td>
                                        </tr>
                                      )}

                                      {/* 3. Previous Investors 0 backend grouped */}
                                      {previousGroups.map((group, i) =>
                                        renderInvestorGroup(group, i, 'table-secondary', 'Previous Investor')
                                      )}

                                      {/* 4. Converted Investors - WITH VALUATION CAP, DISCOUNT, CONVERSION PRICE, INTEREST ETC. */}
                                      {convertedGroups.map((group, groupIndex) => {
                                        const rowKey = `post-conv-group-${group.round_id_ref || groupIndex}-${group.name}`;
                                        const isExpanded = !!expandedRows[rowKey];
                                        const detailsArr = Array.isArray(group.investor_details)
                                          ? group.investor_details
                                          : (group.investor_details ? [group.investor_details] : []);

                                        return (
                                          <React.Fragment key={rowKey}>
                                            {/* Group Header */}
                                            <tr
                                              className="table-info"
                                              onClick={() => toggleRow(rowKey)}
                                              style={{ cursor: detailsArr.length > 0 ? 'pointer' : 'default' }}
                                            >
                                              <td>
                                                <strong>
                                                  {group.name}
                                                  {detailsArr.length > 0 && (
                                                    isExpanded ? <FaChevronDown className="ms-1" /> : <FaChevronRight className="ms-1" />
                                                  )}
                                                </strong>
                                                <small className="text-muted d-block">
                                                  {group.label || `${detailsArr.length} investor${detailsArr.length !== 1 ? 's' : ''}`}
                                                </small>
                                              </td>
                                              <td>Converted</td>
                                              <td className="text-end">0</td>
                                              <td className="text-end text-success fw-bold">{Number(group.new_shares || group.shares || 0).toLocaleString()}</td>
                                              <td className="text-end fw-bold">{Number(group.shares || 0).toLocaleString()}</td>
                                              <td className="text-end fw-bold text-primary">{group.percentage_formatted}</td>
                                              <td className="text-end">
                                                <CurrencyFormatter amount={group.value} currency={roundData?.currency} />
                                              </td>
                                            </tr>

                                            {/* Expanded individual converted investors with ALL details - VALUATION CAP, DISCOUNT, INTEREST ETC. */}
                                            {isExpanded && detailsArr.map((investor, idx) => {
                                              return (
                                                <tr key={`${rowKey}-inv-${idx}`} className="table-light">
                                                  <td className="ps-5" style={{ maxWidth: '450px' }}>
                                                    <strong>{investor.name || 'Investor'}</strong> {" "}

                                                    {investor.instrument_type && (
                                                      <span className={`badge rounded-pill px-2 py-1 ${investor.instrument_type === 'Convertible Note' ? 'bg-info text-white' :
                                                        investor.instrument_type === 'SAFE' ? 'bg-success text-white' :
                                                          investor.instrument_type === 'Previous Investor' || investor.instrument_type === 'previous' ? 'bg-secondary text-white' :
                                                            investor.instrument_type === 'New Investor' || investor.instrument_type === 'current' ? 'bg-primary text-white' :
                                                              investor.instrument_type === 'Converted' || investor.instrument_type === 'converted' ? 'bg-warning text-dark' :
                                                                'bg-light text-dark border'
                                                        }`} style={{ fontSize: '0.7rem' }}>
                                                        {investor.instrument_type}
                                                      </span>
                                                    )}

                                                    {/* Contact Info */}
                                                    {investor.email && (
                                                      <div className="small text-muted">
                                                        <i className="bi bi-envelope me-1"></i>{investor.email}
                                                      </div>
                                                    )}
                                                    {investor.phone && (
                                                      <div className="small text-muted">
                                                        <i className="bi bi-telephone me-1"></i>{investor.phone}
                                                      </div>
                                                    )}

                                                    {/* ✅ VALUATION CAP, DISCOUNT, CONVERSION PRICE - AS REQUESTED */}
                                                    {(investor.discount_rate > 0 || investor.valuation_cap > 0 || investor.conversion_price > 0) && (
                                                      <div className="small bg-light p-2 rounded mt-2 border-start border-info border-4">
                                                        {/* Format: "20% discount • Cap: GBP £ 1,000,000.00 • Conv. Price: GBP £ 0.3240" */}
                                                        <div className="fw-bold text-info mb-1">
                                                          {investor.discount_rate > 0 && <span className="me-2">{investor.discount_rate}% discount</span>}
                                                          {investor.discount_rate > 0 && investor.valuation_cap > 0 && <span className="me-2">•</span>}
                                                          {investor.valuation_cap > 0 && (
                                                            <span className="me-2">
                                                              Cap: <CurrencyFormatter amount={investor.valuation_cap} currency={roundData?.currency} />
                                                            </span>
                                                          )}
                                                          {(investor.discount_rate > 0 || investor.valuation_cap > 0) && investor.conversion_price > 0 && <span className="me-2">•</span>}
                                                          {investor.conversion_price > 0 && (
                                                            <span>
                                                              Conv. Price: <CurrencyFormatter amount={investor.conversion_price} currency={roundData?.currency} digit={4} />
                                                            </span>
                                                          )}
                                                        </div>

                                                        {/* Investment Amount */}
                                                        {investor.investment_amount > 0 && (
                                                          <div className="mt-1">
                                                            <span className="text-muted">Investment:</span>{' '}
                                                            <CurrencyFormatter amount={investor.investment_amount} currency={roundData?.currency} />
                                                          </div>
                                                        )}

                                                        {/* ✅ INTEREST RATE WITH ACCRUED INTEREST */}
                                                        {investor.interest_rate > 0 && (
                                                          <div className="mt-1">
                                                            <span className="text-muted">Interest Rate:</span>{' '}
                                                            {investor.interest_rate}% × {parseFloat(investor.years || 0).toFixed(2)} yrs
                                                            {investor.interest_accrued > 0 && (
                                                              <span> = <CurrencyFormatter amount={investor.interest_accrued} currency={roundData?.currency} /> accrued</span>
                                                            )}
                                                          </div>
                                                        )}

                                                        {/* ✅ TOTAL CONVERSION AMOUNT */}
                                                        {investor.total_conversion_amount > 0 && (
                                                          <div className="mt-1 fw-bold">
                                                            <span className="text-muted">Total Conversion:</span>{' '}
                                                            <CurrencyFormatter amount={investor.total_conversion_amount} currency={roundData?.currency} />
                                                          </div>
                                                        )}

                                                        {/* ✅ MATURITY DATE */}
                                                        {investor.maturity_date && (
                                                          <div className="mt-1">
                                                            <span className="text-muted">Maturity:</span>{' '}
                                                            {formatIncorporationDate(investor.maturity_date)}
                                                          </div>
                                                        )}
                                                      </div>
                                                    )}

                                                    {/* Round Name */}
                                                    {investor.round_name && (
                                                      <div className="small text-muted mt-2">
                                                        <i className="bi bi-hash me-1"></i>
                                                        {investor.round_name}
                                                      </div>
                                                    )}
                                                  </td>
                                                  <td>{investor.share_class_type || investor.instrument_type || 'Converted'}</td>
                                                  <td className="text-end">{Number(investor.existing_shares || 0).toLocaleString()}</td>
                                                  <td className="text-end text-success">{Number(investor.new_shares || investor.shares || 0).toLocaleString()}</td>
                                                  <td className="text-end">{Number(investor.shares || 0).toLocaleString()}</td>
                                                  <td className="text-end">{investor.percentage_formatted}</td>
                                                  <td className="text-end">
                                                    <CurrencyFormatter amount={investor.value} currency={roundData?.currency} />
                                                  </td>
                                                </tr>
                                              );
                                            })}
                                          </React.Fragment>
                                        );
                                      })}

                                      {/* 5. New (Current) Investors */}
                                      {newGroups.map((group, i) =>
                                        renderInvestorGroup(group, i, 'table-success', 'New Investor')
                                      )}

                                      {/* 6. Pending SAFE / Convertible Note 0 ✅ FIXED: pending_group from backend */}
                                      {pendingGroups.map((group, groupIndex) => {
                                        // Pre-money pending rowKey bhi fix karo
                                        const rowKey = `post-pending-group-${group.round_id || groupIndex}-${group.instrument_type}`;
                                        const isExpanded = !!expandedRows[rowKey];
                                        const isConvertibleNote = group.instrument_type === 'Convertible Note';

                                        return (
                                          <React.Fragment key={rowKey}>
                                            {/* Group Header */}
                                            <tr
                                              className="table-warning"
                                              onClick={() => toggleRow(rowKey)}
                                              style={{ cursor: 'pointer' }}
                                            >
                                              <td>
                                                <strong>
                                                  {group.instrument_type}
                                                  {isExpanded ? <FaChevronDown className="ms-1" /> : <FaChevronRight className="ms-1" />}
                                                </strong>
                                                <span className="badge bg-warning text-dark ms-2">Pending</span>
                                                <small className="text-muted d-block">{group.label}</small>
                                                <div className="small text-muted mt-1">
                                                  <span className="badge bg-light text-dark border me-1">{group.instrument_type}</span>
                                                  {group.total_investment > 0 && (
                                                    <span>
                                                      Total: <CurrencyFormatter amount={group.total_investment} currency={roundData?.currency} />
                                                    </span>
                                                  )}
                                                </div>
                                              </td>
                                              <td>{group.shareClassType}</td>
                                              <td className="text-end text-muted">0</td>
                                              <td className="text-end text-muted">0</td>
                                              <td className="text-end text-warning fw-bold">
                                                {group.total_potential_shares > 0
                                                  ? '0'
                                                  : '0'
                                                }
                                              </td>
                                              <td className="text-end text-muted">0</td>
                                              <td className="text-end text-muted">0</td>
                                            </tr>

                                            {/* Expanded individual investors */}
                                            {isExpanded && (group.items || []).map((item, idx) => {
                                              const inv = item.investor_details || {};
                                              const email = inv.email || item.email || '';
                                              const phone = inv.phone || item.phone || '';

                                              return (
                                                <tr key={`${rowKey}-inv-${idx}`} className="table-warning" style={{ opacity: 0.85 }}>
                                                  <td className="ps-5">
                                                    <strong>{item.name}</strong>
                                                    {email && (
                                                      <div className="small text-muted">
                                                        <i className="bi bi-envelope me-1"></i>{email}
                                                      </div>
                                                    )}
                                                    {phone && (
                                                      <div className="small text-muted">
                                                        <i className="bi bi-telephone me-1"></i>{phone}
                                                      </div>
                                                    )}

                                                    {/* Common SAFE/Note fields */}
                                                    <div className="small text-muted mt-1">
                                                      {item.discount_rate > 0 && <span>{item.discount_rate}% discount • </span>}
                                                      {item.valuation_cap > 0 && (
                                                        <span>Cap: <CurrencyFormatter amount={item.valuation_cap} currency={roundData?.currency} /> • </span>
                                                      )}
                                                      {item.conversion_price > 0 && (
                                                        <span>Conv. Price: <CurrencyFormatter amount={item.conversion_price} currency={roundData?.currency} digit={4} /></span>
                                                      )}
                                                    </div>

                                                    {item.investment > 0 && (
                                                      <div className="small text-muted">
                                                        Investment: <CurrencyFormatter amount={item.investment} currency={roundData?.currency} />
                                                      </div>
                                                    )}

                                                    {/* ✅ Convertible Note 5 extra fields */}
                                                    {isConvertibleNote && (
                                                      <>
                                                        {item.interest_rate > 0 && (
                                                          <div className="small text-muted">
                                                            Interest: {item.interest_rate}% × {parseFloat(item.years || 0).toFixed(2)} yrs
                                                            {item.interest_accrued > 0 && (
                                                              <span> = <CurrencyFormatter amount={item.interest_accrued} currency={roundData?.currency} /> accrued</span>
                                                            )}
                                                          </div>
                                                        )}
                                                        {item.total_conversion_amount > 0 && (
                                                          <div className="small text-muted">
                                                            Total Conversion: <CurrencyFormatter amount={item.total_conversion_amount} currency={roundData?.currency} />
                                                          </div>
                                                        )}
                                                        {item.maturity_date && (
                                                          <div className="small text-muted">
                                                            Maturity: {formatIncorporationDate(item.maturity_date)}
                                                          </div>
                                                        )}
                                                      </>
                                                    )}


                                                  </td>
                                                  <td>{item.instrument_type || 'Safe'}</td>
                                                  <td className="text-end text-muted">0</td>
                                                  <td className="text-end text-muted">0</td>
                                                  <td className="text-end text-warning">
                                                    {item.potential_shares > 0
                                                      ? '0'
                                                      : '0'
                                                    }
                                                  </td>
                                                  <td className="text-end text-muted">0</td>
                                                  <td className="text-end text-muted">0</td>
                                                </tr>
                                              );
                                            })}
                                          </React.Fragment>
                                        );
                                      })}
                                    </>
                                  );
                                })()}
                              </tbody>

                              <tfoot className="table-light fw-bold">
                                {(() => {
                                  const isSAFERound = roundData.instrument === 'Safe' || roundData.instrument === 'Convertible Note';
                                  const allItems = capTableData?.post_money?.items || [];

                                  // ✅ FIXED: pending_group bhi exclude karo
                                  const baseTotalShares = capTableData?.post_money?.totals?.total_shares
                                    || allItems
                                      .filter(i => i.type !== 'pending' && i.type !== 'pending_group')
                                      .reduce((s, i) => s + (i.shares || 0), 0);

                                  const totalNewShares = allItems.reduce((sum, i) => {
                                    if (i.type === 'investor' && i.is_new_investment) return sum + (i.shares || 0);
                                    // ✅ converted bhi new shares hain
                                    if (i.type === 'investor' && i.is_converted) return sum + (i.shares || 0);
                                    if (i.type === 'option_pool') return sum + (i.new_shares || 0);
                                    return sum;
                                  }, 0);

                                  const totalExistingShares = baseTotalShares - totalNewShares;

                                  // ✅ FIXED: pending_group se total_potential_shares lo
                                  const totalPotentialShares = allItems
                                    .filter(i => i.type === 'pending_group')
                                    .reduce((s, i) => s + (i.total_potential_shares || 0), 0);

                                  const valueValuation = isSAFERound
                                    ? (parseFloat(capTableData?.post_money?.totals?.total_value)
                                      || parseFloat(roundData?.pre_money) || 0)
                                    : (parseFloat(capTableData?.post_money?.totals?.total_value)
                                      || parseFloat(roundData?.post_money) || 0);

                                  return (
                                    <>
                                      <tr>
                                        <td colSpan="2">TOTAL</td>
                                        <td className="text-end fs-5">{totalExistingShares.toLocaleString()}</td>
                                        <td className="text-end fs-5 text-success">
                                          {totalNewShares > 0 ? totalNewShares.toLocaleString() : '0'}
                                        </td>
                                        <td className="text-end fs-5 fw-bold">
                                          {baseTotalShares.toLocaleString()}
                                          {totalPotentialShares > 0 && (
                                            <span className="text-warning ms-1 small">

                                            </span>
                                          )}
                                        </td>
                                        <td className="text-end fs-5">100%</td>
                                        <td className="text-end fs-5 text-primary">
                                          <CurrencyFormatter amount={valueValuation} currency={roundData?.currency} />
                                          {isSAFERound && (
                                            <div className="small text-muted fw-normal">(Company Value)</div>
                                          )}
                                        </td>
                                      </tr>
                                      <tr className="small text-muted">
                                        <td colSpan="7" className="text-end pt-2">
                                          <span className="me-3">
                                            <strong>
                                              {roundData?.instrument === "Safe" || roundData?.instrument === "Convertible Note"
                                                ? "Company Valuation"
                                                : "Pre-Money"}
                                              :
                                            </strong>{" "}
                                            <CurrencyFormatter
                                              amount={roundData?.pre_money}
                                              currency={roundData?.currency}
                                            />
                                          </span>
                                          <span className="me-3">Investment: <CurrencyFormatter amount={roundData?.investment} currency={roundData?.currency} /></span>
                                          {roundData?.instrument !== "Safe" && roundData?.instrument !== "Convertible Note" && (
                                            <span className="me-3">
                                              Post-Money:{" "}
                                              <CurrencyFormatter
                                                amount={roundData?.post_money}
                                                currency={roundData?.currency}
                                              />
                                            </span>
                                          )}
                                          <span>
                                            Share Price: {
                                              isUnpricedRound && !isConverted
                                                ? 'N/A'
                                                : <CurrencyFormatter amount={displaySharePrice} currency={roundData?.currency} digit={3} />
                                            }
                                          </span>
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })()}
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* ========== ROUND 0 PIE CHART - EXACTLY AS YOUR CODE ========== */}
                    {isRound0 && (
                      <div className="row mb-4">
                        <div className="col-md-12">
                          <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                              <div>
                                <h5 className="mb-0 fw-bold text-dark">
                                  <i className="bi bi-pie-chart-fill text-primary me-2"></i>
                                  Founder Ownership Distribution - Round 0
                                </h5>
                                <p className="text-muted mb-0 small">Initial share allocation at incorporation</p>
                              </div>
                              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                                <i className="bi bi-shield me-1"></i>
                                {formatNumber(capTableData?.pre_money?.totals?.total_shares || 0)} Total Shares
                              </span>
                            </div>
                            <div className="card-body p-4">
                              <div className="row">
                                {/* Left Column - Pie Chart */}
                                <div className="col-md-7">
                                  <div style={{ height: '400px', position: 'relative' }}>
                                    <Pie
                                      data={{
                                        labels: capTableData.pre_money.items
                                          .filter(item => item.type === 'founder')
                                          .map(item => {
                                            if (item.founder_code) {
                                              return `${item.founder_code} - ${item.name}`;
                                            }
                                            return item.name || `Founder ${capTableData.pre_money.items.indexOf(item) + 1}`;
                                          }),
                                        datasets: [
                                          {
                                            data: capTableData.pre_money.items
                                              .filter(item => item.type === 'founder')
                                              .map(item => item.shares),
                                            backgroundColor: [
                                              '#4e73df', '#1cc88a', '#36b9cc', '#f6c23e',
                                              '#e74a3b', '#6f42c1', '#fd7e14', '#20c9a6',
                                              '#858796', '#5a5c69', '#2c9faf', '#b58df1'
                                            ],
                                            borderWidth: 2,
                                            borderColor: '#ffffff',
                                          }
                                        ]
                                      }}
                                      options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        cutout: '60%',
                                        plugins: {
                                          datalabels: {
                                            display: function (context) {
                                              const dataset = context.dataset;
                                              const total = dataset.data.reduce((a, b) => a + b, 0);
                                              const currentValue = dataset.data[context.dataIndex];
                                              const percentage = (currentValue / total) * 100;
                                              return percentage >= 5;
                                            },
                                            formatter: function (value, context) {
                                              const dataset = context.dataset;
                                              const total = dataset.data.reduce((a, b) => a + b, 0);
                                              const percentage = ((value / total) * 100).toFixed(1);
                                              return `${percentage}%`;
                                            },
                                            color: '#ffffff',
                                            font: { weight: 'bold', size: 13 },
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                            padding: 8,
                                            backgroundColor: 'rgba(0,0,0,0.4)',
                                            borderRadius: 6,
                                          },
                                          legend: {
                                            position: 'bottom',
                                            labels: {
                                              padding: 20,
                                              usePointStyle: true,
                                              pointStyle: 'circle',
                                              font: { size: 12, weight: '500' },
                                              generateLabels: function (chart) {
                                                const data = chart.data;
                                                if (data.labels.length && data.datasets.length) {
                                                  return data.labels.map((label, i) => {
                                                    const value = data.datasets[0].data[i];
                                                    const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                                    const item = capTableData?.pre_money?.items?.[i];
                                                    let displayLabel = label;
                                                    let sharesInfo = '';
                                                    if (item) {
                                                      sharesInfo = ` (${formatNumber(item.shares)} shares)`;
                                                    }
                                                    return {
                                                      text: `${displayLabel}${sharesInfo} - ${percentage}%`,
                                                      fillStyle: data.datasets[0].backgroundColor[i],
                                                      strokeStyle: data.datasets[0].backgroundColor[i],
                                                      lineWidth: 1,
                                                      hidden: chart.getDatasetMeta(0).data[i].hidden,
                                                      index: i,
                                                      fontColor: '#2c3e50'
                                                    };
                                                  });
                                                }
                                                return [];
                                              }
                                            }
                                          },
                                          tooltip: {
                                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                                            titleColor: '#ffffff',
                                            bodyColor: '#ffffff',
                                            borderColor: 'rgba(255,255,255,0.2)',
                                            borderWidth: 1,
                                            cornerRadius: 8,
                                            padding: 12,
                                            displayColors: true,
                                            callbacks: {
                                              label: function (context) {
                                                const label = context.label || '';
                                                const value = context.parsed || 0;
                                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                                                const itemIndex = context.dataIndex;
                                                const item = capTableData?.pre_money?.items?.[itemIndex];
                                                return [
                                                  `👤 ${label}`,
                                                  `Shares: ${formatNumber(value)}`,
                                                  `Ownership: ${percentage}%`,
                                                  `Value: ${formatCurrency(item?.value || 0, roundData?.currency)}`,
                                                  `Price/Share: ${formatCurrencyNotRound(item?.share_price || 0.01, roundData?.currency)}`
                                                ];
                                              },
                                              title: function (tooltipItems) {
                                                const index = tooltipItems[0].dataIndex;
                                                const item = capTableData?.pre_money?.items?.[index];
                                                if (item?.type === 'founder') {
                                                  return `👤 Founder: ${item.founder_code || ''} ${item.name}`.trim();
                                                }
                                                return tooltipItems[0].label;
                                              }
                                            }
                                          }
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                                {/* Right Column - Founder Details */}
                                <div className="col-md-5">
                                  <div className="bg-light bg-opacity-50 rounded-3 p-4 h-100">
                                    <h6 className="fw-bold mb-3 d-flex align-items-center">
                                      <i className="bi bi-people-fill me-2 text-primary"></i>
                                      Founder Details & Ownership
                                    </h6>
                                    <div className="founder-list" style={{ maxHeight: '320px', overflowY: 'auto' }}>
                                      {capTableData?.pre_money?.items
                                        ?.filter(item => item.type === 'founder')
                                        .map((item, index) => {
                                          const totalShares = capTableData.pre_money.totals.total_shares || 1;
                                          const percentage = ((item.shares || 0) / totalShares * 100).toFixed(1);
                                          const colors = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'];
                                          const color = colors[index % colors.length];
                                          return (
                                            <div key={index} className="d-flex align-items-center mb-3 p-3 bg-white rounded-3 shadow-sm">
                                              <div
                                                className="me-3 flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle"
                                                style={{
                                                  width: '48px',
                                                  height: '48px',
                                                  backgroundColor: `${color}20`,
                                                  color: color,
                                                  fontSize: '18px',
                                                  fontWeight: 'bold'
                                                }}
                                              >
                                                {item.founder_code || `F${index + 1}`}
                                              </div>
                                              <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                  <span className="fw-semibold">{item.name}</span>
                                                  <span className="badge" style={{ backgroundColor: color, color: 'white' }}>
                                                    {percentage}%
                                                  </span>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center small">
                                                  <span className="text-muted">
                                                    {formatNumber(item.shares || 0)} shares
                                                  </span>
                                                  {item.email && (
                                                    <span className="text-muted text-truncate" style={{ maxWidth: '150px' }}>
                                                      {item.email}
                                                    </span>
                                                  )}
                                                </div>
                                                <div className="progress mt-2" style={{ height: '6px', backgroundColor: '#e9ecef' }}>
                                                  <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                      width: `${percentage}%`,
                                                      backgroundColor: color,
                                                      transition: 'width 0.3s ease'
                                                    }}
                                                    aria-valuenow={percentage}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                  />
                                                </div>
                                                <div className="d-flex mt-2 small text-muted">
                                                  <span className="me-3">
                                                    <i className="bi bi-tag me-1"></i>
                                                    {item.share_type || 'common'}
                                                  </span>
                                                  <span>
                                                    <i className="bi bi-check-circle me-1"></i>
                                                    {item.voting || 'voting'}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                    </div>
                                    <div className="mt-3 pt-3 border-top">
                                      <div className="bg-white rounded-3 p-3">
                                        <div className="row">
                                          <div className="col-6">
                                            <div className="d-flex flex-column">
                                              <small className="text-muted">Total Founders</small>
                                              <span className="fw-bold h5 mb-0">
                                                {capTableData?.pre_money?.items?.filter(item => item.type === 'founder').length || 0}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-6">
                                            <div className="d-flex flex-column">
                                              <small className="text-muted">Total Shares</small>
                                              <span className="fw-bold h5 mb-0">
                                                {formatNumber(capTableData?.pre_money?.totals?.total_shares || 0)}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-6 mt-2">
                                            <div className="d-flex flex-column">
                                              <small className="text-muted">Share Price</small>
                                              <span className="fw-bold text-primary">
                                                <CurrencyFormatter
                                                  amount={roundData?.share_price || 0.01}
                                                  currency={roundData?.currency}
                                                  digit={3}
                                                />

                                              </span>
                                            </div>
                                          </div>
                                          <div className="col-6 mt-2">
                                            <div className="d-flex flex-column">
                                              <small className="text-muted">Total Value</small>
                                              <span className="fw-bold text-success">
                                                <CurrencyFormatter
                                                  amount={capTableData?.pre_money?.totals?.total_value || 0}
                                                  currency={roundData?.currency}
                                                />

                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CPAVATE Summary Tab - Keep as is */}
                    {activeTab === 'summary' && summaryDetails && (
                      <div className="card">
                        <div className="card-header bg-light">
                          <h5 className="mb-0">CPAVATE Calculation Summary</h5>
                          <small className="text-muted">Detailed breakdown based on CPAVATE formulas</small>
                        </div>
                        <div className="card-body">
                          {/* Key Metrics */}
                          <div className="row mb-4">
                            <div className="col-md-4">
                              <div className="card bg-light">
                                <div className="card-body">
                                  <h6 className="card-subtitle mb-2 text-muted">
                                    {roundData?.instrument === "Safe" || roundData?.instrument === "Convertible Note"
                                      ? "Company Valuation"
                                      : "Pre-Money Valuation"}
                                  </h6>

                                  <h4 className="card-title text-primary">
                                    <CurrencyFormatter
                                      amount={calculations.pre_money_valuation}
                                      currency={roundData?.currency}
                                    />
                                  </h4>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="card bg-light">
                                <div className="card-body">
                                  <h6 className="card-subtitle mb-2 text-muted">Investment</h6>
                                  <h4 className="card-title text-success">
                                    <CurrencyFormatter
                                      amount={roundData?.investment}
                                      currency={roundData?.currency}
                                    />
                                  </h4>
                                </div>
                              </div>
                            </div>

                            {roundData?.instrument !== "Safe" && roundData?.instrument !== "Convertible Note" && (
                              <div className="col-md-4">
                                <div className="card bg-light">
                                  <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">Post-Money Valuation</h6>
                                    <h4 className="card-title text-info">
                                      <CurrencyFormatter
                                        amount={calculations.post_money_valuation}
                                        currency={roundData?.currency}
                                      />
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>


                          {/* Share Details */}
                          <div className="row mb-4">
                            <div className="col-md-6">
                              <div className="card">
                                <div className="card-header">
                                  <h6 className="mb-0">Share Price Calculation</h6>
                                </div>
                                <div className="card-body">
                                  {/* Pre-Money Share Price */}
                                  <div className="mb-3">
                                    <p className="mb-1"><strong>Pre-Money Share Price:</strong></p>
                                    <p className="mb-0">
                                      <CurrencyFormatter
                                        amount={calculations.pre_money_valuation}
                                        currency={roundData?.currency}
                                      />{" "}
                                      ÷ {formatNumber(summaryDetails.totalSharesPre)} shares =
                                      <strong className="ms-2">
                                        <CurrencyFormatter
                                          amount={summaryDetails.sharePricePre}
                                          currency={roundData?.currency}
                                          digit={4}
                                        />
                                      </strong>
                                    </p>
                                  </div>

                                  {/* Post-Money Share Price */}
                                  <div className="mb-3">
                                    <p className="mb-1"><strong>Post-Money Share Price:</strong></p>
                                    <p className="mb-0">
                                      <CurrencyFormatter
                                        amount={calculations.post_money_valuation}
                                        currency={roundData?.currency}
                                      />{" "}
                                      ÷ {formatNumber(summaryDetails.totalSharesPost)} shares =
                                      <strong className="ms-2">
                                        <CurrencyFormatter
                                          amount={summaryDetails.sharePricePost}
                                          currency={roundData?.currency}
                                          digit={4}
                                        />
                                      </strong>
                                    </p>
                                  </div>

                                  {/* SAFE Information - Only for SAFE rounds */}
                                  {roundData?.instrumentType === 'Safe' && (
                                    <div className="mt-3 p-3 bg-light rounded">
                                      <p className="mb-2"><strong>SAFE Information:</strong></p>
                                      <p className="mb-1 small">
                                        <span className="text-muted">Investment:</span>{' '}
                                        <CurrencyFormatter amount={roundData?.investment} currency={roundData?.currency} />
                                      </p>
                                      <p className="mb-1 small">
                                        <span className="text-muted">Discount Rate:</span>{' '}
                                        <span className="badge bg-info">{calculations.discount_rate || 20}%</span>
                                      </p>
                                      <p className="mb-1 small">
                                        <span className="text-muted">Valuation Cap:</span>{' '}
                                        <CurrencyFormatter amount={calculations.valuation_cap || 1000000} currency={roundData?.currency} />
                                      </p>
                                      <p className="mb-0 small">
                                        <span className="text-muted">Conversion Price:</span>{' '}
                                        <CurrencyFormatter amount={calculations.conversion_price || 0} currency={roundData?.currency} digit={4} />
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="card">
                                <div className="card-header">
                                  <h6 className="mb-0">Shareholder Values</h6>
                                </div>
                                <div className="card-body">
                                  {/* Founder Value Pre-Money */}
                                  <div className="mb-3">
                                    <p className="mb-1"><strong>Founder Value (Pre-Money):</strong></p>
                                    <p className="mb-0">
                                      {formatNumber(capTableData?.pre_money?.totals?.total_founders || 0)} shares ×
                                      <CurrencyFormatter
                                        amount={summaryDetails.sharePricePre}
                                        currency={roundData?.currency}
                                        digit={4}
                                      />
                                      =
                                      <strong className="ms-2 text-primary">
                                        <CurrencyFormatter
                                          amount={summaryDetails.founderValuePre}
                                          currency={roundData?.currency}
                                        />
                                      </strong>
                                    </p>
                                  </div>

                                  {/* Founder Value Post-Money */}
                                  <div className="mb-3">
                                    <p className="mb-1"><strong>Founder Value (Post-Money):</strong></p>
                                    <p className="mb-0">
                                      {formatNumber(capTableData?.post_money?.totals?.total_founders || 0)} shares ×
                                      <CurrencyFormatter
                                        amount={summaryDetails.sharePricePost}
                                        currency={roundData?.currency}
                                        digit={4}
                                      />
                                      =
                                      <strong className="ms-2 text-success">
                                        <CurrencyFormatter
                                          amount={summaryDetails.founderValuePost}
                                          currency={roundData?.currency}
                                        />
                                      </strong>
                                    </p>
                                  </div>

                                  {/* Option Pool Value */}
                                  <div className="mb-3">
                                    <p className="mb-1"><strong>Option Pool Value (Post-Money):</strong></p>
                                    <p className="mb-0">
                                      {formatNumber(capTableData?.post_money?.totals?.total_option_pool || 0)} shares ×
                                      <CurrencyFormatter
                                        amount={summaryDetails.sharePricePost}
                                        currency={roundData?.currency}
                                        digit={4}
                                      />
                                      =
                                      <strong className="ms-2 text-warning">
                                        <CurrencyFormatter
                                          amount={summaryDetails.optionPoolValue}
                                          currency={roundData?.currency}
                                        />
                                      </strong>
                                    </p>
                                  </div>

                                  {/* Investor Value (Previous + New) */}
                                  <div className="mb-3">
                                    <p className="mb-1"><strong>Investor Value (Post-Money):</strong></p>
                                    <p className="mb-0">
                                      {formatNumber(capTableData?.post_money?.totals?.total_investors || 0)} shares ×
                                      <CurrencyFormatter
                                        amount={summaryDetails.sharePricePost}
                                        currency={roundData?.currency}
                                        digit={4}
                                      />
                                      =
                                      <strong className="ms-2 text-info">
                                        <CurrencyFormatter
                                          amount={summaryDetails.investorValue}
                                          currency={roundData?.currency}
                                        />
                                      </strong>
                                    </p>
                                  </div>

                                  {/* SAFE Investors - Only for SAFE rounds */}
                                  {/* ✅ Safe OR Convertible Note dono ke liye show karo */}
                                  {(roundData?.instrumentType === 'Safe' || roundData?.instrumentType === 'Convertible Note') && (
                                    <div className="mt-3 p-3 bg-warning bg-opacity-10 rounded">

                                      {/* ✅ Per group heading + investors */}
                                      {(() => {
                                        const pendingGroups = capTableData?.post_money?.items?.filter(i => i.type === 'pending_group') || [];

                                        return pendingGroups.map((group, groupIdx) => {
                                          const groupInvestors = group.items || [];

                                          // ✅ dynamic label
                                          const groupLabel = group.instrument_type === 'Convertible Note'
                                            ? 'Convertible Note Investors'
                                            : 'SAFE Investors';

                                          return (
                                            <div key={groupIdx} className="mb-3">
                                              <p className="mb-2"><strong>{groupLabel}:</strong></p>

                                              {groupInvestors.map((item, idx) => {
                                                const invDetails = item.investor_details || {};
                                                const investorName = invDetails.firstName || invDetails.lastName
                                                  ? `${invDetails.firstName || ''} ${invDetails.lastName || ''}`.trim()
                                                  : item.name || `${group.instrument_type} Investor`;

                                                return (
                                                  <div key={idx} className="mb-2 pb-2 border-bottom">
                                                    <p className="mb-1 small fw-bold">{investorName}</p>
                                                    <div className="d-flex justify-content-between small">
                                                      <span>Investment:</span>
                                                      <CurrencyFormatter amount={item.investment} currency={roundData?.currency} />
                                                    </div>
                                                    <div className="d-flex justify-content-between small">
                                                      <span>Potential Shares:</span>
                                                      <span>{formatNumber(item.potential_shares || 0)}</span>
                                                    </div>
                                                    {item.discount_rate > 0 && (
                                                      <div className="d-flex justify-content-between small">
                                                        <span>Discount:</span>
                                                        <span>{item.discount_rate}%</span>
                                                      </div>
                                                    )}
                                                    {item.valuation_cap > 0 && (
                                                      <div className="d-flex justify-content-between small">
                                                        <span>Valuation Cap:</span>
                                                        <CurrencyFormatter amount={item.valuation_cap} currency={roundData?.currency} />
                                                      </div>
                                                    )}
                                                    {/* ✅ Convertible Note extra fields */}
                                                    {item.interest_rate > 0 && (
                                                      <div className="d-flex justify-content-between small">
                                                        <span>Interest Rate:</span>
                                                        <span>{item.interest_rate}%</span>
                                                      </div>
                                                    )}
                                                    {item.interest_accrued > 0 && (
                                                      <div className="d-flex justify-content-between small">
                                                        <span>Interest Accrued:</span>
                                                        <CurrencyFormatter amount={item.interest_accrued} currency={roundData?.currency} />
                                                      </div>
                                                    )}
                                                  </div>
                                                );
                                              })}

                                              {/* ✅ Per-group totals — dynamic label */}
                                              <div className="mt-2 pt-2">
                                                <div className="d-flex justify-content-between fw-bold">
                                                  <span>Total {group.instrument_type} Investment:</span>
                                                  <CurrencyFormatter amount={group.total_investment} currency={roundData?.currency} />
                                                </div>
                                                <div className="d-flex justify-content-between fw-bold">
                                                  <span>Total Potential Shares:</span>
                                                  <span>{formatNumber(group.total_potential_shares || 0)}</span>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        });
                                      })()}

                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Detailed Breakdown */}
                          <div className="card mb-4">
                            <div className="card-header">
                              <h6 className="mb-0">Ownership Breakdown</h6>
                            </div>
                            <div className="card-body">
                              <div className="table-responsive">
                                <table className="table table-sm">
                                  <thead>
                                    <tr>
                                      <th>Shareholder Type</th>
                                      <th className="text-end">Shares</th>
                                      <th className="text-end">% Ownership</th>
                                      <th className="text-end">Value (Post-Money)</th>
                                      <th className="text-end">Value per Share</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* Founders */}
                                    <tr>
                                      <td><strong>Founders</strong></td>
                                      <td className="text-end">{formatNumber(capTableData?.post_money?.totals?.total_founders || 0)}</td>
                                      <td className="text-end">{formatPercentage(
                                        ((capTableData?.post_money?.totals?.total_founders || 0) / summaryDetails.totalSharesPost) * 100
                                      )}</td>
                                      <td className="text-end text-primary">
                                        <CurrencyFormatter
                                          amount={summaryDetails.founderValuePost}
                                          currency={roundData?.currency}
                                        />
                                      </td>
                                      <td className="text-end">
                                        <CurrencyFormatter
                                          amount={summaryDetails.sharePricePost}
                                          currency={roundData?.currency}
                                          digit={3}
                                        />
                                      </td>
                                    </tr>

                                    {/* Option Pool */}
                                    <tr>
                                      <td><strong>Option Pool</strong></td>
                                      <td className="text-end">{formatNumber(capTableData?.post_money?.totals?.total_option_pool || 0)}</td>
                                      <td className="text-end">{formatPercentage(
                                        ((capTableData?.post_money?.totals?.total_option_pool || 0) / summaryDetails.totalSharesPost) * 100
                                      )}</td>
                                      <td className="text-end text-warning">
                                        <CurrencyFormatter
                                          amount={summaryDetails.optionPoolValue}
                                          currency={roundData?.currency}
                                        />
                                      </td>
                                      <td className="text-end">
                                        <CurrencyFormatter
                                          amount={summaryDetails.sharePricePost}
                                          currency={roundData?.currency}
                                          digit={3}
                                        />
                                      </td>
                                    </tr>

                                    {/* Investors (Previous + New) */}
                                    <tr>
                                      <td><strong>Investors</strong></td>
                                      <td className="text-end">{formatNumber(capTableData?.post_money?.totals?.total_investors || 0)}</td>
                                      <td className="text-end">{formatPercentage(
                                        ((capTableData?.post_money?.totals?.total_investors || 0) / summaryDetails.totalSharesPost) * 100
                                      )}</td>
                                      <td className="text-end text-success">
                                        <CurrencyFormatter
                                          amount={summaryDetails.investorValue}
                                          currency={roundData?.currency}
                                        />
                                      </td>
                                      <td className="text-end">
                                        <CurrencyFormatter
                                          amount={summaryDetails.sharePricePost}
                                          currency={roundData?.currency}
                                          digit={3}
                                        />
                                      </td>
                                    </tr>

                                    {/* ✅ SAFE Investors (Pending) */}
                                    {(() => {
                                      const pendingItems = capTableData?.post_money?.items?.filter(i => i.type === 'pending_group') || [];

                                      if (pendingItems.length === 0) return null;

                                      return pendingItems.map((group, groupIdx) => {
                                        const totalInvestment = parseFloat(group.total_investment) || 0;
                                        const totalPotentialShares = group.total_potential_shares || 0;
                                        const investorCount = group.items?.length || 0;

                                        // ✅ instrument_type se label decide karo
                                        const label = group.instrument_type === 'Convertible Note'
                                          ? 'Convertible Note Investors'
                                          : 'SAFE Investors';

                                        const badgeColor = group.instrument_type === 'Convertible Note'
                                          ? 'bg-info text-dark'
                                          : 'bg-warning text-dark';

                                        const rowColor = group.instrument_type === 'Convertible Note'
                                          ? 'table-info'
                                          : 'table-warning';

                                        return (
                                          <tr key={groupIdx} className={rowColor}>
                                            <td>
                                              <strong>{label}</strong>
                                              <span className={`badge ${badgeColor} ms-2`}>Pending</span>
                                              <small className="text-muted d-block">
                                                {investorCount} investor{investorCount > 1 ? 's' : ''}
                                              </small>
                                              {group.round_name && (
                                                <small className="text-muted d-block">{group.round_name}</small>
                                              )}
                                            </td>
                                            <td className="text-end text-muted">
                                              {totalPotentialShares > 0 ? '0' : '0'}

                                            </td>
                                            <td className="text-end text-muted">
                                              {totalPotentialShares > 0 ? '0%' : '0%'}
                                            </td>
                                            <td className="text-end">
                                              <CurrencyFormatter amount={totalInvestment} currency={roundData?.currency} />
                                              <small className="d-block text-muted">investment</small>
                                            </td>
                                            <td className="text-end text-muted">
                                              {group.items?.map((inv, i) => (
                                                <div key={i}>
                                                  <small className="text-muted">{inv.name}: </small>
                                                  {inv.discount_rate > 0 && (
                                                    <span className="badge bg-light text-dark me-1">{inv.discount_rate}% disc</span>
                                                  )}
                                                  {inv.valuation_cap > 0 && (
                                                    <span className="badge bg-light text-dark me-1">
                                                      cap: {formatCurrency(inv.valuation_cap, roundData?.currency)}
                                                    </span>
                                                  )}
                                                  {inv.interest_rate > 0 && (
                                                    <span className="badge bg-light text-dark">
                                                      {inv.interest_rate}% interest
                                                    </span>
                                                  )}
                                                </div>
                                              ))}
                                            </td>
                                          </tr>
                                        );
                                      });
                                    })()}

                                    {/* TOTAL */}
                                    <tr className="table-active">
                                      <td><strong>TOTAL</strong></td>
                                      <td className="text-end"><strong>{formatNumber(summaryDetails.totalSharesPost)}</strong></td>
                                      <td className="text-end"><strong>100%</strong></td>
                                      <td className="text-end">
                                        <strong>
                                          <CurrencyFormatter
                                            amount={summaryDetails.totalSharesPost * summaryDetails.sharePricePost}
                                            currency={roundData?.currency}
                                          />
                                        </strong>
                                      </td>
                                      <td className="text-end">
                                        <strong>
                                          <CurrencyFormatter
                                            amount={summaryDetails.sharePricePost}
                                            currency={roundData?.currency}
                                            digit={3}
                                          />
                                        </strong>
                                      </td>
                                    </tr>

                                    {/* SAFE Summary Row - Additional Info */}
                                    {(() => {
                                      const pendingItems = capTableData?.post_money?.items?.filter(i => i.type === 'pending_group') || [];
                                      if (pendingItems.length === 0) return null;

                                      const totalInvestment = pendingItems.reduce((sum, item) => sum + (parseFloat(item.total_investment) || 0), 0);
                                      const totalPotentialShares = pendingItems.reduce((sum, item) => sum + (item.total_potential_shares || 0), 0);
                                      const fullyDilutedShares = summaryDetails.totalSharesPost + 0;

                                      // ✅ instrument types dynamically nikalo
                                      const instrumentTypes = [...new Set(pendingItems.map(i => i.instrument_type).filter(Boolean))];
                                      const label = instrumentTypes.length > 1
                                        ? 'SAFE / Convertible Note'
                                        : instrumentTypes[0] === 'Convertible Note'
                                          ? 'Convertible Note'
                                          : 'SAFE';

                                      return (
                                        <tr className="small text-muted">
                                          <td colSpan="5" className="pt-3">
                                            <div className="d-flex justify-content-between flex-wrap gap-2">
                                              <span>💰 Total {label} Investment: <CurrencyFormatter amount={totalInvestment} currency={roundData?.currency} /></span>
                                              <span>📈 Fully Diluted Shares: {formatNumber(fullyDilutedShares)}</span>
                                              {roundData?.instrument !== "Safe" && roundData?.instrument !== "Convertible Note" && (
                                                <span>
                                                  🎯 Post-Money Valuation:{" "}
                                                  <CurrencyFormatter
                                                    amount={summaryDetails.totalSharesPost * summaryDetails.sharePricePost}
                                                    currency={roundData?.currency}
                                                  />
                                                </span>
                                              )}
                                            </div>
                                            {/* ✅ per-group breakdown agar multiple types hain */}
                                            {pendingItems.length > 1 && (
                                              <div className="d-flex gap-3 mt-1">
                                                {pendingItems.map((group, idx) => (
                                                  <span key={idx} className="text-muted">
                                                    {group.instrument_type}: <CurrencyFormatter amount={group.total_investment} currency={roundData?.currency} />

                                                  </span>
                                                ))}
                                              </div>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    })()}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          {/* Charts */}
                          {(preMoneyChartData || postMoneyChartData) && (
                            <div className="row">
                              {/* Pre-Money Chart */}
                              {preMoneyChartData && (
                                <div className="col-md-6">
                                  <div className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                      <h6 className="mb-0">Pre-Money Distribution</h6>
                                      <span className="badge bg-primary">
                                        Total: {formatNumber(
                                          capTableData?.pre_money?.total_shares ||
                                          capTableData?.pre_money?.totals?.total_shares || 0
                                        )} shares
                                      </span>
                                    </div>
                                    <div className="card-body">
                                      <div className="row">

                                        {/* Pie Chart */}
                                        <div className="col-md-12" style={{ height: '300px' }}>
                                          <Pie
                                            data={preMoneyChartData}
                                            options={{
                                              responsive: true,
                                              maintainAspectRatio: false,
                                              cutout: '50%',
                                              plugins: {
                                                datalabels: {
                                                  display: (context) => {
                                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                    return total > 0
                                                      ? (context.dataset.data[context.dataIndex] / total) * 100 >= 3
                                                      : false;
                                                  },
                                                  formatter: (value, context) => {
                                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                    return total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
                                                  },
                                                  color: '#000',
                                                  font: { weight: 'bold', size: 16 },
                                                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                                  padding: 6,
                                                },
                                                legend: { display: false },
                                                tooltip: {
                                                  backgroundColor: 'rgba(0,0,0,0.85)',
                                                  titleColor: '#fff',
                                                  bodyColor: '#fff',
                                                  borderColor: '#333',
                                                  borderWidth: 1,
                                                  cornerRadius: 6,
                                                  padding: 12,
                                                  displayColors: true,
                                                  callbacks: {
                                                    title: (tooltipItems) => {
                                                      const expandedItems = preMoneyChartData?._expandedItems || [];
                                                      const item = expandedItems[tooltipItems[0].dataIndex];
                                                      return item?._displayName || tooltipItems[0].label;
                                                    },
                                                    label: (context) => {
                                                      const expandedItems = preMoneyChartData?._expandedItems || [];
                                                      const item = expandedItems[context.dataIndex];
                                                      const value = context.parsed || 0;
                                                      const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                      const pct = total > 0 ? (value / total) * 100 : 0;
                                                      const preMoneyVal = parseFloat(
                                                        capTableData?.pre_money?.pre_money_valuation || roundData?.pre_money
                                                      ) || 0;
                                                      const valueAmount = (pct * preMoneyVal) / 100;

                                                      if (item?.type === 'pending') {
                                                        return [
                                                          `Investment: ${formatCurrency(parseFloat(item.investment || 0), roundData?.currency)}`,
                                                          `Potential Shares: ${formatNumber(item.potential_shares || 0)}`,
                                                        ];
                                                      }

                                                      return [
                                                        `Shares: ${formatNumber(value)}`,
                                                        `Ownership: ${pct.toFixed(2)}%`,
                                                        `Value: ${formatCurrency(valueAmount, roundData?.currency)}`,
                                                        `Price/Share: ${formatCurrencyNotRound(total > 0 ? preMoneyVal / total : 0, roundData?.currency)}`,
                                                      ];
                                                    },
                                                    afterLabel: (context) => {
                                                      const expandedItems = preMoneyChartData?._expandedItems || [];
                                                      const item = expandedItems[context.dataIndex];
                                                      if (!item) return null;
                                                      const details = [];

                                                      if (item._email) details.push(`📧 ${item._email}`);
                                                      if (item._phone) details.push(`📞 ${item._phone}`);

                                                      if (item.type === 'pending') {
                                                        if (item.discount_rate) details.push(`🏷️ Discount: ${item.discount_rate}%`);
                                                        if (item.valuation_cap) details.push(`🎯 Cap: ${formatCurrency(item.valuation_cap, roundData?.currency)}`);
                                                        if (item.conversion_price) details.push(`💱 Conv. Price: ${formatCurrencyNotRound(item.conversion_price, roundData?.currency)}`);
                                                      }

                                                      if (item._isExpanded && item._groupName) {
                                                        details.push(`📋 Round: ${item._groupName}`);
                                                      }

                                                      return details.length > 0 ? details : null;
                                                    },
                                                  },
                                                },
                                              },
                                            }}
                                          />
                                        </div>

                                        {/* Legend 0 _expandedItems use karo */}
                                        <div className="col-md-12">
                                          <div className="chart-legend-permanent h-100">
                                            <h6 className="mb-3 text-center fw-semibold">Ownership Distribution</h6>
                                            <div className="legend-list" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                                              {(preMoneyChartData?._expandedItems || []).map((item, index) => {
                                                const bgColors = preMoneyChartData.datasets[0].backgroundColor;
                                                const color = Array.isArray(bgColors) ? bgColors[index] : bgColors;
                                                const total = preMoneyChartData.datasets[0].data.reduce((a, b) => a + b, 0);
                                                const pct = total > 0 ? ((item._shares / total) * 100).toFixed(2) : '0.0';

                                                return (
                                                  <div key={index} className="legend-item d-flex align-items-start mb-2 p-2 border rounded">
                                                    <div
                                                      className="legend-color me-2 mt-1 flex-shrink-0"
                                                      style={{
                                                        width: '14px', height: '14px', borderRadius: '50%',
                                                        backgroundColor: item.type === 'pending' ? '#FFC107' : color,
                                                        border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                      }}
                                                    />
                                                    <div className="legend-text flex-grow-1">
                                                      <div className="d-flex justify-content-between align-items-center">
                                                        <small className="fw-semibold" style={{ maxWidth: '160px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                                          {item._displayName}
                                                        </small>
                                                        {item.type === 'pending'
                                                          ? <span className="badge bg-warning text-dark ms-2 flex-shrink-0">Pending</span>
                                                          : <span className="badge bg-primary ms-2 flex-shrink-0">{pct}%</span>
                                                        }
                                                      </div>

                                                      <small className="text-muted d-block">
                                                        {formatNumber(item._shares)} shares
                                                        {item.type === 'pending' && item.potential_shares > 0 && (
                                                          <span className="text-warning ms-2">(potential: {formatNumber(item.potential_shares)})</span>
                                                        )}
                                                      </small>

                                                      {item._email && (
                                                        <small className="text-muted d-block">
                                                          <i className="bi bi-envelope me-1"></i>{item._email}
                                                        </small>
                                                      )}
                                                      {item._phone && (
                                                        <small className="text-muted d-block">
                                                          <i className="bi bi-telephone me-1"></i>{item._phone}
                                                        </small>
                                                      )}

                                                      {item._isExpanded && item._groupName && (
                                                        <small className="text-muted d-block">📋 {item._groupName}</small>
                                                      )}

                                                      {item.type === 'pending' && (
                                                        <>
                                                          {parseFloat(item.investment) > 0 && (
                                                            <small className="text-muted d-block">
                                                              💰 Investment: {formatCurrency(parseFloat(item.investment), roundData?.currency)}
                                                            </small>
                                                          )}
                                                          {item.discount_rate > 0 && <small className="text-muted d-block">🏷️ Discount: {item.discount_rate}%</small>}
                                                          {item.valuation_cap > 0 && <small className="text-muted d-block">🎯 Cap: {formatCurrency(item.valuation_cap, roundData?.currency)}</small>}
                                                          {item.conversion_price > 0 && <small className="text-muted d-block">💱 {formatCurrencyNotRound(item.conversion_price, roundData?.currency)}</small>}
                                                        </>
                                                      )}
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                            </div>

                                            <div className="legend-total mt-3 pt-3 border-top">
                                              <div className="d-flex justify-content-between mb-1">
                                                <small className="text-muted">Total Shares:</small>
                                                <small className="fw-semibold">
                                                  {formatNumber(
                                                    capTableData?.pre_money?.total_shares ||
                                                    capTableData?.pre_money?.totals?.total_shares || 0
                                                  )}
                                                </small>
                                              </div>
                                              <div className="d-flex justify-content-between">
                                                <small className="text-muted">
                                                  {roundData?.instrument === "Safe" || roundData?.instrument === "Convertible Note"
                                                    ? "Company Valuation:"
                                                    : "Pre-Money Value:"}
                                                </small>

                                                <small className="fw-semibold">
                                                  <CurrencyFormatter
                                                    amount={capTableData?.pre_money?.pre_money_valuation || roundData?.pre_money || 0}
                                                    currency={roundData?.currency}
                                                  />
                                                </small>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Stats */}
                                      <div className="mt-3">
                                        <div className="row">
                                          <div className="col-md-4">
                                            <div className="text-center">
                                              <p className="mb-1 text-muted"><small>Total Shares</small></p>
                                              <h6 className="mb-0">
                                                {formatNumber(
                                                  capTableData?.pre_money?.total_shares ||
                                                  capTableData?.pre_money?.totals?.total_shares || 0
                                                )}
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="text-center">
                                              <p className="mb-1 text-muted"><small>Option Pool</small></p>
                                              <h6 className="mb-0">
                                                {formatPercentage((() => {
                                                  const op = capTableData?.pre_money?.items?.find(i => i.type === 'option_pool');
                                                  const total = capTableData?.pre_money?.total_shares
                                                    || capTableData?.pre_money?.totals?.total_shares || 1;
                                                  return op ? ((op.shares || 0) / total * 100) : 0;
                                                })())}
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="col-md-4">
                                            <div className="text-center">
                                              <p className="mb-1 text-muted">
                                                <small>
                                                  {roundData?.instrument === "Safe" || roundData?.instrument === "Convertible Note"
                                                    ? "Company Valuation"
                                                    : "Pre-Money Valuation"}
                                                </small>
                                              </p>

                                              <h6 className="mb-0">
                                                <CurrencyFormatter
                                                  amount={capTableData?.pre_money?.pre_money_valuation || roundData?.pre_money || 0}
                                                  currency={roundData?.currency}
                                                />
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Post-Money Chart */}
                              {postMoneyChartData && (
                                <div className="col-md-6">
                                  <div className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                      <h6 className="mb-0">Post-Money Distribution</h6>
                                      <span className="badge bg-success">
                                        Total: {formatNumber(capTableData?.post_money?.totals?.total_shares || 0)} shares
                                      </span>
                                    </div>
                                    <div className="card-body">
                                      <div className="row">

                                        {/* Pie Chart */}
                                        <div className="col-md-12" style={{ height: '300px' }}>
                                          <Pie
                                            data={postMoneyChartData}
                                            options={{
                                              responsive: true,
                                              maintainAspectRatio: false,
                                              cutout: '50%',
                                              plugins: {
                                                datalabels: {
                                                  display: (context) => {
                                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                    return total > 0
                                                      ? (context.dataset.data[context.dataIndex] / total) * 100 >= 3
                                                      : false;
                                                  },
                                                  formatter: (value, context) => {
                                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                    return total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';
                                                  },
                                                  color: '#000',
                                                  font: { weight: 'bold', size: 16 },
                                                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                                  padding: 6,
                                                },
                                                legend: { display: false },
                                                tooltip: {
                                                  backgroundColor: 'rgba(0,0,0,0.85)',
                                                  titleColor: '#fff',
                                                  bodyColor: '#fff',
                                                  borderColor: '#333',
                                                  borderWidth: 1,
                                                  cornerRadius: 6,
                                                  padding: 12,
                                                  displayColors: true,
                                                  callbacks: {
                                                    title: (tooltipItems) => {
                                                      const expandedItems = postMoneyChartData?._expandedItems || [];
                                                      const item = expandedItems[tooltipItems[0].dataIndex];
                                                      return item?._displayName || tooltipItems[0].label;
                                                    },
                                                    label: (context) => {
                                                      const expandedItems = postMoneyChartData?._expandedItems || [];
                                                      const item = expandedItems[context.dataIndex];
                                                      const value = context.parsed || 0;
                                                      const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                                      const pct = total > 0 ? (value / total) * 100 : 0;

                                                      const isSAFE = capTableData?.post_money?.totals?.instrumentType === 'Safe';
                                                      const valuation = isSAFE
                                                        ? (parseFloat(capTableData?.post_money?.totals?.total_value) || parseFloat(roundData?.pre_money) || 0)
                                                        : (parseFloat(roundData?.post_money) || 0);
                                                      const valueAmount = (pct * valuation) / 100;

                                                      if (item?.type === 'pending') {
                                                        return [
                                                          `Investment: ${formatCurrency(parseFloat(item.investment || 0), roundData?.currency)}`,
                                                          `Potential Shares: ${formatNumber(item.potential_shares || 0)}`,
                                                        ];
                                                      }

                                                      return [
                                                        `Shares: ${formatNumber(value)}`,
                                                        `Ownership: ${pct.toFixed(2)}%`,
                                                        `Value: ${formatCurrency(valueAmount, roundData?.currency)}`,
                                                      ];
                                                    },
                                                    afterLabel: (context) => {
                                                      const expandedItems = postMoneyChartData?._expandedItems || [];
                                                      const item = expandedItems[context.dataIndex];
                                                      if (!item) return null;

                                                      const details = [];

                                                      if (item._email) details.push(`📧 ${item._email}`);
                                                      if (item._phone) details.push(`📞 ${item._phone}`);

                                                      if (item.type === 'investor') {
                                                        if (item._investmentAmount > 0) {
                                                          details.push(`💰 Investment: ${formatCurrency(item._investmentAmount, roundData?.currency)}`);
                                                        }
                                                        if (item._roundName) {
                                                          details.push(`📋 Round: ${item._roundName}`);
                                                        }
                                                      }

                                                      if (item.type === 'pending') {
                                                        if (item.discount_rate) details.push(`🏷️ Discount: ${item.discount_rate}%`);
                                                        if (item.valuation_cap) details.push(`🎯 Cap: ${formatCurrency(item.valuation_cap, roundData?.currency)}`);
                                                        if (item.conversion_price) details.push(`💱 Conv. Price: ${formatCurrencyNotRound(item.conversion_price, roundData?.currency)}`);
                                                      }

                                                      if (item.type === 'option_pool' && item._new_shares > 0) {
                                                        details.push(`🆕 New Shares: ${formatNumber(item._new_shares)}`);
                                                      }

                                                      return details.length > 0 ? details : null;
                                                    },
                                                  },
                                                },
                                              },
                                            }}
                                          />
                                        </div>

                                        {/* Legend with expanded items */}
                                        <div className="col-md-12">
                                          <div className="chart-legend-permanent h-100">
                                            <h6 className="mb-3 text-center fw-semibold">Ownership Distribution</h6>
                                            <div className="legend-list" style={{ maxHeight: '240px', overflowY: 'auto' }}>
                                              {(postMoneyChartData?._expandedItems || []).map((item, index) => {
                                                const bgColors = postMoneyChartData.datasets[0].backgroundColor;
                                                const color = Array.isArray(bgColors) ? bgColors[index] : bgColors;
                                                const total = postMoneyChartData.datasets[0].data.reduce((a, b) => a + b, 0);
                                                const pct = total > 0 ? ((item._shares / total) * 100).toFixed(1) : '0.0';

                                                return (
                                                  <div key={index} className="legend-item d-flex align-items-start mb-2 p-2 border rounded">
                                                    <div
                                                      className="legend-color me-2 mt-1 flex-shrink-0"
                                                      style={{
                                                        width: '14px', height: '14px', borderRadius: '50%',
                                                        backgroundColor: item.type === 'pending' ? '#FFC107' : color,
                                                        border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                      }}
                                                    />
                                                    <div className="legend-text flex-grow-1">
                                                      <div className="d-flex justify-content-between align-items-center">
                                                        <small className="fw-semibold" style={{ maxWidth: '160px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                                          {item._displayName}
                                                        </small>
                                                        {item.type === 'pending'
                                                          ? <span className="badge bg-warning text-dark ms-2 flex-shrink-0">Pending</span>
                                                          : <span className="badge bg-success ms-2 flex-shrink-0">{pct}%</span>
                                                        }
                                                      </div>

                                                      <small className="text-muted d-block">
                                                        {formatNumber(item._shares)} shares
                                                        {item.type === 'pending' && item.potential_shares > 0 && (
                                                          <span className="text-warning ms-2">(potential: {formatNumber(item.potential_shares)})</span>
                                                        )}
                                                      </small>

                                                      {item._email && (
                                                        <small className="text-muted d-block">
                                                          <i className="bi bi-envelope me-1"></i>{item._email}
                                                        </small>
                                                      )}
                                                      {item._phone && (
                                                        <small className="text-muted d-block">
                                                          <i className="bi bi-telephone me-1"></i>{item._phone}
                                                        </small>
                                                      )}

                                                      {item.type === 'investor' && item._roundName && (
                                                        <small className="text-muted d-block">
                                                          <i className="bi bi-hash me-1"></i>{item._roundName}
                                                        </small>
                                                      )}

                                                      {item.type === 'investor' && item._investmentAmount > 0 && (
                                                        <small className="text-muted d-block">
                                                          <i className="bi bi-cash me-1"></i>
                                                          {formatCurrency(item._investmentAmount, roundData?.currency)}
                                                        </small>
                                                      )}

                                                      {item.type === 'pending' && (
                                                        <>
                                                          {item.investment > 0 && (
                                                            <small className="text-muted d-block">
                                                              💰 {formatCurrency(item.investment, roundData?.currency)}
                                                            </small>
                                                          )}
                                                          {item.discount_rate > 0 && (
                                                            <small className="text-muted d-block">🏷️ Discount: {item.discount_rate}%</small>
                                                          )}
                                                          {item.valuation_cap > 0 && (
                                                            <small className="text-muted d-block">
                                                              🎯 Cap: {formatCurrency(item.valuation_cap, roundData?.currency)}
                                                            </small>
                                                          )}
                                                        </>
                                                      )}
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                            </div>

                                            {/* Summary */}
                                            <div className="legend-total mt-3 pt-3 border-top">
                                              <div className="d-flex justify-content-between mb-1">
                                                <small className="text-muted">Total Shares:</small>
                                                <small className="fw-semibold">
                                                  {formatNumber(capTableData?.post_money?.totals?.total_shares || 0)}
                                                </small>
                                              </div>
                                              <div className="d-flex justify-content-between mb-1">
                                                <small className="text-muted">New Shares:</small>
                                                <small className="fw-semibold text-success">
                                                  {formatNumber(capTableData?.post_money?.totals?.total_new_shares || 0)}
                                                </small>
                                              </div>
                                              {roundData?.instrument !== "Safe" && roundData?.instrument !== "Convertible Note" && (
                                                <div className="d-flex justify-content-between">
                                                  <small className="text-muted">Post-Money Value:</small>
                                                  <small className="fw-semibold">
                                                    <CurrencyFormatter
                                                      amount={capTableData?.post_money?.totals?.total_value || 0}
                                                      currency={roundData?.currency}
                                                    />
                                                  </small>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="col-md-12 mt-2">
                                <div className="card">
                                  <div className="card-header d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0">Ownership Percentage Comparison</h6>
                                    <div>
                                      <span className="badge bg-primary me-2">Pre-Money %</span>
                                      <span className="badge bg-danger">Post-Money %</span>
                                    </div>
                                  </div>
                                  <div className="card-body">
                                    <div style={{ height: '400px' }}>
                                      <Bar
                                        data={(() => {
                                          // ==================== STEP 1: PRE-MONEY EXPANDED ITEMS ====================
                                          const preExpandedItems = [];
                                          const preItems = capTableData?.pre_money?.items || [];

                                          preItems.forEach((item) => {
                                            // INVESTOR TYPE with array of investors
                                            if (item.type === 'investor' && Array.isArray(item.investor_details) && item.investor_details.length > 0) {
                                              // Use individual investor shares if available, otherwise split equally
                                              item.investor_details.forEach((inv, invIdx) => {
                                                const name = `${inv.firstName || ''} ${inv.lastName || ''}`.trim() || inv.name || `Investor ${invIdx + 1}`;
                                                const shareType = item.share_class_type || '';

                                                // Use investor's individual shares if available, otherwise split equally
                                                const investorShares = inv.shares || Math.round((item.shares || 0) / item.investor_details.length);

                                                preExpandedItems.push({
                                                  _displayName: `👤 ${name}${shareType ? ` (${shareType})` : ''}`,
                                                  _shares: investorShares,
                                                  _email: inv.email || '',
                                                  _phone: inv.phone || '',
                                                  _type: 'pre',
                                                  _originalType: 'investor',
                                                  _roundId: item.round_id_ref,
                                                  _groupName: item.name,
                                                  _inv: inv,
                                                  _uniqueId: `${inv.email || name}-${item.round_id_ref || ''}` // Unique ID for matching
                                                });
                                              });
                                            }
                                            // FOUNDER TYPE
                                            else if (item.type === 'founder') {
                                              preExpandedItems.push({
                                                _displayName: `${item.founder_code || 'F'} - ${item.name}`,
                                                _shares: item.shares || 0,
                                                _email: item.email || '',
                                                _phone: item.phone || '',
                                                _type: 'pre',
                                                _originalType: 'founder',
                                                _uniqueId: `founder-${item.name}-${item.email || ''}`
                                              });
                                            }
                                            // OPTION POOL
                                            else if (item.type === 'option_pool') {
                                              preExpandedItems.push({
                                                _displayName: 'Employee Option Pool',
                                                _shares: item.shares || 0,
                                                _type: 'pre',
                                                _originalType: 'option_pool',
                                                _uniqueId: 'option-pool'
                                              });
                                            }
                                            // PENDING (SAFE)
                                            else if (item.type === 'pending') {
                                              const inv = item.investor_details || {};
                                              const name = `${inv.firstName || ''} ${inv.lastName || ''}`.trim() || item.name || 'SAFE Investor';
                                              preExpandedItems.push({
                                                _displayName: `👤 ${name}`,
                                                _shares: 0,
                                                _email: inv.email || item.email || '',
                                                _phone: inv.phone || item.phone || '',
                                                _type: 'pre',
                                                _originalType: 'pending',
                                                investment: parseFloat(item.investment) || 0,
                                                potential_shares: item.potential_shares || 0,
                                                _uniqueId: `pending-${inv.email || name}`
                                              });
                                            }
                                          });

                                          // ==================== STEP 2: POST-MONEY EXPANDED ITEMS ====================
                                          const postExpandedItems = [];
                                          const postItems = capTableData?.post_money?.items || [];

                                          postItems.forEach((item) => {
                                            // INVESTOR TYPE with array of investors
                                            if (item.type === 'investor' && Array.isArray(item.investor_details) && item.investor_details.length > 0) {
                                              item.investor_details.forEach((inv, invIdx) => {
                                                const name = `${inv.firstName || ''} ${inv.lastName || ''}`.trim() || inv.name || `Investor ${invIdx + 1}`;
                                                const shareType = item.share_class_type || '';

                                                // Use investor's individual shares if available
                                                const investorShares = inv.shares || Math.round((item.shares || 0) / item.investor_details.length);

                                                postExpandedItems.push({
                                                  _displayName: `👤 ${name}${shareType ? ` (${shareType})` : ''}`,
                                                  _shares: investorShares,
                                                  _email: inv.email || '',
                                                  _phone: inv.phone || '',
                                                  _type: 'post',
                                                  _originalType: 'investor',
                                                  _roundId: item.round_id_ref,
                                                  _groupName: item.name,
                                                  _inv: inv,
                                                  _isPrevious: item.is_previous,
                                                  _roundName: item.round_name,
                                                  _uniqueId: `${inv.email || name}-${item.round_id_ref || ''}`
                                                });
                                              });
                                            }
                                            // FOUNDER TYPE
                                            else if (item.type === 'founder') {
                                              postExpandedItems.push({
                                                _displayName: `${item.founder_code || 'F'} - ${item.name}`,
                                                _shares: item.shares || 0,
                                                _email: item.email || '',
                                                _phone: item.phone || '',
                                                _type: 'post',
                                                _originalType: 'founder',
                                                _uniqueId: `founder-${item.name}-${item.email || ''}`
                                              });
                                            }
                                            // OPTION POOL
                                            else if (item.type === 'option_pool') {
                                              postExpandedItems.push({
                                                _displayName: 'Employee Option Pool',
                                                _shares: item.shares || 0,
                                                _type: 'post',
                                                _originalType: 'option_pool',
                                                _uniqueId: 'option-pool'
                                              });
                                            }
                                            // PENDING (SAFE)
                                            else if (item.type === 'pending') {
                                              const inv = item.investor_details || {};
                                              const name = `${inv.firstName || ''} ${inv.lastName || ''}`.trim() || item.name || 'SAFE Investor';
                                              postExpandedItems.push({
                                                _displayName: `👤 ${name}`,
                                                _shares: 0,
                                                _email: inv.email || item.email || '',
                                                _phone: inv.phone || item.phone || '',
                                                _type: 'post',
                                                _originalType: 'pending',
                                                investment: parseFloat(item.investment) || 0,
                                                potential_shares: item.potential_shares || 0,
                                                _uniqueId: `pending-${inv.email || name}`
                                              });
                                            }
                                          });

                                          // ==================== STEP 3: CALCULATE TOTALS ====================
                                          const totalPreShares = preExpandedItems.reduce((sum, item) => sum + (item._shares || 0), 0) || 1;
                                          const totalPostShares = postExpandedItems.reduce((sum, item) => sum + (item._shares || 0), 0) || 1;
                                          const isSAFERound = capTableData?.post_money?.totals?.instrumentType === 'Safe';

                                          // ==================== STEP 4: MERGE BY UNIQUE IDENTIFIER ====================
                                          const shareholderMap = new Map();

                                          // First add all pre-money items
                                          preExpandedItems.forEach((item) => {
                                            shareholderMap.set(item._uniqueId, {
                                              label: item._displayName,
                                              preShares: item._shares,
                                              postShares: 0,
                                              isPending: item._originalType === 'pending',
                                              email: item._email,
                                              phone: item._phone,
                                              investment: item.investment,
                                              potential_shares: item.potential_shares,
                                              type: item._originalType,
                                              roundId: item._roundId,
                                            });
                                          });

                                          // Then add/update with post-money items
                                          postExpandedItems.forEach((item) => {
                                            if (shareholderMap.has(item._uniqueId)) {
                                              // Update existing
                                              const existing = shareholderMap.get(item._uniqueId);
                                              existing.postShares = item._shares;
                                            } else {
                                              // Add new
                                              shareholderMap.set(item._uniqueId, {
                                                label: item._displayName,
                                                preShares: 0,
                                                postShares: item._shares,
                                                isPending: item._originalType === 'pending',
                                                email: item._email,
                                                phone: item._phone,
                                                investment: item.investment,
                                                potential_shares: item.potential_shares,
                                                type: item._originalType,
                                                roundId: item._roundId,
                                              });
                                            }
                                          });

                                          const orderedKeys = Array.from(shareholderMap.keys());
                                          const postDenominator = isSAFERound ? totalPreShares : totalPostShares;

                                          // Sort keys to maintain consistent order
                                          orderedKeys.sort((a, b) => {
                                            const entryA = shareholderMap.get(a);
                                            const entryB = shareholderMap.get(b);

                                            // Founders first
                                            if (entryA.type === 'founder' && entryB.type !== 'founder') return -1;
                                            if (entryA.type !== 'founder' && entryB.type === 'founder') return 1;

                                            // Then option pool
                                            if (entryA.type === 'option_pool' && entryB.type !== 'option_pool') return -1;
                                            if (entryA.type !== 'option_pool' && entryB.type === 'option_pool') return 1;

                                            // Then investors
                                            return 0;
                                          });

                                          // Store for tooltip
                                          const chartData = {
                                            shareholderMap,
                                            orderedKeys,
                                            totalPreShares,
                                            totalPostShares
                                          };

                                          if (typeof window !== 'undefined') {
                                            window.__temp_chartData = chartData;
                                          }

                                          return {
                                            labels: orderedKeys.map(key => shareholderMap.get(key).label),
                                            datasets: [
                                              {
                                                label: 'Pre-Money %',
                                                data: orderedKeys.map(key => {
                                                  const entry = shareholderMap.get(key);
                                                  if (entry.isPending) return 0;
                                                  return parseFloat(((entry.preShares || 0) / totalPreShares * 100).toFixed(2));
                                                }),
                                                backgroundColor: '#4e73df',
                                                borderColor: '#4e73df',
                                                borderWidth: 2,
                                                borderRadius: 5,
                                                barThickness: 30,
                                              },
                                              {
                                                label: isSAFERound ? 'Post-Money % (excl. pending)' : 'Post-Money %',
                                                data: orderedKeys.map(key => {
                                                  const entry = shareholderMap.get(key);
                                                  if (entry.isPending) {
                                                    const totalWithPending = totalPostShares + (entry.postShares || 0);
                                                    return parseFloat(((entry.postShares || 0) / totalWithPending * 100).toFixed(2));
                                                  }
                                                  return parseFloat(((entry.postShares || 0) / postDenominator * 100).toFixed(2));
                                                }),
                                                backgroundColor: (context) => {
                                                  const key = orderedKeys[context.dataIndex];
                                                  return shareholderMap.get(key)?.isPending ? '#FFC107' : '#e74a3b';
                                                },
                                                borderColor: (context) => {
                                                  const key = orderedKeys[context.dataIndex];
                                                  return shareholderMap.get(key)?.isPending ? '#FFC107' : '#e74a3b';
                                                },
                                                borderWidth: 2,
                                                borderRadius: 5,
                                                barThickness: 30,
                                              }
                                            ]
                                          };
                                        })()}
                                        options={{
                                          responsive: true,
                                          maintainAspectRatio: false,
                                          plugins: {
                                            legend: {
                                              position: 'top',
                                              labels: { boxWidth: 12, padding: 15, font: { size: 12 } }
                                            },
                                            tooltip: {
                                              backgroundColor: 'rgba(0,0,0,0.85)',
                                              titleColor: '#fff',
                                              bodyColor: '#fff',
                                              borderColor: '#333',
                                              borderWidth: 1,
                                              cornerRadius: 6,
                                              padding: 12,
                                              displayColors: true,
                                              callbacks: {
                                                title: (tooltipItems) => {
                                                  const chartData = window.__temp_chartData;
                                                  if (!chartData) return tooltipItems[0].label;

                                                  const key = chartData.orderedKeys[tooltipItems[0].dataIndex];
                                                  const entry = chartData.shareholderMap.get(key);
                                                  return entry?.label || tooltipItems[0].label;
                                                },
                                                label: (context) => {
                                                  const value = context.parsed.y || 0;
                                                  return `${context.dataset.label}: ${value}%`;
                                                },
                                                afterLabel: (context) => {
                                                  const chartData = window.__temp_chartData;
                                                  if (!chartData) return null;

                                                  const key = chartData.orderedKeys[context.dataIndex];
                                                  const entry = chartData.shareholderMap.get(key);
                                                  if (!entry) return null;

                                                  const details = [];

                                                  if (entry.email) details.push(`📧 ${entry.email}`);
                                                  if (entry.phone) details.push(`📞 ${entry.phone}`);

                                                  if (entry.isPending) {
                                                    details.push(`👤 Pending SAFE`);
                                                    if (entry.investment) details.push(`💰 Investment: ${formatCurrency(entry.investment, roundData?.currency)}`);
                                                    if (entry.potential_shares) details.push(`📊 Potential: ${formatNumber(entry.potential_shares)}`);
                                                  } else {
                                                    const prePct = ((entry.preShares || 0) / chartData.totalPreShares * 100).toFixed(2);
                                                    const postPct = ((entry.postShares || 0) / chartData.totalPostShares * 100).toFixed(2);
                                                    details.push(`📊 Pre: ${prePct}% | Post: ${postPct}%`);
                                                  }

                                                  return details.length > 0 ? details : null;
                                                }
                                              }
                                            },
                                            datalabels: {
                                              display: true,
                                              formatter: (value) => value > 0 ? value + '%' : '',
                                              color: '#fff',
                                              font: { weight: 'bold', size: 10 },
                                              anchor: 'center',
                                              align: 'center',
                                            }
                                          },
                                          scales: {
                                            x: {
                                              grid: { display: false },
                                              title: { display: true, text: 'Shareholders', font: { size: 12, weight: 'bold' } },
                                              ticks: {
                                                maxRotation: 45,
                                                minRotation: 45,
                                                callback: function (val, index) {
                                                  const label = this.getLabelForValue(val);
                                                  return label.length > 20 ? label.substr(0, 18) + '...' : label;
                                                }
                                              }
                                            },
                                            y: {
                                              beginAtZero: true,
                                              max: 100,
                                              ticks: { callback: (value) => value + '%', stepSize: 10 },
                                              title: { display: true, text: 'Ownership Percentage', font: { size: 12, weight: 'bold' } }
                                            }
                                          }
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Pending Conversions Tab */}
                    {activeTab === 'pending' && pendingConversions.length > 0 && (
                      <div className="card">
                        <div className="card-header bg-warning">
                          <h5 className="mb-0">Pending Conversions</h5>
                          <small className="text-white">SAFE/Convertible Notes waiting to convert</small>
                        </div>
                        <div className="card-body">
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>Instrument</th>
                                  <th>Round</th>
                                  <th className="text-end">Investment</th>
                                  <th className="text-end">Conversion Price</th>
                                  <th className="text-end">Potential Shares</th>
                                  <th>Discount</th>
                                  <th>Valuation Cap</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pendingConversions.map((conv, index) => {
                                  const mappedConv = {
                                    instrument: conv.instrument_type || conv.instrument,
                                    round_name: conv.round_name,
                                    investment: conv.investment_amount || conv.investment,
                                    conversion_price: conv.share_price || conv.conversion_price,
                                    potential_shares: conv.estimated_shares || conv.potential_shares,
                                    discount_rate: conv.instrument_data?.discountRate_note || conv.discount_rate,
                                    valuation_cap: conv.instrument_data?.valuationCap_note || conv.valuation_cap
                                  };

                                  return (
                                    <tr key={index}>
                                      <td>
                                        <span className={`badge ${mappedConv.instrument === 'Safe' ? 'bg-primary' : 'bg-info'}`}>
                                          {mappedConv.instrument}
                                        </span>
                                      </td>
                                      <td>{mappedConv.round_name}</td>
                                      <td className="text-end">
                                        <CurrencyFormatter
                                          amount={mappedConv.investment}
                                          currency={roundData?.currency}
                                        />
                                      </td>

                                      <td className="text-end">
                                        <CurrencyFormatter
                                          amount={mappedConv.conversion_price}
                                          currency={roundData?.currency}
                                        />
                                      </td>

                                      <td className="text-end">{formatNumber(mappedConv.potential_shares)}</td>
                                      <td>{mappedConv.discount_rate}%</td>
                                      <td>
                                        <CurrencyFormatter
                                          amount={mappedConv.valuation_cap}
                                          currency={roundData?.currency}
                                        />
                                      </td>

                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* ===== OWNERSHIP STATISTICS SECTION ===== */}
                    {roundData?.type === 'Round 0' && (
                      <div className="row mb-4">
                        <div className="col-md-12">
                          <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white border-0 py-3">
                              <h6 className="mb-0 fw-bold text-dark">
                                <i className="bi bi-pie-chart-fill text-primary me-2"></i>
                                Ownership Distribution Statistics
                              </h6>
                            </div>
                            <div className="card-body">
                              <div className="row text-center">
                                {/* Largest Ownership */}
                                <div className="col-md-4">
                                  <div className="p-3">
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                      <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-2">
                                        <i className="bi bi-arrow-up-short text-primary fs-4"></i>
                                      </div>
                                      <div>
                                        <small className="text-muted d-block">Largest Ownership</small>
                                        <h3 className="mb-0 fw-bold text-primary">{stats.largest}%</h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Smallest Ownership */}
                                <div className="col-md-4">
                                  <div className="p-3">
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                      <div className="rounded-circle bg-info bg-opacity-10 p-3 me-2">
                                        <i className="bi bi-arrow-down-short text-info fs-4"></i>
                                      </div>
                                      <div>
                                        <small className="text-muted d-block">Smallest Ownership</small>
                                        <h3 className="mb-0 fw-bold text-info">{stats.smallest}%</h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Founders Count */}
                                <div className="col-md-4">
                                  <div className="p-3">
                                    <div className="d-flex align-items-center justify-content-center mb-2">
                                      <div className="rounded-circle bg-success bg-opacity-10 p-3 me-2">
                                        <i className="bi bi-people-fill text-success fs-4"></i>
                                      </div>
                                      <div>
                                        <small className="text-muted d-block">Founders</small>
                                        <h3 className="mb-0 fw-bold text-success">
                                          {stats.totalFounders}
                                        </h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>


                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeTab === 'post-money' && (
                      <div className="row my-4 gy-2 gx-4">
                        <div className="col-12">
                          <div className="card-header bg-white border-0 py-3">
                            <h6 className="mb-0 fw-bold text-dark">
                              <i className="bi bi-pie-chart-fill text-primary me-2"></i>
                              Ownership Statistics
                            </h6>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="card h-100 border-1 shadow-sm text-center">
                            <div className="card-body py-4">
                              <div className="d-inline-flex align-items-center justify-content-center 
                          rounded-circle bg-primary bg-opacity-10 p-3 mb-3">
                                <i className="bi bi-arrow-up-short text-primary fs-3"></i>
                              </div>
                              <small className="text-muted d-block mb-1">
                                Largest Ownership
                              </small>
                              <h2 className="fw-bold text-primary mb-0">
                                {postStats.largest}%
                              </h2>
                            </div>
                          </div>
                        </div>


                        <div className="col-md-4">
                          <div className="card h-100 border-1 shadow-sm text-center">
                            <div className="card-body py-4">
                              <div className="d-inline-flex align-items-center justify-content-center 
                          rounded-circle bg-info bg-opacity-10 p-3 mb-3">
                                <i className="bi bi-arrow-down-short text-info fs-3"></i>
                              </div>
                              <small className="text-muted d-block mb-1">
                                Smallest Ownership
                              </small>
                              <h2 className="fw-bold text-info mb-0">
                                {postStats.smallest}%
                              </h2>
                            </div>
                          </div>
                        </div>


                        <div className="col-md-4">
                          <div className="card h-100 border-1 shadow-sm text-center">
                            <div className="card-body py-4">
                              <div className="d-inline-flex align-items-center justify-content-center 
                          rounded-circle bg-success bg-opacity-10 p-3 mb-3">
                                <i className="bi bi-people-fill text-success fs-3"></i>
                              </div>
                              <small className="text-muted d-block mb-1">
                                Shareholders
                              </small>
                              <h2 className="fw-bold text-success mb-0">
                                {postStats.totalCount || 0}
                              </h2>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                    {/* Calculations Summary */}
                    {roundData?.type !== 'Round 0' && (
                      <div className="card mt-4">
                        <div className="card-header bg-light ">
                          <h6 className="py-2">Valuation Summary</h6>
                        </div>
                        <div className="custome_card p-3">
                          <div className="row gy-3">
                            <div className="col-md-4">
                              <div className="d-flex custome_card_box flex-column gap-3">
                                <p className="bg-danger custome_cardp">
                                  <strong>
                                    {roundData?.instrument === "Safe" || roundData?.instrument === "Convertible Note"
                                      ? "Company Valuation"
                                      : "Pre-Money Valuation"}
                                  </strong>
                                </p>

                                <h4 className="text-danger">
                                  <CurrencyFormatter
                                    amount={calculations.pre_money_valuation}
                                    currency={roundData?.currency}
                                  />
                                </h4>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex custome_card_box flex-column gap-3">
                                <p className="bg-success custome_cardp"><strong>Investment</strong></p>
                                <h4 className="text-success">
                                  <CurrencyFormatter
                                    amount={roundData?.investment}
                                    currency={roundData?.currency}
                                  />
                                </h4>
                              </div>
                            </div>
                            {roundData?.instrument !== "Safe" && roundData?.instrument !== "Convertible Note" && (
                              <div className="col-md-4">
                                <div className="d-flex custome_card_box flex-column gap-3">
                                  <p className="bg-info custome_cardp">
                                    <strong>Post-Money Valuation</strong>
                                  </p>

                                  <h4 className="text-info">
                                    <CurrencyFormatter
                                      amount={calculations.post_money_valuation}
                                      currency={roundData?.currency}
                                    />
                                  </h4>
                                </div>
                              </div>
                            )}

                            <div className="col-md-4">
                              <div className="d-flex custome_card_box flex-column gap-3">
                                <p className="bg-primary custome_cardp"><strong>Total Shares Outstanding</strong></p>
                                <h4 className="text-primary">{formatNumber(calculations.total_shares_outstanding)}</h4>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="d-flex custome_card_box flex-column gap-3">
                                <p className="bg-warning custome_cardp"><strong>Share Price</strong></p>
                                <h4 className="text-warning">{
                                  isUnpricedRound && !isConverted
                                    ? 'N/A'
                                    : <CurrencyFormatter
                                      amount={displaySharePrice}
                                      currency={roundData?.currency}
                                      digit={3}
                                    />

                                }</h4>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="d-flex custome_card_box flex-column gap-3">
                                <p className="bg-success custome_cardp"><strong>New Shares</strong></p>
                                <h4 className="text-success">
                                  {formatNumber(capTableData?.post_money?.totals?.total_new_shares || 0)}</h4>
                              </div>
                            </div>
                          </div>


                        </div>

                      </div>

                    )}




                    {/* Back Button */}
                    <div className="mt-4">
                      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Rounds List
                      </button>
                      <button className="btn btn-primary ms-2" onClick={getCapTableData}>
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Refresh Data
                      </button>
                    </div>
                    <div className="mt-4 pt-3 border-top">
                      <h6 className="fw-bold mb-2" style={{ color: '#CC0000' }}>
                        <i className="bi bi-exclamation-triangle-fill me-2" style={{ color: '#CC0000' }}></i>
                        Disclaimer
                      </h6>
                      <p className="text-muted small mb-0 redcolor" >
                        IMPORTANT : The calculations are for informational purpose only !<br />
                        Please consult with your legal and financial advisors before making any investment decisions
                      </p>
                    </div>

                  </SectionWrapper>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}