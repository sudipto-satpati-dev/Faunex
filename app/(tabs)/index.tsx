import HomeTopBar from "@/components/HomeTopBar";
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
