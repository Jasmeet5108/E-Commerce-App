"use client"
import React, { createContext, useContext, useEffect, useState } from "react"
import useAuthRedirect from "../hooks/useAuthRedirect";


interface DataProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string
}

interface FetchContextProps {
    data: DataProps[];
    fetchData: () => void;
    loading: boolean;
    isLoggedIn: boolean;
    storeTokenInLocalStorage: (token: string) => void;
    removeTokenFromLocalStorage: () => void;
}

const FetchContext = createContext<FetchContextProps | null>(null)

export const FetchProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [data, setData] = useState<DataProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        }
    }, []);

    useAuthRedirect(isLoggedIn)

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

    // const token = localStorage.getItem("token")
    // const isLoggedIn = !!token

    // const storeTokenInLocalStorage = (token: string) => {
    //     localStorage.setItem("token", token)
    // }

    // const removeTokenFromLocalStorage = () => {
    //     localStorage.removeItem("token")
    // }

    const fetchData = async () => {
        setLoading(true)
        const items = await fetch("https://fakestoreapi.com/products", { method: "GET" })
        const parsedItems = await items.json()
        setData(parsedItems)
        setLoading(false)
    }

    return (
        <FetchContext.Provider value={{ data, fetchData, loading, isLoggedIn, storeTokenInLocalStorage, removeTokenFromLocalStorage }}>
            {children}
        </FetchContext.Provider>
    )
}

export const useFetch = () => {
    const context = useContext(FetchContext)
    if (!context) {
        throw new Error("useFetch must be used within a provider")
    }
    return context;
}
