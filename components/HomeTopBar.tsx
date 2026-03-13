import { User } from "@/data/mockUser";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface HomeTopBarProps {
  user: User;
  onNotificationPress?: () => void;
}

const HomeTopBar: React.FC<HomeTopBarProps> = ({
  user,
  onNotificationPress,
}) => {
  const greeting = user.isReturningUser
    ? `Welcome back ${user.name}`
    : `Hey ${user.name}`;

  return (
    <View style={styles.container}>
      {/* Left side - Avatar and Greeting */}
      <View style={styles.leftSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarEmoji}>{user.avatar}</Text>
        </View>
        <Text style={styles.greeting}>{greeting}</Text>
      </View>

      {/* Right side - Notification */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onNotificationPress}
        activeOpacity={0.7}
      >
        <Ionicons name="notifications" size={24} color="#8A9E8C" />
        {user.hasNotifications && <View style={styles.notificationDot} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1a2e1c",
    borderWidth: 2,
    borderColor: "#0fe633",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmoji: {
    fontSize: 22,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  iconButton: {
    position: "relative",
    padding: 4,
  },
  notificationDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0fe633",
  },
});

export default HomeTopBar;
