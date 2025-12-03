-- ============================================
-- DATOS DE PRUEBA: INVENTARIO DE ARTÍCULOS TECNOLÓGICOS
-- ============================================
-- Ejecuta este SQL en el SQL Editor de Supabase
-- Asegúrate de tener usuarios creados primero (admin@ejemplo.com y usuario@ejemplo.com)

-- ============================================
-- PASO 1: Obtener IDs de usuarios existentes
-- ============================================
-- Primero necesitamos los IDs de los usuarios para crear los maestros
-- Ejecuta esto para ver los IDs:
-- SELECT id, email FROM users;

-- ============================================
-- PASO 2: Insertar Maestros (Artículos Tecnológicos)
-- ============================================
-- Reemplaza 'USER_ID_ADMIN' y 'USER_ID_USER' con los IDs reales de tus usuarios
-- Puedes obtenerlos ejecutando: SELECT id FROM users WHERE email = 'admin@ejemplo.com';

-- Obtener IDs de usuarios (ejecuta esto primero y copia los IDs)
DO $$
DECLARE
    admin_id TEXT;
    user_id TEXT;
BEGIN
    -- Obtener ID del admin
    SELECT id INTO admin_id FROM users WHERE email = 'admin@ejemplo.com' LIMIT 1;
    -- Obtener ID del usuario regular
    SELECT id INTO user_id FROM users WHERE email = 'usuario@ejemplo.com' LIMIT 1;

    -- Insertar Maestros (Artículos Tecnológicos)
    INSERT INTO maestros (id, nombre, saldo, "creadoPor", "createdAt", "updatedAt") VALUES
    -- Laptops
    (gen_random_uuid()::text, 'Laptop Dell XPS 15', 25, admin_id, now(), now()),
    (gen_random_uuid()::text, 'Laptop MacBook Pro M3', 15, admin_id, now(), now()),
    (gen_random_uuid()::text, 'Laptop HP Pavilion', 40, admin_id, now(), now()),
    (gen_random_uuid()::text, 'Laptop Lenovo ThinkPad', 30, user_id, now(), now()),
    
    -- Smartphones
    (gen_random_uuid()::text, 'iPhone 15 Pro', 50, admin_id, now(), now()),
    (gen_random_uuid()::text, 'Samsung Galaxy S24', 45, admin_id, now(), now()),
    (gen_random_uuid()::text, 'Xiaomi Redmi Note 13', 60, user_id, now(), now()),
    
    -- Tablets
    (gen_random_uuid()::text, 'iPad Pro 12.9"', 20, admin_id, now(), now()),
    (gen_random_uuid()::text, 'Samsung Galaxy Tab S9', 25, admin_id, now(), now()),
    
    -- Accesorios
    (gen_random_uuid()::text, 'Mouse Logitech MX Master 3', 100, user_id, now(), now()),
    (gen_random_uuid()::text, 'Teclado Mecánico Keychron K8', 35, admin_id, now(), now()),
    (gen_random_uuid()::text, 'Monitor LG UltraWide 34"', 18, admin_id, now(), now()),
    (gen_random_uuid()::text, 'Auriculares Sony WH-1000XM5', 40, user_id, now(), now()),
    (gen_random_uuid()::text, 'Webcam Logitech C920', 55, admin_id, now(), now()),
    
    -- Componentes
    (gen_random_uuid()::text, 'SSD Samsung 1TB NVMe', 80, admin_id, now(), now()),
    (gen_random_uuid()::text, 'RAM Corsair 16GB DDR5', 45, user_id, now(), now()),
    (gen_random_uuid()::text, 'Tarjeta Gráfica RTX 4070', 12, admin_id, now(), now()),
    (gen_random_uuid()::text, 'Fuente de Poder 750W 80+ Gold', 25, admin_id, now(), now())
    ON CONFLICT (id) DO NOTHING;
END $$;

