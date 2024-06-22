"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useFetch } from '../../context/FetchContext'
import Pagination from './Pagination'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

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
            <div className='px-2'>
                <div>
                    <Pagination data={data} hasNextPage={lastIndex < data.length} hasPrevPage={firstIndex > 0} />
                </div>
                <div className='text-2xl my-5 font-semibold'>Products</div>
                <div className='flex flex-wrap justify-center items-center gap-7 sm:gap-10 py-10 sm:py-5 sm:mt-16'>
                    {loading ? "loading..." : data && slicedData.map((item, index) => (
                        <div key={index} className='flex flex-col card cursor-pointer bg-white h-[380px] w-72 sm:h-[380px] hover:scale-105 transition sm:w-[300px] gap-6 pt-2 items-center rounded-xl'>
                            <Image className='w-36 h-48 object-contain sm:w-40 sm:h-48 rounded-xl' width={100} height={100} src={item.images[0]} alt="Image" />
                            <p className='text-center text-base font-semibold line-clamp-3'>{item.title}</p>
                            <p className='font-semibold'>Price: ${item.price}</p>
                            <Link href={`/dashboard/${item.id}`} className='bg-sky-500 text-white py-1 px-2 sm:py-2 sm:px-3 rounded-lg hover:bg-sky-600'>View</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductContainer