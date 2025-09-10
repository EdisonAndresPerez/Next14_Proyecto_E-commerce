import { create } from 'zustand'

interface State {
  isSideMenuOpen: boolean

  openSideMenu: () => void
  closeSideMenu: () => void
}

export const useUIStore = create<State>()(set => ({
  isSideMenuOpen: false,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false })
}))

interface CartProduct {
  id: string
  name: string
  quantity: number
}

interface CartState {
  products: CartProduct[]
  addProduct: (product: CartProduct) => void
  updateQuantity: (id: string, quantity: number) => void
  getProductQuantity: (id: string) => number
}

export const useCartStore = create<CartState>()((set, get) => ({
  products: [],
  addProduct: (product: CartProduct) =>
    set(state => ({
      products: [...state.products, product]
    })),
  updateQuantity: (id: string, quantity: number) =>
    set(state => ({
      products: state.products.map(p => (p.id === id ? { ...p, quantity } : p))
    })),
  getProductQuantity: (id: string) => {
    const product = get().products.find(p => p.id === id)
    return product ? product.quantity : 0
  }
}))
