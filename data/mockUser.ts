export interface User {
  id: string;
  name: string;
  avatar: string;
  isReturningUser: boolean;
  hasNotifications: boolean;
  hasScannedAnimals: boolean;
  interests?: string[];
  streak?: number; // Number of consecutive days
  stats?: {
    scanned: number;
    favorited: number;
    habitats: number;
  };
}

export const mockUser: User = {
  id: "1",
  name: "John",
  avatar: "🦅", // Eagle emoji as avatar
  isReturningUser: false,
  hasNotifications: true,
  hasScannedAnimals: false, // Set to true to show stats banner
  interests: ["Big Cats", "Ocean Life"],
  streak: 7, // 7 day streak
  stats: {
    scanned: 34,
    favorited: 12,
    habitats: 6,
  },
};

// For testing new user experience, change hasScannedAnimals to false
// For testing returning user with stats, set hasScannedAnimals to true
