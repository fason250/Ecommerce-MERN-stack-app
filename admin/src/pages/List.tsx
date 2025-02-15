import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useApplication } from "../context/adminContext";
import { toast } from "react-toastify";


interface ProductType {
  _id: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  sizes: string[];
  image: string[];
  bestSeller: boolean;
}

function List() {
  const [allProducts, setAllProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { currency, token } = useApplication()

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { data: { data } } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/products/allProducts`)
        setAllProducts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const removeProduct = async (productId: string) => {
    try {
      setLoading(true)
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/products/deleteProduct/${productId}`, {
        headers: {
          token: token
        }
      })
      console.log(data)
      if (data.success) {
        toast.success(data.msg)
        setAllProducts(prevProducts => (
          prevProducts.filter(product => product._id !== productId)
        ))
      } else {
        toast.error('failed to delete the product')
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  console.log(allProducts)


  return loading ? <div className="w-full min-h-screen flex items-center justify-center"><Loading /></div> : (
    <section>
      <p className="mb-2">All Products</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm">
          <strong>Image</strong>
          <strong>Name</strong>
          <strong>Category</strong>
          <strong>Price</strong>
          <strong className="text-center">Actions</strong>
        </div>
        {
          allProducts.map(product => (
            <div key={product._id} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 text-sm border-b-[1px] border-gray-200">
              <img className="w-12 h-16 " src={product.image[0]} alt="product image" />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>{currency} {product.price}</p>
              <p className="text-right md:text-center cursor-pointer text-lg" onClick={() => removeProduct(product._id)}>X</p>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default List