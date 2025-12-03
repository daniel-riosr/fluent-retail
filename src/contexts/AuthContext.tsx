import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, User, Role } from '@/lib/api';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Cargar usuario desde la sesión al iniciar
  useEffect(() => {
    const loadUser = async () => {
      const storedUserId = localStorage.getItem('auth_user_id');
      if (storedUserId) {
        try {
          const dbUser = await api.getUserById(storedUserId);
          if (dbUser) {
            setUser(dbUser);
          } else {
            localStorage.removeItem('auth_user_id');
          }
        } catch (error) {
          console.error('Error al cargar usuario:', error);
          localStorage.removeItem('auth_user_id');
        }
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Buscar usuario en la base de datos
      const dbUser = await api.getUserByEmail(email);

      if (!dbUser) {
        return false;
      }

      // Verificar contraseña
      // Nota: En producción, esto debería hacerse en el backend con hash
      // Por ahora, obtenemos la contraseña de la base de datos para comparar
      const { data: userData, error } = await supabase
        .from('users')
        .select('password')
        .eq('id', dbUser.id)
        .single();

      if (error || !userData) {
        return false;
      }

      // Comparar contraseñas (en producción, usar bcrypt o similar)
      if (userData.password !== password) {
        return false;
      }

      // Guardar usuario en el estado y localStorage
      setUser(dbUser);
      localStorage.setItem('auth_user_id', dbUser.id);
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user_id');
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
