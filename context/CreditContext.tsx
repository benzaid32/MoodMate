import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

type CreditContextType = {
  credits: number;
  useCredit: () => void;
  addCredits: (amount: number) => void;
};

const CreditContext = createContext<CreditContextType>({
  credits: 0,
  useCredit: () => {},
  addCredits: () => {},
});

export const CreditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [credits, setCredits] = useState(10); // Start with 10 free credits
  const { user } = useAuth();
  
  // Load credits when user changes
  useEffect(() => {
    if (user) {
      // In a real app, we would fetch credits from database
      // For demo, we'll just use the local state
    }
  }, [user]);
  
  const useCredit = () => {
    setCredits(prev => Math.max(0, prev - 1));
  };
  
  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };
  
  return (
    <CreditContext.Provider value={{ credits, useCredit, addCredits }}>
      {children}
    </CreditContext.Provider>
  );
};

export const useCredits = () => useContext(CreditContext);