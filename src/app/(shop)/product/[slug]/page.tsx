'use client'

import { notFound } from 'next/navigation'
import { titleFont } from '@/config/fonts'
import { initialData } from '@/seed/seed'
import { IoGameController, TfiMoney } from '@/components/icons'
import { useState } from 'react'
import { ProductSlideshow } from '@/components'


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

  const handleSumar = () => {
    if (count < product.inStock) {
      setCount(count + 1)
      console.log(`Cantidad aumentada a: ${count + 1}`)
    }
  }

  const handleRestar = () => {
    if (count > 1) {
      setCount(count - 1)
      console.log(`Cantidad reducida a: ${count - 1}`)
    }
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
      <div className='col-span-1 px-5 bg-white rounded-lg shadow-lg border'>
        {/* Título del producto */}
        <div className='flex items-center gap-3 mb-6'>
          <h1
            className={`${titleFont.className} antialiased font-bold text-xl md:text-2xl text-gray-800 flex-1`}
          >
            {product.name}
          </h1>
          <IoGameController className='text-3xl md:text-4xl flex-shrink-0 text-blue-600' />
        </div>

        {/* Precio */}
        <div className='mb-4'>
          <span className='text-sm font-semibold text-gray-600'>PRECIO:</span>
          <div className='flex items-center gap-2'>
            <TfiMoney className='text-2xl text-green-600' />
            <p className='text-2xl font-bold text-green-600'>${product.msrp}</p>
          </div>
        </div>

        {/* Descripción */}
        <div className='mb-4'>
          <span className='text-sm font-semibold text-gray-600'>
            DESCRIPCIÓN:
          </span>
          <p className='text-base leading-relaxed'>{product.description}</p>
        </div>

        {/* Tags/Etiquetas */}
        <div className='mb-4'>
          <span className='text-sm font-semibold text-gray-600'>
            CARACTERÍSTICAS:
          </span>
          <div className='flex flex-wrap gap-2 mt-2'>
            {product.tags.map(tag => (
              <span
                key={tag}
                className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Información técnica */}
        <div className='space-y-2 mb-6'>
          <div className='flex justify-between'>
            <span className='text-sm font-semibold text-gray-600'>
              PLATAFORMA:
            </span>
            <span className='text-sm uppercase font-bold text-blue-600'>
              {product.platform}
            </span>
          </div>

          <div className='flex justify-between'>
            <span className='text-sm font-semibold text-gray-600'>GÉNERO:</span>
            <span className='text-sm capitalize'>{product.genre}</span>
          </div>

          <div className='flex justify-between'>
            <span className='text-sm font-semibold text-gray-600'>
              DISPONIBILIDAD:
            </span>
            <span
              className={`text-sm font-bold ${
                product.inStock > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {product.inStock > 0 ? `${product.inStock} en stock` : 'Agotado'}
            </span>
          </div>

          <div className='flex justify-between'>
            <span className='text-sm font-semibold text-gray-600'>SKU:</span>
            <span className='text-sm text-white-500'>{product.slug}</span>
          </div>

          <div className='flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border-2 border-blue-200'>
            <span className='text-sm font-bold text-gray-800 flex items-center gap-2'>
              🛒 CANTIDAD:
            </span>
            <span className='text-lg font-bold text-blue-600 bg-white px-2 py-1 rounded'>{count}</span>
          </div>
        </div>

        <div className='flex gap-2 items-center'>
          {/* Botón de agregar al carrito */}
          <button
            className={`flex-1 py-3 px-4 mb-2 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              product.inStock > 0
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={product.inStock === 0}
          >
            {product.inStock > 0 ? 'Agregar al Carrito' : 'Producto Agotado'}
          </button>

          {/* Controles de cantidad */}
          <div className='flex flex-col gap-1'>
            {/* Botón de agregar mas */}
            <button
              className='bg-green-500 text-white px-3 py-1 rounded-md text-sm transition-all duration-300 transform hover:scale-105 hover:bg-green-600'
              onClick={handleSumar}
            >
              +
            </button>

            {/* Botón de agregar menos */}
            <button
              className='bg-red-500 text-white px-3 py-1 rounded-md text-sm transition-all duration-300 transform hover:scale-105 hover:bg-red-600'
              onClick={handleRestar}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
