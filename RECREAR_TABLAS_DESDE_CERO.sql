-- Script SQL para ELIMINAR y RECREAR todas las tablas desde cero
-- ⚠️ ADVERTENCIA: Este script ELIMINARÁ todos los datos existentes
-- Ejecutar en el SQL Editor de Supabase
-- Úsalo solo si quieres empezar completamente desde cero

-- 1. Eliminar las tablas existentes (en orden correcto debido a las foreign keys)
DROP TABLE IF EXISTS "transacciones" CASCADE;
DROP TABLE IF EXISTS "maestros" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

-- 2. Eliminar los ENUMs existentes
DROP TYPE IF EXISTS "TipoTransaccion" CASCADE;
DROP TYPE IF EXISTS "Role" CASCADE;

-- 3. Crear los ENUMs
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');
CREATE TYPE "TipoTransaccion" AS ENUM ('ENTRADA', 'SALIDA');

-- 4. Crear la tabla users
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- 5. Crear índice único para email
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- 6. Crear la tabla maestros
CREATE TABLE "maestros" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "creadoPor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "maestros_pkey" PRIMARY KEY ("id")
);

-- 7. Crear la tabla transacciones
CREATE TABLE "transacciones" (
    "id" TEXT NOT NULL,
    "tipo" "TipoTransaccion" NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,
    "maestroId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transacciones_pkey" PRIMARY KEY ("id")
);

-- 8. Crear las foreign keys (relaciones)
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

-- 9. Deshabilitar RLS para permitir acceso con la clave anónima
ALTER TABLE "users" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "maestros" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "transacciones" DISABLE ROW LEVEL SECURITY;

-- 10. Verificar que las tablas se crearon correctamente
SELECT 
    tablename, 
    rowsecurity as "RLS Habilitado"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'maestros', 'transacciones')
ORDER BY tablename;

-- 11. Verificar los ENUMs creados
SELECT 
    t.typname as "Nombre del Enum",
    string_agg(e.enumlabel, ', ' ORDER BY e.enumsortorder) as "Valores"
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
WHERE t.typname IN ('Role', 'TipoTransaccion')
GROUP BY t.typname;

