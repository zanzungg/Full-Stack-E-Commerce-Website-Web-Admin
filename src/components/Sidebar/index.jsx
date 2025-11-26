import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx"
import { MdOutlineInventory2, MdOutlineShoppingCart, MdOutlinePeopleAlt, MdOutlineCategory } from 'react-icons/md'
import { FaRegImages } from "react-icons/fa"
import { IoLogOutOutline, IoClose } from "react-icons/io5"
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const [homeSlidesOpen, setHomeSlidesOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)

  const menuItems = [
    { 
      path: '/', 
      label: 'Dashboard', 
      icon: <RxDashboard className="w-5 h-5" /> 
    },
    { 
      path: '/home-banner-slides', 
      label: 'Home Banner Slides', 
      icon: <FaRegImages className="w-5 h-5" />,
      hasDropdown: true,
      isOpen: homeSlidesOpen,
      setIsOpen: setHomeSlidesOpen,
      subItems: [
        { path: '/home-banner-slides', label: 'Home Banner Slides List' },
        { path: '/home-banner-slide/add', label: 'Add Home Banner Slide' }
      ]
    },
    { 
      path: '/customers', 
      label: 'Customers', 
      icon: <MdOutlinePeopleAlt className="w-5 h-5" /> 
    },
    { 
      path: '/products', 
      label: 'Products', 
      icon: <MdOutlineInventory2 className="w-5 h-5" />,
      hasDropdown: true,
      isOpen: productsOpen,
      setIsOpen: setProductsOpen,
      subItems: [
        { path: '/products', label: 'Product List' },
        { path: '/product/upload', label: 'Product Upload' }
      ]
    },
    { 
      path: '/categories', 
      label: 'Categories', 
      icon: <MdOutlineCategory className="w-5 h-5" />,
      hasDropdown: true,
      isOpen: categoriesOpen,
      setIsOpen: setCategoriesOpen,
      subItems: [
        { path: '/categories', label: 'Category List' },
        { path: '/category/add', label: 'Add a Category' },
        { path: '/category/sub-cat', label: 'Sub Category List' },
        { path: '/category/sub-cat/add', label: 'Add a Sub Category' }
      ]
    },
    { 
      path: '/orders', 
      label: 'Orders', 
      icon: <MdOutlineShoppingCart className="w-5 h-5" /> 
    },
    { 
      path: '/logout', 
      label: 'Logout', 
      icon: <IoLogOutOutline className="w-5 h-5" /> 
    },
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  const isParentActive = (item) => {
    if (item.subItems) {
      return item.subItems.some(subItem => location.pathname === subItem.path)
    }
    return false
  }

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    if (window.innerWidth < 1024) {
      onClose?.()
    }
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-xl z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-gray-900 leading-tight">Dashboard</span>
            <span className="text-xs text-gray-500">Admin Panel</span>
          </div>
        </div>

        {/* Close button - Mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close sidebar"
        >
          <IoClose className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1 overflow-y-auto overflow-x-hidden" style={{ height: 'calc(100vh - 64px)' }}>
        {menuItems.map((item) => (
          <div key={item.path}>
            {/* Main Menu Item */}
            {item.hasDropdown ? (
              <button
                onClick={() => item.setIsOpen(!item.isOpen)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive(item.path) || isParentActive(item)
                    ? 'bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="flex-1 text-left text-sm truncate">
                  {item.label}
                </span>
                {item.isOpen ? (
                  <FaAngleUp className="w-4 h-4 shrink-0" />
                ) : (
                  <FaAngleDown className="w-4 h-4 shrink-0" />
                )}
              </button>
            ) : (
              <Link
                to={item.path}
                onClick={handleLinkClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="text-sm truncate">{item.label}</span>
              </Link>
            )}

            {/* Dropdown SubMenu */}
            {item.hasDropdown && item.isOpen && (
              <div className="mt-1 ml-4 space-y-1 animate-slideDown">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(subItem.path)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>
                    <span className="truncate text-xs">{subItem.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar