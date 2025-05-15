import { NutrientInfo, MealEntry, NutritionGoals, NutritionProgress } from '../types/nutrition';

export const calculateTotalNutrients = (meals: MealEntry[]): NutrientInfo => {
  return meals.reduce(
    (total, meal) => ({
      calories: total.calories + meal.totalNutrients.calories,
      protein: total.protein + meal.totalNutrients.protein,
      carbs: total.carbs + meal.totalNutrients.carbs,
      fat: total.fat + meal.totalNutrients.fat,
      fiber: (total.fiber || 0) + (meal.totalNutrients.fiber || 0),
      sugar: (total.sugar || 0) + (meal.totalNutrients.sugar || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
  );
};

export const calculateMealNutrients = (
  foods: Array<{ foodItem: { nutrients: NutrientInfo }; servings: number }>
): NutrientInfo => {
  return foods.reduce(
    (total, { foodItem, servings }) => ({
      calories: total.calories + foodItem.nutrients.calories * servings,
      protein: total.protein + foodItem.nutrients.protein * servings,
      carbs: total.carbs + foodItem.nutrients.carbs * servings,
      fat: total.fat + foodItem.nutrients.fat * servings,
      fiber: (total.fiber || 0) + ((foodItem.nutrients.fiber || 0) * servings),
      sugar: (total.sugar || 0) + ((foodItem.nutrients.sugar || 0) * servings),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
  );
};

export const calculateGoalProgress = (
  nutrients: NutrientInfo,
  goals: NutritionGoals
): number => {
  const calorieProgress = (nutrients.calories / goals.dailyCalories) * 100;
  const proteinProgress =
    (nutrients.protein / ((goals.dailyCalories * goals.macroSplit.protein) / 400)) * 100;
  const carbsProgress =
    (nutrients.carbs / ((goals.dailyCalories * goals.macroSplit.carbs) / 400)) * 100;
  const fatProgress =
    (nutrients.fat / ((goals.dailyCalories * goals.macroSplit.fat) / 900)) * 100;

  return Math.min(
    100,
    (calorieProgress + proteinProgress + carbsProgress + fatProgress) / 4
  );
};

export const formatNutrientValue = (
  value: number,
  unit: string = 'g',
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)}${unit}`;
};

export const calculateRemainingCalories = (
  totalCalories: number,
  goalCalories: number
): number => {
  return Math.max(0, goalCalories - totalCalories);
};

export const getMealTimeStatus = (
  mealTime: string,
  currentTime: string = new Date().toISOString()
): 'upcoming' | 'current' | 'past' => {
  const meal = new Date(mealTime).getTime();
  const current = new Date(currentTime).getTime();
  const threshold = 30 * 60 * 1000; // 30 minutes

  if (meal > current + threshold) return 'upcoming';
  if (meal < current - threshold) return 'past';
  return 'current';
};

export const generateNutritionProgress = (
  meals: MealEntry[],
  goals: NutritionGoals,
  waterIntake: number,
  date: string
): NutritionProgress => {
  const nutrients = calculateTotalNutrients(meals);
  const goalAchievement = calculateGoalProgress(nutrients, goals);

  return {
    date,
    mealsLogged: meals.length,
    waterIntake,
    nutrients,
    goalAchievement,
  };
};

export const convertUnits = {
  mlToOz: (ml: number): number => ml * 0.033814,
  ozToMl: (oz: number): number => oz / 0.033814,
  gToOz: (g: number): number => g * 0.035274,
  ozToG: (oz: number): number => oz / 0.035274,
};
