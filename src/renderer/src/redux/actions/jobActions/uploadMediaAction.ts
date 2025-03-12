import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionApi } from '@renderer/api/actions'

const uploadMedia = createAsyncThunk('uploadMedia', async () => {
  try {
    const response = await ActionApi.uploadMedia('')

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return
  }
})

export default uploadMedia
