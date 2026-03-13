import { COLORS } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as Location from 'expo-location';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function EnableLocationScreen() {
  const router = useRouter();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleClose = () => {
    // Navigate to all set screen
    router.push('/all-set');
  };

  const handleAllowLocation = async () => {
    try {
      setIsRequesting(true);
      
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        // Permission granted, navigate to all set screen
        router.push('/all-set');
      } else {
        // Permission denied
        Alert.alert(
          'Location Permission',
          'Location access helps build your discovery map. You can enable it later in your device settings.',
          [
            { text: 'OK', style: 'default' }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      Alert.alert('Error', 'Failed to request location permission. Please try again.');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkip = () => {
    // Skip location permission and navigate to all set screen
    router.push('/all-set');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Background watermark */}
        <View style={styles.watermarkContainer}>
          <MaterialCommunityIcons
            name="paw"
            size={640}
            color="white"
            style={styles.watermark}
          />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={28} color={COLORS.white} />
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
          {/* Location Pin Icon */}

          {/* Text Content */}
          <View style={styles.textContent}>
            <Text style={styles.title}>Know Where You Discovered It</Text>
            <Text style={styles.subtitle}>
              We'll log where you spotted each animal to build your discovery map.
            </Text>
          </View>

          {/* Map Preview */}
          <View style={styles.mapContainer}>
            <Image
              source={require('@/assets/images/map.png')}
              style={styles.mapImage}
              contentFit="cover"
            />
            <View style={styles.mapOverlay} />
            
            {/* Decorative map pins */}
            <View style={styles.mapPin1}>
              <MaterialCommunityIcons
                name="map-marker"
                size={32}
                color={COLORS.accent}
              />
            </View>
            <View style={styles.mapPin2}>
              <MaterialCommunityIcons
                name="map-marker"
                size={32}
                color={COLORS.primary}
                style={{ opacity: 0.6 }}
              />
            </View>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.allowButton, isRequesting && styles.allowButtonDisabled]}
            onPress={handleAllowLocation}
            activeOpacity={0.9}
            disabled={isRequesting}
          >
            <Text style={styles.allowButtonText}>
              {isRequesting ? 'Requesting...' : 'Allow Location'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonText}>Skip for Now</Text>
          </TouchableOpacity>
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
  watermarkContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  watermark: {
    opacity: 0.03,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
    zIndex: 10,
  },
  closeButton: {
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
  iconContainer: {
    marginBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: 'rgba(255, 191, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 191, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContent: {
    maxWidth: 400,
    alignItems: 'center',
    marginBottom: 48,
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
  mapContainer: {
    width: 320,
    height: 320,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 191, 0, 0.2)',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16, 34, 19, 0.4)',
  },
  mapPin1: {
    position: 'absolute',
    top: '25%',
    left: '33%',
  },
  mapPin2: {
    position: 'absolute',
    bottom: '33%',
    right: '25%',
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
  skipButton: {
    width: '100%',
    paddingVertical: 18,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
});
