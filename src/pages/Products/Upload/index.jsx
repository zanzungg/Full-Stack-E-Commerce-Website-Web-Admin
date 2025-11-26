import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CircularProgress } from '@mui/material'
import { MdInventory } from 'react-icons/md'
import { FaSave, FaTimes } from 'react-icons/fa'

// Import Reusable Components
import PageHeader from '../../../components/PageHeader'
import FormSection from '../../../components/FormSection'
import FormInput from '../../../components/FormInput'
import FormSelect from '../../../components/FormSelect'
import FormCheckbox from '../../../components/FormCheckbox'
import MultiSelectButtons from '../../../components/MultiSelectButtons'
import ImageUploader from '../../../components/ImageUploader'
import UploadProgress from '../../../components/UploadProgress'

const ProductUploadPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [imagePreview, setImagePreview] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subCategory: '',
    brand: '',
    price: '',
    oldPrice: '',
    stock: '',
    sku: '',
    weight: '',
    dimensions: '',
    colors: [],
    sizes: [],
    tags: '',
    images: [],
    featured: false,
    status: 'draft'
  })
  const [errors, setErrors] = useState({})

  // Categories & Sub Categories
  const categories = {
    Electronics: ['Audio', 'Cameras', 'Computers', 'Mobile', 'Wearables', 'Gaming', 'Peripherals', 'Displays'],
    Accessories: ['Phone', 'Laptop', 'Bags', 'Cables', 'Office', 'Chargers'],
    Fashion: ['Men', 'Women', 'Kids', 'Shoes', 'Jewelry'],
    Home: ['Kitchen', 'Bedroom', 'Living Room', 'Bathroom', 'Garden'],
    Sports: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports']
  }

  // Available colors & sizes
  const availableColors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Orange', 'Gray']
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  // Category options for select
  const categoryOptions = Object.keys(categories).map(cat => ({
    value: cat,
    label: cat
  }))

  // Sub category options based on selected category
  const subCategoryOptions = formData.category
    ? categories[formData.category].map(sub => ({
        value: sub,
        label: sub
      }))
    : []

  // Status options
  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
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

  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value
    setFormData(prev => ({
      ...prev,
      category,
      subCategory: ''
    }))
  }

  // Handle color toggle
  const handleColorToggle = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }))
  }

  // Handle size toggle
  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }))
  }

  // Handle image upload
  const handleImageUpload = (files) => {
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(prev => [...prev, {
          file,
          preview: reader.result,
          name: file.name
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  // Remove image
  const handleRemoveImage = (index) => {
    setImagePreview(prev => prev.filter((_, i) => i !== index))
  }

  // Validate form
  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Product name is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.subCategory) newErrors.subCategory = 'Sub category is required'
    if (!formData.brand) newErrors.brand = 'Brand is required'
    if (!formData.price) newErrors.price = 'Price is required'
    if (!formData.stock) newErrors.stock = 'Stock quantity is required'
    if (!formData.sku) newErrors.sku = 'SKU is required'
    if (imagePreview.length === 0) newErrors.images = 'At least one image is required'
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
      navigate('/products')
    }, 2500)
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <PageHeader
        icon={MdInventory}
        title="Add New Product"
        subtitle="Create a new product and add it to your inventory"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <FormSection title="Basic Information">
              <div className="space-y-4">
                <FormInput
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                  error={errors.name}
                />

                <FormInput
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  type="textarea"
                  placeholder="Enter product description"
                  rows="5"
                  required
                  error={errors.description}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelect
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    options={categoryOptions}
                    placeholder="Select category"
                    required
                    error={errors.category}
                  />

                  <FormSelect
                    label="Sub Category"
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    options={subCategoryOptions}
                    placeholder="Select sub category"
                    disabled={!formData.category}
                    required
                    error={errors.subCategory}
                  />
                </div>

                <FormInput
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter brand name"
                  required
                  error={errors.brand}
                />
              </div>
            </FormSection>

            {/* Pricing & Inventory */}
            <FormSection title="Pricing & Inventory">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  prefix="$"
                  required
                  error={errors.price}
                />

                <FormInput
                  label="Old Price (Optional)"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  prefix="$"
                />

                <FormInput
                  label="Stock Quantity"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                  min="0"
                  required
                  error={errors.stock}
                />

                <FormInput
                  label="SKU"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="PRD-001"
                  required
                  error={errors.sku}
                />
              </div>
            </FormSection>

            {/* Product Variants */}
            <FormSection title="Product Variants">
              <div className="space-y-4">
                <MultiSelectButtons
                  label="Available Colors"
                  options={availableColors}
                  selected={formData.colors}
                  onToggle={handleColorToggle}
                />

                <MultiSelectButtons
                  label="Available Sizes"
                  options={availableSizes}
                  selected={formData.sizes}
                  onToggle={handleSizeToggle}
                />
              </div>
            </FormSection>

            {/* Additional Details */}
            <FormSection title="Additional Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Weight (kg)"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  type="number"
                  placeholder="0.0"
                  step="0.1"
                />

                <FormInput
                  label="Dimensions (L x W x H)"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="10 x 5 x 3 cm"
                />
              </div>

              <div className="mt-4">
                <FormInput
                  label="Tags (comma separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="wireless, bluetooth, audio"
                />
              </div>
            </FormSection>
          </div>

          {/* Right Column - Images & Settings */}
          <div className="space-y-6">
            {/* Product Images */}
            <FormSection>
              <ImageUploader
                label="Product Images"
                images={imagePreview}
                onUpload={handleImageUpload}
                onRemove={handleRemoveImage}
                maxImages={5}
                required
                error={errors.images}
              />
            </FormSection>

            {/* Product Status */}
            <FormSection title="Product Status">
              <div className="space-y-4">
                <FormSelect
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={statusOptions}
                />

                <FormCheckbox
                  label="Mark as Featured Product"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  description="Featured products will be displayed on homepage"
                />
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
                {loading ? 'Uploading...' : 'Save Product'}
              </Button>

              {loading && (
                <UploadProgress 
                  progress={uploadProgress}
                  text="Uploading..."
                  color="blue"
                />
              )}

              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={() => navigate('/products')}
                disabled={loading}
                className="border-gray-300! text-gray-700! hover:bg-gray-50! rounded-xl! py-3.5! font-bold! text-base! capitalize!"
                startIcon={<FaTimes />}
              >
                Cancel
              </Button>
            </FormSection>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProductUploadPage