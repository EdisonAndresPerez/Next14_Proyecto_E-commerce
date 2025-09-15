'use server';
import type { Address } from "@/interfaces";
import { prisma } from "@/lib/prisma";

export const setUserAddress = async(address: Address, userId: string ) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);
    return newAddress;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo grabar la dirección'
    };
  }
}

export const createAddress = async (address: Address, userId: string) => {
  try {
    const addressToSave = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.codePostal,
      city: address.city,
      countryId: address.country,
      phone: address.phone,
    };

    const newAddress = await prisma.userAddress.create({
      data: addressToSave
    });

    return {
      ok: true,
      address: newAddress,
      message: 'Dirección creada correctamente'
    };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo crear la dirección'
    };
  }
}

export const updateAddress = async (addressId: string, address: Address, userId: string) => {
  try {
    const addressToUpdate = {
      userId: userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.codePostal,
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
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar la dirección'
    };
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
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