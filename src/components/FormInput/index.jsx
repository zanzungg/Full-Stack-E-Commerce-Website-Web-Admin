import React from 'react'

const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text",
  placeholder,
  required = false,
  error,
  disabled = false,
  icon: Icon,
  prefix,
  suffix,
  rows,
  step,
  min,
  max,
  className = ""
}) => {
  const isTextarea = type === 'textarea'
  
  const inputClasses = `w-full ${Icon || prefix ? 'pl-12' : 'px-4'} ${suffix ? 'pr-12' : 'pr-4'} py-3 border ${
    error ? 'border-red-500' : 'border-gray-300'
  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
    disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
  } ${isTextarea ? 'resize-none' : ''} ${className}`

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        )}
        
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold pointer-events-none">
            {prefix}
          </span>
        )}
        
        {isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows || 4}
            className={inputClasses}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            step={step}
            min={min}
            max={max}
            className={inputClasses}
          />
        )}
        
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}

export default FormInput