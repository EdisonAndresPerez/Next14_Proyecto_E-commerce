'use client'

import { useCartStore } from '@/store/cart/cart-store'
import { CartProduct } from '@/interfaces'
import { useState, useEffect } from 'react'
import { ProductCard } from '@/components'

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

  if (!loaded) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500 text-lg'>Cargando carrito...</p>
      </div>
    )
  }

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
        <ProductCard
          key={product.slug}
          product={product}
          showQuantityControls={true}
          showRemoveButton={true}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemoveProduct}
        />
      ))}
    </>
  )
}
