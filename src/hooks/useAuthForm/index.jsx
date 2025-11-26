import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuthForm = (initialValues = {}) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    ...initialValues
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validate = (fields = ['email', 'password']) => {
    const newErrors = {}

    if (fields.includes('fullName')) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required'
      } else if (formData.fullName.length < 3) {
        newErrors.fullName = 'Full name must be at least 3 characters'
      }
    }

    if (fields.includes('email')) {
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Invalid email format'
      }
    }

    if (fields.includes('phone')) {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required'
      } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10-11 digits'
      }
    }

    if (fields.includes('password')) {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
    }

    if (fields.includes('confirmPassword')) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e, redirectTo = '/', validationFields) => {
    e.preventDefault()
    
    if (!validate(validationFields)) return

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      navigate(redirectTo)
    }, 1500)
  }

  return {
    formData,
    loading,
    errors,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit,
    validate,
    setLoading,
    setErrors
  }
}