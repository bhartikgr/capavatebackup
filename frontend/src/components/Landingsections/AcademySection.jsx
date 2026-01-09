import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AcademySection() {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
    fade: false,
    speed: 500,
    autoplaySpeed: 2000,
    autoplay: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 1, dots: false } }, // Tablet
      { breakpoint: 576, settings: { slidesToShow: 1, dots: false } }, // Mobile
    ],
  };
  return (
    <>
      <section className="d-block international">
        <div className="container-xl px-md-5">
          <div className="row">
            <div className="col-12 mx-auto">
              <div className="d-flex flex-column gap-2 justify-content-center align-items-center text-center">
                <h4>International Entreprenuer Academy</h4>
                <div className="row w-100">
                  <div className="col-md-7 mx-auto">
                    <p className="top_p">
                      Plug Into One of the World’s Most Active Angel Networks!{" "}
                      <br className="d-md-block d-none" />
                      Over $1 Billion Deployed Into Early-Stage Founders Since
                      2000.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row gy-5 m_84">
            <div className="col-md-4">
              <div className="inter_card">
                <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                  <div className="number_count">1</div>
                  <h5>Be The Investor</h5>
                  <p>
                    Experience live investor meetings as a virtual investor,
                    using real interest forms to evaluate actual deals and see
                    how experienced angels think. This module places you inside
                    the capital-raising room, allowing you to dissect real
                    pitches, understand what investors truly want, and refine
                    your presentation to investors.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="inter_card">
                <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                  <div className="number_count">2</div>
                  <h5>Structure the Deal</h5>
                  <p>
                    Receive live legal and financial guidance on your round
                    while refining a fundable pitch. In this module, founders
                    review investment documentation, IP strategy, valuations,
                    vehicles, and cap table decisions. Then sharpen their deck
                    so they know their audience, frame the right ask, and
                    clearly justify terms and valuations.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="inter_card">
                <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                  <div className="number_count">3</div>
                  <h5>Portfolio Day!</h5>
                  <p>
                    <a href="/">
                      {" "}
                      <i>Top 20 graduates:</i>{" "}
                    </a>
                    <br />
                    Pitch your startup to active investors at Capavate’s
                    Portfolio Day, get real-time feedback on your 3‑minute
                    pitch, and learn from live Q&As with global founders. Build
                    meaningful relationships with industry leaders and strategic
                    partners who can open doors and help accelerate your growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center pt-4">
            <a href="#" className="lglobal_btn bg_blue">
              Reserve your seat now!
            </a>
          </div>
        </div>
      </section>
      <section className="d-block test_slider">
        <div className="container-xl position-relative">
          <div className="row">
            <div className="col-md-9 mx-auto test_slider_main overflow-hidden">
              <Slider {...settings}>
                <div className="slider_main overflow-hidden">
                  <div className="d-flex flex-column gap-4 justify-content-center align-items-center text-center">
                    <h5>
                      Jason Patel, Co-founder{" "}
                      <br className="d-md-block d-none" />
                      FinTech Innovator
                    </h5>
                    <p>
                      "Before adopting this system, investor communication was
                      chaotic. Now, it’s automated, organized, and professional.
                      The startup education curriculum helped me structure my
                      first SAFE round with confidence."
                    </p>
                  </div>
                </div>
                <div className="slider_main">
                  <div className="d-flex flex-column gap-4 justify-content-center align-items-center text-center">
                    <h5>
                      Priya Singh, Co-founder{" "}
                      <br className="d-md-block d-none" />
                      EdTech Venture
                    </h5>
                    <p>
                      "Our investor reporting tools delighted our backers. The
                      lessons on cap table dynamics and investor readiness
                      helped me manage our growth round with confidence."
                    </p>
                  </div>
                </div>
                <div className="slider_main">
                  <div className="d-flex flex-column gap-4 justify-content-center align-items-center text-center">
                    <h5>
                      Elena Torres, Co-founder
                      <br className="d-md-block d-none" />
                      FoodTech Platform
                    </h5>
                    <p>
                      "What used to be a messy cap table is now a clear, living
                      source of truth. The integration with investor reports is
                      brilliant. The mentorship content gave me the strategic
                      perspective to grow into a real CEO."
                    </p>
                  </div>
                </div>
                <div className="slider_main">
                  <div className="d-flex flex-column gap-4 justify-content-center align-items-center text-center">
                    <h5>
                      Samantha Greer, CEO
                      <br className="d-md-block d-none" />
                      ClimateTech Startup
                    </h5>
                    <p>
                      "This solution helped us stay transparent and
                      investor-ready through our pre-seed round. The training
                      sessions taught me how to partner instead of just pitch.
                      That shift changed everything."
                    </p>
                  </div>
                </div>
                <div className="slider_main">
                  <div className="d-flex flex-column gap-4 justify-content-center align-items-center text-center">
                    <h5>
                      Carlos Mendes, Founder
                      <br className="d-md-block d-none" />
                      SaaS Analytics Startup
                    </h5>
                    <p>
                      "The educational program taught me how investors think,
                      and the platform gave me the confidence to execute
                      professionally. As an early founder, that combination is
                      pure leverage."
                    </p>
                  </div>
                </div>
                <div className="slider_main">
                  <div className="d-flex flex-column gap-4 justify-content-center align-items-center text-center">
                    <h5>
                      Michelle Liu, Founder
                      <br className="d-md-block d-none" />
                      HealthTech Startup
                    </h5>
                    <p>
                      "This platform completely streamlined how I manage
                      investor updates and equity. I can finally focus on
                      building instead of juggling spreadsheets. The educational
                      sessions gave me the investor knowledge I didn’t even know
                      I needed."
                    </p>
                  </div>
                </div>
                <div className="slider_main">
                  <div className="d-flex flex-column gap-4 justify-content-center align-items-center text-center">
                    <h5>
                      David Ng, Founder
                      <br className="d-md-block d-none" />
                      AI-driven SaaS
                    </h5>
                    <p>
                      "As a first-time founder, I wanted both the tools and the
                      know-how. The platform gave me structure; the educational
                      content built my investor IQ. It’s the perfect one-two
                      combo for early-stage success."
                    </p>
                  </div>
                </div>
                <div className="slider_main">
                  <div className="d-flex flex-column gap-4 justify-content-center align-items-center text-center">
                    <h5>
                      Robert Chen, Founder
                      <br className="d-md-block d-none" />
                      B2B Marketplace
                    </h5>
                    <p>
                      "What I love most is how intuitive it feels—it brings
                      clarity and credibility when talking to investors. The
                      learning modules are like having mentors on demand."
                    </p>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
