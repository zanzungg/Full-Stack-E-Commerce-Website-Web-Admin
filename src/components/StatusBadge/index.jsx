import React from 'react'

const StatusBadge = ({ status, type = "order" }) => {
  const getStatusColor = () => {
    if (type === "order") {
      switch(status) {
        case 'Delivered': return 'bg-green-100 text-green-800'
        case 'Processing': return 'bg-blue-100 text-blue-800'
        case 'Shipped': return 'bg-purple-100 text-purple-800'
        case 'Pending': return 'bg-yellow-100 text-yellow-800'
        case 'Cancelled': return 'bg-red-100 text-red-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    } else if (type === "product") {
      switch(status) {
        case 'In Stock': return 'bg-green-100 text-green-800'
        case 'Low Stock': return 'bg-yellow-100 text-yellow-800'
        case 'Out of Stock': return 'bg-red-100 text-red-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    }
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <span className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusColor()}`}>
      {status}
    </span>
  )
}

export default StatusBadge