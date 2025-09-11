'use client'


import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  
  
    const pathname = usePathname();

    console.log({pathname})
  
  
  const createPageUrl = (pageNumber: number | string) => {



  }

  return (
    <div className='flex justify-center'>
      <nav aria-label='Page navigation example'>
        <ul className='flex list-style-none'>
          <li className='page-item disabled'>
            <Link
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-500 pointer-events-none focus:shadow-none'
              href='#'
              tabIndex={-1}
              aria-disabled='true'
            >
              Previous
            </Link>
          </li>

          <li className='page-item'>
            <a
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href='#'
            >
              1
            </a>
          </li>
          <li className='page-item active'>
            <a
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md'
              href='#'
            >
              2 <span className='visually-hidden'></span>
            </a>
          </li>
          <li className='page-item'>
            <a
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href='#'
            >
              3
            </a>
          </li>
          <li className='page-item'>
            <a
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href='#'
            >
              ...
            </a>
          </li>
                    <li className="page-item">
            <a
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
            >
              20
            </a>
          </li>
          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href='#'
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
