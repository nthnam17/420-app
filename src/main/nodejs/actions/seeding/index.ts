import { Page } from 'puppeteer'

export const Seeding = async (page: Page): Promise<void> => {
  // for (let i = 0; i < 5000; i + 1) {
  await page.mouse.wheel({ deltaY: 800 })
  await page.waitForNetworkIdle({ idleTime: 500 })

  const tweets = await page.$$('[data-testid="like"]')
  const cmtBtn = await page.$$('[data-testid="reply"]')

  console.log(tweets, 'tweets')
  console.log(cmtBtn, 'cmtBtn')

  if (tweets && tweets.length > 1) {
    await page.waitForNetworkIdle({ idleTime: 2000 })
    tweets[0].click()
  }
  if (cmtBtn && cmtBtn.length > 1) {
    cmtBtn[0].click()
    await page.waitForNetworkIdle({ idleTime: 2000 })

    await page.waitForSelector('[data-testid="tweetTextarea_0"]')
    await page.type('div[data-testid="tweetTextarea_0"]', ' wow, wow', {
      delay: 100
    })
    await page.waitForNetworkIdle({ idleTime: 500 })

    const tweetBtn = await page.waitForSelector('[data-testid="tweetButton"]')
    await page.waitForNetworkIdle({ idleTime: 1000 })
    tweetBtn?.click()
  }

  // Retweet
  const retweetBtn = await page.$$('[data-testid="retweet"]')
  if (retweetBtn && retweetBtn.length > 1) {
    retweetBtn[0].click()
    const retweetConfirmBtn = await page.waitForSelector('[data-testid="retweetConfirm"]')
    if (retweetConfirmBtn) retweetConfirmBtn.click()
  }
}
// }
