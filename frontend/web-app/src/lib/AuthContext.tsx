"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type UserRole = 'customer' | 'trainer' | 'none';

interface AuthContextType {
  token: string | null;
  role: UserRole;
  login: (token: string, role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: 'none',
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole>('none');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadToken = () => {
      try {
        const savedToken = localStorage.getItem('userToken');
        const savedRole = localStorage.getItem('userRole');
        
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

  const login = (newToken: string, newRole: UserRole) => {
    try {
      localStorage.setItem('userToken', newToken);
      localStorage.setItem('userRole', newRole);
      setToken(newToken);
      setRole(newRole);
      router.push('/');
    } catch (e) {
      console.error('Failed to save token', e);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userRole');
      setToken(null);
      setRole('none');
      router.push('/login');
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
