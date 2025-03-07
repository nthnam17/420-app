import puppeteer, { Page } from 'puppeteer'
// import { logger } from '../helper/logger'
// import { parentPort, workerData } from 'node:worker_threads'
import { Users } from '../../modules/entities/users.entity'
import { login } from '../actions/auth'
import { Seeding } from '../actions/seeding'

export class JobManagers {
  public async seeding(userData: Users): Promise<void> {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto('https://x.com', { waitUntil: 'networkidle2' })

    await page.waitForNetworkIdle({ idleTime: 3000 })

    const moduleSeeding = await this.initModule(userData, page, 'seeding')

    if (!moduleSeeding) {
      console.error('lỗi module')
    }
  }

  private async initModule(account: Users, page: Page, type: string): Promise<boolean> {
    try {
      console.log(`[Khởi tạo module thành công`)
      await login(page, account)

      switch (type) {
        case 'seeding':
          await Seeding(page)
      }

      return true
    } catch (error) {
      console.error(`[Lỗi khởi tạo module]:  ${error}`)
      return false
    }
  }
}
