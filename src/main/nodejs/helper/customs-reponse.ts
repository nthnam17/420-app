import { IMainResponse, IMainResponseStatus, IResponsePayload } from '../types'

export const createResponse = <T>(
  key: string,
  status: IMainResponseStatus,
  payload: Partial<IResponsePayload<T>>
): IMainResponse<T> => {
  return {
    message: { key },
    status,
    payload
  }
}
