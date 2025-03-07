import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionApi } from '@renderer/api/actions'

const startJob = createAsyncThunk('startJob', async () => {
  try {
    const response = await ActionApi.start('')

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return
  }
})

export default startJob
