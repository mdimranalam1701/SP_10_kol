import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

type UserRole = 'customer' | 'trainer' | 'none';

interface AuthContextType {
  token: string | null;
  role: UserRole;
  login: (token: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: 'none',
  login: async () => {},
  logout: async () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>('none');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await SecureStore.getItemAsync('userToken');
        const savedRole = await SecureStore.getItemAsync('userRole');
        
        if (savedToken && savedRole) {
          setToken(savedToken);
          setRole(savedRole as UserRole);
        }
      } catch (e) {
        console.error('Failed to load token', e);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadToken();
  }, []);

  const login = async (newToken: string, newRole: UserRole) => {
    try {
      await SecureStore.setItemAsync('userToken', newToken);
      await SecureStore.setItemAsync('userRole', newRole);
      setToken(newToken);
      setRole(newRole);
    } catch (e) {
      console.error('Failed to save token', e);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userRole');
      setToken(null);
      setRole('none');
    } catch (e) {
      console.error('Failed to remove token', e);
    }
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
