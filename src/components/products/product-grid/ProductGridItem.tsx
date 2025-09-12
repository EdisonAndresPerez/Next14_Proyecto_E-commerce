'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ProductGridItemProps } from '@/interfaces'
import { TfiMoney } from '@/components/icons'

export const ProductGridItem = ({
  product,
  className = ''
}: ProductGridItemProps) => {
  const [loaded, setLoaded] = useState(false)
  const [displayImage, setDisplayImage] = useState(product.images[0])

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className={`rounded-md overflow-hidden fade-in ${className}`}>
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.name}
          className='w-full object-cover rounded'
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>

      <div className='p-4 flex flex-col space-y-3'>
        <Link
          className='hover:text-blue-600 transition-colors duration-200 font-semibold text-gray-800 line-clamp-2'
          href={`/product/${product.slug}`}
        >
          {product.name}
        </Link>

        {/* Precio y Stock */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1'>
            <TfiMoney className='text-green-600 text-lg' />
            <span className='font-bold text-xl text-green-600'>
              {product.msrp}
            </span>
          </div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              product.inStock > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.inStock > 0 ? `${product.inStock} disponibles` : 'Agotado'}
          </span>
        </div>

        {/* Información adicional */}
        <div className='flex justify-between items-center text-xs text-gray-500'>
          <span className='bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium'>
            {product.platform.toUpperCase()}
          </span>
          <span className='capitalize'>{product.genre}</span>
        </div>
      </div>
    </div>
  )
}
