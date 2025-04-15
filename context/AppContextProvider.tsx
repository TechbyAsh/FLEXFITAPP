import React, { ReactNode } from 'react';
import { WorkoutProvider } from './WorkoutContext';
import { ProgramProvider } from './ProgramContext';
import { DailyFlexProvider } from './DailyFlexContext';
import { MealPlanProvider } from './MealPlanContext';

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WorkoutProvider>
      <ProgramProvider>
        <DailyFlexProvider>
          <MealPlanProvider>
            {children}
          </MealPlanProvider>
        </DailyFlexProvider>
      </ProgramProvider>
    </WorkoutProvider>
  );
};