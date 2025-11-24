import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Layout from './layout'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          extract: true,
          element: <Dashboard />
        },
        // Additional routes can be added here
      ]
    }
  ])
  
  return <RouterProvider router={router} />
}

export default App
