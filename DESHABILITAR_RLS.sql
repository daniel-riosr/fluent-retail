-- Script para deshabilitar Row Level Security (RLS) en Supabase
-- EJECUTAR EN EL SQL EDITOR DE SUPABASE
-- Esto permitirá acceso a las tablas sin restricciones

-- Deshabilitar RLS en las tablas
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE maestros DISABLE ROW LEVEL SECURITY;
ALTER TABLE transacciones DISABLE ROW LEVEL SECURITY;

-- Verificar que RLS está deshabilitado
SELECT 
    tablename, 
    rowsecurity as "RLS Habilitado"
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'maestros', 'transacciones');

-- Si la consulta muestra "false" en la columna "RLS Habilitado", entonces RLS está deshabilitado correctamente

