# Solución: Página de Transacciones en Blanco

## Pasos para Diagnosticar

### 1. Verificar la Consola del Navegador

Abre las herramientas de desarrollador (F12) y revisa:
- **Console**: Busca errores en rojo
- **Network**: Verifica si hay peticiones fallidas a Supabase

### 2. Verificar Variables de Entorno

Asegúrate de que el archivo `.env` tenga:
```env
VITE_SUPABASE_URL=https://kxumvrelikewfinnfmlv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANTE**: Después de cambiar `.env`, **reinicia el servidor**:
```bash
# Detén el servidor (Ctrl+C) y vuelve a iniciarlo
npm run dev
```

### 3. Verificar Row Level Security (RLS)

En Supabase:
1. Ve a **Settings** → **Database**
2. Busca **"Row Level Security"**
3. **Desactívalo** para las tablas:
   - `users`
   - `maestros`
   - `transacciones`

### 4. Verificar que Existen Maestros

La página puede estar en blanco porque no hay maestros. Verifica:
- Ve a Supabase → **Table Editor** → `maestros`
- Si no hay maestros, crea uno desde la página de Maestros

### 5. Verificar la Conexión a Supabase

Abre la consola del navegador y ejecuta:
```javascript
// Verificar que Supabase está configurado
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Configurado' : 'Faltante');
```

### 6. Probar la Conexión Directamente

En la consola del navegador:
```javascript
import { supabase } from './lib/supabase';
const { data, error } = await supabase.from('maestros').select('*');
console.log('Maestros:', data);
console.log('Error:', error);
```

## Soluciones Comunes

### Error: "Faltan variables de entorno"
→ Reinicia el servidor después de cambiar `.env`

### Error: "Permission denied" o "Row Level Security"
→ Deshabilita RLS en Supabase Settings → Database

### Página en blanco sin errores
→ Probablemente no hay maestros. Crea uno desde la página de Maestros

### Error de CORS
→ Verifica que la URL de Supabase sea correcta en `.env`

## Cambios Realizados

He mejorado el código para:
- ✅ Mostrar estado de carga mientras se cargan los datos
- ✅ Mostrar errores claramente si algo falla
- ✅ Simplificar la consulta de maestros (sin relaciones complejas)
- ✅ Mostrar mensaje cuando no hay maestros

## Próximos Pasos

1. **Reinicia el servidor** si cambiaste `.env`
2. **Deshabilita RLS** en Supabase
3. **Crea un maestro** desde la página de Maestros si no hay ninguno
4. **Revisa la consola** del navegador para ver errores específicos

