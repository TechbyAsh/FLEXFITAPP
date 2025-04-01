
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../services/authContext';


export default function ProfileScreen() {
  const theme = useTheme();
  const {logout} = useContext(AuthContext)
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  
  // Mock user data
  const user = {
    name: 'Ashley Johnson',
    email: 'Ash.johnson@example.com',
    memberSince: 'January 2023',
    plan: 'Premium',
    stats: {
      workoutsCompleted: 87,
      avgWorkoutTime: '45 min',
      streak: 14,
    }
  };

  const sections = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Personal Information', screen: '/account-info' },
        { icon: 'shield-checkmark-outline', label: 'Privacy & Security', screen: '/privacy' },
        { icon: 'card-outline', label: 'Subscription', screen: '/subscription' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { 
          icon: 'notifications-outline', 
          label: 'Notifications', 
          type: 'toggle',
          value: notifications,
          onToggle: () => setNotifications(!notifications)
        },
        { 
          icon: 'moon-outline', 
          label: 'Dark Mode', 
          type: 'toggle',
          value: darkMode,
          onToggle: () => setDarkMode(!darkMode)
        },
        { icon: 'language-outline', label: 'Language', screen: '/language' },
        { icon: 'fitness-outline', label: 'Workout Preferences', screen: '/workout-preferences' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle-outline', label: 'Help Center', screen: '/help' },
        { icon: 'chatbubble-outline', label: 'Contact Us', screen: '/contact' },
        { icon: 'document-text-outline', label: 'Terms & Conditions', screen: '/terms' },
      ]
    }
  ];

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from AuthContext
      router.replace('/login'); // Redirect to login/home screen
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.backgroundWrapper}>
      <LinearGradient 
        colors={theme.colors.gradients.dark}
        style={styles.backgroundGradient}
      />
      </View>
      {/* Profile Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={theme.colors.gradients.card}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.glassBorder} />
        
        <View style={styles.profileImageContainer}>
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.1)']}
            style={styles.profileImageGradient}
          >
            <View style={[styles.profileImage, { backgroundColor: theme.colors.primary }]}>
              <LinearGradient
                colors={theme.colors.gradients.secondary}
                style={styles.initialsGradient}
              >
                <Text style={[styles.profileInitials, { color: theme.colors.primary }]}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </LinearGradient>
            </View>
          </LinearGradient>
          
          <TouchableOpacity style={styles.editButtonWrapper}>
            <LinearGradient
              colors={theme.colors.gradients.secondary}
              style={styles.editButton}
            >
              <Ionicons name="camera" size={16} color={theme.colors.primary} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.profileName, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bold }]}>
          {user.name}
        </Text>
        <Text style={[styles.profileEmail, { color: theme.colors.text }]}>
          {user.email}
        </Text>
        
        <View style={styles.profileMeta}>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.colors.text }]}>Member Since</Text>
            <Text style={[styles.metaValue, { color: theme.colors.text }]}>{user.memberSince}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.colors.text }]}>Plan</Text>
            <Text style={[styles.metaValue, { color: theme.colors.secondary }]}>{user.plan}</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsWrapper}>
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={theme.colors.gradients.card}
            style={styles.statsGradient}
          />
          <View style={styles.statsGlassBorder} />
          
          <View style={styles.statsInner}>
            <View style={styles.statItem}>
              <LinearGradient
                colors={theme.colors.gradients.secondary}
                style={styles.statValueBg}
              >
                <Text style={[styles.statValue, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
                  {user.stats.workoutsCompleted}
                </Text>
              </LinearGradient>
              <Text style={[styles.statLabel, { color: theme.colors.text }]}>Workouts</Text>
            </View>
            
            <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
            
            <View style={styles.statItem}>
              <LinearGradient
                colors={theme.colors.gradients.secondary}
                style={styles.statValueBg}
              >
                <Text style={[styles.statValue, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
                  {user.stats.avgWorkoutTime}
                </Text>
              </LinearGradient>
              <Text style={[styles.statLabel, { color: theme.colors.text }]}>Avg Time</Text>
            </View>
            
            <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
            
            <View style={styles.statItem}>
              <LinearGradient
                colors={theme.colors.gradients.secondary}
                style={styles.statValueBg}
              >
                <Text style={[styles.statValue, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
                  {user.stats.streak}
                </Text>
              </LinearGradient>
              <Text style={[styles.statLabel, { color: theme.colors.text }]}>Day Streak</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Settings Sections */}
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.bold }]}>
            {section.title}
          </Text>
          
          <View style={styles.sectionContentWrapper}>
            <View style={styles.sectionContent}>
              <LinearGradient
                colors={theme.colors.gradients.card}
                style={styles.sectionGradient}
              />
              <View style={styles.sectionGlassBorder} />
              
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity 
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex !== section.items.length - 1 && [styles.settingItemBorder, { borderBottomColor: 'rgba(255,255,255,0.1)' }]
                  ]}
                  onPress={() => item.type !== 'toggle' && router.push(item.screen)}
                >
                  <View style={styles.settingLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons name={item.icon} size={22} color={theme.colors.secondary} style={styles.settingIcon} />
                    </View>
                    <Text style={[styles.settingLabel, { color: theme.colors.text }]}>{item.label}</Text>
                  </View>
                  
                  {item.type === 'toggle' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#767577', true: theme.colors.secondary }}
                      thumbColor="#f4f3f4"
                    />
                  ) : (
                    <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ))}

      {/* Logout Button */}
      <View style={styles.logoutWrapper}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LinearGradient
            colors={['#F44336', '#D32F2F']}
            style={styles.logoutGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={styles.logoutIcon} />
            <Text style={[styles.logoutText, { color: '#FFFFFF', fontFamily: theme.typography.fontFamily.bold }]}>Log Out</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Version */}
      <Text style={[styles.versionText, { color: theme.colors.text }]}>
        Version 1.0.0
      </Text>
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 20,
    position: 'relative',
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 8,
    overflow: 'hidden',
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  glassBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
    padding: 5,
  },
  profileImageGradient: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  initialsGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  editButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#121212',
  },
  editButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  profileEmail: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  profileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  metaValue: {
    fontSize: 14,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 30,
    marginHorizontal: 16,
  },
  statsWrapper: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  statsGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  statsGlassBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  statsInner: {
    flexDirection: 'row',
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValueBg: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  sectionContentWrapper: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionContent: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 16,
  },
  sectionGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  sectionGlassBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    position: 'relative',
    zIndex: 1,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  settingIcon: {
    
  },
  settingLabel: {
    fontSize: 16,
  },
  logoutWrapper: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButton: {
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 40,
  },
});
