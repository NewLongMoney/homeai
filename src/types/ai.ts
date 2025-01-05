import type { WeatherData, UserPreferences, HistoricalData } from './services';

export interface AIContext {
  timeOfDay: string;
  occupancy: boolean;
  weather: WeatherData;
  userPreferences: UserPreferences;
  historicalData: HistoricalData;
}

export interface AILearningContext extends AIContext {
  decision?: AIDecision;
  outcome?: any;
}

export interface HealthMetrics {
  sleep: {
    quality: number;
    duration: number;
    pattern: string;
  };
  activity: {
    steps: number;
    exercise: number;
    standingHours: number;
  };
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
  };
}

export interface EnvironmentData {
  temperature: number;
  humidity: number;
  airQuality: number;
  noise: number;
  lighting: number;
}

export interface UserBehaviorMetrics {
  dailyRoutine: ActivityPattern[];
  preferences: UserPreferences;
  productivity: ProductivityMetrics;
}

export interface AIDecision {
  action: string;
  confidence: number;
  reasoning: string[];
  alternatives: Alternative[];
  impact: {
    health: number;
    productivity: number;
    comfort: number;
  };
}

export interface PatternData {
  id: string;
  type: 'behavior' | 'environment' | 'health';
  data: Record<string, any>;
  timestamp: Date;
}

export interface ActivityPattern {
  id: string;
  type: 'work' | 'exercise' | 'rest' | 'social';
  startTime: Date;
  duration: number;
  energy: number;
}

export interface ProductivityMetrics {
  focusTime: number;
  taskCompletion: number;
  interruptions: number;
  efficiency: number;
}

export interface Alternative {
  action: string;
  confidence: number;
  tradeoffs: {
    benefits: string[];
    drawbacks: string[];
  };
} 