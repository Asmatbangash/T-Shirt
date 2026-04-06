import { verifyToken } from '../utils/jwt.js'
import { Users } from '../models/user.model.js'

export const authenticate = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.authToken

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication required. Please login.' 
      })
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired token. Please login again.' 
      })
    }

    // Get user from database
    const user = await Users.findById(decoded.userId).select('-Password')
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found. Please login again.' 
      })
    }

    // Attach user to request
    req.user = user
    next()

  } catch (error) {
    console.error('Authentication error:', error)
    res.status(401).json({ 
      success: false,
      message: 'Authentication failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
