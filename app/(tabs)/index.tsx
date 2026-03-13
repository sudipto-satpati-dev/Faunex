import FeaturedInterests from "@/components/FeaturedInterests";
import FilterChips from "@/components/FilterChips";
import HomeTopBar from "@/components/HomeTopBar";
import SearchBar from "@/components/SearchBar";
import StatsBanner from "@/components/StatsBanner";
import WelcomeBanner from "@/components/WelcomeBanner";
import { COLORS } from "@/constants/colors";
import { mockUser } from "@/data/mockUser";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const handleNotificationPress = () => {
    console.log("Notification pressed");
  };

  const handleScanPress = () => {
    router.push("/(tabs)/camera");
  };

  const handleSearch = (text: string) => {
    console.log("Search:", text);
  };

  const handleCameraPress = () => {
    router.push("/(tabs)/camera");
  };

  const handleVoicePress = () => {
    console.log("Voice search pressed");
  };

  const handleFilterChange = (filter: string) => {
    console.log("Filter changed:", filter);
  };

  const handleSeeAllInterests = () => {
    console.log("See all interests pressed");
  };

  const handleAnimalPress = (animalId: string) => {
    console.log("Animal pressed:", animalId);
  };

  return (
    <View style={styles.container}>
      <HomeTopBar
        user={mockUser}
        onNotificationPress={handleNotificationPress}
      />
      <ScrollView style={styles.content}>
        {!mockUser.hasScannedAnimals ? (
          <WelcomeBanner onScanPress={handleScanPress} />
        ) : (
          mockUser.stats && (
            <StatsBanner
              scannedCount={mockUser.stats.scanned}
              favoritedCount={mockUser.stats.favorited}
              habitatsCount={mockUser.stats.habitats}
            />
          )
        )}
        <SearchBar
          onChangeText={handleSearch}
          onCameraPress={handleCameraPress}
          onVoicePress={handleVoicePress}
        />
        <FilterChips onFilterChange={handleFilterChange} />
        {mockUser.interests && mockUser.interests.length > 0 && (
          <FeaturedInterests
            interests={mockUser.interests}
            onSeeAll={handleSeeAllInterests}
            onAnimalPress={handleAnimalPress}
          />
        )}
        {/* Home content will go here */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
});
