
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AuthState, UserInfo } from '@/types/auth';

interface AuthContextType {
  auth: AuthState;
  login: (token: string, user: UserInfo, userType: 'patient' | 'doctor') => void;
  logout: () => void;
  isDoctor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });
  
  const [isDoctor, setIsDoctor] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('user_info');
    const userType = localStorage.getItem('user_type');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuth({
          isAuthenticated: true,
          user,
          token
        });
        setIsDoctor(userType === 'doctor');
      } catch (error) {
        console.error('Failed to parse user info:', error);
        // Clear invalid data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
        localStorage.removeItem('user_type');
      }
    }
  }, []);

  const login = (token: string, user: UserInfo, userType: 'patient' | 'doctor') => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_info', JSON.stringify(user));
    localStorage.setItem('user_type', userType);
    
    setAuth({
      isAuthenticated: true,
      user,
      token
    });
    
    setIsDoctor(userType === 'doctor');
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    localStorage.removeItem('user_type');
    
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null
    });
    
    setIsDoctor(false);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isDoctor }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
