
import { Tabs } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          borderTopColor: theme.colors.border,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 88 : 70,
        },
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: '#888888',
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamily.medium,
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.secondary,
        headerTitleStyle: {
          fontFamily: theme.typography.fontFamily.bold,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="barbell" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: "Nutrition",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="restaurant" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: "Planner",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="people" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 3,
  },
});
