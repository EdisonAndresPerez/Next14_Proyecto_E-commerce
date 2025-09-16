import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Address {
  firstName: string
  lastName: string
  address: string
  address2?: string
  postalCode: string
  city: string
  country: string
  phone: string
  rememberAddress: boolean
}

interface AddressState {
  address: Address
  setAddress: (address: Address) => void
  clearAddress: () => void
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
        rememberAddress: false
      },
      setAddress: (address) => set({ address }),
      clearAddress: () =>
        set({
          address: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            postalCode: '',
            city: '',
            country: '',
            phone: '',
            rememberAddress: false
          }
        })
    }),
    {
      name: 'address-storage'
    }
  )
)
