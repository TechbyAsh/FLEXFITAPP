
import React, { createContext, useContext, useState } from 'react';

// Define the theme colors
export const colors = {
  background: {
    primary: '#000000',
    secondary: '#121212',
    tertiary: '#1E1E1E',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    tertiary: '#999999',
  },
  accent: {
    gold: '#D4AF37',
    green: '#4CAF50',
    silver: '#C0C0C0',
  },
  button: {
    primary: '#D4AF37',
    secondary: '#4CAF50',
    disabled: '#333333',
  }
};

// Create the theme context
type ThemeContextType = {
  colors: typeof colors;
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const value = {
    colors,
    darkMode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
