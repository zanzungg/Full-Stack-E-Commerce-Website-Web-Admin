import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from '../../components/Auth'
import { useAuthContext } from '../../contexts/AuthContext'
import { MdAdminPanelSettings } from 'react-icons/md'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { authService } from '../../api/services/authService'

const Signin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, authLoading, isAuthenticated } = useAuthContext()
  
  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error khi user nhập
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await login(formData)
      
      toast.success('Login successful! Welcome back.', {
        position: 'top-right',
        autoClose: 2000,
      })
      
      // Redirect về trang trước đó hoặc dashboard
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Login error:', error)
      
      // Xử lý các loại lỗi khác nhau
      let errorMessage = 'Login failed. Please try again.'
      
      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password'
      } else if (error.response?.status === 403) {
        // Email not verified
        if (error.response.data?.message?.includes('Email is not verified')) {
          errorMessage = 'Please verify your email before signing in'

          toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 4000,
          })

          // GỬI OTP MỚI trước khi redirect
          try {
            await authService.resendVerificationOTP(formData.email)
            toast.success('Verification code sent to your email!', {
              position: 'top-right',
              autoClose: 2000,
            })
          } catch (resendError) {
            console.error('Failed to resend OTP:', resendError)
          }

          // Redirect to verify email page
          setTimeout(() => {
            navigate('/verify-email', { 
              state: { 
                email: formData.email,
                fromLogin: true 
              },
              replace: true
            })
          }, 1500)
          return
        }
        errorMessage = 'Your account has been disabled. Please contact support.'

      } else if (error.response?.status === 404) {
        errorMessage = 'Account not found. Please sign up.'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 4000,
      })
      
      // Set error cho specific field nếu có
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <Auth.Root>
      <Auth.Card>
        <Auth.Header
          icon={MdAdminPanelSettings}
          title="Admin Panel"
          subtitle="Sign in to your account"
        />

        <Auth.Form onSubmit={handleSubmit}>
          <Auth.Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="admin@example.com"
            icon={FaEnvelope}
            error={errors.email}
            disabled={authLoading}
            autoComplete="email"
            required
          />

          <Auth.Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter your password"
            icon={FaLock}
            endIcon={showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            onEndIconClick={() => setShowPassword(!showPassword)}
            error={errors.password}
            disabled={authLoading}
            autoComplete="current-password"
            required
          />

          <div className="flex items-center justify-between">
            <Auth.Checkbox id="remember" label="Remember me" />
            <Link 
              to="/forgot-password" 
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <Auth.Submit loading={authLoading}>
            {authLoading ? 'Signing In...' : 'Sign In'}
          </Auth.Submit>

          <Auth.Divider />
          <Auth.Social />
        </Auth.Form>

        <Auth.Footer
          text="Don't have an account?"
          linkText="Sign Up"
          linkHref="/sign-up"
          LinkComponent={Link}
        />
      </Auth.Card>

      <Auth.TextLink>
        By signing in, you agree to our{' '}
        <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
          Privacy Policy
        </Link>
      </Auth.TextLink>
    </Auth.Root>
  )
}

export default Signin