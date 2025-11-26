import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CircularProgress } from '@mui/material'
import { FaImage, FaSave, FaTimes } from 'react-icons/fa'
import { MdPreview } from 'react-icons/md'

// Import Reusable Components
import PageHeader from '../../../components/PageHeader'
import FormSection from '../../../components/FormSection'
import FormInput from '../../../components/FormInput'
import FormSelect from '../../../components/FormSelect'
import FormCheckbox from '../../../components/FormCheckbox'
import ImageUploader from '../../../components/ImageUploader'
import UploadProgress from '../../../components/UploadProgress'

const AddHomeBannerSlidePage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [bannerImage, setBannerImage] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    link: '',
    buttonText: 'Shop Now',
    buttonColor: '#3B82F6',
    textColor: '#FFFFFF',
    backgroundColor: '',
    position: '',
    startDate: '',
    endDate: '',
    status: 'draft',
    showButton: true,
    openInNewTab: false,
    fullWidth: true,
  })
  const [errors, setErrors] = useState({})

  // Button text options
  const buttonTextOptions = [
    { value: 'Shop Now', label: 'Shop Now' },
    { value: 'Learn More', label: 'Learn More' },
    { value: 'Explore', label: 'Explore' },
    { value: 'Discover', label: 'Discover' },
    { value: 'Get Started', label: 'Get Started' },
    { value: 'Buy Now', label: 'Buy Now' },
    { value: 'View Collection', label: 'View Collection' },
    { value: 'See Details', label: 'See Details' },
  ]

  // Status options
  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'active', label: 'Active' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'inactive', label: 'Inactive' },
  ]

  // Position options
  const positionOptions = [
    { value: '1', label: 'Position 1 (First)' },
    { value: '2', label: 'Position 2' },
    { value: '3', label: 'Position 3' },
    { value: '4', label: 'Position 4' },
    { value: '5', label: 'Position 5' },
    { value: '6', label: 'Position 6' },
    { value: '7', label: 'Position 7' },
    { value: '8', label: 'Position 8' },
    { value: '9', label: 'Position 9' },
    { value: '10', label: 'Position 10' },
  ]

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Handle image upload
  const handleImageUpload = (files) => {
    const file = files[0] // Only allow 1 banner image
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerImage([{
          file,
          preview: reader.result,
          name: file.name
        }])
      }
      reader.readAsDataURL(file)
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }))
      }
    }
  }

  // Remove image
  const handleRemoveImage = () => {
    setBannerImage([])
  }

  // Validate form
  const validate = () => {
    const newErrors = {}

    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.subtitle) newErrors.subtitle = 'Subtitle is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.link) newErrors.link = 'Link URL is required'
    if (!formData.position) newErrors.position = 'Position is required'
    if (!formData.startDate) newErrors.startDate = 'Start date is required'
    if (!formData.endDate) newErrors.endDate = 'End date is required'
    if (bannerImage.length === 0) newErrors.image = 'Banner image is required'

    // Validate dates
    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date must be after start date'
      }
    }

    // Validate URL
    if (formData.link && !formData.link.startsWith('/') && !formData.link.startsWith('http')) {
      newErrors.link = 'Link must start with / or http'
    }

    return newErrors
  }

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setUploadProgress(0)
      navigate('/home-banners')
    }, 2500)
  }

  // Toggle preview
  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <PageHeader
        icon={FaImage}
        title="Add New Banner"
        subtitle="Create a new slider banner for homepage"
        actions={
          <Button
            variant="outlined"
            onClick={togglePreview}
            disabled={bannerImage.length === 0}
            className="border-purple-600! text-purple-600! hover:bg-purple-50! rounded-xl! px-5! py-2.5! font-semibold! capitalize!"
            startIcon={<MdPreview />}
          >
            Preview
          </Button>
        }
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Banner Content */}
            <FormSection 
              title="Banner Content" 
              subtitle="Main text and messaging for your banner"
            >
              <div className="space-y-4">
                <FormInput
                  label="Banner Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Summer Sale 2024"
                  required
                  error={errors.title}
                />

                <FormInput
                  label="Subtitle"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="e.g., Up to 70% Off"
                  required
                  error={errors.subtitle}
                />

                <FormInput
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  type="textarea"
                  placeholder="Brief description about the promotion or offer"
                  rows="4"
                  required
                  error={errors.description}
                />
              </div>
            </FormSection>

            {/* Link & CTA Settings */}
            <FormSection 
              title="Link & Call-to-Action" 
              subtitle="Configure button and destination link"
            >
              <div className="space-y-4">
                <FormInput
                  label="Destination Link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="/category/electronics or https://example.com"
                  required
                  error={errors.link}
                />

                <FormCheckbox
                  label="Show CTA Button"
                  name="showButton"
                  checked={formData.showButton}
                  onChange={handleChange}
                  description="Display a call-to-action button on the banner"
                />

                {formData.showButton && (
                  <>
                    <FormSelect
                      label="Button Text"
                      name="buttonText"
                      value={formData.buttonText}
                      onChange={handleChange}
                      options={buttonTextOptions}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Button Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            name="buttonColor"
                            value={formData.buttonColor}
                            onChange={handleChange}
                            className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={formData.buttonColor}
                            onChange={(e) => handleChange({ target: { name: 'buttonColor', value: e.target.value } })}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="#3B82F6"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Text Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            name="textColor"
                            value={formData.textColor}
                            onChange={handleChange}
                            className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={formData.textColor}
                            onChange={(e) => handleChange({ target: { name: 'textColor', value: e.target.value } })}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="#FFFFFF"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <FormCheckbox
                  label="Open link in new tab"
                  name="openInNewTab"
                  checked={formData.openInNewTab}
                  onChange={handleChange}
                  description="Link will open in a new browser tab"
                />
              </div>
            </FormSection>

            {/* Design Settings */}
            <FormSection 
              title="Design Settings" 
              subtitle="Customize banner appearance"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Background Color (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      name="backgroundColor"
                      value={formData.backgroundColor}
                      onChange={handleChange}
                      className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      name="backgroundColor"
                      value={formData.backgroundColor}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="#000000 or leave empty for image"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Leave empty to use only the banner image
                  </p>
                </div>

                <FormCheckbox
                  label="Full Width Banner"
                  name="fullWidth"
                  checked={formData.fullWidth}
                  onChange={handleChange}
                  description="Banner will stretch across the full width of the page"
                />
              </div>
            </FormSection>
          </div>

          {/* Right Column - Settings & Upload */}
          <div className="space-y-6">
            {/* Banner Image */}
            <FormSection>
              <ImageUploader
                label="Banner Image"
                images={bannerImage}
                onUpload={handleImageUpload}
                onRemove={handleRemoveImage}
                maxImages={1}
                required
                error={errors.image}
              />
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm font-semibold text-blue-900 mb-2">📐 Recommended Specifications:</p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• <strong>Size:</strong> 1200 x 400 pixels (3:1 ratio)</li>
                  <li>• <strong>Format:</strong> JPG, PNG, or WebP</li>
                  <li>• <strong>Max Size:</strong> 2MB</li>
                  <li>• <strong>Tip:</strong> Use high contrast for text readability</li>
                </ul>
              </div>
            </FormSection>

            {/* Banner Settings */}
            <FormSection title="Banner Settings">
              <div className="space-y-4">
                <FormSelect
                  label="Display Position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  options={positionOptions}
                  placeholder="Select position"
                  required
                  error={errors.position}
                />

                <FormSelect
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={statusOptions}
                />

                <div className="grid grid-cols-1 gap-4">
                  <FormInput
                    label="Start Date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    type="date"
                    required
                    error={errors.startDate}
                  />

                  <FormInput
                    label="End Date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    type="date"
                    required
                    error={errors.endDate}
                  />
                </div>
              </div>
            </FormSection>

            {/* Action Buttons */}
            <FormSection className="space-y-3">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                className="bg-linear-to-r! from-blue-600! to-purple-600! text-white! hover:from-blue-700! hover:to-purple-700! shadow-lg! rounded-xl! py-3.5! font-bold! text-base! capitalize! transition-all!"
                startIcon={loading ? <CircularProgress size={20} className="text-white!" /> : <FaSave />}
              >
                {loading ? 'Saving...' : 'Save Banner'}
              </Button>

              {loading && (
                <UploadProgress 
                  progress={uploadProgress}
                  text="Uploading banner..."
                  color="blue"
                />
              )}

              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={() => navigate('/home-banner-slides/')}
                disabled={loading}
                className="mt-3! border-gray-300! text-gray-700! hover:bg-gray-50! rounded-xl! py-3.5! font-bold! text-base! capitalize!"
                startIcon={<FaTimes />}
              >
                Cancel
              </Button>
            </FormSection>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && bannerImage.length > 0 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={togglePreview}
        >
          <div 
            className="bg-white rounded-2xl max-w-6xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Banner Preview</h3>
              <button
                onClick={togglePreview}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Banner Preview */}
            <div className="p-6">
              <div 
                className="relative rounded-xl overflow-hidden shadow-lg"
                style={{
                  aspectRatio: '3/1',
                  backgroundColor: formData.backgroundColor || 'transparent'
                }}
              >
                {/* Banner Image */}
                <img 
                  src={bannerImage[0].preview}
                  alt="Banner Preview"
                  className="w-full h-full object-cover"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center max-w-2xl">
                    <h1 
                      className="text-5xl font-bold mb-4 drop-shadow-lg"
                      style={{ color: formData.textColor }}
                    >
                      {formData.title || 'Banner Title'}
                    </h1>
                    <p 
                      className="text-3xl font-semibold mb-6 drop-shadow-lg"
                      style={{ color: formData.textColor }}
                    >
                      {formData.subtitle || 'Subtitle'}
                    </p>
                    {formData.showButton && (
                      <button
                        className="px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-transform"
                        style={{
                          backgroundColor: formData.buttonColor,
                          color: formData.textColor
                        }}
                      >
                        {formData.buttonText}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Info */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 font-medium">Position</p>
                    <p className="text-gray-900 font-bold">{formData.position || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Status</p>
                    <p className="text-gray-900 font-bold capitalize">{formData.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">Start Date</p>
                    <p className="text-gray-900 font-bold">{formData.startDate || '-'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium">End Date</p>
                    <p className="text-gray-900 font-bold">{formData.endDate || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddHomeBannerSlidePage