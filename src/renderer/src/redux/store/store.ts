import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../actions/counterSlice'
import { authReducer } from '../slice/authSlice'
import { usersReducer } from '../slice/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: usersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
