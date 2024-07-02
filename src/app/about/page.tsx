"use client"
import { useToken } from '@/context/TokenContext'
import Link from 'next/link'
import React from 'react'

const Page = () => {

  const { isLoggedIn } = useToken()

  return (
    <>
      <div className='max-w-screen-xl mx-auto flex flex-col sm:gap-2 p-2'>
        <p className='text-xl sm:text-3xl'>Thank You for visiting</p>
        <p className='text-xl sm:text-3xl'>This is just my personal project</p>
        <p className='text-xl sm:text-3xl'>For more, Kindly visit my &nbsp;
          <a href="https://jasmeet-singh.vercel.app" target='_blank' className='text-sky-600 underline underline-offset-4 font-semibold'>website</a>
        </p>
        <div className='mt-5'>
          <Link href={`${isLoggedIn ? "/?loggedIn=true" : "/"}`} className='text-blue-500 sm:text-xl'>&larr; &nbsp; Back to Dashboard</Link>
        </div>
      </div>
    </>
  )
}

export default Page