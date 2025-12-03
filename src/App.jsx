import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './layout'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import DashboardPage from './pages/Dashboard'

// Home Slides Pages
import HomeSliderBanners from './pages/HomeSlidesBanners/List'
import AddHomeBannerSlidePage from './pages/HomeSlidesBanners/Add'

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
import ForgotPassword from './pages/ForgotPassword'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ResetPassword'
import VerifyResetCode from './pages/VerifyResetCode'

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
    path: "/verify-email",
    element: <VerifyEmail />
  },
  {
    path: "/logout",
    element: <Signin />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/verify-reset-code",
    element: <VerifyResetCode />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      // Dashboard
      {
        index: true,
        element: <DashboardPage />
      },
      
      // Home Slider Routes
      {
        path: "home-banner-slides",
        element: <HomeSliderBanners />
      },
      {
        path: "home-banner-slide/add",
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

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  )
}

export default App