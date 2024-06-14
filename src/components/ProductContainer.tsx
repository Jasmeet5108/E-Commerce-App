"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useFetch } from '../../context/FetchContext'

const ProductContainer = () => {

    const { data, fetchData } = useFetch()

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className='flex flex-wrap items-center gap-2 p-4 mt-4 max-w-screen-2xl mx-auto'>
                {data && data.map((item, index) => (
                    <div key={index} className='flex flex-col bg-white h-[450px] w-[350px] p-2 gap-5 items-center border border-black rounded-xl'>
                        <Image className='w-full h-80 rounded-xl' width={100} height={100} src={item.image} alt="Image" />
                        <p className='text-center text-sm font-semibold line-clamp-3'>{item.title}</p>
                        <p className='font-semibold'>${item.price}</p>
                    </div>
                ))}
            </div>


        </>
    )
}

export default ProductContainer