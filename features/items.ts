import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodCategory } from "../model/FoodCategory";
import { FoodItem } from "../model/FoodItem";

interface ItemsState {
  items: FoodItem[];
}

const initialState: ItemsState = {
  items: [
    { category: FoodCategory.Dairy, expires: (new Date(2022, 1, 17)).toISOString(), label: "Milk", quantity: "2L", remaining: .75 },
    { category: FoodCategory.Dairy, expires: (new Date(2022, 3, 7)).toISOString(), label: "Cheese", remaining: .5 },
    { category: FoodCategory.Meat, expires: (new Date(2022, 1, 19)).toISOString(), label: "Ham", remaining: 1 },
  ],
};

export default createSlice({
  name: "items",
  initialState,

  reducers: {
    add: (state, { payload }: PayloadAction<FoodItem>) => {
      state.items.push(payload);
    },

    remove: (state, { payload }: PayloadAction<number>) => {
      state.items.splice(payload, 1);
    },

    update: (state, { payload: [index, item] }: PayloadAction<[number, FoodItem]>) => {
      state.items.splice(index, 1, item);
    },
  },
});
