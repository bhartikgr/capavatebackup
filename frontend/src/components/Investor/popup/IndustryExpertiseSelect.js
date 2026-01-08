import React, { useState, useEffect } from "react";
import axios from "axios";

const IndustryExpertiseSelect = ({
  selectedIndustries = [],
  onChange,
  apiURL,
}) => {
  const [industries, setIndustries] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIndustry, setNewIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  // Fetch industries on component mount
  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiURL}getIndustryExpertise`);
      setIndustries(res.data.results);
    } catch (err) {
      console.error("Error fetching industries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIndustry = async (e) => {
    e.preventDefault();
    if (!newIndustry.trim()) return;

    setAdding(true);
    try {
      const res = await axios.post(`${apiURL}addIndustryExpertise`, {
        name: newIndustry,
      });

      if (res.data.success) {
        // Add new industry to the list
        setIndustries([...industries, res.data.data]);
        // Add to selected industries
        onChange([
          ...selectedIndustries,
          res.data.data.id || res.data.data.value,
        ]);
        setNewIndustry("");
        setShowAddForm(false);
      }
    } catch (err) {
      console.error("Error adding industry:", err);
    } finally {
      setAdding(false);
    }
  };

  const handleSelectChange = (industryId) => {
    if (selectedIndustries.includes(industryId)) {
      // Remove if already selected
      onChange(selectedIndustries.filter((id) => id !== industryId));
    } else {
      // Add to selection
      onChange([...selectedIndustries, industryId]);
    }
  };

  return (
    <div className="industry-expertise-select">
      {/* Selected industries display */}
      <div className="selected-industries mb-3">
        {selectedIndustries.map((industryId) => {
          const industry = industries.find(
            (ind) => ind.id === industryId || ind.value === industryId
          );
          return industry ? (
            <span key={industryId} className="badge bg-primary me-2 mb-2">
              {industry.name}
              <button
                type="button"
                className="btn-close btn-close-white ms-2"
                onClick={() => handleSelectChange(industryId)}
                aria-label="Remove"
              ></button>
            </span>
          ) : null;
        })}
      </div>

      {/* Multi-select dropdown */}
      <div className="dropdown">
        <button
          className="btn btn-outline-secondary dropdown-toggle w-100"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select Industry Expertise
        </button>
        <ul
          className="dropdown-menu p-2"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {loading ? (
            <li className="dropdown-item">Loading...</li>
          ) : (
            <>
              {industries.map((industry) => (
                <li key={industry.id || industry.value}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`industry-${industry.id}`}
                      checked={selectedIndustries.includes(
                        industry.id || industry.value
                      )}
                      onChange={() =>
                        handleSelectChange(industry.id || industry.value)
                      }
                    />
                    <label
                      className="form-check-label w-100"
                      htmlFor={`industry-${industry.id}`}
                    >
                      {industry.name}
                    </label>
                  </div>
                </li>
              ))}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-primary"
                  onClick={() => setShowAddForm(true)}
                  type="button"
                >
                  + Add New Industry
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Add New Industry Form */}
      {showAddForm && (
        <div className="card mt-3">
          <div className="card-body">
            <form onSubmit={handleAddIndustry}>
              <div className="mb-3">
                <label className="form-label">New Industry Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newIndustry}
                  onChange={(e) => setNewIndustry(e.target.value)}
                  placeholder="Enter industry name"
                  required
                  autoFocus
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewIndustry("");
                  }}
                  disabled={adding}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={adding || !newIndustry.trim()}
                >
                  {adding ? "Adding..." : "Add Industry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryExpertiseSelect;
