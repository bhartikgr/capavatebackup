import React from "react";

export default function HeroSection() {
  return (
    <>
      <section className="d-block hero_banner ">
        <div className="container-xl px-md-5">
          <div className="row gy-md-0 gy-4 align-items-center bn_top">
            <div className="col-md-7">
              <div className="d-flex flex-column gap-3">
                <h1>Capavate is your playbook...</h1>
                <h2>From Cradle to Exit.</h2>
              </div>
            </div>
            <div className="col-md-5">
              <div className="d-block hero_png">
                <img
                  className="fit-img"
                  src="/assets/images/hero.avif"
                  alt="Hero_icon"
                />
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex flex-column gap-0  ">
                <h3>Structure Smarter.</h3>
                <p>
                  A cap table is only a tool, whereas your round structure is
                  your 'strategy'. You are the author of your company's
                  financial story. Yet most founders tackle them alone, making
                  costly mistakes that haunt them through multiple rounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="d-block journey">
        <div class="container-xl">
          <div class="row gy-4 align-items-center justify-content-between">
            <div class="col-md-5 pe-md-5">
              <div class="d-flex justify-content-center justify-content-md-end align-items-end">
                <a href="/user/login" target="_blank" class="lglobal_btn bg_red">
                  Start Your Journey
                </a>
              </div>
            </div>
            <div class="col-md-7">
              <p>
                We believe in learning by doing. Our mission is to turn
                fundraising from a black box into a skill you master. Capavate
                automates the mechanics, simplifies the cap table, and makes
                your story impossible to ignore. Whether it’s your first round
                or your Series B, you need to see real-time ownership.
                Understand what each 'investor commit' means.
              </p>
              <p>Capavate is the tool built for founders—not lawyers.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="d-block experiences">
        <div class="container-xl">
          <div class="row">
            <div class="col-md-10 mx-auto">
              <h4>
                Built from the experiences of 3,000+ investors who've watched
                over 1,000+ startups stumble. They know what not to do—and they
                want you to build smarter, faster, and cleaner with the right
                tools. Do not reinvent the wheel. Lean on experience and
                education.
              </h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
