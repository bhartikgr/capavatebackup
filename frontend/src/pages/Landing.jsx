import React, { useState, useEffect } from "react";
import HeaderSection from "../components/Landingsections/HeaderSection";
import "../landingstyle.css";
import HeroSection from "../components/Landingsections/HeroSection";
import EducationSection from "../components/Landingsections/EducationSection";
import AcademySection from "../components/Landingsections/AcademySection";
import PartnersSection from "../components/Landingsections/PartnersSection";
import FooterSection from "../components/Landingsections/FooterSection";
import WixHead from "../components/Landingsections/WixHead";

export default function Landing() {
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
  return (
    <>
      <div className={`${isSticky ? "lsticky anim-t" : ""}`}>
        {/* <WixHead /> */}
        <HeaderSection />
        {/* {isSticky && <div style={{ height: "80px" }}></div>} */}
      </div>
      <HeroSection />
      <EducationSection />
      <AcademySection />
      <PartnersSection />
      <FooterSection />
    </>
  );
}
