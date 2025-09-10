'use client'

import { FaCartShopping } from 'react-icons/fa6'
import { TfiMoney } from '@/components/icons'
import { Contador, Title } from '@/components'
import Link from 'next/link'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import { redirect } from 'next/navigation'



const productsInCart = [
  { ...initialData.products[0], quantity: 1 },
  { ...initialData.products[10], quantity: 1 },
  { ...initialData.products[3], quantity: 1 }
]

export default function CartPage() {
  const handleQuantityChange = (productSlug: string, newQuantity: number) => {
    console.log(`Producto: ${productSlug}, Nueva cantidad: ${newQuantity}`)
    // Aquí actualizarías el estado del carrito
  }


//redirect('/empty') 


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
            {productsInCart.map(product => (
              <div
                key={product.slug}
                className='flex gap-4 p-4 border rounded-lg shadow-xl'
              >
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.name}
                  width={100}
                  height={100}
                  style={{
                    width: '200px',
                    height: '200px'
                  }}
                  className='rounded object-cover'
                />

                <div className='flex-1 '>
                  <h3 className='font-semibold text-lg mb-2'>{product.name}</h3>
                  <div className='flex items-center gap-2 mb-4'>
                    <TfiMoney className='text-green-600 text-xl' />
                    <p className='text-green-600 font-bold text-xl'>
                      ${product.msrp}
                    </p>
                  </div>

                  <Contador
                    productId={product.slug}
                    initialValue={product.quantity}
                    maxValue={product.inStock}
                    onQuantityChange={quantity =>
                      handleQuantityChange(product.slug, quantity)
                    }
                    showAddToCart={false}
                    className='max-w-md'
                  />

                  <button className='mt-4 text-red-500 hover:text-red-700 text-sm underline'>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className='lg:col-span-1'>
          <div className='bg-gray-50 rounded-xl shadow-xl p-7 mt-20'>
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
