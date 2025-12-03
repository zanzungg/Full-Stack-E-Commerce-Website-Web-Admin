import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from '../../components/Auth'
import { useAuthContext } from '../../contexts/AuthContext'
import { STORAGE_KEYS } from '../../config/constants'
import { FaKey } from 'react-icons/fa'
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { resetPassword, authLoading, isAuthenticated } = useAuthContext()
  
  const email = location.state?.email || ''
  const verified = location.state?.verified || false
  const resetToken = location.state?.resetToken || localStorage.getItem(STORAGE_KEYS.RESET_TOKEN)
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (success) return
    
    if (!email || !verified || !resetToken) {
      toast.error('Invalid reset request. Please try again.')
      navigate('/forgot-password', { replace: true })
    }
  }, [email, verified, resetToken, navigate])

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
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await resetPassword(resetToken, formData.password)

      toast.success('Password reset successfully!', {
        position: 'top-right',
        autoClose: 2000,
      })

      setSuccess(true)

      setTimeout(() => {
        navigate('/sign-in', {
          state: {
            email,
            passwordReset: true,
            message: 'Password reset successful! Please sign in with your new password.'
          }
        })
      }, 3000)

    } catch (error) {
      console.error('Reset password error:', error)
      
      let errorMessage = 'Failed to reset password. Please try again.'
      
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid reset token'
      } else if (error.response?.status === 410) {
        errorMessage = 'Reset token has expired. Please request a new password reset.'
        setTimeout(() => {
          navigate('/forgot-password')
        }, 3000)
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

  if (success) {
    return (
      <Auth.Root>
        <Auth.Card>
          <div className="p-8">
            <Auth.SuccessState
              title="Password Reset Successful!"
              message="Your password has been successfully reset. You can now sign in with your new password."
              infoBox={{
                title: "All Set!",
                subtitle: "You're ready to sign in",
                message: "For security, you've been logged out from all devices. Please sign in again with your new password."
              }}
              redirectMessage="Redirecting to sign in page in 3 seconds..."
              buttonText="Go to Sign In"
              buttonHref="/sign-in"
              LinkComponent={Link}
              buttongradient="from-purple-600 to-pink-600"
            />
          </div>
        </Auth.Card>
      </Auth.Root>
    )
  }

  return (
    <Auth.Root>
      <Auth.Card>
        <div className="p-8 lg:p-12">
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
            <p className="text-purple-600 font-semibold">{email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Auth.Input
                label="New Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter new password"
                icon={MdLock}
                endIcon={showPassword ? <MdVisibilityOff className="w-5 h-5" /> : <MdVisibility className="w-5 h-5" />}
                onEndIconClick={() => setShowPassword(!showPassword)}
                error={errors.password}
                disabled={authLoading}
                autoComplete="new-password"
                required
              />
              
              <Auth.PasswordStrength password={formData.password} />
              
              <p className="mt-2 text-xs text-gray-500">
                Must be at least 6 characters with uppercase, lowercase and numbers
              </p>
            </div>

            <div>
              <Auth.Input
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Confirm new password"
                icon={MdLock}
                endIcon={showConfirmPassword ? <MdVisibilityOff className="w-5 h-5" /> : <MdVisibility className="w-5 h-5" />}
                onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                error={errors.confirmPassword}
                disabled={authLoading}
                autoComplete="new-password"
                required
              />
              
              <Auth.PasswordMatch
                password={formData.password}
                confirmPassword={formData.confirmPassword}
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {authLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Resetting Password...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <FaKey />
                  <span>Reset Password</span>
                </div>
              )}
            </button>
          </form>

          <Auth.PasswordRequirements password={formData.password} />
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

export default ResetPassword