import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { IoDownloadOutline } from "react-icons/io5"
import { FaPlus, FaArrowLeft } from "react-icons/fa"
import { MdSubdirectoryArrowRight, MdCategory } from "react-icons/md"

// Import Reusable Components
import SearchBar from '../../../components/SearchBar'
import FilterDropdown from '../../../components/FilterDropdown'
import StatsCard from '../../../components/StatsCard'
import StatusBadge from '../../../components/StatusBadge'
import ActionButtons from '../../../components/ActionButtons'
import Pagination from '../../../components/Pagination'
import PageHeader from '../../../components/PageHeader'
import EmptyState from '../../../components/EmptyState'

const SubListCategoryPage = () => {
  const [searchParams] = useSearchParams()
  const parentId = searchParams.get('parent')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Sample Parent Categories
  const parentCategories = {
    'CAT-001': {
      id: 'CAT-001',
      name: 'Electronics',
      slug: 'electronics',
      icon: '💻',
      image: 'https://via.placeholder.com/100/4A90E2/ffffff?text=Electronics',
      productsCount: 245,
      status: 'Active',
    },
    'CAT-002': {
      id: 'CAT-002',
      name: 'Fashion',
      slug: 'fashion',
      icon: '👕',
      image: 'https://via.placeholder.com/100/F38181/ffffff?text=Fashion',
      productsCount: 432,
      status: 'Active',
    },
    'CAT-003': {
      id: 'CAT-003',
      name: 'Home & Living',
      slug: 'home-living',
      icon: '🏠',
      image: 'https://via.placeholder.com/100/FFE66D/ffffff?text=Home',
      productsCount: 287,
      status: 'Active',
    },
    'CAT-004': {
      id: 'CAT-004',
      name: 'Sports & Fitness',
      slug: 'sports-fitness',
      icon: '⚽',
      image: 'https://via.placeholder.com/100/55E6C1/ffffff?text=Sports',
      productsCount: 178,
      status: 'Active',
    },
    'CAT-005': {
      id: 'CAT-005',
      name: 'Books & Stationery',
      slug: 'books-stationery',
      icon: '📚',
      image: 'https://via.placeholder.com/100/74B9FF/ffffff?text=Books',
      productsCount: 156,
      status: 'Inactive',
    },
  }

  // All Sub Categories
  const allSubCategories = {
    'CAT-001': [
      {
        id: 'CAT-001-1',
        name: 'Mobile Phones',
        slug: 'mobile-phones',
        description: 'Smartphones and accessories',
        image: 'https://via.placeholder.com/100/50C878/ffffff?text=Mobile',
        icon: '📱',
        parentCategory: 'Electronics',
        parentId: 'CAT-001',
        status: 'Active',
        productsCount: 89,
        order: 1,
        featured: true,
        seoTitle: 'Mobile Phones',
        seoDescription: 'Latest smartphones',
        createdDate: '2024-01-16',
      },
      {
        id: 'CAT-001-2',
        name: 'Laptops',
        slug: 'laptops',
        description: 'Laptops and notebooks',
        image: 'https://via.placeholder.com/100/FF6B6B/ffffff?text=Laptops',
        icon: '💻',
        parentCategory: 'Electronics',
        parentId: 'CAT-001',
        status: 'Active',
        productsCount: 67,
        order: 2,
        featured: true,
        seoTitle: 'Laptops & Notebooks',
        seoDescription: 'Best laptops for work',
        createdDate: '2024-01-17',
      },
      {
        id: 'CAT-001-3',
        name: 'Headphones',
        slug: 'headphones',
        description: 'Audio devices',
        image: 'https://via.placeholder.com/100/4ECDC4/ffffff?text=Audio',
        icon: '🎧',
        parentCategory: 'Electronics',
        parentId: 'CAT-001',
        status: 'Active',
        productsCount: 45,
        order: 3,
        featured: false,
        seoTitle: 'Headphones & Audio',
        seoDescription: 'Premium audio devices',
        createdDate: '2024-01-18',
      },
      {
        id: 'CAT-001-4',
        name: 'Cameras',
        slug: 'cameras',
        description: 'Digital cameras and accessories',
        image: 'https://via.placeholder.com/100/95E1D3/ffffff?text=Camera',
        icon: '📷',
        parentCategory: 'Electronics',
        parentId: 'CAT-001',
        status: 'Active',
        productsCount: 44,
        order: 4,
        featured: false,
        seoTitle: 'Cameras & Photography',
        seoDescription: 'Professional cameras',
        createdDate: '2024-01-19',
      },
    ],
    'CAT-002': [
      {
        id: 'CAT-002-1',
        name: "Men's Clothing",
        slug: 'mens-clothing',
        description: 'Fashion for men',
        image: 'https://via.placeholder.com/100/AA96DA/ffffff?text=Men',
        icon: '👔',
        parentCategory: 'Fashion',
        parentId: 'CAT-002',
        status: 'Active',
        productsCount: 156,
        order: 1,
        featured: true,
        seoTitle: "Men's Fashion",
        seoDescription: 'Trendy clothing for men',
        createdDate: '2024-01-21',
      },
      {
        id: 'CAT-002-2',
        name: "Women's Clothing",
        slug: 'womens-clothing',
        description: 'Fashion for women',
        image: 'https://via.placeholder.com/100/FCBAD3/ffffff?text=Women',
        icon: '👗',
        parentCategory: 'Fashion',
        parentId: 'CAT-002',
        status: 'Active',
        productsCount: 198,
        order: 2,
        featured: true,
        seoTitle: "Women's Fashion",
        seoDescription: 'Trendy clothing for women',
        createdDate: '2024-01-22',
      },
      {
        id: 'CAT-002-3',
        name: 'Shoes',
        slug: 'shoes',
        description: 'Footwear for all',
        image: 'https://via.placeholder.com/100/A8D8EA/ffffff?text=Shoes',
        icon: '👟',
        parentCategory: 'Fashion',
        parentId: 'CAT-002',
        status: 'Active',
        productsCount: 78,
        order: 3,
        featured: false,
        seoTitle: 'Shoes & Footwear',
        seoDescription: 'Comfortable shoes',
        createdDate: '2024-01-23',
      },
    ],
    'CAT-003': [
      {
        id: 'CAT-003-1',
        name: 'Furniture',
        slug: 'furniture',
        description: 'Home furniture',
        image: 'https://via.placeholder.com/100/FF6B9D/ffffff?text=Furniture',
        icon: '🛋️',
        parentCategory: 'Home & Living',
        parentId: 'CAT-003',
        status: 'Active',
        productsCount: 134,
        order: 1,
        featured: true,
        seoTitle: 'Home Furniture',
        seoDescription: 'Quality furniture',
        createdDate: '2024-01-25',
      },
      {
        id: 'CAT-003-2',
        name: 'Kitchen',
        slug: 'kitchen',
        description: 'Kitchen essentials',
        image: 'https://via.placeholder.com/100/C7CEEA/ffffff?text=Kitchen',
        icon: '🍳',
        parentCategory: 'Home & Living',
        parentId: 'CAT-003',
        status: 'Active',
        productsCount: 98,
        order: 2,
        featured: false,
        seoTitle: 'Kitchen Essentials',
        seoDescription: 'Everything for cooking',
        createdDate: '2024-01-26',
      },
      {
        id: 'CAT-003-3',
        name: 'Decor',
        slug: 'decor',
        description: 'Home decoration items',
        image: 'https://via.placeholder.com/100/FFEAA7/ffffff?text=Decor',
        icon: '🖼️',
        parentCategory: 'Home & Living',
        parentId: 'CAT-003',
        status: 'Active',
        productsCount: 55,
        order: 3,
        featured: false,
        seoTitle: 'Home Decor',
        seoDescription: 'Beautiful decorations',
        createdDate: '2024-01-27',
      },
    ],
    'CAT-004': [
      {
        id: 'CAT-004-1',
        name: 'Gym Equipment',
        slug: 'gym-equipment',
        description: 'Fitness equipment',
        image: 'https://via.placeholder.com/100/FD79A8/ffffff?text=Gym',
        icon: '🏋️',
        parentCategory: 'Sports & Fitness',
        parentId: 'CAT-004',
        status: 'Active',
        productsCount: 89,
        order: 1,
        featured: false,
        seoTitle: 'Gym Equipment',
        seoDescription: 'Home gym essentials',
        createdDate: '2024-01-29',
      },
      {
        id: 'CAT-004-2',
        name: 'Outdoor Sports',
        slug: 'outdoor-sports',
        description: 'Outdoor activities gear',
        image: 'https://via.placeholder.com/100/A29BFE/ffffff?text=Outdoor',
        icon: '🏃',
        parentCategory: 'Sports & Fitness',
        parentId: 'CAT-004',
        status: 'Active',
        productsCount: 89,
        order: 2,
        featured: false,
        seoTitle: 'Outdoor Sports',
        seoDescription: 'Gear for outdoor activities',
        createdDate: '2024-01-30',
      },
    ],
    'CAT-005': [
      {
        id: 'CAT-005-1',
        name: 'Fiction',
        slug: 'fiction',
        description: 'Fiction books',
        image: 'https://via.placeholder.com/100/E17055/ffffff?text=Fiction',
        icon: '📖',
        parentCategory: 'Books & Stationery',
        parentId: 'CAT-005',
        status: 'Inactive',
        productsCount: 78,
        order: 1,
        featured: false,
        seoTitle: 'Fiction Books',
        seoDescription: 'Best fiction novels',
        createdDate: '2024-02-02',
      },
      {
        id: 'CAT-005-2',
        name: 'Office Supplies',
        slug: 'office-supplies',
        description: 'Office essentials',
        image: 'https://via.placeholder.com/100/00B894/ffffff?text=Office',
        icon: '✏️',
        parentCategory: 'Books & Stationery',
        parentId: 'CAT-005',
        status: 'Inactive',
        productsCount: 78,
        order: 2,
        featured: false,
        seoTitle: 'Office Supplies',
        seoDescription: 'Everything for office',
        createdDate: '2024-02-03',
      },
    ],
  }

  // Get current parent category
  const parentCategory = parentId ? parentCategories[parentId] : null

  // Get sub categories for current parent
  const subCategories = parentId ? (allSubCategories[parentId] || []) : []

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ]

  // Filter sub categories
  const filteredSubCategories = subCategories.filter(category => {
    const matchesSearch = 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredSubCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentSubCategories = filteredSubCategories.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Calculate stats
  const stats = [
    { 
      label: 'Total Sub-Categories', 
      value: subCategories.length, 
      icon: '📂', 
      color: 'bg-blue-100 text-blue-800' 
    },
    { 
      label: 'Active', 
      value: subCategories.filter(c => c.status === 'Active').length, 
      icon: '✅', 
      color: 'bg-green-100 text-green-800' 
    },
    { 
      label: 'Featured', 
      value: subCategories.filter(c => c.featured).length, 
      icon: '⭐', 
      color: 'bg-yellow-100 text-yellow-800' 
    },
    { 
      label: 'Total Products', 
      value: subCategories.reduce((sum, cat) => sum + cat.productsCount, 0), 
      icon: '📦', 
      color: 'bg-purple-100 text-purple-800' 
    },
  ]

  // If no parent selected, show parent selection
  if (!parentId) {
    return (
      <div className="p-6 lg:p-8 space-y-6">
        <PageHeader
          icon={MdSubdirectoryArrowRight}
          title="Sub-Categories"
          subtitle="Select a parent category to view its sub-categories"
        />

        {/* Parent Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(parentCategories).map((parent) => {
            const subCount = allSubCategories[parent.id]?.length || 0
            
            return (
              <Link
                key={parent.id}
                to={`/category/sub-cat?parent=${parent.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-500 transition-all p-6 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <img 
                        src={parent.image} 
                        alt={parent.name}
                        className="w-20 h-20 rounded-xl object-cover border border-gray-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{parent.icon}</span>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {parent.name}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{parent.id}</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 rounded-lg p-2">
                          <p className="text-xs text-gray-600 mb-1">Sub-Categories</p>
                          <p className="text-lg font-bold text-blue-600">{subCount}</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-2">
                          <p className="text-xs text-gray-600 mb-1">Products</p>
                          <p className="text-lg font-bold text-purple-600">{parent.productsCount}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <StatusBadge status={parent.status} type="category" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">View Sub-Categories</span>
                      <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Breadcrumb & Header */}
      <div className="space-y-4">
        <Link to="/category/sub-cat">
          <Button
            variant="text"
            className="text-blue-600! hover:bg-blue-50! rounded-xl! px-4! py-2! font-semibold! capitalize!"
            startIcon={<FaArrowLeft />}
          >
            Back to Parent Categories
          </Button>
        </Link>

        <PageHeader
          icon={MdSubdirectoryArrowRight}
          title={`${parentCategory?.name} - Sub-Categories`}
          subtitle={`Manage sub-categories under ${parentCategory?.name}`}
          actions={
            <>
              <Link to={`/category/sub-cat/add?parent=${parentId}`}>
                <Button
                  variant="contained"
                  className="bg-blue-600! text-white! hover:bg-blue-700! shadow-lg! rounded-xl! px-5! py-2.5! font-semibold! capitalize!"
                  startIcon={<FaPlus />}
                >
                  Add Sub-Category
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
      </div>

      {/* Parent Category Info */}
      {parentCategory && (
        <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
          <div className="flex items-center gap-6">
            <img 
              src={parentCategory.image} 
              alt={parentCategory.name}
              className="w-24 h-24 rounded-xl object-cover border-2 border-blue-300 shadow-md"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{parentCategory.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{parentCategory.name}</h2>
                <StatusBadge status={parentCategory.status} type="category" />
              </div>
              <p className="text-sm text-gray-600 mb-3">ID: {parentCategory.id}</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-semibold">📂</span>
                  <span className="text-gray-700">{subCategories.length} Sub-Categories</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 font-semibold">📦</span>
                  <span className="text-gray-700">{parentCategory.productsCount} Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name, Slug, ID..."
          />
          
          <FilterDropdown
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
        </div>
      </div>

      {/* Sub-Categories Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">
            Sub-Categories List ({filteredSubCategories.length})
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Details</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Order</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Products</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">SEO</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Created</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentSubCategories.length > 0 ? (
                currentSubCategories.map((category, index) => (
                  <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                    {/* Category */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <MdSubdirectoryArrowRight className="w-5 h-5 text-blue-500 shrink-0" />
                        
                        <div className="shrink-0">
                          {category.image ? (
                            <img 
                              src={category.image} 
                              alt={category.name}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl border border-gray-200">
                              {category.icon}
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-bold text-gray-900">{category.name}</p>
                          <p className="text-xs text-blue-600 font-medium">{category.id}</p>
                          {category.featured && (
                            <span className="inline-flex mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Details */}
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          Slug: <span className="text-blue-600">{category.slug}</span>
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                    </td>

                    {/* Order */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                        <span className="text-lg font-bold text-blue-600">{category.order}</span>
                      </div>
                    </td>

                    {/* Products Count */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">📦</span>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            {category.productsCount}
                          </p>
                          <p className="text-xs text-gray-500">Products</p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={category.status} type="category" />
                    </td>

                    {/* SEO */}
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                          {category.seoTitle}
                        </p>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {category.seoDescription}
                        </p>
                      </div>
                    </td>

                    {/* Created Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">{category.createdDate}</p>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ActionButtons
                        onView={() => console.log('View', category.id)}
                        onEdit={() => console.log('Edit', category.id)}
                        onDelete={() => console.log('Delete', category.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    <EmptyState
                      icon="📂"
                      title="No sub-categories found"
                      subtitle="Try adjusting your search or create a new sub-category"
                      action={
                        <Link to={`/category/sub-cat/add?parent=${parentId}`}>
                          <Button
                            variant="contained"
                            className="bg-blue-600! text-white! hover:bg-blue-700! rounded-xl! px-5! py-2.5! font-semibold! capitalize!"
                            startIcon={<FaPlus />}
                          >
                            Add First Sub-Category
                          </Button>
                        </Link>
                      }
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredSubCategories.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={filteredSubCategories.length}
            itemName="sub-categories"
          />
        )}
      </div>

      {/* Info Card */}
      <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <MdCategory className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Sub-Category Tips</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Sub-categories help organize products within main categories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Use display order to control how sub-categories appear</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Mark popular sub-categories as featured for better visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Keep sub-category names clear and specific for better UX</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubListCategoryPage