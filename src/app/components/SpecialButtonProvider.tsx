import React, { createContext, useContext } from 'react';

export type SpecialClickHandler = (value: string) => void;

const SpecialClickContext = createContext<SpecialClickHandler>(() => {});

interface ProviderProps {
  onSpecialClick: SpecialClickHandler;
  children: React.ReactNode;
}

export function SpecialButtonProvider({ onSpecialClick, children }: ProviderProps) {
  return (
    <SpecialClickContext.Provider value={onSpecialClick}>
      {children}
    </SpecialClickContext.Provider>
  );
}

export function useSpecialClick() {
  return useContext(SpecialClickContext);
}
