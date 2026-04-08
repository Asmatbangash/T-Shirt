import { Order } from '../models/order.model.js'
import { Cart } from '../models/cart.model.js'
import { Product } from '../models/product.model.js'
import Stripe from 'stripe'

// Initialize Stripe only if key is provided and valid
let stripe = null
if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('your_stripe_secret_key_here')) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
}

// Create payment intent
export const createPaymentIntent = async (req, res) => {
    try {
        if (!stripe) {
            return res.status(503).json({
                success: false,
                message: 'Payment service not configured. Please add STRIPE_SECRET_KEY to .env file'
            })
        }

        const { amount } = req.body

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid amount is required'
            })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                userId: req.user._id.toString()
            }
        })

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        })
    } catch (error) {
        console.error('Create payment intent error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error creating payment intent',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Create order
export const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentIntentId } = req.body

        if (!shippingAddress || !paymentIntentId) {
            return res.status(400).json({
                success: false,
                message: 'Shipping address and payment intent ID are required'
            })
        }

        // Get user's cart
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            })
        }

        // Verify stock for all items
        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${item.product.name}`
                })
            }
        }

        // Calculate totals
        const subtotal = cart.totalPrice
        const tax = subtotal * 0.08 // 8% tax
        const shipping = subtotal > 50 ? 0 : 9.99
        const total = subtotal + tax + shipping

        // Verify payment if Stripe is configured
        if (stripe) {
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
            
            if (paymentIntent.status !== 'succeeded') {
                return res.status(400).json({
                    success: false,
                    message: 'Payment not completed'
                })
            }
        } else {
            // For development without Stripe, allow orders with mock payment
            console.warn('⚠️  Stripe not configured - allowing order without payment verification')
        }

        // Create order items with product details
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            name: item.product.name,
            image: item.product.image,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            price: item.price
        }))

        // Create order
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            paymentIntentId,
            paymentStatus: 'paid',
            subtotal,
            tax,
            shipping,
            total,
            status: 'processing',
            statusHistory: [{
                status: 'processing',
                note: 'Order placed successfully'
            }]
        })

        // Update product stock
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.product._id,
                { $inc: { stock: -item.quantity } }
            )
        }

        // Clear cart
        cart.items = []
        await cart.save()

        await order.populate('items.product')

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order
        })
    } catch (error) {
        console.error('Create order error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error creating order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Get user's orders
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product')
            .sort('-createdAt')

        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.error('Get orders error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error fetching orders',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params

        const order = await Order.findById(id).populate('items.product')

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        // Check if user owns this order or is admin
        if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Access denied'
            })
        }

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.error('Get order error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error fetching order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query

        const filter = {}
        if (status) filter.status = status

        const skip = (Number(page) - 1) * Number(limit)

        const orders = await Order.find(filter)
            .populate('user', 'FullName Email')
            .populate('items.product')
            .sort('-createdAt')
            .skip(skip)
            .limit(Number(limit))

        const total = await Order.countDocuments(filter)

        res.status(200).json({
            success: true,
            orders,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        })
    } catch (error) {
        console.error('Get all orders error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error fetching orders',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status, trackingNumber, note } = req.body

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        if (status) {
            order.status = status
            order.statusHistory.push({
                status,
                note: note || `Order status updated to ${status}`
            })
        }

        if (trackingNumber) {
            order.trackingNumber = trackingNumber
        }

        await order.save()

        res.status(200).json({
            success: true,
            message: 'Order updated successfully',
            order
        })
    } catch (error) {
        console.error('Update order error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error updating order',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}
