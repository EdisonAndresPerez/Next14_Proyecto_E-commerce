'use client'

import { useState } from 'react'

import Link from 'next/link'
import { MdVerifiedUser } from '@/components/icons'
import { useCartStore } from '@/store/cart/cart-store'
import { useAddressStore } from '@/store/address/address.store'
import { ProductCard, OrderSummary } from '@/components'
import { PlaceOrder } from '@/actions'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { cart } = useCartStore()
  const { address } = useAddressStore()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const router = useRouter()

  const isAddressConfigured =
    address.firstName && address.address && address.city && address.country

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)

    // Console.log de la dirección y productos
    console.log('=== DATOS DE LA ORDEN ===')
    console.log('Dirección:', address)
    console.log(
      'Productos:',
      cart.map(product => ({
        nombre: product.name,
        precio: product.price,
        cantidad: product.quantity,
        subtotal: (product.price * product.quantity).toFixed(2),
        slug: product.slug
      }))
    )
    console.log('========================')

const productsToOrder = cart.map(product => ({
  productId: product.id,  
  quantity: product.quantity,
  price: product.price
}))



    const resp  = await PlaceOrder(productsToOrder, address)
    console.log(resp)


    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsPlacingOrder(false)
    router.push('/orders/12345')
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
            <h2 className='text-xl font-semibold mb-4'>
              Productos en tu pedido
            </h2>
            <Link
              href='/cart'
              className='underline mb-5 text-blue-600 hover:text-blue-800'
            >
              Editar productos
            </Link>
            {cart.map(product => (
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
            <div className='mb-4 p-3 bg-white rounded-lg border'>
              <p className='text-sm text-gray-600'>
                <strong>{address.firstName} {address.lastName}</strong><br/>
                {address.address} {address.address2}<br/>
                {address.city}, {address.postalCode}<br/>
                {address.country}<br/>
                Tel: {address.phone}
              </p>
            </div>
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
              <button
                onClick={onPlaceOrder}
                disabled={!isAddressConfigured || isPlacingOrder}
                className={`w-full p-4 py-3 rounded-lg font-semibold transition-colors mx-auto flex items-center justify-center gap-2 ${
                  isAddressConfigured && !isPlacingOrder
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isPlacingOrder ? 'Procesando...' : 'Comprar'}
                <MdVerifiedUser className='text-current text-lg' />
              </button>
            </div>{' '}
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
