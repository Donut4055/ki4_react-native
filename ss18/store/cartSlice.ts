import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  productId?: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  totalItems: number;
}

interface SetCartItemsPayload {
  items: CartItem[];
  total: number;
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      state.totalQuantity += 1;
      state.totalAmount += action.payload.price;
      state.totalItems = state.items.length;
    },
    
    removeItemFromCart(state, action: PayloadAction<number>) {
      const existingItem = state.items.find(item => item.id === action.payload);
      
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== action.payload);
        } else {
          existingItem.quantity -= 1;
        }
        
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.price;
        state.totalItems = state.items.length;
      }
    },
    
    removeAllItemsFromCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.totalItems = 0;
    },
    
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.totalItems = 0;
    },
    
    updateItemQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        const quantityDiff = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += quantityDiff * existingItem.price;
      }
    },
    
    setCartItems(state, action: PayloadAction<SetCartItemsPayload>) {
      state.items = action.payload.items;
      state.totalAmount = action.payload.total;
      state.totalItems = action.payload.totalItems;
      state.totalQuantity = action.payload.items.reduce(
        (total, item) => total + item.quantity, 
        0
      );
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  removeAllItemsFromCart,
  updateItemQuantity,
  clearCart,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
