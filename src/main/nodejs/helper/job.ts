import { IKeyMessageWorker, IResultMessageWorker } from '../types/worker'
import { MessagePort, Worker } from 'node:worker_threads'
import createWorkerNode from '@main/nodejs/worker/index?nodeWorker'
import { Users } from '../../modules/entities/users.entity'

export const createWorker = (data: Users, type: IKeyMessageWorker) => {
  const worker = createWorkerNode({
    workerData: { data: data, type: type }
  })

  worker.on('message', (message) => handleWorkerMessage(worker, message))

  worker.on('error', (err) => {
    console.error(`Worker Error: ${err.message}`)
  })

  worker.on('exit', (code) => {
    console.log(`Worker exited with code ${code}`)
  })

  sendMessageToWorker(worker, { data: data, key: type })
}

export const sendMessageToWorker = <T>(worker: Worker, payload: IResultMessageWorker<T>): void =>
  worker.postMessage(payload)

export const sendMessageToMain = <T>(
  parentPort: MessagePort,
  payload: IResultMessageWorker<T>
): void => parentPort.postMessage(payload)

const handleWorkerMessage = async (
  worker: Worker,
  { key, data }: IResultMessageWorker<unknown>
): Promise<void> => {
  switch (key) {
    case 'job_action_finally': {
      worker.terminate()
      break
    }
  }
}
