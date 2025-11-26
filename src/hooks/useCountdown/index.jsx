import { useState, useEffect } from 'react'

export const useCountdown = (initialTime = 60) => {
  const [countdown, setCountdown] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let timer
    if (isActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      setIsActive(false)
    }
    return () => clearTimeout(timer)
  }, [countdown, isActive])

  const start = (time = initialTime) => {
    setCountdown(time)
    setIsActive(true)
  }

  const reset = () => {
    setCountdown(initialTime)
    setIsActive(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return {
    countdown,
    isActive,
    isExpired: countdown === 0,
    formatted: formatTime(countdown),
    start,
    reset
  }
}