import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import postsReducer from './features/postsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        userReducer,
        postsReducer
    }
  })
}