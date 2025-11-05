'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/auth.service';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '../lib/http';
import type { LoginResponse, UserMinimal } from '../types/api';

type User = UserMinimal;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = 'ternurinhas-user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  useEffect(() => {
    const boot = async () => {
      const refresh = getRefreshToken?.();
      if (!refresh) return;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL_NO_V1}token/refresh/`,
          { refresh }
        );
        setTokens?.({ access: data.access, refresh });
      } catch {
        clearTokens?.();
        setUser(null);
      }
    };
    boot();
  }, []);

  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    try {
      const data = await apiLogin(emailOrUsername, password);
      setUser((data as LoginResponse).user);
      return true;
    } catch {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      await apiRegister({ username: email, password, email, first_name: name.split(' ')[0], last_name: name.split(' ').slice(1).join(' ') });
      return await login(email, password);
    } catch {
      return false;
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user && !!getAccessToken?.(),
      login,
      register,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
