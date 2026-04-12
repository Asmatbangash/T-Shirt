import express from  'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { dbConnection } from './config/db.connection.js'
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import orderRoutes from './routes/order.routes.js'
import uploadRoutes from './routes/upload.routes.js'

dotenv.config({path: './.env'})

const app = express()
const port = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true // Allow cookies to be sent
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Database connection
dbConnection()

// Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Threadify API Server', status: 'running' })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
