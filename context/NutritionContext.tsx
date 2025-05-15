import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MealEntry,
  WaterIntake,
  NutritionGoals,
  NutritionProgress,
  FavoriteFood,
  UserNutritionPreferences,
  FoodItem,
} from '../types/nutrition';

interface NutritionState {
  meals: MealEntry[];
  waterIntake: WaterIntake[];
  goals: NutritionGoals;
  progress: NutritionProgress[];
  favorites: FavoriteFood[];
  preferences: UserNutritionPreferences;
  recentFoods: FoodItem[];
  isLoading: boolean;
  error: string | null;
}

type NutritionAction =
  | { type: 'SET_MEALS'; payload: MealEntry[] }
  | { type: 'ADD_MEAL'; payload: MealEntry }
  | { type: 'UPDATE_MEAL'; payload: MealEntry }
  | { type: 'DELETE_MEAL'; payload: string }
  | { type: 'SET_WATER_INTAKE'; payload: WaterIntake[] }
  | { type: 'ADD_WATER'; payload: WaterIntake }
  | { type: 'SET_GOALS'; payload: NutritionGoals }
  | { type: 'UPDATE_GOALS'; payload: Partial<NutritionGoals> }
  | { type: 'ADD_PROGRESS'; payload: NutritionProgress }
  | { type: 'SET_FAVORITES'; payload: FavoriteFood[] }
  | { type: 'ADD_FAVORITE'; payload: FavoriteFood }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'SET_PREFERENCES'; payload: UserNutritionPreferences }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserNutritionPreferences> }
  | { type: 'ADD_RECENT_FOOD'; payload: FoodItem }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const initialState: NutritionState = {
  meals: [],
  waterIntake: [],
  goals: {
    dailyCalories: 2000,
    macroSplit: {
      protein: 30,
      carbs: 40,
      fat: 30,
    },
    waterGoal: {
      amount: 2000,
      unit: 'ml',
    },
    mealSchedule: {},
  },
  progress: [],
  favorites: [],
  preferences: {
    preferredUnits: 'metric',
    mealReminders: true,
    trackMood: true,
    trackWater: true,
  },
  recentFoods: [],
  isLoading: false,
  error: null,
};

const NutritionContext = createContext<{
  state: NutritionState;
  dispatch: React.Dispatch<NutritionAction>;
} | null>(null);

function nutritionReducer(state: NutritionState, action: NutritionAction): NutritionState {
  switch (action.type) {
    case 'SET_MEALS':
      return { ...state, meals: action.payload };
    case 'ADD_MEAL':
      return { ...state, meals: [...state.meals, action.payload] };
    case 'UPDATE_MEAL':
      return {
        ...state,
        meals: state.meals.map((meal) =>
          meal.id === action.payload.id ? action.payload : meal
        ),
      };
    case 'DELETE_MEAL':
      return {
        ...state,
        meals: state.meals.filter((meal) => meal.id !== action.payload),
      };
    case 'SET_WATER_INTAKE':
      return { ...state, waterIntake: action.payload };
    case 'ADD_WATER':
      return { ...state, waterIntake: [...state.waterIntake, action.payload] };
    case 'SET_GOALS':
      return { ...state, goals: action.payload };
    case 'UPDATE_GOALS':
      return { ...state, goals: { ...state.goals, ...action.payload } };
    case 'ADD_PROGRESS':
      return { ...state, progress: [...state.progress, action.payload] };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'ADD_FAVORITE':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav.id !== action.payload),
      };
    case 'SET_PREFERENCES':
      return { ...state, preferences: action.payload };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };
    case 'ADD_RECENT_FOOD':
      return {
        ...state,
        recentFoods: [
          action.payload,
          ...state.recentFoods.filter((food) => food.id !== action.payload.id),
        ].slice(0, 10),
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function NutritionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(nutritionReducer, initialState);

  // Load saved data from AsyncStorage on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        const savedMeals = await AsyncStorage.getItem('nutrition_meals');
        if (savedMeals) {
          dispatch({ type: 'SET_MEALS', payload: JSON.parse(savedMeals) });
        }

        const savedWater = await AsyncStorage.getItem('nutrition_water');
        if (savedWater) {
          dispatch({ type: 'SET_WATER_INTAKE', payload: JSON.parse(savedWater) });
        }

        const savedGoals = await AsyncStorage.getItem('nutrition_goals');
        if (savedGoals) {
          dispatch({ type: 'SET_GOALS', payload: JSON.parse(savedGoals) });
        }

        const savedPreferences = await AsyncStorage.getItem('nutrition_preferences');
        if (savedPreferences) {
          dispatch({ type: 'SET_PREFERENCES', payload: JSON.parse(savedPreferences) });
        }

        const savedFavorites = await AsyncStorage.getItem('nutrition_favorites');
        if (savedFavorites) {
          dispatch({ type: 'SET_FAVORITES', payload: JSON.parse(savedFavorites) });
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load nutrition data' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadSavedData();
  }, []);

  // Save data to AsyncStorage when it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('nutrition_meals', JSON.stringify(state.meals));
        await AsyncStorage.setItem('nutrition_water', JSON.stringify(state.waterIntake));
        await AsyncStorage.setItem('nutrition_goals', JSON.stringify(state.goals));
        await AsyncStorage.setItem('nutrition_preferences', JSON.stringify(state.preferences));
        await AsyncStorage.setItem('nutrition_favorites', JSON.stringify(state.favorites));
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to save nutrition data' });
      }
    };

    saveData();
  }, [state.meals, state.waterIntake, state.goals, state.preferences, state.favorites]);

  return (
    <NutritionContext.Provider value={{ state, dispatch }}>
      {children}
    </NutritionContext.Provider>
  );
}

export function useNutrition() {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
}
