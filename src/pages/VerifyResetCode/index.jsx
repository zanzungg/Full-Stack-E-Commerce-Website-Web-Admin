import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from '../../components/Auth'
import { useAuthContext } from '../../contexts/AuthContext'
import { authService } from '../../api/services/authService'
import { useOTP } from '../../hooks/useOTP'
import { useCountdown } from '../../hooks/useCountdown'
import { FaShieldAlt } from 'react-icons/fa'
import { MdArrowBack, MdVerified } from 'react-icons/md'
import { toast } from 'react-toastify'

const VerifyResetCode = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { verifyResetCode, isAuthenticated } = useAuthContext()
  const email = location.state?.email || ''
  const fromForgotPassword = location.state?.fromForgotPassword || false
  
  const { otp, setOtp, isComplete, value: otpValue, reset: resetOtp } = useOTP()
  const { countdown, start } = useCountdown(600)
  const { countdown: resendCountdown, start: startResend } = useCountdown(60)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (!email || !fromForgotPassword) {
      toast.error('Please request a password reset first')
      navigate('/forgot-password', { replace: true })
      return
    }
    // Start countdown when component mounts
    start(600) // 10 minutes
    startResend(60) // 1 minute
  }, [email, fromForgotPassword, navigate, start, startResend])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!isComplete) {
      setError('Please enter all 6 digits')
      return
    }

    if (countdown === 0) {
      setError('Verification code has expired. Please request a new one.')
      return
    }

    setLoading(true)

    try {
      const response = await verifyResetCode(email, otpValue)

      toast.success('Code verified successfully!', {
        position: 'top-right',
        autoClose: 2000,
      })

      // Redirect to reset password page with resetToken
      setTimeout(() => {
        navigate('/reset-password', { 
          state: { 
            email,
            verified: true,
            resetToken: response.data?.resetToken
          },
          replace: true 
        })
      }, 1500)

    } catch (error) {
      console.error('Verify reset code error:', error)
      
      let errorMessage = 'Verification failed. Please try again.'
      
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid verification code'
      } else if (error.response?.status === 404) {
        errorMessage = 'User not found. Please try again.'
      } else if (error.response?.status === 410) {
        errorMessage = 'Verification code has expired. Please request a new one.'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }
      
      setError(errorMessage)
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 4000,
      })
      resetOtp()
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendCountdown > 0) return

    setError('')
    setLoading(true)

    try {
      await authService.forgotPassword(email)
      
      toast.success('New verification code sent to your email!', {
        position: 'top-right',
        autoClose: 3000,
      })
      
      resetOtp()
      start(600) // Reset main countdown to 10 minutes
      startResend(60) // Start resend cooldown to 1 minute
      
    } catch (error) {
      console.error('Resend code error:', error)
      
      let errorMessage = 'Failed to resend code. Please try again.'
      
      if (error.response?.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment.'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }
      
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 4000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Auth.Root>
      <Auth.Card>
        <Auth.Header
          icon={FaShieldAlt}
          title="Verify Reset Code"
          subtitle="We've sent a 6-digit verification code to"
          email={email}
          gradient="from-purple-500 to-pink-600"
        />

        <div className="p-8 lg:p-12">
          <Auth.CountdownTimer 
            seconds={countdown}
            warningThreshold={60}
          />

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-xl text-red-600 text-sm flex items-start gap-2">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Auth.OTPInput
              value={otp}
              onChange={setOtp}
              onComplete={(value) => {
                console.log('OTP Complete:', value)
              }}
              disabled={loading || countdown === 0}
              error={!!error}
            />

            <button
              type="submit"
              disabled={loading || !isComplete || countdown === 0}
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <MdVerified className="w-5 h-5" />
                  <span>Verify Code</span>
                </div>
              )}
            </button>
          </form>

          <Auth.ResendButton
            countdown={resendCountdown}
            onResend={handleResend}
            text="Resend Code"
            disabled={loading}
          />

          <div className="mt-6 text-center">
            <Link to="/forgot-password">
              <button className="text-blue-600 hover:bg-blue-50 rounded-xl px-6 py-2 font-semibold transition-colors inline-flex items-center gap-2">
                <MdArrowBack />
                Back
              </button>
            </Link>
          </div>

          <Auth.HelpBox
            icon="💡"
            title="Tips"
            bgColor="bg-purple-50"
            borderColor="border-purple-200"
            textColor="text-purple-800"
            titleColor="text-purple-900"
            tips={[
              "Check your spam/junk folder",
              "Make sure you entered the correct email",
              "The code is valid for 10 minutes",
              "Contact support if you don't receive the code"
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

export default VerifyResetCode