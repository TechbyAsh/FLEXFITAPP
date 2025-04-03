import AsyncStorage from '@react-native-async-storage/async-storage'
import Backendless from './backendless';

export const registerUser = async (email: string, password: string, name: string) => {
    console.log("registerUser function called with:", email, password, name); // Debugging log
    try {
      const user = new Backendless.User();
      user.email = email;
      user.password = password;
      user.name = name;
      const registeredUser = await Backendless.UserService.register(user);
      // Store user session
    await AsyncStorage.setItem('user', JSON.stringify(registeredUser));
    await AsyncStorage.setItem('userId', registeredUser.objectId); // Store User ID separately

    return registeredUser;
  } catch (error) {
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
  