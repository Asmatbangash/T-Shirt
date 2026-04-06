export const isAdmin = (req, res, next) => {
  try {
    // User is already attached by authenticate middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      })
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      })
    }

    next()
  } catch (error) {
    console.error('Admin check error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error checking admin privileges',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
