import { Page } from 'puppeteer'
import { interceptHeaders, postTweetApi } from '../../helper/actions'

export const postTweet = async (page: Page) => {
  await page.waitForNetworkIdle({ idleTime: 1000 })

  const btnHome = await page.waitForSelector('[data-testid="AppTabBar_Home_Link"]')

  if (btnHome) btnHome.click()

  const savedHeaders = await interceptHeaders(page)

  console.log(savedHeaders, 'savedHeader')

  // if (!savedHeaders) {
  //   console.error('Không tìm thấy token hoặc cookie!')
  //   return
  // }

  // await postTweetApi('Hi Every Body', savedHeaders)
}
