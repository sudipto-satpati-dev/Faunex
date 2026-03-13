import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = {
  background: '#061405',
  primary: '#0fe633',
  buttonYellow: '#FFBF00',
  textWhite: '#FFFFFF',
  textMuted: '#94a3b8',
  iconDark: 'rgba(255, 255, 255, 0.04)',
};

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navigate to onboarding
    router.push('/onboarding');
  };

  const handleSignIn = () => {
    // Navigate to sign in screen
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Background decorative icons */}
      <BackgroundIcons />

      {/* Main content */}
      <View style={[styles.content, { zIndex: 10 }]}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/monochrome-logo.png')}
            style={styles.logoImage}
            contentFit="contain"
          />
          {/* Tagline */}
          <Text style={styles.tagline}>Discover Every Animal on Earth.</Text>
        </View>
      </View>

      {/* Bottom buttons */}
      <View style={[styles.bottomContainer, { zIndex: 10 }]}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        <Pressable onPress={handleSignIn} style={styles.signInContainer}>
          <Text style={styles.signInText}>I already have an account</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Background decorative icons
function BackgroundIcons() {
  const silhouettes = [
    { 
      icon: 'panda' as const,
      x: -5, 
      y: height * 0.05, 
      rotation: 0, 
      size: 180,
    },
    { 
      icon: 'rabbit' as const,
      x: width - 160, 
      y: height * 0.25, 
      rotation: -12, 
      size: 180,
    },
    { 
      icon: 'snake' as const,
      x: -40, 
      y: height * 0.55, 
      rotation: 45, 
      size: 180,
    },
  ];

  return (
    <View style={[StyleSheet.absoluteFill, { zIndex: 1 }]}>
      {silhouettes.map((item, index) => (
        <View
          key={index}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            transform: [{ rotate: `${item.rotation}deg` }],
          }}
        >
          <MaterialCommunityIcons 
            name={item.icon} 
            size={item.size} 
            color="white" 
            style={{ opacity: 0.04 }}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.textWhite,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.textMuted,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  bottomContainer: {
    paddingHorizontal: 40,
    paddingBottom: 50,
    alignItems: 'center',
  },
  getStartedButton: {
    width: '100%',
    backgroundColor: COLORS.buttonYellow,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  signInContainer: {
    paddingVertical: 10,
  },
  signInText: {
    fontSize: 14,
    color: COLORS.textMuted,
    letterSpacing: 0.3,
  },
  bgIcon: {
    position: 'absolute',
  },
});
