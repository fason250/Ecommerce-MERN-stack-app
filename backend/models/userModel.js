import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        lowercase:true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    cartItems: {
        type: [
            {
                itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
                size: { type: String, required: true },
                quantity: { type: Number, min: 1, default: 1}
            }
        ],
        default: []
    }
},{minimize: false,timestamps: true})

const userModel = mongoose.models.User || mongoose.model("User",userSchema)

export default userModel