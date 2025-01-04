import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AgentMemoryItem } from './types';

export class AgentMemory {
  private readonly MEMORY_KEY = 'agent_memory';
  private readonly CONTEXT_KEY = 'agent_context';

  async storeDecision(decision: string): Promise<void> {
    const memories = await this.getMemories();
    memories.push({
      type: 'decision',
      content: decision,
      timestamp: Date.now()
    });
    await this.saveMemories(memories);
  }

  async storeAction(action: unknown): Promise<void> {
    const memories = await this.getMemories();
    memories.push({
      type: 'action',
      content: action,
      timestamp: Date.now()
    });
    await this.saveMemories(memories);
  }

  async getCurrentContext(): Promise<unknown> {
    try {
      const contextString = await AsyncStorage.getItem(this.CONTEXT_KEY);
      return contextString ? JSON.parse(contextString) : {};
    } catch (error) {
      console.error('Error getting context:', error);
      return {};
    }
  }

  private async getMemories(): Promise<AgentMemoryItem[]> {
    try {
      const memoriesString = await AsyncStorage.getItem(this.MEMORY_KEY);
      return memoriesString ? JSON.parse(memoriesString) : [];
    } catch (error) {
      console.error('Error getting memories:', error);
      return [];
    }
  }

  private async saveMemories(memories: AgentMemoryItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(this.MEMORY_KEY, JSON.stringify(memories));
    } catch (error) {
      console.error('Error saving memories:', error);
    }
  }
} 