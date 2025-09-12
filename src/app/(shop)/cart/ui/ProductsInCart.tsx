'use client'

import Image from 'next/image'
import { TfiMoney } from '@/components/icons'
import { Contador } from '@/components'
import { useCartStore } from '@/store/cart/cart-store'
import { CartProduct } from '@/interfaces'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProductsInCart() {
  const [loaded, setLoaded] = useState(false)

  const { cart, updateProductQuantity, removeProductFromCart } = useCartStore()

  const handleQuantityChange = (product: CartProduct, newQuantity: number) => {
    console.log(`Producto: ${product.slug}, Nueva cantidad: ${newQuantity}`)
    updateProductQuantity(product, newQuantity)
  }

  const handleRemoveProduct = (product: CartProduct) => {
    removeProductFromCart(product)
  }

  useEffect(() => {
    setLoaded(true)
  }, [])


  if (cart.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500 text-lg'>Tu carrito está vacío</p>
        <p className='text-sm text-gray-400'>
          ¡Agrega algunos productos para comenzar!
        </p>
      </div>
    )
  }
  return (
    <>
      {cart.map((product: CartProduct) => (
        <div
          key={product.slug}
          className='flex gap-4 p-4 border rounded-lg shadow-xl mb-4'
        >
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
            <Link href={`/product/${product.slug}`} className='font-semibold text-lg mb-2 cursor-pointer'>{product.name}</Link>

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

            <Contador
              productId={product.slug}
              initialValue={product.quantity}
              maxValue={product.maxStock || 99}
              inStock={product.maxStock || 99}
              onQuantityChange={quantity =>
                handleQuantityChange(product, quantity)
              }
              showAddToCart={false}
              className='max-w-md'
              readOnly={false}
              useExternalValue={true}
              currentValue={product.quantity}
            />

            <button
              onClick={() => handleRemoveProduct(product)}
              className='mt-4 text-red-500 hover:text-red-700 text-sm underline'
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
