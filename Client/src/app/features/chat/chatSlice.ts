import { CartState, ChatState, Product } from '@/app/types';
import { createSlice } from '@reduxjs/toolkit';
import { type } from 'os';


const initialState: ChatState = {
  isChatOpen: false,
  publicChat: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
    updateChat: (state, action) => {
      state.publicChat = action.payload;
    }
  },
});

export const {  toggleChat, updateChat } = chatSlice.actions;

export default chatSlice.reducer;