-- ============================================
-- PASO 3: Insertar Transacciones de Prueba
-- ============================================
-- Primero obtenemos los IDs de los maestros y usuarios
DO $$
DECLARE
    admin_id TEXT;
    user_id TEXT;
    laptop_dell_id TEXT;
    macbook_id TEXT;
    iphone_id TEXT;
    samsung_id TEXT;
    monitor_id TEXT;
    ssd_id TEXT;
BEGIN
    -- Obtener IDs de usuarios
    SELECT id INTO admin_id FROM users WHERE email = 'admin@ejemplo.com' LIMIT 1;
    SELECT id INTO user_id FROM users WHERE email = 'usuario@ejemplo.com' LIMIT 1;
    
    -- Obtener IDs de algunos maestros
    SELECT id INTO laptop_dell_id FROM maestros WHERE nombre = 'Laptop Dell XPS 15' LIMIT 1;
    SELECT id INTO macbook_id FROM maestros WHERE nombre = 'Laptop MacBook Pro M3' LIMIT 1;
    SELECT id INTO iphone_id FROM maestros WHERE nombre = 'iPhone 15 Pro' LIMIT 1;
    SELECT id INTO samsung_id FROM maestros WHERE nombre = 'Samsung Galaxy S24' LIMIT 1;
    SELECT id INTO monitor_id FROM maestros WHERE nombre = 'Monitor LG UltraWide 34"' LIMIT 1;
    SELECT id INTO ssd_id FROM maestros WHERE nombre = 'SSD Samsung 1TB NVMe' LIMIT 1;

    -- Insertar Transacciones (últimos 30 días)
    -- Laptop Dell XPS 15
    INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt") VALUES
    (gen_random_uuid()::text, 'ENTRADA', 10, laptop_dell_id, admin_id, now() - INTERVAL '25 days'),
    (gen_random_uuid()::text, 'SALIDA', 3, laptop_dell_id, user_id, now() - INTERVAL '20 days'),
    (gen_random_uuid()::text, 'ENTRADA', 5, laptop_dell_id, admin_id, now() - INTERVAL '15 days'),
    (gen_random_uuid()::text, 'SALIDA', 2, laptop_dell_id, user_id, now() - INTERVAL '10 days'),
    (gen_random_uuid()::text, 'SALIDA', 5, laptop_dell_id, admin_id, now() - INTERVAL '5 days')
    ON CONFLICT (id) DO NOTHING;

    -- MacBook Pro M3
    INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt") VALUES
    (gen_random_uuid()::text, 'ENTRADA', 8, macbook_id, admin_id, now() - INTERVAL '28 days'),
    (gen_random_uuid()::text, 'SALIDA', 2, macbook_id, user_id, now() - INTERVAL '22 days'),
    (gen_random_uuid()::text, 'ENTRADA', 5, macbook_id, admin_id, now() - INTERVAL '18 days'),
    (gen_random_uuid()::text, 'SALIDA', 4, macbook_id, admin_id, now() - INTERVAL '12 days'),
    (gen_random_uuid()::text, 'SALIDA', 3, macbook_id, user_id, now() - INTERVAL '7 days')
    ON CONFLICT (id) DO NOTHING;

    -- iPhone 15 Pro
    INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt") VALUES
    (gen_random_uuid()::text, 'ENTRADA', 30, iphone_id, admin_id, now() - INTERVAL '30 days'),
    (gen_random_uuid()::text, 'SALIDA', 10, iphone_id, user_id, now() - INTERVAL '25 days'),
    (gen_random_uuid()::text, 'SALIDA', 8, iphone_id, admin_id, now() - INTERVAL '20 days'),
    (gen_random_uuid()::text, 'ENTRADA', 20, iphone_id, admin_id, now() - INTERVAL '15 days'),
    (gen_random_uuid()::text, 'SALIDA', 12, iphone_id, user_id, now() - INTERVAL '10 days'),
    (gen_random_uuid()::text, 'SALIDA', 10, iphone_id, admin_id, now() - INTERVAL '3 days')
    ON CONFLICT (id) DO NOTHING;

    -- Samsung Galaxy S24
    INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt") VALUES
    (gen_random_uuid()::text, 'ENTRADA', 25, samsung_id, admin_id, now() - INTERVAL '27 days'),
    (gen_random_uuid()::text, 'SALIDA', 5, samsung_id, user_id, now() - INTERVAL '23 days'),
    (gen_random_uuid()::text, 'ENTRADA', 15, samsung_id, admin_id, now() - INTERVAL '19 days'),
    (gen_random_uuid()::text, 'SALIDA', 8, samsung_id, admin_id, now() - INTERVAL '14 days'),
    (gen_random_uuid()::text, 'SALIDA', 7, samsung_id, user_id, now() - INTERVAL '8 days')
    ON CONFLICT (id) DO NOTHING;

    -- Monitor LG UltraWide
    INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt") VALUES
    (gen_random_uuid()::text, 'ENTRADA', 12, monitor_id, admin_id, now() - INTERVAL '26 days'),
    (gen_random_uuid()::text, 'SALIDA', 3, monitor_id, user_id, now() - INTERVAL '21 days'),
    (gen_random_uuid()::text, 'ENTRADA', 6, monitor_id, admin_id, now() - INTERVAL '16 days'),
    (gen_random_uuid()::text, 'SALIDA', 2, monitor_id, admin_id, now() - INTERVAL '11 days'),
    (gen_random_uuid()::text, 'SALIDA', 1, monitor_id, user_id, now() - INTERVAL '4 days')
    ON CONFLICT (id) DO NOTHING;

    -- SSD Samsung 1TB
    INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt") VALUES
    (gen_random_uuid()::text, 'ENTRADA', 50, ssd_id, admin_id, now() - INTERVAL '29 days'),
    (gen_random_uuid()::text, 'SALIDA', 15, ssd_id, user_id, now() - INTERVAL '24 days'),
    (gen_random_uuid()::text, 'ENTRADA', 30, ssd_id, admin_id, now() - INTERVAL '17 days'),
    (gen_random_uuid()::text, 'SALIDA', 20, ssd_id, admin_id, now() - INTERVAL '13 days'),
    (gen_random_uuid()::text, 'SALIDA', 10, ssd_id, user_id, now() - INTERVAL '6 days'),
    (gen_random_uuid()::text, 'SALIDA', 15, ssd_id, admin_id, now() - INTERVAL '2 days')
    ON CONFLICT (id) DO NOTHING;
