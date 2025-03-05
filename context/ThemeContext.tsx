
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

// Define theme types
type ThemeColors = {
  primary: string;
  secondary: string;
  text: string;
  background: string;
  card: string;
  border: string;
  surface: string;
};

type ThemeTypography = {
  fontFamily: {
    regular: string;
    medium: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
};

type Theme = {
  dark: boolean;
  colors: ThemeColors;
  typography: ThemeTypography;
};

// Define themes
const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#000000', // Black
    secondary: '#D4AF37', // Gold
    text: '#333333',
    background: '#FFFFFF',
    card: '#F5F5F5',
    border: '#E0E0E0',
    surface: '#FFFFFF',
  },
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
  },
};

const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#000000', // Black
    secondary: '#D4AF37', // Gold
    text: '#FFFFFF',
    background: '#121212',
    card: '#1E1E1E',
    border: '#333333',
    surface: '#1E1E1E',
  },
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
  },
};

// Create context
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use the theme context
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context.theme;
};
