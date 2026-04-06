import express from 'express'
import { 
    register, 
    login,
    logout,
    getCurrentUser,
    getUserProfile, 
    updateUserProfile, 
    changePassword, 
    deleteUser 
} from '../controllers/user.controllers.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = express.Router()

// Public routes
router.post('/register', register)
router.post('/login', login)

// Protected routes (require authentication)
router.post('/logout', authenticate, logout)
router.get('/me', authenticate, getCurrentUser)
router.get('/:userId', getUserProfile)
router.put('/profile', authenticate, updateUserProfile)
router.put('/password', authenticate, changePassword)
router.delete('/account', authenticate, deleteUser)

export default router
