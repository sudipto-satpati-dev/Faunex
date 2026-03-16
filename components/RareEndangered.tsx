import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RareEndangeredProps {
  onHowToHelp?: () => void;
}

const RareEndangered: React.FC<RareEndangeredProps> = ({ onHowToHelp }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rare & Endangered</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/images/endangered.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.textContent}>
            <Text style={styles.animalName}>Pangolin</Text>
            <Text style={styles.description}>
              Critically endangered. Over 1 million have been poached in the
              last decade.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={onHowToHelp}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>How to help</Text>
              <Ionicons name="arrow-forward" size={14} color="#FFBF00" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "rgba(127, 29, 29, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 16,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#0d1f0f",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContent: {
    flex: 1,
    justifyContent: "center",
  },
  animalName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f87171",
  },
  description: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 4,
    lineHeight: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFBF00",
  },
});

export default RareEndangered;
