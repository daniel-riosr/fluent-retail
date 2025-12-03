-- Script para agregar el campo 'photo' a la tabla 'users'
-- Ejecutar este script en el SQL Editor de Supabase

-- Agregar la columna 'photo' como opcional (nullable)
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS photo TEXT;

-- Comentario para documentar el campo
COMMENT ON COLUMN users.photo IS 'URL de la foto del usuario (opcional)';

