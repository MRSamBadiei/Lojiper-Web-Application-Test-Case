import { configureStore } from "@reduxjs/toolkit";
import userSelection from "./data/userSelection";

const store = configureStore({
  reducer: {
    userSelection: userSelection,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
