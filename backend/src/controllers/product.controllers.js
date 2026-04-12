import { Product } from '../models/product.model.js'

// Get all products with filtering and pagination
export const getAllProducts = async (req, res) => {
    try {
        const { 
            category, 
            minPrice, 
            maxPrice, 
            search, 
            featured,
            sort = '-createdAt',
            page = 1, 
            limit = 12 
        } = req.query

        // Build filter query
        const filter = { active: true }

        if (category) {
            filter.category = category
        }

        if (minPrice || maxPrice) {
            filter.price = {}
            if (minPrice) filter.price.$gte = Number(minPrice)
            if (maxPrice) filter.price.$lte = Number(maxPrice)
        }

        if (featured === 'true') {
            filter.featured = true
        }

        if (search) {
            filter.$text = { $search: search }
        }

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit)

        // Get products
        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(Number(limit))

        // Get total count for pagination
        const total = await Product.countDocuments(filter)

        res.status(200).json({
            success: true,
            products,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        })

    } catch (error) {
        console.error('Get products error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error fetching products',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Get single product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        console.error('Get product error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error fetching product',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Create new product (Admin only)
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            image,
            images,
            category,
            colors,
            sizes,
            stock,
            tag,
            featured
        } = req.body

        // Validate required fields
        if (!name || !description || !price || !image || !category) {
            return res.status(400).json({
                success: false,
                message: 'Name, description, price, image, and category are required'
            })
        }

        // Create product
        const product = await Product.create({
            name,
            description,
            price,
            image,
            images: images || [image],
            category,
            colors: colors || [],
            sizes: sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            stock: stock || 0,
            tag: tag || '',
            featured: featured || false
        })

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        })

    } catch (error) {
        console.error('Create product error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error creating product',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Update product (Admin only)
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        // Remove fields that shouldn't be updated directly
        delete updateData._id
        delete updateData.createdAt
        delete updateData.updatedAt

        const product = await Product.findByIdAndUpdate(
            id,
            updateData,
            { returnDocument: 'after', runValidators: true }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        })

    } catch (error) {
        console.error('Update product error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error updating product',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Delete product (Admin only - soft delete)
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        // Soft delete by setting active to false
        const product = await Product.findByIdAndUpdate(
            id,
            { active: false },
            { returnDocument: 'after' }
        )

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        })

    } catch (error) {
        console.error('Delete product error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error deleting product',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Get featured products
export const getFeaturedProducts = async (req, res) => {
    try {
        const { limit = 8 } = req.query

        const products = await Product.find({ featured: true, active: true })
            .sort('-createdAt')
            .limit(Number(limit))

        res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        console.error('Get featured products error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error fetching featured products',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const { limit = 12 } = req.query

        const products = await Product.find({ category, active: true })
            .sort('-createdAt')
            .limit(Number(limit))

        res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        console.error('Get products by category error:', error)
        res.status(500).json({
            success: false,
            message: 'Server error fetching products',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}
