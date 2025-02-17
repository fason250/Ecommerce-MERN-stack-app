/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import { GlobalContext } from "../context/AppContext"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

function Verify() {
    const { token, setCartItems } = useContext(GlobalContext)
    const navigate = useNavigate()
    const [searchParams,] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                if (!token) {
                    toast.error("please login to continue")
                    return null
                }
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/order/verifyStripe`, { success, orderId }, { headers: { token } })
                console.log(data)
                if (data.success) {
                    setCartItems([])
                    navigate("/orders")
                } else {
                    navigate("/cart")
                }
            } catch (error) {
                console.log(error)
                toast.error("payment failed")
            }

        }
        verifyPayment()
    }, [token])
    return (
        <div>Verify</div>
    )
}

export default Verify