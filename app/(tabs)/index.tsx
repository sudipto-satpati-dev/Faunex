import ContinueExploring from "@/components/ContinueExploring";
import DidYouKnow from "@/components/DidYouKnow";
import FeaturedInterests from "@/components/FeaturedInterests";
import FilterChips from "@/components/FilterChips";
import HomeTopBar from "@/components/HomeTopBar";
import SearchBar from "@/components/SearchBar";
import StatsBanner from "@/components/StatsBanner";
import WelcomeBanner from "@/components/WelcomeBanner";
import { COLORS } from "@/constants/colors";
import { getFactOfTheDay } from "@/data/animalFacts";
import { mockUser } from "@/data/mockUser";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const factOfTheDay = getFactOfTheDay();

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

  const handleContinueExploringPress = (animalId: string) => {
    console.log("Continue exploring animal pressed:", animalId);
  };

  const handleSeeAllContinue = () => {
    console.log("See all continue exploring pressed");
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
        {mockUser.hasScannedAnimals && (
          <ContinueExploring
            onSeeAll={handleSeeAllContinue}
            onAnimalPress={handleContinueExploringPress}
          />
        )}
        <DidYouKnow
          fact={factOfTheDay.fact}
          highlight={factOfTheDay.highlight}
        />
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
