import { prisma } from '../lib/prisma'
import { initialData } from './seed'
import { seedUsers } from './seed-users-database'
import { countries } from './seed-countries'

async function main() {
  try {
    // 1. Limpiar la base de datos en el orden correcto
    console.log('🧹 Limpiando base de datos...');
    
    // Eliminar primero las tablas que dependen de otras
    await prisma.orderItem.deleteMany();
    await prisma.orderAddress.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.userAddress.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.productTag.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
    
    // 2. Insertar países
    console.log('🌍 Insertando países...');
    
    for (const country of countries) {
      await prisma.country.create({
        data: {
          id: country.id,
          name: country.name
        }
      });
    }
    console.log(`✅ Países creados: ${countries.length}`);
    
    // 3. Insertar productos
    console.log('📦 Insertando productos...');
    
    const { products } = initialData;
    
    for (const product of products) {
      // Crear el producto
      const dbProduct = await prisma.product.create({
        data: {
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
    
    // 4. Crear usuarios
    console.log('👥 Insertando usuarios...');
    const usersResult = await seedUsers();
    if (usersResult.ok) {
      console.log('✅ Usuarios creados exitosamente');
    } else {
      console.error('❌ Error creando usuarios:', usersResult.message);
    }
    
    console.log('🎉 Seed ejecutado correctamente');
    console.log(`📊 Total países insertados: ${countries.length}`);
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