END $$;

-- ============================================
-- PASO 4: Actualizar Saldos de Maestros
-- ============================================
-- Actualizar los saldos basados en las transacciones
UPDATE maestros m
SET saldo = (
    SELECT 
        COALESCE(SUM(
            CASE 
                WHEN t.tipo = 'ENTRADA' THEN t.cantidad
                WHEN t.tipo = 'SALIDA' THEN -t.cantidad
                ELSE 0
            END
        ), 0)
    FROM transacciones t
    WHERE t."maestroId" = m.id
),
"updatedAt" = now();

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Ejecuta estos queries para verificar los datos:

-- Ver todos los maestros
-- SELECT id, nombre, saldo, "createdAt" FROM maestros ORDER BY nombre;

-- Ver todas las transacciones
-- SELECT t.id, t.tipo, t.cantidad, m.nombre as maestro, u.name as usuario, t."createdAt" 
-- FROM transacciones t
-- JOIN maestros m ON t."maestroId" = m.id
-- JOIN users u ON t."usuarioId" = u.id
-- ORDER BY t."createdAt" DESC;

-- Ver resumen por maestro
-- SELECT 
--     m.nombre,
--     m.saldo as saldo_actual,
--     COUNT(t.id) as total_transacciones,
--     SUM(CASE WHEN t.tipo = 'ENTRADA' THEN t.cantidad ELSE 0 END) as total_entradas,
--     SUM(CASE WHEN t.tipo = 'SALIDA' THEN t.cantidad ELSE 0 END) as total_salidas
-- FROM maestros m
-- LEFT JOIN transacciones t ON m.id = t."maestroId"
-- GROUP BY m.id, m.nombre, m.saldo
-- ORDER BY m.nombre;

