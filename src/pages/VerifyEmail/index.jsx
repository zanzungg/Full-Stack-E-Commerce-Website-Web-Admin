import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button, CircularProgress, Alert } from '@mui/material'
import { MdArrowBack, MdVerified } from 'react-icons/md'
import { FaShieldAlt } from 'react-icons/fa'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ''
  const from = location.state?.from || 'forgot-password'

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(600) // 10 minutes in seconds
  const [resendCountdown, setResendCountdown] = useState(0)
  
  const inputRefs = useRef([])

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password')
    }
  }, [email, navigate])

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Resend countdown
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value[0]
    }

    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Clear error
    if (error) setError('')
  }

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    
    if (!/^\d{6}$/.test(pastedData)) return

    const newOtp = pastedData.split('')
    setOtp(newOtp)
    inputRefs.current[5]?.focus()
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const otpCode = otp.join('')
    
    // Validation
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits')
      return
    }

    // Check if expired
    if (countdown === 0) {
      setError('Verification code has expired. Please request a new one.')
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      
      // Check OTP (demo: 123456 is correct)
      if (otpCode === '123456') {
        // Navigate to reset password page
        navigate('/reset-password', { state: { email, verified: true } })
      } else {
        setError('Invalid verification code. Please try again.')
        setOtp(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
      }
    }, 2000)
  }

  // Handle resend
  const handleResend = () => {
    if (resendCountdown > 0) return

    setError('')
    setOtp(['', '', '', '', '', ''])
    setCountdown(600) // Reset to 10 minutes
    setResendCountdown(60) // 60 seconds cooldown
    inputRefs.current[0]?.focus()

    // Show success message
    const successMsg = document.createElement('div')
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-slide-in'
    successMsg.textContent = '✓ New verification code sent!'
    document.body.appendChild(successMsg)
    setTimeout(() => successMsg.remove(), 3000)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-green-500 to-blue-600 rounded-2xl mb-6 shadow-xl">
              <FaShieldAlt className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Verify Your Email
            </h1>
            <p className="text-gray-600 text-base mb-2">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-blue-600 font-semibold">{email}</p>
          </div>

          {/* Timer */}
          <div className="mb-6">
            <div className={`text-center p-4 rounded-xl border-2 ${
              countdown < 60 ? 'bg-red-50 border-red-300' : 'bg-blue-50 border-blue-300'
            }`}>
              <p className="text-sm text-gray-600 mb-1">Code expires in</p>
              <p className={`text-3xl font-bold ${
                countdown < 60 ? 'text-red-600' : 'text-blue-600'
              }`}>
                {formatTime(countdown)}
              </p>
            </div>
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
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                Enter Verification Code
              </label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                    disabled={loading}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-500 text-center">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || otp.join('').length !== 6}
              className="bg-linear-to-r! from-green-600! to-blue-600! text-white! hover:from-green-700! hover:to-blue-700! shadow-xl! rounded-xl! py-4! font-bold! text-base! capitalize! transition-all! hover:scale-[1.02]!"
              startIcon={loading ? <CircularProgress size={20} className="text-white!" /> : <MdVerified />}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">
              Didn't receive the code?
            </p>
            <Button
              onClick={handleResend}
              disabled={resendCountdown > 0}
              variant="outlined"
              className="border-blue-600! text-blue-600! hover:bg-blue-50! rounded-xl! px-6! py-2.5! font-semibold! capitalize!"
            >
              {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : 'Resend Code'}
            </Button>
          </div>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <Link to="/forgot-password">
              <Button
                variant="text"
                className="text-blue-600! hover:bg-blue-50! rounded-xl! px-6! py-2! font-semibold! capitalize!"
                startIcon={<MdArrowBack />}
              >
                Back
              </Button>
            </Link>
          </div>

          {/* Tips */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h4 className="text-sm font-semibold text-green-900 mb-2 flex items-center gap-2">
                <span className="text-lg">💡</span>
                Tips
              </h4>
              <ul className="space-y-1 text-xs text-green-800">
                <li>• Check your spam/junk folder</li>
                <li>• Make sure you entered the correct email</li>
                <li>• The code is valid for 10 minutes</li>
                <li>• For testing, use code: <span className="font-bold">123456</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/sign-in" className="text-blue-600 font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Animation Style */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default VerifyEmail