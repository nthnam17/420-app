export type IMainResponseStatus = 'success' | 'error'

export type IKeyMessageWorker = 'start_worker' | 'stop_worker' | 'await_worker'

export interface IResponsePayload<T> {
  data: T
  total: number
  lives: number
  dies: number
  pageTotal: number
  pageSize: number
}

export interface IMainResponse<T> {
  status: IMainResponseStatus
  message: { key: string }
  payload: Partial<IResponsePayload<T>> | null
}

export interface IResultMessageWoker<T> {
  key: IKeyMessageWorker
  data?: T
}
