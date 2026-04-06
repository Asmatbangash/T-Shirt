import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    FullName : {
        type: String,
        required: true,
    },
    Email:{
        type: String, 
        required: true, 
        unique: true
    },
    Password:{
        type:String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
})

export const Users = mongoose.model("Users", userSchema)