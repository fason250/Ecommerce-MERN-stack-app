/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect,useState } from "react";
import { GlobalContext, type ProductType } from "../context/AppContext";
import { filterArray } from "../pages/Collection";
import PageTitle from "./PageTitle";
import ProductCard from "./ProductCard";

interface RelatedProductsType {
    category: string;
    subCategory: string;
}

function RelatedProducts({category ,subCategory}:RelatedProductsType) {
    const [relatedProduct , setRelatedProduct ] = useState<ProductType[]>([])
    const { productArray} = useContext(GlobalContext)

    useEffect(()=>{
        if(productArray.length > 0){
            let allProducts = productArray
            allProducts = filterArray(allProducts, product => product.category === category)
            allProducts = filterArray(allProducts, product => product.subCategory === subCategory)

            setRelatedProduct(allProducts.slice(0,5))
        }
    },[productArray])


  return (
    <div className="my-10">
        <div className="text-center text-3xl py-2">
            <PageTitle  text1="related" text2="Product"/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                relatedProduct.map(relatedProduct =>(
                        <ProductCard 
                            key={relatedProduct._id}
                            id={relatedProduct._id} 
                            image={relatedProduct.image}
                            name={relatedProduct.name}
                            price={relatedProduct.price}
                        />
                    )
                )
            }

        </div>
    </div>
  )
}

export default RelatedProducts