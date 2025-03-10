import { ActionArgRoutes, IIpcCustomRenderer } from '@preload/types'
export const ActionApi: IIpcCustomRenderer<ActionArgRoutes> = {
  start: async () => window.api.action.start(''),
  stop: async (payload) => window.api.action.stop(payload),
  await: async (payload) => window.api.action.await(payload),
  seeding: async () => window.api.action.seeding(''),
  seeding_profile: async () => window.api.action.seeding_profile(''),
  crawler: async () => window.api.action.crawler(''),
  createTweet: async () => window.api.action.createTweet('')
}
