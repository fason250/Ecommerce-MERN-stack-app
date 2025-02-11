import { useContext } from "react"
import { GlobalContext } from "../context/AppContext"
import PageTitle from "../components/PageTitle"

function Orders() {
  const { productArray , currency} = useContext(GlobalContext)
  return (
    <section className="pt-16">
        <div className="text-2xl">
          <PageTitle text1="MY" text2="orders"/>
        </div>

        <div>
          {
            productArray.slice(1,4).map(product => (
              <div key={product._id} className="py-4 border-t border-slate-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-6 text-sm">
                    <img src={product.image[0]} alt="product image" className="w-16 md:w-20"/>
                    <div>
                      <p className="text-sm sm:text-base font-medium">{product.name}</p>
                      <div className="flex items-center gap-3 mt-2 text-base text-gray-600">
                        <p className="text-lg">{currency} {product.price}</p>
                        <p>Quantity: 2</p>
                        <p>sizes: XL</p>
                      </div>
                      <p className="mt-2">Date: <span className="text-gray-400">11 Feb 2024</span></p>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex justify-between">
                    <div className="flex items-center gap-2">
                      <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                      <p className="text-sm md:text-base capitalize">ready to ship</p>
                    </div>
                    <button className="border px-4 py-2 font-medium rounded-sm active:opacity-50 transition-opacity">Track Order</button>
                  </div>

              </div>
            ))
          }
        </div>
    </section>
  )
}

export default Orders