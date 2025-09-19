'use server';

import { prisma } from '@/lib/prisma';

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true
      },
      select: {
        id: true,
        name: true,
        displayName: true,
        description: true,
      },
      orderBy: {
        displayName: 'asc'
      }
    });

    return categories;

  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }
};