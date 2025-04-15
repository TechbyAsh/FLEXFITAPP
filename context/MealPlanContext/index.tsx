import React, { createContext, useContext, useEffect, useState } from 'react';
import { Meal } from './mealPlan.types';
import {
  fetchMeals,
  markMealComplete,
  resetMeals,
} from '../../services/mealPlan.service';

interface MealPlanContextProps {
  meals: Meal[];
  completeMeal: (id: string) => Promise<void>;
  resetAllMeals: () => Promise<void>;
  loading: boolean;
}

const MealPlanContext = createContext<MealPlanContextProps | undefined>(undefined);

export const MealPlanProvider: React.FC<{ userId: string; children: React.ReactNode }> = ({ userId, children }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMeals = async () => {
    setLoading(true);
    const data = await fetchMeals(userId);
    setMeals(data);
    setLoading(false);
  };

  const completeMeal = async (id: string) => {
    await markMealComplete(id);
    loadMeals();
  };

  const resetAllMeals = async () => {
    await resetMeals(userId);
    loadMeals();
  };

  useEffect(() => {
    loadMeals();
  }, [userId]);

  return (
    <MealPlanContext.Provider value={{ meals, completeMeal, resetAllMeals, loading }}>
      {children}
    </MealPlanContext.Provider>
  );
};

export const useMealPlanContext = () => {
  const context = useContext(MealPlanContext);
  if (!context) throw new Error('useMealPlanContext must be used within a MealPlanProvider');
  return context;
};