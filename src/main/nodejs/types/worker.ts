export interface IWorkerData {
  type: string
  data: unknown
}
export type IKeyMessageWorker =
  | 'seeding'
  | 'update_user'
  | 'close_all_chrome'
  | 'job_action_finally'
  | 'seeding_profile'
  | 'crawler'
  | 'post_tweet'
  | 'upload_media'

export interface IResultMessageWorker<T> {
  key: IKeyMessageWorker
  data?: T
}
