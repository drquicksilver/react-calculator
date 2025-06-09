import React from 'react';
import { useSpecialClick } from './SpecialButtonProvider';

interface SpecialButtonProps {
  value: string; // e.g., "AC", "+/-", "%", "."
  className?: string;
  children?: React.ReactNode; // To allow for text or icon
}

const baseClasses = "p-2 bg-gray-300 hover:bg-gray-400 active:bg-gray-500 active:scale-95 transition-transform duration-75 ease-out rounded text-xl flex items-center justify-center";

export default function SpecialButton({ value, className, children }: SpecialButtonProps) {
  const onSpecialClick = useSpecialClick();
  return (
    <button onClick={() => onSpecialClick(value)} className={`${baseClasses} ${className ?? ''}`}>
      {children ?? value}
    </button>
  );
}
