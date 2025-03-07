import { parentPort } from 'worker_threads'

if (parentPort) {
  parentPort.on('message', (data) => {
    let result

    console.log(data, 'data')

    switch (data.type) {
      case 'task1':
        result = `Xử lý công việc ${data.payload}`
        break
      case 'task2':
        result = `Thực hiện ${data.payload}`
        break
      default:
        result = 'Công việc không xác định'
    }

    parentPort?.postMessage(result)
  })
}
