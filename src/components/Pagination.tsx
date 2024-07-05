"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { DummyDataProps } from '@/types/DummyData';
import LeftArrowPagination from '@/app/assets/icons/leftArrowPagination';
import RightArrowPagination from '@/app/assets/icons/rightArrowPagination';

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
            router.push(`${loginTrue ? `/?page=${Number(page) - 1}&perPage=${perPage}&loggedIn=true` : `/?page=${Number(page) - 1}&perPage=${perPage}`}`)
          }}
        >
          <LeftArrowPagination />
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
            router.push(`${loginTrue ? `/?page=${Number(page) + 1}&perPage=${perPage}&loggedIn=true` : `/?page=${Number(page) + 1}&perPage=${perPage}`}`)
          }}
        >
          <RightArrowPagination />
        </button>
      </div>
    </>
  )
}

export default Pagination