import { COLORS } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: '1',
    image: require('@/assets/images/onboardingImg1.png'),
    icon: 'crosshairs-gps',
    title: 'Point. Scan. Identify.',
    description: 'Identify animals instantly with your camera.',
    type: 'scan',
  },
  {
    id: '2',
    image: require('@/assets/images/onboardingImg2.png'),
    icon: 'book-open-variant',
    title: 'Learn fascinating facts about every creature.',
    description: 'Deep dive into scientific data and habitat info.',
    type: 'learn',
  },
  {
    id: '3',
    image: null,
    icon: 'cards',
    title: 'Build your personal animal collection.',
    titleHighlight: 'animal collection.',
    description: 'Save your sightings and complete your Dex with rare encounters from the wild.',
    type: 'collection',
  },
];

const ANIMAL_CARDS = [
  { image: require('@/assets/images/onboardingImg3.png'), label: 'APEX PREDATOR' },
  { image: require('@/assets/images/onboardingImg4.png'), label: 'SKY LORD' },
  { image: require('@/assets/images/onboardingImg5.png'), label: 'DEEP HUNTER' },
  { image: require('@/assets/images/onboardingImg6.png'), label: 'FOREST GHOST' },
  { image: require('@/assets/images/onboardingImg7.png'), label: 'PACK LEADER' },
  { image: require('@/assets/images/onboardingImg8.png'), label: 'NIGHT WATCH' },
];

function CollectionPage({ onRegister }: { onRegister: () => void }) {
  const router = useRouter();

  return (
    <View style={styles.collectionSlide}>
      {/* Background Grid */}
      <View style={styles.gridBackground}>
        <LinearGradient
          colors={['rgba(10,26,13,0.5)', 'rgba(10,26,13,0.85)']}
          style={styles.gridOverlay}
        />
        <View style={styles.gridContainer}>
          {ANIMAL_CARDS.map((card, idx) => (
            <View
              key={idx}
              style={[
                styles.animalCard,
                idx % 2 === 1 && styles.animalCardOffset,
              ]}
            >
              <Image source={card.image} style={styles.animalCardImage} />
              <View style={styles.animalCardLabel}>
                <Text style={styles.animalCardText}>{card.label}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Content */}
      <View style={styles.collectionContent}>
        <View style={styles.collectionTextContainer}>
          <Text style={styles.collectionTitle}>
            Build your personal{' '}
            <Text style={styles.collectionTitleHighlight}>animal collection.</Text>
          </Text>
          <Text style={styles.collectionDescription}>
            Save your sightings and complete your Dex with rare encounters from the wild.
          </Text>
        </View>

        {/* Register Button */}
        <View style={styles.registerContainer}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={onRegister}
            activeOpacity={0.9}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Decorative Blurs */}
      <View style={styles.decorativeBlur1} />
      <View style={styles.decorativeBlur2} />
    </View>
  );
}


export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dotAnimations = useRef(
    ONBOARDING_DATA.map(() => new Animated.Value(24))
  ).current;

  React.useEffect(() => {
    // Initialize first dot as active
    dotAnimations[0].setValue(40);
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleSkip = () => {
    router.push('/(tabs)');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    
    if (index !== currentIndex) {
      setCurrentIndex(index);
      
      // Animate dots
      dotAnimations.forEach((anim, idx) => {
        Animated.timing(anim, {
          toValue: idx === index ? 40 : 24,
          duration: 300,
          useNativeDriver: false,
        }).start();
      });
    }
  };

  const renderItem = ({ item, index }: { item: typeof ONBOARDING_DATA[0]; index: number }) => {
    if (item.type === 'collection') {
      return <CollectionPage onRegister={handleRegister} />;
    }

    return (
      <View style={styles.slide}>
        <ImageBackground
          source={item.image!}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(16,34,19,0.2)', 'rgba(16,34,19,0.8)']}
            locations={[0, 1]}
            style={styles.gradient}
          >
            {/* Content Area */}
            <View style={styles.contentArea}>
              {/* Icon Container */}
              <View style={styles.iconContainer}>
                {index === 0 ? (
                  <>
                    <Animated.View
                      style={[
                        styles.scannerBorder,
                        {
                          transform: [{ scale: pulseAnim }],
                        },
                      ]}
                    />
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={48}
                      color={COLORS.primary}
                    />
                  </>
                ) : (
                  <>
                    <Animated.View
                      style={[
                        styles.iconCircle,
                        {
                          transform: [{ scale: pulseAnim }],
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={item.icon as any}
                        size={32}
                        color={COLORS.primary}
                      />
                    </Animated.View>
                  </>
                )}
              </View>

              {/* Typography */}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Fixed Skip Button - stays on top */}
      <View style={styles.fixedTopNav}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Fixed Pagination Dots - stays on bottom */}
      <View style={styles.fixedPaginationContainer}>
        {ONBOARDING_DATA.map((_, idx) => (
          <Animated.View
            key={idx}
            style={[
              styles.dot,
              idx === currentIndex ? styles.dotActive : styles.dotInactive,
              {
                width: dotAnimations[idx],
              },
            ]}
          />
        ))}
      </View>

      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  slide: {
    width: width,
    height: height,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 50,
    zIndex: 10,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  fixedTopNav: {
    position: 'absolute',
    top: 50,
    right: 24,
    zIndex: 100,
  },
  fixedPaginationContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    zIndex: 100,
  },
  contentArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 120,
  },
  iconContainer: {
    marginBottom: 32,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBorder: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: `${COLORS.primary}80`,
    borderRadius: 12,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${COLORS.primary}33`,
    borderWidth: 1,
    borderColor: `${COLORS.primary}4D`,
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
    lineHeight: 44,
    paddingHorizontal: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 18,
    color: '#e2e8f0',
    textAlign: 'center',
    maxWidth: 340,
    lineHeight: 28,
    marginBottom: 40,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  dot: {
    borderRadius: 999,
    height: 6,
  },
  dotActive: {
    width: 40,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  dotInactive: {
    width: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  // Collection Page Styles
  collectionSlide: {
    width: width,
    height: height,
    backgroundColor: '#0a1a0d',
  },
  gridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    overflow: 'hidden',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
    opacity: 0.6,
    transform: [{ scale: 1.1 }, { rotate: '-3deg' }],
  },
  animalCard: {
    width: (width - 44) / 2,
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  animalCardOffset: {
    marginTop: 32,
  },
  animalCardImage: {
    width: '100%',
    height: '100%',
  },
  animalCardLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  animalCardText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  collectionContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
    paddingBottom: 80,
    zIndex: 10,
  },
  collectionTextContainer: {
    marginBottom: 40,
  },
  collectionTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    lineHeight: 44,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  collectionTitleHighlight: {
    color: COLORS.primary,
  },
  collectionDescription: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 28,
  },
  registerContainer: {
    gap: 16,
  },
  registerButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a1a0d',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  loginLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  decorativeBlur1: {
    position: 'absolute',
    top: height * 0.25,
    right: -80,
    width: 256,
    height: 256,
    backgroundColor: 'rgba(15, 230, 51, 0.1)',
    borderRadius: 128,
    opacity: 0.5,
  },
  decorativeBlur2: {
    position: 'absolute',
    bottom: height * 0.25,
    left: -80,
    width: 256,
    height: 256,
    backgroundColor: 'rgba(15, 230, 51, 0.05)',
    borderRadius: 128,
    opacity: 0.5,
  },
});
