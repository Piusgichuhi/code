import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthContextType, UserRole } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (username: string, role: UserRole) => {
    const newUser = { username, role };
    setUser(newUser);
    sessionStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
