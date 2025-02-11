/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect,useState } from "react"
import { GlobalContext } from "../context/AppContext"
import { assets } from "../assets/assets"
import { useLocation } from "react-router-dom"


function SearchBar() {
    const[show,setShow] = useState<boolean>(false)
    const{searchTerm, setSearchTerm,showSearch,setShowSearch} = useContext(GlobalContext)
    const location = useLocation()


    useEffect(()=>{
        if(location.pathname.includes("/collection")){
            setShow(true)
        }else{
            setShow(false)
        }

    },[location])

  return showSearch && show ?  (
    <div className="border-t border-b border-gray-200 bg-gray-50 text-center">
        <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
            <input 
                type="text" 
                placeholder="Search Product..." 
                className="flex-1 outline-none bg-inherit text-sm" 
                value={searchTerm}
                onChange={(event)=> setSearchTerm(event.target.value)}
            />
            <img src={assets.search_icon} alt="search icon"  className="w-5 h-5"/>
        </div>
        <img onClick={()=> setShowSearch(false)} src={assets.cross_icon} className="w-3 inline cursor-pointer" alt="" />

    </div>
  ): null
}

export default SearchBar