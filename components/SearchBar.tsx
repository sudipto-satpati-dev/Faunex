import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onCameraPress?: () => void;
  onVoicePress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search any animal...",
  onChangeText,
  onCameraPress,
  onVoicePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={24}
          color="#0fe633"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#6B7B6D"
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={onCameraPress} style={styles.iconButton}>
          <Ionicons name="camera-outline" size={24} color="#8A9E8C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onVoicePress} style={styles.iconButton}>
          <Ionicons name="mic-outline" size={24} color="#8A9E8C" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(26, 46, 28, 0.6)",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchIcon: {
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    paddingVertical: 0,
  },
  iconButton: {
    padding: 4,
  },
});

export default SearchBar;
