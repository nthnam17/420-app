import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionApi } from '@renderer/api/actions'

const createTweet = createAsyncThunk('createTweet', async () => {
  try {
    const response = await ActionApi.createTweet('')

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return
  }
})

export default createTweet
