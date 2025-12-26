import React from "react";
import Header from "../components/Capavatehome/Header";
import Footer from "../components/Capavatehome/Footer";
import InnerBanner from "../components/Capavatehome/InnerBanner";
import ContactDetails from "../components/Capavatehome/ContactDetails";

export default function ContactPage() {
  return (
    <>
      <Header />
      <InnerBanner title="Contact Us" breadcrumb="Contact Us" />
      <ContactDetails />
      <Footer />
    </>
  );
}
