"use client"
import Link from 'next/link'
import React from 'react'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { useToken } from '@/context/TokenContext'

const Page = () => {

  const { cart, removeFromCart, clearCart } = useCart()
  const { isLoggedIn } = useToken()

  return (
    <>
      <div className='max-w-screen-xl mx-auto flex flex-col sm:gap-2 p-2'>
        <div className='mb-5'>
          <Link href={`${isLoggedIn ? "/?loggedIn=true" : "/"}`} className='text-blue-500 sm:text-xl'>&larr; &nbsp; Back to Dashboard</Link>
        </div>
        <button onClick={clearCart} className='flex justify-end px-2'>
          <p className={`flex justify-center py-1 px-2 rounded-lg ${cart.length > 0 ? "bg-rose-400 cursor-pointer" : "hidden"} text-white w-2/5 my-3 font-semibold`}>Clear Cart</p>
        </button>
        {
          cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className='flex flex-col gap-3 sm:flex-row items-center border p-2 bg-[#d5d7df] border-black w-5/6 lg:w-1/2 mx-auto my-2 rounded-xl'>
                <Image width={100} height={100} src={item.images[0]} alt={item.title} className='w-24 h-24 object-cover' />
                <div className='flex flex-col items-center gap-2 sm:ml-4'>
                  <p className='text-base font-semibold text-center'>{item.title}</p>
                  <p className='text-sm my-1 text-center'>Quantity: {item.quantity}</p>
                  <p className='text-sm my-1 text-center'>Total Price: ${item.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)} className='bg-red-600 w-24 text-white font-semibold rounded-lg py-1 px-2 my-2'>Remove</button>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center my-4'>Your cart is empty.</p>
          )
        }

        <Link className={`flex justify-center py-1 px-2 rounded-lg ${cart.length > 0 ? "bg-sky-600 cursor-pointer" : "hidden"} text-white w-2/5 mx-auto my-3 font-semibold`} href={`${isLoggedIn ? "/about/?loggedIn=true" : "/about"}`}>Buy</Link>


      </div>
    </>
  )
}

export default Page