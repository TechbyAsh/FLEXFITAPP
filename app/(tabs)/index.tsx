import { StyleSheet, Text, ScrollView, TouchableOpacity, Image, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

export default function DashboardScreen() {
  const theme = useTheme();
  const auth = useContext(AuthContext); // ✅ Correct way to access context

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

  console.log("🎉 Auth Context Data:", auth);
  console.log("👤 User Data from Context:", auth?.user);
  console.log("🔑 User ID from Context:", auth?.userId);

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
        <Text style={[styles.welcomeText, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          Welcome {auth?.user?.name || "Guest"}!
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

      {/* Weekly Progress */}
      <View style={styles.cardWrapper}>
        <View style={[styles.card, styles.glassCard]}>
          <LinearGradient
            colors={theme.colors.gradients.card}
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
                <LinearGradient
                  colors={theme.colors.gradients.secondary}
                  style={[styles.progressInner, { width: `${progress * 100}%` }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
              <Text style={[styles.progressText, { color: theme.colors.text }]}>{Math.round(progress * 100)}%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Today's Workout */}
      <View style={styles.cardWrapper}>
        <View style={[styles.card, styles.glassCard]}>
          <LinearGradient
            colors={theme.colors.gradients.card}
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
                onPress={() => router.push('/workout-details')}
              >
                <LinearGradient
                  colors={theme.colors.gradients.secondary}
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

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCardWrapper}>
            <View style={styles.statCard}>
              <View style={styles.statCardInner}>
                <View style={styles.iconCircle}>
                  <LinearGradient
                    colors={theme.colors.gradients.secondary}
                    style={styles.iconGradient}
                  >
                    <Ionicons name={stat.icon} size={22} color={theme.colors.primary} />
                  </LinearGradient>
                </View>
                <Text style={[styles.statValue, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
                  {stat.value}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.text }]}>
                  {stat.label}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Upcoming Sessions */}
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
                Upcoming Sessions
              </Text>
              <TouchableOpacity onPress={() => router.push('/schedule')}>
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
                        <Text style={[styles.sessionText, { color: theme.colors.text }]}>{session.day}</Text>
                      </View>
                      <View style={styles.sessionDetail}>
                        <Ionicons name="time-outline" size={14} color={theme.colors.text} style={styles.sessionIcon} />
                        <Text style={[styles.sessionText, { color: theme.colors.text }]}>{session.time}</Text>
                      </View>
                    </View>
                    <View style={styles.sessionType}>
                      {session.withTrainer && (
                        <LinearGradient
                          colors={theme.colors.gradients.secondary}
                          style={styles.badgeGradient}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                        >
                          <Text style={[styles.badgeText, { color: theme.colors.primary }]}>Trainer</Text>
                        </LinearGradient>
                      )}
                      {session.virtual && (
                        <View style={[styles.badge, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                          <Text style={[styles.badgeText, { color: theme.colors.text }]}>Virtual</Text>
                        </View>
                      )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  welcomeText: {
    fontSize: 28,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  notificationButton: {
    padding: 8,
  },
  notificationBadge: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardWrapper: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  glassCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressOuter: {
    flex: 1,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
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
  startButtonWrapper: {
    overflow: 'hidden',
    borderRadius: 20,
  },
  startButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  statCardWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  statCard: {
    width: '100%',
    borderRadius: 16,
    padding: 2,
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  statCardInner: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#191919',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 8,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
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
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sessionCardBg: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    backgroundColor: 'rgba(30,30,30,0.5)',
  },
  sessionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
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
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  badgeGradient: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Challenges carousel styles
  challengesCarousel: {
    marginTop: 4,
    marginBottom: 8,
  },
  challengesCarouselContent: {
    paddingRight: 16,
  },
  challengeCard: {
    width: 220,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(30,30,30,0.8)',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  challengeImageContainer: {
    height: 120,
    width: '100%',
    position: 'relative',
  },
  challengeImage: {
    width: '100%',
    height: '100%',
  },
  challengeImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  challengeLevel: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  challengeLevelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  challengeContent: {
    padding: 12,
  },
  challengeTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  challengeDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  challengeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  challengeDetailText: {
    fontSize: 12,
    marginLeft: 4,
  },
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