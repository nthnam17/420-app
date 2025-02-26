import { createAsyncThunk } from '@reduxjs/toolkit'

interface user {
  name: string
  username: string
  password: string
  email: string
  status: number
}

const AddUser = createAsyncThunk('addUser', async (payload: user) => {
  const { ipcRenderer } = window.electron
  try {
    const response = await ipcRenderer.invoke('addUser', payload)

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
