'use server';

import { prisma } from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
        isActive: true
      },
      select: {
        id: true,
        name: true,
        description: true,
        images: {
          select: {
            url: true
          }
        },
        inStock: true,
        msrp: true,
        slug: true,
        tags: {
          select: {
            name: true
          }
        },
        genre: true,
        platform: true,
        category: true,
        isActive: true,
      }
    });

    if (!product) {
      return {
        ok: false,
        message: 'Producto no encontrado'
      };
    }

    // Transformar los datos para que coincidan con la interface Product
    const transformedProduct = {
      ...product,
      images: product.images.map(img => img.url),
      tags: product.tags.map(tag => tag.name)
    };

    return {
      ok: true,
      product: transformedProduct
    };

  } catch (error) {
    console.error('Error al obtener producto por slug:', error);
    return {
      ok: false,
      message: 'Error interno del servidor'
    };
  }
};
