import { Product } from '@/interfaces'
import React from 'react'
import { titleFont } from '@/config/fonts'
import { IoGameController, TfiMoney } from '@/components/icons'
import { Contador } from '@/components/products/contador/Contador'


interface Props {
  product: Product
  onQuantityChange?: (quantity: number) => void
  onAddToCart?: () => void
}


export const ProductDetails = ({ product, onQuantityChange, onAddToCart }: Props) => {
  return (
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
            <p className='text-2xl font-bold text-green-600'>{product.msrp}</p>
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

          <Contador
            productId={product.slug}
            initialValue={1}
            maxValue={product.inStock}
            inStock={product.inStock}
            showAddToCart={true}
            onQuantityChange={onQuantityChange}
            onAddToCart={onAddToCart}
            
          />
        </div>
      </div>
  )
}
