import { COLORS } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function EnableCameraScreen() {
  const router = useRouter();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleAllowCamera = async () => {
    try {
      setIsRequesting(true);
      
      // Request camera permission
      const { status } = await Camera.requestCameraPermissionsAsync();
      
      if (status === 'granted') {
        // Permission granted, navigate to main app
        router.push('/(tabs)');
      } else {
        // Permission denied
        Alert.alert(
          'Camera Permission Required',
          'Camera access is needed to scan and identify animals. You can enable it later in your device settings.',
          [
            { text: 'OK', style: 'default' }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      Alert.alert('Error', 'Failed to request camera permission. Please try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleMaybeLater = () => {
    // Skip camera permission and navigate to main app
    router.push('/(tabs)');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Background decorative icons */}
        <View style={styles.watermarkContainer}>
          <MaterialCommunityIcons
            name="paw"
            size={200}
            color="white"
            style={[styles.watermark, { top: 40, left: -40, transform: [{ rotate: '12deg' }] }]}
          />
          <MaterialCommunityIcons
            name="leaf"
            size={240}
            color="white"
            style={[styles.watermark, { bottom: 80, right: -60, transform: [{ rotate: '-12deg' }] }]}
          />
          <MaterialCommunityIcons
            name="bird"
            size={160}
            color="white"
            style={[styles.watermark, { top: '50%', left: '25%', opacity: 0.02 }]}
          />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <Image
            source={require('@/assets/images/solo-logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Camera Icon with Animation */}
          <View style={styles.cameraContainer}>
            {/* Outer circle */}
            <View style={styles.outerCircle}>
              {/* Inner circle */}
              <View style={styles.innerCircle}>
                <MaterialCommunityIcons
                  name="camera"
                  size={80}
                  color={COLORS.accent}
                />
              </View>
            </View>
          </View>

          {/* Text Content */}
          <View style={styles.textContent}>
            <Text style={styles.title}>Power Up Your Faunex</Text>
            <Text style={styles.subtitle}>
              Allow camera access to scan and identify animals in the wild. Start your journey as a wildlife explorer.
            </Text>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.allowButton, isRequesting && styles.allowButtonDisabled]}
            onPress={handleAllowCamera}
            activeOpacity={0.9}
            disabled={isRequesting}
          >
            <Text style={styles.allowButtonText}>
              {isRequesting ? 'Requesting...' : 'Allow Camera Access'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.laterButton}
            onPress={handleMaybeLater}
            activeOpacity={0.8}
          >
            <Text style={styles.laterButtonText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom gradient */}
        <View style={styles.bottomGradient} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  watermarkContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  watermark: {
    position: 'absolute',
    opacity: 0.03,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  cameraContainer: {
    marginBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: 192,
    height: 192,
    borderRadius: 96,
    borderWidth: 2,
    borderColor: 'rgba(255, 191, 0, 0.3)',
    backgroundColor: 'rgba(16, 34, 19, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: 'rgba(255, 191, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 191, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 28,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 24,
    zIndex: 10,
    gap: 16,
  },
  allowButton: {
    width: '100%',
    backgroundColor: COLORS.accent,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  allowButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  allowButtonDisabled: {
    opacity: 0.6,
  },
  laterButton: {
    width: '100%',
    paddingVertical: 18,
    alignItems: 'center',
  },
  laterButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 128,
    backgroundColor: 'transparent',
    opacity: 0.5,
  },
});
