import React from 'react'

const EmptyState = ({ 
  icon = "📦", 
  title = "No data found", 
  subtitle = "Try adjusting your search or filters",
  action 
}) => {
  return (
    <div className="flex flex-col items-center gap-3 py-12">
      <div className="text-6xl">{icon}</div>
      <p className="text-lg font-semibold text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  )
}

export default EmptyState