import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProgramProgress } from './program.types';
import {
  fetchProgramProgress,
  advanceProgramWeek,
  resetProgram,
} from '../../services/program.service';

interface ProgramContextProps {
  progress: ProgramProgress | null;
  advanceWeek: () => Promise<void>;
  reset: () => Promise<void>;
  loading: boolean;
}

const ProgramContext = createContext<ProgramContextProps | undefined>(undefined);

export const ProgramProvider: React.FC<{ userId: string; children: React.ReactNode }> = ({ userId, children }) => {
  const [progress, setProgress] = useState<ProgramProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProgress = async () => {
    setLoading(true);
    const data = await fetchProgramProgress(userId);
    setProgress(data);
    setLoading(false);
  };

  const advanceWeek = async () => {
    if (!progress) return;
    await advanceProgramWeek(progress.objectId, progress.currentWeek + 1);
    loadProgress();
  };

  const reset = async () => {
    if (!progress) return;
    await resetProgram(progress.objectId);
    loadProgress();
  };

  useEffect(() => {
    loadProgress();
  }, [userId]);

  return (
    <ProgramContext.Provider value={{ progress, advanceWeek, reset, loading }}>
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgramContext = () => {
  const context = useContext(ProgramContext);
  if (!context) throw new Error('useProgramContext must be used within a ProgramProvider');
  return context;
};