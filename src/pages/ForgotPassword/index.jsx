import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from '../../components/Auth'
import { useAuthForm } from '../../hooks/useAuthForm'
import { MdEmail, MdArrowBack } from 'react-icons/md'
import { FaPaperPlane } from 'react-icons/fa'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { 
    formData, 
    loading, 
    errors,
    handleChange,
    setLoading,
    setErrors,
    validate
  } = useAuthForm()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate(['email'])) return

    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      navigate('/verify-email', { state: { email: formData.email, from: 'forgot-password' } })
    }, 2000)
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
              placeholder="admin@example.com"
              icon={MdEmail}
              error={errors.email}
              helpText="Enter the email address associated with your account"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
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