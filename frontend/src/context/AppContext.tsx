/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useState } from "react";
import { products } from "../assets/assets";

// product type
export interface ProductType {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    category: string;
    subCategory: string;
    sizes: string[];
    date: number;
    bestseller: boolean;
}

// Default value context Type

interface ContextDefaultValueType {
    productArray: ProductType[];
    currency: string;
    deliveryFee: number;
    searchTerm:string;
    showSearch: boolean;
    setSearchTerm: (searchTerm:string)=>void;
    setShowSearch: (showSearch:boolean)=>void;
}

// Global Context Props type
interface GlobalContextType{
    children: ReactNode
}

// default value 

const defaultValue:ContextDefaultValueType = {
    productArray: [],
    currency: '',
    deliveryFee: 0,
    searchTerm: '',
    setSearchTerm: ()=>{},
    showSearch: true,
    setShowSearch: ()=>{}
}
export const GlobalContext = createContext<ContextDefaultValueType>(defaultValue)


const GlobalStateContext = ({children}:GlobalContextType) =>{
    const [searchTerm , setSearchTerm] = useState('')
    const [showSearch , setShowSearch ] = useState<boolean>(false)
    const productArray:ProductType[] = products;
    const currency:string = '$';
    const deliveryFee:number = 10

    

    return(
        <GlobalContext.Provider value={{productArray,currency,deliveryFee,searchTerm,setSearchTerm,showSearch,setShowSearch}}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalStateContext