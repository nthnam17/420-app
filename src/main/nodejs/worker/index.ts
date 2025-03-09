import { parentPort } from 'worker_threads'
import { JobManagers } from './job-manages'
import { Users } from '../../modules/entities/users.entity'
import { IKeyMessageWorker, IResultMessageWorker } from '../types/worker'

if (parentPort) {
  parentPort.on('message', async (data: IResultMessageWorker<any>) => {
    if (!data?.data) {
      console.log('Không có dữ liệu tài khoản')
      return
    }
    if (parentPort) {
      new JobManagers(parentPort).start(data?.data, data?.key)

      parentPort.postMessage('Thành công !!!')
    }
  })
}
