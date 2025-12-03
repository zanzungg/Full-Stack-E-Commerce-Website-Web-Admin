import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from '../../components/Auth'
import { useAuthContext } from '../../contexts/AuthContext'
import { MdAdminPanelSettings } from 'react-icons/md'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaPhone } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Signup = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, authLoading, isAuthenticated } = useAuthContext()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

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
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    // Validate phone (optional but if provided, must be valid)
    if (formData.mobile && !/^[0-9]{10,11}$/.test(formData.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Invalid phone number (10-11 digits)'
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number'
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    // Validate terms acceptance
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions'
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
      // Prepare data for API (exclude confirmPassword)
      const { confirmPassword, ...registrationData } = formData
      
      const response = await register(registrationData)
      
      toast.success('Registration successful! Please verify your email.', {
        position: 'top-right',
        autoClose: 3000,
      })
      
      // Redirect to verify email page with email
      navigate('/verify-email', { 
        state: { 
          email: formData.email,
          fromRegistration: true 
        },
        replace: true 
      })
    } catch (error) {
      console.error('Registration error:', error)
      
      // Xử lý các loại lỗi khác nhau
      let errorMessage = 'Registration failed. Please try again.'
      
      if (error.response?.status === 409) {
        errorMessage = 'Email already exists. Please use a different email or sign in.'
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid registration data'
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
    <Auth.Root className="py-12">
      <Auth.Card>
        <Auth.Header
          icon={MdAdminPanelSettings}
          title="Create Account"
          subtitle="Sign up to get started"
        />

        <Auth.Form onSubmit={handleSubmit}>
          <Auth.Input
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="John Doe"
            icon={FaUser}
            error={errors.name}
            disabled={authLoading}
            autoComplete="name"
            required
          />

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
            label="Phone Number (Optional)"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="0123456789"
            icon={FaPhone}
            error={errors.mobile}
            disabled={authLoading}
            autoComplete="tel"
          />

          <Auth.Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Create a password"
            icon={FaLock}
            endIcon={showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            onEndIconClick={() => setShowPassword(!showPassword)}
            error={errors.password}
            disabled={authLoading}
            autoComplete="new-password"
            required
          />

          <Auth.Input
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Confirm your password"
            icon={FaLock}
            endIcon={showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            error={errors.confirmPassword}
            disabled={authLoading}
            autoComplete="new-password"
            required
          />

          <div className="space-y-2">
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked)
                  if (errors.terms) {
                    setErrors(prev => ({ ...prev, terms: '' }))
                  }
                }}
                disabled={authLoading}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600">{errors.terms}</p>
            )}
          </div>

          <Auth.Submit loading={authLoading}>
            {authLoading ? 'Creating Account...' : 'Create Account'}
          </Auth.Submit>

          <Auth.Divider text="Or sign up with" />
          <Auth.Social />
        </Auth.Form>

        <Auth.Footer
          text="Already have an account?"
          linkText="Sign In"
          linkHref="/sign-in"
          LinkComponent={Link}
        />
      </Auth.Card>

      <Auth.TextLink>
        By signing up, you agree to receive promotional emails. You can unsubscribe at any time.
      </Auth.TextLink>
    </Auth.Root>
  )
}

export default Signup