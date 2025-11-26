import React from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'

const ActionButtons = ({ 
  onView, 
  onEdit, 
  onDelete,
  showView = true,
  showEdit = true,
  showDelete = true 
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {showView && (
        <button
          onClick={onView}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="View Details"
        >
          <FaEye className="w-4 h-4" />
        </button>
      )}
      
      {showEdit && (
        <button
          onClick={onEdit}
          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          title="Edit"
        >
          <FaEdit className="w-4 h-4" />
        </button>
      )}
      
      {showDelete && (
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default ActionButtons