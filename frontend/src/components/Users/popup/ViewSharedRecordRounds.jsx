import React, { useState, useEffect } from "react";
import { VscOpenPreview } from "react-icons/vsc";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
    ModalContainer,
    CloseButton,
    ModalBtn,
    ButtonGroup,
} from "../../Styles/DataRoomStyle.js";
import { FaDownload, FaEye, FaShareAlt } from "react-icons/fa"; // FontAwesome icons
import { API_BASE_URL } from "../../../config/config";
import axios from "axios";
import DataTable from "react-data-table-component"; // Make sure to install this if not already installed
import { Link } from "react-router-dom";
const ViewSharedRecordRounds = ({ onClose, roundid }) => {
    console.log(roundid);
    const storedUsername = localStorage.getItem("SignatoryLoginData");
    const userLogin = JSON.parse(storedUsername);
    const [RecordData, setRecordData] = useState([]);
    const [loading, setLoading] = useState(false);

    var apiURLInvestor = API_BASE_URL + "api/user/investor/";

    function formatCurrentDate(input) {
        const date = new Date(input);
        if (isNaN(date)) return "";
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        const getOrdinal = (n) => {
            if (n >= 11 && n <= 13) return "th";
            switch (n % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return `${month} ${day}${getOrdinal(day)}, ${year}`;
    }

    useEffect(() => {
        if (roundid) {
            getInvestorSharedRoundList();
        }
    }, [roundid]);

    const getInvestorSharedRoundList = async () => {
        setLoading(true);
        let formData = {
            company_id: userLogin.companies[0].id,
            round_id: roundid,
        };

        try {
            const res = await axios.post(
                apiURLInvestor + "getInvestorSharedRoundList",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            const checkData = res.data.results;
            console.log("API Response:", checkData);
            setRecordData(checkData || []);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    // DataTable columns configuration
    const columns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "70px",
        },
        {
            name: "First Name",
            selector: (row) => row.first_name || "N/A",
            sortable: true,
            cell: (row) => (
                <div className="d-flex align-items-center">
                    {row.profile_picture ? (
                        <img
                            src={`${API_BASE_URL}api/upload/investor/inv_${row.investor_id}/${row.profile_picture}`}
                            alt="profile"
                            style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px', objectFit: 'cover' }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: '#CC0000',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '8px',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}>
                            {row.first_name?.charAt(0) || '?'}
                        </div>
                    )}
                    <span>{row.first_name || "N/A"}</span>
                </div>
            ),
        },
        {
            name: "Last Name",
            selector: (row) => row.last_name || "N/A",
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email || "N/A",
            sortable: true,
            cell: (row) => (
                <a href={`mailto:${row.email}`} style={{ color: '#CC0000', textDecoration: 'none' }}>
                    {row.email || "N/A"}
                </a>
            ),
        },
        {
            name: "Phone",
            selector: (row) => row.phone || "N/A",
            sortable: true,
            cell: (row) => (
                <a href={`tel:${row.phone}`} style={{ color: '#2563eb', textDecoration: 'none' }}>
                    {row.phone || "N/A"}
                </a>
            ),
        },
        {
            name: "Investor Type",
            selector: (row) => row.type_of_investor || "N/A",
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.is_register || "N/A",
            sortable: true,
            cell: (row) => (
                <span className={`badge ${row.is_register === 'Yes' ? 'bg-success' : 'bg-warning'}`}>
                    {row.is_register === 'Yes' ? 'Registered' : 'Pending'}
                </span>
            ),
        },
        {
            name: "Sent Date",
            selector: (row) => formatCurrentDate(row.sent_date),
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex gap-2">

                    <Link target="_blank"
                        to={`/crm/investor-report-detail-record-round/${row.investor_id}`}
                        title="View Participating Round"

                        className="icon_btn blue_clr"
                    >
                        <FaEye /> View Participating  Investment
                    </Link>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "300px", // Increased width to accommodate both buttons
        },
    ];

    // Custom styles for DataTable
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #CC0000',
            },
        },
        headCells: {
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#333',
                padding: '12px',
            },
        },
        rows: {
            style: {
                fontSize: '13px',
                '&:hover': {
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer',
                },
            },
        },
        cells: {
            style: {
                padding: '12px',
            },
        },
    };

    return (
        <div className="main_popup-overlay">
            <ModalContainer style={{ maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto' }}>
                <CloseButton onClick={onClose}>×</CloseButton>

                <div className="previous-section-summary mb-4 p-4 bg-white border rounded-3 shadow-sm">
                    <div className="d-flex align-items-center mb-3 pb-2 border-bottom">
                        <div
                            style={{ width: "45px", height: "45px" }}
                            className="bg-success d-flex justify-content-center align-items-center bg-opacity-10 flex-shrink-0 p-1 rounded-circle me-3"
                        >
                            <VscOpenPreview size={20} />
                        </div>
                        <div className="d-flex align-items-center justify-content-between gap-3 w-100">
                            <h3 className="mb-0 fw-semibold text-dark">
                                Shared Round List
                            </h3>
                            <button
                                type="button"
                                className="bg-transparent text-danger p-1 border-0"
                                onClick={onClose}
                            >
                                <IoCloseCircleOutline size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="mt-4">
                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <DataTable
                                columns={columns}
                                data={RecordData}
                                customStyles={customStyles}
                                pagination
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 25, 50]}
                                highlightOnHover
                                responsive
                                noDataComponent={
                                    <div className="text-center py-4 text-muted">
                                        No investors found for this round
                                    </div>
                                }
                            />
                        )}
                    </div>

                    {/* Summary Stats */}
                    {RecordData.length > 0 && (
                        <div className="row mt-4 g-3">
                            <div className="col-md-4">
                                <div className="bg-light p-3 rounded text-center">
                                    <h6 className="text-muted mb-1">Total Investors</h6>
                                    <h4 className="fw-bold text-dark mb-0">{RecordData.length}</h4>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="bg-light p-3 rounded text-center">
                                    <h6 className="text-muted mb-1">Registered</h6>
                                    <h4 className="fw-bold text-success mb-0">
                                        {RecordData.filter(item => item.is_register === 'Yes').length}
                                    </h4>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="bg-light p-3 rounded text-center">
                                    <h6 className="text-muted mb-1">Pending</h6>
                                    <h4 className="fw-bold text-warning mb-0">
                                        {RecordData.filter(item => item.is_register !== 'Yes').length}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <ButtonGroup className="d-flex gap-2 justify-content-end">
                    <ModalBtn onClick={onClose} className="close_btn w-fit">
                        Close
                    </ModalBtn>
                </ButtonGroup>
            </ModalContainer>
        </div>
    );
};

export default ViewSharedRecordRounds;