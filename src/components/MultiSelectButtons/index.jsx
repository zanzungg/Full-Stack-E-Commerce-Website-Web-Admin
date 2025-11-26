import React from 'react'

const MultiSelectButtons = ({ 
  label, 
  options = [],
  selected = [],
  onToggle,
  required = false,
  className = ""
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="flex flex-wrap gap-2">
        {options.map(option => {
          const isSelected = selected.includes(option.value || option)
          const displayValue = option.label || option
          const colorValue = option.color || null
          
          return (
            <button
              key={option.value || option}
              type="button"
              onClick={() => onToggle(option.value || option)}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {colorValue && (
                <span 
                  className="inline-block w-4 h-4 rounded-full mr-2 border border-gray-300"
                  style={{ backgroundColor: colorValue }}
                />
              )}
              {displayValue}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MultiSelectButtons