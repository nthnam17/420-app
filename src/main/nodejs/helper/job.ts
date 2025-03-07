import path from 'path'
import { Worker } from 'worker_threads'

export const initializeWorker = (workerData: number): Worker => {
  const worker = new Worker(require.resolve(path.resolve('./src/main/nodejs/worker/index.ts')), {
    workerData: workerData
  })

  console.log('job init')

  worker.on('message', (msg) => console.log(`Worker ${msg.id}:`, msg.status))
  worker.on('error', (err) => console.error(`Worker error:`, err))
  worker.on('exit', (code) => console.log(`Worker exited with code ${code}`))

  return worker
}
