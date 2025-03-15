import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnalyticsScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('progress');
  const [journalEntry, setJournalEntry] = useState('');

  const progressData = {
    monthlyWorkouts: 12,
    totalMinutes: 360,
    averageIntensity: 7.5,
    completedGoals: 2,
  };

  const workoutHistory = [
    { 
      id: 1, 
      date: '2024-01-15', 
      type: 'Upper Body',
      duration: '45 min',
      intensity: 8,
      notes: 'Increased weights on bench press'
    },
    // Add more workout history entries
  ];

  const goals = [
    {
      id: 1,
      title: 'Weight Loss',
      target: 'Lose 5kg',
      progress: 60,
      deadline: '2024-03-01'
    },
    {
      id: 2,
      title: 'Strength',
      target: 'Bench press 80kg',
      progress: 75,
      deadline: '2024-02-15'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.backgroundWrapper}>
    <LinearGradient 
      colors={theme.colors.gradients.dark}
      style={styles.backgroundGradient}
    />
    </View>
    <ScrollView >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          Analytics & Progress
        </Text>
      </View>

      <View style={styles.tabContainer}>
        {['progress', 'history', 'goals', 'journal'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
              { borderColor: theme.colors.secondary }
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === tab ? theme.colors.secondary : theme.colors.text }
            ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'progress' && (
        <View style={styles.progressContainer}>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={theme.colors.gradients.card}
                style={styles.cardGradient}
              />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>
                {progressData.monthlyWorkouts}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Workouts This Month
              </Text>
            </View>
            {/* Add more stat cards */}
          </View>
          
          {/* Add charts/graphs here */}
        </View>
      )}

      {activeTab === 'history' && (
        <View style={styles.historyContainer}>
          {workoutHistory.map((workout) => (
            <View key={workout.id} style={styles.historyCard}>
              <LinearGradient
                colors={theme.colors.gradients.card}
                style={styles.cardGradient}
              />
              <View style={styles.historyHeader}>
                <Text style={[styles.historyDate, { color: theme.colors.text }]}>
                  {workout.date}
                </Text>
                <Text style={[styles.historyType, { color: theme.colors.secondary }]}>
                  {workout.type}
                </Text>
              </View>
              <View style={styles.historyDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={16} color={theme.colors.text} />
                  <Text style={[styles.detailText, { color: theme.colors.text }]}>
                    {workout.duration}
                  </Text>
                </View>
                {/* Add more workout details */}
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'goals' && (
        <View style={styles.goalsContainer}>
          {goals.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <LinearGradient
                colors={theme.colors.gradients.card}
                style={styles.cardGradient}
              />
              <Text style={[styles.goalTitle, { color: theme.colors.text }]}>
                {goal.title}
              </Text>
              <Text style={[styles.goalTarget, { color: theme.colors.secondary }]}>
                {goal.target}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { 
                      width: `${goal.progress}%`,
                      backgroundColor: theme.colors.secondary
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.goalDeadline, { color: theme.colors.textSecondary }]}>
                Due: {goal.deadline}
              </Text>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'journal' && (
        <View style={styles.journalContainer}>
          <TextInput
            style={[styles.journalInput, { 
              color: theme.colors.text,
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderColor: theme.colors.border
            }]}
            placeholder="Write your workout notes here..."
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            value={journalEntry}
            onChangeText={setJournalEntry}
          />
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {/* Handle save */}}
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
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backgroundWrapper: {
    ...StyleSheet.absoluteFillObject, // Ensures full-screen coverage 
  },
  backgroundGradient: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressContainer: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
  },
  statCard: {
    width: '50%',
    padding: 10,
  },
  cardGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    opacity: 0.9,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
  },
  historyContainer: {
    padding: 20,
  },
  historyCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyType: {
    fontSize: 16,
  },
  historyDetails: {
    flexDirection: 'row',
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
  },
  goalsContainer: {
    padding: 20,
  },
  goalCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  goalTarget: {
    fontSize: 16,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  goalDeadline: {
    fontSize: 12,
  },
  journalContainer: {
    padding: 20,
  },
  journalInput: {
    height: 200,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  saveButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});