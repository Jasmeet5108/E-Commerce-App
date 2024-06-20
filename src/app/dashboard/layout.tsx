"use client"
import Navbar from "@/components/Navbar";
import ProductCategory from "@/components/ProductCategory";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <div className="sm:flex sm:justify-between">
                <div className="sm:w-1/3">
                    <ProductCategory />
                </div>
                <div className="sm:w-2/3">
                    {children}
                </div>
            </div>
        </div>
    );
}