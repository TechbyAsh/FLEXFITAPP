import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to set a value in AsyncStorage
const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`Saved ${key}: ${value}`);
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

// Function to get a value from AsyncStorage
const getItem = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log(`Retrieved ${key}: ${value}`);
      return value;
    } else {
      console.log(`${key} not found.`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return null;
  }
};

// Function to remove an item from AsyncStorage
const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Removed ${key}`);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
  }
};

// Function to clear all data from AsyncStorage (use carefully!)
const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("All AsyncStorage data cleared.");
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};

// Example: Managing User Authentication
const saveUserAuth = async (userId: string, token: string) => {
  await setItem('userId', userId);
  await setItem('authToken', token);
};

const getUserAuth = async () => {
  const userId = await getItem('userId');
  const authToken = await getItem('authToken');
  return { userId, authToken };
};

const removeUserAuth = async () => {
  await removeItem('userId');
  await removeItem('authToken');
};

// Set after user finishes onboarding
await AsyncStorage.setItem("hasOnboarded", "true");

// Check during app load
const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");

export {
  setItem,
  getItem,
  removeItem,
  clearStorage,
  saveUserAuth,
  getUserAuth,
  removeUserAuth,
};