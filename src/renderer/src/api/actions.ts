import { ActionArgRoutes, IIpcCustomRenderer } from '@preload/types'
export const ActionApi: IIpcCustomRenderer<ActionArgRoutes> = {
  start: async () => window.api.action.start(''),
  stop: async (payload) => window.api.action.stop(payload),
  await: async (payload) => window.api.action.await(payload)
}
