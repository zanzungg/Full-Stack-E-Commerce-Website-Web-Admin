import { useState } from 'react'

export const useOTP = (length = 6) => {
  const [otp, setOtp] = useState(Array(length).fill(''))

  const isComplete = otp.every(digit => digit !== '')
  const value = otp.join('')

  const reset = () => setOtp(Array(length).fill(''))

  return {
    otp,
    setOtp,
    isComplete,
    value,
    reset
  }
}