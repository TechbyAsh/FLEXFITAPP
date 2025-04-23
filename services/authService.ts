import AsyncStorage from '@react-native-async-storage/async-storage'
import Backendless from './backendless';

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  hasCompletedOnboarding: boolean,
) => {
  console.log("🟡 registerUser called with:", { email, password, name });

  try {
    const user = new Backendless.User();
    user.email = email;
    user.password = password;
    user.name = name;
    user.hasCompletedOnboarding = true;

    const registeredUser = await Backendless.UserService.register(user);
    console.log("✅ Backendless registration result:", registeredUser);

    // Ensure user has a valid objectId
    if (!registeredUser?.objectId) {
      console.warn("❗ Registered user missing objectId. Cannot save to AsyncStorage.");
      throw new Error("Registration failed: No user ID returned.");
    }

    // Store session data
    await AsyncStorage.setItem('user', JSON.stringify(registeredUser));
    await AsyncStorage.setItem('userId', registeredUser.objectId);
    console.log("✅ Saved user and userId to AsyncStorage");

    return registeredUser;
  } catch (error: any) {
    console.error("❌ registerUser error:", error.message);
    throw new Error(error.message);
  }
};

  export const loginUser = async (email: string, password: string) => {
    try {
      const user = await Backendless.UserService.login(email, password, true);

      // Store user session
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('userId', user.objectId); // Store User ID separately
  
      return user;
    } catch (error) {
        if (error.code === 3003) {
          throw new Error('Invalid email or password. Please try again.');
        } else {
          throw new Error(error.message);
        }
      }
    };
  
  export const logoutUser = async () => {
    try {
      await Backendless.UserService.logout();
      // Clear stored user session
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('userId'); // Clear User ID
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export const getCurrentUser = async () => {
    try {
      // Check AsyncStorage for stored session
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        return JSON.parse(storedUser);
      }
      
      // If not found, check Backendless session
      return await Backendless.UserService.getCurrentUser();
    } catch (error) {
      return null;
    }
  };

  export const getUserById = async (userId: string) => {
    try {
      return await Backendless.Data.of('Users').findById(userId);
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };
  
  // Update user profile
  export const updateUserProfile = async (userId: string, newData: object) => {
    try {
      // Fetch existing user data
      let user = await Backendless.Data.of('Users').findById(userId);
      
      // Merge new data with existing user object
      const updatedUser = { ...user, ...newData };
  
      // Save updated user data
      await Backendless.Data.of('Users').save(updatedUser);
      
      // Update stored session with the new data
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  
      return updatedUser;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw new Error(error.message);
    }
  };
  
  export const saveOnboardingData = async (userId: string, onboardingData: Partial<User>) => {
    try {
      const user = await Backendless.Data.of('Users').findById(userId);
      const updatedUser = {
        ...user,
        ...onboardingData,
        hasCompletedOnboarding: true,
      };
      return await Backendless.Data.of('Users').save(updatedUser);
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      throw error;
    }
  };

  export const checkOnboardingStatus = async (userId: string): Promise<boolean> => {
    try {
      const user = await Backendless.Data.of('Users').findById(userId);
      return user?.hasCompletedOnboarding === true;
    } catch (error) {
      console.error('❌ Error checking onboarding status:', error);
      return false; // default to false if anything fails
    }
  };