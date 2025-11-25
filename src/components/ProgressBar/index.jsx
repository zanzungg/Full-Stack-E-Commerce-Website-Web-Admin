import React from 'react'
import PropTypes from 'prop-types'

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  height = 'h-2',
  color = 'bg-blue-600',
  bgColor = 'bg-gray-200',
  showLabel = false,
  label = '',
  animated = false,
  striped = false,
  rounded = 'rounded-full',
  className = ''
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  // Get color based on percentage (if no color prop)
  const getColorByPercentage = () => {
    if (percentage >= 75) return 'bg-green-500'
    if (percentage >= 50) return 'bg-blue-500'
    if (percentage >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const barColor = color === 'auto' ? getColorByPercentage() : color

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-600">
            {label}
          </span>
          <span className="text-xs font-semibold text-gray-900">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}

      {/* Progress Bar Container */}
      <div className={`w-full ${bgColor} ${rounded} ${height} overflow-hidden relative`}>
        {/* Progress Bar Fill */}
        <div
          className={`
            ${barColor} 
            ${height} 
            ${rounded}
            transition-all duration-500 ease-out
            ${animated ? 'animate-progress' : ''}
            ${striped ? 'bg-striped' : ''}
            relative
            overflow-hidden
          `}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {/* Animated Stripes */}
          {striped && (
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
          )}
        </div>
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  height: PropTypes.string,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  rounded: PropTypes.string,
  className: PropTypes.string
}

export default ProgressBar