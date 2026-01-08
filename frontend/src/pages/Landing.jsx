import React from "react";
import HeaderSection from "../components/Landingsections/HeaderSection";
import "../landingstyle.css";
import HeroSection from "../components/Landingsections/HeroSection";
import EducationSection from "../components/Landingsections/EducationSection";
import AcademySection from "../components/Landingsections/AcademySection";
import PartnersSection from "../components/Landingsections/PartnersSection";
import FooterSection from "../components/Landingsections/FooterSection";

export default function Landing() {
  return (
    <>
      <HeaderSection />
      <HeroSection />
      <EducationSection />
      <AcademySection />
      <PartnersSection />
      <FooterSection />
    </>
  );
}
