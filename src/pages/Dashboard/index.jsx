import React from 'react'
import { Link } from 'react-router-dom'
import DashboardBoxes from '../../components/DashboardBoxes'
import { Button } from '@mui/material'
import { FaPlus, FaArrowTrendUp, FaUsers, FaBoxOpen, FaChartLine } from "react-icons/fa6"
import { HiOutlineShoppingBag } from "react-icons/hi2"
import { IoStatsChartSharp } from "react-icons/io5"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const DashboardPage = () => {
  // Chart Data - Total Users
  const usersData = [
    { month: 'Jan', users: 400 },
    { month: 'Feb', users: 600 },
    { month: 'Mar', users: 800 },
    { month: 'Apr', users: 1000 },
    { month: 'May', users: 1200 },
    { month: 'Jun', users: 1400 },
    { month: 'Jul', users: 1800 },
    { month: 'Aug', users: 2200 },
    { month: 'Sep', users: 2600 },
    { month: 'Oct', users: 3000 },
    { month: 'Nov', users: 3500 },
    { month: 'Dec', users: 4200 },
  ]

  // Chart Data - Total Sales
  const salesData = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 19000 },
    { month: 'Mar', sales: 15000 },
    { month: 'Apr', sales: 25000 },
    { month: 'May', sales: 22000 },
    { month: 'Jun', sales: 30000 },
    { month: 'Jul', sales: 28000 },
    { month: 'Aug', sales: 35000 },
    { month: 'Sep', sales: 32000 },
    { month: 'Oct', sales: 40000 },
    { month: 'Nov', sales: 45000 },
    { month: 'Dec', sales: 52000 },
  ]

  // Recent Orders Data
  const recentOrders = [
    { id: '#12345', customer: 'John Doe', email: 'john@example.com', total: '$299.00', status: 'Completed', date: '2024-11-20', items: 3 },
    { id: '#12346', customer: 'Jane Smith', email: 'jane@example.com', total: '$159.00', status: 'Processing', date: '2024-11-21', items: 2 },
    { id: '#12347', customer: 'Bob Johnson', email: 'bob@example.com', total: '$499.00', status: 'Pending', date: '2024-11-22', items: 5 },
    { id: '#12348', customer: 'Alice Brown', email: 'alice@example.com', total: '$89.00', status: 'Completed', date: '2024-11-23', items: 1 },
    { id: '#12349', customer: 'Charlie Wilson', email: 'charlie@example.com', total: '$349.00', status: 'Shipped', date: '2024-11-24', items: 4 },
  ]

  // Top Products Data
  const topProducts = [
    { id: 1, name: 'Wireless Headphones', sales: 234, revenue: '$4,680', trend: '+12%', image: '🎧' },
    { id: 2, name: 'Smart Watch', sales: 189, revenue: '$3,780', trend: '+8%', image: '⌚' },
    { id: 3, name: 'Laptop Stand', sales: 156, revenue: '$2,340', trend: '+15%', image: '💻' },
    { id: 4, name: 'Phone Case', sales: 298, revenue: '$1,490', trend: '+5%', image: '📱' },
    { id: 5, name: 'USB Cable', sales: 412, revenue: '$1,236', trend: '+18%', image: '🔌' },
  ]

  // Quick Stats
  const quickStats = [
    { icon: <FaUsers className="w-5 h-5" />, label: 'Total Views', value: '45.2k', change: '+12.5%', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
    { icon: <HiOutlineShoppingBag className="w-5 h-5" />, label: 'Profit', value: '$28.5k', change: '+8.2%', bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { icon: <IoStatsChartSharp className="w-5 h-5" />, label: 'Conversion', value: '3.2%', change: '+0.5%', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
    { icon: <FaChartLine className="w-5 h-5" />, label: 'Reviews', value: '1,248', change: '+23', bgColor: 'bg-orange-100', iconColor: 'text-orange-600' },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Processing': return 'bg-blue-100 text-blue-800'
      case 'Shipped': return 'bg-purple-100 text-purple-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Custom Tooltip for Charts
  const CustomTooltip = ({ active, payload, label, prefix = '' }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-blue-600 font-bold">
            {prefix}{payload[0].value.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Welcome Banner */}
      <div className="w-full p-6 lg:p-8 border border-gray-200 flex flex-col lg:flex-row items-center gap-6 justify-between rounded-2xl bg-linear-to-br from-blue-50 via-white to-purple-50 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="info flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <img src="./welcome.png" alt="Welcome" className="h-12 w-12 min-w-12 animate-bounce" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Good Morning,<br />
              <span className="linear-text">Admin</span>
            </h1>
          </div>
          
          <p className="text-gray-600 mb-6 max-w-xl">
            Here's what's happening on your store today. See the statistics at once.
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Link to="/products/upload">
              <Button 
                variant="contained" 
                className="bg-blue-600! text-white! hover:bg-blue-700! shadow-lg! rounded-xl! px-6! py-3! font-semibold! capitalize! transition-all! duration-300!"
                startIcon={<FaPlus />}
              >
                Add Product
              </Button>
            </Link>
            <Button 
              variant="outlined" 
              className="border-blue-600! text-blue-600! hover:bg-blue-50! rounded-xl! px-6! py-3! font-semibold! capitalize! transition-all! duration-300!"
              startIcon={<FaArrowTrendUp />}
            >
              View Analytics
            </Button>
          </div>
        </div>

        <div className="hidden lg:block">
          <img 
            src="./shop.png" 
            alt="Shop" 
            className="w-[220px] drop-shadow-xl animate-float" 
          />
        </div>
      </div>

      {/* Stats Slider */}
      <DashboardBoxes />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total Users Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaUsers className="w-6 h-6 text-blue-600" />
                Total Users
              </h3>
              <p className="text-sm text-gray-500 mt-1">Monthly user growth</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">4.2k</p>
              <p className="text-sm text-green-600 font-semibold">+24.5%</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usersData}>
              <defs>
                <linearlinear id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearlinear>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Total Sales Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaChartLine className="w-6 h-6 text-green-600" />
                Total Sales
              </h3>
              <p className="text-sm text-gray-500 mt-1">Monthly sales revenue</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">$52k</p>
              <p className="text-sm text-green-600 font-semibold">+18.2%</p>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearlinear id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearlinear>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip prefix="$" />} />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#10b981" 
                strokeWidth={3}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders - 2 columns */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <HiOutlineShoppingBag className="w-6 h-6 text-blue-600" />
                Recent Orders
              </h3>
              <p className="text-sm text-gray-500 mt-1">Latest customer orders</p>
            </div>
            <Link 
              to="/orders"
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors flex items-center gap-1"
            >
              View All 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
            {recentOrders.map((order) => (
              <div 
                key={order.id} 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group border border-transparent hover:border-blue-200"
              >
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-blue-700 font-bold text-sm">{order.id}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{order.date} • {order.items} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <p className="font-bold text-gray-900 text-lg">{order.total}</p>
                  <span className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products - 1 column */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaBoxOpen className="w-6 h-6 text-purple-600" />
                Top Products
              </h3>
              <p className="text-sm text-gray-500 mt-1">Best selling items</p>
            </div>
            <Link 
              to="/products/list"
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors flex items-center gap-1"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
            {topProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group border border-transparent hover:border-purple-200"
              >
                <div className="relative">
                  <div className="w-14 h-14 bg-linear-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {product.image}
                  </div>
                  <div className="absolute -top-1 -left-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                    <span className="text-xs font-semibold text-green-600">{product.trend}</span>
                  </div>
                </div>
                <p className="font-bold text-gray-900">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 card-hover"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.bgColor} p-4 rounded-xl ${stat.iconColor}`}>
                {stat.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                <span className="text-green-600 font-semibold">{stat.change}</span> from last week
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage