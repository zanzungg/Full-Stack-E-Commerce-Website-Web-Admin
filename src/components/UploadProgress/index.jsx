import React from 'react'

const UploadProgress = ({ 
  progress = 0,
  text = "Uploading...",
  color = "blue"
}) => {
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    red: 'bg-red-600'
  }

  return (
    <div className="space-y-2">
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`${colorClasses[color] || colorClasses.blue} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-center text-gray-600">
        {text} {progress}%
      </p>
    </div>
  )
}

export default UploadProgress