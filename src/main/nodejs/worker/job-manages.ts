import puppeteer, { Browser, Page } from 'puppeteer'
// import { logger } from '../helper/logger'
import { MessagePort, workerData } from 'worker_threads'
import { Users } from '../../modules/entities/users.entity'
import { login } from '../actions/auth'
import { Seeding } from '../actions/seeding'
import { sendMessageToMain } from '../helper/job'
import { IKeyMessageWorker } from '../types/worker'
import { seedingProfile } from '../actions/seeding-profile'
import { crawler } from '../actions/crawler'
import { postTweet } from '../actions/post'
import { uploadMedia } from '../actions/upload-media'
import { seedingWithApi } from '../actions/seeding/seeding-api'
import { favoritesTweet } from '../actions/favorites-tweet'
import { reTweet } from '../actions/retweet'
// import { IPreixActions } from '../types/worker'

export class JobManagers {
  private parentPort: MessagePort

  constructor(parentPort: MessagePort) {
    this.parentPort = parentPort
  }
  public async start(userData: Users, type: IKeyMessageWorker): Promise<void> {
    const browser = await puppeteer.launch({ headless: false, devtools: true })

    const module = await this.initModule(userData, browser, type)

    if (!module) {
      console.error('lỗi module')
    }
  }

  private async initModule(
    account: Users,
    browser: Browser,
    type: IKeyMessageWorker
  ): Promise<boolean> {
    try {
      console.log(`[Khởi tạo module thành công`)
      const page = await login(browser, account)

      console.log(type)

      switch (type) {
        case 'seeding':
          // await seedingWithApi(page)
          // await favoritesTweet(page)
          await reTweet(page)
          break
        case 'seeding_profile':
          await seedingProfile(page)
          await Seeding(page)
          break

        case 'crawler':
          await crawler(page)
          break

        case 'post_tweet':
          await postTweet(page)
          break

        case 'upload_media':
          await uploadMedia(page)
          break
      }

      // sendMessageToMain(this.parentPort, { key: 'job_action_finally', data: dataUserUpdate })

      // browser.close()

      return true
    } catch (error) {
      console.error(`[Lỗi khởi tạo module]:  ${error}`)
      return false
    }
  }
}
