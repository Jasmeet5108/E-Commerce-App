"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useFetch } from '../../context/FetchContext'
import Pagination from './Pagination'
import { useSearchParams } from 'next/navigation'

const ProductContainer = () => {

    const searchParams = useSearchParams()

    const { data, fetchData, loading } = useFetch()

    useEffect(() => {
        fetchData()
    }, [])

    const page = searchParams.get("page") ?? "1"
    const perPage = searchParams.get("perPage") ?? "10"

    const firstIndex = (Number(page) - 1) * Number(perPage)
    const lastIndex = firstIndex + Number(perPage)

    const slicedData = data.slice(firstIndex, lastIndex)

    return (
        <>
            <div>
                <Pagination data={data} hasNextPage={lastIndex < data.length} hasPrevPage={firstIndex > 0} />
            </div>
            <div className='flex flex-wrap justify-center items-center gap-5 py-10 sm:py-5 sm:mt-16'>
                {loading ? "loading..." : data && slicedData.map((item, index) => (
                    <div key={index} className='flex flex-col bg-white h-[380px] w-72 sm:h-[380px] sm:w-[300px] gap-6 pt-2 items-center border border-black rounded-xl'>
                        <Image className='w-36 h-48 sm:w-40 sm:h-48 rounded-xl' width={100} height={100} src={item.images[0]} alt="Image" />
                        <p className='text-center text-base font-semibold line-clamp-3'>{item.title}</p>
                        <p className='font-semibold'>Price: ${item.price}</p>
                        <button className='bg-sky-500 text-white py-1 px-2 sm:py-2 sm:px-3 rounded-lg hover:bg-sky-600'>View</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductContainer