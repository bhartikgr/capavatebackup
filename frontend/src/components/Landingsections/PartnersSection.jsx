import React from "react";

export default function PartnersSection() {
  return (
    <>
      <section className="d-block py-5">
        <div className="container-xl">
          <div className="d-flex flex-column gap-5 justify-content-center align-items-center">
            <h5>Some of our industry partners</h5>
            <div className="d-flex align-items-center justify-content-md-between justify-content-center gap-3 flex-wrap w-100">
              <img
                className="h-100 object-fit-contain"
                sizes="150px"
                src="/assets/images/t1.avif"
                alt="Partner1"
              />
              <img
                className="h-100 object-fit-contain"
                sizes="150px"
                src="/assets/images/t2.avif"
                alt="Partner2"
              />
              <img
                className="h-100 object-fit-contain"
                sizes="150px"
                src="/assets/images/t3.avif"
                alt="Partner3"
              />
              <img
                className="h-100 object-fit-contain"
                sizes="150px"
                src="/assets/images/t4.avif"
                alt="Partner4"
              />
              <img
                className="h-100 object-fit-contain"
                sizes="150px"
                src="/assets/images/t5.avif"
                alt="Partner5"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="d-block pricing py-5">
        <div className="container-xl">
          <div className="d-flex flex-column justify-content-center allign-items-center text-center gap-3">
            <h4>Transparent Pricing. A True Partner.</h4>
            <ul>
              <li>
                Straightforward pricing that actually makes sense. One simple
                price.
              </li>
              <li>No hidden costs. No confusing tiers.</li>
              <li>We keep it honest so you can keep it simple.</li>
            </ul>
            <div className="row gy-4 justify-content-center">
              <div className="col-md-5">
                <div className="d-flex flex-column gap-4 h-100">
                  <h5>Capavate Platform</h5>
                  <h6>$70 / month / company</h6>
                  <div className="plan d-flex flex-column mt-3 gap-4 h-100">
                    <ul className="top_list">
                      <li>
                        <p>Master your cap table.</p>
                      </li>
                      <li>
                        <p>Learn with purpose.</p>
                      </li>
                      <li>
                        <p>Raise with clarity.</p>
                      </li>
                      <li>
                        <p>Scale with conviction.</p>
                      </li>
                    </ul>

                    <ul className="listed">
                      <li>
                        <p>
                          <b>Full </b> platform access with no usage limits
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Unlimited </b>stakeholders and shareholders{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Unlimited</b> fundraising rounds{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Unlimited </b> investor CRM and reporting{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Unlimited </b> data room management
                        </p>
                      </li>
                      <li>
                        <p>Document management</p>
                      </li>
                      <li>
                        <p>
                          Upload your <b>term sheet</b> and{" "}
                          <b>subscription documents</b> for investor review{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          Real-time cap table calculations with{" "}
                          <b>dilution modelling</b>{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          ESOP and option <b>pool management</b>{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Multi-currency</b> rounds and international support
                        </p>
                      </li>
                      <li>
                        <p>
                          Access to <b>educational partner content</b>{" "}
                        </p>
                      </li>
                      <li>
                        <p>
                          Exposure to national/international funding and
                          industry support partners
                        </p>
                      </li>
                      <li>
                        <p>Multiple company management</p>
                      </li>
                      <li>
                        <p>
                          Access to international early-stage investor networks
                          and organizations
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="d-flex justify-content-center align-items-end">
                    <a href="#" className="lglobal_btn bg_red m-0">
                      Start Your Journey
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="d-flex flex-column gap-4 h-100">
                  <h5>International Entrepreneur Academy</h5>
                  <h6>$1,500 / one-time</h6>
                  <div className="plan d-flex flex-column mt-3 gap-4 h-100">
                    <div className="d-flex flex-column gap-0">
                      <h4>Module 1: Be the Investor</h4>

                      <ul className="listed">
                        <li>
                          <p>
                            3x access to LIVE Keiretsu Forum Investor Meeting
                            broadcasts (monthly)
                          </p>
                        </li>
                        <li>
                          <p>Understand investor deal structuring </p>
                        </li>
                        <li>
                          <p>Sample company applications </p>
                        </li>
                        <li>
                          <p>Self-paced video recordings of meetings</p>
                        </li>
                      </ul>
                    </div>

                    <div className="d-flex flex-column gap-0">
                      <h4>Module 2A/B: Professional Legal/Finance </h4>

                      <ul className="listed">
                        <li>
                          <p>
                            Valuation models, investment vehicles, and cap table
                            management
                          </p>
                        </li>
                        <li>
                          <p>Terms & valuations </p>
                        </li>
                        <li>
                          <p>IP protection</p>
                        </li>
                        <li>
                          <p>Pitch deck structure and positioning</p>
                        </li>
                      </ul>
                    </div>

                    <div className="d-flex flex-column gap-0">
                      <h4>Module 3: Portfolio Day</h4>
                      <h4>
                        <i style={{ fontWeight: 500 }}>
                          (TOP 20 companies per cohort)
                        </i>
                      </h4>
                      <ul className="listed">
                        <li>
                          <p>
                            Present your 3-minute pitch to active early-stage
                            investors
                          </p>
                        </li>
                        <li>
                          <p>Real-time investor feedback </p>
                        </li>
                        <li>
                          <p>Introductions to top-tier industry partners</p>
                        </li>
                        <li>
                          <p>1-on-1 connection time with investors</p>
                        </li>
                        <li>
                          <p>
                            Access to Keiretsu Forum's 60+ chapters across 30+
                            countries
                          </p>
                        </li>
                        <li>
                          <p>Priority placement in Keiretsu deal flow</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-end">
                    <a href="#" className="lglobal_btn bg_red m-0">
                      Start Your Journey
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
