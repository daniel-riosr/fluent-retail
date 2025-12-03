// API functions para interactuar con Supabase
import { supabase } from './supabase';

export type TipoTransaccion = 'ENTRADA' | 'SALIDA';
export type Role = 'ADMIN' | 'USER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
}

export interface Maestro {
  id: string;
  nombre: string;
  saldo: number;
  creadoPor: string;
  creador?: {
    name: string;
  };
  createdAt: string;
}

export interface Transaccion {
  id: string;
  tipo: TipoTransaccion;
  cantidad: number;
  maestroId: string;
  usuarioId: string;
  maestro?: {
    nombre: string;
  };
  usuario?: {
    name: string;
  };
  createdAt: string;
}

// API Functions usando Supabase
export const api = {
  // Users
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error al obtener usuarios:', error);
      throw new Error('No se pudieron cargar los usuarios');
    }

    return (data || []).map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as Role,
      createdAt: user.createdAt,
    }));
  },

  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No encontrado
      console.error('Error al obtener usuario:', error);
      throw new Error('No se pudo cargar el usuario');
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role as Role,
      createdAt: data.createdAt,
    };
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No encontrado
      console.error('Error al obtener usuario por email:', error);
      throw new Error('No se pudo cargar el usuario');
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role as Role,
      createdAt: data.createdAt,
    };
  },

  async updateUserRole(userId: string, role: Role): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar rol:', error);
      throw new Error('No se pudo actualizar el rol del usuario');
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      role: data.role as Role,
      createdAt: data.createdAt,
    };
  },

  // Maestros
  async getMaestros(): Promise<Maestro[]> {
    try {
      console.log('🔍 Iniciando carga de maestros desde Supabase...');
      const { data, error } = await supabase
        .from('maestros')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) {
        console.error('❌ Error al obtener maestros:', error);
        console.error('Detalles del error:', JSON.stringify(error, null, 2));
        throw new Error(`No se pudieron cargar los maestros: ${error.message}`);
      }

      console.log('✅ Datos recibidos de maestros:', data?.length || 0, 'registros');

      if (!data || data.length === 0) {
        console.warn('⚠️ No hay maestros en la base de datos');
        return [];
      }

      // Obtener información de los creadores por separado
      const creadorIds = [...new Set(data.map(m => m.creadoPor))];
      console.log('🔍 Obteniendo información de creadores:', creadorIds.length, 'usuarios');
      
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, name')
        .in('id', creadorIds);

      if (usersError) {
        console.warn('⚠️ Error al obtener usuarios (continuando sin nombres):', usersError);
      }

      const usersMap = new Map((usersData || []).map(u => [u.id, u.name]));
      console.log('✅ Mapa de usuarios creado:', usersMap.size, 'usuarios');

      const result = data.map(maestro => ({
        id: maestro.id,
        nombre: maestro.nombre,
        saldo: maestro.saldo,
        creadoPor: maestro.creadoPor,
        creador: usersMap.get(maestro.creadoPor) ? { name: usersMap.get(maestro.creadoPor)! } : undefined,
        createdAt: maestro.createdAt,
      }));

      console.log('✅ Maestros procesados:', result.length);
      return result;
    } catch (error: any) {
      console.error('❌ Error completo al obtener maestros:', error);
      throw error;
    }
  },

  async getMaestroById(id: string): Promise<Maestro | null> {
    const { data, error } = await supabase
      .from('maestros')
      .select(`
        *,
        creador:users!maestros_creadoPor_fkey(name)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No encontrado
      console.error('Error al obtener maestro:', error);
      throw new Error('No se pudo cargar el maestro');
    }

    return {
      id: data.id,
      nombre: data.nombre,
      saldo: data.saldo,
      creadoPor: data.creadoPor,
      creador: data.creador ? { name: data.creador.name } : undefined,
      createdAt: data.createdAt,
    };
  },

  async createMaestro(nombre: string, saldoInicial: number, creadoPor: string): Promise<Maestro> {
    // Generar ID para el maestro
    const maestroId = crypto.randomUUID();
    
    const { data, error } = await supabase
      .from('maestros')
      .insert({
        id: maestroId,
        nombre,
        saldo: saldoInicial,
        creadoPor,
      })
      .select(`
        *,
        creador:users!maestros_creadoPor_fkey(name)
      `)
      .single();

    if (error) {
      console.error('Error al crear maestro:', error);
      throw new Error('No se pudo crear el maestro');
    }

    return {
      id: data.id,
      nombre: data.nombre,
      saldo: data.saldo,
      creadoPor: data.creadoPor,
      creador: data.creador ? { name: data.creador.name } : undefined,
      createdAt: data.createdAt,
    };
  },

  // Transacciones
  async getTransacciones(maestroId?: string): Promise<Transaccion[]> {
    let query = supabase
      .from('transacciones')
      .select(`
        *,
        maestro:maestros(nombre),
        usuario:users(name)
      `)
      .order('createdAt', { ascending: false });

    if (maestroId) {
      query = query.eq('maestroId', maestroId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error al obtener transacciones:', error);
      throw new Error('No se pudieron cargar las transacciones');
    }

    return (data || []).map(trans => ({
      id: trans.id,
      tipo: trans.tipo as TipoTransaccion,
      cantidad: trans.cantidad,
      maestroId: trans.maestroId,
      usuarioId: trans.usuarioId,
      maestro: trans.maestro ? { nombre: trans.maestro.nombre } : undefined,
      usuario: trans.usuario ? { name: trans.usuario.name } : undefined,
      createdAt: trans.createdAt,
    }));
  },

  async createTransaccion(
    tipo: TipoTransaccion,
    cantidad: number,
    maestroId: string,
    usuarioId: string
  ): Promise<Transaccion> {
    // Primero obtener el maestro para verificar saldo
    const maestro = await api.getMaestroById(maestroId);
    if (!maestro) {
      throw new Error('Maestro no encontrado');
    }

    // Calcular nuevo saldo
    const nuevoSaldo = tipo === 'ENTRADA' 
      ? maestro.saldo + cantidad 
      : maestro.saldo - cantidad;

    if (nuevoSaldo < 0) {
      throw new Error('No hay suficiente saldo para realizar esta transacción');
    }

    // Crear la transacción y actualizar el saldo del maestro en una transacción
    // Nota: Supabase no soporta transacciones multi-tabla directamente desde el cliente
    // Por lo que haremos dos operaciones separadas
    
    // Generar ID para la transacción
    const transaccionId = crypto.randomUUID();
    
    // 1. Crear la transacción
    const { data: transaccionData, error: transError } = await supabase
      .from('transacciones')
      .insert({
        id: transaccionId,
        tipo,
        cantidad,
        maestroId,
        usuarioId,
      })
      .select(`
        *,
        maestro:maestros(nombre),
        usuario:users(name)
      `)
      .single();

    if (transError) {
      console.error('Error al crear transacción:', transError);
      throw new Error('No se pudo crear la transacción');
    }

    // 2. Actualizar el saldo del maestro
    const { error: updateError } = await supabase
      .from('maestros')
      .update({ saldo: nuevoSaldo })
      .eq('id', maestroId);

    if (updateError) {
      console.error('Error al actualizar saldo:', updateError);
      // Intentar eliminar la transacción creada (rollback manual)
      await supabase.from('transacciones').delete().eq('id', transaccionData.id);
      throw new Error('No se pudo actualizar el saldo del maestro');
    }

    return {
      id: transaccionData.id,
      tipo: transaccionData.tipo as TipoTransaccion,
      cantidad: transaccionData.cantidad,
      maestroId: transaccionData.maestroId,
      usuarioId: transaccionData.usuarioId,
      maestro: transaccionData.maestro ? { nombre: transaccionData.maestro.nombre } : undefined,
      usuario: transaccionData.usuario ? { name: transaccionData.usuario.name } : undefined,
      createdAt: transaccionData.createdAt,
    };
  },

  // Obtener saldos diarios para gráfica
  async getSaldosDiarios(maestroId: string): Promise<{ fecha: string; saldo: number }[]> {
    const transacciones = await api.getTransacciones(maestroId);
    const maestro = await api.getMaestroById(maestroId);

    if (!maestro) return [];

    // Agrupar por fecha y calcular saldo acumulado
    const saldosPorFecha: { [key: string]: number } = {};
    let saldoAcumulado = 0;

    // Ordenar transacciones por fecha (más antiguas primero)
    const transaccionesOrdenadas = [...transacciones].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    transaccionesOrdenadas.forEach(trans => {
      const fecha = new Date(trans.createdAt).toISOString().split('T')[0];
      saldoAcumulado = trans.tipo === 'ENTRADA' 
        ? saldoAcumulado + trans.cantidad 
        : saldoAcumulado - trans.cantidad;
      saldosPorFecha[fecha] = saldoAcumulado;
    });

    // Convertir a array y ordenar por fecha
    return Object.entries(saldosPorFecha)
      .map(([fecha, saldo]) => ({ fecha, saldo }))
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  },
};
