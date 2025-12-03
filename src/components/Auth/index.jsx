import React, { createContext, useContext } from 'react'
import { MdCheckCircle } from 'react-icons/md'

// ==================== CONTEXT ====================
const AuthContext = createContext(null)

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('Auth components must be used within Auth.Root')
  }
  return context
}

// ==================== ROOT ====================
const Root = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 ${className}`}>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}

// ==================== CARD ====================
const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

// ==================== HEADER ====================
const Header = ({ 
  icon: Icon, 
  title, 
  subtitle,
  email,
  linear = 'from-blue-600 to-purple-600'
}) => {
  return (
    <div className={`bg-linear-to-r ${linear} p-8 text-center`}>
      <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
        <Icon className="w-12 h-12 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-blue-100 mb-2">{subtitle}</p>
      {email && (
        <p className="text-white font-semibold bg-white/20 inline-block px-4 py-1 rounded-full">
          {email}
        </p>
      )}
    </div>
  )
}

// ==================== FORM ====================
const Form = ({ children, onSubmit, className = '' }) => {
  return (
    <form onSubmit={onSubmit} className={`p-8 space-y-6 ${className}`}>
      {children}
    </form>
  )
}

// ==================== INPUT ====================
const Input = ({ 
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  endIcon,
  onEndIconClick,
  error,
  disabled = false,
  helpText,
  className = '',
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} ${endIcon ? 'pr-12' : 'pr-4'} py-3.5 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 bg-gray-50`}
          {...props}
        />
        {endIcon && (
          <button
            type="button"
            onClick={onEndIconClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {endIcon}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {helpText && !error && (
        <p className="mt-2 text-xs text-gray-500">{helpText}</p>
      )}
    </div>
  )
}

// ==================== SUBMIT BUTTON ====================
const Submit = ({ 
  children,
  loading = false,
  disabled = false,
  linear = 'from-blue-600 to-purple-600',
  className = '',
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className={`w-full bg-linear-to-r ${linear} text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

// ==================== CHECKBOX ====================
const Checkbox = ({ id, label, required = false, links = [], ...props }) => {
  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        id={id}
        className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        required={required}
        {...props}
      />
      <label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
        {label}
        {links.map((link, index) => (
          <React.Fragment key={index}>
            {' '}
            <a href={link.href} className="text-blue-600 hover:text-blue-700 font-semibold">
              {link.text}
            </a>
          </React.Fragment>
        ))}
      </label>
    </div>
  )
}

// ==================== DIVIDER ====================
const Divider = ({ text = 'Or continue with' }) => {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white text-gray-500 font-medium">{text}</span>
      </div>
    </div>
  )
}

// ==================== SOCIAL ====================
const Social = ({ providers = ['google'], onProviderClick }) => {
  const providerConfig = {
    google: {
      name: 'Google',
      icon: 'https://www.google.com/favicon.ico'
    },
  }

  const validProviders = providers.filter(p => providerConfig[p])

  // Nếu không có provider hợp lệ nào → không render gì
  if (validProviders.length === 0) return null

  return (
    <div className={`grid gap-4 ${validProviders.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
      {validProviders.map((provider) => {
        const config = providerConfig[provider]

        return (
          <button
            key={provider}
            type="button"
            onClick={() => onProviderClick?.(provider)}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <img src={config.icon} alt={config.name} className="w-5 h-5" />
            <span className="font-semibold text-gray-700 text-sm group-hover:text-gray-900">
              {config.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ==================== FOOTER ====================
const Footer = ({ text, linkText, linkHref, LinkComponent, className = '' }) => {
  return (
    <div className={`px-8 py-6 bg-gray-50 border-t border-gray-200 text-center ${className}`}>
      <p className="text-sm text-gray-600">
        {text}{' '}
        <LinkComponent to={linkHref} className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          {linkText}
        </LinkComponent>
      </p>
    </div>
  )
}

// ==================== LINK ====================
const TextLink = ({ children, to, LinkComponent, className = '' }) => {
  return (
    <div className={`mt-6 text-center ${className}`}>
      <p className="text-sm text-gray-600">
        {children}
      </p>
    </div>
  )
}

// ==================== OTP INPUT ====================
const OTPInput = ({ 
  value = ['', '', '', '', '', ''],
  onChange,
  onComplete,
  disabled = false,
  error = false
}) => {
  const inputRefs = React.useRef([])

  const handleChange = (index, val) => {
    if (val.length > 1) val = val[0]
    if (!/^\d*$/.test(val)) return

    const newValue = [...value]
    newValue[index] = val
    onChange(newValue)

    // Auto focus next
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check complete
    if (newValue.every(digit => digit) && onComplete) {
      onComplete(newValue.join(''))
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    
    if (!/^\d{6}$/.test(pastedData)) return

    const newValue = pastedData.split('')
    onChange(newValue)
    inputRefs.current[5]?.focus()
    
    if (onComplete) onComplete(pastedData)
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
        Enter Verification Code
      </label>
      <div className="flex gap-2 justify-center">
        {value.map((digit, index) => (
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
            disabled={disabled}
            className={`w-12 h-14 text-center text-2xl font-bold bg-gray-50 border-2 ${
              error ? 'border-red-300' : 'border-gray-300'
            } rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900`}
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500 text-center">
        Enter the 6-digit code sent to your email
      </p>
    </div>
  )
}

// ==================== COUNTDOWN TIMER ====================
const CountdownTimer = ({ seconds, warningThreshold = 60 }) => {
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`
  }

  if (seconds === 0) {
    return (
      <div className="mb-6">
        <div className="text-center p-4 rounded-xl border-2 bg-red-50 border-red-300 animate-pulse">
          <p className="text-sm text-red-600 font-semibold flex items-center justify-center gap-2">
            <span className="text-xl">⚠️</span>
            Code has expired - Please request a new one
          </p>
        </div>
      </div>
    )
  }

  const isWarning = seconds < warningThreshold
  const percentage = (seconds / 600) * 100 // Assuming max 600 seconds

  return (
    <div className="mb-6">
      <div className={`text-center p-4 rounded-xl border-2 transition-all duration-300 ${
        isWarning ? 'bg-red-50 border-red-300 animate-pulse' : 'bg-blue-50 border-blue-300'
      }`}>
        <p className="text-sm text-gray-600 mb-1">Code expires in</p>
        <p className={`text-3xl font-bold transition-colors duration-300 ${
          isWarning ? 'text-red-600' : 'text-blue-600'
        }`}>
          {formatTime(seconds)}
        </p>
        
        {/* Progress bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 rounded-full ${
              isWarning ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// ==================== RESEND BUTTON ====================
const ResendButton = ({ countdown, onResend, text = 'Resend Code' }) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600 mb-3">
        Didn't receive the code?
      </p>
      <button
        type="button"
        onClick={onResend}
        disabled={countdown > 0}
        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl px-6 py-2.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {countdown > 0 ? `${text} in ${countdown}s` : text}
      </button>
    </div>
  )
}

// ==================== PASSWORD STRENGTH ====================
const PasswordStrength = ({ password }) => {
  const [strength, setStrength] = React.useState(0)

  React.useEffect(() => {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++
    setStrength(score)
  }, [password])

  const getColor = () => {
    if (strength < 2) return { bg: 'bg-red-500', text: 'text-red-600' }
    if (strength < 4) return { bg: 'bg-yellow-500', text: 'text-yellow-600' }
    return { bg: 'bg-green-500', text: 'text-green-600' }
  }

  const getText = () => {
    if (strength < 2) return 'Weak'
    if (strength < 4) return 'Medium'
    return 'Strong'
  }

  if (!password) return null

  const colors = getColor()

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600">Password strength:</span>
        <span className={`text-xs font-semibold ${colors.text}`}>
          {getText()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all ${colors.bg}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
    </div>
  )
}

// ==================== PASSWORD REQUIREMENTS ====================
const PasswordRequirements = ({ password }) => {
  const requirements = [
    { text: 'At least 8 characters long', met: password.length >= 8 },
    { text: 'Contains uppercase and lowercase letters', met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { text: 'Contains at least one number', met: /\d/.test(password) },
    { text: 'Contains at least one special character', met: /[^a-zA-Z0-9]/.test(password) }
  ]

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
        <h4 className="text-sm font-semibold text-purple-900 mb-2 flex items-center gap-2">
          <span className="text-lg">🔒</span>
          Password Requirements
        </h4>
        <ul className="space-y-1 text-xs">
          {requirements.map((req, index) => (
            <li 
              key={index}
              className={req.met ? 'text-green-600 font-semibold' : 'text-purple-800'}
            >
              {req.met ? '✓' : '•'} {req.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ==================== PASSWORD MATCH ====================
const PasswordMatch = ({ password, confirmPassword }) => {
  if (!confirmPassword) return null

  const isMatch = password === confirmPassword

  return (
    <div className="mt-2">
      {isMatch ? (
        <p className="text-xs text-green-600 flex items-center gap-1">
          <MdCheckCircle className="w-4 h-4" />
          Passwords match
        </p>
      ) : (
        <p className="text-xs text-red-600">
          Passwords do not match
        </p>
      )}
    </div>
  )
}

// ==================== HELP BOX ====================
const HelpBox = ({ 
  title = 'Need Help?',
  icon = '💡',
  tips = [],
  bgColor = 'bg-blue-50',
  borderColor = 'border-blue-200',
  textColor = 'text-blue-800',
  titleColor = 'text-blue-900'
}) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className={`${bgColor} rounded-xl p-4 border ${borderColor}`}>
        <h4 className={`text-sm font-semibold ${titleColor} mb-2 flex items-center gap-2`}>
          <span className="text-lg">{icon}</span>
          {title}
        </h4>
        <ul className={`space-y-1 text-xs ${textColor}`}>
          {tips.map((tip, index) => (
            <li key={index}>• {tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ==================== SUCCESS STATE ====================
const SuccessState = ({
  title,
  message,
  infoBox,
  redirectMessage,
  buttonText = 'Continue',
  buttonHref,
  LinkComponent,
  buttonlinear = 'from-blue-600 to-purple-600'
}) => {
  return (
    <div className="text-center py-8">
      {/* Success Icon */}
      <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-bounce-slow">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 text-base mb-6">{message}</p>

      {infoBox && (
        <div className="bg-linear-to-br from-green-50 to-blue-50 rounded-2xl p-6 mb-6 border border-green-200">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <MdCheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">{infoBox.title}</p>
              <p className="text-xs text-gray-600">{infoBox.subtitle}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">{infoBox.message}</p>
        </div>
      )}

      {redirectMessage && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mb-6">
          <p className="text-sm text-blue-800">⏱️ {redirectMessage}</p>
        </div>
      )}

      <LinkComponent to={buttonHref}>
        <button
          className={`bg-linear-to-r ${buttonlinear} text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
        >
          {buttonText}
        </button>
      </LinkComponent>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// ==================== EXPORTS ====================
export const Auth = {
  Root,
  Card,
  Header,
  Form,
  Input,
  Submit,
  Checkbox,
  Divider,
  Social,
  Footer,
  TextLink,
  OTPInput,
  CountdownTimer,
  ResendButton,
  PasswordStrength,
  PasswordRequirements,
  PasswordMatch,
  HelpBox,
  SuccessState
}