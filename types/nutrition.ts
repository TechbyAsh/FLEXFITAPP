export interface NutrientInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
}

export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  servingSize: {
    amount: number;
    unit: string;
  };
  nutrients: NutrientInfo;
  barcode?: string;
}

export interface MealEntry {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  dateTime: string;
  foods: Array<{
    foodItem: FoodItem;
    servings: number;
  }>;
  totalNutrients: NutrientInfo;
  photo?: string;
  notes?: string;
  mood?: 'Great' | 'Good' | 'Neutral' | 'Poor' | 'Bad';
  hungerLevel?: 1 | 2 | 3 | 4 | 5;
}

export interface WaterIntake {
  id: string;
  date: string;
  amount: number;
  unit: 'ml' | 'oz';
}

export interface NutritionGoals {
  dailyCalories: number;
  macroSplit: {
    protein: number;
    carbs: number;
    fat: number;
  };
  waterGoal: {
    amount: number;
    unit: 'ml' | 'oz';
  };
  mealSchedule: {
    [key in 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack']?: {
      targetTime: string;
      targetCalories: number;
    };
  };
}

export interface NutritionProgress {
  date: string;
  mealsLogged: number;
  waterIntake: number;
  nutrients: NutrientInfo;
  goalAchievement: number;
  weight?: number;
}

export interface FavoriteFood {
  id: string;
  foodItem: FoodItem;
  lastUsed: string;
  frequency: number;
}

export interface UserNutritionPreferences {
  dietaryRestrictions?: string[];
  allergies?: string[];
  preferredUnits: 'metric' | 'imperial';
  mealReminders: boolean;
  trackMood: boolean;
  trackWater: boolean;
}
