import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { IoDownloadOutline } from "react-icons/io5"
import { FaPlus, FaImage } from "react-icons/fa"
import { MdDragIndicator, MdVisibility, MdVisibilityOff } from "react-icons/md"

// Import Reusable Components
import SearchBar from '../../../components/SearchBar'
import FilterDropdown from '../../../components/FilterDropdown'
import StatsCard from '../../../components/StatsCard'
import StatusBadge from '../../../components/StatusBadge'
import ActionButtons from '../../../components/ActionButtons'
import Pagination from '../../../components/Pagination'
import PageHeader from '../../../components/PageHeader'
import EmptyState from '../../../components/EmptyState'

const HomeSliderBanners = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Sample Banners Data
  const bannersData = [
    {
      id: 'BNR-001',
      title: 'Summer Sale 2024',
      subtitle: 'Up to 70% Off',
      description: 'Get amazing deals on electronics and accessories',
      image: 'https://via.placeholder.com/1200x400/FF6B6B/ffffff?text=Summer+Sale',
      link: '/category/electronics',
      buttonText: 'Shop Now',
      position: 1,
      status: 'Active',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      views: 15420,
      clicks: 2341,
      ctr: '15.2%',
    },
    {
      id: 'BNR-002',
      title: 'New Arrivals',
      subtitle: 'Fresh Collection',
      description: 'Check out our latest products',
      image: 'https://via.placeholder.com/1200x400/4ECDC4/ffffff?text=New+Arrivals',
      link: '/category/new-arrivals',
      buttonText: 'Explore',
      position: 2,
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      views: 12890,
      clicks: 1876,
      ctr: '14.5%',
    },
    {
      id: 'BNR-003',
      title: 'Gaming Week',
      subtitle: 'Best Deals on Gaming',
      description: 'Upgrade your gaming setup now',
      image: 'https://via.placeholder.com/1200x400/95E1D3/ffffff?text=Gaming+Week',
      link: '/category/gaming',
      buttonText: 'Game On',
      position: 3,
      status: 'Scheduled',
      startDate: '2024-12-01',
      endDate: '2024-12-07',
      views: 0,
      clicks: 0,
      ctr: '0%',
    },
    {
      id: 'BNR-004',
      title: 'Mega Clearance',
      subtitle: 'Last Chance',
      description: 'Final clearance sale - limited stock',
      image: 'https://via.placeholder.com/1200x400/F38181/ffffff?text=Clearance+Sale',
      link: '/category/clearance',
      buttonText: 'Buy Now',
      position: 4,
      status: 'Inactive',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      views: 8765,
      clicks: 987,
      ctr: '11.3%',
    },
    {
      id: 'BNR-005',
      title: 'Black Friday',
      subtitle: 'Biggest Sale of the Year',
      description: 'Unbeatable prices on everything',
      image: 'https://via.placeholder.com/1200x400/AA96DA/ffffff?text=Black+Friday',
      link: '/category/black-friday',
      buttonText: 'Shop Sale',
      position: 5,
      status: 'Scheduled',
      startDate: '2024-11-29',
      endDate: '2024-11-30',
      views: 0,
      clicks: 0,
      ctr: '0%',
    },
    {
      id: 'BNR-006',
      title: 'Tech Fest',
      subtitle: 'Latest Technology',
      description: 'Discover cutting-edge tech products',
      image: 'https://via.placeholder.com/1200x400/FCBAD3/ffffff?text=Tech+Fest',
      link: '/category/technology',
      buttonText: 'Discover',
      position: 6,
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      views: 10234,
      clicks: 1543,
      ctr: '15.1%',
    },
    {
      id: 'BNR-007',
      title: 'Fashion Week',
      subtitle: 'Trendy Styles',
      description: 'Latest fashion trends for everyone',
      image: 'https://via.placeholder.com/1200x400/A8D8EA/ffffff?text=Fashion+Week',
      link: '/category/fashion',
      buttonText: 'Shop Fashion',
      position: 7,
      status: 'Inactive',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      views: 6543,
      clicks: 765,
      ctr: '11.7%',
    },
    {
      id: 'BNR-008',
      title: 'Home & Living',
      subtitle: 'Transform Your Space',
      description: 'Beautiful furniture and decor',
      image: 'https://via.placeholder.com/1200x400/FFE66D/ffffff?text=Home+Living',
      link: '/category/home',
      buttonText: 'Browse',
      position: 8,
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      views: 9876,
      clicks: 1234,
      ctr: '12.5%',
    },
  ]

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Scheduled', label: 'Scheduled' },
  ]

  // Filter banners
  const filteredBanners = bannersData.filter(banner => {
    const matchesSearch = 
      banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || banner.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBanners = filteredBanners.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Calculate stats
  const stats = [
    { 
      label: 'Total Banners', 
      value: bannersData.length, 
      icon: '🖼️', 
      color: 'bg-blue-100 text-blue-800' 
    },
    { 
      label: 'Active', 
      value: bannersData.filter(b => b.status === 'Active').length, 
      icon: '✅', 
      color: 'bg-green-100 text-green-800' 
    },
    { 
      label: 'Scheduled', 
      value: bannersData.filter(b => b.status === 'Scheduled').length, 
      icon: '📅', 
      color: 'bg-yellow-100 text-yellow-800' 
    },
    { 
      label: 'Inactive', 
      value: bannersData.filter(b => b.status === 'Inactive').length, 
      icon: '❌', 
      color: 'bg-red-100 text-red-800' 
    },
  ]

  // Get status badge
  const getStatusBadge = (status) => {
    const colors = {
      Active: 'bg-green-100 text-green-800',
      Inactive: 'bg-red-100 text-red-800',
      Scheduled: 'bg-yellow-100 text-yellow-800'
    }
    return (
      <span className={`inline-flex px-3 py-1.5 text-xs font-semibold rounded-full ${colors[status]}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <PageHeader
        icon={FaImage}
        title="Home Slider Banners"
        subtitle="Manage homepage slider banners and promotional content"
        actions={
          <>
            <Link to="/home-banner-slide/add">
              <Button
                variant="contained"
                className="bg-blue-600! text-white! hover:bg-blue-700! shadow-lg! rounded-xl! px-5! py-2.5! font-semibold! capitalize!"
                startIcon={<FaPlus />}
              >
                Add Banner
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
            placeholder="Search by ID, Title, Subtitle..."
          />
          
          <FilterDropdown
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
          />
        </div>
      </div>

      {/* Banners Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">
            Banners List ({filteredBanners.length})
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Banner</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Content</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Link & CTA</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Performance</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentBanners.length > 0 ? (
                currentBanners.map((banner, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    {/* Order */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <MdDragIndicator className="w-5 h-5 text-gray-400 cursor-move" />
                        <span className="font-bold text-gray-900">{banner.position}</span>
                      </div>
                    </td>

                    {/* Banner */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img 
                          src={banner.image} 
                          alt={banner.title}
                          className="w-32 h-20 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-blue-600 text-sm">{banner.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Content */}
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="font-bold text-gray-900 mb-1">{banner.title}</p>
                        <p className="text-sm font-semibold text-blue-600 mb-1">{banner.subtitle}</p>
                        <p className="text-xs text-gray-600 line-clamp-2">{banner.description}</p>
                      </div>
                    </td>

                    {/* Link & CTA */}
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 font-medium mb-1">
                          <span className="text-gray-500">Link:</span> {banner.link}
                        </p>
                        <div className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-semibold">
                          {banner.buttonText}
                        </div>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <p className="text-gray-900 font-medium">
                          <span className="text-gray-500">Start:</span> {banner.startDate}
                        </p>
                        <p className="text-gray-900 font-medium mt-1">
                          <span className="text-gray-500">End:</span> {banner.endDate}
                        </p>
                      </div>
                    </td>

                    {/* Performance */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <MdVisibility className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 font-medium">{banner.views.toLocaleString()} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-600 font-semibold">{banner.clicks.toLocaleString()} clicks</span>
                        </div>
                        <div className="inline-flex px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-bold">
                          CTR: {banner.ctr}
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(banner.status)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ActionButtons
                        onView={() => console.log('View', banner.id)}
                        onEdit={() => console.log('Edit', banner.id)}
                        onDelete={() => console.log('Delete', banner.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">
                    <EmptyState
                      icon="🖼️"
                      title="No banners found"
                      subtitle="Try adjusting your search or filters"
                      action={
                        <Link to="/home-banners/upload">
                          <Button
                            variant="contained"
                            className="bg-blue-600! text-white! hover:bg-blue-700! rounded-xl! px-5! py-2.5! font-semibold! capitalize!"
                            startIcon={<FaPlus />}
                          >
                            Add First Banner
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
        {filteredBanners.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={filteredBanners.length}
            itemName="banners"
          />
        )}
      </div>

      {/* Info Card */}
      <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <FaImage className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Banner Guidelines</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Recommended Size:</strong> 1200 x 400 pixels (3:1 ratio)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>File Format:</strong> JPG, PNG or WebP</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Max File Size:</strong> 2MB for optimal loading</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Best Practices:</strong> Use high contrast text, clear CTA buttons, and mobile-friendly designs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSliderBanners