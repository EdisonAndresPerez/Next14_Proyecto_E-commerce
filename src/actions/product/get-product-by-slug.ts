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
            url: true,
            id: true
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
        categoryId: true,
        category: {
          select: {
            name: true
          }
        },
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
      tags: product.tags.map(tag => tag.name),
      category: product.category.name as any, // Mantener compatibilidad con ValidCategories
      categoryId: product.categoryId // Incluir categoryId para el formulario de admin
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
