import { COLORS } from '@/constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const AVATARS = [
  { id: 'normal', icon: 'circle-outline', label: 'NORMAL' },
  { id: 'fire', icon: 'fire', label: 'FIRE' },
  { id: 'water', icon: 'water', label: 'WATER' },
  { id: 'electric', icon: 'lightning-bolt', label: 'ELECTRIC' },
  { id: 'grass', icon: 'leaf', label: 'GRASS' },
  { id: 'ice', icon: 'snowflake', label: 'ICE' },
  { id: 'fighting', icon: 'karate', label: 'FIGHTING' },
  { id: 'poison', icon: 'skull-crossbones', label: 'POISON' },
  { id: 'ground', icon: 'earth', label: 'GROUND' },
  { id: 'flying', icon: 'bird', label: 'FLYING' },
  { id: 'psychic', icon: 'eye', label: 'PSYCHIC' },
  { id: 'bug', icon: 'ladybug', label: 'BUG' },
  { id: 'rock', icon: 'diamond-stone', label: 'ROCK' },
  { id: 'ghost', icon: 'ghost', label: 'GHOST' },
  { id: 'dragon', icon: 'dragon', label: 'DRAGON' },
  { id: 'dark', icon: 'moon-waning-crescent', label: 'DARK' },
  { id: 'steel', icon: 'shield', label: 'STEEL' },
  { id: 'fairy', icon: 'star-four-points', label: 'FAIRY' },
];

export default function ChooseAvatarScreen() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState('normal');
  const [trainerName, setTrainerName] = useState('');

//   const handleBack = () => {
//     router.back();
//   };

  const handleChoose = () => {
    // Navigate to interests screen
    router.push('/pick-interests');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PICK YOUR AVATAR</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Scrollable Avatar Grid ONLY */}
              <ScrollView
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator={false}
              >
                  <View style={styles.avatarGrid}>
                      {AVATARS.map((avatar) => (
                          <TouchableOpacity
                              key={avatar.id}
                              style={[
                                  styles.avatarCard,
                                  selectedAvatar === avatar.id && styles.avatarCardSelected,
                              ]}
                              onPress={() => setSelectedAvatar(avatar.id)}
                              activeOpacity={0.8}
                          >
                              {selectedAvatar === avatar.id && (
                                  <View style={styles.selectionIndicator}>
                                      <MaterialCommunityIcons name="check-circle" size={24} color={COLORS.accent} />
                                  </View>
                              )}
                              <MaterialCommunityIcons
                                  name={avatar.icon as any}
                                  size={64}
                                  color={selectedAvatar === avatar.id ? COLORS.accent : '#4a5f4d'}
                              />
                              <Text style={[styles.avatarLabel, selectedAvatar === avatar.id && styles.avatarLabelSelected]}>
                                  {avatar.label}
                              </Text>
                          </TouchableOpacity>
                      ))}
                  </View>
                  <View style={styles.moreAvatarsHint}>
                      <MaterialCommunityIcons name="lock-outline" size={16} color={COLORS.textMuted} />
                      <Text style={styles.moreAvatarsText}>
                          More avatars unlock as you gain experience
                      </Text>
                  </View>

              </ScrollView>

        {/* ✅ Fixed Bottom Section — outside ScrollView */}
        <View style={styles.bottomSection}>
          <View style={styles.nameSection}>
            <Text style={styles.nameLabel}>CHOOSE YOUR TRAINER NAME</Text>
            <View style={styles.nameInputContainer}>
              <TextInput
                style={styles.nameInput}
                value={trainerName}
                onChangeText={setTrainerName}
                placeholder="Enter your name"
                placeholderTextColor={COLORS.textMuted}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.chooseButton} onPress={handleChoose} activeOpacity={0.9}>
            <Text style={styles.chooseButtonText}>CHOOSE THIS</Text>
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
    justifyContent: 'center',
    //paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    paddingLeft: 40
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    letterSpacing: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  avatarCard: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarCardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(255, 191, 0, 0.05)',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  avatarLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    marginTop: 12,
    marginBottom: 6,
    letterSpacing: 1.5,
  },
  avatarLabelSelected: {
    color: COLORS.accent,
  },
  fixedBottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  nameSection: {
    marginBottom: 20,
  },
  nameLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textMuted,
    marginBottom: 12,
    letterSpacing: 1.5,
  },
  nameInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  nameInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  chooseButton: {
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
  chooseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.background,
    letterSpacing: 1.5,
  },
   bottomSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    backgroundColor: COLORS.background,
  },
  moreAvatarsHint: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  paddingVertical: 24,
  opacity: 0.5,
},
moreAvatarsText: {
  fontSize: 12,
  color: COLORS.textMuted,
  letterSpacing: 1,
  fontStyle: 'italic',
},
});
