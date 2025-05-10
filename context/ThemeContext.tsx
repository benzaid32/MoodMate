import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define theme colors
const lightTheme = {
  primary: '#6F4CFF', // Main purple
  primaryLight: '#EAE5FF',
  accent: '#FF8E3C', // Orange accent
  gradientStart: '#F9F9F9',
  gradientEnd: '#F3F0FF',
  background: '#FFFFFF',
  cardDark: '#FFFFFF',
  cardLight: '#F5F5F5',
  text: '#1A1A2E',
  textSecondary: '#666680',
  border: '#E5E5E5',
  error: '#FF4D4F',
  success: '#52C41A',
  warning: '#FAAD14',
  white: '#FFFFFF',
};

const darkTheme = {
  primary: '#8F6FFF', // Lighter purple for dark mode
  primaryLight: '#2D2145',
  accent: '#FF9F50', // Lighter orange for dark mode
  gradientStart: '#1A1A2E',
  gradientEnd: '#251C37',
  background: '#121212',
  cardDark: '#1E1E2E',
  cardLight: '#2A2A40',
  text: '#FFFFFF',
  textSecondary: '#AAAACC',
  border: '#333355',
  error: '#FF7875',
  success: '#73D13D',
  warning: '#FFC53D',
  white: '#FFFFFF',
};

type ThemeContextType = {
  isDark: boolean;
  colors: typeof lightTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');
  
  // Update theme based on system changes
  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  const colors = isDark ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);