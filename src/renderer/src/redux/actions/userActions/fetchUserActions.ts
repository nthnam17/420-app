import { createAsyncThunk } from '@reduxjs/toolkit'

interface ParamsUser {
  keyword: string
}

const FetchUsers = createAsyncThunk('fetchUser', async (params: ParamsUser) => {
  const { ipcRenderer } = window.electron
  try {
    const response = await ipcRenderer.invoke('fetchUsers', params)

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return
  }
})

export default FetchUsers
