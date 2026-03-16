import AnimalLibrary, { AnimalLibraryRef } from "@/components/AnimalLibrary";
import ContinueExploring from "@/components/ContinueExploring";
import DidYouKnow from "@/components/DidYouKnow";
import FeaturedInterests from "@/components/FeaturedInterests";
import FilterChips from "@/components/FilterChips";
import HomeTopBar from "@/components/HomeTopBar";
import NewThisWeek from "@/components/NewThisWeek";
import RareEndangered from "@/components/RareEndangered";
import SearchBar from "@/components/SearchBar";
import StatsBanner from "@/components/StatsBanner";
import StreakReward from "@/components/StreakReward";
import WelcomeBanner from "@/components/WelcomeBanner";
import { COLORS } from "@/constants/colors";
import { getFactOfTheDay } from "@/data/animalFacts";
import { mockUser } from "@/data/mockUser";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const factOfTheDay = getFactOfTheDay();
  const animalLibraryRef = useRef<AnimalLibraryRef>(null);

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

  const handleClaimReward = () => {
    console.log("Claim daily reward pressed");
  };

  const handleNewAnimalPress = (animalId: string) => {
    console.log("New animal pressed:", animalId);
  };

  const handleHowToHelp = () => {
    console.log("How to help pressed");
  };

  const handleLibraryAnimalPress = (animalId: string) => {
    console.log("Library animal pressed:", animalId);
  };

  const handleFilterPress = () => {
    console.log("Filter pressed");
  };

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 200; // Increased threshold

    // Check if we're near the bottom
    const isCloseToBottom =
      contentOffset.y + layoutMeasurement.height >=
      contentSize.height - paddingToBottom;

    if (isCloseToBottom) {
      animalLibraryRef.current?.loadMore();
    }
  };

  return (
    <View style={styles.container}>
      <HomeTopBar
        user={mockUser}
        onNotificationPress={handleNotificationPress}
      />
      <ScrollView
        style={styles.content}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
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
        {mockUser.streak && mockUser.streak >= 7 && (
          <StreakReward
            streakDays={mockUser.streak}
            onClaimReward={handleClaimReward}
          />
        )}
        <DidYouKnow
          fact={factOfTheDay.fact}
          highlight={factOfTheDay.highlight}
        />
        <NewThisWeek onAnimalPress={handleNewAnimalPress} />
        <RareEndangered onHowToHelp={handleHowToHelp} />
        <AnimalLibrary
          ref={animalLibraryRef}
          onAnimalPress={handleLibraryAnimalPress}
          onFilterPress={handleFilterPress}
        />
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
