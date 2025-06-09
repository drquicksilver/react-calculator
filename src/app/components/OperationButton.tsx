import React from 'react';
import { useOperationClick } from './OperationButtonProvider';
import { Operation } from '../page'; // Assuming Operation enum is in page.tsx

interface OperationButtonProps {
  operation: Operation;
  icon: React.ReactNode; // For +, -, x, / icons
  className?: string;
}

const baseClasses = "p-2 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 active:scale-95 transition-transform duration-75 ease-out text-white rounded text-xl flex items-center justify-center";

export default function OperationButton({ operation, icon, className }: OperationButtonProps) {
  const onOperationClick = useOperationClick();
  return (
    <button onClick={() => onOperationClick(operation)} className={`${baseClasses} ${className ?? ''}`}>
      {icon}
    </button>
  );
}
