import React from 'react'
import { Link } from 'react-router-dom'

export default function EquitySnapshot() {
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
              <p class='h4 fw-semibold mb-0'>$0</p>
            </div>
          </div>
        </div>
        <div class='col-6 col-md-3 p-0 bor bottom_b'>
          <div class='p-3'>
            <p class='small fw-medium mb-2'>Option Pool</p>
            <div>
              <p class='h4 fw-semibold mb-0'>0%</p>
              <small class='text-white menu_value bg-success'>0 shares</small>
            </div>
          </div>
        </div>
        <div class='col-6 col-md-3 p-0 bor'>
          <div class='p-3'>
            <p class='small fw-medium mb-2'>Investor Stakes</p>
            <p class='h4 fw-semibold mb-0'>0%</p>
          </div>
        </div>
        <div class='col-6 col-md-3 p-0'>
          <div class='p-3'>
            <p class='small fw-medium mb-2'>Latest Valuation</p>
            <div>
              <p class='h4 fw-semibold mb-0'>$0</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
