"use client"
import React, { Suspense } from 'react';
import ProductContainer from "@/components/ProductContainer";
import { useRouter } from 'next/navigation';
import { useToken } from '../../../context/TokenContext';


const Page = () => {
    const { isLoggedIn } = useToken()
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
