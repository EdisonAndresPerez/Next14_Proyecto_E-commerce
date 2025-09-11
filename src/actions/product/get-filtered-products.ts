'use server';

import { prisma } from '@/lib/prisma';

interface ProductFilters {
  category?: 'ps5' | 'ps2' | 'ps1';
  genre?: string;
  platform?: 'ps5' | 'ps4' | 'ps3' | 'ps2' | 'ps1';
  page?: number;
  take?: number;
  priceMin?: number;
  priceMax?: number;
}

export const getFilteredProducts = async (filters: ProductFilters = {}) => {
  const { 
    category, 
    genre, 
    platform,
    page: rawPage = 1,
    take = 12,
    priceMin,
    priceMax 
  } = filters;

  let page = rawPage;
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // Construir el objeto where dinámicamente
    const whereCondition: any = {
      isActive: true,
    };

    if (category) {
      whereCondition.category = category;
    }

    if (genre) {
      whereCondition.genre = genre;
    }

    if (platform) {
      whereCondition.platform = platform;
    }

    if (priceMin !== undefined || priceMax !== undefined) {
      whereCondition.msrp = {};
      if (priceMin !== undefined) {
        whereCondition.msrp.gte = priceMin;
      }
      if (priceMax !== undefined) {
        whereCondition.msrp.lte = priceMax;
      }
    }

    // 1. Contar total de productos con filtros
    const totalCount = await prisma.product.count({
      where: whereCondition
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
      where: whereCondition,
      skip: skip,
      take: take,
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transformar los datos
    const transformedProducts = products.map(product => ({
      ...product,
      images: product.images.map(img => img.url),
      tags: product.tags.map(tag => tag.name)
    }));

    console.log('🔍 Filtros aplicados:', filters);
    console.log('📊 Productos filtrados:', transformedProducts.length, 'de', totalCount);

    return {
      ok: true,
      products: transformedProducts,
      currentPage: page,
      totalPages: Math.ceil(totalCount / take),
      totalCount: totalCount,
      appliedFilters: filters
    };

  } catch (error) {
    console.error('Error al filtrar productos:', error);
    return {
      ok: false,
      message: 'No se pudo cargar los productos filtrados',
    };
  }
};
