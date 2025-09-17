'use server'

import { auth } from '@/auth.config'
import { prisma } from '@/lib/prisma'

export const getOrderById = async (id: string) => {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe estar autenticado'
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderAddress: true,
        orderItems: {
          select: {
            price: true,
            quantity: true,


            product: {
              select: {
                name: true,
                slug: true,

                images: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if (!order) {
      return {
        ok: false,
        message: 'Orden no encontrada'
      }
    }

      if (session.user.role === 'user') {
        if (session.user.id !== order.userId) {
          return {
            ok: false,
            message: 'No tienes permisos para ver esta orden'
          }
        }
      }




    // Verificar que la orden pertenece al usuario autenticado
    if (session.user.role !== 'admin' && order.userId !== session.user.id) {
      return {
        ok: false,
        message: 'No tienes permisos para ver esta orden'
      }
    }

    return {
      ok: true,
      order: {
        id: order.id,
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
        itemsInOrder: order.itemsInOrder,
        isPaid: order.isPaid,
        paidAt: order.paidAt,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        
        // Dirección de entrega
        orderAddress: order.orderAddress ? {
          firstName: order.orderAddress.firstName,
          lastName: order.orderAddress.lastName,
          address: order.orderAddress.address,
          address2: order.orderAddress.address2,
          postalCode: order.orderAddress.postalCode,
          city: order.orderAddress.city,
          phone: order.orderAddress.phone,
          country: order.orderAddress.countryId
        } : null,
        
        // Items de la orden
        orderItems: order.orderItems.map(item => {
          const imageUrl = item.product.images[0]?.url
          
          // Debug: Log para ver qué imagen se está procesando
          console.log('Procesando imagen:', { 
            productName: item.product.name, 
            imageUrl,
            hasImages: item.product.images.length 
          })
          
          // Validar que la imagen existe y no esté vacía
          let finalImage = '/imgs/starman_750x750.png' // imagen por defecto
          
          if (imageUrl && imageUrl.trim() !== '') {
            // Si la imagen ya tiene el prefijo /products/, usarla tal como está
            if (imageUrl.startsWith('/products/') || imageUrl.startsWith('http')) {
              finalImage = imageUrl
            } else {
              // Si no tiene prefijo, agregarlo
              finalImage = `/products/${imageUrl}`
            }
          }
          
          console.log('Imagen final asignada:', finalImage)
          
          return {
            quantity: item.quantity,
            price: item.price,
            product: {
              name: item.product.name,
              slug: item.product.slug,
              image: finalImage
            }
          }
        })
      }
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al obtener la orden'
    }
  }
}