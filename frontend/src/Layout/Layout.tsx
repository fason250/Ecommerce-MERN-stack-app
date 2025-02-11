import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import { ToastContainer } from "react-toastify"

function Layout() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer theme="dark" autoClose={2700} pauseOnFocusLoss={false} closeOnClick={true}/>
        <Navigation />
        <SearchBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout