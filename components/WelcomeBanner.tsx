import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface WelcomeBannerProps {
  onScanPress: () => void;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onScanPress }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/welcome-banner.png")}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.text}>
              Your Faunex is{"\n"}empty.Go scan your{"\n"}first animal
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={onScanPress}
              activeOpacity={0.8}
            >
              <Ionicons name="camera" size={18} color="#0d1f0f" />
              <Text style={styles.buttonText}>Scan Now</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  imageBackground: {
    width: "100%",
    height: 192,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    borderRadius: 12,
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 24,
  },
  content: {
    gap: 12,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
    maxWidth: 200,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFBF00",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#0d1f0f",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default WelcomeBanner;
