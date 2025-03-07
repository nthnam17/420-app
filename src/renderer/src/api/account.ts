import { AccArgRoutes, IIpcCustomRenderer } from '@preload/types'
export const AccountApi: IIpcCustomRenderer<AccArgRoutes> = {
  create: async (payload) => window.api.account.create(payload),
  update: async (payload) => window.api.account.update(payload),
  fetch: async (payload) => window.api.account.fetch(payload),
  delete: async (payload) => window.api.account.delete(payload)
}
