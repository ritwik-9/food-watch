import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { GestureResponderEvent, Platform, PlatformColor, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

export const iconButtonColor = PlatformColor((Platform.OS == "ios") ? "systemBlue" : "@android:color/holo_blue_dark", "blue");
export const iconButtonSize = 24;

interface IconButtonProps {
  /** The name of the Ionicons icon to use. */
  icon: keyof (typeof Ionicons)["glyphMap"];
  material?: keyof (typeof MaterialIcons)["glyphMap"];
  /** The proxied onPress handler from the TouchableOpacity element. */
  onPress: (event: GestureResponderEvent) => void;
  /** The size of the icon, defaults to 24  */
  size?: number;
}

export default function IconButton({ icon, material, onPress, size = iconButtonSize }: IconButtonProps) {
  const iconElement = (material && Platform.OS == "android")
    ? <MaterialIcons name={material} color={"#616161"} size={size} />
    : <Ionicons name={icon} color={iconButtonColor} size={size} />;

  return (Platform.OS == "android")
    ? <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackgroundBorderless(size - 2)} onPress={onPress}>
      <View>{iconElement}</View>
    </TouchableNativeFeedback>
    : <TouchableOpacity onPress={onPress}>{iconElement}</TouchableOpacity>;
}
