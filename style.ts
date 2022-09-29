import { Platform, PlatformColor } from "react-native";

export const colors = {
  background: (Platform.OS == "ios") ? PlatformColor("systemBackground") : "#fff",
  backgroundSecondary: (Platform.OS == "ios") ? PlatformColor("secondarySystemBackground") : "#f5f5f5",
  text: (Platform.OS == "ios") ? PlatformColor("label") : "#000",
  textSecondary: (Platform.OS == "ios") ? PlatformColor("secondaryLabel") : "#757575",
  textTertiary: (Platform.OS == "ios") ? PlatformColor("tertiaryLabel") : "#BDBDBD",
} as const;
