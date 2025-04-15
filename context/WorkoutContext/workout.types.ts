
export interface Workout {
  objectId?: string; // Unique Backendless object ID
  id: string;        // Local identifier (can mirror objectId or be unique per app logic)
  title: string;
  videoUrl?: string;
  isCompleted: boolean;
  day: string;
  ownerId?: string;  // To map per-user data
}

export interface WorkoutContextType {
  workouts: Workout[];
  completeWorkout: (id: string) => Promise<void>;
  resetAllWorkouts: () => Promise<void>;
  loading: boolean;
} 
