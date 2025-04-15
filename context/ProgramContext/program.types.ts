export interface ProgramProgress {
  objectId?: string; // Backendless object ID
  ownerId?: string;  // User identifier for per-user data
  currentWeek: number;
  totalWeeks: number;
}

export interface ProgramContextType {
  progress: ProgramProgress | null;
  advanceWeek: () => Promise<void>;
  reset: () => Promise<void>;
  loading: boolean;
}