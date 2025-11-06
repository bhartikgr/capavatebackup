import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TopBar from "../../../components/Users/UserDashboard/TopBar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Stepblock,
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/RegisterStyles";
import ModuleSideNav from "../../../components/Users/UserDashboard/ModuleSideNav.jsx";
import axios from "axios";
import { API_BASE_URL } from "../../../config/config";
import { useParams } from "react-router-dom";
import Recordround from "../../../components/Users/UserSignatory/Recordround.jsx";
import InvestorReport from "../../../components/Users/UserSignatory/InvestorReport.jsx";
import SignatoryActivity from "../../../components/Users/UserSignatory/SignatoryActivity.jsx";
import DataroomReport from "../../../components/Users/UserSignatory/DataroomReport.jsx";
import SignatoryInformation from "../../../components/Users/UserSignatory/SignatoryInformation.jsx";
import InvestorList from "../../../components/Users/UserSignatory/InvestorList.jsx";
export default function Dashboard() {
  const apiUrlDashboard = API_BASE_URL + "api/user/signatorydashboard/";
  const storedUsername = localStorage.getItem("OwnerLoginData");
  const userLogin = JSON.parse(storedUsername);
  document.title = "Signatory Detail";
  const { id, signatory_id } = useParams();
  const [Signatorydetails, setSignatorydetails] = useState("");
  const type = "Investor updates";
  const typedata = "Due Diligence Document";
  useEffect(() => {
    getSignatoryDashboard();
  }, []);

  const getSignatoryDashboard = async () => {
    const formData = {
      signatory_id: signatory_id,
      company_id: id,
      user_id: userLogin.id,
    };
    try {
      const resp = await axios.post(
        apiUrlDashboard + "getSignatoryDetails",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      setSignatorydetails(resp.data);
    } catch (err) {
      console.error("Error generating summary", err);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleViewInformation = () => {
    setShowModal(true);
  };
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <Wrapper>
        <div className="fullpage d-block">
          <div className="d-flex align-items-start gap-0">
            <ModuleSideNav
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <div
              className={`global_view ${isCollapsed ? "global_view_col" : ""}`}
            >
              <TopBar />
              <SectionWrapper className="d-block p-md-4 p-3">
                <div className="container-fluid">
                  <Stepblock id="step5">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="pb-3 bar_design d-flex justify-content-between align-items-center">
                          <h4 className="h5 mb-0">
                            Email (
                            <strong style={{ fontSize: "0.875rem" }}>
                              {Signatorydetails.signatory_email}
                            </strong>
                            )
                          </h4>
                          <h4 className="h5 mb-0">
                            Company Name (
                            <strong style={{ fontSize: "0.875rem" }}>
                              {Signatorydetails.company_name}
                            </strong>
                            )
                          </h4>
                          <h4 className="h5 mb-0">
                            <strong
                              style={{
                                backgroundColor:
                                  Signatorydetails.access_status === "active"
                                    ? "#d4edda"
                                    : Signatorydetails.access_status ===
                                      "pending"
                                    ? "#fff3cd"
                                    : "#f8f9fa",
                                color:
                                  Signatorydetails.access_status === "active"
                                    ? "#155724"
                                    : Signatorydetails.access_status ===
                                      "pending"
                                    ? "#856404"
                                    : "#212529",
                                padding: "5px 12px",
                                borderRadius: "5px",
                                display: "inline-block",
                                fontSize: "0.875rem",
                              }}
                            >
                              {Signatorydetails.access_status
                                ? Signatorydetails.access_status
                                    .charAt(0)
                                    .toUpperCase() +
                                  Signatorydetails.access_status
                                    .slice(1)
                                    .toLowerCase()
                                : ""}
                            </strong>
                          </h4>
                          <button
                            className="global_btn w-fit"
                            type="button"
                            onClick={handleViewInformation}
                          >
                            Signtory Information
                          </button>
                        </div>

                        <div class="row gap-0 dashboard-top">
                          <div class="col-6 col-md-3 p-0 bor">
                            <div class="p-3">
                              <p class="small fw-medium mb-1">Total Round</p>
                              <div className="d-flex align-items-center gap-3 justify-content-between">
                                <p class="h4 fw-semibold mb-0">
                                  {Signatorydetails.total_allroundrecord}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="col-6 col-md-3 p-0 bor">
                            <div className="p-3">
                              <p className="small fw-medium mb-1">
                                Total Dataroom Management Report
                              </p>
                              <div>
                                <p className="h4 fw-semibold mb-0">
                                  {Signatorydetails.total_dataroom_reports}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-6 col-md-3 p-0 bor">
                            <div class="p-3">
                              <p class="small fw-medium mb-1">
                                Total Investor Reporting
                              </p>
                              <p class="h4 fw-semibold mb-0">
                                {Signatorydetails.total_investor_reporting}
                              </p>
                            </div>
                          </div>

                          <div className="col-6 col-md-3 p-0">
                            <div className="p-3">
                              <p className="small fw-medium mb-1">
                                Total Shared Report
                              </p>
                              <div>
                                <p className="h4 fw-semibold mb-0">
                                  {Signatorydetails.total_shared_reports}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 my-4">
                        <div class="dashboard_card  modern-chart mb-3">
                          <div class="access-logs">
                            <h4 class="section-title">Activity</h4>
                            <SignatoryActivity
                              id={id}
                              signatory_id={signatory_id}
                            />
                          </div>
                        </div>
                        <div class="dashboard_card  modern-chart mb-3">
                          <div class="access-logs">
                            <h4 class="section-title">Investor Reporting</h4>
                            <InvestorReport
                              id={id}
                              signatory_id={signatory_id}
                              type={type}
                            />
                          </div>
                        </div>
                        <div class="dashboard_card  modern-chart mb-3">
                          <div class="access-logs">
                            <h4 class="section-title">Dataroom Management</h4>
                            <InvestorReport
                              id={id}
                              signatory_id={signatory_id}
                              type={typedata}
                            />
                          </div>
                        </div>
                        <div class="dashboard_card  modern-chart mb-3">
                          <div class="access-logs">
                            <h4 class="section-title">Record Round</h4>
                            <Recordround id={id} signatory_id={signatory_id} />
                          </div>
                        </div>
                        <div class="dashboard_card  modern-chart mb-3">
                          <div class="access-logs">
                            <h4 class="section-title">Company Investor</h4>
                            <InvestorList id={id} signatory_id={signatory_id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Stepblock>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </Wrapper>
      {showModal && (
        <SignatoryInformation
          signatory_id={signatory_id}
          id={id}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
const styles = `
.open-round-container {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.info-item {
  background: white;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #007bff;
}

.info-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #6c757d;
  margin-bottom: 5px;
}

.info-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
}

.progress-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.progress-label {
  font-weight: 600;
  color: #495057;
}

.progress-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #007bff;
}

.progress-bar {
  height: 12px;
  background-color: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #007bff;
  border-radius: 6px;
}

.raised-amount {
  font-size: 1.2rem;
  font-weight: 700;
}

.progress-details {
  text-align: center;
}
`;
