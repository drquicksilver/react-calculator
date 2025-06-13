'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'default' | 'classic' | 'typewriter' | 'metal' | 'neon'; // Add more themes as needed
const THEME_FILES: Record<Theme, string | null> = {
  default: null, // No specific file for default, uses globals.css base
  classic: '/themes/classic.css',
  typewriter: '/themes/typewriter.css',
  metal: '/themes/metal.css',
  neon: '/themes/neon.css',
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('default'); // Default theme

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
