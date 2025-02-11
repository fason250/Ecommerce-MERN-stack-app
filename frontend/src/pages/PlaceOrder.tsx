import { useState } from "react"
import { assets } from "../assets/assets"
import CartCalculation from "../components/CartCalculation"
import PageTitle from "../components/PageTitle"
import { useNavigate } from "react-router-dom"

function PlaceOrder() {
  const [payment ,setPayment ] = useState("cashOnDelivery")
  const navigate = useNavigate()
  return (
    <section className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      <div className="flex flex-col w-full gap-4 sm:max-w-md">
        <div className="text-xl sm:text-2xl my-3">
          <PageTitle text1="customer" text2="information"/>
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder="First name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="Last name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input type="email" placeholder="Email Address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <input type="text" placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <div className="flex gap-3">
          <input type="text" placeholder="City " className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="State " className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input type="text" placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        <div className="flex gap-3">
          <input type="number" placeholder="zip/code " className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="Country " className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
        </div>
        <input type="number" placeholder="Phone Number" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" />
      </div>

      {/* right part */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartCalculation />
        </div>
        <div className="mt-12">
          <PageTitle text1="Payment" text2="Method"/>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={()=>setPayment('stripe')} className="flex items-center gap-3 border py-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${payment === 'stripe' ? 'bg-green-400 border-white' : null}`}></p>
              <img src={assets.stripe_logo} alt="stripe logo" className="h-4 mx-4" />
            </div>
            <div onClick={()=>setPayment('razor')} className="flex items-center gap-3 border py-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${payment === 'razor' ? 'bg-green-400 border-white' : null}`}></p>
              <img src={assets.razorpay_logo} alt="razor pay logo" className="h-4 mx-4" />
            </div>
            <div onClick={()=>setPayment('cashOnDelivery')} className="flex items-center gap-3 border py-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${payment === 'cashOnDelivery' ? 'bg-green-400 border-white' : null}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">Cash on delivery</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button onClick={()=>navigate("/orders")} className="bg-black rounded-md active:opacity-50 transition-opacity text-white px-16 py-3 text-sm">Place Order</button>
          </div>
        </div>
      </div>

    </section>
  )
}

export default PlaceOrder