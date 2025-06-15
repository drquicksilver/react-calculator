'use client';
import React from 'react';

interface ExpressionInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  className?: string;
}

export default function ExpressionInput({
  value,
  onChange,
  onEnter,
  className,
}: ExpressionInputProps) {
  return (
    <input
      data-testid="expression-input"
      type="text"
      className={`bg-gray-200 text-right p-2 rounded mb-4 text-3xl h-20 w-full ${
        className ?? ''
      }`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && onEnter) {
          onEnter();
        }
      }}
    />
  );
}
