import { COLORS } from "@/constants/colors";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Animal {
  id: string;
  name: string;
  habitat: string;
  image: any;
}

interface NewThisWeekProps {
  onAnimalPress?: (animalId: string) => void;
}

const newAnimals: Animal[] = [
  {
    id: "poison-dart-frog",
    name: "Poison Dart Frog",
    habitat: "Rainforest",
    image: require("@/assets/images/newthisweek1.png"),
  },
  {
    id: "axolotl",
    name: "Axolotl",
    habitat: "Freshwater",
    image: require("@/assets/images/newthisweek2.png"),
  },
];

const NewThisWeek: React.FC<NewThisWeekProps> = ({ onAnimalPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New This Week</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {newAnimals.map((animal) => (
          <TouchableOpacity
            key={animal.id}
            style={styles.card}
            onPress={() => onAnimalPress?.(animal.id)}
            activeOpacity={0.8}
          >
            <Image source={animal.image} style={styles.image} />
            <View style={styles.cardContent}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{animal.habitat}</Text>
              </View>
              <Text style={styles.animalName}>{animal.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    width: 200,
    backgroundColor: "rgba(26, 46, 28, 0.6)",
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 128,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 12,
  },
  badge: {
    backgroundColor: "rgba(255, 191, 0, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.accent,
    textTransform: "uppercase",
  },
  animalName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 4,
  },
});

export default NewThisWeek;
