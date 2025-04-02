import { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {AuthContext} from '../context/authContext'

export default function LoginScreen() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {login} = useContext(AuthContext) || {};
  
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    
    if (!login) {
      console.error("Login function is undefined!");
      setErrorMessage('Authentication system error. Please try again later.');
      return;
    }
  
    setLoading(true);
    setErrorMessage('');
  
    try {
      console.log("Calling login function...");
      const result = await login(email, password); // Call the login function and store result
      console.log("Login result:", result);
      console.log("User logged in, navigating to home...");
      
      // Try alternative navigation methods if the first doesn't work
      try {
        console.log("Attempting navigation with router.replace...");
        router.replace('/(tabs)');
      } catch (navError) {
        console.error("Navigation error with replace:", navError);
        try {
          console.log("Trying router.push instead...");
          router.push('/(tabs)');
        } catch (pushError) {
          console.error("Navigation error with push:", pushError);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message || 'Login failed. Please try again.');
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
              Welcome Back
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.regular }]}>
              Log in to continue your fitness journey
            </Text>
          </View>

          <View style={styles.formContainer}>
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
            </View>
           
    

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: theme.colors.secondary }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

        {/* Show Error Message Here */}
        {errorMessage ? (
        <Text style={[styles.errorText, { color: 'red', marginBottom: 10 }]}>
           {errorMessage}
           </Text>
            ) : null}


            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, { backgroundColor: theme.colors.secondary }]}
              onPress={handleLogin}
            >
              <Text style={[styles.loginButtonText, { color: theme.colors.primary, fontFamily: theme.typography.fontFamily.bold }]}>
                Log In
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

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={[styles.signupText, { color: theme.colors.text }]}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push('/signup')}>
                <Text style={[styles.signupLink, { color: theme.colors.secondary }]}>
                  {" Sign Up"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  loginButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'red',
    marginBottom: 10,
  },
});
