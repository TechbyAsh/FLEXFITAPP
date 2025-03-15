import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4ADE80',
        tabBarInactiveTintColor: '#707070',
        tabBarStyle: {
          backgroundColor: '#161B22',
          borderTopColor: '#252A33',
          borderTopWidth: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          height: 80,
          paddingTop: 10,
          paddingBottom: 20,
        },
        headerStyle: {
          backgroundColor: '#0D1117',
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: theme.typography.fontFamily.bold,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color }) => <Ionicons name="barbell-outline" size={24} color={color} />,
          headerTitle: "My Workouts",
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: ({ color }) => <Ionicons name="nutrition-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color }) => <Ionicons name="calendar-outline" size={24} color={color} />,
          headerTitle: "My Schedule",
        }}
      />
       <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color }) => <Ionicons name="bar-chart-outline" size={24} color={color} />, //Using a more appropriate icon
          headerTitle: "Analytics",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}