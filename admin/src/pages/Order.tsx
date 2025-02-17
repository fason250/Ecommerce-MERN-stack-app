import { useEffect, useState } from "react"
import { useApplication } from "../context/adminContext"
import axios from "axios"
import { assets } from "../assets/assets"
import { toast } from "react-toastify";


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

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  bestSeller: boolean;
}

interface DetailedItems extends ProductType {
  size: string;
  quantity: number;
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



function Order() {
  const [orders, setOrders] = useState<AllStructuredOrders[]>([])
  const { token, currency } = useApplication()

  const statusOptions = ['Order Placed', 'Shipped', 'Packing', 'Out for Delivery'];



  console.log("here is the orders ", orders)
  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return null
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/order/orderLists`, { headers: { token: token } })
        console.log(data.result)
        if (data.success) {
          setOrders(data.result.reverse())
        }

      } catch (error) {
        console.log(error);

      }

    }
    fetchOrders()

  }, [token])

  const handleStatus = async (value: string, orderId: string) => {
    try {

      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/order/status`, { status: value, orderId }, { headers: { token: token } })
      if (data.success) {
        toast.success(data.msg)

      } else {
        toast.error("failed to update the status")
      }

    } catch (error) {
      console.log(error)
      toast.error("failed to update status")

    }

  }

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div key={index} className="grid gird-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 border border-gray-200">
              <img src={assets.parcel_icon} alt="parcel icon" className="w-12" />
              <div>
                <div>
                  {
                    order.items.map((item, index) => {
                      if (index === order.items.length) {
                        return <p className="py-0.5 font-semibold" key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                      } else {
                        return <p className="py-0.5 font-semibold" key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                      }
                    })
                  }
                </div>
                <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{`${order.address.street} ,`}</p>
                  <p>{`${order.address.city} , ${order.address.state}, ${order.address.country} , ${order.address.zipCode}`}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                <p className="mt-3">Method: {order.paymentMethod}</p>
                <p>Payment: <span className={`${order.payment ? 'text-green-800 font-medium' : 'text-orange-800 font-medium'}`}>{order.payment ? 'Paid' : 'Pending'}</span></p>
                <p>Date: {new Date(order.date).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</p>
              </div>
              <p className="text-sm sm:text-[15px]">{currency} {order.amount}</p>
              <select onChange={(event) => handleStatus(event.target.value, order._id)} value={order.status} className="p-2 font-semibold">
                <option value={order.status}>{order.status}</option>
                {
                  statusOptions.map(option => (
                    option.toLowerCase() !== order.status.toLowerCase() ? <option value={option} key={option}>{option}</option> : null
                  ))
                }

              </select>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Order