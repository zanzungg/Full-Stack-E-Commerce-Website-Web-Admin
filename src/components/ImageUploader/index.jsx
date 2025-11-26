import React from 'react'
import { MdCloudUpload, MdClose } from 'react-icons/md'

const ImageUploader = ({ 
  images = [],
  onUpload,
  onRemove,
  maxImages = 5,
  error,
  required = false,
  accept = "image/*",
  label = "Upload Images"
}) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    
    if (files.length + images.length > maxImages) {
      alert(`You can only upload maximum ${maxImages} images`)
      return
    }
    
    onUpload(files)
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {label} {required && <span className="text-red-500">*</span>}
      </h3>
      
      {/* Upload Area */}
      <div className="mb-4">
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <MdCloudUpload className="w-12 h-12 text-gray-400 mb-3" />
            <p className="mb-2 text-sm text-gray-700 font-semibold">
              <span className="text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG or JPEG (MAX. {maxImages} images)
            </p>
          </div>
          <input
            type="file"
            multiple
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-700">
            Uploaded Images ({images.length}/{maxImages})
          </p>
          <div className="grid grid-cols-2 gap-3">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img.preview || img}
                  alt={img.name || `Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <MdClose className="w-4 h-4" />
                </button>
                {img.name && (
                  <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    {img.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUploader