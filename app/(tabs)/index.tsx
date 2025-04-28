import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, ViewStyle, TextStyle, ImageStyle, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { AuthContext } from '../../context/authContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState, useContext } from 'react';
import { GlassCard } from  '../../components/GlassCard';
import { Steps } from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DailyFlexTask {
  id: number;
  title: string;
  description: string;
  icon: string;
  progress: number;
  reminder: string;
  color: string;
  completed: boolean;
}

interface TodaysWorkout {
  title: string;
  timeMinutes: number;
  exercises: number;
}

interface UpcomingSession {
  id: number;
  title: string;
  day: string;
  time: string;
  trainer: string;
  location: string;
}

const initialUpcomingSessions: UpcomingSession[] = [
  {
    id: 1,
    title: 'HIIT Training',
    day: 'Monday',
    time: '9:00 AM',
    trainer: 'Sarah Johnson',
    location: 'Main Studio'
  },
  {
    id: 2,
    title: 'Yoga Flow',
    day: 'Wednesday',
    time: '10:30 AM',
    trainer: 'Mike Chen',
    location: 'Zen Room'
  },
  {
    id: 3,
    title: 'Strength Training',
    day: 'Friday',
    time: '2:00 PM',
    trainer: 'David Smith',
    location: 'Weight Room'
  }
];

const initialTodaysWorkout: TodaysWorkout = {
  title: "Upper Body Strength",
  timeMinutes: 45,
  exercises: 8,
};

const initialDailyFlexTasks: DailyFlexTask[] = [
  {
    id: 1,
    title: 'Daily Workout',
    description: 'Complete today\'s training program',
    icon: 'barbell',
    progress: 0,
    reminder: '8:00 AM',
    color: '#FF6B6B',
    completed: false
  },
  {
    id: 2,
    title: 'Meal Planning',
    description: 'Plan your meals for the week',
    icon: 'nutrition',
    progress: 0,
    reminder: '9:00 AM',
    color: '#4ECDC4',
    completed: false
  },
  {
    id: 3,
    title: 'Mindfulness',
    description: 'Take a moment to meditate',
    icon: 'meditation',
    progress: 0,
    reminder: '7:00 PM',
    color: '#96CEB4',
    completed: false
  },
  {
    id: 4,
    title: 'Weekly Challenge',
    description: 'Complete this week\'s fitness challenge',
    icon: 'trophy',
    progress: 0,
    reminder: '10:00 AM',
    color: '#FFD93D',
    completed: false
  }
];

