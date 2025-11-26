import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { IoDownloadOutline } from "react-icons/io5"
import { FaPlus } from "react-icons/fa"
import { MdInventory } from "react-icons/md"

// Import Components
import SearchBar from '../../../components/SearchBar'
import FilterDropdown from '../../../components/FilterDropdown'
import StatsCard from '../../../components/StatsCard'
import StatusBadge from '../../../components/StatusBadge'
import ActionButtons from '../../../components/ActionButtons'
import Pagination from '../../../components/Pagination'
import PageHeader from '../../../components/PageHeader'
import EmptyState from '../../../components/EmptyState'
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
      <PageHeader
        icon={MdInventory}
        title="Products Management"
        subtitle="Manage your product inventory and catalog"
        actions={
          <>
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
          </>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Products" value={stats.total} icon="📦" color="bg-blue-100 text-blue-800" />
        <StatsCard label="In Stock" value={stats.inStock} icon="✅" color="bg-green-100 text-green-800" />
        <StatsCard label="Low Stock" value={stats.lowStock} icon="⚠️" color="bg-yellow-100 text-yellow-800" />
        <StatsCard label="Out of Stock" value={stats.outOfStock} icon="❌" color="bg-red-100 text-red-800" />
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, Name, Category, Sub Category..."
          />
          
          <FilterDropdown
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={categoryOptions}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">
            Products List ({filteredProducts.length})
          </h3>
        </div>

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
                            <StatusBadge status={product.status} type="product" />
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
                      <ActionButtons
                        onView={() => console.log('View', product.id)}
                        onEdit={() => console.log('Edit', product.id)}
                        onDelete={() => console.log('Delete', product.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <EmptyState
                      icon="📦"
                      title="No products found"
                      subtitle="Try adjusting your search or filters"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={filteredProducts.length}
            itemName="products"
          />
        )}
      </div>
    </div>
  )
}

export default ProductListPage