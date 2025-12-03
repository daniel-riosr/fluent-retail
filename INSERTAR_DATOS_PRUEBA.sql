-- ============================================
-- INSERTAR DATOS DE PRUEBA: ARTÍCULOS TECNOLÓGICOS
-- ============================================
-- Ejecuta estos comandos UNO POR UNO en el SQL Editor de Supabase
-- Asegúrate de tener usuarios creados primero

-- ============================================
-- PASO 1: Obtener IDs de usuarios (ejecuta esto primero)
-- ============================================
SELECT id, email, name FROM users;

-- Copia los IDs que aparezcan y reemplázalos en los siguientes comandos
-- O usa directamente estos comandos que los obtienen automáticamente:

-- ============================================
-- PASO 2: Insertar Maestros (Artículos Tecnológicos)
-- ============================================
-- Este comando obtiene automáticamente los IDs de usuarios

INSERT INTO maestros (id, nombre, saldo, "creadoPor", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid()::text,
    datos.nombre,
    datos.saldo,
    CASE 
        WHEN datos.creador = 'admin' THEN (SELECT id FROM users WHERE email = 'admin@ejemplo.com' LIMIT 1)
        ELSE (SELECT id FROM users WHERE email = 'usuario@ejemplo.com' LIMIT 1)
    END,
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
) AS datos(nombre, saldo, creador)
ON CONFLICT DO NOTHING;

-- ============================================
-- PASO 3: Insertar Transacciones de Prueba
-- ============================================
-- Primero, vamos a insertar transacciones para algunos productos

-- Transacciones para Laptop Dell XPS 15
INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt")
SELECT 
    gen_random_uuid()::text,
    datos.tipo::"TipoTransaccion",
    datos.cantidad,
    (SELECT id FROM maestros WHERE nombre = 'Laptop Dell XPS 15' LIMIT 1),
    CASE 
        WHEN datos.usuario = 'admin' THEN (SELECT id FROM users WHERE email = 'admin@ejemplo.com' LIMIT 1)
        ELSE (SELECT id FROM users WHERE email = 'usuario@ejemplo.com' LIMIT 1)
    END,
    datos.fecha
FROM (VALUES
    ('ENTRADA', 10.0, 'admin', now() - INTERVAL '25 days'),
    ('SALIDA', 3.0, 'user', now() - INTERVAL '20 days'),
    ('ENTRADA', 5.0, 'admin', now() - INTERVAL '15 days'),
    ('SALIDA', 2.0, 'user', now() - INTERVAL '10 days'),
    ('SALIDA', 5.0, 'admin', now() - INTERVAL '5 days')
) AS datos(tipo, cantidad, usuario, fecha);

-- Transacciones para MacBook Pro M3
INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt")
SELECT 
    gen_random_uuid()::text,
    datos.tipo::"TipoTransaccion",
    datos.cantidad,
    (SELECT id FROM maestros WHERE nombre = 'Laptop MacBook Pro M3' LIMIT 1),
    CASE 
        WHEN datos.usuario = 'admin' THEN (SELECT id FROM users WHERE email = 'admin@ejemplo.com' LIMIT 1)
        ELSE (SELECT id FROM users WHERE email = 'usuario@ejemplo.com' LIMIT 1)
    END,
    datos.fecha
FROM (VALUES
    ('ENTRADA', 8.0, 'admin', now() - INTERVAL '28 days'),
    ('SALIDA', 2.0, 'user', now() - INTERVAL '22 days'),
    ('ENTRADA', 5.0, 'admin', now() - INTERVAL '18 days'),
    ('SALIDA', 4.0, 'admin', now() - INTERVAL '12 days'),
    ('SALIDA', 3.0, 'user', now() - INTERVAL '7 days')
) AS datos(tipo, cantidad, usuario, fecha);

-- Transacciones para iPhone 15 Pro
INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt")
SELECT 
    gen_random_uuid()::text,
    datos.tipo::"TipoTransaccion",
    datos.cantidad,
    (SELECT id FROM maestros WHERE nombre = 'iPhone 15 Pro' LIMIT 1),
    CASE 
        WHEN datos.usuario = 'admin' THEN (SELECT id FROM users WHERE email = 'admin@ejemplo.com' LIMIT 1)
        ELSE (SELECT id FROM users WHERE email = 'usuario@ejemplo.com' LIMIT 1)
    END,
    datos.fecha
