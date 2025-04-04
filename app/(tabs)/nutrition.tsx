
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NutritionScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('My Activity');
  
  // Mock data for the nutrition screen
  const meals = [
    { 
      id: 1, 
      type: 'Breakfast', 
      calories: 320, 
      totalCalories: 3200,
      progress: 0.1,
    },
    { 
      id: 2, 
      type: 'Lunch', 
      calories: 600, 
      totalCalories: 600,
      progress: 0.6,
      unit: 'g'
    },
    { 
      id: 3, 
      type: 'Dinner', 
      calories: 400, 
      totalCalories: 400,
      progress: 0.35,
      unit: 'g'
    },
  ];

  const todaysGoals = [
    {
      id: 1,
      title: '3 Meals',
      description: 'Full meals | 3 intervals',
      icon: 'nutrition',
    },
    {
      id: 2,
      title: 'High calorie diet',
      description: '3200 KCal | 3 full meals',
      icon: 'flame',
    }
  ];

  return (
    <SafeAreaView style={styles.container} >
    <View style={styles.backgroundWrapper}>
      <LinearGradient 
        colors={theme.colors.gradients.dark}
        style={styles.backgroundGradient}
      />
      </View>
      <ScrollView >
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'My Activity' && styles.activeTab
          ]}
          onPress={() => setActiveTab('My Activity')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'My Activity' ? theme.colors.text : 'rgba(255, 255, 255, 0.5)' }
            ]}
          >
            My Activity
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'Journal' && styles.activeTab
          ]}
          onPress={() => setActiveTab('Journal')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'Journal' ? theme.colors.text : 'rgba(255, 255, 255, 0.5)' }
            ]}
          >
            Journal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'Meal Tracking' && styles.activeTab
          ]}
          onPress={() => setActiveTab('Meal Tracking')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'Meal Tracking' ? theme.colors.text : 'rgba(255, 255, 255, 0.5)' }
            ]}
          >
           Meal Tracking
          </Text>
        </TouchableOpacity>
      </View>

         {/* My Activity Section */}
       {activeTab === 'My Activity' && (
           <>
      {/* Meals Section */}
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Meals</Text>
          <TouchableOpacity style={styles.todayButton}>
            <Text style={[styles.todayButtonText, { color: theme.colors.text }]}>Today</Text>
          </TouchableOpacity>
        </View>

        {/* Meals List */}
        <View style={styles.mealsContainer}>
          {meals.map((meal) => (
            <View key={meal.id} style={styles.mealItem}>
              <View style={styles.mealInfo}>
                <Text style={[styles.mealType, { color: theme.colors.text }]}>{meal.type}</Text>
                <Text style={[styles.mealCalories, { color: theme.colors.text }]}>
                  {meal.calories}/{meal.totalCalories} {meal.unit || 'KCal'}
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <LinearGradient
                    colors={theme.colors.gradients.secondary}
                    style={[styles.progressBar, { width: `${meal.progress * 100}%` }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Meals Navigation */}
        <View style={styles.mealsNavigation}>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="chevron-back" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.navTitle, { color: theme.colors.text }]}>Meals</Text>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Today's Goal Section */}
      <View style={styles.goalSection}>
        <Text style={[styles.goalTitle, { color: theme.colors.text }]}>Today's Goal</Text>
        
        {todaysGoals.map((goal) => (
          <TouchableOpacity key={goal.id} style={styles.goalCard}>
            <View style={styles.goalIconContainer}>
              <LinearGradient
                colors={theme.colors.gradients.secondary}
                style={styles.goalIconBg}
              >
                <Ionicons name={goal.icon} size={22} color={theme.colors.primary} />
              </LinearGradient>
            </View>
            <View style={styles.goalInfo}>
              <Text style={[styles.goalCardTitle, { color: theme.colors.text }]}>
                {goal.title}
              </Text>
              <Text style={[styles.goalDescription, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                {goal.description}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        ))}
      </View>
      </>
        )}

      {activeTab === 'Journal' && (
        <View style={styles.journalContainer}>
          <View style={styles.journalForm}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Meal Type</Text>
              <View style={styles.mealTypeButtons}>
                {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.mealTypeButton,
                      { borderColor: theme.colors.secondary }
                    ]}
                  >
                    <Text style={[styles.mealTypeText, { color: theme.colors.text }]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Food Items</Text>
              <TouchableOpacity 
                style={[styles.addFoodButton, { borderColor: theme.colors.secondary }]}
                onPress={() => {
                  // Integration point for MyFitnessPal or custom food search
                  console.log('Add food item');
                }}
              >
                <Ionicons name="add-circle-outline" size={24} color={theme.colors.secondary} />
                <Text style={[styles.addFoodText, { color: theme.colors.text }]}>
                  Add Food Item
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: theme.colors.text }]}>Notes</Text>
              <TextInput
                style={[
                  styles.notesInput,
                  { 
                    color: theme.colors.text,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderColor: theme.colors.border
                  }
                ]}
                multiline
                placeholder="Add notes about your meal..."
                placeholderTextColor="rgba(255,255,255,0.5)"
              />
            </View>

            <TouchableOpacity 
              style={styles.saveEntryButton}
              onPress={() => {
                // Handle saving journal entry
                console.log('Save journal entry');
              }}
            >
              <LinearGradient
                colors={theme.colors.gradients.secondary}
                style={styles.saveButtonGradient}
              >
                <Text style={[styles.saveButtonText, { color: theme.colors.primary }]}>
                  Save Entry
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}

    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundWrapper: {
    ...StyleSheet.absoluteFillObject, // Ensures full-screen coverage 
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4ADE80',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionWrapper: {
    margin: 16,
    backgroundColor: 'rgba(22,27,34,0.8)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  todayButton: {
    backgroundColor: 'rgba(74,222,128,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(74,222,128,0.3)',
  },
  todayButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  mealsContainer: {
    paddingHorizontal: 16,
  },
  mealItem: {
    marginBottom: 14,
  },
  mealInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  mealType: {
    fontSize: 16,
    fontWeight: '500',
  },
  mealCalories: {
    fontSize: 14,
    opacity: 0.8,
  },
  progressBarContainer: {
    height: 8,
    justifyContent: 'center',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  mealsNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    marginTop: 8,
  },
  navButton: {
    padding: 8,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 20,
  },
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
