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

// Store separado para manejar cantidades temporales en los contadores
interface TemporaryQuantityState {
  quantities: Record<string, number>
  updateQuantity: (id: string, quantity: number) => void
  getQuantity: (id: string) => number
  clearQuantity: (id: string) => void
}

export const useTemporaryQuantityStore = create<TemporaryQuantityState>()((set, get) => ({
  quantities: {},
  
  updateQuantity: (id: string, quantity: number) =>
    set(state => ({
      quantities: { ...state.quantities, [id]: quantity }
    })),
    
  getQuantity: (id: string) => {
    const quantities = get().quantities
    return quantities[id] || 1 // Por defecto 1
  },
  
  clearQuantity: (id: string) =>
    set(state => {
      const newQuantities = { ...state.quantities }
      delete newQuantities[id]
      return { quantities: newQuantities }
    })
}))