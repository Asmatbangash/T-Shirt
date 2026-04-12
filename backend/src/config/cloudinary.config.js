import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

// Ensure environment variables are loaded
dotenv.config({ path: './.env' })

// Configure Cloudinary with explicit values and timeout
const cloudinaryConfig = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    timeout: 60000 // 60 seconds timeout
}

console.log('Cloudinary Config:', {
    cloud_name: cloudinaryConfig.cloud_name,
    api_key: cloudinaryConfig.api_key ? '***' + cloudinaryConfig.api_key.slice(-4) : 'NOT SET',
    api_secret: cloudinaryConfig.api_secret ? '***' + cloudinaryConfig.api_secret.slice(-4) : 'NOT SET',
    timeout: cloudinaryConfig.timeout + 'ms'
})

cloudinary.config(cloudinaryConfig)

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'threadify-products',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
            public_id: `product_${Date.now()}`,
            transformation: [
                { width: 1000, height: 1000, crop: 'limit' },
                { quality: 'auto' }
            ]
        }
    }
})

// Create multer upload middleware
export const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        console.log('File filter - mimetype:', file.mimetype)
        console.log('File filter - originalname:', file.originalname)
        
        // Accept images only
        if (!file.mimetype.startsWith('image/')) {
            cb(new Error('Only image files are allowed!'), false)
            return
        }
        cb(null, true)
    }
})

// Helper function to delete image from Cloudinary
export const deleteImage = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId)
        return { success: true }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error)
        return { success: false, error }
    }
}

export default cloudinary
