'use client'

import { notFound } from 'next/navigation'
import { initialData } from '@/seed/seed'
import { useState } from 'react'
import { ProductSlideshow } from '@/components'
import { ProductDetails } from '@/components'
interface Props {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: Readonly<Props>) {
  const [count, setCount] = useState(1)

  const { slug } = params
  const product = initialData.products.find(product => product.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4'>

      {/* slideshow  */}
      <div className='col-span-1 md:col-span-2'>
        <ProductSlideshow
          name={product.name}
          images={product.images}
          className='mb-5'
        />
      </div>

      {/* detalles  */}
    <ProductDetails
      product={product}
      onQuantityChange={setCount}
      onAddToCart={() => console.log('Agregar al carrito')}
    />




   
    </div>
  )
}
