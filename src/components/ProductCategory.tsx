"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ProductCategory = () => {

  const pathName = usePathname()

  return (
    <div className={`hidden sm:block bg-slate-800 text-white pt-20`}>
      <ul className='flex justify-center md:text-lg bmd:text-xl'>

        <Link href="/dashboard" className={`cursor-pointer transition border ${pathName === "/dashboard" ? "text-slate-800 bg-white" : ""} border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            All Products
          </p>
        </Link>
        <a className={`cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Beauty
          </p>
        </a>
        <a className={`cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Fragrances
          </p>
        </a>
        <a className={`cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Furniture
          </p>
        </a>
        <a className={`cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Groceries
          </p>
        </a>
        <a className={`cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Home Decoration
          </p>
        </a>
        <a className={`cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Kitchen Accessories
          </p>
        </a>
        <a className={`cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Laptops
          </p>
        </a>
        <a className={`cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Men&apos;s Shirts
          </p>
        </a>
        <a className={`cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Men&apos;s Shoes
          </p>
        </a>
        <a className={`cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800`}>
          <p>
            Men&apos;s Watches
          </p>
        </a>
      </ul>
    </div>
  )
}

export default ProductCategory