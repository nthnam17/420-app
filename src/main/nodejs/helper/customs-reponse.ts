import { MessagePort, Worker } from 'node:worker_threads'
import { IMainResponse, IMainResponseStatus, IResponsePayload, IResultMessageWoker } from '../types'

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

export const sendMessageToWorker = <T>(worker: Worker, payload: IResultMessageWoker<T>): void =>
  worker.postMessage(payload)

export const sendMessageToMain = <T>(
  parentPort: MessagePort,
  payload: IResultMessageWoker<T>
): void => parentPort.postMessage(payload)
