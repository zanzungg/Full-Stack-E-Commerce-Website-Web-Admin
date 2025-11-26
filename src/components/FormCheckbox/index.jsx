import React from 'react'

const FormCheckbox = ({ 
  label, 
  name, 
  checked, 
  onChange, 
  disabled = false,
  description,
  className = ""
}) => {
  return (
    <div className={className}>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer disabled:cursor-not-allowed"
        />
        <span className="text-sm font-semibold text-gray-700">
          {label}
        </span>
      </label>
      {description && (
        <p className="text-xs text-gray-500 mt-2 ml-8">
          {description}
        </p>
      )}
    </div>
  )
}

export default FormCheckbox