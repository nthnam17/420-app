import { dialog, ipcMain } from 'electron'
import { Worker } from 'worker_threads'

const hanldeFileWork = () => {
  // Mở hộp thoại chọn file
  ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openFile'] })
    return result.filePaths[0] || null
  })

  // Gửi file path vào Worker để xử lý
  ipcMain.handle('process-file', async (_event, filePath) => {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL('./worker.ts', import.meta.url), {
        workerData: { filePath }
      })

      worker.on('message', (message) => {
        if (message.success) {
          resolve(message.lines)
        } else {
          reject(new Error(message.error))
        }
      })

      worker.on('error', reject)
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker exited with code ${code}`))
      })
    })
  })
}

export default hanldeFileWork
