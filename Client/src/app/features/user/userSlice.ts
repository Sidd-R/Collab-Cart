import { User } from '@/app/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: User = {
    userId: "",
    userName: "",
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        addUser: (state,action) => {
            const item: User = action.payload;
            state.userId = item.userId;
            state.userName = item.userName;
        },
        removeUser: (state) => {
            state.userId = "";
            state.userName = "";
        }
    }
})

export default userSlice.reducer;