import jwt from 'jsonwebtoken'


const createToken = (userId) =>{
    return jwt.sign({userId},process.env.JWT_SECRET)
}

export { createToken}