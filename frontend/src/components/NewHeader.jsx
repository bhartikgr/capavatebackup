import React, { useState, useEffect } from "react";
import "../newstyle.css";

export default function NewHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const logoPath = '/assets/capavate-logo-dark.png';

  // 2. Scroll event listen karein
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to toggle menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className="site-nav"
        style={{
          boxShadow: isScrolled ? "rgba(0, 0, 0, 0.35) 0px 4px 24px" : "none",
          transition: "box-shadow 0.3s ease",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container">
          <div className="nav-inner">
            <a href="/" className="nav-logo" aria-label="Capavate home">
              <img
                src={logoPath}
                alt="Capavate"
                className="nav-logo-img"
                id="nav-logo-img"
              />
            </a>

            <ul className="nav-links">
              <li>
                <a href="https://capavate.com/#platform">Platform</a>
              </li>
              <li>
                <a href="https://capavate.com/#for-founders">Founders</a>
              </li>
              <li>
                <a href="https://capavate.com/#for-investors">Investors</a>
              </li>
              <li>
                <a href="https://capavate.com/#angel-network">Angel Network</a>
              </li>
              <li>
                <a href="https://capavate.com/#pricing">Pricing</a>
              </li>
            </ul>

            <div className="nav-actions">
              <a
                href="https://capavate.com/user/login"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Sign in
              </a>
              <a
                href="https://capavate.com/user/register"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Join Capavate
              </a>
            </div>

            <button
              className={`hamburger ${isOpen ? "active" : ""}`}
              onClick={toggleMenu}
              aria-label="Open menu"
              id="hamburger"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className="mobile-menu"
        style={{
          display: isOpen ? "flex" : "none",
        }}
        id="mobile-menu"
        aria-hidden="true"
      >
        <a href="#platform">Platform</a>
        <a href="#for-founders">For Founders</a>
        <a href="#for-investors">For Investors</a>
        <a href="#angel-network">Angel Network</a>
        <a href="#pricing">Pricing</a>
        <a
          href="https://capavate.com/user/login"
          target="_blank"
          rel="noopener noreferrer"
        //   style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Sign In →
        </a>
      </div>
    </>
  );
}
