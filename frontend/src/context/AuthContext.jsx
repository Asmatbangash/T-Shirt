import { createContext, useContext, useState, useEffect } from 'react'
import { userAPI } from '@/services/api'
import { shouldLogError } from '@/utils/errorHandler'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await userAPI.getCurrentUser()
        if (response.success) {
          setUser(response.user)
        }
      } catch (error) {
        // Only log unexpected errors (not 401 when user isn't logged in)
        if (shouldLogError(error)) {
          console.error('Auth check error:', error.message)
        }
        // User stays null - this is expected when not logged in
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      await userAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  const updateUser = (userData) => {
    setUser(userData)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
