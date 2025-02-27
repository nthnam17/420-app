import { parentPort, workerData } from 'worker_threads'
import fs from 'fs'
import readline from 'readline'

async function countLines(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    let lineCount = 0
    const fileStream = fs.createReadStream(filePath)
    const rl = readline.createInterface({ input: fileStream })

    rl.on('line', () => lineCount++)
    rl.on('close', () => resolve(lineCount))
    rl.on('error', (err) => reject(err))
  })
}

countLines(workerData.filePath)
  .then((count) => parentPort?.postMessage({ success: true, lines: count }))
  .catch((err) => parentPort?.postMessage({ success: false, error: err.message }))
