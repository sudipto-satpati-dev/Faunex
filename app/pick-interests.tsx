import { COLORS } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const INTERESTS = [
  { id: 'big-cats', emoji: '🦁', label: 'Big Cats' },
  { id: 'birds-prey', emoji: '🦅', label: 'Birds of Prey' },
  { id: 'ocean-life', emoji: '🐋', label: 'Ocean Life' },
  { id: 'reptiles', emoji: '🐍', label: 'Reptiles' },
  { id: 'insects', emoji: '🦋', label: 'Insects' },
  { id: 'giants', emoji: '🐘', label: 'Giants' },
  { id: 'forest-animals', emoji: '🦊', label: 'Forest Animals' },
  { id: 'endangered', emoji: '🦎', label: 'Endangered Species' },
];

const MORE_INTERESTS = [
  { id: 'primates', emoji: '🦍', label: 'Primates' },
  { id: 'aquatic', emoji: '🐠', label: 'Aquatic Life' },
  { id: 'amphibians', emoji: '🐸', label: 'Amphibians' },
  { id: 'marsupials', emoji: '🦘', label: 'Marsupials' },
  { id: 'rodents', emoji: '🐿️', label: 'Rodents' },
  { id: 'nocturnal', emoji: '🦇', label: 'Nocturnal Animals' },
];

export default function PickInterestsScreen() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleContinue = () => {
    // Navigate to camera permission screen
    router.push('/enable-camera');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

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

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>What animals excite you most?</Text>
            <Text style={styles.subtitle}>
              We'll personalize your Animadex based on this.
            </Text>
          </View>

          {/* Interests Grid */}
          <View style={styles.interestsGrid}>
            {INTERESTS.map((interest) => (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestPill,
                  selectedInterests.includes(interest.id) && styles.interestPillSelected,
                ]}
                onPress={() => toggleInterest(interest.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.interestText,
                    selectedInterests.includes(interest.id) && styles.interestTextSelected,
                  ]}
                >
                  {interest.emoji} {interest.label}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Show More Interests if expanded */}
            {showMore && MORE_INTERESTS.map((interest) => (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestPill,
                  selectedInterests.includes(interest.id) && styles.interestPillSelected,
                ]}
                onPress={() => toggleInterest(interest.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.interestText,
                    selectedInterests.includes(interest.id) && styles.interestTextSelected,
                  ]}
                >
                  {interest.emoji} {interest.label}
                </Text>
              </TouchableOpacity>
            ))}

            {/* More Button */}
            {!showMore && (
              <TouchableOpacity
                style={styles.morePill}
                onPress={() => setShowMore(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.moreText}>More...</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.9}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleSection: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
    lineHeight: 44,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textMuted,
    lineHeight: 28,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestPill: {
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 191, 0, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(255, 191, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  interestPillSelected: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  interestText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  },
  interestTextSelected: {
    fontWeight: 'bold',
    color: COLORS.background,
  },
  morePill: {
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    backgroundColor: COLORS.background,
  },
  continueButton: {
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
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.background,
  },
});
