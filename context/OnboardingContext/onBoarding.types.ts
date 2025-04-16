// types/onboarding.types.ts
import { FitnessGoal, FitnessLevel, WorkoutPreference, EquipmentAccess, NutritionStyle, DietaryPreference, ConsistencyPreference } from '../user.types';


export interface OnboardingData {
  fitnessGoals: FitnessGoal[];
  fitnessLevel: FitnessLevel;
  workoutPreferences: WorkoutPreference[];
  equipmentAccess: EquipmentAccess[];
  workoutDaysPerWeek: number;
  workoutSessionLength: string;
  nutritionStyle: NutritionStyle;
  dietaryPreferences: DietaryPreference[];
  wantsVirtualTraining: boolean;
  consistencyPreferences: ConsistencyPreference[];
  startDate: string; // ISO date string
  
}