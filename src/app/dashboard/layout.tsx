"use client"
import Navbar from "@/components/Navbar";
import ProductCategory from "@/components/ProductCategory";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <ProductCategory />
            <div className="max-w-screen-2xl mx-auto">
                {children}
            </div>
        </div>
    );
}