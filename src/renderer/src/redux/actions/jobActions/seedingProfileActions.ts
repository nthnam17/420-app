import { createAsyncThunk } from '@reduxjs/toolkit'
import { ActionApi } from '@renderer/api/actions'

const seedingProfile = createAsyncThunk('seedingProfile', async () => {
  try {
    const response = await ActionApi.seeding_profile('')

    if (!response) {
      return
    }

    return response
  } catch (e) {
    console.log(e)
    return
  }
})

export default seedingProfile
