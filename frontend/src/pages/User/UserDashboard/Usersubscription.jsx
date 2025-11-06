import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TopBar from "../../../components/Users/UserDashboard/TopBar";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Stepblock,
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/RegisterStyles";
import ModuleSideNav from "../../../components/Users/UserDashboard/ModuleSideNav";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Usersubscription() {
  const storedUsername = localStorage.getItem("OwnerLoginData");
  const userLogin = JSON.parse(storedUsername);
  useEffect(() => {
    document.title = "Subscription Page";
  }, []);

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
                        <div className="pb-3 bar_design">
                          <h4 className="h5 mb-0">Subscription Page</h4>
                        </div>

                        <div class="row gap-0 dashboard-top p-0 border-0 bg-transparent"></div>
                      </div>
                    </div>
                  </Stepblock>
                </div>
              </SectionWrapper>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
