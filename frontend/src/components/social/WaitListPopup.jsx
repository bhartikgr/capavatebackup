import React, { useState, useEffect } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import DataTable from "react-data-table-component";
import '../../assets/style/sidebar.css'
import { CircleX, Eye, Download, Mail, Phone, MapPin, Calendar, Building, User } from 'lucide-react'
import { API_BASE_URL } from '../../config/config';
import axios from "axios";

const validationSchema = Yup.object({
    companyName: Yup.string().required('Company name is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required')
})

export default function WaitListPopup({ setShowModal }) {
    const apiUrlRound = API_BASE_URL + "api/user/capitalround/";
    const apiUrl_waitlist = API_BASE_URL + "api/user/waitlist/";
    const [countrySymbolList, setCountrysymbollist] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [records, setrecords] = useState([]);
    const [messageAll, setmessageAll] = useState("");
    const [errr, seterrr] = useState(false);
    const storedUsername = localStorage.getItem("SignatoryLoginData");
    const userLogin = storedUsername ? JSON.parse(storedUsername) : null;
    const [searchText, setSearchText] = useState("");
    const [allinvestorwaitlist, setallinvestorwaitlist] = useState([]);
    const [loading, setLoading] = useState(false);

    // New state for view popup
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [selectedInvestor, setSelectedInvestor] = useState(null);

    useEffect(() => {
        getallcountrySymbolList();
        getInvestorWaitList();
    }, []);

    const getallcountrySymbolList = async () => {
        let formData = {
            id: "",
        };
        try {
            const res = await axios.post(
                apiUrlRound + "getallcountrySymbolList",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            var respo = res.data.results;
            setCountrysymbollist(respo);
        } catch (err) {
            console.error("Error fetching country list:", err);
        }
    };

    const getInvestorWaitList = async () => {
        // Check if userLogin and companies exist
        if (!userLogin?.companies?.[0]?.id) {
            console.error("No company ID available");
            return;
        }

        setLoading(true);

        let formData = {
            company_id: userLogin.companies[0].id,
        };

        try {
            const res = await axios.post(
                apiUrl_waitlist + "getInvestorWaitList",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("API Response:", res.data); // Debug log

            // Check if response is successful and has results
            if (res.data.status === "1") {
                setallinvestorwaitlist(res.data.results || []);
            } else {
                console.error("Error from server:", res.data.message);
                setallinvestorwaitlist([]);
            }
        } catch (err) {
            console.error("Error fetching waitlist:", err);
            setallinvestorwaitlist([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle view button click
    const handleViewInvestor = (row) => {
        setSelectedInvestor(row);
        setShowViewPopup(true);
    };

    // Handle download/export investor data
    const handleDownloadInvestor = (row) => {
        // Create a formatted text with investor details
        const investorData = `
INVESTOR DETAILS
================
Company: ${row.company_name || 'N/A'}
Name: ${row.first_name || ''} ${row.last_name || ''}
Email: ${row.email || 'N/A'}
Phone: ${row.phone || 'N/A'}
City: ${row.city || 'N/A'}
Country: ${row.country || 'N/A'}
Sent Date: ${formatCurrentDate(row.created_at) || 'N/A'}
Joined Date: ${formatCurrentDate(row.joined_date) || 'N/A'}
        `;

        // Create a blob and download
        const blob = new Blob([investorData], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${row.first_name}_${row.last_name}_details.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        // Show success message
        setmessageAll("Investor details downloaded successfully!");
        seterrr(false);
        setTimeout(() => setmessageAll(""), 3000);
    };

    // Map country options based on API response structure
    const customStyles = {
        table: {
            style: {
                border: "1px solid #dee2e6",
                borderRadius: "12px",
                overflow: "hidden", // visible se hidden karo
                // display: "table",   // yeh add karo
                width: "100%",
            },
        },
        headCells: {
            style: {
                backgroundColor: "#efefef",
                fontWeight: "600",
                fontSize: "0.8rem",
                color: "#000",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
            },
        },
        cells: {
            style: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
        },
        rows: {
            style: {
                fontSize: "0.8rem",
                fontWeight: "500",
            },
            stripedStyle: {
                backgroundColor: "#fff",
            },
        },
        pagination: {
            style: {
                marginTop: "15px",
                backgroundColor: "#fafafa",
                padding: "12px 16px",
            },
        },
        headRow: {
            style: {
                backgroundColor: "#efefef",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
            },
        },
        // REMOVE tableWrapper and responsiveWrapper — yahi problem tha
    };

    const conditionalRowStyles = [
        {
            when: (row) => true, // apply to all rows
            style: {
                "&:hover": {
                    backgroundColor: "var(--lightRed)", // apna hover color
                },
            },
        },
    ];

    const filteredData = records.filter((item) => {
        const text = (searchText || "").toLowerCase();
        return (
            (item.shareClassType || "").toLowerCase().includes(text) ||
            (item.nameOfRound || "").toLowerCase().includes(text) ||
            (item.currency || "").toLowerCase().includes(text) ||
            (item.issuedshares || "").toLowerCase().includes(text)
        );
    });

    // Updated columns with Action button
    const columns = [
        {
            name: "S.No",
            selector: (row, index) => index + 1,
            width: "70px",
            sortable: true,
        },
        {
            name: "Company Name",
            selector: (row) => row.company_name || "-",
            sortable: true,
        },
        {
            name: "First Name",
            selector: (row) => row.first_name || "-",
            sortable: true,
        },
        {
            name: "Last Name",
            selector: (row) => row.last_name || "-",
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email || "-",
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row.phone || "-",
            sortable: true,
        },
        {
            name: "City",
            selector: (row) => row.city || "-",
            sortable: true,
        },
        {
            name: "Country",
            selector: (row) => row.country || "-",
            sortable: true,
        },
        {
            name: "Sent Date",
            selector: (row) => formatIncorporationDate(row.created_at),
            sortable: true,
        },
        {
            name: "Joined Date",
            selector: (row) => formatIncorporationDate(row.joined_date),
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm btn-info text-white"
                        onClick={() => handleViewInvestor(row)}
                        title="View Details"
                        style={{
                            padding: '5px 10px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: '#17a2b8'
                        }}
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        className="btn btn-sm btn-success text-white"
                        onClick={() => handleDownloadInvestor(row)}
                        title="Download Details"
                        style={{
                            padding: '5px 10px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: '#28a745'
                        }}
                    >
                        <Download size={16} />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    function formatCurrentDate(input) {
        if (!input) return "N/A";
        const date = new Date(input);
        if (isNaN(date)) return "N/A";

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

    const formatIncorporationDate = (value) => {
        if (!value) return "Not provided";

        // Only year
        if (/^\d{4}$/.test(value)) {
            return value;
        }

        // Full date
        return formatCurrentDate(value);
    };

    // Close view popup
    const closeViewPopup = () => {
        setShowViewPopup(false);
        setSelectedInvestor(null);
    };

    return (
        <>
            {/* Main Popup */}
            <div className='modal fade show form-pop' style={{ display: 'block' }}>
                <div className='modal-dialog modal-dialog-centered modal-xl waitlist'>
                    {messageAll && (
                        <div
                            className={`shadow-lg ${errr ? "error_pop" : "success_pop"
                                }`}
                            style={{
                                position: 'fixed',
                                top: '20px',
                                right: '20px',
                                zIndex: 9999
                            }}
                        >
                            <div className="d-flex align-items-center gap-2">
                                <span className="d-block">{messageAll}</span>
                            </div>

                            <button
                                type="button"
                                className="close_btnCros"
                                onClick={() => setmessageAll("")}
                            >
                                ×
                            </button>
                        </div>
                    )}

                    <div className='modal-content rounded-4 shadow-lg border-0 '>
                        <div className='p-4'>
                            <div className='d-flex align-items-start gap-3 mb-4'>
                                <div
                                    className='rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 bg-danger-subtle text-danger'
                                    style={{ width: '45px', height: '45px' }}
                                >
                                    <svg
                                        width='28'
                                        height='28'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                    >
                                        <path
                                            d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'
                                            strokeLinecap='round'
                                        />
                                        <circle cx='12' cy='7' r='4' />
                                    </svg>
                                </div>
                                <div className='flex-grow-1'>
                                    <div className='d-flex form-pop-head justify-content-between gap-2 align-items-start'>
                                        <div className='d-flex flex-column gap-1'>
                                            <h4>Investors Wait List</h4>
                                        </div>
                                        <button
                                            type='button'
                                            className='close_btn_pop'
                                            onClick={() => setShowModal(false)}
                                        >
                                            <CircleX />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div
                                className='rounded-3 p-3 mb-4 bg_light border-start border-4 border-danger '
                                style={{ fontSize: '0.8rem', lineHeight: '1.6' }}
                            >
                                Track and manage all investors who have joined the waitlist for your company.
                                Monitor their details and application status. Click the <Eye size={14} /> icon to view complete details.
                            </div>

                            <div className="d-flex flex-column justify-content-between align-items-start tb-box">
                                <div style={{ width: '100%', overflowX: 'auto' }}>
                                    <DataTable
                                        customStyles={customStyles}
                                        conditionalRowStyles={conditionalRowStyles}
                                        columns={columns}
                                        className="datatb-report"
                                        data={allinvestorwaitlist}
                                        pagination
                                        paginationPerPage={10}
                                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                        highlightOnHover
                                        striped
                                        responsive
                                        progressPending={loading}
                                        progressComponent={<div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>}
                                        noDataComponent={<div style={{ padding: '20px', textAlign: 'center' }}>No investors found in waitlist</div>}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Investor Details Popup */}
            {showViewPopup && selectedInvestor && (
                <>
                    <div className='modal fade show form-pop' style={{ display: 'block', zIndex: 1060 }}>
                        <div className='modal-dialog modal-dialog-centered modal-lg '>
                            <div className='modal-content rounded-4 shadow-lg border-0'>
                                <div className='p-4'>
                                    <div className='d-flex justify-content-between align-items-center mb-4'>
                                        <h5 className='m-0'>Investor Details</h5>
                                        <button
                                            type='button'
                                            className='close_btn_pop'
                                            onClick={closeViewPopup}
                                        >
                                            <CircleX size={24} />
                                        </button>
                                    </div>

                                    <div className='investor-details'>
                                        {/* Profile Header */}
                                        <div className='text-center mb-4'>
                                            <div className='bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3'
                                                style={{ width: '80px', height: '80px', fontSize: '32px', fontWeight: 'bold' }}>
                                                {selectedInvestor.first_name?.charAt(0)}{selectedInvestor.last_name?.charAt(0)}
                                            </div>
                                            <h4>{selectedInvestor.first_name} {selectedInvestor.last_name}</h4>
                                            <span className='badge bg-success px-3 py-2'>Waitlist Member</span>
                                        </div>

                                        {/* Details Grid */}
                                        <div className='row g-3'>
                                            <div className='col-12'>
                                                <div className='d-flex align-items-center gap-3 p-3 bg-light rounded-3'>
                                                    <Building className='text-primary' size={20} />
                                                    <div>
                                                        <small className='text-muted d-block'>Company</small>
                                                        <strong>{selectedInvestor.company_name || 'Not provided'}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-6'>
                                                <div className='d-flex align-items-center gap-3 p-3 bg-light rounded-3'>
                                                    <User className='text-primary' size={20} />
                                                    <div>
                                                        <small className='text-muted d-block'>First Name</small>
                                                        <strong>{selectedInvestor.first_name}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-6'>
                                                <div className='d-flex align-items-center gap-3 p-3 bg-light rounded-3'>
                                                    <User className='text-primary' size={20} />
                                                    <div>
                                                        <small className='text-muted d-block'>Last Name</small>
                                                        <strong>{selectedInvestor.last_name}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-12'>
                                                <div className='d-flex align-items-center gap-3 p-3 bg-light rounded-3'>
                                                    <Mail className='text-primary' size={20} />
                                                    <div>
                                                        <small className='text-muted d-block'>Email</small>
                                                        <strong>{selectedInvestor.email}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-12'>
                                                <div className='d-flex align-items-center gap-3 p-3 bg-light rounded-3'>
                                                    <Phone className='text-primary' size={20} />
                                                    <div>
                                                        <small className='text-muted d-block'>Phone</small>
                                                        <strong>{selectedInvestor.phone}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-6'>
                                                <div className='d-flex align-items-center gap-3 p-3 bg-light rounded-3'>
                                                    <MapPin className='text-primary' size={20} />
                                                    <div>
                                                        <small className='text-muted d-block'>City</small>
                                                        <strong>{selectedInvestor.city}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-6'>
                                                <div className='d-flex align-items-center gap-3 p-3 bg-light rounded-3'>
                                                    <MapPin className='text-primary' size={20} />
                                                    <div>
                                                        <small className='text-muted d-block'>Country</small>
                                                        <strong>{selectedInvestor.country}</strong>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-12'>
                                                <div className='d-flex align-items-center gap-3 p-3 bg-light rounded-3'>
                                                    <Calendar className='text-primary' size={20} />
                                                    <div>
                                                        <small className='text-muted d-block'>Sent Date</small>
                                                        <strong>{formatCurrentDate(selectedInvestor.created_at)}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-12'>
                                                <div className='d-flex align-items-center gap-3 p-3 bg-light rounded-3'>
                                                    <Calendar className='text-primary' size={20} />
                                                    <div>
                                                        <small className='text-muted d-block'>Joined Date</small>
                                                        <strong>{formatCurrentDate(selectedInvestor.joined_date)}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className='d-flex gap-3 mt-4'>
                                            {/* <button
                                                className='btn btn-primary flex-grow-1'
                                                onClick={() => {
                                                    window.location.href = `mailto:${selectedInvestor.email}`;
                                                }}
                                            >
                                                <Mail size={16} className='me-2' />
                                                Send Email
                                            </button> */}
                                            <button
                                                className='btn btn-outline-primary'
                                                onClick={() => handleDownloadInvestor(selectedInvestor)}
                                            >
                                                <Download size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className='modal-backdrop fade show'
                        style={{ zIndex: 1050 }}
                        onClick={closeViewPopup}
                    />
                </>
            )}

            {/* Main Modal Backdrop */}
            <div
                className='modal-backdrop fade show'
                onClick={() => setShowModal(false)}
            />
        </>
    )
}