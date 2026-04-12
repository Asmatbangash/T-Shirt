import express from 'express'
import { upload } from '../config/cloudinary.config.js'
import { 
    uploadImage, 
    uploadMultipleImages, 
    deleteImageController 
} from '../controllers/upload.controllers.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/admin.middleware.js'

const router = express.Router()

// All upload routes require authentication and admin privileges
router.use(authenticate, isAdmin)

// Test endpoint to check if route is working
router.get('/test', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Upload route is working',
        user: req.user.Email 
    })
})

// Upload single image with error handling
router.post('/single', (req, res, next) => {
    console.log('Upload route hit')
    console.log('Content-Type:', req.headers['content-type'])
    
    upload.single('image')(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err)
            
            // Handle specific multer errors
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    success: false,
                    message: 'Image file is too large',
                    error: 'Maximum file size is 5MB. Please compress or resize your image and try again.'
                })
            }
            
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({
                    success: false,
                    message: 'Unexpected file field',
                    error: 'Please use the correct file field name: "image"'
                })
            }
            
            // Handle Cloudinary timeout
            if (err.name === 'TimeoutError' || err.message?.includes('Timeout')) {
                return res.status(408).json({
                    success: false,
                    message: 'Upload timeout',
                    error: 'The upload took too long. Please check your internet connection and try again with a smaller image.'
                })
            }
            
            // Handle Cloudinary errors
            if (err.http_code) {
                return res.status(err.http_code).json({
                    success: false,
                    message: 'Cloudinary upload failed',
                    error: err.message || 'Failed to upload to cloud storage. Please try again.'
                })
            }
            
            return res.status(400).json({
                success: false,
                message: err.message || 'Error uploading file',
                error: process.env.NODE_ENV === 'development' ? err.toString() : 'Please try again with a different image'
            })
        }
        console.log('Multer processed, file:', req.file ? 'present' : 'missing')
        next()
    })
}, uploadImage)

// Upload multiple images with error handling
router.post('/multiple', (req, res, next) => {
    upload.array('images', 5)(req, res, (err) => {
        if (err) {
            console.error('Multer error:', err)
            return res.status(400).json({
                success: false,
                message: err.message || 'Error uploading files',
                error: process.env.NODE_ENV === 'development' ? err.toString() : undefined
            })
        }
        next()
    })
}, uploadMultipleImages)

// Delete image
router.delete('/:publicId', deleteImageController)

export default router
