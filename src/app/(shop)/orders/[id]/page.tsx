import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { MdVerifiedUser, TfiMoney, FaAddressCard } from '@/components/icons'
import { getOrderById } from '@/actions'

interface Props {
  params: {
    id: string
  }
}

export default async function OrderPage({ params }: Props) {
  const { id } = params
  
  // Obtener la orden desde la base de datos
  const { ok, order } = await getOrderById(id)
  
  if (!ok || !order) {
    redirect('/')
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='mt-3 mb-6'>
        <h1 className='flex gap-2 items-center justify-center antialiased text-4xl font-semibold my-7'>
          <span>Orden #{order.id.split('-')[0]}</span>
          <span className='flex items-center'>
            {order.isPaid ? (
              <MdVerifiedUser className='text-green-600' />
            ) : (
              <MdVerifiedUser className='text-red-600' />
            )}
          </span>
        </h1>
        
        {/* Estado de pago */}
        <div className='flex justify-center mb-6'>
          <div className={`px-4 py-2 rounded-full text-white font-semibold ${
            order.isPaid ? 'bg-green-600' : 'bg-red-600'
          }`}>
            {order.isPaid ? '✅ Pagado' : '❌ Pendiente de pago'}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        {/* Lista de productos */}
        <div className='lg:col-span-2'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-1 h-8 bg-green-600 rounded'></div>
            <h2 className='text-2xl font-bold text-gray-800'>
              Productos comprados
            </h2>
          </div>

          <div className='space-y-4'>
            {order.orderItems.map((item, index) => {
              // Validación de imagen
              const imageSrc = item.product.image || '/imgs/starman_750x750.png'
              
              return (
                <div
                  key={`${item.product.slug}-${index}`}
                  className='flex gap-4 p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors bg-white'
                >
                  <Image
                    src={imageSrc}
                    alt={item.product.name || 'Producto'}
                    width={100}
                    height={100}
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                    className='rounded object-cover'
                  />

                  <div className='flex-1'>
                    <h3 className='font-semibold text-lg mb-2'>{item.product.name}</h3>

                    <div className='flex items-center gap-2'>
                      <TfiMoney className='text-green-600 text-xl' />
                      <p className='text-green-600 font-bold text-xl'>
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <p className='font-bold text-gray-700'>
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className='lg:col-span-1'>
          <div className='bg-gray-50 rounded-xl shadow-xl p-7'>
            {/* Dirección de entrega */}
            {order.orderAddress && (
              <>
                <div className='space-y-2 mb-4'>
                  <div className='flex justify-between'>
                    <span className='font-bold'>Dirección de entrega:</span>
                  </div>
                  <div>
                    <span className='font-semibold'>
                      {order.orderAddress.firstName} {order.orderAddress.lastName}
                    </span>
                  </div>
                  <div>
                    <span>{order.orderAddress.address}</span>
                    {order.orderAddress.address2 && (
                      <span>, {order.orderAddress.address2}</span>
                    )}
                  </div>
                  <div>
                    <span>{order.orderAddress.city}</span>
                  </div>
                  <div>
                    <span>{order.orderAddress.country}</span>
                  </div>
                  <div>
                    <span className='font-bold'>CP: {order.orderAddress.postalCode}</span>
                  </div>
                  <div>
                    <span className='font-bold'>TEL: {order.orderAddress.phone}</span>
                  </div>
                </div>
                <hr className='my-4' />
              </>
            )}

            <h3 className='text-xl font-semibold mb-4'>Resumen del pedido</h3>

            <div className='space-y-2 mb-4'>
              <div className='flex justify-between'>
                <span>No. de productos:</span>
                <span>{order.itemsInOrder} productos</span>
              </div>
              <div className='flex justify-between'>
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between'>
                <span>IVA (15%):</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className='flex justify-between font-bold text-lg'>
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className='flex justify-center text-center'>
              <div
                className={`w-full p-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                  order.isPaid
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
              >
                {order.isPaid ? 'Pagado' : 'Pendiente de pago'}
                <FaAddressCard className='text-white text-lg' />
              </div>
            </div>
            
            {/* Información adicional */}
            <div className='mt-4 text-sm text-gray-600'>
              <p>Fecha de orden: {new Date(order.createdAt).toLocaleDateString('es-ES')}</p>
              {order.paidAt && (
                <p>Fecha de pago: {new Date(order.paidAt).toLocaleDateString('es-ES')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
