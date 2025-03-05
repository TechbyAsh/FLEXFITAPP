
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, you would handle API calls for registration here
      router.replace('/onboarding/goals');
    }
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
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary, fontFamily: theme.typography.fontFamily.regular }]}>
            Join FitElite to start your fitness journey
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              Full Name
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  borderColor: errors.name ? theme.colors.error : theme.colors.border,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.surface,
                }
              ]}
              placeholder="Your Name"
              placeholderTextColor={theme.colors.textSecondary}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            {errors.name && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.name}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  borderColor: errors.email ? theme.colors.error : theme.colors.border,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.surface,
                }
              ]}
              placeholder="your@email.com"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            {errors.email && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.email}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              Password
            </Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.passwordInput,
                  { 
                    color: theme.colors.text,
                    backgroundColor: theme.colors.surface,
                  }
                ]}
                placeholder="Create a password"
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={secureTextEntry}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              >
                <Ionicons
                  name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={24}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.password}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }]}>
              Confirm Password
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  borderColor: errors.confirmPassword ? theme.colors.error : theme.colors.border,
                  color: theme.colors.text,
                  backgroundColor: theme.colors.surface,
                }
              ]}
              placeholder="Confirm your password"
              placeholderTextColor={theme.colors.textSecondary}
              secureTextEntry={true}
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            />
            {errors.confirmPassword && <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.confirmPassword}</Text>}
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.secondary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.buttonText, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={[styles.link, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.medium }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    width: '100%',
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
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    marginRight: 4,
  },
  link: {
    fontSize: 14,
  },
});
