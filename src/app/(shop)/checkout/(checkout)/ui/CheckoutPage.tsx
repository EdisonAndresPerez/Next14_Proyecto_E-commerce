'use client'

import Link from 'next/link'
import { MdVerifiedUser } from '@/components/icons'
import { useCartStore } from '@/store/cart/cart-store'
import { useAddressStore } from '@/store/address/address.store'
import { ProductCard, OrderSummary } from '@/components'
import { PlaceOrder } from './PlaceOrder'

export default function CheckoutPage() {
  const { cart } = useCartStore()
  const { address } = useAddressStore()

  // Verificar si la dirección está configurada
  const isAddressConfigured = address.firstName && address.address && address.city && address.country

  if (cart.length === 0) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='text-center py-8'>
          <h1 className='text-2xl font-bold mb-4'>Tu carrito está vacío</h1>
          <p className='text-gray-500 mb-4'>
            Agrega algunos productos para continuar con tu compra
          </p>
          <Link
            href='/'
            className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='mt-3 mb-6'>
        <h1 className='flex gap-2 items-center justify-center antialiased text-4xl font-semibold my-7'>
          <span>Verificar orden</span>
          <span className='flex items-center'>
            <MdVerifiedUser className='text-green-600' />
          </span>
        </h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        {/* Lista de productos */}
        <div className='lg:col-span-2'>
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold mb-4'>Productos en tu pedido</h2>
                        <Link
              href='/cart'
              className='underline mb-5 text-blue-600 hover:text-blue-800'
            >
              Editar productos
            </Link>
            {cart.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                readOnly={true}
              />
            ))}
          </div>
        </div>

        {/* Resumen del pedido y dirección */}
        <div className='lg:col-span-1'>
          <div className='bg-gray-50 rounded-xl shadow-xl p-7'>
            {/* Dirección de entrega */}
            <h3 className='text-xl font-semibold mb-4'>Dirección de entrega</h3>
            <PlaceOrder className='mb-4' />
            {!isAddressConfigured && (
              <Link
                href='/checkout/address'
                className='text-blue-600 hover:underline text-sm block text-center py-2 bg-blue-50 rounded-lg'
              >
                ⚠️ Configurar dirección de entrega
              </Link>
            )}
            
            <hr className='my-4' />

            {/* Resumen del pedido */}
            <h3 className='text-xl font-semibold mb-4'>Resumen del pedido</h3>
            <OrderSummary cart={cart} className='mb-4' />

            <div className='flex justify-center text-center'>
              <Link
                href='/orders/12345'
                className={`w-full p-4 py-3 rounded-lg font-semibold transition-colors mx-auto flex items-center justify-center gap-2 ${
                  isAddressConfigured
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={(e) => {
                  if (!isAddressConfigured) {
                    e.preventDefault()
                    alert('Por favor configura tu dirección de entrega antes de continuar')
                  }
                }}
              >
                Comprar
                <MdVerifiedUser className='text-current text-lg' />
              </Link>
            </div>

            {/* Términos y condiciones */}
            <div className='mt-4 flex items-start gap-2'>
              <input
                type='checkbox'
                id='terms'
                className='mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
                defaultChecked
              />
              <label
                htmlFor='terms'
                className='text-xs text-gray-600 leading-relaxed'
              >
                Al realizar esta compra, acepto los{' '}
                <Link
                  href='/terms'
                  className='text-blue-600 hover:underline font-medium'
                >
                  Términos y Condiciones
                </Link>
                , la{' '}
                <Link
                  href='/privacy'
                  className='text-blue-600 hover:underline font-medium'
                >
                  Política de Privacidad
                </Link>{' '}
                y las{' '}
                <Link
                  href='/refund'
                  className='text-blue-600 hover:underline font-medium'
                >
                  Políticas de Devolución
                </Link>
                . Confirmo que la información proporcionada es veraz y autorizo
                el procesamiento de mis datos personales.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
