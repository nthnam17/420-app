import { ipcRendererInvoke } from '../../main/nodejs/helper/customs-ipc'
import { ActionArgRoutes, IIpcCustomRenderer } from '../types'

export const IpcRendererActions: IIpcCustomRenderer<ActionArgRoutes> = {
  start: async () => ipcRendererInvoke('action_start', ''),
  stop: async (payload) => ipcRendererInvoke('action_stop', payload),
  await: async (payload) => ipcRendererInvoke('action_await', payload)
}
