import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        required: true,
        enum: ['oversized', 'minimal', 'custom', 'classic', 'premium']
    },
    colors: {
        type: [String],
        default: []
    },
    sizes: {
        type: [String],
        default: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    tag: {
        type: String,
        enum: ['', 'Bestseller', 'New', 'Limited', 'Hot', 'Sale'],
        default: ''
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

// Index for search and filtering
productSchema.index({ name: 'text', description: 'text' })
productSchema.index({ category: 1, active: 1 })
productSchema.index({ featured: 1, active: 1 })

export const Product = mongoose.model("Product", productSchema)
