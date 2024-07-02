"use client"
import React, { Suspense } from 'react';
import ProductContainer from "@/components/ProductContainer";

const Page = () => {
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
