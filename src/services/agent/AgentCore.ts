import OpenAI from 'openai';
import { AgentMemory } from './AgentMemory';
import { AgentAction } from './types';
import { deliveryService } from '../delivery/DeliveryService';
import { DeliveryItem } from '../delivery/types';

export class AgentCore {
  private openai: OpenAI;
  private memory: AgentMemory;
  private currentGoal: string | null = null;
  private isThinking = false;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
    this.memory = new AgentMemory();
  }

  async think(): Promise<AgentAction> {
    if (this.isThinking) return { type: 'none', reason: 'Already processing' };
    
    this.isThinking = true;
    try {
      const context = await this.memory.getCurrentContext();
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an autonomous home management AI. Think step by step about what needs to be done." },
          { role: "user", content: `Current context: ${JSON.stringify(context)}. What action should be taken next?` }
        ],
        temperature: 0.7,
      });

      const decision = response.choices[0].message?.content;
      if (!decision) {
        return { type: 'none', reason: 'No decision made' };
      }
      await this.memory.storeDecision(decision);
      
      return this.parseDecisionIntoAction(decision);
    } finally {
      this.isThinking = false;
    }
  }

  private parseDecisionIntoAction(decision: string): AgentAction {
    // Parse the AI's decision into concrete actions
    // This would map natural language to specific app actions
    return {
      type: 'suggest_task',
      payload: decision
    };
  }

  async executeAction(action: AgentAction): Promise<void> {
    await this.memory.storeAction(action);
    // Execute the action based on type
    switch (action.type) {
      case 'suggest_task':
        // Notify user of task
        break;
      case 'order_groceries':
        // Interface with grocery service
        break;
      case 'adjust_budget':
        // Make budget adjustments
        break;
    }
  }

  async handleGroceryRefill(items: DeliveryItem[]): Promise<void> {
    try {
      // Determine best delivery provider based on items and urgency
      const provider = this.determineBestProvider(items);
      
      // Place order
      const order = await deliveryService.placeOrder(items, provider);
      
      // Store in memory
      await this.memory.storeAction({
        type: 'grocery_order',
        orderId: order.id,
        items: order.items,
        provider: order.provider.name,
        estimatedDelivery: order.estimatedDelivery
      });
    } catch (error) {
      console.error('Failed to handle grocery refill:', error);
      throw error;
    }
  }

  private determineBestProvider(items: DeliveryItem[]): string {
    // Implement logic to choose best provider based on:
    // - Item urgency
    // - Total order value
    // - Provider availability
    // - Delivery time
    return 'glovo'; // For now, default to Glovo
  }
} 