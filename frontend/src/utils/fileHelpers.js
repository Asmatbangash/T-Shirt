/**
 * File Helper Utilities
 * Functions for handling file operations and formatting
 */

/**
 * Format file size in bytes to human-readable format
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted file size (e.g., "2.5 MB")
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Validate file size
 * @param {File} file - File object
 * @param {number} maxSizeMB - Maximum size in MB (default: 5)
 * @returns {object} { valid: boolean, message: string }
 */
export const validateFileSize = (file, maxSizeMB = 5) => {
  const maxBytes = maxSizeMB * 1024 * 1024
  
  if (file.size > maxBytes) {
    return {
      valid: false,
      message: `File size is ${formatFileSize(file.size)}. Maximum allowed is ${maxSizeMB}MB.`
    }
  }
  
  return {
    valid: true,
    message: `File size: ${formatFileSize(file.size)}`
  }
}

/**
 * Validate file type
 * @param {File} file - File object
 * @param {string[]} allowedTypes - Array of allowed MIME types
 * @returns {object} { valid: boolean, message: string }
 */
export const validateFileType = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']) => {
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: `File type ${file.type} is not allowed. Please use: ${allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}`
    }
  }
  
  return {
    valid: true,
    message: `File type: ${file.type}`
  }
}

/**
 * Validate image file
 * @param {File} file - File object
 * @param {number} maxSizeMB - Maximum size in MB
 * @returns {object} { valid: boolean, errors: string[] }
 */
export const validateImageFile = (file, maxSizeMB = 5) => {
  const errors = []
  
  // Check file type
  const typeValidation = validateFileType(file)
  if (!typeValidation.valid) {
    errors.push(typeValidation.message)
  }
  
  // Check file size
  const sizeValidation = validateFileSize(file, maxSizeMB)
  if (!sizeValidation.valid) {
    errors.push(sizeValidation.message)
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Get file extension from filename
 * @param {string} filename - File name
 * @returns {string} File extension (e.g., "jpg")
 */
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

/**
 * Check if file is an image
 * @param {File} file - File object
 * @returns {boolean}
 */
export const isImageFile = (file) => {
  return file.type.startsWith('image/')
}

/**
 * Compress image file (client-side)
 * @param {File} file - Image file
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @param {number} quality - Quality (0-1)
 * @returns {Promise<Blob>} Compressed image blob
 */
export const compressImage = (file, maxWidth = 1000, maxHeight = 1000, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        // Calculate new dimensions
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }
        
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          file.type,
          quality
        )
      }
      
      img.onerror = reject
    }
    
    reader.onerror = reject
  })
}
