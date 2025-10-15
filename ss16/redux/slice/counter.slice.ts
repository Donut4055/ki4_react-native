import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increase: (state) => state + 1,
    decrease: (state) => state - 1,
    reset: (state) => (state = 0),
  },
});

export default counterSlice.reducer;
export const { increase, decrease, reset } = counterSlice.actions;
