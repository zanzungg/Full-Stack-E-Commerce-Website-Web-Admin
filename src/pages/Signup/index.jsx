import React from 'react'
import { Link } from 'react-router-dom'
import { Auth } from '../../components/Auth'
import { useAuthForm } from '../../hooks/useAuthForm'
import { MdAdminPanelSettings } from 'react-icons/md'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaPhone } from 'react-icons/fa'

const Signup = () => {
  const { 
    formData, 
    loading, 
    errors, 
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit
  } = useAuthForm({ fullName: '', phone: '', confirmPassword: '' })

  return (
    <Auth.Root className="py-12">
      <Auth.Card>
        <Auth.Header
          icon={MdAdminPanelSettings}
          title="Create Account"
          subtitle="Sign up to get started"
        />

        <Auth.Form onSubmit={(e) => handleSubmit(e, '/sign-in', ['fullName', 'email', 'phone', 'password', 'confirmPassword'])}>
          <Auth.Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            icon={FaUser}
            error={errors.fullName}
          />

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
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0123456789"
            icon={FaPhone}
            error={errors.phone}
          />

          <Auth.Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            icon={FaLock}
            endIcon={showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            onEndIconClick={() => setShowPassword(!showPassword)}
            error={errors.password}
          />

          <Auth.Input
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            icon={FaLock}
            endIcon={showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
            onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            error={errors.confirmPassword}
          />

          <Auth.Checkbox
            id="terms"
            label="I agree to the"
            required
            links={[
              { text: 'Terms of Service', href: '/terms' },
              { text: 'Privacy Policy', href: '/privacy' }
            ]}
          />

          <Auth.Submit loading={loading}>
            Create Account
          </Auth.Submit>

          <Auth.Divider text="Or sign up with" />
          <Auth.Social />
        </Auth.Form>

        <Auth.Footer
          text="Already have an account?"
          linkText="Sign In"
          linkHref="/sign-in"
          LinkComponent={Link}
        />
      </Auth.Card>
    </Auth.Root>
  )
}

export default Signup