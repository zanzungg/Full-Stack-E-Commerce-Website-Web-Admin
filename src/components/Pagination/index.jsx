import React from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
  itemName = "items"
}) => {
  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} {itemName}
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <MdKeyboardArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => onPageChange(index + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <MdKeyboardArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination