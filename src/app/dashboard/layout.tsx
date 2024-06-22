"use client"
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            <div className="max-w-screen-2xl mx-auto">
                {children}
            </div>
        </div>
    );
}