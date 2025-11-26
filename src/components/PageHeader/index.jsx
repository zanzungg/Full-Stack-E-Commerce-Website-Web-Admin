import React from 'react'

const PageHeader = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  actions 
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          {Icon && <Icon className="w-8 h-8 text-blue-600" />}
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 mt-2">{subtitle}</p>
        )}
      </div>

      {actions && (
        <div className="flex flex-wrap gap-3">
          {actions}
        </div>
      )}
    </div>
  )
}

export default PageHeader