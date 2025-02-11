import { useContext } from "react";
import { GlobalContext } from "../context/AppContext";
import { Link } from "react-router-dom";

interface ProductCardPropsType{
    id: string;
    image: string[];
    name: string;
    price: number;
}


function ProductCard({id, image, name ,price }:ProductCardPropsType){
    const { currency } = useContext(GlobalContext)

  return (
    <Link to={`/Product/${id}`} className="text-gray-700 cursor-pointer">
        <div className="overflow-hidden">
            <img src={image[0]} alt="product image" className="hover:scale-110 transition ease-in-out" />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">{currency} {price}</p>
    </Link>
  )
}

export default ProductCard