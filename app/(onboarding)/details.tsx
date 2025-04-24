
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function DetailsScreen() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    activityLevel: 'moderate',
    experienceLevel: 'beginner',
  });
  
  const activityLevels = [
    { label: 'Sedentary (little or no exercise)', value: 'sedentary' },
    { label: 'Lightly active (light exercise 1-3 days/week)', value: 'light' },
    { label: 'Moderately active (moderate exercise 3-5 days/week)', value: 'moderate' },
    { label: 'Very active (hard exercise 6-7 days/week)', value: 'active' },
    { label: 'Extra active (very hard exercise & physical job)', value: 'extra' },
  ];
  
  const experienceLevels = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];

  const handleNext = () => {
    // In a real app, you would validate and store this data
    router.push('/(auth)/signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.bold }]}>
            Your Details
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.regular }]}>
            Help us create your personalized fitness plan
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
                Age
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                    backgroundColor: theme.colors.surface,
                  }
                ]}
                placeholder="Years"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="numeric"
                value={formData.age}
                onChangeText={(text) => setFormData({ ...formData, age: text })}
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
                Weight
              </Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    borderColor: theme.colors.border,
                    color: theme.colors.text,
                    backgroundColor: theme.colors.surface,
                  }
                ]}
                placeholder="kg"
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType="numeric"
                value={formData.weight}
                onChangeText={(text) => setFormData({ ...formData, weight: text })}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              Height
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.surface,
                }
              ]}
              placeholder="cm"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={formData.height}
              onChangeText={(text) => setFormData({ ...formData, height: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              Activity Level
            </Text>
            <View style={[styles.pickerContainer, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              <Picker
                selectedValue={formData.activityLevel}
                onValueChange={(itemValue) => setFormData({ ...formData, activityLevel: itemValue })}
                style={{ color: theme.colors.text }}
                dropdownIconColor={theme.colors.text}
              >
                {activityLevels.map((level) => (
                  <Picker.Item 
                    key={level.value} 
                    label={level.label} 
                    value={level.value} 
                    color={theme.colors.text}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              Fitness Experience
            </Text>
            <View style={styles.experienceContainer}>
              {experienceLevels.map((level) => (
                <TouchableOpacity
                  key={level.value}
                  style={[
                    styles.experienceItem,
                    { 
                      backgroundColor: formData.experienceLevel === level.value 
                        ? theme.colors.secondary 
                        : theme.colors.surface,
                      borderColor: theme.colors.border,
                    }
                  ]}
                  onPress={() => setFormData({ ...formData, experienceLevel: level.value })}
                >
                  <Text 
                    style={{ 
                      color: formData.experienceLevel === level.value 
                        ? theme.colors.primary 
                        : theme.colors.text,
                      fontFamily: theme.typography.fontFamily.medium
                    }}
                  >
                    {level.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.secondary }]}
            onPress={handleNext}
          >
            <Text style={[styles.buttonText, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
              Complete Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  experienceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  experienceItem: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});
