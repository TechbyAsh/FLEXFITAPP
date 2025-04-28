
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'
import { saveOnboardingDataToAsync } from '../../services/onboarding.service';

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useOnboarding } from '@/context/OnboardingContext';

export default function GoalsScreen() {
  const theme = useTheme();
  const [selectedGoals, setSelectedGoals] = useState([]);
  const { onboardingData, setOnboardingData } = useOnboarding();

  const goals = [
    { id: 1, name: 'Lose Weight', icon: 'trending-down' },
    { id: 2, name: 'Build Muscle', icon: 'barbell' },
    { id: 3, name: 'Improve Endurance', icon: 'pulse' },
    { id: 4, name: 'Increase Flexibility', icon: 'body' },
    { id: 5, name: 'Reduce Stress', icon: 'leaf' },
    { id: 6, name: 'Improve Overall Health', icon: 'heart' },
  ];

  const toggleGoal = (id) => {
    if (selectedGoals.includes(id)) {
      setSelectedGoals(selectedGoals.filter(goalId => goalId !== id));
    } else {
      setSelectedGoals([...selectedGoals, id]);
    }
  };

  const handleNext = async () => {
    if (selectedGoals.length === 0) return;
  
    try {
      await saveOnboardingDataToAsync({ fitnessGoals: selectedGoals });
      router.push('/(onboarding)/details'); 
    } catch (error) {
      console.error('Error saving onboarding step:', error);
      Alert.alert('Something went wrong saving your goals');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.bold }]}>
            Fitness Goals
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.regular }]}>
            Select one or more goals to personalize your fitness journey
          </Text>
        </View>

        <View style={styles.goalsContainer}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalItem,
                {
                  backgroundColor: selectedGoals.includes(goal.id)
                    ? theme.colors.secondary
                    : theme.colors.surface,
                  borderColor: theme.colors.border,
                }
              ]}
              onPress={() => toggleGoal(goal.id)}
            >
              <Ionicons
                name={goal.icon}
                size={24}
                color={selectedGoals.includes(goal.id) ? theme.colors.primary : theme.colors.text}
              />
              <Text
                style={[
                  styles.goalText,
                  {
                    color: selectedGoals.includes(goal.id) ? theme.colors.primary : theme.colors.text,
                    fontFamily: theme.typography.fontFamily.medium,
                  }
                ]}
              >
                {goal.name}
              </Text>
              {selectedGoals.includes(goal.id) && (
                <View style={[styles.checkmark, { backgroundColor: theme.colors.primary }]}>
                  <Ionicons name="checkmark" size={16} color={theme.colors.secondary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border }]}>
        <TouchableOpacity
          style={[styles.button, { opacity: selectedGoals.length > 0 ? 1 : 0.5, backgroundColor: theme.colors.secondary }]}
          onPress={handleNext}
          disabled={selectedGoals.length === 0}
        >
          <Text style={[styles.buttonText, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalItem: {
    width: '48%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  goalText: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  checkmark: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    borderTopWidth: 1,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});
function setOnboardingData(arg0: (prev: any) => any) {
  throw new Error('Function not implemented.');
}

