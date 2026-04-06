import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Users } from '../models/user.model.js'
import readline from 'readline'

dotenv.config({ path: './.env' })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB\n')

    // Get admin details
    console.log('=== Create Admin User ===\n')
    
    const fullName = await question('Enter Full Name: ')
    const email = await question('Enter Email: ')
    const password = await question('Enter Password (min 6 characters): ')

    // Validate inputs
    if (!fullName || !email || !password) {
      console.error('\n❌ All fields are required!')
      process.exit(1)
    }

    if (password.length < 6) {
      console.error('\n❌ Password must be at least 6 characters!')
      process.exit(1)
    }

    // Check if user already exists
    const existingUser = await Users.findOne({ Email: email.toLowerCase() })
    if (existingUser) {
      console.error('\n❌ User with this email already exists!')
      
      // Ask if they want to make existing user an admin
      const makeAdmin = await question('\nDo you want to make this user an admin? (yes/no): ')
      
      if (makeAdmin.toLowerCase() === 'yes' || makeAdmin.toLowerCase() === 'y') {
        existingUser.role = 'admin'
        await existingUser.save()
        console.log('\n✅ User updated to admin successfully!')
        console.log(`\nAdmin Details:`)
        console.log(`Name: ${existingUser.FullName}`)
        console.log(`Email: ${existingUser.Email}`)
        console.log(`Role: ${existingUser.role}`)
      }
      
      rl.close()
      process.exit(0)
    }

    // Hash password
    const saltRounds = 10
    const hashPassword = await bcrypt.hash(password, saltRounds)

    // Create admin user
    const admin = await Users.create({
      FullName: fullName.trim(),
      Email: email.toLowerCase().trim(),
      Password: hashPassword,
      role: 'admin'
    })

    console.log('\n✅ Admin user created successfully!')
    console.log(`\nAdmin Details:`)
    console.log(`Name: ${admin.FullName}`)
    console.log(`Email: ${admin.Email}`)
    console.log(`Role: ${admin.role}`)
    console.log(`\nYou can now login with these credentials.`)

    rl.close()
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message)
    rl.close()
    process.exit(1)
  }
}

createAdmin()
