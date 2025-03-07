import { ipcMain } from 'electron'
import { createWorker } from '../boot'
import { JobManagers } from '../nodejs/worker/job-manages'
import { getOneUser } from '../modules/services/users.service'

export const IpcMainActions = (): void => {
  ipcMain.handle('action_start', async (_, type, payload) => {
    const lstUser = await getOneUser(1)

    if (lstUser) {
      return new JobManagers().seeding(lstUser)
    } else {
      console.log('Không có dữ liệu')
    }
  })
}
