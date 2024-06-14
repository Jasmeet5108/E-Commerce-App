"use client"
import React, { createContext, useContext, useState } from "react"

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
}

const FetchContext = createContext<FetchContextProps | null>(null)

export const FetchProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<DataProps[]>([])

    const fetchData = async () => {
        const items = await fetch("https://fakestoreapi.com/products", { method: "GET" })
        const parsedItems = await items.json()
        setData(parsedItems)
    }

    return (
        <FetchContext.Provider value={{ data, fetchData }}>
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
