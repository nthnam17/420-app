import { createAsyncThunk } from '@reduxjs/toolkit'

interface userUpdateType {
  id: number
  name: string
  username: string
  password: string
  email: string
  status: number
}

const UpdateUser = createAsyncThunk('updateUser', async (payload: userUpdateType) => {
  const { ipcRenderer } = window.electron
  try {
    const response = await ipcRenderer.invoke('updateUser', payload)

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return
  }
})

export default UpdateUser
