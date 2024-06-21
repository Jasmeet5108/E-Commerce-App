"use client"
import React, { Suspense } from 'react';
import ProductContainer from "@/components/ProductContainer";
import { useFetch } from '../../../context/FetchContext';
import { useRouter } from 'next/navigation';


const Page = () => {
    const { isLoggedIn } = useFetch()
    const router = useRouter()
    if (!isLoggedIn) {
        router.push("/login")
    }
    return (
        <>
            <div className="sm:flex sm:justify-between">
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductContainer />
                    </Suspense>
                </div>
            </div>
        </>
    );
}

export default Page;
