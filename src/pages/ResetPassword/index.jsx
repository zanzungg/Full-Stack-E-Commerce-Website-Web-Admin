import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from '../../components/Auth'
import { useAuthForm } from '../../hooks/useAuthForm'
import { FaKey } from 'react-icons/fa'
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'

const ResetPassword = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''
  const verified = location.state?.verified || false
  
  const [success, setSuccess] = React.useState(false)
  
  const { 
    formData, 
    loading, 
    errors,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    setLoading,
    validate
  } = useAuthForm({ confirmPassword: '' })

  useEffect(() => {
    if (!email || !verified) {
      navigate('/forgot-password')
    }
  }, [email, verified, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate(['password', 'confirmPassword'])) return

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setSuccess(true)

      setTimeout(() => {
        navigate('/sign-in')
      }, 3000)
    }, 2000)
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
              buttongradient="from-blue-600 to-purple-600"
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
            <p className="text-blue-600 font-semibold">{email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Auth.Input
                label="New Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                icon={MdLock}
                endIcon={showPassword ? <MdVisibilityOff className="w-5 h-5" /> : <MdVisibility className="w-5 h-5" />}
                onEndIconClick={() => setShowPassword(!showPassword)}
                error={errors.password}
                disabled={loading}
              />
              
              <Auth.PasswordStrength password={formData.password} />
              
              <p className="mt-2 text-xs text-gray-500">
                Must be at least 8 characters with uppercase, lowercase, numbers & symbols
              </p>
            </div>

            <div>
              <Auth.Input
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                icon={MdLock}
                endIcon={showConfirmPassword ? <MdVisibilityOff className="w-5 h-5" /> : <MdVisibility className="w-5 h-5" />}
                onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                error={errors.confirmPassword}
                disabled={loading}
              />
              
              <Auth.PasswordMatch
                password={formData.password}
                confirmPassword={formData.confirmPassword}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
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