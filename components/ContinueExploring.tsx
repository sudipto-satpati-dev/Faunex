import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface ScannedAnimal {
  id: string;
  name: string;
  image: any;
  progress: number; // 0 to 1 (0% to 100%)
}

interface ContinueExploringProps {
  onSeeAll?: () => void;
  onAnimalPress?: (animalId: string) => void;
}

const ContinueExploring: React.FC<ContinueExploringProps> = ({
  onSeeAll,
  onAnimalPress,
}) => {
  const scannedAnimals: ScannedAnimal[] = [
    {
      id: "1",
      name: "Snow Leopard",
      image: require("@/assets/images/prev1.png"),
      progress: 0.67, // 67%
    },
    {
      id: "2",
      name: "Bald Eagle",
      image: require("@/assets/images/prev2.png"),
      progress: 0.25, // 25%
    },
    {
      id: "3",
      name: "Red Fox",
      image: require("@/assets/images/prev3.png"),
      progress: 0.8, // 80%
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Continue Exploring</Text>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Animal Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {scannedAnimals.map((animal) => (
          <TouchableOpacity
            key={animal.id}
            style={styles.card}
            onPress={() => onAnimalPress?.(animal.id)}
            activeOpacity={0.8}
          >
            <ImageBackground
              source={animal.image}
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}
            />
            <Text style={styles.animalName}>{animal.name}</Text>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${animal.progress * 100}%` },
                  ]}
                />
              </View>
            </View>
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
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFBF00",
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  card: {
    width: 140,
    backgroundColor: "rgba(26, 46, 28, 0.6)",
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 191, 0, 0.3)",
  },
  cardImage: {
    width: "100%",
    height: 96,
    marginBottom: 8,
  },
  cardImageStyle: {
    borderRadius: 8,
  },
  animalName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBackground: {
    width: "100%",
    height: 4,
    backgroundColor: "#0d1f0f",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFBF00",
    borderRadius: 2,
  },
});

export default ContinueExploring;
