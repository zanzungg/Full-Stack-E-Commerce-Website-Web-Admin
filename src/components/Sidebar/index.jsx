import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx"
import { MdOutlineInventory2, MdOutlineShoppingCart, MdOutlinePeopleAlt, MdOutlineCategory } from 'react-icons/md'
import { FaRegImages } from "react-icons/fa"
import { IoLogOutOutline } from "react-icons/io5"
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"

const Sidebar = ({ isOpen }) => {
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
      path: '/home-slides', 
      label: 'Home Slides', 
      icon: <FaRegImages className="w-5 h-5" />,
      hasDropdown: true,
      isOpen: homeSlidesOpen,
      setIsOpen: setHomeSlidesOpen,
      subItems: [
        { path: '/home-slides/list', label: 'Home Banners Slides List' },
        { path: '/home-slides/add', label: 'Add Home Banner Slide' }
      ]
    },
    { 
      path: '/customers', 
      label: 'Users', 
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
        { path: '/products/list', label: 'Product List' },
        { path: '/products/upload', label: 'Product Upload' }
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
        { path: '/categories/list', label: 'Category List' },
        { path: '/categories/add', label: 'Add a Category' },
        { path: '/categories/sub-list', label: 'Sub Category List' },
        { path: '/categories/sub-add', label: 'Add a Sub Category' }
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

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center h-16 px-4 border-b border-gray-200 ${
        isOpen ? 'justify-between' : 'justify-center'
      }`}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          {isOpen && (
            <span className="text-lg font-semibold text-gray-900 truncate">Admin</span>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1 overflow-y-auto overflow-x-hidden" style={{ height: 'calc(100% - 144px)' }}>
        {menuItems.map((item) => (
          <div key={item.path}>
            {/* Main Menu Item */}
            {item.hasDropdown ? (
              <button
                onClick={() => isOpen && item.setIsOpen(!item.isOpen)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors group relative ${
                  isActive(item.path) || isParentActive(item)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                } ${!isOpen && 'justify-center'}`}
                title={!isOpen ? item.label : ''}
              >
                <span className="shrink-0">{item.icon}</span>
                {isOpen && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.isOpen ? (
                      <FaAngleUp className="w-4 h-4 shrink-0" />
                    ) : (
                      <FaAngleDown className="w-4 h-4 shrink-0" />
                    )}
                  </>
                )}
                
                {/* Tooltip khi thu nhỏ */}
                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {item.label}
                  </span>
                )}
              </button>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors group relative ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                } ${!isOpen && 'justify-center'}`}
                title={!isOpen ? item.label : ''}
              >
                <span className="shrink-0">{item.icon}</span>
                {isOpen && <span className="truncate">{item.label}</span>}
                
                {/* Tooltip khi thu nhỏ */}
                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    {item.label}
                  </span>
                )}
              </Link>
            )}

            {/* Dropdown SubMenu */}
            {item.hasDropdown && isOpen && item.isOpen && (
              <div className="mt-1 ml-4 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(subItem.path)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>
                    <span className="truncate">{subItem.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900">Need Help?</p>
            <p className="text-xs text-blue-700 mt-1">Contact support team</p>
          </div>
        </div>
      )}
    </aside>
  )
}

export default Sidebar