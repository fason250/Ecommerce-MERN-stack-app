import { assets } from "../assets/assets"
import { useApplication } from "../context/adminContext"

function NavigationBar() {
  const { storeToken } = useApplication()

  const handleLogout = () => {
    storeToken("")

  }

  return (
    <nav className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo} className="w-36" alt="logo icon" />
      <button onClick={handleLogout} className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm ">logout</button>
    </nav>
  )
}

export default NavigationBar