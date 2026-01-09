import React, { useState } from "react";
import Select from "react-select";
import { API_BASE_URL } from "../../config/config";
import axios from "axios";
export default function PartnersSection() {
  const [contactPopup, setcontactPopup] = useState(false);
  const [errr, seterrr] = useState(false);
  const handlephonecall = () => {
    setcontactPopup(true);
  }
  const [dangerMessage, setdangerMessage] = useState("");
  const sectorOptions = [
    { value: "technology", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "education", label: "Education" },
    { value: "real-estate", label: "Real Estate" },
  ];
  const apiURL = API_BASE_URL + "api/user/";
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    companyName: '',
    companyWebsite: '',
    city: '',
    country: '',
    sectorFocus: [],
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSectorChange = (selectedOptions) => {
    setFormData({
      ...formData,
      sectorFocus: selectedOptions
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        apiURL + "contactform",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Changed 'data' to 'res.data'
      if (res.data.success) {
        setdangerMessage('Thank you! Your inquiry has been submitted.');
        seterrr(false); // Set error to false on success

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          companyName: '',
          companyWebsite: '',
          city: '',
          country: '',
          sectorFocus: [],
          message: ''
        });
      } else {
        seterrr(true);
        setdangerMessage(res.data.message || 'Something went wrong');
      }
      setTimeout(() => {
        setdangerMessage("");
        setcontactPopup(false);
      }, 2500);
    } catch (err) {
      // Added error handling
      console.error('Form submission error:', err);
      seterrr(true);
      setdangerMessage(err.response?.data?.message || 'Failed to submit form. Please try again.');
    }
  };
  return (
    <>
      {dangerMessage && (
        <div
          className={`flex items-center justify-between gap-3 shadow-lg ${errr ? "error_pop" : "success_pop"
            }`}
        >
          <div className="d-flex align-items-center gap-2">

            <span className="d-block">{dangerMessage}</span>
          </div>

          <button
            type="button"
            className="close_btnCros"
            onClick={() => setdangerMessage("")}
          >
            ×
          </button>
        </div>
      )}
      <section className="d-block contact">
        <div className="container-xl">
          <div className="row gy-5 contact_main border-none">

            {/* <div className="col-md-6 px-md-0">
              <div className="d-block">
                <img className="w-100 h-100 object-fit-cover" src="/assets/images/login2.jpg" alt="image" />
              </div>
            </div> */}
            <div className="col-md-12">
              <div className="contact_right h-100">
                <div className="d-flex flex-column justify-content-center h-100 gap-4 contact_prsnt">

                  <div className="text-center">
                    <h1 className="mb-4" style={{ fontSize: '2.1rem', fontWeight: '600', color: '#fff' }}>
                      Capavate Ventures
                    </h1>

                    <h2 className="mb-4" style={{ fontSize: '1.5rem', fontStyle: 'italic', fontWeight: '500', color: '#fff' }}>
                      Global Alliance of Family Offices and Venture Capital
                    </h2>

                    <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.4', color: '#fff', maxWidth: '900px', margin: '0 auto' }}>
                      Capavate Ventures partners with a curated, cross-border network of family offices and visionary venture investors to build enduring, multi-generational value across private markets worldwide.
                    </p>

                    <div className="features-list d-flex align-items-center justify-content-center flex-column" style={{ textAlign: 'left', display: 'inline-block' }}>
                      <div className="d-flex align-items-center">
                        <span className="me-2" style={{ color: '#fff', fontWeight: 'bold' }}>✓</span>
                        <span style={{ fontSize: '1rem', color: "#fff" }}>Strategic early-stage investments & partnerships</span>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <span className="me-2" style={{ color: '#fff', fontWeight: 'bold' }}>✓</span>
                        <span style={{ fontSize: '1rem', color: "#fff" }}>Global M&A origination and collaboration</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-center text-center mb-4">
                        <span className="me-2" style={{ color: '#fff', fontWeight: 'bold' }}>✓</span>
                        <span style={{ fontSize: '1rem', color: "#fff" }}>Long-term growth-focused advisory services and partnerships</span>
                      </div>
                      <div className="d-block">

                        <button type="button" onClick={handlephonecall} className="lglobal_btn bg_red">
                          Discover Our Investment Network
                        </button>
                      </div>
                    </div>


                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="d-block py-5">
        <div className="container-xl">
          <div className="d-flex flex-column gap-5 justify-content-center align-items-center">

            <div className="text-center industry-partners-section">
              <h5 className="mb-4" style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333' }}>
                Some of our industry partners
              </h5>
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
        </div>
      </section>
      {contactPopup && (
        <section className="contact_up">
          <div className="contact-popup">
            <div className="d-flex justify-content-between align-items-start">
              <div className="contact-header w-100 d-flex justify-content-between align-items-start">
                <div className="d-flex flex-column gap-1 w-100">
                  <h3>Let’s Work Together</h3>
                  <p>Tell us about your business needs</p>
                </div>
                <button className="close_btn_tp" type="button" onClick={() => setcontactPopup(false)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-xbox-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9" /><path d="M9 8l6 8" /><path d="M15 8l-6 8" /></svg></button>
              </div>

            </div>


            <form className="contact-form d-flex flex-column gap-2" onSubmit={handlesubmit}>
              <div className="form-row">
                <input
                  className="m-0"
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  className="m-0"
                  type="text"
                  name="lastName"
                  placeholder="Last Name*"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <input
                  className="m-0"
                  type="email"
                  name="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  className="m-0"
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number*"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <input
                className="m-0"
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
              />
              <input
                className="m-0"
                type="url"
                name="companyWebsite"
                placeholder="Company Website"
                value={formData.companyWebsite}
                onChange={handleInputChange}
              />

              <div className="form-row">
                <input
                  className="m-0"
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <input
                  className="m-0"
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>

              <Select
                options={sectorOptions}
                isMulti
                name="sectorFocus"
                placeholder="Sector Focus"
                classNamePrefix="react-select"
                value={formData.sectorFocus}
                onChange={handleSectorChange}
              />

              <textarea
                name="message"
                placeholder="Message (optional)"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>

              <button type="submit">Submit Inquiry</button>
            </form>
          </div>
        </section>
      )}



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
                    <a href="/user/login" target="_blank" className="lglobal_btn bg_red m-0">
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
                    <a href="/user/login" target="_blank" className="lglobal_btn bg_red m-0">
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
