import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Line, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const COLORS = {
  background: '#0d1f15',
  primary: '#0fe633',
  textWhite: '#FFFFFF',
  textMuted: '#8A9E8C',
  iconDark: 'rgba(15, 230, 51, 0.15)',
  loadingBarBg: 'rgba(15, 230, 51, 0.2)',
  cornerOpacity: 'rgba(15, 230, 51, 0.3)',
};

export default function SplashScreen() {
  const router = useRouter();
  const loadingAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // Loading bar animation
    Animated.timing(loadingAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Pulsing dot animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Check if user is new and navigate accordingly
    // const checkFirstTime = async () => {
    //   try {
    //     const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
        
    //     setTimeout(() => {
    //       if (hasSeenWelcome === null) {
    //         // First time user - go to welcome screen
    //         router.replace('/welcome');
    //       } else {
    //         // Returning user - go to main app
    //         router.replace('/(tabs)');
    //       }
    //     }, 2500);
    //   } catch (error) {
    //     // On error, default to tabs
    //     setTimeout(() => {
    //       router.replace('/(tabs)');
    //     }, 2500);
    //   }
    // };

    // checkFirstTime();

    // Temporary: Always go to welcome screen for testing
    setTimeout(() => {
      router.replace('/welcome');
    }, 2500);
  }, []);

  const loadingScale = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {/* Background decorative icons */}
      <BackgroundIcons />

      {/* Camera lens corners */}
      <CameraCorners />

      {/* Main logo container */}
      <View style={styles.logoContainer}>
        {/* Logo Image */}
        <Image
          source={require('@/assets/images/name-logo.png')}
          style={styles.logoImage}
          contentFit="contain"
        />

        {/* Loading bar */}
        <View style={styles.loadingBarContainer}>
          <Animated.View
            style={[
              styles.loadingBarFill,
              {
                transform: [{ scaleX: loadingScale }],
              },
            ]}
          />
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>EVERY ANIMAL. IDENTIFIED.</Text>
      </View>

      {/* Bottom status indicator */}
      <View style={styles.statusContainer}>
        <Animated.View
          style={[
            styles.statusDot,
            {
              opacity: pulseAnim,
            },
          ]}
        />
        <Text style={styles.statusText}>SYSTEM INITIALIZING</Text>
      </View>
    </View>
  );
}

// Camera lens corners component
function CameraCorners() {
  const cornerSize = 40;
  const offset = 20;
  const strokeWidth = 2;

  return (
    <>
      {/* Top left */}
      <Svg
        width={cornerSize}
        height={cornerSize}
        style={[styles.corner, { top: offset, left: offset }]}
      >
        <Line
          x1="0"
          y1={strokeWidth / 2}
          x2={cornerSize}
          y2={strokeWidth / 2}
          stroke={COLORS.cornerOpacity}
          strokeWidth={strokeWidth}
        />
        <Line
          x1={strokeWidth / 2}
          y1="0"
          x2={strokeWidth / 2}
          y2={cornerSize}
          stroke={COLORS.cornerOpacity}
          strokeWidth={strokeWidth}
        />
      </Svg>

      {/* Top right */}
      <Svg
        width={cornerSize}
        height={cornerSize}
        style={[styles.corner, { top: offset, right: offset }]}
      >
        <Line
          x1="0"
          y1={strokeWidth / 2}
          x2={cornerSize}
          y2={strokeWidth / 2}
          stroke={COLORS.cornerOpacity}
          strokeWidth={strokeWidth}
        />
        <Line
          x1={cornerSize - strokeWidth / 2}
          y1="0"
          x2={cornerSize - strokeWidth / 2}
          y2={cornerSize}
          stroke={COLORS.cornerOpacity}
          strokeWidth={strokeWidth}
        />
      </Svg>

      {/* Bottom left */}
      <Svg
        width={cornerSize}
        height={cornerSize}
        style={[styles.corner, { bottom: offset, left: offset }]}
      >
        <Line
          x1="0"
          y1={cornerSize - strokeWidth / 2}
          x2={cornerSize}
          y2={cornerSize - strokeWidth / 2}
          stroke={COLORS.cornerOpacity}
          strokeWidth={strokeWidth}
        />
        <Line
          x1={strokeWidth / 2}
          y1="0"
          x2={strokeWidth / 2}
          y2={cornerSize}
          stroke={COLORS.cornerOpacity}
          strokeWidth={strokeWidth}
        />
      </Svg>

      {/* Bottom right */}
      <Svg
        width={cornerSize}
        height={cornerSize}
        style={[styles.corner, { bottom: offset, right: offset }]}
      >
        <Line
          x1="0"
          y1={cornerSize - strokeWidth / 2}
          x2={cornerSize}
          y2={cornerSize - strokeWidth / 2}
          stroke={COLORS.cornerOpacity}
          strokeWidth={strokeWidth}
        />
        <Line
          x1={cornerSize - strokeWidth / 2}
          y1="0"
          x2={cornerSize - strokeWidth / 2}
          y2={cornerSize}
          stroke={COLORS.cornerOpacity}
          strokeWidth={strokeWidth}
        />
      </Svg>
    </>
  );
}

