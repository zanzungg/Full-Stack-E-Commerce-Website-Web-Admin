import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search...",
  className = ""
}) => {
  return (
    <div className={`flex-1 relative ${className}`}>
      <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  )
}

export default SearchBar