import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TabName = "home" | "collection" | "scan" | "discover" | "profile";

interface BottomNavBarProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  const tabs = [
    { name: "home" as TabName, icon: "home-outline", label: "HOME" },
    {
      name: "collection" as TabName,
      icon: "grid-outline",
      label: "COLLECTION",
    },
    { name: "discover" as TabName, icon: "compass-outline", label: "DISCOVER" },
    { name: "profile" as TabName, icon: "person-outline", label: "PROFILE" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {/* Render first two tabs */}
        {tabs.slice(0, 2).map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={activeTab === tab.name ? "#FFBF00" : "#8A9E8C"}
            />
            <Text
              style={[
                styles.label,
                activeTab === tab.name && styles.labelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Spacer for floating button */}
        <View style={styles.scanSpacer} />

        {/* Render last two tabs */}
        {tabs.slice(2).map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabPress(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={activeTab === tab.name ? "#FFBF00" : "#8A9E8C"}
            />
            <Text
              style={[
                styles.label,
                activeTab === tab.name && styles.labelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Floating Scan Button */}
      <View style={styles.scanButtonContainer}>
        <View style={styles.scanButtonRing}>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => onTabPress("scan")}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={28} color="#1a2e1c" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },
  navBar: {
    flexDirection: "row",
    backgroundColor: "#1a2e1c",
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "rgba(150, 100, 255, 0.3)",
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: "#8A9E8C",
    textTransform: "uppercase",
    marginTop: 2,
  },
  labelActive: {
    color: "#FFBF00",
  },
  scanSpacer: {
    width: 80,
  },
  scanButtonContainer: {
    position: "absolute",
    top: -25,
    left: "50%",
    marginLeft: -30,
    zIndex: 10,
  },
  scanButtonRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#1a2e1c",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FFBF00",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  scanButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFBF00",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomNavBar;
