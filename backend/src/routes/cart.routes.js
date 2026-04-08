import express from 'express'
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from '../controllers/cart.controllers.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = express.Router()

// All cart routes require authentication
router.use(authenticate)

router.get('/', getCart)
router.post('/add', addToCart)
router.put('/update', updateCartItem)
router.delete('/remove', removeFromCart)
router.delete('/clear', clearCart)

export default router
