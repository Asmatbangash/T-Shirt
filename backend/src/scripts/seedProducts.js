import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { Product } from '../models/product.model.js'

dotenv.config({ path: './.env' })

const products = [
    {
        name: 'Midnight Black Premium Tee',
        description: 'Our signature premium cotton tee in midnight black. Crafted from 100% organic cotton with a modern fit that drapes perfectly. Pre-shrunk and designed to last.',
        price: 29.99,
        image: '/images/MidnightBlackTee.webp',
        images: ['/images/MidnightBlackTee.webp', '/images/MidnightBlackTee.webp', '/images/MidnightBlackTee.webp'],
        category: 'premium',
        colors: ['#000000', '#FFFFFF', '#9CA3AF'],
        stock: 100,
        tag: 'Bestseller',
        rating: 4.8,
        reviews: 124,
        featured: true
    },
    {
        name: 'Pure White Essential',
        description: 'Classic white tee that goes with everything. Premium cotton blend for ultimate comfort.',
        price: 24.99,
        image: '/images/PureWhiteEssential.webp',
        images: ['/images/PureWhiteEssential.webp', '/images/PureWhiteEssential.webp'],
        category: 'classic',
        colors: ['#FFFFFF', '#000000'],
        stock: 150,
        tag: 'New',
        rating: 4.9,
        reviews: 89,
        featured: true
    },
    {
        name: 'Ocean Blue Classic',
        description: 'Vibrant ocean blue for those who stand out. Fade-resistant dye and soft fabric.',
        price: 27.99,
        image: '/images/OceanBlueClassic.webp',
        images: ['/images/OceanBlueClassic.webp'],
        category: 'classic',
        colors: ['#3B82F6', '#000000'],
        stock: 80,
        rating: 4.7,
        reviews: 56,
        featured: true
    },
    {
        name: 'Sunset Orange',
        description: 'Bold sunset orange for the adventurous. Limited edition color.',
        price: 29.99,
        image: '/images/SunsetOrange.webp',
        images: ['/images/SunsetOrange.webp'],
        category: 'premium',
        colors: ['#F97316'],
        stock: 50,
        tag: 'Limited',
        rating: 4.6,
        reviews: 34,
        featured: true
    },
    {
        name: 'Forest Green',
        description: 'Deep forest green with earthy vibes. Eco-friendly organic cotton.',
        price: 26.99,
        image: '/images/ForestGreen.webp',
        images: ['/images/ForestGreen.webp', '/images/MidnightBlackTee.webp', '/images/OceanBlueClassic.webp'],
        category: 'oversized',
        colors: ['#10B981'],
        stock: 90,
        rating: 4.8,
        reviews: 67,
        featured: false
    },
    {
        name: 'Charcoal Gray',
        description: 'Versatile charcoal gray for everyday wear. Soft and comfortable.',
        price: 25.99,
        image: '/images/CharcoalGray.webp',
        images: ['/images/CharcoalGray.webp', '/images/MidnightBlackTee.webp', '/images/OceanBlueClassic.webp'],
        category: 'minimal',
        colors: ['#6B7280'],
        stock: 120,
        rating: 4.7,
        reviews: 92,
        featured: false
    },
    {
        name: 'Navy Blue Premium',
        description: 'Classic navy blue with premium finish. Perfect for any occasion.',
        price: 31.99,
        image: '/images/NavyBluePremium.webp',
        images: ['/images/NavyBluePremium.webp', '/images/MidnightBlackTee.webp', '/images/SunsetOrange.webp'],
        category: 'premium',
        colors: ['#1E3A8A'],
        stock: 75,
        rating: 4.9,
        reviews: 145,
        featured: false
    },
    {
        name: 'Crimson Red',
        description: 'Bold crimson red that makes a statement. High-quality print retention.',
        price: 28.99,
        image: '/images/CrimsonRed.webp',
        images: ['/images/CrimsonRed.webp', '/images/SunsetOrange.webp', '/images/MidnightBlackTee.webp'],
        category: 'custom',
        colors: ['#DC2626'],
        stock: 60,
        tag: 'Hot',
        rating: 4.5,
        reviews: 78,
        featured: false
    }
]

const seedProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')

        // Clear existing products
        await Product.deleteMany({})
        console.log('Cleared existing products')

        // Insert new products
        await Product.insertMany(products)
        console.log('Successfully seeded products')

        process.exit(0)
    } catch (error) {
        console.error('Error seeding products:', error)
        process.exit(1)
    }
}

seedProducts()
