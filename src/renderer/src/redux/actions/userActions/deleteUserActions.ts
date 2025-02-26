import { createAsyncThunk } from '@reduxjs/toolkit'

const DeleteUser = createAsyncThunk('deleteUser', async (id: number) => {
  const { ipcRenderer } = window.electron
  try {
    const response = await ipcRenderer.invoke('deleteUser', id)

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return
  }
})

export default DeleteUser
