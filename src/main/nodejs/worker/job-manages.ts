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

    await this.initModule(page, 'seeding', userData)
  }

  private async initModule(page: Page, type: string, userData: Users): Promise<void> {
    await login(page, userData)

    switch (type) {
      case 'seeding':
        return await Seeding(page)
      default:
        return console.log('defaul case')
    }
  }
}
