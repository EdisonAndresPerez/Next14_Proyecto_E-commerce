'use server';

import { prisma } from "@/lib/prisma";


export const deleteUserAddress = async (userId: string) => {
  try {

    const deleted = await prisma.userAddress.deleteMany({
        where: {userId}
    });

    return {
      ok: true,
      message: `${deleted.count} direcciones eliminadas`
    }

  } catch (error) {
      console.log(error)
      return {
        ok: false,
        message: 'No se pudo eliminar la dirección'
      }
  }
}