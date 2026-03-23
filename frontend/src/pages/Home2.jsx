import React, { useState, useEffect } from "react";
import "../newstyle.css";
import NewHeader from "../components/NewHeader";
import NewFooter from "../components/NewFooter";
import Academypopup from "../components/Users/Acknowledgement/Academypopup";
export default function Home2() {
  const [activeTab, setActiveTab] = useState("founders");
  const [PopupShow, setPopupShow] = useState(false);

  // Handle hash navigation from other pages
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const hash = window.location.hash.substring(1); // Remove the # symbol

      // Wait a bit for the DOM to fully render
      setTimeout(() => {
        scrollToSection(hash);
      }, 500);
    }
  }, []);

  // Function to scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Adjust for fixed header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        setTimeout(() => {
          scrollToSection(hash);
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const handleAcademyPopup = () => {
    setPopupShow(true)
  }
  const handleClosePopup = () => {
    setPopupShow(false);
  };
  return (
    <>
      <NewHeader />
      <section className="hero" id="platform">
        <div className="hero-bg">
          <div className="hero-bg-grid"></div>
          <div className="hero-glow-1"></div>
          <div className="hero-glow-2"></div>
          <div className="hero-glow-3"></div>
        </div>

        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Now Open · Limited Access
            </div>

            <h1 className="hero-title">
              The Network
              <br />
              Your <em>Cap Table</em>
              <br />
              Builds
            </h1>

            <p className="hero-subtitle">
              Most networks start with contacts. Ours starts with ownership.
              Capavate is where EVERY connection has equity. EVERY profile is a
              partner, a shareholder, a verified angel.{" "}
              <b>No noise. No cold intros.</b> Just #capital, #credibility, and
              #collaboration. Welcome to the world’s first Equity Social Network
              — where cap table management meets angel syndicates, M&A
              intelligence, and investor education.
            </p>

            <div className="hero-cta-row">
              <a
                href="http://localhost:5000/user/register"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-large"
              >
                Start for Free →
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="d-block d-lg-none resimg">
              <img src="/assets/screen1.png" alt="screen" />
            </div>
            <div className="hero-phone-frame  d-none d-lg-block">
              <div className="hero-screen">
                <div className="dashboard-topbar">
                  <div className="dashboard-tabs">
                    <div className="dashboard-tab active">Feed</div>
                    <div className="dashboard-tab">Cap Table</div>
                    <div className="dashboard-tab">Active Round</div>
                    <div className="dashboard-tab">M&A intelligence</div>
                    <div className="dashboard-tab">Investor CRM</div>
                  </div>
                </div>
                <div className="dashboard-body">
                  <div className="dashboard-feed-item">
                    <div className="dashboard-avatar avatar-a">MI</div>
                    <div className="dashboard-post-content">
                      <div className="dashboard-post-name">
                        Mark L.{" "}
                        <span className="dashboard-post-badge badge-angel">
                          Angel Network
                        </span>
                      </div>
                      <div className="dashboard-post-text">
                        Looking to connect with founders in the clean-tech space
                        expanding into Southeast Asia. Our fund is actively
                        deploying $50k–$250k checks.
                      </div>
                      <div className="dashboard-post-actions">
                        <span className="dash-action">♥ 14</span>
                        <span className="dash-action">↗ 6</span>
                        <span className="dash-action">💬 3</span>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-feed-item">
                    <div className="dashboard-avatar avatar-b">BL</div>
                    <div className="dashboard-post-content">
                      <div className="dashboard-post-name">
                        Blueprint AI{" "}
                        <span className="dashboard-post-badge badge-founder">
                          Active Round
                        </span>
                      </div>
                      <div className="dashboard-post-text">
                        We've hit 2× ARR growth in Q1. Sharing our investor
                        update with all shareholders. Data room has been
                        refreshed.
                      </div>
                      <div className="dashboard-post-actions">
                        <span className="dash-action">♥ 28</span>
                        <span className="dash-action">📊 View</span>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-feed-item">
                    <div className="dashboard-avatar avatar-c">MK</div>
                    <div className="dashboard-post-content">
                      <div className="dashboard-post-name">
                        Mei K.{" "}
                        <span className="dashboard-post-badge badge-angel">
                          Cap Table Investor
                        </span>
                      </div>
                      <div className="dashboard-post-text">
                        Interested in exploring a JV in the Hong Kong market.
                        Open to co-investment with other Capavate members. DM if
                        aligned.
                      </div>
                      <div className="dashboard-post-actions">
                        <span className="dash-action">♥ 9</span>
                        <span className="dash-action">↗ Connect</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="feed-network-bar">
                  <span className="feed-live-dot"></span>
                  <span className="feed-network-text">
                    Visible to{" "}
                    <strong>your cap table + Capavate Angel Network</strong>{" "}
                    only
                  </span>
                </div>
              </div>
            </div>

            <div className="floating-card floating-card-1">
              <div className="floating-card-label">Global Members</div>
              <div className="floating-globe">
                <span className="globe-dot dot-ca"></span>
                <span className="globe-label">CA</span>
                <span className="globe-dot dot-hk"></span>
                <span className="globe-label">HK</span>
                <span className="globe-dot dot-us"></span>
                <span className="globe-label">US</span>
                <span className="globe-dot dot-uk"></span>
                <span className="globe-label">UK</span>
              </div>
              <div
                className="floating-card-sub"
                style={{ marginTop: "var(--space-2)" }}
              >
                +26 other countries
              </div>
            </div>

            <div className="floating-card floating-card-2">
              <div className="floating-card-label">New Shareholder Message</div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#e87b6e",
                  fontFamily: "var(--font-body)",
                  marginBottom: "2px",
                }}
              >
                🔴 JV Opportunity
              </div>
              <div className="floating-card-sub">
                2 companies aligned on
                <br />
                Southeast Asia expansion
              </div>
              <div
                className="floating-card-green"
                style={{ marginTop: "var(--space-2)" }}
              >
                ↑ View Match
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-marquee-track">
          <div className="trust-marquee-set">
            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Verified Investors</div>
                <div className="trust-item-sub">Every contact credentialed</div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Angel Syndicates</div>
                <div className="trust-item-sub">A true global network</div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Accredited Investors Only</div>
                <div className="trust-item-sub">
                  Closed network, invitation-gated
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Real Equity Connections</div>
                <div className="trust-item-sub">
                  No strangers, only shareholders
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">M&amp;A Intelligence</div>
                <div className="trust-item-sub">Drive toward liquidation</div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Cap Table Community</div>
                <div className="trust-item-sub">
                  Your shareholders, connected
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                  <path d="M7 8h4M7 12h2" />
                  <path d="M15 8l2 2-2 2" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Entrepreneur Academy</div>
                <div className="trust-item-sub">
                  Raise as an investor thinks
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Cross-Borders Scaling</div>
                <div className="trust-item-sub">
                  Identify truly global partnerships
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Manage Your Raise</div>
                <div className="trust-item-sub">
                  Active rounds, visible to members
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Investor CRM</div>
                <div className="trust-item-sub">Your investors. Verified.</div>
              </div>
            </div>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-marquee-set" aria-hidden="true">
            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Verified Investors</div>
                <div className="trust-item-sub">Every contact credentialed</div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Angel Syndicates</div>
                <div className="trust-item-sub">A true global network</div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Accredited Investors Only</div>
                <div className="trust-item-sub">
                  Closed network, invitation-gated
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Real Equity Connections</div>
                <div className="trust-item-sub">
                  No strangers, only shareholders
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">M&amp;A Intelligence</div>
                <div className="trust-item-sub">Drive toward liquidation</div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Cap Table Community</div>
                <div className="trust-item-sub">
                  Your shareholders, connected
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                  <path d="M7 8h4M7 12h2" />
                  <path d="M15 8l2 2-2 2" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Entrepreneur Academy</div>
                <div className="trust-item-sub">
                  Raise as an investor thinks
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Cross-Borders Scaling</div>
                <div className="trust-item-sub">
                  Identify truly global partnerships
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Manage Your Raise</div>
                <div className="trust-item-sub">
                  Active rounds, visible to members
                </div>
              </div>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <div className="trust-item-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div>
                <div className="trust-item-text">Investor CRM</div>
                <div className="trust-item-sub">Your investors. Verified.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="moat-section">
        <div className="container">
          <div className="moat-header fade-in">
            <div className="section-label">Your Primary Competitive Moat</div>
            <h2 className="section-title">
              One platform. <em>Four unfair advantages.</em>
            </h2>
            <p
              className="section-body"
              style={{ marginInline: "auto", textAlign: "center" }}
            >
              Your cap table is already your most powerful network — every
              shareholder has a direct stake in your success. Capavate turns
              that alignment into action: founders get a community of investors
              who are genuinely incentivised to open doors, make introductions,
              and drive growth. Shareholders get live visibility into the
              company they own — and a seat at the table when M&A and scale
              opportunities emerge. One platform, built from the ground up to
              make equity mean more than a certificate.
            </p>
          </div>

          <div className="moat-grid">
            <div className="moat-card fade-in stagger-1">
              <div className="moat-card-icon icon-red">📊</div>
              <h3 className="moat-card-title">Cap Table Infrastructure</h3>
              <p className="moat-card-body">
                Professional-grade cap table management, dilution modelling,
                ESOP tracking, multiple investment vehicles, multi-currency
                rounds, investor CRM, and a full investor data room —
                Growth-ready pricing with zero operational complexity.
              </p>
            </div>

            <div className="moat-card fade-in stagger-2">
              <div className="moat-card-icon icon-gold">🤝</div>
              <h3 className="moat-card-title">The Equity Social Network</h3>
              <p className="moat-card-body">
                A closed feed where every post reaches your actual shareholders,
                co-investors, and angel network members. Every connection is
                backed by a real equity relationships. This is not the
                professional social network you are used to. This is your
                boardroom, online.
              </p>
            </div>

            <div className="moat-card fade-in stagger-3">
              <div className="moat-card-icon icon-blue">🌐</div>
              <h3 className="moat-card-title">Global Angel Network</h3>
              <p className="moat-card-body">
                Tap into the Capavate Angel Network — a verified coalition of
                active angel investors, family offices, and emerging fund
                managers worldwide. Investment track record verified,
                intention-disclosed, and ready to deploy capital.
              </p>
            </div>

            <div className="moat-card fade-in stagger-1">
              <div className="moat-card-icon icon-green">🎓</div>
              <h3 className="moat-card-title">Angel Academy Education</h3>
              <p className="moat-card-body">
                Live access to real investor meetings, professional legal and
                financial modules, and a direct path to Portfolio Day — where
                the top 20 graduates pitch to a global audience of active angel,
                early-stage, and scale-focused investors.
              </p>
            </div>

            <div className="moat-card fade-in stagger-2">
              <div className="moat-card-icon icon-purple">🔀</div>
              <h3 className="moat-card-title">M&A Intelligence Layer</h3>
              <p className="moat-card-body">
                Every company on Capavate discloses its strategic intent — JV
                readiness, acquisition appetite, exit horizons, and preferred
                partner types. This creates a proprietary matchmaking database
                no other platform possesses. Identify and drive exits and
                transactions.
              </p>
            </div>

            <div className="moat-card fade-in stagger-3">
              <div className="moat-card-icon icon-navy">🔐</div>
              <h3 className="moat-card-title">Trust by Design</h3>
              <p className="moat-card-body">
                Accredited investor verification, investment track records,
                investor CRM, signatory agreements, and screen-name privacy for
                investors who prefer anonymity. The rules of engagement are
                built in — no spam, no solicitation, no cold pitches.
              </p>
            </div>
          </div>

          <div className="moat-compare fade-in">
            <div className="moat-compare-bg"></div>
            <div className="moat-compare-inner">
              <div className="compare-col">
                <div className="compare-col-title">The Alternatives</div>
                <div className="compare-item negative">
                  <span className="compare-check check-no">✕</span> Cap table
                  management only
                </div>
                <div className="compare-item negative">
                  <span className="compare-check check-no">✕</span> No investor
                  community
                </div>
                <div className="compare-item negative">
                  <span className="compare-check check-no">✕</span> No education
                  layer
                </div>
                <div className="compare-item negative">
                  <span className="compare-check check-no">✕</span> No M&A/JV
                  matching
                </div>
                <div className="compare-item negative">
                  <span className="compare-check check-no">✕</span> US-centric
                  or EU-only
                </div>
                <div className="compare-item negative">
                  <span className="compare-check check-no">✕</span> Complex,
                  expensive, or cold
                </div>
              </div>

              <div className="compare-vs">
                <div className="compare-vs-badge">vs</div>
              </div>

              <div className="compare-col">
                <div className="compare-col-title">Capavate</div>
                <div className="compare-item positive">
                  <span className="compare-check check-yes">✓</span>{" "}
                  Professional cap table platform
                </div>
                <div className="compare-item positive">
                  <span className="compare-check check-yes">✓</span> Exclusive
                  equity social network
                </div>
                <div className="compare-item positive">
                  <span className="compare-check check-yes">✓</span> Built-in
                  angel academy
                </div>
                <div className="compare-item positive">
                  <span className="compare-check check-yes">✓</span> Proprietary
                  M&A intelligence
                </div>
                <div className="compare-item positive">
                  <span className="compare-check check-yes">✓</span> Truly
                  global ecosystem
                </div>
                <div className="compare-item positive">
                  <span className="compare-check check-yes">✓</span>{" "}
                  Founder-first, $70/mo flat
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-section" id="community">
        <div className="social-section-bg"></div>
        <div className="container">
          <div className="social-inner">
            <div className="social-visual fade-in">
              <div className="social-feed-mockup">
                <div className="feed-topbar">
                  <div className="feed-title">Shareholder Feed</div>
                  <div className="feed-live-badge">
                    <span className="feed-live-dot"></span> Live
                  </div>
                </div>
                <div className="feed-body">
                  <div className="feed-post">
                    <div className="feed-post-header">
                      <div className="feed-avatar avatar-d">SR</div>
                      <div className="feed-post-meta">
                        <div className="feed-post-name">
                          Sofia R.
                          <span className="dashboard-post-badge badge-angel">
                            Angel Network
                          </span>
                          <span className="dashboard-post-badge badge-shareholder">
                            Shareholder
                          </span>
                        </div>
                        <div className="feed-post-role">
                          Family Office · Toronto, Canada · 3h ago
                        </div>
                      </div>
                    </div>
                    <p className="feed-post-text">
                      Very impressed with the Q1 update from Novalyte
                      Biosciences. Transparent reporting like this is exactly
                      what differentiates portfolio companies worth holding
                      long-term. Other founders take note — your shareholders
                      want this.
                    </p>
                    <div className="feed-post-footer">
                      <span className="feed-action">♥ 31</span>
                      <span className="feed-action">↗ Share</span>
                      <span className="feed-action">💬 Reply</span>
                    </div>
                  </div>

                  <div className="feed-post">
                    <div className="feed-post-header">
                      <div className="feed-avatar avatar-b">TW</div>
                      <div className="feed-post-meta">
                        <div className="feed-post-name">
                          TechWave Inc.
                          <span className="dashboard-post-badge badge-founder">
                            Active Round · Seed
                          </span>
                        </div>
                        <div className="feed-post-role">
                          SaaS · Hong Kong · 6h ago
                        </div>
                      </div>
                    </div>
                    <p className="feed-post-text">
                      We've opened our data room to Capavate Angel Network
                      members. Series A target: CAD $2.5M. If you're an active
                      member and interested, request access through the
                      platform.
                    </p>
                    <div className="feed-post-footer">
                      <span className="feed-action">♥ 18</span>
                      <span className="feed-action">📊 Data Room</span>
                      <span className="feed-action">💬 4</span>
                    </div>
                  </div>

                  <div className="feed-post">
                    <div className="feed-post-header">
                      <div className="feed-avatar avatar-c">JL</div>
                      <div className="feed-post-meta">
                        <div className="feed-post-name">
                          James L.
                          <span className="dashboard-post-badge badge-angel">
                            Angel Network
                          </span>
                        </div>
                        <div className="feed-post-role">
                          VC Partner · Shanghai, China · 1d ago
                        </div>
                      </div>
                    </div>
                    <p className="feed-post-text">
                      Seeking co-investors for a cross-border manufacturing JV
                      between Canada and Shenzhen. All parties would be on a
                      shared Capavate cap table. Serious inquiries only.
                    </p>
                    <div className="feed-post-footer">
                      <span className="feed-action">♥ 44</span>
                      <span className="feed-action">↗ Connect</span>
                      <span className="feed-action">💬 12</span>
                    </div>
                  </div>
                </div>
                <div className="feed-network-bar">
                  <span className="feed-live-dot"></span>
                  <span className="feed-network-text">
                    Posts visible to{" "}
                    <strong>
                      verified shareholders &amp; angel members only
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="fade-in">
              <div className="section-label">The Equity Social Network</div>
              <h2 className="section-title">
                Every connection here is <em>already warm.</em>
              </h2>
              <p
                className="section-body"
                style={{ marginBottom: "var(--space-8)" }}
              >
                On other professional social networks, you're shouting into a
                void. On Capavate, every person in your feed already has skin in
                the game. They're on your cap table, they co-invested alongside
                you, or they're a verified member of the Capavate Angel Network.
                The signal-to-noise ratio is unlike anything else.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-5)",
                  marginBottom: "var(--space-8)",
                }}
              >
                {/* First Item */}
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-4)",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "var(--radius-lg)",
                      background: "rgba(192,57,43,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: "0",
                      fontSize: "1.1rem",
                    }}
                  >
                    📣
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "var(--text-base)",
                        fontWeight: "600",
                        color: "var(--color-text)",
                        marginBottom: "var(--space-1)",
                      }}
                    >
                      Post to your real audience
                    </div>
                    <div
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-muted)",
                        lineHeight: "1.6",
                      }}
                    >
                      Choose who sees each post — your specific cap table, all
                      portfolio members, the angel network, or the full
                      community. Every post hits people who care.
                    </div>
                  </div>
                </div>

                {/* Second Item */}
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-4)",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "var(--radius-lg)",
                      background: "rgba(212,168,67,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: "0",
                      fontSize: "1.1rem",
                    }}
                  >
                    🔐
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "var(--text-base)",
                        fontWeight: "600",
                        color: "var(--color-text)",
                        marginBottom: "var(--space-1)",
                      }}
                    >
                      Privacy built in
                    </div>
                    <div
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-muted)",
                        lineHeight: "1.6",
                      }}
                    >
                      Investors can post under a screen name. Your portfolio
                      holdings stay private. The rules of engagement are
                      enforced — no spam, no cold DMs, no securities pitches.
                    </div>
                  </div>
                </div>

                {/* Third Item */}
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-4)",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "var(--radius-lg)",
                      background: "rgba(74,155,190,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: "0",
                      fontSize: "1.1rem",
                    }}
                  >
                    🤝
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "var(--text-base)",
                        fontWeight: "600",
                        color: "var(--color-text)",
                        marginBottom: "var(--space-1)",
                      }}
                    >
                      Deals happen organically
                    </div>
                    <div
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--color-text-muted)",
                        lineHeight: "1.6",
                      }}
                    >
                      When JV interest meets available capital in a verified
                      community, introductions happen at the speed of trust —
                      not cold email.
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="http://localhost:5000/user/register"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Request Access →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="audience-section" id="for-founders">
        <div className="container">
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(var(--space-10),5vw,var(--space-16))",
            }}
            className="fade-in"
          >
            <div className="section-label">
              Built for Both Sides of the Table
            </div>
            <h2 className="section-title">
              Are you a <em>founder</em> or an <em>investor?</em>
            </h2>
            <p
              className="section-body"
              style={{
                marginInline: "auto",
                textAlign: "center",
                marginBottom: "var(--space-8)",
              }}
            >
              Capavate serves both — and when both sides are on the same
              platform, the magic happens.
            </p>
          </div>

          <div className="audience-tabs fade-in">
            <button
              className={`audience-tab-btn ${activeTab === "founders" ? "active" : ""}`}
              onClick={() => setActiveTab("founders")}
              data-tab="founders"
            >
              For Founders
            </button>
            <button
              className={`audience-tab-btn ${activeTab === "investors" ? "active" : ""}`}
              onClick={() => setActiveTab("investors")}
              id="for-investors"
            >
              For Investors
            </button>
          </div>
          {activeTab === "founders" && (
            <div className="audience-pane active" id="pane-founders">
              <div>
                <div className="section-label">Founders</div>
                <h3
                  className="section-title"
                  style={{ fontSize: "var(--text-xl)" }}
                >
                  Your cap table is your <em>story.</em> Tell it right.
                </h3>
                <p
                  className="section-body"
                  style={{ marginBottom: "var(--space-8)" }}
                >
                  Most founders underestimate how much hidden value sits in
                  their cap table. Managing equity in spreadsheets leads to
                  dilution errors, investor confusion, and missed opportunities.
                  Capavate gives you professional-grade infrastructure from
                  Day 0—so you stay in control, impress investors, and unlock
                  the real value of your equity.
                </p>

                <ul className="audience-feature-list">
                  <li className="audience-feature">
                    <div className="audience-feature-icon">📋</div>
                    <div>
                      <div className="audience-feature-title">
                        Cap Table from Day 0
                      </div>
                      <div className="audience-feature-desc">
                        Set up your founding round, track all share classes,
                        issue SAFEs and convertible notes, and model dilution
                        across every future round — with unlimited stakeholders.
                      </div>
                    </div>
                  </li>
                  <li className="audience-feature">
                    <div className="audience-feature-icon">🗄️</div>
                    <div>
                      <div className="audience-feature-title">
                        Data Room + Investor CRM
                      </div>
                      <div className="audience-feature-desc">
                        Give each investor a secure portal. Track who has viewed
                        what, send updates, and manage communications — all
                        linked to your live cap table.
                      </div>
                    </div>
                  </li>
                  <li className="audience-feature">
                    <div className="audience-feature-icon">🌐</div>
                    <div>
                      <div className="audience-feature-title">
                        Present to the Angel Network
                      </div>
                      <div className="audience-feature-desc">
                        Apply to present your company to Capavate's global angel
                        network. Once accepted, your company gets exposure to
                        verified, active investors across multiple ecosystems.
                      </div>
                    </div>
                  </li>
                  <li className="audience-feature">
                    <div className="audience-feature-icon">🔀</div>
                    <div>
                      <div className="audience-feature-title">
                        JV & M&A Readiness
                      </div>
                      <div className="audience-feature-desc">
                        Complete the Strategic Intent questionnaire and become
                        discoverable to acquirers, JV partners, strategic
                        investors, and YOUR shareholders — in a structured,
                        private format.
                      </div>
                    </div>
                  </li>
                </ul>

                <a
                  href="http://localhost:5000/user/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Launch Your Company →
                </a>
              </div>

              <div className="audience-visual">
                <div className="audience-visual-bg"></div>
                <div className="audience-visual-inner">
                  <div className="av-label">Company Dashboard · Live View</div>
                  <div className="av-heading">
                    Founding Partners
                    <br />
                    Allocation
                  </div>

                  <div className="av-item">
                    <div
                      className="av-item-dot"
                      style={{ background: "#e87b6e" }}
                    ></div>
                    <div className="av-item-text">
                      Founder 1 — Common, Voting
                    </div>
                    <div className="av-item-count">48.9%</div>
                  </div>
                  <div className="av-item">
                    <div
                      className="av-item-dot"
                      style={{ background: "#7ac5e0" }}
                    ></div>
                    <div className="av-item-text">
                      Founder 2 — Preferred, Voting
                    </div>
                    <div className="av-item-count">32.6%</div>
                  </div>
                  <div className="av-item">
                    <div
                      className="av-item-dot"
                      style={{ background: "#6daa45" }}
                    ></div>
                    <div className="av-item-text">
                      Founder 3 — Common, Voting
                    </div>
                    <div className="av-item-count">18.5%</div>
                  </div>

                  <div className="av-divider"></div>

                  <div
                    className="av-item"
                    style={{
                      background: "rgba(192,57,43,0.12)",
                      borderColor: "rgba(192,57,43,0.2)",
                    }}
                  >
                    <div
                      className="av-item-dot"
                      style={{ background: "#c0392b" }}
                    ></div>
                    <div className="av-item-text" style={{ color: "#e87b6e" }}>
                      Seed Round — Open
                    </div>
                    <div className="av-item-count" style={{ color: "#e87b6e" }}>
                      + ESOP Pool
                    </div>
                  </div>

                  <div className="av-divider"></div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "var(--space-3) 0",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "var(--font-body)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Total Investors
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-xl)",
                          color: "#fff",
                          lineHeight: "1.2",
                        }}
                      >
                        12
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "var(--font-body)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Raised
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-xl)",
                          color: "#fff",
                          lineHeight: "1.2",
                        }}
                      >
                        $850K
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "var(--font-body)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Valuation
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-xl)",
                          color: "var(--capavate-gold)",
                          lineHeight: "1.2",
                        }}
                      >
                        $4.2M
                      </div>
                    </div>
                  </div>

                  <div className="av-privacy-note">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Your full cap table is encrypted and access-controlled
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "investors" && (
            <div className="audience-pane active" id="pane-investors">
              <div>
                <div className="section-label">Investors</div>
                <h3
                  className="section-title"
                  style={{ fontSize: "var(--text-xl)" }}
                >
                  Your portfolio, <em>your community.</em>
                </h3>
                <p
                  className="section-body"
                  style={{ marginBottom: "var(--space-8)" }}
                >
                  Most investors lose visibility once the cheque
                  clears—scattered updates, limited access, and no way to
                  connect meaningfully with other shareholders. Capavate gives
                  you a direct line to your portfolio companies and fellow
                  investors—so you can share insights, collaborate, and unlock
                  the collective power of your investment network. Take the lead
                  in driving exits.
                </p>

                <ul className="audience-feature-list">
                  <li className="audience-feature">
                    <div className="audience-feature-icon">📈</div>
                    <div>
                      <div className="audience-feature-title">
                        Live Portfolio Dashboard
                      </div>
                      <div className="audience-feature-desc">
                        See all your equity positions across every company
                        you've invested in. Review investor reports, track round
                        stats, and follow company updates in real time.
                      </div>
                    </div>
                  </li>
                  <li className="audience-feature">
                    <div className="audience-feature-icon">🛡️</div>
                    <div>
                      <div className="audience-feature-title">
                        Screen Name Privacy
                      </div>
                      <div className="audience-feature-desc">
                        Engage in the community under a screen name. Your
                        portfolio holdings are never visible to other investors
                        — only to the companies whose cap table you're on.
                      </div>
                    </div>
                  </li>
                  <li className="audience-feature">
                    <div className="audience-feature-icon">💼</div>
                    <div>
                      <div className="audience-feature-title">
                        M&A & Exit Intelligence
                      </div>
                      <div className="audience-feature-desc">
                        See which companies in your portfolio — or across the
                        network — are open to JVs, structured exits, secondary
                        sales, or strategic acquisitions. Act before the market
                        knows.
                      </div>
                    </div>
                  </li>
                  <li className="audience-feature">
                    <div className="audience-feature-icon">🤝</div>
                    <div>
                      <div className="audience-feature-title">
                        Co-Investor Community
                      </div>
                      <div className="audience-feature-desc">
                        Connect with co-investors in your portfolio companies.
                        Share deal flow, co-invest on new rounds, and engage
                        with the global Capavate Angel Network.
                      </div>
                    </div>
                  </li>
                </ul>

                <a
                  href="http://localhost:5000/user/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Join as an Investor →
                </a>
              </div>

              <div className="audience-visual">
                <div className="audience-visual-bg"></div>
                <div className="audience-visual-inner">
                  <div className="av-label">
                    Investor Dashboard · Portfolio View
                  </div>
                  <div className="av-heading">
                    My Portfolio
                    <br />
                    Companies
                  </div>

                  <div className="av-item">
                    <div
                      className="av-item-dot"
                      style={{ background: "#e87b6e" }}
                    ></div>
                    <div className="av-item-text">Novalyte Biosciences</div>
                    <div className="av-item-count" style={{ color: "#6daa45" }}>
                      ↑ 2.1×
                    </div>
                  </div>
                  <div className="av-item">
                    <div
                      className="av-item-dot"
                      style={{ background: "#7ac5e0" }}
                    ></div>
                    <div className="av-item-text">TechWave SaaS</div>
                    <div className="av-item-count" style={{ color: "#6daa45" }}>
                      ↑ Active Seed
                    </div>
                  </div>
                  <div className="av-item">
                    <div
                      className="av-item-dot"
                      style={{ background: "var(--capavate-gold)" }}
                    ></div>
                    <div className="av-item-text">Blueprint AI</div>
                    <div
                      className="av-item-count"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      Series A Prep
                    </div>
                  </div>

                  <div className="av-divider"></div>

                  <div
                    className="av-item"
                    style={{
                      background: "rgba(212,168,67,0.1)",
                      borderColor: "rgba(212,168,67,0.2)",
                    }}
                  >
                    <div
                      className="av-item-dot"
                      style={{ background: "var(--capavate-gold)" }}
                    ></div>
                    <div
                      className="av-item-text"
                      style={{ color: "var(--capavate-gold)" }}
                    >
                      Novalyte Biosciences — JV Opportunity
                    </div>
                    <div
                      className="av-item-count"
                      style={{ color: "var(--capavate-gold)" }}
                    >
                      New
                    </div>
                  </div>

                  <div className="av-divider"></div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "var(--space-3)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "var(--font-body)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Companies
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-xl)",
                          color: "#fff",
                          lineHeight: "1.2",
                        }}
                      >
                        3
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "var(--font-body)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Deployed
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-xl)",
                          color: "#fff",
                          lineHeight: 1.2,
                        }}
                      >
                        $175K
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "var(--font-body)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Est. Value
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-xl)",
                          color: "var(--capavate-gold)",
                          lineHeight: "1.2",
                        }}
                      >
                        $310K
                      </div>
                    </div>
                  </div>

                  <div className="av-privacy-note">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Holdings are never visible to other investors in the network
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="angel-section" id="angel-network">
        <div className="angel-bg"></div>
        <div className="angel-bg-grid"></div>

        <div className="container angel-inner">
          <div className="angel-header fade-in">
            <div className="section-label">
              Capavate Ventures + Capavate Angel Network
              <br />
              International Entrepreneur Academy
            </div>
            <h2 className="section-title">
              A global room
              <br />
              of <em>active capital.</em>
            </h2>
            <p className="section-body">
              Capavate Angel Network is not a directory. It is a curated
              coalition of verified angels, family offices, and emerging fund
              managers — united by a single mission: backing exceptional
              founders at the earliest stages, across every market.
            </p>
          </div>

          <div className="angel-grid">
            <div className="angel-card fade-in stagger-1">
              <div className="angel-card-number">01</div>
              <h3 className="angel-card-title">Verified Global Network</h3>
              <p className="angel-card-body">
                Every member is accredited and verified by their respective
                presence on a cap table. You'll find angel syndicates from
                Toronto, family offices from Hong Kong, fund managers from
                London, and independent investors from across the world — all
                under one roof.
              </p>
            </div>
            <div className="angel-card fade-in stagger-2">
              <div className="angel-card-number">02</div>
              <h3 className="angel-card-title">Apply to Present</h3>
              <p className="angel-card-body">
                Companies can apply directly through Capavate to present to a
                global Angel Network syncicate. Selected founders go through a
                screening call, then present live to hundreds of active
                investors across our global chapter network. Your cap table is
                your identity, verification, and credibility.
              </p>
            </div>
            <div className="angel-card fade-in stagger-3">
              <div className="angel-card-number">03</div>
              <h3 className="angel-card-title">Intention-Disclosed Capital</h3>
              <p className="angel-card-body">
                Every investor in the network declares their typical cheque
                size, geography focus, preferred stage, and investment interests
                — from full exit support to JV partnerships. No guessing. Just
                aligned conversations. Real shareholders identify and drive
                partnerships and exits.
              </p>
            </div>
          </div>

          <div className="angel-academy fade-in">
            <div>
              <div
                className="section-label"
                style={{ color: "var(--capavate-gold)" }}
              >
                International Entrepreneur Academy
              </div>
              <h3 className="angel-academy-title">
                Learn to raise like
                <br />
                <em>an investor would.</em>
              </h3>
              <p className="angel-academy-body">
                Built from the experience of 3,000+ investors who've evaluated
                over 1,000 startups since 2000. The Capavate Academy puts you
                inside the room — live investor meetings, professional legal and
                finance modules, and a direct path to pitching on Portfolio Day.
              </p>

              <div className="angel-academy-modules">
                <div className="module-pill">
                  <div className="module-pill-num">1</div>
                  <span>
                    Be the Investor — 3× Live Keiretsu Forum Investor Meetings
                  </span>
                </div>
                <div className="module-pill">
                  <div className="module-pill-num">2</div>
                  <span>
                    Professional Legal &amp; Finance — Valuation, SAFEs, IP
                    Protection
                  </span>
                </div>
                <div className="module-pill">
                  <div className="module-pill-num">3</div>
                  <span>
                    Portfolio Day — Top 20 graduates pitch to a live investor
                    room
                  </span>
                </div>
              </div>
            </div>

            <div className="angel-cta-block">
              <div className="angel-price">
                <div className="angel-price-amount">$1,500</div>
                <div className="angel-price-label">One-time · Full access</div>
              </div>
              <a
                href="javascript:void(0)" onClick={handleAcademyPopup}
                rel="noopener noreferrer"
                className="btn btn-gold btn-large"
              >
                Reserve Your Seat →
              </a>
              <div
                style={{
                  fontSize: "var(--text-xs)",
                  color: "rgba(255,255,255,0.3)",
                  textAlign: "right",
                }}
              >
                Limited cohort size · Application required
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ma-section">
        <div className="container">
          <div className="ma-inner">
            <div className="fade-in">
              <div className="section-label">M&A &amp; JV Intelligence</div>
              <h2 className="section-title">
                The only platform that knows <em>who wants to do a deal.</em>
              </h2>
              <p
                className="section-body"
                style={{ marginBottom: "var(--space-8)" }}
              >
                Every company on Capavate completes a structured Strategic
                Intent declaration — their top priorities, JV openness,
                acquisition appetite, partner type preferences, and governance
                readiness. This creates a proprietary matchmaking layer no other
                platform has.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-5)",
                  marginBottom: "var(--space-8)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-3)",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#7ac5e0",
                      flexShrink: "0",
                    }}
                  ></span>
                  <span
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Joint Ventures &amp; Strategic Partnerships
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "var(--space-3)",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#e87b6e",
                      flexShrink: "0",
                    }}
                  ></span>
                  <span
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Full Exit &amp; Acquisition Readiness
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      gap: "var(--space-3)",
                    }}
                  >
                    <span
                      style={{
                        background: "var(--capavate-gold)",
                        borderRadius: "50%",
                        flexShrink: "0",
                        height: "8px",
                        width: "8px",
                      }}
                    />
                    <span
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      Merger & Recapitalization Interest
                    </span>
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      gap: "var(--space-3)",
                    }}
                  >
                    <span
                      style={{
                        background: "#6daa45",
                        borderRadius: "50%",
                        flexShrink: "0",
                        height: "8px",
                        width: "8px",
                      }}
                    />
                    <span
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      Acqui-hire & Talent Acquisition
                    </span>
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      display: "flex",
                      gap: "var(--space-3)",
                    }}
                  >
                    <span
                      style={{
                        background: "#b37fd4",
                        borderRadius: "50%",
                        flexShrink: "0",
                        height: "8px",
                        width: "8px",
                      }}
                    />
                    <span
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      Cross-border Distribution & Licensing
                    </span>
                  </div>
                </div>
              </div>

              <p
                className="section-body"
                style={{ marginBottom: "var(--space-8)" }}
              >
                When an investor's stated interests align with a company's
                disclosed strategic intent, Capavate creates the introduction.
                Quietly. Precisely. Without unsolicited noise.
              </p>

              <a
                href="http://localhost:5000/user/register"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Explore Deal Intelligence →
              </a>
            </div>

            <div className="ma-visual fade-in">
              <div className="ma-visual-bg"></div>
              <div className="ma-visual-inner">
                <div className="ma-card-label">
                  Strategic Intent Board — Members Only
                </div>

                <div className="ma-card-company">
                  <div className="ma-company-info">
                    <div
                      className="ma-company-dot"
                      style={{ background: "#7ac5e0" }}
                    ></div>
                    <div>
                      <div className="ma-company-name">
                        Novalyte Biosciences
                      </div>
                      <div className="ma-company-type">
                        HealthTech · Toronto, CA
                      </div>
                    </div>
                  </div>
                  <span className="ma-intent-badge intent-jv">JV Ready</span>
                </div>

                <div className="ma-card-company">
                  <div className="ma-company-info">
                    <div
                      className="ma-company-dot"
                      style={{ background: "#e87b6e" }}
                    ></div>
                    <div>
                      <div className="ma-company-name">SolarEdge Systems</div>
                      <div className="ma-company-type">
                        CleanTech · Hong Kong
                      </div>
                    </div>
                  </div>
                  <span className="ma-intent-badge intent-exit">
                    Exit Seeking
                  </span>
                </div>

                <div className="ma-card-company">
                  <div className="ma-company-info">
                    <div
                      className="ma-company-dot"
                      style={{ background: "var(--capavate-gold)" }}
                    ></div>
                    <div>
                      <div className="ma-company-name">FinStack Inc.</div>
                      <div className="ma-company-type">
                        FinTech · Mumbai, IN
                      </div>
                    </div>
                  </div>
                  <span className="ma-intent-badge intent-merge">Merger</span>
                </div>

                <div className="ma-card-company">
                  <div className="ma-company-info">
                    <div
                      className="ma-company-dot"
                      style={{ background: "#6daa45" }}
                    ></div>
                    <div>
                      <div className="ma-company-name">DeepRoute AI</div>
                      <div className="ma-company-type">
                        AI/ML · Shenzhen, CN
                      </div>
                    </div>
                  </div>
                  <span className="ma-intent-badge intent-acqui">
                    Acqui-hire
                  </span>
                </div>

                <div className="ma-card-company">
                  <div className="ma-company-info">
                    <div
                      className="ma-company-dot"
                      style={{ background: "#b37fd4" }}
                    ></div>
                    <div>
                      <div className="ma-company-name">TradeLink Global</div>
                      <div className="ma-company-type">
                        Logistics · Singapore
                      </div>
                    </div>
                  </div>
                  <span className="ma-intent-badge intent-partner">
                    Partnership
                  </span>
                </div>

                <div className="ma-divider"></div>

                <div className="ma-match-row">
                  <div className="ma-match-icon">🔴</div>
                  <div>
                    <div className="ma-match-text">
                      New Match: Novalyte Biosciences ↔ 3 Angel Members
                    </div>
                    <div className="ma-match-sub">
                      Strategic alignment: Southeast Asia expansion · JV
                      structure
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pricing-section" id="pricing">
        <div className="container">
          <div className="pricing-header fade-in">
            <div className="section-label">Transparent Pricing</div>
            <h2 className="section-title">
              One price.
              <br />
              <em>Unlimited everything.</em>
            </h2>
            <p
              className="section-body"
              style={{
                marginInline: "auto",
                textAlign: "center",
              }}
            >
              No tiers. No per-stakeholder fees. No hidden upgrades. Just one
              flat price that gives you the full platform — cap table, data
              room, CRM, network access, and community — from day one.
            </p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card featured fade-in stagger-1">
              <div className="pricing-card-badge">Most Popular</div>
              <div className="pricing-card-label">Capavate Platform</div>
              <div className="pricing-price">
                <span className="pricing-amount">$70</span>
                <span className="pricing-period">/ month per company</span>
              </div>
              <p className="pricing-desc">
                Everything you need to manage your cap table, investors, and
                community from founding through exit.
              </p>
              <ul className="pricing-features">
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Unlimited
                  shareholders & stakeholders
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Unlimited funding
                  rounds
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Full investor CRM &
                  reporting
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Secure data room
                  management
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Dilution modeling &
                  ESOP management
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Multi-currency &
                  international rounds
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Equity Social Network
                  access
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> M&A/JV strategic
                  intent profile
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Angel network
                  exposure & deal flow
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Manage multiple
                  companies
                </li>
              </ul>
              <a
                className="btn btn-primary"
                href="http://localhost:5000/user/register"
                rel="noopener noreferrer"
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                }}
                target="_blank"
              >
                Start for Free →
              </a>
            </div>
            <div className="pricing-card fade-in stagger-2">
              <div className="pricing-card-label">Entrepreneur Academy</div>
              <div className="pricing-price">
                <span className="pricing-amount">$1,500</span>
                <span className="pricing-period">one-time</span>
              </div>
              <p className="pricing-desc">
                Get inside the investor room. Live meetings, professional
                education, and a direct path to pitching on Portfolio Day.
              </p>
              <ul className="pricing-features">
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> 3× Live Keiretsu
                  Forum investor meetings
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Self-paced video +
                  sample applications
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Professional legal
                  module (SAFE, IP, structure)
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Finance module
                  (valuation, deal mechanics)
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Pitch deck structure
                  & positioning
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Real-time investor
                  feedback
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Priority Capavate
                  Angel Network placement
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> 1-on-1 investor
                  connection time
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Top 20 graduates →
                  Portfolio Day pitch
                </li>
                <li className="pricing-feature">
                  <span className="pricing-check">✓</span> Access to a global
                  Angel syndicate
                </li>
              </ul>
              <a
                className="btn btn-primary"
                href="http://localhost:5000/user/register"
                rel="noopener noreferrer"
                style={{
                  background: "var(--capavate-gold)",
                  color: "var(--capavate-navy)",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                target="_blank"
              >
                Reserve a Seat →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="testimonials-header fade-in">
            <div className="section-label">What Members Say</div>
            <h2 className="section-title">
              Trusted by founders
              <br />
              and <em>investors alike.</em>
            </h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card fade-in stagger-1">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "Before Capavate, I was managing our cap table in a spreadsheet
                that terrified every investor who saw it. Now we walk into
                fundraising conversations with a live data room and a
                professional equity story. The difference is night and day."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar avatar-a">PK</div>
                <div>
                  <div className="testimonial-name">Priya K.</div>
                  <div className="testimonial-role">
                    Founder, EdTech startup · Boston
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card fade-in stagger-2">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "I've been angel investing for 11 years and this is the first
                platform that actually serves both sides. My portfolio dashboard
                is clean, I know exactly which companies are open to exits, and
                the community is genuinely high quality."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar avatar-b">DL</div>
                <div>
                  <div className="testimonial-name">David L.</div>
                  <div className="testimonial-role">
                    Angel Investor · Hong Kong
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card fade-in stagger-3">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The Academy completely changed how I think about fundraising.
                Sitting in a live Keiretsu Forum meeting as a founder — seeing
                how investors actually evaluate deals — that's worth more than
                any course."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar avatar-c">IT</div>
                <div>
                  <div className="testimonial-name">Rohan T.</div>
                  <div className="testimonial-role">
                    Founder, FoodTech · Mumbai
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card fade-in stagger-1">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "We found a JV partner through the strategic intent board that
                we never would have found any other way. The match was precise —
                same geography, complementary tech, aligned on structure. We're
                now in due diligence."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar avatar-d">MR</div>
                <div>
                  <div className="testimonial-name">Marcus R.</div>
                  <div className="testimonial-role">
                    CEO, CleanTech · Stockholm
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card fade-in stagger-2">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The shareholder feed is unlike anything I've used. When a
                portfolio company posts an update, I see it immediately. When I
                want to share a deal with co-investors, I know it reaches people
                who actually care. It's quiet, but it's powerful."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar avatar-a">SL</div>
                <div>
                  <div className="testimonial-name">Sarah L.</div>
                  <div className="testimonial-role">
                    Family Office Principal · Singapore
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-card fade-in stagger-3">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "We've tried Carta and Pulley. They're cap table tools — good
                ones. But Capavate is an ecosystem. The angel network alone has
                been worth more than a year of subscription costs. We've closed
                two rounds with introductions from the network."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar avatar-b">JN</div>
                <div>
                  <div className="testimonial-name">James N.</div>
                  <div className="testimonial-role">
                    Co-founder, AI SaaS · Toronto
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="final-cta">
        <div className="final-cta-bg" />
        <div
          className="final-cta-inner"
          style={{
            paddingBlock: "clamp(var(--space-20),10vw,var(--space-32))",
          }}
        >
          <span className="final-cta-pretitle">
            The Opportunity Cost of Waiting
          </span>
          <h2 className="final-cta-title">
            The next deal in this room
            <br />
            won't wait for <em>you to join.</em>
          </h2>
          <p className="final-cta-body">
            Capavate is a closed, verified community. The conversations
            happening right now — JV discussions, secondary deals,
            co-investments, acquisition talks — are visible only to members.
            Every day you're not inside, you're outside.
          </p>
          <div className="final-cta-buttons">
            <a
              className="btn btn-primary btn-large"
              href="http://localhost:5000/user/register"
              rel="noopener noreferrer"
              target="_blank"
            >
              Join Capavate Now →
            </a>
            <a
              className="btn btn-outline-light"
              href="http://localhost:5000/user/login"
              rel="noopener noreferrer"
              target="_blank"
            >
              Sign In
            </a>
          </div>
          <div className="final-cta-note">
            No credit card required · Cancel anytime · Platform access in
            minutes
          </div>
        </div>
      </section>
      <NewFooter />


      {PopupShow && (
        <Academypopup
          PopupShow={PopupShow}
          setPopupShow={setPopupShow}
          onClose={handleClosePopup}
        />
      )}
    </>

  );
}
