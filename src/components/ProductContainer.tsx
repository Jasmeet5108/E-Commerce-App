"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Pagination from './Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useFetch } from '@/context/FetchContext'
import { DummyDataProps } from '@/types/DummyData'
import FilterIcon from '@/assets/icons/filterIcon'
import { useToken } from '@/context/TokenContext'

const ProductContainer = () => {
    const [filterModal, setFilterModal] = useState(false)
    const [activeTab, setActiveTab] = useState("All Products")
    const [filteredData, setFilteredData] = useState<DummyDataProps[]>([]);
    const [categoryName, setCategoryName] = useState("All Products")
    const searchParams = useSearchParams()
    const router = useRouter()
    const { isLoggedIn } = useToken()

    const filterModalToggle = () => {
        setFilterModal(prev => !prev)
    }

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
        setFilterModal(prev => !prev)
        router.replace(`${isLoggedIn ? "/?page=1&perPage=10&loggedIn=true" : "/?page=1&perPage=10"}`)
    }

    const { data, fetchData, loading } = useFetch()

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const LoggedIn = searchParams.get("loggedIn")
    const loginTrue = !!LoggedIn

    const page = searchParams.get("page") ?? "1"
    const perPage = searchParams.get("perPage") ?? "10"

    const firstIndex = (Number(page) - 1) * Number(perPage)
    const lastIndex = firstIndex + Number(perPage)

    const slicedData = filteredData.slice(firstIndex, lastIndex)

    useEffect(() => {
        let filtered = data;

        if (activeTab === "Beauty & Fragrances") {
            filtered = data.filter(
                (item) => item.category === "beauty" || item.category === "fragrances"
            );
        } else if (activeTab === "Gadgets") {
            filtered = data.filter(
                (item) =>
                    item.category === "laptops" ||
                    item.category === "mobile-accessories" ||
                    item.category === "smartphones" ||
                    item.category === "tablets"
            );
        } else if (activeTab === "Vehicles") {
            filtered = data.filter(
                (item) => item.category === "motorcycle" || item.category === "vehicle"
            );
        } else if (activeTab === "Kitchen-Items") {
            filtered = data.filter(
                (item) =>
                    item.category === "kitchen-accessories" ||
                    item.category === "groceries"
            );
        } else if (activeTab === "Men") {
            filtered = data.filter(
                (item) =>
                    item.category === "mens-shirts" ||
                    item.category === "mens-shoes" ||
                    item.category === "mens-watches"
            );
        } else if (activeTab === "Women") {
            filtered = data.filter(
                (item) =>
                    item.category === "womens-bags" ||
                    item.category === "womens-shoes" ||
                    item.category === "womens-dresses"
            );
        }

        setFilteredData(filtered as DummyDataProps[]);
        setCategoryName(activeTab)
    }, [activeTab, data]);

    return (
        <>
            <div className='px-2 mt-[-50px] sm:mt-3'>
                {
                    filteredData.length > 10 &&
                    <div>
                        <Pagination data={filteredData} hasNextPage={lastIndex < filteredData.length} hasPrevPage={firstIndex > 0} />
                    </div>
                }
                <div className='flex items-center justify-between'>
                    <div className='text-2xl my-10 font-semibold'>{categoryName}</div>
                    <div>
                        <div className='flex gap-3 px-2'>
                            <p className='font-semibold lg:text-lg'>Filter</p>
                            <button onClick={filterModalToggle}>
                                <FilterIcon />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`z-50 relative mt-[-30px] transition duration-500 ${filterModal ? "visible flex justify-end opacity-100 -translate-x-2 translate-y-[2px]" : "invisible opacity-0 translate-x-0 translate-y-0"}`}>
                    <div className='flex flex-col w-52 border border-black rounded-md bg-slate-200'>
                        <button type='button' onClick={() => handleTabChange("All Products")} className={`border-[1px] ${activeTab === "All Products" ? "bg-slate-800 text-white" : ""} border-gray-500 py-2 px-3`}>All Products</button>
                        <button type='button' onClick={() => handleTabChange("Beauty & Fragrances")} className={`border-[1px] ${activeTab === "Beauty & Fragrances" ? "bg-slate-800 text-white" : ""} border-gray-500 py-2 px-3`}>Beauty & Fragrances</button>
                        <button type='button' onClick={() => handleTabChange("Gadgets")} className={`border-[1px] ${activeTab === "Gadgets" ? "bg-slate-800 text-white" : ""} border-gray-500 py-2 px-3`}>Gadgets</button>
                        <button type='button' onClick={() => handleTabChange("Vehicles")} className={`border-[1px] ${activeTab === "Vehicles" ? "bg-slate-800 text-white" : ""} border-gray-500 py-2 px-3`}>Vehicles</button>
                        <button type='button' onClick={() => handleTabChange("Kitchen-Items")} className={`border-[1px] ${activeTab === "Kitchen-Items" ? "bg-slate-800 text-white" : ""} border-gray-500 py-2 px-3`}>Kitchen Accessories</button>
                        <button type='button' onClick={() => handleTabChange("Men")} className={`border-[1px] ${activeTab === "Men" ? "bg-slate-800 text-white" : ""} border-gray-500 py-2 px-3`}>Men&apos;s Category</button>
                        <button type='button' onClick={() => handleTabChange("Women")} className={`border-[1px] ${activeTab === "Women" ? "bg-slate-800 text-white" : ""} border-gray-500 py-2 px-3`}>Women&apos;s Category</button>
                    </div>

                </div>
                <div className='flex z-10 flex-wrap justify-center mt-[-270px] items-center gap-7 sm:gap-10 py-10 sm:py-5 sm:mt-[-250px]'>
                    {
                        loading ?
                            <Image unoptimized src={"/container-loader-unscreen.gif"} width={100} height={100} alt='Image' />
                            : data && slicedData.map((item, index) => (
                                <Link key={index} href={`${loginTrue ? `/${item.id}/?loggedIn=true` : `/${item.id}/`}`}>
                                    <div className='flex flex-col card cursor-pointer bg-white h-[380px] w-72 sm:h-[380px] hover:scale-105 transition sm:w-[300px] gap-6 pt-2 items-center rounded-xl'>
                                        <Image className='w-36 h-48 object-contain sm:w-40 sm:h-48 rounded-xl' width={100} height={100} src={item.images[0]} alt="Image" />
                                        <p className='text-center text-base font-semibold line-clamp-3'>{item.title}</p>
                                        <p className='font-semibold'>Price: ${item.price}</p>
                                    </div>
                                </Link>
                            ))
                    }
                </div>
            </div>
        </>
    )
}

export default ProductContainer