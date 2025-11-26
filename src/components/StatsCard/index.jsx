import React from 'react'

const StatsCard = ({ 
  label, 
  value, 
  icon, 
  color = "bg-blue-100 text-blue-800",
  className = "" 
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )
}

export default StatsCard