import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Auth } from '../../components/Auth'
import { useOTP } from '../../hooks/useOTP'
import { useCountdown } from '../../hooks/useCountdown'
import { FaShieldAlt } from 'react-icons/fa'
import { MdArrowBack, MdVerified } from 'react-icons/md'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''
  
  const { otp, setOtp, isComplete, value: otpValue, reset: resetOtp } = useOTP()
  const { countdown, start, reset: resetCountdown } = useCountdown(600)
  const { countdown: resendCountdown, start: startResend } = useCountdown(60)
  
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password')
      return
    }
    // Start countdown when component mounts
    start(600)
  }, [email, navigate])

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

    setTimeout(() => {
      setLoading(false)
      
      if (otpValue === '123456') {
        navigate('/reset-password', { state: { email, verified: true } })
      } else {
        setError('Invalid verification code. Please try again.')
        resetOtp()
      }
    }, 2000)
  }

  const handleResend = () => {
    if (resendCountdown > 0) return

    setError('')
    resetOtp()
    start(600) // Reset main countdown
    startResend(60) // Start resend cooldown
    
    // TODO: Call API to resend code
    console.log('Resending code to:', email)
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
            bgColor="bg-green-50"
            borderColor="border-green-200"
            textColor="text-green-800"
            titleColor="text-green-900"
            tips={[
              "Check your spam/junk folder",
              "Make sure you entered the correct email",
              "The code is valid for 10 minutes",
              "For testing, use code: 123456"
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