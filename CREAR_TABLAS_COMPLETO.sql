-- Script SQL para crear todas las tablas del proyecto
-- Ejecutar en el SQL Editor de Supabase
-- Este script crea las tablas, enums y relaciones necesarias

-- 1. Crear los ENUMs
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');
CREATE TYPE "TipoTransaccion" AS ENUM ('ENTRADA', 'SALIDA');

-- 2. Crear la tabla users
CREATE TABLE IF NOT EXISTS "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- 3. Crear índice único para email
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");

-- 4. Crear la tabla maestros
CREATE TABLE IF NOT EXISTS "maestros" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "creadoPor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maestros_pkey" PRIMARY KEY ("id")
);

-- 5. Crear la tabla transacciones
CREATE TABLE IF NOT EXISTS "transacciones" (
    "id" TEXT NOT NULL,
    "tipo" "TipoTransaccion" NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "maestroId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transacciones_pkey" PRIMARY KEY ("id")
);

-- 6. Crear las foreign keys (relaciones)
-- Relación entre maestros y users (creador)
ALTER TABLE "maestros" 
ADD CONSTRAINT "maestros_creadoPor_fkey" 
FOREIGN KEY ("creadoPor") 
REFERENCES "users"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

-- Relación entre transacciones y maestros
ALTER TABLE "transacciones" 
ADD CONSTRAINT "transacciones_maestroId_fkey" 
FOREIGN KEY ("maestroId") 
REFERENCES "maestros"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

-- Relación entre transacciones y users (usuario que ejecutó la transacción)
ALTER TABLE "transacciones" 
ADD CONSTRAINT "transacciones_usuarioId_fkey" 
FOREIGN KEY ("usuarioId") 
REFERENCES "users"("id") 
ON DELETE CASCADE 
ON UPDATE CASCADE;

-- 7. Deshabilitar RLS para permitir acceso con la clave anónima
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "maestros" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "transacciones" DISABLE ROW LEVEL SECURITY;

-- 8. Verificar que las tablas se crearon correctamente
SELECT 
    tablename, 
    rowsecurity as "RLS Habilitado"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'maestros', 'transacciones')
ORDER BY tablename;

-- 9. Verificar los ENUMs creados
SELECT 
    t.typname as "Nombre del Enum",
    string_agg(e.enumlabel, ', ' ORDER BY e.enumsortorder) as "Valores"
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
WHERE t.typname IN ('Role', 'TipoTransaccion')
GROUP BY t.typname;

