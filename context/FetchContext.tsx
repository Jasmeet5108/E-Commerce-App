"use client"
import React, { createContext, useContext, useState } from "react"
import { FakeDataProps } from '../types/FakeData';

interface FetchContextProps {
    data: FakeDataProps[];
    fetchData: () => void;
    loading: boolean;
}

const FetchContext = createContext<FetchContextProps | null>(null)

export const FetchProvider = ({ children }: { children: React.ReactNode }) => {

    const [data, setData] = useState<FakeDataProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    const fetchData = async () => {
        setLoading(true)
        const items = await fetch("https://fakestoreapi.com/products", { method: "GET" })
        const parsedItems = await items.json()
        setData(parsedItems)
        setLoading(false)
    }

    return (
        <FetchContext.Provider value={{ data, fetchData, loading }}>
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
