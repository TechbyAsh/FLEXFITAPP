
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
  // Using a more resilient approach to font loading
  const [loaded, error] = useFonts({
    // Using system fonts as fallback if custom fonts fail to load
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  // Log errors instead of throwing them to prevent crashing
  useEffect(() => {
    if (error) console.error('Font loading error:', error);
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Continue loading the app even if fonts fail
  // This ensures the app doesn't get stuck on loading screen
  useEffect(() => {
    // Hide splash screen after a timeout even if fonts don't load
    const timer = setTimeout(() => {
      SplashScreen.hideAsync().catch(console.error);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#121212',
          },
        }}
      />
    </ThemeProvider>
  );
}
