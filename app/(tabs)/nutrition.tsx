
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TextInput, ViewStyle, TextStyle } from 'react-native';
import { MealEntry, WaterIntake } from '../../types/nutrition';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useNutrition } from '../../context/NutritionContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import NutrientProgress from '../../components/nutrition/NutrientProgress';
import MealCard from '../../components/nutrition/MealCard';
import WaterTracker from '../../components/nutrition/WaterTracker';
import { calculateTotalNutrients, calculateRemainingCalories } from '../../utils/nutritionUtils';

export default function NutritionScreen() {
  const theme = useTheme();
  const { state, dispatch } = useNutrition();
  const [activeTab, setActiveTab] = useState('My Activity');
  const [selectedMeal, setSelectedMeal] = useState<MealEntry | null>(null);

  // Get today's date at midnight for filtering
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter today's meals
  const todaysMeals = state.meals.filter(meal => 
    new Date(meal.dateTime) >= today
  );

  // Calculate total nutrients for today
  const totalNutrients = calculateTotalNutrients(todaysMeals);
  const remainingCalories = calculateRemainingCalories(
    totalNutrients.calories,
    state.goals.dailyCalories
  );

  // Get today's water intake
  const todaysWater = state.waterIntake.find(
    entry => new Date(entry.date).toDateString() === today.toDateString()
  );
  const currentWaterIntake = todaysWater?.amount || 0;

  const handleAddWater = () => {
    const waterAmount = state.preferences.preferredUnits === 'metric' ? 250 : 8;
    const newWaterEntry: WaterIntake = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount: waterAmount,
      unit: state.preferences.preferredUnits === 'metric' ? 'ml' : 'oz'
    };
    dispatch({ type: 'ADD_WATER', payload: newWaterEntry });
  };

  const handleMealPress = (meal: MealEntry) => {
    setSelectedMeal(meal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundWrapper}>
        <LinearGradient 
          colors={['#2C3E50', '#1A2533'] as readonly [string, string]}
          style={styles.backgroundGradient}
        />
      </View>
      <ScrollView>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {['My Activity', 'Journal', 'Meal Tracking'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={[styles.tab as ViewStyle, activeTab === tab && { backgroundColor: theme.colors.primary }]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText as TextStyle, 
                { color: activeTab === tab ? theme.colors.text : 'rgba(255, 255, 255, 0.5)' }
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'My Activity' && (
          <>
            {/* Daily Summary */}
            <View style={styles.summaryContainer}>
              <Text style={[styles.summaryTitle as TextStyle, { color: theme.colors.text }]}>
                Daily Summary
              </Text>
              <View style={styles.calorieContainer}>
                <Text style={[styles.calorieText as TextStyle, { color: theme.colors.text }]}>
                  {remainingCalories}
                </Text>
                <Text style={[styles.calorieLabel as TextStyle, { color: theme.colors.textSecondary }]}>
                  calories remaining
                </Text>
              </View>
              
              {/* Nutrient Progress Bars */}
              <NutrientProgress
                current={totalNutrients.calories}
                goal={state.goals.dailyCalories}
                type="calories"
                unit="kcal"
              />
              <NutrientProgress
                current={totalNutrients.protein}
                goal={(state.goals.dailyCalories * state.goals.macroSplit.protein) / 400}
                type="protein"
              />
              <NutrientProgress
                current={totalNutrients.carbs}
                goal={(state.goals.dailyCalories * state.goals.macroSplit.carbs) / 400}
                type="carbs"
              />
              <NutrientProgress
                current={totalNutrients.fat}
                goal={(state.goals.dailyCalories * state.goals.macroSplit.fat) / 900}
                type="fat"
              />
            </View>

            {/* Water Tracker */}
            <WaterTracker
              currentIntake={currentWaterIntake}
              goal={state.goals.waterGoal.amount}
              unit={state.goals.waterGoal.unit}
              onAddWater={handleAddWater}
            />

            {/* Today's Meals */}
            <View style={styles.mealsSection}>
              <Text style={[styles.sectionTitle as TextStyle, { color: theme.colors.text }]}>
                Today's Meals
              </Text>
              {todaysMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onPress={() => handleMealPress(meal)}
                />
              ))}
              <TouchableOpacity 
                style={[styles.addMealButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => {/* TODO: Implement add meal */}}
              >
                <Ionicons name="add" size={24} color={theme.colors.text} />
                <Text style={[styles.addMealText as TextStyle, { color: theme.colors.text }]}>
                  Add Meal
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {activeTab === 'Journal' && (
          <View style={styles.journalContainer}>
            {/* Journal implementation will go here */}
          </View>
        )}

        {activeTab === 'Meal Tracking' && (
          <View style={styles.mealTrackingContainer}>
            {/* Meal tracking implementation will go here */}
          </View>
        )}
      </ScrollView>

      {/* Meal Detail Modal */}
      <Modal
        visible={selectedMeal !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedMeal(null)}
      >
        {/* Modal implementation will go here */}
      </Modal>
    </SafeAreaView>
  );
}

interface Styles {
  container: ViewStyle;
  backgroundWrapper: ViewStyle;
  backgroundGradient: ViewStyle;
  summaryContainer: ViewStyle;
  summaryTitle: TextStyle;
  calorieContainer: ViewStyle;
  calorieText: TextStyle;
  calorieLabel: TextStyle;
  sectionTitle: TextStyle;
  tabsContainer: ViewStyle;
  tab: ViewStyle;
  tabText: TextStyle;
  journalContainer: ViewStyle;
  journalForm: ViewStyle;
  formGroup: ViewStyle;
  label: TextStyle;
  mealTypeButtons: ViewStyle;
  mealTypeButton: ViewStyle;
  mealTypeText: TextStyle;
  mealTypeIconContainer: ViewStyle;
  input: ViewStyle;
  addButton: ViewStyle;
  addButtonText: TextStyle;
  mealTrackingContainer: ViewStyle;
  addMealButton: ViewStyle;
  addMealText: TextStyle;
  mealsSection: ViewStyle;
  saveEntryButton: ViewStyle;
  saveButtonGradient: ViewStyle;
  saveButtonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  } as ViewStyle,
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as ViewStyle,
  backgroundGradient: {
    flex: 1,
  } as ViewStyle,
  summaryContainer: {
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  } as ViewStyle,
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  } as TextStyle,
  calorieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  } as ViewStyle,
  calorieText: {
    fontSize: 24,
    fontWeight: 'bold',
  } as TextStyle,
  calorieLabel: {
    fontSize: 14,
    marginBottom: 8,
  } as TextStyle,
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  } as TextStyle,
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  } as ViewStyle,
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  journalContainer: {
    padding: 16,
  },
  journalForm: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  } as ViewStyle,
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  mealTypeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  mealTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  mealTypeText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  } as TextStyle,
  mealTypeIconContainer: {
    marginLeft: 4,
  } as ViewStyle,
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
  } as ViewStyle,
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  } as ViewStyle,
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
  } as TextStyle,
  mealTrackingContainer: {
    flex: 1,
    padding: 16,
  } as ViewStyle,
  addMealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  } as ViewStyle,
  addMealText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  } as TextStyle,
  mealsSection: {
    marginTop: 24,
    marginHorizontal: 16,
  } as ViewStyle,
  saveEntryButton: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  } as ViewStyle,
  saveButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  } as ViewStyle,
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  } as TextStyle,
  backgroundWrapper: {
    ...StyleSheet.absoluteFillObject, // Ensures full-screen coverage 
  } as ViewStyle,
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  } as ViewStyle,
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  } as ViewStyle,
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
  } as ViewStyle,
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4ADE80',
  } as ViewStyle,
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  } as TextStyle,
  sectionWrapper: {
    margin: 16,
    backgroundColor: 'rgba(22,27,34,0.8)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  } as ViewStyle,
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  } as ViewStyle,
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  } as TextStyle,
  todayButton: {
    backgroundColor: 'rgba(74,222,128,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(74,222,128,0.3)',
  } as ViewStyle,
  todayButtonText: {
    fontSize: 14,
    fontWeight: '600',
  } as TextStyle,
  mealsContainer: {
    paddingHorizontal: 16,
  } as ViewStyle,
  mealItem: {
    marginBottom: 14,
  } as ViewStyle,
  mealInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  } as ViewStyle,
  mealType: {
    fontSize: 16,
    fontWeight: '500',
  } as TextStyle,
  mealCalories: {
    fontSize: 14,
    opacity: 0.8,
  } as TextStyle,
  progressBarContainer: {
    height: 8,
    justifyContent: 'center',
  } as ViewStyle,
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  } as ViewStyle,
  progressBar: {
    height: '100%',
    borderRadius: 3,
  } as ViewStyle,
  mealsNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    marginTop: 8,
  } as ViewStyle,
  navButton: {
    padding: 8,
  } as ViewStyle,
  navTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 20,
  } as TextStyle,
  goalSection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(22,27,34,0.8)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  goalIconContainer: {
    marginRight: 16,
  },
  goalIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalInfo: {
    flex: 1,
  },
  goalCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 12,
  },
  journalContainer: {
    margin: 16,
    backgroundColor: 'rgba(22,27,34,0.8)',
    borderRadius: 16,
    padding: 16,
  },
  journalForm: {

  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealTypeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mealTypeButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  mealTypeText: {
    fontSize: 14,
  },
  addFoodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  addFoodText: {
    fontSize: 14,
    marginLeft: 8,
  },
  notesInput: {
    padding: 10,
    borderRadius: 8,
    height: 100,
    borderWidth: 1,
  },
  saveEntryButton: {
    marginTop: 16,
  },
  saveButtonGradient: {
    borderRadius: 8,
    padding: 12,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});
