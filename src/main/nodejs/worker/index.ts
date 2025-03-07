import { parentPort, workerData } from 'worker_threads'
import puppeteer from 'puppeteer'
import { getOneUser } from '../../modules/services/users.service'
import { JobManagers } from './job-manages'
import { Users } from '../../modules/entities/users.entity'

// export const run = async () => {
//   const browser = await puppeteer.launch({ headless: false })
//   const page = await browser.newPage()
//   await page.goto(workerData.url)

//   const title = await page.title()
//   await browser.close()

//   return title
// }

if (parentPort) {
  parentPort.on('message', async (lstUser: Users) => {
    // const result = await run()

    if (!lstUser) {
      console.log('Không có dữ liệu')
      return
    }
    new JobManagers().seeding(lstUser)
    if (parentPort) {
      parentPort.postMessage('Thành công !!!')
    }
  })
}
