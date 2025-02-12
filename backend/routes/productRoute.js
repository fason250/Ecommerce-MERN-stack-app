import express from "express"
import { addProduct, allProducts, removeProduct, singleProduct } from "../controllers/productController.js"
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"

const productRouter = express.Router()


productRouter.get("/allProducts", allProducts)
productRouter.get("/product/:productId", singleProduct)
productRouter.post('/addProduct',adminAuth, upload.fields([
    {name: 'image1', maxCount: 1},
    {name: 'image2', maxCount: 1},
    {name: 'image3', maxCount: 1},
    {name: 'image4', maxCount: 1},
]), addProduct)
productRouter.delete("/deleteProduct/:productId",adminAuth, removeProduct)


export default productRouter