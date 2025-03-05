import React, { createContext, useContext } from 'react';

// Define theme type
type ThemeType = {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
    border: string;
    success: string;
    error: string;
    card: string;
    overlay: string;
  },
  typography: {
    fontFamily: {
      regular: string;
      medium: string;
      bold: string;
    },
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    }
  },
};

// Default theme
const theme: ThemeType = {
  colors: {
    primary: '#000000',
    secondary: '#D4AF37', // Gold
    text: '#FFFFFF',
    background: '#121212',
    border: 'rgba(255, 255, 255, 0.1)',
    success: '#4CAF50',
    error: '#F44336',
    card: 'rgba(30, 30, 30, 0.75)',
    overlay: 'rgba(0,0,0,0.7)',
    gradients: {
      primary: ['#121212', '#1E1E1E'],
      secondary: ['#D4AF37', '#F0C75E'],
      dark: ['#000000', '#121212'],
      card: ['rgba(30, 30, 30, 0.85)', 'rgba(20, 20, 20, 0.75)'],
    },
    glass: {
      background: 'rgba(30, 30, 30, 0.25)',
      border: 'rgba(255, 255, 255, 0.1)',
      highlight: 'rgba(255, 255, 255, 0.05)',
      shadow: 'rgba(0, 0, 0, 0.5)',
    },
    neomorphism: {
      lightShadow: 'rgba(40, 40, 40, 0.5)',
      darkShadow: 'rgba(0, 0, 0, 0.6)',
    }
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
    }
  },
};

// Create context
const ThemeContext = createContext<ThemeType>(theme);

// Provider component
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for using the theme
export const useTheme = () => useContext(ThemeContext);