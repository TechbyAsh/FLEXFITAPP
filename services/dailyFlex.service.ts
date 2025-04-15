import Backendless from 'backendless';
import { DailyCheckIn } from '../context/DailyFlexContext/dailyFlex.types';

const TABLE = 'DailyFlex';

export const fetchCheckIns = async (userId: string): Promise<DailyCheckIn[]> => {
  return Backendless.Data.of(TABLE).find({ where: `ownerId = '${userId}'` });
};

export const checkInToday = async (entry: DailyCheckIn): Promise<DailyCheckIn> => {
  return Backendless.Data.of(TABLE).save(entry);
};

export const resetCheckIns = async (userId: string): Promise<void> => {
  const checkIns: DailyCheckIn[] = await fetchCheckIns(userId);
  for (const checkIn of checkIns) {
    await Backendless.Data.of(TABLE).remove(checkIn);
  }
};