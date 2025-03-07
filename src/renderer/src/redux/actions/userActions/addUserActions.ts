import { createAsyncThunk } from '@reduxjs/toolkit'
import { AccountApi } from '@renderer/api/account'

interface user {
  name: string
  username: string
  password: string
  email: string
  status: boolean
  phone: string
  token: string
  cookie: string
}

const AddUser = createAsyncThunk('addUser', async (payload: user) => {
  try {
    const response = await AccountApi.create(payload)

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return
  }
})

export default AddUser
