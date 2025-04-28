
import Backendless from 'backendless';
import { OnboardingData } from '../context/OnboardingContext/onBoarding.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

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







// Save onboarding data to OnboardingData table
export const saveOnboardingDataRecord = async (onboardingData: OnboardingData) => {
  try {
    const savedData = await Backendless.Data.of('OnboardingData').save(onboardingData);
    console.log('✅ Saved onboarding data record:', savedData);
    return savedData;
  } catch (error) {
    console.error('❌ Error saving onboarding data record:', error);
    throw error;
  }
};

// Link onboarding data record to user after signup
export const linkOnboardingDataToUser = async (userId: string, onboardingObjectId: string) => {
  try {
    const user = await Backendless.Data.of('Users').findById(userId);

    const updatedUser = {
      ...user,
      onboardingData: { objectId: onboardingObjectId }, // Link via objectId
      hasCompletedOnboarding: true,
    };

    await Backendless.Data.of('Users').save(updatedUser);
    console.log('✅ Linked onboarding data to user');
  } catch (error) {
    console.error('❌ Error linking onboarding data to user:', error);
    throw error;
  }
};

// Save onboardingData locally (before signup)
export const saveOnboardingDataToAsync = async (data: Partial<OnboardingData>) => {
  try {
    await AsyncStorage.setItem('pendingOnboardingData', JSON.stringify(data));
    console.log('✅ Saved pending onboarding data to AsyncStorage');
  } catch (error) {
    console.error('❌ Error saving onboarding data locally:', error);
  }
};

// Load pending onboarding data
export const loadPendingOnboardingData = async (): Promise<Partial<OnboardingData> | null> => {
  try {
    const json = await AsyncStorage.getItem('pendingOnboardingData');
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('❌ Error loading pending onboarding data:', error);
    return null;
  }
};

// Clear pending onboarding data after linking
export const clearPendingOnboardingData = async () => {
  try {
    await AsyncStorage.removeItem('pendingOnboardingData');
    console.log('✅ Cleared pending onboarding data');
  } catch (error) {
    console.error('❌ Error clearing onboarding data:', error);
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