"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { DummyDataProps } from '@/types/DummyData';
import { BASE_URL } from '@/helpers/Base-URL';
import Image from 'next/image';

interface Props {
    params: {
        productId: string;
    }
}

const Page: React.FC<Props> = ({ params }) => {
    const { productId } = params
    const [product, setProduct] = useState<DummyDataProps | null>(null)


    const getProduct = useCallback(async () => {
        const response = await fetch(`${BASE_URL}${productId}`, { method: "GET" })
        const data = await response.json()
        setProduct(data)
    }, [productId])

    useEffect(() => {
        getProduct()
    }, [])

    const getNameInitials = (name: string) => {
        return name.split(" ")[0].charAt(0) + name.split(" ")[1].charAt(0)
    }

    return (
        <>
            {product && (
                <>
                    <div className='flex flex-col justify-center'>
                        <div className='flex flex-col sm:flex-row items-center justify-center border p-2 bg-[#d5d7df] border-black w-80 pad:w-96 sm:w-[500px] md:w-[700px] mx-auto mt-10 rounded-xl'>
                            <Image width={100} height={100} src={product.images[0]} className='w-72 sm:w-60 object-contain h-60 md:h-80' alt='Image' />
                            <div className='flex flex-col'>
                                <p className='text-xl text-center font-semibold my-2'>{product.title}</p>
                                <hr />
                                <p className='text-sm px-2 my-4'>{product.description}</p>
                                <div className='flex justify-between items-center'>
                                    <p className='my-3'>Rating: {product.rating}</p>
                                    <button className='py-2 px-3 bg-sky-600 text-sm text-white font-semibold rounded-lg flex items-center'>Add to cart</button>
                                </div>
                            </div>

                        </div>
                        <div className='max-w-screen-md mx-auto'>
                            <div>
                                <p className='text-xl mt-8 pad:my-7 font-semibold px-2'>Reviews</p>
                            </div>
                            <div className='w-[340px] pad:w-[400px] pl-2 sm:mx-auto sm:w-[600px]'>
                                <p>
                                    {
                                        product.reviews.map((review, index) => (
                                            <div key={index} className='flex bg-[#d5d7df] flex-col gap-2 border border-black my-4 rounded-lg p-2'>
                                                <div className='flex items-center gap-2'>
                                                    <p className='bg-slate-700 text-white w-fit p-2 rounded-full text-xs'>{getNameInitials(review.reviewerName)}</p>
                                                    <p className='font-semibold'>{review.reviewerName}</p>
                                                </div>
                                                <p>{review.comment}</p>
                                                <p>Rating: {review.rating}</p>
                                            </div>
                                        ))
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Page