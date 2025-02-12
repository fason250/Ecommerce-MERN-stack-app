import mongoose from "mongoose"


//connect to database 

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/ecommerceDB`)

        if(conn){
            console.log(`database connected to ${conn.connection.host}`)
        }else{
            throw new Error("failed to connect to database ")
        }

    } catch (error) {
        console.log(error)
    }

}

export default connectDB