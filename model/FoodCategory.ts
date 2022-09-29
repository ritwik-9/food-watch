/** A colour theme for a food category. */
interface FoodCategoryColour {
  /** The accent colour, intended for use in background elements. */
  accent: string;
  /** The primary colour, intended for use in foreground elements. */
  primary: string;
}

export enum FoodCategory {
  Carbohydrate = "carb",
  Dairy = "dairy",
  Drink = "drink",
  Fish = "fish",
  Fruit = "fruit",
  Meat = "meat",
  Sweet = "sweet",
  Vegetable = "veg",
}

/** A map of food categories to corresponding colour themes. */
export const FOOD_CATEGORY_COLOURS: Record<FoodCategory, FoodCategoryColour> = {
  [FoodCategory.Carbohydrate]: {
    accent: "#FFAB91",
    primary: "#EF6C00",
  },

  [FoodCategory.Dairy]: {
    accent: "#FFCC80",
    primary: "#FF8F00",
  },

  [FoodCategory.Drink]: {
    accent: "#80CBC4",
    primary: "#00796B",
  },

  [FoodCategory.Fish]: {
    accent: "#90CAF9",
    primary: "#1565C0",
  },

  [FoodCategory.Fruit]: {
    accent: "#EF9A9A",
    primary: "#C62828",
  },

  [FoodCategory.Meat]: {
    accent: "#F48FB1",
    primary: "#D81B60",
  },

  [FoodCategory.Sweet]: {
    accent: "#CE93D8",
    primary: "#7B1FA2",
  },

  [FoodCategory.Vegetable]: {
    accent: "#A5D6A7",
    primary: "#388E3C",
  },
};

/** A map of food categories to corresponding Font Awesome 5 icon names. */
export const FOOD_CATEGORY_ICONS: Record<FoodCategory, string> = {
  [FoodCategory.Carbohydrate]: "bread-slice",
  [FoodCategory.Dairy]: "cheese",
  [FoodCategory.Drink]: "mug-hot",
  [FoodCategory.Fish]: "fish",
  [FoodCategory.Fruit]: "apple-alt",
  [FoodCategory.Meat]: "drumstick-bite",
  [FoodCategory.Sweet]: "cookie-bite",
  [FoodCategory.Vegetable]: "carrot",
};

/** A map of food categories to corresponding human-readable labels in English. */
export const FOOD_CATEGORY_LABELS: Record<FoodCategory, string> = {
  [FoodCategory.Carbohydrate]: "Cereals",
  [FoodCategory.Dairy]: "Dairy",
  [FoodCategory.Drink]: "Drinks",
  [FoodCategory.Fish]: "Fish",
  [FoodCategory.Fruit]: "Fruit",
  [FoodCategory.Meat]: "Meat",
  [FoodCategory.Sweet]: "Sweets",
  [FoodCategory.Vegetable]: "Veg",
};
