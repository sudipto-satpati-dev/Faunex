import { Tabs, usePathname, useRouter } from "expo-router";
import React from "react";

import BottomNavBar from "@/components/BottomNavBar";

type TabName = "home" | "collection" | "scan" | "discover" | "profile";

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = (): TabName => {
    if (pathname.includes("collection")) return "collection";
    if (pathname.includes("camera")) return "scan";
    if (pathname.includes("discover")) return "discover";
    if (pathname.includes("explore")) return "profile";
    return "home";
  };

  const handleTabPress = (tab: TabName) => {
    switch (tab) {
      case "home":
        router.push("/(tabs)");
        break;
      case "collection":
        router.push("/(tabs)/collection");
        break;
      case "scan":
        router.push("/(tabs)/camera");
        break;
      case "discover":
        router.push("/(tabs)/discover");
        break;
      case "profile":
        router.push("/(tabs)/explore");
        break;
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
      tabBar={() => (
        <BottomNavBar activeTab={getActiveTab()} onTabPress={handleTabPress} />
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="collection" />
      <Tabs.Screen name="camera" />
      <Tabs.Screen name="discover" />
      <Tabs.Screen name="explore" />
    </Tabs>
  );
}
