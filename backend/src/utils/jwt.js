import jwt from 'jsonwebtoken'

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  )
}

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Set cookie with JWT token
export const setTokenCookie = (res, token) => {
  res.cookie('authToken', token, {
    httpOnly: true, // Prevents XSS attacks
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'lax', // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  })
}

// Clear token cookie
export const clearTokenCookie = (res) => {
  res.cookie('authToken', '', {
    httpOnly: true,
    expires: new Date(0)
  })
}
