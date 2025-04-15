import Backendless from 'backendless';
import { Meal } from '../context/MealPlanContext/mealPlan.types';

const TABLE = 'Meals';

export const fetchMeals = async (userId: string): Promise<Meal[]> => {
  return Backendless.Data.of(TABLE).find({ where: `ownerId = '${userId}'` });
};

export const markMealComplete = async (id: string): Promise<Meal> => {
  return Backendless.Data.of(TABLE).save({ objectId: id, completed: true });
};

export const resetMeals = async (userId: string): Promise<void> => {
  const meals: Meal[] = await fetchMeals(userId);
  for (const meal of meals) {
    await Backendless.Data.of(TABLE).save({ ...meal, completed: false });
  }
};