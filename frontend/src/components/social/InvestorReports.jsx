import React from 'react'

const reports = [
  { id: 1, title: 'Q1 2026 Investor Update', timestamp: 'February 15, 2026' },
  { id: 2, title: 'Annual Performance Report', timestamp: 'January 10, 2026' },
  { id: 3, title: 'Funding Round Summary', timestamp: 'December 20, 2025' }
]

export default function InvestorReports() {
  return (
    <div className='investor-reports'>
      <div className='investor-reports__header d-flex align-items-center flex-wrap gap-3'>
        <h4>Investor Reports</h4>
        <button
          className='py-2 bg_primary creditb'
          onClick={() => (window.location.href = '/investorlist')}
        >
          Create Investor Report
        </button>
      </div>

      <div className='investor-reports__list'>
        {reports.map(report => (
          <a
            key={report.id}
            href={`/report/${report.id}`}
            className='investor-reports__item'
          >
            <span className='investor-reports__title'>{report.title}</span>
            <span className='investor-reports__date'>{report.timestamp}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
