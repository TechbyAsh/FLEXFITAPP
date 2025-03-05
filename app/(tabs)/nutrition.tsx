
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NutritionScreen() {
  const theme = useTheme();
  const [selectedDay, setSelectedDay] = useState('Today');
  
  // Mock data for display
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const nutritionSummary = {
    calories: { consumed: 1850, goal: 2200 },
    protein: { consumed: 120, goal: 150 },
    carbs: { consumed: 180, goal: 220 },
    fat: { consumed: 60, goal: 70 },
  };
  
  const meals = [
    {
      id: 1,
      name: 'Breakfast',
      time: '7:30 AM',
      foods: [
        { id: 1, name: 'Oatmeal with Berries', calories: 320, protein: 12, completed: true },
        { id: 2, name: 'Greek Yogurt', calories: 150, protein: 15, completed: true },
      ],
    },
    {
      id: 2,
      name: 'Lunch',
      time: '12:30 PM',
      foods: [
        { id: 3, name: 'Grilled Chicken Salad', calories: 420, protein: 35, completed: true },
        { id: 4, name: 'Whole Grain Bread', calories: 180, protein: 8, completed: true },
      ],
    },
    {
      id: 3,
      name: 'Snack',
      time: '3:30 PM',
      foods: [
        { id: 5, name: 'Protein Shake', calories: 180, protein: 30, completed: true },
        { id: 6, name: 'Apple', calories: 80, protein: 0, completed: false },
      ],
    },
    {
      id: 4,
      name: 'Dinner',
      time: '7:00 PM',
      foods: [
        { id: 7, name: 'Grilled Salmon', calories: 350, protein: 28, completed: false },
        { id: 8, name: 'Roasted Vegetables', calories: 150, protein: 5, completed: false },
        { id: 9, name: 'Brown Rice', calories: 180, protein: 4, completed: false },
      ],
    },
  ];

  // Calculate the progress percentage for each nutrient
  const getProgressPercentage = (consumed, goal) => {
    return Math.min((consumed / goal) * 100, 100);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Day selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.daySelector}
        contentContainerStyle={styles.daySelectorContent}
      >
        <TouchableOpacity
          style={[
            styles.dayButton,
            selectedDay === 'Today' && [styles.selectedDayButton, { backgroundColor: theme.colors.secondary }]
          ]}
          onPress={() => setSelectedDay('Today')}
        >
          <Text style={[
            styles.dayButtonText,
            { 
              color: selectedDay === 'Today' ? theme.colors.primary : theme.colors.text,
              fontFamily: theme.typography.fontFamily.medium
            }
          ]}>
            Today
          </Text>
        </TouchableOpacity>
        
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              selectedDay === day && [styles.selectedDayButton, { backgroundColor: theme.colors.secondary }]
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[
              styles.dayButtonText,
              { 
                color: selectedDay === day ? theme.colors.primary : theme.colors.text,
                fontFamily: theme.typography.fontFamily.medium
              }
            ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Nutrition Summary */}
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          Nutrition Summary
        </Text>
        
        {/* Calories */}
        <View style={styles.nutrientRow}>
          <View style={styles.nutrientLabelContainer}>
            <Text style={[styles.nutrientLabel, { color: theme.colors.text }]}>Calories</Text>
            <Text style={[styles.nutrientValues, { color: theme.colors.text }]}>
              {nutritionSummary.calories.consumed} / {nutritionSummary.calories.goal} kcal
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: '#333' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${getProgressPercentage(nutritionSummary.calories.consumed, nutritionSummary.calories.goal)}%`,
                    backgroundColor: theme.colors.secondary 
                  }
                ]} 
              />
            </View>
          </View>
        </View>
        
        {/* Protein */}
        <View style={styles.nutrientRow}>
          <View style={styles.nutrientLabelContainer}>
            <Text style={[styles.nutrientLabel, { color: theme.colors.text }]}>Protein</Text>
            <Text style={[styles.nutrientValues, { color: theme.colors.text }]}>
              {nutritionSummary.protein.consumed} / {nutritionSummary.protein.goal} g
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: '#333' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${getProgressPercentage(nutritionSummary.protein.consumed, nutritionSummary.protein.goal)}%`,
                    backgroundColor: '#4CAF50' 
                  }
                ]} 
              />
            </View>
          </View>
        </View>
        
        {/* Carbs */}
        <View style={styles.nutrientRow}>
          <View style={styles.nutrientLabelContainer}>
            <Text style={[styles.nutrientLabel, { color: theme.colors.text }]}>Carbs</Text>
            <Text style={[styles.nutrientValues, { color: theme.colors.text }]}>
              {nutritionSummary.carbs.consumed} / {nutritionSummary.carbs.goal} g
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: '#333' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${getProgressPercentage(nutritionSummary.carbs.consumed, nutritionSummary.carbs.goal)}%`,
                    backgroundColor: '#2196F3' 
                  }
                ]} 
              />
            </View>
          </View>
        </View>
        
        {/* Fat */}
        <View style={styles.nutrientRow}>
          <View style={styles.nutrientLabelContainer}>
            <Text style={[styles.nutrientLabel, { color: theme.colors.text }]}>Fat</Text>
            <Text style={[styles.nutrientValues, { color: theme.colors.text }]}>
              {nutritionSummary.fat.consumed} / {nutritionSummary.fat.goal} g
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: '#333' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${getProgressPercentage(nutritionSummary.fat.consumed, nutritionSummary.fat.goal)}%`,
                    backgroundColor: '#FF9800' 
                  }
                ]} 
              />
            </View>
          </View>
        </View>
      </View>

      {/* Meals */}
      <View style={styles.mealsContainer}>
        <View style={styles.mealsHeader}>
          <Text style={[styles.mealsTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
            Meals
          </Text>
          <TouchableOpacity onPress={() => router.push('/food-tracker')}>
            <Text style={[styles.addMealText, { color: theme.colors.secondary }]}>
              Add Food
            </Text>
          </TouchableOpacity>
        </View>

        {meals.map((meal) => (
          <View 
            key={meal.id}
            style={[styles.mealCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          >
            <View style={styles.mealHeader}>
              <View>
                <Text style={[styles.mealName, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                  {meal.name}
                </Text>
                <Text style={[styles.mealTime, { color: theme.colors.text }]}>
                  {meal.time}
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="add-circle-outline" size={24} color={theme.colors.secondary} />
              </TouchableOpacity>
            </View>

            {meal.foods.map((food) => (
              <View 
                key={food.id}
                style={[
                  styles.foodItem,
                  food === meal.foods[meal.foods.length - 1] ? null : styles.foodItemBorder,
                  { borderBottomColor: theme.colors.border }
                ]}
              >
                <View style={styles.foodCheck}>
                  <TouchableOpacity style={styles.checkbox}>
                    {food.completed && (
                      <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
                    )}
                    {!food.completed && (
                      <Ionicons name="ellipse-outline" size={24} color={theme.colors.text} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.foodInfo}>
                  <Text style={[
                    styles.foodName, 
                    { 
                      color: theme.colors.text,
                      textDecorationLine: food.completed ? 'line-through' : 'none',
                      opacity: food.completed ? 0.7 : 1
                    }
                  ]}>
                    {food.name}
                  </Text>
                  <View style={styles.foodNutrition}>
                    <Text style={[styles.foodNutritionText, { color: theme.colors.text }]}>
                      {food.calories} kcal
                    </Text>
                    <Text style={[styles.foodNutritionText, { color: theme.colors.text }]}>
                      {food.protein}g protein
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Water Tracker */}
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.waterHeader}>
          <Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
            Water Intake
          </Text>
          <Text style={[styles.waterTarget, { color: theme.colors.text }]}>
            5 / 8 glasses
          </Text>
        </View>
        
        <View style={styles.waterGlasses}>
          {[...Array(8)].map((_, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.waterGlass,
                { borderColor: index < 5 ? theme.colors.secondary : theme.colors.border }
              ]}
            >
              <Ionicons 
                name="water"
                size={20} 
                color={index < 5 ? theme.colors.secondary : theme.colors.border} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  daySelector: {
    marginVertical: 12,
  },
  daySelectorContent: {
    paddingHorizontal: 16,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#2A2A2A',
  },
  selectedDayButton: {
    backgroundColor: '#D4AF37',
  },
  dayButtonText: {
    fontSize: 14,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  nutrientRow: {
    marginBottom: 12,
  },
  nutrientLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nutrientLabel: {
    fontSize: 14,
  },
  nutrientValues: {
    fontSize: 14,
  },
  progressContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    flex: 1,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  mealsContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  mealsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealsTitle: {
    fontSize: 18,
  },
  addMealText: {
    fontSize: 14,
  },
  mealCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealName: {
    fontSize: 16,
  },
  mealTime: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.7,
  },
  foodItem: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  foodItemBorder: {
    borderBottomWidth: 1,
  },
  foodCheck: {
    marginRight: 12,
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 14,
    marginBottom: 4,
  },
  foodNutrition: {
    flexDirection: 'row',
  },
  foodNutritionText: {
    fontSize: 12,
    opacity: 0.7,
    marginRight: 12,
  },
  waterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  waterTarget: {
    fontSize: 14,
  },
  waterGlasses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  waterGlass: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});
