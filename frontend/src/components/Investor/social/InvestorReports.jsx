import React, { useState, useEffect } from 'react'

import { API_BASE_URL } from '../../../config/config.js';
import axios from "axios";
export default function InvestorReports() {
  const apiURL_Investorreport = API_BASE_URL + "api/user/investorreport/";
  const storedUsername = localStorage.getItem("InvestorData");
  const userLogin = JSON.parse(storedUsername);
  const [records, setRecords] = useState('');
  const [totalPortfolioCompany, settotalPortfolioCompany] = useState(0);
  const [totalInvestorReviewed, settotalInvestorReviewed] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await axios.post(apiURL_Investorreport + "getinvestorRecorData", { id: userLogin.id, email: userLogin.email });
      console.log(res.data)
      var data = res.data.results[0];
      settotalPortfolioCompany(data.total_portfolio_company.length);
      settotalInvestorReviewed(data.investor_report_reviewed.length);
    } catch (err) {
      console.error(err);
      setRecords({});
    }
  };
  return (
    <>
      <div className='investor-reports'>
        <div className='investor-reports__header d-flex align-items-center flex-wrap gap-3'>
          <h4>Investor Reports</h4>

        </div>

        <div className='investor-reports__list'>
          <a
            className='investor-reports__item'
          >
            <span className='investor-reports__title'>Total Portfolio Companies</span>
            <span className='investor-reports__date'>{totalPortfolioCompany}</span>
          </a>
          <a
            className='investor-reports__item'
          >
            <span className='investor-reports__title'>Total Investor Reports  Reviewed</span>
            <span className='investor-reports__date'>{totalInvestorReviewed}</span>
          </a>
          <a
            className='investor-reports__item'
          >
            <span className='investor-reports__title'>Number Of Participating Rounds</span>
            <span className='investor-reports__date'>0</span>
          </a>

        </div>
      </div>
      <div className='investor-reports'>
        <div className='investor-reports__header d-flex align-items-center flex-wrap gap-3'>
          <h4>Message From Portfolio Companies</h4>

        </div>

        <div className='investor-reports__list'>
          <a
            className='investor-reports__item'
          >
            <span className='investor-reports__title'>Message Board</span>
            <span className='investor-reports__date'>0</span>
          </a>
          <a
            className='investor-reports__item'
          >
            <span className='investor-reports__title'>Message From Co-Investor Peers</span>
            <span className='investor-reports__date'>0</span>
          </a>
        </div>
      </div>
      <div className='investor-reports'>
        <div className='investor-reports__header d-flex align-items-center flex-wrap gap-3'>
          <h4>Portfolio Strategic Intent For JV and M&A</h4>

        </div>

        <div className='investor-reports__list'>
          <a
            className='investor-reports__item'
          >
            <span className='investor-reports__title'>Company XX</span>

          </a>
          <a
            className='investor-reports__item'
          >
            <span className='investor-reports__title'>Company YY</span>

          </a>
        </div>
      </div>
      <div className='investor-reports'>
        <div className='investor-reports__header d-flex align-items-center flex-wrap gap-3'>
          <h4>Portfolio Statistics And Status</h4>

        </div>

        <div className='investor-reports__list'>

        </div>
      </div>
    </>


  )
}
