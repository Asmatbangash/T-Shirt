import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true
    }
}, { _id: false })

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    totalItems: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

// Calculate totals before saving
cartSchema.pre('save', function(next) {
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0)
    this.totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    next()
})

export const Cart = mongoose.model("Cart", cartSchema)
