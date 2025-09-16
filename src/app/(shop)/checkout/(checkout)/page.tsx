'use client'

import { initialData } from '@/seed/seed'
import Image from 'next/image'
import Link from 'next/link'
import { MdVerifiedUser, TfiMoney } from '@/components/icons'
import { useCartStore } from '@/store/cart/cart-store'
import { CartProduct } from '@/interfaces'
import ProductsInCart from '../../cart/ui/ProductsInCart'


export default function CheckoutPage() {


  const { cart, updateProductQuantity, removeProductFromCart } = useCartStore()
  
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

          </div>
        </div>
      ))}
    </>
          </div>

        </div>

        {/* Resumen del pedido */}

        <div className='lg:col-span-1'>
          <div className='bg-gray-50 rounded-xl shadow-xl p-7'>
            <div className='space-y-2 mb-4'>
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
                  {cart
                    .reduce(
                      (sum, product) => sum + product.price * product.quantity,
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
                  {cart
                    .reduce(
                      (sum, product) => sum + product.price * product.quantity,
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
                Comprar
                <MdVerifiedUser className='text-white text-lg' />
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
              <label htmlFor='terms' className='text-xs text-gray-600 leading-relaxed'>
                Al realizar esta compra, acepto los{' '}
                <Link href='/terms' className='text-blue-600 hover:underline font-medium'>
                  Términos y Condiciones
                </Link>
                , la{' '}
                <Link href='/privacy' className='text-blue-600 hover:underline font-medium'>
                  Política de Privacidad
                </Link>{' '}
                y las{' '}
                <Link href='/refund' className='text-blue-600 hover:underline font-medium'>
                  Políticas de Devolución
                </Link>
                . Confirmo que la información proporcionada es veraz y autorizo el procesamiento de mis datos personales.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
