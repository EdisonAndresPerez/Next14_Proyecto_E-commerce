'use server'

import { auth } from '@/auth.config'
import { Address } from '@/interfaces'
import { prisma } from '@/lib/prisma'
import { th } from 'zod/locales'

interface ProductToOrder {
  productId: string
  quantity: number
  price: number
}

export const PlaceOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return {
      ok: false,
      message: 'Usuario no autenticado'
    }
  }


  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map( p => p.productId)
      }
    }
  })
 //console.log(products)


  const itemsInOrder = productIds.reduce(( count, p ) => count + p.quantity, 0)
  console.log({ itemsInOrder })



  const {subTotal, tax, total} = productIds.reduce((totals, item) => {


    const productQuantity = item.quantity;
    const product = products.find(p => p.id === item.productId)


      if (!product) throw new Error('Producto no encontrado')


        const subTotal = product.msrp * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

  return totals;
  }, {subTotal: 0, tax: 0, total: 0})


console.log ({subTotal, tax, total})



  //console.log({ productIds, address, userId })
  return {
    ok: true,
    message: 'Orden creada exitosamente',
    orderId: '12345' 
  }
}
