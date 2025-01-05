import * as React from 'react';
import { createContext, useContext } from 'react';
import { DeliveryOrder } from '../services/delivery/types';
import { deliveryService } from '../services/delivery/DeliveryService';

interface DeliveryContextType {
  activeOrders: DeliveryOrder[];
  trackOrder: (orderId: string) => Promise<void>;
}

const defaultContext = {
  activeOrders: [] as DeliveryOrder[],
  trackOrder: async () => undefined
};

const DeliveryContext = createContext(defaultContext);

export const DeliveryProvider = ({ 
  children 
}: { 
  children: JSX.Element | JSX.Element[]
}) => {
  const [activeOrders, setActiveOrders] = React.useState(defaultContext.activeOrders);

  const trackOrder = async (orderId: string) => {
    const order = await deliveryService.trackOrder(orderId);
    setActiveOrders((prev: DeliveryOrder[]) => [...prev.filter(o => o.id !== orderId), order]);
  };

  return (
    <DeliveryContext.Provider value={{
      activeOrders,
      trackOrder
    }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDelivery = () => useContext(DeliveryContext); 