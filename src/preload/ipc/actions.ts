import { ipcRendererInvoke } from '../../main/nodejs/helper/customs-ipc'
import { ActionArgRoutes, IIpcCustomRenderer } from '../types'

export const IpcRendererActions: IIpcCustomRenderer<ActionArgRoutes> = {
  start: async () => ipcRendererInvoke('action_start', ''),
  seeding: async () => ipcRendererInvoke('action_seeding', ''),
  seeding_profile: async () => ipcRendererInvoke('action_seeding_profile', ''),
  stop: async (payload) => ipcRendererInvoke('action_stop', payload),
  await: async (payload) => ipcRendererInvoke('action_await', payload),
  crawler: async () => ipcRendererInvoke('action_crawler', '')
}
