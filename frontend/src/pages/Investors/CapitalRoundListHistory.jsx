import React, { useState, useEffect } from "react";
import {
    SectionWrapper,
    Wrapper,
} from "../../components/Styles/RegisterStyles";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import { FaEllipsisV, FaEye, FaHistory, FaTimes } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import SideBar from '../../components/Investor/social/SideBar';
import TopBar from '../../components/Investor/social/TopBar';
import { DataRoomSection } from "../../components/Styles/DataRoomStyle.js";
import { BackButton } from "../../components/Styles/GlobalStyles.js";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/config.js";
import CurrencyFormatter from "../../components/CurrencyFormatter.jsx";
import {
    ModalContainer,
    CloseButton,
    ModalBtn,
    ButtonGroup,
} from "../../components/Styles/DataRoomStyle.js";

function CapitalRoundListHistory() {
    const [open, setOpen] = useState(false);
    const { id, company_id } = useParams();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedInvestment, setSelectedInvestment] = useState(null);
    const [capTableData, setCapTableData] = useState({
        pre_money: { items: [], totals: {} },
        post_money: { items: [], totals: {} }
    });
    const [roundData, setRoundData] = useState(null);
    const [records, setRecords] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [Warrantlist, setWarrantlist] = useState([]);
    document.title = "Company Capital Round List - Investor";

    const customStyles = {
        table: {
            style: {
                minWidth: "100%",
                boxShadow: "0px 3px 12px rgb(0 0 0 / 16%)",
                borderRadius: "12px",
            },
        },
        headCells: {
            style: {
                backgroundColor: "#efefef !important",
                fontWeight: "600",
                fontSize: "0.9rem",
                color: "#000 !important",
                whiteSpace: "nowrap",
            },
        },
        cells: {
            style: {
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                backgroundColor: "#fff !important",
            },
        },
        rows: {
            style: {
                fontSize: "0.8rem",
                fontWeight: "500",
                "&:hover": {
                    backgroundColor: "#e8f0fe",
                },
            },
            stripedStyle: {
                backgroundColor: "#f4f6f8",
            },
        },
        pagination: {
            style: {
                backgroundColor: "#fafafa",
                padding: "12px 16px",
            },
        },
    };

    var apiURL_History = API_BASE_URL + "api/user/investmenthistory/";
    var apiURL_investorreport = API_BASE_URL + "api/user/investorreport/";

    const storedUsername = localStorage.getItem("InvestorData");
    const userLogin = JSON.parse(storedUsername);

    useEffect(() => {
        getInvestmentHistorylist();
        getRoundsDetail();

    }, []);

    const getInvestmentHistorylist = async () => {
        let formData = {
            investor_id: userLogin.id,
            company_id: company_id,
            round_id: id
        };

        try {
            const res = await axios.post(
                apiURL_History + "getInvestmentHistorylist",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Investment History:", res.data.results);
            setRecords(res.data.results);
        } catch (err) {
            console.error("Error fetching investment history:", err);
        }
    };
    const getInvestmentHistoryWarrantlist = async (investorrequest_company_id) => {
        let formData = {
            investor_id: userLogin.id,
            company_id: company_id,
            round_id: id,
            investorrequest_company_id: investorrequest_company_id
        };

        try {
            const res = await axios.post(
                apiURL_History + "getInvestmentHistoryWarrantlist",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(res.data.results);
            setWarrantlist(res.data.results);
        } catch (err) {
            console.error("Error fetching investment history:", err);
        }
    };

    const getRoundsDetail = async () => {
        let formData = {
            investor_id: userLogin.id,
            round_id: id,
            company_id: company_id
        };
        try {
            const res = await axios.post(
                apiURL_investorreport + "getRoundsDetail",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res.data.success) {
                const capTable = res.data.cap_table || {
                    pre_money: { items: [], totals: {} },
                    post_money: { items: [], totals: {} }
                };
                console.log("Round Detail:", res.data);
                setCapTableData(capTable);
                setRoundData(res.data.round || null);
            }
        } catch (err) {
            console.error("Error fetching capital round data:", err);
        }
    };

    const handleViewClick = (row) => {
        getInvestmentHistoryWarrantlist(row.id)
        setSelectedInvestment(row);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedInvestment(null);
    };

    const filteredData = records.filter((item) => {
        const search = searchText.toLowerCase();
        const combinedFields = `
            ${item.nameOfRound || ""}
            ${item.shareClassType || ""}
            ${item.roundsize || ""}
            ${item.issuedshares || ""}
        `.toLowerCase();
        return combinedFields.includes(search);
    });

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

    const handleBackClick = () => {
        navigate("/investor/company-list");
    };

    // Table Columns
    const columns = [

        {
            name: "Shares",
            selector: (row) => Math.round(row.shares || 0),
            sortable: true,
            cell: (row) => (
                <span>
                    <CurrencyFormatter
                        amount={Math.round(row.shares)}
                        currency={row.currency}
                        digit={3}
                    />
                </span>
            ),
        },
        {
            name: "Investment Amount",
            selector: (row) => row.investment_amount || 0,
            sortable: true,
            cell: (row) => (
                <span>
                    <CurrencyFormatter
                        amount={row.investment_amount}
                        currency={row.currency}
                    />
                </span>
            ),
        },
        {
            name: "Request Confirm",
            selector: (row) => row.request_confirm || "No",
            sortable: true,
        },
        {
            name: "Request Sent",
            selector: (row) => formatCurrentDate(row.created_at),
            sortable: true,
        },
        {
            name: "Confirm Date",
            selector: (row) => formatCurrentDate(row.confirm_date),
            sortable: true,
        },

        {
            name: "Action",
            cell: (row) => (
                <button
                    onClick={() => handleViewClick(row)}
                    className="btn btn-sm"
                    style={{
                        padding: "4px 8px",
                        fontSize: "12px",
                        backgroundColor: '#CC0000',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#8B0000'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#CC0000'}
                >
                    <FaEye className="me-1" /> View
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "100px",
        }
    ];

    // Popup Component
    // Popup Component with Fixed Center Display
    const InvestmentPopup = ({ show, onClose, investment, capTable, warrants }) => {
        if (!show || !investment) return null;

        const totals = capTable?.post_money?.totals || {};

        return (
            <div
                className="modal-overlay"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 99999,
                    backdropFilter: 'blur(3px)'
                }}
                onClick={onClose}
            >
                <div
                    className="modal-content"
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '16px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        width: '90%',
                        maxWidth: '800px',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        position: 'relative',
                        animation: 'slideIn 0.3s ease'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with Gradient */}
                    <div style={{
                        background: 'linear-gradient(135deg, #CC0000 0%, #8B0000 100%)',
                        padding: '20px 24px',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                        color: 'white'
                    }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px'
                                }}>
                                    <FaEye size={24} color="white" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
                                        Investment Details
                                    </h3>
                                    <p style={{ margin: '4px 0 0', fontSize: '14px', opacity: 0.9 }}>
                                        Transaction ID: {investment.id}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    color: 'white',
                                    fontSize: '20px'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '24px' }}>
                        {/* Investment Details Card */}
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '12px',
                            padding: '20px',
                            marginBottom: '24px'
                        }}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
                                        INVESTMENT AMOUNT
                                    </label>
                                    <p style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 0', color: '#CC0000' }}>
                                        <CurrencyFormatter amount={investment.investment_amount} currency={investment.currency} />
                                    </p>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>
                                        SHARES ALLOCATED
                                    </label>
                                    <p style={{ fontSize: '24px', fontWeight: '700', margin: '4px 0 0', color: '#2c3e50' }}>
                                        <CurrencyFormatter amount={Math.round(investment.shares)} currency={investment.currency} digit={0} />
                                    </p>
                                </div>
                            </div>

                            <div style={{ height: '1px', backgroundColor: '#dee2e6', margin: '16px 0' }} />

                            <div className="row">
                                <div className="col-md-6">
                                    <div style={{ marginBottom: '12px' }}>
                                        <label style={{ fontSize: '11px', color: '#999', fontWeight: '500' }}>
                                            REQUEST STATUS
                                        </label>
                                        <div>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '6px 16px',
                                                borderRadius: '20px',
                                                fontSize: '13px',
                                                fontWeight: '600',
                                                backgroundColor: investment.request_confirm === 'Yes' ? '#d4edda' : '#fff3cd',
                                                color: investment.request_confirm === 'Yes' ? '#155724' : '#856404'
                                            }}>
                                                {investment.request_confirm === 'Yes' ? '✓ Confirmed' : '⏳ Pending'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div style={{ marginBottom: '12px' }}>
                                        <label style={{ fontSize: '11px', color: '#999', fontWeight: '500' }}>
                                            REQUEST DATE
                                        </label>
                                        <p style={{ fontSize: '14px', fontWeight: '500', margin: '2px 0 0' }}>
                                            {formatCurrentDate(investment.created_at)}
                                        </p>
                                    </div>
                                </div>
                                {investment.confirm_date && (
                                    <div className="col-md-6">
                                        <div style={{ marginBottom: '12px' }}>
                                            <label style={{ fontSize: '11px', color: '#999', fontWeight: '500' }}>
                                                CONFIRM DATE
                                            </label>
                                            <p style={{ fontSize: '14px', fontWeight: '500', margin: '2px 0 0' }}>
                                                {formatCurrentDate(investment.confirm_date)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ✅ Warrants Table Section */}
                        {warrants && warrants.length > 0 && (
                            <div style={{ marginBottom: '24px' }}>
                                <h5 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#333' }}>
                                    Warrants Exercised
                                </h5>
                                <div className="table-responsive">
                                    <table style={{
                                        width: '100%',
                                        borderCollapse: 'collapse',
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}>
                                        <thead>
                                            <tr style={{
                                                backgroundColor: '#f8f9fa',
                                                borderBottom: '2px solid #dee2e6'
                                            }}>
                                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#495057' }}>
                                                    Warrant ID
                                                </th>
                                                <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#495057' }}>
                                                    Shares
                                                </th>
                                                <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#495057' }}>
                                                    Coverage %
                                                </th>
                                                <th style={{ padding: '12px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#495057' }}>
                                                    Exercise Date
                                                </th>
                                                <th style={{ padding: '12px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#495057' }}>
                                                    Status
                                                </th>
                                                {/* <th style={{ padding: '12px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#495057' }}>
                                                    Value
                                                </th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {warrants.map((warrant, index) => {
                                                const isExpired = warrant.is_expired;
                                                const warrantValue = warrant.shares * (investment.share_price || 0);

                                                return (
                                                    <tr key={warrant.id} style={{
                                                        borderBottom: '1px solid #dee2e6',
                                                        backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa'
                                                    }}>
                                                        <td style={{ padding: '12px', fontSize: '14px' }}>
                                                            <span style={{
                                                                display: 'inline-block',
                                                                padding: '4px 8px',
                                                                backgroundColor: '#e7f3ff',
                                                                borderRadius: '4px',
                                                                fontSize: '12px',
                                                                fontWeight: '500'
                                                            }}>
                                                                #{warrant.warrant_id}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>
                                                            {warrant.shares.toLocaleString()}
                                                        </td>
                                                        <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px' }}>
                                                            {warrant.warrant_coverage_percentage}%
                                                        </td>
                                                        <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>
                                                            {formatCurrentDate(warrant.created_at)}
                                                        </td>
                                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                                            <span style={{
                                                                display: 'inline-block',
                                                                padding: '4px 12px',
                                                                borderRadius: '12px',
                                                                fontSize: '12px',
                                                                fontWeight: '600',
                                                                backgroundColor: isExpired ? '#fee2e2' : '#d4edda',
                                                                color: isExpired ? '#b91c1c' : '#155724'
                                                            }}>
                                                                {isExpired ? 'Expired' : 'Exercised'}
                                                            </span>
                                                        </td>
                                                        {/* <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: '#28a745' }}>
                                                            <CurrencyFormatter
                                                                amount={warrantValue}
                                                                currency={investment.currency}
                                                            />
                                                        </td> */}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                        <tfoot style={{ backgroundColor: '#f8f9fa', borderTop: '2px solid #dee2e6' }}>
                                            <tr>
                                                <td style={{ padding: '12px', fontWeight: '600' }} colSpan="1">
                                                    Total
                                                </td>
                                                <td style={{ padding: '12px', textAlign: 'right', fontWeight: '700' }}>
                                                    {warrants.reduce((sum, w) => sum + w.shares, 0).toLocaleString()}
                                                </td>
                                                <td style={{ padding: '12px' }} colSpan="2"></td>
                                                <td style={{ padding: '12px' }} colSpan="1"></td>
                                                {/* <td style={{ padding: '12px', textAlign: 'right', fontWeight: '700', color: '#28a745' }}>
                                                    <CurrencyFormatter
                                                        amount={warrants.reduce((sum, w) => sum + (w.shares * (investment.share_price || 0)), 0)}
                                                        currency={investment.currency}
                                                    />
                                                </td> */}
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Cap Table Summary */}
                        {totals.total_shares > 0 && (
                            <>
                                <h5 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#333' }}>
                                    Round Summary
                                </h5>

                                {/* Stats Cards */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-4">
                                        <div style={{
                                            backgroundColor: '#e3f2fd',
                                            borderRadius: '10px',
                                            padding: '15px',
                                            textAlign: 'center'
                                        }}>
                                            <label style={{ fontSize: '11px', color: '#0d47a1', fontWeight: '600' }}>
                                                TOTAL SHARES
                                            </label>
                                            <p style={{ fontSize: '18px', fontWeight: '700', margin: '5px 0 0', color: '#0d47a1' }}>
                                                {totals.total_shares_formatted}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div style={{
                                            backgroundColor: '#e8f5e9',
                                            borderRadius: '10px',
                                            padding: '15px',
                                            textAlign: 'center'
                                        }}>
                                            <label style={{ fontSize: '11px', color: '#1b5e20', fontWeight: '600' }}>
                                                TOTAL VALUE
                                            </label>
                                            <p style={{ fontSize: '18px', fontWeight: '700', margin: '5px 0 0', color: '#1b5e20' }}>
                                                <CurrencyFormatter
                                                    amount={totals.total_value}
                                                    currency={roundData?.currency}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div style={{
                                            backgroundColor: '#fff3e0',
                                            borderRadius: '10px',
                                            padding: '15px',
                                            textAlign: 'center'
                                        }}>
                                            <label style={{ fontSize: '11px', color: '#bf360c', fontWeight: '600' }}>
                                                YOUR OWNERSHIP
                                            </label>
                                            <p style={{ fontSize: '18px', fontWeight: '700', margin: '5px 0 0', color: '#bf360c' }}>
                                                {((investment.shares || 0) / totals.total_shares * 100).toFixed(2)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Stats */}
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div style={{
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: '8px',
                                            padding: '12px'
                                        }}>
                                            <label style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>
                                                FOUNDERS TOTAL
                                            </label>
                                            <p style={{ fontSize: '16px', fontWeight: '600', margin: '4px 0 0' }}>
                                                <CurrencyFormatter amount={totals.total_founders} currency={investment.currency} digit={0} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div style={{
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: '8px',
                                            padding: '12px'
                                        }}>
                                            <label style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>
                                                OPTION POOL
                                            </label>
                                            <p style={{ fontSize: '16px', fontWeight: '600', margin: '4px 0 0' }}>
                                                <CurrencyFormatter amount={totals.total_option_pool} currency={investment.currency} digit={0} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div style={{
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: '8px',
                                            padding: '12px'
                                        }}>
                                            <label style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>
                                                TOTAL INVESTORS
                                            </label>
                                            <p style={{ fontSize: '16px', fontWeight: '600', margin: '4px 0 0' }}>
                                                <CurrencyFormatter amount={totals.total_investors} currency={investment.currency} digit={0} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div style={{
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: '8px',
                                            padding: '12px'
                                        }}>
                                            <label style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>
                                                NEW SHARES
                                            </label>
                                            <p style={{ fontSize: '16px', fontWeight: '600', margin: '4px 0 0', color: '#28a745' }}>
                                                {totals.total_new_shares_formatted}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{
                        padding: '16px 24px',
                        borderTop: '1px solid #dee2e6',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            onClick={onClose}
                            style={{
                                padding: '10px 24px',
                                backgroundColor: '#CC0000',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#8B0000'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#CC0000'}
                        >
                            Close
                        </button>
                    </div>
                </div>

                <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateY(-30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>
            </div>
        );
    };

    return (
        <main>
            <div className='d-flex align-items-start gap-0'>
                <SideBar />
                <div className='d-flex flex-grow-1 flex-column gap-0'>
                    <TopBar />
                    <SectionWrapper className="d-block p-md-4 p-3">
                        <div className="container-fluid">
                            <DataRoomSection className="d-flex flex-column gap-3">
                                <div className="titleroom flex-wrap gap-3 d-flex justify-content-between align-items-center border-bottom pb-3">
                                    <BackButton
                                        type="button"
                                        className="backbtn"
                                        onClick={handleBackClick}
                                    >
                                        <ArrowLeft size={16} className="me-1" /> back
                                    </BackButton>
                                    <h4 className="mainh1">Investment History</h4>
                                </div>
                                <div className="d-flex justify-content-end p-0">
                                    <input
                                        type="search"
                                        placeholder="Search Here..."
                                        className="textarea_input"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        style={{
                                            padding: "10px",
                                            width: "100%",
                                            maxWidth: "200px",
                                            fontSize: "14px",
                                        }}
                                    />
                                </div>
                                <div className="d-flex overflow-auto flex-column justify-content-between align-items-start tb-box">
                                    <DataTable
                                        customStyles={customStyles}
                                        columns={columns}
                                        className="datatb-report"
                                        data={filteredData}
                                        pagination
                                        highlightOnHover
                                        striped
                                        responsive
                                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                        paginationComponentOptions={{
                                            rowsPerPageText: "Rows per page:",
                                            rangeSeparatorText: "of",
                                            noRowsPerPage: false,
                                            selectAllRowsItem: false,
                                        }}
                                    />
                                </div>
                            </DataRoomSection>
                        </div>
                    </SectionWrapper>
                </div>
            </div>

            {/* Investment Popup */}
            <InvestmentPopup
                show={showPopup}
                onClose={handleClosePopup}
                investment={selectedInvestment}
                capTable={capTableData}
                warrants={Warrantlist}
            />
        </main>
    );
}

export default CapitalRoundListHistory;