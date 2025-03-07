import { IpcMainAccount, IpcMainActions } from '../ipc'
import createWorkerNode from '@main/nodejs/worker/index?nodeWorker'
import { IWorkerData } from '../nodejs/types/worker'

export const registerIPC = (): void => {
  IpcMainAccount()
  IpcMainActions()
}

export const createWorker = (type: string, workerData: IWorkerData): void => {
  const worker = createWorkerNode({
    workerData: { workerData }
  })
  worker.on('message', (message) => {
    console.log(`Worker Message: ${message}`)
  })

  worker.on('error', (err) => {
    console.error(`Worker Error: ${err.message}`)
  })

  worker.on('exit', (code) => {
    console.log(`Worker exited with code ${code}`)
  })

  worker.postMessage('Hello from main thread!')
}
