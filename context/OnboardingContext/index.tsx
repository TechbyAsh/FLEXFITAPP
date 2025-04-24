// context/OnboardingContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OnboardingData } from './onBoarding.types';
import { getOnboardingStatus } from '../../services/onboarding.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserOnboardingField } from '../../services/onboarding.service';

interface OnboardingContextProps {
  onboardingData: Partial<OnboardingData>;
  setOnboardingData: React.Dispatch<React.SetStateAction<Partial<OnboardingData>>>;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
  checkOnboardingStatus: () => Promise<void>;
  saveOnboardingField: (userId: string, data: Partial<OnboardingData>) => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextProps | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

  const checkOnboardingStatus = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const status = await getOnboardingStatus(userId);
        setHasCompletedOnboarding(status);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const saveOnboardingField = async (
    userId: string,
    data: Partial<OnboardingData>
  ) => {
    try {
      await updateUserOnboardingField(userId, data);
  
      // Sync to local state
      setOnboardingData(prev => ({
        ...prev,
        ...data,
      }));
  
      console.log('Synced onboarding field:', data);
    } catch (error) {
      console.error('Failed to sync onboarding field:', error);
      throw error;
    }
  }; 

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        setOnboardingData,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        checkOnboardingStatus,
        saveOnboardingField,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextProps => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};