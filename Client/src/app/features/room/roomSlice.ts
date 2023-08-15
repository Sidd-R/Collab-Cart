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
      state.admin =   action.payload.userId;
    },
    joinRoom: (state,action) => {
      state.roomId = action.payload.roomId;
    },
    updateRoom: (state,action) => {
      state.users = action.payload.users2;
      state.admin = action.payload.admin2;      
    }
  },
});

export const { createRoom, joinRoom, updateRoom  } = roomSlice.actions;

export default roomSlice.reducer;
