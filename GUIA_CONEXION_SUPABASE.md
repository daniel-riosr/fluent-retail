# Guía para Obtener la Cadena de Conexión de Supabase

## Método 1: Desde la Interfaz de Supabase

### Paso 1: Acceder a Settings
1. Inicia sesión en [Supabase](https://supabase.com)
2. Selecciona tu proyecto
3. En el menú lateral izquierdo, haz clic en **Settings** (⚙️)

### Paso 2: Ir a Database Settings
1. En el menú de Settings, haz clic en **Database**
2. Desplázate hacia abajo hasta encontrar la sección **"Connection string"** o **"Connection info"**

### Paso 3: Copiar la Cadena de Conexión
1. Busca la pestaña que dice **"URI"** o **"Connection string"**
2. Deberías ver algo como:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
3. Haz clic en el botón **"Copy"** o copia manualmente
4. **IMPORTANTE**: Reemplaza `[YOUR-PASSWORD]` con tu contraseña real de la base de datos

### Paso 4: Si no encuentras la contraseña
1. En la misma página de Database Settings
2. Busca la sección **"Database password"** o **"Reset database password"**
3. Si no la recuerdas, puedes hacer clic en **"Reset database password"**
4. Se te mostrará o enviará la nueva contraseña

---

## Método 2: Construir la URL Manualmente

Si no encuentras la cadena de conexión, puedes construirla manualmente con esta información:

### Información que necesitas:

1. **Project Reference (ID del Proyecto)**
   - Ve a Settings → General
   - Busca "Reference ID" o "Project ID"
   - Es algo como: `abcdefghijklmnop`

2. **Database Password**
   - Ve a Settings → Database
   - Busca "Database password"
   - Si no la tienes, haz clic en "Reset database password"

3. **Host y Puerto**
   - Host: `db.[TU-PROJECT-REF].supabase.co`
   - Puerto: `5432` (o `6543` para connection pooling)
   - Database: `postgres`

### Formato de la URL:

```
postgresql://postgres:[TU-CONTRASEÑA]@db.[TU-PROJECT-REF].supabase.co:5432/postgres?schema=public
```

### Ejemplo:

Si tu Project Reference es `abcdefghijklmnop` y tu contraseña es `MiPassword123`, la URL sería:

```
postgresql://postgres:MiPassword123@db.abcdefghijklmnop.supabase.co:5432/postgres?schema=public
```

---

## Método 3: Usar Connection Pooling (Recomendado)

Para producción, es mejor usar Connection Pooling:

1. Ve a Settings → Database
2. Busca "Connection pooling"
3. Selecciona la opción "Session mode" o "Transaction mode"
4. Copia la URL (usará el puerto 6543 en lugar de 5432)

Formato:
```
postgresql://postgres:[TU-CONTRASEÑA]@db.[TU-PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true&schema=public
```

---

## Configurar el archivo .env

Una vez que tengas la URL, edita el archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://postgres:TU_CONTRASEÑA@db.TU_PROJECT_REF.supabase.co:5432/postgres?schema=public"
```

**IMPORTANTE:**
- Reemplaza `TU_CONTRASEÑA` con tu contraseña real
- Reemplaza `TU_PROJECT_REF` con tu Project Reference
- Mantén las comillas dobles alrededor de la URL

---

## Verificar la Conexión

Después de configurar el `.env`, ejecuta:

```bash
# Generar el cliente de Prisma
npm run db:generate

# Probar la conexión ejecutando una migración
npm run db:migrate
```

Si hay errores, verifica:
- ✅ La contraseña es correcta (sin espacios extra)
- ✅ El Project Reference es correcto
- ✅ El archivo `.env` está en la raíz del proyecto
- ✅ La URL está entre comillas dobles

