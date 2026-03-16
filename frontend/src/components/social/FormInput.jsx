import React from 'react'

export default function FormInput ({
  label,
  name,
  type = 'text',
  placeholder,
  formik,
  required = false,
  className = ''
}) {
  const hasError = formik?.touched?.[name] && formik?.errors?.[name]

  return (
    <div className='d-flex flex-column gap-2 input-deisgn'>
      <label>
        {label} {required && <span className='text-danger'>*</span>}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control rounded-3 ${
          hasError ? 'is-invalid' : ''
        } ${className}`}
        {...(formik?.getFieldProps ? formik.getFieldProps(name) : {})}
      />

      {hasError && (
        <div className='invalid-feedback'>{formik.errors[name]}</div>
      )}
    </div>
  )
}
