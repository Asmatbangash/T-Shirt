// Check if user is admin
export const isAdmin = (user) => {
  return user && user.role === 'admin'
}

// Check if user is authenticated
export const isAuthenticated = (user) => {
  return user !== null
}
