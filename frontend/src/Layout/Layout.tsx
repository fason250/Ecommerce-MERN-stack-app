import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"

function Layout() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navigation />
        <SearchBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout