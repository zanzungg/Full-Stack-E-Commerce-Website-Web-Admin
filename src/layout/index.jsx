import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      // Auto close sidebar on mobile
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed top */}
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      {/* Sidebar - Fixed left */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {/* Backdrop - Mobile only */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Main Content Area */}
      <main 
        className={`
          fixed inset-0 top-16 left-0 
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'lg:left-64' : 'lg:left-0'}
          bg-gray-50
        `}
      >
        <div className="h-full w-full p-0 sm:p-2 lg:p-4 overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout