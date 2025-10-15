import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ViewMode = "grid" | "list";

interface ViewModeState {
  mode: ViewMode;
}

const initialState: ViewModeState = {
  mode: "list",
};

const viewModeSlice = createSlice({
  name: "viewMode",
  initialState,
  reducers: {
    toggleViewMode: (state) => {
      state.mode = state.mode === "list" ? "grid" : "list";
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleViewMode, setViewMode } = viewModeSlice.actions;
export default viewModeSlice.reducer;
