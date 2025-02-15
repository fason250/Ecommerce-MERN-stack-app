/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

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
    bestSeller: boolean;
}

// Default value context Type

interface ContextDefaultValueType {
    productArray: ProductType[];
    currency: string;
    deliveryFee: number;
    searchTerm: string;
    showSearch: boolean;
    setSearchTerm: (searchTerm: string) => void;
    setShowSearch: (showSearch: boolean) => void;
    cartItems: CartItemsType[];
    setCartItems: (cartItems: CartItemsType[]) => void;
    addToCart: (itemId: string, size: string) => void;
    countCartItems: () => number;
    updateQuantity: (itemId: string, size: string, quantity: number) => void;
    removeFromCart: (itemId: string, size: string) => void;
    calculateTotalCartAmount: () => number,
    token: string;
    setToken: (token: string) => void;
    storeToken: (newToken: string) => void;
}

// Global Context Props type
interface GlobalContextType {
    children: ReactNode
}

// cartItems Type
interface CartItemsType {
    itemId: string;
    size: string;
    quantity: number;
}

// default value 

const defaultValue: ContextDefaultValueType = {
    productArray: [],
    currency: '',
    deliveryFee: 0,
    searchTerm: '',
    setSearchTerm: () => { },
    showSearch: true,
    setShowSearch: () => { },
    cartItems: [],
    setCartItems: () => { },
    addToCart: () => { },
    countCartItems: () => 0,
    updateQuantity: () => { },
    removeFromCart: () => { },
    calculateTotalCartAmount: () => 0,
    token: '',
    setToken: () => { },
    storeToken: () => { }
}
export const GlobalContext = createContext<ContextDefaultValueType>(defaultValue)


const GlobalStateContext = ({ children }: GlobalContextType) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [showSearch, setShowSearch] = useState<boolean>(false)
    const [cartItems, setCartItems] = useState<CartItemsType[]>([])
    const [productArray, setProductArray] = useState<ProductType[]>([])
    const [token, setToken] = useState<string>(localStorage.getItem('token') ?? '')
    const currency: string = '$';
    const deliveryFee: number = 10


    const storeToken = (newToken: string) => {
        localStorage.setItem('token', newToken)
        setToken(newToken)
    }

    useEffect(() => {
        if (token) localStorage.setItem('token', token)
        //get user cart 
        const getUserCart = async () => {
            try {
                if (token) {
                    const { data: { cartData } } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/cart/userCart`, { headers: { token: token } })
                    setCartItems(cartData)
                }

            } catch (error) {
                console.log(error)
            }
        }
        getUserCart()
    }, [token])


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data: { data } } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/products/allProducts`)
                if (data) {
                    setProductArray(data)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct()
    }, [])


    // add  to cart logic
    const addToCart = async (itemId: string, size: string,) => {
        try {
            // if added to cart but no size 
            if (size.length < 1) {
                toast.error("please select the product size")
                return
            }
            //checking if the item is already exist with that same size
            const existingItem = cartItems.find(item => item.itemId === itemId && item.size === size)

            if (existingItem) {
                // if it already in we increase it's quantity i mean the number of items
                setCartItems(prevCartItems => (
                    prevCartItems.map(item => item.itemId === itemId && item.size === size ? { ...item, quantity: item.quantity + 1 } : item)
                ))
            } else {
                //means then product doesn't exist it's time to add right now
                setCartItems(prevCartItems => [...prevCartItems, { itemId, size, quantity: 1 }])
            }

            //check if the user is logged in
            if (token) {
                const add = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/cart/addToCart`, { itemId, size }, { headers: { token: token } })

                if (add.statusText.toLowerCase() === 'ok') {
                    toast.success("item added to the cart")
                } else {
                    toast.error("not added to the cart")
                }

            }

        } catch (error) {
            console.log(error);
            toast.error("Failed to add to cart")

        }
    }

    // get cart count prev value + current value 
    const countCartItems = () => cartItems.reduce((sum, item) => sum + item.quantity, 0)

    //updating the quantity in cart
    const updateQuantity = async (itemId: string, size: string, quantity: number) => {
        setCartItems(prevCartItems => (
            prevCartItems.map(item => {
                if (item.itemId === itemId && item.size === size) {
                    return { ...item, quantity: quantity }
                } else {
                    return item
                }
            })
        ))
        if (token) {
            const update = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/cart/updateCart`, { itemId, size, quantity }, { headers: { token: token } })

            if (update.statusText.toLowerCase() === "ok") {
                toast.success("cart updated")
            } else {
                toast.error("failed to update cart")
            }
        }
    }

    //remove product from cart 🛒🛒
    const removeFromCart = (itemId: string, size: string) => {
        const productIndex = cartItems.findIndex(item => item.itemId === itemId && item.size === size)
        if (productIndex !== -1) {
            const updatedCartList = [...cartItems]
            updatedCartList.splice(productIndex, 1)
            setCartItems(updatedCartList)
            toast.success("item remove to cart successfully")
        }

    }

    //total cart items amount
    const calculateTotalCartAmount = () => {
        return cartItems.reduce((total, item) => {
            // finding the product and it's data
            const productData = productArray.find(product => product._id === item.itemId)

            if (productData) {
                const productPrice = productData.price
                const productTotal = productPrice * item.quantity
                return total + productTotal
            }

            return total
        }, 0)
    }


    return (
        <GlobalContext.Provider value={{
            productArray,
            currency,
            deliveryFee,
            searchTerm,
            setSearchTerm,
            showSearch,
            setShowSearch,
            cartItems,
            addToCart,
            setCartItems,
            countCartItems,
            updateQuantity,
            removeFromCart,
            calculateTotalCartAmount,
            token,
            setToken,
            storeToken
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalStateContext