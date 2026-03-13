import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StatsBannerProps {
  scannedCount: number;
  favoritedCount: number;
  habitatsCount: number;
}

const StatsBanner: React.FC<StatsBannerProps> = ({
  scannedCount,
  favoritedCount,
  habitatsCount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          {/* Scanned */}
          <View style={styles.stat}>
            <View style={styles.iconBackground}>
              <Ionicons name="paw" size={80} color="rgba(255, 191, 0, 0.15)" />
            </View>
            <Text style={styles.number}>{scannedCount}</Text>
            <Text style={styles.label}>SCANNED</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Favorited */}
          <View style={styles.stat}>
            <View style={styles.iconBackground}>
              <Ionicons name="star" size={80} color="rgba(255, 191, 0, 0.15)" />
            </View>
            <Text style={styles.number}>{favoritedCount}</Text>
            <Text style={styles.label}>FAVORITED</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Habitats */}
          <View style={styles.stat}>
            <View style={styles.iconBackground}>
              <Ionicons
                name="earth"
                size={80}
                color="rgba(255, 191, 0, 0.15)"
              />
            </View>
            <Text style={styles.number}>{habitatsCount}</Text>
            <Text style={styles.label}>HABITATS</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  cardWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFBF00",
    backgroundColor: "rgba(26, 46, 28, 0.4)",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "rgba(13, 31, 15, 0.6)",
  },
  stat: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    paddingVertical: 8,
  },
  iconBackground: {
    position: "absolute",
    top: -8,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    zIndex: 1,
    marginTop: 12,
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
    color: "#8A9E8C",
    letterSpacing: 0.5,
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 48,
    backgroundColor: "rgba(138, 158, 140, 0.3)",
  },
});

export default StatsBanner;
