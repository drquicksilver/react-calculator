import React, { createContext, useContext } from 'react';

export type NumberClickHandler = (value: string) => void;

const NumberClickContext = createContext<NumberClickHandler>(() => {});

interface ProviderProps {
  onNumberClick: NumberClickHandler;
  children: React.ReactNode;
}

export function NumberButtonProvider({ onNumberClick, children }: ProviderProps) {
  return (
    <NumberClickContext.Provider value={onNumberClick}>
      {children}
    </NumberClickContext.Provider>
  );
}

export function useNumberClick() {
  return useContext(NumberClickContext);
}
