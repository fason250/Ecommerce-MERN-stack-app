import { Outlet } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"
import SideBar from "../components/SideBar"
import { ToastContainer } from "react-toastify"

function Layout() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <ToastContainer theme="dark" autoClose={2000} />
      <NavigationBar />
      <hr className="h-[1px] text-gray-200" />
      <div className="flex w-full">
        <SideBar />
        <div className="mx-auto w-[70%] ml-[max(5vw,25px)] my-8 text-gray-600 text-base">

          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default Layout