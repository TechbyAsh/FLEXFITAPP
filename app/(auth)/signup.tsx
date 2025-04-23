
import { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {registerUser} from '../../services/authService'
import {AuthContext} from '../../context/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Backendless from 'backendless';

export default function SignupScreen() {
  const theme = useTheme();
  const {register} = useContext(AuthContext) || {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSignup = async () => {
    console.log('Sign Up button pressed');
    setLoading(true);
    setErrorMessage('');
  
    try {
      console.log("Calling register function...");
      // Call the updated registerUser function with all necessary parameters
      const user = await registerUser(email, password, name, true); // Ensure 'hasCompletedOnboarding' is true
      console.log("✅ Registered user:", user);
  
      // Store the updated user in AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("userId", user.objectId);
  
      console.log("✅ Saved user and userId to AsyncStorage");
  
      // Navigate to home screen
      console.log("✅ Navigating to home...");
      router.replace("/(tabs)");
  
    } catch (error) {
      console.error("❌ Signup error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient 
      colors={['#000000', '#121212']} 
      style={styles.container}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.bold }]}>
              Create Account
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.regular }]}>
              Join FLEX and start your fitness journey today
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Full Name</Text>
              <View style={[styles.inputWrapper, { borderColor: theme.colors.border, backgroundColor: theme.colors.card }]}>
                <Ionicons name="person-outline" size={20} color={theme.colors.text} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  placeholder="Your name"
                  placeholderTextColor="#666"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Email</Text>
              <View style={[styles.inputWrapper, { borderColor: theme.colors.border, backgroundColor: theme.colors.card }]}>
                <Ionicons name="mail-outline" size={20} color={theme.colors.text} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  placeholder="Your email"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Password</Text>
              <View style={[styles.inputWrapper, { borderColor: theme.colors.border, backgroundColor: theme.colors.card }]}>
                <Ionicons name="lock-closed-outline" size={20} color={theme.colors.text} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: theme.colors.text }]}
                  placeholder="Your password"
                  placeholderTextColor="#666"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={theme.colors.text} 
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.passwordHint, { color: theme.colors.text }]}>
                Password must be at least 8 characters
              </Text>
            </View>

            {/* Signup Button */}
            <TouchableOpacity 
              style={[styles.signupButton, { backgroundColor: theme.colors.secondary }]}
              onPress={handleSignup}
            >
              <Text style={[styles.signupButtonText, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* Or divider */}
            <View style={styles.dividerContainer}>
              <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
              <Text style={[styles.dividerText, { color: theme.colors.text }]}>or</Text>
              <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={[styles.socialButton, { borderColor: theme.colors.border }]}>
                <Ionicons name="logo-google" size={20} color={theme.colors.text} />
                <Text style={[styles.socialButtonText, { color: theme.colors.text }]}>Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.socialButton, { borderColor: theme.colors.border }]}>
                <Ionicons name="logo-apple" size={20} color={theme.colors.text} />
                <Text style={[styles.socialButtonText, { color: theme.colors.text }]}>Apple</Text>
              </TouchableOpacity>
            </View>
            
            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: theme.colors.text }]}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={[styles.loginLink, { color: theme.colors.secondary }]}>
                  {" Login"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Terms */}
            <Text style={[styles.terms, { color: theme.colors.text }]}>
              By signing up, you agree to our{" "}
              <Text style={{ color: theme.colors.secondary }}>Terms & Conditions</Text>
              {" "}and{" "}
              <Text style={{ color: theme.colors.secondary }}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  ); }


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 40,
    paddingBottom: 24,
  },
  headerContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  passwordToggle: {
    padding: 8,
  },
  passwordHint: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  signupButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  signupButtonText: {
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 24,
    flex: 0.48,
  },
  socialButtonText: {
    fontSize: 14,
    marginLeft: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  terms: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    opacity: 0.7,
  },
});
