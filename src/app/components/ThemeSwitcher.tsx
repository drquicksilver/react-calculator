'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '10px',
        background: 'rgba(255,255,255,0.8)',
        border: '1px solid #ccc',
        zIndex: 1000,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '14px',
      }}
    >
      <p style={{ marginBottom: '8px' }}>Current Theme: <strong>{theme}</strong></p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setTheme('default')} disabled={theme === 'default'} style={buttonStyle(theme === 'default')}>
          Default
        </button>
        <button onClick={() => setTheme('classic')} disabled={theme === 'classic'} style={buttonStyle(theme === 'classic')}>
          Classic
        </button>
        <button onClick={() => setTheme('typewriter')} disabled={theme === 'typewriter'} style={buttonStyle(theme === 'typewriter')}>
          Typewriter
        </button>
        <button onClick={() => setTheme('metal')} disabled={theme === 'metal'} style={buttonStyle(theme === 'metal')}>
          Metal
        </button>
        <button onClick={() => setTheme('neon')} disabled={theme === 'neon'} style={buttonStyle(theme === 'neon')}>
          Neon
        </button>
      </div>
    </div>
  );
};

// Basic styling for buttons to make them more visible
const buttonStyle = (isActive: boolean) => ({
  padding: '8px 12px',
  border: '1px solid #007bff',
  backgroundColor: isActive ? '#007bff' : '#ffffff',
  color: isActive ? '#ffffff' : '#007bff',
  cursor: 'pointer',
  borderRadius: '4px',
  opacity: isActive ? 0.7 : 1,
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '14px',
});

export default ThemeSwitcher;
