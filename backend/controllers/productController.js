import { v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"


//all product
const allProducts = async(request,response) =>{
    try {
        const products = await productModel.find()
        return response.json({success: true, data: products})
        
    } catch (error) {
        console.log(error)
        response.json({success: false, msg: error})
    }
   
}

//add product
const addProduct = async(request,response)=>{
    try {
        const {body:{name, description,category,subCategory,price,sizes,bestSeller}} = request
        const image1 = request.files?.image1 ? request.files.image1[0] : null
        const image2 = request.files?.image2 ? request.files.image2[0] : null
        const image3 = request.files?.image3 ? request.files.image3[0] : null
        const image4 = request.files?.image4 ? request.files.image4[0] : null
        const images = [image1, image2, image3, image4].filter( image => image !== null)

        // store imageUrl or paths from cloudinary 
       const imageUrl = await Promise.allSettled(
        images.map(async(image) => {
            const result = await cloudinary.uploader.upload(image.path, { resource_type: 'image'})
            return result.secure_url
        })
       )
       const imageLinks = imageUrl.filter(images => images.status === "fulfilled").map( image => image.value)
       const parsedSizes = JSON.parse(sizes)
       console.log(parsedSizes)
       console.log(imageLinks)

       const productData = new productModel({
        name,
        description,
        category,
        subCategory,
        price: Number(price),
        bestSeller: bestSeller === "true",
        sizes: parsedSizes,
        image:imageLinks,
       })

        await productData.save()
        
        return response.json({success: true, msg: 'product added successfully'})        

    } catch (error) {
        console.log(error)
        response.json({success: false})
    }
}

//single product details
const singleProduct = async(request, response) =>{
    try {
        const { productId } = request.params
        if(!productId) return response.json({success: false, msg: "unable to retrieve the product"})
        const product = await productModel.findById({_id: productId})
        if(!product) return response.json({success: false, msg: "the product was not found"})
        return response.json({success: true, result: product})

        
    } catch (error) {
        console.log(error)
        response.json({success: false, msg: error.msg})
    }

}

//remove product
const removeProduct = async(request,response)=>{
    try {
        const { productId } = request.params
        if(!productId) return response.json({success: true, msg: "Oops! the product not found"})
        await productModel.findOneAndDelete({_id: productId})
        return response.json({success: true, msg: "Product deleted successfully!"})
        
    } catch (error) {
        console.log(error)
    }

}

export { allProducts, addProduct ,singleProduct, removeProduct}