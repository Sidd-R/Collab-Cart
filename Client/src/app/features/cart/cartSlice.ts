import { CartState, Product } from '@/app/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CartState = {
  products: [],
  totalAmount: 0,
  personalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.products = action.payload.cart.products;
      state.totalAmount = action.payload.cart.totalAmount;
      let amount = 0;
      state.products.forEach((product: Product) => {
        if (product.contributors.find((user) => user.userId === action.payload.userId)) {
          amount += ((product.price)/product.contributors.length)*product.quantity;
        }
      })
      state.personalAmount = amount;
    },
  },
});

export const { updateCart  } = cartSlice.actions;

export default cartSlice.reducer;
