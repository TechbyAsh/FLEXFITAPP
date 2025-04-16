// app/index.tsx
import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backendless from 'backendless';

const checkOnboardingStatus = async (userId: string) => {
  try {
    const user = await Backendless.Data.of('Users').findById(userId);
    console.log("📥 Fetched User Data from Backendless:", user);
    return user?.hasCompletedOnboarding || false;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        console.log("🔍 Stored User ID from AsyncStorage:", userId);

        if (userId) {
          const completedOnboarding = await checkOnboardingStatus(userId);
          if (completedOnboarding) {
            setRedirectTo('/(tabs)');
          } else {
            setRedirectTo('/onboarding');
          }
        } else {
          setRedirectTo('/(auth)/login');
        }
      } catch (err) {
        console.error('App init error:', err);
        setRedirectTo('/(auth)/login');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (redirectTo) {
    return <Redirect href={redirectTo} />;
  }

  return null;
}