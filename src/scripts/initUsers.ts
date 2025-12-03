// Script para inicializar usuarios por defecto en Supabase
// Ejecutar una vez para crear los usuarios iniciales

import { supabase } from '../lib/supabase';

const initUsers = async () => {
  console.log('Inicializando usuarios por defecto...');

  const defaultUsers = [
    {
      email: 'admin@ejemplo.com',
      name: 'Administrador',
      password: 'admin123', // En producción, esto debería estar hasheado
      role: 'ADMIN' as const,
    },
    {
      email: 'usuario@ejemplo.com',
      name: 'Usuario Demo',
      password: 'usuario123', // En producción, esto debería estar hasheado
      role: 'USER' as const,
    },
  ];

  for (const user of defaultUsers) {
    // Verificar si el usuario ya existe
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!existingUser) {
      const { data, error } = await supabase
        .from('users')
        .insert({
          email: user.email,
          name: user.name,
          password: user.password, // En producción, usar hash
          role: user.role,
        })
        .select()
        .single();

      if (error) {
        console.error(`Error al crear usuario ${user.email}:`, error);
      } else {
        console.log(`Usuario ${user.email} creado exitosamente`);
      }
    } else {
      console.log(`Usuario ${user.email} ya existe`);
    }
  }

  console.log('Inicialización completada');
};

// Ejecutar si se llama directamente
if (typeof window !== 'undefined') {
  // Solo ejecutar en el navegador y si el usuario lo solicita
  (window as any).initUsers = initUsers;
}

export default initUsers;

