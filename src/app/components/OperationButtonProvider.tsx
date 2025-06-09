import React, { createContext, useContext } from 'react';
import { Operation } from '../page'; // Assuming Operation enum is in page.tsx

export type OperationClickHandler = (operation: Operation) => void;

const OperationClickContext = createContext<OperationClickHandler>(() => {});

interface ProviderProps {
  onOperationClick: OperationClickHandler;
  children: React.ReactNode;
}

export function OperationButtonProvider({ onOperationClick, children }: ProviderProps) {
  return (
    <OperationClickContext.Provider value={onOperationClick}>
      {children}
    </OperationClickContext.Provider>
  );
}

export function useOperationClick() {
  return useContext(OperationClickContext);
}
