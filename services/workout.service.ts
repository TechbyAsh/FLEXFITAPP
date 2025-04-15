import Backendless from 'backendless';
import { Workout } from '../context/WorkoutContext/workout.types';

const TABLE = 'Workouts';

export const fetchWorkouts = async (userId: string): Promise<Workout[]> => {
  return Backendless.Data.of(TABLE).find({ where: `ownerId = '${userId}'` });
};

export const markWorkoutComplete = async (id: string): Promise<Workout> => {
  return Backendless.Data.of(TABLE).save({ objectId: id, isCompleted: true });
};

export const resetWorkouts = async (userId: string): Promise<void> => {
  const workouts: Workout[] = await fetchWorkouts(userId);
  for (const workout of workouts) {
    await Backendless.Data.of(TABLE).save({ ...workout, isCompleted: false });
  }
};