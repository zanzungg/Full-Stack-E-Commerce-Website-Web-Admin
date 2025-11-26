import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, CircularProgress, Alert } from '@mui/material'
import { MdEmail, MdArrowBack } from 'react-icons/md'
import { FaPaperPlane } from 'react-icons/fa'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!email) {
      setError('Email is required')
      return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // Navigate to verify page with email
      navigate('/verify-email', { state: { email, from: 'forgot-password' } })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
              <MdEmail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-base">
              No worries! Enter your email address and we'll send you a verification code to reset your password.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              className="rounded-xl! mb-6"
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdEmail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  disabled={loading}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Enter the email address associated with your account
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              className="bg-linear-to-r! from-blue-600! to-purple-600! text-white! hover:from-blue-700! hover:to-purple-700! shadow-xl! rounded-xl! py-4! font-bold! text-base! capitalize! transition-all! hover:scale-[1.02]!"
              startIcon={loading ? <CircularProgress size={20} className="text-white!" /> : <FaPaperPlane />}
            >
              {loading ? 'Sending Code...' : 'Send Verification Code'}
            </Button>
          </form>

          {/* Back to Sign In */}
          <div className="mt-8 text-center">
            <Link to="/sign-in">
              <Button
                variant="text"
                className="text-blue-600! hover:bg-blue-50! rounded-xl! px-6! py-2! font-semibold! capitalize!"
                startIcon={<MdArrowBack />}
              >
                Back to Sign In
              </Button>
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <span className="text-lg">💡</span>
                Need Help?
              </h4>
              <ul className="space-y-1 text-xs text-blue-800">
                <li>• Check your spam/junk folder if you don't see the email</li>
                <li>• The verification code will expire in 10 minutes</li>
                <li>• Contact support if you need further assistance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/sign-in" className="text-blue-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword