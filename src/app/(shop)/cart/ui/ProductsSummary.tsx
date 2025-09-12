import { redirect } from 'next/navigation'
import { useCartStore } from '@/store/cart/cart-store'
import Link from 'next/link'


export default function ProductsSummary() {
  const { cart, getSummaryInformation } = useCartStore()
  const { subTotal, tax, total, itemsInCart, products } =
    getSummaryInformation()

  if (cart.length === 0) {
    redirect('/empty')
  }

  return (
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
  )
}
