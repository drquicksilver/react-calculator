import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import ExpressionInput from './ExpressionInput';

describe('ExpressionInput', () => {
  it('calls onChange when the value changes', () => {
    const handleChange = vi.fn();
    render(
      <ExpressionInput value="" onChange={handleChange} />
    );
    const input = screen.getByTestId('expression-input');
    fireEvent.change(input, { target: { value: '2+2' } });
    expect(handleChange).toHaveBeenCalledWith('2+2');
  });

  it('calls onEnter when Enter key is pressed', () => {
    const handleEnter = vi.fn();
    render(
      <ExpressionInput value="" onChange={() => {}} onEnter={handleEnter} />
    );
    const input = screen.getByTestId('expression-input');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(handleEnter).toHaveBeenCalled();
  });
});
