import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config({ path: './.env' })

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

console.log('Testing Cloudinary Configuration...')
console.log('Cloud Name:', process.env.CLOUD_NAME)
console.log('API Key:', process.env.CLOUD_API_KEY ? '***' + process.env.CLOUD_API_KEY.slice(-4) : 'NOT SET')
console.log('API Secret:', process.env.CLOUD_API_SECRET ? '***' + process.env.CLOUD_API_SECRET.slice(-4) : 'NOT SET')

// Test connection
cloudinary.api.ping()
    .then(result => {
        console.log('\n✅ Cloudinary connection successful!')
        console.log('Response:', result)
    })
    .catch(error => {
        console.log('\n❌ Cloudinary connection failed!')
        console.error('Error:', error.message)
    })
