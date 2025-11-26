import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout'

// Pages
import DashboardPage from './pages/Dashboard'

// Home Slides Pages
import HomeSlidesListPage from './pages/HomeSlides/List'
import AddHomeBannerSlidePage from './pages/HomeSlides/Add'

// Products Pages
import ProductListPage from './pages/Products/List'
import ProductUploadPage from './pages/Products/Upload'

// Categories Pages
import CategoryListPage from './pages/Categories/List'
import AddCategoryPage from './pages/Categories/Add'
import SubCategoryListPage from './pages/Categories/SubList'
import AddSubCategoryPage from './pages/Categories/SubAdd'

// Other Pages
import CustomersPage from './pages/Customers'
import OrdersPage from './pages/Orders'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
  const router = createBrowserRouter([
    {
      path: "/sign-in",
      element: <Signin />
    },
    {
      path: "/sign-up",
      element: <Signup />
    },
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        // Dashboard
        {
          index: true,
          element: <DashboardPage />
        },
        
        // Home Slides Routes
        {
          path: "home-slides",
          element: <HomeSlidesListPage />
        },
        {
          path: "home-slide/add",
          element: <AddHomeBannerSlidePage />
        },
        
        // Customers Route
        {
          path: "customers",
          element: <CustomersPage />
        },
        
        // Products Routes
        {
          path: "products",
          element: <ProductListPage />
        },
        {
          path: "product/upload",
          element: <ProductUploadPage />
        },
        
        // Categories Routes
        {
          path: "categories",
          element: <CategoryListPage />
        },
        {
          path: "category/add",
          element: <AddCategoryPage />
        },
        {
          path: "category/sub-cat",
          element: <SubCategoryListPage />
        },
        {
          path: "category/sub-cat/add",
          element: <AddSubCategoryPage />
        },
        
        // Orders Route
        {
          path: "orders",
          element: <OrdersPage />
        }
      ]
    }
  ])
  
  return <RouterProvider router={router} />
}

export default App
