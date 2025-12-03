import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../../components/Auth'
import { useAuthContext } from '../../contexts/AuthContext'
import { MdEmail, MdArrowBack } from 'react-icons/md'
import { FaPaperPlane } from 'react-icons/fa'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { forgotPassword, authLoading, isAuthenticated } = useAuthContext()
  
  const [formData, setFormData] = useState({
    email: ''
  })
  const [errors, setErrors] = useState({})

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

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
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await forgotPassword(formData.email)
      
      toast.success('Verification code sent to your email!', {
        position: 'top-right',
        autoClose: 3000,
      })
      
      // Redirect to verify reset code page
      navigate('/verify-reset-code', { 
        state: { 
          email: formData.email,
          fromForgotPassword: true 
        }
      })
    } catch (error) {
      console.error('Forgot password error:', error)
      
      let errorMessage = 'Failed to send verification code. Please try again.'
      
      if (error.response?.status === 404) {
        errorMessage = 'No account found with this email address'
      } else if (error.response?.status === 429) {
        errorMessage = 'Too many requests. Please try again later.'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }
      
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 4000,
      })
      
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
        <div className="p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
              <MdEmail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-base">
              No worries! Enter your email address and we'll send you a verification code.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Auth.Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="admin@example.com"
              icon={MdEmail}
              error={errors.email}
              disabled={authLoading}
              autoComplete="email"
              required
              helpText="Enter the email address associated with your account"
            />

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending Code...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <FaPaperPlane />
                  <span>Send Verification Code</span>
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/sign-in">
              <button className="text-blue-600 hover:bg-blue-50 rounded-xl px-6 py-2 font-semibold transition-colors inline-flex items-center gap-2">
                <MdArrowBack />
                Back to Sign In
              </button>
            </Link>
          </div>

          <Auth.HelpBox
            icon="💡"
            title="Tips"
            bgColor="bg-blue-50"
            borderColor="border-blue-200"
            textColor="text-blue-800"
            titleColor="text-blue-900"
            tips={[
              "Check your spam/junk folder if you don't see the email",
              "The verification code will expire in 10 minutes",
              "Contact support if you need further assistance"
            ]}
          />
        </div>
      </Auth.Card>

      <Auth.TextLink>
        Remember your password?{' '}
        <Link to="/sign-in" className="text-blue-600 font-semibold hover:underline">
          Sign In
        </Link>
      </Auth.TextLink>
    </Auth.Root>
  )
}

export default ForgotPassword