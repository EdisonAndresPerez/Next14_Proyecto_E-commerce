'use client'

import { useEffect, useState } from 'react'
import { useAddressStore } from '@/store/address/address.store'
import { set } from 'zod'

interface Props {
  className?: string
}

export function PlaceOrder({ className = '' }: Props) {
  const [loading, setLoading] = useState(false)

  const { address } = useAddressStore()

  useEffect(() => {
    setLoading(true)
  }, [])

  if (!loading) {
    return <p>cargando....</p>
  }

  const isAddressConfigured =
    address.firstName && address.address && address.city && address.country

  if (!isAddressConfigured) {
    return (
      <div className={`text-center py-4 text-gray-500 ${className}`}>
        <p>No hay dirección de entrega configurada</p>
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className='flex justify-between'>
        <span className='font-semibold'>
          {address.firstName} {address.lastName}
        </span>
      </div>
      <div className='flex flex-col'>
        <span>{address.address}</span>
        {address.address2 && <span>{address.address2}</span>}
      </div>
      <div className='flex justify-between'>
        <span>
          {address.city}, {address.postalCode}
        </span>
      </div>
      <div className='flex justify-between'>
        <span>{address.country}</span>
      </div>
      <div className='flex justify-between'>
        <span className='font-bold'>Tel: {address.phone}</span>
      </div>
    </div>
  )
}
