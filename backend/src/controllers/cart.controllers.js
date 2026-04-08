import { Cart } from '../models/cart.model.js'
import { Product } from '../models/product.model.js'

// Get user's cart
export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product')

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] })
        }

        res.status(200).json({
            success: true,
            cart
        })
    } catch (error) {
        console.error('Get cart error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error fetching cart',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity, size, color } = req.body

        if (!productId || !quantity || !size) {
            return res.status(400).json({
                success: false,
                message: 'Product ID, quantity, and size are required'
            })
        }

        // Verify product exists
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            })
        }

        let cart = await Cart.findOne({ user: req.user._id })

        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] })
        }

        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId && 
                    item.size === size && 
                    item.color === color
        )

        if (existingItemIndex > -1) {
            // Update quantity
            cart.items[existingItemIndex].quantity += quantity
        } else {
            // Add new item
            cart.items.push({
                product: productId,
                quantity,
                size,
                color: color || '',
                price: product.price
            })
        }

        await cart.save()
        await cart.populate('items.product')

        res.status(200).json({
            success: true,
            message: 'Item added to cart',
            cart
        })
    } catch (error) {
        console.error('Add to cart error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error adding to cart',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Update cart item quantity
export const updateCartItem = async (req, res) => {
    try {
        const { productId, size, color, quantity } = req.body

        if (!productId || !size || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Product ID, size, and quantity are required'
            })
        }

        const cart = await Cart.findOne({ user: req.user._id })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId && 
                    item.size === size && 
                    item.color === (color || '')
        )

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            })
        }

        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1)
        } else {
            cart.items[itemIndex].quantity = quantity
        }

        await cart.save()
        await cart.populate('items.product')

        res.status(200).json({
            success: true,
            message: 'Cart updated',
            cart
        })
    } catch (error) {
        console.error('Update cart error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error updating cart',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const { productId, size, color } = req.body

        const cart = await Cart.findOne({ user: req.user._id })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        cart.items = cart.items.filter(
            item => !(item.product.toString() === productId && 
                     item.size === size && 
                     item.color === (color || ''))
        )

        await cart.save()
        await cart.populate('items.product')

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            cart
        })
    } catch (error) {
        console.error('Remove from cart error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error removing from cart',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        cart.items = []
        await cart.save()

        res.status(200).json({
            success: true,
            message: 'Cart cleared',
            cart
        })
    } catch (error) {
        console.error('Clear cart error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error clearing cart',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}
