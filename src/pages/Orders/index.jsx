import React, { useState } from 'react'
import { Button } from '@mui/material'
import { IoSearchOutline, IoFilterOutline, IoDownloadOutline } from "react-icons/io5"
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"
import { HiOutlineShoppingBag } from "react-icons/hi2"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Sample Orders Data
  const ordersData = [
    {
      orderId: 'ORD-12345',
      paymentId: 'PAY-67890',
      products: 'Wireless Headphones, USB Cable',
      name: 'John Doe',
      phone: '+1 234-567-8900',
      address: '123 Main St, New York',
      pincode: '10001',
      totalAmount: '$299.00',
      userId: 'USR-001',
      status: 'Delivered',
      date: '2024-11-20',
    },
    {
      orderId: 'ORD-12346',
      paymentId: 'PAY-67891',
      products: 'Smart Watch',
      name: 'Jane Smith',
      phone: '+1 234-567-8901',
      address: '456 Oak Ave, Los Angeles',
      pincode: '90001',
      totalAmount: '$159.00',
      userId: 'USR-002',
      status: 'Processing',
      date: '2024-11-21',
    },
    {
      orderId: 'ORD-12347',
      paymentId: 'PAY-67892',
      products: 'Laptop Stand, Phone Case',
      name: 'Bob Johnson',
      phone: '+1 234-567-8902',
      address: '789 Pine Rd, Chicago',
      pincode: '60601',
      totalAmount: '$499.00',
      userId: 'USR-003',
      status: 'Pending',
      date: '2024-11-22',
    },
    {
      orderId: 'ORD-12348',
      paymentId: 'PAY-67893',
      products: 'Wireless Mouse',
      name: 'Alice Brown',
      phone: '+1 234-567-8903',
      address: '321 Elm St, Houston',
      pincode: '77001',
      totalAmount: '$89.00',
      userId: 'USR-004',
      status: 'Shipped',
      date: '2024-11-23',
    },
    {
      orderId: 'ORD-12349',
      paymentId: 'PAY-67894',
      products: 'Keyboard, Mouse Pad',
      name: 'Charlie Wilson',
      phone: '+1 234-567-8904',
      address: '654 Maple Dr, Phoenix',
      pincode: '85001',
      totalAmount: '$349.00',
      userId: 'USR-005',
      status: 'Cancelled',
      date: '2024-11-24',
    },
    {
      orderId: 'ORD-12350',
      paymentId: 'PAY-67895',
      products: 'Gaming Headset',
      name: 'David Lee',
      phone: '+1 234-567-8905',
      address: '987 Cedar Ln, Miami',
      pincode: '33101',
      totalAmount: '$199.00',
      userId: 'USR-006',
      status: 'Processing',
      date: '2024-11-25',
    },
    {
      orderId: 'ORD-12351',
      paymentId: 'PAY-67896',
      products: 'Webcam HD',
      name: 'Emma Wilson',
      phone: '+1 234-567-8906',
      address: '321 Birch St, Seattle',
      pincode: '98101',
      totalAmount: '$129.00',
      userId: 'USR-007',
      status: 'Delivered',
      date: '2024-11-25',
    },
    {
      orderId: 'ORD-12352',
      paymentId: 'PAY-67897',
      products: 'USB-C Hub, Cable',
      name: 'Frank Martin',
      phone: '+1 234-567-8907',
      address: '654 Oak Dr, Boston',
      pincode: '02101',
      totalAmount: '$79.00',
      userId: 'USR-008',
      status: 'Shipped',
      date: '2024-11-26',
    },
    {
      orderId: 'ORD-12353',
      paymentId: 'PAY-67898',
      products: 'Monitor 27 inch',
      name: 'Grace Chen',
      phone: '+1 234-567-8908',
      address: '123 Pine Ave, Denver',
      pincode: '80201',
      totalAmount: '$399.00',
      userId: 'USR-009',
      status: 'Pending',
      date: '2024-11-26',
    },
    {
      orderId: 'ORD-12354',
      paymentId: 'PAY-67899',
      products: 'Mechanical Keyboard',
      name: 'Henry Taylor',
      phone: '+1 234-567-8909',
      address: '789 Elm Rd, Portland',
      pincode: '97201',
      totalAmount: '$149.00',
      userId: 'USR-010',
      status: 'Delivered',
      date: '2024-11-27',
    },
    {
      orderId: 'ORD-12355',
      paymentId: 'PAY-67900',
      products: 'Laptop Bag',
      name: 'Ivy Johnson',
      phone: '+1 234-567-8910',
      address: '456 Maple St, Austin',
      pincode: '73301',
      totalAmount: '$59.00',
      userId: 'USR-011',
      status: 'Processing',
      date: '2024-11-27',
    },
  ]

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' },
  ]

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800'
      case 'Processing': return 'bg-blue-100 text-blue-800'
      case 'Shipped': return 'bg-purple-100 text-purple-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter orders
  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.paymentId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Calculate stats
  const stats = {
    total: ordersData.length,
    pending: ordersData.filter(o => o.status === 'Pending').length,
    processing: ordersData.filter(o => o.status === 'Processing').length,
    delivered: ordersData.filter(o => o.status === 'Delivered').length,
    cancelled: ordersData.filter(o => o.status === 'Cancelled').length,
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <HiOutlineShoppingBag className="w-8 h-8 text-blue-600" />
            Orders Management
          </h1>
          <p className="text-gray-600 mt-2">Manage and track all customer orders</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outlined"
            className="border-blue-600! text-blue-600! hover:bg-blue-50! rounded-xl! px-5! py-2.5! font-semibold! capitalize!"
            startIcon={<IoDownloadOutline />}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Orders', value: stats.total, color: 'bg-blue-100 text-blue-800', icon: '📦' },
          { label: 'Pending', value: stats.pending, color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
          { label: 'Processing', value: stats.processing, color: 'bg-blue-100 text-blue-800', icon: '⚙️' },
          { label: 'Delivered', value: stats.delivered, color: 'bg-green-100 text-green-800', icon: '✅' },
          { label: 'Cancelled', value: stats.cancelled, color: 'bg-red-100 text-red-800', icon: '❌' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Payment ID, Name, Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="relative min-w-[200px]">
            <IoFilterOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">
            Orders List ({filteredOrders.length})
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Payment ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Products</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Address</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Pincode</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Date</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentOrders.length > 0 ? (
                currentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-blue-600">{order.orderId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{order.paymentId}</span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <span className="text-sm text-gray-900 line-clamp-2">{order.products}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">{order.name}</p>
                        <p className="text-xs text-gray-500">{order.userId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{order.phone}</span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <span className="text-sm text-gray-600 line-clamp-2">{order.address}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{order.pincode}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-gray-900">{order.totalAmount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{order.date}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Order"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Order"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-6xl">📦</div>
                      <p className="text-lg font-semibold text-gray-900">No orders found</p>
                      <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredOrders.length > itemsPerPage && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <MdKeyboardArrowLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
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
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <MdKeyboardArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage