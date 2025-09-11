import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartProduct } from '@/interfaces'

interface CartState {
  // Estado
  cart: CartProduct[]

  getTotalItems: () => number
  getSummaryInformation: () => {
    subTotal: number
    tax: number
    total: number
    itemsInCart: number
  }

  // Actions
  addProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProductFromCart: (product: CartProduct) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      // Getters
      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },

      getSummaryInformation: () => {
        const { cart } = get()

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        )

        const tax = subTotal * 0.15 // 15% de impuesto
        const total = subTotal + tax
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        )

        return {
          subTotal,
          tax,
          total,
          itemsInCart
        }
      },

      // Actions
      addProductToCart: (product: CartProduct) => {
        const { cart } = get()

        const productInCart = cart.find(item => item.id === product.id)

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        const maxStock = product.maxStock || 99
        if (productInCart.quantity >= maxStock) {
          return
        }

        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + product.quantity }
          }
          return item
        })

        set({ cart: updatedCartProducts })
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get()

        if (quantity <= 0) {
          get().removeProductFromCart(product)
          return
        }

        const maxStock = product.maxStock || 99
        const finalQuantity = Math.min(quantity, maxStock)

        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id) {
            return { ...item, quantity: finalQuantity }
          }
          return item
        })

        set({ cart: updatedCartProducts })
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get()
        const updatedCartProducts = cart.filter(item => item.id !== product.id)
        set({ cart: updatedCartProducts })
      },

      clearCart: () => {
        set({ cart: [] })
      }
    }),
    {
      name: 'shopping-cart',
      partialize: state => ({ cart: state.cart })
    }
  )
)
