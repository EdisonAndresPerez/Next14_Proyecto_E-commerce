'use server'

import { auth } from '@/auth.config'
import { Address } from '@/interfaces'
import { prisma } from '@/lib/prisma'

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

  // Obtener productos de la base de datos
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map(p => p.productId)
      }
    }
  })

  // Calcular totales
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0)
  
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity
      const product = products.find(p => p.id === item.productId)

      if (!product) throw new Error(`Producto ${item.productId} no encontrado`)

      const subTotal = product.msrp * productQuantity

      totals.subTotal += subTotal
      totals.tax += subTotal * 0.15
      totals.total += subTotal * 1.15

      return totals
    },
    { subTotal: 0, tax: 0, total: 0 }
  )

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Crear la orden
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subtotal: subTotal,
          tax: tax,
          total: total,

          // 2. Crear los items de la orden
          orderItems: {
            createMany: {
              data: productIds.map(p => ({
                quantity: p.quantity,
                price: products.find(product => product.id === p.productId)?.msrp ?? 0,
                productId: p.productId
              }))
            }
          },

          // 3. Crear la dirección de la orden
          orderAddress: {
            create: {
              firstName: address.firstName,
              lastName: address.lastName,
              address: address.address,
              address2: address.address2 || '',
              postalCode: address.postalCode,
              city: address.city,
              phone: address.phone,
              countryId: address.country
            }
          }
        }
      })

      // 4. Actualizar inventario de productos
      for (const item of productIds) {
        const product = products.find(p => p.id === item.productId)
        if (product) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              inStock: {
                decrement: item.quantity
              }
            }
          })
        }
      }

      return order
    })

    return {
      ok: true,
      message: 'Orden creada exitosamente',
      order: prismaTx
    }

  } catch (error) {
    return {
      ok: false,
      message: 'Error al crear la orden: ' + (error as Error).message
    }
  }
}