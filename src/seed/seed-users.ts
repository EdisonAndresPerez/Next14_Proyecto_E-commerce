import bcryptjs from 'bcryptjs';

interface SeedUser {
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'user';
}

export const initialUsers: SeedUser[] = [
  {
    email: 'admin@admin.com',
    name: 'Administrador',
    password: 'admin123',
    role: 'admin'
  },
  {
    email: 'user@user.com', 
    name: 'Usuario Test',
    password: 'user123',
    role: 'user'
  },
  {
    email: 'edison@test.com',
    name: 'Edison Perez',
    password: 'edison123',
    role: 'admin'
  }
];