export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type UrgencyLevel = 'low' | 'medium' | 'high';
export type WorkoutType = 'cardio' | 'strength' | 'flexibility';
export type IntensityLevel = 'low' | 'medium' | 'high';
export type InvestmentType = 'stock' | 'bond' | 'crypto' | 'real_estate' | 'mutual_fund';
export type RiskLevel = 'low' | 'medium' | 'high';
export type WeatherCondition = 'clear' | 'cloudy' | 'rain' | 'snow' | 'storm' | 'unknown';

export interface WeeklyMealPlan {
  weekStartDate: Date;
  meals: Array<{
    date: Date;
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: Meal[];
  }>;
  groceryList: GroceryItem[];
  nutritionSummary: NutritionSummary;
}

export interface Meal {
  id: string;
  type: MealType;
  name: string;
  recipe: Recipe;
  nutritionInfo: NutritionInfo;
  preparedAt?: Date;
  consumedAt?: Date;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  urgency: UrgencyLevel;
  expirationDate?: Date;
  purchaseDate?: Date;
}

export interface BudgetAnalysis {
  period: {
    start: Date;
    end: Date;
  };
  summary: {
    totalIncome: number;
    totalExpenses: number;
    savings: number;
    investmentOpportunities: InvestmentSuggestion[];
  };
  categories: BudgetCategory[];
  recommendations: string[];
  lastUpdated: Date;
}

export interface WellnessReport {
  date: Date;
  sleep: {
    quality: number; // 0-100
    duration: number; // in minutes
    deepSleepPercentage: number; // 0-100
    startTime?: Date;
    endTime?: Date;
  };
  activity: {
    steps: number;
    activeMinutes: number;
    caloriesBurned: number;
    heartRate?: {
      average: number;
      min: number;
      max: number;
    };
  };
  recommendations: string[];
}

export interface ExercisePlan {
  startDate: Date;
  endDate: Date;
  weeklyGoals: {
    cardio: number; // minutes
    strength: number; // minutes
    flexibility: number; // minutes
  };
  dailyWorkouts: Workout[];
  progress: ProgressMetrics;
}

export interface DecisionContext {
  timeOfDay: string;
  occupancy: boolean;
  weather: WeatherData;
  userPreferences: UserPreferences;
  historicalData: HistoricalData;
  timestamp: Date;
}

export interface NutritionSummary {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  vitamins: Record<string, number>;
  minerals: Record<string, number>;
  date: Date;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Array<{
    item: string;
    amount: number;
    unit: string;
    optional: boolean;
  }>;
  instructions: string[];
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  nutritionInfo: NutritionInfo;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  lastMade?: Date;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  servingSize: {
    amount: number;
    unit: string;
  };
}

export interface InvestmentSuggestion {
  id: string;
  type: InvestmentType;
  name: string;
  expectedReturn: number; // percentage
  riskLevel: RiskLevel;
  minimumInvestment: number;
  description: string;
  validUntil: Date;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
  transactions: Transaction[];
  budgetPeriod: {
    start: Date;
    end: Date;
  };
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
  paymentMethod?: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface Workout {
  id: string;
  type: WorkoutType;
  exercises: Exercise[];
  duration: number; // minutes
  caloriesBurned: number;
  scheduledFor: Date;
  completedAt?: Date;
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  type: WorkoutType;
  sets?: number;
  reps?: number;
  duration?: number; // minutes
  intensity: IntensityLevel;
  weight?: number; // in kg
  restBetweenSets?: number; // seconds
}

export interface ProgressMetrics {
  startDate: Date;
  endDate: Date;
  completed: number;
  skipped: number;
  streak: number;
  achievements: Array<{
    id: string;
    name: string;
    earnedAt: Date;
    description: string;
  }>;
}

export interface WeatherData {
  temperature: number; // celsius
  humidity: number; // percentage
  condition: WeatherCondition;
  forecast: Array<{
    date: Date;
    high: number;
    low: number;
    condition: WeatherCondition;
    precipitation: number; // percentage
    windSpeed?: number; // km/h
  }>;
  lastUpdated: Date;
}

export interface UserPreferences {
  temperature: {
    min: number; // celsius
    max: number; // celsius
  };
  lightingSchedule: Array<{
    time: string; // 24-hour format HH:mm
    brightness: number; // 0-100
    color?: string; // hex color
  }>;
  updatedAt: Date;
}

export interface HistoricalData {
  patterns: Array<{
    id: string;
    type: string;
    frequency: number;
    timeOfDay: string;
    lastOccurred: Date;
  }>;
  preferences: Record<string, any>;
  dataRange: {
    start: Date;
    end: Date;
  };
} 