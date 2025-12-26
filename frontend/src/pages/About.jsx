import React from "react";
import AboutSection from "../components/Capavatehome/AboutSection";
import InnerBanner from "../components/Capavatehome/InnerBanner";
import Header from "../components/Capavatehome/Header";
import TestmoSection from "../components/Capavatehome/TestmoSection";
import YouFund from "../components/Capavatehome/YouFund";
import Footer from "../components/Capavatehome/Footer";

export default function About() {
  return (
    <>
      <Header />
      <InnerBanner title="About us" breadcrumb="About us" />
      <YouFund />
      <AboutSection />
      <TestmoSection />
      <Footer />
    </>
  );
}
