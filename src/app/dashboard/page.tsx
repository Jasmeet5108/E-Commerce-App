import React, { Suspense } from 'react';
import ProductContainer from "@/components/ProductContainer";

const Page = () => {
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
