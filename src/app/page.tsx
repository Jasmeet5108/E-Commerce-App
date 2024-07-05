"use client"
import React, { Suspense, useEffect } from 'react';
import ProductContainer from "@/components/ProductContainer";
import { useToken } from '@/context/TokenContext';
import { useRouter } from 'next/navigation';

const Page = () => {

  const { isLoggedIn } = useToken()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/?loggedIn=true")
    }
    else{
      router.replace("/")
    }
  }, [isLoggedIn, router])

  return (
    <>
      <div className="sm:flex sm:justify-between">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductContainer />
        </Suspense>
      </div>
    </>
  );
}

export default Page;
