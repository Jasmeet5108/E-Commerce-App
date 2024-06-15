import React from 'react'

const ProductCategory = () => {
  return (
    <div className='hidden sm:block bg-slate-800 text-white w-52 md:w-64 bmd:w-80'>
      <ul className='flex flex-col md:text-lg bmd:text-xl'>
        <li className='cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800'>Electronics</li>
        <li className='cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800'>Jewelery</li>
        <li className='cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800'>Men's Clothing</li>
        <li className='cursor-pointer transition border border-white p-3 hover:bg-white hover:text-slate-800'>Women's Clothing</li>
      </ul>
    </div>
  )
}

export default ProductCategory