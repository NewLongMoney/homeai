import * as React from 'react';
import { useContext, useEffect, useRef } from 'react';
import { AgentCore } from '../services/agent/AgentCore';
import { AgentAction } from '../services/agent/types';

interface AgentContextType {
  isProcessing: boolean;
  lastAction: AgentAction | null;
  executeAction: (action: AgentAction) => Promise<void>;
}

const defaultContext = {
  isProcessing: false,
  lastAction: null,
  executeAction: async () => {}
};

const AgentContext = React.createContext(defaultContext);

export const AgentProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const agent = useRef(new AgentCore(process.env.OPENAI_API_KEY || ''));
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [lastAction, setLastAction] = React.useState(null as AgentAction | null);

  useEffect(() => {
    const autonomousLoop = async () => {
      while (true) {
        setIsProcessing(true);
        try {
          const action = await agent.current.think();
          setLastAction(action);
          if (action.type !== 'none') {
            await agent.current.executeAction(action);
          }
        } finally {
          setIsProcessing(false);
        }
        await new Promise(resolve => setTimeout(resolve, 5000)); // Think every 5 seconds
      }
    };

    autonomousLoop();
  }, []);

  const executeAction = async (action: AgentAction) => {
    await agent.current.executeAction(action);
  };

  return (
    <AgentContext.Provider value={{
      isProcessing,
      lastAction,
      executeAction
    }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => {
  return useContext(AgentContext);
}; 