// PreviousSection.js
import React, { useState } from "react";
import { VscOpenPreview } from "react-icons/vsc";
import CurrencyFormatter from "../CurrencyFormatter";
const PreviousSection = ({
  formData,
  otherText,
  selected,
  visibleFields = [],
  isFirstRound = false,
  foundersData = [],
  calculateTotalShares = () => 0,
  calculateTotalValue = () => 0,
  founderCount = 0,
  CurrDisplay
}) => {
  const showField = (field) => visibleFields.includes(field);
  const calculateFounderValue = (shares) => {
    const pricePerShare = parseFloat(formData.pricePerShare) || 0;
    return (shares * pricePerShare).toFixed(2);
  };
  const amountTotal = Number(
    String(calculateTotalValue()).replace(/,/g, "")
  ) || 0;
  const totalshareconvert = Number(
    String(calculateTotalShares()).replace(/,/g, "")
  ) || 0;

  const [selectedFounder, setSelectedFounder] = useState(null);
  // Function to render Round 0 specific content

  const renderRound0Content = () => (
    <div className="round-0-special-section">
      <div className="alert alert-info mb-3">
        <strong>Round 0 - Incorporation Details</strong>
        <p className="mb-0 small">Founder shares issued at incorporation</p>
      </div>

      <div className="row g-3">
        {/* Round Name */}
        {showField("shareclass") && (
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Name of Round:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {formData.nameOfRound || "Founding Share Allocation"}
              </p>
            </div>
          </div>
        )}

        {/* Share Class Type */}
        {formData.round_type === 'Round 0' && (
          <div className="col-md-6">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4 py-3 fw-semibold text-uppercase text-secondary small fw-semibold small text-muted border-0" style={{

                        backgroundColor: '#f8f9fc' // Light background
                      }}
                        colSpan={foundersData.length}>
                        Share Class Type
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {/* Single row with all founders in columns */}
                    {/* Founder columns headers */}
                    <tr>
                      {foundersData.map((founder, index) => (
                        <td key={index} className="text-center py-3 fw-semibold small text-muted" style={{ border: '1px solid #dee2e6' }}>
                          Founder {index + 1}
                        </td>
                      ))}
                    </tr>
                    <tr>

                      {foundersData.map((founder, index) => {
                        const shares = parseInt(founder.shares) || 0;
                        const totalShares = calculateTotalShares();
                        const percentage = totalShares > 0 ? ((shares / totalShares) * 100).toFixed(1) : '0.0';

                        return (
                          <td key={index} className="text-center py-3" style={{ border: '1px solid #dee2e6' }}>
                            <div className="d-flex flex-column align-items-center">
                              <div className="avatar-sm mb-2">
                                <div className="avatar-title bg-light-primary text-primary rounded-circle fw-bold">
                                  {founder.firstName ? founder.firstName.charAt(0).toUpperCase() :
                                    founder.lastName ? founder.lastName.charAt(0).toUpperCase() :
                                      `${index + 1}`}
                                </div>
                              </div>
                              <button
                                type="button"
                                className="btn btn-link p-0 text-decoration-none fw-semibold"
                                onClick={() => setSelectedFounder(founder)}
                                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                              >
                                {founder.firstName || founder.firstName !== '' ?
                                  `${founder.firstName} ${founder.lastName || ''}`.trim() :
                                  `Founder ${index + 1}`
                                }
                              </button>
                              <div className="text-muted small mt-1">
                                {founder.shareType === 'common' ? 'Common' :
                                  founder.shareType === 'preferred' ? 'Preferred' :
                                    founder.customShareType || 'Other'}
                              </div>

                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {formData.round_type !== 'Round 0' && (
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Share Class Type:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {formData.shareClassType || "Common Shares"}
              </p>
            </div>
          </div>
        )}

        {/* Price Per Share */}
        {showField("shareclass") && (
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Price Per Share:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {CurrDisplay}{formData.pricePerShare || "0.00"}
              </p>
            </div>
          </div>
        )}

        {/* Total Shares */}
        {showField("issuedshares") && (
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Total Shares Issued:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                <CurrencyFormatter
                  amount={formData.issuedshares}
                  currency={""}
                  digit={3}
                />

              </p>
            </div>
          </div>
        )}

        {/* Total Valuation */}
        {showField("issuedshares") && (
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Total Incorporation Value:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">

                <CurrencyFormatter
                  amount={amountTotal}
                  currency={CurrDisplay}
                  digit={0}
                />
              </p>
            </div>
          </div>
        )}

        {/* Number of Founders */}
        {showField("shareclass") && (
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Number of Founders:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {founderCount}
              </p>
            </div>
          </div>
        )}
        {/* {formData.round_type === 'Round 0' && (
          <>
            {showField("shareclass") && (
              <div className="col-md-6">
                <div className="p-3 bg-light rounded-3 h-100">
                  <span className="text-secondary small fw-semibold text-uppercase">
                    Voting Rights:
                  </span>
                  <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                    {formData.voting === "Yes" ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            )}
          </>
        )} */}
        {formData.round_type === 'Round 0' && (
          <div className="col-md-6">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4 py-3 fw-semibold text-uppercase text-secondary small fw-semibold small text-muted border-0" style={{

                        backgroundColor: '#f8f9fc' // Light background
                      }}
                        colSpan={foundersData.length}>
                        Voting Rights:
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {/* Single row with all founders in columns */}
                    {/* Founder columns headers */}
                    <tr>
                      {foundersData.map((founder, index) => (
                        <td key={index} className="text-center py-3 fw-semibold small text-muted" style={{ border: '1px solid #dee2e6' }}>
                          Founder {index + 1}
                        </td>
                      ))}
                    </tr>
                    <tr>

                      {foundersData.map((founder, index) => {
                        const shares = parseInt(founder.shares) || 0;
                        const totalShares = calculateTotalShares();


                        return (
                          <td key={index} className="text-center py-3" style={{ border: '1px solid #dee2e6' }}>
                            <div className="d-flex flex-column align-items-center">
                              <div className="avatar-sm mb-2">
                                <div className="avatar-title bg-light-primary text-primary rounded-circle fw-bold">
                                  {founder.firstName ? founder.firstName.charAt(0).toUpperCase() :
                                    founder.lastName ? founder.lastName.charAt(0).toUpperCase() :
                                      `${index + 1}`}
                                </div>
                              </div>
                              <button
                                type="button"
                                className="btn btn-link p-0 text-decoration-none fw-semibold"
                                onClick={() => setSelectedFounder(founder)}
                                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                              >
                                {founder.firstName || founder.firstName !== '' ?
                                  `${founder.firstName} ${founder.lastName || ''}`.trim() :
                                  `Founder ${index + 1}`
                                }
                              </button>
                              <div className="text-muted small mt-1">
                                {founder.voting}
                              </div>

                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Founder Allocation Details */}
        {showField("shareclass") && foundersData && foundersData.length > 0 && (
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0 text-primary">
                    <i className="bi bi-people-fill me-2"></i>
                    Founder Share Allocation
                  </h5>
                  <span className="badge bg-primary rounded-pill">
                    {foundersData.length} Founder{foundersData.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-4 py-3 fw-semibold text-uppercase small text-muted border-0">Founder</th>
                        <th className="py-3 fw-semibold text-uppercase small text-muted border-0">Numbers of Shares</th>
                        <th className="py-3 fw-semibold text-uppercase small text-muted border-0">Ownership</th>
                        <th className="py-3 fw-semibold text-uppercase small text-muted border-0">Value</th>
                        <th className="pe-4 py-3 fw-semibold text-uppercase small text-muted border-0 text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foundersData.map((founder, index) => {
                        const shares = parseInt(founder.shares) || 0;
                        const totalShares = calculateTotalShares();
                        const percentage = totalShares > 0 ?
                          ((shares / totalShares) * 100).toFixed(1) : '0.0';
                        const value = calculateFounderValue ? calculateFounderValue(shares) : '0.00';

                        return (
                          <tr key={index} className="border-bottom">
                            <td className="ps-4 py-3">
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm me-3">
                                  <div className="avatar-title bg-light-primary text-primary rounded-circle fw-bold">
                                    {founder.firstName ? founder.firstName.charAt(0).toUpperCase() :
                                      founder.lastName ? founder.lastName.charAt(0).toUpperCase() :
                                        `F${index + 1}`}
                                  </div>
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    className="btn btn-link p-0 text-decoration-none text-start fw-semibold"
                                    onClick={() => setSelectedFounder(founder)}
                                    style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                                  >
                                    {founder.firstName || founder.firstName !== '' ?
                                      `${founder.firstName} ${founder.lastName || ''}`.trim() :
                                      `Founder ${index + 1}`
                                    }
                                  </button>
                                  <div className="text-muted small">
                                    {founder.shareType === 'common' ? 'Common' :
                                      founder.shareType === 'preferred' ? 'Preferred' :
                                        founder.customShareType || 'Other'}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3">
                              <span className="fw-semibold">{shares.toLocaleString()}</span>
                            </td>
                            <td className="py-3">
                              <div className="d-flex align-items-center">
                                <div className="progress flex-grow-1 me-2" style={{ height: '6px', width: '60px' }}>
                                  <div
                                    className="progress-bar bg-success"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="fw-semibold text-nowrap">{percentage}%</span>
                              </div>
                            </td>
                            <td className="py-3">
                              <span className="fw-semibold text-success">
                                {CurrDisplay}{value}
                              </span>
                            </td>
                            <td className="pe-4 py-3 text-end">
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => setSelectedFounder(founder)}
                              >
                                <i className="bi bi-eye me-1"></i>
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })}

                      {/* Total Row */}
                      {calculateTotalShares() > 0 && (
                        <tr className="bg-light-primary border-top">
                          <td className="ps-4 py-3 fw-bold">Total</td>
                          <td className="py-3 fw-bold"><CurrencyFormatter
                            amount={totalshareconvert}
                            currency={""}
                            digit={0}
                          /></td>
                          <td className="py-3 fw-bold">100%</td>
                          <td className="py-3 fw-bold text-success">
                            {CurrDisplay ? CurrDisplay.split(' ')[1] : '$'}
                            {calculateTotalValue ? calculateTotalValue() : '0.00'}
                          </td>
                          <td className="pe-4 py-3"></td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Enhanced Founder Details Modal */}
            {selectedFounder && (
              <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content border-0 shadow-lg">
                    <div className="modal-header bgprimary text-white">
                      <div className="d-flex align-items-center">

                        <div>
                          <h5 className="modal-title mb-0 text-white">
                            {selectedFounder.firstName || selectedFounder.firstName !== '' ?
                              `${selectedFounder.firstName} ${selectedFounder.lastName || ''}`.trim() :
                              'Founder Details'
                            }
                          </h5>
                          <p className="mb-0 text-white-50 small">Founder Information & Share Details</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        onClick={() => setSelectedFounder(null)}
                      ></button>
                    </div>

                    <div className="modal-body p-4">
                      <div className="row">
                        {/* Personal Information */}
                        <div className="col-md-6 mb-4">
                          <h6 className="text-uppercase text-muted mb-3 small fw-bold">
                            <i className="bi bi-person me-2"></i>Personal Information
                          </h6>
                          <div className="card bg-light border-0">
                            <div className="card-body">
                              <div className="mb-3">
                                <label className="form-label small text-muted mb-1">First Name</label>
                                <div className="fw-semibold">{selectedFounder.firstName || '-'}</div>
                              </div>
                              <div className="mb-3">
                                <label className="form-label small text-muted mb-1">Last Name</label>
                                <div className="fw-semibold">{selectedFounder.lastName || '-'}</div>
                              </div>
                              <div className="mb-3">
                                <label className="form-label small text-muted mb-1">Email</label>
                                <div className="fw-semibold text-truncate">{selectedFounder.email || '-'}</div>
                              </div>
                              <div>
                                <label className="form-label small text-muted mb-1">Phone</label>
                                <div className="fw-semibold">{selectedFounder.phone || '-'}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Share Information */}
                        <div className="col-md-6 mb-4">
                          <h6 className="text-uppercase text-muted mb-3 small fw-bold">
                            <i className="bi bi-pie-chart me-2"></i>Share Information
                          </h6>
                          <div className="card bg-light border-0">
                            <div className="card-body">
                              <div className="mb-3">
                                <label className="form-label small text-muted mb-1">Shares</label>
                                <div className="fw-semibold fs-5 text-primary">
                                  {(parseInt(selectedFounder.shares) || 0).toLocaleString()}
                                </div>
                              </div>
                              <div className="mb-3">
                                <label className="form-label small text-muted mb-1">Ownership Percentage</label>
                                <div className="fw-semibold fs-5 text-success">
                                  {calculateTotalShares() > 0 ?
                                    (((parseInt(selectedFounder.shares) || 0) / calculateTotalShares()) * 100).toFixed(1) : '0.0'
                                  }%
                                </div>
                              </div>
                              <div className="mb-3">
                                <label className="form-label small text-muted mb-1">Total Value</label>
                                <div className="fw-semibold fs-5 text-success">
                                  {CurrDisplay ? CurrDisplay.split(' ')[1] : '$'}
                                  {calculateFounderValue ? calculateFounderValue(parseInt(selectedFounder.shares) || 0) : '0.00'}
                                </div>
                              </div>
                              <div className="mb-3">
                                <label className="form-label small text-muted mb-1">Price Per Share</label>
                                <div className="fw-semibold">
                                  {CurrDisplay ? CurrDisplay.split(' ')[1] : '$'}{formData.pricePerShare || '0.00'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Share Details */}
                        <div className="col-12">
                          <h6 className="text-uppercase text-muted mb-3 small fw-bold">
                            <i className="bi bi-gear me-2"></i>Share Details
                          </h6>
                          <div className="card bg-light border-0">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-4 mb-3">
                                  <label className="form-label small text-muted mb-1">Share Type</label>
                                  <div className="fw-semibold">
                                    {selectedFounder.shareType === 'common' ?
                                      <span className="badge bg-primary">Common Shares</span> :
                                      selectedFounder.shareType === 'preferred' ?
                                        <span className="badge bg-warning text-dark">Preferred Shares</span> :
                                        selectedFounder.shareType === 'other' && selectedFounder.customShareType ?
                                          <span className="badge bg-secondary">{selectedFounder.customShareType}</span> :
                                          <span className="badge bg-secondary">Other</span>
                                    }
                                  </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                  <label className="form-label small text-muted mb-1">Share Class</label>
                                  <div className="fw-semibold">
                                    {selectedFounder.shareClass === 'other' && selectedFounder.customShareClass ?
                                      selectedFounder.customShareClass :
                                      selectedFounder.shareClass || 'Class A'
                                    }
                                  </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                  <label className="form-label small text-muted mb-1">Voting Rights</label>
                                  <div className="fw-semibold">
                                    {selectedFounder.voting === 'voting' ?
                                      <span className="badge bg-success">Voting</span> :
                                      <span className="badge bg-secondary">Non-Voting</span>
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer border-top-0 bg-light rounded-bottom">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setSelectedFounder(null)}
                      >
                        <i className="bi bi-x-circle me-1"></i>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Description if available */}
        {showField("description") && (
          <div className="col-12">
            <div className="p-3 bg-light rounded-3">
              <span className="text-secondary small fw-semibold text-uppercase">
                Description:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {formData.description || (
                  <span className="text-muted">Not provided</span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Rights if available */}
        {showField("rights") && (
          <div className="col-12">
            <div className="p-3 bg-light rounded-3">
              <span className="text-secondary small fw-semibold text-uppercase">
                Founder Rights & Preferences:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {formData.rights || (
                  <span className="text-muted">Not provided</span>
                )}
              </p>
            </div>
          </div>
        )}



        {/* Note about Round 0 */}
        <div className="col-12">
          <div className="p-3 bg-warning bg-opacity-10 rounded-3">
            <small className="text-muted">
              <strong>Note:</strong> Round 0 represents company incorporation.
              Total shares will carry forward to future rounds, but price per share
              will be recalculated based on investment terms.
            </small>
          </div>
        </div>
      </div>
    </div>
  );

  // Function to render regular investment round content
  const renderInvestmentRoundContent = () => (
    <div className="row g-3">
      {showField("shareclass") && (
        <>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Name of Round:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {formData.nameOfRound || (
                  <span className="text-muted">Not provided</span>
                )}
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Share Class Type:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {selected || (
                  <span className="text-muted">Not provided</span>
                )}
              </p>
            </div>
          </div>

          {selected === "OTHER" && (
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100">
                <span className="text-secondary small fw-semibold text-uppercase">
                  Custom Share Class Name:
                </span>
                <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                  {formData.shareclassother || (
                    <span className="text-muted">Not provided</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {showField("description") && (
        <div className="col-12">
          <div className="p-3 bg-light rounded-3">
            <span className="text-secondary small fw-semibold text-uppercase">
              Description:
            </span>
            <p className="mb-0 mt-1 fw-medium text-dark fs-6">
              {formData.description || (
                <span className="text-muted">Not provided</span>
              )}
            </p>
          </div>
        </div>
      )}

      {showField("instrument") && (
        <>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Investment Instrument:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {formData.instrumentType || (
                  <span className="text-muted">Not provided</span>
                )}
              </p>
            </div>
          </div>

          {formData.instrumentType === "OTHER" && (
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100">
                <span className="text-secondary small fw-semibold text-uppercase">
                  Custom Investment Instrument:
                </span>
                <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                  {formData.customInstrument || (
                    <span className="text-muted">Not provided</span>
                  )}
                </p>
              </div>
            </div>
          )}
          {formData.hasWarrants_preferred && (
            <div className="col-12">
              <div className="p-3 border rounded bg-light">
                <h6>Warrants Details</h6>
                <div className="row">
                  {/* Warrant Coverage */}
                  <div className="col-md-6">
                    <strong>Warrant Coverage:</strong> {formData.warrant_coverage_percentage || "___"}%
                  </div>

                  {/* Exercise Price Method */}
                  <div className="col-md-6">
                    <strong>Exercise Method:</strong>{" "}
                    {formData.warrant_exercise_type === "next_round"
                      ? "Next Round Price (No Adjustment)"
                      : formData.warrant_exercise_type === "next_round_adjusted"
                        ? `Next Round Price ± Adjustment`
                        : "Fixed Price"}
                  </div>

                  {/* Adjustment Details (if applicable) */}
                  {formData.warrant_exercise_type === "next_round_adjusted" && (
                    <>
                      {formData.warrant_adjustment_percent && (
                        <div className="col-md-6">
                          <strong>Adjustment:</strong> {formData.warrant_adjustment_direction === "decrease" ? "Decrease by" : "Increase by"} {formData.warrant_adjustment_percent}%
                        </div>
                      )}


                    </>
                  )}

                  {/* Expiration Date */}
                  {formData.expirationDate_preferred && (
                    <div className="col-md-6">
                      <strong>Expiration Date:</strong> {formData.expirationDate_preferred}
                    </div>
                  )}

                  {/* Warrant Status */}
                  {/* <div className="col-md-6">
                    <strong>Status:</strong>{" "}
                    <span className={`badge ${formData.warrant_status === 'pending' ? 'bg-warning' : 'bg-success'}`}>
                      {formData.warrant_status === 'pending' ? 'Will exercise in next round' : 'Exercised'}
                    </span>
                  </div> */}

                  {/* Calculated Values (if already exercised) */}
                  {formData.calculated_exercise_price && (
                    <div className="col-md-6">
                      <strong>Calculated Exercise Price:</strong> ${formData.calculated_exercise_price}
                    </div>
                  )}

                  {formData.calculated_warrant_shares && (
                    <div className="col-md-6">
                      <strong>Warrant Shares:</strong> {Number(formData.calculated_warrant_shares).toLocaleString()} shares
                    </div>
                  )}

                  {formData.warrant_coverage_amount && (
                    <div className="col-md-6">
                      <strong>Warrant Value:</strong> ${Number(formData.warrant_coverage_amount).toLocaleString()}
                    </div>
                  )}

                  {/* Warrant Notes */}
                  {formData.warrant_notes && (
                    <div className="col-12 mt-2">
                      <strong>Additional Terms:</strong>
                      <div className="small text-muted">{formData.warrant_notes}</div>
                    </div>
                  )}

                  {/* Important Note */}
                  <div className="col-12 mt-3">
                    <div className="alert alert-info py-2 mb-0 small">
                      <i className="bi bi-calculator me-1"></i>
                      <strong>Calculation Logic:</strong>
                      <ul className="mb-0 mt-1 small">
                        <li>Exercise Price = Next Round Price {formData.warrant_adjustment_direction === "decrease" ? "minus" : "plus"} {formData.warrant_adjustment_percent || "___"}%</li>
                        <li>Warrant Shares = (New shares in next round) × {formData.warrant_coverage_percentage || "___"}%</li>
                        <li>Calculated automatically when next priced round closes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Instrument Specific Details */}
          {formData.instrumentType === "Common Stock" && formData.common_stock_valuation && (
            <div className="col-12">
              <div className="p-3 border rounded bg-light">
                <h6>Common Stock Details</h6>
                <div className="row">
                  <div className="col-md-6">
                    <strong>Company Valuation:</strong> ${Number(formData.common_stock_valuation).toLocaleString()}
                  </div>
                  {formData.hasWarrants && (
                    <>
                      <div className="col-md-6">
                        <strong>Warrants:</strong> Yes
                      </div>
                      {formData.exercisePrice && (
                        <div className="col-md-6">
                          <strong>Exercise Price:</strong> ${formData.exercisePrice}
                        </div>
                      )}
                      {formData.expirationDate && (
                        <div className="col-md-6">
                          <strong>Expiration Date:</strong> {formData.expirationDate}
                        </div>
                      )}
                      {formData.warrantRatio && (
                        <div className="col-md-6">
                          <strong>Warrant Ratio:</strong> {formData.warrantRatio}
                        </div>
                      )}
                      {formData.warrantType && (
                        <div className="col-md-6">
                          <strong>Warrant Type:</strong> {formData.warrantType}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {formData.instrumentType === "Preferred Equity" && formData.preferred_valuation && (
            <div className="col-12">
              <div className="p-3 border rounded bg-light">
                <h6>Preferred Equity Details</h6>
                <div className="row">
                  <div className="col-md-6">
                    <strong>Company Valuation:</strong> ${Number(formData.preferred_valuation).toLocaleString()}
                  </div>
                  {formData.hasWarrants_preferred && (
                    <>
                      <div className="col-md-6">
                        <strong>Warrants:</strong> Yes
                      </div>

                      {formData.preferred_valuation && (
                        <div className="col-md-6">
                          <strong>Company Valuation:</strong> ${formData.preferred_valuation}
                        </div>
                      )}

                      {formData.warrant_coverage_percentage && (
                        <div className="col-md-6">
                          <strong>Warrant Coverage:</strong> {formData.warrant_coverage_percentage}%
                        </div>
                      )}

                      {formData.warrant_adjustment_direction && (
                        <div className="col-md-6">
                          <strong>Adjustment Direction:</strong> {formData.warrant_adjustment_direction}
                        </div>
                      )}

                      {formData.warrant_adjustment_percent && (
                        <div className="col-md-6">
                          <strong>Adjustment Percent:</strong> {formData.warrant_adjustment_percent}%
                        </div>
                      )}

                      {formData.expirationDate_preferred && (
                        <div className="col-md-6">
                          <strong>Expiration Date:</strong> {formData.expirationDate_preferred}
                        </div>
                      )}

                      {formData.warrantType_preferred && (
                        <div className="col-md-6">
                          <strong>Warrant Type:</strong> {formData.warrantType_preferred}
                        </div>
                      )}
                    </>
                  )}

                </div>
              </div>
            </div>
          )}

          {formData.instrumentType === "Safe" && (
            <div className="col-12">
              <div className="p-3 border rounded bg-light">
                <h6>SAFE Details</h6>
                <div className="row">
                  {formData.valuationCap && (
                    <div className="col-md-6">
                      <strong>Valuation Cap:</strong>
                      <CurrencyFormatter
                        amount={formData.valuationCap}
                        currency={CurrDisplay}
                      />

                    </div>
                  )}
                  {formData.discountRate && (
                    <div className="col-md-6">
                      <strong>Discount Rate:</strong>
                      <CurrencyFormatter
                        amount={formData.discountRate}
                        currency={""}
                      />
                      %
                    </div>
                  )}
                  {formData.safeType && (
                    <div className="col-md-6">
                      <strong>SAFE Type:</strong> {formData.safeType === "PRE_MONEY" ? "Pre-Money" : "Post-Money"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {formData.instrumentType === "Convertible Note" && (formData.shareClassType === 'Seed' || formData.shareClassType === "Pre-Seed" || formData.shareClassType === "Post-Seed") && (
            <div className="col-12">
              <div className="p-3 border rounded bg-light">
                <h6>Convertible Note Details</h6>
                <div className="row">
                  {formData.valuationCap_note && (
                    <div className="col-md-6">
                      <strong>Valuation Cap:</strong>
                      <CurrencyFormatter
                        amount={formData.valuationCap_note}
                        currency={CurrDisplay}
                      />

                    </div>
                  )}
                  {formData.discountRate_note && (
                    <div className="col-md-6">
                      <strong>Discount Rate:</strong> {
                        formData.discountRate_note || formData.discountRate_note === "0"
                          ? Number(formData.discountRate_note).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                          : <span className="text-muted">Not provided</span>
                      }
                      %
                    </div>
                  )}
                  {formData.maturityDate && (
                    <div className="col-md-6">
                      <strong>Maturity Date:</strong> {formData.maturityDate}
                    </div>
                  )}
                  {formData.interestRate_note && (
                    <div className="col-md-6">
                      <strong>Interest Rate:</strong> {formData.interestRate_note}%
                    </div>
                  )}
                  {formData.convertibleTrigger && (
                    <div className="col-md-6">
                      <strong>Conversion Trigger:</strong> {formData.convertibleTrigger}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {formData.instrumentType === "Venture/Bank DEBT" && (
            <div className="col-12">
              <div className="p-3 border rounded bg-light">
                <h6>Venture/Bank Debt Details</h6>
                <div className="row">
                  {formData.interestRate && (
                    <div className="col-md-6">
                      <strong>Interest Rate:</strong> {formData.interestRate}%
                    </div>
                  )}
                  {formData.repaymentSchedule && (
                    <div className="col-md-6">
                      <strong>Repayment Schedule:</strong> {formData.repaymentSchedule} months
                    </div>
                  )}
                  {formData.hasWarrants_Bank && (
                    <>
                      <div className="col-md-6">
                        <strong>Warrants:</strong> Yes
                      </div>
                      {formData.exercisePrice_bank && (
                        <div className="col-md-6">
                          <strong>Exercise Price:</strong> ${formData.exercisePrice_bank}
                        </div>
                      )}
                      {formData.exercisedate_bank && (
                        <div className="col-md-6">
                          <strong>Expiration Date:</strong> {formData.exercisedate_bank}
                        </div>
                      )}
                      {formData.warrantRatio_bank && (
                        <div className="col-md-6">
                          <strong>Warrant Ratio:</strong> {formData.warrantRatio_bank}
                        </div>
                      )}
                      {formData.warrantType_bank && (
                        <div className="col-md-6">
                          <strong>Warrant Type:</strong> {formData.warrantType_bank}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {showField("roundsize") && (
        <>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Investment Amount:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">


                <CurrencyFormatter
                  amount={formData.roundsize}
                  currency={CurrDisplay}
                />

              </p>
            </div>
          </div>
          {/* {formData.instrumentType !== 'Convertible Note' && formData.instrumentType !== 'Safe' && formData.instrumentType !== 'Preferred Equity' && (
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100">
                <span className="text-secondary small fw-semibold text-uppercase">
                  Investor Post-Money Ownership(%):
                </span>
                <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                  {
                    formData.investorPostMoney || formData.investorPostMoney === "0"
                      ? Number(formData.investorPostMoney).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                      : <span className="text-muted">Not provided</span>
                  }

                </p>
              </div>
            </div>
          )} */}
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Currency:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {CurrDisplay || (
                  <span className="text-muted">Not provided</span>
                )}
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Target Investment Amount:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                <CurrencyFormatter
                  amount={formData.round_target_money}
                  currency={CurrDisplay}
                />
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">

              <span className="text-secondary small fw-semibold text-uppercase">
                {(formData.instrumentType === "Safe") || (formData.instrumentType === "Convertible Note") ? "Company Valuation" : "Pre-Money Valuation"}
              </span>

              <p className="mb-0 mt-1 fw-medium text-dark fs-6">


                <CurrencyFormatter
                  amount={formData.pre_money}
                  currency={CurrDisplay}
                />

              </p>
            </div>
          </div>
          {(() => {
            const isSafe = formData.instrumentType !== 'Safe';
            const isConvertibleNote = formData.instrumentType !== 'Convertible Note';
            const isSeedType = ["Seed", "Pre-Seed", "Post-Seed"].includes(formData.shareClassType);
            const isSeriesType = selected?.includes("Series");

            // Hide if any of these conditions are true
            const shouldHide =

              // Safe + Series types
              // Convertible Note + Seed types
              (formData.instrumentType === "OTHER") || (formData.instrumentType === "Preferred Equity") || (formData.instrumentType === "Common Stock"); // Convertible Note + Series types

            return shouldHide && (
              <div className="col-md-6">
                <div className="p-3 bg-light rounded-3 h-100">
                  <span className="text-secondary small fw-semibold text-uppercase">
                    Post-Money Valuation
                  </span>
                  <p className="mb-0 mt-1 fw-medium text-dark fs-6">

                    <CurrencyFormatter
                      amount={formData.post_money}
                      currency={CurrDisplay}
                    />
                  </p>
                </div>
              </div>
            );
          })()}
          {
            (
              (formData.instrumentType === 'Safe') || (formData.instrumentType === 'Preferred Equity') ||
              (formData.instrumentType === 'Convertible Note') || formData.instrumentType === 'Common Stock'
            ) && (
              <div className="col-md-6">
                <div className="p-3 bg-light rounded-3 h-100">
                  <span className="text-secondary small fw-semibold text-uppercase">
                    Pre-Money Option Pool (%)
                  </span>
                  <p className="mb-0 mt-1 fw-medium text-dark fs-6">

                    <CurrencyFormatter
                      amount={formData.optionPoolPercent}
                      currency={""}
                    />%
                  </p>
                </div>
              </div>
            )
          }

          <div className="col-md-6">
            <div className="p-3 bg-light rounded-3 h-100">
              <span className="text-secondary small fw-semibold text-uppercase">
                Post-Money Option Pool (%)
              </span>

              <p className="mb-0 mt-1 fw-medium text-dark fs-6">

                <CurrencyFormatter
                  amount={formData.optionPoolPercent_post}
                  currency={""}
                />%
              </p>
            </div>
          </div>

          {(() => {
            const isSafe = formData.instrumentType === 'Safe';
            const isCommon = formData.instrumentType === 'Common Stock';
            const isConvertibleNote = formData.instrumentType === 'Convertible Note';
            const isSeedType = ["Seed", "Pre-Seed", "Post-Seed"].includes(formData.shareClassType);
            const isSeriesType = selected?.includes("Series");

            // Hide if any of these conditions are true
            const shouldHide =
              (isCommon) ||
              (isSafe && isSeedType) ||     // Safe + Series types
              (isSafe && isSeriesType) ||
              (isConvertibleNote && isSeriesType) ||
              (isConvertibleNote && isSeedType) || (formData.instrumentType === 'Preferred Equity'); // Convertible Note + Series types

            return !shouldHide && (
              <div className="col-md-6">
                <div className="p-3 bg-light rounded-3 h-100">
                  <span className="text-secondary small fw-semibold text-uppercase">
                    Total Shares Issued in this Round
                  </span>

                  {/* Show shares for all rounds EXCEPT Seed+Safe */}
                  {!(selected === 'Seed' && formData.instrumentType === 'Safe') && (
                    <p className="mb-0 mt-1 fw-medium text-dark fs-6">


                      <CurrencyFormatter
                        amount={formData.issuedshares}
                        currency={CurrDisplay}
                      />

                    </p>
                  )}

                  {/* Seed+Safe ke liye message show karein */}
                  {selected === 'Seed' && formData.instrumentType === 'Safe' && (
                    <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                      <span className="text-muted">Not applicable for SAFE notes</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })()}

        </>
      )}

      {showField("issuedshares") && (
        <>


          {formData.roundStatus && (
            <div className="col-md-6">
              <div className="p-3 bg-light rounded-3 h-100">
                <span className="text-secondary small fw-semibold text-uppercase">
                  Round Status:
                </span>
                <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                  {formData.roundStatus}
                  {formData.roundStatus === "CLOSED" && formData.dateroundclosed && (
                    <span className="text-muted small d-block mt-1">
                      Closed on: {formData.dateroundclosed}
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {showField("rights") && (
        <div className="col-12">
          <div className="p-3 bg-light rounded-3">
            <span className="text-secondary small fw-semibold text-uppercase">
              Rights & Preferences:
            </span>
            <p className="mb-0 mt-1 fw-medium text-dark fs-6">
              {formData.rights || (
                <span className="text-muted">Not provided</span>
              )}
            </p>
          </div>
        </div>
      )}

      {showField("liquidation") && formData.instrumentType === "Preferred Equity" && (
        <>
          <div className="col-12">
            <div className="p-3 bg-light rounded-3">
              <span className="text-secondary small fw-semibold text-uppercase">
                Liquidation Preference:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {formData.liquidationpreferences || (
                  <span className="text-muted">Not provided</span>
                )}
              </p>
            </div>
          </div>

          <div className="col-12">
            <div className="p-3 bg-light rounded-3">
              <span className="text-secondary small fw-semibold text-uppercase">
                Liquidation Type:
              </span>
              <p className="mb-0 mt-1 fw-medium text-dark fs-6">
                {formData.liquidation && formData.liquidation.length > 0 ? (
                  formData.liquidation.join(", ")
                ) : (
                  <span className="text-muted">Not provided</span>
                )}
              </p>
              {formData.liquidation && formData.liquidation.includes("OTHER") && formData.liquidationOther && (
                <p className="mb-0 mt-2 fw-medium text-dark">
                  <strong>Custom:</strong> {formData.liquidationOther}
                </p>
              )}
            </div>
          </div>
        </>
      )}






      {showField("termsheet") && formData.termsheetFile && formData.termsheetFile.length > 0 && (
        <div className="col-12">
          <div className="p-3 bg-light rounded-3">
            <span className="text-secondary small fw-semibold text-uppercase">
              Term Sheet Files:
            </span>
            <ul className="mb-0 mt-2 ps-3">
              {formData.termsheetFile.map((file, index) => (
                <li key={index} className="mb-1 fw-medium text-dark">
                  <i className="bi bi-file-earmark-text me-2 text-primary"></i>
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {showField("subscription") && formData.subscriptiondocument && formData.subscriptiondocument.length > 0 && (
        <div className="col-12">
          <div className="p-3 bg-light rounded-3">
            <span className="text-secondary small fw-semibold text-uppercase">
              Subscription Documents:
            </span>
            <ul className="mb-0 mt-2 ps-3">
              {formData.subscriptiondocument.map((file, index) => (
                <li key={index} className="mb-1 fw-medium text-dark">
                  <i className="bi bi-file-earmark-text me-2 text-primary"></i>
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="previous-section-summary mb-4 p-4 bg-white border rounded-3 shadow-sm">
      <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
        <div
          style={{ width: "45px", height: "45px" }}
          className="bg-success d-flex justify-content-center align-items-center bg-opacity-10 flex-shrink-0 p-1 rounded-circle me-3"
        >
          <VscOpenPreview />
        </div>
        <div>
          <h3 className="mb-0 fw-semibold text-dark">
            {isFirstRound ? "Round 0 - Incorporation Summary" : "Preview Summary"}
          </h3>
          <p className="text-muted small mb-0">
            {isFirstRound
              ? "Founder shares allocation at incorporation"
              : "Review your inputs before proceeding"}
          </p>
        </div>
      </div>

      {isFirstRound ? renderRound0Content() : renderInvestmentRoundContent()}
    </div>
  );
};

export default PreviousSection;