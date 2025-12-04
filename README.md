# Sistema de Gestión de Inventario

Sistema completo de gestión pedidos inventario con autenticación, gestión de transacciones, maestros y usuarios con roles diferenciados.

## Integrantes del Equipo

Daniel Camilo Rios Ramirez - 1001652467
Mateo Blandón Mesa - 1017235348
Juan Camilo Morales Villada - 1036926393
Juan Camilo Velez Chaverra - 1077997236

## Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Charts**: Recharts
- **Database**: Prisma ORM + PostgreSQL (Supabase)
- **Form Handling**: React Hook Form + Zod

## Requisitos Previos

- Node.js 18+ y npm/yarn/bun
- Cuenta en Supabase (para la base de datos)

## Instalación

1. Clonar el repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
cd fluent-retail
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
# o
bun install
```

3. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto
   - Agregar la variable `DATABASE_URL` con el string de conexión de Supabase:
   ```
   DATABASE_URL="postgresql://usuario:contraseña@host:puerto/database?schema=public"
   ```

4. Configurar Prisma:
```bash
# Generar el cliente de Prisma
npm run db:generate

# Ejecutar las migraciones
npm run db:migrate
# o si prefieres hacer push directo
npm run db:push
```

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## Usuarios de Prueba

### Administrador
- **Email**: admin@ejemplo.com
- **Contraseña**: admin123
- **Rol**: ADMIN
- **Permisos**: Acceso completo a todas las funcionalidades, incluyendo gestión de usuarios y creación de maestros.

### Usuario Regular
- **Email**: usuario@ejemplo.com
- **Contraseña**: usuario123
- **Rol**: USER
- **Permisos**: Acceso a gestión de transacciones y maestros, pero no puede administrar usuarios ni crear nuevos maestros.

## Funcionalidades

### 1. Página de Landing
- Página inicial con información del sistema
- Botón para iniciar sesión

### 2. Autenticación
- Sistema de autenticación manual (sin backend real)
- Almacenamiento de sesión en localStorage
- Redirección automática según el rol del usuario

### 3. Sidebar de Navegación
- Información del usuario (foto y nombre)
- Enlaces a diferentes secciones:
  - **Transacciones**: Visible para ADMIN y USER
  - **Maestros**: Visible para ADMIN y USER
  - **Usuarios**: Solo visible para ADMIN
- Botón para cerrar sesión

### 4. Gestión de Transacciones
- Dropdown para seleccionar el Maestro
- Tabla con movimientos del maestro seleccionado:
  - ID del movimiento
  - Fecha
  - Tipo (Entrada/Salida)
  - Cantidad
  - Responsable del movimiento
- Botón "Agregar Movimiento" con formulario:
  - Tipo de movimiento (Entrada/Salida)
  - Cantidad
  - Validación de saldo disponible
- Gráfica de evolución de saldos diarios

### 5. Gestión de Maestros
- Tabla con todos los maestros:
  - ID del material
  - Nombre del Maestro
  - Saldo actual
  - Usuario que lo creó
  - Fecha de creación
- Botón "Agregar" (solo ADMIN):
  - Formulario para crear nuevo maestro
  - Nombre del maestro
  - Saldo inicial

### 6. Gestión de Usuarios (Solo ADMIN)
- Tabla con todos los usuarios:
  - ID del usuario
  - Correo electrónico
  - Rol asignado
  - Fecha de creación
- Botón "Editar Usuario":
  - Formulario para actualizar el rol
  - Dropdown con roles disponibles (ADMIN/USER)

## Estructura del Proyecto

```
fluent-retail/
├── prisma/
│   └── schema.prisma          # Esquema de base de datos
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx        # Componente de navegación lateral
│   │   └── ui/                # Componentes UI de shadcn
│   ├── contexts/
│   │   └── AuthContext.tsx    # Contexto de autenticación
│   ├── lib/
│   │   ├── api.ts             # Funciones de API (simulación)
│   │   └── prisma.ts          # Cliente de Prisma
│   ├── pages/
│   │   ├── Landing.tsx        # Página de inicio
│   │   ├── Login.tsx          # Página de login
│   │   ├── Transacciones.tsx # Gestión de transacciones
│   │   ├── Maestros.tsx      # Gestión de maestros
│   │   └── Usuarios.tsx      # Gestión de usuarios
│   └── App.tsx                # Componente principal con routing
└── package.json
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter
- `npm run db:generate` - Genera el cliente de Prisma
- `npm run db:migrate` - Ejecuta las migraciones de base de datos
- `npm run db:push` - Hace push del esquema a la base de datos
- `npm run db:studio` - Abre Prisma Studio para visualizar datos

## Despliegue

El proyecto está configurado para desplegarse en Vercel:

1. Conectar el repositorio a Vercel
2. Configurar las variables de entorno en Vercel
3. El despliegue se realizará automáticamente

**URL de producción**: [nombreEquipo-Funcionalidad.vercel.app]

## Base de Datos

El proyecto utiliza Prisma ORM con PostgreSQL (Supabase). El esquema incluye:

- **User**: Usuarios del sistema con roles (ADMIN/USER)
- **Maestro**: Materiales/productos con saldo
- **Transaccion**: Movimientos de inventario (Entrada/Salida)

## Notas Importantes

- La autenticación es manual y no requiere backend real
- Los datos se almacenan en localStorage para simulación
- En producción, se debe implementar un backend API real
- Las migraciones de Prisma deben ejecutarse antes de usar el sistema

## Licencia

[Especificar licencia si aplica]
