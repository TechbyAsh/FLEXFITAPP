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
    gradients: {
      primary: string[];
      secondary: string[];
      dark: string[];
      bright: string[];
      card: string[];
    };
    glass: {
      background: string;
      border: string;
      highlight: string;
      shadow: string;
    };
    neomorphism: {
      lightShadow: string;
      darkShadow: string;
    };
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
    primary: '#0D1117',
    secondary: '#4ADE80', // Bright green
    text: '#FFFFFF',
    background: '#0D1117',
    border: '#252A33',
    success: '#4CAF50',
    error: '#F44336',
    card: '#161B22',
    overlay: 'rgba(0,0,0,0.7)',
    gradients: {
      primary: ['#4ADE80', '#22C55E'], // Bright green to emerald
      secondary: ['#4ADE80', '#22C55E'], // Bright green to emerald
      dark: ['#474449', '#2D232E'],
      bright: ['#505250', '#CBD3C1'],
      card: ['rgba(22,27,34,0.9)', 'rgba(13,17,23,0.9)'],
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