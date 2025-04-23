import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  loginUser,
  logoutUser,
  getCurrentUser,
  registerUser,
  getUserById,
  updateUserProfile,
} from '../services/authService';

interface AuthContextType {
  user: any;
  userId: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (newData: object) => Promise<void>;
  setUser: (user: any) => void;              // <- Add this
  setUserId: (id: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        console.log("🔍 Stored User ID from AsyncStorage:", storedUserId);

        if (storedUserId) {
          setUserId(storedUserId);

          const fetchedUser = await getUserById(storedUserId);
          console.log("📥 Fetched User Data from Backendless:", fetchedUser);

          if (fetchedUser) {
            setUser(fetchedUser);
          } else {
            console.warn("⚠️ No user found with that ID in Backendless");
          }
        } else {
          console.warn("⚠️ No stored user ID found in AsyncStorage");
        }
      } catch (error) {
        console.error("❌ Error fetching user from AsyncStorage/Backendless:", error);
      }
    };

    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await loginUser(email, password);
      console.log("✅ Logged in User:", user);
      setUser(user);
      setUserId(user.objectId);
      await AsyncStorage.setItem('userId', user.objectId);
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setUserId(null);
      await AsyncStorage.removeItem('userId');
    } catch (error) {
      console.error("❌ Logout error:", error);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    console.log("🆕 Registering User:", { email, password, name });

    try {
      const newUser = await registerUser(email, password, name, false);
      console.log("✅ New user registered:", newUser);

      setUser(newUser);
      setUserId(newUser.objectId);
      await AsyncStorage.setItem('userId', newUser.objectId); // ✅ FIXED HERE
    } catch (error) {
      console.error("❌ Error in AuthContext register:", error);
      throw error;
    }
  };

  const updateProfile = async (newData: object) => {
    if (!userId) {
      console.log("❌ No user ID found, cannot update profile");
      return;
    }

    try {
      console.log("🔄 Updating profile with:", newData);
      const updatedUser = await updateUserProfile(userId, newData);
      console.log("✅ Updated User Data:", updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userId, login, logout, register, updateProfile,setUser, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};