import { Platform, PlatformColor, StyleSheet } from "react-native";
import { FoodCategory } from "./FoodCategory";

const ONE_SECOND = 1000,
  ONE_MINUTE = 60 * ONE_SECOND,
  ONE_HOUR = 60 * ONE_MINUTE,
  ONE_DAY = 24 * ONE_HOUR;

/**
 * A representation of a food item which may be stored in the pantry.
 */
export interface FoodItem {
  /** The category of the food item. */
  category: FoodCategory;
  /** When the food item expires, as an ISO timestamp. */
  expires: string;
  /** The name of the food item. */
  label: string;
  /** Additional notes about the food item. */
  notes?: string;
  /** The food item's quantity, e.g. 500g or 2L. */
  quantity?: string;
  /** The remaining proportion of the original quantity. */
  remaining: number;
}

/**
 * Gets the style corresponding to the expiry state of a food item.
 * @param item The item to get the style for.
 * @returns A red style if the item has expired, an orange style if the item is expiring within 5 days, or neutral otherwise.
 */
export function getItemStyle(item: FoodItem) {
  if (isExpired(item)) return styles.red;
  else if (isCloseToExpiry(item)) return styles.orange;
  else return;
}

/**
 * Checks whether a food item has expired.
 * @param item The food item to check.
 * @returns True if the item has expired, false otherwise.
 */
export function isExpired(item: FoodItem): boolean {
  return new Date(item.expires).getTime() <= Date.now();
}

/**
 * Checks whether a food item will expire within the provided time period.
 * @param item The food item to check.
 * @param remaining The time period to check for, defaults to 5 days.
 * @returns True if the food item will expire within the time period, false otherwise.
 */
export function isCloseToExpiry(item: FoodItem, remaining: number = 5 * ONE_DAY): boolean {
  return new Date(item.expires).getTime() - Date.now() < remaining;
}

const styles = StyleSheet.create({
  orange: {
    color: (Platform.OS == "ios") ? PlatformColor("systemOrange") : PlatformColor("@android:color/holo_orange_dark"),
  },
  
  red: {
    color: (Platform.OS == "ios") ? PlatformColor("systemRed") : PlatformColor("@android:color/holo_red_light"),
  },
});
