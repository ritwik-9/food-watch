import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodCategory } from "../model/FoodCategory";
import { ShopItem } from "../model/ShopItem";

interface ShopItemsState {
  shopItems: ShopItem[];
}

const initialState: ShopItemsState = {
  shopItems: [
    { category: FoodCategory.Dairy, label: "Milk" },
    { category: FoodCategory.Dairy, label: "Cheese" },
    { category: FoodCategory.Meat, label: "Ham" },
    { category: FoodCategory.Drink, label: "Tea" },
    { category: FoodCategory.Vegetable, label: "Carrot" },
    { category: FoodCategory.Vegetable, label: "Potato" },
    { category: FoodCategory.Vegetable, label: "Broccoli" },
  ],
};

export default createSlice({
  name: "shopItems",
  initialState,

  reducers: {
    add: (state, action: PayloadAction<ShopItem>) => {
      state.shopItems.push(action.payload);
    },

    remove: (state, action: PayloadAction<number>) => {
      state.shopItems.splice(action.payload, 1);
    },
  },
});
