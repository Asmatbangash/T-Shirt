import express from 'express'
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    getProductsByCategory
} from '../controllers/product.controllers.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/admin.middleware.js'

const router = express.Router()

// Public routes
router.get('/', getAllProducts)
router.get('/featured', getFeaturedProducts)
router.get('/category/:category', getProductsByCategory)
router.get('/:id', getProductById)

// Protected routes (Admin only)
router.post('/', authenticate, isAdmin, createProduct)
router.put('/:id', authenticate, isAdmin, updateProduct)
router.delete('/:id', authenticate, isAdmin, deleteProduct)

export default router
