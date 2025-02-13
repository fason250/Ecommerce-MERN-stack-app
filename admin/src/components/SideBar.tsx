import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"

function SideBar() {
  return (
    <div className="w-[18%] min-h-screen border-r-[1px] border-gray-300">
        <div className="flex flex-col gap-4 pt-6 divide-y-[1px] divide-gray-200">
            <NavLink  to="/createProduct" className={({isActive})=> `flex items-center gap-3  p-3 rounded-sm ${isActive ? 'bg-gray-400 text-white': ''}`}>
                <img className="w-5 h-5" src={assets.add_icon} alt="plus icon" />
                <p className="hidden md:block">Create Product</p>
            </NavLink>
            <NavLink  to="/allProducts" className={({isActive})=> `flex items-center gap-3  p-3 rounded-sm ${isActive ? 'bg-gray-400 text-white': ''}`}>
                <img className="w-5 h-5" src={assets.order_icon} alt="plus icon" />
                <p className="hidden md:block">Product Lists</p>
            </NavLink>
            <NavLink  to="/orders" className={({isActive})=> `flex items-center gap-3  p-3 rounded-sm ${isActive ? 'bg-gray-400 text-white': ''}`}>
                <img className="w-5 h-5" src={assets.order_icon} alt="plus icon" />
                <p className="hidden md:block">Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default SideBar