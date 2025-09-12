'use client'

import { FaCartShopping } from 'react-icons/fa6'
import { Title } from '@/components'
import Link from 'next/link'
import ProductsInCart from './ui/ProductsInCart'
import { useCartStore } from '@/store/cart/cart-store'
import { redirect } from 'next/navigation'
import { useIsMounted } from './hook/useIsMounted'
import ProductsSummary from './ui/ProductsSummary'

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

        <ProductsSummary/>



        </div>
      </div>
    </div>
  )
}
