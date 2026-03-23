import React from "react";

export default function NewFooter() {
  return (
    <>
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <div style={{ marginBottom: "var(--space-4)" }}>
                <img
                  src="/assets/capavate-logo-dark.png"
                  alt="Capavate"
                  className="footer-logo-img"
                  height="32"
                  id="footer-logo-img"
                />
              </div>
              <p className="footer-brand-desc">
                The world's first Equity Social Network. Cap table management,
                angel investor community, M&A intelligence, and education — for
                the founders and investors building tomorrow's companies.
              </p>
            </div>

            <div>
              <div className="footer-col-title">Platform</div>
              <ul className="footer-links">
                <li>
                  <a href="#platform">Features</a>
                </li>
                <li>
                  <a href="#community">Social Network</a>
                </li>
                <li>
                  <a href="#for-founders">For Founders</a>
                </li>
                <li>
                  <a href="#for-investors">For Investors</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Network</div>
              <ul className="footer-links">
                <li>
                  <a href="#angel-network">Angel Network</a>
                </li>
                <li>
                  <a href="#angel-network">Entrepreneur Academy</a>
                </li>
                <li>
                  <a href="#ma-section">M&amp;A Intelligence</a>
                </li>
                <li>
                  <a
                    href="https://capavate.com/user/register"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply to Present
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li>
                  <a
                    href="https://capavate.com/user/login"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="https://capavate.com/user/register"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register
                  </a>
                </li>
                <li>
                  <a href="mailto:info@capavate.com">Contact Us</a>
                </li>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/privacy-policy">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              &copy; {new Date().getFullYear()} Capavate · Blueprint Catalyst
              Ltd. All rights reserved. This platform is intended for accredited
              investors only.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
