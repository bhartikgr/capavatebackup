import React, { useState, useEffect } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import '../../../assets/style/sidebar.css'
import { CircleX } from 'lucide-react'
import { API_BASE_URL } from '../../../config/config';
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

export default function JoinWaitlist({ setShowModal }) {
  const apiUrlRound = API_BASE_URL + "api/user/capitalround/";
  const [countrySymbolList, setCountrysymbollist] = useState([]);
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
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
        }
      );

      var respo = res.data.results;

      setCountrysymbollist(respo);
    } catch (err) {
      // Enhanced error handling
    }
  };
  const countryOptions = countrySymbolList.map(country => ({
    label: country.name, // or whatever field contains the country name
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
    onSubmit: values => {
      console.log('Form submitted:', values)
      setShowModal(false)
    }
  })

  return (
    <>
      <div className='modal fade show form-pop' style={{ display: 'block' }}>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
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
                      <h4>Join the Waitlist</h4>
                      <p>
                        Companies interested in presenting to the Capavate Angel
                        Network
                      </p>
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
                className='rounded-3 p-3 mb-4 bg_light border-start border-4  border-danger '
                style={{ fontSize: '0.8rem', lineHeight: '1.6' }}
              >
                Once submitted, the Capavate team will review your information
                and contact you with next steps...
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
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting
                      ? 'Submitting...'
                      : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className='modal-backdrop fade show'
        onClick={() => setShowModal(false)}
      />
    </>
  )
}
