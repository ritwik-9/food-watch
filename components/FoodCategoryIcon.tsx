import { FontAwesome5 } from "@expo/vector-icons";
import { StyleProp, View, ViewStyle } from "react-native";
import { FoodCategory, FOOD_CATEGORY_COLOURS, FOOD_CATEGORY_ICONS } from "../model/FoodCategory";

interface FoodCategoryIconProps {
  /** The category to render an icon for. */
  category: FoodCategory;
  /**
   * Whether to invert the colour scheme, using the primary colour for the background and the accent colour for the icon. Defaults to false.
   * 
   * Intended for use in a selected or highlighted state.
   */
  invert?: boolean;
  /** The size the icon should be rendered at. The background is scaled proportionately. Defaults to 32. */
  size?: number;
  /** Additional styles to apply to the background view. Intended to be used for positioning the icon. */
  style?: StyleProp<ViewStyle>;
}

/**
 * A reusable food category icon component, which renders the correct icon for a food category inside of a coloured square.
 */
export default function FoodCategoryIcon({ category, invert = false, size = 32, style }: FoodCategoryIconProps) {
  const colours = FOOD_CATEGORY_COLOURS[category],
    borderRadius = size / 4,
    padding = size * 3 / 4;
  
  return (
    <View style={[{ backgroundColor: invert ? colours.primary : colours.accent, borderRadius, padding }, style]}>
      <FontAwesome5 name={FOOD_CATEGORY_ICONS[category]} size={size} color={invert ? colours.accent : colours.primary}></FontAwesome5>
    </View>
  );
}
