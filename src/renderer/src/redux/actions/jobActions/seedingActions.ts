import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionApi } from '@renderer/api/actions'

const seeding = createAsyncThunk('seeding', async () => {
  try {
    const response = await ActionApi.seeding('')

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return
  }
})

export default seeding
