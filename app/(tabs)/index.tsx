
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function DashboardScreen() {
  const theme = useTheme();
  
  // Mock data for display
  const progress = 0.65; // 65% progress
  const todaysWorkout = {
    title: "Upper Body Strength",
    timeMinutes: 45,
    exercises: 8,
  };
  
  const stats = [
    { label: "Workouts", value: "15", icon: "barbell" },
    { label: "Calories", value: "12,500", icon: "flame" },
    { label: "Streak", value: "7 days", icon: "trending-up" },
  ];
  
  const upcomingSessions = [
    { 
      id: 1, 
      title: "Personal Training", 
      day: "Monday", 
      time: "9:00 AM", 
      withTrainer: true,
      virtual: true,
    },
    { 
      id: 2, 
      title: "Stretching Session", 
      day: "Wednesday", 
      time: "6:30 PM", 
      withTrainer: false,
      virtual: false,
    },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* User welcome section */}
      <View style={styles.welcomeSection}>
        <View>
          <Text style={[styles.welcomeText, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.regular }]}>
            Welcome back,
          </Text>
          <Text style={[styles.userName, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.bold }]}>
            Alex
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.profileButton, { backgroundColor: theme.colors.surface }]}
          onPress={() => router.push('/profile')}
        >
          <Image
            source={require('../../assets/images/profile-placeholder.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      
      {/* Progress card */}
      <LinearGradient
        colors={['#000000', '#222222']}
        style={[styles.progressCard, { borderColor: theme.colors.border }]}
      >
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
            Weekly Progress
          </Text>
          <TouchableOpacity>
            <Text style={[styles.viewDetailsText, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.medium }]}>
              View Details
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progress * 100}%`, backgroundColor: theme.colors.secondary }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
            {`${Math.round(progress * 100)}%`}
          </Text>
        </View>
        
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
                <Ionicons name={stat.icon} size={20} color={theme.colors.secondary} />
              </View>
              <Text style={[styles.statValue, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.regular }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </LinearGradient>
      
      {/* Today's workout */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          Today's Workout
        </Text>
        <TouchableOpacity onPress={() => router.push('/workouts')}>
          <Text style={[styles.viewAllText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.medium }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={[styles.workoutCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
        onPress={() => router.push('/workout-details')}
      >
        <Image
          source={require('../../assets/images/workout-placeholder.png')}
          style={styles.workoutImage}
        />
        <View style={styles.workoutInfo}>
          <Text style={[styles.workoutTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
            {todaysWorkout.title}
          </Text>
          <View style={styles.workoutMeta}>
            <View style={styles.workoutMetaItem}>
              <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
              <Text style={[styles.workoutMetaText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.regular }]}>
                {todaysWorkout.timeMinutes} mins
              </Text>
            </View>
            <View style={styles.workoutMetaItem}>
              <Ionicons name="fitness-outline" size={16} color={theme.colors.textSecondary} />
              <Text style={[styles.workoutMetaText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.regular }]}>
                {todaysWorkout.exercises} exercises
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.workoutAction}>
          <Ionicons name="play-circle" size={36} color={theme.colors.secondary} />
        </View>
      </TouchableOpacity>
      
      {/* Upcoming sessions */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          Upcoming Sessions
        </Text>
        <TouchableOpacity onPress={() => router.push('/schedule')}>
          <Text style={[styles.viewAllText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.medium }]}>
            Schedule
          </Text>
        </TouchableOpacity>
      </View>
      
      {upcomingSessions.map(session => (
        <TouchableOpacity 
          key={session.id}
          style={[styles.sessionCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
        >
          <View style={[styles.sessionDay, { backgroundColor: theme.colors.primary, borderColor: theme.colors.secondary }]}>
            <Text style={[styles.sessionDayText, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              {session.day.substring(0, 3)}
            </Text>
          </View>
          
          <View style={styles.sessionInfo}>
            <Text style={[styles.sessionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
              {session.title}
            </Text>
            <View style={styles.sessionMeta}>
              <View style={styles.sessionMetaItem}>
                <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
                <Text style={[styles.sessionMetaText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.regular }]}>
                  {session.time}
                </Text>
              </View>
              {session.withTrainer && (
                <View style={styles.sessionMetaItem}>
                  <Ionicons name="person-outline" size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.sessionMetaText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.regular }]}>
                    With Trainer
                  </Text>
                </View>
              )}
              {session.virtual && (
                <View style={styles.sessionVirtual}>
                  <Ionicons name="videocam" size={14} color={theme.colors.accent1} />
                  <Text style={[styles.sessionVirtualText, { color: theme.colors.accent1, fontFamily: theme.typography.fontFamily.medium }]}>
                    Virtual
                  </Text>
                </View>
              )}
            </View>
          </View>
          
          <TouchableOpacity style={[styles.joinButton, { backgroundColor: theme.colors.secondary }]}>
            <Text style={[styles.joinButtonText, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
              Join
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
      
      {/* Daily mindset coaching */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          Today's Mindset
        </Text>
      </View>
      
      <View style={[styles.mindsetCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        <View style={styles.quoteContainer}>
          <Text style={[styles.quoteText, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.regular, fontStyle: 'italic' }]}>
            "The only person you should try to be better than is the person you were yesterday."
          </Text>
          <Text style={[styles.quoteAuthor, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.medium }]}>
            - Unknown
          </Text>
        </View>
        <TouchableOpacity style={[styles.mindsetButton, { backgroundColor: 'rgba(212, 175, 55, 0.1)' }]}>
          <Text style={[styles.mindsetButtonText, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.medium }]}>
            Read More
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
  },
  userName: {
    fontSize: 24,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  progressCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
  },
  viewDetailsText: {
    fontSize: 14,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
  },
  viewAllText: {
    fontSize: 14,
  },
  workoutCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
  },
  workoutImage: {
    width: 80,
    height: 80,
  },
  workoutInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  workoutTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  workoutMeta: {
    flexDirection: 'row',
  },
  workoutMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  workoutMetaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  workoutAction: {
    justifyContent: 'center',
    paddingRight: 12,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  sessionDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: 12,
  },
  sessionDayText: {
    fontSize: 12,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  sessionMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sessionMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  sessionMetaText: {
    fontSize: 12,
    marginLeft: 4,
  },
  sessionVirtual: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  sessionVirtualText: {
    fontSize: 12,
    marginLeft: 4,
  },
  joinButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    fontSize: 12,
  },
  mindsetCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  quoteContainer: {
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    textAlign: 'right',
  },
  mindsetButton: {
    borderRadius: 24,
    paddingVertical: 10,
    alignItems: 'center',
  },
  mindsetButtonText: {
    fontSize: 14,
  },
});
