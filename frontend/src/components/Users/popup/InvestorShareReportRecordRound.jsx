import React, { useState, useEffect } from "react";
import {
  Overlay,
  ModalContainer,
  ModalTitle,
  CloseButton,
  DropArea,
  ModalBtn,
  ButtonGroup,
} from "../../Styles/DataRoomStyle.js";
import axios from "axios";
import InvestorRoundInvitePopup from "../../Investor/popup/InvestorRoundInvitePopup.jsx";
const InvestorShareReportRecordRound = ({
  onClose,
  records,
  allinvestor,
  returnrefresh,
}) => {
  var apiURLInvestor = "https://capavate.com/api/user/capitalround/";
  const storedUsername = localStorage.getItem("SignatoryLoginData");
  const userLogin = JSON.parse(storedUsername);
  const [spinners, setspinners] = useState(false);
  const [err, seterr] = useState(false);
  const [successresponse, setsuccessresponse] = useState("");
  const [ClientIP, setClientIP] = useState("");
  const [CountryName, setCountryName] = useState("");
  const [showCRMPopup, setShowCRMPopup] = useState(false);
  const [isPopupSubmitting, setIsPopupSubmitting] = useState(false);
  const [pendingPayload, setPendingPayload] = useState(null);

  useEffect(() => {
    const getIP = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        setClientIP(data.ip); // Save this to state
        setCountryName(data.country_name);
      } catch (error) {
        console.error("Failed to fetch IP", error);
      }
    };

    getIP();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      company_id: userLogin.companies[0].id,
      created_by_id: userLogin.id,
      created_by_role: userLogin.role,
      records: records,
      selectedRecords: selectedRecords,
      ip_address: ClientIP,
      country_name: CountryName,
      selectedRows: selectedRecords
    };

    // Show popup first - don't submit yet
    setPendingPayload({
      payload: payload,
      recipientCount: selectedRecords?.length || 0
    });
    setShowCRMPopup(true);
  };

  const handleInviteConfirm = async () => {
    setIsPopupSubmitting(true);

    try {
      const payloadWithAck = {
        ...pendingPayload.payload,
        crm_invite_acknowledged: "Yes",


      };

      setspinners(true);

      const res = await axios.post(
        apiURLInvestor + "SendRecordRoundToinvestor",
        payloadWithAck,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setShowCRMPopup(false);
      setspinners(false);

      if (res.data.status === "2") {
        seterr(true);
        const duplicateInfo = res.data.duplicates?.map(
          (d) => `${d.investor_email} - ${d.record_name}`
        ) || [];
        setsuccessresponse(`Record already shared: ${duplicateInfo.join(", ")}`);
      }

      if (res.data.status === "1") {
        seterr(false);
        setsuccessresponse(res.data.message);
        setTimeout(() => {
          onClose?.();
          returnrefresh?.();
          setShowCRMPopup(false);
        }, 3500);
      }

      setTimeout(() => {
        setsuccessresponse("");
      }, 3500);

    } catch (err) {
      console.error("Submit error:", err);
      seterr(true);
      setsuccessresponse("Error sending record. Please try again.");
      setTimeout(() => {
        setsuccessresponse("");
      }, 3500);
    } finally {
      setIsPopupSubmitting(false);
      setPendingPayload(null);
      setspinners(false);
    }
  };

  const handlePopupClose = () => {
    setShowCRMPopup(false);
    setPendingPayload(null);
  };
  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleRecordSelect = (recordId) => {
    setSelectedRecords((prev) =>
      prev.includes(recordId)
        ? prev.filter((id) => id !== recordId)
        : [...prev, recordId]
    );
  };

  // Corrected handleSelectAll function
  const handleSelectAll = () => {
    if (allinvestor.length === 0) {
      return;
    }

    if (selectedRecords.length === allinvestor.length) {
      // If all investors are already selected, deselect all
      setSelectedRecords([]);
    } else {
      // Select all investors
      setSelectedRecords(allinvestor.map((investor) => investor.id));
    }
  };

  return (
    <>
      {!showCRMPopup && (
        <div className="main_popup-overlay">
          <ModalContainer>
            <form onSubmit={handleSubmit} method="post" action="javascript:void(0)">
              <CloseButton onClick={onClose}>×</CloseButton>
              {successresponse && (
                <p className={err ? " mt-3 error_pop_sendreport" : "success_pop mt-3"}>
                  {successresponse}
                </p>
              )}
              <h4 className="aititle pb-3">Share Report to Investors</h4>
              <div className="formmodalreport">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={
                            selectedRecords.length === allinvestor.length &&
                            allinvestor.length > 0
                          }
                        />
                      </th>
                      <th>Investor Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allinvestor.map((record) => (
                      <tr key={record.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRecords.includes(record.id)}
                            onChange={() => handleRecordSelect(record.id)}
                          />
                        </td>
                        <td>{record.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="form-group mt-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <ButtonGroup className="d-flex gap-2">
                    <ModalBtn onClick={onClose} className="close_btn w-fit">
                      Close
                    </ModalBtn>
                    <ModalBtn
                      disabled={spinners}
                      variant="upload"
                      type="submit"
                      style={{
                        opacity: selectedRecords.length === 0 ? 0.5 : 1,
                        pointerEvents: selectedRecords.length === 0 ? "none" : "auto",
                      }}
                      className="global_btn w-fit align-items-center gap-2"
                    >
                      Submit
                      {spinners && (
                        <div
                          className="white-spinner spinner-border spinneronetimepay m-0"
                          role="status"
                        >
                          <span className="visually-hidden"></span>
                        </div>
                      )}
                    </ModalBtn>
                  </ButtonGroup>
                </div>
              </div>
            </form>
          </ModalContainer>
        </div>
      )}
      <InvestorRoundInvitePopup
        show={showCRMPopup}
        onClose={handlePopupClose}
        onConfirm={handleInviteConfirm}
        companyName={userLogin?.companies[0]?.name || "Your Company"}
        recipientCount={pendingPayload?.recipientCount || 0}
        roundName={records?.nameOfRound || "Investment Round"}
        isSubmitting={isPopupSubmitting}
      />
    </>
  );
};

export default InvestorShareReportRecordRound;