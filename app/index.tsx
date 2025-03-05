import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

export default function OnboardingScreen() {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(0);

  const onboardingData = [
    {
      title: "Welcome to FLEX",
      description: "Your personal fitness journey begins here.",
    },
    {
      title: "Personalized Workouts",
      description: "Get customized 6-week plans tailored to your goals.",
    },
    {
      title: "Nutrition & Mindset",
      description: "Complete guidance for both body and mind.",
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
    <ImageBackground 
      source={require('../assets/images/flex-logo-bg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
        style={styles.overlay}
      />
      <View style={styles.contentContainer}>
        <View style={styles.spacer} />
        
        <View style={styles.textContainer}>
          <LinearGradient
            colors={theme.colors.gradients.card}
            style={styles.glassBg}
          />
          
          <View style={styles.glassContent}>
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
                    { 
                      backgroundColor: currentPage === index 
                        ? theme.colors.secondary 
                        : 'rgba(255,255,255,0.2)' 
                    }
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
                  style={styles.button}
                  onPress={nextPage}
                >
                  <LinearGradient
                    colors={theme.colors.gradients.secondary}
                    style={styles.gradientButton}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={[styles.buttonText, { color: theme.colors.primary }]}>Next</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <Link href="/signup" asChild>
                  <TouchableOpacity style={styles.button}>
                    <LinearGradient
                      colors={theme.colors.gradients.secondary}
                      style={styles.gradientButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={[styles.buttonText, { color: theme.colors.primary }]}>Get Started</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Link>
              )}
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  spacer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 48,
    overflow: 'hidden',
    position: 'relative',
  },
  glassBg: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    opacity: 0.9,
  },
  glassContent: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    opacity: 0.9,
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
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  gradientButton: {
    width: '100%',
    height: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});