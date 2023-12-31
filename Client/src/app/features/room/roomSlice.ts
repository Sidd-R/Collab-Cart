import { socket } from '@/app/layout';
import { RoomState } from '@/app/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: RoomState = {
  roomId: '',
  admin: { userId: '', userName: '' },
  users: [],
};


export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    createRoom: (state,action) => {
      state.roomId = action.payload.roomId;
    },
    joinRoom: (state,action) => {
      state.roomId = action.payload;
    },
    updateRoom: (state,action) => {      
      state.admin = action.payload.admin;
      state.users = action.payload.users;
    }
  },
});

export const { createRoom, joinRoom, updateRoom  } = roomSlice.actions;

export default roomSlice.reducer;
