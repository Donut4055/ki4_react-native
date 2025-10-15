import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: number[] = [];

const randomSlice = createSlice({
  name: "random",
  initialState,
  reducers: {
    addRandomNumber: (state, action: PayloadAction<number>) => {
      state.push(action.payload);
    },
    randomReset: () => initialState,
  },
});

export const { addRandomNumber, randomReset } = randomSlice.actions;
export default randomSlice.reducer;
