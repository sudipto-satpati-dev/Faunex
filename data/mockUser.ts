export interface User {
  id: string;
  name: string;
  avatar: string;
  isReturningUser: boolean;
  hasNotifications: boolean;
  hasScannedAnimals: boolean;
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
  hasScannedAnimals: true, // Set to true to show stats banner
  stats: {
    scanned: 34,
    favorited: 12,
    habitats: 6,
  },
};

// For testing new user experience, change hasScannedAnimals to false
// For testing returning user with stats, set hasScannedAnimals to true
