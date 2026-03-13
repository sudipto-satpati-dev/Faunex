import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StreakRewardProps {
  streakDays: number;
  onClaimReward?: () => void;
}

const StreakReward: React.FC<StreakRewardProps> = ({
  streakDays,
  onClaimReward,
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(255, 191, 0, 0.2)", "rgba(26, 46, 28, 0.8)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.fireEmoji}>🔥</Text>
            <Text style={styles.title}>{streakDays} Day Streak!</Text>
          </View>
          <Text style={styles.description}>
            Keep exploring to maintain your streak. Did you know? A giraffe's
            heart is 2 feet long!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onClaimReward}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>CLAIM DAILY REWARD</Text>
          </TouchableOpacity>
        </View>

        {/* Background Icon */}
        <View style={styles.backgroundIcon}>
          <Ionicons name="ribbon" size={120} color="rgba(255, 191, 0, 0.1)" />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 191, 0, 0.3)",
    position: "relative",
    overflow: "hidden",
  },
  content: {
    position: "relative",
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  fireEmoji: {
    fontSize: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  description: {
    fontSize: 14,
    color: "#B0BDB2",
    lineHeight: 20,
    maxWidth: "80%",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FFBF00",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#0d1f0f",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  backgroundIcon: {
    position: "absolute",
    right: -16,
    bottom: -16,
    zIndex: 1,
  },
});

export default StreakReward;
