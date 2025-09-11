'use server';

import { prisma } from '@/lib/prisma';


interface PaginationOptions {
  page?: number
  take?: number
}



//obtener productos paginados con imagenes
export const getPaginatedProductsWithImages = async ({ 
  page = 1,
  take = 12,
   }: PaginationOptions) => {

    if ( isNaN(Number(page)) ) page = 1;
    if (page < 1) page = 1

  try {
    // 1. Contar total de productos
    const totalCount = await prisma.product.count({
      where: {
        isActive: true,
      }
    });

    // 2. Calcular skip para paginación
    const skip = (page - 1) * take;

    const products = await prisma.product.findMany({
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
      },
      where: {
        isActive: true,      // Solo productos activos
      },
      skip: skip,            // Para paginación
      take: take,            // Límite por página
      orderBy: {
        createdAt: 'desc',   // Más recientes primero
      },
    });

    // Transformar los datos para que coincidan con la interface Product
    const transformedProducts = products.map(product => ({
      ...product,
      images: product.images.map(img => img.url),
      tags: product.tags.map(tag => tag.name)
    }));

    console.log('📊 Stats de productos:');
    console.log(`Total en DB: ${totalCount}`);
    console.log(`Página actual: ${page}`);
    console.log(`Take (límite): ${take}`);
    console.log(`Skip (saltear): ${skip}`);
    console.log(`Productos obtenidos: ${products.length}`);
    console.log(`Total de páginas: ${Math.ceil(totalCount / take)}`);

    return {
      ok: true,
      products: transformedProducts,
      currentPage: page,
      totalPages: Math.ceil(totalCount / take),
      totalCount: totalCount,
    };

  } catch (error) {
    console.error('Error al obtener productos:', error);
    return {
      ok: false,
      message: 'No se pudo cargar los productos',
    };
  }
};


