import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <Navbar />
      <div className='max-w-screen-xl mx-auto flex flex-col sm:gap-2 p-2'>
        <p className='text-xl'>Welcome to Cart Page</p>
        <div className='mt-5'>
          <Link href="/dashboard" className='text-blue-500 sm:text-xl'>&larr; &nbsp; Back to Dashboard</Link>
        </div>
      </div>
    </>
  )
}

export default page