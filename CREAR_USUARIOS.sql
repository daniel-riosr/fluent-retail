-- SQL para crear usuarios iniciales en Supabase
-- Ejecuta este SQL en el SQL Editor de Supabase

INSERT INTO users (id, email, name, password, role, "createdAt", "updatedAt") VALUES
(gen_random_uuid()::text, 'admin@ejemplo.com', 'Administrador', 'admin123', 'ADMIN', now(), now()),
(gen_random_uuid()::text, 'usuario@ejemplo.com', 'Usuario Demo', 'usuario123', 'USER', now(), now())
ON CONFLICT (email) DO NOTHING;

