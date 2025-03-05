
import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

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
      thumbnail: require('../../assets/images/workout-1.png'),
    },
    { 
      id: 2, 
      title: 'Core Strength', 
      duration: '25 min', 
      level: 'Beginner',
      thumbnail: require('../../assets/images/workout-2.png'),
    },
    { 
      id: 3, 
      title: 'Full Body Power', 
      duration: '45 min', 
      level: 'Advanced',
      thumbnail: require('../../assets/images/workout-3.png'),
    },
  ];

  const renderDay = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.dayCard, 
        { 
          backgroundColor: theme.colors.surface, 
          borderColor: item.completed ? theme.colors.secondary : theme.colors.border,
          opacity: item.isRest ? 0.7 : 1,
        }
      ]}
      onPress={() => router.push('/workout-details')}
      disabled={item.isRest}
    >
      <View style={styles.dayHeader}>
        <Text style={[styles.dayText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.medium }]}>
          {item.day}
        </Text>
        {item.completed && (
          <View style={[styles.completedBadge, { backgroundColor: theme.colors.secondary }]}>
            <Ionicons name="checkmark" size={12} color={theme.colors.primary} />
          </View>
        )}
      </View>
      
      <Text style={[styles.workoutDayTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
        {item.title}
      </Text>
      
      {!item.isRest && (
        <View style={styles.workoutActions}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: item.completed ? 'rgba(212, 175, 55, 0.2)' : theme.colors.secondary }]}
            disabled={item.completed}
          >
            <Text 
              style={[
                styles.actionButtonText, 
                { 
                  color: item.completed ? theme.colors.textSecondary : theme.colors.primary,
                  fontFamily: theme.typography.fontFamily.medium,
                }
              ]}
            >
              {item.completed ? 'Completed' : 'Start'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Tabs */}
      <View style={[styles.tabContainer, { borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'week' && [styles.activeTab, { borderBottomColor: theme.colors.secondary }]
          ]}
          onPress={() => setActiveTab('week')}
        >
          <Text 
            style={[
              styles.tabText, 
              { 
                color: activeTab === 'week' ? theme.colors.secondary : theme.colors.textSecondary,
                fontFamily: theme.typography.fontFamily.medium,
              }
            ]}
          >
            This Week
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'library' && [styles.activeTab, { borderBottomColor: theme.colors.secondary }]
          ]}
          onPress={() => setActiveTab('library')}
        >
          <Text 
            style={[
              styles.tabText, 
              { 
                color: activeTab === 'library' ? theme.colors.secondary : theme.colors.textSecondary,
                fontFamily: theme.typography.fontFamily.medium,
              }
            ]}
          >
            Library
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'history' && [styles.activeTab, { borderBottomColor: theme.colors.secondary }]
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Text 
            style={[
              styles.tabText, 
              { 
                color: activeTab === 'history' ? theme.colors.secondary : theme.colors.textSecondary,
                fontFamily: theme.typography.fontFamily.medium,
              }
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'week' && (
        <FlatList
          data={weekPlan}
          renderItem={renderDay}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
      
      {activeTab === 'library' && (
        <ScrollView contentContainerStyle={styles.libraryContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
              Video Workouts
            </Text>
          </View>
          
          {videoWorkouts.map(workout => (
            <TouchableOpacity 
              key={workout.id}
              style={[styles.videoCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
              onPress={() => router.push('/workout-video')}
            >
              <Image
                source={workout.thumbnail}
                style={styles.videoThumbnail}
                resizeMode="cover"
              />
              <View style={styles.playOverlay}>
                <View style={[styles.playButton, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
                  <Ionicons name="play" size={24} color={theme.colors.secondary} />
                </View>
              </View>
              <View style={styles.videoInfo}>
                <Text style={[styles.videoTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                  {workout.title}
                </Text>
                <View style={styles.videoMeta}>
                  <View style={styles.videoMetaItem}>
                    <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
                    <Text style={[styles.videoMetaText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.regular }]}>
                      {workout.duration}
                    </Text>
                  </View>
                  <View style={styles.videoMetaItem}>
                    <Ionicons name="fitness-outline" size={14} color={theme.colors.textSecondary} />
                    <Text style={[styles.videoMetaText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.regular }]}>
                      {workout.level}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
              Workout Categories
            </Text>
          </View>
          
          <View style={styles.categoriesContainer}>
            {['Strength', 'Cardio', 'Flexibility', 'HIIT', 'Recovery', 'Core'].map((category, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.categoryCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
              >
                <Text style={[styles.categoryText, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      
      {activeTab === 'history' && (
        <ScrollView contentContainerStyle={styles.historyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.regular }]}>
            Your workout history will be displayed here
          </Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
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
  },
  videoMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  videoMetaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
