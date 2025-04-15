export interface Meal {
  objectId?: string; // Backendless object ID
  ownerId?: string;  // User identifier for per-user data
  id: string;        // Local identifier
  name: string;
  ingredients: string[];
  completed: boolean;
}

export interface MealPlanContextType {
  meals: Meal[];
  completeMeal: (id: string) => Promise<void>;
  resetAllMeals: () => Promise<void>;
  loading: boolean;
}