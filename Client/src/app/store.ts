'use client'
import { configureStore } from '@reduxjs/toolkit'
import roomReducer from './features/room/roomSlice'
import cartReducer from './features/cart/cartSlice'
import userReducer from './features/user/userSlice'

export const store = configureStore({
  reducer: {
    room: roomReducer,
    cart: cartReducer,
    user: userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch