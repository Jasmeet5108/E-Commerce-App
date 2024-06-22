"use client"
import React, { useEffect, useState } from 'react'
import { DummyDataProps } from '../../../../types/DummyData';
import { BASE_URL } from '../../../../helpers/Base-URL';

interface Props {
    params: {
        productId: string;
    }
}

const Page: React.FC<Props> = ({ params }) => {
    const { productId } = params
    const [product, setProduct] = useState<DummyDataProps | null>(null)

    const getProduct = async () => {
        const response = await fetch(`${BASE_URL}${productId}`)
        const data = await response.json()
        setProduct(data)
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <div>Dashboard Dynamic page</div>
            {product && (
                <div>
                    <p>{product.title}</p>
                </div>
            )}
        </>
    )
}

export default Page