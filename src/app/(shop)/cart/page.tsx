'use client'

import { FaCartShopping } from 'react-icons/fa6'
import { Title } from '@/components'
import Link from 'next/link'
import ProductsInCart from './ui/ProductsInCart'
import { useCartStore } from '@/store/cart/cart-store'
import { redirect } from 'next/navigation'
import { useIsMounted } from './hook/useIsMounted'

export default function CartPage() {
  const mounted = useIsMounted()

  const { cart, getSummaryInformation } = useCartStore()
  const { subTotal, tax, total, itemsInCart, products } = getSummaryInformation()

  if (!mounted) return <p>Cargando...</p>

  if (cart.length === 0) {
    redirect('/empty')
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8 '>
      <div className='flex items-center gap-4 mb-6 '>
        <Title title='Mis Compras' showIcon={false} className='mb-0' />
        <FaCartShopping className='text-4xl md:text-5xl text-blue-600 mt-3' />
      </div>
      <hr className='mb-6 bg-slate-950 h-1 border-0' />

      <div className='grid grid-cols-2 lg:grid-cols-3 gap-10'>
        {/* Carrito - Items */}
        <div className='lg:col-span-2'>
          <div className='flex flex-col mt-5 mb-8'>
            <span className='text-xl font-semibold'>
              Agregar más juegos a mi carrito
            </span>
            <Link
              href='/'
              className='underline mb-5 text-blue-600 hover:text-blue-800'
            >
              Continuar comprando
            </Link>
          </div>

          {/* Lista de productos */}
          <div className='space-y-6'>
            <ProductsInCart />
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className='lg:col-span-1'>
          <div className='bg-gray-50 rounded-xl shadow-xl p-7 mt-20'>
            <h3 className='text-xl font-semibold mb-4'>Resumen del pedido</h3>

            <div className='space-y-2 mb-4'>
              <div className='flex justify-between'>
                <span>No de productos:</span>
                <span>{itemsInCart} Productos</span>
              </div>
              <div className='flex justify-between'>
                <span>productos:</span>
                <span>{products} Productos</span>
              </div>
              <div className='flex justify-between'>
                <span>Subtotal:</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Impuestos (15%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <hr />
              <div className='flex justify-between font-bold text-lg'>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className='flex justify-center text-center'>
              <Link
                href='/checkout/address'
                className='w-full bg-blue-600 text-white p-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mx-auto'
              >
                Proceder al pago
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
