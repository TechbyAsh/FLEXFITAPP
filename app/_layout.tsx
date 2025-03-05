
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '../context/ThemeContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Using system fonts until custom fonts are available
  const [loaded, error] = useFonts({
    'Montserrat-Bold': require('expo-font'),
    'Montserrat-Medium': require('expo-font'),
    'Montserrat-Regular': require('expo-font'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#D4AF37', // Gold color
          headerTitleStyle: {
            fontFamily: 'Montserrat-Bold',
          },
          contentStyle: {
            backgroundColor: '#121212',
          },
        }}
      />
    </ThemeProvider>
  );
}
