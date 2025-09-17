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
  const { address, setAddress } = useAddressStore()

  useEffect(() => {
    const syncAddressFromDB = async () => {
      if (!session?.user?.id) return

      // Verificar si el store está vacío usando el hook
      const isEmpty = !address.firstName && !address.address

      if (!isEmpty) {
        console.log('AddressSync: Store ya tiene datos, no sincronizando')
        return
      }

      console.log('AddressSync: Store vacío, sincronizando desde BD...')

      try {
        const userAddress = await getUserAddress(session.user.id)

        // Verificar que userAddress existe y tiene las propiedades correctas
        if (
          userAddress &&
          'firstName' in userAddress &&
          userAddress.firstName
        ) {
          console.log('AddressSync: Datos obtenidos de BD:', userAddress)
          setAddress({
            firstName: userAddress.firstName,
            lastName: userAddress.lastName,
            address: userAddress.address,
            address2: userAddress.address2 || '',
            postalCode: userAddress.postalCode,
            city: userAddress.city,
            country: userAddress.country,
            phone: userAddress.phone,
            rememberAddress: true
          })
        } else {
          console.log(
            'AddressSync: No hay dirección válida en BD o hay error:',
            userAddress
          )
        }
      } catch (error) {
        console.error('AddressSync: Error syncing address from DB:', error)
      }
    }

    syncAddressFromDB()
  }, [session?.user?.id, address.firstName, address.address, setAddress])

  return <>{children}</>
}
