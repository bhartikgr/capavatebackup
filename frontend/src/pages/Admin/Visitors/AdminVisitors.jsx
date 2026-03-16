import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import TopBar from "../../../components/Admin/TopBar";
import DataTable from "react-data-table-component";
import { Modal, Button } from "react-bootstrap";
import { FaTrashAlt, FaEye, FaDownload, FaMapMarkerAlt, FaDesktop, FaMobileAlt, FaGlobe } from "react-icons/fa";
import {







    FaCalendar,
    FaCalendarAlt,
    FaCogs,
    FaFingerprint,
    FaCopy,
    FaExternalLinkAlt
} from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import axios from "axios";
import SuccessAlert from "../../../components/Admin/SuccessAlert";
import { BarChart3 } from "lucide-react";

function AdminVisitors() {
    const [visitors, setVisitors] = useState([]);
    const [filteredVisitors, setFilteredVisitors] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedVisitor, setSelectedVisitor] = useState(null);
    const [deleteId, setDeleteId] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalVisitors: 0,
        uniqueDevices: 0,
        mobileVisitors: 0,
        returningVisitors: 0,
        todayVisitors: 0
    });

    const apiUrl = "http://localhost:5000/api/user/";
    document.title = "Visitors Analytics - Admin";
    const detectBrowser = (userAgent) => {
        if (!userAgent) return 'Unknown';
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        if (userAgent.includes('Opera')) return 'Opera';
        return 'Unknown Browser';
    };

    const detectOS = (userAgent) => {
        if (!userAgent) return 'Unknown';
        if (userAgent.includes('Windows')) return 'Windows';
        if (userAgent.includes('Mac OS')) return 'macOS';
        if (userAgent.includes('Linux')) return 'Linux';
        if (userAgent.includes('Android')) return 'Android';
        if (userAgent.includes('iOS') || userAgent.includes('iPhone')) return 'iOS';
        return 'Unknown OS';
    };

    const detectDevice = (userAgent) => {
        if (!userAgent) return 'Unknown';
        if (userAgent.includes('Mobile')) return 'Mobile';
        if (userAgent.includes('Tablet')) return 'Tablet';
        return 'Desktop';
    };
    useEffect(() => {
        fetchVisitors();
        fetchStats();
    }, []);

    // Filter visitors based on search
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredVisitors(visitors);
        } else {
            const filtered = visitors.filter(visitor =>
                Object.values(visitor).some(value =>
                    String(value).toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setFilteredVisitors(filtered);
        }
    }, [searchQuery, visitors]);

    // In fetchVisitors function:
    const fetchVisitors = async () => {
        setLoading(true);
        try {

            const res = await axios.post(
                apiUrl + "visitors",
                {
                    company_id: '',
                }
            );
            // Check response structure
            console.log("Visitors API Response:", res.data);

            if (res.data.success) {
                setVisitors(res.data.visitors || []);
                setFilteredVisitors(res.data.visitors || []);
            } else {
                setVisitors([]);
                setFilteredVisitors([]);
                setSuccessMessage("No visitor data available");
            }
        } catch (err) {
            console.error("Error fetching visitors:", err);
            setSuccessMessage("Failed to load visitor data");
            setVisitors([]);
            setFilteredVisitors([]);
        } finally {
            setLoading(false);
        }
    };

    // In fetchStats function:
    const fetchStats = async () => {
        try {
            const res = await axios.get(apiUrl + "visitor-stats");
            console.log("Stats API Response:", res.data);

            if (res.data.success) {
                setStats(res.data);
            } else {
                setStats({
                    totalVisitors: 0,
                    uniqueDevices: 0,
                    mobileVisitors: 0,
                    returningVisitors: 0,
                    todayVisitors: 0
                });
            }
        } catch (err) {
            console.error("Error fetching stats:", err);
            setStats({
                totalVisitors: 0,
                uniqueDevices: 0,
                mobileVisitors: 0,
                returningVisitors: 0,
                todayVisitors: 0
            });
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleViewDetails = (visitor) => {
        setSelectedVisitor(visitor);
        setShowDetailsModal(true);
    };

    const handleConfirmDelete = async () => {
        try {

            const res = await axios.post(
                apiUrl + "deleteVisitor",
                {
                    deleteId: deleteId,
                }
            );
            setSuccessMessage("Visitor record deleted successfully");
            fetchVisitors();
            fetchStats();
            setShowDeleteModal(false);

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (err) {
            console.error("Error deleting visitor:", err);
            setSuccessMessage("Failed to delete visitor record");
        }
    };

    const handleExportCSV = () => {
        const headers = ["ID", "Country", "State", "IP Address", "Device Type", "Date", "Page URL", "Referrer"];
        const csvData = visitors.map(v => [
            v.id,
            v.country || "Unknown",
            v.state || "-",
            v.ip_address || "Unknown",
            v.device_type || "Unknown",
            new Date(v.date).toLocaleString(),
            v.page_url,
            v.referrer || "Direct"
        ]);

        const csvContent = [
            headers.join(","),
            ...csvData.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `visitors_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
            width: "70px"
        },
        {
            name: "Country",
            selector: (row) => row.country || "Unknown",
            sortable: true,
            cell: (row) => (
                <div className="d-flex align-items-center gap-2">
                    <FaGlobe className="text-primary" />
                    <span>{row.country || "Unknown"}</span>
                </div>
            )
        },
        {
            name: "State",
            selector: (row) => row.state || "-",
            sortable: true
        },
        {
            name: "IP Address",
            selector: (row) => row.ip_address || "Unknown",
            sortable: true
        },

        {
            name: "Date",
            selector: (row) => new Date(row.date).toLocaleString(),
            sortable: true,
            width: "180px"
        },
        {
            name: "Page",
            selector: (row) => row.page_url,
            cell: (row) => (
                <div className="text-truncate" style={{ maxWidth: "200px" }} title={row.page_url}>
                    {row.page_url}
                </div>
            )
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex align-items-center gap-2">
                    <button
                        className="btn btn-sm btn-info text-white"
                        onClick={() => handleViewDetails(row)}
                        title="View Details"
                    >
                        <FaEye />
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(row.id)}
                        title="Delete"
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            ),
            width: "120px"
        }
    ];

    const customStyles = {
        table: {
            style: {
                minWidth: "100%",
                boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
                border: "1px solid #00000036",
                borderRadius: "12px",
                overflow: "hidden",
            },
        },
        headCells: {
            style: {
                backgroundColor: "#ff3f45 !important",
                fontWeight: "600",
                fontSize: "12px",
                color: "#fff !important",
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
                fontSize: "14px",
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

    // Stats Cards Component
    const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
        <div className="col-md-4 col-sm-6">
            <div className={`card border-0 shadow-sm ${bgColor} text-white`}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="card-subtitle mb-2 opacity-75">{title}</h6>
                            <h2 className="card-title mb-0">{value}</h2>
                        </div>
                        <div className={`p-3 rounded-circle ${color}`}>
                            <Icon size={24} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div>
                <div className="d-flex align-items-start gap-0">
                    <Sidebar />
                    <div className="d-flex flex-column gap-0 w-100 dashboard_padding">
                        <TopBar />
                        <section className="dashboard_adminh">
                            <div className="container-xl">
                                <div className="row gy-4">
                                    {successMessage && (
                                        <SuccessAlert
                                            message={successMessage}
                                            onClose={() => setSuccessMessage("")}
                                        />
                                    )}

                                    {/* Page Header */}
                                    <div className="col-12">
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <BarChart3 size={32} className="text-color-primary" />
                                                <div>
                                                    <h4 className="mb-0 text-white">Visitors Analytics</h4>
                                                    <p className=" mb-0 text-white">Track and analyze website visitors</p>
                                                </div>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-outline-primary text-color-primary"
                                                    onClick={fetchVisitors}
                                                    disabled={loading}
                                                >
                                                    <FiRefreshCw className={loading ? "spin" : ""} />
                                                    {loading ? " Loading..." : " Refresh"}
                                                </button>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats Cards */}
                                    <div className="col-12">
                                        <div className="row gy-3">
                                            <StatCard
                                                title="Total Visitors"
                                                value={stats.totalVisitors}
                                                icon={BarChart3}
                                                color="bg-info"
                                                bgColor="bg-gradient-info"
                                            />
                                            <StatCard
                                                title="Unique Devices"
                                                value={stats.uniqueDevices}
                                                icon={FaDesktop}
                                                color="bg-warning"
                                                bgColor="bg-gradient-warning"
                                            />


                                            <StatCard
                                                title="Today's Visits"
                                                value={stats.todayVisitors}
                                                icon={FaMapMarkerAlt}
                                                color="bg-danger"
                                                bgColor="bg-gradient-danger"
                                            />
                                        </div>
                                    </div>

                                    {/* Visitors Table */}
                                    <div className="col-12">
                                        <div className="card p-3">
                                            <div className="d-flex justify-content-between flex-wrap gap-3 pb-3 align-items-center">
                                                <div className="search-bar">
                                                    <input
                                                        type="text"
                                                        placeholder="Search visitors..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                    <span className="search-icon">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <div className="text-muted">
                                                    Showing {filteredVisitors.length} of {visitors.length} visitors
                                                </div>
                                            </div>

                                            <DataTable
                                                columns={columns}
                                                data={filteredVisitors}
                                                pagination
                                                paginationPerPage={10}
                                                paginationRowsPerPageOptions={[10, 25, 50, 100]}
                                                highlightOnHover
                                                striped
                                                responsive
                                                customStyles={customStyles}
                                                className="custom-scrollbar"
                                                noDataComponent={
                                                    <div className="text-center py-5">
                                                        <p className="text-muted">No visitor data found</p>
                                                        <button
                                                            className="btn btn-primary mt-2"
                                                            onClick={fetchVisitors}
                                                        >
                                                            Refresh Data
                                                        </button>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Visitor Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this visitor record? This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Professional Visitor Details Modal */}
            <Modal
                show={showDetailsModal}
                onHide={() => setShowDetailsModal(false)}
                size="lg"
                centered
                backdrop="static"
            >
                <Modal.Header
                    className="border-bottom-0 bg-gradient-primary text-white"
                    style={{
                        borderRadius: '12px 12px 0 0',
                        padding: '1.5rem'
                    }}
                >
                    <div className="d-flex align-items-center w-100">
                        <div className="me-3">
                            <div className="rounded-circle bg-white p-2 d-flex align-items-center justify-content-center"
                                style={{ width: '45px', height: '45px' }}>
                                <FaEye className="text-primary" size={20} />
                            </div>
                        </div>
                        <div className="flex-grow-1">
                            <Modal.Title className="mb-1 fw-bold">Visitor Details</Modal.Title>
                            <small className="opacity-75">Complete analytics and tracking information</small>
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setShowDetailsModal(false)}
                            aria-label="Close"
                        ></button>
                    </div>
                </Modal.Header>

                <Modal.Body className="p-4">
                    {selectedVisitor && (
                        <>
                            {/* Summary Card */}
                            <div className="card border-0 shadow-sm mb-4 overflow-hidden"
                                style={{
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
                                }}>
                                <div className="card-body p-4">
                                    <div className="row align-items-center">
                                        <div className="col-md-8">
                                            <div className="d-flex align-items-center">
                                                <div className="me-4">
                                                    <div className={`rounded-circle p-3 ${selectedVisitor.is_mobile ? 'bg-info bg-opacity-10' : 'bg-secondary bg-opacity-10'}`}
                                                        style={{ width: '70px', height: '70px' }}>
                                                        {selectedVisitor.is_mobile ? (
                                                            <FaMobileAlt className={selectedVisitor.is_mobile ? 'text-info' : 'text-secondary'} size={28} />
                                                        ) : (
                                                            <FaDesktop className="text-secondary" size={28} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="fw-bold mb-2 text-dark">
                                                        {selectedVisitor.device_type || "Unknown Device"}
                                                    </h5>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-3 py-1">
                                                            <FaGlobe className="me-1" />
                                                            {selectedVisitor.country || "Unknown"}
                                                        </span>
                                                        <span className={`badge px-3 py-1 ${selectedVisitor.is_mobile ? 'bg-info text-white' : 'bg-secondary text-white'}`}>
                                                            {selectedVisitor.is_mobile ? 'Mobile' : 'Desktop'}
                                                        </span>
                                                        <span className="badge bg-light text-dark border px-3 py-1">
                                                            ID: {selectedVisitor.id}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                            <div className="text-muted small mb-1">Total Visits</div>
                                            <div className="h3 fw-bold text-primary">
                                                {selectedVisitor.visit_count || 1}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="row g-4">
                                {/* Left Column - Identity */}
                                <div className="col-md-6">
                                    <div className="card border-0 shadow-sm h-100"
                                        style={{ borderRadius: '10px' }}>
                                        <div className="card-header bg-white border-bottom-0 pt-4 pb-3">
                                            <h6 className="fw-bold mb-0 text-dark d-flex align-items-center">
                                                <FaFingerprint className="me-2 text-primary" />
                                                Identity Information
                                            </h6>
                                        </div>
                                        <div className="card-body pt-0">
                                            <div className="mb-4">
                                                <label className="form-label text-muted small mb-2">Device ID</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control border-end-0 bg-light"
                                                        value={selectedVisitor.device_id}
                                                        readOnly
                                                        style={{ borderRadius: '8px 0 0 8px' }}
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary border-start-0"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(selectedVisitor.device_id);
                                                            // Add toast notification here
                                                        }}
                                                        style={{ borderRadius: '0 8px 8px 0' }}
                                                    >
                                                        <FaCopy />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="row g-3">
                                                <div className="col-6">
                                                    <div className="p-3 bg-light rounded">
                                                        <label className="form-label text-muted small mb-1 d-block">Country</label>
                                                        <div className="d-flex align-items-center">
                                                            <FaGlobe className="me-2 text-muted" size={14} />
                                                            <span className="fw-medium">{selectedVisitor.country || "Unknown"}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="mt-4">
                                                <label className="form-label text-muted small mb-2">IP Address</label>
                                                <div className="d-flex">
                                                    <code className="bg-light p-3 rounded flex-grow-1 border">
                                                        {selectedVisitor.ip_address || "Unknown"}
                                                    </code>
                                                    <button
                                                        className="btn btn-sm btn-outline-primary ms-2"
                                                        onClick={() => navigator.clipboard.writeText(selectedVisitor.ip_address)}
                                                    >
                                                        Copy
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Visit Info */}
                                <div className="col-md-6">
                                    <div className="card border-0 shadow-sm h-100"
                                        style={{ borderRadius: '10px' }}>
                                        <div className="card-header bg-white border-bottom-0 pt-4 pb-3">
                                            <h6 className="fw-bold mb-0 text-dark d-flex align-items-center">
                                                <FaCalendarAlt className="me-2 text-primary" />
                                                Visit Information
                                            </h6>
                                        </div>
                                        <div className="card-body pt-0">
                                            <div className="mb-4">
                                                <label className="form-label text-muted small mb-2">Visit Date & Time</label>
                                                <div className="p-3 bg-light rounded">
                                                    <div className="d-flex align-items-center">
                                                        <FaCalendarAlt className="me-2 text-muted" />
                                                        <span className="fw-medium">
                                                            {new Date(selectedVisitor.date).toLocaleString('en-US', {
                                                                weekday: 'short',
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label text-muted small mb-2">Page Visited</label>
                                                <div className="d-flex">
                                                    <div className="bg-light p-3 rounded flex-grow-1 border">
                                                        <a
                                                            href={selectedVisitor.page_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-decoration-none text-primary d-block text-truncate"
                                                        >
                                                            {selectedVisitor.page_url}
                                                        </a>
                                                    </div>
                                                    <button
                                                        className="btn btn-sm btn-outline-primary ms-2"
                                                        onClick={() => window.open(selectedVisitor.page_url, '_blank')}
                                                    >
                                                        <FaExternalLinkAlt />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label text-muted small mb-2">Referral Source</label>
                                                <div className="p-3 bg-light rounded">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <span className={`badge ${selectedVisitor.referrer && selectedVisitor.referrer !== 'direct' ? 'bg-success' : 'bg-secondary'} px-3 py-2`}>
                                                            {selectedVisitor.referrer && selectedVisitor.referrer !== 'direct' ? 'External' : 'Direct'}
                                                        </span>
                                                        <small className="text-muted">
                                                            {selectedVisitor.referrer || "Direct Traffic"}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Full Width - Technical Details */}
                                <div className="col-12">
                                    <div className="card border-0 shadow-sm"
                                        style={{ borderRadius: '10px' }}>
                                        <div className="card-header bg-white border-bottom-0 pt-4 pb-3">
                                            <h6 className="fw-bold mb-0 text-dark d-flex align-items-center">
                                                <FaCogs className="me-2 text-primary" />
                                                Technical Details
                                            </h6>
                                        </div>
                                        <div className="card-body pt-0">
                                            <div className="row g-3 mb-4">
                                                <div className="col-md-4">
                                                    <div className="p-3 bg-light rounded">
                                                        <label className="form-label text-muted small mb-1 d-block">Browser</label>
                                                        <span className="fw-medium">
                                                            {detectBrowser(selectedVisitor.user_agent)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="p-3 bg-light rounded">
                                                        <label className="form-label text-muted small mb-1 d-block">Operating System</label>
                                                        <span className="fw-medium">
                                                            {detectOS(selectedVisitor.user_agent)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="p-3 bg-light rounded">
                                                        <label className="form-label text-muted small mb-1 d-block">Device Type</label>
                                                        <span className="fw-medium">
                                                            {detectDevice(selectedVisitor.user_agent)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="form-label text-muted small mb-2">User Agent</label>
                                                <div className="position-relative">
                                                    <textarea
                                                        className="form-control bg-light border"
                                                        rows="3"
                                                        value={selectedVisitor.user_agent}
                                                        readOnly
                                                        style={{
                                                            borderRadius: '8px',
                                                            resize: 'none',
                                                            fontFamily: 'monospace',
                                                            fontSize: '13px'
                                                        }}
                                                    />
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-3"
                                                        onClick={() => navigator.clipboard.writeText(selectedVisitor.user_agent)}
                                                    >
                                                        <FaCopy className="me-1" /> Copy
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer className="border-top-0 bg-light"
                    style={{ borderRadius: '0 0 12px 12px', padding: '1.25rem 1.5rem' }}>
                    <div className="d-flex justify-content-between w-100 align-items-center">
                        <div>
                            <small className="text-muted">
                                Record Created: {selectedVisitor && new Date(selectedVisitor.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </small>
                        </div>
                        <div className="d-flex gap-2">
                            <Button
                                variant="outline-secondary"
                                onClick={() => setShowDetailsModal(false)}
                                className="px-4"
                            >
                                Close
                            </Button>

                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

            <>
                {/* Your existing JSX code without changes */}

                <style jsx>{`
        .spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        /* Updated gradient colors with #D40209 */
        .bg-gradient-primary {
            background: linear-gradient(135deg, #D40209 0%, #B00008 100%);
        }
        
        .bg-gradient-info {
            background: linear-gradient(135deg, #D40209 0%, #FF6B6B 100%);
        }
        
        .bg-gradient-success {
            background: linear-gradient(135deg, #00C851 0%, #007E33 100%);
        }
        
        .bg-gradient-warning {
            background: linear-gradient(135deg, #FF8800 0%, #FF5500 100%);
        }
        
        .bg-gradient-danger {
            background: linear-gradient(135deg, #D40209 0%, #FF4444 100%);
        }
        
        /* Text colors */
        .text-color-primary {
            color: #D40209 !important;
        }
        
        .btn-outline-primary {
            color: #D40209 !important;
            border-color: #D40209 !important;
        }
        
        .btn-outline-primary:hover {
            background-color: #D40209 !important;
            color: white !important;
        }
        
        .btn-primary {
            background-color: #D40209 !important;
            border-color: #D40209 !important;
        }
        
        .btn-primary:hover {
            background-color: #B00008 !important;
            border-color: #B00008 !important;
        }
        
        .spinner-border.text-primary {
            color: #D40209 !important;
        }
        
        /* Search bar */
        .search-bar {
            position: relative;
            width: 300px;
        }
        
        .search-bar input {
            width: 100%;
            padding: 10px 40px 10px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            outline: none;
            transition: all 0.3s;
        }
        
        .search-bar input:focus {
            border-color: #D40209;
            box-shadow: 0 0 0 0.2rem rgba(212, 2, 9, 0.25);
        }
        
        .search-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
            pointer-events: none;
        }
        
        .search-icon svg {
            width: 20px;
            height: 20px;
        }
        
        /* DataTable custom colors */
        :global(.rdt_TableHead .rdt_TableCol) {
            background-color: #D40209 !important;
        }
        
        :global(.rdt_TableRow:hover) {
            background-color: rgba(212, 2, 9, 0.05) !important;
        }
        
        /* Card styling */
        .card {
            border: 1px solid rgba(212, 2, 9, 0.1);
        }
        
        /* Stats card text colors */
        .text-white {
            color: white !important;
        }
        
        .text-muted {
            color: #6c757d !important;
        }
    `}</style>
            </>
        </>
    );
}

export default AdminVisitors;