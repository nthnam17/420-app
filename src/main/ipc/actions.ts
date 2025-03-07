import { ipcMain } from 'electron'
import { createWorker } from '../boot'

export const IpcMainActions = (): void => {
  ipcMain.handle('action_start', async (_, type, payload) => {
    const result = await createWorker('task1', payload)
    return result
  })
}
