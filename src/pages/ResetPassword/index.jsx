import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button, CircularProgress, Alert } from '@mui/material'
import { MdLock, MdVisibility, MdVisibilityOff, MdCheckCircle } from 'react-icons/md'
import { FaKey } from 'react-icons/fa'

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''
  const verified = location.state?.verified || false

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Redirect if not verified
  useEffect(() => {
    if (!email || !verified) {
      navigate('/forgot-password')
    }
  }, [email, verified, navigate])

  // Check password strength
  useEffect(() => {
    const password = formData.password
    let strength = 0

    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    setPasswordStrength(strength)
  }, [formData.password])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.password) {
      setError('Password is required')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (passwordStrength < 3) {
      setError('Please choose a stronger password')
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      // Auto redirect after 3 seconds
      setTimeout(() => {
        navigate('/sign-in')
      }, 3000)
    }, 2000)
  }

  // Get strength color
  const getStrengthColor = () => {
    if (passwordStrength < 2) return 'bg-red-500'
    if (passwordStrength < 4) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  // Get strength text
  const getStrengthText = () => {
    if (passwordStrength < 2) return 'Weak'
    if (passwordStrength < 4) return 'Medium'
    return 'Strong'
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
          {!success ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 shadow-xl">
                  <FaKey className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                  Reset Password
                </h1>
                <p className="text-gray-600 text-base mb-2">
                  Create a new password for
                </p>
                <p className="text-blue-600 font-semibold">{email}</p>
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
                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdLock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <MdVisibilityOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <MdVisibility className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength */}
                  {formData.password && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Password strength:</span>
                        <span className={`text-xs font-semibold ${
                          passwordStrength < 2 ? 'text-red-600' : 
                          passwordStrength < 4 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {getStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${getStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <p className="mt-2 text-xs text-gray-500">
                    Must be at least 8 characters with uppercase, lowercase, numbers & symbols
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdLock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <MdVisibilityOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <MdVisibility className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="mt-2">
                      {formData.password === formData.confirmPassword ? (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <MdCheckCircle className="w-4 h-4" />
                          Passwords match
                        </p>
                      ) : (
                        <p className="text-xs text-red-600">
                          Passwords do not match
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  className="bg-linear-to-r! from-purple-600! to-pink-600! text-white! hover:from-purple-700! hover:to-pink-700! shadow-xl! rounded-xl! py-4! font-bold! text-base! capitalize! transition-all! hover:scale-[1.02]!"
                  startIcon={loading ? <CircularProgress size={20} className="text-white!" /> : <FaKey />}
                >
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </Button>
              </form>

              {/* Password Requirements */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <h4 className="text-sm font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <span className="text-lg">🔒</span>
                    Password Requirements
                  </h4>
                  <ul className="space-y-1 text-xs text-purple-800">
                    <li className={formData.password.length >= 8 ? 'text-green-600 font-semibold' : ''}>
                      • At least 8 characters long
                    </li>
                    <li className={/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? 'text-green-600 font-semibold' : ''}>
                      • Contains uppercase and lowercase letters
                    </li>
                    <li className={/\d/.test(formData.password) ? 'text-green-600 font-semibold' : ''}>
                      • Contains at least one number
                    </li>
                    <li className={/[^a-zA-Z0-9]/.test(formData.password) ? 'text-green-600 font-semibold' : ''}>
                      • Contains at least one special character
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce-slow">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Password Reset Successful!
              </h2>
              <p className="text-gray-600 text-base mb-6">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>

              {/* Info Box */}
              <div className="bg-linear-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-6 border border-green-200">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <MdCheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">All Set!</p>
                    <p className="text-xs text-gray-600">You're ready to sign in</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  For security, you've been logged out from all devices. Please sign in again with your new password.
                </p>
              </div>

              {/* Auto Redirect */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
                <p className="text-sm text-blue-800">
                  ⏱️ Redirecting to sign in page in 3 seconds...
                </p>
              </div>

              {/* Sign In Button */}
              <Link to="/sign-in">
                <Button
                  variant="contained"
                  className="bg-linear-to-r! from-blue-600! to-purple-600! text-white! hover:from-blue-700! hover:to-purple-700! shadow-lg! rounded-xl! px-8! py-3! font-bold! capitalize!"
                >
                  Go to Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link to="/sign-in" className="text-blue-600 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        )}
      </div>

      {/* Animation Style */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default ResetPassword