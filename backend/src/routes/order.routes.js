import express from 'express'
import {
    createPaymentIntent,
    createOrder,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
} from '../controllers/order.controllers.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/admin.middleware.js'

const router = express.Router()

// All order routes require authentication
router.use(authenticate)

// User routes
router.post('/payment-intent', createPaymentIntent)
router.post('/', createOrder)
router.get('/my-orders', getUserOrders)
router.get('/:id', getOrderById)

// Admin routes
router.get('/', isAdmin, getAllOrders)
router.put('/:id/status', isAdmin, updateOrderStatus)

export default router
