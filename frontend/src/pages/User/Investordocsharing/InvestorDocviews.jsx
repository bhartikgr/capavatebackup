import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import MainHeader from "../../../components/Users/MainHeader.js";
import ModuleSideNav from "../../../components/Users/ModuleSideNav.jsx";
import ReuseDatatable from "../../../components/Users/ReuseDatatable";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  SectionWrapper,
  Wrapper,
} from "../../../components/Styles/MainHeadStyles.js";
import { DataRoomSection } from "../../../components/Styles/DataRoomStyle.js";

export default function InvestorDocviews() {
  const investoreport = [
    {
      id: 1,
      fname: "John",
      lname: "Doe",
      email: "john@gmail.com",
      mobile: "9876543210",
      viewdate: "12-12-2024",
    },
  ];

  const diligence = [
    {
      id: 1,
      fname: "Alice",
      lname: "Smith",
      email: "alice@example.com",
      mobile: "1234567890",
      viewdate: "10-10-2024",
    },
  ];

  const termsheet = [
    {
      id: 1,
      fname: "Bob",
      lname: "Marley",
      email: "bob@gmail.com",
      mobile: "1112223333",
      viewdate: "01-01-2025",
    },
  ];

  const subscription = [
    {
      id: 1,
      fname: "Eva",
      lname: "Green",
      email: "eva@example.com",
      mobile: "4445556666",
      viewdate: "03-03-2025",
    },
  ];

  const dataroom = [
    {
      id: 1,
      fname: "John",
      lname: "Doe",
      email: "john@gmail.com",
      mobile: "9876543210",
      viewdate: "12-12-2024",
    },
  ];
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <Wrapper>
        <div className="fullpage d-block">
          <MainHeader />
          <SectionWrapper className="d-block py-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <ModuleSideNav
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                  />
                </div>
                <div className="col-md-9 d-flex flex-column gap-4 viewsdata">
                  <DataRoomSection className="d-flex flex-column gap-1 py-3">
                    <div className="titleroom d-flex justify-content-between align-items-center border-bottom pb-3">
                      <h4>Investor Documents & Sharing : Views</h4>
                    </div>
                    {/* Section 1 */}
                    <ReuseDatatable
                      title="Investor Update Report"
                      nameofreport="Investor Details"
                      dateofreport="12-12-2024"
                      initialData={investoreport}
                    />
                    {/* Section 1 End */}
                  </DataRoomSection>

                  {/* Section 2 */}
                  <DataRoomSection className="d-flex flex-column gap-1 py-3">
                    <ReuseDatatable
                      title="Due Diligence Document"
                      initialData={diligence}
                      nameofreport="Diligence Details"
                      dateofreport="12-12-2024"
                    />
                  </DataRoomSection>
                  {/* Section 2 End */}

                  {/* Section 3 */}
                  <DataRoomSection className="d-flex flex-column gap-1 py-3">
                    <ReuseDatatable
                      title="Term Sheet"
                      initialData={termsheet}
                      nameofreport="Term Sheet Files"
                      dateofreport="12-12-2024"
                    />
                  </DataRoomSection>
                  {/* Section 3 End */}

                  {/* Section 4 */}
                  <DataRoomSection className="d-flex flex-column gap-1 py-3">
                    <ReuseDatatable
                      title="Subscription Documents"
                      initialData={subscription}
                      nameofreport="Subscription File"
                      dateofreport="12-12-2024"
                    />
                  </DataRoomSection>
                  {/* Section 4 End */}

                  {/* Section 5 */}
                  <DataRoomSection className="d-flex flex-column gap-1 py-3">
                    <ReuseDatatable
                      title="Dataroom"
                      initialData={dataroom}
                      nameofreport="Dataroom File"
                      dateofreport="12-12-2024"
                    />
                  </DataRoomSection>
                  {/* Section 5 End */}
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </Wrapper>
    </>
  );
}
