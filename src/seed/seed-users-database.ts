'use server';

import { initialUsers } from './seed-users';
import bcryptjs from 'bcryptjs';
import { prisma } from '../lib/prisma';

export async function seedUsers() {
  try {
    console.log('🌱 Iniciando seed de usuarios...');

    // Eliminar usuarios existentes (opcional, solo para desarrollo)
    await prisma.user.deleteMany();
    console.log('🗑️ Usuarios anteriores eliminados');

    // Procesar cada usuario del seed
    for (const user of initialUsers) {
      console.log(`👤 Creando usuario: ${user.email}`);
      
      // Hashear la contraseña
      const hashedPassword = await bcryptjs.hash(user.password, 12);
      
      // Crear el usuario en la base de datos
      await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          password: hashedPassword,
          role: user.role,
        }
      });
      
      console.log(`✅ Usuario creado: ${user.email} (${user.role})`);
    }

    console.log('🎉 ¡Seed de usuarios completado exitosamente!');
    console.log('📋 Usuarios creados:');
    initialUsers.forEach(user => {
      console.log(`   📧 ${user.email} - Contraseña: ${user.password} (${user.role})`);
    });

    return {
      ok: true,
      message: 'Usuarios creados exitosamente',
      users: initialUsers.map(u => ({ email: u.email, role: u.role }))
    };

  } catch (error) {
    console.error('❌ Error al crear usuarios:', error);
    return {
      ok: false,
      message: 'Error al crear usuarios',
      error
    };
  }
}