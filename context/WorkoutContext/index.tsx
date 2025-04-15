import React, { createContext, useContext, useEffect, useState } from 'react';
import { Workout } from './workout.types';
import {
  fetchWorkouts,
  markWorkoutComplete,
  resetWorkouts,
} from '../../services/workout.service';

interface WorkoutContextProps {
  workouts: Workout[];
  completeWorkout: (id: string) => Promise<void>;
  resetAllWorkouts: () => Promise<void>;
  loading: boolean;
}

const WorkoutContext = createContext<WorkoutContextProps | undefined>(undefined);

export const WorkoutProvider: React.FC<{ userId: string; children: React.ReactNode }> = ({ userId, children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWorkouts = async () => {
    setLoading(true);
    const data = await fetchWorkouts(userId);
    setWorkouts(data);
    setLoading(false);
  };

  const completeWorkout = async (id: string) => {
    await markWorkoutComplete(id);
    loadWorkouts();
  };

  const resetAllWorkouts = async () => {
    await resetWorkouts(userId);
    loadWorkouts();
  };

  useEffect(() => {
    loadWorkouts();
  }, [userId]);

  return (
    <WorkoutContext.Provider
      value={{ workouts, completeWorkout, resetAllWorkouts, loading }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('useWorkoutContext must be used within a WorkoutProvider');
  return context;
};