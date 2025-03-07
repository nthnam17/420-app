import { IpcMainAccount, IpcMainActions } from '../ipc'
import { Worker } from 'node:worker_threads'
import workerPath from '@main/nodejs/worker/index?modulePath'
import { IWorkerData } from '../nodejs/types/worker'

export const registerIPC = (): void => {
  IpcMainAccount()
  IpcMainActions()
}

export const createWorker = (type: string, workerData: IWorkerData): void => {
  const workerOptions = { workerData: workerData }
  const worker = new Worker(workerPath, workerOptions)
  worker.on('message', (message) => {
    console.log(`Worker Message: ${message}`)
  })

  worker.on('error', (err) => {
    console.error(`Worker Error: ${err.message}`)
  })

  worker.on('exit', (code) => {
    console.log(`Worker exited with code ${code}`)
  })
}
