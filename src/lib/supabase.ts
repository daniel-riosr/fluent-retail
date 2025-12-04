import { createClient } from '@supabase/supabase-js';

// Obtener las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Verificar que las variables se carguen correctamente
if (import.meta.env.DEV) {
  console.log('🔍 Variables de entorno:', {
    VITE_SUPABASE_URL: supabaseUrl ? '✅ Configurada' : '❌ Faltante',
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? `✅ Configurada (${supabaseAnonKey.substring(0, 20)}...)` : '❌ Faltante',
  });
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Variables de entorno faltantes');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Presente' : 'Faltante');
  throw new Error(
    'Faltan las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY. ' +
    'Por favor, agrégalas al archivo .env y reinicia el servidor de desarrollo.'
  );
}

// Crear el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey,
    },
  },
});

