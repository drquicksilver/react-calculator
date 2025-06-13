'use client';

import React from 'react';
import { useMode } from '../contexts/ModeContext';

const ModeToggle: React.FC = () => {
  const { mode, setMode } = useMode();

  return (
    <div
      style={{
        padding: '10px',
        background: 'rgba(255,255,255,0.8)',
        border: '1px solid #ccc',
        zIndex: 1000,
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '14px',
      }}
    >
      <p style={{ marginBottom: '8px' }}>
        Mode: <strong>{mode}</strong>
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setMode('classic')}
          disabled={mode === 'classic'}
          style={buttonStyle(mode === 'classic')}
        >
          Classic
        </button>
        <button
          onClick={() => setMode('algebraic')}
          disabled={mode === 'algebraic'}
          style={buttonStyle(mode === 'algebraic')}
        >
          Algebraic
        </button>
      </div>
    </div>
  );
};

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

export default ModeToggle;
