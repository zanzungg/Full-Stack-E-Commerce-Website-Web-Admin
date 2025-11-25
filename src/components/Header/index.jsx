import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { RiMenuUnfold4Fill } from "react-icons/ri"
import { RiMenuFold4Fill } from "react-icons/ri"
import { FaRegBell } from "react-icons/fa"
import { IoLogOutOutline, IoSettingsOutline, IoPersonOutline } from "react-icons/io5"
import { HiChevronDown } from "react-icons/hi"

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const userMenuRef = useRef(null)
  const notificationRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const notifications = [
    { id: 1, title: 'New Order', message: 'Order #12345 placed', time: '5 min ago', unread: true },
    { id: 2, title: 'Product Updated', message: 'Product inventory low', time: '1 hour ago', unread: true },
    { id: 3, title: 'New Customer', message: 'John Doe registered', time: '2 hours ago', unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header 
      className={`fixed top-0 right-0 h-16 bg-white shadow-sm border-b border-gray-200 z-40 transition-all duration-300 ${
        sidebarOpen ? 'lg:left-64' : 'left-0'
      }`}
    >
      <div className="h-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Left Side - Menu Button & Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleSidebar}
              className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              {sidebarOpen ? (
                <RiMenuUnfold4Fill className="w-6 h-6" />
              ) : (
                <RiMenuFold4Fill className="w-6 h-6" />
              )}
            </button>

            {/* Logo when sidebar closed */}
            {!sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-tight">Dashboard</span>
                  <span className="text-xs text-gray-500">Admin Panel</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                aria-label="Notifications"
              >
                <FaRegBell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-slideDown">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                          notification.unread ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></span>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            <p className="text-xs text-gray-600 mt-0.5">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-3 border-t border-gray-100">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full text-center">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <div className="w-9 h-9 bg-linear-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-sm font-semibold">AD</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">Admin</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <HiChevronDown 
                  className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                    showUserMenu ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-slideDown">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Admin</p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <IoPersonOutline className="w-5 h-5" />
                      <span>My Profile</span>
                    </Link>
                    
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <IoSettingsOutline className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 pt-2">
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      onClick={() => {
                        setShowUserMenu(false)
                        // Add logout logic
                      }}
                    >
                      <IoLogOutOutline className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header