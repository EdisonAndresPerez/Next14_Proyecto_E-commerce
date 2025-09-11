import { prisma } from '../lib/prisma'
import { initialData } from './seed'

async function main() {
  try {
    // 1. Limpiar la base de datos
    console.log('🧹 Limpiando base de datos...');
    
    await prisma.productImage.deleteMany();
    await prisma.productTag.deleteMany();
    await prisma.product.deleteMany();
    
    // 2. Insertar productos
    console.log('📦 Insertando productos...');
    
    const { products } = initialData;
    
    for (const product of products) {
      // Crear el producto
      const dbProduct = await prisma.product.create({
        data: {
          id: undefined, // Dejar que Prisma genere el ID
          name: product.name,
          description: product.description,
          inStock: product.inStock,
          msrp: product.msrp,
          slug: product.slug,
          genre: product.genre,
          platform: product.platform,
          category: product.category,
        }
      });
      
      // Crear las imágenes del producto
      const productImages = product.images.map(image => ({
        url: image,
        productId: dbProduct.id
      }));
      
      await prisma.productImage.createMany({
        data: productImages
      });
      
      // Crear los tags del producto
      const productTags = product.tags.map(tag => ({
        name: tag,
        productId: dbProduct.id
      }));
      
      await prisma.productTag.createMany({
        data: productTags
      });
      
      console.log(`✅ Producto creado: ${product.name}`);
    }
    
    console.log('🎉 Seed ejecutado correctamente');
    console.log(`📊 Total productos insertados: ${products.length}`);
    
  } catch (error) {
    console.error('❌ Error ejecutando seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

;(() => {
  main()
})()
