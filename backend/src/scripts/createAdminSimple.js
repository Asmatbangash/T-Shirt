import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Users } from '../models/user.model.js'

dotenv.config({ path: './.env' })

// Default admin credentials - CHANGE THESE!
const ADMIN_DATA = {
  fullName: 'Admin User',
  email: 'admin@threadify.com',
  password: 'admin123456'
}

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB\n')

    console.log('=== Creating Admin User ===\n')

    // Check if admin already exists
    const existingUser = await Users.findOne({ Email: ADMIN_DATA.email.toLowerCase() })
    
    if (existingUser) {
      if (existingUser.role === 'admin') {
        console.log('✅ Admin user already exists!')
        console.log(`\nAdmin Details:`)
        console.log(`Name: ${existingUser.FullName}`)
        console.log(`Email: ${existingUser.Email}`)
        console.log(`Role: ${existingUser.role}`)
      } else {
        // Update existing user to admin
        existingUser.role = 'admin'
        await existingUser.save()
        console.log('✅ Existing user updated to admin!')
        console.log(`\nAdmin Details:`)
        console.log(`Name: ${existingUser.FullName}`)
        console.log(`Email: ${existingUser.Email}`)
        console.log(`Role: ${existingUser.role}`)
      }
      process.exit(0)
    }

    // Hash password
    const saltRounds = 10
    const hashPassword = await bcrypt.hash(ADMIN_DATA.password, saltRounds)

    // Create admin user
    const admin = await Users.create({
      FullName: ADMIN_DATA.fullName,
      Email: ADMIN_DATA.email.toLowerCase(),
      Password: hashPassword,
      role: 'admin'
    })

    console.log('✅ Admin user created successfully!')
    console.log(`\nAdmin Credentials:`)
    console.log(`Name: ${admin.FullName}`)
    console.log(`Email: ${admin.Email}`)
    console.log(`Password: ${ADMIN_DATA.password}`)
    console.log(`Role: ${admin.role}`)
    console.log(`\n⚠️  IMPORTANT: Change the password after first login!`)

    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message)
    process.exit(1)
  }
}

createAdmin()
