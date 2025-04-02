import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, logoutUser, getCurrentUser, registerUser } from '../services/authService';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;

}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };
    fetchUser();
  }, []);


  const login = async (email: string, password: string) => {
  const user = await loginUser(email, password);
  setUser(user);
};

const logout = async () => {
  await logoutUser();
  setUser(null);
};


  const register = async (email: string, password: string, name: string) => {
    console.log("AuthContext register function called"); // Debugging log
    
    try {
      const newUser = await registerUser(email, password, name);
      console.log("New user from registerUser:", newUser);
      setUser(newUser); // Automatically log in after sign-up
    } catch (error) {
      console.error("Error in AuthContext register:", error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};