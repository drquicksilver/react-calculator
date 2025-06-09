import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpecialButton from './SpecialButton';
import { SpecialButtonProvider } from './SpecialButtonProvider';

describe('SpecialButton', () => {
  it('renders the button with its value as text by default', () => {
    const mockHandleSpecialClick = jest.fn();
    render(
      <SpecialButtonProvider onSpecialClick={mockHandleSpecialClick}>
        <SpecialButton value="AC" />
      </SpecialButtonProvider>
    );
    expect(screen.getByRole('button')).toHaveTextContent('AC');
  });

  it('renders children if provided', () => {
    const mockHandleSpecialClick = jest.fn();
    render(
      <SpecialButtonProvider onSpecialClick={mockHandleSpecialClick}>
        <SpecialButton value="PLUSMINUS"><span>+/-</span></SpecialButton>
      </SpecialButtonProvider>
    );
    expect(screen.getByRole('button')).toHaveTextContent('+/-');
    expect(screen.queryByText('PLUSMINUS')).not.toBeInTheDocument();
  });

  it('calls onSpecialClick with the correct value when clicked', () => {
    const mockHandleSpecialClick = jest.fn();
    const testValue = "AC";
    render(
      <SpecialButtonProvider onSpecialClick={mockHandleSpecialClick}>
        <SpecialButton value={testValue} />
      </SpecialButtonProvider>
    );
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(mockHandleSpecialClick).toHaveBeenCalledWith(testValue);
  });

  it('applies custom className', () => {
    const mockHandleSpecialClick = jest.fn();
    render(
      <SpecialButtonProvider onSpecialClick={mockHandleSpecialClick}>
        <SpecialButton value="AC" className="custom-class" />
      </SpecialButtonProvider>
    );
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
