import React, { useState } from "react";
import { FaClock } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { API_BASE_URL } from "../../config/config";
import axios from "axios";
export default function ContactDetails() {
  const [loading, setLoading] = useState(false);
  const [errr, seterrr] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const API_BASE_URL = "https://capavate.com/api/user/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);   // start spinner

    try {
      const res = await axios.post(
        API_BASE_URL + "capavatecontact",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Message sent successfully");
      console.log("Response:", res.data);
    } catch (err) {
      console.log("Error:", err);
    }

    setLoading(false); // stop spinner
  };

  return (
    <>
      {message && (
        <div
          className={`flex items-center justify-between gap-3 shadow-lg ${errr ? "error_pop" : "success_pop"
            }`}
        >
          <div className="d-flex align-items-start gap-2">
            <span className="d-block">{message}</span>
          </div>

          <button
            type="button"
            className="close_btnCros"
            onClick={() => setMessage("")}
          >
            ×
          </button>
        </div>
      )}
      <section className="contact-top-bar py-5 bg-light">
        <div className="container-lg">
          <div className="row g-5 text-center text-md-start">
            <div className="col-md-4">
              <div className="d-flex flex-column align-items-center text-center gap-3 locationcontent">
                <div className="icon-circle">
                  <FaClock />
                </div>
                <h5>Open Hours</h5>
                <p className="mb-0">
                  Mon-Fri: 9 AM – 6 PM
                  <br />
                  Saturday: 9 AM – 4 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex flex-column align-items-center text-center gap-3 locationcontent">
                <div className="icon-circle">
                  <FaMapMarkedAlt />
                </div>
                <h5>Address</h5>
                <p className="mb-0">
                  176 Street name, New York,
                  <br />
                  NY 10014
                  <br />
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex flex-column align-items-center text-center gap-3 locationcontent">
                <div className="icon-circle">
                  <FaHeadset />
                </div>
                <h5>Get In Touch</h5>
                <p className="mb-0">
                  Telephone: +1(800)123-4566
                  <br />
                  Email: info@yoursite.com
                  <br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-hero position-relative ofit">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80"
          alt="Happy team"
          className="w-100 h-100 object-fit-cover"
        />
        <div className="overlay-content">
          <p className="">BUSINESS SERVICES</p>
          <h1 className="">Your results are our top priority!</h1>
          <div className="d-block pbtn mt-4">
            <Link to="/user/register">
              {" "}
              <span>Get Started</span>
              <BsArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Map + Contact Form (2 Columns) */}
      <section className="contact-bottom py-5">
        <div className="container-lg">
          <div className="row g-5">
            {/* Google Map */}
            <div className="col-md-6">
              <div className="map-wrapper d-block">
                <iframe
                  title="Our Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184313806!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a2345f9c1b1%3A0x9f5e8f8b8f8b8f8b!2s176%20Spring%20St%2C%20New%20York%2C%20NY%2010012%2C%20USA!5e0!3m2!1sen!2sin!4v1732470000000"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-6">
              <div className="d-flex flex-column gap-4 cfome">
                <h2 className="">Have questions? Get in touch!</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-sm-6">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-sm-6">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Message"
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="submitbtn" disabled={loading}>
                          {loading ? (
                            <div className="spinner-border spinner-border-sm" role="status"></div>
                          ) : (
                            "Get In Touch"
                          )}
                        </button>

                      </div>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
