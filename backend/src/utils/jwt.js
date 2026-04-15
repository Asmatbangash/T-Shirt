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
  const isProduction = process.env.NODE_ENV === 'production'
  
  res.cookie('authToken', token, {
    httpOnly: true, // Prevents XSS attacks
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? 'none' : 'lax', // 'none' required for cross-domain in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    domain: isProduction ? undefined : undefined // Let browser handle domain
  })
}

// Clear token cookie
export const clearTokenCookie = (res) => {
  const isProduction = process.env.NODE_ENV === 'production'
  
  res.cookie('authToken', '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    expires: new Date(0)
  })
}
