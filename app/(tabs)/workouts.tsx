
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function WorkoutsScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('week');
  
  // Mock data for display
  const weekPlan = [
    { id: 1, day: 'Monday', title: 'Upper Body', completed: true },
    { id: 2, day: 'Tuesday', title: 'Cardio', completed: true },
    { id: 3, day: 'Wednesday', title: 'Rest Day', completed: true, isRest: true },
    { id: 4, day: 'Thursday', title: 'Lower Body', completed: false },
    { id: 5, day: 'Friday', title: 'Full Body', completed: false },
    { id: 6, day: 'Saturday', title: 'Stretching', completed: false },
    { id: 7, day: 'Sunday', title: 'Rest Day', completed: false, isRest: true },
  ];
  
  const videoWorkouts = [
    { 
      id: 1, 
      title: 'HIIT Cardio Blast', 
      duration: '30 min', 
      level: 'Intermediate',
      thumbnail: null, // Placeholder image
    },
    { 
      id: 2, 
      title: 'Core Strength', 
      duration: '25 min', 
      level: 'Beginner',
      thumbnail: null, // Placeholder image
    },
    { 
      id: 3, 
      title: 'Full Body Power', 
      duration: '45 min', 
      level: 'Advanced',
      thumbnail: null, // Placeholder image
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.backgroundWrapper}>
      <LinearGradient 
        colors={theme.colors.gradients.dark}
        style={styles.backgroundGradient}
      />
      </View>
      {/* Tabs */}
      <View style={[styles.tabContainer, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'week' && [styles.activeTab, { borderBottomColor: theme.colors.secondary }]
          ]}
          onPress={() => setActiveTab('week')}
        >
          <Text style={[
            styles.tabText, 
            { 
              color: activeTab === 'week' ? theme.colors.secondary : theme.colors.text,
              fontFamily: theme.typography.fontFamily.medium
            }
          ]}>Week Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'library' && [styles.activeTab, { borderBottomColor: theme.colors.secondary }]
          ]}
          onPress={() => setActiveTab('library')}
        >
          <Text style={[
            styles.tabText, 
            { 
              color: activeTab === 'library' ? theme.colors.secondary : theme.colors.text,
              fontFamily: theme.typography.fontFamily.medium
            }
          ]}>Workout Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'history' && [styles.activeTab, { borderBottomColor: theme.colors.secondary }]
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[
            styles.tabText, 
            { 
              color: activeTab === 'history' ? theme.colors.secondary : theme.colors.text,
              fontFamily: theme.typography.fontFamily.medium
            }
          ]}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Content based on active tab */}
      {activeTab === 'week' && (
        <ScrollView style={styles.listContainer}>
          {weekPlan.map((day) => (
            <View 
              key={day.id}
              style={[
                styles.dayCard, 
                { 
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border
                }
              ]}
            >
              <View style={styles.dayHeader}>
                <Text style={[styles.dayText, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
                  {day.day}
                </Text>
                {day.completed && (
                  <View style={[styles.completedBadge, { backgroundColor: theme.colors.success }]}>
                    <Ionicons name="checkmark" size={14} color="white" />
                  </View>
                )}
              </View>
              <Text 
                style={[
                  styles.workoutDayTitle, 
                  { 
                    color: day.isRest ? theme.colors.text : theme.colors.secondary,
                    fontFamily: theme.typography.fontFamily.bold
                  }
                ]}
              >
                {day.title}
              </Text>
              {!day.isRest && !day.completed && (
                <View style={styles.workoutActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
                    onPress={() => router.push('/workout-details')}
                  >
                    <Text style={[
                      styles.actionButtonText, 
                      { 
                        color: theme.colors.primary,
                        fontFamily: theme.typography.fontFamily.bold
                      }
                    ]}>
                      Start Workout
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      )}

      {activeTab === 'library' && (
        <ScrollView style={styles.libraryContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[
              styles.sectionTitle, 
              { 
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily.bold
              }
            ]}>
              Video Workouts
            </Text>
          </View>

          {videoWorkouts.map((workout) => (
            <TouchableOpacity 
              key={workout.id}
              style={[styles.videoCard, { borderColor: theme.colors.border }]}
              onPress={() => router.push('/workout-video')}
            >
              <View style={styles.videoThumbnail}>
                {/* Placeholder for video thumbnail */}
                <View style={{
                  backgroundColor: theme.colors.card, 
                  width: '100%', 
                  height: '100%', 
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Ionicons name="videocam" size={40} color={theme.colors.secondary} />
                </View>
                <View style={styles.playOverlay}>
                  <View style={[styles.playButton, { backgroundColor: theme.colors.secondary }]}>
                    <Ionicons name="play" size={24} color={theme.colors.primary} />
                  </View>
                </View>
              </View>
              <View style={[styles.videoInfo, { backgroundColor: theme.colors.card }]}>
                <Text style={[
                  styles.videoTitle, 
                  { 
                    color: theme.colors.text,
                    fontFamily: theme.typography.fontFamily.bold
                  }
                ]}>
                  {workout.title}
                </Text>
                <View style={styles.videoMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color={theme.colors.text} />
                    <Text style={[styles.metaText, { color: theme.colors.text }]}>
                      {workout.duration}
                    </Text>
                  </View>
                  <View style={styles.metaBadge}>
                    <Text style={[styles.metaBadgeText, { color: theme.colors.secondary }]}>
                      {workout.level}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.sectionHeader}>
            <Text style={[
              styles.sectionTitle, 
              { 
                color: theme.colors.text,
                fontFamily: theme.typography.fontFamily.bold
              }
            ]}>
              Custom Workouts
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.createButton, { borderColor: theme.colors.secondary }]}
            onPress={() => router.push('/create-workout')}
          >
            <Ionicons name="add-circle-outline" size={24} color={theme.colors.secondary} />
            <Text style={[
              styles.createButtonText, 
              { 
                color: theme.colors.secondary,
                fontFamily: theme.typography.fontFamily.medium
              }
            ]}>
              Create New Workout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {activeTab === 'history' && (
        <View style={styles.historyContainer}>
          <Ionicons name="fitness-outline" size={60} color={theme.colors.secondary} />
          <Text style={[styles.emptyText, { color: theme.colors.text, marginTop: 20 }]}>
            No workout history yet
          </Text>
          <Text style={[styles.subText, { color: theme.colors.text, marginTop: 8 }]}>
            Complete workouts to see your history
          </Text>
          <TouchableOpacity 
            style={[styles.startHistoryButton, { backgroundColor: theme.colors.secondary, marginTop: 24 }]}
            onPress={() => setActiveTab('week')}
          >
            <Text style={[
              styles.startHistoryButtonText, 
              { 
                color: theme.colors.primary,
                fontFamily: theme.typography.fontFamily.bold
              }
            ]}>
              Start a Workout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  backgroundWrapper: {
    ...StyleSheet.absoluteFillObject, // Ensures full-screen coverage 
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  libraryContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  historyContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  dayCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 14,
  },
  completedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutDayTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  workoutActions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
  },
  sectionHeader: {
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
  },
  videoCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  videoThumbnail: {
    width: '100%',
    height: 160,
    position: 'relative',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  metaBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  metaBadgeText: {
    fontSize: 12,
  },
  createButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  createButtonText: {
    fontSize: 16,
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  startHistoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  startHistoryButtonText: {
    fontSize: 16,
  },
});
