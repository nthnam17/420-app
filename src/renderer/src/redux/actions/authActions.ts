import { createAsyncThunk } from '@reduxjs/toolkit'

interface loginData {
  username: string
  password: string
}

const Login = createAsyncThunk('login', async (data: loginData) => {
  const { ipcRenderer } = window.electron
  try {
    const response = await ipcRenderer.invoke('login', data)

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return
  }
})

export default Login
