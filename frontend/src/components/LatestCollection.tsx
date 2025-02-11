import { useContext, useEffect, useState } from 'react'
import { GlobalContext, type ProductType } from '../context/AppContext'
import PageTitle from './PageTitle'
import ProductCard from './ProductCard'

function LatestCollection() {
  const [ latestProduct, setLatestProduct ] = useState<ProductType[]>([])
  const { productArray }  = useContext(GlobalContext)

  useEffect(()=>{
    setLatestProduct(productArray.slice(0,10))
  },[])
  
  return (
    <div className='my-10'>
      <div className="text-center py-8 text-3xl">
        <PageTitle text1='Latest' text2='Collection'/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, nemo. Accusamus quas.</p>
      </div>
      {/* display products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          latestProduct.map(product => (
            <ProductCard 
              key={product._id} 
              id={product._id} 
              image={product.image}  
              name={product.name}
              price={product.price}
            />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection