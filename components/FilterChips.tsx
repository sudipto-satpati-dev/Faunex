import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface FilterChipsProps {
  onFilterChange?: (filter: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Mammals", "Birds", "Reptiles", "Aquatic", "Insects"];

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.chip,
              selectedFilter === filter
                ? styles.chipActive
                : styles.chipInactive,
            ]}
            onPress={() => handleFilterPress(filter)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                selectedFilter === filter
                  ? styles.chipTextActive
                  : styles.chipTextInactive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: "#FFBF00",
    borderColor: "#FFBF00",
  },
  chipInactive: {
    backgroundColor: "rgba(26, 46, 28, 0.6)",
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#0d1f0f",
  },
  chipTextInactive: {
    color: "#B0BDB2",
  },
});

export default FilterChips;
