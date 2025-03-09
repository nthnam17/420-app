export type IMainResponseStatus = 'success' | 'error'

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
