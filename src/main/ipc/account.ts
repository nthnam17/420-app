import { ipcMain } from 'electron'
import { CreateUsersDto, ListUsersDto, UpdateUsersDto } from '../modules/DTO/users.dto'
import { addUser, deleteUser, getListUsers, updateUser } from '../modules/services/users.service'

export const IpcMainAccount = (): void => {
  ipcMain.handle('fetchUsers', async (_, params: ListUsersDto) => {
    const data = await getListUsers(params)
    return data
  })

  ipcMain.handle('account_create', async (_, payload: CreateUsersDto) => {
    const res = await addUser(payload)
    return res
  })

  ipcMain.handle('deleteUser', async (_, id) => {
    const res = await deleteUser(id)
    return res
  })

  ipcMain.handle('updateUser', async (_, payload: UpdateUsersDto) => {
    const res = await updateUser(payload)
    return res
  })
}
