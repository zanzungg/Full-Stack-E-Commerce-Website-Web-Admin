import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { IoSearchOutline, IoFilterOutline, IoDownloadOutline } from "react-icons/io5"
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa"
import { MdInventory, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import ProgressBar from '../../../components/ProgressBar'

const ProductListPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Sample Products Data
  const productsData = [
    {
      id: 'PRD-001',
      name: 'Wireless Headphones Premium',
      image: 'https://via.placeholder.com/80',
      category: 'Electronics',
      subCategory: 'Audio',
      price: '$299.00',
      stock: 45,
      sales: 234,
      maxSales: 300,
      rating: 4.5,
      status: 'In Stock'
    },
    {
      id: 'PRD-002',
      name: 'Smart Watch Pro',
      image: 'https://via.placeholder.com/80',
      category: 'Electronics',
      subCategory: 'Wearables',
      price: '$459.00',
      stock: 28,
      sales: 189,
      maxSales: 250,
      rating: 4.8,
      status: 'In Stock'
    },
    {
      id: 'PRD-003',
      name: 'Laptop Stand Aluminum',
      image: 'https://via.placeholder.com/80',
      category: 'Accessories',
      subCategory: 'Office',
      price: '$89.00',
      stock: 120,
      sales: 156,
      maxSales: 200,
      rating: 4.3,
      status: 'In Stock'
    },
    {
      id: 'PRD-004',
      name: 'Phone Case Leather',
      image: 'https://via.placeholder.com/80',
      category: 'Accessories',
      subCategory: 'Phone',
      price: '$29.00',
      stock: 5,
      sales: 298,
      maxSales: 400,
      rating: 4.6,
      status: 'Low Stock'
    },
    {
      id: 'PRD-005',
      name: 'USB-C Cable 2m',
      image: 'https://via.placeholder.com/80',
      category: 'Accessories',
      subCategory: 'Cables',
      price: '$15.00',
      stock: 0,
      sales: 412,
      maxSales: 500,
      rating: 4.2,
      status: 'Out of Stock'
    },
    {
      id: 'PRD-006',
      name: 'Mechanical Keyboard RGB',
      image: 'https://via.placeholder.com/80',
      category: 'Electronics',
      subCategory: 'Peripherals',
      price: '$149.00',
      stock: 67,
      sales: 145,
      maxSales: 200,
      rating: 4.7,
      status: 'In Stock'
    },
    {
      id: 'PRD-007',
      name: 'Wireless Mouse',
      image: 'https://via.placeholder.com/80',
      category: 'Electronics',
      subCategory: 'Peripherals',
      price: '$39.00',
      stock: 89,
      sales: 267,
      maxSales: 350,
      rating: 4.4,
      status: 'In Stock'
    },
    {
      id: 'PRD-008',
      name: 'Monitor 27" 4K',
      image: 'https://via.placeholder.com/80',
      category: 'Electronics',
      subCategory: 'Displays',
      price: '$599.00',
      stock: 15,
      sales: 78,
      maxSales: 150,
      rating: 4.9,
      status: 'In Stock'
    },
    {
      id: 'PRD-009',
      name: 'Webcam HD 1080p',
      image: 'https://via.placeholder.com/80',
      category: 'Electronics',
      subCategory: 'Cameras',
      price: '$129.00',
      stock: 34,
      sales: 198,
      maxSales: 250,
      rating: 4.5,
      status: 'In Stock'
    },
    {
      id: 'PRD-010',
      name: 'Gaming Headset',
      image: 'https://via.placeholder.com/80',
      category: 'Electronics',
      subCategory: 'Audio',
      price: '$199.00',
      stock: 42,
      sales: 223,
      maxSales: 300,
      rating: 4.6,
      status: 'In Stock'
    },
    {
      id: 'PRD-011',
      name: 'Laptop Bag Premium',
      image: 'https://via.placeholder.com/80',
      category: 'Accessories',
      subCategory: 'Bags',
      price: '$79.00',
      stock: 8,
      sales: 134,
      maxSales: 180,
      rating: 4.3,
      status: 'Low Stock'
    },
  ]

  // Category options
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Accessories', label: 'Accessories' },
  ]

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'In Stock': return 'bg-green-100 text-green-800'
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800'
      case 'Out of Stock': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter products
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = 
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Calculate stats
  const stats = {
    total: productsData.length,
    inStock: productsData.filter(p => p.status === 'In Stock').length,
    lowStock: productsData.filter(p => p.status === 'Low Stock').length,
    outOfStock: productsData.filter(p => p.status === 'Out of Stock').length,
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MdInventory className="w-8 h-8 text-blue-600" />
            Products Management
          </h1>
          <p className="text-gray-600 mt-2">Manage your product inventory and catalog</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/product/upload">
            <Button
              variant="contained"
              className="bg-blue-600! text-white! hover:bg-blue-700! shadow-lg! rounded-xl! px-5! py-2.5! font-semibold! capitalize!"
              startIcon={<FaPlus />}
            >
              Add Product
            </Button>
          </Link>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Products', value: stats.total, color: 'bg-blue-100 text-blue-800', icon: '📦' },
          { label: 'In Stock', value: stats.inStock, color: 'bg-green-100 text-green-800', icon: '✅' },
          { label: 'Low Stock', value: stats.lowStock, color: 'bg-yellow-100 text-yellow-800', icon: '⚠️' },
          { label: 'Out of Stock', value: stats.outOfStock, color: 'bg-red-100 text-red-800', icon: '❌' },
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
              placeholder="Search by ID, Name, Category, Sub Category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="relative min-w-[200px]">
            <IoFilterOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
            >
              {categoryOptions.map(option => (
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

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">
            Products List ({filteredProducts.length})
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Sub Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Sales</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-blue-600">{product.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                              {product.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              Stock: {product.stock}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 font-medium">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{product.subCategory}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-gray-900">{product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="min-w-[200px]">
                        <ProgressBar 
                          value={product.sales}
                          max={product.maxSales}
                          showLabel={true}
                          label={`${product.sales} / ${product.maxSales}`}
                          color="auto"
                          height="h-2"
                        />
                      </div>
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
                          title="Edit Product"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-6xl">📦</div>
                      <p className="text-lg font-semibold text-gray-900">No products found</p>
                      <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > itemsPerPage && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
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

export default ProductListPage