// Background decorative icons
function BackgroundIcons() {
  const icons = [
    { type: 'paw', x: 0.12, y: 0.22, rotation: -15, scale: 1 },
    { type: 'leaf', x: 0.75, y: 0.15, rotation: 25, scale: 0.8 },
    { type: 'paw', x: 0.15, y: 0.55, rotation: 20, scale: 0.7 },
    { type: 'grass', x: 0.6, y: 0.35, rotation: 0, scale: 0.9 },
    { type: 'leaf', x: 0.25, y: 0.75, rotation: -30, scale: 1.1 },
    { type: 'paw', x: 0.8, y: 0.65, rotation: 45, scale: 0.8 },
    { type: 'grass', x: 0.15, y: 0.88, rotation: 15, scale: 0.7 },
    { type: 'leaf', x: 0.85, y: 0.82, rotation: -20, scale: 0.9 },
  ];

  return (
    <View style={StyleSheet.absoluteFill}>
      {icons.map((icon, index) => (
        <View
          key={index}
          style={[
            styles.bgIcon,
            {
              left: icon.x * width,
              top: icon.y * height,
              transform: [
                { rotate: `${icon.rotation}deg` },
                { scale: icon.scale },
              ],
            },
          ]}
        >
          {icon.type === 'paw' && <BgPaw />}
          {icon.type === 'leaf' && <BgLeaf />}
          {icon.type === 'grass' && <BgGrass />}
        </View>
      ))}
    </View>
  );
}

function BgPaw() {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50">
      <G fill={COLORS.iconDark}>
        {/* Main pad */}
        <Path d="M 25 35 C 21 35 17 31 17 26 C 17 21 21 17 25 17 C 29 17 33 21 33 26 C 33 31 29 35 25 35 Z" />
        {/* Toes */}
        <Circle cx="17" cy="14" r="4" />
        <Circle cx="25" cy="11" r="4" />
        <Circle cx="33" cy="14" r="4" />
        <Circle cx="19" cy="21" r="3.5" />
      </G>
    </Svg>
  );
}

function BgLeaf() {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50">
      <G fill={COLORS.iconDark}>
        {/* Leaf shape */}
        <Path d="M 15 40 Q 15 15 40 15 Q 35 25 30 30 Q 25 35 20 38 Q 17 40 15 40 Z" />
        {/* Leaf vein */}
        <Path
          d="M 18 37 Q 22 30 28 24 Q 32 20 37 17"
          stroke={COLORS.iconDark}
          strokeWidth="1.5"
          fill="none"
        />
      </G>
    </Svg>
  );
}

function BgGrass() {
  return (
    <Svg width="50" height="50" viewBox="0 0 50 50">
      <G fill={COLORS.iconDark}>
        {/* Grass blades */}
        <Path d="M 20 40 Q 18 30 15 20 Q 14 15 15 10 Q 16 15 17 20 Q 20 30 22 40 Z" />
        <Path d="M 25 40 Q 25 28 25 18 Q 25 12 26 8 Q 26 12 26 18 Q 26 28 25 40 Z" />
        <Path d="M 30 40 Q 32 30 35 20 Q 36 15 35 10 Q 34 15 33 20 Q 30 30 28 40 Z" />
      </G>
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    width: width * 0.85,
  },
  logoImage: {
    width: '100%',
    height: 100,
    marginBottom: 30,
  },
  loadingBarContainer: {
    width: '60%',
    height: 3,
    backgroundColor: COLORS.loadingBarBg,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBarFill: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  tagline: {
    fontSize: 11,
    color: COLORS.textMuted,
    letterSpacing: 3,
    fontWeight: '600',
  },
  corner: {
    position: 'absolute',
  },
  bgIcon: {
    position: 'absolute',
  },
  statusContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  statusText: {
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 2,
    fontWeight: '600',
  },
});
