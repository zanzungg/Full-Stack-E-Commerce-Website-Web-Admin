import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CircularProgress } from '@mui/material'
import { MdCategory } from 'react-icons/md'
import { FaSave, FaTimes } from 'react-icons/fa'

// Import Reusable Components
import PageHeader from '../../../components/PageHeader'
import FormSection from '../../../components/FormSection'
import FormInput from '../../../components/FormInput'
import FormSelect from '../../../components/FormSelect'
import FormCheckbox from '../../../components/FormCheckbox'
import ImageUploader from '../../../components/ImageUploader'
import UploadProgress from '../../../components/UploadProgress'

const AddCategoryPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [categoryImage, setCategoryImage] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentCategory: '',
    icon: '',
    order: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    metaRobots: 'index,follow',
    featured: false,
    showInMenu: true,
    status: 'active',
  })
  const [errors, setErrors] = useState({})

  // Parent categories (in real app, fetch from API)
  const parentCategories = [
    { value: '', label: 'None (Top Level)' },
    { value: 'CAT-001', label: 'Electronics' },
    { value: 'CAT-002', label: 'Fashion' },
    { value: 'CAT-003', label: 'Home & Living' },
    { value: 'CAT-004', label: 'Sports & Fitness' },
    { value: 'CAT-005', label: 'Books & Stationery' },
  ]

  // Status options
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ]

  // Meta robots options
  const metaRobotsOptions = [
    { value: 'index,follow', label: 'Index, Follow (Recommended)' },
    { value: 'noindex,follow', label: 'No Index, Follow' },
    { value: 'index,nofollow', label: 'Index, No Follow' },
    { value: 'noindex,nofollow', label: 'No Index, No Follow' },
  ]

  // Icon options
  const iconOptions = [
    { value: '💻', label: '💻 Electronics' },
    { value: '📱', label: '📱 Mobile' },
    { value: '👕', label: '👕 Fashion' },
    { value: '👔', label: '👔 Mens' },
    { value: '👗', label: '👗 Womens' },
    { value: '👟', label: '👟 Shoes' },
    { value: '🏠', label: '🏠 Home' },
    { value: '🛋️', label: '🛋️ Furniture' },
    { value: '🍳', label: '🍳 Kitchen' },
    { value: '🖼️', label: '🖼️ Decor' },
    { value: '⚽', label: '⚽ Sports' },
    { value: '🏋️', label: '🏋️ Fitness' },
    { value: '📚', label: '📚 Books' },
    { value: '✏️', label: '✏️ Stationery' },
    { value: '🎮', label: '🎮 Gaming' },
    { value: '🎧', label: '🎧 Audio' },
    { value: '📷', label: '📷 Camera' },
    { value: '⌚', label: '⌚ Watches' },
    { value: '💄', label: '💄 Beauty' },
    { value: '🧸', label: '🧸 Toys' },
  ]

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Auto-generate slug from name
    if (name === 'name' && value) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Handle image upload
  const handleImageUpload = (files) => {
    const file = files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCategoryImage([{
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
    setCategoryImage([])
  }

  // Validate form
  const validate = () => {
    const newErrors = {}

    if (!formData.name) newErrors.name = 'Category name is required'
    if (!formData.slug) newErrors.slug = 'Slug is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.seoTitle) newErrors.seoTitle = 'SEO title is required'
    if (!formData.seoDescription) newErrors.seoDescription = 'SEO description is required'
    if (categoryImage.length === 0) newErrors.image = 'Category image is required'

    // Validate slug format
    if (formData.slug && !/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens'
    }

    // Validate SEO description length
    if (formData.seoDescription && formData.seoDescription.length > 160) {
      newErrors.seoDescription = 'SEO description should be max 160 characters'
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
      navigate('/categories')
    }, 2500)
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <PageHeader
        icon={MdCategory}
        title="Add New Category"
        subtitle="Create a new product category"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <FormSection 
              title="Basic Information" 
              subtitle="Main category details"
            >
              <div className="space-y-4">
                <FormInput
                  label="Category Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Electronics"
                  required
                  error={errors.name}
                />

                <FormInput
                  label="URL Slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="electronics"
                  required
                  error={errors.slug}
                />
                <p className="text-xs text-gray-500 -mt-2">
                  URL-friendly version (lowercase, no spaces). Auto-generated from name.
                </p>

                <FormInput
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  type="textarea"
                  placeholder="Brief description of this category"
                  rows="4"
                  required
                  error={errors.description}
                />
              </div>
            </FormSection>

            {/* Category Settings */}
            <FormSection 
              title="Category Settings" 
              subtitle="Hierarchy and display options"
            >
              <div className="space-y-4">
                <FormSelect
                  label="Parent Category"
                  name="parentCategory"
                  value={formData.parentCategory}
                  onChange={handleChange}
                  options={parentCategories}
                />
                <p className="text-xs text-gray-500 -mt-2">
                  Leave empty to create a top-level category. Select a parent to create a sub-category.
                </p>

                <FormSelect
                  label="Icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  options={[{ value: '', label: 'Select Icon' }, ...iconOptions]}
                />

                <FormInput
                  label="Display Order"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  type="number"
                  placeholder="1"
                  min="1"
                />
                <p className="text-xs text-gray-500 -mt-2">
                  Lower numbers appear first. Leave empty for default ordering.
                </p>

                <div className="space-y-3 pt-2">
                  <FormCheckbox
                    label="Featured Category"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    description="Show this category in featured sections on homepage"
                  />

                  <FormCheckbox
                    label="Show in Navigation Menu"
                    name="showInMenu"
                    checked={formData.showInMenu}
                    onChange={handleChange}
                    description="Display this category in the main navigation menu"
                  />
                </div>
              </div>
            </FormSection>

            {/* SEO Settings */}
            <FormSection 
              title="SEO Settings" 
              subtitle="Optimize for search engines"
            >
              <div className="space-y-4">
                <FormInput
                  label="SEO Title"
                  name="seoTitle"
                  value={formData.seoTitle}
                  onChange={handleChange}
                  placeholder="Electronics - Best Deals on Gadgets"
                  required
                  error={errors.seoTitle}
                />
                <p className="text-xs text-gray-500 -mt-2">
                  Recommended: 50-60 characters. Will appear in search results.
                </p>

                <FormInput
                  label="SEO Description"
                  name="seoDescription"
                  value={formData.seoDescription}
                  onChange={handleChange}
                  type="textarea"
                  placeholder="Shop the latest electronics including smartphones, laptops, cameras, and more at great prices."
                  rows="3"
                  required
                  error={errors.seoDescription}
                />
                <div className="flex justify-between text-xs -mt-2">
                  <p className="text-gray-500">
                    Recommended: 150-160 characters. Shows in search results.
                  </p>
                  <p className={`font-semibold ${
                    formData.seoDescription.length > 160 ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {formData.seoDescription.length}/160
                  </p>
                </div>

                <FormInput
                  label="SEO Keywords (Optional)"
                  name="seoKeywords"
                  value={formData.seoKeywords}
                  onChange={handleChange}
                  placeholder="electronics, gadgets, smartphones, laptops"
                />
                <p className="text-xs text-gray-500 -mt-2">
                  Comma-separated keywords for internal search optimization.
                </p>

                <FormSelect
                  label="Meta Robots"
                  name="metaRobots"
                  value={formData.metaRobots}
                  onChange={handleChange}
                  options={metaRobotsOptions}
                />
                <p className="text-xs text-gray-500 -mt-2">
                  Control how search engines crawl and index this category.
                </p>
              </div>
            </FormSection>

            {/* SEO Preview */}
            <FormSection 
              title="SEO Preview" 
              subtitle="How it will appear in search results"
            >
              <div className="bg-white border border-gray-300 rounded-xl p-4">
                <div className="space-y-2">
                  <p className="text-xs text-gray-600">
                    https://yoursite.com/category/{formData.slug || 'category-slug'}
                  </p>
                  <h3 className="text-xl text-blue-600 font-semibold hover:underline cursor-pointer">
                    {formData.seoTitle || 'Your SEO Title Here'}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {formData.seoDescription || 'Your SEO description will appear here. This is what users will see in search engine results.'}
                  </p>
                </div>
              </div>
            </FormSection>
          </div>

          {/* Right Column - Image & Settings */}
          <div className="space-y-6">
            {/* Category Image */}
            <FormSection>
              <ImageUploader
                label="Category Image"
                images={categoryImage}
                onUpload={handleImageUpload}
                onRemove={handleRemoveImage}
                maxImages={1}
                required
                error={errors.image}
              />
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm font-semibold text-blue-900 mb-2">📐 Image Specifications:</p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• <strong>Size:</strong> 300 x 300 pixels (1:1 ratio)</li>
                  <li>• <strong>Format:</strong> JPG, PNG, or WebP</li>
                  <li>• <strong>Max Size:</strong> 500KB</li>
                  <li>• <strong>Tip:</strong> Use clear, recognizable images</li>
                </ul>
              </div>
            </FormSection>

            {/* Status */}
            <FormSection title="Publication">
              <FormSelect
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={statusOptions}
              />
              <p className="text-xs text-gray-500 mt-2">
                Categories must be active to appear on the website.
              </p>
            </FormSection>

            {/* Quick Info */}
            <FormSection title="Quick Info">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold text-gray-900">
                    {formData.parentCategory ? 'Sub-Category' : 'Parent Category'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Icon:</span>
                  <span className="text-2xl">
                    {formData.icon || '📁'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Featured:</span>
                  <span className={`font-semibold ${formData.featured ? 'text-green-600' : 'text-gray-400'}`}>
                    {formData.featured ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">In Menu:</span>
                  <span className={`font-semibold ${formData.showInMenu ? 'text-green-600' : 'text-gray-400'}`}>
                    {formData.showInMenu ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold capitalize ${
                    formData.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formData.status}
                  </span>
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
                {loading ? 'Creating...' : 'Create Category'}
              </Button>

              {loading && (
                <UploadProgress 
                  progress={uploadProgress}
                  text="Creating category..."
                  color="blue"
                />
              )}

              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={() => navigate('/categories')}
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

      {/* Guidelines */}
      <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <MdCategory className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Category Best Practices</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">✅ Do's</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Use clear, descriptive names</li>
                  <li>• Keep hierarchy simple (2-3 levels max)</li>
                  <li>• Write unique SEO descriptions</li>
                  <li>• Use high-quality images</li>
                  <li>• Order categories logically</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">❌ Don'ts</h5>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Avoid duplicate slugs</li>
                  <li>• Don't create too many levels</li>
                  <li>• Avoid generic descriptions</li>
                  <li>• Don't use low-quality images</li>
                  <li>• Don't ignore SEO settings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCategoryPage