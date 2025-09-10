'use client'

import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'
import { MdVerifiedUser, TfiMoney, FaAddressCard } from '@/components/icons'

const productsInCart = [
  { ...initialData.products[0], quantity: 1 },
  { ...initialData.products[10], quantity: 1 },
  { ...initialData.products[3], quantity: 1 }
]

export default function OrderPage() {
  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='mt-3 mb-6'>
        <h1 className='flex gap-2 items-center justify-center antialiased text-4xl font-semibold my-7'>
          <span>Orden No #123123 </span>
          <span className='flex items-center'>
            <MdVerifiedUser className='text-green-600' />
          </span>
        </h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        {/* Lista de productos */}

        <div className='lg:col-span-2'>
          {/* Título con rectángulo verde */}
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-1 h-8 bg-green-600 rounded'></div>
            <h2 className='text-2xl font-bold text-gray-800'>
              Productos comprados
            </h2>
          </div>

          <div className='space-y-4'>
            {productsInCart.map(product => (
              <div
                key={product.slug}
                className='flex gap-4 p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white'
              >
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.name}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                  className='rounded object-cover'
                />

                <div className='flex-1'>
                  <h3 className='font-semibold text-lg mb-2'>{product.name}</h3>
                  <div className='flex items-center gap-2 mb-4'></div>

                  <div className='flex items-center gap-2'>
                    <TfiMoney className='text-green-600 text-xl' />
                    <p className='text-green-600 font-bold text-xl'>
                      ${product.msrp} x {product.quantity}
                    </p>
                  </div>
                  <p className='font-bold text-gray-700'>
                    Subtotal: ${product.msrp * product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen del pedido */}

        <div className='lg:col-span-1'>
          <div className='bg-gray-50 rounded-xl shadow-xl p-7'>
            <div className='space-y-2 mb-4'>
              <div className='flex justify-between'>
                <span className='font-bold'>Direccion de entrega:</span>
              </div>
              <div className='flex justify-between'>
                <span>Edison Andres Perez Martinez:</span>
              </div>
              <div className='flex justify-between'>
                <span>Manzana B casa 520 Barrivo Gaitan</span>
              </div>
              <div className='flex justify-between'>
                <span>Ibague</span>
                <span>Colombia</span>
              </div>
              <div className='flex justify-between'>
                <span>Colombia</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-bold'>C.C 110465933</span>
                <span className='font-bold'>TEL 3507309929</span>
              </div>
              <hr />
              <div className='flex justify-between font-bold text-lg'>
                <span>Total:</span>
                <span>
                  $
                  {productsInCart
                    .reduce(
                      (sum, product) => sum + product.msrp * product.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>

            <h3 className='text-xl font-semibold mb-4'>Resumen del pedido</h3>

            <div className='space-y-2 mb-4'>
              <div className='flex justify-between'>
                <span>No de productos:</span>
                <span>3 Productos</span>
              </div>
              <div className='flex justify-between'>
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <div className='flex justify-between'>
                <span>Iva:</span>
                <span>15%</span>
              </div>
              <hr />
              <div className='flex justify-between font-bold text-lg'>
                <span>Total:</span>
                <span>
                  $
                  {productsInCart
                    .reduce(
                      (sum, product) => sum + product.msrp * product.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
            </div>

            <div className='flex justify-center text-center'>
              <Link
                href='/orders/12345'
                className='w-full bg-green-600 text-white p-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mx-auto flex items-center justify-center gap-2'
              >
                Pagado
                <FaAddressCard className='text-white text-lg' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
