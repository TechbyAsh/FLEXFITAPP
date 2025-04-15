import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DailyCheckIn } from './dailyFlex.types';
import dayjs from 'dayjs';
import {
  fetchCheckIns,
  checkInToday,
  resetCheckIns,
} from '../../services/dailyFlex.service';

interface DailyFlexContextProps {
  checkIns: DailyCheckIn[];
  checkIn: (entry: DailyCheckIn) => Promise<void>;
  reset: () => Promise<void>;
  loading: boolean;
}

const DailyFlexContext = createContext<DailyFlexContextProps | undefined>(undefined);

export const DailyFlexProvider: React.FC<{ userId: string; children: React.ReactNode }> = ({ userId, children }) => {
  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCheckIns = async () => {
    setLoading(true);
    const data = await fetchCheckIns(userId);
    setCheckIns(data);
    setLoading(false);
  };

  const checkIn = async (entry: DailyCheckIn) => {
    await checkInToday(entry);
    loadCheckIns();
  };

  const reset = async () => {
    await resetCheckIns(userId);
    loadCheckIns();
  };

  useEffect(() => {
    loadCheckIns();
  }, [userId]);

  return (
    <DailyFlexContext.Provider value={{ checkIns, checkIn, reset, loading }}>
      {children}
    </DailyFlexContext.Provider>
  );
};

export const useDailyFlexContext = () => {
  const context = useContext(DailyFlexContext);
  if (!context) throw new Error('useDailyFlexContext must be used within a DailyFlexProvider');
  return context;
};