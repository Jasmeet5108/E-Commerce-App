"use client"
import Link from 'next/link'
import React from 'react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'

const page = () => {

  const { cart } = useCart()

  return (
    <>
      <div className='max-w-screen-xl mx-auto flex flex-col sm:gap-2 p-2'>
        <p className='text-xl'>Welcome to Cart Page</p>

        {
          cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className='flex flex-col sm:flex-row items-center border p-2 bg-[#d5d7df] border-black w-full sm:w-3/4 lg:w-1/2 mx-auto my-2 rounded-xl'>
                <Image width={100} height={100} src={item.images[0]} alt={item.title} className='w-24 h-24 object-cover' />
                <div className='flex flex-col sm:ml-4'>
                  <p className='text-lg font-semibold'>{item.title}</p>
                  <p className='text-sm'>Quantity: {item.quantity}</p>
                  <p className='text-sm'>Total Price: ${item.price * item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center my-4'>Your cart is empty.</p>
          )
        }

        <div className='mt-5'>
          <Link href="/" className='text-blue-500 sm:text-xl'>&larr; &nbsp; Back to Dashboard</Link>
        </div>
      </div>
    </>
  )
}

export default page