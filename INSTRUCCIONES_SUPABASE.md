# Instrucciones para Configurar Supabase

## Paso 1: Obtener las Credenciales de Supabase

1. Ve a tu proyecto en [Supabase](https://supabase.com)
2. Ve a **Settings** → **API**
3. Encontrarás:
   - **Project URL**: `https://kxumvrelikewfinnfmlv.supabase.co` (ya configurado)
   - **anon public key**: Copia esta clave (es larga, algo como `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Paso 2: Actualizar el archivo .env

Abre el archivo `.env` en la raíz del proyecto y actualiza la línea:

```
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

Reemplaza `tu_anon_key_aqui` con la clave anon que copiaste de Supabase.

El archivo `.env` debería verse así:

```env
DATABASE_URL="postgresql://postgres.kxumvrelikewfinnfmlv:GestionInvetario123456789@aws-1-us-east-2.pooler.supabase.com:5432/postgres?schema=public"

# Supabase Configuration
VITE_SUPABASE_URL=https://kxumvrelikewfinnfmlv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (tu clave real aquí)
```

## Paso 3: Crear los Usuarios Iniciales

Después de configurar las variables de entorno, necesitas crear los usuarios por defecto en la base de datos.

### Opción A: Desde Prisma Studio (Recomendado)

1. Ejecuta: `npm run db:studio`
2. Abre la tabla `users`
3. Haz clic en "Add record" y crea estos dos usuarios:

**Usuario Administrador:**
- id: (se genera automáticamente)
- email: `admin@ejemplo.com`
- name: `Administrador`
- password: `admin123`
- role: `ADMIN`
- createdAt: (se genera automáticamente)
- updatedAt: (se genera automáticamente)

**Usuario Regular:**
- id: (se genera automáticamente)
- email: `usuario@ejemplo.com`
- name: `Usuario Demo`
- password: `usuario123`
- role: `USER`
- createdAt: (se genera automáticamente)
- updatedAt: (se genera automáticamente)

### Opción B: Desde la Consola del Navegador

1. Ejecuta la aplicación: `npm run dev`
2. Abre la consola del navegador (F12)
3. Ejecuta: `window.initUsers()`

### Opción C: SQL Directo en Supabase

1. Ve a Supabase → SQL Editor
2. Ejecuta este SQL:

```sql
INSERT INTO users (email, name, password, role) VALUES
('admin@ejemplo.com', 'Administrador', 'admin123', 'ADMIN'),
('usuario@ejemplo.com', 'Usuario Demo', 'usuario123', 'USER')
ON CONFLICT (email) DO NOTHING;
```

## Paso 4: Verificar la Configuración

1. Reinicia el servidor de desarrollo: `npm run dev`
2. Intenta iniciar sesión con:
   - Email: `admin@ejemplo.com` / Password: `admin123`
   - Email: `usuario@ejemplo.com` / Password: `usuario123`

## Notas Importantes

⚠️ **Seguridad**: En producción, las contraseñas deben estar hasheadas (usando bcrypt o similar). Por ahora, para desarrollo, las guardamos en texto plano.

⚠️ **Row Level Security (RLS)**: Por defecto, Supabase tiene RLS habilitado. Para que funcione correctamente, necesitarás deshabilitarlo temporalmente o configurar políticas. Ve a:
- Supabase → Authentication → Policies
- O deshabilita RLS temporalmente en Settings → Database

## Solución de Problemas

### Error: "Faltan las variables de entorno"
- Verifica que el archivo `.env` tenga `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
- Reinicia el servidor de desarrollo después de cambiar `.env`

### Error: "Permission denied" o "Row Level Security"
- Ve a Supabase → Settings → Database
- Deshabilita temporalmente Row Level Security o configura políticas apropiadas

### Los datos no se guardan
- Verifica que las tablas existan en Supabase
- Revisa la consola del navegador para errores
- Verifica que las credenciales sean correctas

