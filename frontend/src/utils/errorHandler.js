/**
 * Error Handler Utility
 * Provides consistent error handling across the application
 */

/**
 * Check if error is an authentication error (401)
 * These are expected when user is not logged in
 */
export const isAuthError = (error) => {
  return error?.status === 401 || 
         error?.message?.includes('401') || 
         error?.message?.includes('Unauthorized') ||
         error?.message?.includes('Authentication required')
}

/**
 * Check if error is a cart error when not authenticated
 * These happen when cart API is called without login
 */
export const isCartAuthError = (error) => {
  return (error?.status === 500 || error?.status === 401) && 
         error?.message?.includes('cart')
}

/**
 * Check if error should be logged to console
 * Suppresses expected errors like 401 when not logged in
 */
export const shouldLogError = (error) => {
  // Don't log auth errors - they're expected when not logged in
  if (isAuthError(error)) {
    return false
  }
  
  // Don't log cart errors when not authenticated
  if (isCartAuthError(error)) {
    return false
  }
  
  return true
}

/**
 * Handle API errors consistently
 */
export const handleApiError = (error, context = '') => {
  if (shouldLogError(error)) {
    console.error(`${context} error:`, error.message || error)
  }
  
  return {
    success: false,
    message: error.message || 'An unexpected error occurred',
    status: error.status || 500
  }
}

/**
 * Get user-friendly error message
 */
export const getUserErrorMessage = (error) => {
  if (isAuthError(error)) {
    return 'Please log in to continue'
  }
  
  if (error.status === 403) {
    return 'You do not have permission to perform this action'
  }
  
  if (error.status === 404) {
    return 'The requested resource was not found'
  }
  
  if (error.status >= 500) {
    return 'Server error. Please try again later'
  }
  
  return error.message || 'Something went wrong'
}
