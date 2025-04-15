export interface DailyCheckIn {
  objectId?: string; // Backendless object ID
  ownerId?: string;  // To indicate which user this check-in belongs to
  date: string;
  completed: boolean;
  mood?: string;
  note?: string;
}

export interface DailyFlexContextType {
  checkIns: DailyCheckIn[];
  checkIn: (entry: DailyCheckIn) => Promise<void>;
  reset: () => Promise<void>;
  loading: boolean;
}