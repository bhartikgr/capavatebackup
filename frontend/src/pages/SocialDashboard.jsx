import React from 'react'
import SideBar from '../components/social/SideBar'
import TopBar from '../components/social/TopBar'
import MessagesShareholders from '../components/social/MessagesShareholders'
import EquitySnapshot from '../components/social/EquitySnapshot'
import PostSearch from '../components/social/PostSearch'
import SocialPosts from '../components/social/SocialPosts'
import InvestorReports from '../components/social/InvestorReports'
import TBDSuggestions from '../components/social/TBDSuggestions.jsx'
import RoundStatistics from '../components/social/RoundStatistics'

export default function SocialDashboard() {
  return (
    <main>
      <div className='d-flex align-items-start gap-0'>
        <SideBar />
        <div className='d-flex flex-grow-1 flex-column gap-0'>
          <TopBar />
          <section className='px-md-3 py-4'>
            <div className='container-fluid'>
              <div className='row gy-4'>
                <div className='col-md-8 order-1 order-md-0'>
                  <div className='row'>
                    <div class='col-md-12'>
                      <div className='d-flex flex-column gap-5 social_h'>
                        <EquitySnapshot />

                        <MessagesShareholders />
                        <div className='d-flex flex-column gap-4'>
                          <PostSearch />
                          <SocialPosts />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-4 order-0 order-md-1'>
                  <div className='d-flex flex-column gap-4 social-right scroll_nonw '>
                    <InvestorReports />
                    <RoundStatistics />
                    <TBDSuggestions />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
