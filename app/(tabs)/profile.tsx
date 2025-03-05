
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';

export default function ProfileScreen() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
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

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.profileImageContainer}>
          <View style={[styles.profileImage, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.profileInitials, { color: theme.colors.secondary }]}>
              {user.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.colors.secondary }]}>
            <Ionicons name="camera" size={16} color={theme.colors.primary} />
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
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.colors.text }]}>Plan</Text>
            <Text style={[styles.metaValue, { color: theme.colors.secondary }]}>{user.plan}</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={[styles.statsContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.bold }]}>
            {user.stats.workoutsCompleted}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Workouts</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.bold }]}>
            {user.stats.avgWorkoutTime}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Avg Time</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.bold }]}>
            {user.stats.streak}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Day Streak</Text>
        </View>
      </View>
      
      {/* Settings Sections */}
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.bold }]}>
            {section.title}
          </Text>
          
          <View style={[styles.sectionContent, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity 
                key={itemIndex}
                style={[
                  styles.settingItem,
                  itemIndex !== section.items.length - 1 && [styles.settingItemBorder, { borderBottomColor: theme.colors.border }]
                ]}
                onPress={() => item.type !== 'toggle' && router.push(item.screen)}
              >
                <View style={styles.settingLeft}>
                  <Ionicons name={item.icon} size={22} color={theme.colors.text} style={styles.settingIcon} />
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
      ))}

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.logoutButton, { borderColor: theme.colors.error }]}
        onPress={() => router.push('/')}
      >
        <Ionicons name="log-out-outline" size={20} color={theme.colors.error} style={styles.logoutIcon} />
        <Text style={[styles.logoutText, { color: theme.colors.error }]}>Log Out</Text>
      </TouchableOpacity>

      {/* Version */}
      <Text style={[styles.versionText, { color: theme.colors.text }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    marginBottom: 16,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  profileMeta: {
    flexDirection: 'row',
    alignItems: 'center',
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
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    marginBottom: 4,
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
  },
  sectionContent: {
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
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
