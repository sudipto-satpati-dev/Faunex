import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DidYouKnowProps {
  fact: string;
  highlight?: string;
}

const DidYouKnow: React.FC<DidYouKnowProps> = ({ fact, highlight }) => {
  const renderFactText = () => {
    if (!highlight) {
      return <Text style={styles.factText}>{fact}</Text>;
    }

    const parts = fact.split(highlight);
    return (
      <Text style={styles.factText}>
        {parts[0]}
        <Text style={styles.highlight}>{highlight}</Text>
        {parts[1]}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Ionicons name="bulb" size={24} color="#0d1f0f" />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Did You Know?</Text>
          {renderFactText()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(26, 46, 28, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(255, 191, 0, 0.2)",
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  iconContainer: {
    backgroundColor: "#FFBF00",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFBF00",
    marginBottom: 4,
  },
  factText: {
    fontSize: 14,
    color: "#B0BDB2",
    lineHeight: 20,
  },
  highlight: {
    color: "#FFBF00",
    fontWeight: "700",
  },
});

export default DidYouKnow;
