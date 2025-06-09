import React from 'react';
import { useNumberClick } from './NumberButtonProvider';

interface NumberButtonProps {
  value: string;
  className?: string;
}

const baseClasses = "btn-base btn-hover btn-active p-2 active:scale-95 transition-transform duration-75 ease-out rounded text-xl flex items-center justify-center";

export default function NumberButton({ value, className }: NumberButtonProps) {
  const onNumberClick = useNumberClick();
  return (
    <button onClick={() => onNumberClick(value)} className={`${baseClasses} ${className ?? ''}`}>{value}</button>
  );
}
