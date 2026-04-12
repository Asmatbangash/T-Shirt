const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: 'include', // Important: Send cookies with requests
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      const error = new Error(data.message || 'Something went wrong')
      error.status = response.status
      throw error
    }

    return data
  } catch (error) {
    // Add status code to error if not already present
    if (!error.status && error.message) {
      error.status = 500
    }
    throw error
  }
}

// User API
export const userAPI = {
  register: async (userData) => {
    return apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  },

  login: async (credentials) => {
    return apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  },

  logout: async () => {
    return apiCall('/users/logout', {
      method: 'POST',
    })
  },

  getCurrentUser: async () => {
    return apiCall('/users/me', {
      method: 'GET',
    })
  },

  getProfile: async (userId) => {
    return apiCall(`/users/${userId}`, {
      method: 'GET',
    })
  },

  updateProfile: async (userData) => {
    return apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  },

  changePassword: async (passwordData) => {
    return apiCall('/users/password', {
      method: 'PUT',
      body: JSON.stringify(passwordData),
    })
  },

  deleteAccount: async () => {
    return apiCall('/users/account', {
      method: 'DELETE',
    })
  },
}

// Product API
export const productAPI = {
  getAllProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/products${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
    })
  },

  getProductById: async (id) => {
    return apiCall(`/products/${id}`, {
      method: 'GET',
    })
  },

  getFeaturedProducts: async (limit = 8) => {
    return apiCall(`/products/featured?limit=${limit}`, {
      method: 'GET',
    })
  },

  getProductsByCategory: async (category, limit = 12) => {
    return apiCall(`/products/category/${category}?limit=${limit}`, {
      method: 'GET',
    })
  },

  createProduct: async (productData) => {
    return apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    })
  },

  updateProduct: async (id, productData) => {
    return apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    })
  },

  deleteProduct: async (id) => {
    return apiCall(`/products/${id}`, {
      method: 'DELETE',
    })
  },
}

// Cart API
export const cartAPI = {
  getCart: async () => {
    return apiCall('/cart', {
      method: 'GET',
    })
  },

  addToCart: async (productId, quantity, size, color = '') => {
    return apiCall('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, size, color }),
    })
  },

  updateCartItem: async (productId, size, color, quantity) => {
    return apiCall('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, size, color, quantity }),
    })
  },

  removeFromCart: async (productId, size, color = '') => {
    return apiCall('/cart/remove', {
      method: 'DELETE',
      body: JSON.stringify({ productId, size, color }),
    })
  },

  clearCart: async () => {
    return apiCall('/cart/clear', {
      method: 'DELETE',
    })
  },
}

// Order API
export const orderAPI = {
  createPaymentIntent: async (amount) => {
    return apiCall('/orders/payment-intent', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    })
  },

  createOrder: async (shippingAddress, paymentIntentId) => {
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify({ shippingAddress, paymentIntentId }),
    })
  },

  getUserOrders: async () => {
    return apiCall('/orders/my-orders', {
      method: 'GET',
    })
  },

  getOrderById: async (id) => {
    return apiCall(`/orders/${id}`, {
      method: 'GET',
    })
  },

  getAllOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/orders${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
    })
  },

  updateOrderStatus: async (id, status, trackingNumber, note) => {
    return apiCall(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, trackingNumber, note }),
    })
  },
}



// Upload API
export const uploadAPI = {
  uploadSingleImage: async (file) => {
    try {
      // Client-side validation
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        throw new Error(`Image file is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum size is 5MB.`)
      }

      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${API_BASE_URL}/upload/single`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      // Try to parse as JSON
      let data
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        // If not JSON, it's likely an HTML error page
        const text = await response.text()
        console.error('Non-JSON response:', text.substring(0, 200))
        throw new Error('Server returned an invalid response. Please check server logs.')
      }

      if (!response.ok) {
        // Use the error message from backend if available
        throw new Error(data.error || data.message || 'Failed to upload image')
      }

      return data
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  },

  uploadMultipleImages: async (files) => {
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('images', file)
      })

      const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      let data
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        const text = await response.text()
        console.error('Non-JSON response:', text.substring(0, 200))
        throw new Error('Server returned an invalid response. Please check server logs.')
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload images')
      }

      return data
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  },

  deleteImage: async (publicId) => {
    return apiCall(`/upload/${publicId}`, {
      method: 'DELETE',
    })
  },
}
