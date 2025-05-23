// app/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backendless from 'backendless';

const checkOnboardingStatus = async (userId: string) => {
  try {
    const user = await Backendless.Data.of('Users').findById(userId);
    console.log(" Fetched User Data from Backendless:", user);
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
        const userId = await AsyncStorage.getItem("userId");
        console.log(" Stored User ID from AsyncStorage:", userId);

        if (userId) {
          const completedOnboarding = await checkOnboardingStatus(userId);
          console.log(" User hasCompletedOnboarding from backend:", completedOnboarding);

          if (completedOnboarding) {
            setRedirectTo("/(tabs)");
          } else {
            setRedirectTo("/(onboarding)");
          }
        } else {
          // No user? Check if onboarding was seen locally
          const seenOnboarding = await AsyncStorage.getItem("seenOnboarding");
          console.log(" seenOnboarding flag:", seenOnboarding);

          if (seenOnboarding === "true") {
            setRedirectTo("/(auth)/login");
          } else {
            setRedirectTo("/(onboarding)");
          }
        }
      } catch (err) {
        console.error("App init error:", err);
        setRedirectTo("/(auth)/login");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [])
  
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>App is running</Text>
    </View>
  );
}