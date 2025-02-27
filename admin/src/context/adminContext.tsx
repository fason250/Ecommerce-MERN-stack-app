/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


interface defaultContextValueType {
    token: string;
    setToken: (token: string) => void;
    storeToken: (token: string) => void;
    currency: string;
}


const defaultContextValue: defaultContextValueType = {
    token: '',
    setToken: () => { },
    storeToken: () => { },
    currency: ''
}

const GlobalContext = createContext(defaultContextValue)

//context global state

const GlobalState = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("token") ?? '')
    const currency: string = '$'

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)

        }

    }, [token])

    const storeToken = (token: string) => {
        localStorage.setItem('token', token)
        setToken(token)
    }

    return (
        <GlobalContext.Provider value={{ token, storeToken, setToken, currency }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useApplication = () => useContext(GlobalContext)

export default GlobalState


