'use server'

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  name: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  msrp: z.coerce
  .number()
  .min(0)
  .transform( val => Number(val.toFixed(2))),
  inStock: z.coerce
  .number()
  .min(0)
  .transform( val => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  tags: z.string(),
  genre: z.enum(['action', 'adventure', 'sports', 'rpg', 'shooter', 'racing', 'strategy', 'simulation', 'horror', 'platformer', 'puzzle', 'fighting', 'stealth', 'other']),
  platform: z.enum(['ps5', 'ps4', 'ps3', 'ps2', 'ps1', 'xbox_series_x', 'xbox_series_s', 'xbox_one', 'xbox_360', 'nintendo_switch', 'nintendo_3ds']),
})




export const createUpdateProduct = async (formData: FormData) => {

  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)


  if (!productParsed.success){
    console.log(productParsed.error)
    return {
      ok: false,
      message: 'Error de validación en los datos del formulario'
    }
  }

  console.log(productParsed.data)

  // Extraer los datos validados
  const product = productParsed.data

  try {
    // Procesar tags (convertir string separado por comas a array)
    const tagsArray = product.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)

    if (product.id) {
      // Actualizar producto existente
      await prisma.product.update({
        where: { id: product.id },
        data: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          msrp: product.msrp,
          inStock: product.inStock,
          genre: product.genre,
          platform: product.platform,
          categoryId: product.categoryId,
        }
      })

      // Actualizar tags
      // Primero eliminar tags existentes
      await prisma.productTag.deleteMany({
        where: { productId: product.id }
      })

      // Luego crear los nuevos tags
      if (tagsArray.length > 0) {
        await prisma.productTag.createMany({
          data: tagsArray.map(tag => ({
            name: tag,
            productId: product.id!
          }))
        })
      }

    } else {
      // Crear producto nuevo
      const newProduct = await prisma.product.create({
        data: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          msrp: product.msrp,
          inStock: product.inStock,
          genre: product.genre,
          platform: product.platform,
          categoryId: product.categoryId,
        }
      })

      // Crear tags para el nuevo producto
      if (tagsArray.length > 0) {
        await prisma.productTag.createMany({
          data: tagsArray.map(tag => ({
            name: tag,
            productId: newProduct.id
          }))
        })
      }
    }

    revalidatePath('/admin/products')
    
    return {
      ok: true,
      message: product.id ? 'Producto actualizado correctamente' : 'Producto creado correctamente'
    }

  } catch (error) {
    console.error('Error al guardar producto:', error)
    return {
      ok: false,
      message: 'Error interno del servidor'
    }
  }
}

