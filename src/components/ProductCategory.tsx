"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ProductCategory = () => {

  const pathName = usePathname()

  return (
    <div className={`hidden sm:block bg-slate-800 text-white w-52 md:w-64 bmd:w-80`}>
      <ul className='flex flex-col md:text-lg bmd:text-xl'>

        <Link href="/dashboard" className={`cursor-pointer transition border ${pathName === "/dashboard" ? "text-slate-800 bg-white" : ""} border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            All Products
          </p>
        </Link>
        <Link href="/dashboard/electronics" className={`cursor-pointer transition border ${pathName === "/dashboard/electronics" ? "text-slate-800 bg-white" : ""} border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Electronics
          </p>
        </Link>
        <Link href="/dashboard/jewelery" className={`cursor-pointer transition border ${pathName === "/dashboard/jewelery" ? "text-slate-800 bg-white" : ""} border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Jewelery
          </p>
        </Link>
        <Link href="/dashboard/mens-clothing" className={`cursor-pointer transition border ${pathName === "/dashboard/mens-clothing" ? "text-slate-800 bg-white" : ""} border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Men&apos;s Clothing
          </p>
        </Link>
        <Link href="/dashboard/womens-clothing" className={`cursor-pointer transition border ${pathName === "/dashboard/womens-clothing" ? "text-slate-800 bg-white" : ""} border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Women&apos;s Clothing
          </p>
        </Link>
      </ul>
    </div>
  )
}

export default ProductCategory