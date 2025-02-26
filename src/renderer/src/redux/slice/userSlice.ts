import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import FetchUsers from '../actions/userActions/fetchUserActions'
import AddUser from '../actions/userActions/addUserActions'
import DeleteUser from '../actions/userActions/deleteUserActions'
import UpdateUser from '../actions/userActions/updateUserActions'
interface User {
  name: string
  username: string
  password: string
  email: string
  status: number
}

interface listUserType {
  id: number
  name: string
  username: string
  password: string
  email: string
  status: number
}
const initialState = {
  listUser: [] as any,
  isError: false,
  isLoading: false
}

export const userSlice = createSlice({
  name: 'fetchUser',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.listUser = { ...state.listUser, ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(FetchUsers.pending, (state) => {
      state.isError = false
      state.isLoading = true
    })
    builder.addCase(FetchUsers.fulfilled, (state, action) => {
      state.listUser = action.payload
      state.isLoading = false
    })
    builder.addCase(FetchUsers.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })
    builder.addCase(AddUser.pending, (state) => {
      state.isError = false
      state.isLoading = true
    })
    builder.addCase(AddUser.fulfilled, (state, action) => {
      state.listUser = [...state.listUser, action.payload] as never[]
      state.isLoading = false
    })
    builder.addCase(AddUser.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })
    builder.addCase(DeleteUser.pending, (state) => {
      state.isError = false
      state.isLoading = true
    })
    builder.addCase(DeleteUser.fulfilled, (state, action) => {
      state.listUser = state.listUser.filter((user) => user?.id !== action.payload.id)
      state.isLoading = false
    })
    builder.addCase(DeleteUser.rejected, (state) => {
      state.isError = true
      state.isLoading = false
    })
    builder.addCase(UpdateUser.pending, (state) => {
      state.isError = false
      state.isLoading = true
    })
    builder.addCase(UpdateUser.fulfilled, (state, action) => {
      const updatedData = action.payload
      state.listUser = state.listUser.map((employee) => {
        if (employee.id === updatedData.id) {
          return updatedData
        }
        return employee
      })
      state.isLoading = false
    })
    builder.addCase(UpdateUser.rejected, (state) => {
      state.isError = false
      state.isLoading = false
    })
  }
})

export const { actions: usersActions, reducer: usersReducer } = userSlice
