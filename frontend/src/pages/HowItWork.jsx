import React from "react";
import Header from "../components/Capavatehome/Header";
import Footer from "../components/Capavatehome/Footer";
import InnerBanner from "../components/Capavatehome/InnerBanner";
import WorkSection from "../components/Capavatehome/WorkSection";
import TestmoSection from "../components/Capavatehome/TestmoSection";

export default function HowItWork() {
  return (
    <>
      <Header />
      <InnerBanner title="How its works" breadcrumb="How its works" />
      <WorkSection />
      <section className="youfund d-block py-5">
        <div className="container-lg">
          <div className="row flex-md-row-reverse align-self-stretch">
            <div className="col-md-6">
              <div className="imgblock ofit h-100 rounded-2 overflow-hidden">
                <img src="/assets/images/service3.webp" alt="image" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex flex-column gap-4 fundcontent">
                <div className="d-flex gap-3 fundlist">
                  <div className="flex-grow-1 d-flex flex-column gap-2">
                    <h4>Which industries do you support?</h4>
                    <p>
                      We fund businesses across rapidly growing industries
                      including technology, financial services, SaaS,
                      healthtech, ecommerce, and forward-thinking consumer
                      brands that create meaningful market impact.
                    </p>
                    <p>
                      Our focus is on scalable ventures with strong innovation,
                      proven traction, and the potential to disrupt traditional
                      markets.
                    </p>
                    <p>
                      Whether you're building solutions that transform
                      industries or elevate customer experience — we are here to
                      fuel your growth journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4 align-self-stretch">
            <div className="col-md-6">
              <div className="imgblock ofit h-100 rounded-2 overflow-hidden">
                <img src="/assets/images/service5.webp" alt="image" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex flex-column gap-4 fundcontent">
                <div className="d-flex gap-3 fundlist">
                  <div className="flex-grow-1 d-flex flex-column gap-2">
                    <h4>How do we add value to your business?</h4>
                    <p>
                      Beyond capital, we deliver strategic support — helping you
                      refine your business model, accelerate sales, and unlock
                      new market opportunities with experienced mentorship and
                      global connections.
                    </p>
                    <p>
                      Our team works closely with founders to strengthen product
                      positioning, improve operations, and build long-term
                      competitive advantages.
                    </p>
                    <p>
                      From early-stage momentum to large-scale expansion — we
                      become your growth partner at every step of the journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestmoSection />
      <Footer />
    </>
  );
}
