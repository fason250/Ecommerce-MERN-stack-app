import multer from "multer"


//storage config

const storage = multer.diskStorage({
    filename: (req,file,cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


const upload = multer({ storage })

export default upload