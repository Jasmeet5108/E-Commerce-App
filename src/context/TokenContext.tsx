"use client"
import { createContext, useContext, useEffect, useState } from "react"
// import useAuthRedirect from "../hooks/useAuthRedirect";

interface TokenContextProps {
    isLoggedIn: boolean;
    storeTokenInLocalStorage: (token: string) => void;
    removeTokenFromLocalStorage: () => void;
}

const TokenContext = createContext<TokenContextProps | null>(null)

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        }
    }, []);

    // useAuthRedirect(isLoggedIn)

    const storeTokenInLocalStorage = (token: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("token", token);
            setIsLoggedIn(true);
        }
    };

    const removeTokenFromLocalStorage = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
        }
    };

    return (
        <TokenContext.Provider value={{ isLoggedIn, storeTokenInLocalStorage, removeTokenFromLocalStorage }}>
            {children}
        </TokenContext.Provider>
    )

}

export const useToken = () => {
    const context = useContext(TokenContext)
    if (!context) {
        throw new Error("useFetch must be used within a provider")
    }
    return context;
}