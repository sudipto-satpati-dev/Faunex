import { COLORS } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AllSetScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Logo fade in and scale up
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStartExploring = () => {
    router.push('/(tabs)');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Header with logo */}
        <View style={styles.header}>
          <View style={{ flex: 1 }} />
          <Image
            source={require('@/assets/images/solo-logo.png')}
            style={styles.headerLogo}
            contentFit="contain"
          />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Logo */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Image
              source={require('@/assets/images/name-logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
          </Animated.View>

          {/* Text Content */}
          <Animated.View
            style={[
              styles.textContent,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.title}>Your Faunex is Ready.</Text>
            <Text style={styles.subtitle}>
              Go explore. The wild is waiting.
            </Text>
          </Animated.View>
        </View>

        {/* Bottom Button */}
        <Animated.View
          style={[
            styles.bottomSection,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={handleStartExploring}
            activeOpacity={0.9}
          >
            <Text style={styles.exploreButtonText}>Start Exploring</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Decorative elements */}
        <View style={styles.decorativeElements}>
          <MaterialCommunityIcons
            name="paw"
            size={120}
            color="white"
            style={[styles.decorativePaw, { top: 100, left: 30, opacity: 0.03 }]}
          />
          <MaterialCommunityIcons
            name="leaf"
            size={100}
            color="white"
            style={[styles.decorativePaw, { bottom: 150, right: 40, opacity: 0.03 }]}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerLogo: {
    width: 50,
    height: 50,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    position: 'relative',
  },
  logo: {
    width: 280,
    height: 280,
  },
  textContent: {
    alignItems: 'center',
    maxWidth: 400,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 48,
  },
  subtitle: {
    fontSize: 20,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 30,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  exploreButton: {
    width: '100%',
    backgroundColor: COLORS.accent,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  exploreButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  decorativeElements: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  decorativePaw: {
    position: 'absolute',
  },
});
