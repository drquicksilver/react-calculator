import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OperationButton from './OperationButton';
import { OperationButtonProvider } from './OperationButtonProvider';
import { Operation } from '../types';

// Mock Icon
const MockIcon = () => <svg data-testid="mock-icon"></svg>;

describe('OperationButton', () => {
  it('renders the button with the icon', () => {
    const mockHandleOperationClick = jest.fn();
    render(
      <OperationButtonProvider onOperationClick={mockHandleOperationClick}>
        <OperationButton operation={Operation.Add} icon={<MockIcon />} />
      </OperationButtonProvider>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('calls onOperationClick with the correct operation when clicked', () => {
    const mockHandleOperationClick = jest.fn();
    render(
      <OperationButtonProvider onOperationClick={mockHandleOperationClick}>
        <OperationButton operation={Operation.Add} icon={<MockIcon />} />
      </OperationButtonProvider>
    );
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(mockHandleOperationClick).toHaveBeenCalledWith(Operation.Add);
  });

  it('applies custom className', () => {
    const mockHandleOperationClick = jest.fn();
    render(
      <OperationButtonProvider onOperationClick={mockHandleOperationClick}>
        <OperationButton operation={Operation.Add} icon={<MockIcon />} className="custom-class" />
      </OperationButtonProvider>
    );
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
