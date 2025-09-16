'use server';
import type { Address } from "@/interfaces";
import { prisma } from "@/lib/prisma";

export const setUserAddress = async(address: Address, userId: string ) => {
  try {
    console.log('setUserAddress llamado con:', { address, userId });
    
    // Debug: Listar todos los usuarios en la BD
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true
      }
    });
    console.log('Todos los usuarios en BD:', allUsers);
    
    const newAddress = await createOrReplaceAddress(address, userId);
    console.log('Resultado de createOrReplaceAddress:', newAddress);
    return newAddress;
  } catch (error) {
    console.error('Error en setUserAddress:', error);
    return {
      ok: false,
      message: 'No se pudo grabar la dirección'
    };
  }
}

export const createAddress = async (address: Address, userId: string) => {
  try {
    // Validar datos antes de guardar
    console.log('Datos recibidos en createAddress:', { address, userId });
    
    if (!userId) {
      throw new Error('userId es requerido');
    }
    
    if (!address.country) {
      throw new Error('country es requerido');
    }

    const addressToSave = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.postalCode,
      city: address.city,
      countryId: address.country, // El formulario ya envía el ID del país
      phone: address.phone,
    };

    console.log('Datos a guardar en BD:', addressToSave);

    const newAddress = await prisma.userAddress.create({
      data: addressToSave
    });

    console.log('Dirección creada exitosamente:', newAddress);

    return {
      ok: true,
      address: newAddress,
      message: 'Dirección creada correctamente'
    };

  } catch (error) {
    console.error('Error detallado en createAddress:', error);
    return {
      ok: false,
      message: `No se pudo crear la dirección: ${error instanceof Error ? error.message : 'Error desconocido'}`
    };
  }
}

export const updateAddress = async (addressId: string, address: Address, userId: string) => {
  try {
    console.log('Actualizando dirección:', { addressId, address, userId });
    
    const addressToUpdate = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.postalCode,
      city: address.city,
      countryId: address.country,
      phone: address.phone,
    };

    const updatedAddress = await prisma.userAddress.update({
      where: { id: addressId },
      data: addressToUpdate
    });

    return {
      ok: true,
      address: updatedAddress,
      message: 'Dirección actualizada correctamente'
    };

  } catch (error) {
    console.error('Error en updateAddress:', error);
    return {
      ok: false,
      message: `No se pudo actualizar la dirección: ${error instanceof Error ? error.message : 'Error desconocido'}`
    };
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    // Verificar que el usuario existe antes de crear la dirección
    const userExists = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    console.log('Usuario existe en BD:', userExists ? 'SÍ' : 'NO');
    console.log('UserId buscado:', userId);
    
    if (!userExists) {
      return {
        ok: false,
        message: `El usuario con ID ${userId} no existe en la base de datos`
      };
    }

    // Buscar si ya existe una dirección para este usuario
    const storedAddress = await prisma.userAddress.findFirst({
      where: { userId }
    });

    if (!storedAddress) {
      // Usar la función createAddress
      return await createAddress(address, userId);
    } else {
      // Usar la función updateAddress
      return await updateAddress(storedAddress.id, address, userId);
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo grabar la dirección'
    };
  }
}