import { createSlice } from "@reduxjs/toolkit";

export type Language = "en" | "vi";

interface LanguageState {
  current: Language;
}

const initialState: LanguageState = {
  current: "en",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.current = state.current === "en" ? "vi" : "en";
    },
    setLanguage: (state, action: { payload: Language }) => {
      state.current = action.payload;
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
