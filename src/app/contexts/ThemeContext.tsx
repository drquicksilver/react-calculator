'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'default' | 'classic' | 'typewriter'; // Add more themes as needed
const THEME_FILES: Record<Theme, string | null> = {
  default: null, // No specific file for default, uses globals.css base
  classic: '/themes/classic.css',
  typewriter: '/themes/typewriter.css',
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      return storedTheme || 'default';
    }
    return 'default'; // Default theme for server-side rendering
  });

  useEffect(() => {
    const themeFile = THEME_FILES[theme];
    let linkElement = document.getElementById('theme-stylesheet') as HTMLLinkElement | null;

    if (themeFile) {
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.id = 'theme-stylesheet';
        linkElement.rel = 'stylesheet';
        document.head.appendChild(linkElement);
      }
      linkElement.href = themeFile;
    } else {
      // If themeFile is null (e.g. for 'default'), remove the custom stylesheet
      if (linkElement) {
        linkElement.remove();
      }
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme); // Save theme to local storage
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
