import { socket } from '@/app/layout';
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
    addItem: (state, action) => {
      const item: Product = action.payload;
      const existingItem = state.products.find(
        (product) => product.productId === item.productId
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
        state.totalAmount += item.quantity * item.price;
      } else {
        state.products.push(item);
        state.totalAmount += item.quantity * item.price;
      }
    },
    incrementItem: (state, action) => {
      const item: Product = action.payload;
      const existingItem = state.products.find(
        (product) => product.productId === item.productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalAmount += item.price;
      }
    },
    decrementItem: (state, action) => {
      const item: Product = action.payload;
      const existingItem = state.products.find(
        (product) => product.productId === item.productId
      );
      if (existingItem?.quantity == 1) {
        state.totalAmount -= item.price;
        state.products = state.products.filter(
          (product) => product.productId !== item.productId
        );
      } else if (existingItem) {
        existingItem.quantity -= 1;
        state.totalAmount -= item.price;
      }
    },
    removeItem: (state, action) => {
      const item: Product = action.payload;
      const existingItem = state.products.find(
        (product) => product.productId === item.productId
      );
      if (existingItem) {
        state.products = state.products.filter(
          (product) => product.productId !== item.productId
        );
        state.totalAmount -= item.quantity * item.price;
      }
    },
    clearCart: (state, action) => {
      state.products = [];
      state.totalAmount = 0;
    },
  },
});

export const {   } = cartSlice.actions;

export default cartSlice.reducer;
