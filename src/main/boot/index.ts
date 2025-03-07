import { workerData } from 'node:worker_threads'
import { IpcMainAccount, IpcMainActions } from '../ipc'
import createWorkerNode from '@main/nodejs/worker/index?nodeWorker'
import { Users } from '../modules/entities/users.entity'
// import { IWorkerData } from '../nodejs/types/worker'

export const registerIPC = (): void => {
  IpcMainAccount()
  IpcMainActions()
}

// export const createWorker = (type: string, workerData: IWorkerData): void => {
//   const worker = createWorkerNode({
//     workerData: { workerData }
//   })
//   worker.on('message', (message) => {
//     console.log(`Worker Message: ${message}`)
//   })

//   worker.on('error', (err) => {
//     console.error(`Worker Error: ${err.message}`)
//   })

//   worker.on('exit', (code) => {
//     console.log(`Worker exited with code ${code}`)
//   })

//   worker.postMessage('Hello from main thread!')
// }

export const createWorker = (data: Users) => {
  const worker = createWorkerNode({
    workerData: { data: data }
  })

  worker.on('message', (message) => {
    console.log('Title from worker:', message)
  })

  worker.postMessage('start')
}
