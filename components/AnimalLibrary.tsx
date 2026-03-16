import { Ionicons } from "@expo/vector-icons";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = (SCREEN_WIDTH - 40 - 24) / 3; // 40 = horizontal padding, 24 = 2 gaps of 12

interface Animal {
  id: string;
  name: string;
  image: any;
  isScanned: boolean;
}

interface AnimalLibraryProps {
  onAnimalPress?: (animalId: string) => void;
  onFilterPress?: () => void;
}

export interface AnimalLibraryRef {
  loadMore: () => void;
}

const baseAnimals: Omit<Animal, "id">[] = [
  {
    name: "Snow Leopard",
    image: require("@/assets/images/animal1.png"),
    isScanned: true,
  },
  {
    name: "Elephant",
    image: require("@/assets/images/animal2.png"),
    isScanned: true,
  },
  {
    name: "Bengal Tiger",
    image: require("@/assets/images/animal3.png"),
    isScanned: false,
  },
  {
    name: "Giant Panda",
    image: require("@/assets/images/animal4.png"),
    isScanned: false,
  },
  {
    name: "Koala",
    image: require("@/assets/images/animal5.png"),
    isScanned: true,
  },
  {
    name: "Chimpanzee",
    image: require("@/assets/images/animal6.png"),
    isScanned: false,
  },
  {
    name: "Butterfly",
    image: require("@/assets/images/animal7.png"),
    isScanned: true,
  },
  {
    name: "Bald Eagle",
    image: require("@/assets/images/animal8.png"),
    isScanned: false,
  },
  {
    name: "Makaw",
    image: require("@/assets/images/animal9.png"),
    isScanned: true,
  },
  {
    name: "Giraffe",
    image: require("@/assets/images/animal10.png"),
    isScanned: false,
  },
  {
    name: "King Fisher",
    image: require("@/assets/images/animal11.png"),
    isScanned: true,
  },
  {
    name: "Penguin",
    image: require("@/assets/images/animal12.png"),
    isScanned: false,
  },
];

const generateAnimals = (count: number): Animal[] => {
  const animals: Animal[] = [];
  for (let i = 0; i < count; i++) {
    const baseIndex = i % baseAnimals.length;
    animals.push({
      ...baseAnimals[baseIndex],
      id: `animal-${i}`,
    });
  }
  return animals;
};

const AnimalLibrary = forwardRef<AnimalLibraryRef, AnimalLibraryProps>(
  ({ onAnimalPress, onFilterPress }, ref) => {
    const [displayCount, setDisplayCount] = useState(12);
    const [isLoading, setIsLoading] = useState(false);
    const isLoadingRef = useRef(false);

    const animals = generateAnimals(displayCount);

    const loadMore = () => {
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;
      setIsLoading(true);
      setTimeout(() => {
        setDisplayCount((prev) => prev + 12);
        setIsLoading(false);
        isLoadingRef.current = false;
      }, 2000);
    };

    useImperativeHandle(ref, () => ({
      loadMore,
    }));

    return (
      <View style={styles.container}>
        {/* Section Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {/* <View style={styles.accentBar} /> */}
            <Text style={styles.title}>Animal Library</Text>
          </View>
          <TouchableOpacity
            onPress={onFilterPress}
            activeOpacity={0.7}
            style={styles.filterButton}
          >
            <Ionicons name="filter" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {animals.map((animal) => (
            <TouchableOpacity
              key={animal.id}
              style={[styles.gridItem, { width: ITEM_WIDTH }]}
              onPress={() => onAnimalPress?.(animal.id)}
              activeOpacity={0.8}
            >
              <View style={styles.imageContainer}>
                {/* Animal Image */}
                <Image source={animal.image} style={styles.image} />

                {/* Dark overlay for unscanned animals */}
                {!animal.isScanned && (
                  <View style={styles.lockedOverlay}>
                    <Ionicons name="lock-closed" size={18} color="#4a6e4d" />
                  </View>
                )}

                {/* Checkmark for scanned animals */}
                {animal.isScanned && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark" size={12} color="#0d1f0f" />
                  </View>
                )}
              </View>

              {/* Animal Name */}
              <Text
                style={[
                  styles.animalName,
                  !animal.isScanned && styles.animalNameGray,
                ]}
                numberOfLines={1}
              >
                {animal.isScanned ? animal.name : "???"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Spinner — always in layout, opacity controlled by isLoading */}
        <View style={[styles.loadingContainer, { opacity: isLoading ? 1 : 0 }]}>
          <ActivityIndicator size="large" color="#FFB830" />
          <Text style={styles.loadingText}>Loading more animals...</Text>
        </View>
      </View>
    );
  },
);

AnimalLibrary.displayName = "AnimalLibrary";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  accentBar: {
    width: 3,
    height: 18,
    backgroundColor: "#FFB830",
    borderRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  filterButton: {
    padding: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  gridItem: {
    // width set dynamically via ITEM_WIDTH
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3, 8, 4, 0.92)",
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFB830",
    borderWidth: 2,
    borderColor: "#0d1f0f",
    justifyContent: "center",
    alignItems: "center",
  },
  animalName: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 4,
    textAlign: "center",
  },
  animalNameGray: {
    color: "#4a6e4d",
  },
  loadingContainer: {
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  loadingText: {
    fontSize: 11,
    color: "#8A9E8C",
    textAlign: "center",
  },
});

export default AnimalLibrary;
