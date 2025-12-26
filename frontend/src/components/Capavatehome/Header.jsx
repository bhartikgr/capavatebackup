import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="header" className={sticky ? "sticky cheader" : "cheader"}>
      <div className="main-nav d-block">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-lg">
            <Link className="navbar-brand fulw" to="/capavate/home">
              <img src="/assets/images/logo.png" alt="logo" />
            </Link>

            <button
              className="navbar-toggler rounded-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <IoMdMenu />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li
                  className={`nav-item ${
                    activeLink === "/capavate/home" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/capavate/home">
                    Home
                  </Link>
                </li>

                <li
                  className={`nav-item ${
                    activeLink === "/capavate/about" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/capavate/about">
                    About us
                  </Link>
                </li>

                <li
                  className={`nav-item ${
                    activeLink === "/capavate/services" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/capavate/services">
                    Services
                  </Link>
                </li>

                <li
                  className={`nav-item ${
                    activeLink === "/capavate/howitwork" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/capavate/howitwork">
                    How it works
                  </Link>
                </li>

                <li
                  className={`nav-item ${
                    activeLink === "/capavate/contact" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link" to="/capavate/contact">
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="d-flex gap-3 align-items-center top-btns">
                <Link to="/user/login" className="tlink">
                  Sign In
                </Link>
                <Link to="/user/register" className="tbtn">
                  <span>Get Started</span>
                  <BsArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
