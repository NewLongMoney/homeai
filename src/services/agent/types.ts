export type AgentActionType = 'suggest_task' | 'order_groceries' | 'adjust_budget' | 'none';

export interface AgentAction {
  type: AgentActionType;
  payload?: unknown;
  reason?: string;
}

export interface AgentGoal {
  id: string;
  description: string;
  priority: number;
  deadline?: Date;
}

export interface AgentMemoryItem {
  type: 'decision' | 'action' | 'observation';
  content: unknown;
  timestamp: number;
} 