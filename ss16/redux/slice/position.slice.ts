import {
  createPosition,
  deletePosition,
  getAllPosition,
  getPosition,
  togglePositionStatus,
  updatePosition,
} from "@/apis/position.apis";
import { Position } from "@/interfaces/position.interface";
import { createSlice } from "@reduxjs/toolkit";

interface PositionState {
  data: Position[];
  selected?: Position | null;
  status: "IDLE" | "PENDING" | "FULFILLED" | "FAILED";
  error?: string | null;
}

const initialState: PositionState = {
  data: [],
  selected: null,
  status: "IDLE",
  error: null,
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    resetSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosition.pending, (state) => {
        state.status = "PENDING";
      })
      .addCase(getAllPosition.fulfilled, (state, action) => {
        state.status = "FULFILLED";
        state.data = action.payload.data;
      })
      .addCase(getAllPosition.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.payload?.message || action.error.message || null;
      })
      .addCase(getPosition.pending, (state) => {
        state.status = "PENDING";
      })
      .addCase(getPosition.fulfilled, (state, action) => {
        state.status = "FULFILLED";
        state.selected = action.payload.data;
      })
      .addCase(getPosition.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.payload?.message || action.error.message || null;
      })
      .addCase(createPosition.pending, (state) => {
        state.status = "PENDING";
      })
      .addCase(createPosition.fulfilled, (state, action) => {
        state.status = "FULFILLED";
        state.data.push(action.payload.data);
      })
      .addCase(createPosition.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.payload?.message || action.error.message || null;
      })
      .addCase(updatePosition.pending, (state) => {
        state.status = "PENDING";
      })
      .addCase(updatePosition.fulfilled, (state, action) => {
        state.status = "FULFILLED";
        const index = state.data.findIndex(
          (p: Position) => p.id === action.payload.data.id
        );
        if (index !== -1) state.data[index] = action.payload.data;
      })
      .addCase(updatePosition.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.payload?.message || action.error.message || null;
      })
      .addCase(deletePosition.pending, (state) => {
        state.status = "PENDING";
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.status = "FULFILLED";
        state.data = state.data.filter(
          (p: Position) => p.id !== action.meta.arg
        );
      })
      .addCase(deletePosition.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.payload?.message || action.error.message || null;
      })
      .addCase(togglePositionStatus.fulfilled, (state, action) => {
        const updated = action.payload.data;
        const index = state.data.findIndex(
          (p: Position) => p.id === updated.id
        );
        if (index !== -1) {
          state.data[index] = updated;
        }
      });
  },
});

export const { resetSelected } = positionSlice.actions;
export default positionSlice.reducer;
