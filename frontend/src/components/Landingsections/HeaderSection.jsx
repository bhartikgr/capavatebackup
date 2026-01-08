import React, { useState, useEffect } from "react";

export default function HeaderSection() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Agar scroll 50px se zyada ho toh sticky true kar do
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function taaki memory leak na ho
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleLogin = () => {
    window.location.href = '/user/login';
  }
  document.title = "Capavate.com";
  return (
    <>
      {/* Jab isSticky true hoga toh 'sticky anim-t' classes add ho jayengi */}
      <section className={`cheader ${isSticky ? "lsticky anim-t" : ""}`}>
        <div className="container-xl">
          <div className="d-flex justify-content-between align-items-center">
            <a href="#" className="navbar-brand">
              <img className="fit-img" src="/capavate.png" alt="Logo" />
            </a>
            <button type="button" onClick={handleLogin} className="lbtnlog">
              Log in
            </button>
          </div>
        </div>
      </section>

      {/* Header fix hone par content upar na bhage, isliye spacer (Optional) */}
      {isSticky && <div style={{ height: "80px" }}></div>}
    </>
  );
}
