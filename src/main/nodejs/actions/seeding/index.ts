import { Page } from 'puppeteer'

export const Seeding = async (page: Page): Promise<void> => {
  for (let i = 0; i < 5000; i++) {
    const tweets = await page.$$('[data-testid="like"]')
    if (tweets && tweets.length > 1 && tweets.length > i) {
      await page.waitForNetworkIdle({ idleTime: 3000 })
      tweets[i].click()
      const cmtBtn = await page.$$('[data-testid="reply"]')

      if (cmtBtn.length > 1) {
        cmtBtn[0].click()

        await page.waitForSelector('[data-testid="tweetTextarea_0"]')
        await page.type(
          'div[data-testid="tweetTextarea_0"]',
          " It's really awesome, you have real quality",
          {
            delay: 150
          }
        )

        const tweetBtn = await page.waitForSelector('[data-testid="tweetButton"]')
        await page.waitForNetworkIdle({ idleTime: 1000 })
        tweetBtn?.click()
      }
    }

    await page.mouse.wheel({ deltaY: 800 })
    await page.waitForNetworkIdle({ idleTime: 150 })
  }
}
