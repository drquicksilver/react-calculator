import React from 'react';
import { useOperationClick } from './OperationButtonProvider';
import { Operation } from '../types';

interface OperationButtonProps {
  operation: Operation;
  icon: React.ReactNode; // For +, -, x, / icons
  className?: string;
}

const baseClasses = "btn-base btn-hover btn-active p-2 active:scale-95 transition-transform duration-75 ease-out rounded text-xl flex items-center justify-center";

export default function OperationButton({ operation, icon, className }: OperationButtonProps) {
  const onOperationClick = useOperationClick();
  return (
    <button onClick={() => onOperationClick(operation)} className={`${baseClasses} ${className ?? ''}`}>
      {icon}
    </button>
  );
}
