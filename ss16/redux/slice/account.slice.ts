import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Account {
  id: number;
  name: string;
  likes: number;
  isFavorite: boolean;
}

const initialState: Account[] = [
  { id: 1, name: "Vỹ", likes: 3, isFavorite: false },
  { id: 2, name: "Linh", likes: 1, isFavorite: true },
  { id: 3, name: "Khoa", likes: 0, isFavorite: false },
];

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const account = state.find((acc) => acc.id === action.payload);
      if (account) {
        account.isFavorite = !account.isFavorite;
        account.likes += account.isFavorite ? 1 : -1;
      }
    },
  },
});

export const { toggleFavorite } = accountSlice.actions;
export default accountSlice.reducer;
