import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { NutrientInfo } from '../../types/nutrition';
import { formatNutrientValue } from '../../utils/nutritionUtils';

interface NutrientProgressProps {
  current: number;
  goal: number;
  type: 'calories' | 'protein' | 'carbs' | 'fat';
  unit?: string;
}

export default function NutrientProgress({ current, goal, type, unit = 'g' }: NutrientProgressProps) {
  const theme = useTheme();
  const progress = Math.min((current / goal) * 100, 100);

  const getTypeColor = (): readonly [string, string] => {
    if (!theme.colors.gradients) {
      return ['#4ADE80', '#22C55E'] as const; // Default gradient
    }
    const gradientColors = (() => {
      switch (type) {
        case 'protein':
          return theme.colors.gradients.success;
        case 'carbs':
          return theme.colors.gradients.warning;
        case 'fat':
          return theme.colors.gradients.danger;
        default:
          return theme.colors.gradients.primary;
      }
    })();
    // Ensure we have exactly two colors
    const [start = '#4ADE80', end = '#22C55E'] = gradientColors;
    return [start, end] as const;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Text>
        <Text style={[styles.value, { color: theme.colors.text }]}>
          {formatNutrientValue(current, unit)} / {formatNutrientValue(goal, unit)}
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarBg, { backgroundColor: theme.colors.border }]}>
          <LinearGradient
            colors={getTypeColor()}
            style={[styles.progressBar, { width: `${progress}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  value: {
    fontSize: 12,
    opacity: 0.8,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarBg: {
    flex: 1,
    backgroundColor: '#2C2C2E',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});
