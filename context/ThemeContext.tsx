
import React, { createContext, useContext } from 'react';

// Define theme colors
export const theme = {
  colors: {
    primary: '#000000', // Black
    secondary: '#D4AF37', // Gold
    accent1: '#4CAF50', // Green
    accent2: '#C0C0C0', // Silver
    background: '#121212', // Dark background
    surface: '#1E1E1E', // Slightly lighter surface
    text: '#FFFFFF', // White text
    textSecondary: '#AAAAAA', // Light grey text
    border: '#333333', // Dark border
    success: '#4CAF50', // Green for success
    error: '#F44336', // Red for errors
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    round: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'Montserrat-Regular',
      medium: 'Montserrat-Medium',
      bold: 'Montserrat-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
  },
};

const ThemeContext = createContext(theme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
