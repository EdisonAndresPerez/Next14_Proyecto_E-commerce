import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';
import { prisma } from './lib/prisma';

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log({auth});
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.data as any;
      return session;
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        try {
          // Buscar el usuario en la base de datos
          const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
              role: true,
              isActive: true
            }
          });

          // Si no existe el usuario
          if (!user) {
            console.log('Usuario no encontrado:', email);
            return null;
          }

          // Si el usuario está inactivo
          if (!user.isActive) {
            console.log('Usuario inactivo:', email);
            return null;
          }

          // Verificar la contraseña
          const passwordsMatch = await bcryptjs.compare(password, user.password);

          if (!passwordsMatch) {
            console.log('Contraseña incorrecta para:', email);
            return null;
          }

          // Credenciales válidas - retornar datos del usuario
          console.log('✅ Login exitoso:', email);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };

        } catch (error) {
          console.error('Error en authorize():', error);
          return null;
        }
      },
    }),
  ]
} satisfies NextAuthConfig;

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);