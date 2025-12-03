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

const VerifyEmail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user } = useAuthContext() // Thêm user
  const email = location.state?.email || user?.email || '' // Lấy từ state hoặc user
  const fromRegistration = location.state?.fromRegistration || false
  const fromLogin = location.state?.fromLogin || false
  
  const { otp, setOtp, isComplete, value: otpValue, reset: resetOtp } = useOTP()
  const { countdown, start, reset: resetCountdown } = useCountdown(600)
  const { countdown: resendCountdown, start: startResend, reset: resetResendCountdown } = useCountdown(60)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // CHỈ redirect nếu đã đăng nhập VÀ email đã verify
  useEffect(() => {
    if (isAuthenticated && user?.verify_email) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  useEffect(() => {
    if (!email) {
      toast.error('Email is required for verification')
      navigate('/sign-up', { replace: true })
      return
    }
    // Start countdown when component mounts
    start(600) // 10 minutes - Main countdown
    startResend(60) // 1 minute - Resend cooldown
  }, [email, navigate, start, startResend])

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
      await authService.verifyEmail({
        email,
        otp: otpValue
      })

      toast.success('Email verified successfully!', {
        position: 'top-right',
        autoClose: 2000,
      })

      // Nếu từ login, yêu cầu đăng nhập lại
      // Nếu từ registration, redirect đến sign-in
      setTimeout(() => {
        if (fromLogin) {
          navigate('/sign-in', { 
            state: { 
              email,
              verified: true,
              message: 'Email verified! Please sign in again to continue.' 
            },
            replace: true 
          })
        } else {
          navigate('/sign-in', { 
            state: { 
              email,
              verified: true,
              message: 'Email verified! Please sign in to continue.' 
            },
            replace: true 
          })
        }
      }, 1500)

    } catch (error) {
      console.error('Verify email error:', error)
      
      let errorMessage = 'Verification failed. Please try again.'
      
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || 'Invalid verification code'
      } else if (error.response?.status === 404) {
        errorMessage = 'User not found. Please register again.'
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
      await authService.resendVerificationOTP(email)
      
      toast.success('Verification code sent to your email!', {
        position: 'top-right',
        autoClose: 3000,
      })
      
      resetOtp()
      start(600) // Reset main countdown to 10 minutes
      startResend(60) // Start resend cooldown to 1 minute
      
    } catch (error) {
      console.error('Resend OTP error:', error)
      
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
          title="Verify Your Email"
          subtitle="We've sent a 6-digit verification code to"
          email={email}
          gradient="from-green-500 to-blue-600"
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
              className="w-full bg-linear-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
            <Link to={fromRegistration ? "/sign-up" : "/sign-in"}>
              <button className="text-blue-600 hover:bg-blue-50 rounded-xl px-6 py-2 font-semibold transition-colors inline-flex items-center gap-2">
                <MdArrowBack />
                Back
              </button>
            </Link>
          </div>

          <Auth.HelpBox
            icon="💡"
            title="Tips"
            bgColor="bg-green-50"
            borderColor="border-green-200"
            textColor="text-green-800"
            titleColor="text-green-900"
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

export default VerifyEmail