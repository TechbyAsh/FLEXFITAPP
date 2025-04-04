import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Spacer} from '../components/spacer'

export default function AnalyticsScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('progress');
  const [journalEntry, setJournalEntry] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [journalEntries, setJournalEntries] = useState([
    {
      date: new Date(),
      text: 'Started my fitness journey today! 💪',
      photos: []
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    deadline: '',
  });
  const [goals, setGoals] = useState([
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
  ]);

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.deadline) {
      setGoals([
        ...goals,
        {
          id: Date.now(),
          title: newGoal.title,
          target: newGoal.target,
          progress: 0,
          deadline: newGoal.deadline
        }
      ]);
      setNewGoal({ title: '', target: '', deadline: '' });
      setShowGoalForm(false);
    }
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const handleUpdateProgress = (goalId) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newProgress = Math.min(100, goal.progress + 10);
        return { ...goal, progress: newProgress };
      }
      return goal;
    }));
  };

  const progressData = {
    monthlyWorkouts: 12,
    totalMinutes: 360,
    averageIntensity: 7.5,
    completedGoals: 2,
  };

  const stats = [
    { label: "Workouts", value: "15", icon: "barbell" },
    { label: "Calories", value: "12,500", icon: "flame" },
    { label: "Streak", value: "7 days", icon: "trending-up" },
  ];

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
          {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCardWrapper}>
            <View style={styles.prostatCard}>
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

    <View>
      { /* Add Charts */}
    </View>

    <View>
      { /* Add Charts */}
    </View>
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
             <TouchableOpacity onPress={() => handleUpdateProgress(goal.id)}>
               <Text>Update Progress</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => handleDeleteGoal(goal.id)}>
               <Text>Delete Goal</Text>
             </TouchableOpacity>
           </View>
         ))}
         {!showGoalForm && (
             <TouchableOpacity 
             style={styles.createGoalButton}
             onPress={() => setShowGoalForm(true)}
           >
             <LinearGradient
               colors={theme.colors.gradients.secondary}
               style={styles.createGoalGradient}
             >
               <Ionicons name="add-circle-outline" size={24} color={theme.colors.primary} />
               <Text style={[styles.createGoalText, { color: theme.colors.primary }]}>
                 Create New Goal
               </Text>
             </LinearGradient>
           </TouchableOpacity>
         )}
         {showGoalForm && (
           <View style={styles.goalFormContainer}>
             <TextInput
               style={[styles.goalInput, { 
                 backgroundColor: 'rgba(255,255,255,0.05)',
                 borderColor: theme.colors.border,
                 color: theme.colors.text
               }]}
               placeholder="Goal Title"
               placeholderTextColor="rgba(255,255,255,0.5)"
               value={newGoal.title}
               onChangeText={(text) => setNewGoal({ ...newGoal, title: text })}
             />
             <TextInput
               style={[styles.goalInput, { 
                 backgroundColor: 'rgba(255,255,255,0.05)',
                 borderColor: theme.colors.border,
                 color: theme.colors.text
               }]}
               placeholder="Goal Target"
               placeholderTextColor="rgba(255,255,255,0.5)"
               value={newGoal.target}
               onChangeText={(text) => setNewGoal({ ...newGoal, target: text })}
             />
             <TextInput
               style={[styles.goalInput, { 
                 backgroundColor: 'rgba(255,255,255,0.05)',
                 borderColor: theme.colors.border,
                 color: theme.colors.text
               }]}
               placeholder="Deadline (YYYY-MM-DD)"
               placeholderTextColor="rgba(255,255,255,0.5)"
               value={newGoal.deadline}
               onChangeText={(text) => setNewGoal({ ...newGoal, deadline: text })}
             />
             <View style={styles.goalFormButtons}>
               <TouchableOpacity 
                 style={[styles.goalFormButton, { backgroundColor: theme.colors.card }]}
                 onPress={() => setShowGoalForm(false)}
               >
                 <Text style={[styles.goalFormButtonText, { color: theme.colors.text }]}>Cancel</Text>
               </TouchableOpacity>
               <TouchableOpacity 
                 style={[styles.goalFormButton, { backgroundColor: theme.colors.secondary }]}
                 onPress={handleCreateGoal}
               >
                 <Text style={[styles.goalFormButtonText, { color: theme.colors.primary }]}>Create Goal</Text>
               </TouchableOpacity>
             </View>
           </View>
         )}
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
            style={styles.imageUploadButton}
            onPress={async () => {
              try {
                const result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ['images', 'livePhotos'],
                  allowsEditing: true,
                  aspect: [4, 3],
                  quality: 0.8,
                  allowsMultipleSelection: true,
                });

                if (!result.canceled && result.assets) {
                  const newPhotos = result.assets.map(asset => asset.uri);
                  setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
                }
              } catch (error) {
                console.log('Error picking image:', error);
              }
            }}
          >
            <LinearGradient
              colors={theme.colors.gradients.card}
              style={styles.imageButtonGradient}
            >
              <Ionicons name="camera" size={24} color={theme.colors.text} />
              <Text style={[styles.imageButtonText, { color: theme.colors.text }]}>
                Add Progress Photo
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {photos.length > 0 && (
            <View style={styles.photoGrid}>
              {photos.map((photo, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.photoContainer}
                  onPress={() => {
                    // Remove photo when tapped
                    setPhotos(prevPhotos => 
                      prevPhotos.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <Image 
                    source={{ uri: photo }} 
                    style={styles.photo} 
                  />
                  <View style={styles.removePhotoButton}>
                    <Ionicons name="close-circle" size={24} color={theme.colors.error} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {
              // Handle save with photos
              if (journalEntry.trim() || photos.length > 0) {
                setJournalEntries([
                  {
                    date: new Date(),
                    text: journalEntry,
                    photos: [...photos]
                  },
                  ...journalEntries
                ]);
                setJournalEntry('');
                setPhotos([]);
              }
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
              
             {/* Display existing journal entries */}
             <View style={styles.historyContainer}>
             <ScrollView style={styles.entriesContainer}>
            {journalEntries.map((entry, index) => (
              <View key={index} style={styles.journalCard}>
                <LinearGradient
                  colors={theme.colors.gradients.card}
                  style={styles.cardGradient}
                />
                <Text style={[styles.entryDate, { color: theme.colors.text }]}>
                  {new Date(entry.date).toLocaleDateString()}
                </Text>
                <Text style={[styles.entryText, { color: theme.colors.text }]}>
                  {entry.text}
                </Text>
                {entry.photos && entry.photos.length > 0 && (
                  <View style={styles.entryPhotoGrid}>
                    {entry.photos.map((photo, photoIndex) => (
                      <Image 
                        key={photoIndex}
                        source={{ uri: photo }}
                        style={styles.entryPhoto}
                      />
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
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
  prostatCard: {
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
  goalFormContainer: {
    backgroundColor: 'rgba(22,27,34,0.9)',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  goalInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  goalFormButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  goalFormButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },

  goalFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  createGoalButton: {
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  createGoalGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  
  createGoalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  photoContainer: {
    width: (Dimensions.get('window').width - 56) / 3,
    height: (Dimensions.get('window').width - 56) / 3,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
  },
  imageUploadButton: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  imageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  entriesContainer: {
    marginBottom: 16,
  },
  journalCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  entryDate: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.8,
  },
  entryText: {
    fontSize: 16,
    marginBottom: 12,
  },
  entryPhotoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  entryPhoto: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});
