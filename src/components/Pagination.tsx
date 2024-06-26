"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { DummyDataProps } from '@/types/DummyData';


interface Props {
  data: DummyDataProps[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

const Pagination = ({ data, hasPrevPage, hasNextPage }: Props) => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get("page") ?? "1"
  const perPage = searchParams.get("perPage") ?? "10"

  const isLoggedIn = searchParams.get("loggedIn")
  const loginTrue = !!isLoggedIn

  return (
    <>
      <div className='flex items-center justify-center sm:justify-end gap-5 mt-10'>
        <button
          className={`${!hasPrevPage ? "bg-gray-500" : "bg-sky-500"} text-white py-2 px-3 rounded-lg ${!hasPrevPage ? "cursor-not-allowed" : ""}`}
          disabled={!hasPrevPage}
          onClick={() => {
            // router.push(`/?page=${Number(page) - 1}&perPage=${perPage}`)
            router.push(`${loginTrue ? `/?page=${Number(page) - 1}&perPage=${perPage}&loggedIn=true` : `/?page=${Number(page) - 1}&perPage=${perPage}`}`)
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
            <path d="M17 4L8.66943 10.0405C6.44352 11.6545 6.44353 12.3455 8.66943 13.9595L17 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div className='flex gap-2'>
          <p>{page}</p>
          <p>/</p>
          <p>{Math.ceil(data.length / Number(perPage))}</p>
        </div>

        <button
          className={`${!hasNextPage ? "bg-gray-500" : "bg-sky-500"} text-white py-2 px-3 rounded-lg ${!hasNextPage ? "cursor-not-allowed" : ""}`}
          disabled={!hasNextPage}
          onClick={() => {
            // router.push(`/?page=${Number(page) + 1}&perPage=${perPage}`)
            router.push(`${loginTrue ? `/?page=${Number(page) + 1}&perPage=${perPage}&loggedIn=true` : `/?page=${Number(page) + 1}&perPage=${perPage}`}`)
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#000000" fill="none">
            <path d="M7 4L15.3306 10.0405C17.5565 11.6545 17.5565 12.3455 15.3306 13.9595L7 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default Pagination