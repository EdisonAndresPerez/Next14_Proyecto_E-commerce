# 🎮 **E-commerce de Videojuegos - Next.js 14**

Una tienda online moderna especializada en videojuegos retro y actuales para consolas PlayStation.

## 🚀 **Ejecutar en Desarrollo**

### **1. Clonar el repositorio**
git clone https://github.com/EdisonAndresPerez/Next14_Proyecto_E-commerce.git



### **2. Configurar variables de entorno**
# Crear una copia del archivo de ejemplo
.env_prueba  pasarlo a .env

# Editar las variables de entorno según tu configuración
```

### **3. Instalar dependencias**
npm install
```

### **4. Levantar la base de datos**

#### **🐳 Con Docker (Recomendado)**
```bash
# Levantar PostgreSQL con Docker Compose
docker compose up -d

# Verificar que la base de datos esté corriendo
docker compose ps
```

#### **🔧 Configurar esquema y datos iniciales**
# Generar el cliente de Prisma
npx prisma generate

# Sincronizar el esquema con la base de datos
npx prisma db push

# Poblar la base de datos con datos iniciales
npm run seed
```

### **5. Ejecutar la aplicación**
npm run dev


La aplicación estará disponible en: **http://localhost:3000**

---

## 🛠️ **Comandos Útiles**

### **Base de Datos**
# Ver la base de datos en Prisma Studio
npx prisma studio

# Resetear la base de datos (CUIDADO: Borra todos los datos)
npx prisma db reset

# Crear una nueva migración
npx prisma migrate dev --name [nombre_migracion]
```

### **Docker**
# Detener la base de datos
docker compose down

# Ver logs de la base de datos
docker compose logs postgres-db

# Limpiar volúmenes (CUIDADO: Borra todos los datos)
docker compose down -v


## 📦 **Stack Tecnológico**

- **Framework**: Next.js 14 (App Router)
- **Base de Datos**: PostgreSQL + Prisma ORM
- **Autenticación**: NextAuth.js v5
- **Estilos**: Tailwind CSS
- **Estado Global**: Zustand
- **Formularios**: React Hook Form + Zod
- **Contenedores**: Docker + Docker Compose

---

## 🔐 **Usuarios de Prueba**

Después de ejecutar el seed, puedes usar estos usuarios:

| Email | Contraseña | Rol |
|-------|------------|-----|
| `admin@admin.com` | `admin123` | Admin |
| `user@user.com` | `user123` | Usuario |
| `edison@test.com` | `edison123` | Admin | 