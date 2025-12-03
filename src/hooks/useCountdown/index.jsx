import { useState, useEffect, useCallback, useRef } from 'react'

export const useCountdown = (initialTime = 60) => {
  const [countdown, setCountdown] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (isActive && countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    } else if (countdown === 0) {
      setIsActive(false)
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [countdown, isActive])

  // Memoize start function
  const start = useCallback((time = initialTime) => {
    setCountdown(time)
    setIsActive(true)
  }, [initialTime])

  // Memoize reset function
  const reset = useCallback(() => {
    setCountdown(initialTime)
    setIsActive(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }, [initialTime])

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }, [])

  return {
    countdown,
    isActive,
    isExpired: countdown === 0,
    formatted: formatTime(countdown),
    start,
    reset
  }
}