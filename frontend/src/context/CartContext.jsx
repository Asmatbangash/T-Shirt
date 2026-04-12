import { createContext, useContext, useState, useEffect } from 'react'
import { cartAPI } from '@/services/api'
import { useAuth } from './AuthContext'
import { shouldLogError } from '@/utils/errorHandler'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user, loading: authLoading } = useAuth()

  // Fetch cart when user logs in
  useEffect(() => {
    // Wait for auth to finish loading
    if (authLoading) {
      return
    }

    if (user) {
      fetchCart()
    } else {
      setCart(null)
      setLoading(false)
    }
  }, [user, authLoading])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await cartAPI.getCart()
      if (response.success) {
        setCart(response.cart)
      }
    } catch (error) {
      // Only log unexpected errors
      if (shouldLogError(error)) {
        console.error('Error fetching cart:', error)
      }
      // Set cart to null on error
      setCart(null)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity, size, color = '') => {
    try {
      const response = await cartAPI.addToCart(productId, quantity, size, color)
      if (response.success) {
        setCart(response.cart)
        return true
      }
      return false
    } catch (error) {
      console.error('Error adding to cart:', error)
      throw error
    }
  }

  const updateCartItem = async (productId, size, color, quantity) => {
    try {
      const response = await cartAPI.updateCartItem(productId, size, color, quantity)
      if (response.success) {
        setCart(response.cart)
        return true
      }
      return false
    } catch (error) {
      console.error('Error updating cart:', error)
      throw error
    }
  }

  const removeFromCart = async (productId, size, color = '') => {
    try {
      const response = await cartAPI.removeFromCart(productId, size, color)
      if (response.success) {
        setCart(response.cart)
        return true
      }
      return false
    } catch (error) {
      console.error('Error removing from cart:', error)
      throw error
    }
  }

  const clearCart = async () => {
    try {
      const response = await cartAPI.clearCart()
      if (response.success) {
        setCart(response.cart)
        return true
      }
      return false
    } catch (error) {
      console.error('Error clearing cart:', error)
      throw error
    }
  }

  const getCartItemCount = () => {
    return cart?.totalItems || 0
  }

  const getCartTotal = () => {
    return cart?.totalPrice || 0
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart,
        getCartItemCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