export default function Index() {
  const [dailyFlexTasks, setDailyFlexTasks] = useState<DailyFlexTask[]>(initialDailyFlexTasks);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [todaysWorkout, setTodaysWorkout] = useState<TodaysWorkout>(initialTodaysWorkout);
  const [upcomingSessions, setUpcomingSessions] = useState<UpcomingSession[]>(initialUpcomingSessions);
  const theme = useTheme();
  const { user } = useContext(AuthContext) || {};

  // Load saved progress for dailyFlex on mount
  useEffect(() => {
    const loadProgress = async () => {
      const saved = await AsyncStorage.getItem('@daily_flex_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        setCompletedSteps(parsed.completedSteps || []);
        setCurrentStep(parsed.currentStep || 0);
      }
    };
    loadProgress();
  }, []);

  // Save progress when changes occur for dailyFlex
  useEffect(() => {
    AsyncStorage.setItem(
      '@daily_flex_progress',
      JSON.stringify({ completedSteps, currentStep })
    );
  }, [completedSteps, currentStep]);

  const handleTaskCompletion = (taskId: number) => {
    setDailyFlexTasks(tasks => 
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleTaskPress = (taskId: number) => {
    // Navigate to task details or show modal
    console.log('Task pressed:', taskId);
  };

  const handleStepPress = (index: number) => {
    if (!completedSteps.includes(index)) {
      setCompletedSteps((prev) => [...prev, index]);
    }
    setCurrentStep(index);
  };

  const handleStepCompletion = (step: number) => {
    if (completedSteps.includes(step)) {
      setCompletedSteps(completedSteps.filter((s) => s !== step));
    } else {
      setCompletedSteps([...completedSteps, step]);
      if (step === currentStep) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  useEffect(() => {
    console.log(" User Data from Context:", user);
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backgroundWrapper}>
        <LinearGradient 
          colors={['#1a1a1a', '#2d2d2d'] as any}
          style={styles.backgroundGradient}
        />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={[styles.welcomeText, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
            Welcome {user?.name || "Guest"}!
          </Text>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => {}}
          >
            <View style={styles.notificationBadge}>
              <Ionicons name="notifications" size={24} color={theme.colors.secondary} />
            </View>
          </TouchableOpacity>
        </View>
        {/* Daily Flex Section */}
        <View style={styles.dailyFlexContainer}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Daily Flex
            </Text>
            <TouchableOpacity onPress={() => {/* Handle settings */}}>
              <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          <GlassCard style={styles.dailyFlexCard}>
            <ScrollView 
              style={styles.tasksScrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.tasksScrollContent}
            >
              {dailyFlexTasks.map((task) => (
                <View key={task.id} style={styles.taskCardWrapper}>
                  <View style={[styles.taskCard, { borderLeftColor: task.color }]}>
                    <TouchableOpacity 
                      style={styles.taskCheckbox}
                      onPress={() => handleTaskCompletion(task.id)}
                    >
                      <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
                        {task.completed && (
                          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                        )}
                      </View>
                    </TouchableOpacity>

                    <View style={styles.taskIconContainer}>
                      <Ionicons name={task.icon as any} size={24} color={task.color} />
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.taskContent}
                      onPress={() => handleTaskPress(task.id)}
                    >
                      <Text style={[styles.taskTitle, { color: theme.colors.text }]}>
                        {task.title}
                      </Text>
                      <Text style={[styles.taskDescription, { color: theme.colors.secondary }]}>
                        {task.description}
                      </Text>
                      
                      <View style={styles.taskMeta}>
                        <View style={styles.reminderContainer}>
                          <Ionicons name="time-outline" size={14} color={theme.colors.secondary} />
                          <Text style={[styles.reminderText, { color: theme.colors.textSecondary }]}>
                            {task.reminder}
                          </Text>
                        </View>
                        
                        {task.completed && (
                          <View style={styles.completedBadge}>
                            <Text style={styles.completedText}>Completed</Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </GlassCard>
        </View>

        {/* Weekly Progress */}
        <View style={styles.cardWrapper}>
          <View style={[styles.card, styles.glassCard]}>
            <LinearGradient
              colors={['#1a1a1a', '#2d2d2d'] as const}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                Weekly Progress
              </Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressOuter}>
                  <View
                    style={[styles.progressBar, { width: `${dailyFlexTasks.reduce((acc, task) => acc + task.progress, 0) / dailyFlexTasks.length}%` }]}
                  />
                </View>
                <Text style={[styles.progressText, { color: theme.colors.text }]}>{Math.round(dailyFlexTasks.reduce((acc, task) => acc + task.progress, 0) / dailyFlexTasks.length * 100)}%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Today's Workout */}
        <View style={styles.cardWrapper}>
          <View style={[styles.card, styles.glassCard]}>
            <LinearGradient
              colors={['#1a1a1a', '#2d2d2d'] as const}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                Today's Workout
              </Text>
              <View style={styles.workoutCard}>
                <View style={styles.workoutInfo}>
                  <Text style={[styles.workoutTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                    {todaysWorkout.title}
                  </Text>
                  <View style={styles.workoutMeta}>
                    <View style={styles.metaItem}>
                      <Ionicons name="time-outline" size={16} color={theme.colors.text} />
                      <Text style={[styles.metaText, { color: theme.colors.text }]}>{todaysWorkout.timeMinutes} min</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Ionicons name="barbell-outline" size={16} color={theme.colors.text} />
                      <Text style={[styles.metaText, { color: theme.colors.text }]}>{todaysWorkout.exercises} exercises</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.startButtonWrapper}
                  onPress={() => router.push('/(tabs)/workout-details' as any)}
                >
                  <LinearGradient
                    colors={['#4CAF50', '#45B649'] as const}
                    style={styles.startButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={[styles.startButtonText, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
                      Start
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Upcoming Sessions */}
        <View style={styles.cardWrapper}>
          <View style={[styles.card, styles.glassCard]}>
            <LinearGradient
              colors={['#1a1a1a', '#2d2d2d'] as const}
              style={styles.cardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <View style={styles.cardContent}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                  Upcoming Sessions
                </Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/schedule' as any)}>
                  <Text style={[styles.viewAllText, { color: theme.colors.secondary }]}>View All</Text>
                </TouchableOpacity>
              </View>
              {upcomingSessions.map((session) => (
                <TouchableOpacity 
                  key={session.id}
                  style={styles.sessionCard}
                >
                  <View style={styles.sessionCardBg}>
                    <View style={styles.sessionContent}>
                      <View style={styles.sessionInfo}>
                        <Text style={[styles.sessionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                          {session.title}
                        </Text>
                        <View style={styles.sessionDetail}>
                          <Ionicons name="calendar-outline" size={14} color={theme.colors.text} style={styles.sessionIcon} />
                          <Text style={[styles.sessionText, { color: theme.colors.text }]}>{session.day} at {session.time}</Text>
                        </View>
                        <View style={styles.sessionDetail}>
                          <Ionicons name="person-outline" size={14} color={theme.colors.text} style={styles.sessionIcon} />
                          <Text style={[styles.sessionText, { color: theme.colors.text }]}>{session.trainer}</Text>
                        </View>
                        <View style={styles.sessionDetail}>
                          <Ionicons name="location-outline" size={14} color={theme.colors.text} style={styles.sessionIcon} />
                          <Text style={[styles.sessionText, { color: theme.colors.text }]}>{session.location}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
         {/* Fitness Challenges */}
      <View style={styles.cardWrapper}>
        <View style={[styles.card, styles.glassCard]}>
          <LinearGradient
            colors={theme.colors.gradients.card}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.cardContent}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                Fitness Challenges
              </Text>
              <TouchableOpacity onPress={() => router.push('/challenges')}>
                <Text style={[styles.viewAllText, { color: theme.colors.secondary }]}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.challengesCarousel}
              contentContainerStyle={styles.challengesCarouselContent}
            >
              {[
                { 
                  id: 1, 
                  title: "30-Day HIIT Challenge", 
                  duration: "4 weeks",
                  level: "Intermediate",
                  members: 2453,
                  image: require('../../assets/images/flex-logo-bg.png') 
                },
                { 
                  id: 2, 
                  title: "Core Crusher", 
                  duration: "3 weeks",
                  level: "Beginner",
                  members: 1872,
                  image: require('../../assets/images/flex-logo-bg.png') 
                },
                { 
                  id: 3, 
                  title: "Strength Builder", 
                  duration: "6 weeks",
                  level: "Advanced",
                  members: 985,
                  image: require('../../assets/images/flex-logo-bg.png') 
                },
                { 
                  id: 4, 
                  title: "Stretch & Flow", 
                  duration: "4 weeks",
                  level: "All Levels",
                  members: 3241,
                  image: require('../../assets/images/flex-logo-bg.png') 
                }
              ].map((challenge) => (
                <TouchableOpacity 
                  key={challenge.id}
                  style={styles.challengeCard}
                  onPress={() => router.push(`/challenge/${challenge.id}`)}
                >
                  <View style={styles.challengeImageContainer}>
                    <Image 
                      source={challenge.image} 
                      style={styles.challengeImage}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.8)']}
                      style={styles.challengeImageOverlay}
                    />
                    <View style={styles.challengeLevel}>
                      <Text style={styles.challengeLevelText}>{challenge.level}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.challengeContent}>
                    <Text style={[styles.challengeTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                      {challenge.title}
                    </Text>
                    
                    <View style={styles.challengeDetails}>
                      <View style={styles.challengeDetail}>
                        <Ionicons name="calendar-outline" size={14} color={theme.colors.secondary} />
                        <Text style={[styles.challengeDetailText, { color: theme.colors.text }]}>
                          {challenge.duration}
                        </Text>
                      </View>
                      <View style={styles.challengeDetail}>
                        <Ionicons name="people-outline" size={14} color={theme.colors.secondary} />
                        <Text style={[styles.challengeDetailText, { color: theme.colors.text }]}>
                          {challenge.members.toLocaleString()}
                        </Text>
                      </View>
                    </View>
                    
                    <LinearGradient
                      colors={theme.colors.gradients.secondary}
                      style={styles.joinChallengeButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={[styles.joinChallengeText, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.medium }]}>
                        Join Challenge
                      </Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type Style = ViewStyle | TextStyle | ImageStyle;

const styles = StyleSheet.create<Record<string, ViewStyle | TextStyle | ImageStyle>>({
  container: {
    flex: 1,
    backgroundColor: '#121212'
  },
  backgroundWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  } as ViewStyle,
  backgroundGradient: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%'
  } as ViewStyle,
  scrollView: {
    flex: 1,
    paddingHorizontal: 16
  } as ViewStyle,
  scrollViewContent: {
    paddingBottom: 20
  } as ViewStyle,
  header: {
    padding: 20,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  } as ViewStyle,
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  } as TextStyle,
  notificationButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)'
  } as ViewStyle,
  notificationBadge: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)'
  } as ViewStyle,
  dailyFlexContainer: {
    marginTop: 20,
    marginBottom: 20,
  } as ViewStyle,
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  } as ViewStyle,
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  } as TextStyle,
  dailyFlexCard: {
    padding: 16,
    width: '100%',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  } as ViewStyle,
  tasksScrollView: {
    flex: 1,
  },
  tasksScrollContent: {
    paddingVertical: 16,
  },
  taskCardWrapper: {
    marginBottom: 12,
  } as ViewStyle,
  taskCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  } as ViewStyle,
  taskCheckbox: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  } as ViewStyle,
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  checkboxChecked: {
    backgroundColor: '#4CAF50',
  } as ViewStyle,
  taskIconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  } as ViewStyle,
  taskContent: {
    marginLeft: 40,
  } as ViewStyle,
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4
  } as TextStyle,
  taskDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 12
  } as TextStyle,
  taskMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  reminderText: {
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.7,
  } as TextStyle,
  completedBadge: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  } as ViewStyle,
  completedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  } as TextStyle,
  cardWrapper: {
    marginBottom: 20,
  } as ViewStyle,
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  } as ViewStyle,
  glassCard: {
    backgroundColor: 'rgba(30,30,30,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  } as ViewStyle,
  cardGradient: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  } as ViewStyle,
  cardContent: {
    position: 'relative',
    zIndex: 1,
  } as ViewStyle,
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  } as TextStyle,
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  } as ViewStyle,
  progressOuter: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  } as ViewStyle,
  progressBar: {
    height: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  } as ViewStyle,
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  } as TextStyle,
  workoutCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  } as ViewStyle,
  workoutInfo: {
    flex: 1,
  } as ViewStyle,
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4
  } as TextStyle,
  workoutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  metaText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginLeft: 4,
  } as TextStyle,
  startButtonWrapper: {
    marginTop: 16,
  } as ViewStyle,
  startButton: {
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  } as ViewStyle,
  startButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  } as TextStyle,
  sessionCard: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
  } as ViewStyle,
  sessionCardBg: {
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  } as TextStyle,
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  } as ViewStyle,
  viewAllText: {
    fontSize: 14,
  } as TextStyle,
  sessionCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  } as ViewStyle,
  sessionCardBg: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    backgroundColor: 'rgba(30,30,30,0.5)',
  } as ViewStyle,
  sessionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  } as ViewStyle,
  sessionInfo: {
    flex: 1,
  } as ViewStyle,
  sessionTitle: {
    fontSize: 16,
    marginBottom: 4,
  } as TextStyle,
  sessionDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  } as ViewStyle,
  sessionIcon: {
    marginRight: 4,
  } as ViewStyle,
  sessionText: {
    fontSize: 12,
  } as TextStyle,
  sessionType: {
    alignItems: 'flex-end',
  } as ViewStyle,
  flexCardBg: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    backgroundColor: 'rgba(30,30,30,)',
  } as ViewStyle,
  badge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  } as ViewStyle,
  badgeGradient: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 4,
  } as ViewStyle,
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  } as TextStyle,

  // Challenges carousel styles
  challengesCarousel: {
    marginTop: 4,
    marginBottom: 8,
  } as ViewStyle,
  challengesCarouselContent: {
    paddingRight: 16,
  } as ViewStyle,
  challengeCard: {
    width: 220,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(30,30,30,0.8)',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  } as ViewStyle,
  challengeImageContainer: {
    height: 120,
    width: '100%',
    position: 'relative',
  } as ViewStyle,
  challengeImage: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
  challengeImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  } as ViewStyle,
  challengeLevel: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  } as ViewStyle,
  challengeLevelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  } as TextStyle,
  challengeContent: {
    padding: 12,
  } as ViewStyle,
  challengeTitle: {
    fontSize: 16,
    marginBottom: 8,
  } as TextStyle,
  challengeDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  } as ViewStyle,
  challengeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  } as ViewStyle,
  challengeDetailText: {
    fontSize: 12,
    marginLeft: 4,
  } as TextStyle,
  joinChallengeButton: {
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  joinChallengeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});