import { StyleSheet, Text, ScrollView, TouchableOpacity, Image, View } from 'react-native';
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          Welcome back!
        </Text>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => {}}
        >
          <Ionicons name="notifications" size={24} color={theme.colors.secondary} />
        </TouchableOpacity>
      </View>

      {/* Weekly Progress */}
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          Weekly Progress
        </Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressOuter}>
            <View 
              style={[
                styles.progressInner, 
                { 
                  width: `${progress * 100}%`,
                  backgroundColor: theme.colors.secondary 
                }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: theme.colors.text }]}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>

      {/* Today's Workout */}
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
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
            style={[styles.startButton, { backgroundColor: theme.colors.secondary }]}
            onPress={() => router.push('/workout-details')}
          >
            <Text style={[styles.startButtonText, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View 
            key={index} 
            style={[styles.statCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
          >
            <Ionicons name={stat.icon} size={28} color={theme.colors.secondary} />
            <Text style={[styles.statValue, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.text }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Upcoming Sessions */}
      <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.cardTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
            Upcoming Sessions
          </Text>
          <TouchableOpacity onPress={() => router.push('/schedule')}>
            <Text style={[styles.viewAllText, { color: theme.colors.secondary }]}>View All</Text>
          </TouchableOpacity>
        </View>
        {upcomingSessions.map((session) => (
          <TouchableOpacity 
            key={session.id}
            style={[styles.sessionCard, { borderColor: theme.colors.border }]}
          >
            <View style={styles.sessionInfo}>
              <Text style={[styles.sessionTitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                {session.title}
              </Text>
              <View style={styles.sessionDetail}>
                <Ionicons name="calendar-outline" size={14} color={theme.colors.text} style={styles.sessionIcon} />
                <Text style={[styles.sessionText, { color: theme.colors.text }]}>{session.day}</Text>
              </View>
              <View style={styles.sessionDetail}>
                <Ionicons name="time-outline" size={14} color={theme.colors.text} style={styles.sessionIcon} />
                <Text style={[styles.sessionText, { color: theme.colors.text }]}>{session.time}</Text>
              </View>
            </View>
            <View style={styles.sessionType}>
              {session.withTrainer && (
                <View style={[styles.badge, { backgroundColor: theme.colors.secondary }]}>
                  <Text style={[styles.badgeText, { color: theme.colors.primary }]}>Trainer</Text>
                </View>
              )}
              {session.virtual && (
                <View style={[styles.badge, { backgroundColor: theme.colors.background }]}>
                  <Text style={[styles.badgeText, { color: theme.colors.text }]}>Virtual</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  welcomeText: {
    fontSize: 24,
  },
  notificationButton: {
    padding: 8,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressOuter: {
    flex: 1,
    height: 12,
    backgroundColor: '#2A2A2A',
    borderRadius: 6,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressInner: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    width: 40,
    textAlign: 'right',
  },
  workoutCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  workoutMeta: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    marginLeft: 4,
    fontSize: 12,
  },
  startButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  startButtonText: {
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  statValue: {
    fontSize: 18,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 14,
  },
  sessionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  sessionDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  sessionIcon: {
    marginRight: 4,
  },
  sessionText: {
    fontSize: 12,
  },
  sessionType: {
    alignItems: 'flex-end',
  },
  badge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});