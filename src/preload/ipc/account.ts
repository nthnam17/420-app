import { ipcRendererInvoke } from '../../main/nodejs/helper/customs-ipc'
import { AccArgRoutes, IIpcCustomRenderer } from '../../main/nodejs/types'

export const IpcRendererAccount: IIpcCustomRenderer<AccArgRoutes> = {
  create: async (payload) => ipcRendererInvoke('account_create', payload),
  update: async (payload) => ipcRendererInvoke('account_update', payload),
  fetch: async (payload) => ipcRendererInvoke('account_fetch', payload),
  delete: async (payload) => ipcRendererInvoke('account_delete', payload)
}
