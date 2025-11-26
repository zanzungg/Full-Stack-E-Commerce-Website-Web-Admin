import React from 'react'
import { Link } from 'react-router-dom'
import { Auth } from '../../components/Auth'
import { useAuthForm } from '../../hooks/useAuthForm'
import { MdAdminPanelSettings } from 'react-icons/md'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

const Signin = () => {
  const { 
    formData, 
    loading, 
    errors, 
    showPassword, 
    setShowPassword,
    handleChange,
    handleSubmit
  } = useAuthForm()

  return (
    <Auth.Root>
      <Auth.Card>
        <Auth.Header
          icon={MdAdminPanelSettings}
          title="Admin Panel"
          subtitle="Sign in to your account"
        />

        <Auth.Form onSubmit={(e) => handleSubmit(e, '/', ['email', 'password'])}>
          <Auth.Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            icon={FaEnvelope}
            error={errors.email}
          />

          <Auth.Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            icon={FaLock}
            endIcon={showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            onEndIconClick={() => setShowPassword(!showPassword)}
            error={errors.password}
          />

          <div className="flex items-center justify-between">
            <Auth.Checkbox id="remember" label="Remember me" />
            <Link to="/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Forgot Password?
            </Link>
          </div>

          <Auth.Submit loading={loading}>
            Sign In
          </Auth.Submit>

          <Auth.Divider />
          <Auth.Social />
        </Auth.Form>

        <Auth.Footer
          text="Don't have an account?"
          linkText="Sign Up"
          linkHref="/sign-up"
          LinkComponent={Link}
        />
      </Auth.Card>

      <Auth.TextLink>
        By signing in, you agree to our{' '}
        <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
          Privacy Policy
        </Link>
      </Auth.TextLink>
    </Auth.Root>
  )
}

export default Signin