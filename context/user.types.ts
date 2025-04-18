
export type FitnessGoal = 'Lose weight' | 'Build muscle' | 'Tone up' | 'Increase energy' | 'Get stronger' | 'Improve flexibility/mobility' | 'Build consistency';
export type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type WorkoutPreference = 'Home' | 'Gym' | 'Outdoor' | 'Mix of all';
export type EquipmentAccess = 'Dumbbells' | 'Resistance bands' | 'Barbell + weights' | 'Bodyweight only' | 'Other';
export type NutritionStyle = 'Structured meal plans' | 'Flexible' | 'Need help staying consistent' | 'Not sure yet';
export type DietaryPreference = 'No restrictions' | 'Vegetarian' | 'Vegan' | 'Gluten-free' | 'Dairy-free' | 'Low-carb / Keto' | 'Other';
export type ConsistencyPreference = 'Daily mindset coaching' | 'Accountability check-ins' | 'Progress tracking' | 'Support group/community' | 'Visual planner';

export interface User {
  objectId: string;
  email: string;
  name?: string;
  fitnessGoal: FitnessGoal[];
  fitnessLevel: FitnessLevel;
  workoutPreference: WorkoutPreference[];
  equipmentAccess: EquipmentAccess[];
  workoutDaysPerWeek: number;
  workoutSessionLength: string;
  nutritionStyle: NutritionStyle;
  dietaryPreferences: DietaryPreference[];
  wantsVirtualTraining: boolean;
  hasCompletedOnboarding: boolean;
  consistencyPreferences: ConsistencyPreference[];
  startDate: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}