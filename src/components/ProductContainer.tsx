"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Pagination from './Pagination'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useFetch } from '@/context/FetchContext'
import { DummyDataProps } from '@/types/DummyData'

const ProductContainer = () => {
    const [filterModal, setFilterModal] = useState(false)
    const [activeTab, setActiveTab] = useState("All Products")
    const [filteredData, setFilteredData] = useState<DummyDataProps[]>([]);
    const [categoryName, setCategoryName] = useState("All Products")

    const filterModalToggle = () => {
        setFilterModal(prev => !prev)
    }

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
        setFilterModal(prev => !prev)
    }

    const searchParams = useSearchParams()

    const { data, fetchData, loading } = useFetch()

    useEffect(() => {
        fetchData()
    }, [fetchData])

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


    const isLoggedIn = searchParams.get("loggedIn")
    const loginTrue = !!isLoggedIn

    const page = searchParams.get("page") ?? "1"
    const perPage = searchParams.get("perPage") ?? "10"

    const firstIndex = (Number(page) - 1) * Number(perPage)
    const lastIndex = firstIndex + Number(perPage)

    const slicedData = filteredData.slice(firstIndex, lastIndex)

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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
                                    <path d="M13 4L3 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11 19L3 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21 19L17 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21 11.5L11 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M21 4L19 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5 11.5L3 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.5 2C14.9659 2 15.1989 2 15.3827 2.07612C15.6277 2.17761 15.8224 2.37229 15.9239 2.61732C16 2.80109 16 3.03406 16 3.5L16 4.5C16 4.96594 16 5.19891 15.9239 5.38268C15.8224 5.62771 15.6277 5.82239 15.3827 5.92388C15.1989 6 14.9659 6 14.5 6C14.0341 6 13.8011 6 13.6173 5.92388C13.3723 5.82239 13.1776 5.62771 13.0761 5.38268C13 5.19891 13 4.96594 13 4.5L13 3.5C13 3.03406 13 2.80109 13.0761 2.61732C13.1776 2.37229 13.3723 2.17761 13.6173 2.07612C13.8011 2 14.0341 2 14.5 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12.5 17C12.9659 17 13.1989 17 13.3827 17.0761C13.6277 17.1776 13.8224 17.3723 13.9239 17.6173C14 17.8011 14 18.0341 14 18.5L14 19.5C14 19.9659 14 20.1989 13.9239 20.3827C13.8224 20.6277 13.6277 20.8224 13.3827 20.9239C13.1989 21 12.9659 21 12.5 21C12.0341 21 11.8011 21 11.6173 20.9239C11.3723 20.8224 11.1776 20.6277 11.0761 20.3827C11 20.1989 11 19.9659 11 19.5L11 18.5C11 18.0341 11 17.8011 11.0761 17.6173C11.1776 17.3723 11.3723 17.1776 11.6173 17.0761C11.8011 17 12.0341 17 12.5 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9.5 9.5C9.96594 9.5 10.1989 9.5 10.3827 9.57612C10.6277 9.67761 10.8224 9.87229 10.9239 10.1173C11 10.3011 11 10.5341 11 11L11 12C11 12.4659 11 12.6989 10.9239 12.8827C10.8224 13.1277 10.6277 13.3224 10.3827 13.4239C10.1989 13.5 9.96594 13.5 9.5 13.5C9.03406 13.5 8.80109 13.5 8.61732 13.4239C8.37229 13.3224 8.17761 13.1277 8.07612 12.8827C8 12.6989 8 12.4659 8 12L8 11C8 10.5341 8 10.3011 8.07612 10.1173C8.17761 9.87229 8.37229 9.67761 8.61732 9.57612C8.80109 9.5 9.03406 9.5 9.5 9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
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
                            <Image src={"/container-loader-unscreen.gif"} width={100} height={100} alt='Image' />
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