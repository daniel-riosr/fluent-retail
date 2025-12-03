-- ============================================
-- DATOS DE PRUEBA SIMPLES: ARTÍCULOS TECNOLÓGICOS
-- ============================================
-- Ejecuta este SQL en el SQL Editor de Supabase
-- IMPORTANTE: Asegúrate de tener usuarios creados primero

-- ============================================
-- PASO 1: Obtener IDs de usuarios
-- ============================================
-- Primero ejecuta esto para obtener los IDs:
SELECT id, email FROM users;

-- Copia los IDs y úsalos en los siguientes INSERTs
-- O usa esta versión que los obtiene automáticamente:

-- ============================================
-- PASO 2: Insertar Maestros (Artículos Tecnológicos)
-- ============================================
WITH user_ids AS (
    SELECT 
        (SELECT id FROM users WHERE email = 'admin@ejemplo.com' LIMIT 1) as admin_id,
        (SELECT id FROM users WHERE email = 'usuario@ejemplo.com' LIMIT 1) as user_id
)
INSERT INTO maestros (id, nombre, saldo, "creadoPor", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid()::text,
    nombre,
    saldo_inicial,
    CASE WHEN creador = 'admin' THEN (SELECT admin_id FROM user_ids) ELSE (SELECT user_id FROM user_ids) END,
    now(),
    now()
FROM (VALUES
    -- Laptops
    ('Laptop Dell XPS 15', 25.0, 'admin'),
    ('Laptop MacBook Pro M3', 15.0, 'admin'),
    ('Laptop HP Pavilion', 40.0, 'admin'),
    ('Laptop Lenovo ThinkPad', 30.0, 'user'),
    
    -- Smartphones
    ('iPhone 15 Pro', 50.0, 'admin'),
    ('Samsung Galaxy S24', 45.0, 'admin'),
    ('Xiaomi Redmi Note 13', 60.0, 'user'),
    
    -- Tablets
    ('iPad Pro 12.9"', 20.0, 'admin'),
    ('Samsung Galaxy Tab S9', 25.0, 'admin'),
    
    -- Accesorios
    ('Mouse Logitech MX Master 3', 100.0, 'user'),
    ('Teclado Mecánico Keychron K8', 35.0, 'admin'),
    ('Monitor LG UltraWide 34"', 18.0, 'admin'),
    ('Auriculares Sony WH-1000XM5', 40.0, 'user'),
    ('Webcam Logitech C920', 55.0, 'admin'),
    
    -- Componentes
    ('SSD Samsung 1TB NVMe', 80.0, 'admin'),
    ('RAM Corsair 16GB DDR5', 45.0, 'user'),
    ('Tarjeta Gráfica RTX 4070', 12.0, 'admin'),
    ('Fuente de Poder 750W 80+ Gold', 25.0, 'admin')
) AS datos(nombre, saldo_inicial, creador)
WHERE EXISTS (SELECT 1 FROM user_ids WHERE admin_id IS NOT NULL OR user_id IS NOT NULL);

-- ============================================
-- PASO 3: Insertar Transacciones de Prueba
-- ============================================
-- Primero necesitamos los IDs de los maestros y usuarios
WITH maestro_ids AS (
    SELECT id, nombre FROM maestros WHERE nombre IN (
        'Laptop Dell XPS 15',
        'Laptop MacBook Pro M3',
        'iPhone 15 Pro',
        'Samsung Galaxy S24',
        'Monitor LG UltraWide 34"',
        'SSD Samsung 1TB NVMe'
    )
),
user_ids AS (
    SELECT 
        (SELECT id FROM users WHERE email = 'admin@ejemplo.com' LIMIT 1) as admin_id,
        (SELECT id FROM users WHERE email = 'usuario@ejemplo.com' LIMIT 1) as user_id
)
INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt")
SELECT 
    gen_random_uuid()::text,
    tipo,
    cantidad,
    maestro_id,
    usuario_id,
    fecha
FROM (
    -- Laptop Dell XPS 15
    SELECT 'ENTRADA'::text as tipo, 10.0 as cantidad, m.id as maestro_id, u.admin_id as usuario_id, now() - INTERVAL '25 days' as fecha
    FROM maestro_ids m, user_ids u WHERE m.nombre = 'Laptop Dell XPS 15'
    UNION ALL SELECT 'SALIDA', 3.0, m.id, u.user_id, now() - INTERVAL '20 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Laptop Dell XPS 15'
    UNION ALL SELECT 'ENTRADA', 5.0, m.id, u.admin_id, now() - INTERVAL '15 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Laptop Dell XPS 15'
    UNION ALL SELECT 'SALIDA', 2.0, m.id, u.user_id, now() - INTERVAL '10 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Laptop Dell XPS 15'
    UNION ALL SELECT 'SALIDA', 5.0, m.id, u.admin_id, now() - INTERVAL '5 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Laptop Dell XPS 15'
    
    -- MacBook Pro M3
    UNION ALL SELECT 'ENTRADA', 8.0, m.id, u.admin_id, now() - INTERVAL '28 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Laptop MacBook Pro M3'
    UNION ALL SELECT 'SALIDA', 2.0, m.id, u.user_id, now() - INTERVAL '22 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Laptop MacBook Pro M3'
    UNION ALL SELECT 'ENTRADA', 5.0, m.id, u.admin_id, now() - INTERVAL '18 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Laptop MacBook Pro M3'
    UNION ALL SELECT 'SALIDA', 4.0, m.id, u.admin_id, now() - INTERVAL '12 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Laptop MacBook Pro M3'
    UNION ALL SELECT 'SALIDA', 3.0, m.id, u.user_id, now() - INTERVAL '7 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Laptop MacBook Pro M3'
    
    -- iPhone 15 Pro
    UNION ALL SELECT 'ENTRADA', 30.0, m.id, u.admin_id, now() - INTERVAL '30 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'iPhone 15 Pro'
    UNION ALL SELECT 'SALIDA', 10.0, m.id, u.user_id, now() - INTERVAL '25 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'iPhone 15 Pro'
    UNION ALL SELECT 'SALIDA', 8.0, m.id, u.admin_id, now() - INTERVAL '20 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'iPhone 15 Pro'
    UNION ALL SELECT 'ENTRADA', 20.0, m.id, u.admin_id, now() - INTERVAL '15 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'iPhone 15 Pro'
    UNION ALL SELECT 'SALIDA', 12.0, m.id, u.user_id, now() - INTERVAL '10 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'iPhone 15 Pro'
    UNION ALL SELECT 'SALIDA', 10.0, m.id, u.admin_id, now() - INTERVAL '3 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'iPhone 15 Pro'
    
    -- Samsung Galaxy S24
    UNION ALL SELECT 'ENTRADA', 25.0, m.id, u.admin_id, now() - INTERVAL '27 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Samsung Galaxy S24'
    UNION ALL SELECT 'SALIDA', 5.0, m.id, u.user_id, now() - INTERVAL '23 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Samsung Galaxy S24'
    UNION ALL SELECT 'ENTRADA', 15.0, m.id, u.admin_id, now() - INTERVAL '19 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Samsung Galaxy S24'
    UNION ALL SELECT 'SALIDA', 8.0, m.id, u.admin_id, now() - INTERVAL '14 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Samsung Galaxy S24'
    UNION ALL SELECT 'SALIDA', 7.0, m.id, u.user_id, now() - INTERVAL '8 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Samsung Galaxy S24'
    
    -- Monitor LG UltraWide
    UNION ALL SELECT 'ENTRADA', 12.0, m.id, u.admin_id, now() - INTERVAL '26 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Monitor LG UltraWide 34"'
    UNION ALL SELECT 'SALIDA', 3.0, m.id, u.user_id, now() - INTERVAL '21 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Monitor LG UltraWide 34"'
    UNION ALL SELECT 'ENTRADA', 6.0, m.id, u.admin_id, now() - INTERVAL '16 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Monitor LG UltraWide 34"'
    UNION ALL SELECT 'SALIDA', 2.0, m.id, u.admin_id, now() - INTERVAL '11 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Monitor LG UltraWide 34"'
    UNION ALL SELECT 'SALIDA', 1.0, m.id, u.user_id, now() - INTERVAL '4 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'Monitor LG UltraWide 34"'
    
    -- SSD Samsung 1TB
    UNION ALL SELECT 'ENTRADA', 50.0, m.id, u.admin_id, now() - INTERVAL '29 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'SSD Samsung 1TB NVMe'
    UNION ALL SELECT 'SALIDA', 15.0, m.id, u.user_id, now() - INTERVAL '24 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'SSD Samsung 1TB NVMe'
    UNION ALL SELECT 'ENTRADA', 30.0, m.id, u.admin_id, now() - INTERVAL '17 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'SSD Samsung 1TB NVMe'
    UNION ALL SELECT 'SALIDA', 20.0, m.id, u.admin_id, now() - INTERVAL '13 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'SSD Samsung 1TB NVMe'
    UNION ALL SELECT 'SALIDA', 10.0, m.id, u.user_id, now() - INTERVAL '6 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'SSD Samsung 1TB NVMe'
    UNION ALL SELECT 'SALIDA', 15.0, m.id, u.admin_id, now() - INTERVAL '2 days' FROM maestro_ids m, user_ids u WHERE m.nombre = 'SSD Samsung 1TB NVMe'
) AS transacciones_data
WHERE EXISTS (SELECT 1 FROM user_ids WHERE admin_id IS NOT NULL OR user_id IS NOT NULL);

-- ============================================
-- PASO 4: Actualizar Saldos de Maestros
-- ============================================
UPDATE maestros m
SET saldo = COALESCE((
    SELECT SUM(
        CASE 
            WHEN t.tipo = 'ENTRADA' THEN t.cantidad
            WHEN t.tipo = 'SALIDA' THEN -t.cantidad
            ELSE 0
        END
    )
    FROM transacciones t
    WHERE t."maestroId" = m.id
), 0),
"updatedAt" = now();

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Ver todos los maestros con sus saldos
SELECT nombre, saldo, "createdAt" FROM maestros ORDER BY nombre;

-- Ver resumen de transacciones
SELECT 
    m.nombre,
    m.saldo as saldo_actual,
    COUNT(t.id) as total_transacciones,
    SUM(CASE WHEN t.tipo = 'ENTRADA' THEN t.cantidad ELSE 0 END) as total_entradas,
    SUM(CASE WHEN t.tipo = 'SALIDA' THEN t.cantidad ELSE 0 END) as total_salidas
FROM maestros m
LEFT JOIN transacciones t ON m.id = t."maestroId"
GROUP BY m.id, m.nombre, m.saldo
ORDER BY m.nombre;

