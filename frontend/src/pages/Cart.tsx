import { useContext } from "react"
import { GlobalContext } from "../context/AppContext"
import PageTitle from "../components/PageTitle"
import { assets } from "../assets/assets"
import { ShoppingCart } from "lucide-react"


function Cart() {
  const { productArray , cartItems,currency ,updateQuantity,removeFromCart} = useContext(GlobalContext)

  return  (
    <section className="pt-14">
      <div className="text-2xl mb-3">
        <PageTitle  text1="Your" text2="Cart"/>
      </div>
      {
      cartItems.length > 0 ? (
      <div>
        {
          cartItems.map((item,index) => {
            const data = productArray.find(product => product._id === item.itemId)
    
            return(
              <div key={index} className="py-4  border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img src={data?.image[0]} alt="product image" className="w-16 sm:w-28 h-20 sm:h-20  object-contain"/>
                  <div>
                    <p className="text-sm sm:text-lg font-medium">{data?.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency} {data?.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border-[1px] bg-slate-50">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input 
                  type="number" min={1} 
                  defaultValue={item.quantity} 
                  className="border max-w-18 px-1 sm:px-2 py-1"
                  onChange={(event) => updateQuantity(item.itemId,item.size, +event.target.value)}
                  />
                <img 
                  src={assets.bin_icon} 
                  alt="delete icon" className="w-4 mr-4 sm:w-5 cursor-pointer"
                  onClick={()=>removeFromCart(data!._id,item.size)}
                />

              </div>
            )
          })
        }
      </div>
      ): (
      <h1 className="text-center py-4 text-2xl text-gray-600 inline-flex justify-center items-center w-full">No Item Found to your cart <ShoppingCart size={32} color="green"/> </h1>
    )
      }
    </section>
  )
}
export default Cart