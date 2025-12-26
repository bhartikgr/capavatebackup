import React from "react";
import { GrLineChart } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";



export default function ServicesGrid() {
  const services = [
    {
      title: "Startup Growth Advisory",
      description:
        "Helping startups scale with mentorship, trust, and investment guidance.",
      img: "/assets/images/service1.webp",
    },
    {
      title: "Investor Networking",
      description:
        "Connect with top investors to secure funding and strategic support.",
      img: "/assets/images/service2.webp",
    },
    {
      title: "Market Research & Analysis",
      description:
        "In-depth analysis to guide investment decisions and business growth.",
      img: "/assets/images/service3.webp",
    },
    {
      title: "Financial Planning",
      description:
        "Strategic financial advice for companies looking to optimize capital.",
      img: "/assets/images/service4.webp",
    },
    {
      title: "Portfolio Management",
      description:
        "Professional management of investments to maximize returns.",
      img: "/assets/images/service5.webp",
    },
    {
      title: "Business Strategy Consulting",
      description:
        "Expert guidance to align company strategy with investor expectations.",
      img: "/assets/images/service6.webp",
    },
    {
      title: "Brand & Pitch Development",
      description:
        "Create compelling pitch decks and branding that attract investors.",
      img: "/assets/images/service3.webp",
    },
    {
      title: "Legal & Compliance Support",
      description:
        "Ensure regulatory compliance for secure and transparent business operations.",
      img: "/assets/images/service2.webp",
    },
    {
      title: "Technology & Innovation Support",
      description:
        "Boost business performance with tech integration and innovation consulting.",
      img: "/assets/images/service1.webp",
    },
  ];

  return (
    <>
      <section className="serviceblock d-block gapy">
        <div className="container-lg">
          <div className="row gy-4 align-items-center justify-content-center">
            <div className="col-md-8">
              <div className="d-flex justify-content-center mb-5">
                <div className="d-flex flex-column gap-3 titlecontent text-center">
                  <div className="d-flex gap-2 align-items-center text-center align-items-center smalltext mx-auto">
                    <GrLineChart /> <h6>OUR SERVICES</h6>
                  </div>
                  <h2>Connecting Startups with the Right Investors</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            {services.map((service, index) => (
              <div className="col-md-4" key={index}>
                <div className="servicebox d-flex flex-column gap-2 h-100">
                  <div className="imgblock d-block ofit mb-2">
                    <img src={service.img} alt="image" />
                  </div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <Link
                    to="/"
                    className="d-flex gap-2 align-items-center readlink"
                  >
                    <span>Read More</span> <BsArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="youfund d-block py-5">
        <div className="container-lg">
          <div className="row flex-md-row-reverse">
            <div className="col-md-6">
              <div className="imgblock ofit h-100 rounded-2 overflow-hidden">
                <img src="/assets/images/service2.webp" alt="image" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex flex-column gap-4 fundcontent">
                <div className="d-flex gap-3 fundlist">
                  <div className="flex-shrink-0">
                    <h3>1.</h3>
                  </div>
                  <div className="flex-grow-1 d-flex flex-column gap-2">
                    <h4>What industries do you fund?</h4>
                    <p>
                      We invest in high-growth sectors including technology,
                      finance, SaaS, healthtech, ecommerce, and innovative
                      consumer solutions that bring real impact to the market.
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3 fundlist">
                  <div className="flex-shrink-0">
                    <h3>2.</h3>
                  </div>
                  <div className="flex-grow-1 d-flex flex-column gap-2">
                    <h4>What stages do you fund?</h4>
                    <p>
                      From early-stage ideas to scaling startups — we support
                      entrepreneurs during Pre-Seed, Seed, and Series A funding
                      rounds to accelerate growth.
                    </p>
                  </div>
                </div>

                <div className="d-flex gap-3 fundlist">
                  <div className="flex-shrink-0">
                    <h3>3.</h3>
                  </div>
                  <div className="flex-grow-1 d-flex flex-column gap-2">
                    <h4>How long does the funding process take?</h4>
                    <p>
                      Our streamlined evaluation ensures faster decisions. Most
                      funding processes are completed within 4–8 weeks depending
                      on due diligence and business requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
