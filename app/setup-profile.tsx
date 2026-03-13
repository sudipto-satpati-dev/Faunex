import { COLORS } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SetupProfileScreen() {
  const router = useRouter();

  const handleLetsGo = () => {
    // Navigate to main app
    router.push('/(tabs)');
  };

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background decorative icons */}
      <BackgroundIcons />

      {/* Logo in top right */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/solo-logo.png')}
          style={styles.logo}
          contentFit="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Name Logo */}
        <View style={styles.iconContainer}>
          <Image
            source={require('@/assets/images/name-logo.png')}
            style={styles.nameLogo}
            contentFit="contain"
          />
        </View>

        {/* Welcome Text */}
        <Text style={styles.welcomeText}>Welcome, John</Text>

        {/* Description */}
        <Text style={styles.description}>
          Let's set up your Animadex profile before you start exploring.
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Let's Go Button */}
        <TouchableOpacity
          style={styles.letsGoButton}
          onPress={handleLetsGo}
          activeOpacity={0.9}
        >
          <Text style={styles.letsGoButtonText}>Let's Go</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

// Background decorative icons
function BackgroundIcons() {
  const silhouettes = [
    { 
      icon: 'panda' as const,
      x: -30, 
      y: 80, 
      rotation: 24, 
      size: 180,
    },
    { 
      icon: 'rabbit' as const,
      x: 240, 
      y: 200, 
      rotation: -12, 
      size: 180,
    },
    { 
      icon: 'snake' as const,
      x: -40, 
      y: 450, 
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
  logoContainer: {
    position: 'absolute',
    top: 40,
    right: 24,
    zIndex: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    zIndex: 10,
  },
  iconContainer: {
    marginBottom: 0,
  },
  nameLogo: {
    width: 340,
    height: 340,
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 320,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 50,
    zIndex: 10,
  },
  letsGoButton: {
    width: '100%',
    backgroundColor: COLORS.accent,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  letsGoButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.background,
  },
});
