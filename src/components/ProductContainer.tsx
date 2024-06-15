"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useFetch } from '../../context/FetchContext'

const ProductContainer = () => {

    const { data, fetchData, loading } = useFetch()

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className='flex flex-wrap justify-center items-center gap-2 py-10 sm:mt-16'>
                {loading ? "loading..." : data.map((item, index) => (
                    <div key={index} className='flex flex-col bg-white h-[350px] w-72 sm:h-[450px] sm:w-[350px] p-2 gap-5 items-center border border-black rounded-xl'>
                        <Image className='w-48 h-56 sm:w-full sm:h-80 rounded-xl' width={100} height={100} src={item.image} alt="Image" />
                        <p className='text-center text-sm font-semibold line-clamp-3'>{item.title}</p>
                        <p className='font-semibold'>${item.price}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ProductContainer