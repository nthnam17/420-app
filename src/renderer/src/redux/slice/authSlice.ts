import { createSlice } from '@reduxjs/toolkit'
import Login from '../actions/authActions'

const initialState = {
  auth: [{ username: '1111', password: '1111' }],
  isError: false,
  isLoading: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = { ...state.auth, ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(Login.pending, (state) => {
      state.isError = false
      state.isLoading = true
    })
    builder.addCase(Login.fulfilled, (state, action) => {
      state.auth = action.payload
      state.isLoading = false
    })
    builder.addCase(Login.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })
  }
})

export const { actions: authActions, reducer: authReducer } = authSlice
