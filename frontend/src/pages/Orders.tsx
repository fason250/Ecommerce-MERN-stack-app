import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../context/AppContext"
import PageTitle from "../components/PageTitle"
import axios from "axios"
import { type DetailedItems } from "./PlaceOrder"

interface Address {
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  street: string;
  state: string;
  zipCode: string;
  email: string;
  country: string;
}

interface AllStructuredOrders extends DetailedItems {
  items: DetailedItems[];
  amount: number;
  address: Address;
  status: string;
  payment: string;
  paymentMethod: string;
  date: string;
}

function Orders() {
  const { currency, token } = useContext(GlobalContext)
  const [orders, setOrders] = useState<AllStructuredOrders[]>([])

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/order/userOrders`, { headers: { token: token } })
        if (data.success && data.orders.length > 0) {
          console.log("data orders ", data.orders)

          const allStructuredOrders: AllStructuredOrders[] = []

          data.orders.forEach((order: AllStructuredOrders) => {
            order.items.forEach((item: DetailedItems) => {
              const newItem: AllStructuredOrders = {
                ...item,
                status: order.status,
                payment: order.payment,
                paymentMethod: order.paymentMethod,
                date: order.date,
                items: [],
                amount: order.amount,
                address: order.address
              }
              allStructuredOrders.push(newItem)
            })
          })
          setOrders(allStructuredOrders.reverse())
        }


      } catch (error) {
        console.log(error)
      }
    }
    fetchOrder()
  }, [token])

  const trackOrder = () => {
    window.location.reload()
  }

  return (
    <section className="pt-16">
      <div className="text-2xl">
        <PageTitle text1="MY" text2="orders" />
      </div>

      <div>
        {
          orders.map((order, index) => (
            <div key={index} className="py-4 border-t border-slate-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-6 text-sm">
                <img src={order.image[0]} alt="product image" className="w-16 md:w-20" />
                <div>
                  <p className="text-sm sm:text-base font-medium">{order.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-600">
                    <p >{currency} {order.amount}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>sizes: {order.orderedSizes}</p>
                  </div>
                  <p className="mt-1">Date: <span className="text-gray-400">{new Date(order.date).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span></p>
                  <p className="mt-1">Payment: <span className="text-gray-400">{order.paymentMethod}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base capitalize">{order.status}</p>
                </div>
                <button onClick={trackOrder} className="border px-4 py-2 font-medium rounded-sm active:opacity-50 transition-opacity">Track Order</button>
              </div>

            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Orders