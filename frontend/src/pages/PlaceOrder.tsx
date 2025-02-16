import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { assets } from "../assets/assets"
import CartCalculation from "../components/CartCalculation"
import PageTitle from "../components/PageTitle"
import { useNavigate } from "react-router-dom"
import { type CartItemsType, GlobalContext, type ProductType } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

export interface DetailedItems extends ProductType {
  orderedSizes: string;
  quantity: number;
}


function PlaceOrder() {
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery")
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  })
  const { cartItems, productArray, calculateTotalCartAmount, deliveryFee, token, setCartItems } = useContext(GlobalContext)
  const navigate = useNavigate()

  const generateDetailsOrderItems = (cartItems: CartItemsType[], products: ProductType[]): DetailedItems[] => {
    return cartItems.map(cartItem => {
      const product = products.find(item => item._id.toString() === cartItem.itemId)

      if (product) {
        return ({ ...product, orderedSizes: cartItem.size, quantity: cartItem.quantity })
      }
      return null

    }).filter(items => items !== null)
  }


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value

    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))

  }


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {

      const orderData = {
        items: generateDetailsOrderItems(cartItems, productArray),
        address: formData,
        amount: calculateTotalCartAmount() + deliveryFee,
      }

      if (paymentMethod === "cashOnDelivery") {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/order/place`, { ...orderData }, { headers: { token: token } })
        if (data.success) {
          setCartItems([])
          toast.success(data.msg)
          navigate("/orders")
        }
      } else if (paymentMethod === "stripe") {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/order/stripe`, { ...orderData }, {
          headers: {
            token: token,
          }
        })

        if (data.success) {
          const { session_url } = data
          setCartItems([])
          window.location.replace(session_url)

        } else {
          toast.error("failed to pay with stripe ")
        }

      }

    } catch (error) {
      console.log(error)
      toast.error("failed to place order")
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      <div className="flex flex-col w-full gap-4 sm:max-w-md">
        <div className="text-xl sm:text-2xl my-3">
          <PageTitle text1="customer" text2="information" />
        </div>
        <div className="flex gap-3">
          <input onChange={handleChange} required value={formData.firstName} name="firstName" type="text" placeholder="First name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input onChange={handleChange} value={formData.lastName} name="lastName" type="text" placeholder="Last name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input onChange={handleChange} required value={formData.email} name="email" type="email" placeholder="Email Address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input onChange={handleChange} required value={formData.street} name="street" type="text" placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <div className="flex gap-3">
          <input onChange={handleChange} required value={formData.city} name="city" type="text" placeholder="City " className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input onChange={handleChange} value={formData.state} name="state" type="text" placeholder="State " className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <div className="flex gap-3">
          <input onChange={handleChange} required value={formData.zipCode} name="zipCode" type="number" placeholder="zip/code " className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input onChange={handleChange} required value={formData.country} name="country" type="text" placeholder="Country " className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input onChange={handleChange} required value={formData.phone} name="phone" type="tel" placeholder="Phone Number" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
      </div>

      {/* right part */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartCalculation />
        </div>
        <div className="mt-12">
          <PageTitle text1="Payment" text2="Method" />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setPaymentMethod('stripe')} className="flex items-center gap-3 border py-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'stripe' ? 'bg-green-400 border-white' : null}`}></p>
              <img src={assets.stripe_logo} alt="stripe logo" className="h-4 mx-4" />
            </div>
            <div onClick={() => setPaymentMethod('razor')} className="flex items-center gap-3 border py-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'razor' ? 'bg-green-400 border-white' : null}`}></p>
              <img src={assets.razorpay_logo} alt="razor pay logo" className="h-4 mx-4" />
            </div>
            <div onClick={() => setPaymentMethod('cashOnDelivery')} className="flex items-center gap-3 border py-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'cashOnDelivery' ? 'bg-green-400 border-white' : null}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">Cash on delivery</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button className="bg-black rounded-md active:opacity-50 transition-opacity text-white px-16 py-3 text-sm">Place Order</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder