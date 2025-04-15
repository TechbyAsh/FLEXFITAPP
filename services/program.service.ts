import Backendless from 'backendless';
import { ProgramProgress } from '../context/ProgramContext/program.types';

const TABLE = 'Programs';

export const fetchProgramProgress = async (userId: string): Promise<ProgramProgress> => {
  const results = await Backendless.Data.of(TABLE).find({ where: `ownerId = '${userId}'` });
  return results[0]; // Assuming one program per user
};

export const advanceProgramWeek = async (objectId: string, currentWeek: number): Promise<ProgramProgress> => {
  return Backendless.Data.of(TABLE).save({ objectId, currentWeek });
};

export const resetProgram = async (objectId: string, totalWeeks = 6): Promise<ProgramProgress> => {
  return Backendless.Data.of(TABLE).save({ objectId, currentWeek: 1, totalWeeks });
};