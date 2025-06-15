import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Home from './page';
import { ModeProvider } from './contexts/ModeContext';
import { ThemeProvider } from './contexts/ThemeContext';

function renderWithProviders() {
  return render(
    <ThemeProvider>
      <ModeProvider>
        <Home />
      </ModeProvider>
    </ThemeProvider>
  );
}

describe('Home page', () => {
  it('shows x button in algebraic mode and inputs x', () => {
    renderWithProviders();
    fireEvent.click(screen.getByRole('button', { name: 'Algebraic' }));
    const xButton = screen.getByRole('button', { name: 'x' });
    fireEvent.click(xButton);
    expect(screen.getByTestId('expression-input')).toHaveValue('x');
  });
});
