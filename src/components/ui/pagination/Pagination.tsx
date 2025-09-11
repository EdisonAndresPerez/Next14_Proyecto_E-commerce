'use client'

import { GeneratePaginationNumber } from '@/utils/generatePaginationNumbers'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const allPages = GeneratePaginationNumber(currentPage, totalPages)
  console.log({ allPages })


  console.log({ pathname, searchParams, currentPage, totalPages })

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (pageNumber === '...') {
      return '#'
    }

    if (+pageNumber <= 0 || +pageNumber > totalPages) {
      return '#'
    }

    if (+pageNumber === 1) {
      params.delete('page')
    } else {
      params.set('page', pageNumber.toString())
    }

    return `${pathname}?${params.toString()}`
  }

  const generatePages = () => {
    const pages = []
    
    if (currentPage > 2) {
      pages.push(1)
      if (currentPage > 3) pages.push('...')
    }
    
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      pages.push(i)
    }
    
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) pages.push('...')
      pages.push(totalPages)
    }
    
    return pages
  }

  const pages = generatePages()

  return (
    <div className='flex justify-center mt-8 mb-32'>
      <nav aria-label='Page navigation'>
        <ul className='flex list-style-none'>
          {/* Previous Button */}
          <li className='page-item'>
            <Link
              className={`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 focus:shadow-none ${
                currentPage <= 1 
                  ? 'text-gray-500 pointer-events-none' 
                  : 'text-gray-800 hover:text-gray-800 hover:bg-gray-200'
              }`}
              href={createPageUrl(currentPage - 1)}
            >
              Previous
            </Link>
          </li>

          {/* Page Numbers */}
          {allPages.map((page, index) => (
            <li key={`page-${index}`} className='page-item'>
              <Link
                className={`page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 focus:shadow-none ${
                  page === currentPage
                    ? 'bg-blue-600 text-white hover:bg-blue-600 hover:text-white shadow-md'
                    : page === '...'
                    ? 'bg-transparent text-gray-500 pointer-events-none'
                    : 'bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200'
                }`}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          {/* Next Button */}
          <li className='page-item'>
            <Link
              className={`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 focus:shadow-none ${
                currentPage >= totalPages
                  ? 'text-gray-500 pointer-events-none'
                  : 'text-gray-800 hover:text-gray-800 hover:bg-gray-200'
              }`}
              href={createPageUrl(currentPage + 1)}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
