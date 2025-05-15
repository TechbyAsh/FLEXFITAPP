import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { convertUnits } from '../../utils/nutritionUtils';

interface WaterTrackerProps {
  currentIntake: number;
  goal: number;
  unit: 'ml' | 'oz';
  onAddWater: () => void;
}

export default function WaterTracker({ 
  currentIntake, 
  goal, 
  unit, 
  onAddWater 
}: WaterTrackerProps) {
  const theme = useTheme();
  const progress = Math.min((currentIntake / goal) * 100, 100);

  const formatAmount = (amount: number): string => {
    return `${Math.round(amount)}${unit}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>Water Intake</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {formatAmount(currentIntake)} of {formatAmount(goal)}
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={onAddWater}
        >
          <Ionicons name="add" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBarBg, { backgroundColor: theme.colors.border }]}>
          <LinearGradient
            colors={theme.colors.gradients.info}
            style={[styles.progressBar, { width: `${progress}%` }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>
        <Text style={[styles.percentage, { color: theme.colors.textSecondary }]}>
          {Math.round(progress)}%
        </Text>
      </View>

      <View style={styles.markersContainer}>
        {[0, 25, 50, 75, 100].map((marker) => (
          <Text 
            key={marker} 
            style={[styles.marker, { color: theme.colors.textSecondary }]}
          >
            {marker}%
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarBg: {
    flex: 1,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  percentage: {
    fontSize: 14,
    width: 40,
    textAlign: 'right',
  },
  markersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  marker: {
    fontSize: 12,
  },
});
