import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { MealEntry } from '../../types/nutrition';
import { formatNutrientValue } from '../../utils/nutritionUtils';

interface MealCardProps {
  meal: MealEntry;
  onPress: () => void;
}

export default function MealCard({ meal, onPress }: MealCardProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={theme.colors.gradients.card}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{meal.type}</Text>
            <Text style={[styles.time, { color: theme.colors.textSecondary }]}>
              {new Date(meal.dateTime).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
          {meal.photo && (
            <Image source={{ uri: meal.photo }} style={styles.mealImage} />
          )}
        </View>

        <View style={styles.nutrientsContainer}>
          <View style={styles.nutrientItem}>
            <Text style={[styles.nutrientValue, { color: theme.colors.text }]}>
              {formatNutrientValue(meal.totalNutrients.calories, 'kcal', 0)}
            </Text>
            <Text style={[styles.nutrientLabel, { color: theme.colors.textSecondary }]}>
              Calories
            </Text>
          </View>
          <View style={styles.nutrientItem}>
            <Text style={[styles.nutrientValue, { color: theme.colors.text }]}>
              {formatNutrientValue(meal.totalNutrients.protein)}
            </Text>
            <Text style={[styles.nutrientLabel, { color: theme.colors.textSecondary }]}>
              Protein
            </Text>
          </View>
          <View style={styles.nutrientItem}>
            <Text style={[styles.nutrientValue, { color: theme.colors.text }]}>
              {formatNutrientValue(meal.totalNutrients.carbs)}
            </Text>
            <Text style={[styles.nutrientLabel, { color: theme.colors.textSecondary }]}>
              Carbs
            </Text>
          </View>
          <View style={styles.nutrientItem}>
            <Text style={[styles.nutrientValue, { color: theme.colors.text }]}>
              {formatNutrientValue(meal.totalNutrients.fat)}
            </Text>
            <Text style={[styles.nutrientLabel, { color: theme.colors.textSecondary }]}>
              Fat
            </Text>
          </View>
        </View>

        {meal.mood && (
          <View style={styles.moodContainer}>
            <Ionicons 
              name={meal.mood === 'Great' || meal.mood === 'Good' ? 'happy' : 
                    meal.mood === 'Neutral' ? 'happy-outline' : 'sad'} 
              size={16} 
              color={theme.colors.textSecondary} 
            />
            <Text style={[styles.mood, { color: theme.colors.textSecondary }]}>
              {meal.mood}
            </Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
  },
  mealImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginLeft: 12,
  },
  nutrientsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  nutrientItem: {
    alignItems: 'center',
  },
  nutrientValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  nutrientLabel: {
    fontSize: 12,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  mood: {
    fontSize: 14,
    marginLeft: 6,
  },
});
