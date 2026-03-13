import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Animal {
  id: string;
  name: string;
  category: string;
  image: any;
}

interface FeaturedInterestsProps {
  interests: string[];
  onSeeAll?: () => void;
  onAnimalPress?: (animalId: string) => void;
}

const FeaturedInterests: React.FC<FeaturedInterestsProps> = ({
  interests,
  onSeeAll,
  onAnimalPress,
}) => {
  const animals: Animal[] = [
    {
      id: "1",
      name: "African Lion",
      category: "MAMMAL",
      image: require("@/assets/images/suggested1.png"),
    },
    {
      id: "2",
      name: "Great White",
      category: "AQUATIC",
      image: require("@/assets/images/suggested2.png"),
    },
    {
      id: "3",
      name: "Bengal Tiger",
      category: "MAMMAL",
      image: require("@/assets/images/suggested3.png"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Based on Your Interests</Text>
          <Text style={styles.subtitle}>{interests.join(" & ")}</Text>
        </View>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Animal Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {animals.map((animal) => (
          <TouchableOpacity
            key={animal.id}
            style={styles.card}
            onPress={() => onAnimalPress?.(animal.id)}
            activeOpacity={0.9}
          >
            <ImageBackground
              source={animal.image}
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}
            >
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.3)", "rgba(0,0,0,0.9)"]}
                style={styles.gradient}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.category}>{animal.category}</Text>
                  <Text style={styles.animalName}>{animal.name}</Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#8A9E8C",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFBF00",
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    width: 160,
    height: 256,
    borderRadius: 16,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardImageStyle: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardContent: {
    padding: 16,
  },
  category: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
    color: "#FFBF00",
    marginBottom: 4,
  },
  animalName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

export default FeaturedInterests;
