import bcrypt from "bcrypt"

// hashing password

const hashPassword = async(password) =>{
    const saltRounds = 10
    return await bcrypt.hash(password,saltRounds)
}


//verify password 

const verifyPassword = async(password,hashedPassword) => {
    return await bcrypt.compare(password,hashedPassword)
}

export { hashPassword, verifyPassword}