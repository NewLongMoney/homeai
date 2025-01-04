import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { aiService } from '../services/ai';

interface AIContextType {
  isLoading: boolean;
  generateTasks: (context: string) => Promise<string[]>;
  suggestGroceries: (meals: string[]) => Promise<string[]>;
  optimizeBudget: (expenses: any[]) => Promise<string>;
}

const AIContext = createContext({} as AIContextType);

export const AIProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateTasks = async (context: string) => {
    setIsLoading(true);
    try {
      return await aiService.generateTaskSuggestions(context);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestGroceries = async (meals: string[]) => {
    setIsLoading(true);
    try {
      return await aiService.suggestGroceryItems(meals);
    } finally {
      setIsLoading(false);
    }
  };

  const optimizeBudget = async (expenses: any[]) => {
    setIsLoading(true);
    try {
      return await aiService.optimizeBudget(expenses);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIContext.Provider value={{
      isLoading,
      generateTasks,
      suggestGroceries,
      optimizeBudget
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}; 