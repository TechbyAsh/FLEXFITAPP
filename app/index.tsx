import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function OnboardingScreen() {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);

  const onboardingData = [
    {
      title: "Welcome to FitElite",
      description: "Your personal fitness journey begins here.",
      // image: require('../assets/images/onboarding-1.png')
    },
    {
      title: "Personalized Workouts",
      description: "Get customized 6-week plans tailored to your goals.",
      // image: require('../assets/images/onboarding-2.png')
    },
    {
      title: "Nutrition & Mindset",
      description: "Complete guidance for both body and mind.",
      // image: require('../assets/images/onboarding-3.png')
    }
  ];

  const nextPage = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <LinearGradient 
      colors={['#000000', '#121212']} 
      style={styles.container}
    >
      <StatusBar style="light" />

      <View style={styles.imageContainer}>
        {/*  Image component removed */}
        <View style={{backgroundColor: theme.colors.secondary, width: '100%', height: 300, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: theme.colors.primary, fontSize: 24}}>Placeholder Image</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: theme.colors.secondary, fontFamily: theme.typography.fontFamily.bold }]}>
          {onboardingData[currentPage].title}
        </Text>

        <Text style={[styles.description, { color: theme.colors.text, fontFamily: theme.typography.fontFamily.regular }]}>
          {onboardingData[currentPage].description}
        </Text>

        <View style={styles.indicatorContainer}>
          {onboardingData.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.indicator, 
                { backgroundColor: currentPage === index ? theme.colors.secondary : theme.colors.border }
              ]} 
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {currentPage > 0 ? (
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]} 
              onPress={prevPage}
            >
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Previous</Text>
            </TouchableOpacity>
          ) : <View style={{ flex: 1 }} />}

          {currentPage < onboardingData.length - 1 ? (
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton, { backgroundColor: theme.colors.secondary }]} 
              onPress={nextPage}
            >
              <Text style={[styles.buttonText, { color: theme.colors.primary }]}>Next</Text>
            </TouchableOpacity>
          ) : (
            <Link href="/signup" asChild>
              <TouchableOpacity 
                style={[styles.button, styles.primaryButton, { backgroundColor: theme.colors.secondary }]}
              >
                <Text style={[styles.buttonText, { color: theme.colors.primary }]}>Get Started</Text>
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 300,
  },
  contentContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  primaryButton: {
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});