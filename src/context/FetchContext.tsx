"use client"
import React, { createContext, useContext, useState } from "react"
import { DummyDataProps } from "../types/DummyData";
import { BASE_URL } from "../helpers/Base-URL";

interface FetchContextProps {
    data: DummyDataProps[];
    fetchData: () => void;
    loading: boolean;
}

const FetchContext = createContext<FetchContextProps | null>(null)

export const FetchProvider = ({ children }: { children: React.ReactNode }) => {

    const [data, setData] = useState<DummyDataProps[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    const fetchData = async () => {
        setLoading(true)
        const items = await fetch(`${BASE_URL}?limit=100`, { method: "GET" })
        const parsedItems = await items.json()
        setData(parsedItems.products)
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
