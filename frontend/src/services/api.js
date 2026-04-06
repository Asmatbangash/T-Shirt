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
      throw new Error(data.message || 'Something went wrong')
    }

    return data
  } catch (error) {
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
