'use client'


import { useCartStore } from '@/store/index'
import {RiShoppingCartFill} from '@/components/icons'

interface Props {
  productId: string
  initialValue?: number
  maxValue?: number
  onQuantityChange?: (quantity: number) => void
  showAddToCart?: boolean
  inStock?: number
  onAddToCart?: () => void
  className?: string
  readOnly?: boolean
}

export const Contador = ({
  productId,
  initialValue = 1,
  maxValue = 99,
  onQuantityChange,
  showAddToCart = false,
  inStock = 0,
  onAddToCart,
  className = '',
  readOnly = false
}: Props) => {


  const { updateQuantity, getProductQuantity } = useCartStore()

  const currentQuantity = getProductQuantity(productId) || initialValue

  const handleSumar = () => {
    if (currentQuantity < maxValue && currentQuantity < inStock) {
      const newCount = currentQuantity + 1
      updateQuantity(productId, newCount)
      onQuantityChange?.(newCount)
    }
  }

  const handleRestar = () => {
    if (currentQuantity > 1) {
      const newCount = currentQuantity - 1
      updateQuantity(productId, newCount)
      onQuantityChange?.(newCount)
    }
  }

  const handleAddToCart = () => {
    console.log('agregado')
    onAddToCart?.()
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Mostrar cantidad - versión más compacta */}
      <div className='flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 p-2 rounded-md border border-blue-200'>
        <span className='text-xs font-bold text-gray-700 flex items-center gap-1'>
          🛒 CANTIDAD:
        </span>
        <span className='text-sm font-bold text-blue-600 bg-white px-2 py-1 rounded text-center min-w-[30px]'>
          {currentQuantity}
        </span>
      </div>

      {/* Controles */}
      <div className='flex gap-2 items-center'>
        {!readOnly && (
          <>
            {/* Botón de restar */}
            <button
              className='bg-red-500 text-white w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-110 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
              onClick={handleRestar}
              disabled={currentQuantity <= 1}
            >
              -
            </button>

            {/* Botón de sumar */}
            <button
              className='bg-green-500 text-white w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-110 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
              onClick={handleSumar}
              disabled={currentQuantity >= maxValue || currentQuantity >= inStock}
            >
              +
            </button>
          </>
        )}
      </div>

      {/* Botón de agregar al carrito */}
      {showAddToCart && !readOnly && (
        <button
          className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          onClick={handleAddToCart}
          disabled={currentQuantity === 0 || inStock === 0}
        >
          <RiShoppingCartFill className='text-lg' />
          Agregar al carrito
        </button>
      )}
    </div>
  )
}

export default Contador
