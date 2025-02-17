import { useContext, useEffect, useState } from "react"
import { GlobalContext, type ProductType } from "../context/AppContext"
import PageTitle from "./PageTitle"
import ProductCard from "./ProductCard"


function BestSeller() {
    const [bestSellerProducts, setBestSellerProducts] = useState<ProductType[]>([])
    const { productArray } = useContext(GlobalContext)

    useEffect(() => {
        const filterBestSeller = productArray.filter(product => product.bestSeller === true)
        setBestSellerProducts(filterBestSeller)
    }, [productArray])

    return (
        <section className="my-10">
            <div className="text-center text-3xl py-8">
                <PageTitle text1="best" text2="sellers" />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">These top-rated products have earned their spot by winning the hearts of our customers. Whether you're looking for a crowd favorite or something that’s sure to impress, our best sellers deliver on quality, style, and performance.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    bestSellerProducts.map(product => (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            image={product.image}
                            price={product.price}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default BestSeller