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
    const perPage = searchParams.get("perPage") ?? "6"

    const firstIndex = (Number(page) - 1) * Number(perPage)
    const lastIndex = firstIndex + Number(perPage)

    const slicedData = data.slice(firstIndex, lastIndex)

    return (
        <>
                <div className='flex flex-wrap justify-center items-center gap-2 py-10 sm:mt-16'>
                    {loading ? "loading..." : data && slicedData.map((item, index) => (
                        <div key={index} className='flex flex-col bg-white h-[350px] w-72 sm:h-[450px] sm:w-[350px] p-2 gap-5 items-center border border-black rounded-xl'>
                            <Image className='w-48 h-56 sm:w-72 sm:h-80 rounded-xl' width={100} height={100} src={item.image} alt="Image" />
                            <p className='text-center text-sm font-semibold line-clamp-3'>{item.title}</p>
                            <p className='font-semibold'>Price: ${item.price}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <Pagination data={data} hasNextPage={lastIndex < data.length} hasPrevPage={firstIndex > 0} />
                </div>
        </>
    )
}

export default ProductContainer