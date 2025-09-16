'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useAddressStore } from '@/store/address/address.store'
import { getUserAddress } from '@/actions'

interface Props {
  children: React.ReactNode
}

export function AddressSync({ children }: Props) {
  const { data: session } = useSession()
  const { setAddress } = useAddressStore()

  useEffect(() => {
    const syncAddressFromDB = async () => {
      if (!session?.user?.id) return

      try {
        const userAddress = await getUserAddress(session.user.id)
        if (userAddress) {
          setAddress({
            firstName: userAddress.firstName,
            lastName: userAddress.lastName,
            address: userAddress.address,
            address2: userAddress.address2 || '',
            postalCode: userAddress.postalCode,
            city: userAddress.city,
            country: userAddress.country,
            phone: userAddress.phone,
            rememberAddress: true // Si viene de BD, asumimos que quiere recordarla
          })
        }
      } catch (error) {
        console.error('Error syncing address from DB:', error)
      }
    }

    syncAddressFromDB()
  }, [session?.user?.id, setAddress])

  return <>{children}</>
}