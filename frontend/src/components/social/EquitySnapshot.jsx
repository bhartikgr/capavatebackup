import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../../config/config';
import axios from "axios";
import CurrencyFormatter from '../../components/CurrencyFormatter'
export default function EquitySnapshot() {
  const apiUrlRound = API_BASE_URL + "api/user/companydashboard/";
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const userLogin = storedUsername ? JSON.parse(storedUsername) : null;

  // ✅ Metrics states
  const [totalShares, setTotalShares] = useState(0);
  const [totalSharesFormatted, setTotalSharesFormatted] = useState('0');
  const [latestValuation, setLatestValuation] = useState(0);
  const [valuationCurrency, setValuationCurrency] = useState('$');
  const [valuationFormatted, setValuationFormatted] = useState('0');

  // Option Pool metrics
  const [optionPoolPercent, setOptionPoolPercent] = useState(0);
  const [optionPoolShares, setOptionPoolShares] = useState(0);
  const [optionPoolSharesFormatted, setOptionPoolSharesFormatted] = useState('0');

  // Investor Stakes
  const [investorStakes, setInvestorStakes] = useState(0);
  const [investorStakesFormatted, setInvestorStakesFormatted] = useState('0');
  const [RoundData, setRoundData] = useState('');
  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEquityMetrics();
    fetchLatestValuation();
  }, []);

  // ✅ Format number with commas
  const formatNumber = (num) => {
    return num?.toLocaleString() || '0';
  };

  // ✅ Format currency
  const formatCurrency = (amount, currency = '$') => {
    if (!amount) return `${currency}0`;
    return `${currency} ${amount.toLocaleString()}`;
  };

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

      console.log("API Response:", capTable.post_money);

      if (capTable?.post_money?.items?.length > 0) {
        // Calculate metrics
        let totalSharesCalc = 0;
        let optionPoolSharesCalc = 0;
        let investorSharesCalc = 0;

        capTable.post_money.items.forEach((item) => {
          const shares = item.shares || 0;
          totalSharesCalc += shares;

          // Option Pool
          if (item.type === 'option_pool') {
            optionPoolSharesCalc += shares;
          }
          // Investors (previous, new, converted)
          else if (item.type === 'investor') {
            investorSharesCalc += shares;
          }
          // Handle nested investor_details
          else if (item.type === 'investor' && Array.isArray(item.investor_details)) {
            item.investor_details.forEach(inv => {
              const invShares = inv.shares || 0;
              investorSharesCalc += invShares;
            });
          }
        });

        // Calculate percentages
        const optionPoolPercentCalc = totalSharesCalc > 0
          ? ((optionPoolSharesCalc / totalSharesCalc) * 100).toFixed(1)
          : 0;

        const investorStakesCalc = totalSharesCalc > 0
          ? ((investorSharesCalc / totalSharesCalc) * 100).toFixed(1)
          : 0;

        // Update states
        setTotalShares(totalSharesCalc);
        setTotalSharesFormatted(formatNumber(totalSharesCalc));

        setOptionPoolShares(optionPoolSharesCalc);
        setOptionPoolSharesFormatted(formatNumber(optionPoolSharesCalc));
        setOptionPoolPercent(optionPoolPercentCalc);

        setInvestorStakes(investorStakesCalc);
        setInvestorStakesFormatted(`${investorStakesCalc}%`);
      }
    } catch (err) {
      console.error("Error fetching equity metrics:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch latest valuation
  const fetchLatestValuation = async () => {
    try {
      // Try to get from round data first
      const formData = {
        company_id: userLogin?.companies[0]?.id,
      };

      const res = await axios.post(
        apiUrlRound + "getroundChart", // Adjust endpoint as per your backend
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        const latestRound = res.data.round;
        setRoundData(latestRound);
        const valuation = parseFloat(latestRound?.post_money) || 0;
        const currency = latestRound?.currency || '$';

        setLatestValuation(valuation);
        setValuationCurrency(currency);
        setValuationFormatted(formatCurrency(valuation, currency));
      } else {
        // Fallback to pre_money or other valuation
        const fallbackValuation = res.data.valuation || 0;
        const fallbackCurrency = res.data.currency || '$';
        setLatestValuation(fallbackValuation);
        setValuationCurrency(fallbackCurrency);
        setValuationFormatted(formatCurrency(fallbackValuation, fallbackCurrency));
      }
    } catch (err) {
      console.error("Error fetching latest valuation:", err);
      // Set default values on error
      setLatestValuation(0);
      setValuationFormatted('$ 0');
    }
  };
  return (
    <div className='d-flex flex-column gap-3'>
      <div class='bar_design d-flex justify-content-between align-items-center flex-wrap gap-3'>
        <h4 class='h5'>Equity Snapshot</h4>
        <h4 class='h5'>Company Name : Capavate</h4>
      </div>
      <div class='row gap-0 dashboard-top'>
        <div class='col-6 col-md-3 p-0 bor bottom_b'>
          <div class='p-3'>
            <p class='small fw-medium mb-2'>Total Shares</p>
            <div class='d-flex align-items-center gap-3 justify-content-between'>
              <p class='h4 fw-semibold mb-0'>{<CurrencyFormatter
                amount={totalSharesFormatted}
                currency={RoundData?.currency}
              />}</p>
            </div>
          </div>
        </div>
        <div class='col-6 col-md-3 p-0 bor bottom_b'>
          <div class='p-3'>
            <p class='small fw-medium mb-2'>Option Pool</p>
            <div>
              <p class='h4 fw-semibold mb-0'>{optionPoolPercent}%</p>
              <small class='text-white menu_value bg-success'>{optionPoolSharesFormatted} shares</small>
            </div>
          </div>
        </div>
        <div class='col-6 col-md-3 p-0 bor'>
          <div class='p-3'>
            <p class='small fw-medium mb-2'>Investor Stakes</p>
            <p class='h4 fw-semibold mb-0'>{investorStakes}%</p>
          </div>
        </div>
        <div class='col-6 col-md-3 p-0'>
          <div class='p-3'>
            <p class='small fw-medium mb-2'>Latest Valuation</p>
            <div>
              <p class='h4 fw-semibold mb-0'>{<CurrencyFormatter
                amount={RoundData?.post_money}
                currency={RoundData?.currency}
              />}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
        <Link to='/record-round-list' className='py-2 bg_primary creditb'>
          View/edit the round dashboard
        </Link>
        <Link to='/' className='py-2 bg_primary su-creditb'>
          Confirm an investment
        </Link>
      </div>
    </div>
  )
}
