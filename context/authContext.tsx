import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, logoutUser, getCurrentUser, registerUser, getUserById, updateUserProfile  } from '../services/authService';

interface AuthContextType {
  user: any;
  userId: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (newData: object) => Promise<void>;

}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log("🔍 Stored User ID from AsyncStorage:", storedUserId);

      if (storedUserId) {
        setUserId(storedUserId);
        const fetchedUser = await getUserById(storedUserId);
        console.log("📥 Fetched User Data from Backendless:", fetchedUser);
        if (fetchedUser) setUser(fetchedUser);
      }
    };
    fetchUser();
  }, []);


  const login = async (email: string, password: string) => {
  const user = await loginUser(email, password);
  console.log("✅ Logged in User:", user);
  setUser(user);
  setUserId(user.objectId);
  await AsyncStorage.setItem('userId', user.objectId); // Store user ID
};

const logout = async () => {
  await logoutUser();
  setUser(null);
  setUserId(null)
  await AsyncStorage.removeItem('userId'); // Clear user session
};


const register = async (email: string, password: string, name: string) => {
  console.log("🆕 Registering User:", { email, password, name });

  try {
    const newUser = await registerUser(email, password, name);
    console.log("New user from registerUser:", newUser);
    setUser(newUser);
    setUserId(newUser.objectId);
    await AsyncStorage.setItem('userId', user.objectId); // Store user ID
  } catch (error) {
    console.error("Error in AuthContext register:", error);
  }
};

const updateProfile = async (newData: object) => {
  if (!userId) {
    console.log("❌ No user ID found, cannot update profile");
    return;
  }
  console.log("🔄 Updating profile with:", newData);
  const updatedUser = await updateUserProfile(userId, newData);
  console.log("✅ Updated User Data:", updatedUser);
  setUser(updatedUser);
};
  return (
    <AuthContext.Provider value={{ user, userId, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};