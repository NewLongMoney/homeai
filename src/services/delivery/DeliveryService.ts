import { DeliveryItem, DeliveryOrder, DeliveryProvider } from './types';

class DeliveryService {
  private providers: Map<string, DeliveryProvider> = new Map();

  constructor() {
    // Initialize delivery providers
    this.initializeProviders();
  }

  private initializeProviders() {
    // Glovo
    this.providers.set('glovo', {
      name: 'Glovo',
      id: 'glovo',
      isAvailable: true,
      estimatedTime: 45,
      minimumOrder: 10,
      deliveryFee: 2.99
    });

    // Add other providers here
  }

  async placeOrder(items: DeliveryItem[], provider: string): Promise<DeliveryOrder> {
    const selectedProvider = this.providers.get(provider);
    if (!selectedProvider) {
      throw new Error(`Provider ${provider} not found`);
    }

    // Integrate with Glovo API
    if (provider === 'glovo') {
      return this.placeGlovoOrder(items, selectedProvider);
    }

    throw new Error('Unsupported provider');
  }

  private async placeGlovoOrder(
    items: DeliveryItem[], 
    provider: DeliveryProvider
  ): Promise<DeliveryOrder> {
    // Glovo API integration
    const glovoApiKey = process.env.GLOVO_API_KEY;
    const glovoEndpoint = process.env.GLOVO_API_ENDPOINT;

    try {
      const response = await fetch(`${glovoEndpoint}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${glovoApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          delivery_address: await this.getUserAddress()
        })
      });

      const orderData = await response.json();
      
      return {
        id: orderData.order_id,
        items,
        provider,
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + provider.estimatedTime * 60000),
        address: await this.getUserAddress(),
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0) + provider.deliveryFee
      };
    } catch (error) {
      console.error('Glovo order failed:', error);
      throw new Error('Failed to place Glovo order');
    }
  }

  async trackOrder(orderId: string): Promise<DeliveryOrder> {
    // Implement order tracking
    return this.trackGlovoOrder(orderId);
  }

  private async trackGlovoOrder(orderId: string): Promise<DeliveryOrder> {
    const glovoApiKey = process.env.GLOVO_API_KEY;
    const glovoEndpoint = process.env.GLOVO_API_ENDPOINT;

    const response = await fetch(`${glovoEndpoint}/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${glovoApiKey}`
      }
    });

    const orderData = await response.json();
    return this.mapGlovoOrderToDeliveryOrder(orderData);
  }

  private async getUserAddress(): Promise<string> {
    // Implement address retrieval from user settings
    return 'Saved delivery address';
  }

  private mapGlovoOrderToDeliveryOrder(glovoOrder: any): DeliveryOrder {
    // Map Glovo order format to our format
    return {
      id: glovoOrder.id,
      items: glovoOrder.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        urgency: 'medium'
      })),
      provider: this.providers.get('glovo')!,
      status: this.mapGlovoStatus(glovoOrder.status),
      estimatedDelivery: new Date(glovoOrder.estimated_delivery_time),
      address: glovoOrder.delivery_address,
      total: glovoOrder.total_amount
    };
  }

  private mapGlovoStatus(glovoStatus: string): DeliveryOrder['status'] {
    const statusMap: Record<string, DeliveryOrder['status']> = {
      'PENDING': 'pending',
      'ACCEPTED': 'confirmed',
      'IN_DELIVERY': 'in_progress',
      'DELIVERED': 'delivered'
    };
    return statusMap[glovoStatus] || 'pending';
  }
}

export const deliveryService = new DeliveryService(); 