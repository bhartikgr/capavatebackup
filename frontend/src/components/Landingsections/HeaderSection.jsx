import React, { useState, useEffect } from "react";

export default function HeaderSection() {

  const handleLogin = () => {
    window.open('/user/login', '_blank');
  }
  document.title = "Capavate.com";
  return (
    <>
      {/* Jab isSticky true hoga toh 'sticky anim-t' classes add ho jayengi */}
      <section className={`cheader`}>
        <div className="container-xl">
          <div className="d-flex justify-content-between align-items-center">
            <a href="#" className="navbar-brand">
              <img className="fit-img" src="/capavate.png" alt="Logo" />
            </a>
            <button type="button" onClick={handleLogin} className="lbtnlog">
              Login/Register
            </button>
          </div>
        </div>
      </section>

      {/* Header fix hone par content upar na bhage, isliye spacer (Optional) */}

    </>
  );
}
