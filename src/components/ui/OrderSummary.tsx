'use client'

import { CartProduct } from '@/interfaces'

interface Props {
  cart: CartProduct[]
  className?: string
}

export function OrderSummary({ cart, className = '' }: Props) {
  const totalProducts = cart.reduce((sum, product) => sum + product.quantity, 0)
  const subtotal = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0)
  const shipping = 0 // Gratis
  const tax = subtotal * 0.15 // 15% IVA
  const total = subtotal + shipping + tax

  return (
    <div className={`space-y-2 ${className}`}>
      <div className='flex justify-between'>
        <span>No. de productos:</span>
        <span>{totalProducts} {totalProducts === 1 ? 'Producto' : 'Productos'}</span>
      </div>
      <div className='flex justify-between'>
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className='flex justify-between'>
        <span>Envío:</span>
        <span>Gratis</span>
      </div>
      <div className='flex justify-between'>
        <span>IVA (15%):</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <hr />
      <div className='flex justify-between font-bold text-lg'>
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  )
}