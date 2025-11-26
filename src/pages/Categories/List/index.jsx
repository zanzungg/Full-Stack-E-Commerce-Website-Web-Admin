import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { IoDownloadOutline } from "react-icons/io5"
import { FaPlus, FaLayerGroup } from "react-icons/fa"
import { MdCategory, MdExpandMore, MdExpandLess, MdSubdirectoryArrowRight } from "react-icons/md"

// Import Reusable Components
import SearchBar from '../../../components/SearchBar'
import FilterDropdown from '../../../components/FilterDropdown'
import StatsCard from '../../../components/StatsCard'
import StatusBadge from '../../../components/StatusBadge'
import ActionButtons from '../../../components/ActionButtons'
import Pagination from '../../../components/Pagination'
import PageHeader from '../../../components/PageHeader'
import EmptyState from '../../../components/EmptyState'

const CategoryListPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedCategories, setExpandedCategories] = useState([])
  const itemsPerPage = 10

  // Sample Categories Data with hierarchy
  const categoriesData = [
    {
      id: 'CAT-001',
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic devices and gadgets',
      image: 'https://via.placeholder.com/100/4A90E2/ffffff?text=Electronics',
      icon: '💻',
      parentCategory: null,
      type: 'Parent',
      status: 'Active',
      productsCount: 245,
      order: 1,
      featured: true,
      seoTitle: 'Electronics - Latest Gadgets',
      seoDescription: 'Shop the latest electronics',
      createdDate: '2024-01-15',
      subCategories: [
        {
          id: 'CAT-001-1',
          name: 'Mobile Phones',
          slug: 'mobile-phones',
          description: 'Smartphones and accessories',
          image: 'https://via.placeholder.com/100/50C878/ffffff?text=Mobile',
          icon: '📱',
          parentCategory: 'Electronics',
          type: 'Sub',
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
          type: 'Sub',
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
          type: 'Sub',
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
          type: 'Sub',
          status: 'Active',
          productsCount: 44,
          order: 4,
          featured: false,
          seoTitle: 'Cameras & Photography',
          seoDescription: 'Professional cameras',
          createdDate: '2024-01-19',
        },
      ]
    },
    {
      id: 'CAT-002',
      name: 'Fashion',
      slug: 'fashion',
      description: 'Clothing and accessories',
      image: 'https://via.placeholder.com/100/F38181/ffffff?text=Fashion',
      icon: '👕',
      parentCategory: null,
      type: 'Parent',
      status: 'Active',
      productsCount: 432,
      order: 2,
      featured: true,
      seoTitle: 'Fashion - Trendy Clothing',
      seoDescription: 'Latest fashion trends',
      createdDate: '2024-01-20',
      subCategories: [
        {
          id: 'CAT-002-1',
          name: "Men's Clothing",
          slug: 'mens-clothing',
          description: 'Fashion for men',
          image: 'https://via.placeholder.com/100/AA96DA/ffffff?text=Men',
          icon: '👔',
          parentCategory: 'Fashion',
          type: 'Sub',
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
          type: 'Sub',
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
          type: 'Sub',
          status: 'Active',
          productsCount: 78,
          order: 3,
          featured: false,
          seoTitle: 'Shoes & Footwear',
          seoDescription: 'Comfortable shoes',
          createdDate: '2024-01-23',
        },
      ]
    },
    {
      id: 'CAT-003',
      name: 'Home & Living',
      slug: 'home-living',
      description: 'Furniture and home decor',
      image: 'https://via.placeholder.com/100/FFE66D/ffffff?text=Home',
      icon: '🏠',
      parentCategory: null,
      type: 'Parent',
      status: 'Active',
      productsCount: 287,
      order: 3,
      featured: true,
      seoTitle: 'Home & Living',
      seoDescription: 'Transform your space',
      createdDate: '2024-01-24',
      subCategories: [
        {
          id: 'CAT-003-1',
          name: 'Furniture',
          slug: 'furniture',
          description: 'Home furniture',
          image: 'https://via.placeholder.com/100/FF6B9D/ffffff?text=Furniture',
          icon: '🛋️',
          parentCategory: 'Home & Living',
          type: 'Sub',
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
          type: 'Sub',
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
          type: 'Sub',
          status: 'Active',
          productsCount: 55,
          order: 3,
          featured: false,
          seoTitle: 'Home Decor',
          seoDescription: 'Beautiful decorations',
          createdDate: '2024-01-27',
        },
      ]
    },
    {
      id: 'CAT-004',
      name: 'Sports & Fitness',
      slug: 'sports-fitness',
      description: 'Sports equipment and fitness gear',
      image: 'https://via.placeholder.com/100/55E6C1/ffffff?text=Sports',
      icon: '⚽',
      parentCategory: null,
      type: 'Parent',
      status: 'Active',
      productsCount: 178,
      order: 4,
      featured: false,
      seoTitle: 'Sports & Fitness',
      seoDescription: 'Stay active and healthy',
      createdDate: '2024-01-28',
      subCategories: [
        {
          id: 'CAT-004-1',
          name: 'Gym Equipment',
          slug: 'gym-equipment',
          description: 'Fitness equipment',
          image: 'https://via.placeholder.com/100/FD79A8/ffffff?text=Gym',
          icon: '🏋️',
          parentCategory: 'Sports & Fitness',
          type: 'Sub',
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
          type: 'Sub',
          status: 'Active',
          productsCount: 89,
          order: 2,
          featured: false,
          seoTitle: 'Outdoor Sports',
          seoDescription: 'Gear for outdoor activities',
          createdDate: '2024-01-30',
        },
      ]
    },
    {
      id: 'CAT-005',
      name: 'Books & Stationery',
      slug: 'books-stationery',
      description: 'Books and office supplies',
      image: 'https://via.placeholder.com/100/74B9FF/ffffff?text=Books',
      icon: '📚',
      parentCategory: null,
      type: 'Parent',
      status: 'Inactive',
      productsCount: 156,
      order: 5,
      featured: false,
      seoTitle: 'Books & Stationery',
      seoDescription: 'Books and supplies',
      createdDate: '2024-02-01',
      subCategories: [
        {
          id: 'CAT-005-1',
          name: 'Fiction',
          slug: 'fiction',
          description: 'Fiction books',
          image: 'https://via.placeholder.com/100/E17055/ffffff?text=Fiction',
          icon: '📖',
          parentCategory: 'Books & Stationery',
          type: 'Sub',
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
          type: 'Sub',
          status: 'Inactive',
          productsCount: 78,
          order: 2,
          featured: false,
          seoTitle: 'Office Supplies',
          seoDescription: 'Everything for office',
          createdDate: '2024-02-03',
        },
      ]
    },
  ]

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ]

  // Type options
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Parent', label: 'Parent Categories' },
    { value: 'Sub', label: 'Sub Categories' },
  ]

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  // Flatten categories with subcategories
  const flattenCategories = (categories) => {
    const result = []
    categories.forEach(category => {
      result.push(category)
      if (expandedCategories.includes(category.id) && category.subCategories) {
        result.push(...category.subCategories)
      }
    })
    return result
  }

  // Filter categories
  const filteredCategories = categoriesData.filter(category => {
    const matchesSearch = 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter
    const matchesType = typeFilter === 'all' || category.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const flatCategories = flattenCategories(filteredCategories)

  // Pagination
  const totalPages = Math.ceil(flatCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCategories = flatCategories.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Calculate stats
  const totalCategories = categoriesData.length
  const totalSubCategories = categoriesData.reduce((sum, cat) => 
    sum + (cat.subCategories?.length || 0), 0
  )
  const totalProducts = categoriesData.reduce((sum, cat) => sum + cat.productsCount, 0)

  const stats = [
    { 
      label: 'Total Categories', 
      value: totalCategories, 
      icon: '📁', 
      color: 'bg-blue-100 text-blue-800' 
    },
    { 
      label: 'Sub Categories', 
      value: totalSubCategories, 
      icon: '📂', 
      color: 'bg-green-100 text-green-800' 
    },
    { 
      label: 'Total Products', 
      value: totalProducts, 
      icon: '📦', 
      color: 'bg-purple-100 text-purple-800' 
    },
    { 
      label: 'Active', 
      value: categoriesData.filter(c => c.status === 'Active').length, 
      icon: '✅', 
      color: 'bg-green-100 text-green-800' 
    },
  ]

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <PageHeader
        icon={MdCategory}
        title="Categories Management"
        subtitle="Organize and manage product categories"
        actions={
          <>
            <Link to="/category/add">
              <Button
                variant="contained"
                className="bg-blue-600! text-white! hover:bg-blue-700! shadow-lg! rounded-xl! px-5! py-2.5! font-semibold! capitalize!"
                startIcon={<FaPlus />}
              >
                Add Category
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

          <FilterDropdown
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            options={typeOptions}
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">
            Categories List ({filteredCategories.length} parent, {totalSubCategories} sub)
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Products</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">SEO</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Created</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentCategories.length > 0 ? (
                currentCategories.map((category, index) => {
                  const isParent = category.type === 'Parent'
                  const isSub = category.type === 'Sub'
                  const isExpanded = expandedCategories.includes(category.id)
                  const hasSubCategories = category.subCategories && category.subCategories.length > 0

                  return (
                    <tr key={index} className={`hover:bg-gray-50 transition-colors ${isSub ? 'bg-blue-50/30' : ''}`}>
                      {/* Category */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* Expand/Collapse button for parent categories */}
                          {isParent && hasSubCategories && (
                            <button
                              onClick={() => toggleCategory(category.id)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              {isExpanded ? (
                                <MdExpandLess className="w-5 h-5 text-gray-600" />
                              ) : (
                                <MdExpandMore className="w-5 h-5 text-gray-600" />
                              )}
                            </button>
                          )}

                          {/* Indent for sub categories */}
                          {isSub && (
                            <MdSubdirectoryArrowRight className="w-5 h-5 text-blue-500 ml-2" />
                          )}

                          {/* Category Image/Icon */}
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

                          {/* Category Name & ID */}
                          <div>
                            <p className={`font-bold ${isSub ? 'text-gray-700' : 'text-gray-900'}`}>
                              {category.name}
                            </p>
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

                      {/* Type */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {isParent ? (
                            <>
                              <FaLayerGroup className="w-4 h-4 text-purple-600" />
                              <span className="text-sm font-semibold text-purple-600">Parent</span>
                            </>
                          ) : (
                            <>
                              <MdSubdirectoryArrowRight className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-semibold text-blue-600">Sub</span>
                            </>
                          )}
                        </div>
                        {category.parentCategory && (
                          <p className="text-xs text-gray-500 mt-1">
                            Parent: {category.parentCategory}
                          </p>
                        )}
                      </td>

                      {/* Products Count */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
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
                  )
                })
              ) : (
                <tr>
                  <td colSpan="8">
                    <EmptyState
                      icon="📁"
                      title="No categories found"
                      subtitle="Try adjusting your search or filters"
                      action={
                        <Link to="/categories/add">
                          <Button
                            variant="contained"
                            className="bg-blue-600! text-white! hover:bg-blue-700! rounded-xl! px-5! py-2.5! font-semibold! capitalize!"
                            startIcon={<FaPlus />}
                          >
                            Add First Category
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
        {flatCategories.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={flatCategories.length}
            itemName="categories"
          />
        )}
      </div>

      {/* Info Card */}
      <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200 p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <MdCategory className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Category Guidelines</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Hierarchy:</strong> Use parent categories for main sections and sub-categories for specific products</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>SEO Friendly:</strong> Add proper SEO titles and descriptions for better search rankings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Featured Categories:</strong> Mark important categories as featured to display on homepage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">•</span>
                <span><strong>Image Size:</strong> Use 300x300px square images for best results</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryListPage