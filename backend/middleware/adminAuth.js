import jwt from "jsonwebtoken"



//authenticating admin ops
const adminAuth = async(request, response,next) =>{
    try {
        const { token } = request.headers
        if(!token) return response.json({success: false, msg: "Not authorized "})
        
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        console.log(tokenDecode);
        
        if(tokenDecode.userId !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return response.json({success: false, msg: "Un Authorized"})
        }
        next()
    } catch (error) {
        console.log(error)
        response.json({success: false,msg: error.message})
        
    }
}

export default adminAuth