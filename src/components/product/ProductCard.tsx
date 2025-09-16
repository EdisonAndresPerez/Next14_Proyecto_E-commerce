'use client'

import Image from 'next/image'
import Link from 'next/link'
import { TfiMoney } from '@/components/icons'
import { CartProduct } from '@/interfaces'
import { Contador } from '@/components'

interface Props {
  product: CartProduct
  showQuantityControls?: boolean
  showRemoveButton?: boolean
  onQuantityChange?: (product: CartProduct, quantity: number) => void
  onRemove?: (product: CartProduct) => void
  readOnly?: boolean
}

export function ProductCard({
  product,
  showQuantityControls = false,
  showRemoveButton = false,
  onQuantityChange,
  onRemove,
  readOnly = false
}: Props) {
  const handleQuantityChange = (newQuantity: number) => {
    if (onQuantityChange) {
      onQuantityChange(product, newQuantity)
    }
  }

  const handleRemove = () => {
    if (onRemove) {
      onRemove(product)
    }
  }

  return (
    <div className='flex gap-4 p-4 border rounded-lg shadow-xl mb-4'>
      <Image
        src={`/products/${product.image}`}
        alt={product.name}
        width={100}
        height={100}
        style={{
          width: '200px',
          height: '200px'
        }}
        className='rounded object-cover'
      />

      <div className='flex-1'>
        {readOnly ? (
          <span className='font-semibold text-lg mb-2 cursor-pointer'>
            {product.name}
          </span>
        ) : (
          <Link 
            href={`/product/${product.slug}`} 
            className='font-semibold text-lg mb-2 cursor-pointer hover:text-blue-600 transition-colors'
          >
            {product.name}
          </Link>
        )}

        {/* Plataforma */}
        {product.platform && (
          <div className='mb-2'>
            <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full uppercase font-bold'>
              {product.platform}
            </span>
          </div>
        )}

        <div className='flex items-center gap-2 mb-4'>
          <TfiMoney className='text-green-600 text-xl' />
          <p className='text-green-600 font-bold text-xl'>
            ${product.price}
          </p>
        </div>

        {showQuantityControls ? (
          <Contador
            productId={product.slug}
            initialValue={product.quantity}
            maxValue={product.maxStock || 99}
            inStock={product.maxStock || 99}
            onQuantityChange={handleQuantityChange}
            showAddToCart={false}
            className='max-w-md'
            readOnly={false}
            useExternalValue={true}
            currentValue={product.quantity}
          />
        ) : (
          <div className='flex items-center gap-2 mb-4'>
            <p className='font-bold'>Cantidad: {product.quantity}</p>
          </div>
        )}

        {showRemoveButton && (
          <button
            onClick={handleRemove}
            className='mt-4 text-red-500 hover:text-red-700 text-sm underline'
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  )
}