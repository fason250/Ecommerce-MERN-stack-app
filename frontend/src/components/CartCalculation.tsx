import { useContext } from 'react'
import { GlobalContext } from '../context/AppContext'
import PageTitle from './PageTitle'


function CartCalculation() {
    const { calculateTotalCartAmount,currency,deliveryFee }  = useContext(GlobalContext)
  return (
    <section className='w-full'>
        <div className='text-2xl'>
            <PageTitle text1='cart' text2='totals'/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>SubTotal</p>
                <p>{currency} {calculateTotalCartAmount().toFixed(2)}
                </p>
            </div>
            <hr />
            <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{currency} {deliveryFee}</p>
            </div>
            <div className="flex justify-between">
                <strong>Total</strong>
                <b>{currency} {calculateTotalCartAmount()=== 0 ? '0.00' : (calculateTotalCartAmount() + deliveryFee).toFixed(2)}</b>
            </div>

        </div>
    </section>
  )
}

export default CartCalculation