/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalContext, type ProductType } from "../context/AppContext"
import { assets } from "../assets/assets"
import RelatedProducts from "../components/RelatedProducts"




function Product() {
  const [ productData , setProductData ] = useState<ProductType>()
  const [ mainImage ,setMainImage ] = useState<string>("")
  const [clickedSize , setClickedSize ] = useState<string>('')
  const { productArray,currency,addToCart } = useContext(GlobalContext)
  const containRef =useRef<HTMLElement | null>(null)
  const { productId } = useParams()
  

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const product = productArray.find(product => product._id === productId)
        setProductData(product)
        setMainImage(product!.image[0])
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    if(containRef.current) containRef.current.scrollIntoView({behavior: "smooth"})
    
  },[productId])
  return productData ? (
    <section  ref={containRef} className=" pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:over-flow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {
                productData!.image.map((image,index) =>(
                  <img onClick={()=>setMainImage(image)} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink cursor-pointer" src={image} alt="" />
                ))
              }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={mainImage} alt="main image product" className="w-full h-auto" />
          </div>
        </div>

        {/* product details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="star icon" />
            <img src={assets.star_icon} className="w-3.5" alt="star icon" />
            <img src={assets.star_icon} className="w-3.5" alt="star icon" />
            <img src={assets.star_icon} className="w-3.5" alt="star icon" />
            <img src={assets.star_dull_icon} className="w-3.5" alt="star icon" />
            <p className="pl-2">{122}</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency} {productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-6">
            <p>Select Size</p>
            <div className="flex gap-2">
              {
                productData.sizes.map(size => (
                  <button 
                    key={size} 
                    onClick={()=>setClickedSize(size)} 
                    className={`shadow py-2 px-4 bg-gray-50 ${clickedSize === size ? 'border-2 border-orange-500': ''}`}>
                      {size}
                    </button>
                ))
              }
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,clickedSize)} className="bg-black text-white px-8 rounded-md py-3 text-sm active:bg-gray-700 uppercase">Add To Cart</button>
          <hr className="mt-8 sm:w-4/5 text-gray-200"/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original Product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7days.</p>
          </div>
        </div>
      </div>
      {/* review*/}
      <div className="mt-20">
        <div className="flex gap-[1px]">
          <strong className="border border-gray-300 px-5 py-3 text-sm">Description</strong>
          <p className="border border-gray-300 px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-400  p-6 text-sm text-gray-500">
          <p>An e-commerce website is an  online platform that facilitates the buying and selling and products or services over the internet. it serves as a Virtual marketplace where businesses and  individuals can showcase their products. interact with customers and conduct transaction without the need for a physical presence. E-commerce website have gained immerse population due to their convenience accessibility and the global reach they offer. </p>
          <p>E-commerce website typically display products or services along with detailed description images, prices and any available (e.g: sizes,colors) Each product usually has its own dedicated page with relevant information</p>
        </div>
      </div>

      {/* related products */}
     <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </section>
  ) : <div></div>
}

export default Product