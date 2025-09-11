'use client'

import { notFound } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ProductSlideshow } from '@/components'
import { ProductDetails } from '@/components'
import { getProductBySlug } from '@/actions'
import { Product } from '@/interfaces'

interface Props {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: Readonly<Props>) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  const { slug } = params

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await getProductBySlug(slug)
        if (result.ok && result.product) {
          setProduct(result.product)
        } else {
          setProduct(null)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

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
      />
    </div>
  )
}
