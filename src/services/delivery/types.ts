export interface DeliveryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  urgency: 'low' | 'medium' | 'high';
}

export interface DeliveryProvider {
  name: string;
  id: string;
  isAvailable: boolean;
  estimatedTime: number; // in minutes
  minimumOrder: number;
  deliveryFee: number;
}

export interface DeliveryOrder {
  id: string;
  items: DeliveryItem[];
  provider: DeliveryProvider;
  status: 'pending' | 'confirmed' | 'in_progress' | 'delivered';
  estimatedDelivery: Date;
  address: string;
  total: number;
} 