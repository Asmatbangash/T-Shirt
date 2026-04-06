import { Users } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import { generateToken, setTokenCookie, clearTokenCookie } from '../utils/jwt.js'

// Register new user
export const register = async (req, res) => {
    try {
        const { FullName, Email, Password } = req.body
        
        // Validate required fields
        if (!FullName || !Email || !Password) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required" 
            })
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(Email)) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid email format" 
            })
        }

        // Validate password strength (min 6 characters)
        if (Password.length < 6) {
            return res.status(400).json({ 
                success: false,
                message: "Password must be at least 6 characters long" 
            })
        }

        // Check if user already exists
        const existingUser = await Users.findOne({ Email: Email.toLowerCase() })
        if (existingUser) {
            return res.status(409).json({ 
                success: false,
                message: "User already exists, please login" 
            })
        }

        // Hash password with salt rounds
        const saltRounds = 10
        const hashPassword = await bcrypt.hash(Password, saltRounds)
      
        // Create new user
        const user = await Users.create({
            FullName: FullName.trim(),
            Email: Email.toLowerCase().trim(),
            Password: hashPassword
        })

        // Generate JWT token
        const token = generateToken(user._id)
        
        // Set token in HTTP-only cookie
        setTokenCookie(res, token)

        // Remove password from response
        const userResponse = {
            _id: user._id,
            FullName: user.FullName,
            Email: user.Email,
            role: user.role || 'user'
        }

        res.status(201).json({ 
            success: true,
            message: "User registered successfully", 
            user: userResponse 
        })

    } catch (error) {
        console.error("Registration error:", error)
        res.status(500).json({ 
            success: false,
            message: "Server error during registration",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { Email, Password } = req.body

        // Validate required fields
        if (!Email || !Password) {
            return res.status(400).json({ 
                success: false,
                message: "Email and password are required" 
            })
        }

        // Find user by email
        const user = await Users.findOne({ Email: Email.toLowerCase() })
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid email or password" 
            })
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(Password, user.Password)
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid email or password" 
            })
        }

        // Generate JWT token
        const token = generateToken(user._id)
        
        // Set token in HTTP-only cookie
        setTokenCookie(res, token)

        // Remove password from response
        const userResponse = {
            _id: user._id,
            FullName: user.FullName,
            Email: user.Email,
            role: user.role || 'user'
        }

        res.status(200).json({ 
            success: true,
            message: "Login successful", 
            user: userResponse 
        })

    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({ 
            success: false,
            message: "Server error during login",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Logout user
export const logout = async (req, res) => {
    try {
        // Clear token cookie
        clearTokenCookie(res)

        res.status(200).json({ 
            success: true,
            message: "Logout successful" 
        })

    } catch (error) {
        console.error("Logout error:", error)
        res.status(500).json({ 
            success: false,
            message: "Server error during logout",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Get current user (from token)
export const getCurrentUser = async (req, res) => {
    try {
        // User is already attached by auth middleware
        res.status(200).json({ 
            success: true,
            user: req.user 
        })

    } catch (error) {
        console.error("Get current user error:", error)
        res.status(500).json({ 
            success: false,
            message: "Server error fetching user",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params

        const user = await Users.findById(userId).select('-Password')
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            })
        }

        res.status(200).json({ 
            success: true,
            user 
        })

    } catch (error) {
        console.error("Get profile error:", error)
        res.status(500).json({ 
            success: false,
            message: "Server error fetching user profile",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id // Get from authenticated user
        const { FullName, Email } = req.body

        // Validate at least one field to update
        if (!FullName && !Email) {
            return res.status(400).json({ 
                success: false,
                message: "At least one field is required to update" 
            })
        }

        // Validate email format if provided
        if (Email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(Email)) {
                return res.status(400).json({ 
                    success: false,
                    message: "Invalid email format" 
                })
            }

            // Check if email already exists for another user
            const existingUser = await Users.findOne({ 
                Email: Email.toLowerCase(), 
                _id: { $ne: userId } 
            })
            if (existingUser) {
                return res.status(409).json({ 
                    success: false,
                    message: "Email already in use" 
                })
            }
        }

        // Update user
        const updateData = {}
        if (FullName) updateData.FullName = FullName.trim()
        if (Email) updateData.Email = Email.toLowerCase().trim()

        const user = await Users.findByIdAndUpdate(
            userId, 
            updateData, 
            { new: true, runValidators: true }
        ).select('-Password')

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            })
        }

        res.status(200).json({ 
            success: true,
            message: "Profile updated successfully", 
            user 
        })

    } catch (error) {
        console.error("Update profile error:", error)
        res.status(500).json({ 
            success: false,
            message: "Server error updating profile",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Change password
export const changePassword = async (req, res) => {
    try {
        const userId = req.user._id // Get from authenticated user
        const { currentPassword, newPassword } = req.body

        // Validate required fields
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ 
                success: false,
                message: "Current password and new password are required" 
            })
        }

        // Validate new password strength
        if (newPassword.length < 6) {
            return res.status(400).json({ 
                success: false,
                message: "New password must be at least 6 characters long" 
            })
        }

        // Find user
        const user = await Users.findById(userId)
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            })
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.Password)
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: "Current password is incorrect" 
            })
        }

        // Hash new password
        const saltRounds = 10
        const hashPassword = await bcrypt.hash(newPassword, saltRounds)

        // Update password
        user.Password = hashPassword
        await user.save()

        res.status(200).json({ 
            success: true,
            message: "Password changed successfully" 
        })

    } catch (error) {
        console.error("Change password error:", error)
        res.status(500).json({ 
            success: false,
            message: "Server error changing password",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

// Delete user account
export const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id // Get from authenticated user

        const user = await Users.findByIdAndDelete(userId)
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            })
        }

        // Clear token cookie
        clearTokenCookie(res)

        res.status(200).json({ 
            success: true,
            message: "User account deleted successfully" 
        })

    } catch (error) {
        console.error("Delete user error:", error)
        res.status(500).json({ 
            success: false,
            message: "Server error deleting user",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}