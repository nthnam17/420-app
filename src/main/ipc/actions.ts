import { ipcMain } from 'electron'
import { getOneUser } from '../modules/model/users.models'
import { createWorker } from '../nodejs/helper/job'

export const IpcMainActions = (): void => {
  ipcMain.handle('action_seeding', async (_, type, payload) => {
    const lstUser = await getOneUser(1)
    if (!lstUser) {
      return
    }
    createWorker(lstUser, 'seeding')
  })

  ipcMain.handle('action_seeding_profile', async (_, type, payload) => {
    const lstUser = await getOneUser(1)
    if (!lstUser) {
      return
    }
    createWorker(lstUser, 'seeding_profile')
  })

  ipcMain.handle('action_crawler', async (_, type, payload) => {
    const lstUser = await getOneUser(1)
    if (!lstUser) {
      return
    }
    createWorker(lstUser, 'crawler')
  })

  ipcMain.handle('action_createTweet', async (_, type, payload) => {
    const lstUser = await getOneUser(1)
    if (!lstUser) {
      return
    }
    createWorker(lstUser, 'post_tweet')
  })
}
