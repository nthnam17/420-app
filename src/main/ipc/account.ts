import { ipcMain } from 'electron'
import { addUser, deleteUser, getListUsers, updateUser } from '../modules/model/users.models'
import { Users } from '../modules/entities/users.entity'

export const IpcMainAccount = (): void => {
  ipcMain.handle('fetchUsers', async (_, params: Users[]) => {
    const data = await getListUsers(params)
    return data
  })

  ipcMain.handle('account_create', async (_, payload: Users) => {
    const res = await addUser(payload)
    return res
  })

  ipcMain.handle('deleteUser', async (_, id) => {
    const res = await deleteUser(id)
    return res
  })

  ipcMain.handle('updateUser', async (_, payload: Users) => {
    const res = await updateUser(payload)
    return res
  })
}
