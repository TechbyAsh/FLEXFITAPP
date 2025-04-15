
import Backendless from 'backendless';
import { OnboardingData } from '../context/OnboardingContext/onBoarding.types';

export const saveOnboardingData = async (userId: string, onboardingData: OnboardingData): Promise<void> => {
  try {
    const user = await Backendless.Data.of('Users').findById(userId);
    const updatedUser = {
      ...user,
      ...onboardingData,
      hasCompletedOnboarding: true,
    };
    await Backendless.Data.of('Users').save(updatedUser);
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    throw error;
  }
};

export const getOnboardingStatus = async (userId: string): Promise<boolean> => {
  try {
    const user = await Backendless.Data.of('Users').findById(userId);
    return user.hasCompletedOnboarding ?? false;
  } catch (error) {
    console.error('Error retrieving onboarding status:', error);
    return false;
  }
};