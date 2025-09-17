'use server'

import { auth } from '@/auth.config'
import { Address } from '@/interfaces'

interface ProductToOrder {
  productId: string
  quantity: number
  price: number
}

export const PlaceOrder = async (
  productIds: ProductToOrder,
  address: Address
) => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return {
      ok: 'false',
      message: 'Usuario no autenticado'
    }
  }

  console.log({ productIds, address, userId })
}
