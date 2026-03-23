import React, { useState, useEffect } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormInput from "../../social/FormInput";
import FormSelect from '../../social/FormSelect'
import { CircleX } from 'lucide-react'
import { API_BASE_URL } from "../../../config/config";
import axios from "axios";
import "../../../assets/style/sidebar.css"

const validationSchema = Yup.object({
    companyName: Yup.string().required('Company name is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required')
})

export default function Academypopup({ PopupShow, setPopupShow, onCloses }) {
    const apiUrlRound = API_BASE_URL + "api/user/capitalround/";
    const apiUrl_waitlist = API_BASE_URL + "api/user/waitlist/";
    const [countrySymbolList, setCountrysymbollist] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [messageAll, setmessageAll] = useState("");
    const [errr, seterrr] = useState(false);



    useEffect(() => {
        getallcountrySymbolList();
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

    // Map country options based on API response structure
    const countryOptions = countrySymbolList.map(country => ({
        label: country.name,
        value: country.name
    }));

    const formik = useFormik({
        initialValues: {
            companyName: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city: '',
            country: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                await saveToWaitlist(values);
            } catch (error) {
                console.error("Error submitting form:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    const saveToWaitlist = async (values) => {


        const formData = {
            company_id: 0,
            company_name: values.companyName,
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone: values.phone,
            city: values.city,
            country: values.country,
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ') // Format: YYYY-MM-DD HH:MM:SS
        };
        console.log(formData)
        try {
            const response = await axios.post(
                apiUrl_waitlist + "saveAcademypopup",
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.status === "1" || response.data.success) {
                // Success - close modal and show success message
                seterrr(false);
                setmessageAll("Application submitted successfully!");
                setTimeout(() => {
                    setPopupShow(false);
                    setmessageAll("");
                }, 3500);
            } else {
                seterrr(true);
                setmessageAll(response.data.message || "Error submitting application");
                setTimeout(() => {
                    seterrr(false);
                    setmessageAll("");
                }, 3500);
            }
        } catch (err) {
            console.error("Error saving to waitlist:", err);
            alert("Failed to submit application. Please try again.");
        }
    };

    const handleClose = () => {
        setPopupShow(false);
    };

    // Don't render if PopupShow is false
    if (!PopupShow) return null;

    return (
        <>
            <div className={`modal fade show form-pop`} style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className='modal-dialog modal-dialog-centered modal-lg'>
                    {messageAll && (
                        <div
                            className={`shadow-lg ${errr ? "error_pop" : "success_pop"}`}
                            style={{
                                position: 'fixed',
                                top: '20px',
                                right: '20px',
                                zIndex: 9999,
                                padding: '15px 20px',
                                borderRadius: '8px',
                                backgroundColor: errr ? '#f8d7da' : '#d4edda',
                                color: errr ? '#721c24' : '#155724',
                                border: `1px solid ${errr ? '#f5c6cb' : '#c3e6cb'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                minWidth: '300px'
                            }}
                        >
                            <div className="d-flex align-items-center gap-2">
                                <span className="d-block">{messageAll}</span>
                            </div>

                            <button
                                type="button"
                                className="close_btnCros"
                                onClick={() => setmessageAll("")}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    marginLeft: '10px'
                                }}
                            >
                                ×
                            </button>
                        </div>
                    )}

                    <div className='modal-content rounded-4 shadow-lg border-0'>
                        <div className='p-4'>
                            <div className='d-flex align-items-start gap-3 mb-4'>
                                <div
                                    className='rounded-3 d-flex align-items-center justify-content-center flex-shrink-0 bg-danger-subtle text-danger'
                                    style={{ width: '45px', height: '45px', backgroundColor: '#f8d7da', color: '#dc3545' }}
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
                                            <h4 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Invite Investors to Academy</h4>
                                            <p style={{ margin: 0, color: '#6c757d' }}>
                                                Invite investors to join the Capavate Entrepreneur Academy and access exclusive investor education
                                            </p>
                                        </div>
                                        <button
                                            type='button'
                                            className='close_btn_pop'
                                            onClick={handleClose}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: 0
                                            }}
                                        >
                                            <CircleX size={24} color="#6c757d" />
                                        </button>
                                    </div>
                                </div>
                            </div>



                            <form
                                className='d-flex flex-column gap-3'
                                onSubmit={formik.handleSubmit}
                            >
                                <FormInput
                                    label='Company Name'
                                    name='companyName'
                                    placeholder='e.g., Capavate Technologies'
                                    formik={formik}
                                    required
                                />

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
                                            placeholder='john@company.com'
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
                                                { label: 'Loading countries...', value: '' }
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className='d-flex gap-3 mt-3'>
                                    <button
                                        type='button'
                                        className='button_deisgn bg_light text-black flex-grow-1'
                                        onClick={() => setPopupShow(false)}
                                        disabled={isSubmitting}
                                        style={{
                                            padding: '10px 20px',
                                            border: '1px solid #dee2e6',
                                            borderRadius: '5px',
                                            backgroundColor: '#f8f9fa',
                                            color: '#000',
                                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type='submit'
                                        className='button_deisgn bg-success flex-grow-1 text-white'
                                        disabled={isSubmitting || formik.isSubmitting}
                                        style={{
                                            padding: '10px 20px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className='modal-backdrop fade show'
                onClick={() => setPopupShow(false)}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1040
                }}
            />
        </>
    )
}