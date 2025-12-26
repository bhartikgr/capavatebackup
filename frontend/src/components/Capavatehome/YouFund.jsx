import React from "react";

export default function YouFund() {
  return (
    <>
      <section className="youfund d-block py-5">
        <div className="container-lg">
          <div className="row ">
            <div className="col-md-6">
              <div className="imgblock ofit h-100 rounded-2 overflow-hidden">
                <img src="/assets/images/service1.webp" alt="image" />
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
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's.
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
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's.
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-3 fundlist">
                  <div className="flex-shrink-0">
                    <h3>3.</h3>
                  </div>
                  <div className="flex-grow-1 d-flex flex-column gap-2">
                    <h4>How long is funding process?</h4>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's.
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
