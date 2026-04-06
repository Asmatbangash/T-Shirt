import mongoose from 'mongoose'

export async function dbConnection() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("database connected successfully")
    } catch (error) {
        console.log(error)
    }
}