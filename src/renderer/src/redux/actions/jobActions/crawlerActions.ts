import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionApi } from '@renderer/api/actions'

const crawler = createAsyncThunk('crawler', async () => {
  try {
    const response = await ActionApi.crawler('')

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return
  }
})

export default crawler
