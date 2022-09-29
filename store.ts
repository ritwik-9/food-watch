import { configureStore } from "@reduxjs/toolkit";
import items from "./features/items";
import shopItems from "./features/shopItems";

const store = configureStore({
  reducer: {
    items: items.reducer,
    shopItems: shopItems.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
