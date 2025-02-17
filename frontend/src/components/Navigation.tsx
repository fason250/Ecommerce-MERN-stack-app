import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { GlobalContext } from "../context/AppContext"
import { toast } from "react-toastify"

function Navigation() {
    const [showMenuBar, setShowMenuBar] = useState<boolean>(false)
    const { setShowSearch, showSearch, countCartItems, storeToken, token } = useContext(GlobalContext)
    const navigate = useNavigate()
    const cartNumber = countCartItems()

    const handleLogout = () => {
        storeToken("")
        navigate("/login")
        toast.success("Logout successfully")

    }

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <img onClick={() => navigate("/")} src={assets.logo} alt="logo image" className="w-50  cursor-pointer" />
            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                <li className="text-lg font-medium capitalize">
                    <NavLink to={"/"} className={({ isActive }) => isActive ? 'border-b-2 border-[#949191] text-[#D4AF37]' : ''}>Home</NavLink>
                </li>
                <li className="text-lg font-medium capitalize">
                    <NavLink to={"/collection"} className={({ isActive }) => isActive ? 'border-b-2 border-[#949191] text-[#D4AF37]' : ''}>Collections</NavLink>
                </li>
                <li className="text-lg font-medium capitalize">
                    <NavLink to={"/About"} className={({ isActive }) => isActive ? 'border-b-2 border-[#949191] text-[#D4AF37]' : ''}>About Us</NavLink>
                </li>
                <li className="text-lg font-medium capitalize">
                    <NavLink to={"/Contact"} className={({ isActive }) => isActive ? 'border-b-2 border-[#949191] text-[#D4AF37]' : ''}>Contact Us</NavLink>
                </li>
            </ul>
            <div className="flex gap-6 items-center">
                <img onClick={() => setShowSearch(!showSearch)} className="w-5 h-5 cursor-pointer" src={assets.search_icon} alt="search icon" />
                <div className="group relative">
                    <Link to={"/login"}>
                        <img className="w-5 h-5 cursor-pointer" src={assets.profile_icon} alt="profile icon" />
                    </Link>
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        {
                            token && (
                                <div className="flex flex-col gap-2 w-36 py-3 px-2 bg-slate-100 rounded-md text-gray-700">

                                    <p className="hover:text-black hover:underline cursor-pointer">My Account</p>
                                    <p className="hover:text-black hover:underline cursor-pointer" onClick={() => navigate("/orders")}>My Orders</p>
                                    <p className="hover:text-black hover:underline cursor-pointer" onClick={handleLogout}>Logout</p>

                                </div>
                            )
                        }
                    </div>
                </div>
                <Link to="cart" className="relative">
                    <img src={assets.cart_icon} className="w-5 min-w-5 h-5" alt="cart icon" />
                    <span className=" w-4 text-center leading-4 text-[8px] aspect-square rounded-full bg-black text-white absolute bottom-[-6px] right-[-6px]">{cartNumber}</span>
                </Link>
                <img onClick={() => setShowMenuBar(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="menu icon" />
            </div>

            {/* menu bar on small devices */}
            <div className={`absolute inset-y-0 right-0 overflow-hidden bg-white transition-all ${showMenuBar ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setShowMenuBar(false)} className="flex items-center gap-4 p-3">
                        <img src={assets.dropdown_icon} alt=" drop down " className="h-4 rotate-180" />
                        <p>back</p>
                    </div>
                    <ul className="w-full flex flex-col gap-3 items-center justify-center">
                        <li className="w-full py-3 px-8 hover:bg-gray-100 ">
                            <NavLink className={({ isActive }) => isActive ? `underline` : ''} onClick={() => setShowMenuBar(false)} to={'/'}> Home </NavLink>
                        </li>
                        <li className="w-full py-3 px-8 hover:bg-gray-100 ">
                            <NavLink className={({ isActive }) => isActive ? `underline` : ''} onClick={() => setShowMenuBar(false)} to={'/collection'}> Collection </NavLink>
                        </li>
                        <li className="w-full py-3 px-8 hover:bg-gray-100 ">
                            <NavLink className={({ isActive }) => isActive ? `underline` : ''} onClick={() => setShowMenuBar(false)} to={'/About'}> About Us </NavLink>
                        </li>
                        <li className="w-full py-3 px-8 hover:bg-gray-100 ">
                            <NavLink className={({ isActive }) => isActive ? `underline` : ''} onClick={() => setShowMenuBar(false)} to={'/Contact'}> Contact Us </NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Navigation