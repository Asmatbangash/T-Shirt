import cloudinary, { deleteImage } from '../config/cloudinary.config.js'

// Upload single image
export const uploadImage = async (req, res) => {
    try {
        console.log('Upload request received')
        console.log('File:', req.file ? 'Present' : 'Missing')
        
        if (!req.file) {
            console.log('No file in request')
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            })
        }

        console.log('File uploaded successfully:', req.file.path)

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                url: req.file.path,
                publicId: req.file.filename
            }
        })
    } catch (error) {
        console.error('Upload image error:', error)
        res.status(500).json({
            success: false,
            message: 'Error uploading image',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Upload multiple images
export const uploadMultipleImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No image files provided'
            })
        }

        const uploadedImages = req.files.map(file => ({
            url: file.path,
            publicId: file.filename
        }))

        res.status(200).json({
            success: true,
            message: 'Images uploaded successfully',
            data: uploadedImages
        })
    } catch (error) {
        console.error('Upload multiple images error:', error)
        res.status(500).json({
            success: false,
            message: 'Error uploading images',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Delete image
export const deleteImageController = async (req, res) => {
    try {
        const { publicId } = req.params

        if (!publicId) {
            return res.status(400).json({
                success: false,
                message: 'Public ID is required'
            })
        }

        const result = await deleteImage(publicId)

        if (!result.success) {
            return res.status(500).json({
                success: false,
                message: 'Error deleting image'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        })
    } catch (error) {
        console.error('Delete image error:', error)
        res.status(500).json({
            success: false,
            message: 'Error deleting image',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}
