import { CartState, Product } from '@/app/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CartState = {
  products: [],
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state = action.payload;
    },
  },
});

export const {   } = cartSlice.actions;

export default cartSlice.reducer;
