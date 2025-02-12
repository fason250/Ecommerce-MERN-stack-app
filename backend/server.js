import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"


dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// database and cloudinary storage
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())



// user Api endpoints
app.use('/api/v1/user', userRouter)
// product Api endpoints
app.use('/api/v1/products/',productRouter)

// endpoints

app.get("/",(request,response) =>{
    response.send("Now is time")
})





app.listen(PORT , ()=>{
    console.log(`server is listening to port ${PORT}`)
})