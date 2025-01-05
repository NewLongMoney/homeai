import React, { createContext, useContext } from 'react';

interface Order {
  id: string;
  status: string;
  // ... other order properties
}

interface DeliveryContextType {
  activeOrders: Order[];
  trackOrder: (orderId: string) => Promise<void>;
}

const DeliveryContext = createContext<DeliveryContextType>({
  activeOrders: [],
  trackOrder: async (orderId: string) => {} // Fixed signature
});

export const useDelivery = () => useContext(DeliveryContext);

export const DeliveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DeliveryContext.Provider value={{
      activeOrders: [],
      trackOrder: async (orderId: string) => {}
    }}>
      {children}
    </DeliveryContext.Provider>
  );
}; 