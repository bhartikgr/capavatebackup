import React from "react";
import InnerBanner from "../components/Capavatehome/InnerBanner";
import Header from "../components/Capavatehome/Header";
import Footer from "../components/Capavatehome/Footer";
import ServicesGrid from "../components/Capavatehome/ServicesGrid";

export default function Services() {
  return (
    <>
      <Header />
      <InnerBanner title="Our Services" breadcrumb="Our Servics" />
      <ServicesGrid />
      <Footer />
    </>
  );
}
