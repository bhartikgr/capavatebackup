import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import '../../../assets/style/sidebar.css';
import { CircleX, Briefcase, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '../../../config/config';
import axios from "axios";

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required')
});

export default function AngelNetworkJoinWaitlist({ setShowModal, investorData }) {
    const apiUrlRound = API_BASE_URL + "api/user/capitalround/";
    const apiUrlInvestor = API_BASE_URL + "api/user/investor/";
    const [countrySymbolList, setCountrysymbollist] = useState([]);
    const [portfolioCompanies, setPortfolioCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        getallcountrySymbolList();
        if (investorData?.id) {
            fetchPortfolioCompanies();
        }
    }, [investorData]);

    const getallcountrySymbolList = async () => {
        try {
            const res = await axios.post(
                apiUrlRound + "getallcountrySymbolList",
                { id: "" },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            setCountrysymbollist(res.data.results || []);
        } catch (err) {
            console.error("Error fetching countries:", err);
        }
    };

    const fetchPortfolioCompanies = async () => {
        try {
            const res = await axios.post(
                apiUrlInvestor + "getPortfolioCompanies",
                { investor_id: investorData.id }
            );
            setPortfolioCompanies(res.data.results || []);
        } catch (err) {
            console.error("Error fetching portfolio:", err);
        }
    };

    const countryOptions = countrySymbolList.map(country => ({
        label: country.name,
        value: country.name
    }));

    const formik = useFormik({
        initialValues: {
            firstName: investorData?.first_name || '',
            lastName: investorData?.last_name || '',
            email: investorData?.email || '',
            phone: investorData?.phone || '',
            city: investorData?.city || '',
            country: investorData?.country || ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                // Send to backend
                const res = await axios.post(
                    API_BASE_URL + "api/user/investor/joinAngelNetwork",
                    {
                        ...values,
                        investor_id: investorData?.id,
                        portfolio_companies: portfolioCompanies
                    }
                );

                if (res.data.status === "1") {
                    setSubmitted(true);
                    // Auto close after 3 seconds
                    setTimeout(() => setShowModal(false), 3000);
                }
            } catch (err) {
                console.error("Error submitting:", err);
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <>
            <div className='modal fade show form-pop' style={{ display: 'block' }}>
                <div className='modal-dialog modal-dialog-centered modal-lg'>
                    <div className='modal-content rounded-4 shadow-lg border-0'>
                        <div className='p-4'>
                            <div className='d-flex align-items-start gap-3 mb-4'>
                                <div
                                    className='rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 bg-danger-subtle text-danger'
                                    style={{ width: '45px', height: '45px' }}
                                >
                                    <svg width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
                                        <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' strokeLinecap='round' />
                                        <circle cx='12' cy='7' r='4' />
                                    </svg>
                                </div>
                                <div className='flex-grow-1'>
                                    <div className='d-flex form-pop-head justify-content-between gap-2 align-items-start'>
                                        <div className='d-flex flex-column gap-1'>
                                            <h4>Join the Capavate Angel Network</h4>
                                            <p>Connect with top-tier startups and investment opportunities</p>
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

                            {submitted ? (
                                <div className="text-center py-5">
                                    <div className="text-success mb-3">
                                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h5 className="mb-2">Successfully Joined!</h5>
                                    <p className="text-muted">You are now on the Capavate Angel Network waitlist.</p>
                                </div>
                            ) : (
                                <>
                                    {/* Portfolio Companies Section - Auto-populated */}
                                    {portfolioCompanies.length > 0 && (
                                        <div className="rounded-3 p-3 mb-4 bg-light border-start border-4 border-info">
                                            <div className="d-flex align-items-center gap-2 mb-2">
                                                <Briefcase size={18} className="text-info" />
                                                <h6 className="fw-bold mb-0">Your Portfolio Companies</h6>
                                            </div>
                                            <div className="d-flex flex-wrap gap-2 mt-2">
                                                {portfolioCompanies.map((company, idx) => (
                                                    <div key={idx} className="d-flex align-items-center gap-2 bg-white p-2 rounded-3 shadow-sm" style={{ border: '1px solid #dee2e6' }}>
                                                        <span>{company.name}</span>
                                                        {company.profile_link && (
                                                            <a
                                                                href={company.profile_link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-info"
                                                            >
                                                                <ExternalLink size={14} />
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-muted small mt-2 mb-0">
                                                These companies will be notified when you join the network.
                                            </p>
                                        </div>
                                    )}

                                    <div className='rounded-3 p-3 mb-4 bg_light border-start border-4 border-danger'>
                                        <p className='mb-0 small'>
                                            Join the Capavate Angel Network to get access to exclusive deal flow,
                                            co-investment opportunities, and connect with fellow angel investors.
                                        </p>
                                    </div>

                                    <form className='d-flex flex-column gap-3' onSubmit={formik.handleSubmit}>
                                        <div className='row g-3'>
                                            <div className='col-md-6'>
                                                <FormInput
                                                    label='First Name'
                                                    name='firstName'
                                                    placeholder='John'
                                                    formik={formik}
                                                    required
                                                />
                                            </div>
                                            <div className='col-md-6'>
                                                <FormInput
                                                    label='Last Name'
                                                    name='lastName'
                                                    placeholder='Doe'
                                                    formik={formik}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className='row g-3'>
                                            <div className='col-md-6'>
                                                <FormInput
                                                    label='Email Address'
                                                    name='email'
                                                    type='email'
                                                    placeholder='john@example.com'
                                                    formik={formik}
                                                    required
                                                />
                                            </div>
                                            <div className='col-md-6'>
                                                <FormInput
                                                    label='Phone Number'
                                                    name='phone'
                                                    type='tel'
                                                    placeholder='+1 (555) 123-4567'
                                                    formik={formik}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className='row g-3'>
                                            <div className='col-md-6'>
                                                <FormInput
                                                    label='City'
                                                    name='city'
                                                    placeholder='San Francisco'
                                                    formik={formik}
                                                    required
                                                />
                                            </div>
                                            <div className='col-md-6'>
                                                <FormSelect
                                                    label='Country'
                                                    name='country'
                                                    formik={formik}
                                                    required
                                                    options={countryOptions.length > 0 ? countryOptions : [
                                                        { label: 'Loading...', value: '' }
                                                    ]}
                                                />
                                            </div>
                                        </div>

                                        <div className='d-flex gap-3 mt-3'>
                                            <button
                                                type='button'
                                                className='button_deisgn bg_light text-black flex-grow-1'
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type='submit'
                                                className='button_deisgn bg-success flex-grow-1 text-white'
                                                disabled={loading || formik.isSubmitting}
                                            >
                                                {loading ? 'Joining...' : 'Join Angel Network'}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal-backdrop fade show' onClick={() => setShowModal(false)} />
        </>
    );
}