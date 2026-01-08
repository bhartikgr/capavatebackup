import React from "react";

export default function EducationSection() {
  return (
    <>
      <section className="d-block education">
        <div className="container-xl">
          <div className="row gy-4">
            <div className="col-md-6">
              <div className="education_left text-center">
                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                  <h5>+ Education +</h5>
                  <p>
                    Learn cap table strategy from real early-stage investors
                  </p>
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                  <h5>+ Collaboration +</h5>
                  <p>Feedback from investors on your structure</p>
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                  <h5>+ Positioning +</h5>
                  <p>Learn how to present your equity to future investors</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-block h-100">
                <img
                  className="fit-img object-fit-contain"
                  src="/assets/images/edc.avif"
                  alt="Education"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="d-block experiences">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-11">
              <h4>
                Your cap table is a tool. Your round structure writes your
                story... write it wisely.{" "}
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section className="d-block card_blur">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-7 mx-auto">
              <div className="card_main mx-auto">
                <div className="d-flex flex-column gap-4 justify-content-center align-items-center text-center">
                  <h6>Learn from Live Deals.</h6>
                  <p className="px-md-4">
                    Ready to raise? Don’t wait until your pitch is 'perfect'.
                    Learn exactly what investors expect. Get 2x access to join
                    our exclusive monthly early-stage investor sessions and
                    start positioning your company with real angels today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
