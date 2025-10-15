import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "../slice/account.slice";
import counterSlice from "../slice/counter.slice";
import languageSlice from "../slice/language.slice";
import positionSlice from "../slice/position.slice";
import randomSlice from "../slice/random.slice";
import viewModeSlice from "../slice/view-mode.slice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    random: randomSlice,
    viewMode: viewModeSlice,
    accounts: accountSlice,
    language: languageSlice,
    position: positionSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;