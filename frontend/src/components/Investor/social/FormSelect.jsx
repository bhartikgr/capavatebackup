import React from 'react'
import Select from 'react-select'

export default function FormSelect({
  label,
  name,
  options = [],
  formik,
  required = false,
  isMulti = false
}) {
  const hasError = formik.touched[name] && formik.errors[name]

  const handleChange = selectedOption => {
    if (isMulti) {
      formik.setFieldValue(
        name,
        selectedOption ? selectedOption.map(opt => opt.value) : []
      )
    } else {
      formik.setFieldValue(
        name,
        selectedOption ? selectedOption.value : ''
      )
    }
  }

  const getValue = () => {
    if (isMulti) {
      return options.filter(opt =>
        formik.values[name]?.includes(opt.value)
      )
    } else {
      return options.find(opt => opt.value === formik.values[name]) || null
    }
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#fff',
      borderColor: hasError
        ? '#d40209'
        : state.isFocused
        ? '#d40209'
        : '#dee2e6',
      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(212,2,9,.15)' : 'none',
      '&:hover': {
        borderColor: '#dee2e6'
      },
      minHeight: '45px',
      borderRadius: '8px',
      fontSize: '0.85rem',
      color: '#000000db'
    }),
    menu: provided => ({
      ...provided,
      borderRadius: '8px',
      overflow: 'hidden'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#d40209'
        : state.isFocused
        ? 'rgba(212,2,9,.08)'
        : '#fff',
      color: state.isSelected ? '#fff' : '#000000db',
      fontSize: '0.85rem',
      cursor: 'pointer'
    }),
    singleValue: provided => ({
      ...provided,
      color: '#000000db'
    }),
    multiValue: provided => ({
      ...provided,
      backgroundColor: '#d40209'
    }),
    multiValueLabel: provided => ({
      ...provided,
      color: '#fff'
    }),
    multiValueRemove: provided => ({
      ...provided,
      color: '#fff',
      ':hover': {
        backgroundColor: '#a50005',
        color: '#fff'
      }
    })
  }

  return (
    <div className="d-flex flex-column gap-2 input-deisgn">
      <label>
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <Select
        name={name}
        options={options}
        value={getValue()}
        onChange={handleChange}
        onBlur={() => formik.setFieldTouched(name, true)}
        isMulti={isMulti}
        styles={customStyles}
        classNamePrefix="react-select"
      />

      {hasError && (
        <div className="invalid-feedback d-block">
          {formik.errors[name]}
        </div>
      )}
    </div>
  )
}