FROM (VALUES
    ('ENTRADA', 30.0, 'admin', now() - INTERVAL '30 days'),
    ('SALIDA', 10.0, 'user', now() - INTERVAL '25 days'),
    ('SALIDA', 8.0, 'admin', now() - INTERVAL '20 days'),
    ('ENTRADA', 20.0, 'admin', now() - INTERVAL '15 days'),
    ('SALIDA', 12.0, 'user', now() - INTERVAL '10 days'),
    ('SALIDA', 10.0, 'admin', now() - INTERVAL '3 days')
) AS datos(tipo, cantidad, usuario, fecha);

-- Transacciones para Samsung Galaxy S24
INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt")
SELECT 
    gen_random_uuid()::text,
    datos.tipo::"TipoTransaccion",
    datos.cantidad,
    (SELECT id FROM maestros WHERE nombre = 'Samsung Galaxy S24' LIMIT 1),
    CASE 
        WHEN datos.usuario = 'admin' THEN (SELECT id FROM users WHERE email = 'admin@ejemplo.com' LIMIT 1)
        ELSE (SELECT id FROM users WHERE email = 'usuario@ejemplo.com' LIMIT 1)
    END,
    datos.fecha
FROM (VALUES
    ('ENTRADA', 25.0, 'admin', now() - INTERVAL '27 days'),
    ('SALIDA', 5.0, 'user', now() - INTERVAL '23 days'),
    ('ENTRADA', 15.0, 'admin', now() - INTERVAL '19 days'),
    ('SALIDA', 8.0, 'admin', now() - INTERVAL '14 days'),
    ('SALIDA', 7.0, 'user', now() - INTERVAL '8 days')
) AS datos(tipo, cantidad, usuario, fecha);

-- Transacciones para Monitor LG UltraWide
INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt")
SELECT 
    gen_random_uuid()::text,
    datos.tipo::"TipoTransaccion",
    datos.cantidad,
    (SELECT id FROM maestros WHERE nombre = 'Monitor LG UltraWide 34"' LIMIT 1),
    CASE 
        WHEN datos.usuario = 'admin' THEN (SELECT id FROM users WHERE email = 'admin@ejemplo.com' LIMIT 1)
        ELSE (SELECT id FROM users WHERE email = 'usuario@ejemplo.com' LIMIT 1)
    END,
    datos.fecha
FROM (VALUES
    ('ENTRADA', 12.0, 'admin', now() - INTERVAL '26 days'),
    ('SALIDA', 3.0, 'user', now() - INTERVAL '21 days'),
    ('ENTRADA', 6.0, 'admin', now() - INTERVAL '16 days'),
    ('SALIDA', 2.0, 'admin', now() - INTERVAL '11 days'),
    ('SALIDA', 1.0, 'user', now() - INTERVAL '4 days')
) AS datos(tipo, cantidad, usuario, fecha);

-- Transacciones para SSD Samsung 1TB
INSERT INTO transacciones (id, tipo, cantidad, "maestroId", "usuarioId", "createdAt")
SELECT 
    gen_random_uuid()::text,
    datos.tipo::"TipoTransaccion",
    datos.cantidad,
    (SELECT id FROM maestros WHERE nombre = 'SSD Samsung 1TB NVMe' LIMIT 1),
    CASE 
        WHEN datos.usuario = 'admin' THEN (SELECT id FROM users WHERE email = 'admin@ejemplo.com' LIMIT 1)
        ELSE (SELECT id FROM users WHERE email = 'usuario@ejemplo.com' LIMIT 1)
    END,
    datos.fecha
FROM (VALUES
    ('ENTRADA', 50.0, 'admin', now() - INTERVAL '29 days'),
    ('SALIDA', 15.0, 'user', now() - INTERVAL '24 days'),
    ('ENTRADA', 30.0, 'admin', now() - INTERVAL '17 days'),
    ('SALIDA', 20.0, 'admin', now() - INTERVAL '13 days'),
    ('SALIDA', 10.0, 'user', now() - INTERVAL '6 days'),
    ('SALIDA', 15.0, 'admin', now() - INTERVAL '2 days')
) AS datos(tipo, cantidad, usuario, fecha);

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
-- VERIFICACIÓN (Opcional)
-- ============================================
-- Ver todos los maestros
SELECT nombre, saldo, "createdAt" FROM maestros ORDER BY nombre;

-- Ver resumen de transacciones por maestro
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

