import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { IoDownloadOutline } from "react-icons/io5"
import { FaPlus, FaUserFriends } from "react-icons/fa"
import { MdEmail, MdPhone, MdLocationOn, MdVerified } from "react-icons/md"

// Import Reusable Components
import SearchBar from '../../components/SearchBar'
import FilterDropdown from '../../components/FilterDropdown'
import StatsCard from '../../components/StatsCard'
import StatusBadge from '../../components/StatusBadge'
import ActionButtons from '../../components/ActionButtons'
import Pagination from '../../components/Pagination'
import PageHeader from '../../components/PageHeader'
import EmptyState from '../../components/EmptyState'

const CustomersPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Sample Customers Data
  const customersData = [
    {
      id: 'CUST-001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      avatar: 'https://i.pravatar.cc/150?img=1',
      location: 'New York, USA',
      type: 'Premium',
      status: 'Active',
      verified: true,
      totalOrders: 45,
      totalSpent: 12450.00,
      lastOrder: '2024-11-20',
      joinDate: '2023-05-15',
      loyaltyPoints: 2450,
    },
    {
      id: 'CUST-002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8901',
      avatar: 'https://i.pravatar.cc/150?img=5',
      location: 'Los Angeles, USA',
      type: 'VIP',
      status: 'Active',
      verified: true,
      totalOrders: 78,
      totalSpent: 25680.00,
      lastOrder: '2024-11-22',
      joinDate: '2023-01-10',
      loyaltyPoints: 5680,
    },
    {
      id: 'CUST-003',
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      phone: '+1 234 567 8902',
      avatar: 'https://i.pravatar.cc/150?img=12',
      location: 'Chicago, USA',
      type: 'Regular',
      status: 'Active',
      verified: true,
      totalOrders: 23,
      totalSpent: 5670.00,
      lastOrder: '2024-11-18',
      joinDate: '2023-08-22',
      loyaltyPoints: 1120,
    },
    {
      id: 'CUST-004',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+1 234 567 8903',
      avatar: 'https://i.pravatar.cc/150?img=9',
      location: 'Houston, USA',
      type: 'Premium',
      status: 'Active',
      verified: false,
      totalOrders: 34,
      totalSpent: 8920.00,
      lastOrder: '2024-11-19',
      joinDate: '2023-06-30',
      loyaltyPoints: 1780,
    },
    {
      id: 'CUST-005',
      name: 'David Brown',
      email: 'david.brown@example.com',
      phone: '+1 234 567 8904',
      avatar: 'https://i.pravatar.cc/150?img=14',
      location: 'Phoenix, USA',
      type: 'Regular',
      status: 'Inactive',
      verified: true,
      totalOrders: 12,
      totalSpent: 2340.00,
      lastOrder: '2024-09-15',
      joinDate: '2023-11-05',
      loyaltyPoints: 470,
    },
    {
      id: 'CUST-006',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+1 234 567 8905',
      avatar: 'https://i.pravatar.cc/150?img=20',
      location: 'Philadelphia, USA',
      type: 'VIP',
      status: 'Active',
      verified: true,
      totalOrders: 92,
      totalSpent: 34560.00,
      lastOrder: '2024-11-23',
      joinDate: '2022-12-18',
      loyaltyPoints: 6910,
    },
    {
      id: 'CUST-007',
      name: 'James Martinez',
      email: 'james.m@example.com',
      phone: '+1 234 567 8906',
      avatar: 'https://i.pravatar.cc/150?img=33',
      location: 'San Antonio, USA',
      type: 'Regular',
      status: 'Active',
      verified: true,
      totalOrders: 18,
      totalSpent: 4230.00,
      lastOrder: '2024-11-21',
      joinDate: '2024-02-14',
      loyaltyPoints: 850,
    },
    {
      id: 'CUST-008',
      name: 'Linda Garcia',
      email: 'linda.garcia@example.com',
      phone: '+1 234 567 8907',
      avatar: 'https://i.pravatar.cc/150?img=24',
      location: 'San Diego, USA',
      type: 'Premium',
      status: 'Active',
      verified: true,
      totalOrders: 41,
      totalSpent: 10890.00,
      lastOrder: '2024-11-20',
      joinDate: '2023-04-08',
      loyaltyPoints: 2180,
    },
    {
      id: 'CUST-009',
      name: 'Robert Anderson',
      email: 'robert.a@example.com',
      phone: '+1 234 567 8908',
      avatar: 'https://i.pravatar.cc/150?img=51',
      location: 'Dallas, USA',
      type: 'Regular',
      status: 'Suspended',
      verified: false,
      totalOrders: 8,
      totalSpent: 1560.00,
      lastOrder: '2024-10-05',
      joinDate: '2024-03-20',
      loyaltyPoints: 310,
    },
    {
      id: 'CUST-010',
      name: 'Maria Rodriguez',
      email: 'maria.r@example.com',
      phone: '+1 234 567 8909',
      avatar: 'https://i.pravatar.cc/150?img=16',
      location: 'San Jose, USA',
      type: 'VIP',
      status: 'Active',
      verified: true,
      totalOrders: 65,
      totalSpent: 18750.00,
      lastOrder: '2024-11-22',
      joinDate: '2023-03-12',
      loyaltyPoints: 3750,
    },
    {
      id: 'CUST-011',
      name: 'William Taylor',
      email: 'william.t@example.com',
      phone: '+1 234 567 8910',
      avatar: 'https://i.pravatar.cc/150?img=68',
      location: 'Austin, USA',
      type: 'Regular',
      status: 'Active',
      verified: true,
      totalOrders: 15,
      totalSpent: 3420.00,
      lastOrder: '2024-11-17',
      joinDate: '2024-01-25',
      loyaltyPoints: 680,
    },
    {
      id: 'CUST-012',
      name: 'Patricia Thomas',
      email: 'patricia.t@example.com',
      phone: '+1 234 567 8911',
      avatar: 'https://i.pravatar.cc/150?img=45',
      location: 'Jacksonville, USA',
      type: 'Premium',
      status: 'Active',
      verified: true,
      totalOrders: 29,
      totalSpent: 7650.00,
      lastOrder: '2024-11-19',
      joinDate: '2023-07-18',
      loyaltyPoints: 1530,
    },
  ]

  // Status options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Suspended', label: 'Suspended' },
  ]

  // Type options
  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'Regular', label: 'Regular' },
    { value: 'Premium', label: 'Premium' },
    { value: 'VIP', label: 'VIP' },
  ]

  // Filter customers
  const filteredCustomers = customersData.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    const matchesType = typeFilter === 'all' || customer.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Calculate stats
  const totalCustomers = customersData.length
  const activeCustomers = customersData.filter(c => c.status === 'Active').length
  const vipCustomers = customersData.filter(c => c.type === 'VIP').length
  const totalRevenue = customersData.reduce((sum, c) => sum + c.totalSpent, 0)

  const stats = [
    { 
      label: 'Total Customers', 
      value: totalCustomers, 
      icon: '👥', 
      color: 'bg-blue-100 text-blue-800' 
    },
    { 
      label: 'Active Customers', 
      value: activeCustomers, 
      icon: '✅', 
      color: 'bg-green-100 text-green-800' 
    },
    { 
      label: 'VIP Customers', 
      value: vipCustomers, 
      icon: '⭐', 
      color: 'bg-yellow-100 text-yellow-800' 
    },
    { 
      label: 'Total Revenue', 
      value: `$${totalRevenue.toLocaleString()}`, 
      icon: '💰', 
      color: 'bg-purple-100 text-purple-800' 
    },
  ]

  // Get type badge color
  const getTypeBadgeColor = (type) => {
    switch(type) {
      case 'VIP':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Premium':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'Regular':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <PageHeader
        icon={FaUserFriends}
        title="Customers Management"
        subtitle="Manage and monitor your customer base"
        actions={
          <>
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
            placeholder="Search by Name, Email, Phone, ID, Location..."
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

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900">
            Customers List ({filteredCustomers.length})
          </h3>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Orders</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Total Spent</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Loyalty</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Join Date</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    {/* Customer */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 relative">
                          <img 
                            src={customer.avatar} 
                            alt={customer.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                          />
                          {customer.verified && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                              <MdVerified className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{customer.name}</p>
                          <p className="text-xs text-blue-600 font-medium">{customer.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MdEmail className="w-4 h-4 text-blue-600" />
                          <span className="truncate max-w-[200px]">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MdPhone className="w-4 h-4 text-green-600" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MdLocationOn className="w-4 h-4 text-red-600" />
                          <span>{customer.location}</span>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border-2 ${getTypeBadgeColor(customer.type)}`}>
                        {customer.type === 'VIP' && '👑 '}
                        {customer.type === 'Premium' && '⭐ '}
                        {customer.type}
                      </span>
                    </td>

                    {/* Orders */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">📦</span>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">{customer.totalOrders}</p>
                          <p className="text-xs text-gray-500">Orders</p>
                        </div>
                      </div>
                    </td>

                    {/* Total Spent */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">💰</span>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            ${customer.totalSpent.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            Last: {customer.lastOrder}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Loyalty Points */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">🎁</span>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900">
                            {customer.loyaltyPoints.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">Points</p>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={customer.status} type="customer" />
                    </td>

                    {/* Join Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">{customer.joinDate}</p>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ActionButtons
                        onView={() => console.log('View', customer.id)}
                        onEdit={() => console.log('Edit', customer.id)}
                        onDelete={() => console.log('Delete', customer.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">
                    <EmptyState
                      icon="👥"
                      title="No customers found"
                      subtitle="Try adjusting your search or filters"
                      action={
                        <Link to="/customers/add">
                          <Button
                            variant="contained"
                            className="bg-blue-600! text-white! hover:bg-blue-700! rounded-xl! px-5! py-2.5! font-semibold! capitalize!"
                            startIcon={<FaPlus />}
                          >
                            Add First Customer
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
        {filteredCustomers.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={filteredCustomers.length}
            itemName="customers"
          />
        )}
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Spenders */}
        <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">👑</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">Top Spenders</h4>
              <p className="text-sm text-gray-600">Highest revenue customers</p>
            </div>
          </div>
          <div className="space-y-3">
            {customersData
              .sort((a, b) => b.totalSpent - a.totalSpent)
              .slice(0, 3)
              .map((customer, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-xl p-3 border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-600">{customer.totalOrders} orders</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-purple-600">
                    ${customer.totalSpent.toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">Customer Insights</h4>
              <p className="text-sm text-gray-600">Key metrics and trends</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Average Order Value</span>
                <span className="text-lg font-bold text-blue-600">
                  ${(totalRevenue / customersData.reduce((sum, c) => sum + c.totalOrders, 0)).toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Verified Customers</span>
                <span className="text-lg font-bold text-green-600">
                  {customersData.filter(c => c.verified).length}/{totalCustomers}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(customersData.filter(c => c.verified).length / totalCustomers) * 100}%` }}></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-blue-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Active Rate</span>
                <span className="text-lg font-bold text-purple-600">
                  {((activeCustomers / totalCustomers) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(activeCustomers / totalCustomers) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <FaUserFriends className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Customer Management Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Verify customer emails to ensure authenticity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Reward loyal customers with special offers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Track customer lifetime value (CLV)</span>
                </li>
              </ul>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Segment customers by behavior and preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Send personalized promotions to VIP customers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span>Monitor inactive customers for re-engagement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomersPage