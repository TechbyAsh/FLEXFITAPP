
import Backendless from 'backendless';
import { OnboardingData } from '../context/OnboardingContext/onBoarding.types';

/**
 * Updates specific fields in a user's onboarding data without overwriting unrelated data.
 * 
 * @param userId - The Backendless user ID
 * @param partialData - The onboarding fields you want to update
 * @returns The updated user object
 */
export const updateUserOnboardingField = async (
  userId: string,
  partialData: Partial<OnboardingData>
): Promise<any> => {
  try {
    const user = await Backendless.Data.of('Users').findById(userId);

    const updatedUser = {
      ...user,
      ...partialData,
    };

    const savedUser = await Backendless.Data.of('Users').save(updatedUser);
    console.log('[Backendless] Successfully updated onboarding field:', partialData);
    return savedUser;
  } catch (error) {
    console.error('[Backendless] Error updating onboarding field:', error);
    throw error;
  }
};







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